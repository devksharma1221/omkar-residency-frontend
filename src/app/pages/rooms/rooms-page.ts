import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ROOM_AMENITIES } from '../../core/data/rooms.data';
import { AmenityKey, RoomCategory } from '../../core/models/room.model';
import { RoomService } from '../../core/services/room.service';
import { nightsBetween } from '../../core/utils/date';
import { unsplash } from '../../core/utils/image';
import { Icon } from '../../shared/components/icon/icon';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { RoomCard } from '../../shared/components/room-card/room-card';
import { InrPipe } from '../../shared/pipes/inr.pipe';

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating';
type CategoryFilter = RoomCategory | 'All';

const FILTERABLE_AMENITIES: AmenityKey[] = ['breakfast', 'bathtub', 'balcony', 'lounge', 'workspace', 'pool-view'];
const PRICE_STEP = 500;

@Component({
  selector: 'app-rooms-page',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, Icon, PageHeader, RoomCard, InrPipe],
  templateUrl: './rooms-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsPage implements OnInit {
  private readonly roomService = inject(RoomService);

  // Stay details bound from query params (e.g. from the home page search).
  readonly checkIn = input<string>();
  readonly checkOut = input<string>();
  readonly adults = input<string>();
  readonly children = input<string>();

  protected readonly headerImage = unsplash('1618773928121-c32242e63f39', 2000);
  protected readonly categories: CategoryFilter[] = ['All', ...this.roomService.categories];
  protected readonly guestOptions = [1, 2, 3, 4, 5, 6];
  protected readonly amenityOptions = FILTERABLE_AMENITIES.map((key) => ({ key, ...ROOM_AMENITIES[key] }));
  protected readonly priceMin = 4000;
  protected readonly priceMax = Math.ceil(this.roomService.maxPrice / PRICE_STEP) * PRICE_STEP;
  protected readonly priceStep = PRICE_STEP;

  protected readonly filters = inject(NonNullableFormBuilder).group({
    category: 'All' as CategoryFilter,
    maxPrice: this.priceMax,
    guests: 1,
    sort: 'recommended' as SortOption,
  });

  private readonly filterValue = toSignal(this.filters.valueChanges.pipe(map(() => this.filters.getRawValue())), {
    initialValue: this.filters.getRawValue(),
  });

  protected readonly selectedAmenities = signal<ReadonlySet<AmenityKey>>(new Set());
  protected readonly filtersOpen = signal(false);

  protected readonly stayParams = computed<Params>(() => {
    const params: Params = {};
    const entries = { checkIn: this.checkIn(), checkOut: this.checkOut(), adults: this.adults(), children: this.children() };
    for (const [key, value] of Object.entries(entries)) {
      if (value) params[key] = value;
    }
    return params;
  });

  protected readonly nights = computed(() => nightsBetween(this.checkIn(), this.checkOut()));

  protected readonly rooms = computed(() => {
    const { category, maxPrice, guests, sort } = this.filterValue();
    const amenities = this.selectedAmenities();

    const result = this.roomService
      .getAll()
      .filter(
        (room) =>
          (category === 'All' || room.category === category) &&
          room.pricePerNight <= maxPrice &&
          room.maxAdults + room.maxChildren >= guests &&
          [...amenities].every((key) => room.amenities.includes(key)),
      );

    switch (sort) {
      case 'price-asc':
        return result.sort((a, b) => a.pricePerNight - b.pricePerNight);
      case 'price-desc':
        return result.sort((a, b) => b.pricePerNight - a.pricePerNight);
      case 'rating':
        return result.sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  });

  protected readonly activeFilterCount = computed(() => {
    const { category, maxPrice, guests } = this.filterValue();
    return (
      (category !== 'All' ? 1 : 0) +
      (maxPrice !== this.priceMax ? 1 : 0) +
      (guests > 1 ? 1 : 0) +
      this.selectedAmenities().size
    );
  });

  ngOnInit(): void {
    const guests = Number(this.adults() ?? 0) + Number(this.children() ?? 0);
    if (guests > 0) {
      this.filters.controls.guests.setValue(Math.min(guests, Math.max(...this.guestOptions)));
    }
  }

  protected toggleAmenity(key: AmenityKey): void {
    this.selectedAmenities.update((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  protected resetFilters(): void {
    this.filters.reset();
    this.selectedAmenities.set(new Set());
  }
}

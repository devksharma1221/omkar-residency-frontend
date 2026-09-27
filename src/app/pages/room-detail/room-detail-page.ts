import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { HOTEL_INFO } from '../../core/data/content.data';
import { ROOM_AMENITIES } from '../../core/data/rooms.data';
import { BookingService } from '../../core/services/booking.service';
import { RoomService } from '../../core/services/room.service';
import { addDaysIso, todayIso } from '../../core/utils/date';
import { stayDatesValidator } from '../../core/utils/validators';
import { Icon } from '../../shared/components/icon/icon';
import { RoomCard } from '../../shared/components/room-card/room-card';
import { InrPipe } from '../../shared/pipes/inr.pipe';

@Component({
  selector: 'app-room-detail-page',
  imports: [ReactiveFormsModule, RouterLink, Icon, RoomCard, InrPipe],
  templateUrl: './room-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetailPage implements OnInit {
  private readonly roomService = inject(RoomService);
  private readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);

  readonly slug = input.required<string>();
  readonly checkIn = input<string>();
  readonly checkOut = input<string>();
  readonly adults = input<string>();
  readonly children = input<string>();

  protected readonly hotel = HOTEL_INFO;
  protected readonly today = todayIso();
  protected readonly room = computed(() => this.roomService.getBySlug(this.slug()));
  protected readonly similarRooms = computed(() => {
    const room = this.room();
    return room ? this.roomService.getSimilar(room) : [];
  });
  protected readonly amenities = computed(() => this.room()?.amenities.map((key) => ROOM_AMENITIES[key]) ?? []);

  /** Resets to the first photo whenever the room changes. */
  protected readonly activeImage = linkedSignal({ source: this.room, computation: () => 0 });

  protected readonly stayForm = inject(NonNullableFormBuilder).group(
    {
      checkIn: [addDaysIso(this.today, 1), Validators.required],
      checkOut: [addDaysIso(this.today, 2), Validators.required],
      guests: [2, [Validators.required, Validators.min(1)]],
    },
    { validators: stayDatesValidator() },
  );

  private readonly stay = toSignal(this.stayForm.valueChanges.pipe(map(() => this.stayForm.getRawValue())), {
    initialValue: this.stayForm.getRawValue(),
  });

  protected readonly guestOptions = computed(() => {
    const room = this.room();
    const max = room ? room.maxAdults + room.maxChildren : 2;
    return Array.from({ length: max }, (_, i) => i + 1);
  });

  protected readonly estimate = computed(() => {
    const { checkIn, checkOut, guests } = this.stay();
    return this.bookingService.calculate(this.room(), checkIn, checkOut, guests, {
      breakfast: false,
      airportTransfer: false,
    });
  });

  constructor() {
    const title = inject(Title);
    effect(() => {
      const room = this.room();
      title.setTitle(room ? `${room.name} | Omkar Residency` : 'Room Not Found | Omkar Residency');
    });
  }

  ngOnInit(): void {
    const checkIn = this.checkIn();
    const checkOut = this.checkOut();
    const guests = Number(this.adults() ?? 0) + Number(this.children() ?? 0);
    this.stayForm.patchValue({
      ...(checkIn && checkIn >= this.today ? { checkIn } : {}),
      ...(checkOut && checkIn && checkOut > checkIn ? { checkOut } : {}),
      ...(guests > 0 ? { guests: Math.min(guests, this.guestOptions().length) } : {}),
    });
  }

  protected showImage(step: number): void {
    const count = this.room()?.images.length ?? 1;
    this.activeImage.update((i) => (i + step + count) % count);
  }

  protected onCheckInChange(): void {
    const { checkIn, checkOut } = this.stayForm.getRawValue();
    if (checkIn && checkOut <= checkIn) {
      this.stayForm.controls.checkOut.setValue(addDaysIso(checkIn, 1));
    }
  }

  protected reserve(): void {
    const room = this.room();
    if (!room || this.stayForm.invalid) {
      this.stayForm.markAllAsTouched();
      return;
    }
    const { checkIn, checkOut, guests } = this.stayForm.getRawValue();
    const adults = Math.min(guests, room.maxAdults);
    this.router.navigate(['/booking'], {
      queryParams: { room: room.slug, checkIn, checkOut, adults, children: guests - adults },
    });
  }
}

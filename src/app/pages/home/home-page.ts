import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HERO_IMAGE, HOTEL_AMENITIES, TESTIMONIALS } from '../../core/data/content.data';
import { RoomService } from '../../core/services/room.service';
import { unsplash } from '../../core/utils/image';
import { BookingSearch } from '../../shared/components/booking-search/booking-search';
import { Icon } from '../../shared/components/icon/icon';
import { RoomCard } from '../../shared/components/room-card/room-card';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';

const TESTIMONIAL_INTERVAL_MS = 7000;

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, BookingSearch, Icon, RoomCard, SectionHeading],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly heroImage = HERO_IMAGE;
  protected readonly featuredRooms = inject(RoomService).getFeatured();
  protected readonly amenities = HOTEL_AMENITIES;
  protected readonly testimonials = TESTIMONIALS;

  protected readonly introImages = {
    primary: unsplash('1566073771259-6a8506099945', 900),
    secondary: unsplash('1414235077428-338989a2e8c0', 600),
  };

  protected readonly stats = [
    { value: '15+', label: 'Years of hospitality' },
    { value: '48', label: 'Rooms & suites' },
    { value: '4.8', label: 'Average guest rating' },
    { value: '25k+', label: 'Happy guests' },
  ];

  protected readonly experiences = [
    {
      title: 'Saffron Dining',
      text: 'Slow-cooked regional recipes, live tandoor and a curated wine list featuring Nashik vineyards.',
      image: unsplash('1517248135467-4c7edcad34c4', 900),
    },
    {
      title: 'Ananda Spa',
      text: 'Ayurvedic abhyanga, hot-stone therapy and signature rituals for deep restoration.',
      image: unsplash('1544161515-4ab6ce6db874', 900),
    },
    {
      title: 'Poolside Leisure',
      text: 'Sun-drenched loungers, fresh coolers and evening music by the water.',
      image: unsplash('1576013551627-0cc20b96c2a7', 900),
    },
  ];

  protected readonly activeTestimonial = signal(0);

  constructor() {
    const timer = setInterval(() => this.nextTestimonial(), TESTIMONIAL_INTERVAL_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  protected nextTestimonial(): void {
    this.activeTestimonial.update((i) => (i + 1) % this.testimonials.length);
  }

  protected previousTestimonial(): void {
    this.activeTestimonial.update((i) => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { ROOM_AMENITIES } from '../../../core/data/rooms.data';
import { Room } from '../../../core/models/room.model';
import { InrPipe } from '../../pipes/inr.pipe';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-room-card',
  imports: [RouterLink, Icon, InrPipe],
  templateUrl: './room-card.html',
  host: { class: 'block h-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCard {
  readonly room = input.required<Room>();
  /** Stay details (dates, guests) carried through to the detail and booking pages. */
  readonly stayParams = input<Params>({});

  protected readonly topAmenities = computed(() =>
    this.room()
      .amenities.slice(0, 4)
      .map((key) => ROOM_AMENITIES[key]),
  );

  protected readonly discount = computed(() => {
    const { originalPrice, pricePerNight } = this.room();
    return originalPrice ? Math.round((1 - pricePerNight / originalPrice) * 100) : 0;
  });

  protected readonly bookingParams = computed(() => ({ ...this.stayParams(), room: this.room().slug }));
}

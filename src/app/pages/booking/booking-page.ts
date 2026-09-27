import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BookingConfirmation } from '../../core/models/booking.model';
import { ADD_ON_PRICES, BookingService } from '../../core/services/booking.service';
import { RoomService } from '../../core/services/room.service';
import { addDaysIso, todayIso } from '../../core/utils/date';
import { unsplash } from '../../core/utils/image';
import { INDIAN_PHONE_PATTERN, stayDatesValidator } from '../../core/utils/validators';
import { Icon } from '../../shared/components/icon/icon';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';

@Component({
  selector: 'app-booking-page',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, Icon, PageHeader, InrPipe],
  templateUrl: './booking-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPage implements OnInit {
  private readonly roomService = inject(RoomService);
  private readonly bookingService = inject(BookingService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly fb = inject(NonNullableFormBuilder);

  // Prefill values bound from query params.
  readonly room = input<string>();
  readonly checkIn = input<string>();
  readonly checkOut = input<string>();
  readonly adults = input<string>();
  readonly children = input<string>();

  protected readonly headerImage = unsplash('1590490360182-c33d57733427', 2000);
  protected readonly today = todayIso();
  protected readonly rooms = this.roomService.getAll();
  protected readonly addOnPrices = ADD_ON_PRICES;
  protected readonly adultOptions = [1, 2, 3, 4];
  protected readonly childOptions = [0, 1, 2];

  protected readonly form = this.fb.group(
    {
      stay: this.fb.group(
        {
          checkIn: [addDaysIso(this.today, 1), Validators.required],
          checkOut: [addDaysIso(this.today, 2), Validators.required],
          adults: [2, [Validators.required, Validators.min(1)]],
          children: [0, Validators.min(0)],
        },
        { validators: stayDatesValidator() },
      ),
      roomId: ['', Validators.required],
      guest: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(INDIAN_PHONE_PATTERN)]],
        specialRequests: ['', Validators.maxLength(500)],
      }),
      addOns: this.fb.group({
        breakfast: false,
        airportTransfer: false,
      }),
      acceptTerms: [false, Validators.requiredTrue],
    },
    { validators: this.capacityValidator() },
  );

  private readonly value = toSignal(this.form.valueChanges.pipe(map(() => this.form.getRawValue())), {
    initialValue: this.form.getRawValue(),
  });

  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly confirmation = signal<BookingConfirmation | null>(null);

  protected readonly selectedRoom = computed(() => this.roomService.getById(this.value().roomId));
  protected readonly guestCount = computed(() => this.value().stay.adults + this.value().stay.children);
  protected readonly breakfastIncluded = computed(() => !!this.selectedRoom()?.amenities.includes('breakfast'));

  protected readonly summary = computed(() => {
    const { stay, addOns } = this.value();
    return this.bookingService.calculate(this.selectedRoom(), stay.checkIn, stay.checkOut, this.guestCount(), addOns);
  });

  ngOnInit(): void {
    const room = this.room() ? this.roomService.getBySlug(this.room()!) : undefined;
    const checkIn = this.checkIn();
    const checkOut = this.checkOut();
    const adults = Number(this.adults());
    const children = Number(this.children());

    this.form.patchValue({
      roomId: room?.id ?? '',
      stay: {
        ...(checkIn && checkIn >= this.today ? { checkIn } : {}),
        ...(checkOut && checkIn && checkOut > checkIn ? { checkOut } : {}),
        ...(adults >= 1 ? { adults: Math.min(adults, Math.max(...this.adultOptions)) } : {}),
        ...(children >= 0 && this.children() ? { children: Math.min(children, Math.max(...this.childOptions)) } : {}),
      },
    });
  }

  /** True when a control should display its validation error. */
  protected showError(path: string): boolean {
    const control = this.form.get(path);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  protected roomFits(roomId: string): boolean {
    const room = this.roomService.getById(roomId);
    const { adults, children } = this.value().stay;
    return !!room && adults <= room.maxAdults && adults + children <= room.maxAdults + room.maxChildren;
  }

  protected onCheckInChange(): void {
    const { checkIn, checkOut } = this.form.controls.stay.getRawValue();
    if (checkIn && checkOut <= checkIn) {
      this.form.controls.stay.controls.checkOut.setValue(addDaysIso(checkIn, 1));
    }
  }

  protected async submit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      queueMicrotask(() => this.focusFirstInvalid());
      return;
    }

    const { stay, roomId, guest, addOns } = this.form.getRawValue();
    this.submitting.set(true);
    try {
      const confirmation = await this.bookingService.submit(
        { roomId, checkIn: stay.checkIn, checkOut: stay.checkOut, adults: stay.adults, children: stay.children, addOns, guest },
        this.summary(),
      );
      this.confirmation.set(confirmation);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      this.submitting.set(false);
    }
  }

  protected startNewBooking(): void {
    this.confirmation.set(null);
    this.submitted.set(false);
    this.form.reset();
  }

  private focusFirstInvalid(): void {
    this.host.nativeElement
      .querySelector<HTMLElement>('input.ng-invalid, select.ng-invalid, textarea.ng-invalid, [data-invalid="true"]')
      ?.focus();
  }

  private capacityValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const room = this.roomService.getById(form.get('roomId')?.value);
      const adults: number = form.get('stay.adults')?.value ?? 0;
      const children: number = form.get('stay.children')?.value ?? 0;
      if (!room) return null;
      return adults > room.maxAdults || adults + children > room.maxAdults + room.maxChildren
        ? { capacityExceeded: true }
        : null;
    };
  }
}

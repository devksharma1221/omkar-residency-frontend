import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addDaysIso, todayIso } from '../../../core/utils/date';
import { stayDatesValidator } from '../../../core/utils/validators';
import { Icon } from '../icon/icon';

/** Compact availability search used on the home hero; routes to the rooms listing with stay filters. */
@Component({
  selector: 'app-booking-search',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './booking-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSearch {
  private readonly router = inject(Router);

  protected readonly today = todayIso();
  protected readonly adultOptions = [1, 2, 3, 4];
  protected readonly childOptions = [0, 1, 2];

  protected readonly form = inject(NonNullableFormBuilder).group(
    {
      checkIn: [addDaysIso(this.today, 1), Validators.required],
      checkOut: [addDaysIso(this.today, 2), Validators.required],
      adults: [2, Validators.required],
      children: [0],
    },
    { validators: stayDatesValidator() },
  );

  protected onCheckInChange(): void {
    const { checkIn, checkOut } = this.form.getRawValue();
    if (checkIn && checkOut <= checkIn) {
      this.form.controls.checkOut.setValue(addDaysIso(checkIn, 1));
    }
  }

  protected search(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigate(['/rooms'], { queryParams: this.form.getRawValue() });
  }
}

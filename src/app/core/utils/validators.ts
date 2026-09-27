import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { nightsBetween, todayIso } from './date';

/**
 * Group validator for a check-in / check-out pair.
 * Emits `pastCheckIn` when check-in is before today and `invalidRange` when check-out is not after check-in.
 */
export function stayDatesValidator(checkInKey = 'checkIn', checkOutKey = 'checkOut'): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const checkIn: string | null = group.get(checkInKey)?.value;
    const checkOut: string | null = group.get(checkOutKey)?.value;
    if (!checkIn || !checkOut) return null;

    const errors: ValidationErrors = {};
    if (checkIn < todayIso()) errors['pastCheckIn'] = true;
    if (nightsBetween(checkIn, checkOut) < 1) errors['invalidRange'] = true;
    return Object.keys(errors).length ? errors : null;
  };
}

/** Indian mobile number: optional +91 / 0 prefix followed by 10 digits starting 6–9. */
export const INDIAN_PHONE_PATTERN = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;

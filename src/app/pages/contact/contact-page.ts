import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HOTEL_INFO } from '../../core/data/content.data';
import { unsplash } from '../../core/utils/image';
import { INDIAN_PHONE_PATTERN } from '../../core/utils/validators';
import { Icon } from '../../shared/components/icon/icon';
import { IconName } from '../../shared/components/icon/icons';
import { PageHeader } from '../../shared/components/page-header/page-header';

const MAP_EMBED_URL = 'https://www.google.com/maps?q=Gangapur+Road,+Nashik,+Maharashtra&output=embed';

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, Icon, PageHeader],
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  protected readonly hotel = HOTEL_INFO;
  protected readonly headerImage = unsplash('1566073771259-6a8506099945', 2000);
  protected readonly mapUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(MAP_EMBED_URL);

  protected readonly subjects = ['Room reservation', 'Events & weddings', 'Dining reservation', 'Spa appointment', 'Feedback', 'Other'];

  protected readonly contactCards: { icon: IconName; title: string; lines: string[]; href?: string }[] = [
    { icon: 'map-pin', title: 'Visit us', lines: HOTEL_INFO.address },
    { icon: 'phone', title: 'Call us', lines: [HOTEL_INFO.phone, 'Available 24 × 7'], href: HOTEL_INFO.phoneHref },
    { icon: 'mail', title: 'Write to us', lines: [HOTEL_INFO.email, 'Replies within 24 hours'], href: `mailto:${HOTEL_INFO.email}` },
    {
      icon: 'clock',
      title: 'Check-in / out',
      lines: [`Check-in from ${HOTEL_INFO.checkInTime}`, `Check-out by ${HOTEL_INFO.checkOutTime}`],
    },
  ];

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(INDIAN_PHONE_PATTERN)],
    subject: [this.subjects[0], Validators.required],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  protected readonly sending = signal(false);
  protected readonly sentTo = signal<string | null>(null);

  protected showError(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Mock submission until the backend is available.
    this.sending.set(true);
    setTimeout(() => {
      this.sentTo.set(this.form.controls.name.value);
      this.sending.set(false);
      this.form.reset();
    }, 800);
  }
}

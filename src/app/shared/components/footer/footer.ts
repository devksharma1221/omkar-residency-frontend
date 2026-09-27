import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOTEL_INFO } from '../../../core/data/content.data';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icons';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon, Logo],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly hotel = HOTEL_INFO;
  protected readonly year = new Date().getFullYear();

  protected readonly socials: { label: string; href: string; icon: IconName }[] = [
    { label: 'Instagram', href: 'https://www.instagram.com', icon: 'instagram' },
    { label: 'Facebook', href: 'https://www.facebook.com', icon: 'facebook' },
    { label: 'Email us', href: `mailto:${HOTEL_INFO.email}`, icon: 'mail' },
  ];

  protected readonly explore = [
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Book a Stay', path: '/booking' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  protected readonly rooms = [
    { label: 'Deluxe Room', slug: 'deluxe-room' },
    { label: 'Executive Room', slug: 'executive-room' },
    { label: 'Family Suite', slug: 'family-suite' },
    { label: 'Presidential Suite', slug: 'presidential-suite' },
  ];
}

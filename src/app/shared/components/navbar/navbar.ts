import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { HOTEL_INFO } from '../../../core/data/content.data';
import { Icon } from '../icon/icon';
import { Logo } from '../logo/logo';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, Icon, Logo],
  templateUrl: './navbar.html',
  host: { '(window:scroll)': 'onScroll()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private readonly router = inject(Router);

  protected readonly hotel = HOTEL_INFO;
  protected readonly links: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  protected readonly menuOpen = signal(false);
  private readonly scrolled = signal(false);

  private readonly isHome = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/)[0] === '/'),
    ),
    { initialValue: inject(Location).path().split(/[?#]/)[0] === '' },
  );

  /** Transparent over the home hero until the user scrolls or opens the menu. */
  protected readonly transparent = computed(() => this.isHome() && !this.scrolled() && !this.menuOpen());

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/components/footer/footer';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <a
      href="#main"
      class="sr-only z-[60] rounded-sm bg-forest-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >Skip to content</a
    >
    <app-navbar />
    <main id="main" class="min-h-screen">
      <router-outlet />
    </main>
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}

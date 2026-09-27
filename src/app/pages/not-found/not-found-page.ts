import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Icon],
  template: `
    <section class="relative flex min-h-screen items-center overflow-hidden bg-ivory-100 pt-28 pb-20">
      <span
        class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18rem] leading-none text-gold-200/50 select-none sm:text-[26rem]"
        aria-hidden="true"
        >404</span
      >
      <div class="container-page relative text-center">
        <p class="eyebrow">Page not found</p>
        <h1 class="mt-4 text-5xl font-medium sm:text-6xl">This door leads nowhere</h1>
        <div class="gold-rule mx-auto mt-6"></div>
        <p class="mx-auto mt-6 max-w-md text-stone-600">
          The page you are looking for may have moved or no longer exists. Let us guide you back to comfort.
        </p>
        <div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a routerLink="/" class="btn-primary"><app-icon name="arrow-left" class="size-4" /> Back to Home</a>
          <a routerLink="/rooms" class="btn-outline">Explore Rooms</a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}

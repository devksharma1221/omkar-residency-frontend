import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-page-header',
  imports: [RouterLink, Icon],
  template: `
    <section class="relative isolate flex min-h-[22rem] items-end overflow-hidden pt-28 pb-14 sm:min-h-[26rem]">
      <img [src]="image()" alt="" class="absolute inset-0 -z-20 size-full object-cover" />
      <div class="absolute inset-0 -z-10 bg-linear-to-t from-forest-950/90 via-forest-950/55 to-forest-950/30"></div>
      <div class="container-page animate-fade-up">
        <nav aria-label="Breadcrumb" class="mb-4 flex items-center gap-2 text-xs tracking-wider text-ivory-200 uppercase">
          <a routerLink="/" class="hover:text-gold-300">Home</a>
          <app-icon name="chevron-right" class="size-3" />
          <span class="text-gold-300">{{ title() }}</span>
        </nav>
        <h1 class="text-5xl font-medium text-white sm:text-6xl">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="mt-4 max-w-2xl text-lg text-ivory-100/90">{{ subtitle() }}</p>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly image = input.required<string>();
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <span class="flex items-center gap-3">
      <span
        class="grid size-10 place-items-center rounded-full border font-display text-xl leading-none"
        [class]="light() ? 'border-gold-300 text-gold-300' : 'border-gold-500 text-gold-600'"
        aria-hidden="true"
        >ॐ</span
      >
      <span class="flex flex-col leading-none">
        <span
          class="font-display text-2xl font-semibold tracking-wide"
          [class]="light() ? 'text-white' : 'text-forest-900'"
          >Omkar</span
        >
        <span
          class="mt-1 text-[0.6rem] font-medium tracking-[0.45em] uppercase"
          [class]="light() ? 'text-gold-200' : 'text-gold-600'"
          >Residency</span
        >
      </span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly light = input(false);
}

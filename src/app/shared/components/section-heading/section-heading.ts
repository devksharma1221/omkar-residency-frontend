import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  template: `
    <div [class]="align() === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
      <p class="eyebrow" [class.text-gold-300]="light()">{{ eyebrow() }}</p>
      <h2 class="mt-3 text-4xl leading-tight font-medium sm:text-5xl" [class.text-white]="light()">{{ title() }}</h2>
      <div class="gold-rule mt-5" [class.mx-auto]="align() === 'center'"></div>
      @if (subtitle()) {
        <p class="mt-5 leading-relaxed" [class]="light() ? 'text-forest-100' : 'text-stone-600'">{{ subtitle() }}</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly align = input<'left' | 'center'>('center');
  readonly light = input(false);
}

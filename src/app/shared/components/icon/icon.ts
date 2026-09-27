import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ICONS, IconName } from './icons';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      [attr.fill]="filled() ? 'currentColor' : 'none'"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-full w-full"
      aria-hidden="true"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  host: { class: 'inline-block shrink-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly strokeWidth = input(1.5);
  readonly filled = input(false);

  protected readonly paths = computed(() => ICONS[this.name()]);
}

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GALLERY_IMAGES } from '../../core/data/content.data';
import { GalleryCategory } from '../../core/models/content.model';
import { unsplash } from '../../core/utils/image';
import { Icon } from '../../shared/components/icon/icon';
import { PageHeader } from '../../shared/components/page-header/page-header';

type GalleryFilter = GalleryCategory | 'All';

@Component({
  selector: 'app-gallery-page',
  imports: [Icon, PageHeader],
  templateUrl: './gallery-page.html',
  host: { '(document:keydown)': 'onKeydown($event)' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPage {
  protected readonly headerImage = unsplash('1571896349842-33c89424de2d', 2000);
  protected readonly filters: GalleryFilter[] = ['All', 'Rooms', 'Dining', 'Wellness', 'Property'];

  protected readonly activeFilter = signal<GalleryFilter>('All');
  protected readonly lightboxIndex = signal<number | null>(null);

  protected readonly images = computed(() => {
    const filter = this.activeFilter();
    return filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((image) => image.category === filter);
  });

  protected readonly lightboxImage = computed(() => {
    const index = this.lightboxIndex();
    return index === null ? null : this.images()[index];
  });

  protected setFilter(filter: GalleryFilter): void {
    this.activeFilter.set(filter);
    this.lightboxIndex.set(null);
  }

  protected open(index: number): void {
    this.lightboxIndex.set(index);
  }

  protected close(): void {
    this.lightboxIndex.set(null);
  }

  protected step(delta: number): void {
    const count = this.images().length;
    this.lightboxIndex.update((i) => (i === null ? null : (i + delta + count) % count));
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.lightboxIndex() === null) return;
    if (event.key === 'Escape') this.close();
    else if (event.key === 'ArrowRight') this.step(1);
    else if (event.key === 'ArrowLeft') this.step(-1);
  }
}

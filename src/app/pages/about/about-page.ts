import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { unsplash } from '../../core/utils/image';
import { Icon } from '../../shared/components/icon/icon';
import { IconName } from '../../shared/components/icon/icons';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';

@Component({
  selector: 'app-about-page',
  imports: [RouterLink, Icon, PageHeader, SectionHeading],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  protected readonly images = {
    header: unsplash('1551882547-ff40c63fe5fa', 2000),
    story: unsplash('1564501049412-61c2a3083791', 1000),
    detail: unsplash('1582719478250-c89cae4dc85b', 700),
    cta: unsplash('1520250497591-112f2f40a3f4', 2000),
  };

  protected readonly stats = [
    { value: '2009', label: 'Established' },
    { value: '48', label: 'Rooms & suites' },
    { value: '120+', label: 'Team members' },
    { value: '4.8★', label: 'Guest rating' },
  ];

  protected readonly values: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'heart',
      title: 'Atithi Devo Bhava',
      text: 'The guest is god. Every interaction is guided by genuine warmth, humility and care.',
    },
    {
      icon: 'award',
      title: 'Uncompromising Quality',
      text: 'From linen to cuisine, we choose the finest — and hold ourselves to exacting standards.',
    },
    {
      icon: 'leaf',
      title: 'Responsible Luxury',
      text: 'Solar-heated water, zero single-use plastic in rooms and produce sourced from local farms.',
    },
    {
      icon: 'users',
      title: 'Rooted in Community',
      text: 'We champion local artisans, weavers and growers, bringing their craft into every space.',
    },
  ];

  protected readonly milestones = [
    { year: '2009', text: 'Omkar Residency opens its doors with 18 rooms on Gangapur Road.' },
    { year: '2014', text: 'Saffron restaurant launches, celebrating Maharashtrian home-style cuisine.' },
    { year: '2018', text: 'New wing adds suites, the infinity pool and Ananda Spa.' },
    { year: '2024', text: 'Recognised among the top boutique hotels in Maharashtra by guests.' },
  ];
}

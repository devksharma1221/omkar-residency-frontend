import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Omkar Residency | Luxury Hotel & Suites in Nashik',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'rooms',
    title: 'Rooms & Suites | Omkar Residency',
    loadComponent: () => import('./pages/rooms/rooms-page').then((m) => m.RoomsPage),
  },
  {
    path: 'rooms/:slug',
    loadComponent: () => import('./pages/room-detail/room-detail-page').then((m) => m.RoomDetailPage),
  },
  {
    path: 'booking',
    title: 'Book Your Stay | Omkar Residency',
    loadComponent: () => import('./pages/booking/booking-page').then((m) => m.BookingPage),
  },
  {
    path: 'about',
    title: 'About Us | Omkar Residency',
    loadComponent: () => import('./pages/about/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'gallery',
    title: 'Gallery | Omkar Residency',
    loadComponent: () => import('./pages/gallery/gallery-page').then((m) => m.GalleryPage),
  },
  {
    path: 'contact',
    title: 'Contact Us | Omkar Residency',
    loadComponent: () => import('./pages/contact/contact-page').then((m) => m.ContactPage),
  },
  {
    path: '**',
    title: 'Page Not Found | Omkar Residency',
    loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];

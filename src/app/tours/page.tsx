import type { Metadata } from 'next';
import { ToursPageClient } from './ToursPageClient';

export const metadata: Metadata = {
  title: 'Wedding Destination Tours & Experiences | Wedzway',
  description: 'Explore curated tours and experiences for your wedding guests. City tours, cultural experiences, adventure activities, and local attractions at your destination.',
  keywords: ['wedding tours', 'destination tours', 'wedding guest activities', 'city tours', 'cultural experiences', 'wedding excursions'],
  openGraph: {
    title: 'Wedding Destination Tours | Wedzway',
    description: 'Curated tours and experiences for your wedding guests at destination weddings.',
    type: 'website',
  },
};

export default function ToursPage() {
  return <ToursPageClient />;
}

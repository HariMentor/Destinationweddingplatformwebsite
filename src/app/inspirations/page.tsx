import type { Metadata } from 'next';
import { InspirationsPageClient } from './InspirationsPageClient';

export const metadata: Metadata = {
  title: 'Wedding Inspiration - Real Weddings & Ideas | Wedzway',
  description: 'Get inspired by real destination weddings from around the world. Browse stunning wedding photos, themes, decor ideas, and vendor recommendations.',
  keywords: ['wedding inspiration', 'real weddings', 'wedding ideas', 'destination wedding photos', 'wedding themes', 'wedding decor ideas'],
  openGraph: {
    title: 'Wedding Inspiration | Wedzway',
    description: 'Get inspired by real destination weddings from around the world.',
    type: 'website',
  },
};

export default function InspirationsPage() {
  return <InspirationsPageClient />;
}

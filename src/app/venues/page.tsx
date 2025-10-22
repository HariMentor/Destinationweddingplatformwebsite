import type { Metadata } from 'next';
import { VenuesPageClient } from './VenuesPageClient';

export const metadata: Metadata = {
  title: 'Wedding Venues - Palaces, Resorts & Unique Locations | Wedzway',
  description: 'Discover stunning wedding venues worldwide. From luxurious palace hotels to beachfront resorts and unique destination venues for your dream wedding.',
  keywords: ['wedding venues', 'destination wedding venues', 'palace weddings', 'resort weddings', 'India wedding venues', 'beach weddings'],
  openGraph: {
    title: 'Wedding Venues | Wedzway',
    description: 'Discover stunning wedding venues worldwide for your dream destination wedding.',
    type: 'website',
  },
};

export default function VenuesPage() {
  return <VenuesPageClient />;
}

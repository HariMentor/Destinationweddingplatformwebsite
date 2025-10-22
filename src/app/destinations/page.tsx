import type { Metadata } from 'next';
import { DestinationsPageClient } from './DestinationsPageClient';

export const metadata: Metadata = {
  title: 'Wedding Destinations | Wedzway',
  description: 'Explore stunning destination wedding locations worldwide. From India\'s Udaipur palaces to exotic beach venues, find your perfect wedding destination.',
  keywords: ['destination weddings', 'wedding venues', 'India weddings', 'Udaipur', 'Jaipur', 'Goa', 'Kerala', 'beach weddings'],
  openGraph: {
    title: 'Wedding Destinations | Wedzway',
    description: 'Explore stunning destination wedding locations worldwide.',
    type: 'website',
  },
};

export default function DestinationsPage() {
  return <DestinationsPageClient />;
}

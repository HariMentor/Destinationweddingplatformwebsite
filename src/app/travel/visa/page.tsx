import type { Metadata } from 'next';
import { VisaPageClient } from './VisaPageClient';

export const metadata: Metadata = {
  title: 'Visa Services & Flight Booking | Wedzway',
  description: 'Simplify travel planning for your destination wedding. Visa assistance, flight booking, and travel coordination for couples and guests.',
  keywords: ['wedding visa services', 'destination wedding flights', 'travel planning', 'visa assistance', 'group flight booking'],
  openGraph: {
    title: 'Visa & Travel Services | Wedzway',
    description: 'Simplify travel planning for your destination wedding.',
    type: 'website',
  },
};

export default function VisaServicesPage() {
  return <VisaPageClient />;
}

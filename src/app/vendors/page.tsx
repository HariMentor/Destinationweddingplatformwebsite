import type { Metadata } from 'next';
import { VendorsPageClient } from './VendorsPageClient';

export const metadata: Metadata = {
  title: 'Wedding Vendors - Photographers, Videographers & Decorators | Wedzway',
  description: 'Find verified wedding photographers, videographers, makeup artists, and decorators worldwide. Browse portfolios, reviews, and book top wedding vendors.',
  keywords: ['wedding photographers', 'wedding videographers', 'wedding decorators', 'wedding makeup artists', 'destination wedding vendors'],
  openGraph: {
    title: 'Wedding Vendors | Wedzway',
    description: 'Find verified wedding photographers, videographers, and decorators worldwide.',
    type: 'website',
  },
};

export default function VendorsPage() {
  return <VendorsPageClient />;
}

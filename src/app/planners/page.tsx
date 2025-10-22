import type { Metadata } from 'next';
import { PlannersPageClient } from './PlannersPageClient';

export const metadata: Metadata = {
  title: 'Wedding Planners - Verified Destination Wedding Experts | Wedzway',
  description: 'Connect with verified wedding planners worldwide. Expert destination wedding coordination, planning services, and local expertise for your perfect celebration.',
  keywords: ['wedding planners', 'destination wedding planners', 'wedding coordinators', 'India wedding planners', 'verified wedding planners'],
  openGraph: {
    title: 'Wedding Planners | Wedzway',
    description: 'Connect with verified wedding planners worldwide for your destination wedding.',
    type: 'website',
  },
};

export default function PlannersPage() {
  return <PlannersPageClient />;
}

'use client';

import { VenuePage } from '@/components/VenuePage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';

export function VenuesPageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  const handleViewDetails = (venueId: number) => {
    router.push(`/venues/${venueId}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="venues" />
      <VenuePage onViewDetails={handleViewDetails} />
      <TravelFooter />
    </div>
  );
}

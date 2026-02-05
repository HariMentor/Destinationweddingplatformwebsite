'use client';

import { DestinationsPage } from '@/components/DestinationsPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';

export function DestinationsPageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  const handleViewDetails = (destinationId: string) => {
    router.push(`/destinations/${destinationId}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="destinations" />
      <DestinationsPage onViewDetails={handleViewDetails} />
      <TravelFooter />
    </div>
  );
}

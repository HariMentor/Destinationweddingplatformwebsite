'use client';

import { DestinationDetailsPage } from '@/components/DestinationDetailsPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

export function DestinationDetailClient({ destinationId }: { destinationId: string }) {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const routeMap: Record<string, string> = {
      'landing': '/landing',
      'venues': '/venues',
      'destinations': '/destinations',
      'inspirations': '/inspirations',
      'planners': '/planners',
      'vendors': '/vendors',
      'tours': '/tours',
      'visa-services': '/travel/visa',
      'builder': '/wedding-builder',
      'expenses': '/expenses',
      'marketplace': '/marketplace',
      'account': '/account',
      'home': '/',
    };

    const route = routeMap[page];
    if (route) {
      router.push(route);
    }
  };

  const handleBack = () => {
    router.push('/destinations');
  };

  const handleViewVenue = (venueId: number) => {
    router.push(`/venues/${venueId}`);
  };

  const handleViewTourismBoard = (boardName: string) => {
    router.push(`/destinations/${destinationId}/tourism-board/${encodeURIComponent(boardName)}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="destinations" />
      <DestinationDetailsPage 
        destinationId={parseInt(destinationId)} 
        onBack={handleBack}
        onViewVenue={handleViewVenue}
        onViewTourismBoard={handleViewTourismBoard}
      />
      <TravelFooter />
    </div>
  );
}

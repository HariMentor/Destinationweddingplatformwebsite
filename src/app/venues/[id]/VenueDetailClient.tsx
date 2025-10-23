'use client';

import { VenueDetailsPage } from '@/components/VenueDetailsPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

export function VenueDetailClient({ venueId }: { venueId: string }) {
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
    router.push('/venues');
  };

  const handleProceedToPayment = () => {
    router.push('/booking/payment?type=venue');
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="venues" />
      <VenueDetailsPage 
        venueId={parseInt(venueId)} 
        onBack={handleBack}
        onProceedToPayment={handleProceedToPayment}
      />
      <TravelFooter />
    </div>
  );
}

'use client';

import { VisaFlightsPage } from '@/components/VisaFlightsPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

export function VisaPageClient() {
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

  const handleRequestVisa = () => {
    router.push('/travel/visa/request');
  };

  const handleBookFlight = (flight: any, passengers: number, tripType: string, returnFlight?: any) => {
    // Store in sessionStorage for the booking page
    sessionStorage.setItem('flightBookingData', JSON.stringify({
      flight,
      passengers,
      tripType,
      returnFlight
    }));
    router.push('/travel/flights/booking');
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="visa-services" />
      <VisaFlightsPage 
        onRequestVisa={handleRequestVisa}
        onBookFlight={handleBookFlight}
      />
      <TravelFooter />
    </div>
  );
}

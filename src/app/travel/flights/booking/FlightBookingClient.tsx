'use client';

import { FlightBookingPage } from '@/components/FlightBookingPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FlightBookingClient() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Retrieve booking data from sessionStorage
    const data = sessionStorage.getItem('flightBookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // If no booking data, redirect back to visa services
      router.push('/travel/visa');
    }
  }, [router]);

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
    router.push('/travel/visa');
  };

  if (!bookingData) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="visa-services" />
      <FlightBookingPage 
        flight={bookingData.flight}
        passengers={bookingData.passengers}
        tripType={bookingData.tripType}
        returnFlight={bookingData.returnFlight}
        onBack={handleBack}
      />
      <TravelFooter />
    </div>
  );
}

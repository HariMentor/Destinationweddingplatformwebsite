"use client";

import { useState, useEffect } from 'react';
import { VenuePage } from '@/components/VenuePage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';
import { Venue, getVenues } from '@/components/DestinationServices/services/venueService';

export function VenuesPageClient() {
  const router = useRouter();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        const data = await getVenues();
        setVenues(data || []);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, []);

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  const handleViewDetails = (venueId: string) => {
    router.push(`/venues/${venueId}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="venues" />
      <VenuePage
        onViewDetails={handleViewDetails}
        venues={venues}
        isLoading={isLoading}
      />
      <TravelFooter />
    </div>
  );
}

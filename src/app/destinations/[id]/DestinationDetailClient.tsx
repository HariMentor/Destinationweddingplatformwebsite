'use client';

import { DestinationDetailsPage } from '@/components/DestinationDetailsPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Destination } from '@/components/DestinationServices/types/destination';
import { Venue, getVenues } from '@/components/DestinationServices/services/venueService';
import { getDestinationById } from '@/components/DestinationServices/services/destinationService';
import { BannerSkeletonLoader, BrandedLoader, CardSkeletonLoader, Loader } from '@/components/ui/loader';

export function DestinationDetailClient({ destinationId }: { destinationId: string }) {
  const router = useRouter();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!destinationId) return;

      try {
        setIsLoading(true);
        // Fetch destination details
        const destData = await getDestinationById(destinationId);

        if (destData) {
          setDestination(destData);

          // Fetch related venues
          const venuesData = await getVenues({ destinationId: destinationId });
          setVenues(venuesData || []);
        }
      } catch (error) {
        console.error("Failed to fetch destination details", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [destinationId]);

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

  const handleViewVenue = (venueId: string) => {
    router.push(`/venues/${venueId}`);
  };

  const handleViewTourismBoard = (boardName: string) => {
    router.push(`/destinations/${destinationId}/tourism-board/${encodeURIComponent(boardName)}`);
  };

  if (isLoading) {
    return (
      <div className="size-full">
        <TravelNav onNavigate={handleNavigate} currentPage="destinations" />
        <div className="container mx-auto px-4 py-20">
          <BannerSkeletonLoader />
        </div>
        <TravelFooter />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="size-full">
        <TravelNav onNavigate={handleNavigate} currentPage="destinations" />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold">Destination not found</h2>
          <button onClick={handleBack} className="text-blue-500 hover:underline mt-4">Go back</button>
        </div>
        <TravelFooter />
      </div>
    );
  }

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="destinations" />
      <DestinationDetailsPage
        destination={destination}
        venues={venues}
        onBack={handleBack}
        onViewVenue={handleViewVenue}
        onViewTourismBoard={handleViewTourismBoard}
      />
      <TravelFooter />
    </div>
  );
}

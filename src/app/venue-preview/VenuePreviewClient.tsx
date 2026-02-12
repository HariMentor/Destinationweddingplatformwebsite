"use client";
import { useState, useEffect } from 'react';
import { VenueDetailsPageV2 } from '@/components/VenueDetailsPageV2';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';
import { getVenues, Venue } from '@/components/DestinationServices/services/venueService';
import { BrandedLoader } from '@/components/ui/loader';

export function VenuePreviewClient() {
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPreviewVenue() {
      try {
        setIsLoading(true);
        // Fetch first available venue for preview
        const venues = await getVenues();
        if (venues && venues.length > 0) {
          setVenue(venues[0]);
        }
      } catch (error) {
        console.error("Failed to fetch preview venue:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPreviewVenue();
  }, []);

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  const handleBack = () => {
    router.push('/landing');
  };

  const handleProceedToPayment = () => {
    router.push('/checkout');
  };

  const handleComparePackages = () => {
    const route = NAVIGATION_ROUTES['package-compare'];
    if (route) {
      router.push(route);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BrandedLoader text="Loading preview..." />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No venues available for preview</p>
      </div>
    );
  }

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="venue-preview" />
      <VenueDetailsPageV2
        venue={venue}
        onBack={handleBack}
        onProceedToPayment={handleProceedToPayment}
        onCompareClick={handleComparePackages}
      />
      <TravelFooter />
    </div>
  );
}
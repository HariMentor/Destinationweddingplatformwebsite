'use client';

import { VenueDetailsPageV2 } from '@/components/VenueDetailsPageV2';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';

export function VenuePreviewClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  const handleBack = () => {
    router.push('/landing');
  };

  const handleProceedToPayment = (bookingData: any) => {
    // Store booking data in sessionStorage for the payment page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    router.push('/payment');
  };

  const handleComparePackages = () => {
    const route = NAVIGATION_ROUTES['package-compare'];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="venue-preview" />
      <VenueDetailsPageV2 
        venueId={1} 
        onBack={handleBack}
        onProceedToPayment={handleProceedToPayment}
        onComparePackages={handleComparePackages}
      />
      <TravelFooter />
    </div>
  );
}
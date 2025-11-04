'use client';

import { ProviderAllVenuesPage } from '@/components/ProviderAllVenuesPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';

export default function ProviderVenuesClient({ providerId }: { providerId: string }) {
  return (
    <>
      <TravelNav />
      <ProviderAllVenuesPage providerId={providerId} />
      <TravelFooter />
    </>
  );
}

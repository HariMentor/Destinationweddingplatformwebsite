'use client';

import { ProviderProfilePage } from '@/components/ProviderProfilePage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';

export default function ProviderProfileClient({ providerId }: { providerId: string }) {
  return (
    <>
      <TravelNav />
      <ProviderProfilePage providerId={providerId} />
      <TravelFooter />
    </>
  );
}

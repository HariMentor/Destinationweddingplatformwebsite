'use client';

import { WeddingProvidersPage } from '@/components/WeddingProvidersPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';

export default function ProvidersPageClient() {
  return (
    <>
      <TravelNav />
      <WeddingProvidersPage />
      <TravelFooter />
    </>
  );
}

'use client';

import { InspirationsPage } from '@/components/InspirationsPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';

export function InspirationsPageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  const handleViewDetail = (inspirationId: number) => {
    router.push(`/inspirations/${inspirationId}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="inspirations" />
      <InspirationsPage onViewDetail={handleViewDetail} />
      <TravelFooter />
    </div>
  );
}

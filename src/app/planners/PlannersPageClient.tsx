'use client';

import { PlannersPage } from '@/components/PlannersPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';

export function PlannersPageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  const handleViewProfile = (plannerId: number) => {
    router.push(`/planners/${plannerId}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="planners" />
      <PlannersPage onViewProfile={handleViewProfile} />
      <TravelFooter />
    </div>
  );
}

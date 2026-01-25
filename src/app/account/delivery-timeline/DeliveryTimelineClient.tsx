'use client';

import { DeliveryTimelinePage } from '@/components/DeliveryTimelinePage';
import { TravelNav } from '@/components/TravelNav';
import { useRouter } from 'next/navigation';

export function DeliveryTimelineClient() {
  const router = useRouter();

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

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="account" />
      <div className="pt-[72px]">
        <DeliveryTimelinePage />
      </div>
    </div>
  );
}

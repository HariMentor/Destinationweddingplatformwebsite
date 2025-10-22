'use client';

import { PlannerProfilePage } from '@/components/PlannerProfilePage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

export function PlannerDetailClient({ plannerId }: { plannerId: string }) {
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

  const handleBack = () => {
    router.push('/planners');
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="planners" />
      <PlannerProfilePage plannerId={parseInt(plannerId)} onBack={handleBack} />
      <TravelFooter />
    </div>
  );
}

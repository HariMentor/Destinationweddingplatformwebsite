'use client';

import { InspirationDetailPage } from '@/components/InspirationDetailPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

export function InspirationDetailClient({ inspirationId }: { inspirationId: string }) {
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
    router.push('/inspirations');
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="inspirations" />
      <InspirationDetailPage inspirationId={parseInt(inspirationId)} onBack={handleBack} />
      <TravelFooter />
    </div>
  );
}

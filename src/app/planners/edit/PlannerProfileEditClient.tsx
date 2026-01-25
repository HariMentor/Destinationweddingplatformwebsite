'use client';

import { PlannerProfileEditPage } from '@/components/PlannerProfileEditPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

export function PlannerProfileEditClient() {
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
    router.push('/account');
  };

  const handlePreview = () => {
    // For now, navigate to the first planner's profile
    // In a real app, this would be the logged-in planner's ID
    router.push('/planners/1');
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="account" />
      <PlannerProfileEditPage 
        plannerId={1} 
        onBack={handleBack}
        onPreview={handlePreview}
      />
      <TravelFooter />
    </div>
  );
}

'use client';

import { VendorProfilePage } from '@/components/VendorProfilePage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

type VendorType = 'photographer' | 'videographer' | 'decorator';

export function VendorDetailClient({ vendorType, vendorId }: { vendorType: string; vendorId: string }) {
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
    router.push(`/vendors?type=${vendorType}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="vendors" />
      <VendorProfilePage 
        vendorType={vendorType as VendorType}
        vendorId={parseInt(vendorId)} 
        onBack={handleBack} 
      />
      <TravelFooter />
    </div>
  );
}

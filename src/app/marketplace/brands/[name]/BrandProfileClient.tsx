'use client';

import { BrandProfilePage } from '@/components/BrandProfilePage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

export function BrandProfileClient({ brandName }: { brandName: string }) {
  const router = useRouter();
  const decodedBrandName = decodeURIComponent(brandName);

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
    router.push('/marketplace');
  };

  const handleViewProduct = (productId: string) => {
    router.push(`/marketplace/products/${productId}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="marketplace" />
      <BrandProfilePage 
        brandName={decodedBrandName}
        onBack={handleBack}
        onViewProduct={handleViewProduct}
      />
      <TravelFooter />
    </div>
  );
}

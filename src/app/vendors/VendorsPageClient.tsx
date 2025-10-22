'use client';

import { VendorsPage } from '@/components/VendorsPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type VendorType = 'photographer' | 'videographer' | 'decorator';

export function VendorsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vendorType, setVendorType] = useState<VendorType>('photographer');

  useEffect(() => {
    const type = searchParams.get('type') as VendorType;
    if (type && ['photographer', 'videographer', 'decorator'].includes(type)) {
      setVendorType(type);
    }
  }, [searchParams]);

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

  const handleViewProfile = (vendorId: number) => {
    router.push(`/vendors/${vendorType}/${vendorId}`);
  };

  const handleChangeVendorType = (type: VendorType) => {
    setVendorType(type);
    router.push(`/vendors?type=${type}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="vendors" />
      <VendorsPage 
        vendorType={vendorType}
        onViewProfile={handleViewProfile}
        onChangeVendorType={handleChangeVendorType}
      />
      <TravelFooter />
    </div>
  );
}

'use client';

import { RegisterPage } from '@/components/RegisterPage';
import { TravelNav } from '@/components/TravelNav';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';

export default function RegisterPageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  return (
    <>
      <TravelNav onNavigate={handleNavigate} currentPage="register" />
      <RegisterPage onNavigate={handleNavigate} />
    </>
  );
}

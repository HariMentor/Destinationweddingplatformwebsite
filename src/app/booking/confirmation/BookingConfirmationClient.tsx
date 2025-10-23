"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { BookingConfirmationPage } from '../../../components/BookingConfirmationPage';

export default function BookingConfirmationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingType = searchParams.get('type') as 'venue' | 'planner' | 'vendor' | 'product' | 'tour' | 'flight' || 'venue';

  const handleBack = () => {
    router.back();
  };

  return (
    <BookingConfirmationPage 
      onBack={handleBack}
      bookingType={bookingType}
    />
  );
}

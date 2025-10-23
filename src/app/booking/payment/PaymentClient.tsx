"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { PaymentPage } from '../../../components/PaymentPage';

export default function PaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingType = searchParams.get('type') as 'venue' | 'planner' | 'vendor' | 'product' | 'tour' | 'flight' || 'venue';

  const handleBack = () => {
    router.back();
  };

  const handlePaymentComplete = () => {
    router.push(`/booking/confirmation?type=${bookingType}`);
  };

  return (
    <PaymentPage 
      onBack={handleBack}
      onPaymentComplete={handlePaymentComplete}
      bookingType={bookingType}
    />
  );
}

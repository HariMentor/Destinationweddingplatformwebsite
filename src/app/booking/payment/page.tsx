import { Suspense } from 'react';
import PaymentClient from './PaymentClient';

export const metadata = {
  title: 'Secure Payment - Wedzway',
  description: 'Complete your booking payment',
};

function PaymentLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#DF6951] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading payment form...</p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentClient />
    </Suspense>
  );
}

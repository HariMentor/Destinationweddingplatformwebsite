import { Suspense } from 'react';
import BookingConfirmationClient from './BookingConfirmationClient';

export const metadata = {
  title: 'Booking Confirmation - Wedzway',
  description: 'Your booking has been confirmed',
};

function BookingConfirmationLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#DF6951] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading confirmation...</p>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<BookingConfirmationLoading />}>
      <BookingConfirmationClient />
    </Suspense>
  );
}

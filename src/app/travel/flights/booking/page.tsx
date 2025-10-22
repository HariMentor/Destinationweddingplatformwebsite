import type { Metadata } from 'next';
import { FlightBookingClient } from './FlightBookingClient';

export const metadata: Metadata = {
  title: 'Flight Booking - Complete Your Reservation | Wedzway',
  description: 'Complete your flight booking for your destination wedding. Enter passenger details and payment information.',
  keywords: ['flight booking', 'wedding flights', 'group flight booking', 'destination wedding travel'],
  openGraph: {
    title: 'Flight Booking | Wedzway',
    description: 'Complete your flight booking for your destination wedding.',
    type: 'website',
  },
};

export default function FlightBookingPage() {
  return <FlightBookingClient />;
}

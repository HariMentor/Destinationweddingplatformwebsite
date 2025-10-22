import type { Metadata } from 'next';
import { TourDetailClient } from './TourDetailClient';

type Props = {
  params: { id: string };
};

const tourNames: Record<string, string> = {
  '1': 'City Palace & Cultural Heritage Tour - Udaipur',
  '2': 'Sunrise Taj Mahal Experience - Agra',
  '3': 'Old Goa Churches & Portuguese Heritage',
  '4': 'Kerala Backwaters Sunset Cruise',
  '5': 'Jaipur Royal Palaces & Forts Tour',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tourName = tourNames[params.id] || 'Destination Tour';
  
  return {
    title: `${tourName} | Wedzway`,
    description: `Book the ${tourName} for your wedding guests. Includes itinerary, pricing, duration, and what's included. Perfect for destination wedding activities.`,
    keywords: [tourName, 'wedding tour', 'destination activity', 'guest experience'],
    openGraph: {
      title: `${tourName} | Wedzway`,
      description: `Book this tour for your wedding guests.`,
      type: 'website',
    },
  };
}

export default function TourDetailPage({ params }: Props) {
  return <TourDetailClient tourId={params.id} />;
}

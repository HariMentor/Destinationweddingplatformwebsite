import type { Metadata } from 'next';
import { VenueDetailClient } from './VenueDetailClient';

type Props = {
  params: Promise<{ id: string }>;
};

const venueNames: Record<string, string> = {
  '1': 'The Taj Lake Palace, Udaipur',
  '2': 'Umaid Bhawan Palace, Jodhpur',
  '3': 'The Leela Palace, Jaipur',
  '4': 'Alila Fort Bishangarh',
  '5': 'Villa Cimbrone, Amalfi Coast',
  '6': 'Borgo Egnazia, Puglia',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const venueName = venueNames[id] || 'Wedding Venue';

  return {
    title: `${venueName} - Destination Wedding Venue | Wedzway`,
    description: `Plan your dream wedding at ${venueName}. Explore photos, amenities, capacity, and book verified wedding planners and services.`,
    keywords: [`${venueName}`, 'destination wedding venue', 'luxury wedding venue', 'wedding planning'],
    openGraph: {
      title: `${venueName} | Wedzway`,
      description: `Plan your dream wedding at ${venueName}.`,
      type: 'website',
    },
  };
}

export default async function VenueDetailPage({ params }: Props) {
  const { id } = await params;
  return <VenueDetailClient venueId={id} />;
}

import type { Metadata } from 'next';
import { PublicWeddingClient } from './PublicWeddingClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, fetch wedding data from database
  const weddingId = params.id;
  
  return {
    title: 'You\'re Invited! Wedding Invitation | Wedzway',
    description: 'Join us in celebrating our special day. View wedding details, RSVP, travel information, and registry.',
    keywords: ['wedding invitation', 'destination wedding', 'RSVP', 'wedding details'],
    openGraph: {
      title: 'You\'re Invited! Wedding Celebration',
      description: 'Join us in celebrating our special day.',
      type: 'website',
    },
    robots: {
      index: false, // Don't index personal wedding pages
      follow: false,
    },
  };
}

export default function PublicWeddingPage({ params }: Props) {
  return <PublicWeddingClient weddingId={params.id} />;
}

import type { Metadata } from 'next';
import { TourismBoardClient } from './TourismBoardClient';

type Props = {
  params: { id: string; name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const boardName = decodeURIComponent(params.name);
  
  return {
    title: `${boardName} - Official Tourism Board | Wedzway`,
    description: `Explore ${boardName} destination guide. Discover exclusive offers, tours, attractions, museum bookings, and local experiences for your destination wedding.`,
    keywords: [boardName, 'tourism board', 'destination guide', 'local tours', 'attractions', 'destination wedding'],
    openGraph: {
      title: `${boardName} | Wedzway`,
      description: `Official tourism board profile with exclusive offers and local experiences.`,
      type: 'website',
    },
  };
}

export default function TourismBoardPage({ params }: Props) {
  return <TourismBoardClient destinationId={params.id} boardName={params.name} />;
}

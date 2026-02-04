import type { Metadata } from 'next';
import { DestinationDetailClient } from './DestinationDetailClient';

type Props = {
  params: Promise<{ id: string }>;
};

// This would typically fetch data from an API or database
const destinationNames: Record<string, string> = {
  '1': 'Udaipur, India',
  '2': 'Jaipur, India',
  '3': 'Goa, India',
  '4': 'Kerala, India',
  '5': 'Florence, Italy',
  '6': 'Santorini, Greece',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const destinationName = destinationNames[id] || 'Destination';

  return {
    title: `${destinationName} Wedding Venues | Wedzway`,
    description: `Discover stunning wedding venues and services in ${destinationName}. Find planners, venues, photographers, and all wedding vendors.`,
    keywords: [`${destinationName} weddings`, 'destination wedding', 'wedding venues', 'wedding planners'],
    openGraph: {
      title: `${destinationName} Wedding Venues | Wedzway`,
      description: `Discover stunning wedding venues and services in ${destinationName}.`,
      type: 'website',
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { id } = await params;
  return <DestinationDetailClient destinationId={id} />;
}

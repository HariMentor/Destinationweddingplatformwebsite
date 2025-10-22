import type { Metadata } from 'next';
import { PlannerDetailClient } from './PlannerDetailClient';

type Props = {
  params: { id: string };
};

const plannerNames: Record<string, string> = {
  '1': 'Elegant Affairs by Priya',
  '2': 'Royal Weddings India',
  '3': 'Destination Dreams',
  '4': 'Mediterranean Moments',
  '5': 'Luxury Wedding Collective',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const plannerName = plannerNames[params.id] || 'Wedding Planner';
  
  return {
    title: `${plannerName} - Verified Wedding Planner | Wedzway`,
    description: `Book ${plannerName} for your destination wedding. View portfolio, reviews, packages, and verified credentials. Expert wedding planning services.`,
    keywords: [`${plannerName}`, 'wedding planner', 'destination wedding coordinator', 'verified wedding planner'],
    openGraph: {
      title: `${plannerName} | Wedzway`,
      description: `Book ${plannerName} for your destination wedding.`,
      type: 'profile',
    },
  };
}

export default function PlannerDetailPage({ params }: Props) {
  return <PlannerDetailClient plannerId={params.id} />;
}

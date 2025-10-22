import type { Metadata } from 'next';
import { InspirationDetailClient } from './InspirationDetailClient';

type Props = {
  params: { id: string };
};

const inspirationTitles: Record<string, string> = {
  '1': 'Royal Palace Wedding in Udaipur',
  '2': 'Beach Wedding in Goa',
  '3': 'Vineyard Wedding in Tuscany',
  '4': 'Mountain Resort Wedding in Kerala',
  '5': 'Desert Wedding in Jaisalmer',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = inspirationTitles[params.id] || 'Wedding Inspiration';
  
  return {
    title: `${title} - Real Wedding Story | Wedzway`,
    description: `Explore this beautiful ${title.toLowerCase()}. Get inspired by real wedding photos, vendor recommendations, budget breakdown, and planning tips.`,
    keywords: [title, 'real wedding', 'wedding inspiration', 'destination wedding story'],
    openGraph: {
      title: `${title} | Wedzway`,
      description: `Explore this beautiful ${title.toLowerCase()}.`,
      type: 'article',
    },
  };
}

export default function InspirationDetailPage({ params }: Props) {
  return <InspirationDetailClient inspirationId={params.id} />;
}

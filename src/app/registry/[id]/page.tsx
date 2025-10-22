import type { Metadata } from 'next';
import { PublicRegistryClient } from './PublicRegistryClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, fetch registry data from database
  const registryId = params.id;
  
  return {
    title: 'Wedding Gift Registry | Wedzway',
    description: 'Browse our wedding gift registry and help us celebrate our special day with a meaningful gift.',
    keywords: ['wedding registry', 'gift registry', 'wedding gifts', 'bridal registry'],
    openGraph: {
      title: 'Wedding Gift Registry',
      description: 'Browse our wedding gift registry.',
      type: 'website',
    },
    robots: {
      index: false, // Don't index personal registry pages
      follow: false,
    },
  };
}

export default function PublicRegistryPage({ params }: Props) {
  return <PublicRegistryClient registryId={params.id} />;
}

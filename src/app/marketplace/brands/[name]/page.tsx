import type { Metadata } from 'next';
import { BrandProfileClient } from './BrandProfileClient';

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brandName = decodeURIComponent(params.name);
  
  return {
    title: `${brandName} - Verified Brand Profile | Wedzway Marketplace`,
    description: `Shop ${brandName} wedding collection. Browse verified products, read reviews, and explore their complete catalog on Wedzway.`,
    keywords: [brandName, 'wedding brand', 'bridal brand', 'verified brand', 'wedding shopping'],
    openGraph: {
      title: `${brandName} | Wedzway Marketplace`,
      description: `Shop ${brandName} wedding collection on Wedzway.`,
      type: 'website',
    },
  };
}

export default function BrandProfilePage({ params }: Props) {
  return <BrandProfileClient brandName={params.name} />;
}

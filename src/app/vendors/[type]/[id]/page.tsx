import type { Metadata } from 'next';
import { VendorDetailClient } from './VendorDetailClient';

type Props = {
  params: { type: string; id: string };
};

const vendorTypeNames: Record<string, string> = {
  'photographer': 'Photographer',
  'videographer': 'Videographer',
  'decorator': 'Decorator',
};

const vendorNames: Record<string, Record<string, string>> = {
  'photographer': {
    '1': 'Capture Moments Studio',
    '2': 'Royal Photography Co.',
    '3': 'Eternal Frames',
  },
  'videographer': {
    '1': 'Wedding Films Pro',
    '2': 'Cinematic Dreams',
    '3': 'Love Stories Media',
  },
  'decorator': {
    '1': 'Floral Fantasy Decor',
    '2': 'Royal Events & Decor',
    '3': 'Dream Weddings Design',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vendorTypeName = vendorTypeNames[params.type] || 'Vendor';
  const vendorName = vendorNames[params.type]?.[params.id] || `Wedding ${vendorTypeName}`;
  
  return {
    title: `${vendorName} - ${vendorTypeName} | Wedzway`,
    description: `Book ${vendorName} for your destination wedding. View portfolio, pricing, reviews, and verified credentials. Expert ${vendorTypeName.toLowerCase()} services.`,
    keywords: [`${vendorName}`, `wedding ${params.type}`, 'destination wedding', 'verified vendor'],
    openGraph: {
      title: `${vendorName} | Wedzway`,
      description: `Book ${vendorName} for your destination wedding.`,
      type: 'profile',
    },
  };
}

export default function VendorDetailPage({ params }: Props) {
  return <VendorDetailClient vendorType={params.type} vendorId={params.id} />;
}

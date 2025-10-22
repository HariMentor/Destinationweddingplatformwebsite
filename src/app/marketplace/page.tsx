import type { Metadata } from 'next';
import { MarketplacePageClient } from './MarketplacePageClient';

export const metadata: Metadata = {
  title: 'Wedding Marketplace - Shop Dresses, Decor & More | Wedzway',
  description: 'Browse our curated wedding marketplace featuring bridal wear, groom attire, decorations, jewelry, and accessories from top brands worldwide.',
  keywords: ['wedding marketplace', 'bridal wear', 'wedding dresses', 'wedding decor', 'groom attire', 'wedding shopping'],
  openGraph: {
    title: 'Wedding Marketplace | Wedzway',
    description: 'Shop wedding dresses, decor, jewelry and more from verified brands.',
    type: 'website',
  },
};

export default function MarketplacePage() {
  return <MarketplacePageClient />;
}

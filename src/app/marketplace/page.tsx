import type { Metadata } from 'next';
import { marketplaceMetadata } from '@/lib/metadata';
import { MarketplacePageClient } from './MarketplacePageClient';

export const metadata: Metadata = marketplaceMetadata;

export default function MarketplacePage() {
  return <MarketplacePageClient />;
}

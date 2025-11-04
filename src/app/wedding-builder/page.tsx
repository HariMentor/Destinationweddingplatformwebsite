import type { Metadata } from 'next';
import { weddingBuilderMetadata } from '@/lib/metadata';
import { WeddingBuilderClient } from './WeddingBuilderClient';

export const metadata: Metadata = weddingBuilderMetadata;

export default function WeddingBuilderPage() {
  return <WeddingBuilderClient />;
}

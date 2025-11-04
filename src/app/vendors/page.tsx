import type { Metadata } from 'next';
import { vendorsMetadata } from '@/lib/metadata';
import { VendorsPageClient } from './VendorsPageClient';

export const metadata: Metadata = vendorsMetadata;

export default function VendorsPage() {
  return <VendorsPageClient />;
}

import type { Metadata } from 'next';
import { inspirationsMetadata } from '@/lib/metadata';
import { InspirationsPageClient } from './InspirationsPageClient';

export const metadata: Metadata = inspirationsMetadata;

export default function InspirationsPage() {
  return <InspirationsPageClient />;
}

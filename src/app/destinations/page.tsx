import type { Metadata } from 'next';
import { destinationsMetadata } from '@/lib/metadata';
import { DestinationsPageClient } from './DestinationsPageClient';

export const metadata: Metadata = destinationsMetadata;

export default function DestinationsPage() {
  return <DestinationsPageClient />;
}

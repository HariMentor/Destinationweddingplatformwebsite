import type { Metadata } from 'next';
import { conciergeMetadata } from '@/lib/metadata';
import ConciergePageClient from './ConciergePageClient';

export const metadata: Metadata = conciergeMetadata;

export default function ConciergePage() {
  return <ConciergePageClient />;
}

import type { Metadata } from 'next';
import { toursMetadata } from '@/lib/metadata';
import { ToursPageClient } from './ToursPageClient';

export const metadata: Metadata = toursMetadata;

export default function ToursPage() {
  return <ToursPageClient />;
}

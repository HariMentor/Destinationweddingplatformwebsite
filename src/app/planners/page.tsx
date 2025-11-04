import type { Metadata } from 'next';
import { plannersMetadata } from '@/lib/metadata';
import { PlannersPageClient } from './PlannersPageClient';

export const metadata: Metadata = plannersMetadata;

export default function PlannersPage() {
  return <PlannersPageClient />;
}

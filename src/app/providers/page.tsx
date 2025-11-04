import type { Metadata } from 'next';
import { providersMetadata } from '@/lib/metadata';
import ProvidersPageClient from './ProvidersPageClient';

export const metadata: Metadata = providersMetadata;

export default function ProvidersPage() {
  return <ProvidersPageClient />;
}

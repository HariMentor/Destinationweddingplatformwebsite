import type { Metadata } from 'next';
import { visaServicesMetadata } from '@/lib/metadata';
import { VisaPageClient } from './VisaPageClient';

export const metadata: Metadata = visaServicesMetadata;

export default function VisaServicesPage() {
  return <VisaPageClient />;
}

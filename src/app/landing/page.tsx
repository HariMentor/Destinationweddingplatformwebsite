import type { Metadata } from 'next';
import { landingMetadata } from '@/lib/metadata';
import LandingPageClient from './LandingPageClient';

export const metadata: Metadata = landingMetadata;

export default function Landing() {
  return <LandingPageClient />;
}

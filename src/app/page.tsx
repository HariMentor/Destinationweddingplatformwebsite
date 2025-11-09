import type { Metadata } from 'next';
import { homeMetadata } from '@/lib/metadata';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return <HomePageClient />;
}

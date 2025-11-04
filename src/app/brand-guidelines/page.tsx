import type { Metadata } from 'next';
import { brandGuidelinesMetadata } from '@/lib/metadata';
import BrandGuidelinesClient from './BrandGuidelinesClient';

export const metadata: Metadata = brandGuidelinesMetadata;

export default function BrandGuidelinesRoute() {
  return <BrandGuidelinesClient />;
}

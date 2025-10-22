import type { Metadata } from 'next';
import { WeddingBuilderClient } from './WeddingBuilderClient';

export const metadata: Metadata = {
  title: 'Wedding Builder - Create Your Wedding Website & Invitations | Wedzway',
  description: 'Build your custom wedding website with our drag-and-drop builder. Create beautiful invitations, manage RSVPs, and share your love story.',
  keywords: ['wedding website builder', 'wedding invitations', 'RSVP management', 'custom wedding website', 'wedding planning tools'],
  openGraph: {
    title: 'Wedding Builder | Wedzway',
    description: 'Build your custom wedding website and invitations.',
    type: 'website',
  },
};

export default function WeddingBuilderPage() {
  return <WeddingBuilderClient />;
}

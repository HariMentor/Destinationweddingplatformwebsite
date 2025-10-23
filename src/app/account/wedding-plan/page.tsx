import type { Metadata } from 'next';
import WeddingPlanPageClient from "./WeddingPlanPageClient";

export const metadata: Metadata = {
  title: 'Wedding Plan - Printable View | Wedzway',
  description: 'View and print your complete wedding plan including venues, vendors, timeline, budget, and guest list.',
  keywords: ['wedding plan', 'wedding details', 'printable wedding plan', 'wedding overview'],
  openGraph: {
    title: 'Wedding Plan | Wedzway',
    description: 'View and print your complete wedding plan.',
    type: 'website',
  },
};

export default function WeddingPlanPage() {
  return <WeddingPlanPageClient />;
}

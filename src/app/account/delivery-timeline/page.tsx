import type { Metadata } from 'next';
import { DeliveryTimelineClient } from './DeliveryTimelineClient';

export const metadata: Metadata = {
  title: 'Delivery Timeline - Development Roadmap | Wedzway',
  description: 'Comprehensive development timeline for Wedzway destination wedding platform featuring all features, phases, and delivery dates.',
  keywords: ['development timeline', 'project roadmap', 'delivery schedule', 'wedzway timeline'],
  openGraph: {
    title: 'Delivery Timeline | Wedzway',
    description: 'Comprehensive development timeline for Wedzway platform.',
    type: 'website',
  },
};

export default function DeliveryTimelinePage() {
  return <DeliveryTimelineClient />;
}

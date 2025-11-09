import type { Metadata } from 'next';
import { VenuePreviewClient } from './VenuePreviewClient';

export const metadata: Metadata = {
  title: 'Venue Details Preview - Wedzway',
  description: 'Preview comprehensive venue details, packages, amenities, and booking options for your destination wedding.',
};

export default function VenuePreviewPage() {
  return <VenuePreviewClient />;
}

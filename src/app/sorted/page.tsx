import type { Metadata } from 'next';
import SortedPageClient from './SortedPageClient';

export const metadata: Metadata = {
  title: 'Sorted by Wedzway - Complete Wedding Planning Platform',
  description: 'Discover how Wedzway revolutionizes destination wedding planning with our comprehensive platform connecting couples with verified planners, venues, and vendors globally.',
};

export default function SortedPage() {
  return <SortedPageClient />;
}

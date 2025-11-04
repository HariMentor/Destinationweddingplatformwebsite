import type { Metadata } from 'next';
import { BlogPageClient } from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Wedding Planning Blog | Wedzway',
  description: 'Expert destination wedding planning advice, tips, and inspiration. Learn about venues, budgeting, planning, and more from wedding experts.',
  keywords: ['wedding blog', 'destination wedding tips', 'wedding planning', 'wedding advice', 'wedding guide'],
  openGraph: {
    title: 'Wedding Planning Blog | Wedzway',
    description: 'Expert destination wedding planning advice, tips, and inspiration.',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}

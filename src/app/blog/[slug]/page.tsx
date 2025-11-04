import type { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';

export const metadata: Metadata = {
  title: 'Blog Post | Wedzway',
  description: 'Read expert wedding planning advice and destination wedding tips.',
};

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BlogDetailClient slug={params.slug} />;
}

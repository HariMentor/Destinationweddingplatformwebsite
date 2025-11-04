'use client';

import { BlogPage } from '@/components/BlogPage';
import { TravelNav } from '@/components/TravelNav';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';

export default function BlogPageClient() {
  const router = useRouter();

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <>
      <TravelNav />
      <BlogPage onPostClick={handlePostClick} />
      <TravelFooter />
    </>
  );
}

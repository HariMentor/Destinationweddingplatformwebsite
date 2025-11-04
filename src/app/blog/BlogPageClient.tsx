"use client";

import { useRouter } from "next/navigation";
import { BlogPage } from "../../components/BlogPage";
import { TravelNav } from "../../components/TravelNav";
import { TravelFooter } from "../../components/TravelFooter";

export function BlogPageClient() {
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

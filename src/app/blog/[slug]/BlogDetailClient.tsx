"use client";

import { useRouter } from "next/navigation";
import { BlogDetailPage } from "../../../components/BlogDetailPage";
import { TravelNav } from "../../../components/TravelNav";
import { TravelFooter } from "../../../components/TravelFooter";

export function BlogDetailClient({ slug }: { slug: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/blog");
  };

  const handlePostClick = (newSlug: string) => {
    router.push(`/blog/${newSlug}`);
  };

  return (
    <>
      <TravelNav />
      <BlogDetailPage
        slug={slug}
        onBack={handleBack}
        onPostClick={handlePostClick}
      />
      <TravelFooter />
    </>
  );
}

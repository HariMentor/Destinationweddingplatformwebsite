import type { Metadata } from "next";
import { blogMetadata } from "@/lib/metadata";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = blogMetadata;

export default function BlogPage() {
  return <BlogPageClient />;
}

import type { Metadata } from "next";
import PackageCompareClient from "./PackageCompareClient";
import { generatePageMetadata } from "../../../lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Compare Wedding Packages",
  description:
    "Compare wedding packages side by side. Evaluate pricing, inclusions, guest capacity, and amenities to find the perfect package for your dream wedding.",
  keywords: [
    "compare wedding packages",
    "wedding package comparison",
    "wedding pricing comparison",
    "best wedding packages",
    "wedding venue packages",
  ],
  path: "/packages/compare",
});

export default function PackageComparePage() {
  return <PackageCompareClient />;
}

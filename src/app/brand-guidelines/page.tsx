"use client";

import { BrandGuidelinesPage } from "@/components/BrandGuidelinesPage";
import { useRouter } from "next/navigation";

export default function BrandGuidelinesRoute() {
  const router = useRouter();

  return (
    <BrandGuidelinesPage
      onBack={() => router.push("/")}
    />
  );
}

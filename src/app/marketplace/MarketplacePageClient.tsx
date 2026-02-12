"use client";

import { MarketplacePage } from "@/components/MarketplacePage";
import { TravelNav } from "@/components/TravelNav";
import { TravelFooter } from "@/components/TravelFooter";
import { useRouter } from "next/navigation";

export function MarketplacePageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const routeMap: Record<string, string> = {
      landing: "/landing",
      venues: "/venues",
      destinations: "/destinations",
      inspirations: "/inspirations",
      planners: "/planners",
      vendors: "/vendors",
      tours: "/tours",
      "visa-services": "/travel/visa",
      builder: "/wedding-builder",
      expenses: "/expenses",
      marketplace: "/marketplace",
      account: "/account",
      home: "/",
    };

    const route = routeMap[page];
    if (route) {
      router.push(route);
    }
  };

  const handleViewProductDetail = (productId: string) => {
    router.push(`/marketplace/products/${productId}`);
  };

  const handleViewBrandProfile = (brandName: string) => {
    router.push(`/marketplace/brands/${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="marketplace" />
      <MarketplacePage
        onBack={() => router.back()}
        onViewProduct={handleViewProductDetail}
        onViewBrand={handleViewBrandProfile}
      />
      <TravelFooter />
    </div>
  );
}

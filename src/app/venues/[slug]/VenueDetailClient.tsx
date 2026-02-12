"use client";

import { useState, useEffect } from "react";
import { TravelNav } from "@/components/TravelNav";
import { TravelFooter } from "@/components/TravelFooter";
import { useRouter } from "next/navigation";
import { VenueDetailsPageV2 } from "@/components/VenueDetailsPageV2";
import {
  getVenueBySlug,
  Venue,
} from "@/components/DestinationServices/services/venueService";

export function VenueDetailClient({ venueId }: { venueId: string }) {
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVenue() {
      try {
        setIsLoading(true);
        const data = await getVenueBySlug(venueId);
        setVenue(data || null);
      } catch (error) {
        console.error("Failed to fetch venue:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVenue();
  }, [venueId]);

  const handleBack = () => {
    router.back();
  };

  const handleNavigate = (page: string) => {
    // Map page names to absolute paths to avoid relative path issues
    const routeMap: Record<string, string> = {
      home: "/",
      destinations: "/destinations",
      sorted: "/sorted",
      venues: "/venues",
      vendors: "/vendors",
      planners: "/planners",
      tours: "/tours",
      "visa-services": "/travel/visa",
      inspirations: "/inspirations",
      blog: "/blog",
      marketplace: "/marketplace",
      concierge: "/concierge",
      providers: "/providers",
      builder: "/wedding-builder",
      expenses: "/expenses",
      account: "/account",
      auth: "/auth",
      register: "/register",
      landing: "/landing",
    };

    const path = routeMap[page] || page;
    router.push(path);
  };

  const handleProceedToPayment = () => {
    router.push("/checkout");
  };

  const handleCompareClick = () => {
    // Scroll to compare section or open compare modal
    const compareSection = document.getElementById("compare-section");
    if (compareSection) {
      compareSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!venue && isLoading) {
    return (
      <div className="size-full">
        {/* <TravelNav onNavigate={handleNavigate} currentPage="venues" /> */}
      </div>
    );
  }

  if (!venue && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Venue not found</p>
      </div>
    );
  }

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="venues" />
      <VenueDetailsPageV2
        venue={venue}
        onBack={handleBack}
        onProceedToPayment={handleProceedToPayment}
        onCompareClick={handleCompareClick}
      />
      <TravelFooter />
    </div>
  );
}

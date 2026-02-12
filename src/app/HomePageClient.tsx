"use client";

import { TravelNav } from "@/components/TravelNav";
import { TravelHero } from "@/components/TravelHero";
import { TravelProblem } from "@/components/TravelProblem";
import { TravelSolution } from "@/components/TravelSolution";
import { TravelMarket } from "@/components/TravelMarket";
import { TravelFeatures } from "@/components/TravelFeatures";
import { TravelBusiness } from "@/components/TravelBusiness";
import { TravelEdge } from "@/components/TravelEdge";
import { TravelMVP } from "@/components/TravelMVP";
import { TravelFeatureRollout } from "@/components/TravelFeatureRollout";
import { TravelDemographics } from "@/components/TravelDemographics";
import { TravelDestinationLocations } from "@/components/TravelDestinationLocations";
import { TravelFinancials } from "@/components/TravelFinancials";
import { TravelRoadmap } from "@/components/TravelRoadmap";
import { TravelTeam } from "@/components/TravelTeam";
import { TravelCTA } from "@/components/TravelCTA";
import { TravelFooter } from "@/components/TravelFooter";
import { useRouter } from "next/navigation";
import { NAVIGATION_ROUTES } from "@/lib/navigation";
import { HomePage } from "@/components/HomePage";

export default function HomePageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="home" />
      <HomePage />
      <TravelFooter />
    </div>
  );
}

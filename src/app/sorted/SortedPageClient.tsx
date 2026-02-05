'use client';

import { TravelNav } from '@/components/TravelNav';
import { TravelHero } from '@/components/TravelHero';
import { TravelProblem } from '@/components/TravelProblem';
import { TravelSolution } from '@/components/TravelSolution';
import { TravelMarket } from '@/components/TravelMarket';
import { TravelFeatures } from '@/components/TravelFeatures';
import { TravelBusiness } from '@/components/TravelBusiness';
import { TravelEdge } from '@/components/TravelEdge';
import { TravelMVP } from '@/components/TravelMVP';
import { TravelFeatureRollout } from '@/components/TravelFeatureRollout';
import { TravelDemographics } from '@/components/TravelDemographics';
import { TravelDestinationLocations } from '@/components/TravelDestinationLocations';
import { TravelFinancials } from '@/components/TravelFinancials';
import { TravelRoadmap } from '@/components/TravelRoadmap';
import { TravelTeam } from '@/components/TravelTeam';
import { TravelCTA } from '@/components/TravelCTA';
import { TravelFooter } from '@/components/TravelFooter';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/lib/navigation';
import { SortedByWedzwayPage } from '@/components/SortedByWedzwayPage';

export default function SortedPageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = NAVIGATION_ROUTES[page];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="sorted" />
      {/* <TravelHero />
      <TravelProblem />
      <TravelSolution />
      <TravelMarket />
      <TravelFeatures />
      <TravelBusiness />
      <TravelEdge />
      <TravelMVP />
      <TravelFeatureRollout />
      <TravelDemographics />
      <TravelDestinationLocations />
      <TravelFinancials />
      <TravelRoadmap />
      <TravelTeam />
      <TravelCTA /> */}
      <SortedByWedzwayPage />
      <TravelFooter />
    </div>
  );
}
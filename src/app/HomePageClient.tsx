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

export default function HomePageClient() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    // Map old state-based navigation to Next.js routes
    const routeMap: Record<string, string> = {
      'landing': '/landing',
      'venues': '/venues',
      'destinations': '/destinations',
      'inspirations': '/inspirations',
      'planners': '/planners',
      'vendors': '/vendors',
      'tours': '/tours',
      'visa-services': '/travel/visa',
      'builder': '/wedding-builder',
      'expenses': '/expenses',
      'marketplace': '/marketplace',
      'account': '/account',
      'concierge': '/concierge',
      'providers': '/providers',
      'blog': '/blog',
      'home': '/',
    };

    const route = routeMap[page];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="size-full">
      <TravelNav onNavigate={handleNavigate} currentPage="home" />
      <TravelHero />
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
      <TravelCTA />
      <TravelFooter />
    </div>
  );
}

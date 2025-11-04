import type { Metadata } from 'next';
import { homeMetadata } from '@/lib/metadata';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return <HomePageClient />;
}
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

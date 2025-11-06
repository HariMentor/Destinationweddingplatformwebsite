import { useState } from "react";
import { AccessGate } from "./components/AccessGate";
import { CurrencyProvider } from "./components/CurrencyContext";
import { PackageCompareProvider } from "./components/PackageCompareContext";
import { TravelNav } from "./components/TravelNav";
import { TravelHero } from "./components/TravelHero";
import { TravelProblem } from "./components/TravelProblem";
import { TravelSolution } from "./components/TravelSolution";
import { TravelMarket } from "./components/TravelMarket";
import { TravelFeatures } from "./components/TravelFeatures";
import { TravelBusiness } from "./components/TravelBusiness";
import { TravelEdge } from "./components/TravelEdge";
import { TravelMVP } from "./components/TravelMVP";
import { TravelFeatureRollout } from "./components/TravelFeatureRollout";
import { TravelDemographics } from "./components/TravelDemographics";
import { TravelDestinationLocations } from "./components/TravelDestinationLocations";
import { TravelFinancials } from "./components/TravelFinancials";
import { TravelRoadmap } from "./components/TravelRoadmap";
import { TravelTeam } from "./components/TravelTeam";
import { TravelCTA } from "./components/TravelCTA";
import { TravelFooter } from "./components/TravelFooter";
import { VenuePage } from "./components/VenuePage";
import { VenueDetailsPage } from "./components/VenueDetailsPage";
import { VenueDetailsPageV2 } from "./components/VenueDetailsPageV2";
import { DestinationsPage } from "./components/DestinationsPage";
import { DestinationDetailsPage } from "./components/DestinationDetailsPage";
import { InspirationsPage } from "./components/InspirationsPage";
import { InspirationDetailPage } from "./components/InspirationDetailPage";
import { PlannersPage } from "./components/PlannersPage";
import { PlannerProfilePage } from "./components/PlannerProfilePage";
import { VendorsPage } from "./components/VendorsPage";
import { VendorProfilePage } from "./components/VendorProfilePage";
import { WeddingBuilderPage } from "./components/WeddingBuilderPage";
import { LandingPage } from "./components/LandingPage";
import { ToursPage } from "./components/ToursPage";
import { TourDetailPage } from "./components/TourDetailPage";
import { VisaFlightsPage } from "./components/VisaFlightsPage";
import { VisaRequestPage } from "./components/VisaRequestPage";
import { FlightBookingPage } from "./components/FlightBookingPage";
import { ExpensesPage } from "./components/ExpensesPage";
import { MarketplacePage } from "./components/MarketplacePage";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { BrandProfilePage } from "./components/BrandProfilePage";
import { TourismBoardProfilePage } from "./components/TourismBoardProfilePage";
import { CustomerAccountPage } from "./components/CustomerAccountPage";
import { ConciergePage } from "./components/ConciergePage";
import { PaymentPage } from "./components/PaymentPage";
import { BookingConfirmationPage } from "./components/BookingConfirmationPage";
import { EmailTemplatesPage } from "./components/EmailTemplatesPage";
import { VenueBrochurePage } from "./components/VenueBrochurePage";
import { WeddingProvidersPage } from "./components/WeddingProvidersPage";
import { ProviderProfilePage } from "./components/ProviderProfilePage";
import { BrandGuidelinesPage } from "./components/BrandGuidelinesPage";
import { BlogPage } from "./components/BlogPage";
import { BlogDetailPage } from "./components/BlogDetailPage";
import { PackageComparePage } from "./components/PackageComparePage";
import { Toaster } from "./components/ui/sonner";

type VendorType = 'photographer' | 'videographer' | 'decorator';
type PageType = 'home' | 'landing' | 'venues' | 'venue-details' | 'venue-preview' | 'destinations' | 'destination-details' | 'inspirations' | 'inspiration-detail' | 'planners' | 'planner-profile' | 'vendors' | 'vendor-profile' | 'tours' | 'tour-details' | 'visa-services' | 'visa-request' | 'flight-booking' | 'builder' | 'expenses' | 'marketplace' | 'product-detail' | 'brand-profile' | 'tourism-board' | 'account' | 'concierge' | 'payment' | 'booking-confirmation' | 'email-templates' | 'venue-brochure' | 'providers' | 'provider-profile' | 'brand-guidelines' | 'blog' | 'blog-detail' | 'package-compare';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
  const [selectedInspirationId, setSelectedInspirationId] = useState<number | null>(null);
  const [selectedPlannerId, setSelectedPlannerId] = useState<number | null>(null);
  const [vendorType, setVendorType] = useState<VendorType>('photographer');
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [flightBookingData, setFlightBookingData] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>(null);
  const [selectedTourismBoard, setSelectedTourismBoard] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  const handleViewVenueDetails = (venueId: number) => {
    setSelectedVenueId(venueId);
    setCurrentPage('venue-details');
  };

  const handleViewDestinationDetails = (destinationId: number) => {
    setSelectedDestinationId(destinationId);
    setCurrentPage('destination-details');
  };

  const handleViewInspirationDetail = (inspirationId: number) => {
    setSelectedInspirationId(inspirationId);
    setCurrentPage('inspiration-detail');
  };

  const handleViewPlannerProfile = (plannerId: number) => {
    setSelectedPlannerId(plannerId);
    setCurrentPage('planner-profile');
  };

  const handleBackToVenues = () => {
    setCurrentPage('venues');
    setSelectedVenueId(null);
  };

  const handleBackToDestinations = () => {
    setCurrentPage('destinations');
    setSelectedDestinationId(null);
  };

  const handleBackToInspirations = () => {
    setCurrentPage('inspirations');
    setSelectedInspirationId(null);
  };

  const handleBackToPlanners = () => {
    setCurrentPage('planners');
    setSelectedPlannerId(null);
  };

  const handleViewVendorProfile = (vendorId: number) => {
    setSelectedVendorId(vendorId);
    setCurrentPage('vendor-profile');
  };

  const handleBackToVendors = () => {
    setCurrentPage('vendors');
    setSelectedVendorId(null);
  };

  const handleChangeVendorType = (type: VendorType) => {
    setVendorType(type);
  };

  const handleViewTourDetails = (tourId: number) => {
    setSelectedTourId(tourId);
    setCurrentPage('tour-details');
  };

  const handleBackToTours = () => {
    setCurrentPage('tours');
    setSelectedTourId(null);
  };

  const handleRequestVisa = () => {
    setCurrentPage('visa-request');
  };

  const handleBackToVisaServices = () => {
    setCurrentPage('visa-services');
  };

  const handleBookFlight = (flight: any, passengers: number, tripType: string, returnFlight?: any) => {
    setFlightBookingData({ flight, passengers, tripType, returnFlight });
    setCurrentPage('flight-booking');
  };

  const handleBackToFlights = () => {
    setCurrentPage('visa-services');
    setFlightBookingData(null);
  };

  const handleViewProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const handleViewBrandProfile = (brandName: string) => {
    setSelectedBrandName(brandName);
    setCurrentPage('brand-profile');
  };

  const handleBackToMarketplace = () => {
    setCurrentPage('marketplace');
    setSelectedProductId(null);
    setSelectedBrandName(null);
  };

  const handleViewTourismBoard = (boardName: string) => {
    setSelectedTourismBoard(boardName);
    setCurrentPage('tourism-board');
  };

  const handleBackFromTourismBoard = () => {
    setCurrentPage('destination-details');
    setSelectedTourismBoard(null);
  };

  const handleProceedToPayment = () => {
    setCurrentPage('payment');
  };

  const handleBackFromPayment = () => {
    setCurrentPage('venue-details');
  };

  const handlePaymentComplete = () => {
    setCurrentPage('booking-confirmation');
  };

  const handleBackFromBookingConfirmation = () => {
    setCurrentPage('landing');
  };

  const handleViewProviderProfile = (providerId: string) => {
    setSelectedProviderId(providerId);
    setCurrentPage('provider-profile');
  };

  const handleBackToProviders = () => {
    setCurrentPage('providers');
    setSelectedProviderId(null);
  };

  const handleViewBlogPost = (slug: string) => {
    setSelectedBlogSlug(slug);
    setCurrentPage('blog-detail');
  };

  const handleBackToBlog = () => {
    setCurrentPage('blog');
    setSelectedBlogSlug(null);
  };

  const handleViewCompare = () => {
    setCurrentPage('package-compare');
  };

  const handleBackFromCompare = () => {
    setCurrentPage('venue-preview');
  };

  const handleNavigate = (page: 'home' | 'landing' | 'venues' | 'destinations' | 'inspirations' | 'planners' | 'vendors' | 'tours' | 'visa-services' | 'builder' | 'expenses' | 'marketplace' | 'account' | 'concierge' | 'providers' | 'brand-guidelines' | 'blog' | 'venue-preview') => {
    setCurrentPage(page as PageType);
  };

  const handleExitBuilder = () => {
    setCurrentPage('landing');
  };

  const getCurrentNavPage = (): 'home' | 'landing' | 'venues' | 'destinations' | 'inspirations' | 'planners' | 'vendors' | 'tours' | 'visa-services' | 'builder' | 'expenses' | 'marketplace' | 'account' | 'concierge' | 'providers' | 'blog' | 'venue-preview' => {
    if (currentPage === 'venue-details') return 'venues';
    if (currentPage === 'destination-details') return 'destinations';
    if (currentPage === 'tourism-board') return 'destinations';
    if (currentPage === 'inspiration-detail') return 'inspirations';
    if (currentPage === 'planner-profile') return 'planners';
    if (currentPage === 'vendor-profile') return 'vendors';
    if (currentPage === 'tour-details') return 'tours';
    if (currentPage === 'visa-request') return 'visa-services';
    if (currentPage === 'flight-booking') return 'visa-services';
    if (currentPage === 'product-detail') return 'marketplace';
    if (currentPage === 'brand-profile') return 'marketplace';
    if (currentPage === 'provider-profile') return 'providers';
    if (currentPage === 'blog-detail') return 'blog';
    if (currentPage === 'venue-preview') return 'venue-preview';
    if (currentPage === 'package-compare') return 'venue-preview';
    return currentPage as 'home' | 'landing' | 'venues' | 'destinations' | 'inspirations' | 'planners' | 'vendors' | 'tours' | 'visa-services' | 'builder' | 'expenses' | 'marketplace' | 'account' | 'concierge' | 'providers' | 'blog' | 'venue-preview';
  };

  return (
    <CurrencyProvider>
      <PackageCompareProvider>
        <AccessGate>
          <div className="size-full">
            <Toaster position="top-right" />
            <TravelNav onNavigate={handleNavigate} currentPage={getCurrentNavPage()} />
        
        {currentPage === 'landing' ? (
          <>
            <LandingPage onNavigate={handleNavigate} />
            <TravelFooter onNavigate={handleNavigate} />
          </>
        ) : currentPage === 'home' ? (
          <>
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
            <TravelFooter onNavigate={handleNavigate} />
          </>
        ) : currentPage === 'destinations' ? (
          <>
            <DestinationsPage onViewDetails={handleViewDestinationDetails} />
            <TravelFooter onNavigate={handleNavigate} />
          </>
        ) : currentPage === 'destination-details' ? (
          <>
            <DestinationDetailsPage 
              destinationId={selectedDestinationId || 1} 
              onBack={handleBackToDestinations}
              onViewVenue={handleViewVenueDetails}
              onViewTourismBoard={handleViewTourismBoard}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'tourism-board' ? (
          <>
            <TourismBoardProfilePage 
              onBack={handleBackFromTourismBoard}
              boardName={selectedTourismBoard || "Visit Florence"}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'venues' ? (
          <>
            <VenuePage onViewDetails={handleViewVenueDetails} />
            <TravelFooter />
          </>
        ) : currentPage === 'venue-details' ? (
          <>
            <VenueDetailsPage 
              venueId={selectedVenueId || 1} 
              onBack={handleBackToVenues}
              onProceedToPayment={handleProceedToPayment}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'venue-preview' ? (
          <>
            <VenueDetailsPageV2 
              venueId={1} 
              onBack={() => setCurrentPage('landing')}
              onProceedToPayment={handleProceedToPayment}
              onCompareClick={handleViewCompare}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'package-compare' ? (
          <>
            <PackageComparePage />
          </>
        ) : currentPage === 'payment' ? (
          <>
            <PaymentPage 
              onBack={handleBackFromPayment}
              onPaymentComplete={handlePaymentComplete}
            />
          </>
        ) : currentPage === 'booking-confirmation' ? (
          <>
            <BookingConfirmationPage onBack={handleBackFromBookingConfirmation} />
          </>
        ) : currentPage === 'inspirations' ? (
          <>
            <InspirationsPage onViewDetail={handleViewInspirationDetail} />
            <TravelFooter />
          </>
        ) : currentPage === 'inspiration-detail' ? (
          <>
            <InspirationDetailPage 
              inspirationId={selectedInspirationId || 1} 
              onBack={handleBackToInspirations} 
            />
            <TravelFooter />
          </>
        ) : currentPage === 'planners' ? (
          <>
            <PlannersPage onViewProfile={handleViewPlannerProfile} />
            <TravelFooter />
          </>
        ) : currentPage === 'planner-profile' ? (
          <>
            <PlannerProfilePage 
              plannerId={selectedPlannerId || 1} 
              onBack={handleBackToPlanners} 
            />
            <TravelFooter />
          </>
        ) : currentPage === 'vendors' ? (
          <>
            <VendorsPage 
              vendorType={vendorType}
              onViewProfile={handleViewVendorProfile}
              onChangeVendorType={handleChangeVendorType}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'vendor-profile' ? (
          <>
            <VendorProfilePage 
              vendorType={vendorType}
              vendorId={selectedVendorId || 1}
              onBack={handleBackToVendors}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'tours' ? (
          <>
            <ToursPage onViewDetails={handleViewTourDetails} />
            <TravelFooter />
          </>
        ) : currentPage === 'tour-details' ? (
          <>
            <TourDetailPage 
              tourId={selectedTourId || 1} 
              onBack={handleBackToTours}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'visa-services' ? (
          <>
            <VisaFlightsPage 
              onRequestVisa={handleRequestVisa} 
              onBookFlight={handleBookFlight}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'visa-request' ? (
          <>
            <VisaRequestPage onBack={handleBackToVisaServices} />
            <TravelFooter />
          </>
        ) : currentPage === 'flight-booking' && flightBookingData ? (
          <>
            <FlightBookingPage 
              selectedFlight={flightBookingData.flight}
              onBack={handleBackToFlights}
              passengers={flightBookingData.passengers}
              tripType={flightBookingData.tripType}
              returnFlight={flightBookingData.returnFlight}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'builder' ? (
          <WeddingBuilderPage onExit={handleExitBuilder} />
        ) : currentPage === 'expenses' ? (
          <>
            <ExpensesPage onBack={() => setCurrentPage('landing')} />
          </>
        ) : currentPage === 'marketplace' ? (
          <>
            <MarketplacePage 
              onBack={() => setCurrentPage('landing')} 
              onViewProduct={handleViewProductDetail}
              onViewBrand={handleViewBrandProfile}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'product-detail' ? (
          <>
            <ProductDetailPage 
              onBack={handleBackToMarketplace}
              onViewBrand={handleViewBrandProfile}
              productId={selectedProductId || "1"}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'brand-profile' ? (
          <>
            <BrandProfilePage 
              onBack={handleBackToMarketplace}
              onViewProduct={handleViewProductDetail}
              brandName={selectedBrandName || "Sabyasachi"}
            />
            <TravelFooter />
          </>
        ) : currentPage === 'account' ? (
          <>
            <CustomerAccountPage onBack={() => setCurrentPage('landing')} />
          </>
        ) : currentPage === 'concierge' ? (
          <>
            <ConciergePage />
            <TravelFooter />
          </>
        ) : currentPage === 'email-templates' ? (
          <>
            <EmailTemplatesPage onBack={() => setCurrentPage('landing')} />
          </>
        ) : currentPage === 'venue-brochure' ? (
          <>
            <VenueBrochurePage onBack={() => setCurrentPage('landing')} />
          </>
        ) : currentPage === 'providers' ? (
          <>
            <WeddingProvidersPage onViewProfile={handleViewProviderProfile} />
            <TravelFooter />
          </>
        ) : currentPage === 'provider-profile' && selectedProviderId ? (
          <>
            <ProviderProfilePage providerId={selectedProviderId} />
            <TravelFooter />
          </>
        ) : currentPage === 'brand-guidelines' ? (
          <>
            <BrandGuidelinesPage onBack={() => setCurrentPage('landing')} />
          </>
        ) : currentPage === 'blog' ? (
          <>
            <BlogPage onPostClick={handleViewBlogPost} />
            <TravelFooter />
          </>
        ) : currentPage === 'blog-detail' && selectedBlogSlug ? (
          <>
            <BlogDetailPage 
              slug={selectedBlogSlug}
              onBack={handleBackToBlog}
              onPostClick={handleViewBlogPost}
            />
            <TravelFooter />
          </>
        ) : null}
      </div>
    </AccessGate>
      </PackageCompareProvider>
    </CurrencyProvider>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Camera,
  Sparkles,
  Wine,
  Car,
  Check,
  ArrowLeft,
  Heart,
  Share2,
  Mail,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Volume2,
  Home,
  ArrowRight,
  Bed,
  Receipt,
  Dog,
  X,
  ChevronDown,
  ChevronUp,
  Building2,
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  ShoppingCart,
  ArrowLeftRight,
  Send,
  Info,
  Shield,
  Search,
} from "lucide-react";

import { VenueEnquiryForm } from "./VenueEnquiryForm";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import PackagePrice from "./ui/PackagePrice";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

import { Separator } from "./ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { VenueDetailSkeleton } from "./ui/venue-detail-skeleton";
import { useCurrency } from "./CurrencyContext";
import { usePackageCompare } from "./PackageCompareContext";
import { Venue } from "./DestinationServices/services/venueService";

import { SimpleDestinationMap } from "./SimpleDestinationMap";

interface VenueDetailsPageProps {
  venue: Venue;
  onBack: () => void;
  onProceedToPayment?: () => void;
  onCompareClick?: () => void;
}

export function VenueDetailsPageV2({
  venue: venueData,
  onBack,
  onProceedToPayment,
  onCompareClick,
}: VenueDetailsPageProps) {

  // Map API data to UI structure
  const venue = {
    name: venueData.name,
    location: venueData.version?.data?.step1?.location?.formattedAddress || venueData.destination || "Unknown Location",
    rating: 4.8, // Placeholder as rating is not in API yet
    reviews: 124, // Placeholder
    venueTags: venueData.version?.data?.step1?.interests || [],
    description: venueData.version?.data?.step1?.overview || "No description available.",
    whyCouplesLove: Object.entries(venueData.version?.data?.step2?.dynamicServicesData?.["Venue Highlights"] || {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => {
        const name = key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        let Icon = Sparkles;
        if (key.includes("sound")) Icon = Volume2;
        if (key.includes("pet")) Icon = Dog;
        if (key.includes("alcohol") || key.includes("bar")) Icon = Wine;
        if (key.includes("photo")) Icon = Camera;
        if (key.includes("parking")) Icon = Car;
        if (key.includes("accommodation") || key.includes("room")) Icon = Bed;

        return { icon: Icon, name };
      }),
    areas: (venueData.version?.data?.step2?.dynamicServicesData?.["Areas Available"] || []).map((area: any) => ({
      name: area.area_name,
      type: area.area_type,
      seating: parseInt(area.seating_capacity) || 0,
      floating: parseInt(area.floating_capacity) || 0,
      icon: Building2
    })),
    localPrices: (venueData.version?.data?.step2?.dynamicServicesData?.["Rooms and Stay"] || []).map((room: any) => ({
      item: room.room_type,
      price: parseInt(room.room_rate_per_night) || 0,
      unit: "/ night"
    })),
    goodToKnow: Object.entries(venueData.version?.data?.step4?.rulesPolicies || {}).map(([key, value]) => {
      const details = Object.entries(value as Record<string, boolean>)
        .filter(([_, enabled]) => enabled)
        .map(([policyKey]) => policyKey.replace(/_/g, " ").replace(/([A-Z])/g, " $1").toLowerCase());

      return {
        icon: Info, // Default icon
        title: key,
        details: details.length > 0 ? details : ["Policy details available upon request"]
      };
    }),
    images: venueData.version?.data?.step1?.coverPhotosWeb?.map((p: any) => p.fileUrl) || [],
    capacity: {
      min: parseInt(venueData.version?.data?.step2?.dynamicServicesData?.["Basic Details"]?.["maximum_seating_capacity"]) || 50,
      max: parseInt(venueData.version?.data?.step2?.dynamicServicesData?.["Basic Details"]?.["max_pax_allowed_maximum_head_count"]) || 200
    },
    pricing: {
      starting: venueData.version?.data?.step3?.packages?.[0]?.packagePrice?.amount || 0,
      currency: venueData.version?.data?.step3?.packages?.[0]?.packagePrice?.currency || "USD"
    },
    amenities: Object.entries(venueData.version?.data?.step2?.dynamicServicesData?.["Services Available"] || {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => ({
        icon: Sparkles, // Default icon
        name: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())
      })),
    packages: (venueData.version?.data?.step3?.packages || []).map((pkg: any) => ({
      name: pkg.packageName,
      price: pkg.packagePrice,
      tag: pkg.packageName,
      image: pkg.packagePhotos?.[0]?.fileUrl || venueData.version?.data?.step1?.coverPhotosWeb?.[0]?.fileUrl,
      images: pkg.packagePhotos?.map((p: any) => p.fileUrl) || [],
      numberOfDays: pkg.numberOfDays || 1,
      totalPax: pkg.totalPax || 0,
      numberOfRooms: pkg.roomTypes?.map((r: any) => `${r.type} (${r.roomCount})`).join(", ") || "N/A",
      venueAreaAccess: pkg.venueArea?.join(", ") || "",
      features: pkg.includedServices || []
    })),
    coordinates: {
      lat: venueData.version?.data?.step1?.location?.lat || 0,
      lng: venueData.version?.data?.step1?.location?.lng || 0
    },
    contact: {
      phone: venueData.version?.data?.step1?.phone || "",
      email: venueData.version?.data?.step1?.email || ""
    }
  };

  const venueId = venueData._id;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<
    string | null
  >(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] =
    useState(0);
  const [lightboxImages, setLightboxImages] = useState<any[]>(
    [],
  );
  const [expandedPackages, setExpandedPackages] = useState<
    number[]
  >([]);
  const [packageImageIndices, setPackageImageIndices] =
    useState<{ [key: number]: number }>({});
  const [areasExpanded, setAreasExpanded] = useState(false);
  const [showAllGalleryImages, setShowAllGalleryImages] =
    useState(false);
  const [likedPackages, setLikedPackages] = useState<
    Set<string>
  >(new Set());
  const { formatPrice } = useCurrency();
  const {
    addToCompare,
    removeFromCompare,
    isInCompare,
    comparePackages,
  } = usePackageCompare();

  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading (images and venue details)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate 2s loading time for images and content

    return () => clearTimeout(timer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % venue.images.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + venue.images.length) % venue.images.length,
    );
  };

  const openLightbox = (index: number, images?: any[]) => {
    setLightboxImageIndex(index);
    setLightboxImages(images || venue.images);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex(
      (prev) => (prev + 1) % lightboxImages.length,
    );
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex(
      (prev) =>
        (prev - 1 + lightboxImages.length) %
        lightboxImages.length,
    );
  };

  const nextPackageImage = (
    packageIndex: number,
    totalImages: number,
  ) => {
    setPackageImageIndices((prev) => ({
      ...prev,
      [packageIndex]:
        ((prev[packageIndex] || 0) + 1) % totalImages,
    }));
  };

  const prevPackageImage = (
    packageIndex: number,
    totalImages: number,
  ) => {
    setPackageImageIndices((prev) => ({
      ...prev,
      [packageIndex]:
        ((prev[packageIndex] || 0) - 1 + totalImages) %
        totalImages,
    }));
  };

  const handleLikePackage = (packageId: string) => {
    setLikedPackages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(packageId)) {
        newSet.delete(packageId);
        toast.success("Removed from favorites");
      } else {
        newSet.add(packageId);
        toast.success("Added to favorites");
      }
      return newSet;
    });
  };

  const handleAddToCompare = (pkg: any, index: number) => {
    const packageId = `${venueId}-${pkg.name}`;

    if (isInCompare(packageId)) {
      removeFromCompare(packageId);
    } else {
      addToCompare({
        id: packageId,
        venueName: venue.name,
        venueId: venueId,
        packageName: pkg.name,
        price: pkg.price,
        currency: venue.pricing.currency,
        guestCount: `${pkg.totalPax} Guests`,
        duration: `${pkg.numberOfDays} ${pkg.numberOfDays === 1 ? "Day" : "Days"}`,
        image: pkg.image,
        inclusions: pkg.features,
        highlights: [
          `Rooms: ${pkg.numberOfRooms}`,
          `Venue Access: ${pkg.venueAreaAccess}`,
        ],
        decorStyle: pkg.tag,
        venueType: venue.venueTags?.join(", "),
      });
    }
  };

  if (isLoading) {
    return <VenueDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      {/* Back Button & Actions */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to Venues</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200">
              <div className="bg-blue-500 rounded-full p-1 flex items-center justify-center">
                <Check
                  className="size-3 text-white"
                  strokeWidth={3}
                />
              </div>
              <span className="text-gray-800">Verified</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`size-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="size-5" />
            </Button>
          </div>
        </div>

        {/* Single Hero Banner */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg md:rounded-xl overflow-hidden mb-6 md:mb-8 group w-full">
          <div
            onClick={() => openLightbox(0)}
            className="w-full h-full cursor-pointer"
          >
            <ImageWithFallback
              src={venue.images[0]}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* View All Photos Button */}
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/95 hover:bg-white shadow-lg transition-all hover:scale-105 backdrop-blur-sm flex items-center gap-2 text-sm sm:text-base"
          >
            <Camera className="size-4 sm:size-5" />
            <span className="font-medium hidden sm:inline">View All {venue.images.length} Photos</span>
            <span className="font-medium sm:hidden">{venue.images.length} Photos</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8 min-w-0 overflow-hidden">
            {/* Header */}
            <div>
              {/* Venue Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {venue.venueTags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100"
                    style={{ color: "#DF6951" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mb-4">
                <div className="w-full min-w-0">
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl mb-2 break-words"
                    style={{ fontFamily: "Volkhov, serif" }}
                  >
                    {venue.name}
                  </h1>
                  <div className="flex items-start sm:items-center gap-2 text-muted-foreground mb-3 min-w-0">
                    <MapPin className="size-4 flex-shrink-0" />
                    <span className="break-words min-w-0">{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <Star className="size-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                    <span className="font-medium">
                      {venue.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({venue.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative mt-4">
                <p
                  className={`text-muted-foreground leading-relaxed transition-all ${!isDescriptionExpanded ? "line-clamp-4" : ""
                    }`}
                >
                  {venue.description}
                </p>
                {venue.description.length > 250 && (
                  <button
                    onClick={() =>
                      setIsDescriptionExpanded(
                        !isDescriptionExpanded,
                      )
                    }
                    className="mt-2 text-[#DF6951] hover:text-[#DF6951]/80 font-medium flex items-center gap-1 transition-colors"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        Read Less
                        <ChevronUp className="size-4" />
                      </>
                    ) : (
                      <>
                        Read More
                        <ChevronDown className="size-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Destination & Weather Card */}
            <Card className="overflow-hidden border-2 w-full min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x w-full">
                {/* Destination Info */}
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-[#02542D]/10 to-[#DF6951]/10">
                      <MapPin className="size-4 sm:size-5 text-[#DF6951]" />
                    </div>
                    <h3 className="text-base sm:text-lg">Destination</h3>
                  </div>
                  <div className="space-y-3 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        Location
                      </p>
                      <p
                        className="text-base sm:text-lg break-words"
                        style={{ fontFamily: "Volkhov, serif" }}
                      >
                        {venue.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Badge
                        variant="secondary"
                        className="bg-[#02542D]/10 text-[#02542D] hover:bg-[#02542D]/20"
                      >
                        Popular Destination
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Weather Info */}
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-[#02542D]/10 to-[#DF6951]/10">
                        <CloudSun className="size-4 sm:size-5 text-[#DF6951]" />
                      </div>
                      <h3 className="text-sm sm:text-base">Weather</h3>
                    </div>
                    <ArrowRight className="size-4 sm:size-5 text-[#DF6951] hover:text-[#02542D] transition-colors cursor-pointer hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                        <Thermometer className="size-3 sm:size-4 text-orange-500" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          Temp
                        </span>
                      </div>
                      <p className="font-medium text-xs sm:text-sm">22-28°C</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                        <Droplets className="size-3 sm:size-4 text-blue-500" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          Humidity
                        </span>
                      </div>
                      <p className="font-medium text-xs sm:text-sm">65%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                        <Wind className="size-3 sm:size-4 text-teal-500" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          Wind
                        </span>
                      </div>
                      <p className="font-medium text-xs sm:text-sm">Light</p>
                    </div>
                  </div>
                  {/* <p className="text-xs text-muted-foreground mt-3 text-center">
                    Best season: April - October
                  </p> */}
                </div>
              </div>
            </Card>

            <Separator />

            {/* Why Couples Love This Venue */}
            {venue.whyCouplesLove &&
              venue.whyCouplesLove.length > 0 && (
                <>
                  <div className="w-full min-w-0">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl">Highlights</h2>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 sm:size-8"
                          onClick={() => {
                            const container = document.getElementById('highlights-carousel');
                            if (container) {
                              container.scrollBy({ left: -300, behavior: 'smooth' });
                            }
                          }}
                        >
                          <ChevronLeft className="size-3 sm:size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 sm:size-8"
                          onClick={() => {
                            const container = document.getElementById('highlights-carousel');
                            if (container) {
                              container.scrollBy({ left: 300, behavior: 'smooth' });
                            }
                          }}
                        >
                          <ChevronRight className="size-3 sm:size-4" />
                        </Button>
                      </div>
                    </div>
                    <div
                      id="highlights-carousel"
                      className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-3 sm:pb-4 -mx-3 px-3 sm:-mx-4 sm:px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {venue.whyCouplesLove.map(
                        (feature, index) => {
                          // Define color schemes for each index
                          const colorSchemes = [
                            { iconColor: "text-green-600" },
                            { iconColor: "text-pink-600" },
                            { iconColor: "text-blue-600" },
                            { iconColor: "text-orange-600" },
                          ];
                          const colors =
                            colorSchemes[
                            index % colorSchemes.length
                            ];

                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center text-center gap-2 sm:gap-3 flex-shrink-0 w-[calc(50%-6px)] sm:w-[calc(50%-8px)] md:w-[calc(25%-18px)]"
                            >
                              <feature.icon
                                className={`size-8 sm:size-10 md:size-12 ${colors.iconColor}`}
                                strokeWidth={1}
                              />
                              <span className="font-medium text-[11px] sm:text-xs leading-tight">
                                {feature.name}
                              </span>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <Separator />
                </>
              )}

            {/* Area Information */}
            {venue.areas && venue.areas.length > 0 && (
              <>
                <div>
                  <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">
                    Area({venue.areas.length})
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    {(areasExpanded ? venue.areas : venue.areas.slice(0, 4)).map((area: any, index) => {
                      const IconComponent = area.icon || Home;

                      return (
                        <div
                          key={index}
                          className="flex items-start gap-3 sm:gap-4"
                        >
                          <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-orange-50">
                            <IconComponent className="size-5 sm:size-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="mb-1 text-sm sm:text-base">
                              {area.name} {area.type ? `(${area.type})` : ""}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Seating {area.seating} | Floating{" "}
                              {area.floating}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {venue.areas.length > 4 && (
                    <div className="flex justify-center mt-4 sm:mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setAreasExpanded(!areasExpanded)}
                        className="gap-2 text-sm sm:text-base"
                      >
                        {areasExpanded ? (
                          <>
                            Show Less <ChevronUp className="size-4" />
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline">Show More ({venue.areas.length - 4} more)</span>
                            <span className="sm:hidden">+{venue.areas.length - 4} More</span>
                            <ChevronDown className="size-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />
              </>
            )}

            {/* Local Prices */}
            {venue.localPrices &&
              venue.localPrices.length > 0 && (
                <>
                  <div>
                    <h2 className="mb-6">Local Prices</h2>
                    <Card className="p-6">
                      <div className="space-y-4">
                        {venue.localPrices.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-3 border-b last:border-0"
                            >
                              <span className="text-muted-foreground">
                                {item.item}
                              </span>
                              <span
                                style={{ color: "#DF6951" }}
                              >
                                ₹ {item.price.toLocaleString()}{" "}
                                <span className="text-muted-foreground text-sm">
                                  {item.unit} + taxes
                                </span>
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </Card>
                  </div>

                  <Separator />
                </>
              )}

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 sm:p-3 rounded-xl bg-orange-50">
                    <Users className="size-5 sm:size-6 text-orange-600" />
                  </div>
                  <h3 className="text-base sm:text-lg">Guest Capacity</h3>
                </div>
                <p
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: "Volkhov, serif" }}
                >
                  {venue.capacity.min} - {venue.capacity.max}
                </p>
                <p className="text-sm text-muted-foreground">
                  guests
                </p>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 sm:p-3 rounded-xl bg-orange-50">
                    <Calendar className="size-5 sm:size-6 text-orange-600" />
                  </div>
                  <h3 className="text-base sm:text-lg">Starting Price</h3>
                </div>
                <p
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: "Volkhov, serif" }}
                >
                  {formatPrice(venue.pricing.starting)}
                </p>
                <p className="text-sm text-muted-foreground">
                  per event
                </p>
              </Card>
            </div>

            <Separator />

            {/* Packages */}
            <div className="w-full min-w-0">
              <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">
                Exclusive Wedding Packages
              </h2>
              <div className="space-y-4 sm:space-y-5 md:space-y-6 overflow-x-hidden">
                {venue.packages.map((pkg, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow w-full"
                  >
                    <div className="grid md:grid-cols-[280px,1fr] gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6 w-full min-w-0">
                      {/* Package Image Gallery */}
                      <div
                        className="relative h-[200px] sm:h-[220px] md:h-[320px] rounded-lg overflow-hidden group cursor-pointer"
                        onClick={() => {
                          const packageImages = (pkg as any)
                            .images || [pkg.image];
                          openLightbox(
                            packageImageIndices[index] || 0,
                            packageImages,
                          );
                        }}
                      >
                        <ImageWithFallback
                          src={
                            (pkg as any).images?.[
                            packageImageIndices[index] || 0
                            ] || pkg.image
                          }
                          alt={pkg.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Navigation Arrows */}
                        {(pkg as any).images &&
                          (pkg as any).images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevPackageImage(
                                    index,
                                    (pkg as any).images.length,
                                  );
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              >
                                <ChevronLeft className="size-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextPackageImage(
                                    index,
                                    (pkg as any).images.length,
                                  );
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              >
                                <ChevronRight className="size-4" />
                              </button>
                            </>
                          )}

                        {/* Like and Compare buttons */}
                        <div className="absolute top-3 right-3 flex gap-2 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLikePackage(
                                `${venueId}-${pkg.name}`,
                              );
                            }}
                            className={`p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 ${likedPackages.has(
                              `${venueId}-${pkg.name}`,
                            )
                              ? "text-red-500"
                              : ""
                              }`}
                          >
                            <Heart
                              className={`size-5 ${likedPackages.has(`${venueId}-${pkg.name}`) ? "fill-current" : ""}`}
                            />
                          </button>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCompare(
                                    pkg,
                                    index,
                                  );
                                }}
                                className={`relative p-2 rounded-full shadow-lg transition-all hover:scale-110 group-hover:animate-pulse ${isInCompare(
                                  `${venueId}-${pkg.name}`,
                                )
                                  ? "bg-[#02542D] text-white hover:bg-[#02542D]/90"
                                  : "bg-white/90 hover:bg-white group-hover:ring-2 group-hover:ring-[#DF6951] group-hover:ring-offset-2"
                                  }`}
                              >
                                {isInCompare(
                                  `${venueId}-${pkg.name}`,
                                ) ? (
                                  <Check className="size-5" />
                                ) : (
                                  <ArrowLeftRight className="size-5 group-hover:text-[#DF6951]" />
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="left"
                              className="bg-[#02542D] text-white"
                            >
                              <p>
                                {isInCompare(
                                  `${venueId}-${pkg.name}`,
                                )
                                  ? "Remove from Compare"
                                  : "Add to Compare"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Image Indicators */}
                        {(pkg as any).images &&
                          (pkg as any).images.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                              {(pkg as any).images.map(
                                (_: any, imgIndex: number) => (
                                  <button
                                    key={imgIndex}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPackageImageIndices(
                                        (prev) => ({
                                          ...prev,
                                          [index]: imgIndex,
                                        }),
                                      );
                                    }}
                                    className={`h-1.5 rounded-full transition-all ${(packageImageIndices[
                                      index
                                    ] || 0) === imgIndex
                                      ? "w-6 bg-white"
                                      : "w-1.5 bg-white/60 hover:bg-white/80"
                                      }`}
                                  />
                                ),
                              )}
                            </div>
                          )}

                        <div className="absolute bottom-3 left-3">
                          <Badge
                            variant="secondary"
                            className={`${pkg.tag === "Silver"
                              ? "bg-gray-100/95 text-gray-900 border border-gray-300"
                              : pkg.tag === "Gold"
                                ? "bg-amber-100/95 text-amber-900 border border-amber-300"
                                : "bg-purple-100/95 text-purple-900 border border-purple-300"
                              } backdrop-blur-sm`}
                          >
                            {pkg.tag} Package
                          </Badge>
                        </div>
                      </div>

                      {/* Package Details */}
                      <div className="flex flex-col min-w-0 overflow-hidden">
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="mb-4 sm:mb-6 overflow-hidden">
                            <h3 className="mb-2 text-lg sm:text-xl break-words">
                              {pkg.tag} Wedding Package
                            </h3>
                            <p className="text-muted-foreground text-xs sm:text-sm break-words">
                              Complete wedding package with all
                              essential services and amenities
                            </p>
                          </div>

                          {/* Package Specifications */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b w-full">
                            <div className="space-y-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Duration
                              </p>
                              <p className="font-medium text-sm break-words">
                                {pkg.numberOfDays}{" "}
                                {pkg.numberOfDays === 1
                                  ? "Day"
                                  : "Days"}
                              </p>
                            </div>
                            <div className="space-y-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Capacity
                              </p>
                              <p className="font-medium text-sm break-words">
                                {pkg.totalPax} Guests
                              </p>
                            </div>
                            <div className="space-y-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Accommodation
                              </p>
                              <p className="font-medium text-sm break-words">
                                {pkg.numberOfRooms}
                              </p>
                            </div>
                            <div className="space-y-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Venue Access
                              </p>
                              <p className="font-medium text-sm break-words">
                                {pkg.venueAreaAccess}
                              </p>
                            </div>
                          </div>

                          {/* Features Section with Expand/Collapse */}
                          <div className="mb-4 sm:mb-6">
                            <div className="mb-3">
                              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Included Services
                              </h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 pb-4 sm:pb-6 border-b relative w-full">
                              {(expandedPackages.includes(index)
                                ? pkg.features
                                : pkg.features.slice(0, 4)
                              ).map((feature, fIndex) => (
                                <div
                                  key={fIndex}
                                  className="flex items-start gap-2 text-sm py-1 min-w-0"
                                >
                                  <Check className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span className="leading-tight break-words overflow-wrap-anywhere">
                                    {feature}
                                  </span>
                                </div>
                              ))}

                              {/* Expand/Collapse Button on the line */}
                              {pkg.features.length > 4 && (
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                  <button
                                    onClick={() => {
                                      const newExpanded = [
                                        ...expandedPackages,
                                      ];
                                      const pkgIndex = index;
                                      if (
                                        newExpanded.includes(
                                          pkgIndex,
                                        )
                                      ) {
                                        setExpandedPackages(
                                          newExpanded.filter(
                                            (i) =>
                                              i !== pkgIndex,
                                          ),
                                        );
                                      } else {
                                        newExpanded.push(
                                          pkgIndex,
                                        );
                                        setExpandedPackages(
                                          newExpanded,
                                        );
                                      }
                                    }}
                                    className="flex items-center justify-center size-6 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                                  >
                                    {expandedPackages.includes(
                                      index,
                                    ) ? (
                                      <ChevronUp className="size-3.5 text-gray-600" />
                                    ) : (
                                      <ChevronDown className="size-3.5 text-gray-600" />
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 mt-auto w-full min-w-0">
                          <div className="min-w-0 w-full sm:w-auto overflow-hidden">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Starting from
                            </p>
                            <div
                              className="break-words"
                            >
                              <PackagePrice price={pkg.price} size="3xl" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 break-words">
                              Price varies by season and
                              customization
                            </p>
                          </div>
                          <Button
                            className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80 gap-2 w-full sm:w-auto text-sm sm:text-base flex-shrink-0"
                            onClick={() =>
                              setSelectedPackage(pkg.name)
                            }
                          >
                            <span className="truncate">Check Availability</span>
                            <ArrowRight className="size-4 flex-shrink-0" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Mobile Enquiry Form - Shows only on mobile after packages */}
            <div className="lg:hidden">
              <VenueEnquiryForm packages={venue.packages} formatPrice={formatPrice} venueId={venueData._id} />
            </div>

            <Separator />

            {/* Photo Gallery */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="mb-0">Photo Gallery</h2>
                <Button
                  variant="outline"
                  onClick={() =>
                    setShowAllGalleryImages(
                      !showAllGalleryImages,
                    )
                  }
                  className="gap-2"
                >
                  <Camera className="size-4" />
                  {showAllGalleryImages
                    ? "Show Less"
                    : `See All ${venue.images.length} Photos`}
                </Button>
              </div>

              {/* Gallery Grid - 3x4 on desktop, 2x2 on mobile */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {(showAllGalleryImages
                  ? venue.images
                  : venue.images.slice(0, 12)
                ).map((image, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      openLightbox(index, venue.images)
                    }
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${venue.name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Image index overlay */}
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1} / {venue.images.length}
                    </div>
                  </div>
                ))}
              </div>

              {/* See More Button - Shows when not all images are displayed */}
              {!showAllGalleryImages &&
                venue.images.length > 12 && (
                  <div className="mt-6 text-center">
                    {/* <Button
                    variant="outline"
                    onClick={() => setShowAllGalleryImages(true)}
                    className="gap-2 border-[#02542D] text-[#02542D] hover:bg-[#02542D]/10"
                  >
                    <Camera className="size-4" />
                    View All {venue.images.length} Photos
                  </Button> */}
                  </div>
                )}
            </div>

            <Separator />

            {/* Amenities */}
            <div className="w-full min-w-0">
              <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">Amenities & Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                {venue.amenities.map((amenity, index) => {
                  // Cycle through different color schemes for amenities
                  const colorSchemes = [
                    {
                      bg: "bg-green-50",
                      iconBg: "bg-green-100",
                      iconColor: "text-green-600",
                    },
                    {
                      bg: "bg-blue-50",
                      iconBg: "bg-blue-100",
                      iconColor: "text-blue-600",
                    },
                    {
                      bg: "bg-orange-50",
                      iconBg: "bg-orange-100",
                      iconColor: "text-orange-600",
                    },
                    {
                      bg: "bg-purple-50",
                      iconBg: "bg-purple-100",
                      iconColor: "text-purple-600",
                    },
                    {
                      bg: "bg-pink-50",
                      iconBg: "bg-pink-100",
                      iconColor: "text-pink-600",
                    },
                    {
                      bg: "bg-cyan-50",
                      iconBg: "bg-cyan-100",
                      iconColor: "text-cyan-600",
                    },
                  ];
                  const colors =
                    colorSchemes[index % colorSchemes.length];

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg min-w-0 w-full"
                      style={{
                        backgroundColor:
                          "rgba(223, 105, 81, 0.05)",
                      }}
                    >
                      <div className="p-1.5 sm:p-2 rounded-lg bg-white flex-shrink-0">
                        <amenity.icon
                          className="size-4 sm:size-5"
                          style={{ color: "#DF6951" }}
                        />
                      </div>
                      <span className="text-sm sm:text-base truncate">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Good to Know Before You Book */}
            {venue.goodToKnow &&
              venue.goodToKnow.length > 0 && (
                <>
                  <div className="w-full min-w-0">
                    <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">
                      Good to Know Before You Book
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                      {venue.goodToKnow.map((info, index) => (
                        <Card key={index} className="p-4 sm:p-6 min-w-0">
                          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-gray-100 flex-shrink-0">
                              <info.icon className="size-4 sm:size-5 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="mb-1.5 sm:mb-2 text-sm sm:text-base">
                                {info.title}
                              </h4>
                              {info.details.map(
                                (detail, dIndex) => (
                                  <p
                                    key={dIndex}
                                    className="text-xs sm:text-sm text-muted-foreground mb-1 leading-relaxed"
                                  >
                                    {detail}
                                  </p>
                                ),
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />
                </>
              )}

            {/* Map */}
            <div>
              <h2 className="mb-4 sm:mb-5 md:mb-6 text-lg sm:text-xl">Location</h2>
              <SimpleDestinationMap
                center={[venue.coordinates.lat || 0, venue.coordinates.lng || 0]}
                destinationName={venue.name}
              />
            </div>

            <Separator />

            {/* Weather Details */}
            <div>
              <h2 className="mb-4 sm:mb-5 md:mb-6 text-lg sm:text-xl">Weather & Climate</h2>
              <Card className="p-4 sm:p-5 md:p-6 overflow-hidden">
                {/* Current Weather */}
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 flex-wrap gap-3">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                        Current Weather
                      </p>
                      <h3 className="mb-1 flex items-center gap-2 text-base sm:text-lg">
                        <svg
                          className="size-8 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M11 19v2m0-6v2m4-2v2m0 2v2m-8-4v2"
                          />
                        </svg>
                        Moderate Rain
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Province of Turin
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-5xl"
                        style={{ fontFamily: "Volkhov, serif" }}
                      >
                        11°C
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Feels like 10°C
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Weather Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Temperature Range */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg
                          className="size-5 text-orange-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Temp Range
                      </p>
                    </div>
                    <p
                      className="text-xl"
                      style={{ fontFamily: "Volkhov, serif" }}
                    >
                      10°C - 14°C
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Min / Max
                    </p>
                  </div>

                  {/* Humidity */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg
                          className="size-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Humidity
                      </p>
                    </div>
                    <p
                      className="text-xl"
                      style={{ fontFamily: "Volkhov, serif" }}
                    >
                      60%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Moderate
                    </p>
                  </div>

                  {/* Wind Speed */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg
                          className="size-5 text-cyan-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Wind
                      </p>
                    </div>
                    <p
                      className="text-xl"
                      style={{ fontFamily: "Volkhov, serif" }}
                    >
                      4.1 m/s
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      SE Direction
                    </p>
                  </div>

                  {/* Pressure */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg
                          className="size-5 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pressure
                      </p>
                    </div>
                    <p
                      className="text-xl"
                      style={{ fontFamily: "Volkhov, serif" }}
                    >
                      1021 hPa
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sea Level
                    </p>
                  </div>

                  {/* Visibility */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg
                          className="size-5 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Visibility
                      </p>
                    </div>
                    <p
                      className="text-xl"
                      style={{ fontFamily: "Volkhov, serif" }}
                    >
                      10 km
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Clear
                    </p>
                  </div>

                  {/* Cloud Coverage */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg
                          className="size-5 text-slate-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Clouds
                      </p>
                    </div>
                    <p
                      className="text-xl"
                      style={{ fontFamily: "Volkhov, serif" }}
                    >
                      83%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mostly Cloudy
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Additional Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      backgroundColor: "rgba(2, 84, 45, 0.05)",
                    }}
                  >
                    <div className="p-2 rounded-lg bg-white">
                      <svg
                        className="size-5 text-[#02542D]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Rainfall (1h)
                      </p>
                      <p className="font-medium">2.73 mm</p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      backgroundColor:
                        "rgba(223, 105, 81, 0.05)",
                    }}
                  >
                    <div className="p-2 rounded-lg bg-white">
                      <svg
                        className="size-5 text-[#DF6951]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Ground Level Pressure
                      </p>
                      <p className="font-medium">910 hPa</p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      backgroundColor: "rgba(2, 84, 45, 0.05)",
                    }}
                  >
                    <div className="p-2 rounded-lg bg-white">
                      <svg
                        className="size-5 text-[#02542D]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Sunrise
                      </p>
                      <p className="font-medium">7:13 AM</p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      backgroundColor:
                        "rgba(223, 105, 81, 0.05)",
                    }}
                  >
                    <div className="p-2 rounded-lg bg-white">
                      <svg
                        className="size-5 text-[#DF6951]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Sunset
                      </p>
                      <p className="font-medium">7:36 PM</p>
                    </div>
                  </div>
                </div>

                {/* Weather Info */}
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <svg
                      className="size-5 text-blue-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Best Time to Visit
                      </p>
                      <p className="text-sm text-blue-800">
                        Weather data shows current conditions.
                        For weddings, we recommend checking the
                        7-day forecast and considering the
                        venue's indoor/outdoor facilities.
                        Contact our concierge for seasonal
                        recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <VenueEnquiryForm packages={venue.packages} formatPrice={formatPrice} venueId={venueData._id} />
            </div>
          </div>
        </div>

        {/* Floating Compare Cart Button */}
        {comparePackages.length > 0 && (
          <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
            {onCompareClick ? (
              <Button
                size="lg"
                onClick={onCompareClick}
                className="bg-gradient-to-r from-[#02542D] to-[#DF6951] hover:from-[#02542D]/90 hover:to-[#DF6951]/90 shadow-2xl gap-2 md:gap-3 text-white pr-4 md:pr-6 py-3 md:py-4"
              >
                <div className="relative">
                  <ArrowLeftRight className="size-5 md:size-6" />
                  <Badge className="absolute -top-2 -right-2 size-5 p-0 flex items-center justify-center bg-white text-[#02542D] hover:bg-white border-2 border-[#02542D] text-xs">
                    {comparePackages.length}
                  </Badge>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs md:text-sm font-medium">
                    Compare Packages
                  </span>
                  <span className="text-[10px] md:text-xs opacity-90">
                    {comparePackages.length}{" "}
                    {comparePackages.length === 1
                      ? "package"
                      : "packages"}{" "}
                    added
                  </span>
                </div>
              </Button>
            ) : (
              <a href="/packages/compare">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#02542D] to-[#DF6951] hover:from-[#02542D]/90 hover:to-[#DF6951]/90 shadow-2xl gap-2 md:gap-3 text-white pr-4 md:pr-6 py-3 md:py-4"
                >
                  <div className="relative">
                    <ShoppingCart className="size-5 md:size-6" />
                    <Badge className="absolute -top-2 -right-2 size-5 p-0 flex items-center justify-center bg-white text-[#02542D] hover:bg-white border-2 border-[#02542D] text-xs">
                      {comparePackages.length}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs md:text-sm font-medium">
                      Compare Packages
                    </span>
                    <span className="text-[10px] md:text-xs opacity-90">
                      {comparePackages.length}{" "}
                      {comparePackages.length === 1
                        ? "package"
                        : "packages"}{" "}
                      added
                    </span>
                  </div>
                </Button>
              </a>
            )}
          </div>
        )}

        {/* Full-Screen Image Lightbox */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-[9999] w-screen h-screen"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button - Fixed to Screen Top Right Edge */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="fixed top-4 right-4 z-[10002] p-2.5 rounded-full bg-gray-800/80 hover:bg-gray-700 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="size-7" />
            </button>

            {/* Image Counter - Top Center */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10001] text-white text-sm">
              {lightboxImageIndex + 1} / {lightboxImages.length}
            </div>

            {/* Image Container - Centered */}
            <div className="fixed inset-0 w-full h-full flex items-center justify-center p-0 m-0 bg-[rgba(164,164,164,0.84)]">
              {lightboxImages[lightboxImageIndex] && (
                <div className="relative bg-white rounded-lg shadow-2xl p-2">
                  {/* Previous Button - On left side of image */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightboxImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full mr-4 z-50 p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6" />
                  </button>

                  <img
                    src={lightboxImages[lightboxImageIndex]}
                    alt={`${venue.name} - Image ${lightboxImageIndex + 1}`}
                    className="rounded object-contain"
                    style={{
                      maxWidth: "calc(90vw - 1rem)",
                      maxHeight: "calc(85vh - 1rem)",
                    }}
                    onError={(e) => {
                      console.error(
                        "Image failed to load:",
                        lightboxImages[lightboxImageIndex],
                      );
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=";
                    }}
                  />

                  {/* Next Button - On right side of image */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightboxImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full ml-4 z-50 p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 text-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
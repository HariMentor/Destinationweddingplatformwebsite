"use client";

import { useState, useMemo } from "react";
import {
  MapPin,
  Star,
  ArrowLeft,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  ArrowRight,
  Users,
  Sparkles,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Destination } from "./DestinationServices/types/destination";
import { Venue } from "./DestinationServices/services/venueService";
import { calculateDestinationStats } from "./DestinationServices/utils/destinationUtils";
import { Separator } from "./ui/separator";
import { SimpleDestinationMap } from "./SimpleDestinationMap";
// import { DestinationEnquiryForm } from "./DestinationEnquiryForm";
import PackagePrice from "./ui/PackagePrice";
import { Weather } from "./Weather";

interface DestinationDetailsPageProps {
  destination: Destination;
  venues: Venue[];
  onBack: () => void;
  onViewVenue?: (slug: string) => void;
  onViewTourismBoard?: (boardName: string) => void;
}

export function DestinationDetailsPage({
  destination,
  venues,
  onBack,
  onViewVenue,
  onViewTourismBoard,
}: DestinationDetailsPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Calculate stats
  const stats = useMemo(
    () => calculateDestinationStats(destination._id, venues),
    [destination._id, venues],
  );

  // Aggregate images from destination and venues
  const destinationImages = (destination.coverPhotosWeb || []).map(
    (photo) => photo.fileUrl,
  );
  // Default images if none available
  const images =
    destinationImages.length > 0
      ? destinationImages
      : [
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      {/* Back Button & Actions */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Button>
          <div className="flex gap-2">
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

        {/* Hero Image Gallery */}
        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group mb-8">
          <ImageWithFallback
            src={images[currentImageIndex]}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
                currentImageIndex === index ? "ring-2 ring-[#DF6951]" : ""
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`${destination.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <h1
            className="text-5xl mb-2"
            style={{ fontFamily: "Volkhov, serif" }}
          >
            {destination.name}, {destination.country?.countryName}
          </h1>
          {/* <p className="text-xl text-muted-foreground">
            {destination.description ? destination.description.substring(0, 100) + (destination.description.length > 100 ? "..." : "") : "Explore this beautiful destination"}
          </p> */}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">
                    {/* Placeholder Rating */}
                    4.8
                  </span>
                  <span className="text-muted-foreground">(200 reviews)</span>
                </div>
                {destination.isFeatured && (
                  <Badge className="bg-emerald-500 text-white">Popular</Badge>
                )}
                <Badge variant="outline">{stats.venueCount}+ Venues</Badge>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {destination.description}
              </p>

              {/* Weather Summary Widget - Using Static Data for Now */}
              {/* <Card className="mt-6 overflow-hidden border-2 border-blue-100">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#02542D]/10 to-[#DF6951]/10">
                        <CloudSun className="size-5 text-[#DF6951]" />
                      </div>
                      <h3>Typical Weather</h3>
                    </div>
                    <ArrowRight className="size-5 text-[#DF6951] hover:text-[#02542D] transition-colors cursor-pointer hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Thermometer className="size-4 text-orange-500" />
                        <span className="text-xs text-muted-foreground">
                          Temp
                        </span>
                      </div>
                      <p className="font-medium">22-28°C</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Droplets className="size-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">
                          Humidity
                        </span>
                      </div>
                      <p className="font-medium">65%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Wind className="size-4 text-teal-500" />
                        <span className="text-xs text-muted-foreground">
                          Wind
                        </span>
                      </div>
                      <p className="font-medium">Light</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Best season: April - October
                  </p>
                </div>
              </Card> */}
            </div>

            {/* Top Venues Section */}
            <div>
              <div className="mb-8">
                <h2 className="mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                  Top Venues in {destination.name}
                </h2>
                <p className="text-muted-foreground">
                  Discover our handpicked selection of stunning wedding venues
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {venues.map((venue) => {
                  const priceData =
                    venue.version?.data?.step3?.packages?.[0]?.packagePrice;

                  const capacity =
                    venue.version?.data?.step3?.packages?.[0]?.totalPax;

                  return (
                    <Card
                      key={venue._id}
                      className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                      onClick={() => onViewVenue && onViewVenue(venue.slug)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={
                            venue.version?.data?.step1?.coverPhotosWeb?.[0]
                              ?.fileUrl ||
                            "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2069&auto=format&fit=crop"
                          }
                          alt={venue.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {venue.isFeatured && (
                          <Badge className="absolute top-3 left-3 bg-[#F1A501] border-0">
                            Featured
                          </Badge>
                        )}

                        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {/* Randomize slightly or use actual rating if available */}
                          {4.5}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2">{venue.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">
                            {venue.version?.data?.step1?.location
                              ?.formattedAddress ||
                              venue.destination ||
                              "Location"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-600">
                            {/* Placeholder reviews count */}
                            (24 reviews)
                          </span>
                          <span className="text-sm text-gray-600">
                            <Users className="w-4 h-4 inline mr-1" />
                            {capacity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">From</div>
                            <div className="text-xl text-[#DF6951]">
                              {priceData ? (
                                <PackagePrice price={priceData} size="xl" />
                              ) : (
                                "Price on Request"
                              )}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewVenue && onViewVenue(venue?.slug);
                            }}
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* View All Venues Button */}
              {/* <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onViewVenue && onViewVenue()}
                  className="px-8"
                >
                  View All Venues in {destination.name}
                  <ChevronRight className="ml-2 size-5" />
                </Button>
              </div> */}
            </div>

            <Separator className="my-8" />

            {/* Map */}
            <div>
              <h2 className="mb-6">Location & Area Guide</h2>
              <Card className="p-6">
                <SimpleDestinationMap
                  center={[
                    destination.location?.[0]?.location?.lat || 0,
                    destination.location?.[0]?.location?.lng || 0,
                  ]}
                  destinationName={destination.name}
                  venues={venues.map((v) => ({
                    id: v._id,
                    name: v.name,
                    location:
                      (v as any).location ||
                      v.version?.data?.step1?.location?.formattedAddress ||
                      "",
                    rating: (v as any).rating || 0,
                  }))}
                />
              </Card>
            </div>

            {/* <Separator /> */}

            {/* Weather & Climate */}
            {/* <Weather /> */}
          </div>

          {/* Right Column - Maps & Enquiry */}
          {/* <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 border-2 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10 mb-3">
                  <Sparkles className="size-4 text-[#DF6951]" />
                  <span className="text-sm font-medium text-[#02542D]">
                    Wedding Concierge
                  </span>
                </div>
                <h3 className="text-center bg-gradient-to-r from-[#02542D] to-[#DF6951] bg-clip-text text-transparent mb-2">
                  Plan Your Dream Wedding
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  Let our destination experts create your perfect wedding
                  experience in {destination.name}
                </p>
              </div>

              <DestinationEnquiryForm destination={destination} />
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}

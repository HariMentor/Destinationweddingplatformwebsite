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
import { DestinationEnquiryForm } from "./DestinationEnquiryForm";
import PackagePrice from "./ui/PackagePrice";

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


  console.log(venues, "venues")
  console.log(destination, "destiantion")
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Calculate stats
  const stats = useMemo(() => calculateDestinationStats(destination._id, venues), [destination._id, venues]);

  // Aggregate images from destination and venues
  const destinationImages = (destination.coverPhotosWeb || []).map(photo => photo.fileUrl);
  // Default images if none available
  const images = destinationImages.length > 0 ? destinationImages : [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % images.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + images.length) %
        images.length,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      {/* Back Button & Actions */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2"
          >
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
            {currentImageIndex + 1} /{" "}
            {images.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${currentImageIndex === index
                ? "ring-2 ring-[#DF6951]"
                : ""
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
        <div className="grid lg:grid-cols-3 gap-8">
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
                  <span className="text-muted-foreground">
                    (200 reviews)
                  </span>
                </div>
                {destination.isFeatured && (
                  <Badge className="bg-emerald-500 text-white">
                    Popular
                  </Badge>
                )}
                <Badge variant="outline">
                  {stats.venueCount}+ Venues
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {destination.description}
              </p>

              {/* Weather Summary Widget - Using Static Data for Now */}
              <Card className="mt-6 overflow-hidden border-2 border-blue-100">
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
              </Card>
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
                  const priceData = venue.version?.data?.step3?.packages?.[0]?.packagePrice;
                  const priceDisplay = priceData ? `${priceData.currency} ${priceData.amount}` : "Price TBD";
                  const capacity = venue.version?.data?.step3?.packages?.[0]?.totalPax;

                  return (
                    <Card
                      key={venue._id}
                      className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                      onClick={() => onViewVenue && onViewVenue(parseInt(venue._id))}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={venue.version?.data?.step1?.coverPhotosWeb?.[0]?.fileUrl || "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2069&auto=format&fit=crop"}
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
                            {venue.version?.data?.step1?.location?.formattedAddress || venue.destination || "Location"}
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
                              ) : "Price on Request"}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewVenue && onViewVenue(Number(venue?.slug));
                            }}
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* View All Venues Button */}
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onViewVenue && onViewVenue(0)}
                  className="px-8"
                >
                  View All Venues in {destination.name}
                  <ChevronRight className="ml-2 size-5" />
                </Button>
              </div>
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

            <Separator />

            {/* Weather & Climate */}
            <div>
              <h2 className="mb-6">Weather & Climate</h2>
              <Card className="p-6">
                {/* Current Weather */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Current Weather
                      </p>
                      <h3 className="mb-1 flex items-center gap-2">
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
                        destination's seasonal patterns. Contact
                        our concierge for personalized
                        recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Maps & Enquiry */}
          <div className="lg:col-span-1 space-y-6">

            {/* Wedding Concierge Enquiry Card */}
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
                  Let our destination experts create your
                  perfect wedding experience in{" "}
                  {destination.name}
                </p>
              </div>

              <DestinationEnquiryForm
                destination={destination}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
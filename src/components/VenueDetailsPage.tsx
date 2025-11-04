"use client";

import { useState } from "react";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Clock,
  Wifi,
  Music,
  Utensils,
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
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useCurrency } from "./CurrencyContext";

interface VenueDetailsPageProps {
  venueId: number;
  onBack: () => void;
  onProceedToPayment?: () => void;
}

const venueDetails = {
  1: {
    name: "Cliffside Resort & Spa",
    location: "Santorini, Greece",
    rating: 4.9,
    reviews: 156,
    venueTags: ["Beachfront Paradise", "Hilltop Retreats"],
    description:
      "Perched on the stunning cliffs of Santorini, our resort offers breathtaking views of the Aegean Sea and the iconic sunset. With world-class amenities and personalized service, we create unforgettable wedding experiences in one of the world's most romantic destinations.",
    whyCouplesLove: [
      { icon: Sparkles, name: "Fireworks Allowed" },
      { icon: Volume2, name: "Sound Restrictions Apply" },
      { icon: Dog, name: "Pet Friendly" },
      { icon: Wine, name: "Open Bar" },
    ],
    areas: [
      {
        name: "Banquet (Indoor)",
        seating: 50,
        floating: 80,
      },
      {
        name: "Terrace (Outdoor)",
        seating: 150,
        floating: 200,
      },
      {
        name: "Lawn (Outdoor)",
        seating: 50,
        floating: 80,
      },
    ],
    localPrices: [
      { item: "Veg Per plate", price: 6000, unit: "per plate" },
      {
        item: "Non Veg Per Plate",
        price: 7000,
        unit: "per plate",
      },
      { item: "Deluxe Room", price: 10000, unit: "/ night" },
      { item: "Standard Room", price: 80000, unit: "/ night" },
    ],
    goodToKnow: [
      {
        icon: Users,
        title: "Minimum Pax less than 50 pax allowed",
        details: ["Yes"],
      },
      {
        icon: Home,
        title:
          "Venue requires complete buyout of all rooms to host a wedding",
        details: ["Yes"],
      },
      {
        icon: Wine,
        title: "Alcohol Policy",
        details: [
          "in house alcohol available, outside alcohol permitted",
          "in house alcohol not available, outside alcohol permitted",
        ],
      },
      {
        icon: Music,
        title: "Dj policy",
        details: [
          "in house alcohol available, outside alcohol permitted",
          "in house alcohol not available, outside alcohol permitted",
        ],
      },
      {
        icon: Home,
        title: "Total room count",
        details: ["27 Rooms"],
      },
      {
        icon: Camera,
        title: "Decor Policy",
        details: [
          "decorators should be chosen only from enlisted panel",
          "inhouse decor available outside decors permitted",
        ],
      },
      {
        icon: Receipt,
        title: "What are your payment terms?",
        details: [
          "approx 50 advance while booking",
          "100 advance while booking",
        ],
      },
      {
        icon: Utensils,
        title: "Catering policy",
        details: [
          "inhouse catering outside vendors not permitted",
          "no inhouse service outside vendors allowed from panel",
        ],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1521543387600-c745f8e83d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYxMjM1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1575573333824-c3cda86dd4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB3ZWRkaW5nJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc2MTIzNTk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1700062069869-0c59ff21fa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBzZXR1cHxlbnwxfHx8fDE3NjEyMzU5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1675247488725-22d1b78e75db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYmFucXVldCUyMGhhbGx8ZW58MXx8fHwxNzYxMTYxODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1578730169862-749bbdc763a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MTIzNTk3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    capacity: {
      min: 50,
      max: 200,
    },
    pricing: {
      starting: 15000,
      currency: "USD",
    },
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Music, name: "Sound System" },
      { icon: Utensils, name: "In-House Catering" },
      { icon: Camera, name: "Photography Spots" },
      { icon: Sparkles, name: "Decor Services" },
      { icon: Wine, name: "Bar & Beverages" },
      { icon: Car, name: "Valet Parking" },
      { icon: Clock, name: "24/7 Support" },
    ],
    packages: [
      {
        name: "Silver",
        price: 200000,
        tag: "Silver",
        image:
          "https://images.unsplash.com/photo-1521543387600-c745f8e83d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYxMjM1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        numberOfDays: 2,
        totalPax: 98,
        numberOfRooms: "Standard Room (17)",
        venueAreaAccess: "Lawn, Banquet",
        features: [
          "Basic Stage Decoration",
          "DJ & Sound System",
          "Welcome Drink for Guests",
          "Standard Lighting Setup",
          "Welcome Signage",
          "Basic Floral Arrangements",
        ],
      },
      {
        name: "Gold",
        price: 300000,
        tag: "Gold",
        image:
          "https://images.unsplash.com/photo-1575573333824-c3cda86dd4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB3ZWRkaW5nJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc2MTIzNTk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        numberOfDays: 3,
        totalPax: 150,
        numberOfRooms: "Deluxe Room (20)",
        venueAreaAccess: "Lawn, Banquet, Terrace",
        features: [
          "Premium Stage & Mandap Decoration",
          "Professional Photographer (Full Day)",
          "DJ & Premium Sound System",
          "Designer Lighting & Effects",
          "Welcome Drinks & Appetizers",
          "Floral Centerpieces for Tables",
          "Personalized Welcome Signage",
          "Complimentary Valet Parking",
        ],
      },
      {
        name: "Platinum",
        price: 450000,
        tag: "Platinum",
        image:
          "https://images.unsplash.com/photo-1700062069869-0c59ff21fa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBzZXR1cHxlbnwxfHx8fDE3NjEyMzU5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        numberOfDays: 4,
        totalPax: 200,
        numberOfRooms: "Premium Suite (27)",
        venueAreaAccess: "All Areas (Lawn, Banquet, Terrace)",
        features: [
          "Luxury Stage & Mandap with Custom Theme",
          "Professional Photographer & Videographer",
          "Cinematic Wedding Film",
          "DJ, Live Band & Premium Sound System",
          "Spectacular Lighting & Special Effects",
          "Premium Bar Service with Signature Cocktails",
          "Gourmet Multi-Cuisine Catering",
          "Fireworks Display & Sparkler Send-off",
        ],
      },
    ],
    coordinates: {
      lat: 36.4618,
      lng: 25.3753,
    },
    contact: {
      phone: "+30 22860 12345",
      email: "weddings@cliffsideresort.gr",
    },
  },
};

export function VenueDetailsPage({
  venueId,
  onBack,
  onProceedToPayment,
}: VenueDetailsPageProps) {
  const venue =
    venueDetails[venueId as keyof typeof venueDetails] ||
    venueDetails[1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<
    string | null
  >(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] =
    useState(0);
  const [expandedPackages, setExpandedPackages] = useState<number[]>([]);
  const { formatPrice } = useCurrency();

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

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex(
      (prev) => (prev + 1) % venue.images.length,
    );
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex(
      (prev) =>
        (prev - 1 + venue.images.length) % venue.images.length,
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
            Back to Venues
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

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {/* Main Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group">
            <div
              onClick={() => openLightbox(currentImageIndex)}
              className="w-full h-full cursor-pointer"
            >
              <ImageWithFallback
                src={venue.images[currentImageIndex]}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm">
              {currentImageIndex + 1} / {venue.images.length}
            </div>
          </div>

          {/* Thumbnail Grid - 2x2 */}
          <div className="grid grid-cols-2 gap-3 h-[400px] md:h-[500px]">
            {venue.images.slice(1, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index + 1);
                  openLightbox(index + 1);
                }}
                className={`relative rounded-xl overflow-hidden hover:opacity-90 transition-opacity ${
                  currentImageIndex === index + 1
                    ? "ring-2 ring-[#DF6951]"
                    : ""
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${venue.name} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                {index === 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                    <span className="text-white font-medium">
                      See All {venue.images.length} Photos
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              {/* Venue Tags */}
              <div className="flex flex-wrap gap-3 mb-4">
                {venue.venueTags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 bg-pink-100 text-pink-900 hover:bg-pink-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1
                    className="text-4xl mb-2"
                    style={{ fontFamily: "Volkhov, serif" }}
                  >
                    {venue.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="size-5" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">
                      {venue.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({venue.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {venue.description}
              </p>
            </div>

            <Separator />

            {/* Why Couples Love This Venue */}
            {venue.whyCouplesLove &&
              venue.whyCouplesLove.length > 0 && (
                <>
                  <div>
                    <h2 className="mb-6">Highlights</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {venue.whyCouplesLove.map(
                        (feature, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center text-center gap-3"
                          >
                            <feature.icon
                              className="size-10 md:size-12 text-pink-600"
                              strokeWidth={1}
                            />
                            <span className="font-medium text-[12px]">
                              {feature.name}
                            </span>
                          </div>
                        ),
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
                  <h2 className="mb-6">
                    Area({venue.areas.length})
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {venue.areas.map((area, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4"
                      >
                        <div className="p-3 rounded-lg bg-pink-100">
                          <Home className="size-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="mb-1">{area.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Seating {area.seating} | Floating{" "}
                            {area.floating}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                              <span className="text-pink-600">
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
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="size-5 text-[#DF6951]" />
                  <h3>Guest Capacity</h3>
                </div>
                <p
                  className="text-2xl"
                  style={{ fontFamily: "Volkhov, serif" }}
                >
                  {venue.capacity.min} - {venue.capacity.max}
                </p>
                <p className="text-sm text-muted-foreground">
                  guests
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="size-5 text-[#DF6951]" />
                  <h3>Starting Price</h3>
                </div>
                <p
                  className="text-2xl"
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

            {/* Amenities */}
            <div>
              <h2 className="mb-6">Amenities & Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-rose-50/50"
                  >
                    <div className="p-2 rounded-lg bg-white">
                      <amenity.icon className="size-5 text-[#DF6951]" />
                    </div>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Packages */}
            <div>
              <h2 className="mb-6">
                Exclusive Wedding Packages
              </h2>
              <div className="space-y-6">
                {venue.packages.map((pkg, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="grid md:grid-cols-[280px,1fr] gap-6 p-6">
                      {/* Package Image */}
                      <div className="relative h-[220px] md:h-[320px] rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110">
                          <Heart className="size-5" />
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <Badge
                            variant="secondary"
                            className={`${
                              pkg.tag === "Silver"
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
                      <div className="flex flex-col">
                        <div className="flex-1">
                          {/* Header */}
                          <div className="mb-6">
                            <h3 className="mb-2">
                              {pkg.tag} Wedding Package
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Complete wedding package with all essential services and amenities
                            </p>
                          </div>

                          {/* Package Specifications */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Duration
                              </p>
                              <p className="font-medium">
                                {pkg.numberOfDays} {pkg.numberOfDays === 1 ? 'Day' : 'Days'}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Capacity
                              </p>
                              <p className="font-medium">
                                {pkg.totalPax} Guests
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Accommodation
                              </p>
                              <p className="font-medium text-sm">
                                {pkg.numberOfRooms}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Venue Access
                              </p>
                              <p className="font-medium text-sm">
                                {pkg.venueAreaAccess}
                              </p>
                            </div>
                          </div>

                          {/* Features Section with Expand/Collapse */}
                          <div className="mb-6">
                            <div className="mb-3">
                              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Included Services
                              </h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 pb-6 border-b relative">
                              {(expandedPackages.includes(index) 
                                ? pkg.features 
                                : pkg.features.slice(0, 4)
                              ).map((feature, fIndex) => (
                                <div
                                  key={fIndex}
                                  className="flex items-start gap-2 text-sm py-1"
                                >
                                  <Check className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span className="leading-tight">{feature}</span>
                                </div>
                              ))}
                              
                              {/* Expand/Collapse Button on the line */}
                              {pkg.features.length > 4 && (
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                  <button
                                    onClick={() => {
                                      const newExpanded = [...expandedPackages];
                                      const pkgIndex = index;
                                      if (newExpanded.includes(pkgIndex)) {
                                        setExpandedPackages(newExpanded.filter(i => i !== pkgIndex));
                                      } else {
                                        newExpanded.push(pkgIndex);
                                        setExpandedPackages(newExpanded);
                                      }
                                    }}
                                    className="flex items-center justify-center size-6 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                                  >
                                    {expandedPackages.includes(index) ? (
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
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-auto">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Starting from
                            </p>
                            <p
                              className="text-3xl"
                              style={{
                                fontFamily: "Volkhov, serif",
                              }}
                            >
                              {formatPrice(pkg.price)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Price varies by season and customization
                            </p>
                          </div>
                          <Button
                            className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80 gap-2 whitespace-nowrap"
                            onClick={() =>
                              setSelectedPackage(pkg.name)
                            }
                          >
                            Check Availability
                            <ArrowRight className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Good to Know Before You Book */}
            {venue.goodToKnow &&
              venue.goodToKnow.length > 0 && (
                <>
                  <div>
                    <h2 className="mb-6">
                      Good to Know Before You Book
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {venue.goodToKnow.map((info, index) => (
                        <Card key={index} className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-gray-100">
                              <info.icon className="size-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="mb-2">
                                {info.title}
                              </h4>
                              {info.details.map(
                                (detail, dIndex) => (
                                  <p
                                    key={dIndex}
                                    className="text-sm text-muted-foreground mb-1"
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
              <h2 className="mb-6">Location</h2>
              <Card className="p-6">
                <div className="aspect-video bg-gradient-to-br from-rose-100 to-amber-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Simple map placeholder */}
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(0deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 20px),
                                       repeating-linear-gradient(90deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 20px)`,
                      }}
                    />
                  </div>
                  <div className="relative text-center">
                    <MapPin className="size-16 text-[#DF6951] mx-auto mb-4" />
                    <p className="font-medium">
                      {venue.location}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {venue.coordinates.lat}°N,{" "}
                      {venue.coordinates.lng}°E
                    </p>
                    <Button className="mt-4 bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
                      Open in Maps
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4" />
                  <span>{venue.contact.phone}</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-2">
              <Tabs defaultValue="enquiry" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="enquiry">
                    Send Enquiry
                  </TabsTrigger>
                  <TabsTrigger value="book">
                    Book Now
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="enquiry"
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guests">
                      Number of Guests
                    </Label>
                    <Input
                      id="guests"
                      type="number"
                      placeholder="100"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your dream wedding..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80">
                    <Mail className="mr-2 size-5" />
                    Send Enquiry
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    We'll respond within 24 hours
                  </p>
                </TabsContent>

                <TabsContent value="book" className="space-y-4">
                  <div>
                    <Label>Select Package</Label>
                    <div className="space-y-2 mt-2">
                      {venue.packages.map((pkg) => (
                        <button
                          key={pkg.name}
                          onClick={() =>
                            setSelectedPackage(pkg.name)
                          }
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            selectedPackage === pkg.name
                              ? "border-[#DF6951] bg-rose-50"
                              : "border-border hover:border-[#DF6951]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {pkg.name}
                            </span>
                            <span className="text-sm">
                              {formatPrice(pkg.price)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="book-name">Full Name</Label>
                    <Input
                      id="book-name"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="book-email">Email</Label>
                    <Input
                      id="book-email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="book-phone">
                      Phone Number
                    </Label>
                    <Input
                      id="book-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="book-date">
                      Event Date
                    </Label>
                    <Input
                      id="book-date"
                      type="date"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="book-guests">
                      Number of Guests
                    </Label>
                    <Input
                      id="book-guests"
                      type="number"
                      placeholder="100"
                      className="mt-1"
                    />
                  </div>

                  <Separator />

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Selected Package
                      </span>
                      <span className="font-medium">
                        {selectedPackage || "None"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total</span>
                      <span
                        className="text-2xl"
                        style={{ fontFamily: "Volkhov, serif" }}
                      >
                        {selectedPackage
                          ? formatPrice(
                              venue.packages.find(
                                (p) =>
                                  p.name === selectedPackage,
                              )?.price || 0,
                            )
                          : formatPrice(0)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
                    onClick={onProceedToPayment}
                  >
                    <Calendar className="mr-2 size-5" />
                    Proceed to Payment
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment • Instant confirmation
                  </p>
                </TabsContent>
              </Tabs>

              <Separator className="my-6" />

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Phone className="size-4" />
                  Call Us
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                >
                  <MessageSquare className="size-4" />
                  Live Chat
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

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
            {lightboxImageIndex + 1} / {venue.images.length}
          </div>

          {/* Image Container - Centered */}
          <div className="fixed inset-0 w-full h-full flex items-center justify-center p-0 m-0 bg-[rgba(164,164,164,0.84)]">
            {venue.images[lightboxImageIndex] && (
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
                  src={venue.images[lightboxImageIndex]}
                  alt={`${venue.name} - Image ${lightboxImageIndex + 1}`}
                  className="rounded object-contain"
                  style={{
                    maxWidth: "calc(90vw - 1rem)",
                    maxHeight: "calc(85vh - 1rem)",
                  }}
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      venue.images[lightboxImageIndex],
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
  );
}
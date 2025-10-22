import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Star,
  Calendar,
  Clock,
  Camera,
  Wine,
  Utensils,
  Palmtree,
  ArrowLeft,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Music,
  Sparkles,
  Building2,
  Users,
  TrendingUp,
  Phone,
  Mail,
  MessageSquare,
  BadgeCheck,
  Globe,
  Navigation,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";

interface DestinationDetailsPageProps {
  destinationId: number;
  onBack: () => void;
  onViewVenue?: (venueId: number) => void;
  onViewTourismBoard?: (boardName: string) => void;
}

const destinationDetails = {
  1: {
    name: "Tuscany",
    country: "Italy",
    tagline: "Where Romance Meets Renaissance",
    description:
      "Tuscany embodies the essence of Italian romance with its rolling hills, sun-drenched vineyards, and historic villas. This enchanting region offers an unparalleled backdrop for destination weddings, combining rustic charm with sophisticated elegance. From medieval hilltop towns to Renaissance art and world-class cuisine, Tuscany creates unforgettable wedding experiences steeped in culture and natural beauty.",
    tourismBoard: "Visit Florence",
    images: [
      "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1698616596895-71e43af05b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDM2Mzk0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1583844056361-4418a8f2a985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWFsZmklMjBjb2FzdCUyMGl0YWx5fGVufDF8fHx8MTc2MDI1NjgxMnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW5leWFyZCUyMHdlZGRpbmclMjB2ZW51ZXxlbnwxfHx8fDE3NjAzNjQzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    rating: 4.9,
    reviews: 342,
    stats: {
      venues: 156,
      avgCost: "$25K - $50K",
      bestTime: "May - October",
      avgGuests: "80-150",
    },
    quickFacts: [
      {
        label: "Language",
        value: "Italian, English widely spoken",
      },
      { label: "Currency", value: "Euro (€)" },
      { label: "Weather", value: "Mediterranean climate" },
      { label: "Time Zone", value: "CET (GMT+1)" },
    ],
    thingsToDo: [
      {
        icon: Wine,
        title: "Wine Tasting Tours",
        description: "Explore world-renowned Chianti vineyards",
        image:
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwd2luZSUyMHRhc3Rpbmd8ZW58MXx8fHwxNzYwMzc1MzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        icon: Utensils,
        title: "Cooking Classes",
        description: "Learn traditional Italian cuisine",
        image:
          "https://images.unsplash.com/photo-1556909190-3163d2b35637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwY29va2luZyUyMGNsYXNzfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        icon: Camera,
        title: "Historic Tours",
        description:
          "Visit Florence, Siena, and medieval towns",
        image:
          "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        icon: Palmtree,
        title: "Countryside Drives",
        description: "Scenic routes through rolling hills",
        image:
          "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
    venues: [
      {
        id: 3,
        name: "Royal Gardens Estate",
        location: "Siena",
        image:
          "https://images.unsplash.com/photo-1698616596895-71e43af05b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzY0MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        capacity: "100-300",
        price: "$$$",
      },
      {
        id: 5,
        name: "Vineyard Villa",
        location: "Chianti",
        image:
          "https://images.unsplash.com/photo-1510076857177-7470076d4098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW5leWFyZCUyMHdlZGRpbmclMjB2ZW51ZXxlbnwxfHx8fDE3NjAzNjQzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        capacity: "60-180",
        price: "$$",
      },
      {
        id: 7,
        name: "Castle di Amore",
        location: "Val d'Orcia",
        image:
          "https://images.unsplash.com/photo-1663185776079-33231c5242eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN0bGUlMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzc0MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        capacity: "80-250",
        price: "$$$",
      },
    ],
    coordinates: {
      lat: 43.7711,
      lng: 11.2486,
    },
  },
};

// Interactive Map Component
interface InteractiveMapProps {
  center: [number, number];
  destinationName: string;
  venues: Array<{
    id: number;
    name: string;
    location: string;
    rating: number;
  }>;
}

function InteractiveMap({ center, destinationName, venues }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    let L: any;
    
    const initMap = async () => {
      if (typeof window === 'undefined') return;
      
      // Import Leaflet
      L = (await import('leaflet')).default;
      
      // Import Leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!mapRef.current || mapInstanceRef.current) return;

      // Initialize map
      const map = L.map(mapRef.current, {
        center,
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom icon for main destination marker
      const mainIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: linear-gradient(135deg, #DF6951 0%, #F1A501 100%);
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: 20px;
              font-weight: bold;
            ">📍</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      // Add main destination marker
      L.marker(center, { icon: mainIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 8px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #DF6951;">
              ${destinationName}
            </h3>
            <p style="margin: 0; font-size: 13px; color: #666;">
              Main destination area
            </p>
          </div>
        `);

      // Add venue markers with slight offset
      venues.forEach((venue, index) => {
        // Create random offset around main location (roughly 5-10km radius)
        const offsetLat = (Math.random() - 0.5) * 0.1;
        const offsetLng = (Math.random() - 0.5) * 0.1;
        
        const venueIcon = L.divIcon({
          className: 'venue-marker',
          html: `
            <div style="
              background: white;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              border: 3px solid #DF6951;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: #DF6951;
              font-size: 14px;
            ">${index + 1}</div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16],
        });

        L.marker([center[0] + offsetLat, center[1] + offsetLng], { icon: venueIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: sans-serif; padding: 8px; min-width: 180px;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600;">
                ${venue.name}
              </h4>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                <span style="color: #F1A501;">⭐</span>
                <span style="font-size: 13px; font-weight: 500;">${venue.rating}</span>
              </div>
              <p style="margin: 0; font-size: 12px; color: #666;">
                📍 ${venue.location}
              </p>
            </div>
          `);
      });
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, destinationName, venues]);

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-200"
        style={{ zIndex: 1 }}
      />
      
      {/* Map Legend */}
      <div className="flex flex-wrap gap-6 p-4 bg-gradient-to-br from-rose-50 to-amber-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#DF6951] to-[#F1A501] flex items-center justify-center text-white text-xs">
            📍
          </div>
          <span className="text-sm font-medium">Main Destination</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white border-2 border-[#DF6951] flex items-center justify-center text-[#DF6951] text-xs">
            1
          </div>
          <span className="text-sm font-medium">Wedding Venues</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Navigation className="size-4 text-[#DF6951]" />
          <span className="text-sm text-muted-foreground">Click markers for details</span>
        </div>
      </div>

      {/* Map Actions */}
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="outline" 
          className="flex-1 min-w-[200px]"
          onClick={() => {
            const url = `https://www.google.com/maps/search/?api=1&query=${center[0]},${center[1]}`;
            window.open(url, '_blank');
          }}
        >
          <Globe className="mr-2 size-4" />
          Open in Google Maps
        </Button>
        <Button 
          variant="outline"
          className="flex-1 min-w-[200px]"
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setView(center, 11);
            }
          }}
        >
          <MapPin className="mr-2 size-4" />
          Recenter Map
        </Button>
      </div>

      {/* Coordinates Info */}
      <div className="text-center p-3 bg-white border border-gray-200 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Coordinates: <span className="font-mono font-medium text-foreground">{center[0].toFixed(4)}°N, {center[1].toFixed(4)}°E</span>
        </p>
      </div>
    </div>
  );
}

export function DestinationDetailsPage({
  destinationId,
  onBack,
  onViewVenue,
  onViewTourismBoard,
}: DestinationDetailsPageProps) {
  const destination =
    destinationDetails[
      destinationId as keyof typeof destinationDetails
    ] || destinationDetails[1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % destination.images.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + destination.images.length) %
        destination.images.length,
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
            src={destination.images[currentImageIndex]}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Navigation Arrows */}
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

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm">
            {currentImageIndex + 1} /{" "}
            {destination.images.length}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-8 left-8">
            <h1
              className="text-5xl text-white mb-2"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              {destination.name}, {destination.country}
            </h1>
            <p className="text-xl text-white/90">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {destination.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
                currentImageIndex === index
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
                    {destination.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({destination.reviews} reviews)
                  </span>
                </div>
                <Badge className="bg-emerald-500 text-white">
                  Popular
                </Badge>
                <Badge variant="outline">
                  {destination.stats.venues}+ Venues
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {destination.description}
              </p>
            </div>

            <Separator />

            {/* Tourism Board Section */}
            {destination.tourismBoard && (
              <>
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-500 text-white">
                      <Globe className="size-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3
                          className="text-xl"
                          style={{
                            fontFamily: "Volkhov, serif",
                          }}
                        >
                          Created by {destination.tourismBoard}
                        </h3>
                        <Badge className="bg-blue-500 gap-1">
                          <BadgeCheck className="size-3" />
                          Official Tourism Board
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        This destination is curated by the
                        official tourism board. Access exclusive
                        coupons, promotions, museum bookings,
                        and specially designed tour packages.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() =>
                            onViewTourismBoard?.(
                              destination.tourismBoard!,
                            )
                          }
                          className="gap-2"
                        >
                          View Tourism Board Profile
                          <BadgeCheck className="size-4" />
                        </Button>
                        <Badge
                          variant="secondary"
                          className="px-3 py-2"
                        >
                          🎫 Exclusive Coupons Available
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="px-3 py-2"
                        >
                          🏛️ Museum Bookings
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="px-3 py-2"
                        >
                          📦 Tour Packages
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
                <Separator />
              </>
            )}

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <Building2 className="size-6 text-[#DF6951] mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Venues
                </p>
                <p className="font-medium">
                  {destination.stats.venues}+
                </p>
              </Card>
              <Card className="p-4 text-center">
                <Calendar className="size-6 text-[#DF6951] mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Best Time
                </p>
                <p className="font-medium text-sm">
                  {destination.stats.bestTime}
                </p>
              </Card>
              <Card className="p-4 text-center">
                <Users className="size-6 text-[#DF6951] mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Avg. Guests
                </p>
                <p className="font-medium">
                  {destination.stats.avgGuests}
                </p>
              </Card>
              <Card className="p-4 text-center">
                <TrendingUp className="size-6 text-[#DF6951] mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Avg. Cost
                </p>
                <p className="font-medium text-sm">
                  {destination.stats.avgCost}
                </p>
              </Card>
              <Card className="p-4 text-center">
                <Building2 className="size-6 text-[#DF6951] mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Venues
                </p>
                <p className="font-medium">
                  {destination.stats.venues}+
                </p>
              </Card>
            </div>

            <Separator />

            {/* Things To Do */}
            <div>
              <h2 className="mb-6">Things to Do</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {destination.thingsToDo.map(
                  (activity, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <activity.icon className="size-6 text-white mb-2" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                    </Card>
                  ),
                )}
              </div>
            </div>

            <Separator />

            {/* Venues in Destination */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2>Top Venues in {destination.name}</h2>
                <Button variant="outline">
                  View All {destination.stats.venues}
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {destination.venues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => onViewVenue?.(venue.id)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-foreground">
                          <Star className="size-3 mr-1 fill-amber-400 text-amber-400" />
                          {venue.rating}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white mb-1">
                          {venue.name}
                        </h3>
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <MapPin className="size-3" />
                          <span>{venue.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="size-4 text-muted-foreground" />
                          <span>{venue.capacity}</span>
                        </div>
                        <span className="font-medium">
                          {venue.price}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Map */}
            <div>
              <h2 className="mb-6">Location & Area Guide</h2>
              <Card className="p-6">
                <InteractiveMap
                  center={[destination.coordinates.lat, destination.coordinates.lng]}
                  destinationName={destination.name}
                  venues={destination.venues}
                />
              </Card>
            </div>
          </div>

          {/* Right Column - Info Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-2">
              <h3 className="mb-6">Quick Facts</h3>

              <div className="space-y-4 mb-6">
                {destination.quickFacts.map((fact, index) => (
                  <div key={index}>
                    <p className="text-sm text-muted-foreground mb-1">
                      {fact.label}
                    </p>
                    <p className="font-medium">{fact.value}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
                  <Mail className="mr-2 size-4" />
                  Get Travel Guide
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 size-4" />
                  Contact Expert
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 size-4" />
                  Live Chat
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="p-4 bg-amber-50 rounded-lg">
                <p className="text-sm mb-2">
                  <strong>Planning a wedding here?</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Connect with our destination experts for
                  personalized planning assistance.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
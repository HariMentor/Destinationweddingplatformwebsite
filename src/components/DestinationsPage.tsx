import { useState, useEffect } from "react";
import { Search, MapPin, Star, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CardSkeletonLoader } from "./ui/loader";
import PackagePrice from "./ui/PackagePrice";
import { getDestinations } from "./DestinationServices/services/destinationService";
import { getVenues, Venue } from "./DestinationServices/services/venueService";
import { calculateDestinationStats } from "./DestinationServices/utils/destinationUtils";
import { Destination } from "./DestinationServices/types/destination";

interface DestinationsPageProps {
  onViewDetails: (destinationId: string) => void;
}

interface DestinationWithStats extends Destination {
  stats: {
    venueCount: number;
    startingPrice: {
      amount: number;
      currency: string;
    } | null;
  };
  rating: number;
  trending: boolean;
}

export function DestinationsPage({ onViewDetails }: DestinationsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [destinations, setDestinations] = useState<DestinationWithStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [destinationsRes, venuesRes] = await Promise.all([
          getDestinations(),
          getVenues()
        ]);

        const venues = venuesRes || [];
        const destinationList = destinationsRes?.destinations || [];

        const processedDestinations = destinationList.map(dest => {
          const stats = calculateDestinationStats(dest._id, venues);

          return {
            ...dest,
            stats,
            rating: 4.8, // Default rating as not available in API
            trending: dest.isFeatured || false, // Use deterministic value
          };
        });

        setDestinations(processedDestinations);
      } catch (error) {
        console.error("Failed to fetch destinations data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (destination.country?.countryName || "").toLowerCase().includes(searchQuery.toLowerCase());

    // Check region - assuming country.region matches the select values or "all"
    const region = destination.country?.region || "";
    const matchesRegion = selectedRegion === "all" || region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  // Extract unique regions for the filter
  const regions = Array.from(new Set(destinations.map(d => d.country?.region).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-rose-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
              Discover Your Dream Destination
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the world's most romantic wedding destinations
            </p>
          </div>

          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto p-6 shadow-xl border-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region!}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90 h-12 px-8">
                Search
              </Button>
            </div>
          </Card>

          {/* Results Count */}
          {!isLoading && (
            <div className="max-w-4xl mx-auto mt-8">
              <p className="text-muted-foreground">
                {filteredDestinations.length} destinations found
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Volkhov, serif' }}>
            Featured Destinations
          </h2>
          {isLoading ? (
            <div className="max-w-7xl mx-auto">
              <CardSkeletonLoader count={3} />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredDestinations.filter(d => d.isFeatured).map((destination) => (
                <Card
                  key={destination._id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#DF6951]/20 cursor-pointer"
                  onClick={() => onViewDetails(destination._id)}
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <ImageWithFallback
                      src={destination.coverPhotosWeb?.[0]?.fileUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      {destination.trending && (
                        <Badge className="bg-[#F1A501] text-white border-0 shadow-lg">
                          <TrendingUp className="size-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <Badge className="ml-auto bg-white/90 text-foreground border-0 backdrop-blur-sm">
                        <Star className="size-3 mr-1 fill-amber-400 text-amber-400" />
                        {destination.rating}
                      </Badge>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-white text-2xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <span className="text-sm">{destination.country?.countryName || "Unknown Country"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {destination.description || "Experience a magical wedding at this beautiful destination."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-t border-border pt-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Venues</p>
                        <p className="font-medium">{destination.stats.venueCount}+</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Avg. Cost</p>
                        <p className="font-medium">
                          {destination.stats.startingPrice ? (
                            <PackagePrice price={destination.stats.startingPrice} size="base" inline />
                          ) : (
                            "Price on request"
                          )}
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90">
                      Explore {destination.name}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* All Destinations */}
          <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Volkhov, serif' }}>
            All Destinations
          </h2>
          {isLoading ? (
            <div className="max-w-7xl mx-auto">
              <CardSkeletonLoader count={3} />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.filter(d => !d.isFeatured).map((destination) => (
                <Card
                  key={destination._id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#DF6951]/20 cursor-pointer"
                  onClick={() => onViewDetails(destination._id)}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={destination.coverPhotosWeb?.[0]?.fileUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      {destination.trending && (
                        <Badge className="bg-[#F1A501] text-white border-0 shadow-lg">
                          <TrendingUp className="size-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <Badge className="ml-auto bg-white/90 text-foreground border-0 backdrop-blur-sm">
                        <Star className="size-3 mr-1 fill-amber-400 text-amber-400" />
                        {destination.rating}
                      </Badge>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-white mb-1">{destination.name}</h3>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <span className="text-sm">{destination.country?.countryName || "Unknown Country"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {destination.description || "Experience a magical wedding at this beautiful destination."}
                    </p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground">{destination.stats.venueCount}+ venues</span>
                      <span className="font-medium">
                        {destination.stats.startingPrice ? (
                          <PackagePrice price={destination.stats.startingPrice} size="sm" inline />
                        ) : (
                          "Price on request"
                        )}
                      </span>
                    </div>

                    <Button variant="outline" className="w-full border-[#DF6951] text-[#DF6951] hover:bg-rose-50">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

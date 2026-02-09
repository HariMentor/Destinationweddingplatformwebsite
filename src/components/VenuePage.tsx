import { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  Star,
  Heart,
  SlidersHorizontal,
  DollarSign,
  Calendar,
  ChevronDown,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion } from "motion/react";
import { CardSkeletonLoader } from "./ui/loader";
import { Venue } from "./DestinationServices/services/venueService";
import PackagePrice from "./ui/PackagePrice";

interface VenuePageProps {
  onViewDetails: (venueId: string) => void;
  venues: Venue[];
  isLoading: boolean;
}

export function VenuePage({
  onViewDetails,
  venues,
  isLoading,
}: VenuePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (venueId: string) => {
    setFavorites((prev) =>
      prev.includes(venueId)
        ? prev.filter((id) => id !== venueId)
        : [...prev, venueId],
    );
  };

  const filteredVenues = venues.filter((venue) => {
    const venueName = venue.name || "";
    const venueLocation =
      venue.version?.data?.step1?.location?.formattedAddress ||
      venue.destination ||
      "";
    const venueType = venue.version?.data?.step1?.venueType || "Other";

    // Price logic - this might need adjustment based on how price is stored effectively for filtering
    // For now, simple check if we had a price range field, but since we don't standardly have it in the top level:
    const priceAmount =
      venue.version?.data?.step3?.packages?.[0]?.packagePrice?.amount || 0;
    let priceRange = "$$"; // Default
    if (priceAmount < 10000) priceRange = "$";
    else if (priceAmount > 50000) priceRange = "$$$";

    const matchesSearch =
      venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venueLocation.toLowerCase().includes(searchQuery.toLowerCase());

    // As the real data might not map 1:1 to previous static filters instantly, we might want to relax filters or map them dynamically
    // For this step, I'll rely on name/location search mainly and type if present
    return (
      matchesSearch && (selectedType === "all" || venueType === selectedType)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-rose-300 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1
              className="text-5xl md:text-6xl mb-6"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Find Your Perfect Venue
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover verified wedding venues from around the world
            </p>
          </div>

          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto p-6 shadow-xl border-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by venue name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-40 h-12">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Resort">Resort</SelectItem>
                  <SelectItem value="Reach">Beach</SelectItem>
                  <SelectItem value="Garden">Garden</SelectItem>
                  <SelectItem value="Castle">Castle</SelectItem>
                  <SelectItem value="Vineyard">Vineyard</SelectItem>
                  <SelectItem value="Mountain">Mountain</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-full md:w-40 h-12">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="$">$ Budget</SelectItem>
                  <SelectItem value="$$">$$ Moderate</SelectItem>
                  <SelectItem value="$$$">$$$ Luxury</SelectItem>
                </SelectContent>
              </Select>
              <Button className="hidden bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90 h-12 px-8">
                <SlidersHorizontal className="size-5 mr-2" />
                Filters
              </Button>
            </div>
          </Card>

          {/* Results Count */}
          {!isLoading && (
            <div className="max-w-4xl mx-auto mt-8">
              <p className="text-muted-foreground">
                {filteredVenues.length} venues found
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Venue Listings */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="max-w-7xl mx-auto">
              <CardSkeletonLoader count={6} />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => {
                const coverImage =
                  venue.version?.data?.step1?.coverPhotosWeb?.[0]?.fileUrl ||
                  "https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?q=80&w=2069&auto=format&fit=crop";
                const location =
                  venue.version?.data?.step1?.location?.formattedAddress ||
                  venue.destination ||
                  "Location TBD";
                const capacity =
                  venue.version?.data?.step3?.packages?.[0]?.totalPax || "TBD";
                const priceData =
                  venue.version?.data?.step3?.packages?.[0]?.packagePrice;
                const hasSlug = Boolean(venue.slug);

                return (
                  <motion.div
                    key={venue._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all group">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={coverImage}
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
                          {4.5}{" "}
                          {/* Placeholder rating until real rating is available in standard field */}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2">{venue.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm line-clamp-1">
                            {location}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-600">
                            (12 reviews)
                          </span>
                          <span className="text-sm text-gray-600">
                            <Users className="w-4 h-4 inline mr-1" />
                            Up to {capacity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">From</div>
                            <div className="text-xl text-[#DF6951]">
                              {priceData ? (
                                <PackagePrice price={priceData} size="xl" />
                              ) : (
                                "Price on request"
                              )}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!hasSlug}
                            onClick={() => onViewDetails(venue.slug)}
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Load More - Placeholder logic, assuming pagination not yet implemented in parent */}
          {!isLoading && filteredVenues.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8" disabled>
                Load More Venues
                <ChevronDown className="ml-2 size-5" />
              </Button>
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredVenues.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Search className="size-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2">No venues found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

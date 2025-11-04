import { useState } from "react";
import { Search, MapPin, Users, Star, Heart, SlidersHorizontal, DollarSign, Calendar, ChevronDown, BadgeCheck, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion } from "motion/react";

const venues = [
  {
    id: 1,
    name: "Cliffside Resort & Spa",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzY0MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 156,
    capacity: 200,
    priceFrom: "£28,500",
    priceRange: "$$$",
    type: "Resort",
    featured: true,
    verified: true,
    amenities: ["Ocean View", "Catering", "Accommodation"],
  },
  {
    id: 2,
    name: "Tropical Paradise Beach Club",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1693576588167-2e7148490dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjB2ZW51ZXxlbnwxfHx8fDE3NjAzNjQzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 203,
    capacity: 150,
    priceFrom: "£18,000",
    priceRange: "$$",
    type: "Beach",
    featured: true,
    verified: true,
    amenities: ["Beach Access", "Bar", "DJ Setup"],
  },
  {
    id: 3,
    name: "Royal Gardens Estate",
    location: "Tuscany, Italy",
    image: "https://images.unsplash.com/photo-1698616596895-71e43af05b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzY0MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 178,
    capacity: 300,
    priceFrom: "£32,000",
    priceRange: "$$$",
    type: "Garden",
    featured: false,
    verified: true,
    amenities: ["Garden", "Vineyard", "Historic Villa"],
  },
  {
    id: 4,
    name: "Highland Castle",
    location: "Scottish Highlands, UK",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN0bGUlMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzY0MzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 142,
    capacity: 250,
    priceFrom: "£42,000",
    priceRange: "$$$",
    type: "Castle",
    featured: false,
    verified: true,
    amenities: ["Historic Castle", "Rooms", "Grounds"],
  },
  {
    id: 5,
    name: "Sunset Vineyard Estate",
    location: "Napa Valley, USA",
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW5leWFyZCUyMHdlZGRpbmclMjB2ZW51ZXxlbnwxfHx8fDE3NjAzNjQzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 189,
    capacity: 180,
    priceFrom: "£24,500",
    priceRange: "$$",
    type: "Vineyard",
    featured: true,
    verified: true,
    amenities: ["Wine Tasting", "Vineyard Views", "Barn"],
  },
  {
    id: 6,
    name: "Mountain Lodge Resort",
    location: "Banff, Canada",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHdlZGRpbmclMjB2ZW51ZXxlbnwxfHx8fDE3NjAzNjQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 134,
    capacity: 120,
    priceFrom: "£21,000",
    priceRange: "$$",
    type: "Mountain",
    featured: false,
    verified: true,
    amenities: ["Mountain Views", "Lodge", "Outdoor Ceremony"],
  },
];

interface VenuePageProps {
  onViewDetails: (venueId: number) => void;
}

export function VenuePage({ onViewDetails }: VenuePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (venueId: number) => {
    setFavorites(prev => 
      prev.includes(venueId) 
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
  };

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || venue.type === selectedType;
    const matchesPrice = selectedPrice === "all" || venue.priceRange === selectedPrice;
    return matchesSearch && matchesType && matchesPrice;
  });

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
                  <SelectItem value="Beach">Beach</SelectItem>
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
              <Button className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90 h-12 px-8">
                <SlidersHorizontal className="size-5 mr-2" />
                Filters
              </Button>
            </div>
          </Card>

          {/* Results Count */}
          <div className="max-w-4xl mx-auto mt-8">
            <p className="text-muted-foreground">
              {filteredVenues.length} venues found
            </p>
          </div>
        </div>
      </section>

      {/* Venue Listings */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {venue.featured && (
                    <Badge className="absolute top-3 left-3 bg-[#F1A501] border-0">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {venue.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2">{venue.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{venue.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{venue.reviews} reviews</span>
                    <span className="text-sm text-gray-600">
                      <Users className="w-4 h-4 inline mr-1" />
                      Up to {venue.capacity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">From</div>
                      <div className="text-xl text-[#DF6951]">{venue.priceFrom}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewDetails(venue.id)}
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {filteredVenues.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Venues
                <ChevronDown className="ml-2 size-5" />
              </Button>
            </div>
          )}

          {/* No Results */}
          {filteredVenues.length === 0 && (
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

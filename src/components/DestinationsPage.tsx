import { useState } from "react";
import { Search, MapPin, Star, TrendingUp, Calendar, Users } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const destinations = [
  {
    id: 1,
    name: "Tuscany",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Rolling hills, vineyards, and historic villas",
    rating: 4.9,
    venues: 156,
    avgCost: "$25K - $50K",
    region: "Europe",
    trending: true,
    featured: true,
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzYwMzc1MzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Iconic white architecture and sunset views",
    rating: 4.9,
    venues: 128,
    avgCost: "$30K - $60K",
    region: "Europe",
    trending: true,
    featured: true,
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhJTIwdGVtcGxlfGVufDF8fHx8MTc2MDM3NTMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Tropical beaches and temple ceremonies",
    rating: 4.8,
    venues: 203,
    avgCost: "$15K - $35K",
    region: "Asia-Pacific",
    trending: true,
    featured: true,
  },
  {
    id: 4,
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1682308999971-208126ba75ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHJlc29ydHxlbnwxfHx8fDE3NjAyNzQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Overwater villas and crystal waters",
    rating: 4.9,
    venues: 89,
    avgCost: "$40K - $80K",
    region: "Asia-Pacific",
    trending: false,
    featured: false,
  },
  {
    id: 5,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MDMyODIyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Romance capital with timeless elegance",
    rating: 4.8,
    venues: 145,
    avgCost: "$35K - $70K",
    region: "Europe",
    trending: false,
    featured: false,
  },
  {
    id: 6,
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1600587193650-6a6615b3e95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGx1eHVyeSUyMGhvdGVsfGVufDF8fHx8MTc2MDM2Mzk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Ultra-luxury hotels and desert experiences",
    rating: 4.8,
    venues: 112,
    avgCost: "$45K - $90K",
    region: "Middle East",
    trending: true,
    featured: false,
  },
];

interface DestinationsPageProps {
  onViewDetails: (destinationId: number) => void;
}

export function DestinationsPage({ onViewDetails }: DestinationsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "all" || destination.region === selectedRegion;
    return matchesSearch && matchesRegion;
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
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia-Pacific">Asia-Pacific</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Middle East">Middle East</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90 h-12 px-8">
                Search
              </Button>
            </div>
          </Card>

          {/* Results Count */}
          <div className="max-w-4xl mx-auto mt-8">
            <p className="text-muted-foreground">
              {filteredDestinations.length} destinations found
            </p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Volkhov, serif' }}>
            Featured Destinations
          </h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredDestinations.filter(d => d.featured).map((destination) => (
              <Card
                key={destination.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#DF6951]/20 cursor-pointer"
                onClick={() => onViewDetails(destination.id)}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
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
                      <span className="text-sm">{destination.country}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {destination.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-t border-border pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Venues</p>
                      <p className="font-medium">{destination.venues}+</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg. Cost</p>
                      <p className="font-medium">{destination.avgCost}</p>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90">
                    Explore {destination.name}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* All Destinations */}
          <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Volkhov, serif' }}>
            All Destinations
          </h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.filter(d => !d.featured).map((destination) => (
              <Card
                key={destination.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#DF6951]/20 cursor-pointer"
                onClick={() => onViewDetails(destination.id)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
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
                      <span className="text-sm">{destination.country}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-muted-foreground">{destination.venues}+ venues</span>
                    <span className="font-medium">{destination.avgCost}</span>
                  </div>

                  <Button variant="outline" className="w-full border-[#DF6951] text-[#DF6951] hover:bg-rose-50">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

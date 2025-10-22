import { useState } from "react";
import { Search, MapPin, Star, Award, Calendar, ChevronDown } from "lucide-react";
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

const planners = [
  {
    id: 1,
    name: "Elegant Affairs By Priya",
    tagline: "Crafting Timeless Wedding Memories",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    location: "Mumbai, India",
    rating: 4.9,
    reviewCount: 124,
    experience: "12+ Years",
    weddingsPlanned: 150,
    verified: true,
    startingPrice: "₹2,50,000",
    specialties: ["Luxury Weddings", "Destination", "Royal Themes"],
    destinations: ["Goa", "Udaipur", "Bali", "Tuscany"],
    services: ["Full Planning", "Decor", "Vendor Management"],
  },
  {
    id: 2,
    name: "Dreamweavers Events",
    tagline: "Where Dreams Become Reality",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    location: "Delhi, India",
    rating: 4.8,
    reviewCount: 98,
    experience: "10+ Years",
    weddingsPlanned: 120,
    verified: true,
    startingPrice: "₹2,00,000",
    specialties: ["Beach Weddings", "Intimate Ceremonies", "Cultural Fusion"],
    destinations: ["Goa", "Kerala", "Maldives", "Thailand"],
    services: ["Planning", "Design", "Coordination"],
  },
  {
    id: 3,
    name: "Royal Weddings Co.",
    tagline: "Planning Majestic Celebrations",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    location: "Jaipur, India",
    rating: 4.9,
    reviewCount: 156,
    experience: "15+ Years",
    weddingsPlanned: 200,
    verified: true,
    startingPrice: "₹3,00,000",
    specialties: ["Palace Weddings", "Royal Events", "Heritage Venues"],
    destinations: ["Udaipur", "Jaipur", "Jodhpur", "Dubai"],
    services: ["Full Service", "Luxury Planning", "Heritage Events"],
  },
  {
    id: 4,
    name: "Blissful Moments",
    tagline: "Creating Perfect Wedding Stories",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    location: "Bangalore, India",
    rating: 4.7,
    reviewCount: 87,
    experience: "8+ Years",
    weddingsPlanned: 95,
    verified: true,
    startingPrice: "₹1,80,000",
    specialties: ["Garden Weddings", "Eco-Friendly", "Modern Minimalist"],
    destinations: ["Coorg", "Ooty", "Goa", "Sri Lanka"],
    services: ["Planning", "Styling", "Sustainable Events"],
  },
  {
    id: 5,
    name: "Celebration Architects",
    tagline: "Designing Your Perfect Day",
    image: "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    location: "Goa, India",
    rating: 4.8,
    reviewCount: 112,
    experience: "11+ Years",
    weddingsPlanned: 140,
    verified: true,
    startingPrice: "₹2,20,000",
    specialties: ["Beach Weddings", "Sunset Ceremonies", "Bohemian Style"],
    destinations: ["Goa", "Bali", "Phuket", "Santorini"],
    services: ["Destination Planning", "Beach Setups", "Travel Coordination"],
  },
  {
    id: 6,
    name: "Enchanted Weddings",
    tagline: "Magical Moments, Lasting Memories",
    image: "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
    location: "Udaipur, India",
    rating: 4.9,
    reviewCount: 143,
    experience: "14+ Years",
    weddingsPlanned: 180,
    verified: true,
    startingPrice: "₹2,80,000",
    specialties: ["Lakeside Weddings", "Palace Events", "Royal Luxury"],
    destinations: ["Udaipur", "Jaipur", "Dubai", "France"],
    services: ["Luxury Planning", "Palace Coordination", "International Events"],
  },
];

interface PlannersPageProps {
  onViewProfile: (plannerId: number) => void;
}

export function PlannersPage({ onViewProfile }: PlannersPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filteredPlanners = planners.filter(planner => {
    const matchesSearch = 
      planner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planner.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planner.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = locationFilter === "all" || planner.location.includes(locationFilter);
    const matchesSpecialty = specialtyFilter === "all" || 
      planner.specialties.some(s => s.toLowerCase().includes(specialtyFilter.toLowerCase()));
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "experience") return parseInt(b.experience) - parseInt(a.experience);
    if (sortBy === "price-low") return parseInt(a.startingPrice.replace(/[^0-9]/g, '')) - parseInt(b.startingPrice.replace(/[^0-9]/g, ''));
    if (sortBy === "price-high") return parseInt(b.startingPrice.replace(/[^0-9]/g, '')) - parseInt(a.startingPrice.replace(/[^0-9]/g, ''));
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-rose-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
              Find Your Perfect Wedding Planner
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with verified professionals who bring your dream wedding to life
            </p>
          </div>

          {/* Search & Filter */}
          <Card className="max-w-5xl mx-auto p-6 shadow-xl border-2">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name, specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Jaipur">Jaipur</SelectItem>
                  <SelectItem value="Udaipur">Udaipur</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["Luxury", "Beach", "Destination", "Royal", "Intimate"].map((specialty) => (
                <Button
                  key={specialty}
                  variant="outline"
                  size="sm"
                  onClick={() => setSpecialtyFilter(specialty === specialtyFilter ? "all" : specialty)}
                  className={specialtyFilter === specialty ? "bg-rose-50 border-[#DF6951]" : ""}
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </Card>

          <p className="text-center text-muted-foreground mt-6">
            {filteredPlanners.length} verified planners available
          </p>
        </div>
      </section>

      {/* Planners Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlanners.map((planner) => (
              <Card
                key={planner.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-[#DF6951]/20"
                onClick={() => onViewProfile(planner.id)}
              >
                {/* Cover Image */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={planner.image}
                    alt={planner.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Verified Badge */}
                  {planner.verified && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-foreground gap-1 shadow-lg">
                        <Award className="size-3" />
                        Verified
                      </Badge>
                    </div>
                  )}

                  {/* Profile Image */}
                  <div className="absolute bottom-4 left-4 flex items-end gap-3">
                    <img
                      src={planner.profileImage}
                      alt={planner.name}
                      className="size-16 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-1">{planner.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{planner.tagline}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="size-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm">
                        {planner.rating} ({planner.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-[#DF6951]" />
                      <span className="text-sm">{planner.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span className="text-sm">{planner.experience}</span>
                    </div>
                    <div>
                      <span className="text-sm">{planner.weddingsPlanned} Weddings</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {planner.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="text-lg" style={{ fontFamily: 'Volkhov, serif' }}>
                        {planner.startingPrice}
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPlanners.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Search className="size-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2">No planners found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("all");
                  setSpecialtyFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

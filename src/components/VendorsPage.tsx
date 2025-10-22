import { useState } from "react";
import { Search, MapPin, Star, Award, Camera, Video, Palette, ChevronDown } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type VendorType = 'photographer' | 'videographer' | 'decorator';

interface VendorsPageProps {
  vendorType: VendorType;
  onViewProfile: (vendorId: number) => void;
  onChangeVendorType: (type: VendorType) => void;
}

const vendors = {
  photographer: [
    {
      id: 1,
      name: "Capture Moments Studio",
      tagline: "Freezing Time, Creating Memories",
      image: "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=CaptureM",
      location: "Mumbai, India",
      rating: 4.9,
      reviewCount: 156,
      experience: "10+ Years",
      projectsCompleted: 250,
      verified: true,
      startingPrice: "₹35,000",
      specialties: ["Candid", "Traditional", "Drone Photography"],
      style: "Candid & Artistic",
      equipment: "Canon R5, Sony A7III",
    },
    {
      id: 2,
      name: "Eternal Frames Photography",
      tagline: "Every Moment Tells a Story",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eternal",
      location: "Delhi, India",
      rating: 4.8,
      reviewCount: 134,
      experience: "12+ Years",
      projectsCompleted: 300,
      verified: true,
      startingPrice: "₹40,000",
      specialties: ["Pre-wedding", "Destination", "Portraits"],
      style: "Cinematic & Editorial",
      equipment: "Nikon Z9, DJI Mavic",
    },
    {
      id: 3,
      name: "Light & Love Studios",
      tagline: "Painting with Light",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=LightLove",
      location: "Bangalore, India",
      rating: 4.9,
      reviewCount: 178,
      experience: "8+ Years",
      projectsCompleted: 180,
      verified: true,
      startingPrice: "₹30,000",
      specialties: ["Candid", "Documentary", "Fine Art"],
      style: "Natural & Timeless",
      equipment: "Canon EOS R6, Profoto",
    },
  ],
  videographer: [
    {
      id: 1,
      name: "Cinematic Dreams",
      tagline: "Your Story, Our Passion",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=CinematicD",
      location: "Mumbai, India",
      rating: 4.9,
      reviewCount: 142,
      experience: "9+ Years",
      projectsCompleted: 200,
      verified: true,
      startingPrice: "₹50,000",
      specialties: ["Cinematic", "Drone", "Same Day Edit"],
      style: "Cinematic & Emotional",
      equipment: "Sony FX3, DJI Ronin",
    },
    {
      id: 2,
      name: "Motion Picture Films",
      tagline: "Moments in Motion",
      image: "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=MotionP",
      location: "Goa, India",
      rating: 4.8,
      reviewCount: 128,
      experience: "11+ Years",
      projectsCompleted: 220,
      verified: true,
      startingPrice: "₹55,000",
      specialties: ["Documentary", "Highlights", "Feature Films"],
      style: "Documentary & Artistic",
      equipment: "RED Komodo, DJI Inspire",
    },
    {
      id: 3,
      name: "Frame by Frame Productions",
      tagline: "Creating Timeless Films",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=FrameF",
      location: "Udaipur, India",
      rating: 4.9,
      reviewCount: 165,
      experience: "7+ Years",
      projectsCompleted: 150,
      verified: true,
      startingPrice: "₹45,000",
      specialties: ["Traditional", "Cinematic", "Teaser Videos"],
      style: "Elegant & Classic",
      equipment: "Canon C70, Gimbal Pro",
    },
  ],
  decorator: [
    {
      id: 1,
      name: "Bloom & Bliss Decor",
      tagline: "Designing Dreams",
      image: "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=BloomB",
      location: "Mumbai, India",
      rating: 4.9,
      reviewCount: 198,
      experience: "13+ Years",
      projectsCompleted: 350,
      verified: true,
      startingPrice: "₹1,50,000",
      specialties: ["Floral Decor", "Royal Themes", "Destination"],
      style: "Elegant & Luxurious",
      equipment: "Fresh Flowers, Fabric, LED",
    },
    {
      id: 2,
      name: "Enchanted Events Decor",
      tagline: "Transforming Spaces into Magic",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=EnchantedE",
      location: "Jaipur, India",
      rating: 4.8,
      reviewCount: 176,
      experience: "15+ Years",
      projectsCompleted: 400,
      verified: true,
      startingPrice: "₹2,00,000",
      specialties: ["Palace Decor", "Heritage Themes", "Grand Setups"],
      style: "Royal & Opulent",
      equipment: "Premium Fabrics, Crystal, Gold",
    },
    {
      id: 3,
      name: "Modern Muse Decorators",
      tagline: "Contemporary Elegance",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=ModernM",
      location: "Bangalore, India",
      rating: 4.9,
      reviewCount: 154,
      experience: "9+ Years",
      projectsCompleted: 220,
      verified: true,
      startingPrice: "₹1,20,000",
      specialties: ["Minimalist", "Boho", "Sustainable Decor"],
      style: "Modern & Chic",
      equipment: "Eco-friendly Materials, LED, Greenery",
    },
  ],
};

const vendorConfig = {
  photographer: {
    title: "Wedding Photographers",
    subtitle: "Capture your precious moments with expert photographers",
    icon: Camera,
    color: "from-blue-500 to-purple-500",
  },
  videographer: {
    title: "Wedding Videographers",
    subtitle: "Tell your love story through cinematic films",
    icon: Video,
    color: "from-red-500 to-pink-500",
  },
  decorator: {
    title: "Wedding Decorators",
    subtitle: "Transform your venue into a magical space",
    icon: Palette,
    color: "from-green-500 to-teal-500",
  },
};

export function VendorsPage({ vendorType, onViewProfile, onChangeVendorType }: VendorsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const config = vendorConfig[vendorType];
  const vendorList = vendors[vendorType];
  const Icon = config.icon;

  const filteredVendors = vendorList.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === "all" || vendor.location.includes(locationFilter);
    return matchesSearch && matchesLocation;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "experience") return parseInt(b.experience) - parseInt(a.experience);
    if (sortBy === "price-low") return parseInt(a.startingPrice.replace(/[^0-9]/g, '')) - parseInt(b.startingPrice.replace(/[^0-9]/g, ''));
    if (sortBy === "price-high") return parseInt(b.startingPrice.replace(/[^0-9]/g, '')) - parseInt(a.startingPrice.replace(/[^0-9]/g, ''));
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      {/* Vendor Type Switcher */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 py-4 overflow-x-auto">
            <span className="text-sm text-muted-foreground flex-shrink-0">Vendors:</span>
            <button
              onClick={() => onChangeVendorType('photographer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all flex-shrink-0 ${
                vendorType === 'photographer'
                  ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Camera className="size-4" />
              Photographers
            </button>
            <button
              onClick={() => onChangeVendorType('videographer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all flex-shrink-0 ${
                vendorType === 'videographer'
                  ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Video className="size-4" />
              Videographers
            </button>
            <button
              onClick={() => onChangeVendorType('decorator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all flex-shrink-0 ${
                vendorType === 'decorator'
                  ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Palette className="size-4" />
              Decorators
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-rose-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] mb-4">
              <Icon className="size-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
              {config.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {config.subtitle}
            </p>
          </div>

          {/* Search & Filter */}
          <Card className="max-w-5xl mx-auto p-6 shadow-xl border-2">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search..."
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
          </Card>

          <p className="text-center text-muted-foreground mt-6">
            {filteredVendors.length} verified professionals available
          </p>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-[#DF6951]/20"
                onClick={() => onViewProfile(vendor.id)}
              >
                {/* Cover Image */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Service Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      vendorType === 'photographer' ? 'bg-blue-500' :
                      vendorType === 'videographer' ? 'bg-red-500' :
                      'bg-green-500'
                    } text-white gap-1 shadow-lg`}>
                      <Icon className="size-3" />
                      {vendorType.charAt(0).toUpperCase() + vendorType.slice(1)}
                    </Badge>
                  </div>

                  {/* Verified Badge */}
                  {vendor.verified && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-foreground gap-1 shadow-lg">
                        <Award className="size-3" />
                        Verified
                      </Badge>
                    </div>
                  )}

                  {/* Profile Image */}
                  <div className="absolute bottom-4 left-4">
                    <img
                      src={vendor.profileImage}
                      alt={vendor.name}
                      className="size-16 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-1">{vendor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{vendor.tagline}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="size-4 text-amber-500 fill-amber-500" />
                      <span>{vendor.rating} ({vendor.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-[#DF6951]" />
                      <span>{vendor.location}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">{vendor.experience} • {vendor.projectsCompleted} Projects</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.specialties.slice(0, 3).map((specialty, index) => (
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
                        {vendor.startingPrice}
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
          {filteredVendors.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Search className="size-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2">No vendors found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("all");
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

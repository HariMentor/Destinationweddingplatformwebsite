import { useState } from "react";
import { MapPin, Clock, Star, Users, Heart, Calendar, Filter, Search, X, ChevronDown, BadgeCheck, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ToursPageProps {
  onViewDetails: (tourId: number) => void;
}

export function ToursPage({ onViewDetails }: ToursPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const categories = [
    { id: "all", name: "All Tours", icon: "🌍" },
    { id: "romantic", name: "Romantic Experiences", icon: "💕" },
    { id: "adventure", name: "Adventure", icon: "🏔️" },
    { id: "cultural", name: "Cultural", icon: "🏛️" },
    { id: "food", name: "Food & Wine", icon: "🍷" },
    { id: "wellness", name: "Wellness & Spa", icon: "🧘" },
    { id: "water", name: "Water Activities", icon: "🚤" },
  ];

  const tours = [
    {
      id: 1,
      title: "Private Sunset Cruise with Champagne",
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1594244094968-cd4fe22fcd25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBib2F0JTIwY3J1aXNlfGVufDF8fHx8MTc2MDM4MTEzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 12500,
      originalPrice: 15000,
      duration: "3 hours",
      rating: 4.9,
      reviews: 1247,
      category: "romantic",
      badge: "Bestseller",
      highlights: ["Private boat", "Champagne included", "Sunset views"],
      maxGuests: 2,
      instantConfirmation: true,
      verified: true,
    },
    {
      id: 2,
      title: "Wine Tasting Tour at Tuscan Vineyards",
      location: "Tuscany, Italy",
      image: "https://images.unsplash.com/photo-1687877954846-00876ced28bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZyUyMHRvdXJ8ZW58MXx8fHwxNzYwMzgxMTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 8500,
      duration: "5 hours",
      rating: 4.8,
      reviews: 892,
      category: "food",
      badge: "Popular",
      highlights: ["3 wineries", "Local lunch", "Expert guide"],
      maxGuests: 8,
      instantConfirmation: true,
      verified: true,
    },
    {
      id: 3,
      title: "Hot Air Balloon Ride at Sunrise",
      location: "Jaipur, India",
      image: "https://images.unsplash.com/photo-1507691640734-887fa7be3377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBhaXIlMjBiYWxsb29uJTIwcmlkZXxlbnwxfHx8fDE3NjAzODExMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 18500,
      duration: "4 hours",
      rating: 4.9,
      reviews: 1543,
      category: "adventure",
      badge: "Bestseller",
      highlights: ["Sunrise flight", "Champagne breakfast", "Photos included"],
      maxGuests: 4,
      instantConfirmation: false,
      verified: true,
    },
    {
      id: 4,
      title: "Couples Cooking Class & Market Tour",
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1758522488348-0a8efcc77cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwY2xhc3MlMjBjb3VwbGV8ZW58MXx8fHwxNzYwMzgxMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 6500,
      duration: "4 hours",
      rating: 4.7,
      reviews: 634,
      category: "food",
      highlights: ["Market visit", "Hands-on cooking", "Take recipes home"],
      maxGuests: 2,
      instantConfirmation: true,
      verified: true,
    },
    {
      id: 5,
      title: "Luxury Couples Spa Experience",
      location: "Ubud, Bali",
      image: "https://images.unsplash.com/photo-1671620793369-1d39e4e8faeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMGNvdXBsZXxlbnwxfHx8fDE3NjAzODExMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 9500,
      originalPrice: 12000,
      duration: "3 hours",
      rating: 4.9,
      reviews: 978,
      category: "wellness",
      badge: "Top Rated",
      highlights: ["Couples massage", "Flower bath", "Refreshments"],
      maxGuests: 2,
      instantConfirmation: true,
      verified: true,
    },
    {
      id: 6,
      title: "Private City Walking Tour & Photoshoot",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1599477153697-dc95e8e4bfa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByb21hbnRpYyUyMHRvdXJ8ZW58MXx8fHwxNzYwMzgxMTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 11500,
      duration: "3 hours",
      rating: 4.8,
      reviews: 756,
      category: "romantic",
      badge: "Popular",
      highlights: ["Professional photos", "Hidden gems", "Personalized route"],
      maxGuests: 2,
      instantConfirmation: true,
      verified: true,
    },
    {
      id: 7,
      title: "Helicopter Tour Over the Coast",
      location: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
      price: 28500,
      duration: "25 minutes",
      rating: 4.9,
      reviews: 445,
      category: "adventure",
      badge: "Luxury",
      highlights: ["Aerial views", "Burj Khalifa", "Palm Jumeirah"],
      maxGuests: 4,
      instantConfirmation: false,
      verified: true,
    },
    {
      id: 8,
      title: "Snorkeling & Beach BBQ Experience",
      location: "Maldives",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      price: 7500,
      duration: "6 hours",
      rating: 4.8,
      reviews: 892,
      category: "water",
      highlights: ["Coral reef tour", "BBQ lunch", "Equipment included"],
      maxGuests: 10,
      instantConfirmation: true,
      verified: true,
    },
    {
      id: 9,
      title: "Heritage Palace Tour with Royal Dinner",
      location: "Udaipur, India",
      image: "https://images.unsplash.com/photo-1631116593186-7ca2dc21680f?w=800",
      price: 14500,
      duration: "4 hours",
      rating: 4.9,
      reviews: 1123,
      category: "cultural",
      badge: "Bestseller",
      highlights: ["Palace access", "Royal dinner", "Cultural performance"],
      maxGuests: 6,
      instantConfirmation: true,
      verified: true,
    },
  ];

  const filteredTours = tours.filter((tour) => {
    const matchesCategory = selectedCategory === "all" || tour.category === selectedCategory;
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceRange === "all" ||
                        (priceRange === "low" && tour.price < 10000) ||
                        (priceRange === "medium" && tour.price >= 10000 && tour.price < 20000) ||
                        (priceRange === "high" && tour.price >= 20000);
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const toggleFavorite = (tourId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(tourId)) {
        newFavorites.delete(tourId);
      } else {
        newFavorites.add(tourId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-rose-50/30 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
              Curated Wedding <span className="text-[#DF6951]">Experiences</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              From romantic sunsets to thrilling adventures—make your destination wedding unforgettable
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="Search tours, activities, experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-0 bg-transparent"
                />
              </div>
              <Button
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="gap-2 h-12"
              >
                <Filter className="size-4" />
                Filters
                {showFilters && <X className="size-4" />}
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90 h-12"
              >
                Search
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 mt-4 flex flex-wrap gap-4"
              >
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm mb-2 block">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Under ₹10,000</SelectItem>
                      <SelectItem value="medium">₹10,000 - ₹20,000</SelectItem>
                      <SelectItem value="high">Above ₹20,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm mb-2 block">Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="short">Under 3 hours</SelectItem>
                      <SelectItem value="medium">3-6 hours</SelectItem>
                      <SelectItem value="full">Full day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`whitespace-nowrap gap-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#02542D] to-[#02542D]/80 hover:from-[#02542D]/90 hover:to-[#02542D]/70"
                    : ""
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                {filteredTours.length} Experience{filteredTours.length !== 1 ? "s" : ""} Available
              </h2>
              <p className="text-muted-foreground">
                {selectedCategory !== "all"
                  ? categories.find((c) => c.id === selectedCategory)?.name
                  : "All categories"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative aspect-[4/3]" onClick={() => onViewDetails(tour.id)}>
                    <ImageWithFallback
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {tour.badge && (
                      <Badge className="absolute top-4 left-4 bg-[#02542D] hover:bg-[#02542D] border-0 text-white">
                        {tour.badge}
                      </Badge>
                    )}

                    {/* Verified Badge */}
                    {tour.verified && (
                      <Badge className="absolute top-4 right-14 bg-white hover:bg-white border-0 text-[#02542D]">
                        <BadgeCheck className="size-3 mr-1" />
                        VERIFIED
                      </Badge>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tour.id);
                      }}
                      className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                    >
                      <Heart
                        className={`size-5 ${
                          favorites.has(tour.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700"
                        }`}
                      />
                    </button>

                    {/* Instant Confirmation Badge */}
                    {tour.instantConfirmation && (
                      <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <TrendingUp className="size-3" />
                        Instant Confirmation
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col" onClick={() => onViewDetails(tour.id)}>
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="size-4 text-[#DF6951] flex-shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">{tour.location}</span>
                    </div>

                    <h3 className="mb-3 line-clamp-2">{tour.title}</h3>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.highlights.slice(0, 2).map((highlight, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto">
                      {/* Rating & Duration */}
                      <div className="flex items-center justify-between mb-4 text-sm pb-4 border-b">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span>{tour.rating}</span>
                          <span className="text-muted-foreground">({tour.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="size-4" />
                          <span>{tour.duration}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-end justify-between">
                        <div>
                          {tour.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ₹{tour.originalPrice.toLocaleString()}
                            </div>
                          )}
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs text-muted-foreground">From</span>
                            <span className="text-2xl text-[#DF6951]">
                              ₹{tour.price.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">per person</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(tour.id);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl mb-2">No tours found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#02542D] to-[#DF6951] text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Let us create a custom experience tailored to your wedding celebration
            </p>
            <Button
              size="lg"
              className="bg-white text-[#02542D] hover:bg-gray-100 px-8"
            >
              Request Custom Tour
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
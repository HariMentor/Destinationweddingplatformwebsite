import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Users,
  Heart,
  Calendar,
  Check,
  X,
  Share2,
  MessageCircle,
  Shield,
  Award,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface TourDetailPageProps {
  tourId: number;
  onBack: () => void;
}

export function TourDetailPage({ tourId, onBack }: TourDetailPageProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [guestCount, setGuestCount] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock tour data - in real app, fetch based on tourId
  const tour = {
    id: tourId,
    title: "Private Sunset Cruise with Champagne",
    location: "Santorini, Greece",
    images: [
      "https://images.unsplash.com/photo-1594244094968-cd4fe22fcd25?w=1200",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200",
      "https://images.unsplash.com/photo-1507691640734-887fa7be3377?w=1200",
    ],
    price: 12500,
    originalPrice: 15000,
    duration: "3 hours",
    rating: 4.9,
    reviewCount: 1247,
    category: "Romantic Experience",
    badge: "Bestseller",
    maxGuests: 2,
    minGuests: 1,
    instantConfirmation: true,
    description:
      "Experience the magic of a Santorini sunset aboard your own private boat. This intimate cruise includes champagne service, local appetizers, and breathtaking views of the caldera and iconic white-washed villages. Your experienced captain will guide you to the best viewing spots while you relax and create unforgettable memories with your partner.",
    highlights: [
      "Private boat exclusively for you and your partner",
      "Complimentary bottle of premium champagne",
      "Selection of Greek appetizers and fresh fruit",
      "Professional captain and crew",
      "Stunning sunset views of the caldera",
      "Photo opportunities at iconic locations",
      "Swimming stop at hot springs (optional)",
      "Hotel pickup and drop-off included",
    ],
    included: [
      "Private boat rental",
      "Professional captain and crew",
      "Champagne and beverages",
      "Greek appetizers",
      "Hotel transfers",
      "Snorkeling equipment",
      "Towels provided",
      "Insurance",
    ],
    notIncluded: [
      "Gratuities (optional)",
      "Additional drinks",
      "Personal expenses",
    ],
    itinerary: [
      {
        time: "17:00",
        title: "Hotel Pickup",
        description: "Pickup from your hotel in Santorini",
      },
      {
        time: "17:30",
        title: "Departure from Port",
        description: "Begin your private cruise along the caldera",
      },
      {
        time: "18:00",
        title: "Sailing & Sightseeing",
        description: "Enjoy champagne while sailing past iconic locations",
      },
      {
        time: "18:45",
        title: "Swimming Stop",
        description: "Optional swim in the crystal-clear waters",
      },
      {
        time: "19:30",
        title: "Sunset Viewing",
        description: "Best vantage point for the famous Santorini sunset",
      },
      {
        time: "20:00",
        title: "Return to Port",
        description: "Sail back as the stars begin to appear",
      },
    ],
    importantInfo: [
      "Please arrive 15 minutes before departure time",
      "Comfortable clothing and sun protection recommended",
      "Swimming suits if you wish to swim",
      "This tour is weather-dependent and may be rescheduled",
      "Not suitable for people with severe mobility issues",
      "Minimum age: 12 years",
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before the experience starts. After that, no refunds will be provided.",
    languages: ["English", "Greek", "Spanish", "French"],
    provider: {
      name: "Santorini Sailing Adventures",
      rating: 4.9,
      reviewCount: 3421,
      responseTime: "Within 1 hour",
      memberSince: "2015",
      verified: true,
    },
    reviewsList: [
      {
        id: 1,
        author: "Sarah & Michael",
        avatar: "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?w=200",
        rating: 5,
        date: "March 2025",
        comment:
          "Absolutely magical experience! The sunset was breathtaking and the crew was so attentive. Perfect for our honeymoon. Highly recommend!",
        helpful: 45,
      },
      {
        id: 2,
        author: "Emma Johnson",
        avatar: "https://images.unsplash.com/photo-1721357566635-0ffd8fc602ad?w=200",
        rating: 5,
        date: "February 2025",
        comment:
          "This was the highlight of our trip to Santorini. The champagne was excellent and the views were unbelievable. Worth every penny!",
        helpful: 32,
      },
      {
        id: 3,
        author: "David & Lisa",
        avatar: "https://images.unsplash.com/photo-1759716550717-2616343c8d67?w=200",
        rating: 5,
        date: "January 2025",
        comment:
          "Perfect romantic experience. The crew made us feel special and the boat was beautiful. Can't wait to come back!",
        helpful: 28,
      },
    ],
    similarTours: [
      {
        id: 2,
        title: "Wine Tasting Tour",
        image: "https://images.unsplash.com/photo-1687877954846-00876ced28bf?w=400",
        price: 8500,
        rating: 4.8,
        reviewCount: 892,
      },
      {
        id: 3,
        title: "Hot Air Balloon Ride",
        image: "https://images.unsplash.com/photo-1507691640734-887fa7be3377?w=400",
        price: 18500,
        rating: 4.9,
        reviewCount: 1543,
      },
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" />
          Back to Tours
        </Button>
      </div>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 md:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden">
          <div className="relative aspect-[4/3] md:aspect-auto md:row-span-2 group">
            <ImageWithFallback
              src={tour.images[currentImageIndex]}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 size-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 size-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>
            {tour.badge && (
              <Badge className="absolute top-4 left-4 bg-white text-foreground border-0 shadow-md">
                {tour.badge}
              </Badge>
            )}
          </div>
          {tour.images.slice(1, 3).map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] cursor-pointer group"
              onClick={() => setCurrentImageIndex(index + 1)}
            >
              <ImageWithFallback
                src={image}
                alt={`${tour.title} ${index + 2}`}
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-3 bg-[#DF6951]/10 text-[#DF6951] border-0">
                    {tour.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl mb-3">{tour.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-foreground/60">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="size-4" />
                      <span>Up to {tour.maxGuests} guests</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart
                      className={`size-5 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="size-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-[#F1A501] text-[#F1A501]" />
                  <span className="font-medium">{tour.rating}</span>
                  <span className="text-foreground/60">({tour.reviewCount} reviews)</span>
                </div>
                {tour.instantConfirmation && (
                  <Badge className="bg-green-500 text-white border-0">
                    ⚡ Instant Confirmation
                  </Badge>
                )}
              </div>
            </motion.div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-2xl mb-4">About This Experience</h2>
              <p className="text-foreground/70 leading-relaxed">{tour.description}</p>
            </div>

            <Separator />

            {/* Highlights */}
            <div>
              <h2 className="text-2xl mb-4">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/70">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* What's Included */}
            <div>
              <h2 className="text-2xl mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-3 text-green-600">✓ Included</h3>
                  <div className="space-y-2">
                    {tour.included.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="size-4 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-sm text-foreground/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 text-red-600">✗ Not Included</h3>
                  <div className="space-y-2">
                    {tour.notIncluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <X className="size-4 text-red-500 flex-shrink-0 mt-1" />
                        <span className="text-sm text-foreground/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Itinerary */}
            <div>
              <h2 className="text-2xl mb-4">Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="size-10 rounded-full bg-[#DF6951]/10 flex items-center justify-center text-[#DF6951] flex-shrink-0">
                        {index + 1}
                      </div>
                      {index < tour.itinerary.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm text-[#DF6951] font-medium">
                          {item.time}
                        </span>
                        <h3>{item.title}</h3>
                      </div>
                      <p className="text-sm text-foreground/60">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Important Information */}
            <div>
              <h2 className="text-2xl mb-4">Important Information</h2>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <ul className="space-y-2">
                  {tour.importantInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-600">•</span>
                      <span className="text-foreground/70">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator />

            {/* Cancellation Policy */}
            <div>
              <h2 className="text-2xl mb-4">Cancellation Policy</h2>
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
                <p className="text-sm text-foreground/70">{tour.cancellationPolicy}</p>
              </div>
            </div>

            <Separator />

            {/* Provider Info */}
            <div>
              <h2 className="text-2xl mb-4">Tour Provider</h2>
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="size-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#DF6951] text-white text-xl">
                      SA
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3>{tour.provider.name}</h3>
                      {tour.provider.verified && (
                        <Badge className="bg-blue-500 text-white border-0 text-xs">
                          <Shield className="size-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-foreground/60 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-[#F1A501] text-[#F1A501]" />
                        <span>{tour.provider.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{tour.provider.reviewCount} reviews</span>
                      <span>•</span>
                      <span>Member since {tour.provider.memberSince}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageCircle className="size-4 text-green-500" />
                      <span className="text-green-600">
                        Typically responds {tour.provider.responseTime}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="size-4" />
                  Contact Provider
                </Button>
              </Card>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Guest Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="size-6 fill-[#F1A501] text-[#F1A501]" />
                  <span className="text-2xl font-medium">{tour.rating}</span>
                  <span className="text-foreground/60">({tour.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {tour.reviewsList.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4>{review.author}</h4>
                          <span className="text-sm text-foreground/60">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="size-4 fill-[#F1A501] text-[#F1A501]"
                            />
                          ))}
                        </div>
                        <p className="text-foreground/70 mb-3">{review.comment}</p>
                        <button className="text-sm text-foreground/60 hover:text-foreground">
                          👍 Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                View All {tour.reviewCount} Reviews
              </Button>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6 shadow-xl">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  {tour.originalPrice && (
                    <span className="text-lg text-foreground/40 line-through">
                      ₹{tour.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl text-[#DF6951]">
                    ₹{tour.price.toLocaleString()}
                  </span>
                  <span className="text-foreground/60">per person</span>
                </div>
                {tour.originalPrice && (
                  <Badge className="mt-2 bg-green-500 text-white border-0">
                    Save ₹{(tour.originalPrice - tour.price).toLocaleString()}
                  </Badge>
                )}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm mb-2 block">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Number of Guests</label>
                  <div className="flex items-center justify-between border border-border rounded-lg p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setGuestCount(Math.max(tour.minGuests, guestCount - 1))}
                      disabled={guestCount <= tour.minGuests}
                    >
                      -
                    </Button>
                    <span className="font-medium">{guestCount} Guests</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setGuestCount(Math.min(tour.maxGuests, guestCount + 1))}
                      disabled={guestCount >= tour.maxGuests}
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-xs text-foreground/60 mt-1">
                    Max {tour.maxGuests} guests
                  </p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 mb-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>₹{tour.price.toLocaleString()} × {guestCount} guests</span>
                  <span>₹{(tour.price * guestCount).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Service fee</span>
                  <span>₹{Math.round(tour.price * guestCount * 0.1).toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="text-xl text-[#DF6951]">
                    ₹{Math.round(tour.price * guestCount * 1.1).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] mb-3"
                disabled={!selectedDate}
              >
                Book Now
              </Button>

              <Button size="lg" variant="outline" className="w-full">
                Add to Wishlist
              </Button>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-foreground/60">
                  <Shield className="size-4 text-green-500" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/60">
                  <Award className="size-4 text-green-500" />
                  <span>Best price guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/60">
                  <Globe className="size-4 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Similar Tours */}
        {tour.similarTours.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl md:text-3xl mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tour.similarTours.map((similar) => (
                <Card
                  key={similar.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <div className="relative aspect-[4/3]">
                    <ImageWithFallback
                      src={similar.image}
                      alt={similar.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2">{similar.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="size-4 fill-[#F1A501] text-[#F1A501]" />
                      <span className="text-sm">{similar.rating}</span>
                      <span className="text-sm text-foreground/60">
                        ({similar.reviewCount})
                      </span>
                    </div>
                    <div className="text-xl text-[#DF6951]">
                      ₹{similar.price.toLocaleString()}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

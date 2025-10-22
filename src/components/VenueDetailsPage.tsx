"use client";

import { useState } from "react";
import { 
  MapPin, Star, Users, Calendar, Clock, Wifi, Music, Utensils, 
  Camera, Sparkles, Wine, Car, Check, ArrowLeft, Heart, Share2,
  Mail, Phone, MessageSquare, ChevronLeft, ChevronRight
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { useCurrency } from "./CurrencyContext";

interface VenueDetailsPageProps {
  venueId: number;
  onBack: () => void;
}

const venueDetails = {
  1: {
    name: "Cliffside Resort & Spa",
    location: "Santorini, Greece",
    rating: 4.9,
    reviews: 156,
    description: "Perched on the stunning cliffs of Santorini, our resort offers breathtaking views of the Aegean Sea and the iconic sunset. With world-class amenities and personalized service, we create unforgettable wedding experiences in one of the world's most romantic destinations.",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzY0MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1683408502958-711fe3ff4899?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB3ZWRkaW5nJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc2MDM3NDYyMHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwY2VyZW1vbnklMjBzZXR1cHxlbnwxfHx8fDE3NjAzNzQ2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYmFucXVldCUyMGhhbGx8ZW58MXx8fHwxNzYwMzc0NjIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBnYXJkZW58ZW58MXx8fHwxNzYwMzc0NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
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
        name: "Essential",
        price: 15000,
        guests: "Up to 100",
        features: [
          "Ceremony & Reception Venue",
          "Basic Decor Setup",
          "4-Hour Venue Rental",
          "Tables & Chairs",
          "Basic Sound System",
          "Coordinator on Site",
        ],
      },
      {
        name: "Premium",
        price: 25000,
        guests: "Up to 150",
        popular: true,
        features: [
          "Everything in Essential",
          "Premium Decor & Floral",
          "6-Hour Venue Rental",
          "Advanced Sound & Lighting",
          "Cocktail Hour Setup",
          "Bridal Suite Access",
          "Complimentary Wine Service",
        ],
      },
      {
        name: "Luxury",
        price: 40000,
        guests: "Up to 200",
        features: [
          "Everything in Premium",
          "Custom Decor Design",
          "Full Day Venue Access",
          "Premium Bar Service",
          "Multiple Event Spaces",
          "Accommodation Packages",
          "Spa Access for Couple",
          "Welcome Dinner Included",
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

export function VenueDetailsPage({ venueId, onBack }: VenueDetailsPageProps) {
  const venue = venueDetails[venueId as keyof typeof venueDetails] || venueDetails[1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`size-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="size-5" />
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Main Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group">
            <ImageWithFallback
              src={venue.images[currentImageIndex]}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            
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
              {currentImageIndex + 1} / {venue.images.length}
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 gap-4">
            {venue.images.slice(1, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index + 1)}
                className={`relative h-[120px] md:h-[150px] rounded-xl overflow-hidden hover:opacity-90 transition-opacity ${
                  currentImageIndex === index + 1 ? "ring-2 ring-[#DF6951]" : ""
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${venue.name} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
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
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                    {venue.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="size-5" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="size-5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{venue.rating}</span>
                      <span className="text-muted-foreground">({venue.reviews} reviews)</span>
                    </div>
                    <Badge className="bg-emerald-500 text-white">Verified</Badge>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {venue.description}
              </p>
            </div>

            <Separator />

            {/* Quick Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="size-5 text-[#DF6951]" />
                  <h3>Guest Capacity</h3>
                </div>
                <p className="text-2xl" style={{ fontFamily: 'Volkhov, serif' }}>
                  {venue.capacity.min} - {venue.capacity.max}
                </p>
                <p className="text-sm text-muted-foreground">guests</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="size-5 text-[#DF6951]" />
                  <h3>Starting Price</h3>
                </div>
                <p className="text-2xl" style={{ fontFamily: 'Volkhov, serif' }}>
                  {formatPrice(venue.pricing.starting)}
                </p>
                <p className="text-sm text-muted-foreground">per event</p>
              </Card>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="mb-6">Amenities & Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-rose-50/50">
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
              <h2 className="mb-6">Wedding Packages</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {venue.packages.map((pkg, index) => (
                  <Card
                    key={index}
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      selectedPackage === pkg.name
                        ? "border-2 border-[#DF6951] shadow-lg"
                        : pkg.popular
                        ? "border-2 border-amber-200"
                        : ""
                    }`}
                    onClick={() => setSelectedPackage(pkg.name)}
                  >
                    {pkg.popular && (
                      <Badge className="mb-3 bg-amber-500 text-white">Most Popular</Badge>
                    )}
                    <h3 className="mb-2">{pkg.name}</h3>
                    <div className="mb-4">
                      <div className="text-3xl mb-1" style={{ fontFamily: 'Volkhov, serif' }}>
                        ${pkg.price.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">{pkg.guests}</p>
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-sm">
                          <Check className="size-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Map */}
            <div>
              <h2 className="mb-6">Location</h2>
              <Card className="p-6">
                <div className="aspect-video bg-gradient-to-br from-rose-100 to-amber-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Simple map placeholder */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(0deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 20px),
                                       repeating-linear-gradient(90deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 20px)`
                    }} />
                  </div>
                  <div className="relative text-center">
                    <MapPin className="size-16 text-[#DF6951] mx-auto mb-4" />
                    <p className="font-medium">{venue.location}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {venue.coordinates.lat}°N, {venue.coordinates.lng}°E
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
                  <TabsTrigger value="enquiry">Send Enquiry</TabsTrigger>
                  <TabsTrigger value="book">Book Now</TabsTrigger>
                </TabsList>

                <TabsContent value="enquiry" className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input id="guests" type="number" placeholder="100" className="mt-1" />
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

                  <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90">
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
                          onClick={() => setSelectedPackage(pkg.name)}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            selectedPackage === pkg.name
                              ? "border-[#DF6951] bg-rose-50"
                              : "border-border hover:border-[#DF6951]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{pkg.name}</span>
                            <span className="text-sm">{formatPrice(pkg.price)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="book-name">Full Name</Label>
                    <Input id="book-name" placeholder="John Doe" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="book-email">Email</Label>
                    <Input id="book-email" type="email" placeholder="john@example.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="book-phone">Phone Number</Label>
                    <Input id="book-phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="book-date">Event Date</Label>
                    <Input id="book-date" type="date" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="book-guests">Number of Guests</Label>
                    <Input id="book-guests" type="number" placeholder="100" className="mt-1" />
                  </div>

                  <Separator />

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Selected Package</span>
                      <span className="font-medium">{selectedPackage || "None"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total</span>
                      <span className="text-2xl" style={{ fontFamily: 'Volkhov, serif' }}>
                        {selectedPackage ? formatPrice(venue.packages.find(p => p.name === selectedPackage)?.price || 0) : formatPrice(0)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90">
                    <Calendar className="mr-2 size-5" />
                    Proceed to Booking
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment • Instant confirmation
                  </p>
                </TabsContent>
              </Tabs>

              <Separator className="my-6" />

              <div className="space-y-3">
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="size-4" />
                  Call Us
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <MessageSquare className="size-4" />
                  Live Chat
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

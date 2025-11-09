import image_00d4a9ab046ee595171f253db694410941523eba from 'figma:asset/00d4a9ab046ee595171f253db694410941523eba.png';
import image_713f8eb9bbae3295163a927a337743f7f41a5691 from 'figma:asset/713f8eb9bbae3295163a927a337743f7f41a5691.png';
import image_cb798e5507ad03096d664717f1ce0c0f0124765b from 'figma:asset/cb798e5507ad03096d664717f1ce0c0f0124765b.png';
import image_351a2514681d06a45fc6e0fb4af691f66966d699 from 'figma:asset/351a2514681d06a45fc6e0fb4af691f66966d699.png';
import image_04fb72f45089eae606b139c0ba08a0bada49570f from 'figma:asset/04fb72f45089eae606b139c0ba08a0bada49570f.png';
"use client";

import { useState } from "react";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Clock,
  Wifi,
  Music,
  Utensils,
  Camera,
  Sparkles,
  Wine,
  Car,
  Check,
  ArrowLeft,
  Heart,
  Share2,
  Mail,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Volume2,
  Home,
  ArrowRight,
  Bed,
  Receipt,
  Dog,
  X,
  ChevronDown,
  ChevronUp,
  Trees,
  Building2,
  Sunset,
  Shield,
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { useCurrency } from "./CurrencyContext";
import { format } from "date-fns";

interface VenueDetailsPageProps {
  venueId: number;
  onBack: () => void;
  onProceedToPayment?: () => void;
}

const venueDetails = {
  1: {
    name: "Cliffside Resort & Spa",
    location: "Santorini, Greece",
    rating: 4.9,
    reviews: 156,
    venueTags: ["Beachfront Paradise", "Hilltop Retreats"],
    description:
      "Perched on the stunning cliffs of Santorini, our resort offers breathtaking views of the Aegean Sea and the iconic sunset. With world-class amenities and personalized service, we create unforgettable wedding experiences in one of the world's most romantic destinations. Our resort features multiple event spaces including elegant indoor banquet halls with crystal chandeliers, expansive outdoor terraces overlooking the caldera, and beautifully manicured lawns perfect for intimate ceremonies. Each venue space is thoughtfully designed to maximize the natural beauty of Santorini while providing modern comfort and luxury. Our experienced wedding planning team works closely with couples to bring their dream celebration to life, from intimate elopements to grand celebrations. The resort's exclusive partnership with local artisans, florists, and culinary experts ensures every detail is executed to perfection, creating memories that will last a lifetime.",
    whyCouplesLove: [
      { icon: Sparkles, name: "Fireworks Allowed" },
      { icon: Volume2, name: "Sound Restrictions Apply" },
      { icon: Dog, name: "Pet Friendly" },
      { icon: Wine, name: "Open Bar" },
    ],
    areas: [
      {
        name: "Banquet (Indoor)",
        seating: 50,
        floating: 80,
        icon: Building2,
      },
      {
        name: "Terrace (Outdoor)",
        seating: 150,
        floating: 200,
        icon: Sunset,
      },
      {
        name: "Lawn (Outdoor)",
        seating: 50,
        floating: 80,
        icon: Trees,
      },
    ],
    localPrices: [
      { item: "Veg Per plate", price: 6000, unit: "per plate" },
      {
        item: "Non Veg Per Plate",
        price: 7000,
        unit: "per plate",
      },
      { item: "Deluxe Room", price: 10000, unit: "/ night" },
      { item: "Standard Room", price: 80000, unit: "/ night" },
    ],
    goodToKnow: [
      {
        icon: Users,
        title: "Minimum Pax less than 50 pax allowed",
        details: ["Yes"],
      },
      {
        icon: Home,
        title:
          "Venue requires complete buyout of all rooms to host a wedding",
        details: ["Yes"],
      },
      {
        icon: Wine,
        title: "Alcohol Policy",
        details: [
          "in house alcohol available, outside alcohol permitted",
          "in house alcohol not available, outside alcohol permitted",
        ],
      },
      {
        icon: Music,
        title: "Dj policy",
        details: [
          "in house alcohol available, outside alcohol permitted",
          "in house alcohol not available, outside alcohol permitted",
        ],
      },
      {
        icon: Home,
        title: "Total room count",
        details: ["27 Rooms"],
      },
      {
        icon: Camera,
        title: "Decor Policy",
        details: [
          "decorators should be chosen only from enlisted panel",
          "inhouse decor available outside decors permitted",
        ],
      },
      {
        icon: Receipt,
        title: "What are your payment terms?",
        details: [
          "approx 50 advance while booking",
          "100 advance while booking",
        ],
      },
      {
        icon: Utensils,
        title: "Catering policy",
        details: [
          "inhouse catering outside vendors not permitted",
          "no inhouse service outside vendors allowed from panel",
        ],
      },
    ],
    images: [
      image_04fb72f45089eae606b139c0ba08a0bada49570f,
      image_cb798e5507ad03096d664717f1ce0c0f0124765b,
      image_00d4a9ab046ee595171f253db694410941523eba,
      image_713f8eb9bbae3295163a927a337743f7f41a5691,
      "https://images.unsplash.com/photo-1578730169862-749bbdc763a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MTIzNTk3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
        name: "Silver",
        price: 200000,
        tag: "Silver",
        image:
          image_04fb72f45089eae606b139c0ba08a0bada49570f,
        images: [
          image_04fb72f45089eae606b139c0ba08a0bada49570f,
          image_713f8eb9bbae3295163a927a337743f7f41a5691,
          "https://images.unsplash.com/photo-1578730169862-749bbdc763a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MTIzNTk3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        ],
        numberOfDays: 2,
        totalPax: 98,
        numberOfRooms: "Standard Room (17)",
        venueAreaAccess: "Lawn, Banquet",
        features: [
          "Basic Stage Decoration",
          "DJ & Sound System",
          "Welcome Drink for Guests",
          "Standard Lighting Setup",
          "Welcome Signage",
          "Basic Floral Arrangements",
        ],
      },
      {
        name: "Gold",
        price: 300000,
        tag: "Gold",
        image:
          image_cb798e5507ad03096d664717f1ce0c0f0124765b,
        images: [
          image_cb798e5507ad03096d664717f1ce0c0f0124765b,
          image_00d4a9ab046ee595171f253db694410941523eba,
          image_04fb72f45089eae606b139c0ba08a0bada49570f,
          "https://images.unsplash.com/photo-1578730169862-749bbdc763a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MTIzNTk3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        ],
        numberOfDays: 3,
        totalPax: 150,
        numberOfRooms: "Deluxe Room (20)",
        venueAreaAccess: "Lawn, Banquet, Terrace",
        features: [
          "Premium Stage & Mandap Decoration",
          "Professional Photographer (Full Day)",
          "DJ & Premium Sound System",
          "Designer Lighting & Effects",
          "Welcome Drinks & Appetizers",
          "Floral Centerpieces for Tables",
          "Personalized Welcome Signage",
          "Complimentary Valet Parking",
        ],
      },
      {
        name: "Platinum",
        price: 450000,
        tag: "Platinum",
        image:
          image_00d4a9ab046ee595171f253db694410941523eba,
        images: [
          image_00d4a9ab046ee595171f253db694410941523eba,
          image_cb798e5507ad03096d664717f1ce0c0f0124765b,
          image_04fb72f45089eae606b139c0ba08a0bada49570f,
          image_713f8eb9bbae3295163a927a337743f7f41a5691,
        ],
        numberOfDays: 4,
        totalPax: 200,
        numberOfRooms: "Premium Suite (27)",
        venueAreaAccess: "All Areas (Lawn, Banquet, Terrace)",
        features: [
          "Luxury Stage & Mandap with Custom Theme",
          "Professional Photographer & Videographer",
          "Cinematic Wedding Film",
          "DJ, Live Band & Premium Sound System",
          "Spectacular Lighting & Special Effects",
          "Premium Bar Service with Signature Cocktails",
          "Gourmet Multi-Cuisine Catering",
          "Fireworks Display & Sparkler Send-off",
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

export function VenueDetailsPage({
  venueId,
  onBack,
  onProceedToPayment,
}: VenueDetailsPageProps) {
  const venue =
    venueDetails[venueId as keyof typeof venueDetails] ||
    venueDetails[1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<
    string | null
  >(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] =
    useState(0);
  const [expandedPackages, setExpandedPackages] = useState<number[]>([]);
  const [packageImageIndices, setPackageImageIndices] = useState<{ [key: number]: number }>({});
  const { formatPrice } = useCurrency();

  // Enquiry form state
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [formData, setFormData] = useState({
    people: "",
    selectPackage: "",
    eventType: "",
    flexibleDates: false,
    message: "",
    budget: "",
    name: "",
    phone: "",
    email: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % venue.images.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + venue.images.length) % venue.images.length,
    );
  };

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex(
      (prev) => (prev + 1) % venue.images.length,
    );
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex(
      (prev) =>
        (prev - 1 + venue.images.length) % venue.images.length,
    );
  };

  const nextPackageImage = (packageIndex: number, totalImages: number) => {
    setPackageImageIndices(prev => ({
      ...prev,
      [packageIndex]: ((prev[packageIndex] || 0) + 1) % totalImages
    }));
  };

  const prevPackageImage = (packageIndex: number, totalImages: number) => {
    setPackageImageIndices(prev => ({
      ...prev,
      [packageIndex]: ((prev[packageIndex] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const handleSendOTP = () => {
    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    // Simulate sending OTP
    setOtpSent(true);
    toast.success(`OTP sent to ${formData.phone}`);
  };

  const handleVerifyOTP = () => {
    if (!formData.otp || formData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    // Simulate OTP verification
    setOtpVerified(true);
    toast.success("Phone number verified successfully!");
  };

  const handleEnquirySubmit = () => {
    if (!otpVerified) {
      toast.error("Please verify your phone number first");
      return;
    }
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Enquiry submitted successfully! We'll contact you within 24 hours.");
    // Reset form
    setEnquiryStep(1);
    setDateRange({ from: undefined, to: undefined });
    setFormData({
      people: "",
      selectPackage: "",
      eventType: "",
      flexibleDates: false,
      message: "",
      budget: "",
      name: "",
      phone: "",
      email: "",
      otp: "",
    });
    setOtpSent(false);
    setOtpVerified(false);
  };

  const handleStepOneNext = () => {
    // Validate step 1
    if (!dateRange.from || !formData.people || !formData.selectPackage || !formData.eventType) {
      toast.error("Please fill in all required fields");
      return;
    }
    setEnquiryStep(2);
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
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200">
              <div className="bg-blue-500 rounded-full p-1 flex items-center justify-center">
                <Check
                  className="size-3 text-white"
                  strokeWidth={3}
                />
              </div>
              <span className="text-gray-800">Verified</span>
            </div>
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

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {/* Main Image */}
          <div className="relative h-[320px] md:h-[400px] rounded-xl overflow-hidden group">
            <div
              onClick={() => openLightbox(currentImageIndex)}
              className="w-full h-full cursor-pointer"
            >
              <ImageWithFallback
                src={venue.images[currentImageIndex]}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm">
              {currentImageIndex + 1} / {venue.images.length}
            </div>
          </div>

          {/* Thumbnail Grid - 2x2 */}
          <div className="grid grid-cols-2 gap-3 h-[320px] md:h-[400px]">
            {venue.images.slice(1, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index + 1);
                  openLightbox(index + 1);
                }}
                className={`relative rounded-xl overflow-hidden hover:opacity-90 transition-opacity ${
                  currentImageIndex === index + 1
                    ? "ring-2 ring-[#DF6951]"
                    : ""
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${venue.name} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                {index === 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                    <span className="text-white font-medium">
                      See All {venue.images.length} Photos
                    </span>
                  </div>
                )}
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
              {/* Venue Tags */}
              <div className="flex flex-wrap gap-3 mb-4">
                {venue.venueTags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100"
                    style={{ color: '#DF6951' }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1
                    className="text-4xl mb-2"
                    style={{ fontFamily: "Volkhov, serif" }}
                  >
                    {venue.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="size-5" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">
                      {venue.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({venue.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <p 
                  className={`text-muted-foreground leading-relaxed transition-all ${
                    !isDescriptionExpanded ? 'line-clamp-5' : ''
                  }`}
                >
                  {venue.description}
                </p>
                {venue.description.length > 250 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-2 text-[#DF6951] hover:text-[#DF6951]/80 font-medium text-sm flex items-center gap-1 transition-colors"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        Read Less
                        <ChevronUp className="size-4" />
                      </>
                    ) : (
                      <>
                        Read More
                        <ChevronDown className="size-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Destination & Weather Card */}
            <Card className="overflow-hidden border-2">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                {/* Destination Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#02542D]/10 to-[#DF6951]/10">
                      <MapPin className="size-5 text-[#DF6951]" />
                    </div>
                    <h3>Destination</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="text-lg" style={{ fontFamily: "Volkhov, serif" }}>
                        {venue.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="secondary" className="bg-[#02542D]/10 text-[#02542D] hover:bg-[#02542D]/20">
                        Popular Destination
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Weather Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#02542D]/10 to-[#DF6951]/10">
                        <CloudSun className="size-5 text-[#DF6951]" />
                      </div>
                      <h3>Typical Weather</h3>
                    </div>
                    <ArrowRight className="size-5 text-[#DF6951] hover:text-[#02542D] transition-colors cursor-pointer hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Thermometer className="size-4 text-orange-500" />
                        <span className="text-xs text-muted-foreground">Temp</span>
                      </div>
                      <p className="font-medium">22-28°C</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Droplets className="size-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">Humidity</span>
                      </div>
                      <p className="font-medium">65%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Wind className="size-4 text-teal-500" />
                        <span className="text-xs text-muted-foreground">Wind</span>
                      </div>
                      <p className="font-medium">Light</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Best season: April - October
                  </p>
                </div>
              </div>
            </Card>

            <Separator />

            {/* Why Couples Love This Venue */}
            {venue.whyCouplesLove &&
              venue.whyCouplesLove.length > 0 && (
                <>
                  <div>
                    <h2 className="mb-6">Highlights</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {venue.whyCouplesLove.map(
                        (feature, index) => {
                          // Define color schemes for each index
                          const colorSchemes = [
                            { iconColor: 'text-green-600' },
                            { iconColor: 'text-pink-600' },
                            { iconColor: 'text-blue-600' },
                            { iconColor: 'text-orange-600' },
                          ];
                          const colors = colorSchemes[index % colorSchemes.length];
                          
                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center text-center gap-3"
                            >
                              <feature.icon
                                className={`size-10 md:size-12 ${colors.iconColor}`}
                                strokeWidth={1}
                              />
                              <span className="font-medium text-[12px]">
                                {feature.name}
                              </span>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <Separator />
                </>
              )}

            {/* Area Information */}
            {venue.areas && venue.areas.length > 0 && (
              <>
                <div>
                  <h2 className="mb-6">
                    Area({venue.areas.length})
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {venue.areas.map((area, index) => {
                      const IconComponent = area.icon || Home;
                      
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-4"
                        >
                          <div className="p-3 rounded-xl bg-orange-50">
                            <IconComponent className="size-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="mb-1">{area.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Seating {area.seating} | Floating{" "}
                              {area.floating}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />
              </>
            )}

            {/* Local Prices */}
            {venue.localPrices &&
              venue.localPrices.length > 0 && (
                <>
                  <div>
                    <h2 className="mb-6">Local Prices</h2>
                    <Card className="p-6">
                      <div className="space-y-4">
                        {venue.localPrices.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-3 border-b last:border-0"
                            >
                              <span className="text-muted-foreground">
                                {item.item}
                              </span>
                              <span style={{ color: '#DF6951' }}>
                                ₹ {item.price.toLocaleString()}{" "}
                                <span className="text-muted-foreground text-sm">
                                  {item.unit} + taxes
                                </span>
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </Card>
                  </div>

                  <Separator />
                </>
              )}

            {/* Quick Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-orange-50">
                    <Users className="size-6 text-orange-600" />
                  </div>
                  <h3>Guest Capacity</h3>
                </div>
                <p
                  className="text-2xl"
                  style={{ fontFamily: "Volkhov, serif" }}
                >
                  {venue.capacity.min} - {venue.capacity.max}
                </p>
                <p className="text-sm text-muted-foreground">
                  guests
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-orange-50">
                    <Calendar className="size-6 text-orange-600" />
                  </div>
                  <h3>Starting Price</h3>
                </div>
                <p
                  className="text-2xl"
                  style={{ fontFamily: "Volkhov, serif" }}
                >
                  {formatPrice(venue.pricing.starting)}
                </p>
                <p className="text-sm text-muted-foreground">
                  per event
                </p>
              </Card>
            </div>

            <Separator />

            {/* Packages */}
            <div>
              <h2 className="mb-6">
                Exclusive Wedding Packages
              </h2>
              <div className="space-y-6">
                {venue.packages.map((pkg, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="grid md:grid-cols-[280px,1fr] gap-6 p-6">
                      {/* Package Image Gallery */}
                      <div className="relative h-[220px] md:h-[320px] rounded-lg overflow-hidden group">
                        <ImageWithFallback
                          src={(pkg as any).images?.[packageImageIndices[index] || 0] || pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Navigation Arrows */}
                        {(pkg as any).images && (pkg as any).images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevPackageImage(index, (pkg as any).images.length);
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronLeft className="size-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextPackageImage(index, (pkg as any).images.length);
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronRight className="size-4" />
                            </button>
                          </>
                        )}

                        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 z-10">
                          <Heart className="size-5" />
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Image Indicators */}
                        {(pkg as any).images && (pkg as any).images.length > 1 && (
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {(pkg as any).images.map((_: any, imgIndex: number) => (
                              <button
                                key={imgIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPackageImageIndices(prev => ({
                                    ...prev,
                                    [index]: imgIndex
                                  }));
                                }}
                                className={`h-1.5 rounded-full transition-all ${
                                  (packageImageIndices[index] || 0) === imgIndex
                                    ? "w-6 bg-white"
                                    : "w-1.5 bg-white/60 hover:bg-white/80"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        
                        <div className="absolute bottom-3 left-3">
                          <Badge
                            variant="secondary"
                            className={`${
                              pkg.tag === "Silver"
                                ? "bg-gray-100/95 text-gray-900 border border-gray-300"
                                : pkg.tag === "Gold"
                                ? "bg-amber-100/95 text-amber-900 border border-amber-300"
                                : "bg-purple-100/95 text-purple-900 border border-purple-300"
                            } backdrop-blur-sm`}
                          >
                            {pkg.tag} Package
                          </Badge>
                        </div>
                      </div>

                      {/* Package Details */}
                      <div className="flex flex-col">
                        <div className="flex-1">
                          {/* Header */}
                          <div className="mb-6">
                            <h3 className="mb-2">
                              {pkg.tag} Wedding Package
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Complete wedding package with all essential services and amenities
                            </p>
                          </div>

                          {/* Package Specifications */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Duration
                              </p>
                              <p className="font-medium">
                                {pkg.numberOfDays} {pkg.numberOfDays === 1 ? 'Day' : 'Days'}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Capacity
                              </p>
                              <p className="font-medium">
                                {pkg.totalPax} Guests
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Accommodation
                              </p>
                              <p className="font-medium text-sm">
                                {pkg.numberOfRooms}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Venue Access
                              </p>
                              <p className="font-medium text-sm">
                                {pkg.venueAreaAccess}
                              </p>
                            </div>
                          </div>

                          {/* Features Section with Expand/Collapse */}
                          <div className="mb-6">
                            <div className="mb-3">
                              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Included Services
                              </h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 pb-6 border-b relative">
                              {(expandedPackages.includes(index) 
                                ? pkg.features 
                                : pkg.features.slice(0, 4)
                              ).map((feature, fIndex) => (
                                <div
                                  key={fIndex}
                                  className="flex items-start gap-2 text-sm py-1"
                                >
                                  <Check className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span className="leading-tight">{feature}</span>
                                </div>
                              ))}
                              
                              {/* Expand/Collapse Button on the line */}
                              {pkg.features.length > 4 && (
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                  <button
                                    onClick={() => {
                                      const newExpanded = [...expandedPackages];
                                      const pkgIndex = index;
                                      if (newExpanded.includes(pkgIndex)) {
                                        setExpandedPackages(newExpanded.filter(i => i !== pkgIndex));
                                      } else {
                                        newExpanded.push(pkgIndex);
                                        setExpandedPackages(newExpanded);
                                      }
                                    }}
                                    className="flex items-center justify-center size-6 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                                  >
                                    {expandedPackages.includes(index) ? (
                                      <ChevronUp className="size-3.5 text-gray-600" />
                                    ) : (
                                      <ChevronDown className="size-3.5 text-gray-600" />
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-auto">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Starting from
                            </p>
                            <p
                              className="text-3xl"
                              style={{
                                fontFamily: "Volkhov, serif",
                              }}
                            >
                              {formatPrice(pkg.price)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Price varies by season and customization
                            </p>
                          </div>
                          <Button
                            className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80 gap-2 whitespace-nowrap"
                            onClick={() =>
                              setSelectedPackage(pkg.name)
                            }
                          >
                            Check Availability
                            <ArrowRight className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Mobile Enquiry Form - Shows only on mobile after packages */}
            <div className="lg:hidden">
              <Card className="p-6 border-2">
                <div className="mb-6">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10 mb-2 w-full">
                      <Sparkles className="size-4 text-[#DF6951]" />
                      <span className="text-sm font-medium text-[#02542D]">Wedding Concierge</span>
                    </div>
                    <h3 className="bg-gradient-to-r from-[#02542D] to-[#DF6951] bg-clip-text text-transparent">
                      Plan Your Dream Wedding
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tell us about your vision and we'll make it happen
                    </p>
                  </div>
                </div>
                <Tabs defaultValue="enquiry" className="w-full">
                  <TabsContent
                    value="enquiry"
                    className="space-y-4"
                  >
                    {enquiryStep === 1 ? (
                      <>
                        {/* Step 1: Event Details */}
                        <div>
                          <Label htmlFor="dates-mobile">
                            Dates <span className="text-red-500">*</span>
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left mt-1 h-10"
                              >
                                <Calendar className="mr-2 size-4" />
                                {dateRange.from ? (
                                  dateRange.to ? (
                                    <>
                                      {format(dateRange.from, "LLL dd, y")} ~{" "}
                                      {format(dateRange.to, "LLL dd, y")}
                                    </>
                                  ) : (
                                    format(dateRange.from, "LLL dd, y")
                                  )
                                ) : (
                                  <span className="text-muted-foreground">
                                    Pick a date range
                                  </span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="range"
                                selected={dateRange}
                                onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                                numberOfMonths={1}
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div>
                          <Label htmlFor="people-mobile">
                            Number of People <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="people-mobile"
                            type="number"
                            placeholder="0"
                            value={formData.people}
                            onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="selectPackage-mobile">
                            Select Package
                          </Label>
                          <Select
                            value={formData.selectPackage}
                            onValueChange={(value) => setFormData({ ...formData, selectPackage: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select Package" />
                            </SelectTrigger>
                            <SelectContent>
                              {venue.packages.map((pkg) => (
                                <SelectItem key={pkg.name} value={pkg.name}>
                                  {pkg.name} - {formatPrice(pkg.price)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="eventType-mobile">
                            Event Type <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.eventType}
                            onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select Event Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wedding">Wedding</SelectItem>
                              <SelectItem value="pre-wedding">Pre-Wedding</SelectItem>
                              <SelectItem value="engagement">Engagement</SelectItem>
                              <SelectItem value="reception">Reception</SelectItem>
                              <SelectItem value="sangeet">Sangeet</SelectItem>
                              <SelectItem value="mehendi">Mehendi</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="flexibleDates-mobile"
                            checked={formData.flexibleDates}
                            onCheckedChange={(checked) => 
                              setFormData({ ...formData, flexibleDates: checked as boolean })
                            }
                          />
                          <Label
                            htmlFor="flexibleDates-mobile"
                            className="text-sm cursor-pointer"
                          >
                            I have flexible dates
                          </Label>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
                          onClick={handleStepOneNext}
                        >
                          Next Step
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Step 2: Contact Details */}
                        <div>
                          <Label htmlFor="message-mobile">
                            Message to the venue <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="message-mobile"
                            placeholder="Type here..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={3}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="budget-mobile">
                            Budget <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="budget-mobile"
                            type="number"
                            placeholder="0"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="name-mobile">
                            Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name-mobile"
                            placeholder="Enter your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email-mobile">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email-mobile"
                            type="email"
                            placeholder="Enter your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone-mobile">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              id="phone-mobile"
                              type="tel"
                              placeholder="Enter your Phone Number"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="flex-1"
                            />
                            <Button
                              onClick={handleSendOTP}
                              disabled={otpSent}
                              className="bg-[#DF6951] hover:bg-[#DF6951]/90"
                            >
                              {otpSent ? "Sent" : "Send OTP"}
                            </Button>
                          </div>
                        </div>

                        {otpSent && !otpVerified && (
                          <div>
                            <Label htmlFor="otp-mobile">
                              Enter OTP <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex gap-2 mt-1">
                              <Input
                                id="otp-mobile"
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={formData.otp}
                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                maxLength={6}
                                className="flex-1"
                              />
                              <Button
                                onClick={handleVerifyOTP}
                                className="bg-[#02542D] hover:bg-[#02542D]/90"
                              >
                                <Shield className="mr-1 size-4" />
                                Verify
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setEnquiryStep(1)}
                          >
                            <ChevronLeft className="mr-1 size-4" />
                            Back
                          </Button>
                          <Button
                            className="flex-1 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
                            onClick={handleEnquirySubmit}
                            disabled={!otpVerified}
                          >
                            <Mail className="mr-2 size-5" />
                            Submit Enquiry
                          </Button>
                        </div>

                        <p className="text-xs text-center text-muted-foreground">
                          We'll respond within 24 hours
                        </p>
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="mb-6">Amenities & Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {venue.amenities.map((amenity, index) => {
                  // Cycle through different color schemes for amenities
                  const colorSchemes = [
                    { bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
                    { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
                    { bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
                    { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
                    { bg: 'bg-pink-50', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
                    { bg: 'bg-cyan-50', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
                  ];
                  const colors = colorSchemes[index % colorSchemes.length];
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ backgroundColor: 'rgba(223, 105, 81, 0.05)' }}
                    >
                      <div className="p-2 rounded-lg bg-white">
                        <amenity.icon className="size-5" style={{ color: '#DF6951' }} />
                      </div>
                      <span>{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Good to Know Before You Book */}
            {venue.goodToKnow &&
              venue.goodToKnow.length > 0 && (
                <>
                  <div>
                    <h2 className="mb-6">
                      Good to Know Before You Book
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {venue.goodToKnow.map((info, index) => (
                        <Card key={index} className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-gray-100">
                              <info.icon className="size-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="mb-2">
                                {info.title}
                              </h4>
                              {info.details.map(
                                (detail, dIndex) => (
                                  <p
                                    key={dIndex}
                                    className="text-sm text-muted-foreground mb-1"
                                  >
                                    {detail}
                                  </p>
                                ),
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />
                </>
              )}

            {/* Map */}
            <div>
              <h2 className="mb-6">Location</h2>
              <Card className="p-6">
                <div className="aspect-video bg-gradient-to-br from-rose-100 to-amber-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Simple map placeholder */}
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(0deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 20px),
                                       repeating-linear-gradient(90deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 20px)`,
                      }}
                    />
                  </div>
                  <div className="relative text-center">
                    <MapPin className="size-16 text-[#DF6951] mx-auto mb-4" />
                    <p className="font-medium">
                      {venue.location}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {venue.coordinates.lat}°N,{" "}
                      {venue.coordinates.lng}°E
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

            <Separator />

            {/* Weather Details */}
            <div>
              <h2 className="mb-6">Weather & Climate</h2>
              <Card className="p-6">
                {/* Current Weather */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Weather</p>
                      <h3 className="mb-1 flex items-center gap-2">
                        <svg className="size-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19v2m0-6v2m4-2v2m0 2v2m-8-4v2" />
                        </svg>
                        Moderate Rain
                      </h3>
                      <p className="text-sm text-muted-foreground">Province of Turin</p>
                    </div>
                    <div className="text-right">
                      <p className="text-5xl" style={{ fontFamily: "Volkhov, serif" }}>
                        11°C
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Feels like 10°C
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Weather Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Temperature Range */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg className="size-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">Temp Range</p>
                    </div>
                    <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                      10°C - 14°C
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Min / Max</p>
                  </div>

                  {/* Humidity */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg className="size-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                    </div>
                    <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                      60%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Moderate</p>
                  </div>

                  {/* Wind Speed */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg className="size-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">Wind</p>
                    </div>
                    <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                      4.1 m/s
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">SE Direction</p>
                  </div>

                  {/* Pressure */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg className="size-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">Pressure</p>
                    </div>
                    <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                      1021 hPa
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Sea Level</p>
                  </div>

                  {/* Visibility */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg className="size-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">Visibility</p>
                    </div>
                    <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                      10 km
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Clear</p>
                  </div>

                  {/* Cloud Coverage */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-white">
                        <svg className="size-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">Clouds</p>
                    </div>
                    <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                      83%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Mostly Cloudy</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Additional Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(2, 84, 45, 0.05)' }}>
                    <div className="p-2 rounded-lg bg-white">
                      <svg className="size-5 text-[#02542D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rainfall (1h)</p>
                      <p className="font-medium">2.73 mm</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(223, 105, 81, 0.05)' }}>
                    <div className="p-2 rounded-lg bg-white">
                      <svg className="size-5 text-[#DF6951]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ground Level Pressure</p>
                      <p className="font-medium">910 hPa</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(2, 84, 45, 0.05)' }}>
                    <div className="p-2 rounded-lg bg-white">
                      <svg className="size-5 text-[#02542D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sunrise</p>
                      <p className="font-medium">7:13 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(223, 105, 81, 0.05)' }}>
                    <div className="p-2 rounded-lg bg-white">
                      <svg className="size-5 text-[#DF6951]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sunset</p>
                      <p className="font-medium">7:36 PM</p>
                    </div>
                  </div>
                </div>

                {/* Weather Info */}
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <svg className="size-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Best Time to Visit
                      </p>
                      <p className="text-sm text-blue-800">
                        Weather data shows current conditions. For weddings, we recommend checking the 7-day forecast and considering the venue's indoor/outdoor facilities. Contact our concierge for seasonal recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="p-6 sticky top-24 border-2">
              <div className="mb-6">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10 mb-2 w-full">
                    <Sparkles className="size-4 text-[#DF6951]" />
                    <span className="text-sm font-medium text-[#02542D]">Wedding Concierge</span>
                  </div>
                  <h3 className="bg-gradient-to-r from-[#02542D] to-[#DF6951] bg-clip-text text-transparent">
                    Plan Your Dream Wedding
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tell us about your vision and we'll make it happen
                  </p>
                </div>
              </div>
              <Tabs defaultValue="enquiry" className="w-full">
                {/* <TabsList className="grid w-full grid-cols-1 mb-6">
                  <TabsTrigger value="enquiry">
                    Send Enquiry
                  </TabsTrigger>
                </TabsList> */}

                <TabsContent
                  value="enquiry"
                  className="space-y-4"
                >
                  {enquiryStep === 1 ? (
                    <>
                      {/* Step 1: Event Details */}
                      <div>
                        <Label htmlFor="dates">
                          Dates <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left mt-1 h-10"
                            >
                              <Calendar className="mr-2 size-4" />
                              {dateRange.from ? (
                                dateRange.to ? (
                                  <>
                                    {format(dateRange.from, "LLL dd, y")} ~{" "}
                                    {format(dateRange.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(dateRange.from, "LLL dd, y")
                                )
                              ) : (
                                <span className="text-muted-foreground">
                                  Pick a date range
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="range"
                              selected={{
                                from: dateRange.from,
                                to: dateRange.to,
                              }}
                              onSelect={(range) => {
                                setDateRange({
                                  from: range?.from,
                                  to: range?.to,
                                });
                              }}
                              initialFocus
                              numberOfMonths={2}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label htmlFor="people">
                          People <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="people"
                          type="number"
                          placeholder="Enter number of people"
                          value={formData.people}
                          onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="selectPackage">
                          Select Package <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.selectPackage}
                          onValueChange={(value) => setFormData({ ...formData, selectPackage: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Package" />
                          </SelectTrigger>
                          <SelectContent>
                            {venue.packages.map((pkg) => (
                              <SelectItem key={pkg.name} value={pkg.name}>
                                {pkg.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="eventType">
                          Event Type <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.eventType}
                          onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Event Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="pre-wedding">Pre-Wedding</SelectItem>
                            <SelectItem value="engagement">Engagement</SelectItem>
                            <SelectItem value="reception">Reception</SelectItem>
                            <SelectItem value="sangeet">Sangeet</SelectItem>
                            <SelectItem value="mehendi">Mehendi</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="flexibleDates"
                          checked={formData.flexibleDates}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, flexibleDates: checked as boolean })
                          }
                        />
                        <Label
                          htmlFor="flexibleDates"
                          className="text-sm cursor-pointer"
                        >
                          I have flexible dates
                        </Label>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
                        onClick={handleStepOneNext}
                      >
                        Next Step
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* Step 2: Contact Details */}
                      <div>
                        <Label htmlFor="message">
                          Message to the venue <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Type here..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={3}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="budget">
                          Budget <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="0"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="name">
                          Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="flex-1"
                            disabled={otpVerified}
                          />
                          {!otpSent ? (
                            <Button
                              onClick={handleSendOTP}
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              Send OTP
                            </Button>
                          ) : !otpVerified ? (
                            <Button
                              onClick={handleSendOTP}
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              Resend
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="whitespace-nowrap gap-1 text-green-600 border-green-600"
                              disabled
                            >
                              <Check className="size-4" />
                              Verified
                            </Button>
                          )}
                        </div>
                      </div>

                      {otpSent && !otpVerified && (
                        <div>
                          <Label htmlFor="otp">
                            Enter OTP <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              id="otp"
                              type="text"
                              placeholder="Enter 6-digit OTP"
                              value={formData.otp}
                              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                              maxLength={6}
                              className="flex-1"
                            />
                            <Button
                              onClick={handleVerifyOTP}
                              className="bg-[#02542D] hover:bg-[#02542D]/90"
                            >
                              <Shield className="mr-1 size-4" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setEnquiryStep(1)}
                        >
                          <ChevronLeft className="mr-1 size-4" />
                          Back
                        </Button>
                        <Button
                          className="flex-1 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
                          onClick={handleEnquirySubmit}
                          disabled={!otpVerified}
                        >
                          <Mail className="mr-2 size-5" />
                          Submit Enquiry
                        </Button>
                      </div>

                      <p className="text-xs text-center text-muted-foreground">
                        We'll respond within 24 hours
                      </p>
                    </>
                  )}
                </TabsContent>

                {/* Book Now Tab - Hidden for now, can be enabled later */}
                {/* <TabsContent value="book" className="space-y-4">
                  <div>
                    <Label>Select Package</Label>
                    <div className="space-y-2 mt-2">
                      {venue.packages.map((pkg) => (
                        <button
                          key={pkg.name}
                          onClick={() =>
                            setSelectedPackage(pkg.name)
                          }
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            selectedPackage === pkg.name
                              ? "border-[#DF6951] bg-rose-50"
                              : "border-border hover:border-[#DF6951]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {pkg.name}
                            </span>
                            <span className="text-sm">
                              {formatPrice(pkg.price)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="book-name">Full Name</Label>
                    <Input
                      id="book-name"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="book-email">Email</Label>
                    <Input
                      id="book-email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="book-phone">
                      Phone Number
                    </Label>
                    <Input
                      id="book-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="book-date">
                      Event Date
                    </Label>
                    <Input
                      id="book-date"
                      type="date"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="book-guests">
                      Number of Guests
                    </Label>
                    <Input
                      id="book-guests"
                      type="number"
                      placeholder="100"
                      className="mt-1"
                    />
                  </div>

                  <Separator />

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Selected Package
                      </span>
                      <span className="font-medium">
                        {selectedPackage || "None"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total</span>
                      <span
                        className="text-2xl"
                        style={{ fontFamily: "Volkhov, serif" }}
                      >
                        {selectedPackage
                          ? formatPrice(
                              venue.packages.find(
                                (p) =>
                                  p.name === selectedPackage,
                              )?.price || 0,
                            )
                          : formatPrice(0)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
                    onClick={onProceedToPayment}
                  >
                    <Calendar className="mr-2 size-5" />
                    Proceed to Payment
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment • Instant confirmation
                  </p>
                </TabsContent> */}
              </Tabs>

              {/* <Separator className="my-6" />

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Phone className="size-4" />
                  Call Us
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                >
                  <MessageSquare className="size-4" />
                  Live Chat
                </Button>
              </div> */}
            </Card>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] w-screen h-screen"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button - Fixed to Screen Top Right Edge */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="fixed top-4 right-4 z-[10002] p-2.5 rounded-full bg-gray-800/80 hover:bg-gray-700 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="size-7" />
          </button>

          {/* Image Counter - Top Center */}
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10001] text-white text-sm">
            {lightboxImageIndex + 1} / {venue.images.length}
          </div>

          {/* Image Container - Centered */}
          <div className="fixed inset-0 w-full h-full flex items-center justify-center p-0 m-0 bg-[rgba(164,164,164,0.84)]">
            {venue.images[lightboxImageIndex] && (
              <div className="relative bg-white rounded-lg shadow-2xl p-2">
                {/* Previous Button - On left side of image */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevLightboxImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full mr-4 z-50 p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-6" />
                </button>

                <img
                  src={venue.images[lightboxImageIndex]}
                  alt={`${venue.name} - Image ${lightboxImageIndex + 1}`}
                  className="rounded object-contain"
                  style={{
                    maxWidth: "calc(90vw - 1rem)",
                    maxHeight: "calc(85vh - 1rem)",
                  }}
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      venue.images[lightboxImageIndex],
                    );
                    e.currentTarget.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=";
                  }}
                />

                {/* Next Button - On right side of image */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextLightboxImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full ml-4 z-50 p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
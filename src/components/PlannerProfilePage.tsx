"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Award,
  Calendar,
  Users,
  Globe,
  Heart,
  Share2,
  MessageCircle,
  Send,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Target,
  Sparkles,
  X,
  Palette,
  Network,
  HandshakeIcon,
  Shield,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

interface PlannerProfilePageProps {
  plannerId: number;
  onBack: () => void;
}

const plannerData = {
  1: {
    name: "Elegant Affairs By Priya",
    tagline: "Crafting Timeless Wedding Memories",
    description:
      "With over 12 years of experience in creating unforgettable wedding celebrations, Elegant Affairs specializes in transforming your dreams into reality. We believe every couple has a unique story, and we're here to tell it through extraordinary design, meticulous planning, and flawless execution. Our approach combines creative vision with practical expertise, ensuring every detail of your special day is perfectly orchestrated. From intimate gatherings to grand celebrations, we bring the same level of dedication, passion, and professionalism to every event we plan.",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    location: "Mumbai, India",
    rating: 4.9,
    reviewCount: 124,
    experience: "12+ Years",
    weddingsPlanned: 150,
    verified: true,
    startingPrice: "₹2,50,000",

    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800",
      "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
      "https://images.unsplash.com/photo-1522673607196-38d2e7f70c70?w=800",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
      "https://images.unsplash.com/photo-1525772764200-be829a350797?w=800",
      "https://images.unsplash.com/photo-1594072832204-e4ac0b167883?w=800",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
      "https://images.unsplash.com/photo-1519167758481-83f29da8fd12?w=800",
    ],

    highlights: [
      { icon: Sparkles, name: "Award Winning" },
      { icon: Target, name: "Detail Oriented" },
      { icon: Shield, name: "Trusted Partner" },
      { icon: Palette, name: "Creative Design" },
      { icon: Network, name: "Vendor Network" },
      { icon: HandshakeIcon, name: "Full Support" },
      { icon: Globe, name: "Destination Expert" },
    ],

    services: [
      {
        category: "Planning & Coordination",
        items: [
          "Full Wedding Planning",
          "Day-of Coordination",
          "Month-of Coordination",
          "Timeline Creation",
        ],
      },
      {
        category: "Design & Styling",
        items: ["Theme Development", "Decor Design", "Mood Boards", "Color Palettes"],
      },
      {
        category: "Vendor Management",
        items: [
          "Venue Selection",
          "Catering Coordination",
          "Photography/Videography",
          "Makeup & Hair",
        ],
      },
      {
        category: "Guest Services",
        items: [
          "Travel Planning",
          "Accommodation",
          "RSVP Management",
          "Welcome Kits",
        ],
      },
      {
        category: "International Weddings",
        items: [
          "Destination Planning",
          "Visa Assistance",
          "Budget Management",
          "Cultural Integration",
        ],
      },
    ],

    packages: [
      {
        name: "Basic",
        price: "₹2,50,000",
        features: [
          "Up to 200 guests",
          "Venue coordination",
          "2 planning meetings",
          "Day-of coordination",
          "Basic decor setup",
          "Vendor recommendations",
        ],
      },
      {
        name: "Premium",
        price: "₹5,00,000",
        features: [
          "Up to 400 guests",
          "Full planning service",
          "Unlimited meetings",
          "Custom theme design",
          "Complete decor management",
          "Vendor negotiation",
          "Guest management",
          "Rehearsal coordination",
        ],
        popular: true,
      },
      {
        name: "Luxury",
        price: "₹10,00,000+",
        features: [
          "Unlimited guests",
          "Bespoke planning",
          "Destination weddings",
          "Premium vendor network",
          "Complete event design",
          "Travel & accommodation",
          "Multi-day events",
          "Dedicated team",
          "24/7 support",
        ],
      },
    ],

    realWeddings: [
      {
        id: 1,
        couple: "Priya & Dev",
        location: "Udaipur, Rajasthan",
        date: "March 2024",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
        theme: "Royal Palace Wedding",
        guests: 350,
        description:
          "A majestic three-day celebration at a heritage palace overlooking Lake Pichola.",
      },
      {
        id: 2,
        couple: "Aisha & Rohan",
        location: "Bali, Indonesia",
        date: "January 2024",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
        theme: "Tropical Paradise",
        guests: 120,
        description:
          "An intimate beachfront ceremony with sunset vows and traditional Balinese touches.",
      },
      {
        id: 3,
        couple: "Neha & Karan",
        location: "Goa, India",
        date: "December 2023",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
        theme: "Bohemian Beach",
        guests: 200,
        description:
          "A vibrant beach wedding with boho-chic decor and barefoot elegance.",
      },
    ],

    reviews: [
      {
        id: 1,
        name: "Riya & Arjun",
        rating: 5,
        date: "2 weeks ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riya",
        verified: true,
        comment:
          "Priya and her team were absolutely phenomenal! They took our vision and exceeded all expectations. Every detail was perfect, from the stunning decor to the seamless coordination. Our guests are still talking about how beautiful everything was. Highly recommend!",
        weddingLocation: "Tuscany, Italy",
      },
    ],

    inspirations: [
      {
        id: 1,
        title: "Romantic Garden Romance",
        description: "Soft pastels, floral arches, and enchanted garden vibes",
        theme: "Garden Wedding",
        imageCount: 12,
        coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        images: [
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
          "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
        ],
      },
      {
        id: 2,
        title: "Modern Minimalist Elegance",
        description: "Clean lines, neutral tones, and contemporary sophistication",
        theme: "Modern Wedding",
        imageCount: 15,
        coverImage: "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800",
        images: [
          "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=600",
          "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=600",
          "https://images.unsplash.com/photo-1522673607196-38d2e7f70c70?w=600",
          "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
        ],
      },
      {
        id: 3,
        title: "Bohemian Beach Dreams",
        description: "Dreamy boho details with ocean-inspired elements",
        theme: "Beach Wedding",
        imageCount: 18,
        coverImage: "https://images.unsplash.com/photo-1525772764200-be829a350797?w=800",
        images: [
          "https://images.unsplash.com/photo-1525772764200-be829a350797?w=600",
          "https://images.unsplash.com/photo-1594072832204-e4ac0b167883?w=600",
          "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600",
          "https://images.unsplash.com/photo-1519167758481-83f29da8fd12?w=600",
        ],
      },
      {
        id: 4,
        title: "Royal Palace Grandeur",
        description: "Opulent decor, regal colors, and majestic settings",
        theme: "Luxury Wedding",
        imageCount: 20,
        coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        images: [
          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
          "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
          "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=600",
        ],
      },
      {
        id: 5,
        title: "Rustic Countryside Charm",
        description: "Warm wood tones, wildflowers, and natural elements",
        theme: "Rustic Wedding",
        imageCount: 14,
        coverImage: "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
        images: [
          "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=600",
          "https://images.unsplash.com/photo-1522673607196-38d2e7f70c70?w=600",
          "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
          "https://images.unsplash.com/photo-1525772764200-be829a350797?w=600",
        ],
      },
      {
        id: 6,
        title: "Tropical Paradise Vibes",
        description: "Lush greenery, exotic flowers, and vibrant colors",
        theme: "Destination Wedding",
        imageCount: 16,
        coverImage: "https://images.unsplash.com/photo-1594072832204-e4ac0b167883?w=800",
        images: [
          "https://images.unsplash.com/photo-1594072832204-e4ac0b167883?w=600",
          "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600",
          "https://images.unsplash.com/photo-1519167758481-83f29da8fd12?w=600",
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
        ],
      },
    ],

    destinations: [
      { name: "Goa", available: true },
      { name: "Udaipur", available: true },
      { name: "Jaipur", available: true },
      { name: "Bali", available: true },
      { name: "Tuscany", available: true },
      { name: "Santorini", available: true },
      { name: "Dubai", available: true },
      { name: "Thailand", available: true },
    ],

    languages: ["English", "Hindi", "Marathi"],
    responseTime: "Within 2 hours",
    bookingRate: "98%",
    repeatClients: "45%",
  },
};

export function PlannerProfilePage({
  plannerId,
  onBack,
}: PlannerProfilePageProps) {
  const planner =
    plannerData[plannerId as keyof typeof plannerData] || plannerData[1];
  const [isSaved, setIsSaved] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [showAllGalleryImages, setShowAllGalleryImages] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [showAllInspirations, setShowAllInspirations] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    location: "",
    guestCount: "",
    budget: "",
    message: "",
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % planner.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + planner.gallery.length) % planner.gallery.length
    );
  };

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % planner.gallery.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex(
      (prev) => (prev - 1 + planner.gallery.length) % planner.gallery.length
    );
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Enquiry sent successfully! We'll get back to you soon.");
    setShowEnquiryForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      weddingDate: "",
      location: "",
      guestCount: "",
      budget: "",
      message: "",
    });
  };

  const description = planner.description;
  const shouldShowReadMore = description.length > 300;
  const displayDescription =
    isDescriptionExpanded || !shouldShowReadMore
      ? description
      : description.slice(0, 300) + "...";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20 overflow-x-hidden w-full">
      {/* Back Button & Actions */}
      <div className="container mx-auto px-4 md:px-8 py-6 w-full max-w-full">
        <div className="flex items-center justify-between mb-6 gap-4">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to Planners</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200">
              <div className="bg-blue-500 rounded-full p-1 flex items-center justify-center">
                <Check className="size-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-800">Verified</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart
                className={`size-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="size-5" />
            </Button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg md:rounded-xl overflow-hidden mb-6 md:mb-8 group w-full">
          <div
            onClick={() => openLightbox(currentImageIndex)}
            className="w-full h-full cursor-pointer"
          >
            <ImageWithFallback
              src={planner.gallery[currentImageIndex]}
              alt={planner.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="size-4 sm:size-5 text-gray-900" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="size-4 sm:size-5 text-gray-900" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/60 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
            {currentImageIndex + 1} / {planner.gallery.length}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-full">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
            {/* Title & Basic Info */}
            <Card className="p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-full">
              <div className="flex items-start gap-4 sm:gap-6 mb-4">
                {/* Profile Picture */}
                <Avatar className="size-16 sm:size-20 md:size-24 border-4 border-white shadow-lg flex-shrink-0">
                  <AvatarImage src={planner.profileImage} />
                  <AvatarFallback>{planner.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl mb-2"
                    style={{ fontFamily: "Volkhov, serif" }}
                  >
                    {planner.name}
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground mb-4">
                    {planner.tagline}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="size-4 sm:size-5 text-amber-500 fill-amber-500" />
                  <span className="text-sm sm:text-base">
                    {planner.rating} ({planner.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 sm:size-5 text-[#DF6951]" />
                  <span className="text-sm sm:text-base">{planner.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 sm:size-5 text-muted-foreground" />
                  <span className="text-sm sm:text-base">{planner.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-4 sm:size-5 text-muted-foreground" />
                  <span className="text-sm sm:text-base">
                    {planner.weddingsPlanned} Weddings
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10 px-4 py-2 rounded-lg border border-[#DF6951]/20">
                <TrendingUp className="size-4 sm:size-5 text-[#DF6951]" />
                <span className="text-sm sm:text-base">
                  Starting from <strong>{planner.startingPrice}</strong>
                </span>
              </div>
            </Card>

            {/* Overview Section */}
                <Card className="p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-full">
                  {/* About Section */}
                  <div className="mb-6 md:mb-8">
                    <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">About</h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {displayDescription}
                    </p>
                    {shouldShowReadMore && (
                      <button
                        onClick={() =>
                          setIsDescriptionExpanded(!isDescriptionExpanded)
                        }
                        className="text-[#DF6951] hover:underline mt-2 text-sm sm:text-base"
                      >
                        {isDescriptionExpanded ? "Read less" : "Read more"}
                      </button>
                    )}
                  </div>

                  <Separator />

                  {/* Highlights Section */}
                  {planner.highlights && planner.highlights.length > 0 && (
                    <>
                      <div className="my-6 md:my-8">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <h2 className="text-lg sm:text-xl">Why Couples Love Us</h2>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-7 sm:size-8"
                              onClick={() => {
                                const container = document.getElementById(
                                  "highlights-carousel"
                                );
                                if (container) {
                                  container.scrollBy({
                                    left: -300,
                                    behavior: "smooth",
                                  });
                                }
                              }}
                            >
                              <ChevronLeft className="size-3 sm:size-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-7 sm:size-8"
                              onClick={() => {
                                const container = document.getElementById(
                                  "highlights-carousel"
                                );
                                if (container) {
                                  container.scrollBy({
                                    left: 300,
                                    behavior: "smooth",
                                  });
                                }
                              }}
                            >
                              <ChevronRight className="size-3 sm:size-4" />
                            </Button>
                          </div>
                        </div>
                        <div
                          id="highlights-carousel"
                          className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-3 sm:pb-4 [&::-webkit-scrollbar]:hidden"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          {planner.highlights.map((feature, index) => {
                            const colorSchemes = [
                              { iconColor: "text-green-600" },
                              { iconColor: "text-pink-600" },
                              { iconColor: "text-blue-600" },
                              { iconColor: "text-orange-600" },
                            ];
                            const colors =
                              colorSchemes[index % colorSchemes.length];

                            return (
                              <div
                                key={index}
                                className="flex flex-col items-center text-center gap-2 sm:gap-3 flex-shrink-0 w-[calc(50%-6px)] sm:w-[calc(50%-8px)] md:w-[calc(25%-18px)]"
                              >
                                <feature.icon
                                  className={`size-8 sm:size-10 md:size-12 ${colors.iconColor}`}
                                  strokeWidth={1}
                                />
                                <span className="font-medium text-[11px] sm:text-xs leading-tight">
                                  {feature.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <Separator />
                    </>
                  )}

                  {/* Services Section */}
                  <div className="mt-6 md:mt-8">
                    <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">
                      Services ({planner.services.length})
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      {(servicesExpanded
                        ? planner.services
                        : planner.services.slice(0, 4)
                      ).map((service, index) => (
                        <div key={index} className="space-y-2 sm:space-y-3">
                          <h3 className="flex items-center gap-2 text-sm sm:text-base">
                            <CheckCircle className="size-4 sm:size-5 text-[#02542D]" />
                            {service.category}
                          </h3>
                          <ul className="pl-6 sm:pl-7 space-y-1 sm:space-y-1.5">
                            {service.items.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-xs sm:text-sm text-muted-foreground"
                              >
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {planner.services.length > 4 && (
                      <div className="flex justify-center mt-4 sm:mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className="gap-2 text-sm sm:text-base"
                        >
                          {servicesExpanded ? (
                            <>
                              Show Less <ChevronUp className="size-4" />
                            </>
                          ) : (
                            <>
                              <span className="hidden sm:inline">
                                Show More ({planner.services.length - 4} more)
                              </span>
                              <span className="sm:hidden">
                                +{planner.services.length - 4} More
                              </span>
                              <ChevronDown className="size-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Real Weddings Section */}
                <Card className="p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-full overflow-hidden">
                  <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">Real Weddings</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                    {planner.realWeddings.map((wedding) => (
                      <div
                        key={wedding.id}
                        className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
                      >
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <ImageWithFallback
                            src={wedding.image}
                            alt={wedding.couple}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3 sm:p-4">
                          <h3 className="mb-1 text-sm sm:text-base">
                            {wedding.couple}
                          </h3>
                          <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-muted-foreground">
                            <MapPin className="size-3 sm:size-4" />
                            <span>{wedding.location}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {wedding.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
            </Card>

            {/* Gallery Section */}
                <Card className="p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-full overflow-hidden">
                  <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">
                    Portfolio Gallery ({planner.gallery.length})
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full">
                    {(showAllGalleryImages
                      ? planner.gallery
                      : planner.gallery.slice(0, 9)
                    ).map((image, index) => (
                      <div
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>

                  {planner.gallery.length > 9 && (
                    <div className="flex justify-center mt-6">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setShowAllGalleryImages(!showAllGalleryImages)
                        }
                        className="gap-2"
                      >
                        {showAllGalleryImages ? (
                          <>
                            Show Less <ChevronUp className="size-4" />
                          </>
                        ) : (
                          <>
                            View All ({planner.gallery.length}) Photos
                            <ImageIcon className="size-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
            </Card>

            {/* Inspirations Section */}
            {planner.inspirations && planner.inspirations.length > 0 && (
              <Card className="p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-full overflow-hidden">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl flex items-center gap-2">
                    <Sparkles className="size-5 sm:size-6 text-[#DF6951]" />
                    Wedding Inspirations
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {planner.inspirations.length} Boards
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                  Curated mood boards and inspiration collections to help visualize your dream wedding
                </p>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                  {(showAllInspirations
                    ? planner.inspirations
                    : planner.inspirations.slice(0, 4)
                  ).map((board) => (
                    <div
                      key={board.id}
                      className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all bg-white"
                    >
                      {/* Cover Image */}
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={board.coverImage}
                          alt={board.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1.5">
                          <ImageIcon className="size-3 sm:size-4 text-[#02542D]" />
                          <span className="text-xs sm:text-sm">{board.imageCount}</span>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-[#DF6951]/90 backdrop-blur-sm text-white border-none text-xs">
                          {board.theme}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4">
                        <h3 className="mb-2 text-sm sm:text-base group-hover:text-[#DF6951] transition-colors">
                          {board.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                          {board.description}
                        </p>

                        {/* Image Preview Grid */}
                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                          {board.images.slice(0, 4).map((img, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-square rounded overflow-hidden bg-gray-100"
                            >
                              <ImageWithFallback
                                src={img}
                                alt={`${board.title} ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {planner.inspirations.length > 4 && (
                  <div className="flex justify-center mt-4 sm:mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllInspirations(!showAllInspirations)}
                      className="gap-2 text-sm sm:text-base"
                    >
                      {showAllInspirations ? (
                        <>
                          Show Less <ChevronUp className="size-4" />
                        </>
                      ) : (
                        <>
                          <span className="hidden sm:inline">
                            Show More ({planner.inspirations.length - 4} more)
                          </span>
                          <span className="sm:hidden">
                            +{planner.inspirations.length - 4} More
                          </span>
                          <ChevronDown className="size-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Packages Section */}
                <Card className="p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-full overflow-hidden">
                  <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">Packages</h2>
                  <div className="grid md:grid-cols-3 gap-4 sm:gap-6 w-full">
                    {planner.packages.map((pkg, index) => (
                      <div
                        key={index}
                        className={`rounded-xl border-2 p-4 sm:p-6 ${
                          pkg.popular
                            ? "border-[#DF6951] bg-gradient-to-b from-[#DF6951]/5 to-transparent relative"
                            : "border-gray-200"
                        }`}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <Badge className="bg-[#DF6951] text-white">
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        <h3 className="text-lg sm:text-xl mb-2">{pkg.name}</h3>
                        <div className="mb-4 sm:mb-6">
                          <span
                            className="text-2xl sm:text-3xl"
                            style={{ fontFamily: "Volkhov, serif" }}
                          >
                            {pkg.price}
                          </span>
                        </div>
                        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                          {pkg.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm"
                            >
                              <Check className="size-4 sm:size-5 text-[#02542D] flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full ${
                            pkg.popular
                              ? "bg-[#DF6951] hover:bg-[#c5573d]"
                              : "bg-[#02542D] hover:bg-[#023a20]"
                          }`}
                          onClick={() => setShowEnquiryForm(true)}
                        >
                          Select Package
                        </Button>
                      </div>
                    ))}
                  </div>
            </Card>

            {/* Real Weddings Section */}
            <Card className="p-4 sm:p-6 md:p-8 shadow-lg">
              <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl">Real Weddings</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {planner.realWeddings.map((wedding) => (
                  <div
                    key={wedding.id}
                    className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <ImageWithFallback
                        src={wedding.image}
                        alt={wedding.couple}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="mb-1 text-sm sm:text-base">
                        {wedding.couple}
                      </h3>
                      <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="size-3 sm:size-4" />
                        <span>{wedding.location}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {wedding.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews Section */}
                <Card className="p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-full overflow-hidden">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl">
                      Reviews ({planner.reviewCount})
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star className="size-5 sm:size-6 text-amber-500 fill-amber-500" />
                      <span className="text-xl sm:text-2xl">{planner.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {planner.reviews.map((review) => (
                      <div key={review.id}>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <Avatar className="size-10 sm:size-12">
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm sm:text-base">{review.name}</h4>
                              {review.verified && (
                                <BadgeCheck className="size-4 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {Array.from({ length: review.rating }).map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      className="size-3 sm:size-4 text-amber-500 fill-amber-500"
                                    />
                                  )
                                )}
                              </div>
                              <span className="text-xs sm:text-sm text-muted-foreground">
                                • {review.date}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                              {review.comment}
                            </p>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <MapPin className="size-3 sm:size-4" />
                              <span>{review.weddingLocation}</span>
                            </div>
                          </div>
                        </div>
                        <Separator className="mt-4 sm:mt-6" />
                      </div>
                    ))}
                  </div>
            </Card>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1 w-full max-w-full">
            <div className="sticky top-24 space-y-4 sm:space-y-6 w-full max-w-full">
              {/* Quick Stats Card */}
              <Card className="p-4 sm:p-6 shadow-lg w-full max-w-full">
                <h3 className="mb-4 text-base sm:text-lg">Quick Stats</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 sm:size-5 text-muted-foreground" />
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Response
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm">{planner.responseTime}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 sm:size-5 text-muted-foreground" />
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Booking Rate
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm">{planner.bookingRate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 sm:size-5 text-muted-foreground" />
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Repeat Clients
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm">{planner.repeatClients}</span>
                  </div>
                </div>
              </Card>

              {/* Contact Card */}
              <Card className="p-4 sm:p-6 shadow-lg">
                <h3 className="mb-4 text-base sm:text-lg">Get in Touch</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowEnquiryForm(true)}
                    className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#c5573d] hover:to-[#d89001] gap-2 text-sm sm:text-base"
                  >
                    <Send className="size-4" />
                    Send Enquiry
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-sm sm:text-base"
                  >
                    <Phone className="size-4" />
                    Request Call
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-sm sm:text-base"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </Button>
                </div>
              </Card>

              {/* Destinations Card */}
              <Card className="p-4 sm:p-6 shadow-lg">
                <h3 className="mb-4 text-base sm:text-lg flex items-center gap-2">
                  <Globe className="size-4 sm:size-5" />
                  Destinations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {planner.destinations.map((dest, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-[#02542D]/30"
                    >
                      {dest.name}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Languages Card */}
              <Card className="p-4 sm:p-6 shadow-lg">
                <h3 className="mb-4 text-base sm:text-lg">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {planner.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="size-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft className="size-12" />
          </button>

          <div
            className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={planner.gallery[lightboxImageIndex]}
              alt={`Gallery ${lightboxImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight className="size-12" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/60 px-4 py-2 rounded-full">
            {lightboxImageIndex + 1} / {planner.gallery.length}
          </div>
        </div>
      )}

      {/* Enquiry Dialog */}
      <Dialog open={showEnquiryForm} onOpenChange={setShowEnquiryForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "Volkhov, serif" }}>
              Send Enquiry to {planner.name}
            </DialogTitle>
            <DialogDescription>
              Fill in your details and we'll get back to you within{" "}
              {planner.responseTime.toLowerCase()}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEnquirySubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  placeholder="+91 "
                />
              </div>
              <div>
                <Label htmlFor="weddingDate">Wedding Date</Label>
                <Input
                  id="weddingDate"
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) =>
                    setFormData({ ...formData, weddingDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Wedding Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g., Goa, India"
                />
              </div>
              <div>
                <Label htmlFor="guestCount">Guest Count</Label>
                <Input
                  id="guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) =>
                    setFormData({ ...formData, guestCount: e.target.value })
                  }
                  placeholder="Approximate number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                placeholder="e.g., ₹5,00,000 - ₹10,00,000"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us about your wedding vision..."
                rows={4}
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEnquiryForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#c5573d] hover:to-[#d89001]"
              >
                Send Enquiry
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
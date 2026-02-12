import { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Award,
  Calendar,
  Camera,
  Video,
  Palette,
  Heart,
  Share2,
  MessageCircle,
  Send,
  CheckCircle,
  Phone,
  Clock,
  TrendingUp,
  Image as ImageIcon,
  Download,
  Package,
  Briefcase,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type VendorType = "photographer" | "videographer" | "decorator";

interface VendorProfilePageProps {
  vendorType: VendorType;
  vendorId: number;
  onBack: () => void;
}

// Define interfaces for each vendor type
interface PhotographerVendor {
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  profileImage: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: string;
  projectsCompleted: number;
  verified: boolean;
  startingPrice: string;
  gallery: string[];
  specialties: string[];
  style: string;
  equipment: string[];
  deliveryFormat: string;
  turnaroundTime: string;
  editedPhotos: string;
  packages: Package[];
  reviews: Review[];
  operatingRegions: string[];
  languages: string[];
  responseTime: string;
  bookingRate: string;
}

interface VideographerVendor {
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  profileImage: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: string;
  projectsCompleted: number;
  verified: boolean;
  startingPrice: string;
  gallery: string[];
  specialties: string[];
  style: string;
  equipment: string[];
  deliveryFormat: string;
  turnaroundTime: string;
  videoDuration: string;
  droneFootage: string;
  packages: Package[];
  reviews: Review[];
  operatingRegions: string[];
  languages: string[];
  responseTime: string;
  bookingRate: string;
}

interface DecoratorVendor {
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  profileImage: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: string;
  projectsCompleted: number;
  verified: boolean;
  startingPrice: string;
  gallery: string[];
  specialties: string[];
  style: string;
  materials: string[];
  venueTypes: string[];
  setupTime: string;
  customization: string;
  packages: Package[];
  reviews: Review[];
  operatingRegions: string[];
  languages: string[];
  responseTime: string;
  bookingRate: string;
}

interface Package {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  avatar: string;
  verified: boolean;
  comment: string;
  event: string;
}

type VendorData = {
  photographer: {
    1: PhotographerVendor;
  };
  videographer: {
    1: VideographerVendor;
  };
  decorator: {
    1: DecoratorVendor;
  };
};

const vendorData: VendorData = {
  photographer: {
    1: {
      name: "Capture Moments Studio",
      tagline: "Freezing Time, Creating Memories",
      description:
        "With over 10 years of experience in wedding photography, we specialize in capturing the authentic emotions and candid moments that make your day unique. Our artistic approach combines photojournalistic style with creative portraits, ensuring every precious memory is beautifully preserved.",
      coverImage:
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=1200",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=CaptureM",
      location: "Mumbai, India",
      rating: 4.9,
      reviewCount: 156,
      experience: "10+ Years",
      projectsCompleted: 250,
      verified: true,
      startingPrice: "₹35,000",

      gallery: [
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800",
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      ],

      specialties: [
        "Candid Photography",
        "Traditional Shoots",
        "Drone Photography",
        "Pre-wedding",
        "Portraits",
      ],
      style: "Candid & Artistic",
      equipment: [
        "Canon EOS R5",
        "Sony A7III",
        "DJI Mavic Pro",
        "Profoto Lighting",
      ],
      deliveryFormat: "Online Gallery, USB Drive, Prints",
      turnaroundTime: "7-10 working days",
      editedPhotos: "200-300 edited images",

      packages: [
        {
          name: "Essential",
          price: "₹35,000",
          features: [
            "4 hours coverage",
            "1 photographer",
            "150 edited photos",
            "Online gallery",
            "USB delivery",
            "Basic retouching",
          ],
        },
        {
          name: "Premium",
          price: "₹60,000",
          features: [
            "8 hours coverage",
            "2 photographers",
            "300 edited photos",
            "Pre-wedding shoot",
            "Drone photography",
            "Online gallery + USB",
            "Premium album (20 pages)",
            "Advanced retouching",
          ],
          popular: true,
        },
        {
          name: "Luxury",
          price: "₹1,00,000",
          features: [
            "Full day coverage",
            "3 photographers",
            "500+ edited photos",
            "Pre-wedding + engagement",
            "Drone & cinematic shots",
            "Multiple albums",
            "Canvas prints",
            "Same day teaser",
            "Dedicated coordinator",
          ],
        },
      ],

      reviews: [
        {
          id: 1,
          name: "Priya & Karan",
          rating: 5,
          date: "2 weeks ago",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
          verified: true,
          comment:
            "Absolutely stunning work! They captured every emotion beautifully. The candid shots are our favorites. Highly professional and creative team.",
          event: "Wedding, Goa",
        },
        {
          id: 2,
          name: "Riya & Arjun",
          rating: 5,
          date: "1 month ago",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riya",
          verified: true,
          comment:
            "The photos exceeded our expectations! They made us feel so comfortable throughout the shoot. The drone shots were spectacular!",
          event: "Pre-wedding, Udaipur",
        },
      ],

      operatingRegions: ["Mumbai", "Goa", "Udaipur", "Bangalore", "Delhi"],
      languages: ["English", "Hindi", "Marathi"],
      responseTime: "Within 2 hours",
      bookingRate: "95%",
    },
  },
  videographer: {
    1: {
      name: "Cinematic Dreams",
      tagline: "Your Story, Our Passion",
      description:
        "Creating cinematic wedding films that tell your unique love story. With 9+ years of experience and state-of-the-art equipment, we craft emotional, artistic films that you'll treasure forever. Our documentary-style approach captures genuine moments with Hollywood-level production quality.",
      coverImage:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200",
      profileImage:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=CinematicD",
      location: "Mumbai, India",
      rating: 4.9,
      reviewCount: 142,
      experience: "9+ Years",
      projectsCompleted: 200,
      verified: true,
      startingPrice: "₹50,000",

      gallery: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800",
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      ],

      specialties: [
        "Cinematic Films",
        "Drone Videography",
        "Same Day Edit",
        "Documentary Style",
        "Highlight Reels",
      ],
      style: "Cinematic & Emotional",
      equipment: [
        "Sony FX3",
        "DJI Ronin 4D",
        "DJI Inspire 3",
        "4K Cinema Cameras",
      ],
      deliveryFormat: "4K Digital Files, YouTube Link, USB Drive",
      turnaroundTime: "2-3 weeks",
      videoDuration: "3-5 min teaser, 20-30 min feature film",
      droneFootage: "Yes",

      packages: [
        {
          name: "Basic",
          price: "₹50,000",
          features: [
            "6 hours coverage",
            "1 videographer",
            "3-4 min highlight video",
            "4K resolution",
            "Color grading",
            "Online delivery",
          ],
        },
        {
          name: "Premium",
          price: "₹90,000",
          features: [
            "Full day coverage",
            "2 videographers",
            "5 min teaser + 25 min film",
            "Drone footage",
            "Cinematic color grading",
            "Same day edit",
            "Multi-camera setup",
            "USB + online delivery",
          ],
          popular: true,
        },
        {
          name: "Elite",
          price: "₹1,50,000",
          features: [
            "Multi-day coverage",
            "3 videographers",
            "Full feature film",
            "Drone + gimbal shots",
            "Pre-wedding film",
            "4K cinema cameras",
            "Same day edit",
            "Raw footage backup",
            "Custom music licensing",
          ],
        },
      ],

      reviews: [
        {
          id: 1,
          name: "Neha & Vikram",
          rating: 5,
          date: "3 weeks ago",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
          verified: true,
          comment:
            "Our wedding film is absolutely breathtaking! They captured every emotion and the cinematic quality is outstanding. Worth every penny!",
          event: "Wedding, Jaipur",
        },
        {
          id: 2,
          name: "Aisha & Rohan",
          rating: 5,
          date: "1 month ago",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
          verified: true,
          comment:
            "The same day edit brought tears to everyone's eyes! Professional, creative, and so easy to work with. The drone shots were incredible!",
          event: "Destination Wedding, Goa",
        },
      ],

      operatingRegions: ["Mumbai", "Goa", "Udaipur", "Jaipur", "International"],
      languages: ["English", "Hindi", "Gujarati"],
      responseTime: "Within 3 hours",
      bookingRate: "92%",
    },
  },
  decorator: {
    1: {
      name: "Bloom & Bliss Decor",
      tagline: "Designing Dreams",
      description:
        "Creating magical spaces for over 13 years. We specialize in luxury wedding decor with fresh flowers, elegant fabrics, and stunning lighting. Our team transforms venues into breathtaking experiences that reflect your unique style and vision. From intimate gatherings to grand celebrations, we bring your dreams to life.",
      coverImage:
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=1200",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=BloomB",
      location: "Mumbai, India",
      rating: 4.9,
      reviewCount: 198,
      experience: "13+ Years",
      projectsCompleted: 350,
      verified: true,
      startingPrice: "₹1,50,000",

      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
        "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800",
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      ],

      specialties: [
        "Floral Decor",
        "Royal Themes",
        "Destination Weddings",
        "Stage Design",
        "Mandap Decoration",
      ],
      style: "Elegant & Luxurious",
      materials: [
        "Fresh Flowers",
        "Premium Fabrics",
        "Crystal Chandeliers",
        "LED Lighting",
        "Custom Props",
      ],
      venueTypes: ["Indoor", "Outdoor", "Banquet Halls", "Beach", "Palace"],
      setupTime: "4-6 hours",
      customization: "Full theme personalization, logo decor, custom backdrops",

      packages: [
        {
          name: "Classic",
          price: "₹1,50,000",
          features: [
            "Mandap decoration",
            "Stage backdrop",
            "Fresh floral arrangements",
            "Basic lighting",
            "Entry decor",
            "Guest seating setup",
            "Up to 200 guests",
          ],
        },
        {
          name: "Royal",
          price: "₹3,50,000",
          features: [
            "Complete venue transformation",
            "Luxury mandap setup",
            "Floral ceiling installations",
            "Premium lighting design",
            "Photo booth setup",
            "Thematic decor",
            "Crystal chandeliers",
            "Custom props",
            "Up to 500 guests",
          ],
          popular: true,
        },
        {
          name: "Grand",
          price: "₹7,00,000+",
          features: [
            "Luxury venue makeover",
            "Multi-event decor",
            "Premium floral designs",
            "LED walls & screens",
            "Thematic installations",
            "Hanging gardens",
            "Water features",
            "Custom furniture",
            "Unlimited guests",
            "Destination support",
          ],
        },
      ],

      reviews: [
        {
          id: 1,
          name: "Meera & Aditya",
          rating: 5,
          date: "2 weeks ago",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
          verified: true,
          comment:
            "They transformed our venue into a fairytale! The floral arrangements were stunning and every detail was perfect. Our guests couldn't stop talking about the decor!",
          event: "Wedding, Mumbai",
        },
        {
          id: 2,
          name: "Sanjana & Vikram",
          rating: 5,
          date: "3 weeks ago",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana",
          verified: true,
          comment:
            "Absolutely magical! The team understood our vision and executed it flawlessly. The lighting and floral ceiling were breathtaking!",
          event: "Reception, Udaipur",
        },
      ],

      operatingRegions: ["Mumbai", "Pune", "Goa", "Udaipur", "Jaipur", "Delhi"],
      languages: ["English", "Hindi", "Marathi"],
      responseTime: "Within 4 hours",
      bookingRate: "97%",
    },
  },
};

const vendorConfig = {
  photographer: {
    icon: Camera,
    color: "from-blue-500 to-purple-500",
    badge: "bg-blue-500",
  },
  videographer: {
    icon: Video,
    color: "from-red-500 to-pink-500",
    badge: "bg-red-500",
  },
  decorator: {
    icon: Palette,
    color: "from-green-500 to-teal-500",
    badge: "bg-green-500",
  },
};

type VendorTypeMap = {
  photographer: PhotographerVendor;
  videographer: VideographerVendor;
  decorator: DecoratorVendor;
};

export function VendorProfilePage({
  vendorType,
  vendorId,
  onBack,
}: VendorProfilePageProps) {
  const vendor =
    vendorData[vendorType][
      vendorId as keyof (typeof vendorData)[typeof vendorType]
    ] || vendorData[vendorType][1];
  const config = vendorConfig[vendorType];
  const Icon = config.icon;
  const [isSaved, setIsSaved] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  // Type guard functions
  const isPhotographer = (vendor: any): vendor is PhotographerVendor => {
    return vendorType === "photographer";
  };

  const isVideographer = (vendor: any): vendor is VideographerVendor => {
    return vendorType === "videographer";
  };

  const isDecorator = (vendor: any): vendor is DecoratorVendor => {
    return vendorType === "decorator";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" />
          Back to Vendors
        </Button>
      </div>

      {/* Cover Image */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={vendor.coverImage}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Service Badge on Cover */}
        <div className="absolute top-6 right-6">
          <Badge
            className={`${config.badge} text-white gap-2 px-4 py-2 text-sm`}
          >
            <Icon className="size-4" />
            {vendorType.charAt(0).toUpperCase() + vendorType.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 -mt-32 relative z-10 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="p-8 shadow-xl">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={vendor.profileImage}
                  alt={vendor.name}
                  className="size-24 rounded-full border-4 border-white shadow-lg"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1
                          className="text-3xl"
                          style={{ fontFamily: "Volkhov, serif" }}
                        >
                          {vendor.name}
                        </h1>
                        {vendor.verified && (
                          <Badge className="bg-green-500 text-white gap-1">
                            <Award className="size-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg text-muted-foreground mb-3">
                        {vendor.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="size-5 text-amber-500 fill-amber-500" />
                      <span>
                        {vendor.rating} ({vendor.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-5 text-[#DF6951]" />
                      <span>{vendor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-5 text-muted-foreground" />
                      <span>{vendor.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="size-5 text-muted-foreground" />
                      <span>{vendor.projectsCompleted} Projects</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
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
              </div>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {vendor.description}
                  </p>

                  <Separator className="my-6" />

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Clock className="size-4" />
                        <span className="text-sm">Response Time</span>
                      </div>
                      <p>{vendor.responseTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <CheckCircle className="size-4" />
                        <span className="text-sm">Booking Rate</span>
                      </div>
                      <p>{vendor.bookingRate}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <TrendingUp className="size-4" />
                        <span className="text-sm">Experience</span>
                      </div>
                      <p>{vendor.experience}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {vendor.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3">Style</h3>
                      <Badge className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white">
                        {vendor.style}
                      </Badge>
                    </div>

                    {isPhotographer(vendor) && (
                      <>
                        <div>
                          <h3 className="mb-3">Equipment</h3>
                          <div className="grid md:grid-cols-2 gap-2">
                            {vendor.equipment.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="size-4 text-green-500" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Delivery Format
                            </h4>
                            <p>{vendor.deliveryFormat}</p>
                          </div>
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Turnaround
                            </h4>
                            <p>{vendor.turnaroundTime}</p>
                          </div>
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Edited Photos
                            </h4>
                            <p>{vendor.editedPhotos}</p>
                          </div>
                        </div>
                      </>
                    )}

                    {isVideographer(vendor) && (
                      <>
                        <div>
                          <h3 className="mb-3">Equipment</h3>
                          <div className="grid md:grid-cols-2 gap-2">
                            {vendor.equipment.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="size-4 text-green-500" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Video Duration
                            </h4>
                            <p>{vendor.videoDuration}</p>
                          </div>
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Drone Footage
                            </h4>
                            <p>{vendor.droneFootage}</p>
                          </div>
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Delivery Format
                            </h4>
                            <p>{vendor.deliveryFormat}</p>
                          </div>
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Turnaround
                            </h4>
                            <p>{vendor.turnaroundTime}</p>
                          </div>
                        </div>
                      </>
                    )}

                    {isDecorator(vendor) && (
                      <>
                        <div>
                          <h3 className="mb-3">Materials Used</h3>
                          <div className="flex flex-wrap gap-2">
                            {vendor.materials.map((material, index) => (
                              <Badge key={index} variant="outline">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-3">Venue Types</h3>
                          <div className="flex flex-wrap gap-2">
                            {vendor.venueTypes.map((venue, index) => (
                              <Badge key={index} variant="outline">
                                {venue}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Setup Time
                            </h4>
                            <p>{vendor.setupTime}</p>
                          </div>
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">
                              Customization
                            </h4>
                            <p>{vendor.customization}</p>
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />

                    <div>
                      <h3 className="mb-3">Operating Regions</h3>
                      <div className="flex flex-wrap gap-2">
                        {vendor.operatingRegions.map((region, index) => (
                          <Badge
                            key={index}
                            className="bg-rose-50 text-foreground border-[#DF6951]"
                          >
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {vendor.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4">Portfolio Gallery</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {vendor.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="size-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Packages Tab */}
              <TabsContent value="packages" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {vendor.packages.map((pkg, index) => (
                    <Card
                      key={index}
                      className={`p-6 relative ${pkg.popular ? "border-[#DF6951] border-2 shadow-xl" : ""}`}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
                          Most Popular
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="size-5 text-[#DF6951]" />
                        <h3>{pkg.name}</h3>
                      </div>
                      <p
                        className="text-3xl mb-6"
                        style={{ fontFamily: "Volkhov, serif" }}
                      >
                        {pkg.price}
                      </p>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="mb-2">Client Reviews</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="size-5 text-amber-500 fill-amber-500"
                            />
                          ))}
                        </div>
                        <span
                          className="text-2xl"
                          style={{ fontFamily: "Volkhov, serif" }}
                        >
                          {vendor.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({vendor.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    {vendor.reviews.map((review) => (
                      <div key={review.id} className="space-y-3">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>
                              {review.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <h4>{review.name}</h4>
                                {review.verified && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs gap-1"
                                  >
                                    <CheckCircle className="size-3" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="size-4 text-amber-500 fill-amber-500"
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                • {review.event}
                              </span>
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                        {review.id !==
                          vendor.reviews[vendor.reviews.length - 1].id && (
                          <Separator />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="p-6 sticky top-24">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Starting from
                  </p>
                  <p
                    className="text-3xl"
                    style={{ fontFamily: "Volkhov, serif" }}
                  >
                    {vendor.startingPrice}
                  </p>
                </div>

                <Separator />

                <Dialog
                  open={showEnquiryForm}
                  onOpenChange={setShowEnquiryForm}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] gap-2">
                      <Send className="size-4" />
                      Request Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Send Enquiry</DialogTitle>
                      <DialogDescription>
                        Fill in your details and we'll get back to you shortly
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Event Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your requirements..."
                          rows={4}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                      >
                        Send Enquiry
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp
                </Button>

                <Button variant="outline" className="w-full gap-2">
                  <Phone className="size-4" />
                  Call Now
                </Button>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4" />
                    <span>Responds in {vendor.responseTime.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="size-4" />
                    <span>{vendor.bookingRate} booking rate</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="size-4" />
                    <span>{vendor.projectsCompleted}+ completed projects</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Trust Badge */}
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-rose-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Award className="size-6 text-[#DF6951]" />
                </div>
                <div>
                  <h4 className="mb-1">Verified Professional</h4>
                  <p className="text-sm text-muted-foreground">
                    This vendor has been verified by Wedzway and meets our
                    quality standards.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

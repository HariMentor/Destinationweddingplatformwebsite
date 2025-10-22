import { useState } from "react";
import { 
  ArrowLeft, Star, MapPin, Award, Calendar, Users, Globe, 
  Heart, Share2, MessageCircle, Send, CheckCircle, Phone,
  Mail, Clock, TrendingUp, Image as ImageIcon
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface PlannerProfilePageProps {
  plannerId: number;
  onBack: () => void;
}

const plannerData = {
  1: {
    name: "Elegant Affairs By Priya",
    tagline: "Crafting Timeless Wedding Memories",
    description: "With over 12 years of experience in creating unforgettable wedding celebrations, Elegant Affairs specializes in transforming your dreams into reality. We believe every couple has a unique story, and we're here to tell it through extraordinary design, meticulous planning, and flawless execution.",
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
    ],
    
    services: [
      { category: "Planning & Coordination", items: ["Full Wedding Planning", "Day-of Coordination", "Month-of Coordination", "Timeline Creation"] },
      { category: "Design & Styling", items: ["Theme Development", "Decor Design", "Mood Boards", "Color Palettes"] },
      { category: "Vendor Management", items: ["Venue Selection", "Catering Coordination", "Photography/Videography", "Makeup & Hair"] },
      { category: "Guest Services", items: ["Travel Planning", "Accommodation", "RSVP Management", "Welcome Kits"] },
      { category: "International Weddings", items: ["Destination Planning", "Visa Assistance", "Budget Management", "Cultural Integration"] },
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
          "Vendor recommendations"
        ]
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
          "Rehearsal coordination"
        ],
        popular: true
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
          "24/7 support"
        ]
      }
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
        description: "A majestic three-day celebration at a heritage palace overlooking Lake Pichola."
      },
      {
        id: 2,
        couple: "Aisha & Rohan",
        location: "Bali, Indonesia",
        date: "January 2024",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
        theme: "Tropical Paradise",
        guests: 120,
        description: "An intimate beachfront ceremony with sunset vows and traditional Balinese touches."
      },
      {
        id: 3,
        couple: "Neha & Karan",
        location: "Goa, India",
        date: "December 2023",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
        theme: "Bohemian Beach",
        guests: 200,
        description: "A vibrant beach wedding with boho-chic decor and barefoot elegance."
      }
    ],
    
    reviews: [
      {
        id: 1,
        name: "Riya & Arjun",
        rating: 5,
        date: "2 weeks ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riya",
        verified: true,
        comment: "Priya and her team were absolutely phenomenal! They took our vision and exceeded all expectations. Every detail was perfect, from the stunning decor to the seamless coordination. Our guests are still talking about how beautiful everything was. Highly recommend!",
        weddingLocation: "Tuscany, Italy"
      },
      {
        id: 2,
        name: "Sanjana & Vikram",
        rating: 5,
        date: "1 month ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana",
        verified: true,
        comment: "We planned our destination wedding in Udaipur with Elegant Affairs and it was the best decision ever. They handled everything - vendors, logistics, guest management. We could actually enjoy our wedding without stress!",
        weddingLocation: "Udaipur, India"
      },
      {
        id: 3,
        name: "Meera & Aditya",
        rating: 5,
        date: "2 months ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
        verified: true,
        comment: "Professional, creative, and incredibly organized. Priya understood our style perfectly and created a wedding that felt uniquely 'us'. The attention to detail was remarkable.",
        weddingLocation: "Mumbai, India"
      }
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
  }
};

export function PlannerProfilePage({ plannerId, onBack }: PlannerProfilePageProps) {
  const planner = plannerData[plannerId as keyof typeof plannerData] || plannerData[1];
  const [isSaved, setIsSaved] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" />
          Back to Planners
        </Button>
      </div>

      {/* Cover Image */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={planner.coverImage}
          alt={planner.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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
                  src={planner.profileImage}
                  alt={planner.name}
                  className="size-24 rounded-full border-4 border-white shadow-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl" style={{ fontFamily: 'Volkhov, serif' }}>
                          {planner.name}
                        </h1>
                        {planner.verified && (
                          <Badge className="bg-green-500 text-white gap-1">
                            <Award className="size-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg text-muted-foreground mb-3">{planner.tagline}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="size-5 text-amber-500 fill-amber-500" />
                      <span>{planner.rating} ({planner.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-5 text-[#DF6951]" />
                      <span>{planner.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-5 text-muted-foreground" />
                      <span>{planner.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="size-5 text-muted-foreground" />
                      <span>{planner.weddingsPlanned} Weddings</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <Heart className={`size-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
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
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4">About the Planner</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {planner.description}
                  </p>

                  <Separator className="my-6" />

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Clock className="size-4" />
                        <span className="text-sm">Response Time</span>
                      </div>
                      <p>{planner.responseTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <CheckCircle className="size-4" />
                        <span className="text-sm">Booking Rate</span>
                      </div>
                      <p>{planner.bookingRate}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <TrendingUp className="size-4" />
                        <span className="text-sm">Repeat Clients</span>
                      </div>
                      <p>{planner.repeatClients}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="mb-3">Languages Spoken</h3>
                    <div className="flex flex-wrap gap-2">
                      {planner.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="mb-3">Destination Expertise</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {planner.destinations.map((dest, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Globe className="size-4 text-[#DF6951]" />
                          <span className="text-sm">{dest.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4">Photo Gallery</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {planner.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                        <ImageWithFallback
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="size-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div>
                  <h2 className="mb-6">Real Wedding Stories</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {planner.realWeddings.map((wedding) => (
                      <Card key={wedding.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="relative h-64">
                          <ImageWithFallback
                            src={wedding.image}
                            alt={wedding.couple}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="mb-2">{wedding.couple}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="size-3" />
                              {wedding.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              {wedding.date}
                            </div>
                          </div>
                          <Badge className="mb-3">{wedding.theme}</Badge>
                          <p className="text-sm text-muted-foreground mb-3">{wedding.description}</p>
                          <p className="text-sm"><strong>{wedding.guests}</strong> guests</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-6">Services Offered</h2>
                  <div className="space-y-6">
                    {planner.services.map((service, index) => (
                      <div key={index}>
                        <h3 className="mb-3">{service.category}</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {service.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="size-4 text-green-500" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                        {index < planner.services.length - 1 && <Separator className="mt-6" />}
                      </div>
                    ))}
                  </div>
                </Card>

                <div>
                  <h2 className="mb-6">Pricing & Packages</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {planner.packages.map((pkg, index) => (
                      <Card 
                        key={index} 
                        className={`p-6 relative ${pkg.popular ? 'border-[#DF6951] border-2 shadow-xl' : ''}`}
                      >
                        {pkg.popular && (
                          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
                            Most Popular
                          </Badge>
                        )}
                        <h3 className="mb-2">{pkg.name}</h3>
                        <p className="text-3xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
                          {pkg.price}
                        </p>
                        <ul className="space-y-3">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
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
                            <Star key={i} className="size-5 text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                        <span className="text-2xl" style={{ fontFamily: 'Volkhov, serif' }}>
                          {planner.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({planner.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    {planner.reviews.map((review) => (
                      <div key={review.id} className="space-y-3">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <h4>{review.name}</h4>
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs gap-1">
                                    <CheckCircle className="size-3" />
                                    Verified Wedding
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="size-4 text-amber-500 fill-amber-500" />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                • {review.weddingLocation}
                              </span>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                        {review.id !== planner.reviews[planner.reviews.length - 1].id && (
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
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-3xl" style={{ fontFamily: 'Volkhov, serif' }}>
                    {planner.startingPrice}
                  </p>
                </div>

                <Separator />

                <Dialog open={showEnquiryForm} onOpenChange={setShowEnquiryForm}>
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
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div>
                        <Label htmlFor="date">Wedding Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="guests">Expected Guests</Label>
                        <Input id="guests" type="number" placeholder="200" />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us about your dream wedding..."
                          rows={4}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
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
                    <span>Responds in {planner.responseTime.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="size-4" />
                    <span>{planner.bookingRate} booking rate</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="size-4" />
                    <span>{planner.repeatClients} repeat clients</span>
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
                    This planner has been verified by Wedzway and meets our quality standards.
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

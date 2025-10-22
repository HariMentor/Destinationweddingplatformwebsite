import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Calendar,
  Users,
  Plane,
  Hotel,
  Clock,
  Heart,
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle,
  Lock,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface WeddingDataType {
  coupleName: string;
  eventName: string;
  date: string;
  time: string;
  destination: string;
  venue: string;
  venueAddress: string;
  message: string;
  headerImage: string;
  venueImage: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  schedule: Array<{
    time: string;
    event: string;
    icon: any;
  }>;
  accommodation: {
    name: string;
    description: string;
    bookingInfo: string;
  };
  travel: {
    airport: string;
    distance: string;
    transportation: string;
  };
  contactEmail?: string;
  contactPhone?: string;
}

interface PublicWeddingPageProps {
  weddingId: string;
  onBack?: () => void;
  customData?: WeddingDataType;
}

export function PublicWeddingPage({ weddingId, onBack, customData }: PublicWeddingPageProps) {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isPreFilled, setIsPreFilled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rsvpStatus: "attending",
    plusOne: false,
    dietaryRestrictions: "",
    specialRequests: "",
  });

  // Read URL parameters and pre-fill the form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get("guest");
    const guestEmail = urlParams.get("email");
    const guestPhone = urlParams.get("phone");

    if (guestName && guestEmail) {
      setFormData(prev => ({
        ...prev,
        name: guestName,
        email: guestEmail,
        phone: guestPhone || "",
      }));
      setIsPreFilled(true);
    }
  }, []);

  // Default wedding data
  const defaultWeddingData = {
    coupleName: "Sarah & Michael",
    eventName: "A Tuscan Love Story",
    date: "June 15, 2025",
    time: "4:00 PM",
    destination: "Tuscany, Italy",
    venue: "Villa Bellissima",
    venueAddress: "Via della Villa 123, 50022 Greve in Chianti, Florence, Italy",
    message: "Join us for a magical celebration of love in the heart of Tuscany. Your presence would mean the world to us as we begin our forever together.",
    headerImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200",
    venueImage: "https://images.unsplash.com/photo-1698616596895-71e43af05b70?w=800",
    colorPalette: {
      primary: "#B76E79",
      secondary: "#E8B4B8",
      accent: "#F7E7CE",
    },
    schedule: [
      { time: "3:30 PM", event: "Guest Arrival & Welcome Drinks", icon: Users },
      { time: "4:00 PM", event: "Ceremony Begins", icon: Heart },
      { time: "5:00 PM", event: "Cocktail Hour", icon: MessageCircle },
      { time: "6:30 PM", event: "Reception & Dinner", icon: Users },
      { time: "9:00 PM", event: "Dancing & Celebration", icon: Heart },
    ],
    accommodation: {
      name: "Villa Bellissima Guest Rooms + Hotel Toscana",
      description: "We have reserved rooms at the villa and nearby Hotel Toscana for our guests.",
      bookingInfo: "Please mention 'Sarah & Michael Wedding' when booking.",
    },
    travel: {
      airport: "Florence Airport (FLR)",
      distance: "45 minutes from venue",
      transportation: "Shuttle service will be provided from major hotels.",
    },
    contactEmail: "sarah.michael@email.com",
    contactPhone: "+1 (555) 123-4567",
  };

  // Use custom data if provided, otherwise use default
  const weddingData = customData || defaultWeddingData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would send data to backend
    setRsvpSubmitted(true);
  };

  if (rsvpSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="p-6 sm:p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="size-16 sm:size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="size-10 sm:size-12 text-green-600" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
              Thank You!
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Your RSVP has been received. We're excited to celebrate with you!
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground bg-gray-50 p-3 sm:p-4 rounded-lg">
              <p><strong>Name:</strong> {formData.name}</p>
              <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <strong>Response:</strong> 
                <Badge className={
                  formData.rsvpStatus === "attending" ? "bg-green-600" :
                  formData.rsvpStatus === "not-attending" ? "bg-red-600" :
                  "bg-yellow-600"
                }>
                  {formData.rsvpStatus === "attending" ? "Attending" :
                   formData.rsvpStatus === "not-attending" ? "Can't Attend" :
                   "Maybe"}
                </Badge>
              </p>
              {formData.plusOne && <p><strong>Plus One:</strong> Yes</p>}
            </div>
            {onBack && (
              <Button onClick={onBack} variant="outline" className="mt-4 sm:mt-6 w-full sm:w-auto">
                Back to Account
              </Button>
            )}
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header Image */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
        <ImageWithFallback
          src={weddingData.headerImage}
          alt="Wedding"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="size-12 sm:size-16 mb-4 mx-auto" style={{ color: weddingData.colorPalette.primary }} />
            <h1 className="text-3xl sm:text-5xl md:text-7xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
              {weddingData.coupleName}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">{weddingData.eventName}</p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 sm:size-5" />
                {weddingData.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 sm:size-5" />
                {weddingData.destination}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 sm:p-6 md:p-8 text-center">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              {weddingData.message}
            </p>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Wedding Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Venue */}
            <Card className="overflow-hidden">
              <ImageWithFallback
                src={weddingData.venueImage}
                alt="Venue"
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                  Venue Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-4 sm:size-5 text-[#DF6951] mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{weddingData.venue}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{weddingData.venueAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="size-4 sm:size-5 text-[#DF6951] shrink-0" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{weddingData.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 sm:size-5 text-[#DF6951] shrink-0" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{weddingData.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Event Schedule */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                Event Schedule
              </h3>
              <div className="space-y-3">
                {weddingData.schedule.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="size-8 sm:size-10 bg-[#DF6951] rounded-full flex items-center justify-center shrink-0">
                        <Icon className="size-4 sm:size-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm sm:text-base">{item.time}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.event}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Travel & Accommodation */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                Travel & Stay
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Plane className="size-4 sm:size-5 text-[#DF6951] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Getting There</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {weddingData.travel.airport} - {weddingData.travel.distance}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{weddingData.travel.transportation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Hotel className="size-4 sm:size-5 text-[#DF6951] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Accommodation</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{weddingData.accommodation.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{weddingData.accommodation.description}</p>
                    <Badge className="mt-2 bg-[#DF6951] text-xs">{weddingData.accommodation.bookingInfo}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 sm:p-6 md:p-8 lg:sticky lg:top-6">
              <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6" style={{ fontFamily: "Volkhov, serif" }}>
                RSVP
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {isPreFilled && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                    <Lock className="size-4 text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-xs sm:text-sm text-blue-900">
                      Your contact information has been pre-filled and cannot be changed.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter your full name"
                    readOnly={isPreFilled}
                    className={isPreFilled ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="your.email@example.com"
                    readOnly={isPreFilled}
                    className={isPreFilled ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    readOnly={isPreFilled}
                    className={isPreFilled ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm sm:text-base">Will you be attending? *</Label>
                  <RadioGroup
                    value={formData.rsvpStatus}
                    onValueChange={(value) => setFormData({ ...formData, rsvpStatus: value })}
                  >
                    <div className="flex items-center space-x-2 p-2.5 sm:p-3 border-2 border-green-200 bg-green-50 rounded-lg">
                      <RadioGroupItem value="attending" id="attending" />
                      <Label htmlFor="attending" className="cursor-pointer flex-1 text-xs sm:text-sm">
                        Yes, I'll be there! 🎉
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2.5 sm:p-3 border-2 border-yellow-200 bg-yellow-50 rounded-lg">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe" className="cursor-pointer flex-1 text-xs sm:text-sm">
                        Maybe 🤔
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2.5 sm:p-3 border-2 border-red-200 bg-red-50 rounded-lg">
                      <RadioGroupItem value="not-attending" id="not-attending" />
                      <Label htmlFor="not-attending" className="cursor-pointer flex-1 text-xs sm:text-sm">
                        Sorry, can't make it 😢
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-start sm:items-center space-x-2">
                  <Checkbox
                    id="plusOne"
                    checked={formData.plusOne}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, plusOne: checked as boolean })
                    }
                    className="mt-1 sm:mt-0"
                  />
                  <Label htmlFor="plusOne" className="cursor-pointer text-xs sm:text-sm">
                    I'll be bringing a plus one (+1)
                  </Label>
                </div>

                {(formData.rsvpStatus === "attending" || formData.rsvpStatus === "maybe") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="dietary" className="text-sm sm:text-base">Dietary Restrictions</Label>
                      <Input
                        id="dietary"
                        value={formData.dietaryRestrictions}
                        onChange={(e) =>
                          setFormData({ ...formData, dietaryRestrictions: e.target.value })
                        }
                        placeholder="Vegetarian, Gluten-free, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requests" className="text-sm sm:text-base">Special Requests or Notes</Label>
                      <Textarea
                        id="requests"
                        value={formData.specialRequests}
                        onChange={(e) =>
                          setFormData({ ...formData, specialRequests: e.target.value })
                        }
                        placeholder="Any special accommodations or messages for the couple..."
                        rows={3}
                      />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#DF6951] hover:bg-[#c5573d] text-sm sm:text-base"
                  size="lg"
                >
                  Submit RSVP
                </Button>
              </form>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t text-center text-xs sm:text-sm text-muted-foreground">
                <p>Questions? Contact us:</p>
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
                  <a href={`mailto:${weddingData.contactEmail}`} className="flex items-center gap-1 hover:text-[#DF6951]">
                    <Mail className="size-3 sm:size-4" />
                    <span className="text-xs sm:text-sm">Email</span>
                  </a>
                  <a href={`tel:${weddingData.contactPhone?.replace(/\D/g, '')}`} className="flex items-center gap-1 hover:text-[#DF6951]">
                    <Phone className="size-3 sm:size-4" />
                    <span className="text-xs sm:text-sm">Call</span>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

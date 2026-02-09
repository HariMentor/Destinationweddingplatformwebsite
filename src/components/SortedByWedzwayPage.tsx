import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Clock,
  MapPin,
  CheckCircle2,
  Zap,
  Users,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Sparkles,
  Shield,
  Building2,
  Camera,
  Utensils,
  Music,
  Heart,
  ChevronRight,
  ChevronLeft,
  BadgeCheck,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { initiateEnquiry, submitEnquiry } from "./DestinationServices/services/enquiryService";

const serviceBangaloreImages = [
  "https://images.unsplash.com/photo-1519167758481-83f29da1a14a?w=1080&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1080&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1080&q=80",
  "https://images.unsplash.com/photo-1761110787206-2cc164e4913c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjZWxlYnJhdGlvbiUyMHZlbnVlfGVufDF8fHx8MTc2OTE4NzgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1761114905078-163aa92141c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwaGFsbHxlbnwxfHx8fDE3NjkwODcwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1768851142314-c4ebf49ad45b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmFucXVldCUyMGhhbGx8ZW58MXx8fHwxNzY5MTg3OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1578730169862-749bbdc763a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2OTE4Nzk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1569069246867-979d76c7864d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJhbGxyb29tfGVufDF8fHx8MTc2OTE3NDgwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1763231575952-98244918f99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0ZWQlMjBldmVudCUyMHZlbnVlfGVufDF8fHx8MTc2OTE4Nzk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1768776183877-e8f3dfc91f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMHBhcnR5JTIwdmVudWV8ZW58MXx8fHwxNzY5MTg4MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const bangaloreVenues = [
  {
    name: "Taj West End",
    location: "Race Course Road, Bangalore",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da1a14a?w=1080&q=80",
    capacity: "50-500 guests",
    price: "₹3,00,000+",
  },
  {
    name: "The Leela Palace",
    location: "Old Airport Road, Bangalore",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1080&q=80",
    capacity: "100-800 guests",
    price: "₹5,00,000+",
  },
  {
    name: "ITC Gardenia",
    location: "Residency Road, Bangalore",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1080&q=80",
    capacity: "200-1000 guests",
    price: "₹4,50,000+",
  },
];

const differentEvents = [
  {
    title: "Weddings",
    description: "Grand celebrations with traditional and modern themes",
    image: "https://images.unsplash.com/photo-1761114905078-163aa92141c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwaGFsbHxlbnwxfHx8fDE3NjkwODcwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Heart,
    iconColor: "#DF6951",
  },
  {
    title: "Engagements",
    description: "Intimate ceremonies with elegant décor",
    image: "https://images.unsplash.com/photo-1707593390358-cc4c779742c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdhZ2VtZW50JTIwY2VyZW1vbnl8ZW58MXx8fHwxNzY5MTg3ODMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Sparkles,
    iconColor: "#F1A501",
  },
  {
    title: "Birthday Parties",
    description: "Fun celebrations for all ages",
    image: "https://images.unsplash.com/photo-1650584997985-e713a869ee77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY5MTE4NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Star,
    iconColor: "#DF6951",
  },
  {
    title: "Corporate Events",
    description: "Professional gatherings and conferences",
    image: "https://images.unsplash.com/photo-1768851244529-39180171a168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMHNldHVwfGVufDF8fHx8MTc2OTE3NzI1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Building2,
    iconColor: "#02542D",
  },
  {
    title: "Anniversaries",
    description: "Romantic celebrations of lasting love",
    image: "https://images.unsplash.com/photo-1722491634411-09ed1b34eacc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm5pdmVyc2FyeSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2OTE4NzgzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Heart,
    iconColor: "#DF6951",
  },
  {
    title: "Receptions",
    description: "Grand parties with luxury entertainment",
    image: "https://images.unsplash.com/photo-1761110787206-2cc164e4913c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjZWxlYnJhdGlvbiUyMHZlbnVlfGVufDF8fHx8MTc2OTE4NzgzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Music,
    iconColor: "#F1A501",
  },
];

// Hero background image
const heroBackground = "https://images.unsplash.com/photo-1613067532651-7075a620c900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwdmVudWV8ZW58MXx8fHwxNzY5MTcwNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Inspiration Gallery Images
const eventInspirations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1752857015591-c1b85c01c461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3IlMjBlbGVnYW50fGVufDF8fHx8MTc2MDM3NzQyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Elegant Reception Décor",
    category: "Decor",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1587635544862-0e0292bd8ab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMHJvc2VzfGVufDF8fHx8MTc2MDM3NzQyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Floral Arrangements",
    category: "Flowers",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1640794334523-b299f14d28db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGx1eHVyeXxlbnwxfHx8fDE3NjAyNzc0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Designer Cakes",
    category: "Cakes",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1677768061409-3d4fbd0250d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc2MDM3MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Table Settings",
    category: "Setup",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1723832348105-2e69f948135a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwbGlnaHRzfGVufDF8fHx8MTc2MDM3NzQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Lighting Design",
    category: "Lighting",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1641834916652-c7436fd6f99a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBhcmNofGVufDF8fHx8MTc2MDM3NTEwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Ceremony Arch",
    category: "Ceremony",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1578429031640-31345c8b8e34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VudGVycGllY2UlMjBmbG9yYWx8ZW58MXx8fHwxNzYwMzc1MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Centerpieces",
    category: "Decor",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1519167758481-83f29da1a14a?w=1080&q=80",
    title: "Venue Inspiration",
    category: "Venues",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1761114905078-163aa92141c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwaGFsbHxlbnwxfHx8fDE3NjkwODcwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Reception Setup",
    category: "Setup",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1768851142314-c4ebf49ad45b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmFucXVldCUyMGhhbGx8ZW58MXx8fHwxNzY5MTg3OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Banquet Hall",
    category: "Venues",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1707593390358-cc4c779742c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdhZ2VtZW50JTIwY2VyZW1vbnl8ZW58MXx8fHwxNzY5MTg3ODMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Engagement Ceremony",
    category: "Ceremony",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1650584997985-e713a869ee77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY5MTE4NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Birthday Party",
    category: "Party",
  },
];

export function SortedByWedzwayPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    message: "",
    otp: "",
  });

  const [enquiryStep, setEnquiryStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendOTP = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!formData.name || !formData.email) {
      toast.error("Please enter your name and email first");
      return;
    }

    setIsSendingOTP(true);
    try {
      // Convert single eventDate to dateRange for API compatibility
      const payload = {
        venueId: "68ee5044879d558c674ab331", // Placeholder for sorted enquiries (must match submit call)
        dateRange: {
          start: formData.eventDate,
          end: formData.eventDate,
        },
        peopleCount: parseInt(formData.guestCount),
        package: "Custom", // Default for sorted enquiries
        isFlexible: true, // Default for sorted enquiries
        message: formData.message || "Event planning request from Sorted by Wedzway",
        name: formData.name,
        phone: formData.phone,
        eventType: formData.eventType,
        budget: formData.budget ? parseFloat(formData.budget.split("-")[0]) * 100000 : undefined,
      };

      await initiateEnquiry(payload);
      setOtpSent(true);
      toast.success(`OTP sent to ${formData.phone}`);
    } catch (error: any) {
      console.error("Failed to send OTP:", error);
      toast.error(error?.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleVerifyOTP = () => {
    if (!formData.otp || formData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    // OTP verification happens during final submission
    setOtpVerified(true);
    toast.success("Phone number verified successfully!");
  };

  const handleStepOneNext = () => {
    // Validate step 1
    if (!formData.eventType || !formData.eventDate || !formData.guestCount) {
      toast.error("Please fill in all required fields");
      return;
    }
    setEnquiryStep(2);
  };

  const handleSubmitRequest = async () => {
    if (!otpVerified) {
      toast.error("Please verify your phone number first");
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.eventType) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert single eventDate to dateRange for API compatibility
      const payload = {
        venueId: "68ee5044879d558c674ab331",
        dateRange: {
          start: formData.eventDate,
          end: formData.eventDate,
        },
        peopleCount: parseInt(formData.guestCount),
        package: "Custom",
        isFlexible: true,
        message: formData.message || "Event planning request from Sorted by Wedzway",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        budget: formData.budget ? parseFloat(formData.budget.split("-")[0]) * 100000 : undefined,
        otp: formData.otp,
        enquiryType: "concierge" as const,
      };

      await submitEnquiry(payload);
      // Show success state in the form
      setFormSubmitted(true);
      setEnquiryStep(1);
      setOtpSent(false);
      setOtpVerified(false);
      toast.success("Your request has been submitted successfully!");
    } catch (error: any) {
      console.error("Failed to submit enquiry:", error);
      toast.error(error?.response?.data?.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section - Similar to HomePage */}
      <section className="relative pt-12 pb-8 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[48px] h-[500px] md:h-[600px]"
          >
            {/* Background Image - Single Floral Pattern */}
            <img
              src={heroBackground}
              alt="Sorted by Wedzway"
              className="w-full h-full object-cover"
            />

            {/* Subtle Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

            {/* Service Badge - Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-6 right-6 md:top-8 md:right-8"
            >
              <div className="bg-[#DF6951]/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Zap className="size-5 text-white" />
                  <span className="font-semibold text-white">Now Live in Bangalore</span>
                </div>
              </div>
            </motion.div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 bg-[rgba(1,1,1,0)]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Brand Name with Creative Typography */}
                <div className="mb-6">
                  {/* Option 1: Gradient Text with Shadow */}
                  <h1
                    className="text-7xl md:text-8xl lg:text-9xl font-black mb-3 tracking-tight leading-none text-white"
                    style={{
                      fontFamily: '"Bebas Neue", "Impact", "Arial Black", sans-serif',
                      letterSpacing: '0.1em',
                      textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    SORTED
                  </h1>

                  {/* Styled "by Wedzway" with accent */}
                  <div className="flex items-center gap-3">
                    <div className="h-0.5 w-12 bg-gradient-to-r from-[#DF6951] to-transparent"></div>
                    <p className="text-2xl md:text-3xl text-white font-light tracking-[0.3em]">
                      BY WEDZWAY
                    </p>
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl font-light leading-relaxed">
                  Your Dream Event, Planned & Executed in Just 24 Hours
                </p>

                <Button
                  size="lg"
                  className="bg-[#DF6951] hover:bg-[#DF6951]/90 text-white px-10 py-6 text-lg font-semibold shadow-lg shadow-[#DF6951]/30"
                  onClick={() => document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started Now
                  <ArrowRight className="ml-2 size-6" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Different Events Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-rose-50/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#DF6951] font-semibold mb-2">Event Types</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              Perfect for Every Celebration
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we plan it all
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
                      <event.icon className="size-6 stroke-[1.5]" style={{ color: event.iconColor }} />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-white/90 text-sm mb-4">{event.description}</p>
                      <Button
                        size="sm"
                        className="bg-[#DF6951] hover:bg-[#DF6951]/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Plan This Event
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-8 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#DF6951] font-semibold mb-2">Simple Process</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              From Request to Celebration
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures your event is perfectly planned in record time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Submit Request",
                description: "Fill out our quick form with your event details",
                icon: BadgeCheck,
                time: "5 minutes",
                iconBg: "bg-orange-50",
                iconColor: "#DF6951",
              },
              {
                step: "02",
                title: "Instant Matching",
                description: "AI matches you with the best venues and vendors",
                icon: Zap,
                time: "30 minutes",
                iconBg: "bg-yellow-50",
                iconColor: "#F1A501",
              },
              {
                step: "03",
                title: "Plan Approval",
                description: "Review and approve your complete event plan",
                icon: CheckCircle2,
                time: "2 hours",
                iconBg: "bg-teal-50",
                iconColor: "#02542D",
              },
              {
                step: "04",
                title: "Event Day",
                description: "Everything sorted! Arrive and enjoy your event",
                icon: Sparkles,
                time: "24 hours",
                iconBg: "bg-purple-50",
                iconColor: "#9333EA",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full bg-white border border-gray-100 hover:shadow-md transition-all">
                  {/* Icon with colored background */}
                  <div className={`${item.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                    <item.icon className="size-8 stroke-[1.5]" style={{ color: item.iconColor }} />
                  </div>

                  {/* Time badge */}
                  <div className="inline-block bg-gray-50 px-3 py-1 rounded-full mb-3">
                    <span className="text-xs text-gray-600">{item.time}</span>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Inspiration Gallery - Pinterest Style */}
      <section className="py-16 px-4 md:px-8 bg-[#fafafa]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#DF6951] font-semibold mb-2">Get Inspired</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              Event Inspiration Gallery
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore beautiful event setups, décor ideas, and design inspiration to make your celebration unforgettable
            </p>
          </div>

          {/* Pinterest-Style Masonry Grid */}
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 768: 3, 1024: 4, 1440: 5 }}
          >
            <Masonry gutter="10px">
              {eventInspirations.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover"
                      />

                      {/* Hover Overlay - Pinterest Style */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                        <h3 className="text-white text-lg font-semibold mb-1 text-center">{item.title}</h3>
                        <Badge variant="secondary" className="bg-white/90 text-gray-900">
                          {item.category}
                        </Badge>
                        <div className="mt-4">
                          <Button
                            size="sm"
                            className="bg-white text-gray-900 hover:bg-white/90"
                            onClick={() => document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' })}
                          >
                            <Eye className="mr-2 size-4" />
                            Get This Look
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Minimal Info */}
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#DF6951] hover:bg-[#DF6951]/90 text-white px-8"
              onClick={() => document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Plan Your Dream Event
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-rose-50/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#DF6951] font-semibold mb-2">Complete Package</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              Everything You Need, All Sorted
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Full-service event planning with premium vendors and seamless execution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: "Premium Venues",
                items: ["5-star hotels", "Banquet halls", "Outdoor spaces", "Rooftop venues"],
                iconBg: "bg-purple-50",
                iconColor: "#9333EA",
              },
              {
                icon: Camera,
                title: "Professional Coverage",
                items: ["Photographers", "Videographers", "Drone coverage", "Albums & edits"],
                iconBg: "bg-blue-50",
                iconColor: "#3B82F6",
              },
              {
                icon: Utensils,
                title: "Catering Excellence",
                items: ["Multi-cuisine", "Bar services", "Live stations", "Custom menus"],
                iconBg: "bg-orange-50",
                iconColor: "#DF6951",
              },
              {
                icon: Sparkles,
                title: "Décor & Design",
                items: ["Theme décor", "Floral design", "Lighting setup", "Stage design"],
                iconBg: "bg-pink-50",
                iconColor: "#EC4899",
              },
              {
                icon: Music,
                title: "Entertainment",
                items: ["DJ services", "Live bands", "Sound systems", "Emcee services"],
                iconBg: "bg-yellow-50",
                iconColor: "#F1A501",
              },
              {
                icon: Users,
                title: "Event Management",
                items: ["Coordinator", "On-site support", "Vendor coordination", "Timeline management"],
                iconBg: "bg-teal-50",
                iconColor: "#02542D",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full bg-white border border-gray-100 hover:shadow-md transition-all">
                  <div className={`${service.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                    <service.icon className="size-8 stroke-[1.5]" style={{ color: service.iconColor }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <CheckCircle2 className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues in Bangalore */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#DF6951] font-semibold mb-2">Top Venues</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              Premium Venues in Bangalore
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Partnered with the finest venues to make your event unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bangaloreVenues.map((venue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="size-4 text-yellow-400 fill-yellow-400" />
                        <Star className="size-4 text-yellow-400 fill-yellow-400" />
                        <Star className="size-4 text-yellow-400 fill-yellow-400" />
                        <Star className="size-4 text-yellow-400 fill-yellow-400" />
                        <Star className="size-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm">
                      <MapPin className="size-4" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="size-4" />
                        <span>{venue.capacity}</span>
                      </div>
                      <div className="text-[#DF6951] font-semibold">{venue.price}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="request-form" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-amber-50/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[#DF6951] font-semibold mb-2">Get Started</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              Request Your Event Planning
            </h2>
            <p className="text-gray-600">
              Fill out the form and our team will contact you within 2 hours
            </p>
          </div>

          <Card className="p-8 md:p-10">
            {formSubmitted ? (
              // Success State
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                {/* Success Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
                  <CheckCircle2 className="size-12 text-green-600" />
                </div>

                {/* Success Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Request Submitted Successfully!
                </h3>

                {/* Success Message */}
                <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
                  A confirmation has been sent to <span className="font-semibold text-gray-900">{formData.email}</span> and <span className="font-semibold text-gray-900">{formData.phone}</span>.
                </p>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
                  <div className="bg-gradient-to-br from-[#DF6951]/10 to-[#DF6951]/5 p-6 rounded-2xl text-left">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#DF6951]/20 p-2 rounded-lg">
                        <Clock className="size-5 text-[#DF6951]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Quick Response</h4>
                        <p className="text-sm text-gray-600">Our team will reach out to you shortly within 2 hours</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#02542D]/10 to-[#02542D]/5 p-6 rounded-2xl text-left">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#02542D]/20 p-2 rounded-lg">
                        <Mail className="size-5 text-[#02542D]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Check Your Inbox</h4>
                        <p className="text-sm text-gray-600">Confirmation email and SMS sent to your contact details</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Summary */}
                <div className="bg-gray-50 p-6 rounded-2xl mb-8 max-w-2xl mx-auto">
                  <h4 className="font-semibold text-gray-900 mb-4">Event Summary</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg">
                        <Calendar className="size-5 text-[#DF6951]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Event Type</p>
                        <p className="font-medium text-gray-900 capitalize">{formData.eventType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg">
                        <Calendar className="size-5 text-[#DF6951]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Event Date</p>
                        <p className="font-medium text-gray-900">{formData.eventDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg">
                        <Users className="size-5 text-[#DF6951]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Guest Count</p>
                        <p className="font-medium text-gray-900">{formData.guestCount} guests</p>
                      </div>
                    </div>
                    {formData.budget && (
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg">
                          <Sparkles className="size-5 text-[#DF6951]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="font-medium text-gray-900">₹{formData.budget} Lakhs</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        eventType: "",
                        eventDate: "",
                        guestCount: "",
                        budget: "",
                        message: "",
                        otp: "",
                      });
                    }}
                  >
                    Submit Another Request
                  </Button>
                  <Button
                    size="lg"
                    className="bg-[#DF6951] hover:bg-[#DF6951]/90 text-white px-8"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Back to Home
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${enquiryStep === 1
                      ? 'bg-[#DF6951] text-white'
                      : 'bg-green-500 text-white'
                      }`}>
                      {enquiryStep === 1 ? '1' : <CheckCircle2 className="size-5" />}
                    </div>
                    <span className={`text-sm font-medium ${enquiryStep === 1 ? 'text-[#DF6951]' : 'text-gray-600'}`}>
                      Event Details
                    </span>
                  </div>
                  <div className={`h-0.5 w-12 ${enquiryStep === 2 ? 'bg-[#DF6951]' : 'bg-gray-300'}`} />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${enquiryStep === 2
                      ? 'bg-[#DF6951] text-white'
                      : 'bg-gray-200 text-gray-500'
                      }`}>
                      2
                    </div>
                    <span className={`text-sm font-medium ${enquiryStep === 2 ? 'text-[#DF6951]' : 'text-gray-500'}`}>
                      Contact Info
                    </span>
                  </div>
                </div>

                {enquiryStep === 1 ? (
                  <>
                    {/* Step 1: Event Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="eventType" className="text-sm font-medium mb-2 block">
                          Event Type <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="engagement">Engagement</SelectItem>
                            <SelectItem value="reception">Reception</SelectItem>
                            <SelectItem value="birthday">Birthday Party</SelectItem>
                            <SelectItem value="anniversary">Anniversary</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="eventDate" className="text-sm font-medium mb-2 block">
                          Preferred Event Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => handleInputChange("eventDate", e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="guestCount" className="text-sm font-medium mb-2 block">
                          Expected Guest Count <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="guestCount"
                          type="number"
                          placeholder="e.g., 150"
                          value={formData.guestCount}
                          onChange={(e) => handleInputChange("guestCount", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget" className="text-sm font-medium mb-2 block">
                          Budget Range
                        </Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2">₹1-2 Lakhs</SelectItem>
                            <SelectItem value="2-4">₹2-4 Lakhs</SelectItem>
                            <SelectItem value="4-7">₹4-7 Lakhs</SelectItem>
                            <SelectItem value="7-10">₹7-10 Lakhs</SelectItem>
                            <SelectItem value="10+">₹10+ Lakhs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                        Additional Details
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your event, special requirements, preferences, etc."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                      />
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-[#DF6951] hover:bg-[#DF6951]/90 text-white h-12"
                      onClick={handleStepOneNext}
                    >
                      Continue to Contact Info
                      <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Step 2: Contact Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="h-12 flex-1"
                        />
                        <Button
                          onClick={handleSendOTP}
                          disabled={otpSent || isSendingOTP}
                          className="bg-[#DF6951] hover:bg-[#DF6951]/90 h-12"
                        >
                          {isSendingOTP ? "Sending..." : otpSent ? "Sent" : "Send OTP"}
                        </Button>
                      </div>
                    </div>

                    {otpSent && !otpVerified && (
                      <div>
                        <Label htmlFor="otp" className="text-sm font-medium mb-2 block">
                          Enter OTP <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="otp"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={formData.otp}
                            onChange={(e) => handleInputChange("otp", e.target.value)}
                            maxLength={6}
                            className="h-12 flex-1"
                          />
                          <Button
                            onClick={handleVerifyOTP}
                            disabled={isVerifyingOTP}
                            className="bg-[#02542D] hover:bg-[#02542D]/90 h-12"
                          >
                            <Shield className="mr-1 size-4" />
                            {isVerifyingOTP ? "Verifying..." : "Verify"}
                          </Button>
                        </div>
                      </div>
                    )}

                    {otpVerified && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex gap-3 items-center">
                          <CheckCircle2 className="size-5 text-green-600 flex-shrink-0" />
                          <p className="text-sm text-green-700 font-medium">
                            Phone number verified successfully!
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex gap-3">
                        <Clock className="size-5 text-[#DF6951] flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-sm">Quick Response Guarantee</h4>
                          <p className="text-sm text-gray-600">
                            Our team will contact you within 2 hours during business hours (9 AM - 9 PM IST)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 h-12"
                        onClick={() => setEnquiryStep(1)}
                      >
                        <ChevronLeft className="mr-1 size-4" />
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80 text-white h-12"
                        onClick={handleSubmitRequest}
                        disabled={!otpVerified || isSubmitting}
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Mail className="mr-2 size-5" />
                            Submit Request
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-xs text-center text-muted-foreground">
                      We'll respond within 24 hours
                    </p>
                  </>
                )}
              </div>
            )}
          </Card>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Card className="p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="bg-[#DF6951]/10 p-3 rounded-xl">
                <Phone className="size-5 text-[#DF6951]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Call Us</div>
                <div className="font-semibold text-sm">+91 98765 43210</div>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="bg-[#02542D]/10 p-3 rounded-xl">
                <Mail className="size-5 text-[#02542D]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Email Us</div>
                <div className="font-semibold text-sm">sorted@wedzway.com</div>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="bg-[#DF6951]/10 p-3 rounded-xl">
                <MapPin className="size-5 text-[#DF6951]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Location</div>
                <div className="font-semibold text-sm">Bangalore, India</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Sorted */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#DF6951] font-semibold mb-2">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              The Sorted Advantage
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Complete planning in just 24 hours",
              },
              {
                icon: Shield,
                title: "100% Verified",
                description: "All vendors thoroughly vetted",
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Only the best in Bangalore",
              },
              {
                icon: Heart,
                title: "Stress-Free",
                description: "We handle everything for you",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-br from-[#DF6951]/10 to-[#02542D]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="size-8 text-[#DF6951]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#DF6951] font-semibold mb-2">Success Stories</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real experiences from couples and event hosts who trusted Sorted with their special day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya & Rahul",
                event: "Wedding Reception",
                date: "December 2024",
                rating: 5,
                image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80",
                feedback: "Absolutely incredible! We had just 3 days to plan our reception in Bangalore and Sorted made it happen flawlessly. The Taj West End venue was stunning, and every detail was perfect. Highly recommended!",
                highlight: "Planned in 24 hours",
              },
              {
                name: "Anjali Mehta",
                event: "50th Birthday Celebration",
                date: "January 2025",
                rating: 5,
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                feedback: "The team at Sorted went above and beyond for my mother's milestone birthday. The décor was breathtaking, the food was exceptional, and everything ran smoothly. Worth every penny!",
                highlight: "200 guests hosted",
              },
              {
                name: "Vikram Sharma",
                event: "Corporate Annual Gala",
                date: "November 2024",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                feedback: "Professional, efficient, and creative. Sorted delivered an unforgettable corporate event that impressed all our stakeholders. The vendor coordination was seamless. Will definitely use again!",
                highlight: "500+ attendees",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all bg-white">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.feedback}"
                  </p>

                  {/* Highlight Badge */}
                  <div className="inline-block bg-orange-50 px-3 py-1 rounded-full mb-4">
                    <span className="text-xs font-medium text-[#DF6951]">{testimonial.highlight}</span>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.event}</p>
                      <p className="text-xs text-gray-500">{testimonial.date}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mt-12 pt-12 border-t">
            {[
              { number: "500+", label: "Events Sorted", icon: Calendar },
              { number: "1000+", label: "Happy Clients", icon: Heart },
              { number: "4.9/5", label: "Average Rating", icon: Star },
              { number: "98%", label: "On-Time Delivery", icon: CheckCircle2 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#DF6951]/10 to-[#02542D]/10 rounded-2xl mb-3">
                  <stat.icon className="size-6 text-[#DF6951]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
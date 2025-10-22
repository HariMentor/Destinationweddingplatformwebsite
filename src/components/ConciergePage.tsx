"use client";

import { useState } from "react";
import {
  Check,
  X,
  Star,
  Shield,
  Plane,
  Heart,
  Users,
  MapPin,
  Clock,
  Phone,
  Calendar,
  Gift,
  TrendingDown,
  Award,
  Sparkles,
  Crown,
  Zap,
  Globe,
  BadgeCheck,
  ChevronRight,
  ArrowRight,
  Palette,
  FileText,
  DollarSign,
  Target,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { useCurrency } from "./CurrencyContext";

interface ConciergeTier {
  id: string;
  name: string;
  priceINR: number; // Base price in INR
  adjustableINR: number; // Adjustable amount in INR
  tagline: string;
  ideal: string;
  popular?: boolean;
  elite?: boolean;
  weddingCoverage: string;
  membershipType?: string;
  membershipYears?: number;
  features: {
    category: string;
    items: Array<{
      label: string;
      included: boolean;
      details?: string;
    }>;
  }[];
  coins?: {
    rate: string;
    example: string;
    redeemFor: string[];
  };
  perks?: string[];
  transferable?: {
    enabled: boolean;
    count?: number;
    discounts?: string[];
  };
}

const conciergeTiers: ConciergeTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceINR: 50000,
    adjustableINR: 50000,
    tagline: "Single Wedding, Remote Support",
    ideal: "Budget-conscious couples (₹25-50L weddings), DIY-comfortable",
    weddingCoverage: "1 Wedding",
    features: [
      {
        category: "Coverage",
        items: [
          { label: "Remote venue negotiation", included: true },
          { label: "Virtual support (24-48hr response)", included: true },
          { label: "Basic vendor recommendations", included: true },
          { label: "Contract review checklist", included: true },
          { label: "Site visits", included: false },
          { label: "In-person negotiations", included: false },
        ],
      },
      {
        category: "Membership",
        items: [
          { label: "Membership perks", included: false },
          { label: "Wedzway coins", included: false },
          { label: "Multi-wedding coverage", included: false },
        ],
      },
    ],
  },
  {
    id: "pro",
    name: "Pro Member",
    priceINR: 100000,
    adjustableINR: 50000,
    tagline: "Premium Membership + 3 Weddings + Coins",
    ideal: "₹50L-1Cr weddings, families with multiple weddings planned",
    popular: true,
    weddingCoverage: "3 Weddings",
    membershipType: "Wedzway Premium Membership",
    membershipYears: 3,
    features: [
      {
        category: "Coverage",
        items: [
          {
            label: "3 wedding bookings",
            included: true,
            details: "Your wedding + 2 family/friend weddings within 3 years",
          },
          { label: "Site visits with you (final 3 venues)", included: true },
          { label: "In-person negotiations", included: true },
          { label: "2-day on-ground coordination", included: true },
          { label: "Remote venue negotiation", included: true },
          { label: "24/7 instant support", included: true },
        ],
      },
      {
        category: "Membership Benefits",
        items: [
          { label: "Premium Membership (3 years)", included: true },
          { label: "Transferable to 2 family/friends", included: true },
          { label: "2nd wedding: 50% off our charges", included: true },
          { label: "3rd wedding: 35% off our charges", included: true },
        ],
      },
    ],
    coins: {
      rate: "100 coins per ₹1L spent",
      example: "₹60L wedding = 6,000 coins = ₹60,000 credit",
      redeemFor: [
        "Honeymoon",
        "Anniversary trips",
        "Baby showers",
        "Event planning",
      ],
    },
    perks: [
      "Room upgrade priority (when available)",
      "Complimentary venue tasting for 2 (₹15-25k value)",
      "Late checkout (2pm vs 11am)",
      "Welcome amenity (champagne + flowers in room)",
      "Early venue access for pre-wedding shoot (4 hours complimentary)",
    ],
    transferable: {
      enabled: true,
      count: 2,
      discounts: ["2nd wedding: 50% off", "3rd wedding: 35% off"],
    },
  },
  {
    id: "elite",
    name: "Elite Member",
    priceINR: 150000,
    adjustableINR: 50000,
    tagline: "Platinum Membership + 3 Weddings + Max Coins + VIP Perks",
    ideal: "₹1Cr+ weddings, NRI families, destination weddings, multiple family weddings planned",
    elite: true,
    weddingCoverage: "3 Weddings",
    membershipType: "Wedzway Platinum Membership",
    membershipYears: 3,
    features: [
      {
        category: "Coverage",
        items: [
          {
            label: "3 wedding bookings",
            included: true,
            details: "Your wedding + 2 family/friend weddings within 3 years",
          },
          {
            label: "Site visits with you (3 venues per wedding)",
            included: true,
          },
          { label: "In-person negotiations", included: true },
          {
            label: "2-day on-ground coordination per wedding",
            included: true,
          },
          {
            label: "Visa/flight coordination (for destination weddings)",
            included: true,
          },
          { label: "24/7 instant support", included: true },
        ],
      },
      {
        category: "Membership Benefits",
        items: [
          { label: "Platinum Membership (3 years)", included: true },
          { label: "Transferable to 2 family/friends", included: true },
          { label: "2nd wedding: 50% off our charges", included: true },
          { label: "3rd wedding: 25% off our charges", included: true },
        ],
      },
    ],
    coins: {
      rate: "150 coins per ₹1L spent (50% bonus vs. Pro)",
      example: "₹1Cr wedding = 15,000 coins = ₹1,50,000 credit",
      redeemFor: [
        "Honeymoon",
        "Anniversary trips",
        "Baby showers",
        "Vow renewals",
        "Milestone events",
      ],
    },
    perks: [
      "Room upgrade (subject to availability, priority over Pro members)",
      "Complimentary venue tasting for 4 (₹30-40k value)",
      "Late checkout (4pm vs 11am)",
      "Premium welcome amenity (champagne, flowers, personalized gift)",
      "Exclusive venue access (book sold-out dates through our partnerships)",
      "Pre-wedding shoot day (8 hours venue access, ₹50k value)",
      "Priority vendor booking (decorators, photographers during peak season)",
      "Concierge hotline (emergency vendor replacement within 2 hours)",
    ],
    transferable: {
      enabled: true,
      count: 2,
      discounts: ["2nd wedding: 50% off", "3rd wedding: 25% off"],
    },
  },
];

const coreServices = [
  {
    icon: Shield,
    title: "Trust & Safety Assurance",
    description:
      "Navigate foreign locations with confidence. We verify every vendor, venue, and service provider.",
  },
  {
    icon: Plane,
    title: "Travel Assurance",
    description:
      "Complete travel management including visa coordination, flight bookings, and private flight arrangements.",
  },
  {
    icon: Users,
    title: "Planner Matchmaking",
    description:
      "Connect with the perfect wedding planner for your vision, budget, and destination.",
  },
  {
    icon: MapPin,
    title: "Venue Negotiation",
    description:
      "Leverage our partnerships to secure the best rates and exclusive access to premium venues.",
  },
  {
    icon: FileText,
    title: "Smart Contracts",
    description:
      "Legally sound contracts that protect your interests across borders.",
  },
  {
    icon: Globe,
    title: "Guest Travel Management",
    description:
      "Coordinate accommodation, transportation, and experiences for all your guests.",
  },
  {
    icon: DollarSign,
    title: "Cross-Border Tax",
    description:
      "Navigate international tax implications and optimize your wedding investment.",
  },
  {
    icon: Palette,
    title: "Fashion Stylist",
    description:
      "Personal styling services for the couple and wedding party.",
  },
  {
    icon: Heart,
    title: "Pre-Wedding & Proposal",
    description:
      "Plan unforgettable pre-wedding shoots and proposal moments.",
  },
];

export function ConciergePage() {
  const [selectedTier, setSelectedTier] = useState<string>("pro");
  const [activeTab, setActiveTab] = useState("overview");
  const { formatPrice, currency } = useCurrency();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-amber-50/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#DF6951]/5 via-transparent to-[#F1A501]/5" />
        
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white border-0">
              Premium Concierge Service
            </Badge>
            <h1
              className="text-5xl md:text-6xl mb-6"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Your Personal Wedding Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Managing every detail from selecting venues and planners, to
              handling budgets and guest experiences, for the wedding you've
              imagined.
            </p>
          </div>

          {/* Why Concierge - Key Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center border-2 hover:border-[#DF6951] transition-all">
              <Shield className="size-12 text-[#DF6951] mx-auto mb-4" />
              <h3 className="mb-2">Trust & Confidence</h3>
              <p className="text-sm text-muted-foreground">
                Navigate new locations with complete peace of mind
              </p>
            </Card>
            <Card className="p-6 text-center border-2 hover:border-[#DF6951] transition-all">
              <BadgeCheck className="size-12 text-[#DF6951] mx-auto mb-4" />
              <h3 className="mb-2">Safety Assurance</h3>
              <p className="text-sm text-muted-foreground">
                Verified vendors and secure booking processes
              </p>
            </Card>
            <Card className="p-6 text-center border-2 hover:border-[#DF6951] transition-all">
              <Plane className="size-12 text-[#DF6951] mx-auto mb-4" />
              <h3 className="mb-2">Travel Assurance</h3>
              <p className="text-sm text-muted-foreground">
                Complete visa, flight, and guest travel management
              </p>
            </Card>
            <Card className="p-6 text-center border-2 hover:border-[#DF6951] transition-all">
              <Sparkles className="size-12 text-[#DF6951] mx-auto mb-4" />
              <h3 className="mb-2">Dream Execution</h3>
              <p className="text-sm text-muted-foreground">
                Turn your destination wedding dreams into reality
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl mb-4"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Choose Your Concierge Tier
            </h2>
            <p className="text-lg text-muted-foreground">
              Flexible options designed for every wedding budget and vision
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {conciergeTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`relative overflow-hidden transition-all ${
                  tier.popular
                    ? "border-[#DF6951] border-2 shadow-xl scale-105"
                    : tier.elite
                    ? "border-[#F1A501] border-2 shadow-lg"
                    : "border-2 hover:border-gray-300"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white px-4 py-1 text-sm">
                    Most Popular
                  </div>
                )}
                {tier.elite && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#F1A501] to-[#DF6951] text-white px-4 py-1 text-sm flex items-center gap-1">
                    <Crown className="size-4" />
                    Elite
                  </div>
                )}

                <div className="p-8">
                  {/* Tier Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl mb-2">{tier.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl" style={{ fontFamily: "Volkhov, serif" }}>
                        {formatPrice(tier.priceINR)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {tier.adjustableINR === tier.priceINR 
                          ? "Fully Adjustable" 
                          : `${formatPrice(tier.adjustableINR)} Adjustable`
                        }
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {tier.tagline}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-rose-50 to-amber-50"
                    >
                      {tier.weddingCoverage}
                    </Badge>
                  </div>

                  <Separator className="my-6" />

                  {/* Features */}
                  <div className="space-y-6 mb-8">
                    {tier.features.map((category, idx) => (
                      <div key={idx}>
                        <p className="text-sm font-medium text-muted-foreground mb-3">
                          {category.category}
                        </p>
                        <div className="space-y-2">
                          {category.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-start gap-2"
                            >
                              {item.included ? (
                                <Check className="size-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              ) : (
                                <X className="size-5 text-gray-300 flex-shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span
                                  className={`text-sm ${
                                    item.included
                                      ? "text-foreground"
                                      : "text-muted-foreground line-through"
                                  }`}
                                >
                                  {item.label}
                                </span>
                                {item.details && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {item.details}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Membership */}
                    {tier.membershipType && (
                      <div className="p-4 bg-gradient-to-br from-rose-50 to-amber-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="size-5 text-[#DF6951]" />
                          <p className="font-medium text-sm">
                            {tier.membershipType}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Valid for {tier.membershipYears} years
                        </p>
                      </div>
                    )}

                    {/* Coins */}
                    {tier.coins && (
                      <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-[#F1A501]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="size-5 text-[#F1A501]" />
                          <p className="font-medium text-sm">Wedzway Coins</p>
                        </div>
                        <p className="text-xs mb-2">
                          <strong>{tier.coins.rate}</strong>
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {tier.coins.example}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tier.coins.redeemFor.map((item, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full ${
                      tier.popular || tier.elite
                        ? "bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                        : ""
                    }`}
                    variant={tier.popular || tier.elite ? "default" : "outline"}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {tier.popular || tier.elite ? "Get Started" : "Choose Plan"}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>

                  {/* Ideal For */}
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Perfect for: {tier.ideal}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Perks Comparison */}
      <section className="py-20 bg-gradient-to-br from-rose-50/50 to-amber-50/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl mb-4"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Premium Venue Perks
            </h2>
            <p className="text-lg text-muted-foreground">
              Exclusive benefits at partner venues
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Pro Perks */}
            <Card className="p-8 border-2 border-[#DF6951]/20">
              <div className="flex items-center gap-3 mb-6">
                <Star className="size-8 text-[#DF6951]" />
                <div>
                  <h3 className="text-2xl">Pro Member Perks</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium venue benefits
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {conciergeTiers[1].perks?.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="size-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Elite Perks */}
            <Card className="p-8 border-2 border-[#F1A501]/30 bg-gradient-to-br from-white to-amber-50/30">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="size-8 text-[#F1A501]" />
                <div>
                  <h3 className="text-2xl">Elite Member Perks</h3>
                  <p className="text-sm text-muted-foreground">
                    VIP venue benefits
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {conciergeTiers[2].perks?.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="size-5 text-[#F1A501] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Savings Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl mb-4"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Personalized Savings Dashboard
            </h2>
            <p className="text-lg text-muted-foreground">
              Track your value differently based on your tier
            </p>
          </div>

          <Tabs
            defaultValue="mid"
            className="max-w-6xl mx-auto"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="mid">
                <TrendingDown className="mr-2 size-4" />
                Mid-Tier (₹50L-1Cr)
              </TabsTrigger>
              <TabsTrigger value="luxury">
                <Target className="mr-2 size-4" />
                Luxury (₹1-3Cr)
              </TabsTrigger>
              <TabsTrigger value="ultra">
                <Crown className="mr-2 size-4" />
                Ultra-Luxury (₹3Cr+)
              </TabsTrigger>
            </TabsList>

            {/* Mid-Tier Dashboard */}
            <TabsContent value="mid">
              <Card className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl mb-2">
                    Look How Much You Saved!
                  </h3>
                  <p className="text-muted-foreground">
                    Celebratory, explicit, proud
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                    <div className="text-center">
                      <TrendingDown className="size-12 text-emerald-600 mx-auto mb-3" />
                      <p className="text-4xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                        {formatPrice(850000)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Savings
                      </p>
                    </div>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                    <div className="text-center">
                      <BarChart3 className="size-12 text-blue-600 mx-auto mb-3" />
                      <p className="text-4xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                        18%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Below Market Rate
                      </p>
                    </div>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <div className="text-center">
                      <Award className="size-12 text-purple-600 mx-auto mb-3" />
                      <p className="text-4xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                        {formatPrice(500000)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Venue Savings
                      </p>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Venue Savings</span>
                      <span className="text-sm text-emerald-600">{formatPrice(500000)}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Planner Savings</span>
                      <span className="text-sm text-emerald-600">{formatPrice(150000)}</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Vendor Savings</span>
                      <span className="text-sm text-emerald-600">{formatPrice(200000)}</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                  <p className="text-center text-sm">
                    <strong>Why this works:</strong> Mid-tier clients are budget-conscious. 
                    Savings validate their Wedzway decision. They share dashboard with family 
                    ("See? We saved ₹8.5L!")
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Luxury Dashboard */}
            <TabsContent value="luxury">
              <Card className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl mb-2">
                    Investment Optimization Report
                  </h3>
                  <p className="text-muted-foreground">
                    Sophisticated, analytical, understated
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 border-2">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="size-8 text-[#DF6951]" />
                      <div>
                        <p className="text-sm text-muted-foreground">Market Position</p>
                        <p className="text-2xl" style={{ fontFamily: "Volkhov, serif" }}>
                          Lower Quartile
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your venue was priced 12% below market benchmark
                    </p>
                  </Card>

                  <Card className="p-6 border-2">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="size-8 text-[#DF6951]" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Investment</p>
                        <p className="text-2xl" style={{ fontFamily: "Volkhov, serif" }}>
                          {formatPrice(18000000)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Secured at optimal market rates
                    </p>
                  </Card>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Venue Cost Per Guest</span>
                      <span className="text-[#DF6951]">{formatPrice(25000)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      vs. {formatPrice(32000)} market average (22% optimization)
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Photography Cost Per Hour</span>
                      <span className="text-[#DF6951]">{formatPrice(35000)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      vs. {formatPrice(45000)} market average (22% optimization)
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Venue Rating</span>
                      <span className="text-[#DF6951]">4.8/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Top 10% in Rajasthan
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="text-center text-sm">
                    <strong>Why this works:</strong> Luxury clients don't want to look "cheap". 
                    But they DO want to know they didn't overpay. "Optimization" and "benchmarking" 
                    = smart stewardship, not penny-pinching
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Ultra-Luxury Dashboard */}
            <TabsContent value="ultra">
              <Card className="p-8 bg-gradient-to-br from-white to-amber-50/20">
                <div className="text-center mb-8">
                  <h3 className="text-3xl mb-2">
                    Exclusive Access Report
                  </h3>
                  <p className="text-muted-foreground">
                    Exclusive, access-focused, prestige-driven
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-[#F1A501]/30">
                    <Crown className="size-10 text-[#F1A501] mb-4" />
                    <h4 className="mb-2">Secured Exclusive Access</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <BadgeCheck className="size-4 text-[#F1A501]" />
                        <span>Sold-out venue date (Dec 18, 2025)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BadgeCheck className="size-4 text-[#F1A501]" />
                        <span>India's #1-rated wedding planner</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BadgeCheck className="size-4 text-[#F1A501]" />
                        <span>3 vendors with 18+ month waitlists</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
                    <Award className="size-10 text-purple-600 mb-4" />
                    <h4 className="mb-2">Scarcity Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Window</p>
                        <p className="font-medium">14 months advance</p>
                        <p className="text-xs text-muted-foreground">
                          vs. 8 months average
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Planner Availability</p>
                        <p className="font-medium">1 of 12 slots/year</p>
                        <p className="text-xs text-muted-foreground">
                          Only 12 weddings/year
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 mb-8 bg-white border-2">
                  <h4 className="mb-4">Network Value Through Wedzway</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="size-5 text-[#F1A501] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        3 vendors with 18+ month waitlists
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="size-5 text-[#F1A501] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        2 sold-out venue dates
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="size-5 text-[#F1A501] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Priority access to Michelin-starred catering team
                      </span>
                    </div>
                  </div>
                </Card>

                <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-[#F1A501]/30">
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Investment</p>
                      <p className="text-2xl" style={{ fontFamily: "Volkhov, serif" }}>
                        {formatPrice(42000000)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Market Position</p>
                      <p className="text-lg font-medium">Premium Tier</p>
                      <p className="text-xs text-muted-foreground">Top 2% of Indian weddings</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Value Equivalency</p>
                      <p className="text-sm font-medium">Celebrity-level</p>
                      <p className="text-xs text-muted-foreground">Comparable to celebrity weddings</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <p className="text-center text-sm">
                    <strong>Why this works:</strong> Ultra-HNW clients care about exclusivity &gt; savings. 
                    They want to know they got access others couldn't. Price is secondary to &quot;did I get the best?&quot;
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-gradient-to-br from-rose-50/50 to-amber-50/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl mb-4"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Comprehensive Concierge Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for a flawless destination wedding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreServices.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all hover:border-[#DF6951]/30"
              >
                <service.icon className="size-10 text-[#DF6951] mb-4" />
                <h3 className="mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: "Volkhov, serif" }}
          >
            Ready to Start Planning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Connect with our concierge team and discover how we can bring your
            destination wedding dreams to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#DF6951] hover:bg-gray-50"
            >
              <Phone className="mr-2 size-5" />
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Calendar className="mr-2 size-5" />
              Compare All Tiers
            </Button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Clock className="size-12 mx-auto mb-3 opacity-90" />
              <p className="text-lg mb-1">24/7 Support</p>
              <p className="text-sm opacity-75">For Elite members</p>
            </div>
            <div className="text-center">
              <BadgeCheck className="size-12 mx-auto mb-3 opacity-90" />
              <p className="text-lg mb-1">Verified Partners</p>
              <p className="text-sm opacity-75">All vendors pre-screened</p>
            </div>
            <div className="text-center">
              <Gift className="size-12 mx-auto mb-3 opacity-90" />
              <p className="text-lg mb-1">Exclusive Perks</p>
              <p className="text-sm opacity-75">At premium venues</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

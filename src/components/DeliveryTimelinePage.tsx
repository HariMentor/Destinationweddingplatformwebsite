"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Code,
  Database,
  Layers,
  PlayCircle,
  Rocket,
  TestTube,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Package,
  Users,
  MapPin,
  Plane,
  FileText,
  Heart,
  Building2,
  Crown,
  Mail,
  Gift,
  DollarSign,
  Search,
  BarChart3,
  Shield,
  Tag,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface Phase {
  name: string;
  duration: number; // in days
  icon: any;
  color: string;
}

interface Feature {
  id: string;
  name: string;
  category: string;
  icon: any;
  description: string;
  priority: "High" | "Medium" | "Low";
  complexity: "High" | "Medium" | "Low";
  phases: {
    backend: number; // days
    frontend: number; // days
    testing: number; // days
    deployment: number; // days
    uat: number; // days
  };
  dependencies?: string[];
}

const phaseConfig: Phase[] = [
  { name: "Backend Development", duration: 0, icon: Database, color: "#8B5CF6" },
  { name: "Frontend Integration", duration: 0, icon: Code, color: "#3B82F6" },
  { name: "Testing & QA", duration: 0, icon: TestTube, color: "#F59E0B" },
  { name: "Deployment", duration: 0, icon: Rocket, color: "#10B981" },
  { name: "UAT", duration: 0, icon: Users, color: "#EC4899" },
  { name: "Go Live", duration: 1, icon: PlayCircle, color: "#02542D" },
];

const features: Feature[] = [
  // Phase 1: Core Infrastructure & Authentication
  {
    id: "auth",
    name: "Authentication & Access Control",
    category: "Infrastructure",
    icon: Shield,
    description: "Password protection, user authentication, session management",
    priority: "High",
    complexity: "Medium",
    phases: { backend: 5, frontend: 3, testing: 2, deployment: 1, uat: 2 },
  },
  {
    id: "database",
    name: "Database Architecture & APIs",
    category: "Infrastructure",
    icon: Database,
    description: "Database schema, REST APIs, data models, migrations",
    priority: "High",
    complexity: "High",
    phases: { backend: 7, frontend: 0, testing: 3, deployment: 2, uat: 2 },
  },
  {
    id: "payment-gateway",
    name: "Payment Gateway Integration",
    category: "Infrastructure",
    icon: DollarSign,
    description: "Payment processing, currency conversion, transaction management",
    priority: "High",
    complexity: "High",
    phases: { backend: 8, frontend: 4, testing: 4, deployment: 2, uat: 3 },
    dependencies: ["auth", "database"],
  },

  // Phase 2: Core Wedding Planning Features
  {
    id: "wedding-builder",
    name: "Wedding Plan Builder",
    category: "Core Features",
    icon: Sparkles,
    description: "Interactive wedding planning tool with checklist and timeline",
    priority: "High",
    complexity: "High",
    phases: { backend: 6, frontend: 8, testing: 4, deployment: 1, uat: 3 },
    dependencies: ["auth", "database"],
  },
  {
    id: "guest-management",
    name: "Guest Management System",
    category: "Core Features",
    icon: Users,
    description: "Guest list, RSVP tracking, seating arrangements",
    priority: "High",
    complexity: "Medium",
    phases: { backend: 5, frontend: 6, testing: 3, deployment: 1, uat: 2 },
    dependencies: ["wedding-builder"],
  },
  {
    id: "invitations",
    name: "Digital Invitations Creator",
    category: "Core Features",
    icon: Mail,
    description: "Customizable wedding invitations with email distribution",
    priority: "High",
    complexity: "Medium",
    phases: { backend: 4, frontend: 7, testing: 3, deployment: 1, uat: 2 },
    dependencies: ["guest-management"],
  },
  {
    id: "wedding-website",
    name: "Public Wedding Page",
    category: "Core Features",
    icon: FileText,
    description: "Shareable wedding website with custom domain support",
    priority: "High",
    complexity: "Medium",
    phases: { backend: 4, frontend: 6, testing: 2, deployment: 2, uat: 2 },
    dependencies: ["wedding-builder"],
  },
  {
    id: "gift-registry",
    name: "Gift Registry System",
    category: "Core Features",
    icon: Gift,
    description: "Gift registry creation, management, and public viewing",
    priority: "High",
    complexity: "Medium",
    phases: { backend: 5, frontend: 6, testing: 3, deployment: 1, uat: 2 },
    dependencies: ["wedding-website"],
  },
  {
    id: "expense-tracker",
    name: "Wedding Expense Tracker",
    category: "Core Features",
    icon: BarChart3,
    description: "Budget planning, expense tracking, financial analytics",
    priority: "High",
    complexity: "Medium",
    phases: { backend: 5, frontend: 5, testing: 2, deployment: 1, uat: 2 },
    dependencies: ["wedding-builder"],
  },

  // Phase 3: Marketplace & Booking
  {
    id: "venue-discovery",
    name: "Venue Discovery & Search",
    category: "Marketplace",
    icon: Building2,
    description: "Venue listings, search filters, detailed profiles",
    priority: "High",
    complexity: "High",
    phases: { backend: 7, frontend: 8, testing: 4, deployment: 1, uat: 3 },
    dependencies: ["database", "search-engine"],
  },
  {
    id: "venue-booking",
    name: "Venue Booking System",
    category: "Marketplace",
    icon: CheckCircle2,
    description: "Booking flow, availability calendar, confirmations",
    priority: "High",
    complexity: "High",
    phases: { backend: 6, frontend: 6, testing: 4, deployment: 1, uat: 3 },
    dependencies: ["venue-discovery", "payment-gateway"],
  },
  {
    id: "vendor-marketplace",
    name: "Vendor Marketplace",
    category: "Marketplace",
    icon: Users,
    description: "Photographers, videographers, makeup artists, decorators",
    priority: "High",
    complexity: "High",
    phases: { backend: 8, frontend: 9, testing: 4, deployment: 1, uat: 3 },
    dependencies: ["database", "search-engine"],
  },
  {
    id: "planner-directory",
    name: "Wedding Planners Directory",
    category: "Marketplace",
    icon: Crown,
    description: "Verified planner profiles, portfolios, booking",
    priority: "High",
    complexity: "Medium",
    phases: { backend: 5, frontend: 6, testing: 3, deployment: 1, uat: 2 },
    dependencies: ["vendor-marketplace"],
  },
  {
    id: "package-comparison",
    name: "Package Comparison Tool",
    category: "Marketplace",
    icon: Layers,
    description: "Side-by-side package comparison with highlighting",
    priority: "Medium",
    complexity: "Low",
    phases: { backend: 2, frontend: 5, testing: 2, deployment: 1, uat: 1 },
    dependencies: ["venue-discovery"],
  },

  // Phase 4: Destinations & Travel
  {
    id: "destinations",
    name: "Destination Directory",
    category: "Travel",
    icon: MapPin,
    description: "Global wedding destinations, location details, imagery",
    priority: "High",
    complexity: "Medium",
    phases: { backend: 5, frontend: 7, testing: 3, deployment: 1, uat: 2 },
    dependencies: ["database"],
  },
  {
    id: "tours-activities",
    name: "Tours & Activities Booking",
    category: "Travel",
    icon: MapPin,
    description: "Pre-wedding and post-wedding tours, activities booking",
    priority: "Medium",
    complexity: "Medium",
    phases: { backend: 5, frontend: 6, testing: 3, deployment: 1, uat: 2 },
    dependencies: ["destinations", "payment-gateway"],
  },
  {
    id: "flight-booking",
    name: "Flight Booking Integration",
    category: "Travel",
    icon: Plane,
    description: "Third-party flight API integration, booking management",
    priority: "Medium",
    complexity: "High",
    phases: { backend: 8, frontend: 7, testing: 4, deployment: 2, uat: 3 },
    dependencies: ["payment-gateway"],
  },
  {
    id: "visa-services",
    name: "Visa Application Services",
    category: "Travel",
    icon: FileText,
    description: "Visa requirements, application tracking, document upload",
    priority: "Medium",
    complexity: "Medium",
    phases: { backend: 6, frontend: 6, testing: 3, deployment: 1, uat: 3 },
    dependencies: ["auth"],
  },

  // Phase 5: Support & Content
  {
    id: "concierge",
    name: "Concierge Service",
    category: "Support",
    icon: Crown,
    description: "VIP concierge service, personalized assistance",
    priority: "Medium",
    complexity: "Medium",
    phases: { backend: 4, frontend: 5, testing: 2, deployment: 1, uat: 2 },
    dependencies: ["auth"],
  },
  {
    id: "inspirations",
    name: "Inspirations & Blog",
    category: "Content",
    icon: Heart,
    description: "Wedding ideas, blog posts, image galleries",
    priority: "Medium",
    complexity: "Low",
    phases: { backend: 3, frontend: 5, testing: 2, deployment: 1, uat: 1 },
    dependencies: ["database"],
  },
  {
    id: "search-engine",
    name: "Advanced Search & Filters",
    category: "Infrastructure",
    icon: Search,
    description: "Elasticsearch integration, advanced filtering, sorting",
    priority: "High",
    complexity: "High",
    phases: { backend: 7, frontend: 5, testing: 3, deployment: 2, uat: 2 },
    dependencies: ["database"],
  },

  // Phase 6: Advanced Features
  {
    id: "provider-portal",
    name: "Provider Management Portal",
    category: "Advanced",
    icon: Building2,
    description: "Vendor dashboard, analytics, booking management",
    priority: "Medium",
    complexity: "High",
    phases: { backend: 8, frontend: 9, testing: 4, deployment: 2, uat: 3 },
    dependencies: ["vendor-marketplace"],
  },
  {
    id: "email-templates",
    name: "Email Template System",
    category: "Advanced",
    icon: Mail,
    description: "Automated emails, transactional notifications",
    priority: "Low",
    complexity: "Low",
    phases: { backend: 3, frontend: 4, testing: 2, deployment: 1, uat: 1 },
    dependencies: ["auth"],
  },
  {
    id: "analytics",
    name: "Analytics & Reporting",
    category: "Advanced",
    icon: TrendingUp,
    description: "User analytics, booking reports, revenue tracking",
    priority: "Low",
    complexity: "Medium",
    phases: { backend: 5, frontend: 6, testing: 2, deployment: 1, uat: 2 },
    dependencies: ["database"],
  },
];

const categories = [
  { name: "All Features", value: "all", color: "#DF6951" },
  { name: "Infrastructure", value: "Infrastructure", color: "#8B5CF6" },
  { name: "Core Features", value: "Core Features", color: "#02542D" },
  { name: "Marketplace", value: "Marketplace", color: "#3B82F6" },
  { name: "Travel", value: "Travel", color: "#F59E0B" },
  { name: "Support", value: "Support", color: "#EC4899" },
  { name: "Content", value: "Content", color: "#10B981" },
  { name: "Advanced", value: "Advanced", color: "#6366F1" },
];

export function DeliveryTimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const filteredFeatures = features.filter(
    (f) => selectedCategory === "all" || f.category === selectedCategory
  );

  const calculateDates = (feature: Feature) => {
    const startDate = new Date("2026-01-27");
    let currentDate = new Date(startDate);

    const phases = [
      { name: "Backend Development", days: feature.phases.backend },
      { name: "Frontend Integration", days: feature.phases.frontend },
      { name: "Testing & QA", days: feature.phases.testing },
      { name: "Deployment", days: feature.phases.deployment },
      { name: "UAT", days: feature.phases.uat },
      { name: "Go Live", days: 1 },
    ];

    return phases.map((phase) => {
      const phaseStartDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + phase.days);
      const phaseEndDate = new Date(currentDate);

      return {
        name: phase.name,
        days: phase.days,
        startDate: phaseStartDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        endDate: phaseEndDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };
    });
  };

  const getTotalDuration = (feature: Feature) => {
    return Object.values(feature.phases).reduce((sum, days) => sum + days, 0) + 1; // +1 for Go Live
  };

  const getProjectStats = () => {
    const totalFeatures = features.length;
    const totalDays = Math.max(
      ...features.map((f) => getTotalDuration(f))
    );
    const totalBackendDays = features.reduce((sum, f) => sum + f.phases.backend, 0);
    const totalFrontendDays = features.reduce((sum, f) => sum + f.phases.frontend, 0);
    const highPriorityCount = features.filter((f) => f.priority === "High").length;

    return { totalFeatures, totalDays, totalBackendDays, totalFrontendDays, highPriorityCount };
  };

  const stats = getProjectStats();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Low":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "High":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "Medium":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Low":
        return "bg-teal-100 text-teal-700 border-teal-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-xl">
              <Rocket className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl mb-1">
                Wedzway Development Timeline
              </h1>
              <p className="text-muted-foreground">
                Comprehensive delivery roadmap starting January 27, 2026
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 text-center bg-white/50 backdrop-blur-sm">
              <Package className="size-8 mx-auto mb-2 text-[#DF6951]" />
              <p className="text-2xl mb-1">{stats.totalFeatures}</p>
              <p className="text-sm text-muted-foreground">Total Features</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 text-center bg-white/50 backdrop-blur-sm">
              <Calendar className="size-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl mb-1">{stats.totalDays}</p>
              <p className="text-sm text-muted-foreground">Max Timeline (Days)</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 text-center bg-white/50 backdrop-blur-sm">
              <Database className="size-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl mb-1">{stats.totalBackendDays}</p>
              <p className="text-sm text-muted-foreground">Backend Days</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 text-center bg-white/50 backdrop-blur-sm">
              <Code className="size-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl mb-1">{stats.totalFrontendDays}</p>
              <p className="text-sm text-muted-foreground">Frontend Days</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-4 text-center bg-white/50 backdrop-blur-sm">
              <TrendingUp className="size-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl mb-1">{stats.highPriorityCount}</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </Card>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                className={
                  selectedCategory === category.value
                    ? "bg-[#DF6951] hover:bg-[#c5573d]"
                    : ""
                }
              >
                {category.name}
                {category.value !== "all" && (
                  <Badge className="ml-2" variant="secondary">
                    {features.filter((f) => f.category === category.value).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Phase Legend */}
        <Card className="p-6 mb-8 bg-white/50 backdrop-blur-sm">
          <h3 className="text-lg mb-4">Development Phases</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {phaseConfig.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: phase.color + "20" }}
                  >
                    <Icon className="size-5" style={{ color: phase.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium">{phase.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Features Timeline */}
        <div className="space-y-4">
          <h3 className="text-xl mb-4">
            Features Delivery Timeline ({filteredFeatures.length} features)
          </h3>

          {filteredFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const totalDuration = getTotalDuration(feature);
            const phaseDates = calculateDates(feature);
            const isExpanded = expandedFeature === feature.id;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm">
                  <div className="p-6">
                    {/* Feature Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-gradient-to-br from-[#DF6951]/20 to-[#F1A501]/20 rounded-lg">
                          <Icon className="size-6 text-[#DF6951]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg">{feature.name}</h4>
                            <Badge className={getPriorityColor(feature.priority)}>
                              {feature.priority}
                            </Badge>
                            <Badge className={getComplexityColor(feature.complexity)}>
                              {feature.complexity} Complexity
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {feature.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="size-4 text-[#02542D]" />
                              <span className="font-medium">{totalDuration} days</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Tag className="size-4 text-gray-500" />
                              <span className="text-muted-foreground">{feature.category}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setExpandedFeature(isExpanded ? null : feature.id)
                        }
                      >
                        {isExpanded ? (
                          <ChevronUp className="size-5" />
                        ) : (
                          <ChevronDown className="size-5" />
                        )}
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          Phase Breakdown
                        </span>
                        <span className="text-xs font-medium">
                          {totalDuration} total days
                        </span>
                      </div>
                      <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-100">
                        <div
                          className="bg-purple-500"
                          style={{
                            width: `${(feature.phases.backend / totalDuration) * 100}%`,
                          }}
                          title="Backend"
                        />
                        <div
                          className="bg-blue-500"
                          style={{
                            width: `${(feature.phases.frontend / totalDuration) * 100}%`,
                          }}
                          title="Frontend"
                        />
                        <div
                          className="bg-yellow-500"
                          style={{
                            width: `${(feature.phases.testing / totalDuration) * 100}%`,
                          }}
                          title="Testing"
                        />
                        <div
                          className="bg-green-500"
                          style={{
                            width: `${(feature.phases.deployment / totalDuration) * 100}%`,
                          }}
                          title="Deployment"
                        />
                        <div
                          className="bg-pink-500"
                          style={{
                            width: `${(feature.phases.uat / totalDuration) * 100}%`,
                          }}
                          title="UAT"
                        />
                        <div
                          className="bg-[#02542D]"
                          style={{
                            width: `${(1 / totalDuration) * 100}%`,
                          }}
                          title="Go Live"
                        />
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t pt-4 mt-4"
                      >
                        <div className="grid gap-3">
                          {phaseDates.map((phase, idx) => {
                            const phaseIcon = phaseConfig[idx].icon;
                            const PhaseIcon = phaseIcon;
                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className="p-2 rounded-lg"
                                    style={{
                                      backgroundColor: phaseConfig[idx].color + "20",
                                    }}
                                  >
                                    <PhaseIcon
                                      className="size-5"
                                      style={{ color: phaseConfig[idx].color }}
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{phase.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {phase.startDate} - {phase.endDate}
                                    </p>
                                  </div>
                                </div>
                                <Badge variant="outline">
                                  {phase.days} {phase.days === 1 ? "day" : "days"}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>

                        {feature.dependencies && feature.dependencies.length > 0 && (
                          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-sm font-medium text-amber-900 mb-2">
                              Dependencies:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {feature.dependencies.map((depId) => {
                                const dep = features.find((f) => f.id === depId);
                                return dep ? (
                                  <Badge
                                    key={depId}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {dep.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Summary */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-[#02542D]/10 to-[#DF6951]/10 border-2 border-[#DF6951]/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl">
              <Sparkles className="size-8 text-[#DF6951]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-2">Project Timeline Summary</h3>
              <p className="text-muted-foreground mb-4">
                The Wedzway platform will be developed in phases with parallel workstreams
                to optimize delivery time. Critical infrastructure and core features will be
                prioritized first, followed by marketplace and travel services, with
                advanced features in the final phase.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Start</p>
                  <p className="text-lg font-medium">January 27, 2026</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Parallel Development</p>
                  <p className="text-lg font-medium">Multiple Teams</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Delivery Approach</p>
                  <p className="text-lg font-medium">Agile Sprints</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

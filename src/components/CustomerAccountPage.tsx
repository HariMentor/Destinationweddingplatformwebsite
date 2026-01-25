"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Building2,
  Users,
  Package,
  Plane,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Download,
  Edit,
  Settings,
  LogOut,
  Sparkles,
  Star,
  Tag,
  ExternalLink,
  Filter,
  X,
  ListChecks,
  Palette,
  DollarSign,
  TrendingUp,
  Briefcase,
  PartyPopper,
  Wand2,
  Copy,
  Send,
  Eye,
  UserCheck,
  UserX,
  HelpCircle,
  Plus,
  Share2,
  Gift,
  ShoppingCart,
  MessageCircle,
  CreditCard,
  Receipt,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Search,
  Menu,
  Crown,
  TrendingDown,
  Award,
  Zap,
  Target,
  BarChart3,
  Rocket,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { mockCustomerData } from "./customerAccountData";
import { WeddingBuilderPage } from "./WeddingBuilderPage";
import { WeddingInvitationCreator } from "./WeddingInvitationCreator";
import { PublicWeddingPage } from "./PublicWeddingPage";
import { WeddingPageEditor } from "./WeddingPageEditor";
import { GiftRegistryCreator } from "./GiftRegistryCreator";
import { GiftRegistryEditor } from "./GiftRegistryEditor";
import { PublicGiftRegistryPage } from "./PublicGiftRegistryPage";
import { PaymentsTabContent } from "./PaymentsTabContent";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { DeliveryTimelinePage } from "./DeliveryTimelinePage";
import { PlannerDashboardContent } from "./PlannerDashboardContent";
import { toast } from "sonner";
import { useCurrency } from "./CurrencyContext";

export function CustomerAccountPage({ onBack, onNavigate }: { onBack?: () => void; onNavigate?: (page: string) => void }) {
  const data = mockCustomerData;
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState("overview");
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [showPrintableView, setShowPrintableView] = useState(false);
  const [showInvitationCreator, setShowInvitationCreator] = useState(false);
  const [showPublicPage, setShowPublicPage] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareFormData, setShareFormData] = useState({ guestName: "", guestEmail: "", guestPhone: "" });
  const [guestFilter, setGuestFilter] = useState<string>("all");
  const [showPageEditor, setShowPageEditor] = useState(false);
  const [weddingPageData, setWeddingPageData] = useState<any>(null);
  const [showRegistryCreator, setShowRegistryCreator] = useState(false);
  const [showRegistryEditor, setShowRegistryEditor] = useState(false);
  const [showPublicRegistry, setShowPublicRegistry] = useState(false);
  const [giftRegistryData, setGiftRegistryData] = useState<any>(data.giftRegistry);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Profile type switcher
  const [profileType, setProfileType] = useState<"customer" | "planner">("customer");
  
  // Check if user is a wedding planner (in real app, this would come from auth/user context)
  const isWeddingPlanner = true; // Mock - replace with actual auth check
  
  // Filter states
  const [inspirationFilter, setInspirationFilter] = useState<string>("all");
  const [venueStatusFilter, setVenueStatusFilter] = useState<string>("all");
  const [vendorTypeFilter, setVendorTypeFilter] = useState<string>("all");
  const [tourStatusFilter, setTourStatusFilter] = useState<string>("all");
  const [flightStatusFilter, setFlightStatusFilter] = useState<string>("all");
  const [visaStatusFilter, setVisaStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all");
  const [paymentSearchTerm, setPaymentSearchTerm] = useState<string>("");
  
  // If builder is open, show it fullscreen
  if (showBuilder) {
    return <WeddingBuilderPage onExit={() => setShowBuilder(false)} />;
  }

  // If page editor is open, show it fullscreen
  if (showPageEditor) {
    return (
      <WeddingPageEditor
        initialData={weddingPageData}
        onSave={(updatedData) => {
          // Convert icon strings to components
          const convertedData = {
            ...updatedData,
            colorPalette: {
              primary: updatedData.primaryColor,
              secondary: updatedData.secondaryColor,
              accent: updatedData.accentColor,
            },
            schedule: updatedData.schedule.map((item: any) => ({
              ...item,
              icon: item.icon === "Heart" ? Heart :
                    item.icon === "MessageCircle" ? MessageCircle :
                    item.icon === "Clock" ? Clock : Users,
            })),
            accommodation: {
              name: updatedData.accommodationName,
              description: updatedData.accommodationDescription,
              bookingInfo: updatedData.accommodationBookingInfo,
            },
            travel: {
              airport: updatedData.travelAirport,
              distance: updatedData.travelDistance,
              transportation: updatedData.travelTransportation,
            },
          };
          setWeddingPageData(convertedData);
          setShowPageEditor(false);
        }}
        onCancel={() => setShowPageEditor(false)}
      />
    );
  }

  // If registry editor is open, show it fullscreen
  if (showRegistryEditor) {
    return (
      <GiftRegistryEditor
        registryData={giftRegistryData}
        onSave={(updatedData) => {
          setGiftRegistryData(updatedData);
          setShowRegistryEditor(false);
          toast.success("Registry updated successfully!");
        }}
        onCancel={() => setShowRegistryEditor(false)}
      />
    );
  }

  // If public registry is open, show it fullscreen
  if (showPublicRegistry) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
          <h3 className="font-semibold">Gift Registry Preview</h3>
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                setShowPublicRegistry(false);
                setShowRegistryEditor(true);
              }} 
              size="sm" 
              className="bg-[#DF6951] hover:bg-[#c5573d] gap-2"
            >
              <Edit className="size-4" />
              Edit Registry
            </Button>
            <Button onClick={() => setShowPublicRegistry(false)} variant="outline" size="sm" className="gap-2">
              <X className="size-4" />
              Close Preview
            </Button>
          </div>
        </div>
        <PublicGiftRegistryPage
          registryId="sarah-michael-registry-2025"
          onBack={() => setShowPublicRegistry(false)}
          customData={giftRegistryData}
        />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "approved":
        return <CheckCircle2 className="size-4 text-green-600" />;
      case "pending":
      case "in-review":
        return <Clock className="size-4 text-yellow-600" />;
      case "cancelled":
      case "rejected":
        return <XCircle className="size-4 text-red-600" />;
      default:
        return <AlertCircle className="size-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      confirmed: "bg-green-100 text-green-700",
      approved: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      "in-review": "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700",
      rejected: "bg-red-100 text-red-700",
    };

    return (
      <Badge className={variants[status] || "bg-gray-100 text-gray-700"}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status.replace("-", " ")}</span>
      </Badge>
    );
  };

  // Filter functions
  const filteredInspirations = inspirationFilter === "all"
    ? data.savedInspirations
    : data.savedInspirations.filter(i => i.category === inspirationFilter);

  const filteredVenueBookings = venueStatusFilter === "all"
    ? data.venueBookings
    : data.venueBookings.filter(v => v.status === venueStatusFilter);

  const filteredVendorBookings = vendorTypeFilter === "all"
    ? data.vendorBookings
    : data.vendorBookings.filter(v => v.vendorType === vendorTypeFilter);

  const filteredTourBookings = tourStatusFilter === "all"
    ? data.tourBookings
    : data.tourBookings.filter(t => t.status === tourStatusFilter);

  const filteredFlightBookings = flightStatusFilter === "all"
    ? data.flightBookings
    : data.flightBookings.filter(f => f.status === flightStatusFilter);

  const filteredVisaApplications = visaStatusFilter === "all"
    ? data.visaApplications
    : data.visaApplications.filter(v => v.status === visaStatusFilter);

  const filteredPayments = data.payments?.filter(p => {
    const statusMatch = paymentStatusFilter === "all" || p.paymentStatus === paymentStatusFilter;
    const methodMatch = paymentMethodFilter === "all" || p.paymentMethod === paymentMethodFilter;
    const searchMatch = paymentSearchTerm === "" || 
      p.itemName.toLowerCase().includes(paymentSearchTerm.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(paymentSearchTerm.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(paymentSearchTerm.toLowerCase());
    return statusMatch && methodMatch && searchMatch;
  }) || [];

  // Get unique categories and types
  const inspirationCategories = Array.from(new Set(data.savedInspirations.map(i => i.category)));
  const vendorTypes = Array.from(new Set(data.vendorBookings.map(v => v.vendorType)));
  const paymentMethods = Array.from(new Set(data.payments?.map(p => p.paymentMethod) || []));

  // Calculate stats
  const totalBookings =
    data.venueBookings.length +
    data.vendorBookings.length +
    data.plannerBookings.length +
    data.tourBookings.length +
    data.flightBookings.length;

  const confirmedBookings = [
    ...data.venueBookings,
    ...data.vendorBookings,
    ...data.plannerBookings,
    ...data.tourBookings,
    ...data.flightBookings,
  ].filter((b) => b.status === "confirmed").length;

  const upcomingDays = data.profile.weddingDate
    ? Math.ceil(
        (new Date(data.profile.weddingDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  // Navigation items - Customer Profile
  const customerNavItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "concierge", label: "Concierge Service", icon: Crown },
    { id: "plan", label: "Wedding Plan", icon: ListChecks },
    { id: "invitations", label: "Invitations", icon: Mail },
    { id: "registry", label: "Gift Registry", icon: Gift },
    { id: "venues", label: "Venues", icon: Building2 },
    { id: "vendors", label: "Vendors", icon: Briefcase },
    { id: "planners", label: "Planners", icon: Users },
    { id: "tours", label: "Tours", icon: MapPin },
    { id: "flights", label: "Flights", icon: Plane },
    { id: "visa", label: "Visa", icon: FileText },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "timeline", label: "Delivery Timeline", icon: Rocket },
  ];

  // Navigation items - Planner Profile
  const plannerNavItems = [
    { id: "overview", label: "Business Overview", icon: Briefcase },
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "bookings", label: "Client Bookings", icon: Calendar },
    { id: "clients", label: "My Clients", icon: Users },
    { id: "portfolio", label: "Portfolio", icon: Star },
    { id: "packages", label: "Service Packages", icon: Package },
    { id: "quotes", label: "Quotes", icon: FileText },
    { id: "reviews", label: "Reviews & Ratings", icon: Award },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "calendar", label: "My Calendar", icon: Calendar },
    { id: "resources", label: "Resources", icon: FileText },
  ];

  const navItems = profileType === "customer" ? customerNavItems : plannerNavItems;

  // Navigation Content Component
  const NavigationContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <nav className="p-4 space-y-1 pt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onItemClick?.();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? "bg-[#DF6951] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon className="size-5 shrink-0" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t mt-auto">
        <button
          onClick={() => {
            onBack();
            onItemClick?.();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-all"
        >
          <LogOut className="size-5 shrink-0" />
          <span className="text-sm">Logout</span>
        </button>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-all mt-1"
          onClick={onItemClick}
        >
          <Settings className="size-5 shrink-0" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-purple-50/30 flex pt-[72px]">
      {/* Desktop Left Sidebar Navigation */}
      <div className="hidden lg:block w-64 border-r bg-white/50 backdrop-blur-sm fixed top-[72px] left-0 h-[calc(100vh-72px)] overflow-y-auto">
        <NavigationContent />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-[72px] left-0 right-0 z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Menu className="size-4" />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>My Account</SheetTitle>
                  <SheetDescription>Navigate through your account sections</SheetDescription>
                </SheetHeader>
                <div className="h-[calc(100vh-80px)] overflow-y-auto">
                  <NavigationContent onItemClick={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <h2 className="font-semibold text-sm">
                {navItems.find(item => item.id === activeTab)?.label || "Overview"}
              </h2>
            </div>
          </div>
          <Avatar className="size-8">
            <img
              src={data.profile.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=customer"}
              alt={data.profile.name}
              className="object-cover"
            />
            <AvatarFallback>
              {data.profile.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 pt-0 lg:pt-0">
        <div className="lg:hidden h-16" /> {/* Spacer for mobile header */}
        <div className="container mx-auto px-3 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8">
          {/* Profile Type Switcher - Only shown if user is a wedding planner */}
          {isWeddingPlanner && (
            <Card className="p-4 mb-6 bg-gradient-to-r from-[#02542D]/5 to-[#DF6951]/5 border-[#02542D]/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#02542D] to-[#DF6951] flex items-center justify-center">
                    <Briefcase className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Profile View Mode</h3>
                    <p className="text-sm text-muted-foreground">Switch between customer and business dashboard</p>
                  </div>
                </div>
                <div className="inline-flex rounded-lg border-2 border-gray-200 bg-white p-1.5 shadow-sm">
                  <button
                    onClick={() => {
                      setProfileType("customer");
                      setActiveTab("overview");
                      toast.success("Switched to Customer View");
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                      profileType === "customer"
                        ? "bg-[#DF6951] text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Heart className="size-4" />
                    Customer View
                  </button>
                  <button
                    onClick={() => {
                      setProfileType("planner");
                      setActiveTab("overview");
                      toast.success("Switched to Business View");
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                      profileType === "planner"
                        ? "bg-[#02542D] text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Briefcase className="size-4" />
                    Business View
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Profile Card - Only shown in Overview */}
          {activeTab === "overview" && (
            <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-gradient-to-r from-[#DF6951]/10 to-[#F1A501]/10 border-2 border-[#DF6951]/20">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                <div className="shrink-0 mx-auto md:mx-0">
                  <Avatar className="size-20 sm:size-24 border-4 border-white shadow-lg">
                    <img
                      src={data.profile.avatar}
                      alt={data.profile.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{data.profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
                    <div className="text-center sm:text-left w-full sm:w-auto">
                      <h2 className="text-xl sm:text-2xl mb-1" style={{ fontFamily: "Volkhov, serif" }}>
                        {data.profile.name}
                      </h2>
                      <Badge className="bg-[#DF6951] mb-2">
                        <Sparkles className="size-3 mr-1" />
                        {isWeddingPlanner ? "Wedding Planner" : "Premium Member"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-initial">
                        <Edit className="size-4" />
                        <span className="sm:inline">Edit Profile</span>
                      </Button>
                      {isWeddingPlanner && (
                        <Button 
                          size="sm" 
                          className="gap-2 flex-1 sm:flex-initial bg-[#02542D] hover:bg-[#023a20]"
                          onClick={() => {
                            if (onNavigate) {
                              onNavigate('planner-edit');
                            }
                          }}
                        >
                          <Briefcase className="size-4" />
                          <span className="sm:inline">Manage Business</span>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-4">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Mail className="size-4 text-[#DF6951] shrink-0" />
                      <span className="truncate">{data.profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Phone className="size-4 text-[#DF6951] shrink-0" />
                      <span>{data.profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <MapPin className="size-4 text-[#DF6951] shrink-0" />
                      <span className="truncate">{data.profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Calendar className="size-4 text-[#DF6951] shrink-0" />
                      <span className="truncate">Member since {data.profile.memberSince}</span>
                    </div>
                  </div>

                  {data.profile.weddingDate && (
                    <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-[#DF6951]/30">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Heart className="size-4 sm:size-5 text-red-500 fill-red-500" />
                          <span className="font-semibold text-sm sm:text-base">Wedding Countdown</span>
                        </div>
                        <span className="text-xl sm:text-2xl text-[#DF6951]">
                          {upcomingDays} days
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 text-center sm:text-left">
                        Your special day: {data.profile.weddingDate}
                      </p>
                      <Progress value={(180 - upcomingDays) / 180 * 100} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Quick Stats - Only shown in Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => setActiveTab("plan")}
              >
                <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <Wand2 className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-purple-600" />
                  <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">
                    {data.weddingPlan ? `${data.weddingPlan.completionPercentage}%` : "0%"}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Wedding Plan</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <Package className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-[#DF6951]" />
                  <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{totalBookings}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Bookings</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CheckCircle2 className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-green-600" />
                  <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{confirmedBookings}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Confirmed</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <Heart className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-red-500" />
                  <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{data.savedInspirations.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Saved Ideas</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <FileText className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-blue-600" />
                  <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{data.visaApplications.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Visa Apps</p>
                </Card>
              </motion.div>
            </div>
          )}

          {/* Main Content */}
          <div className="mb-12">
          
          {/* Show Planner Dashboard when in planner profile mode */}
          {profileType === "planner" ? (
            <PlannerDashboardContent activeTab={activeTab} onNavigate={onNavigate} />
          ) : (
          <>
          {/* Customer View Content Below */}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Wedding Planner Business Dashboard */}
              {isWeddingPlanner && (
                <Card className="p-4 sm:p-6 bg-gradient-to-r from-[#02542D]/10 to-[#02542D]/5 border-2 border-[#02542D]/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="size-5 text-[#02542D]" />
                        <h3 className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                          Your Wedding Planning Business
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Manage your profile, showcase your work, and connect with couples
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-[#02542D]">4.9</div>
                      <div className="text-xs text-muted-foreground">Average Rating</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-[#02542D]">124</div>
                      <div className="text-xs text-muted-foreground">Total Reviews</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-[#02542D]">150</div>
                      <div className="text-xs text-muted-foreground">Weddings Planned</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      size="sm"
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate('planner-edit');
                        }
                      }}
                      className="gap-2 w-full sm:w-auto bg-[#02542D] hover:bg-[#023a20]"
                    >
                      <Edit className="size-4" />
                      <span>Manage Profile</span>
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate('planners');
                        }
                      }}
                      className="gap-2 w-full sm:w-auto"
                    >
                      <Eye className="size-4" />
                      <span>View Public Profile</span>
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="gap-2 w-full sm:w-auto"
                      onClick={() => toast.info('Analytics dashboard coming soon!')}
                    >
                      <BarChart3 className="size-4" />
                      <span>Analytics</span>
                    </Button>
                  </div>
                </Card>
              )}

              {/* Wedding Plan Quick Access */}
              {data.weddingPlan && (
                <Card className="p-4 sm:p-6 bg-gradient-to-r from-[#DF6951]/10 to-[#F1A501]/10 border-2 border-[#DF6951]/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <PartyPopper className="size-4 sm:size-5 text-[#DF6951]" />
                        <h3 className="text-lg sm:text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                          {data.weddingPlan.eventName}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 text-xs sm:text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 sm:size-4 text-[#DF6951]" />
                          <span className="truncate">{data.weddingPlan.weddingDate}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 sm:size-4 text-[#DF6951]" />
                          <span className="truncate">{data.weddingPlan.destination}</span>
                        </span>
                        <Badge className="bg-green-600 text-xs">
                          {data.weddingPlan.completionPercentage}% Complete
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          size="sm"
                          onClick={() => setActiveTab("plan")}
                          className="gap-2 w-full sm:w-auto"
                        >
                          <ListChecks className="size-4" />
                          <span>View Wedding Plan</span>
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => setShowBuilder(true)}
                          className="gap-2 w-full sm:w-auto"
                        >
                          <Wand2 className="size-4" />
                          <span>Edit in Builder</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              <div>
                <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {/* Venue Bookings */}
                  {data.venueBookings.slice(0, 2).map((booking) => (
                    <Card key={booking.id} className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
                      <div className="flex gap-3 sm:gap-4">
                        <img
                          src={booking.image}
                          alt={booking.venueName}
                          className="size-16 sm:size-20 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-2">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm sm:text-base truncate">{booking.venueName}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                {booking.location}
                              </p>
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3 sm:size-4 text-muted-foreground" />
                              <span className="truncate">{booking.eventDate}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="size-3 sm:size-4 text-muted-foreground" />
                              {booking.guests} guests
                            </span>
                            <span className="text-[#DF6951]">{booking.amount}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Vendor Bookings */}
                  {data.vendorBookings.slice(0, 2).map((booking) => (
                    <Card key={booking.id} className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
                      <div className="flex gap-3 sm:gap-4">
                        <img
                          src={booking.image}
                          alt={booking.vendorName}
                          className="size-16 sm:size-20 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-2">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm sm:text-base truncate">{booking.vendorName}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {booking.vendorType}
                              </p>
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3 sm:size-4 text-muted-foreground" />
                              <span className="truncate">{booking.serviceDate}</span>
                            </span>
                            <span className="text-[#DF6951]">{booking.amount}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Bookings
              </Button>
            </div>
          )}

          {/* Concierge Service Tab */}
          {activeTab === "concierge" && (() => {
            const conciergeService = data.conciergeService;
            
            if (!conciergeService) {
              return (
                <Card className="p-8 text-center">
                  <Crown className="size-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>No Concierge Service</h3>
                  <p className="text-muted-foreground mb-4">You haven't subscribed to a concierge service yet.</p>
                  <Button className="bg-[#DF6951] hover:bg-[#c5573d]">Explore Concierge Services</Button>
                </Card>
              );
            }

            const totalSavingsINR = conciergeService.totalSavings;
            const roi = ((totalSavingsINR / conciergeService.priceInr) * 100).toFixed(0);

            return (
              <div className="space-y-4 sm:space-y-6">
                {/* Minimalist Concierge Service Header */}
                <Card className="p-4 sm:p-6 border-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                    <div className="w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="size-5 sm:size-6 text-[#DF6951] shrink-0" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl" style={{ fontFamily: "Volkhov, serif" }}>
                          {conciergeService.tierName} Concierge
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <Badge className={`${
                          conciergeService.status === "active" ? "bg-green-500" : "bg-gray-500"
                        } text-white border-0 text-xs`}>
                          {conciergeService.status === "active" ? "Active" : "Expired"}
                        </Badge>
                        <span className="text-xs sm:text-sm text-muted-foreground">Since {conciergeService.purchaseDate}</span>
                        {conciergeService.expiryDate && (
                          <span className="text-xs sm:text-sm text-muted-foreground">• Expires {conciergeService.expiryDate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    <div className="border rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-muted-foreground mb-1">Total Savings</p>
                      <p className="text-base sm:text-lg md:text-xl text-green-600 break-words">{formatPrice(totalSavingsINR)}</p>
                    </div>
                    <div className="border rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-muted-foreground mb-1">ROI</p>
                      <p className="text-base sm:text-lg md:text-xl">{roi}%</p>
                    </div>
                    <div className="border rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-muted-foreground mb-1">Negotiations</p>
                      <p className="text-base sm:text-lg md:text-xl">{conciergeService.stats.negotiationsCompleted}</p>
                    </div>
                    <div className="border rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-muted-foreground mb-1">Avg. Savings</p>
                      <p className="text-base sm:text-lg md:text-xl">{conciergeService.stats.averageSavingsPercent}%</p>
                    </div>
                  </div>
                </Card>

                {/* Your Concierge & Service Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Your Concierge */}
                  {conciergeService.conciergeAssigned && (
                    <Card className="p-4 sm:p-6">
                      <h4 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontFamily: "Volkhov, serif" }}>Your Concierge</h4>
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <Avatar className="size-14 sm:size-16 border-2 border-[#DF6951] shrink-0">
                          <img 
                            src={conciergeService.conciergeAssigned.avatar} 
                            alt={conciergeService.conciergeAssigned.name}
                            className="object-cover"
                          />
                          <AvatarFallback>{conciergeService.conciergeAssigned.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold mb-1 text-sm sm:text-base">{conciergeService.conciergeAssigned.name}</h5>
                          <div className="space-y-1 text-xs sm:text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="size-3 shrink-0" />
                              <span className="truncate">{conciergeService.conciergeAssigned.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="size-3 shrink-0" />
                              <span className="truncate">{conciergeService.conciergeAssigned.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-[#DF6951] hover:bg-[#c5573d] gap-1 sm:gap-2 text-xs sm:text-sm">
                          <MessageCircle className="size-3 sm:size-4" />
                          <span className="hidden xs:inline">Chat</span>
                          <span className="xs:hidden">Chat</span>
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 gap-1 sm:gap-2 text-xs sm:text-sm">
                          <Phone className="size-3 sm:size-4" />
                          <span className="hidden xs:inline">Call</span>
                          <span className="xs:hidden">Call</span>
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* Service Stats */}
                  <Card className="p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontFamily: "Volkhov, serif" }}>Service Statistics</h4>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Target className="size-4 text-[#DF6951] shrink-0" />
                          <span className="text-xs sm:text-sm truncate">Venues Negotiated</span>
                        </div>
                        <span className="font-semibold text-sm sm:text-base shrink-0">{conciergeService.stats.venuesNegotiated}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Briefcase className="size-4 text-[#DF6951] shrink-0" />
                          <span className="text-xs sm:text-sm truncate">Vendors Negotiated</span>
                        </div>
                        <span className="font-semibold text-sm sm:text-base shrink-0">{conciergeService.stats.vendorsNegotiated}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Clock className="size-4 text-[#DF6951] shrink-0" />
                          <span className="text-xs sm:text-sm truncate">Avg. Response Time</span>
                        </div>
                        <span className="font-semibold text-sm sm:text-base shrink-0">{conciergeService.stats.responseTime}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <BarChart3 className="size-4 text-[#DF6951] shrink-0" />
                          <span className="text-xs sm:text-sm truncate">Avg. Savings %</span>
                        </div>
                        <span className="font-semibold text-sm sm:text-base shrink-0">{conciergeService.stats.averageSavingsPercent}%</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Personal Savings Dashboard */}
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                    Personal Savings Dashboard
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <Card className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Money Saved</p>
                          <p className="text-xl sm:text-2xl md:text-3xl mb-1 break-words" style={{ color: "#059669" }}>
                            {formatPrice(totalSavingsINR)}
                          </p>
                          <p className="text-xs text-muted-foreground">Across {conciergeService.savingsBreakdown.length} services</p>
                        </div>
                        <TrendingDown className="size-6 sm:size-8 text-green-600 shrink-0" />
                      </div>
                    </Card>

                    <Card className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Service Investment</p>
                          <p className="text-xl sm:text-2xl md:text-3xl mb-1 break-words" style={{ color: "#0284c7" }}>
                            {formatPrice(conciergeService.priceInr)}
                          </p>
                          <p className="text-xs text-muted-foreground">{conciergeService.tierName} tier</p>
                        </div>
                        <Crown className="size-6 sm:size-8 text-blue-600 shrink-0" />
                      </div>
                    </Card>

                    <Card className="p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 sm:col-span-2 md:col-span-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Net Benefit</p>
                          <p className="text-xl sm:text-2xl md:text-3xl mb-1 break-words" style={{ color: "#d97706" }}>
                            {formatPrice(totalSavingsINR - conciergeService.priceInr)}
                          </p>
                          <p className="text-xs text-muted-foreground">{roi}% return</p>
                        </div>
                        <Award className="size-6 sm:size-8 text-orange-600 shrink-0" />
                      </div>
                    </Card>
                  </div>

                  {/* Savings Breakdown */}
                  <Card className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
                      <h4 className="text-base sm:text-lg" style={{ fontFamily: "Volkhov, serif" }}>Savings Breakdown</h4>
                      <Badge className="bg-[#DF6951] w-fit text-xs sm:text-sm">{conciergeService.savingsBreakdown.length} Services</Badge>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      {conciergeService.savingsBreakdown.map((saving) => (
                        <Card key={saving.id} className="p-3 sm:p-4 bg-gray-50 hover:shadow-md transition-shadow">
                          <div className="flex flex-col gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">{saving.category}</Badge>
                                <h5 className="font-semibold text-sm sm:text-base">{saving.serviceName}</h5>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mb-2">{saving.details}</p>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                <span className="text-muted-foreground line-through">
                                  Original: {formatPrice(saving.originalPrice)}
                                </span>
                                <span className="text-green-600 font-semibold">
                                  Paid: {formatPrice(saving.negotiatedPrice)}
                                </span>
                                <span className="text-xs text-muted-foreground">{saving.savedDate}</span>
                              </div>
                            </div>
                            <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg w-fit sm:self-end">
                              <p className="text-xs">Saved</p>
                              <p className="font-semibold text-sm sm:text-base">{formatPrice(saving.savedAmount)}</p>
                              <p className="text-xs">
                                {((saving.savedAmount / saving.originalPrice) * 100).toFixed(0)}%
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Service Features & Rewards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Service Features */}
                  <Card className="p-4 sm:p-6 md:col-span-2">
                    <h4 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontFamily: "Volkhov, serif" }}>Your Service Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                      {conciergeService.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 text-green-600 mt-0.5 shrink-0" />
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Wedzway Coins */}
                  {conciergeService.coinsBalance !== undefined && (
                    <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 md:col-span-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex-1 w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="size-4 sm:size-5 text-yellow-600 shrink-0" />
                            <h4 className="text-base sm:text-lg" style={{ fontFamily: "Volkhov, serif" }}>Wedzway Coins</h4>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                            Redeem your coins for discounts on future bookings and exclusive perks
                          </p>
                          <div className="flex flex-wrap gap-3 sm:gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Current Balance</p>
                              <p className="text-xl sm:text-2xl text-[#DF6951]">{conciergeService.coinsBalance.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total Earned</p>
                              <p className="text-lg sm:text-xl text-muted-foreground">{conciergeService.coinsEarned?.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-yellow-600 hover:bg-yellow-700 gap-2 w-full sm:w-auto text-sm">
                          <Sparkles className="size-4" />
                          Redeem Coins
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Wedding Plan Tab */}
          {activeTab === "plan" && (() => {
            if (!data.weddingPlan) {
              return (
                <Card className="p-12 text-center">
                  <ListChecks className="size-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    No Wedding Plan Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start planning your dream wedding with our interactive builder
                  </p>
                  <Button 
                    className="gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                    onClick={() => setShowBuilder(true)}
                  >
                    <Sparkles className="size-4" />
                    Create Wedding Plan
                  </Button>
                </Card>
              );
            }

            const builderSteps = [
              { id: "basics", name: "Basics", icon: Users, completed: true },
              { id: "destination", name: "Destination", icon: MapPin, completed: true },
              { id: "moodboard", name: "Moodboard", icon: Palette, completed: true },
              { id: "vendors", name: "Vendors", icon: Briefcase, completed: true },
              { id: "venue", name: "Venue", icon: Building2, completed: true },
              { id: "travel", name: "Travel", icon: Plane, completed: false },
              { id: "visa", name: "Visa", icon: FileText, completed: false },
            ];

            const renderStepDetails = () => {
              switch (selectedStep) {
                case "basics":
                  return (
                    <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="size-5 text-[#DF6951]" />
                        <h4 className="text-lg" style={{ fontFamily: "Volkhov, serif" }}>Event Basics</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Event Name</p>
                          <p className="font-semibold">{data.weddingPlan.eventName}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Wedding Date</p>
                          <p className="font-semibold">{data.weddingPlan.weddingDate}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Wedding Type</p>
                          <Badge className="bg-[#DF6951]">
                            {data.weddingPlan.weddingType === "destination" ? "Destination Wedding" : "Local Wedding"}
                          </Badge>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Theme</p>
                          <p className="font-semibold">{data.weddingPlan.theme}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Guest Size</p>
                          <p className="font-semibold">{data.weddingPlan.guestSize} Guests</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Duration</p>
                          <p className="font-semibold">{data.weddingPlan.duration} Days</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg md:col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">Budget</p>
                          <p className="text-2xl text-[#DF6951]">{formatPrice(data.weddingPlan.budget)}</p>
                        </div>
                      </div>
                    </div>
                  );

                case "destination":
                  return (
                    <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="size-5 text-[#DF6951]" />
                        <h4 className="text-lg" style={{ fontFamily: "Volkhov, serif" }}>Destination Details</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Wedding Destination</p>
                          <p className="font-semibold text-lg">{data.weddingPlan.destination}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Venue</p>
                          <p className="font-semibold text-lg">{data.weddingPlan.venue}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg md:col-span-2">
                          <p className="text-sm text-muted-foreground mb-2">Guest Origins</p>
                          <div className="flex flex-wrap gap-2">
                            {data.weddingPlan.guestOrigins.map((origin, idx) => (
                              <Badge key={idx} variant="outline">{origin}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg md:col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">Accommodations</p>
                          <p className="font-semibold">{data.weddingPlan.accommodations}</p>
                        </div>
                      </div>
                    </div>
                  );

                case "moodboard":
                  return (
                    <div className="mt-6 p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg border-2 border-pink-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Palette className="size-5 text-[#DF6951]" />
                        <h4 className="text-lg" style={{ fontFamily: "Volkhov, serif" }}>Design & Moodboard</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">Color Palette</p>
                          <p className="font-semibold mb-3">{data.weddingPlan.colorPalette.name}</p>
                          <div className="flex gap-2">
                            {data.weddingPlan.colorPalette.colors.map((color, idx) => (
                              <div key={idx} className="flex flex-col items-center gap-1">
                                <div 
                                  className="size-12 rounded-full border-2 border-gray-300"
                                  style={{ backgroundColor: color }}
                                />
                                <span className="text-xs text-muted-foreground">{color}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">Design Styles</p>
                          <div className="flex flex-wrap gap-2">
                            {data.weddingPlan.styles.map((style, idx) => (
                              <Badge key={idx} className="bg-[#DF6951]">{style}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );

                case "vendors":
                  return (
                    <div className="mt-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="size-5 text-[#DF6951]" />
                        <h4 className="text-lg" style={{ fontFamily: "Volkhov, serif" }}>Vendors Booked</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {Object.entries(data.weddingPlan.vendors).map(([type, vendor]) => 
                          vendor ? (
                            <div key={type} className="bg-white p-4 rounded-lg border">
                              <div className="flex items-start justify-between mb-1">
                                <p className="text-sm text-muted-foreground capitalize">{type}</p>
                                <CheckCircle2 className="size-4 text-green-600" />
                              </div>
                              <p className="font-semibold">{vendor.name}</p>
                              <p className="text-sm text-muted-foreground">{vendor.service}</p>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  );

                case "venue":
                  const venueTasks = data.weddingPlan.checklist.filter(t => t.category === "Venue");
                  return (
                    <div className="mt-6 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border-2 border-emerald-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="size-5 text-[#DF6951]" />
                        <h4 className="text-lg" style={{ fontFamily: "Volkhov, serif" }}>Venue Tasks</h4>
                      </div>
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <p className="text-sm text-muted-foreground mb-1">Selected Venue</p>
                        <p className="font-semibold text-lg">{data.weddingPlan.venue}</p>
                        <p className="text-muted-foreground">{data.weddingPlan.destination}</p>
                      </div>
                      <div className="space-y-2">
                        {venueTasks.map((task) => (
                          <div key={task.id} className="bg-white p-3 rounded-lg border flex items-start gap-3">
                            {task.completed ? (
                              <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                            ) : (
                              <Clock className="size-5 text-orange-500 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className={task.completed ? "line-through text-muted-foreground" : "font-medium"}>{task.task}</p>
                              <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                            </div>
                            <Badge variant={task.priority === "high" ? "destructive" : "outline"}>
                              {task.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  );

                case "travel":
                  const travelTasks = data.weddingPlan.checklist.filter(t => t.category === "Travel");
                  return (
                    <div className="mt-6 p-6 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-lg border-2 border-sky-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Plane className="size-5 text-[#DF6951]" />
                        <h4 className="text-lg" style={{ fontFamily: "Volkhov, serif" }}>Travel Planning</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">Guest Origins</p>
                          <div className="flex flex-wrap gap-2">
                            {data.weddingPlan.guestOrigins.map((origin, idx) => (
                              <Badge key={idx} variant="outline">{origin}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Accommodations</p>
                          <p className="font-semibold">{data.weddingPlan.accommodations}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {travelTasks.length > 0 ? (
                          travelTasks.map((task) => (
                            <div key={task.id} className="bg-white p-3 rounded-lg border flex items-start gap-3">
                              {task.completed ? (
                                <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                              ) : (
                                <Clock className="size-5 text-orange-500 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p className={task.completed ? "line-through text-muted-foreground" : "font-medium"}>{task.task}</p>
                                <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                              </div>
                              <Badge variant={task.priority === "high" ? "destructive" : "outline"}>
                                {task.priority}
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <div className="bg-white p-4 rounded-lg text-center text-muted-foreground">
                            No travel tasks yet. Click "Continue Building" to add travel arrangements.
                          </div>
                        )}
                      </div>
                    </div>
                  );

                case "visa":
                  return (
                    <div className="mt-6 p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border-2 border-violet-200">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="size-5 text-[#DF6951]" />
                        <h4 className="text-lg" style={{ fontFamily: "Volkhov, serif" }}>Visa & Documents</h4>
                      </div>
                      {data.visaApplications && data.visaApplications.length > 0 ? (
                        <div className="space-y-3">
                          {data.visaApplications.map((visa) => (
                            <div key={visa.id} className="bg-white p-4 rounded-lg border">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-semibold">{visa.country}</p>
                                  <p className="text-sm text-muted-foreground">{visa.visaType}</p>
                                </div>
                                <Badge className={
                                  visa.status === "approved" ? "bg-green-600" :
                                  visa.status === "pending" ? "bg-orange-500" :
                                  visa.status === "in-review" ? "bg-blue-500" :
                                  "bg-red-500"
                                }>
                                  {visa.status}
                                </Badge>
                              </div>
                              <div className="text-sm">
                                <p className="text-muted-foreground">Application #{visa.applicationNumber}</p>
                                <p className="text-muted-foreground">Expected: {visa.expectedProcessing}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white p-8 rounded-lg text-center">
                          <FileText className="size-12 mx-auto mb-3 text-muted-foreground" />
                          <p className="text-muted-foreground mb-4">No visa applications yet</p>
                          <Button size="sm" variant="outline">
                            Start Visa Application
                          </Button>
                        </div>
                      )}
                    </div>
                  );

                default:
                  return null;
              }
            };

            return (
              <>
                <Card className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl mb-1" style={{ fontFamily: "Volkhov, serif" }}>
                        {selectedStep ? builderSteps.find(s => s.id === selectedStep)?.name : "Builder Steps"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {data.weddingPlan.completionPercentage}% Complete • Last updated: {data.weddingPlan.lastUpdated}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                      {selectedStep && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedStep(null)}
                          className="gap-2 flex-1 sm:flex-none"
                        >
                          <X className="size-4" />
                          <span>Close</span>
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = '/account/wedding-plan'}
                        className="gap-2 flex-1 sm:flex-none"
                      >
                        <Eye className="size-4" />
                        <span className="hidden sm:inline">View Printable Plan</span>
                        <span className="sm:hidden">Print</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowBuilder(true)}
                        className="gap-2 flex-1 sm:flex-none"
                      >
                        <Wand2 className="size-4" />
                        <span className="hidden sm:inline">Continue Building</span>
                        <span className="sm:hidden">Build</span>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
                    {builderSteps.map((step) => {
                      const StepIcon = step.icon;
                      const isSelected = selectedStep === step.id;
                      return (
                        <div
                          key={step.id}
                          onClick={() => setSelectedStep(isSelected ? null : step.id)}
                          className={`p-2 sm:p-3 rounded-lg border-2 text-center transition-all cursor-pointer hover:shadow-md ${
                            isSelected
                              ? "bg-[#DF6951] border-[#DF6951] text-white scale-105"
                              : step.completed
                              ? "bg-green-50 border-green-300 hover:border-green-400"
                              : "bg-gray-50 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className={`size-8 sm:size-10 mx-auto mb-1 sm:mb-2 rounded-full flex items-center justify-center ${
                            isSelected
                              ? "bg-white"
                              : step.completed 
                              ? "bg-green-500" 
                              : "bg-gray-300"
                          }`}>
                            {step.completed && !isSelected ? (
                              <CheckCircle2 className="size-4 sm:size-5 text-white" />
                            ) : (
                              <StepIcon className={`size-4 sm:size-5 ${isSelected ? "text-[#DF6951]" : "text-white"}`} />
                            )}
                          </div>
                          <p className={`text-[10px] sm:text-xs font-medium ${isSelected ? "text-white" : ""}`}>{step.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  {renderStepDetails()}
                </Card>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Checklist Column */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Checklist */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                          Wedding Checklist
                        </h3>
                        <Badge variant="outline">
                          {data.weddingPlan.checklist.filter(c => c.completed).length} / {data.weddingPlan.checklist.length} Complete
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {data.weddingPlan.checklist.map((item) => (
                          <div
                            key={item.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-colors ${
                              item.completed
                                ? "bg-green-50 border-green-200"
                                : "bg-white border-gray-200 hover:border-[#DF6951]/30"
                            }`}
                          >
                            <div className="pt-0.5">
                              {item.completed ? (
                                <CheckCircle2 className="size-5 text-green-600" />
                              ) : (
                                <div className="size-5 rounded-full border-2 border-gray-300" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <p className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                                  {item.task}
                                </p>
                                <Badge
                                  variant="outline"
                                  className={`ml-2 shrink-0 ${
                                    item.priority === "high"
                                      ? "border-red-300 text-red-700"
                                      : item.priority === "medium"
                                      ? "border-yellow-300 text-yellow-700"
                                      : "border-gray-300 text-gray-700"
                                  }`}
                                >
                                  {item.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Tag className="size-3" />
                                  {item.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="size-3" />
                                  Due: {item.dueDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Venue Info */}
                    <Card className="p-6">
                      <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                        Venue Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Venue Name</p>
                          <p className="text-lg font-semibold">{data.weddingPlan.venue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Location</p>
                          <p className="flex items-center gap-2">
                            <MapPin className="size-4 text-[#DF6951]" />
                            {data.weddingPlan.destination}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Event Duration</p>
                          <p>{data.weddingPlan.duration} days</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Guest Accommodations</p>
                          <p>{data.weddingPlan.accommodations}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Sidebar Column */}
                  <div className="space-y-6">
                    {/* Design Theme */}
                    <Card className="p-6">
                      <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Volkhov, serif" }}>
                        <Palette className="size-5 text-[#DF6951]" />
                        Design Theme
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Color Palette</p>
                          <p className="font-semibold mb-2">{data.weddingPlan.colorPalette.name}</p>
                          <div className="flex gap-2">
                            {data.weddingPlan.colorPalette.colors.map((color, idx) => (
                              <div
                                key={idx}
                                className="size-10 rounded-lg border-2 border-white shadow-md"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Styles</p>
                          <div className="flex flex-wrap gap-2">
                            {data.weddingPlan.styles.map((style, idx) => (
                              <Badge key={idx} variant="secondary">
                                {style}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Vendors */}
                    <Card className="p-6">
                      <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Volkhov, serif" }}>
                        <Briefcase className="size-5 text-[#DF6951]" />
                        Vendors
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(data.weddingPlan.vendors).map(([type, vendor]) => (
                          vendor && (
                            <div key={type} className="pb-3 border-b last:border-0 last:pb-0">
                              <p className="text-xs text-muted-foreground capitalize mb-1">{type}</p>
                              <p className="font-semibold text-sm">{vendor.name}</p>
                              <p className="text-xs text-muted-foreground">{vendor.service}</p>
                            </div>
                          )
                        ))}
                      </div>
                    </Card>

                    {/* Guest Info */}
                    <Card className="p-6">
                      <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Volkhov, serif" }}>
                        <Users className="size-5 text-[#DF6951]" />
                        Guest Info
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total Guests</p>
                          <p className="text-2xl font-semibold text-[#DF6951]">{data.weddingPlan.guestSize}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Guest Origins</p>
                          <div className="space-y-1">
                            {data.weddingPlan.guestOrigins.map((origin, idx) => (
                              <p key={idx} className="text-sm flex items-center gap-2">
                                <MapPin className="size-3 text-muted-foreground" />
                                {origin}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </>
            );
          })()}

          {/* Venue Bookings Tab */}
          {activeTab === "venues" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Venue Bookings
                  </h3>
                  <p className="text-muted-foreground">
                    {filteredVenueBookings.length} of {data.venueBookings.length} venue{data.venueBookings.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter:</span>
                </div>
              </div>

              {/* Filter Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge
                  variant={venueStatusFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer ${venueStatusFilter === "all" ? "bg-[#DF6951]" : ""}`}
                  onClick={() => setVenueStatusFilter("all")}
                >
                  All ({data.venueBookings.length})
                </Badge>
                <Badge
                  variant={venueStatusFilter === "confirmed" ? "default" : "outline"}
                  className={`cursor-pointer ${venueStatusFilter === "confirmed" ? "bg-green-600" : ""}`}
                  onClick={() => setVenueStatusFilter("confirmed")}
                >
                  Confirmed ({data.venueBookings.filter(v => v.status === "confirmed").length})
                </Badge>
                <Badge
                  variant={venueStatusFilter === "pending" ? "default" : "outline"}
                  className={`cursor-pointer ${venueStatusFilter === "pending" ? "bg-yellow-600" : ""}`}
                  onClick={() => setVenueStatusFilter("pending")}
                >
                  Pending ({data.venueBookings.filter(v => v.status === "pending").length})
                </Badge>
                <Badge
                  variant={venueStatusFilter === "cancelled" ? "default" : "outline"}
                  className={`cursor-pointer ${venueStatusFilter === "cancelled" ? "bg-red-600" : ""}`}
                  onClick={() => setVenueStatusFilter("cancelled")}
                >
                  Cancelled ({data.venueBookings.filter(v => v.status === "cancelled").length})
                </Badge>
                {venueStatusFilter !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => setVenueStatusFilter("all")}
                  >
                    <X className="size-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {filteredVenueBookings.length > 0 ? filteredVenueBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-[4/3] md:aspect-auto bg-gray-100">
                      <img
                        src={booking.image}
                        alt={booking.venueName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg sm:text-xl mb-1">{booking.venueName}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3 sm:size-4" />
                            {booking.location}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Event Date</p>
                          <p className="flex items-center gap-2 text-sm">
                            <Calendar className="size-3 sm:size-4 text-[#DF6951]" />
                            {booking.eventDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Guests</p>
                          <p className="flex items-center gap-2 text-sm">
                            <Users className="size-3 sm:size-4 text-[#DF6951]" />
                            {booking.guests} people
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Amount</p>
                          <p className="text-base sm:text-lg text-[#DF6951]">{booking.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Booking Ref</p>
                          <p className="text-xs sm:text-sm font-mono break-all">{booking.bookingReference}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
                          <Download className="size-4" />
                          <span>Download Confirmation</span>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
                          <ExternalLink className="size-4" />
                          <span>View Details</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )) : (
                <Card className="p-12 text-center">
                  <Building2 className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No {venueStatusFilter !== "all" ? venueStatusFilter : ""} venue bookings found
                  </p>
                </Card>
              )}
              </div>
            </div>
          )}

          {/* Vendor Bookings Tab */}
          {activeTab === "vendors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Vendor Bookings
                  </h3>
                  <p className="text-muted-foreground">
                    {filteredVendorBookings.length} of {data.vendorBookings.length} vendor{data.vendorBookings.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter:</span>
                </div>
              </div>

              {/* Filter Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge
                  variant={vendorTypeFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer ${vendorTypeFilter === "all" ? "bg-[#DF6951]" : ""}`}
                  onClick={() => setVendorTypeFilter("all")}
                >
                  All Types ({data.vendorBookings.length})
                </Badge>
                {vendorTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={vendorTypeFilter === type ? "default" : "outline"}
                    className={`cursor-pointer ${vendorTypeFilter === type ? "bg-[#DF6951]" : ""}`}
                    onClick={() => setVendorTypeFilter(type)}
                  >
                    {type} ({data.vendorBookings.filter(v => v.vendorType === type).length})
                  </Badge>
                ))}
                {vendorTypeFilter !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => setVendorTypeFilter("all")}
                  >
                    <X className="size-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredVendorBookings.length > 0 ? filteredVendorBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] bg-gray-100">
                    <img
                      src={booking.image}
                      alt={booking.vendorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg mb-1">{booking.vendorName}</h4>
                        <Badge variant="secondary" className="text-xs">{booking.vendorType}</Badge>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="space-y-2 mb-4 text-xs sm:text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Service Date:</span>
                        <span className="text-right">{booking.serviceDate}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="text-[#DF6951]">{booking.amount}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground shrink-0">Reference:</span>
                        <span className="font-mono text-[10px] sm:text-xs break-all text-right">{booking.bookingReference}</span>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="w-full gap-2">
                      <Download className="size-4" />
                      <span>Download Invoice</span>
                    </Button>
                  </div>
                </Card>
              )) : (
                <Card className="p-12 text-center">
                  <Users className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No {vendorTypeFilter !== "all" ? vendorTypeFilter : ""} vendor bookings found
                  </p>
                </Card>
              )}
              </div>
            </div>
          )}

          {/* Planner Bookings Tab */}
          {activeTab === "planners" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                  Wedding Planner
                </h3>
                <p className="text-muted-foreground">Your dedicated wedding planning service</p>
              </div>

              <div className="space-y-4">
              {data.plannerBookings.map((booking) => (
                <Card key={booking.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <img
                      src={booking.image}
                      alt={booking.plannerName}
                      className="size-20 sm:size-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto sm:mx-0"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-4">
                        <div className="text-center sm:text-left w-full sm:w-auto">
                          <h4 className="text-xl sm:text-2xl mb-1">{booking.plannerName}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 justify-center sm:justify-start">
                            <MapPin className="size-3 sm:size-4" />
                            {booking.location}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Package</p>
                          <p className="font-semibold text-sm sm:text-base">{booking.packageType}</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Investment</p>
                          <p className="text-base sm:text-lg text-[#DF6951]">{booking.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Reference</p>
                          <p className="text-xs sm:text-sm font-mono break-all">{booking.bookingReference}</p>
                        </div>
                      </div>

                      {booking.nextMeeting && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-4">
                          <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-1">
                            Next Meeting Scheduled
                          </p>
                          <p className="text-xs sm:text-sm text-blue-700 flex items-center gap-2 justify-center sm:justify-start">
                            <Calendar className="size-3 sm:size-4" />
                            {booking.nextMeeting}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" className="gap-2 w-full sm:w-auto">
                          <Mail className="size-4" />
                          <span>Contact Planner</span>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
                          <Calendar className="size-4" />
                          <span>Schedule Meeting</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              </div>
            </div>
          )}

          {/* Tour Bookings Tab */}
          {activeTab === "tours" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Tour Bookings
                  </h3>
                  <p className="text-muted-foreground">
                    {filteredTourBookings.length} of {data.tourBookings.length} tour{data.tourBookings.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter:</span>
                </div>
              </div>

              {/* Filter Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge
                  variant={tourStatusFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer ${tourStatusFilter === "all" ? "bg-[#DF6951]" : ""}`}
                  onClick={() => setTourStatusFilter("all")}
                >
                  All ({data.tourBookings.length})
                </Badge>
                <Badge
                  variant={tourStatusFilter === "confirmed" ? "default" : "outline"}
                  className={`cursor-pointer ${tourStatusFilter === "confirmed" ? "bg-green-600" : ""}`}
                  onClick={() => setTourStatusFilter("confirmed")}
                >
                  Confirmed ({data.tourBookings.filter(t => t.status === "confirmed").length})
                </Badge>
                <Badge
                  variant={tourStatusFilter === "pending" ? "default" : "outline"}
                  className={`cursor-pointer ${tourStatusFilter === "pending" ? "bg-yellow-600" : ""}`}
                  onClick={() => setTourStatusFilter("pending")}
                >
                  Pending ({data.tourBookings.filter(t => t.status === "pending").length})
                </Badge>
                {tourStatusFilter !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => setTourStatusFilter("all")}
                  >
                    <X className="size-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredTourBookings.length > 0 ? filteredTourBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] bg-gray-100">
                    <img
                      src={booking.image}
                      alt={booking.tourName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg mb-1">{booking.tourName}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="size-3 sm:size-4" />
                          {booking.destination}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="space-y-2 mb-4 text-xs sm:text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Tour Date:</span>
                        <span className="text-right">{booking.tourDate}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Participants:</span>
                        <span>{booking.participants} people</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="text-[#DF6951]">{booking.amount}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground shrink-0">Reference:</span>
                        <span className="font-mono text-[10px] sm:text-xs break-all text-right">{booking.bookingReference}</span>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="w-full gap-2">
                      <Download className="size-4" />
                      <span>Download Voucher</span>
                    </Button>
                  </div>
                </Card>
              )) : (
                <Card className="p-12 text-center">
                  <Package className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No {tourStatusFilter !== "all" ? tourStatusFilter : ""} tour bookings found
                  </p>
                </Card>
              )}
              </div>
            </div>
          )}

          {/* Flight Bookings Tab */}
          {activeTab === "flights" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Flight Bookings
                  </h3>
                  <p className="text-muted-foreground">
                    {filteredFlightBookings.length} of {data.flightBookings.length} flight{data.flightBookings.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter:</span>
                </div>
              </div>

              {/* Filter Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge
                  variant={flightStatusFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer ${flightStatusFilter === "all" ? "bg-[#DF6951]" : ""}`}
                  onClick={() => setFlightStatusFilter("all")}
                >
                  All ({data.flightBookings.length})
                </Badge>
                <Badge
                  variant={flightStatusFilter === "confirmed" ? "default" : "outline"}
                  className={`cursor-pointer ${flightStatusFilter === "confirmed" ? "bg-green-600" : ""}`}
                  onClick={() => setFlightStatusFilter("confirmed")}
                >
                  Confirmed ({data.flightBookings.filter(f => f.status === "confirmed").length})
                </Badge>
                <Badge
                  variant={flightStatusFilter === "pending" ? "default" : "outline"}
                  className={`cursor-pointer ${flightStatusFilter === "pending" ? "bg-yellow-600" : ""}`}
                  onClick={() => setFlightStatusFilter("pending")}
                >
                  Pending ({data.flightBookings.filter(f => f.status === "pending").length})
                </Badge>
                {flightStatusFilter !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => setFlightStatusFilter("all")}
                  >
                    <X className="size-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {filteredFlightBookings.length > 0 ? filteredFlightBookings.map((booking) => (
                <Card key={booking.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 sm:p-3 rounded-full bg-blue-100 shrink-0">
                        <Plane className="size-5 sm:size-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl mb-1">{booking.airline}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {booking.flightNumber}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-center sm:text-left">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-1">Outbound</p>
                        <p className="font-semibold text-sm sm:text-base">{booking.departureDate}</p>
                      </div>
                      <Plane className="size-4 sm:size-5 text-[#DF6951] rotate-90" />
                      {booking.returnDate && (
                        <div className="text-center sm:text-right">
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Return</p>
                          <p className="font-semibold text-sm sm:text-base">{booking.returnDate}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-center text-muted-foreground">
                      {booking.route}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Passengers</p>
                      <p className="font-semibold text-sm sm:text-base">{booking.passengers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Class</p>
                      <p className="font-semibold text-sm sm:text-base">{booking.class}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Total</p>
                      <p className="text-base sm:text-lg text-[#DF6951]">{booking.amount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Reference</p>
                      <p className="font-mono text-[10px] sm:text-xs break-all">{booking.bookingReference}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
                      <Download className="size-4" />
                      <span>Download E-Ticket</span>
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
                      <Calendar className="size-4" />
                      <span>Manage Booking</span>
                    </Button>
                  </div>
                </Card>
              )) : (
                <Card className="p-12 text-center">
                  <Plane className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No {flightStatusFilter !== "all" ? flightStatusFilter : ""} flight bookings found
                  </p>
                </Card>
              )}
              </div>
            </div>
          )}

          {/* Visa Applications Tab */}
          {activeTab === "visa" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Visa Applications
                  </h3>
                  <p className="text-muted-foreground">
                    {filteredVisaApplications.length} of {data.visaApplications.length} application{data.visaApplications.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter:</span>
                </div>
              </div>

              {/* Filter Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge
                  variant={visaStatusFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer ${visaStatusFilter === "all" ? "bg-[#DF6951]" : ""}`}
                  onClick={() => setVisaStatusFilter("all")}
                >
                  All ({data.visaApplications.length})
                </Badge>
                <Badge
                  variant={visaStatusFilter === "approved" ? "default" : "outline"}
                  className={`cursor-pointer ${visaStatusFilter === "approved" ? "bg-green-600" : ""}`}
                  onClick={() => setVisaStatusFilter("approved")}
                >
                  Approved ({data.visaApplications.filter(v => v.status === "approved").length})
                </Badge>
                <Badge
                  variant={visaStatusFilter === "in-review" ? "default" : "outline"}
                  className={`cursor-pointer ${visaStatusFilter === "in-review" ? "bg-blue-600" : ""}`}
                  onClick={() => setVisaStatusFilter("in-review")}
                >
                  In Review ({data.visaApplications.filter(v => v.status === "in-review").length})
                </Badge>
                <Badge
                  variant={visaStatusFilter === "pending" ? "default" : "outline"}
                  className={`cursor-pointer ${visaStatusFilter === "pending" ? "bg-yellow-600" : ""}`}
                  onClick={() => setVisaStatusFilter("pending")}
                >
                  Pending ({data.visaApplications.filter(v => v.status === "pending").length})
                </Badge>
                {visaStatusFilter !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => setVisaStatusFilter("all")}
                  >
                    <X className="size-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {filteredVisaApplications.length > 0 ? filteredVisaApplications.map((application) => (
                <Card key={application.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 sm:p-3 rounded-full bg-purple-100 shrink-0">
                        <FileText className="size-5 sm:size-6 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base sm:text-xl mb-1 truncate">
                          {application.country} - {application.visaType}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          Application #{application.applicationNumber}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Submitted</p>
                      <p className="font-semibold text-sm">{application.submissionDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Processing Time</p>
                      <p className="font-semibold text-sm">{application.expectedProcessing}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Application Date</p>
                      <p className="font-semibold text-sm">{application.applicationDate}</p>
                    </div>
                  </div>

                  {application.status === "approved" && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-xs sm:text-sm font-semibold text-green-900 flex items-center gap-2">
                        <CheckCircle2 className="size-3 sm:size-4 shrink-0" />
                        <span>Visa Approved! You can now travel to {application.country}</span>
                      </p>
                    </div>
                  )}

                  {application.status === "in-review" && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-xs sm:text-sm font-semibold text-blue-900 flex items-center gap-2">
                        <Clock className="size-3 sm:size-4 shrink-0" />
                        <span>Your application is being reviewed</span>
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
                      <ExternalLink className="size-4" />
                      <span>Track Application</span>
                    </Button>
                    {application.status === "approved" && (
                      <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto">
                        <Download className="size-4" />
                        <span>Download Visa</span>
                      </Button>
                    )}
                  </div>
                </Card>
              )) : (
                <Card className="p-12 text-center">
                  <FileText className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No {visaStatusFilter !== "all" ? visaStatusFilter : ""} visa applications found
                  </p>
                </Card>
              )}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && data.payments && (
            <PaymentsTabContent
              payments={data.payments}
              paymentStatusFilter={paymentStatusFilter}
              setPaymentStatusFilter={setPaymentStatusFilter}
              paymentMethodFilter={paymentMethodFilter}
              setPaymentMethodFilter={setPaymentMethodFilter}
              paymentSearchTerm={paymentSearchTerm}
              setPaymentSearchTerm={setPaymentSearchTerm}
              filteredPayments={filteredPayments}
              paymentMethods={paymentMethods}
              getStatusBadge={getStatusBadge}
            />
          )}

          {/* Delivery Timeline Tab */}
          {activeTab === "timeline" && (
            <DeliveryTimelinePage />
          )}

          {/* Invitations Tab */}
          {activeTab === "invitations" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Wedding Invitation & RSVP
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Create your wedding website and track guest responses
                  </p>
                </div>
                {!data.weddingInvitation ? (
                  <Button
                    onClick={() => setShowInvitationCreator(true)}
                    className="bg-[#DF6951] hover:bg-[#c5573d] gap-2 w-full sm:w-auto shrink-0"
                    size="sm"
                  >
                    <Plus className="size-4" />
                    <span className="hidden sm:inline">Create Invitation</span>
                    <span className="sm:hidden">Create</span>
                  </Button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      onClick={() => setShowPageEditor(true)}
                      className="bg-[#DF6951] hover:bg-[#c5573d] gap-2 flex-1 sm:flex-none"
                      size="sm"
                    >
                      <Edit className="size-4" />
                      <span className="hidden sm:inline">Edit Page</span>
                      <span className="sm:hidden">Edit</span>
                    </Button>
                    <Button
                      onClick={() => setShowPublicPage(true)}
                      variant="outline"
                      className="gap-2 flex-1 sm:flex-none"
                      size="sm"
                    >
                      <Eye className="size-4" />
                      <span className="hidden sm:inline">Preview Page</span>
                      <span className="sm:hidden">Preview</span>
                    </Button>
                  </div>
                )}
              </div>

              {data.weddingInvitation ? (
                <>
                  {/* Invitation Card */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl mb-1 break-words" style={{ fontFamily: "Volkhov, serif" }}>
                          {data.weddingInvitation.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Created on {data.weddingInvitation.createdDate}
                        </p>
                      </div>
                      <Badge className="bg-[#DF6951] capitalize shrink-0 text-xs">
                        {data.weddingInvitation.designTheme} Theme
                      </Badge>
                    </div>

                    {/* Invitation Link */}
                    <div className="mb-6 p-3 sm:p-4 bg-white rounded-lg border">
                      <Label className="text-xs sm:text-sm text-muted-foreground mb-2 block">
                        Wedding Page Link
                      </Label>
                      <div className="flex flex-col sm:flex-row gap-2 mb-3">
                        <input
                          readOnly
                          value={data.weddingInvitation.invitationLink}
                          className="flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-md bg-gray-50 min-w-0"
                        />
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(data.weddingInvitation!.invitationLink);
                                toast.success("Link copied to clipboard!");
                              } catch (error) {
                                toast.success(`Link: ${data.weddingInvitation!.invitationLink}`);
                              }
                            }}
                            className="gap-2 flex-1 sm:flex-none"
                          >
                            <Copy className="size-4" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowPublicPage(true)}
                            className="gap-2 flex-1 sm:flex-none"
                          >
                            <ExternalLink className="size-4" />
                            Open
                          </Button>
                        </div>
                      </div>
                      <Button
                        onClick={() => setShowShareDialog(true)}
                        className="w-full bg-[#DF6951] hover:bg-[#c5573d] gap-2"
                        size="sm"
                      >
                        <Share2 className="size-4" />
                        <span className="hidden sm:inline">Share Invitation via Email</span>
                        <span className="sm:hidden">Share via Email</span>
                      </Button>
                    </div>

                    {/* RSVP Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <Users className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-blue-600" />
                        <p className="text-lg sm:text-xl md:text-2xl">{data.weddingInvitation.totalGuests}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Total Guests</p>
                      </div>
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <Send className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-purple-600" />
                        <p className="text-lg sm:text-xl md:text-2xl">{data.weddingInvitation.sentCount}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Sent</p>
                      </div>
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <Mail className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-orange-600" />
                        <p className="text-lg sm:text-xl md:text-2xl">{data.weddingInvitation.rsvpReceived}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Responses</p>
                      </div>
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <UserCheck className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-green-600" />
                        <p className="text-lg sm:text-xl md:text-2xl">{data.weddingInvitation.attendingCount}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Attending</p>
                      </div>
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <UserX className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-red-600" />
                        <p className="text-lg sm:text-xl md:text-2xl">{data.weddingInvitation.notAttendingCount}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Can't Attend</p>
                      </div>
                    </div>
                  </Card>

                  {/* Guest List */}
                  <Card className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <h4 className="text-lg sm:text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                        Guest List & RSVPs
                      </h4>
                      <div className="flex items-center gap-2">
                        <Filter className="size-4 text-muted-foreground" />
                        <span className="text-xs sm:text-sm text-muted-foreground">Filter:</span>
                      </div>
                    </div>

                    {/* Filter Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant={guestFilter === "all" ? "default" : "outline"}
                        className={`cursor-pointer ${guestFilter === "all" ? "bg-[#DF6951]" : ""}`}
                        onClick={() => setGuestFilter("all")}
                      >
                        All Guests ({data.guests.length})
                      </Badge>
                      <Badge
                        variant={guestFilter === "attending" ? "default" : "outline"}
                        className={`cursor-pointer ${guestFilter === "attending" ? "bg-green-600" : ""}`}
                        onClick={() => setGuestFilter("attending")}
                      >
                        <UserCheck className="size-3 mr-1" />
                        Attending ({data.guests.filter(g => g.rsvpStatus === "attending").length})
                      </Badge>
                      <Badge
                        variant={guestFilter === "not-attending" ? "default" : "outline"}
                        className={`cursor-pointer ${guestFilter === "not-attending" ? "bg-red-600" : ""}`}
                        onClick={() => setGuestFilter("not-attending")}
                      >
                        <UserX className="size-3 mr-1" />
                        Not Attending ({data.guests.filter(g => g.rsvpStatus === "not-attending").length})
                      </Badge>
                      <Badge
                        variant={guestFilter === "maybe" ? "default" : "outline"}
                        className={`cursor-pointer ${guestFilter === "maybe" ? "bg-yellow-600" : ""}`}
                        onClick={() => setGuestFilter("maybe")}
                      >
                        <HelpCircle className="size-3 mr-1" />
                        Maybe ({data.guests.filter(g => g.rsvpStatus === "maybe").length})
                      </Badge>
                      <Badge
                        variant={guestFilter === "pending" ? "default" : "outline"}
                        className={`cursor-pointer ${guestFilter === "pending" ? "bg-gray-600" : ""}`}
                        onClick={() => setGuestFilter("pending")}
                      >
                        <Clock className="size-3 mr-1" />
                        Pending ({data.guests.filter(g => g.rsvpStatus === "pending").length})
                      </Badge>
                      {guestFilter !== "all" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => setGuestFilter("all")}
                        >
                          <X className="size-3 mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>

                    {/* Guest Cards */}
                    <div className="space-y-3">
                      {data.guests
                        .filter(guest => guestFilter === "all" || guest.rsvpStatus === guestFilter)
                        .map((guest) => (
                          <Card key={guest.id} className="p-3 sm:p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                              <div className="flex items-start gap-2 sm:gap-3 flex-1 w-full">
                                <div className={`size-8 sm:size-10 rounded-full flex items-center justify-center shrink-0 ${
                                  guest.rsvpStatus === "attending" ? "bg-green-100" :
                                  guest.rsvpStatus === "not-attending" ? "bg-red-100" :
                                  guest.rsvpStatus === "maybe" ? "bg-yellow-100" :
                                  "bg-gray-100"
                                }`}>
                                  {guest.rsvpStatus === "attending" ? (
                                    <UserCheck className={`size-4 sm:size-5 text-green-600`} />
                                  ) : guest.rsvpStatus === "not-attending" ? (
                                    <UserX className={`size-4 sm:size-5 text-red-600`} />
                                  ) : guest.rsvpStatus === "maybe" ? (
                                    <HelpCircle className={`size-4 sm:size-5 text-yellow-600`} />
                                  ) : (
                                    <Clock className={`size-4 sm:size-5 text-gray-600`} />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                    <h5 className="font-semibold text-sm sm:text-base truncate">{guest.name}</h5>
                                    <Badge variant="outline" className="text-[10px] sm:text-xs capitalize">
                                      {guest.category}
                                    </Badge>
                                    {guest.plusOne && (
                                      <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                        +1
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                                    <p className="flex items-center gap-2 truncate">
                                      <Mail className="size-3 shrink-0" />
                                      <span className="truncate">{guest.email}</span>
                                    </p>
                                    {guest.phone && (
                                      <p className="flex items-center gap-2">
                                        <Phone className="size-3 shrink-0" />
                                        {guest.phone}
                                      </p>
                                    )}
                                  </div>
                                  {guest.dietaryRestrictions && (
                                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">
                                      🍽️ {guest.dietaryRestrictions}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end gap-2">
                                <Badge className={`text-xs ${
                                  guest.rsvpStatus === "attending" ? "bg-green-600" :
                                  guest.rsvpStatus === "not-attending" ? "bg-red-600" :
                                  guest.rsvpStatus === "maybe" ? "bg-yellow-600" :
                                  "bg-gray-500"
                                }`}>
                                  {guest.rsvpStatus === "attending" ? "Attending" :
                                   guest.rsvpStatus === "not-attending" ? "Can't Attend" :
                                   guest.rsvpStatus === "maybe" ? "Maybe" :
                                   "No Response"}
                                </Badge>
                                {guest.rsvpDate && (
                                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                                    {guest.rsvpDate}
                                  </p>
                                )}
                                {!guest.invitationSent && (
                                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                                    <Send className="size-3" />
                                    <span>Send</span>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </Card>
                </>
              ) : (
                /* No Invitation Created Yet */
                <Card className="p-6 sm:p-8 md:p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="size-16 sm:size-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="size-8 sm:size-10 text-[#DF6951]" />
                    </div>
                    <h4 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                      Create Your Wedding Invitation
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">
                      Design a beautiful wedding website for your guests with RSVP tracking, event details, travel information, and more.
                    </p>
                    <Button
                      onClick={() => setShowInvitationCreator(true)}
                      className="bg-[#DF6951] hover:bg-[#c5573d] gap-2 w-full sm:w-auto"
                      size="sm"
                    >
                      <Sparkles className="size-4" />
                      Get Started
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Saved Inspirations Tab */}
          {activeTab === "saved" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Saved Inspirations
                  </h3>
                  <p className="text-muted-foreground">
                    {filteredInspirations.length} of {data.savedInspirations.length} idea{data.savedInspirations.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter:</span>
                </div>
              </div>

              {/* Filter Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge
                  variant={inspirationFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer ${inspirationFilter === "all" ? "bg-[#DF6951]" : ""}`}
                  onClick={() => setInspirationFilter("all")}
                >
                  All Categories ({data.savedInspirations.length})
                </Badge>
                {inspirationCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={inspirationFilter === category ? "default" : "outline"}
                    className={`cursor-pointer ${inspirationFilter === category ? "bg-[#DF6951]" : ""}`}
                    onClick={() => setInspirationFilter(category)}
                  >
                    {category} ({data.savedInspirations.filter(i => i.category === category).length})
                  </Badge>
                ))}
                {inspirationFilter !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => setInspirationFilter("all")}
                  >
                    <X className="size-3 mr-1" />
                    Clear Filter
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredInspirations.length > 0 ? filteredInspirations.map((inspiration) => (
                <Card
                  key={inspiration.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    <img
                      src={inspiration.image}
                      alt={inspiration.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="size-7 sm:size-8 bg-white/90 hover:bg-white"
                      >
                        <Heart className="size-3 sm:size-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {inspiration.category}
                    </Badge>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">{inspiration.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      Saved on {inspiration.savedOn}
                    </p>
                  </div>
                </Card>
              )) : (
                <Card className="p-12 text-center">
                  <Heart className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No {inspirationFilter !== "all" ? inspirationFilter : ""} inspirations saved yet
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Browse our inspiration gallery to save ideas for your wedding
                  </p>
                </Card>
              )}
              </div>
            </div>
          )}

          {/* Gift Registry Tab */}
          {activeTab === "registry" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Gift Registry
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Create and manage your wedding gift registry
                  </p>
                </div>
                {!giftRegistryData ? (
                  <Button
                    onClick={() => setShowRegistryCreator(true)}
                    className="bg-[#DF6951] hover:bg-[#c5573d] gap-2 w-full sm:w-auto shrink-0"
                    size="sm"
                  >
                    <Plus className="size-4" />
                    <span className="hidden sm:inline">Create Registry</span>
                    <span className="sm:hidden">Create</span>
                  </Button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      onClick={() => setShowRegistryEditor(true)}
                      className="bg-[#DF6951] hover:bg-[#c5573d] gap-2 flex-1 sm:flex-none"
                      size="sm"
                    >
                      <Edit className="size-4" />
                      <span className="hidden sm:inline">Edit Registry</span>
                      <span className="sm:hidden">Edit</span>
                    </Button>
                    <Button
                      onClick={() => setShowPublicRegistry(true)}
                      variant="outline"
                      className="gap-2 flex-1 sm:flex-none"
                      size="sm"
                    >
                      <Eye className="size-4" />
                      Preview
                    </Button>
                  </div>
                )}
              </div>

              {giftRegistryData ? (
                <>
                  {/* Registry Card */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl mb-1 break-words" style={{ fontFamily: "Volkhov, serif" }}>
                          {giftRegistryData.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Created on {giftRegistryData.createdDate}
                        </p>
                      </div>
                      <Badge className="bg-[#DF6951] shrink-0">
                        <Gift className="size-3 mr-1" />
                        Active
                      </Badge>
                    </div>

                    {/* Registry Link */}
                    <div className="mb-6 p-3 sm:p-4 bg-white rounded-lg border">
                      <Label className="text-xs sm:text-sm text-muted-foreground mb-2 block">
                        Gift Registry Link
                      </Label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          readOnly
                          value={giftRegistryData.registryLink}
                          className="flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-md bg-gray-50 min-w-0"
                        />
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(giftRegistryData.registryLink);
                                toast.success("Link copied to clipboard!");
                              } catch (error) {
                                toast.success(`Link: ${giftRegistryData.registryLink}`);
                              }
                            }}
                            className="gap-2 flex-1 sm:flex-none"
                          >
                            <Copy className="size-4" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowPublicRegistry(true)}
                            className="gap-2 flex-1 sm:flex-none"
                          >
                            <ExternalLink className="size-4" />
                            Open
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Registry Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <Gift className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-blue-600" />
                        <p className="text-lg sm:text-xl md:text-2xl">{giftRegistryData.totalItems}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Total Items</p>
                      </div>
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <Package className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-green-600" />
                        <p className="text-lg sm:text-xl md:text-2xl">{giftRegistryData.purchasedItems}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Purchased</p>
                      </div>
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <ShoppingCart className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-purple-600" />
                        <p className="text-lg sm:text-xl md:text-2xl">{giftRegistryData.totalItems - giftRegistryData.purchasedItems}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Available</p>
                      </div>
                      <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border">
                        <DollarSign className="size-5 sm:size-6 md:size-8 mx-auto mb-1 sm:mb-2 text-[#DF6951]" />
                        <p className="text-lg sm:text-xl md:text-2xl">${giftRegistryData.totalValue}</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Total Value</p>
                      </div>
                    </div>
                  </Card>

                  {/* Honeymoon Fund Progress */}
                  {giftRegistryData.allowCashGifts && giftRegistryData.honeymoonFundGoal > 0 && (
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 sm:size-12 bg-[#DF6951] rounded-full flex items-center justify-center shrink-0">
                          <Plane className="size-5 sm:size-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base sm:text-lg md:text-xl truncate" style={{ fontFamily: "Volkhov, serif" }}>
                            Honeymoon Fund
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            ${giftRegistryData.honeymoonFundRaised} / ${giftRegistryData.honeymoonFundGoal}
                          </p>
                        </div>
                      </div>
                      <Progress 
                        value={(giftRegistryData.honeymoonFundRaised / giftRegistryData.honeymoonFundGoal) * 100} 
                        className="h-3"
                      />
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        {Math.round((giftRegistryData.honeymoonFundRaised / giftRegistryData.honeymoonFundGoal) * 100)}% of goal reached
                      </p>
                    </Card>
                  )}

                  {/* Registry Items Preview */}
                  <Card className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <h4 className="text-lg sm:text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                        Registry Items
                      </h4>
                      <Button
                        onClick={() => setShowRegistryEditor(true)}
                        size="sm"
                        variant="outline"
                        className="gap-2 w-full sm:w-auto"
                      >
                        <Edit className="size-4" />
                        <span className="hidden sm:inline">Manage Items</span>
                        <span className="sm:hidden">Manage</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {giftRegistryData.items.slice(0, 6).map((item: any) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="relative aspect-video">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.purchased >= item.quantity && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <Badge className="bg-green-600 text-white text-xs">
                                  <CheckCircle2 className="size-3 mr-1" />
                                  Purchased
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-2 sm:p-3">
                            <h5 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-1 break-words">{item.name}</h5>
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs sm:text-sm text-[#DF6951] whitespace-nowrap">${item.price}</p>
                              <Badge variant="outline" className="text-[10px] sm:text-xs whitespace-nowrap">
                                {item.purchased}/{item.quantity}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                    {giftRegistryData.items.length > 6 && (
                      <div className="text-center mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setShowRegistryEditor(true)}
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          View All {giftRegistryData.items.length} Items
                        </Button>
                      </div>
                    )}
                  </Card>
                </>
              ) : (
                <Card className="p-6 sm:p-8 md:p-12 text-center">
                  <div className="size-16 sm:size-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Gift className="size-8 sm:size-10 text-[#DF6951]" />
                  </div>
                  <h4 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    Create Your Gift Registry
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
                    Make it easy for your guests to celebrate your special day with the perfect gifts. Create a personalized registry with items you'll love.
                  </p>
                  <Button
                    onClick={() => setShowRegistryCreator(true)}
                    className="bg-[#DF6951] hover:bg-[#c5573d] gap-2 w-full sm:w-auto"
                  >
                    <Plus className="size-4" />
                    Create Gift Registry
                  </Button>
                </Card>
              )}
            </div>
          )}
          </>
          )}{/* End Customer View */}
        </div>
      </div>

      {/* Public Wedding Page Preview */}
      {showPublicPage && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
            <h3 className="font-semibold">Wedding Page Preview</h3>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setShowPublicPage(false);
                  setShowPageEditor(true);
                }} 
                size="sm" 
                className="bg-[#DF6951] hover:bg-[#c5573d] gap-2"
              >
                <Edit className="size-4" />
                Edit Page
              </Button>
              <Button onClick={() => setShowPublicPage(false)} variant="outline" size="sm" className="gap-2">
                <X className="size-4" />
                Close Preview
              </Button>
            </div>
          </div>
          <PublicWeddingPage
            weddingId="sarah-michael-tuscany-2025"
            onBack={() => setShowPublicPage(false)}
            customData={weddingPageData}
          />
        </div>
      )}

      {/* Invitation Creator */}
      {showInvitationCreator && data.weddingPlan && (
        <WeddingInvitationCreator
          weddingPlan={data.weddingPlan}
          onClose={() => setShowInvitationCreator(false)}
          onSave={(invitationData) => {
            console.log("Invitation saved:", invitationData);
            setShowInvitationCreator(false);
            toast.success("Wedding invitation created successfully!");
          }}
        />
      )}

      {/* Share Invitation Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "Volkhov, serif" }}>
              Share Wedding Invitation
            </DialogTitle>
            <DialogDescription>
              Enter the guest's contact information. We'll generate a personalized invitation link that will pre-fill their details on the RSVP form.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Guest Full Name *</Label>
                <Input
                  id="guestName"
                  value={shareFormData.guestName}
                  onChange={(e) => setShareFormData({ ...shareFormData, guestName: e.target.value })}
                  placeholder="e.g., John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestEmail">Guest Email Address *</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={shareFormData.guestEmail}
                  onChange={(e) => setShareFormData({ ...shareFormData, guestEmail: e.target.value })}
                  placeholder="e.g., john@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestPhone">Guest Phone Number (Optional)</Label>
                <Input
                  id="guestPhone"
                  type="tel"
                  value={shareFormData.guestPhone}
                  onChange={(e) => setShareFormData({ ...shareFormData, guestPhone: e.target.value })}
                  placeholder="e.g., +1 (555) 123-4567"
                />
              </div>
            </div>

            {shareFormData.guestName && shareFormData.guestEmail && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-sm">Preview Email</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      The following personalized link will be sent to <strong>{shareFormData.guestEmail}</strong>:
                    </p>
                    <div className="p-3 bg-white rounded border text-xs break-all">
                      {data.weddingInvitation?.invitationLink}?guest={encodeURIComponent(shareFormData.guestName)}&email={encodeURIComponent(shareFormData.guestEmail)}{shareFormData.guestPhone && `&phone=${encodeURIComponent(shareFormData.guestPhone)}`}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowShareDialog(false);
                  setShareFormData({ guestName: "", guestEmail: "", guestPhone: "" });
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#DF6951] hover:bg-[#c5573d] gap-2"
                disabled={!shareFormData.guestName || !shareFormData.guestEmail}
                onClick={async () => {
                  // In a real app, this would send an email
                  const personalizedLink = `${data.weddingInvitation?.invitationLink}?guest=${encodeURIComponent(shareFormData.guestName)}&email=${encodeURIComponent(shareFormData.guestEmail)}${shareFormData.guestPhone ? `&phone=${encodeURIComponent(shareFormData.guestPhone)}` : ""}`;
                  
                  try {
                    await navigator.clipboard.writeText(personalizedLink);
                    toast.success(`Personalized invitation link copied! Ready to send to ${shareFormData.guestEmail}`);
                  } catch (error) {
                    // Fallback if clipboard API is blocked
                    toast.success(`Invitation link generated for ${shareFormData.guestEmail}. Link: ${personalizedLink}`);
                  }
                  
                  setShowShareDialog(false);
                  setShareFormData({ guestName: "", guestEmail: "", guestPhone: "" });
                }}
              >
                <Send className="size-4" />
                Generate & Copy Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gift Registry Creator Modal */}
      {showRegistryCreator && (
        <GiftRegistryCreator
          onClose={() => setShowRegistryCreator(false)}
          onSave={(registryData) => {
            const newRegistry = {
              id: "REG001",
              registryLink: "wedzway.com/registry/sarah-michael-tuscany-2025",
              ...registryData,
              items: [],
              totalItems: 0,
              purchasedItems: 0,
              totalValue: 0,
              honeymoonFundRaised: 0,
            };
            setGiftRegistryData(newRegistry);
            setShowRegistryCreator(false);
            setActiveTab("registry");
            toast.success("Gift registry created successfully!");
          }}
        />
      )}
      </div>
    </div>
  );
}

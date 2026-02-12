"use client";

import { useState } from "react";
import {
  Settings,
  Wand2,
  User,
  ChevronDown,
  Users,
  MapPin,
  Palette,
  Briefcase,
  Building2,
  Plane,
  FileText,
  Crown,
  Globe,
  Menu,
  X,
  ShoppingBag,
  Camera,
  Hotel,
  Mail,
  FileSpreadsheet,
  LogIn,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface TravelNavProps {
  onNavigate?: (
    page:
      | "home"
      | "landing"
      | "venues"
      | "destinations"
      | "inspirations"
      | "planners"
      | "vendors"
      | "tours"
      | "visa-services"
      | "builder"
      | "expenses"
      | "marketplace"
      | "account"
      | "concierge"
      | "email-templates"
      | "venue-brochure"
      | "providers"
      | "brand-guidelines"
      | "blog"
      | "venue-preview"
      | "sorted"
      | "auth"
      | "register",
  ) => void;
  currentPage?:
    | "home"
    | "landing"
    | "venues"
    | "destinations"
    | "inspirations"
    | "planners"
    | "vendors"
    | "tours"
    | "visa-services"
    | "builder"
    | "expenses"
    | "marketplace"
    | "account"
    | "concierge"
    | "email-templates"
    | "venue-brochure"
    | "providers"
    | "brand-guidelines"
    | "blog"
    | "venue-preview"
    | "sorted"
    | "auth"
    | "register";
}

export function TravelNav({
  onNavigate,
  currentPage = "home",
}: TravelNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: TravelNavProps["currentPage"]) => {
    setMobileMenuOpen(false);
    onNavigate?.(page as any);
  };

  // Check if we're on the account page
  const isAccountPage = currentPage === "account";

  // Handle logout
  const handleLogout = () => {
    handleNavigate("home");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div
        className={`mx-auto px-4 md:px-8 py-4 flex items-center ${isAccountPage ? "justify-between" : "justify-between"}`}
        style={{ maxWidth: isAccountPage ? "none" : "1280px" }}
      >
        {/* Logo - Left aligned with sidebar on account page */}
        <div
          style={{
            width: isAccountPage ? "256px" : "auto",
            paddingLeft: isAccountPage ? "16px" : "0",
          }}
        >
          <button
            onClick={() => handleNavigate("home")}
            className="text-2xl cursor-pointer hover:opacity-80 transition-opacity"
            style={{ fontFamily: "serif" }}
          >
            Wedzway
          </button>
        </div>

        {/* Desktop Navigation - Hidden on account page */}
        {!isAccountPage && (
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNavigate("home")}
              className={`transition-colors ${
                currentPage === "home"
                  ? "text-[#DF6951]"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("destinations")}
              className={`transition-colors cursor-pointer ${
                currentPage === "destinations"
                  ? "text-[#DF6951]"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Destinations
            </button>
            <button
              onClick={() => handleNavigate("sorted")}
              className={`transition-colors ${
                currentPage === "sorted"
                  ? "text-[#DF6951]"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Sorted by Wedzway
            </button>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors">
                Services <ChevronDown className="size-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => handleNavigate("providers")}>
                  <Building2 className="size-4 mr-2 text-[#DF6951]" />
                  Premium Providers
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate("venues")}>
                  <Hotel className="size-4 mr-2 text-[#DF6951]" />
                  Venues
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("vendors")}>
                  <Briefcase className="size-4 mr-2 text-[#DF6951]" />
                  Vendors
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("planners")}>
                  <Users className="size-4 mr-2 text-[#DF6951]" />
                  Planners
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate("tours")}>
                  <MapPin className="size-4 mr-2 text-[#DF6951]" />
                  Tours
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigate("visa-services")}
                >
                  <Plane className="size-4 mr-2 text-[#DF6951]" />
                  Visa + Flights
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => handleNavigate("inspirations")}
              className={`transition-colors ${
                currentPage === "inspirations"
                  ? "text-[#DF6951]"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Inspirations
            </button>
            <button
              onClick={() => handleNavigate("blog")}
              className={`transition-colors ${
                currentPage === "blog"
                  ? "text-[#DF6951]"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => handleNavigate("marketplace")}
              className={`transition-colors ${
                currentPage === "marketplace"
                  ? "text-[#DF6951]"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => handleNavigate("concierge")}
              className={`transition-colors flex items-center gap-1 ${
                currentPage === "concierge"
                  ? "text-[#DF6951]"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              <Crown className="size-4" />
              Concierge
            </button>
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Show only Logout on account page */}
          {isAccountPage ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogIn className="size-4" />
              Logout
            </Button>
          ) : (
            <>
              {/* Wedding Builder Dropdown - Desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 hidden lg:flex">
                    <Wand2 className="size-4 text-[#DF6951]" />
                    Plan Wedding
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => handleNavigate("builder")}>
                    <Wand2 className="size-4 mr-2" />
                    Start Wedding Builder
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavigate("concierge")}
                    className="bg-gradient-to-r from-amber-50 to-orange-50"
                  >
                    <Crown className="size-4 mr-2 text-[#DF6951]" />
                    <div>
                      <div className="font-medium">Concierge Service</div>
                      <div className="text-xs text-muted-foreground">
                        Premium planning support
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    Builder Steps:
                  </div>
                  <DropdownMenuItem onClick={() => handleNavigate("builder")}>
                    <Users className="size-4 mr-2 text-[#DF6951]" />
                    Event Basics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("builder")}>
                    <MapPin className="size-4 mr-2 text-[#DF6951]" />
                    Destination
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("builder")}>
                    <Palette className="size-4 mr-2 text-[#DF6951]" />
                    Moodboard & Design
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("builder")}>
                    <Briefcase className="size-4 mr-2 text-[#DF6951]" />
                    Vendors
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("builder")}>
                    <Building2 className="size-4 mr-2 text-[#DF6951]" />
                    Venue Selection
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("builder")}>
                    <Plane className="size-4 mr-2 text-[#DF6951]" />
                    Travel Planning
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("builder")}>
                    <FileText className="size-4 mr-2 text-[#DF6951]" />
                    Visa & Documents
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Account Dropdown - Desktop & Mobile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted"
                    title="My Account"
                  >
                    <User className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => handleNavigate("auth")}
                    className="bg-gradient-to-r from-orange-50 to-amber-50"
                  >
                    <LogIn className="size-4 mr-2 text-[#DF6951]" />
                    <div>
                      <div className="font-medium">Login / Register</div>
                      <div className="text-xs text-muted-foreground">
                        Sign in with OTP
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigate("account")}>
                    <User className="size-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("account")}>
                    <Wand2 className="size-4 mr-2" />
                    My Wedding Plan
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("home")}>
                    <FileText className="size-4 mr-2" />
                    Pitch Deck
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigate("account")}>
                    <Building2 className="size-4 mr-2" />
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("expenses")}>
                    <Settings className="size-4 mr-2" />
                    Expenses & Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleNavigate("email-templates")}
                  >
                    <Mail className="size-4 mr-2 text-[#DF6951]" />
                    Email Templates
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavigate("venue-brochure")}
                  >
                    <FileSpreadsheet className="size-4 mr-2 text-[#024023]" />
                    Venue Brochure
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavigate("brand-guidelines")}
                  >
                    <Palette className="size-4 mr-2 text-[#02542D]" />
                    Brand Guidelines
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavigate("venue-preview")}
                  >
                    <Hotel className="size-4 mr-2 text-[#DF6951]" />
                    Venue Details Preview
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigate("providers")}>
                    <Building2 className="size-4 mr-2 text-[#DF6951]" />
                    Premium Providers
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle
                      className="text-left"
                      style={{ fontFamily: "serif" }}
                    >
                      Wedzway Menu
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {/* Primary Actions */}
                    <Button
                      onClick={() => handleNavigate("builder")}
                      className="w-full gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                    >
                      <Wand2 className="size-4" />
                      Plan Your Wedding
                    </Button>

                    <Button
                      onClick={() => handleNavigate("concierge")}
                      variant="outline"
                      className="w-full gap-2 border-[#DF6951] text-[#DF6951]"
                    >
                      <Crown className="size-4" />
                      Concierge Service
                    </Button>

                    {/* Navigation Links */}
                    <div className="mt-4 border-t pt-4 flex flex-col gap-2">
                      <button
                        onClick={() => handleNavigate("home")}
                        className={`text-left px-4 py-2 rounded-md transition-colors ${
                          currentPage === "home"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        Home
                      </button>
                      <button
                        onClick={() => handleNavigate("destinations")}
                        className={`text-left px-4 py-2 rounded-md transition-colors ${
                          currentPage === "destinations"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        Destinations
                      </button>
                      <button
                        onClick={() => handleNavigate("sorted")}
                        className={`text-left px-4 py-2 rounded-md transition-colors ${
                          currentPage === "sorted"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        Sorted by Wedzway
                      </button>

                      <div className="px-4 py-2 text-xs text-muted-foreground">
                        Services
                      </div>
                      <button
                        onClick={() => handleNavigate("providers")}
                        className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          currentPage === "providers"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Building2 className="size-4" />
                        Premium Providers
                      </button>
                      <button
                        onClick={() => handleNavigate("venues")}
                        className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          currentPage === "venues"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Hotel className="size-4" />
                        Venues
                      </button>
                      <button
                        onClick={() => handleNavigate("vendors")}
                        className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          currentPage === "vendors"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Briefcase className="size-4" />
                        Vendors
                      </button>
                      <button
                        onClick={() => handleNavigate("planners")}
                        className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          currentPage === "planners"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Users className="size-4" />
                        Planners
                      </button>
                      <button
                        onClick={() => handleNavigate("tours")}
                        className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          currentPage === "tours"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        <MapPin className="size-4" />
                        Tours
                      </button>
                      <button
                        onClick={() => handleNavigate("visa-services")}
                        className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          currentPage === "visa-services"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Plane className="size-4" />
                        Visa + Flights
                      </button>

                      <div className="border-t my-2"></div>

                      <button
                        onClick={() => handleNavigate("inspirations")}
                        className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          currentPage === "inspirations"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Camera className="size-4" />
                        Inspirations
                      </button>
                      <button
                        onClick={() => handleNavigate("marketplace")}
                        className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          currentPage === "marketplace"
                            ? "bg-[#DF6951]/10 text-[#DF6951]"
                            : "hover:bg-muted"
                        }`}
                      >
                        <ShoppingBag className="size-4" />
                        Marketplace
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

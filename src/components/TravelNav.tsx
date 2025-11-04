"use client";

import { useState } from "react";
import { Settings, Wand2, User, ChevronDown, Users, MapPin, Palette, Briefcase, Building2, Plane, FileText, Crown, Globe, Menu, X, ShoppingBag, Camera, Hotel, Mail, FileSpreadsheet } from "lucide-react";
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
import { useCurrency } from "./CurrencyContext";

interface TravelNavProps {
  onNavigate?: (page: 'home' | 'landing' | 'venues' | 'destinations' | 'inspirations' | 'planners' | 'vendors' | 'tours' | 'visa-services' | 'builder' | 'expenses' | 'marketplace' | 'account' | 'concierge' | 'email-templates' | 'venue-brochure' | 'providers') => void;
  currentPage?: 'home' | 'landing' | 'venues' | 'destinations' | 'inspirations' | 'planners' | 'vendors' | 'tours' | 'visa-services' | 'builder' | 'expenses' | 'marketplace' | 'account' | 'concierge' | 'email-templates' | 'venue-brochure' | 'providers';
}

export function TravelNav({ onNavigate, currentPage = 'home' }: TravelNavProps) {
  const { currency, setCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: TravelNavProps['currentPage']) => {
    setMobileMenuOpen(false);
    onNavigate?.(page as any);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavigate('home')}
          className="text-2xl cursor-pointer hover:opacity-80 transition-opacity"
          style={{ fontFamily: "serif" }}
        >
          Wedzway
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => handleNavigate('landing')}
            className={`transition-colors ${
              currentPage === 'landing' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate('home')}
            className={`transition-colors ${
              currentPage === 'home' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Pitch Deck
          </button>
          <button
            onClick={() => handleNavigate('destinations')}
            className={`transition-colors ${
              currentPage === 'destinations' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Destinations
          </button>

          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors">
              Services <ChevronDown className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => handleNavigate('providers')}>
                <Building2 className="size-4 mr-2 text-[#DF6951]" />
                Premium Providers
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigate('venues')}>
                <Hotel className="size-4 mr-2 text-[#DF6951]" />
                Venues
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('vendors')}>
                <Briefcase className="size-4 mr-2 text-[#DF6951]" />
                Vendors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('planners')}>
                <Users className="size-4 mr-2 text-[#DF6951]" />
                Planners
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigate('tours')}>
                <MapPin className="size-4 mr-2 text-[#DF6951]" />
                Tours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('visa-services')}>
                <Plane className="size-4 mr-2 text-[#DF6951]" />
                Visa + Flights
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => handleNavigate('inspirations')}
            className={`transition-colors ${
              currentPage === 'inspirations' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Inspirations
          </button>
          <button
            onClick={() => handleNavigate('marketplace')}
            className={`transition-colors ${
              currentPage === 'marketplace' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => handleNavigate('concierge')}
            className={`transition-colors flex items-center gap-1 ${
              currentPage === 'concierge' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            <Crown className="size-4" />
            Concierge
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Wedding Builder Dropdown - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="gap-2 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80 hidden lg:flex"
              >
                <Wand2 className="size-4" />
                Plan Wedding
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleNavigate('builder')}>
                <Wand2 className="size-4 mr-2" />
                Start Wedding Builder
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleNavigate('concierge')}
                className="bg-gradient-to-r from-amber-50 to-orange-50"
              >
                <Crown className="size-4 mr-2 text-[#DF6951]" />
                <div>
                  <div className="font-medium">Concierge Service</div>
                  <div className="text-xs text-muted-foreground">Premium planning support</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                Builder Steps:
              </div>
              <DropdownMenuItem onClick={() => handleNavigate('builder')}>
                <Users className="size-4 mr-2 text-[#DF6951]" />
                Event Basics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('builder')}>
                <MapPin className="size-4 mr-2 text-[#DF6951]" />
                Destination
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('builder')}>
                <Palette className="size-4 mr-2 text-[#DF6951]" />
                Moodboard & Design
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('builder')}>
                <Briefcase className="size-4 mr-2 text-[#DF6951]" />
                Vendors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('builder')}>
                <Building2 className="size-4 mr-2 text-[#DF6951]" />
                Venue Selection
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('builder')}>
                <Plane className="size-4 mr-2 text-[#DF6951]" />
                Travel Planning
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('builder')}>
                <FileText className="size-4 mr-2 text-[#DF6951]" />
                Visa & Documents
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Currency Selector - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 hidden lg:flex"
                title="Change Currency"
              >
                <Globe className="size-4" />
                {currency === "INR" ? "₹ INR" : "€ EUR"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={() => setCurrency("INR")}
                className={currency === "INR" ? "bg-muted" : ""}
              >
                <span className="mr-2">🇮🇳</span>
                <div>
                  <div className="font-medium">India (INR)</div>
                  <div className="text-xs text-muted-foreground">Indian Rupee ₹</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setCurrency("EUR")}
                className={currency === "EUR" ? "bg-muted" : ""}
              >
                <span className="mr-2">🌍</span>
                <div>
                  <div className="font-medium">International (EUR)</div>
                  <div className="text-xs text-muted-foreground">Euro €</div>
                </div>
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
              <DropdownMenuItem onClick={() => handleNavigate('account')}>
                <User className="size-4 mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('account')}>
                <Wand2 className="size-4 mr-2" />
                My Wedding Plan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigate('account')}>
                <Building2 className="size-4 mr-2" />
                My Bookings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('expenses')}>
                <Settings className="size-4 mr-2" />
                Expenses & Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigate('email-templates')}>
                <Mail className="size-4 mr-2 text-[#DF6951]" />
                Email Templates
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('venue-brochure')}>
                <FileSpreadsheet className="size-4 mr-2 text-[#024023]" />
                Venue Brochure
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigate('providers')}>
                <Building2 className="size-4 mr-2 text-[#DF6951]" />
                Premium Providers
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left" style={{ fontFamily: "serif" }}>
                  Wedzway Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {/* Primary Actions */}
                <Button 
                  onClick={() => handleNavigate('builder')}
                  className="w-full gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                >
                  <Wand2 className="size-4" />
                  Plan Your Wedding
                </Button>

                <Button 
                  onClick={() => handleNavigate('concierge')}
                  variant="outline"
                  className="w-full gap-2 border-[#DF6951] text-[#DF6951]"
                >
                  <Crown className="size-4" />
                  Concierge Service
                </Button>

                {/* Currency Selector - Mobile */}
                <div className="flex gap-2">
                  <Button 
                    variant={currency === "INR" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setCurrency("INR")}
                  >
                    🇮🇳 INR
                  </Button>
                  <Button 
                    variant={currency === "EUR" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setCurrency("EUR")}
                  >
                    🌍 EUR
                  </Button>
                </div>

                {/* Navigation Links */}
                <div className="mt-4 border-t pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => handleNavigate('landing')}
                    className={`text-left px-4 py-2 rounded-md transition-colors ${
                      currentPage === 'landing' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNavigate('home')}
                    className={`text-left px-4 py-2 rounded-md transition-colors ${
                      currentPage === 'home' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    Pitch Deck
                  </button>
                  <button
                    onClick={() => handleNavigate('destinations')}
                    className={`text-left px-4 py-2 rounded-md transition-colors ${
                      currentPage === 'destinations' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    Destinations
                  </button>

                  <div className="px-4 py-2 text-xs text-muted-foreground">
                    Services
                  </div>
                  <button
                    onClick={() => handleNavigate('providers')}
                    className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      currentPage === 'providers' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Building2 className="size-4" />
                    Premium Providers
                  </button>
                  <button
                    onClick={() => handleNavigate('venues')}
                    className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      currentPage === 'venues' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Hotel className="size-4" />
                    Venues
                  </button>
                  <button
                    onClick={() => handleNavigate('vendors')}
                    className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      currentPage === 'vendors' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Briefcase className="size-4" />
                    Vendors
                  </button>
                  <button
                    onClick={() => handleNavigate('planners')}
                    className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      currentPage === 'planners' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Users className="size-4" />
                    Planners
                  </button>
                  <button
                    onClick={() => handleNavigate('tours')}
                    className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      currentPage === 'tours' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <MapPin className="size-4" />
                    Tours
                  </button>
                  <button
                    onClick={() => handleNavigate('visa-services')}
                    className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      currentPage === 'visa-services' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Plane className="size-4" />
                    Visa + Flights
                  </button>

                  <div className="border-t my-2"></div>

                  <button
                    onClick={() => handleNavigate('inspirations')}
                    className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      currentPage === 'inspirations' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Camera className="size-4" />
                    Inspirations
                  </button>
                  <button
                    onClick={() => handleNavigate('marketplace')}
                    className={`text-left px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      currentPage === 'marketplace' 
                        ? 'bg-[#DF6951]/10 text-[#DF6951]' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <ShoppingBag className="size-4" />
                    Marketplace
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { Settings, Wand2, User, ChevronDown, Users, MapPin, Palette, Briefcase, Building2, Plane, FileText, Crown, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { useCurrency } from "./CurrencyContext";

interface TravelNavProps {
  onNavigate?: (page: 'home' | 'landing' | 'venues' | 'destinations' | 'inspirations' | 'planners' | 'vendors' | 'tours' | 'visa-services' | 'builder' | 'expenses' | 'marketplace' | 'account' | 'concierge') => void;
  currentPage?: 'home' | 'landing' | 'venues' | 'destinations' | 'inspirations' | 'planners' | 'vendors' | 'tours' | 'visa-services' | 'builder' | 'expenses' | 'marketplace' | 'account' | 'concierge';
}

export function TravelNav({ onNavigate, currentPage = 'home' }: TravelNavProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate?.('home')}
          className="text-2xl cursor-pointer hover:opacity-80 transition-opacity"
          style={{ fontFamily: "serif" }}
        >
          Wedzway
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate?.('landing')}
            className={`transition-colors ${
              currentPage === 'landing' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate?.('home')}
            className={`transition-colors ${
              currentPage === 'home' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Pitch Deck
          </button>
          <button
            onClick={() => onNavigate?.('destinations')}
            className={`transition-colors ${
              currentPage === 'destinations' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Destinations
          </button>
          <button
            onClick={() => onNavigate?.('venues')}
            className={`transition-colors ${
              currentPage === 'venues' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Venues
          </button>
          <button
            onClick={() => onNavigate?.('vendors')}
            className={`transition-colors ${
              currentPage === 'vendors' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Vendors
          </button>
          <button
            onClick={() => onNavigate?.('planners')}
            className={`transition-colors ${
              currentPage === 'planners' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Planners
          </button>
          <button
            onClick={() => onNavigate?.('inspirations')}
            className={`transition-colors ${
              currentPage === 'inspirations' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Inspirations
          </button>
          <button
            onClick={() => onNavigate?.('tours')}
            className={`transition-colors ${
              currentPage === 'tours' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Tours
          </button>
          <button
            onClick={() => onNavigate?.('visa-services')}
            className={`transition-colors ${
              currentPage === 'visa-services' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Visa + Flights
          </button>
          <button
            onClick={() => onNavigate?.('marketplace')}
            className={`transition-colors ${
              currentPage === 'marketplace' 
                ? 'text-[#DF6951]' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => onNavigate?.('concierge')}
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

        <div className="flex items-center gap-3">
          {/* Wedding Builder Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501] hidden md:flex"
              >
                <Wand2 className="size-4" />
                Plan Wedding
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => onNavigate?.('builder')}>
                <Wand2 className="size-4 mr-2" />
                Start Wedding Builder
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onNavigate?.('concierge')}
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
              <DropdownMenuItem onClick={() => onNavigate?.('builder')}>
                <Users className="size-4 mr-2 text-[#DF6951]" />
                Event Basics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('builder')}>
                <MapPin className="size-4 mr-2 text-[#DF6951]" />
                Destination
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('builder')}>
                <Palette className="size-4 mr-2 text-[#DF6951]" />
                Moodboard & Design
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('builder')}>
                <Briefcase className="size-4 mr-2 text-[#DF6951]" />
                Vendors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('builder')}>
                <Building2 className="size-4 mr-2 text-[#DF6951]" />
                Venue Selection
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('builder')}>
                <Plane className="size-4 mr-2 text-[#DF6951]" />
                Travel Planning
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('builder')}>
                <FileText className="size-4 mr-2 text-[#DF6951]" />
                Visa & Documents
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Currency Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 hidden md:flex"
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

          {/* Account Dropdown */}
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
              <DropdownMenuItem onClick={() => onNavigate?.('account')}>
                <User className="size-4 mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('account')}>
                <Wand2 className="size-4 mr-2" />
                My Wedding Plan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate?.('account')}>
                <Building2 className="size-4 mr-2" />
                My Bookings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('account')}>
                <Settings className="size-4 mr-2" />
                Account Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-muted"
            onClick={() => onNavigate?.('expenses')}
            title="Expenses"
          >
            <Settings className="size-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

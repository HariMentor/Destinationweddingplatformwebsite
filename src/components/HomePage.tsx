"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Users,
  Calendar,
  Search,
  ArrowRight,
  Star,
  Heart,
  BadgeCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Shield,
  Clock,
  CheckCircle2,
  Globe,
  Palette,
  Camera,
  Utensils,
  Home as HomeIcon,
  FileCheck,
  Plane,
  UserCheck,
  Ticket,
  HandHeart,
  MapPinCheck,
  Play,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { VenueCarousel } from "./VenueCarousel";
import { HighlightedDestinationsCarousel } from "./HighlightedDestinationsCarousel";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const countryWeddingData = {
  Norway: {
    description: "Experience magical Arctic weddings under the Northern Lights. Our tours immerse you in Norway's fjords, mountains, and coastal beauty with guided luxury wedding experiences.",
    venues: [
      {
        name: "Fjord Palace Hotel",
        description: "Nestled between majestic fjords and mountain peaks",
        image: "https://images.unsplash.com/photo-1721305485635-13f5100711e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBmam9yZCUyMHdlZGRpbmclMjB2ZW51ZXxlbnwxfHx8fDE3Njg1NzM0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Bergen, Norway",
        tags: ["Fjord Views", "Mountains", "Northern Lights", "Arctic"],
        rating: 4.9,
        reviews: 1450,
        priceFrom: "$48,000",
        slotsLeft: 3,
        tripType: "Open Trip",
        dates: "10-12 June",
        duration: "88.00"
      },
      {
        name: "Arctic Ice Hotel",
        description: "Unique ice chapel under the Aurora Borealis",
        image: "https://images.unsplash.com/photo-1696400594814-5c794a036bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBpY2UlMjBob3RlbCUyMHdlZGRpbmd8ZW58MXx8fHwxNzY4NTczNDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Tromsø, Norway",
        tags: ["Ice Hotel", "Aurora", "Unique", "Winter"],
        rating: 4.8,
        reviews: 980,
        priceFrom: "$52,000",
        slotsLeft: 2,
        tripType: "Private",
        dates: "15-17 June",
        duration: "105.00"
      },
      {
        name: "Coastal Lighthouse Resort",
        description: "Historic lighthouse with dramatic ocean views",
        image: "https://images.unsplash.com/photo-1767211664513-cb3620ec5af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBsaWdodGhvdXNlJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2ODU3MzQ3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Lofoten, Norway",
        tags: ["Coastal", "Lighthouse", "Scenic", "Remote"],
        rating: 4.7,
        reviews: 1120,
        priceFrom: "$44,000",
        slotsLeft: 6,
        tripType: "Open Trip",
        dates: "20-22 June",
        duration: "78.50"
      }
    ],
    destinations: [
      {
        name: "Bergen",
        location: "Western Norway",
        image: "https://images.unsplash.com/photo-1744716069978-7983e3eab787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBiZXJnZW4lMjBmam9yZHxlbnwxfHx8fDE3NjkwODYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$42,000",
        venues: 45
      },
      {
        name: "Tromsø",
        location: "Northern Norway",
        image: "https://images.unsplash.com/photo-1458970412976-755bf0c62f56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjB0cm9tc28lMjBub3J0aGVybiUyMGxpZ2h0c3xlbnwxfHx8fDE3NjkwODYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$48,000",
        venues: 32
      },
      {
        name: "Lofoten Islands",
        location: "Nordland, Norway",
        image: "https://images.unsplash.com/photo-1656490247857-cfad59341c33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBsb2ZvdGVuJTIwaXNsYW5kc3xlbnwxfHx8fDE3NjkwODYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$45,000",
        venues: 28
      }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=80",
        alt: "Norway Mountain Wedding",
        tag: "#Northern lights"
      },
      {
        src: "https://images.unsplash.com/photo-1601439678777-b2d6d1e5b5d5?w=1080&q=80",
        alt: "Norway Fjord Ceremony",
        tag: "#Fjord views"
      },
      {
        src: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1080&q=80",
        alt: "Arctic Wedding Adventure",
        tag: "#Arctic romance"
      }
    ]
  },
  India: {
    description: "Our tours immerse you in the beauty of the world's most stunning destinations. Enjoy your time with our choice of guided wedding experiences.",
    venues: [
      {
        name: "Udaipur Palace",
        description: "Located at an altitude of breathtaking Lake Pichola",
        image: "https://images.unsplash.com/photo-1705039439212-c3130e4c62a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2ODU3MzM0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Udaipur, Rajasthan",
        tags: ["Royal Palace", "Lakeside", "Luxury", "Heritage"],
        rating: 4.9,
        reviews: 2840,
        priceFrom: "$45,000",
        slotsLeft: 4,
        tripType: "Open Trip",
        dates: "12-14 March",
        duration: "95.50"
      },
      {
        name: "Taj Lake Palace",
        description: "Floating marble palace on Lake Pichola",
        image: "https://images.unsplash.com/photo-1674229010920-ad8493dc19eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBsYWtlJTIwcGFsYWNlJTIwdWRhaXB1ciUyMHdlZGRpbmd8ZW58MXx8fHwxNzY4NTczMzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Udaipur, Rajasthan",
        tags: ["Palace", "Heritage", "Waterfront", "Iconic"],
        rating: 5.0,
        reviews: 3120,
        priceFrom: "$55,000",
        slotsLeft: 2,
        tripType: "Private",
        dates: "15-18 March",
        duration: "120.00"
      },
      {
        name: "Jaipur Royal Fort",
        description: "Historic fortress with panoramic city views",
        image: "https://images.unsplash.com/photo-1761472606347-bfebc5a3e546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBwYWxhY2UlMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzY4NTczMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Jaipur, Rajasthan",
        tags: ["Fort", "Royal", "Historic", "Majestic"],
        rating: 4.8,
        reviews: 2190,
        priceFrom: "$42,000",
        slotsLeft: 5,
        tripType: "Open Trip",
        dates: "20-22 March",
        duration: "85.00"
      }
    ],
    destinations: [
      {
        name: "Udaipur",
        location: "Rajasthan, India",
        image: "https://images.unsplash.com/photo-1622018135960-249abd263aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwbGFrZSUyMHBhbGFjZXxlbnwxfHx8fDE3NjkwODc0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$38,000",
        venues: 93
      },
      {
        name: "Jaipur",
        location: "Rajasthan, India",
        image: "https://images.unsplash.com/photo-1534758607507-754e582adfa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBhbWJlciUyMGZvcnR8ZW58MXx8fHwxNzY5MDg3NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$35,000",
        venues: 112
      },
      {
        name: "Goa",
        location: "Goa, India",
        image: "https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGluZGlhfGVufDF8fHx8MTc2OTA2NzA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$28,000",
        venues: 85
      },
      {
        name: "Kerala",
        location: "Kerala, India",
        image: "https://images.unsplash.com/photo-1694783079572-eaeff4bee78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaW5kaWF8ZW58MXx8fHwxNzY4OTc0OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$32,000",
        venues: 67
      }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1732454840262-32fbebecda59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGdsYW1waW5nJTIwZG9tZSUyMHBvZHN8ZW58MXx8fHwxNzY4NTY1MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Luxury Wedding Venue",
        tag: "#Awesome venu"
      },
      {
        src: "https://images.unsplash.com/photo-1752160024890-60e32e21d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHdlZGRpbmclMjBkcmVzcyUyMHN3aW5nfGVufDF8fHx8MTc2ODU2NDk4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Wedding Photography",
        tag: "#Couple friendly"
      },
      {
        src: "https://images.unsplash.com/photo-1748444434189-8ddc72e30d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0aW5hdGlvbiUyMHdlZGRpbmclMjBjb3VwbGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY4NTY0OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Destination Wedding",
        tag: "#Adventure"
      }
    ]
  },
  Italy: {
    description: "Celebrate love in Italy's timeless romance. From Tuscan vineyards to coastal Amalfi, our curated wedding experiences blend Italian elegance with unforgettable moments.",
    venues: [
      {
        name: "Villa Tuscany",
        description: "Surrounded by rolling vineyards and cypress trees",
        image: "https://images.unsplash.com/photo-1760681543363-0cd6f4ad8675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwdmlsbGElMjB3ZWRkaW5nfGVufDF8fHx8MTc2ODU3MzQ3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Tuscany, Italy",
        tags: ["Vineyard", "Villa", "Countryside", "Romantic"],
        rating: 4.8,
        reviews: 1920,
        priceFrom: "$38,000",
        slotsLeft: 5,
        tripType: "Open Trip",
        dates: "5-7 May",
        duration: "72.00"
      },
      {
        name: "Amalfi Coast Castle",
        description: "Cliffside castle overlooking the Mediterranean",
        image: "https://images.unsplash.com/photo-1718703358468-d17fa310e090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWFsZmklMjBjb2FzdCUyMHdlZGRpbmclMjBjYXN0bGV8ZW58MXx8fHwxNzY4NTczNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Amalfi, Italy",
        tags: ["Castle", "Coastal", "Sea Views", "Elegant"],
        rating: 5.0,
        reviews: 2450,
        priceFrom: "$50,000",
        slotsLeft: 3,
        tripType: "Private",
        dates: "10-13 May",
        duration: "98.00"
      },
      {
        name: "Lake Como Villa",
        description: "Historic villa on the shores of Lake Como",
        image: "https://images.unsplash.com/photo-1620832716180-133fca7597aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwY29tbyUyMHdlZGRpbmclMjB2aWxsYXxlbnwxfHx8fDE3Njg1NzM0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Como, Italy",
        tags: ["Lakeside", "Villa", "Historic", "Mountain"],
        rating: 4.9,
        reviews: 2280,
        priceFrom: "$46,000",
        slotsLeft: 4,
        tripType: "Open Trip",
        dates: "15-17 May",
        duration: "88.50"
      }
    ],
    destinations: [
      {
        name: "Tuscany",
        location: "Tuscany, Italy",
        image: "https://images.unsplash.com/photo-1655370979813-51600e6ea395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwdmluZXlhcmQlMjBpdGFseXxlbnwxfHx8fDE3NjkwODc0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$35,000",
        venues: 67
      },
      {
        name: "Amalfi Coast",
        location: "Campania, Italy",
        image: "https://images.unsplash.com/photo-1583844056361-4418a8f2a985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWFsZmklMjBjb2FzdCUyMGl0YWx5fGVufDF8fHx8MTc2OTA3MDA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$48,000",
        venues: 54
      },
      {
        name: "Lake Como",
        location: "Lombardy, Italy",
        image: "https://images.unsplash.com/photo-1589340819076-7d3490f70ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwY29tbyUyMGl0YWx5fGVufDF8fHx8MTc2OTA4NjE4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$42,000",
        venues: 61
      }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1080&q=80",
        alt: "Tuscany Villa Wedding",
        tag: "#Italian charm"
      },
      {
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1080&q=80",
        alt: "Amalfi Coast Wedding",
        tag: "#Coastal elegance"
      },
      {
        src: "https://images.unsplash.com/photo-1520587162488-c90e3f16a52a?w=1080&q=80",
        alt: "Italian Vineyard",
        tag: "#Vineyard romance"
      }
    ]
  },
  Greece: {
    description: "Say 'I do' on stunning Greek islands where white-washed villages meet azure seas. Our luxury wedding tours bring together ancient culture and breathtaking Mediterranean beauty.",
    venues: [
      {
        name: "Santorini Caldera Resort",
        description: "Perched on cliffs overlooking the Aegean Sea",
        image: "https://images.unsplash.com/photo-1719917522404-37c1e8dea3e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB3ZWRkaW5nJTIwdmVudWUlMjBjYWxkZXJhfGVufDF8fHx8MTc2ODU3MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Santorini, Greece",
        tags: ["Cliffside", "Sea Views", "Sunset", "Island"],
        rating: 5.0,
        reviews: 3250,
        priceFrom: "$52,000",
        slotsLeft: 2,
        tripType: "Private",
        dates: "8-10 July",
        duration: "110.00"
      },
      {
        name: "Mykonos Beach Villa",
        description: "Private beachfront estate with Cycladic charm",
        image: "https://images.unsplash.com/photo-1696526000695-fbb93d733baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteWtvbm9zJTIwYmVhY2glMjB3ZWRkaW5nJTIwdmlsbGF8ZW58MXx8fHwxNzY4NTczNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Mykonos, Greece",
        tags: ["Beach", "Villa", "Private", "Luxury"],
        rating: 4.9,
        reviews: 2890,
        priceFrom: "$48,000",
        slotsLeft: 4,
        tripType: "Open Trip",
        dates: "12-14 July",
        duration: "92.00"
      },
      {
        name: "Crete Ancient Palace",
        description: "Restored palace with Minoan heritage",
        image: "https://images.unsplash.com/photo-1660080909263-b8dc3ceea73c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmV0ZSUyMGdyZWVjZSUyMHBhbGFjZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzY4NTczNDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Crete, Greece",
        tags: ["Palace", "Ancient", "Heritage", "Garden"],
        rating: 4.8,
        reviews: 1650,
        priceFrom: "$42,000",
        slotsLeft: 6,
        tripType: "Open Trip",
        dates: "18-20 July",
        duration: "80.00"
      }
    ],
    destinations: [
      {
        name: "Santorini",
        location: "Cyclades, Greece",
        image: "https://images.unsplash.com/photo-1676730056228-7e38cbb88edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzY5MDQyNDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$48,000",
        venues: 78
      },
      {
        name: "Mykonos",
        location: "Cyclades, Greece",
        image: "https://images.unsplash.com/photo-1695441396429-0c53cf57c29b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteWtvbm9zJTIwZ3JlZWNlJTIwaXNsYW5kfGVufDF8fHx8MTc2OTA4NjE4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$42,000",
        venues: 92
      },
      {
        name: "Athens",
        location: "Attica, Greece",
        image: "https://images.unsplash.com/photo-1664111943859-fb9637c97723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhlbnMlMjBhY3JvcG9saXMlMjBncmVlY2V8ZW58MXx8fHwxNzY5MDI5MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$38,000",
        venues: 65
      }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1080&q=80",
        alt: "Santorini Wedding",
        tag: "#Sunset bliss"
      },
      {
        src: "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=1080&q=80",
        alt: "Greek Island Ceremony",
        tag: "#Island paradise"
      },
      {
        src: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1080&q=80",
        alt: "Aegean Romance",
        tag: "#Mediterranean"
      }
    ]
  },
  Bali: {
    description: "Experience tropical paradise weddings in Bali's enchanting landscapes. Our guided experiences showcase hidden temples, pristine beaches, and lush jungle venues for your perfect day.",
    venues: [
      {
        name: "Ubud Jungle Resort",
        description: "Hidden in emerald rice terraces and tropical rainforest",
        image: "https://images.unsplash.com/photo-1525495976872-a7ca1b4478e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1YnVkJTIwYmFsaSUyMGp1bmdsZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzY4NTczNDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Ubud, Bali",
        tags: ["Jungle", "Rice Terrace", "Tropical", "Temple"],
        rating: 4.7,
        reviews: 1580,
        priceFrom: "$32,000",
        slotsLeft: 7,
        tripType: "Open Trip",
        dates: "22-24 April",
        duration: "65.00"
      },
      {
        name: "Seminyak Beach Club",
        description: "Modern beachfront venue with ocean sunsets",
        image: "https://images.unsplash.com/photo-1766104801589-50b058c6e4d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pbnlhayUyMGJlYWNoJTIwY2x1YiUyMHdlZGRpbmd8ZW58MXx8fHwxNzY4NTczNDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Seminyak, Bali",
        tags: ["Beach", "Modern", "Sunset", "Club"],
        rating: 4.8,
        reviews: 2140,
        priceFrom: "$36,000",
        slotsLeft: 5,
        tripType: "Open Trip",
        dates: "26-28 April",
        duration: "70.00"
      },
      {
        name: "Uluwatu Cliff Temple",
        description: "Dramatic clifftop temple above Indian Ocean",
        image: "https://images.unsplash.com/photo-1764380753274-6a159411d278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bHV3YXR1JTIwY2xpZmYlMjB0ZW1wbGUlMjB3ZWRkaW5nfGVufDF8fHx8MTc2ODU3MzQ3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Uluwatu, Bali",
        tags: ["Cliff", "Temple", "Ocean", "Dramatic"],
        rating: 4.9,
        reviews: 1890,
        priceFrom: "$40,000",
        slotsLeft: 3,
        tripType: "Private",
        dates: "30 April-2 May",
        duration: "82.50"
      }
    ],
    destinations: [
      {
        name: "Ubud",
        location: "Gianyar, Bali",
        image: "https://images.unsplash.com/photo-1554689021-c9e70753d301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1YnVkJTIwcmljZSUyMHRlcnJhY2VzfGVufDF8fHx8MTc2OTA4NzQzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$28,000",
        venues: 56
      },
      {
        name: "Seminyak",
        location: "Badung, Bali",
        image: "https://images.unsplash.com/photo-1717501787981-d5f28eb2df5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pbnlhayUyMGJlYWNoJTIwYmFsaXxlbnwxfHx8fDE3NjkwODc0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$32,000",
        venues: 73
      },
      {
        name: "Uluwatu",
        location: "Badung, Bali",
        image: "https://images.unsplash.com/photo-1604842937136-1648761a6256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bHV3YXR1JTIwdGVtcGxlJTIwYmFsaXxlbnwxfHx8fDE3NjkwODc0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$35,000",
        venues: 48
      }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1080&q=80",
        alt: "Bali Beach Wedding",
        tag: "#Tropical bliss"
      },
      {
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1080&q=80",
        alt: "Temple Ceremony",
        tag: "#Sacred beauty"
      },
      {
        src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1080&q=80",
        alt: "Jungle Romance",
        tag: "#Nature magic"
      }
    ]
  },
  Thailand: {
    description: "Discover exotic Thai wedding destinations from pristine islands to golden temples. Our luxury tours combine traditional Thai hospitality with world-class wedding venues.",
    venues: [
      {
        name: "Phuket Beachfront Resort",
        description: "Where white sands meet turquoise Andaman waters",
        image: "https://images.unsplash.com/photo-1554481923-4afb11ba0bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjBiZWFjaCUyMHdlZGRpbmclMjByZXNvcnR8ZW58MXx8fHwxNzY4NTczNDc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Phuket, Thailand",
        tags: ["Beach", "Resort", "Tropical", "Luxury"],
        rating: 4.8,
        reviews: 1750,
        priceFrom: "$35,000",
        slotsLeft: 6,
        tripType: "Open Trip",
        dates: "1-3 June",
        duration: "68.00"
      },
      {
        name: "Koh Samui Villa",
        description: "Private beachfront villa with palm-fringed shores",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1080&q=80",
        location: "Koh Samui, Thailand",
        tags: ["Villa", "Private", "Beach", "Island"],
        rating: 4.7,
        reviews: 1420,
        priceFrom: "$38,000",
        slotsLeft: 4,
        tripType: "Private",
        dates: "5-7 June",
        duration: "75.00"
      },
      {
        name: "Bangkok Temple Garden",
        description: "Traditional Thai temple with lush gardens",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1080&q=80",
        location: "Bangkok, Thailand",
        tags: ["Temple", "Garden", "Traditional", "Cultural"],
        rating: 4.6,
        reviews: 980,
        priceFrom: "$28,000",
        slotsLeft: 8,
        tripType: "Open Trip",
        dates: "10-12 June",
        duration: "62.00"
      }
    ],
    destinations: [
      {
        name: "Phuket",
        location: "Phuket, Thailand",
        image: "https://images.unsplash.com/photo-1704549931312-432d26dd53c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjBiZWFjaCUyMHRoYWlsYW5kfGVufDF8fHx8MTc2OTA0NTAwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$32,000",
        venues: 124
      },
      {
        name: "Bangkok",
        location: "Bangkok, Thailand",
        image: "https://images.unsplash.com/photo-1677127307966-e3db82b1b935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlJTIwdGhhaWxhbmR8ZW58MXx8fHwxNzY5MDg3NDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$25,000",
        venues: 156
      },
      {
        name: "Krabi",
        location: "Krabi, Thailand",
        image: "https://images.unsplash.com/photo-1659688536182-a88752abfd34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmFiaSUyMHRoYWlsYW5kJTIwYmVhY2h8ZW58MXx8fHwxNzY5MDg2MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$30,000",
        venues: 89
      },
      {
        name: "Chiang Mai",
        location: "Chiang Mai, Thailand",
        image: "https://images.unsplash.com/photo-1599576838688-8a6c11263108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlhbmclMjBtYWklMjB0aGFpbGFuZHxlbnwxfHx8fDE3NjkwODYxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$28,000",
        venues: 76
      }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1080&q=80",
        alt: "Thailand Beach Wedding",
        tag: "#Island dreams"
      },
      {
        src: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1080&q=80",
        alt: "Thai Temple Blessing",
        tag: "#Cultural magic"
      },
      {
        src: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=1080&q=80",
        alt: "Tropical Paradise",
        tag: "#Beach romance"
      }
    ]
  },
  France: {
    description: "Celebrate amour in the City of Light and beyond. From Parisian châteaux to lavender fields of Provence, our French wedding experiences embody timeless romance.",
    venues: [
      {
        name: "Château de Versailles",
        description: "Historic grandeur in the heart of French royalty",
        image: "https://images.unsplash.com/photo-1748126914257-9f4e2d81d76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBjaGF0ZWF1JTIwd2VkZGluZyUyMHZlcnNhaWxsZXN8ZW58MXx8fHwxNzY4NTczNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Versailles, France",
        tags: ["Château", "Royal", "Historic", "Grand"],
        rating: 5.0,
        reviews: 2850,
        priceFrom: "$58,000",
        slotsLeft: 2,
        tripType: "Private",
        dates: "18-20 August",
        duration: "115.00"
      },
      {
        name: "Provence Lavender Estate",
        description: "Romantic estate amid lavender fields",
        image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1080&q=80",
        location: "Provence, France",
        tags: ["Lavender", "Countryside", "Estate", "Romantic"],
        rating: 4.9,
        reviews: 1980,
        priceFrom: "$42,000",
        slotsLeft: 5,
        tripType: "Open Trip",
        dates: "22-24 August",
        duration: "82.00"
      },
      {
        name: "French Riviera Villa",
        description: "Elegant seaside villa on the Côte d'Azur",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1080&q=80",
        location: "Nice, France",
        tags: ["Riviera", "Villa", "Seaside", "Luxury"],
        rating: 4.8,
        reviews: 2140,
        priceFrom: "$52,000",
        slotsLeft: 3,
        tripType: "Open Trip",
        dates: "25-27 August",
        duration: "95.00"
      }
    ],
    destinations: [
      {
        name: "Paris",
        location: "Île-de-France, France",
        image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2ODk3NjcxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$52,000",
        venues: 142
      },
      {
        name: "Provence",
        location: "Provence, France",
        image: "https://images.unsplash.com/photo-1662486717731-293f2b6ebfa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm92ZW5jZSUyMGxhdmVuZGVyJTIwZnJhbmNlfGVufDF8fHx8MTc2OTA4NzQzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$38,000",
        venues: 89
      },
      {
        name: "French Riviera",
        location: "Côte d'Azur, France",
        image: "https://images.unsplash.com/photo-1692734686010-be90ca50a3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjByaXZpZXJhJTIwbmljZXxlbnwxfHx8fDE3NjkwODYxODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$46,000",
        venues: 98
      }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1080&q=80",
        alt: "Paris Château Wedding",
        tag: "#Parisian love"
      },
      {
        src: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1080&q=80",
        alt: "Provence Lavender",
        tag: "#French elegance"
      },
      {
        src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1080&q=80",
        alt: "Vineyard Romance",
        tag: "#Countryside"
      }
    ]
  },
  Maldives: {
    description: "Celebrate your love in an overwater paradise. Our Maldives wedding tours offer pristine beaches, crystal lagoons, and luxury resorts for the ultimate tropical escape.",
    venues: [
      {
        name: "Overwater Villa Resort",
        description: "Private island luxury above turquoise waters",
        image: "https://images.unsplash.com/photo-1752555919227-6aaffd489c0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlciUyMHdlZGRpbmclMjB2aWxsYXxlbnwxfHx8fDE3Njg1NzM0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        location: "Male, Maldives",
        tags: ["Overwater", "Villa", "Private", "Luxury"],
        rating: 5.0,
        reviews: 2650,
        priceFrom: "$62,000",
        slotsLeft: 2,
        tripType: "Private",
        dates: "2-4 September",
        duration: "125.00"
      },
      {
        name: "Sandbank Paradise Resort",
        description: "Exclusive resort on a pristine white sandbank",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1080&q=80",
        location: "Ari Atoll, Maldives",
        tags: ["Beach", "Sandbank", "Paradise", "Exclusive"],
        rating: 4.9,
        reviews: 2280,
        priceFrom: "$56,000",
        slotsLeft: 3,
        tripType: "Open Trip",
        dates: "6-8 September",
        duration: "108.00"
      },
      {
        name: "Coral Reef Lagoon Resort",
        description: "Stunning resort surrounded by coral reefs",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1080&q=80",
        location: "Baa Atoll, Maldives",
        tags: ["Lagoon", "Coral", "Reef", "Tropical"],
        rating: 4.8,
        reviews: 1890,
        priceFrom: "$50,000",
        slotsLeft: 4,
        tripType: "Open Trip",
        dates: "10-12 September",
        duration: "98.00"
      }
    ],
    destinations: [
      {
        name: "Male Atolls",
        location: "Male, Maldives",
        image: "https://images.unsplash.com/photo-1698726654908-834d3a5330d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHdhdGVyJTIwdmlsbGF8ZW58MXx8fHwxNzY5MDc4NDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$58,000",
        venues: 45
      },
      {
        name: "Ari Atoll",
        location: "Ari Atoll, Maldives",
        image: "https://images.unsplash.com/photo-1663679450761-53778c5c2c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGlzbGFuZCUyMHJlc29ydHxlbnwxfHx8fDE3NjkwODUwODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        priceFrom: "$52,000",
        venues: 38
      },
      {
        name: "Baa Atoll",
        location: "Baa Atoll, Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1080&q=80",
        priceFrom: "$48,000",
        venues: 42
      }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1080&q=80",
        alt: "Maldives Beach Wedding",
        tag: "#Paradise found"
      },
      {
        src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1080&q=80",
        alt: "Overwater Ceremony",
        tag: "#Island luxury"
      },
      {
        src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1080&q=80",
        alt: "Sunset Romance",
        tag: "#Tropical dream"
      }
    ]
  }
};

const trendingDestinations = [
  {
    name: "Phuket",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1714785520961-1fc8d7360f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjB0aGFpbGFuZCUyMGJlYWNofGVufDF8fHx8MTc2MjczOTUwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    venues: 124,
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1604394089666-6d365c060c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwaW5kb25lc2lhfGVufDF8fHx8MTc2MjgxOTM2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    venues: 89,
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1706798636444-d4eb076fb63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1cmolMjBraGFsaWZhfGVufDF8fHx8MTc2Mjc0NDcxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    venues: 156,
  },
  {
    name: "Tuscany",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1687838175952-1f68f1d824ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwdmluZXlhcmQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYyNzk1MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    venues: 67,
  },
  {
    name: "Udaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1696861524777-978d87c7cff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwbGFrZXxlbnwxfHx8fDE3NjI4MTkzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    venues: 93,
  },
  {
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1698726654862-377c0218dfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHJlc29ydCUyMGJlYWNofGVufDF8fHx8MTc2Mjc3NDU2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    venues: 78,
  },
  {
    name: "Jaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1534758607507-754e582adfa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBhbWJlciUyMGZvcnR8ZW58MXx8fHwxNzYyODE5MzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    venues: 112,
  },
  {
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1605979491367-701301816425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjI3NjY1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    venues: 85,
  },
];

const featuredVenues = [
  {
    id: 1,
    name: "The Grand Imperial Hotel",
    location: "Agra, Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1706961121527-4017856774c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwaW5kaWF8ZW58MXx8fHwxNzYyODE4ODY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 234,
    tags: ["Backpacking", "Adventure", "Culture"],
    priceFrom: "₹45,000",
  },
  {
    id: 2,
    name: "Taj Lake Palace",
    location: "Udaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1671520427644-33aaf3be7214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBwYWxhY2UlMjBpbmRpYXxlbnwxfHx8fDE3NjI4MTg4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    reviews: 456,
    tags: ["Romantic", "Hill", "Backpacking"],
    priceFrom: "₹85,000",
  },
  {
    id: 3,
    name: "Novotel Goa Dona Sylvia Resort",
    location: "Goa, 403731",
    image: "https://images.unsplash.com/photo-1668616796315-d9adbd1b26ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjI3ODAzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 389,
    tags: ["Beachside Resorts"],
    priceFrom: "₹32,000",
  },
  {
    id: 4,
    name: "Royal Heritage Resort",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzY0MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 298,
    tags: ["Historic", "Palace", "Luxury"],
    priceFrom: "₹55,000",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Search & Discover",
    description: "Browse verified wedding venues and vendors across global destinations",
    icon: Search,
    color: "from-[#02542D] to-[#02542D]/80",
  },
  {
    step: "2",
    title: "Compare & Connect",
    description: "Compare packages, view detailed profiles, and connect with concierge support",
    icon: BadgeCheck,
    color: "from-[#DF6951] to-[#F1A501]",
  },
  {
    step: "3",
    title: "Book & Celebrate",
    description: "Secure your dream wedding with verified vendors and enjoy seamless planning",
    icon: Sparkles,
    color: "from-[#02542D] to-[#DF6951]",
  },
];

const trustIndicators = [
  { icon: BadgeCheck, label: "2,500+ Verified Venues", color: "text-[#02542D]" },
  { icon: Globe, label: "45+ Countries", color: "text-[#DF6951]" },
  { icon: Award, label: "98% Success Rate", color: "text-[#02542D]" },
  { icon: Users, label: "10,000+ Happy Couples", color: "text-[#DF6951]" },
];

const services = [
  {
    icon: HomeIcon,
    title: "Venue Selection",
    description: "Access verified venues with transparent pricing and availability",
  },
  {
    icon: Camera,
    title: "Photography & Video",
    description: "Professional photographers and videographers for every moment",
  },
  {
    icon: Palette,
    title: "Decoration & Design",
    description: "Expert decorators to bring your vision to life",
  },
  {
    icon: Utensils,
    title: "Catering Services",
    description: "Curated menus from local and international cuisines",
  },
];

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1538677859585-f8d2193ffa2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb3VudGFpbiUyMHdlZGRpbmclMjB2ZW51ZSUyMHN1bnNldHxlbnwxfHx8fDE3Njg1NjUzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Mountain Wedding Venue Sunset",
    country: "India",
    flag: "🇮🇳",
    destinations: [
      {
        name: "Udaipur",
        image: "https://images.unsplash.com/photo-1706961121527-4017856774c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwaW5kaWF8ZW58MXx8fHwxNzY4NTY2MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Jaipur",
        image: "https://images.unsplash.com/photo-1534758607507-754e582adfa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBhbWJlciUyMGZvcnR8ZW58MXx8fHwxNzY4NTY2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Kerala",
        image: "https://images.unsplash.com/photo-1694783079572-eaeff4bee78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaW5kaWF8ZW58MXx8fHwxNzY4NDYxNDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ]
  },
  {
    url: "https://images.unsplash.com/photo-1768488292781-4e72a8aeb897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjB2ZW51ZSUyMHN1bnNldHxlbnwxfHx8fDE3Njg1NjU3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Beach Wedding Venue Sunset",
    country: "Thailand",
    flag: "🇹🇭",
    destinations: [
      {
        name: "Phuket",
        image: "https://images.unsplash.com/photo-1704549931312-432d26dd53c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjBiZWFjaCUyMHRoYWlsYW5kfGVufDF8fHx8MTc2ODQ3MjY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Bangkok",
        image: "https://images.unsplash.com/photo-1691488822390-0fd80c389953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlJTIwdGhhaWxhbmR8ZW58MXx8fHwxNzY4NTY2MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Krabi",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmFiaSUyMGJlYWNofGVufDF8fHx8MTc2Mjc5NTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ]
  },
  {
    url: "https://images.unsplash.com/photo-1761472606347-bfebc5a3e546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwYWxhY2UlMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzY4NTY1Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Luxury Palace Wedding Venue",
    country: "Indonesia",
    flag: "🇮🇩",
    destinations: [
      {
        name: "Ubud",
        image: "https://images.unsplash.com/photo-1643346173514-74a489cedccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1YnVkJTIwYmFsaSUyMHRlbXBsZXxlbnwxfHx8fDE3Njg1NjYxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Seminyak",
        image: "https://images.unsplash.com/photo-1604394089666-6d365c060c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwaW5kb25lc2lhfGVufDF8fHx8MTc2MjgxOTM2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Nusa Dua",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwYmVhY2h8ZW58MXx8fHwxNzYyNzY2NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ]
  },
  {
    url: "https://images.unsplash.com/photo-1766910701111-9eee02328e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGRlc3RpbmF0aW9uJTIwd2VkZGluZyUyMHJlc29ydHxlbnwxfHx8fDE3Njg1NjU3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Tropical Destination Wedding Resort",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    destinations: [
      {
        name: "Dubai",
        image: "https://images.unsplash.com/photo-1706798636444-d4eb076fb63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1cmolMjBraGFsaWZhfGVufDF8fHx8MTc2ODU1NTY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Abu Dhabi",
        image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnUlMjBkaGFiaXxlbnwxfHx8fDE3NjI3Mzk1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Ras Al Khaimah",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1YWUlMjBkZXNlcnR8ZW58MXx8fHwxNzYyNzk1MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ]
  },
  {
    url: "https://images.unsplash.com/photo-1759730840961-09faa5731a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmFsbHJvb20lMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzY4NTY1Nzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Elegant Ballroom Wedding Venue",
    country: "Maldives",
    flag: "🇲🇻",
    destinations: [
      {
        name: "Malé",
        image: "https://images.unsplash.com/photo-1698726654862-377c0218dfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHJlc29ydCUyMGJlYWNofGVufDF8fHx8MTc2Mjc3NDU2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Baa Atoll",
        image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGlzbGFuZHxlbnwxfHx8fDE3NjI3Mzk1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Ari Atoll",
        image: "https://images.unsplash.com/photo-1606230842403-4d8c1ac39c0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlcnxlbnwxfHx8fDE3NjI3NjY1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ]
  },
  {
    url: "https://images.unsplash.com/photo-1762216444919-043cf813e4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB3ZWRkaW5nJTIwdmVudWUlMjBvdXRkb29yfGVufDF8fHx8MTc2ODU2NTc5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Garden Wedding Venue Outdoor",
    country: "Italy",
    flag: "🇮🇹",
    destinations: [
      {
        name: "Tuscany",
        image: "https://images.unsplash.com/photo-1655370979813-51600e6ea395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwdmluZXlhcmQlMjBpdGFseXxlbnwxfHx8fDE3Njg1NjYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Amalfi Coast",
        image: "https://images.unsplash.com/photo-1722412332940-dcd7daf88c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWFsZmklMjBjb2FzdHxlbnwxfHx8fDE3NjI3Mzk1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Lake Como",
        image: "https://images.unsplash.com/photo-1566404394190-cda8c6209208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwY29tbyUyMGl0YWx5fGVufDF8fHx8MTc2Mjc5NTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ]
  },
];

interface HomePageProps {
  onNavigateToVenues?: () => void;
  onNavigateToVenueDetails?: (venueId: number) => void;
  onNavigateToDestinations?: () => void;
}

export function HomePage({ onNavigateToVenues, onNavigateToVenueDetails, onNavigateToDestinations }: HomePageProps) {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("2");
  const [guests, setGuests] = useState("50");
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<keyof typeof countryWeddingData>("India");
  const [currentCountryVenueIndex, setCurrentCountryVenueIndex] = useState(0);
  const [searchService, setSearchService] = useState("Looking for...");
  const [searchLocation, setSearchLocation] = useState("Select Location");
  const [searchBudget, setSearchBudget] = useState("Select Budget");
  const [destinationBackgroundImage, setDestinationBackgroundImage] = useState(
    "https://images.unsplash.com/photo-1625735263130-6ff46f244010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcmFraGFuZCUyMGhpbWFsYXlhJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2OTM1ODAzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ); // Default to Uttarakhand (index 2)
  const destinationsScrollRef = useRef<HTMLDivElement>(null);
  const venuesScrollRef = useRef<HTMLDivElement>(null);

  // Auto-rotate hero images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentHeroIndex]);

  // Reset country venue index when country changes
  useEffect(() => {
    setCurrentCountryVenueIndex(0);
  }, [selectedCountry]);

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextVenue = () => {
    setCurrentVenueIndex((prev) => (prev + 1) % featuredVenues.length);
  };

  const prevVenue = () => {
    setCurrentVenueIndex((prev) => (prev - 1 + featuredVenues.length) % featuredVenues.length);
  };

  const scrollDestinations = (direction: 'left' | 'right') => {
    if (destinationsScrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? destinationsScrollRef.current.scrollLeft - scrollAmount
        : destinationsScrollRef.current.scrollLeft + scrollAmount;
      
      destinationsScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const scrollVenues = (direction: 'left' | 'right') => {
    if (venuesScrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? venuesScrollRef.current.scrollLeft - scrollAmount
        : venuesScrollRef.current.scrollLeft + scrollAmount;
      
      venuesScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const nextCountryVenue = () => {
    setCurrentCountryVenueIndex((prev) => (prev + 1) % countryWeddingData[selectedCountry].venues.length);
  };

  const prevCountryVenue = () => {
    setCurrentCountryVenueIndex((prev) => (prev - 1 + countryWeddingData[selectedCountry].venues.length) % countryWeddingData[selectedCountry].venues.length);
  };

  const visibleCountryVenues = [
    countryWeddingData[selectedCountry].venues[currentCountryVenueIndex],
    countryWeddingData[selectedCountry].venues[(currentCountryVenueIndex + 1) % countryWeddingData[selectedCountry].venues.length],
    countryWeddingData[selectedCountry].venues[(currentCountryVenueIndex + 2) % countryWeddingData[selectedCountry].venues.length],
  ];

  const visibleVenues = [
    featuredVenues[currentVenueIndex],
    featuredVenues[(currentVenueIndex + 1) % featuredVenues.length],
    featuredVenues[(currentVenueIndex + 2) % featuredVenues.length],
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* New Hero Section - Large Image Card */}
      <section className="relative pt-24 pb-8 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[48px] h-[500px] md:h-[600px]"
          >
            {/* Background Image */}
            <ImageWithFallback
              src={heroImages[currentHeroIndex].url}
              alt={heroImages[currentHeroIndex].alt}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            
            {/* Country Indicator - Top Right */}
            <motion.div
              key={`country-${currentHeroIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-6 right-6 md:top-8 md:right-8"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2">
                <span className="text-2xl">{heroImages[currentHeroIndex].flag}</span>
                <span className="font-medium text-gray-900">{heroImages[currentHeroIndex].country}</span>
              </div>
            </motion.div>

            {/* Destination Cards - Bottom Right */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 hidden md:flex flex-row gap-3 pointer-events-auto z-20">
              {heroImages[currentHeroIndex].destinations.map((destination, index) => (
                <motion.div
                  key={`${destination.name}-${currentHeroIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-36 h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group border-2 border-white pointer-events-auto"
                  onClick={onNavigateToDestinations}
                >
                  {/* Background Image */}
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                  />
                  
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Destination Name */}
                  <div className="absolute inset-0 flex items-end justify-center p-2 pointer-events-none">
                    <span className="text-xs font-semibold text-white text-center leading-tight drop-shadow-lg">
                      {destination.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 max-w-lg leading-tight">
                Plan Your Dream Destination Wedding
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-8 max-w-md">
                Award-winning venues worldwide
              </p>
              <div className="pointer-events-auto">
                <Button 
                  size="lg"
                  className="bg-white/90 backdrop-blur-sm text-black hover:bg-white rounded-full px-8 h-12 text-base"
                  onClick={onNavigateToVenues}
                >
                  Explore & Book
                </Button>
                
                {/* Navigation Arrows */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={prevHero}
                    className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 transition-all shadow-lg"
                    aria-label="Previous destination"
                  >
                    <ChevronLeft className="size-5 text-gray-900" />
                  </button>
                  <button
                    onClick={nextHero}
                    className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 transition-all shadow-lg"
                    aria-label="Next destination"
                  >
                    <ChevronRight className="size-5 text-gray-900" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations - Mobile Only (appears above search) */}
      <section className="md:hidden pt-2 pb-4 bg-white z-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {heroImages[currentHeroIndex].destinations.map((destination, index) => (
              <motion.div
                key={`mobile-${destination.name}-${currentHeroIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex-shrink-0 w-32 h-40 rounded-xl overflow-hidden shadow-lg cursor-pointer group border-2 border-gray-100"
                onClick={onNavigateToDestinations}
              >
                {/* Background Image */}
                <ImageWithFallback
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-active:scale-105 transition-transform duration-300"
                />
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Destination Name */}
                <div className="absolute inset-0 flex items-end justify-center p-2">
                  <span className="text-xs font-semibold text-white text-center leading-tight drop-shadow-lg">
                    {destination.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="relative mt-0 md:-mt-8 pb-8 bg-white z-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl md:rounded-full shadow-2xl p-3 md:p-4"
          >
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2">
              {/* Looking For Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-between gap-2 px-4 py-3 md:py-2 flex-1 bg-gray-50 md:bg-transparent rounded-xl md:rounded-none hover:bg-gray-100 md:hover:bg-transparent transition-colors text-left">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Globe className="size-5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate">{searchService}</span>
                    </div>
                    <ChevronDown className="size-4 text-gray-400 flex-shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={() => setSearchService("Venues")} className="cursor-pointer">
                    Venues
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchService("Wedding Planners")} className="cursor-pointer">
                    Wedding Planners
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchService("Photographers")} className="cursor-pointer">
                    Photographers
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchService("Videographers")} className="cursor-pointer">
                    Videographers
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchService("Makeup Artists")} className="cursor-pointer">
                    Makeup Artists
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchService("Decorators")} className="cursor-pointer">
                    Decorators
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchService("Travel Planners")} className="cursor-pointer">
                    Travel Planners
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchService("Caterers")} className="cursor-pointer">
                    Caterers
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchService("All Services")} className="cursor-pointer">
                    All Services
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Divider */}
              <div className="hidden md:block h-8 w-px bg-gray-200" />

              {/* Location Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-between gap-2 px-4 py-3 md:py-2 flex-1 bg-gray-50 md:bg-transparent rounded-xl md:rounded-none hover:bg-gray-100 md:hover:bg-transparent transition-colors text-left">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <MapPin className="size-5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate">{searchLocation}</span>
                    </div>
                    <ChevronDown className="size-4 text-gray-400 flex-shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 max-h-[400px] overflow-y-auto">
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">India</div>
                  <DropdownMenuItem onClick={() => setSearchLocation("Udaipur")} className="cursor-pointer">
                    Udaipur
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Jaipur")} className="cursor-pointer">
                    Jaipur
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Goa")} className="cursor-pointer">
                    Goa
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Kerala")} className="cursor-pointer">
                    Kerala
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Mumbai")} className="cursor-pointer">
                    Mumbai
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Delhi")} className="cursor-pointer">
                    Delhi
                  </DropdownMenuItem>
                  
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">Asia</div>
                  <DropdownMenuItem onClick={() => setSearchLocation("Bali, Indonesia")} className="cursor-pointer">
                    Bali, Indonesia
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Phuket, Thailand")} className="cursor-pointer">
                    Phuket, Thailand
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Maldives")} className="cursor-pointer">
                    Maldives
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Dubai, UAE")} className="cursor-pointer">
                    Dubai, UAE
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Singapore")} className="cursor-pointer">
                    Singapore
                  </DropdownMenuItem>
                  
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">Europe</div>
                  <DropdownMenuItem onClick={() => setSearchLocation("Santorini, Greece")} className="cursor-pointer">
                    Santorini, Greece
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Tuscany, Italy")} className="cursor-pointer">
                    Tuscany, Italy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Paris, France")} className="cursor-pointer">
                    Paris, France
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Barcelona, Spain")} className="cursor-pointer">
                    Barcelona, Spain
                  </DropdownMenuItem>
                  
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">Americas</div>
                  <DropdownMenuItem onClick={() => setSearchLocation("Cancun, Mexico")} className="cursor-pointer">
                    Cancun, Mexico
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Caribbean Islands")} className="cursor-pointer">
                    Caribbean Islands
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchLocation("Hawaii, USA")} className="cursor-pointer">
                    Hawaii, USA
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Divider */}
              <div className="hidden md:block h-8 w-px bg-gray-200" />

              {/* Budget Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-between gap-2 px-4 py-3 md:py-2 flex-1 bg-gray-50 md:bg-transparent rounded-xl md:rounded-none hover:bg-gray-100 md:hover:bg-transparent transition-colors text-left">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-gray-400 text-sm flex-shrink-0">$</span>
                      <span className="text-sm truncate">{searchBudget}</span>
                    </div>
                    <ChevronDown className="size-4 text-gray-400 flex-shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={() => setSearchBudget("Under $10,000")} className="cursor-pointer">
                    Under $10,000
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchBudget("$10,000 - $25,000")} className="cursor-pointer">
                    $10,000 - $25,000
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchBudget("$25,000 - $50,000")} className="cursor-pointer">
                    $25,000 - $50,000
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchBudget("$50,000 - $75,000")} className="cursor-pointer">
                    $50,000 - $75,000
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchBudget("$75,000 - $100,000")} className="cursor-pointer">
                    $75,000 - $100,000
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchBudget("$100,000 - $150,000")} className="cursor-pointer">
                    $100,000 - $150,000
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchBudget("$150,000+")} className="cursor-pointer">
                    $150,000+
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search Button */}
              <Button
                size="icon"
                className="size-12 md:size-12 rounded-full bg-[#02542D] hover:bg-[#02542D]/90 flex-shrink-0 self-center md:self-auto"
                onClick={onNavigateToVenues}
              >
                <Search className="size-5 text-white" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          {/* Main Heading with Country Selector */}
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl mb-6 leading-[1.1]"
            >
              Get wed in{" "}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="inline-flex items-center gap-2 md:gap-3 lg:gap-4 hover:opacity-80 transition-opacity underline decoration-2 md:decoration-[3px] lg:decoration-4 decoration-[#DF6951] underline-offset-8 md:underline-offset-[12px] lg:underline-offset-[16px]"
                    style={{ fontFamily: 'Volkhov, serif' }}
                  >
                    <span className="text-6xl md:text-7xl lg:text-8xl">{selectedCountry}</span>
                    <ChevronDown className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {Object.keys(countryWeddingData).map((country) => (
                    <DropdownMenuItem
                      key={country}
                      onClick={() => setSelectedCountry(country as keyof typeof countryWeddingData)}
                      className="text-base cursor-pointer"
                    >
                      {country}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.h1>

            {/* Description below title */}
            <motion.div 
              key={`desc-${selectedCountry}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 leading-relaxed max-w-2xl"
            >
              <p className="text-lg mb-4">
                {countryWeddingData[selectedCountry].description}
              </p>
              <p className="text-sm text-muted-foreground">Since 2021</p>
            </motion.div>
          </div>

          {/* Top Destinations in Selected Country */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl md:text-2xl text-gray-600"
              >
                Top Destinations in {selectedCountry}
              </motion.h3>
              
              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollDestinations('left')}
                  className="size-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="size-5 text-gray-700" />
                </button>
                <button
                  onClick={() => scrollDestinations('right')}
                  className="size-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="size-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            <div 
              ref={destinationsScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {countryWeddingData[selectedCountry].destinations.map((destination, index) => (
                <motion.div
                  key={`top-destination-${selectedCountry}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[350px]"
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer border-0">
                    {/* White Card Section at Top */}
                    <div className="bg-white px-6 pt-6 pb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{destination.name}</h3>
                    </div>
                    
                    {/* Image Carousel Section */}
                    <VenueCarousel 
                      images={[destination.image, destination.image, destination.image]}
                      venueName={destination.name}
                    />
                    
                    {/* Bottom Section - Price and Book */}
                    <div className="bg-white px-6 py-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">{destination.venues} venues</div>
                        <div className="text-2xl font-semibold text-[#DF6951]">{destination.priceFrom}</div>
                      </div>
                      <Button className="bg-[#DF6951] hover:bg-[#DF6951]/90 text-white px-8 py-2 rounded-full">
                        Explore
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Venues in Selected Country */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div className="flex items-center justify-between md:justify-start gap-3 md:gap-4">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-lg md:text-2xl text-gray-600 flex-shrink-0"
                >
                  Top Venues in {selectedCountry}
                </motion.h3>
                
                <a
                  href="/venues"
                  className="text-sm md:text-base text-[#DF6951] hover:text-[#02542D] transition-colors flex items-center gap-1 group whitespace-nowrap"
                >
                  View All
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => scrollVenues('left')}
                  className="size-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="size-5 text-gray-700" />
                </button>
                <button
                  onClick={() => scrollVenues('right')}
                  className="size-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="size-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            <div 
              ref={venuesScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {countryWeddingData[selectedCountry].venues.map((venue, index) => (
                <motion.div
                  key={`top-venue-${selectedCountry}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[350px]"
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#02542D] border-0">
                        <BadgeCheck className="size-3 mr-1" />
                        FEATURED
                      </Badge>
                      <button className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="size-5 text-gray-700" />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2">{venue.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="size-4" />
                        {venue.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {venue.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {venue.rating} ({venue.reviews})
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">From</div>
                          <div className="text-[#DF6951]">{venue.priceFrom}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Destinations in Selected Country */}
          {(() => {
            const countryMapping: Record<string, string> = {
              'India': 'India',
              'Italy': 'Italy',
              'Thailand': 'Thailand',
              'Bali': 'Indonesia',
              'Greece': 'Greece',
              'Norway': 'Norway',
              'France': 'France',
              'Maldives': 'Maldives'
            };
            
            const countryDestinations = trendingDestinations.filter(
              dest => dest.country === countryMapping[selectedCountry]
            );

            if (countryDestinations.length > 0) {
              return null;
              // return (
              //   <div className="mb-12">
              //     <motion.h3
              //       initial={{ opacity: 0, y: 20 }}
              //       animate={{ opacity: 1, y: 0 }}
              //       transition={{ duration: 0.6 }}
              //       className="text-xl md:text-2xl mb-8 text-gray-600"
              //     >
              //       Top Destinations in {selectedCountry}
              //     </motion.h3>
                  
              //     <div className="flex flex-wrap gap-4">
              //       {countryDestinations.map((destination, index) => (
              //         <motion.div
              //           key={`${destination.name}-${selectedCountry}`}
              //           initial={{ opacity: 0, y: 20 }}
              //           animate={{ opacity: 1, y: 0 }}
              //           transition={{ duration: 0.5, delay: index * 0.1 }}
              //           whileHover={{ scale: 1.05 }}
              //           className="relative w-36 h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group border-2 border-white"
              //           onClick={onNavigateToDestinations}
              //         >
              //           {/* Background Image */}
              //           <ImageWithFallback
              //             src={destination.image}
              //             alt={destination.name}
              //             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              //           />
                        
              //           {/* Gradient Overlay for text readability */}
              //           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
              //           {/* Destination Name */}
              //           <div className="absolute inset-0 flex items-end justify-center p-3">
              //             <div className="text-center">
              //               <span className="text-sm font-semibold text-white leading-tight drop-shadow-lg block">
              //                 {destination.name}
              //               </span>
              //               <span className="text-xs text-white/80 drop-shadow-lg">
              //                 {destination.venues} venues
              //               </span>
              //             </div>
              //           </div>
              //         </motion.div>
              //       ))}
              //     </div>
              //   </div>
              // );
            }
            return null;
          })()}

          {/* Bottom: Three Image Cards - Hidden */}
          {false && (
            <div className="grid md:grid-cols-3 gap-6 mb-6">
            {countryWeddingData[selectedCountry].images.map((image, index) => (
              <motion.div 
                key={`${selectedCountry}-img-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
                className="relative group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[32px] aspect-[3/4]">
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Customer Avatars - First Card Only */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 flex items-center -space-x-2">
                      <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                        <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600" />
                      </div>
                    </div>
                  )}

                  {/* Play Button - Second Card Only */}
                  {index === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-6 h-6 text-black fill-black ml-1" />
                      </button>
                    </div>
                  )}

                  {/* Arrow Button - Third Card Only */}
                  {index === 2 && (
                    <div className="absolute top-4 right-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full size-12 bg-white hover:bg-gray-100 shadow-sm"
                        onClick={onNavigateToVenues}
                      >
                        <ArrowRight className="size-5 text-black" />
                      </Button>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm font-medium drop-shadow-lg">{image.tag}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}

          {/* More About Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-right"
          >
            {/* <Button 
              variant="link" 
              className="text-gray-600 hover:text-black text-base"
              onClick={onNavigateToVenues}
            >
              More about destinations
            </Button> */}
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      {/* <section className="py-12 bg-gradient-to-b from-rose-50/30 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className={`size-12 mx-auto mb-3 ${item.color}`} />
                <p className="text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Trending Destinations */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl md:text-5xl mb-3">
              Our Most Popular Destinations
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              From the tranquil beaches of Southeast Asia to the majestic peaks of the Himalayas, find the perfect escape tailored for the modern explorer.
            </p>
          </div>

          {/* Filters and Explore Button */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Button 
                variant="outline" 
                className="rounded-full border-gray-300 bg-white hover:bg-gray-50"
              >
                Location
                <ChevronDown className="size-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-gray-300 bg-white hover:bg-gray-50"
              >
                Price
                <ChevronDown className="size-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-gray-300 bg-white hover:bg-gray-50"
              >
                Duration
                <ChevronDown className="size-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-gray-300 bg-white hover:bg-gray-50"
              >
                Difficulty
                <ChevronDown className="size-4 ml-2" />
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="rounded-full border-gray-300 bg-white hover:bg-gray-50 px-6"
              onClick={onNavigateToVenues}
            >
              Explore All Destinations
            </Button>
          </div>

          {/* Destination Cards - Horizontal Scroll */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4">
            {trendingDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[320px]"
              >
                <div className="bg-white rounded-3xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative h-[400px] overflow-hidden">
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 px-3 py-1">
                        {destination.country}
                      </Badge>
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  
                  {/* Bottom Info Section */}
                  <div className="p-5 bg-white">
                    <h3 className="text-xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                      {destination.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        <span>{destination.country}</span>
                      </div>
                      <div className="text-[#DF6951] font-semibold">
                        {destination.priceFrom || 'From $1,200'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted Destinations Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={destinationBackgroundImage}
            alt="Destination Background"
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1929]/95 via-[#0a1929]/85 to-[#0a1929]/70" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
          <HighlightedDestinationsCarousel 
            onNavigateToDestinations={onNavigateToDestinations}
            onDestinationChange={setDestinationBackgroundImage}
          />
        </div>
      </section>

{/* Explore Venues Carousel */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl mb-3">
                Explore Venues
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover the perfect space for your celebrations and events
              </p>
            </div>
            <Button 
              variant="ghost" 
              className="hidden md:flex items-center gap-2 text-[#DF6951] hover:text-[#DF6951]/80"
              onClick={onNavigateToVenues}
            >
              More
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 size-12 rounded-full shadow-lg bg-white hover:bg-gray-50 hidden md:flex"
              onClick={prevVenue}
            >
              <ChevronLeft className="size-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 size-12 rounded-full shadow-lg bg-white hover:bg-gray-50 hidden md:flex"
              onClick={nextVenue}
            >
              <ChevronRight className="size-6" />
            </Button>

            {/* Venue Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {visibleVenues.map((venue, index) => (
                <motion.div
                  key={`${venue.id}-${currentVenueIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#02542D] border-0">
                        <BadgeCheck className="size-3 mr-1" />
                        FEATURED
                      </Badge>
                      <button className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="size-5 text-gray-700" />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2">{venue.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="size-4" />
                        {venue.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {venue.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {venue.rating} ({venue.reviews})
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">From</div>
                          <div className="text-[#DF6951]">{venue.priceFrom}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {featuredVenues.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVenueIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentVenueIndex
                      ? "w-8 bg-[#DF6951]"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile More Button */}
          <div className="text-center mt-8 md:hidden">
            <Button 
              variant="outline"
              onClick={onNavigateToVenues}
            >
              View All Venues
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-rose-50/30">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-5xl mb-3">
              How Wedzway Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Your journey to the perfect destination wedding in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <Card className="p-8 text-left hover:shadow-xl transition-all h-full">
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                    <step.icon className="size-8 text-white" />
                  </div>
                  <div className={`text-5xl mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} style={{ fontFamily: 'Volkhov, serif' }}>
                    {step.step}
                  </div>
                  <h3 className="mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="size-8 text-[#DF6951]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50/30 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-5xl mb-3">
              Complete Wedding Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for your perfect destination wedding, all in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-left hover:shadow-xl transition-all h-full group cursor-pointer">
                  <div className="size-16 mb-4 rounded-2xl bg-gradient-to-br from-[#02542D]/10 to-[#DF6951]/10 flex items-center justify-center group-hover:from-[#02542D]/20 group-hover:to-[#DF6951]/20 transition-all">
                    <service.icon className="size-8 text-[#02542D]" />
                  </div>
                  <h3 className="mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WedzZway Concierge */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-5xl mb-3">
              WedzZway Concierge
            </h2>
            <p className="text-lg text-muted-foreground">
              Your personal destination team for managing every detail from selecting venues and planners, to handling budgets and guest experiences, for the wedding you've imagined.
            </p>
          </div>

          <div>
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HandHeart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Trust & Confidence</div>
                    <div className="text-xs text-muted-foreground">Navigate new locations with peace of mind</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Safety Assurance</div>
                    <div className="text-xs text-muted-foreground">Verified partners, secure bookings</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Plane className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Travel Assurance</div>
                    <div className="text-xs text-muted-foreground">Visa, flights, and guest management</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Dream Execution</div>
                    <div className="text-xs text-muted-foreground">On-ground coordination when it matters</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="text-left mt-8">
            <Button 
              size="lg"
              className="bg-[#F1A501] hover:bg-[#F1A501]/90 text-black gap-2"
            >
              Schedule Consultation - Talk on WhatsApp
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Travel Assurance - Handled */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50/30 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-5xl mb-3">
              Travel Assurance—Handled
            </h2>
            <p className="text-lg text-muted-foreground">
              We coordinate visas, flights, guest itineraries, and airport transfers with trusted global partners
            </p>
          </div>

          <div>
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Visa Guidance</div>
                    <div className="text-xs text-muted-foreground">Document checklist & application support</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Ticket className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Group Bookings</div>
                    <div className="text-xs text-muted-foreground">Best-fare flights & seat blocks</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Guest Management</div>
                    <div className="text-xs text-muted-foreground">RSVP tracking & e-itineraries</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPinCheck className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Arrival Services</div>
                    <div className="text-xs text-muted-foreground">Dedicated desk & transfers</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button 
              size="lg"
              className="bg-[#F1A501] hover:bg-[#F1A501]/90 text-black gap-2 text-left"
            >
              Plan Destination weddings with Concierge
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="text-left mb-12">
              <h2 className="text-3xl md:text-5xl mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about planning your destination wedding with Wedzway
              </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <AccordionItem value="item-1" className="border-gray-200">
                <AccordionTrigger className="text-lg hover:text-[#02542D]">
                  What is Wedzway and how does it work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Wedzway is a comprehensive destination wedding platform that connects couples with verified wedding planners, venues, photographers, videographers, makeup artists, decorators, and all wedding service providers globally. Simply browse our curated venues and destinations, connect with verified vendors, and let our concierge service help you plan every detail of your dream destination wedding.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-gray-200">
                <AccordionTrigger className="text-lg hover:text-[#02542D]">
                  How are vendors verified on Wedzway?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  All vendors on Wedzway go through a rigorous verification process. We check credentials, review portfolios, verify past work, and collect authentic reviews from real couples. Our quality assurance team personally vets each vendor to ensure they meet our high standards for professionalism, reliability, and service excellence.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-gray-200">
                <AccordionTrigger className="text-lg hover:text-[#02542D]">
                  What destinations and countries do you cover?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Wedzway operates globally with a strong presence in India (35% of our market), covering popular destinations like Udaipur, Jaipur, Goa, and Kerala. We also feature stunning venues across Southeast Asia, Europe, the Caribbean, North America, and beyond. Our platform continues to expand to new destinations based on couples' interests and wedding trends.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-gray-200">
                <AccordionTrigger className="text-lg hover:text-[#02542D]">
                  What's included in the concierge service?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our premium concierge service provides personalized assistance throughout your wedding planning journey. This includes venue recommendations tailored to your preferences and budget, vendor coordination, contract negotiations, timeline management, travel planning for guests, on-site coordination, and 24/7 support. Think of us as your dedicated wedding planning partner who handles all the details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-gray-200">
                <AccordionTrigger className="text-lg hover:text-[#02542D]">
                  How much does it cost to use Wedzway?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Browsing venues and connecting with vendors on Wedzway is completely free. You only pay for the services you book directly with vendors. Our premium concierge service is available for couples who want personalized planning assistance, with pricing based on the scope and scale of your wedding. We believe in transparent pricing with no hidden fees.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-gray-200">
                <AccordionTrigger className="text-lg hover:text-[#02542D]">
                  Can you help with guest travel and accommodation?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! We work with verified travel planners who can arrange group bookings, negotiate special rates with hotels, coordinate airport transfers, and create custom travel itineraries for your wedding guests. Many of our venue partners also offer exclusive accommodation packages for destination weddings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-gray-200">
                <AccordionTrigger className="text-lg hover:text-[#02542D]">
                  How far in advance should I start planning?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We recommend starting your destination wedding planning 12-18 months in advance. This gives you ample time to secure your preferred venue and vendors, send save-the-dates to guests, handle travel logistics, and ensure every detail is perfect. However, we've successfully helped couples plan beautiful weddings with shorter timelines as well.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-gray-200">
                <AccordionTrigger className="text-lg hover:text-[#02542D]">
                  What if I need to cancel or reschedule?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Cancellation and rescheduling policies vary by vendor and venue. We always recommend reviewing contracts carefully before booking. Our concierge team can help negotiate flexible terms and guide you through any changes. We also recommend wedding insurance for added peace of mind when planning a destination wedding.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Contact CTA */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Still have questions? Our team is here to help!
              </p>
              <Button 
                size="lg"
                className="bg-[#02542D] hover:bg-[#02542D]/90 text-white"
              >
                Talk to Our Concierge Team
                <Sparkles className="ml-2 size-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 md:py-24 bg-gradient-to-br from-[#02542D] to-[#DF6951] text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
              Ready to Plan Your Dream Wedding?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of couples who found their perfect destination wedding venue with Wedzway
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#02542D] hover:bg-gray-100 px-8"
                onClick={onNavigateToVenues}
              >
                Explore Venues
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8"
              >
                Talk to Concierge
                <Sparkles className="ml-2 size-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
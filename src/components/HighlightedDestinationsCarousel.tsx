import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface HighlightedDestinationsCarouselProps {
  onNavigateToDestinations?: () => void;
  onDestinationChange?: (backgroundImage: string) => void;
}

const destinations = [
  {
    id: 0,
    name: "Kashmir",
    country: "India",
    badge: "Visit India",
    backgroundImage:
      "https://images.unsplash.com/photo-1624253955293-81061e245a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXNobWlyJTIwdmFsbGV5JTIwbW91bnRhaW5zfGVufDF8fHx8MTc2OTM1ODAzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "The Pir-Panjal Range",
        description:
          "This is the range that sets the backdrop for stunning Kashmir valleys, ranging from over 13,000 to epic peaks beyond 20,000 ft.",
        image:
          "https://images.unsplash.com/photo-1622642897052-9410411a798a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXNobWlyJTIwdmFsbGV5JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2OTM1NjA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Zanskar Range",
        description:
          "Remote and pristine mountain ranges offering breathtaking views and untouched natural beauty for adventurous couples.",
        image:
          "https://images.unsplash.com/photo-1703693620994-66ed5b7bd448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbiUyMHJhbmdlJTIwaW5kaWF8ZW58MXx8fHwxNzY5MzU2MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 1,
    name: "Himachal Pradesh",
    country: "India",
    badge: "Visit India",
    backgroundImage:
      "https://images.unsplash.com/photo-1692718605027-71424c748e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hY2hhbCUyMHByYWRlc2glMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5MzM5OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "The Shivalik Ranges",
        description:
          "The outer range of the Himalayas, offering scenic views and moderate altitude perfect for intimate celebrations from 2,000-3,500 feet.",
        image:
          "https://images.unsplash.com/photo-1703693620994-66ed5b7bd448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbiUyMHJhbmdlJTIwaW5kaWF8ZW58MXx8fHwxNzY5MzU2MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Dhauladhar Range",
        description:
          "One of Himachal's most breathtaking ranges with dramatic peaks and lush valleys, perfect for couples seeking adventure.",
        image:
          "https://images.unsplash.com/photo-1692718605027-71424c748e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hY2hhbCUyMHByYWRlc2glMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5MzM5OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Pir Panjal Range",
        description:
          "Majestic mountain range offering spectacular views and diverse wedding venue options in serene mountain settings.",
        image:
          "https://images.unsplash.com/photo-1695839878298-d336fd376776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcmFraGFuZCUyMGhpbWFsYXlhJTIwcGVha3N8ZW58MXx8fHwxNzY5MzU2MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 2,
    name: "Uttarakhand",
    country: "India",
    badge: "Visit India",
    backgroundImage:
      "https://images.unsplash.com/photo-1625735263130-6ff46f244010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcmFraGFuZCUyMGhpbWFsYXlhJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2OTM1ODAzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "Garhwal Himalayas",
        description:
          "Home to sacred peaks and pristine valleys, offering spiritual and scenic backdrops for unforgettable wedding celebrations.",
        image:
          "https://images.unsplash.com/photo-1695839878298-d336fd376776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcmFraGFuZCUyMGhpbWFsYXlhJTIwcGVha3N8ZW58MXx8fHwxNzY5MzU2MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Kumaon Himalayas",
        description:
          "Serene mountain landscapes with charming hill stations, perfect for intimate destination weddings in natural beauty.",
        image:
          "https://images.unsplash.com/photo-1692718605027-71424c748e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hY2hhbCUyMHByYWRlc2glMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5MzM5OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 3,
    name: "Rajasthan",
    country: "India",
    badge: "Visit India",
    backgroundImage:
      "https://images.unsplash.com/photo-1670254812851-e59013163aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBwYWxhY2UlMjB1ZGFpcHVyfGVufDF8fHx8MTc2OTM1ODAzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "Udaipur City of Lakes",
        description:
          "Experience royal grandeur with majestic palaces, serene lakes, and rich cultural heritage for a regal wedding celebration.",
        image:
          "https://images.unsplash.com/photo-1724382981275-f144e3a12cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBwYWxhY2UlMjBpbmRpYXxlbnwxfHx8fDE3NjkzMzk5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Jaipur Pink City",
        description:
          "Historic palaces and forts provide stunning backdrops for traditional Indian weddings with royal Rajasthani charm.",
        image:
          "https://images.unsplash.com/photo-1703693620994-66ed5b7bd448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbiUyMHJhbmdlJTIwaW5kaWF8ZW58MXx8fHwxNzY5MzU2MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 4,
    name: "Goa",
    country: "India",
    badge: "Visit India",
    backgroundImage:
      "https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGluZGlhfGVufDF8fHx8MTc2OTI3MTkxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "Beach Paradise",
        description:
          "Golden sands, turquoise waters, and vibrant sunsets create the perfect tropical beach wedding destination.",
        image:
          "https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGluZGlhfGVufDF8fHx8MTc2OTI3MTkxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Portuguese Heritage",
        description:
          "Charming churches and colonial architecture add unique character to your beachfront celebrations.",
        image:
          "https://images.unsplash.com/photo-1692718605027-71424c748e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hY2hhbCUyMHByYWRlc2glMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5MzM5OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 5,
    name: "Kerala",
    country: "India",
    badge: "Visit India",
    backgroundImage:
      "https://images.unsplash.com/photo-1694783079572-eaeff4bee78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaW5kaWF8ZW58MXx8fHwxNzY5MjcxOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "Backwater Romance",
        description:
          "Tranquil backwaters and houseboats provide an intimate and serene setting for couples seeking peace and natural beauty.",
        image:
          "https://images.unsplash.com/photo-1694783079572-eaeff4bee78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaW5kaWF8ZW58MXx8fHwxNzY5MjcxOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Hill Station Retreats",
        description:
          "Lush tea plantations and misty mountains create a romantic hill station wedding experience.",
        image:
          "https://images.unsplash.com/photo-1695839878298-d336fd376776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcmFraGFuZCUyMGhpbWFsYXlhJTIwcGVha3N8ZW58MXx8fHwxNzY5MzU2MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 6,
    name: "Tuscany",
    country: "Italy",
    badge: "Visit Italy",
    backgroundImage:
      "https://images.unsplash.com/photo-1694974249671-2a921a644a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjkzNTY3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "Rolling Vineyards",
        description:
          "Experience Italian romance among cypress-lined roads, historic villas, and endless vineyards in the heart of Tuscany.",
        image:
          "https://images.unsplash.com/photo-1694974249671-2a921a644a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjkzNTY3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Medieval Villages",
        description:
          "Historic hilltop towns and Renaissance charm create unforgettable settings for intimate Italian weddings.",
        image:
          "https://images.unsplash.com/photo-1703693620994-66ed5b7bd448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbiUyMHJhbmdlJTIwaW5kaWF8ZW58MXx8fHwxNzY5MzU2MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 7,
    name: "Amalfi Coast",
    country: "Italy",
    badge: "Visit Italy",
    backgroundImage:
      "https://images.unsplash.com/photo-1583844056361-4418a8f2a985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWFsZmklMjBjb2FzdCUyMGl0YWx5fGVufDF8fHx8MTc2OTM1Njc1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "Coastal Elegance",
        description:
          "Dramatic cliffs, azure waters, and charming coastal towns create a breathtaking Mediterranean wedding backdrop.",
        image:
          "https://images.unsplash.com/photo-1583844056361-4418a8f2a985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWFsZmklMjBjb2FzdCUyMGl0YWx5fGVufDF8fHx8MTc2OTM1Njc1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Positano Romance",
        description:
          "Colorful cliffside villages and stunning sea views make Positano a dream destination for couples.",
        image:
          "https://images.unsplash.com/photo-1692718605027-71424c748e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hY2hhbCUyMHByYWRlc2glMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5MzM5OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 8,
    name: "Santorini",
    country: "Greece",
    badge: "Visit Greece",
    backgroundImage:
      "https://images.unsplash.com/photo-1676730056228-7e38cbb88edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzY5MjY3Mzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "Sunset Paradise",
        description:
          "Iconic white-washed buildings, blue-domed churches, and spectacular sunsets create the ultimate romantic Greek island wedding.",
        image:
          "https://images.unsplash.com/photo-1664112732671-877dc0030ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBpc2xhbmR8ZW58MXx8fHwxNzY5MjY0NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Caldera Views",
        description:
          "Dramatic volcanic landscapes and stunning sea views provide an unforgettable backdrop for your celebration.",
        image:
          "https://images.unsplash.com/photo-1695839878298-d336fd376776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcmFraGFuZCUyMGhpbWFsYXlhJTIwcGVha3N8ZW58MXx8fHwxNzY5MzU2MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: 9,
    name: "Bali",
    country: "Indonesia",
    badge: "Visit Indonesia",
    backgroundImage:
      "https://images.unsplash.com/photo-1581032841303-0ba9e894ebc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhJTIwdGVtcGxlfGVufDF8fHx8MTc2OTI2MjM3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ranges: [
      {
        title: "Tropical Paradise",
        description:
          "Lush rice terraces, pristine beaches, and ancient temples create a magical tropical island wedding experience.",
        image:
          "https://images.unsplash.com/photo-1703693620994-66ed5b7bd448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbiUyMHJhbmdlJTIwaW5kaWF8ZW58MXx8fHwxNzY5MzU2MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        title: "Ubud Serenity",
        description:
          "Rainforest settings and spiritual tranquility offer couples a unique cultural and natural wedding venue.",
        image:
          "https://images.unsplash.com/photo-1622642897052-9410411a798a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXNobWlyJTIwdmFsbGV5JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2OTM1NjA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
];

export function HighlightedDestinationsCarousel({
  onNavigateToDestinations,
  onDestinationChange,
}: HighlightedDestinationsCarouselProps) {
  const [activeDestination, setActiveDestination] = useState(2); // Start with Uttarakhand
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const destinationRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll to center the active destination
  useEffect(() => {
    const activeElement = destinationRefs.current[activeDestination];
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeDestination]);

  const handleDestinationClick = (index: number) => {
    setActiveDestination(index);
    // Scroll cards to the beginning when changing destination
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    if (onDestinationChange && destinations[index].backgroundImage) {
      onDestinationChange(destinations[index].backgroundImage);
    }
  };

  const scrollCards = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const scrollDestinations = (direction: "up" | "down") => {
    let newIndex;
    if (direction === "down") {
      // If at the last destination, wrap to the first
      newIndex = (activeDestination + 1) % destinations.length;
    } else {
      // If at the first destination, wrap to the last
      newIndex =
        (activeDestination - 1 + destinations.length) % destinations.length;
    }
    setActiveDestination(newIndex);
    if (onDestinationChange && destinations[newIndex].backgroundImage) {
      onDestinationChange(destinations[newIndex].backgroundImage);
    }
  };

  // Calculate position offset for rolling effect
  const getItemStyle = (index: number) => {
    let diff = index - activeDestination;

    // Handle wrapping for cyclical effect
    const totalDestinations = destinations.length;
    if (diff > totalDestinations / 2) {
      diff -= totalDestinations;
    } else if (diff < -totalDestinations / 2) {
      diff += totalDestinations;
    }

    const distance = Math.abs(diff);

    // Rolling carousel effect with 3D transform
    const rotateX = diff * 12; // Rotation angle
    const translateY = diff * 45; // Vertical spacing
    const translateZ = -distance * 30; // Depth
    const opacity =
      distance > 2 ? 0.2 : distance > 1 ? 0.4 : distance > 0 ? 0.6 : 1;
    const scale =
      distance > 2 ? 0.7 : distance > 1 ? 0.8 : distance > 0 ? 0.9 : 1;

    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex: 10 - distance,
    };
  };

  // Get visible destinations for mobile (only show 3: previous, current, next)
  const getVisibleDestinations = () => {
    const visible = [];
    const total = destinations.length;

    for (let i = -1; i <= 1; i++) {
      const index = (activeDestination + i + total) % total;
      visible.push({ ...destinations[index], originalIndex: index });
    }

    return visible;
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-left"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 font-normal">
          Top Highlights
        </h2>
        <p className="text-white/60 text-sm md:text-base">
          Explore our curated selection of breathtaking wedding destinations
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
        {/* Left Side - Destination Names with Indicators */}
        <div className="flex gap-4 md:gap-6 items-center lg:items-start">
          {/* Scroll Indicators with Up/Down Controls */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => scrollDestinations("up")}
              className="size-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all mb-1"
              aria-label="Scroll up"
            >
              <ChevronUp className="size-4 text-white" />
            </button>

            <div className="flex flex-col gap-3 py-1">
              {destinations.map((dest, index) => {
                // Calculate difference for visibility
                let diff = index - activeDestination;
                const totalDestinations = destinations.length;
                if (diff > totalDestinations / 2) {
                  diff -= totalDestinations;
                } else if (diff < -totalDestinations / 2) {
                  diff += totalDestinations;
                }
                const distance = Math.abs(diff);

                // On mobile (default), only show 3 dots (distance <= 1)
                // On desktop (lg), show all dots
                const shouldShow = distance <= 1;

                return (
                  <button
                    key={dest.id}
                    onClick={() => handleDestinationClick(index)}
                    className={`group flex items-center gap-2 ${shouldShow ? "lg:flex" : "hidden lg:flex"}`}
                    aria-label={`Select ${dest.name}`}
                  >
                    <div
                      className={`size-2 rounded-full transition-all duration-300 ${
                        activeDestination === index
                          ? "bg-white scale-125"
                          : distance <= 2
                            ? "bg-white/30 hover:bg-white/50"
                            : "bg-white/10"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollDestinations("down")}
              className="size-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all mt-1"
              aria-label="Scroll down"
            >
              <ChevronDown className="size-4 text-white" />
            </button>
          </div>

          {/* Destination Names with Rolling Effect */}
          <div className="flex-1">
            {/* Destination Names List with Rolling Effect */}
            <div
              className="relative h-[220px] md:h-[280px] overflow-hidden mb-6"
              style={{ perspective: "1000px" }}
            >
              <div className="absolute inset-0 flex flex-col items-start justify-center">
                {/* Show only 3 destinations on mobile, all on desktop */}
                {destinations.map((dest, index) => {
                  // Calculate difference for visibility
                  let diff = index - activeDestination;
                  const totalDestinations = destinations.length;
                  if (diff > totalDestinations / 2) {
                    diff -= totalDestinations;
                  } else if (diff < -totalDestinations / 2) {
                    diff += totalDestinations;
                  }
                  const distance = Math.abs(diff);

                  // On mobile (default), only show 3 destinations (distance <= 1)
                  // On desktop (lg), show all destinations
                  const shouldShow = distance <= 1;

                  return (
                    <button
                      key={dest.id}
                      // ref={(el) => (destinationRefs.current[index] = el)}
                      ref={(el) => {
                        destinationRefs.current[index] = el;
                      }}
                      onClick={() => handleDestinationClick(index)}
                      className={`block text-left transition-all duration-500 absolute left-0 ${
                        activeDestination === index
                          ? "text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold pointer-events-auto"
                          : "text-white/50 text-lg md:text-xl lg:text-2xl font-medium hover:text-white/70 pointer-events-auto"
                      } ${shouldShow ? "lg:block" : "hidden lg:block"}`}
                      style={{
                        ...getItemStyle(index),
                        transformOrigin: "center center",
                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {dest.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.p
              key={activeDestination}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden lg:block text-white/70 text-sm md:text-base max-w-md leading-relaxed mb-6 lg:mb-6"
            >
              Discover the majestic beauty of{" "}
              {destinations[activeDestination].name}'s destination offerings,
              from stunning landscapes to cultural heritage.
            </motion.p>

            {/* Show Explore More button only on desktop in left column */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hidden lg:block"
            >
              <Button
                onClick={onNavigateToDestinations}
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all rounded-full px-6 group"
              >
                Explore More
                <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Tourism Board Badge - Desktop */}
              <motion.div
                key={`badge-desktop-${activeDestination}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-4"
              >
                <Badge className="bg-white/5 backdrop-blur-sm text-white border-white/20 px-3 py-1.5 text-xs flex items-center gap-2">
                  <div className="size-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <BadgeCheck className="size-3 text-white" fill="white" />
                  </div>
                  Verified by {destinations[activeDestination].country} Tourism
                  Board
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Destination Cards */}
        <div className="relative w-full">
          {/* Navigation Arrows */}
          <div className="absolute -top-12 right-0 flex items-center gap-2 z-10">
            <button
              onClick={() => scrollCards("left")}
              className="size-8 md:size-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4 md:size-5 text-white" />
            </button>
            <button
              onClick={() => scrollCards("right")}
              className="size-8 md:size-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4 md:size-5 text-white" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4 md:mx-0 md:px-0 mb-6 lg:mb-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {destinations[activeDestination].ranges.map((range, index) => (
              <motion.div
                key={`${activeDestination}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
                  <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                    <ImageWithFallback
                      src={range.image}
                      alt={range.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h4 className="text-white text-base md:text-lg font-semibold mb-2">
                      {range.title}
                    </h4>
                    <p className="text-white/60 text-sm mb-3 line-clamp-3">
                      {range.description}
                    </p>
                    <Button
                      variant="link"
                      className="text-white/80 hover:text-white p-0 h-auto text-sm group/btn"
                    >
                      Explore More
                      <ArrowRight className="size-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show Explore More button on mobile after cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:hidden -mx-4 px-4 md:mx-0 md:px-0"
          >
            {/* Description Text - Mobile Only */}
            <motion.p
              key={`desc-mobile-${activeDestination}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white/70 text-sm md:text-base leading-relaxed mb-4"
            >
              Discover the majestic beauty of{" "}
              {destinations[activeDestination].name}'s destination offerings,
              from stunning landscapes to cultural heritage.
            </motion.p>

            <Button
              onClick={onNavigateToDestinations}
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all rounded-full px-6 group w-full md:w-auto"
            >
              Explore More
              <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Tourism Board Badge - Mobile */}
            <motion.div
              key={`badge-mobile-${activeDestination}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-4 flex justify-center md:justify-start"
            >
              <Badge className="bg-white/5 backdrop-blur-sm text-white border-white/20 px-3 py-1.5 text-xs flex items-center gap-2">
                <div className="size-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <BadgeCheck className="size-3 text-white" fill="white" />
                </div>
                Verified by {destinations[activeDestination].country} Tourism
                Board
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

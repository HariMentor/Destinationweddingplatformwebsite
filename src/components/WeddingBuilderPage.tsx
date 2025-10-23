import { useState } from "react";
import { 
  ArrowLeft, ArrowRight, Check, Users, MapPin, Palette, 
  Briefcase, Building2, Plane, FileText, Calendar, DollarSign,
  Heart, Image as ImageIcon, Camera, Video, Music, Sparkles, Eye,
  ChevronLeft, ChevronRight, Search, ExternalLink, X, Info, ArrowLeftRight, Bookmark, Download, Share2,
  ChevronDown, ChevronUp, Star, MapPinIcon, Award
} from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";

interface WeddingBuilderPageProps {
  onExit: () => void;
}

interface WeddingPlan {
  // Step 0: Basics
  guestSize: number;
  weddingType: 'destination' | 'local' | '';
  theme: string;
  budget: number[];
  dates: Date[];
  duration: number;
  
  // Step 1: Destination
  destination: string;
  weatherPreference: string;
  visaRequired: string;
  
  // Step 2: Moodboard
  colorPalette: string[];
  inspirationImages: string[];
  selectedInspirations: number[]; // IDs of selected inspirations
  styles: string[];
  
  // Step 3: Vendors
  selectedVendors: {
    planner?: number;
    photographer?: number;
    videographer?: number;
    makeup?: number;
    decorator?: number;
    dj?: number;
  };
  
  // Step 4: Venue
  selectedVenues: number[];
  
  // Step 5: Travel
  guestOrigins: string[];
  
  // Step 6: Visa
  guestNationalities: string[];
}

const steps = [
  { id: 0, name: "Event Basics", icon: Users },
  { id: 1, name: "Destination", icon: MapPin },
  { id: 2, name: "Moodboard", icon: Palette },
  { id: 3, name: "Vendors", icon: Briefcase },
  { id: 4, name: "Venue", icon: Building2 },
  { id: 5, name: "Travel", icon: Plane },
  { id: 6, name: "Visa & Docs", icon: FileText },
];

const themes = [
  "Traditional", "Modern", "Beach", "Royal", "Minimal", "Bohemian", 
  "Rustic", "Garden", "Palace", "Vintage", "Contemporary"
];

const destinationDetails = [
  {
    name: "Goa, India",
    country: "India",
    tagline: "Beach Paradise & Portuguese Charm",
    description: "Goa offers stunning beaches, vibrant culture, and a perfect blend of relaxation and celebration for your destination wedding.",
    image: "https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?w=800",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800"
    ],
    venues: 45,
    avgCost: "$15K - $35K",
    bestTime: "Nov - Feb",
    publicPageId: 1,
    themes: ["Beach", "Traditional", "Bohemian"]
  },
  {
    name: "Udaipur, India",
    country: "India",
    tagline: "City of Lakes & Royal Palaces",
    description: "Experience regal luxury in the Venice of the East with stunning lake palaces and majestic heritage venues.",
    image: "https://images.unsplash.com/photo-1706961121527-4017856774c7?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1706961121527-4017856774c7?w=800",
      "https://images.unsplash.com/photo-1586873283810-575a221456d1?w=800",
      "https://images.unsplash.com/photo-1598189068148-5a5c69ad24d0?w=800"
    ],
    venues: 38,
    avgCost: "$25K - $60K",
    bestTime: "Oct - Mar",
    publicPageId: 2,
    themes: ["Royal", "Palace", "Traditional"]
  },
  {
    name: "Jaipur, India",
    country: "India",
    tagline: "The Pink City of Royal Heritage",
    description: "Celebrate amidst magnificent forts, palaces, and rich Rajasthani culture in this royal wedding destination.",
    image: "https://images.unsplash.com/photo-1671520427644-33aaf3be7214?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1671520427644-33aaf3be7214?w=800",
      "https://images.unsplash.com/photo-1609766418047-a8e6e608c5cd?w=800",
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800"
    ],
    venues: 42,
    avgCost: "$20K - $50K",
    bestTime: "Oct - Mar",
    publicPageId: 3,
    themes: ["Royal", "Traditional", "Palace", "Vintage"]
  },
  {
    name: "Kerala, India",
    country: "India",
    tagline: "God's Own Country",
    description: "Lush backwaters, tropical greenery, and serene houseboats create an intimate and natural wedding setting.",
    image: "https://images.unsplash.com/photo-1680599022555-57fb95b64b5c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1680599022555-57fb95b64b5c?w=800",
      "https://images.unsplash.com/photo-1602216056289-79def7eaaa7e?w=800",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800"
    ],
    venues: 28,
    avgCost: "$18K - $40K",
    bestTime: "Sep - Mar",
    publicPageId: 4,
    themes: ["Garden", "Beach", "Bohemian", "Traditional"]
  },
  {
    name: "Bali, Indonesia",
    country: "Indonesia",
    tagline: "Island of Gods & Tropical Beauty",
    description: "Exotic temples, pristine beaches, and lush rice terraces make Bali a dreamy tropical wedding destination.",
    image: "https://images.unsplash.com/photo-1710563142972-e1f1f018346b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1710563142972-e1f1f018346b?w=800",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800"
    ],
    venues: 52,
    avgCost: "$12K - $30K",
    bestTime: "Apr - Oct",
    publicPageId: 5,
    themes: ["Beach", "Garden", "Bohemian", "Traditional"]
  },
  {
    name: "Phuket, Thailand",
    country: "Thailand",
    tagline: "Andaman Pearl",
    description: "Crystal clear waters, white sandy beaches, and world-class resorts for an unforgettable beach wedding.",
    image: "https://images.unsplash.com/photo-1714785520961-1fc8d7360f3b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1714785520961-1fc8d7360f3b?w=800",
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800"
    ],
    venues: 48,
    avgCost: "$15K - $35K",
    bestTime: "Nov - Apr",
    publicPageId: 6,
    themes: ["Beach", "Modern", "Minimal"]
  },
  {
    name: "Santorini, Greece",
    country: "Greece",
    tagline: "Aegean Paradise",
    description: "Iconic white-washed buildings, blue domes, and breathtaking sunsets create the most romantic wedding backdrop.",
    image: "https://images.unsplash.com/photo-1720535594377-1a8a890b0718?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1720535594377-1a8a890b0718?w=800",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800"
    ],
    venues: 35,
    avgCost: "$30K - $70K",
    bestTime: "Apr - Oct",
    publicPageId: 7,
    themes: ["Beach", "Modern", "Minimal", "Contemporary"]
  },
  {
    name: "Tuscany, Italy",
    country: "Italy",
    tagline: "Renaissance Romance",
    description: "Rolling hills, vineyard estates, and medieval villages offer the perfect blend of rustic charm and elegance.",
    image: "https://images.unsplash.com/photo-1609523698456-84f8afdba194?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1609523698456-84f8afdba194?w=800",
      "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?w=800",
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800"
    ],
    venues: 56,
    avgCost: "$25K - $50K",
    bestTime: "May - Oct",
    publicPageId: 1,
    themes: ["Rustic", "Garden", "Vintage", "Bohemian"]
  },
  {
    name: "Dubai, UAE",
    country: "UAE",
    tagline: "Modern Luxury & Arabian Nights",
    description: "Ultra-modern venues, desert landscapes, and unparalleled luxury for a truly spectacular celebration.",
    image: "https://images.unsplash.com/photo-1743819458014-f5cf74f175e3?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1743819458014-f5cf74f175e3?w=800",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800"
    ],
    venues: 62,
    avgCost: "$35K - $80K",
    bestTime: "Nov - Mar",
    publicPageId: 8,
    themes: ["Modern", "Royal", "Contemporary"]
  },
  {
    name: "Maldives",
    country: "Maldives",
    tagline: "Tropical Paradise",
    description: "Overwater villas, turquoise lagoons, and pristine beaches for an intimate island wedding experience.",
    image: "https://images.unsplash.com/photo-1663679508314-b68d8da82409?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1663679508314-b68d8da82409?w=800",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800"
    ],
    venues: 32,
    avgCost: "$40K - $90K",
    bestTime: "Nov - Apr",
    publicPageId: 9,
    themes: ["Beach", "Minimal", "Modern"]
  },
];

const colorPalettes = [
  { name: "Rose Gold", colors: ["#B76E79", "#E8B4B8", "#FFFFFF", "#F7E7CE"] },
  { name: "Royal Blue", colors: ["#1E3A8A", "#3B82F6", "#DBEAFE", "#FCD34D"] },
  { name: "Emerald Green", colors: ["#065F46", "#10B981", "#D1FAE5", "#FFFFFF"] },
  { name: "Sunset", colors: ["#F97316", "#FDE047", "#FCA5A5", "#FFFFFF"] },
  { name: "Lavender", colors: ["#7C3AED", "#C4B5FD", "#F3E8FF", "#FFFFFF"] },
  { name: "Blush Pink", colors: ["#DB2777", "#F9A8D4", "#FCE7F3", "#FFFFFF"] },
  { name: "Champagne Gold", colors: ["#D4AF37", "#F5E6D3", "#FFFFFF", "#8B7355"] },
  { name: "Burgundy", colors: ["#800020", "#C04848", "#F5E6E8", "#FFFFFF"] },
  { name: "Navy & Coral", colors: ["#001F3F", "#FF6F61", "#FFE5E0", "#FFFFFF"] },
  { name: "Sage Green", colors: ["#9CAF88", "#E8EFE3", "#FFFFFF", "#B7C9A8"] },
];

const inspirationDetails = [
  {
    id: 1,
    name: "Traditional Mandap Decor",
    category: "Decor",
    image: "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800",
    description: "Elaborate mandap designs with traditional elements, rich fabrics, and cultural significance. Perfect for couples celebrating their heritage with vibrant colors and time-honored rituals.",
    themes: ["Traditional", "Royal", "Palace"],
    colorPalettes: ["Rose Gold", "Burgundy", "Royal Blue"],
    colors: ["#B76E79", "#800020", "#1E3A8A", "#F7E7CE"],
    tags: ["Traditional", "Mandap", "Cultural", "Vibrant", "Ceremonial"],
    saves: 2341,
    views: 15420,
    userName: "Priya Sharma",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    photographer: "Rajesh Kumar",
    location: "Udaipur, India",
    gallery: [
      "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800",
      "https://images.unsplash.com/photo-1586934280706-262a90ddd743?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  {
    id: 2,
    name: "Beach Ceremony Setup",
    category: "Ceremonies",
    image: "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800",
    description: "Elegant beachfront ceremonies with natural elements, flowing fabrics, and ocean views. Say 'I do' with your toes in the sand and the sunset as your backdrop.",
    themes: ["Beach", "Bohemian", "Minimal"],
    colorPalettes: ["Sunset", "Blush Pink", "Champagne Gold"],
    colors: ["#F97316", "#DB2777", "#D4AF37", "#FFFFFF"],
    tags: ["Beach", "Oceanfront", "Sunset", "Natural", "Tropical"],
    saves: 3876,
    views: 24130,
    userName: "Emma Wilson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    photographer: "Michael Costa",
    location: "Santorini, Greece",
    gallery: [
      "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1733686891008-f30ac27128ab?w=800"
    ]
  },
  {
    id: 3,
    name: "Modern Minimalist",
    category: "Style",
    image: "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?w=800",
    description: "Clean lines, contemporary aesthetics, and sophisticated simplicity for modern couples. Sleek design with minimal decor and maximum impact.",
    themes: ["Modern", "Minimal", "Contemporary"],
    colorPalettes: ["Emerald Green", "Sage Green", "Lavender"],
    colors: ["#065F46", "#9CAF88", "#7C3AED", "#FFFFFF"],
    tags: ["Modern", "Minimalist", "Clean Lines", "Contemporary", "Sophisticated"],
    saves: 2987,
    views: 18650,
    userName: "Alex Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    photographer: "Sarah Johnson",
    location: "New York, USA",
    gallery: [
      "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      "https://images.unsplash.com/photo-1692897507174-18888393e47f?w=800"
    ]
  },
  {
    id: 4,
    name: "Garden Floral Design",
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1759490821541-f78bb13a752d?w=800",
    description: "Lush garden settings with abundant blooms, natural greenery, and romantic ambiance. Transform any space into a botanical paradise.",
    themes: ["Garden", "Bohemian", "Rustic"],
    colorPalettes: ["Blush Pink", "Lavender", "Sage Green"],
    colors: ["#DB2777", "#7C3AED", "#9CAF88", "#F7E7CE"],
    tags: ["Garden", "Floral", "Blooms", "Greenery", "Romantic"],
    saves: 4521,
    views: 31240,
    userName: "Sophia Martinez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    photographer: "Emma Richardson",
    location: "Tuscany, Italy",
    gallery: [
      "https://images.unsplash.com/photo-1759490821541-f78bb13a752d?w=800",
      "https://images.unsplash.com/photo-1625898383235-31693eb35064?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    ]
  },
  {
    id: 5,
    name: "Royal Palace Setting",
    category: "Venues",
    image: "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
    description: "Grand palace venues with opulent decor, crystal chandeliers, and regal elegance. Live like royalty on your special day.",
    themes: ["Royal", "Palace", "Traditional"],
    colorPalettes: ["Royal Blue", "Champagne Gold", "Burgundy"],
    colors: ["#1E3A8A", "#D4AF37", "#800020", "#FFFFFF"],
    tags: ["Palace", "Royal", "Opulent", "Chandelier", "Regal"],
    saves: 5234,
    views: 41560,
    userName: "Victoria Laurent",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria",
    photographer: "Pierre Dubois",
    location: "Versailles, France",
    gallery: [
      "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
      "https://images.unsplash.com/photo-1756190564669-215843660e93?w=800",
      "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800"
    ]
  },
  {
    id: 6,
    name: "Rustic Barn Charm",
    category: "Venues",
    image: "https://images.unsplash.com/photo-1674970538959-e7475d8d376f?w=800",
    description: "Charming countryside barns with wooden accents, string lights, and pastoral beauty. Country elegance at its finest.",
    themes: ["Rustic", "Vintage", "Bohemian"],
    colorPalettes: ["Sunset", "Champagne Gold", "Sage Green"],
    colors: ["#F97316", "#D4AF37", "#9CAF88", "#8B7355"],
    tags: ["Rustic", "Barn", "Countryside", "String Lights", "Vintage"],
    saves: 3654,
    views: 27890,
    userName: "Isabella Rose",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    photographer: "Jake Morrison",
    location: "Nashville, USA",
    gallery: [
      "https://images.unsplash.com/photo-1674970538959-e7475d8d376f?w=800",
      "https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  {
    id: 7,
    name: "Vintage Romance",
    category: "Style",
    image: "https://images.unsplash.com/photo-1714972383498-7d5be995a145?w=800",
    description: "Nostalgic vintage details with antique elements, classic romance, and timeless charm. Step back in time for your perfect day.",
    themes: ["Vintage", "Rustic", "Garden"],
    colorPalettes: ["Rose Gold", "Blush Pink", "Champagne Gold"],
    colors: ["#B76E79", "#DB2777", "#D4AF37", "#F5E6D3"],
    tags: ["Vintage", "Antique", "Classic", "Romantic", "Timeless"],
    saves: 2876,
    views: 19340,
    userName: "Charlotte Lee",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte",
    photographer: "Oliver Thompson",
    location: "Paris, France",
    gallery: [
      "https://images.unsplash.com/photo-1714972383498-7d5be995a145?w=800",
      "https://images.unsplash.com/photo-1640522196033-e95ec1e93c8c?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  {
    id: 8,
    name: "Contemporary Elegance",
    category: "Style",
    image: "https://images.unsplash.com/photo-1760933991347-fe6c3f241a2d?w=800",
    description: "Trendy modern designs with artistic flair, innovative concepts, and stylish sophistication. Push boundaries with contemporary style.",
    themes: ["Contemporary", "Modern", "Minimal"],
    colorPalettes: ["Navy & Coral", "Emerald Green", "Lavender"],
    colors: ["#001F3F", "#FF6F61", "#065F46", "#7C3AED"],
    tags: ["Contemporary", "Modern", "Artistic", "Innovative", "Stylish"],
    saves: 3298,
    views: 22170,
    userName: "Liam Anderson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    photographer: "Ava Martinez",
    location: "Miami, USA",
    gallery: [
      "https://images.unsplash.com/photo-1760933991347-fe6c3f241a2d?w=800",
      "https://images.unsplash.com/photo-1615559682366-0629e6668b2f?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
    ]
  },
  {
    id: 9,
    name: "Bohemian Chic",
    category: "Style",
    image: "https://images.unsplash.com/photo-1620255132899-ea11bf235072?w=800",
    description: "Free-spirited boho vibes with eclectic details, natural textures, and artistic touches. Embrace the unconventional with bohemian style.",
    themes: ["Bohemian", "Beach", "Garden"],
    colorPalettes: ["Sunset", "Sage Green", "Blush Pink"],
    colors: ["#F97316", "#9CAF88", "#DB2777", "#F5E6D3"],
    tags: ["Bohemian", "Boho", "Eclectic", "Natural", "Free-spirited"],
    saves: 4109,
    views: 28450,
    userName: "Mia Taylor",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
    photographer: "Noah Davis",
    location: "Bali, Indonesia",
    gallery: [
      "https://images.unsplash.com/photo-1620255132899-ea11bf235072?w=800",
      "https://images.unsplash.com/photo-1704455305845-d5f66a560e6f?w=800",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800"
    ]
  },
  {
    id: 10,
    name: "Luxury Tablescapes",
    category: "Table Settings",
    image: "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
    description: "Stunning table settings with elegant linens, fine china, and exquisite centerpieces. Dine in style with sophisticated table design.",
    themes: ["Royal", "Palace", "Modern"],
    colorPalettes: ["Champagne Gold", "Royal Blue", "Burgundy"],
    colors: ["#D4AF37", "#1E3A8A", "#800020", "#FFFFFF"],
    tags: ["Tablescape", "Luxury", "Fine Dining", "Elegant", "Centerpiece"],
    saves: 3987,
    views: 25680,
    userName: "Ethan White",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    photographer: "James Brown",
    location: "Dubai, UAE",
    gallery: [
      "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
      "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800"
    ]
  },
  {
    id: 11,
    name: "Elegant Floral Arches",
    category: "Ceremonies",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
    description: "Breathtaking floral archways adorned with cascading blooms, greenery, and romantic accents. Create a stunning focal point for your ceremony.",
    themes: ["Garden", "Romantic", "Bohemian"],
    colorPalettes: ["Blush Pink", "Sage Green", "Lavender"],
    colors: ["#DB2777", "#9CAF88", "#7C3AED", "#FFFFFF"],
    tags: ["Floral Arch", "Ceremony", "Flowers", "Romantic", "Garden"],
    saves: 4567,
    views: 32190,
    userName: "Grace Thompson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    photographer: "David Martinez",
    location: "Napa Valley, USA",
    gallery: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
      "https://images.unsplash.com/photo-1641834916652-c7436fd6f99a?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  {
    id: 12,
    name: "Industrial Warehouse Vibes",
    category: "Venues",
    image: "https://images.unsplash.com/photo-1542885151-0b0e1b9e6d6a?w=800",
    description: "Urban industrial spaces with exposed brick, high ceilings, and modern aesthetic. Perfect for couples seeking edgy sophistication.",
    themes: ["Modern", "Contemporary", "Minimal"],
    colorPalettes: ["Navy & Coral", "Emerald Green", "Sage Green"],
    colors: ["#001F3F", "#FF6F61", "#065F46", "#9CAF88"],
    tags: ["Industrial", "Urban", "Modern", "Warehouse", "Edgy"],
    saves: 2876,
    views: 19340,
    userName: "Jackson Ford",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jackson",
    photographer: "Tyler Ross",
    location: "Brooklyn, USA",
    gallery: [
      "https://images.unsplash.com/photo-1542885151-0b0e1b9e6d6a?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    ]
  },
  {
    id: 13,
    name: "Candlelight Romance",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=800",
    description: "Ambient candlelit settings creating warm, intimate atmosphere with flickering lights and soft glow. Perfect for evening celebrations.",
    themes: ["Romantic", "Vintage", "Garden"],
    colorPalettes: ["Champagne Gold", "Blush Pink", "Burgundy"],
    colors: ["#D4AF37", "#DB2777", "#800020", "#F7E7CE"],
    tags: ["Candles", "Lighting", "Romantic", "Ambient", "Evening"],
    saves: 3421,
    views: 23450,
    userName: "Sophie Anderson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    photographer: "Lucas Bennett",
    location: "Prague, Czech Republic",
    gallery: [
      "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=800",
      "https://images.unsplash.com/photo-1759760895771-a7f56d9843e4?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  {
    id: 14,
    name: "Desert Sunset Ceremony",
    category: "Venues",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800",
    description: "Dramatic desert landscapes with golden hour lighting, vast open skies, and natural beauty. Unique and unforgettable wedding backdrop.",
    themes: ["Bohemian", "Minimal", "Contemporary"],
    colorPalettes: ["Sunset", "Sage Green", "Champagne Gold"],
    colors: ["#F97316", "#9CAF88", "#D4AF37", "#FFFFFF"],
    tags: ["Desert", "Sunset", "Landscape", "Bohemian", "Unique"],
    saves: 2654,
    views: 18920,
    userName: "Maya Patel",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    photographer: "Jordan Hayes",
    location: "Arizona, USA",
    gallery: [
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800",
      "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    ]
  },
  {
    id: 15,
    name: "Luxe Crystal Details",
    category: "Decor",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    description: "Opulent crystal embellishments, sparkling chandeliers, and glamorous details. Add a touch of luxury and shimmer to your celebration.",
    themes: ["Palace", "Royal", "Modern"],
    colorPalettes: ["Champagne Gold", "Royal Blue", "Rose Gold"],
    colors: ["#D4AF37", "#1E3A8A", "#B76E79", "#FFFFFF"],
    tags: ["Crystal", "Luxury", "Glamour", "Chandelier", "Opulent"],
    saves: 4789,
    views: 35670,
    userName: "Anastasia Romanov",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anastasia",
    photographer: "Dmitri Volkov",
    location: "St. Petersburg, Russia",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
      "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
      "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800"
    ]
  },
  {
    id: 16,
    name: "Whimsical Fairy Lights",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    description: "Enchanting fairy light installations creating magical atmosphere. String lights, Edison bulbs, and twinkling accents for dreamy ambiance.",
    themes: ["Rustic", "Garden", "Bohemian"],
    colorPalettes: ["Sunset", "Champagne Gold", "Blush Pink"],
    colors: ["#F97316", "#D4AF37", "#DB2777", "#FFFFFF"],
    tags: ["Fairy Lights", "String Lights", "Magical", "Whimsical", "Evening"],
    saves: 5123,
    views: 38290,
    userName: "Lily Harper",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily",
    photographer: "Ryan Cooper",
    location: "Cotswolds, UK",
    gallery: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      "https://images.unsplash.com/photo-1723832348105-2e69f948135a?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  {
    id: 17,
    name: "Tropical Greenery Decor",
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?w=800",
    description: "Lush tropical foliage, monstera leaves, and exotic blooms. Bring paradise to your wedding with vibrant greenery and bold botanicals.",
    themes: ["Beach", "Bohemian", "Modern"],
    colorPalettes: ["Emerald Green", "Sunset", "Blush Pink"],
    colors: ["#065F46", "#F97316", "#DB2777", "#FFFFFF"],
    tags: ["Tropical", "Greenery", "Botanical", "Exotic", "Lush"],
    saves: 3765,
    views: 26540,
    userName: "Luna Martinez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    photographer: "Carlos Rivera",
    location: "Costa Rica",
    gallery: [
      "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?w=800",
      "https://images.unsplash.com/photo-1759490821541-f78bb13a752d?w=800",
      "https://images.unsplash.com/photo-1625898383235-31693eb35064?w=800"
    ]
  },
  {
    id: 18,
    name: "Minimalist White & Green",
    category: "Style",
    image: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800",
    description: "Clean white palette with fresh greenery accents. Sophisticated minimalism with natural elements for a modern, elegant aesthetic.",
    themes: ["Minimal", "Modern", "Garden"],
    colorPalettes: ["Sage Green", "Emerald Green", "Champagne Gold"],
    colors: ["#9CAF88", "#065F46", "#D4AF37", "#FFFFFF"],
    tags: ["Minimalist", "White", "Green", "Clean", "Modern"],
    saves: 4234,
    views: 29870,
    userName: "Emma Clarke",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma2",
    photographer: "Nina Petersen",
    location: "Copenhagen, Denmark",
    gallery: [
      "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800",
      "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
    ]
  },
];

const vendorsByCategory = {
  planner: [
    {
      id: 1,
      name: "Elite Wedding Planners",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800"
      ],
      rating: 4.9,
      reviews: 156,
      startingPrice: "$5,000",
      specialties: ["Destination Weddings", "Traditional Ceremonies", "Luxury Events"],
      verified: true,
      themeBased: true,
      events: 200
    },
    {
      id: 2,
      name: "Dreamday Events",
      location: "Goa, India",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800"
      ],
      rating: 4.8,
      reviews: 142,
      startingPrice: "$4,500",
      specialties: ["Beach Weddings", "Intimate Gatherings", "Modern Events"],
      verified: true,
      themeBased: true,
      events: 180
    },
    {
      id: 3,
      name: "Royal Events & Co",
      location: "Udaipur, India",
      image: "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
        "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800"
      ],
      rating: 5.0,
      reviews: 98,
      startingPrice: "$8,000",
      specialties: ["Royal Weddings", "Palace Venues", "Grand Celebrations"],
      verified: true,
      themeBased: false,
      events: 120
    },
    {
      id: 4,
      name: "Modern Celebrations",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800"
      ],
      rating: 4.7,
      reviews: 124,
      startingPrice: "$3,500",
      specialties: ["Contemporary Weddings", "Urban Venues", "Minimalist Design"],
      verified: true,
      themeBased: true,
      events: 165
    },
  ],
  photographer: [
    {
      id: 1,
      name: "Lens & Light Studios",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
      ],
      rating: 4.9,
      reviews: 203,
      startingPrice: "$2,500",
      specialties: ["Candid Photography", "Drone Shots", "Cinematic Style"],
      verified: true,
      themeBased: true,
      portfolio: 500
    },
    {
      id: 2,
      name: "Forever Moments Photography",
      location: "Jaipur, India",
      image: "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800",
        "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800"
      ],
      rating: 4.8,
      reviews: 187,
      startingPrice: "$2,200",
      specialties: ["Traditional Weddings", "Cultural Photography", "Heritage Venues"],
      verified: true,
      themeBased: true,
      portfolio: 450
    },
    {
      id: 3,
      name: "Beach Stories",
      location: "Goa, India",
      image: "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
      ],
      rating: 4.9,
      reviews: 165,
      startingPrice: "$2,800",
      specialties: ["Beach Weddings", "Sunset Photography", "Destination Shoots"],
      verified: true,
      themeBased: true,
      portfolio: 380
    },
    {
      id: 4,
      name: "Artisan Photography",
      location: "Kerala, India",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800"
      ],
      rating: 4.7,
      reviews: 142,
      startingPrice: "$2,000",
      specialties: ["Natural Light", "Garden Weddings", "Artistic Portraits"],
      verified: true,
      themeBased: false,
      portfolio: 320
    },
  ],
  videographer: [
    {
      id: 1,
      name: "Cinematic Weddings",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
      ],
      rating: 4.9,
      reviews: 178,
      startingPrice: "$3,000",
      specialties: ["Cinematic Films", "Drone Videography", "Same Day Edit"],
      verified: true,
      themeBased: true,
      films: 250
    },
    {
      id: 2,
      name: "Love Story Films",
      location: "Udaipur, India",
      image: "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800"
      ],
      rating: 4.8,
      reviews: 156,
      startingPrice: "$2,800",
      specialties: ["Romantic Films", "Palace Weddings", "Documentary Style"],
      verified: true,
      themeBased: true,
      films: 220
    },
    {
      id: 3,
      name: "Destination Films Co",
      location: "Goa, India",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
      ],
      rating: 4.9,
      reviews: 134,
      startingPrice: "$3,200",
      specialties: ["Beach Weddings", "Travel Films", "Aerial Shots"],
      verified: true,
      themeBased: true,
      films: 190
    },
  ],
  makeup: [
    {
      id: 1,
      name: "Glamour by Priya",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800",
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800",
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800"
      ],
      rating: 5.0,
      reviews: 245,
      startingPrice: "$800",
      specialties: ["Bridal Makeup", "HD Makeup", "Traditional Look"],
      verified: true,
      themeBased: true,
      clients: 400
    },
    {
      id: 2,
      name: "Royal Makeovers",
      location: "Jaipur, India",
      image: "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800",
        "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800"
      ],
      rating: 4.9,
      reviews: 198,
      startingPrice: "$900",
      specialties: ["Traditional Bridal", "Rajasthani Look", "Hair Styling"],
      verified: true,
      themeBased: true,
      clients: 350
    },
    {
      id: 3,
      name: "Modern Glam Studio",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800",
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800",
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800"
      ],
      rating: 4.8,
      reviews: 167,
      startingPrice: "$700",
      specialties: ["Contemporary Look", "Airbrush Makeup", "Minimalist Style"],
      verified: true,
      themeBased: true,
      clients: 320
    },
  ],
  decorator: [
    {
      id: 1,
      name: "Floral Fantasy Decor",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800"
      ],
      rating: 4.9,
      reviews: 189,
      startingPrice: "$6,000",
      specialties: ["Floral Installations", "Mandap Design", "Grand Entrances"],
      verified: true,
      themeBased: true,
      events: 280
    },
    {
      id: 2,
      name: "Royal Decor Events",
      location: "Udaipur, India",
      image: "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
        "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800",
        "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800"
      ],
      rating: 5.0,
      reviews: 156,
      startingPrice: "$8,500",
      specialties: ["Palace Decor", "Luxury Styling", "Traditional Themes"],
      verified: true,
      themeBased: false,
      events: 210
    },
    {
      id: 3,
      name: "Beach Vibes Decor",
      location: "Goa, India",
      image: "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
      ],
      rating: 4.8,
      reviews: 142,
      startingPrice: "$5,500",
      specialties: ["Beach Setups", "Tropical Themes", "Outdoor Events"],
      verified: true,
      themeBased: true,
      events: 190
    },
  ],
  dj: [
    {
      id: 1,
      name: "DJ Beats & Beyond",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
      ],
      rating: 4.8,
      reviews: 167,
      startingPrice: "$1,500",
      specialties: ["Bollywood Mix", "EDM", "Live Remixing"],
      verified: true,
      themeBased: true,
      events: 350
    },
    {
      id: 2,
      name: "Royal Sounds Entertainment",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800"
      ],
      rating: 4.9,
      reviews: 198,
      startingPrice: "$1,800",
      specialties: ["Traditional Music", "Live Band", "Classical Fusion"],
      verified: true,
      themeBased: false,
      events: 290
    },
    {
      id: 3,
      name: "Beach Party DJ",
      location: "Goa, India",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800"
      ],
      rating: 4.7,
      reviews: 145,
      startingPrice: "$1,200",
      specialties: ["Beach Parties", "Tropical Vibes", "Sunset Sessions"],
      verified: true,
      themeBased: true,
      events: 270
    },
  ],
};

const themeDetails = [
  { 
    name: "Traditional", 
    image: "https://images.unsplash.com/photo-1629587424603-f117664faf1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHdlZGRpbmclMjBkZWNvcnxlbnwxfHx8fDE3NjExNzE1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Honor your heritage with rich cultural elements, vibrant colors, and time-honored rituals. Perfect for couples who want to celebrate their roots with elaborate ceremonies and traditional decor.",
    features: ["Cultural Rituals", "Rich Colors", "Traditional Attire", "Ceremonial Music"],
    gallery: [
      "https://images.unsplash.com/photo-1629587424603-f117664faf1c?w=800",
      "https://images.unsplash.com/photo-1586934280706-262a90ddd743?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  { 
    name: "Modern", 
    image: "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWRkaW5nJTIwbWluaW1hbHxlbnwxfHx8fDE3NjExNzE1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Sleek, contemporary styling with clean lines and sophisticated aesthetics. Ideal for couples who appreciate minimalist design and want a chic, urban celebration.",
    features: ["Clean Lines", "Neutral Palette", "Contemporary Venue", "Minimalist Decor"],
    gallery: [
      "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?w=800",
      "https://images.unsplash.com/photo-1692897507174-18888393e47f?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
    ]
  },
  { 
    name: "Beach", 
    image: "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjB0cm9waWNhbHxlbnwxfHx8fDE3NjExNzE1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Say 'I do' with your toes in the sand. Relaxed, romantic seaside celebrations with ocean breezes, tropical flowers, and stunning sunset backdrops.",
    features: ["Oceanfront Setting", "Tropical Flowers", "Light Fabrics", "Sunset Ceremony"],
    gallery: [
      "https://images.unsplash.com/photo-1569976088853-abf1c2cb282a?w=800",
      "https://images.unsplash.com/photo-1733686891008-f30ac27128ab?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    ]
  },
  { 
    name: "Royal", 
    image: "https://images.unsplash.com/photo-1610379230744-2260350e2f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3lhbCUyMHBhbGFjZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzYxMTcxNTM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Experience regal grandeur with opulent venues, luxurious details, and majestic ambiance. Perfect for couples who want a fairy-tale celebration with no expense spared.",
    features: ["Grand Venues", "Luxury Decor", "Royal Colors", "Elaborate Details"],
    gallery: [
      "https://images.unsplash.com/photo-1610379230744-2260350e2f17?w=800",
      "https://images.unsplash.com/photo-1756190564669-215843660e93?w=800",
      "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800"
    ]
  },
  { 
    name: "Minimal", 
    image: "https://images.unsplash.com/photo-1551546897-0cf94d9bb428?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2VkZGluZyUyMHNpbXBsZXxlbnwxfHx8fDE3NjExNzE1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Less is more. Elegant simplicity with understated beauty, focusing on meaningful moments rather than elaborate decorations. Perfect for intimate, refined celebrations.",
    features: ["Simple Elegance", "Neutral Tones", "Intimate Setting", "Refined Details"],
    gallery: [
      "https://images.unsplash.com/photo-1551546897-0cf94d9bb428?w=800",
      "https://images.unsplash.com/photo-1543693353-d019fc56cc88?w=800",
      "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800"
    ]
  },
  { 
    name: "Bohemian", 
    image: "https://images.unsplash.com/photo-1620255132899-ea11bf235072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hlbWlhbiUyMHdlZGRpbmclMjBib2hvfGVufDF8fHx8MTc2MTE3MTUzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Free-spirited and artistic with natural elements, eclectic decor, and laid-back vibes. Ideal for couples who embrace creativity and unconventional beauty.",
    features: ["Natural Elements", "Eclectic Decor", "Outdoor Setting", "Artistic Touches"],
    gallery: [
      "https://images.unsplash.com/photo-1620255132899-ea11bf235072?w=800",
      "https://images.unsplash.com/photo-1704455305845-d5f66a560e6f?w=800",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800"
    ]
  },
  { 
    name: "Rustic", 
    image: "https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjB3ZWRkaW5nJTIwYmFybnxlbnwxfHx8fDE3NjEwNzg0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Charming countryside celebration with wooden textures, mason jars, and pastoral settings. Perfect for couples who love nature and vintage-inspired aesthetics.",
    features: ["Barn Venues", "Wooden Accents", "Wildflowers", "Country Charm"],
    gallery: [
      "https://images.unsplash.com/photo-1674970538959-e7475d8d376f?w=800",
      "https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  { 
    name: "Garden", 
    image: "https://images.unsplash.com/photo-1759490821541-f78bb13a752d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB3ZWRkaW5nJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NjExMzc0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Lush outdoor celebration surrounded by blooming flowers and natural beauty. Romantic and fresh, perfect for spring and summer weddings.",
    features: ["Floral Abundance", "Outdoor Ceremony", "Garden Venue", "Natural Lighting"],
    gallery: [
      "https://images.unsplash.com/photo-1759490821541-f78bb13a752d?w=800",
      "https://images.unsplash.com/photo-1625898383235-31693eb35064?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    ]
  },
  { 
    name: "Palace", 
    image: "https://images.unsplash.com/photo-1533415993974-b0f07b91d967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxhY2UlMjB3ZWRkaW5nJTIwbHV4dXJ5fGVufDF8fHx8MTc2MTE3MTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Spectacular celebration in historic palaces with magnificent architecture, crystal chandeliers, and stately elegance. Ultimate luxury and sophistication.",
    features: ["Historic Venue", "Grand Architecture", "Crystal Chandeliers", "Luxury Service"],
    gallery: [
      "https://images.unsplash.com/photo-1533415993974-b0f07b91d967?w=800",
      "https://images.unsplash.com/photo-1759519238029-689e99c6d19e?w=800",
      "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=800"
    ]
  },
  { 
    name: "Vintage", 
    image: "https://images.unsplash.com/photo-1714972383498-7d5be995a145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd2VkZGluZyUyMGNsYXNzaWN8ZW58MXx8fHwxNzYxMTcxNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Nostalgic celebration with antique details, classic romance, and timeless elegance. Perfect for couples who appreciate history and retro charm.",
    features: ["Antique Details", "Classic Romance", "Retro Elements", "Timeless Style"],
    gallery: [
      "https://images.unsplash.com/photo-1714972383498-7d5be995a145?w=800",
      "https://images.unsplash.com/photo-1640522196033-e95ec1e93c8c?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ]
  },
  { 
    name: "Contemporary", 
    image: "https://images.unsplash.com/photo-1760933991347-fe6c3f241a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjB3ZWRkaW5nJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjExNzE1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Current trends with innovative design, artistic flair, and modern sophistication. For couples who want a cutting-edge celebration that's fashion-forward.",
    features: ["Trendy Design", "Artistic Elements", "Modern Venue", "Stylish Details"],
    gallery: [
      "https://images.unsplash.com/photo-1760933991347-fe6c3f241a2d?w=800",
      "https://images.unsplash.com/photo-1615559682366-0629e6668b2f?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
    ]
  },
];

export function WeddingBuilderPage({ onExit }: WeddingBuilderPageProps) {
  // Helper function to get vendor category display name
  const getVendorCategoryName = (key: string): string => {
    const categoryNames: { [key: string]: string } = {
      planner: 'Wedding Planner',
      photographer: 'Photographer',
      videographer: 'Videographer',
      makeup: 'Makeup Artist',
      decorator: 'Decorator',
      dj: 'DJ / Entertainment'
    };
    return categoryNames[key] || key;
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedThemeForDialog, setSelectedThemeForDialog] = useState<string | null>(null);
  const [themeGalleryIndex, setThemeGalleryIndex] = useState(0);
  const [selectedDestinationForDialog, setSelectedDestinationForDialog] = useState<string | null>(null);
  const [destinationGalleryIndex, setDestinationGalleryIndex] = useState(0);
  const [destinationSearch, setDestinationSearch] = useState("");
  const [showSavedDestinations, setShowSavedDestinations] = useState(false);
  const [showSavedDestinationsHelper, setShowSavedDestinationsHelper] = useState(false);
  const [hasSeenSavedHelper, setHasSeenSavedHelper] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [showSavedInspirations, setShowSavedInspirations] = useState(false);
  const [inspirationSearch, setInspirationSearch] = useState("");
  const [savedInspirations, setSavedInspirations] = useState<number[]>([1, 3, 5]); // Pre-populated with example saved inspirations
  const [showAllInspirations, setShowAllInspirations] = useState(false);
  const [showAllColorPalettes, setShowAllColorPalettes] = useState(false);
  const [selectedInspirationForDialog, setSelectedInspirationForDialog] = useState<number | null>(null);
  const [inspirationGalleryIndex, setInspirationGalleryIndex] = useState(0);
  const [savedDestinations, setSavedDestinations] = useState<string[]>([
    "Goa, India",
    "Udaipur, India", 
    "Santorini, Greece"
  ]); // Pre-populated with example saved destinations
  const [expandedVendorCategory, setExpandedVendorCategory] = useState<string | null>(null);
  const [showSavedVendors, setShowSavedVendors] = useState(false);
  const [savedVendors, setSavedVendors] = useState<{[key: string]: number[]}>({
    planner: [1, 2],
    photographer: [1, 3],
    videographer: [1],
    makeup: [1],
    decorator: [1, 3],
    dj: [2]
  }); // Pre-populated with example saved vendors
  const [selectedVendorForDialog, setSelectedVendorForDialog] = useState<{vendor: any, category: string} | null>(null);
  const [vendorGalleryIndex, setVendorGalleryIndex] = useState(0);
  const [isLoggedIn] = useState(true); // This would come from auth context in real app
  const [weddingPlan, setWeddingPlan] = useState<WeddingPlan>({
    guestSize: 200,
    weddingType: '',
    theme: '',
    budget: [500000],
    dates: [],
    duration: 3,
    destination: '',
    weatherPreference: '',
    visaRequired: '',
    colorPalette: [],
    inspirationImages: [],
    selectedInspirations: [],
    styles: [],
    selectedVendors: {},
    selectedVenues: [],
    guestOrigins: [],
    guestNationalities: [],
  });

  const updatePlan = (updates: Partial<WeddingPlan>) => {
    setWeddingPlan(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-16 md:pt-20">
      <div className="container mx-auto px-3 md:px-6 lg:px-8 py-4 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <Button variant="outline" onClick={onExit} className="gap-2 text-sm md:text-base h-9 md:h-10 px-3 md:px-4">
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Exit Builder</span>
            <span className="sm:hidden">Exit</span>
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center" style={{ fontFamily: 'Volkhov, serif' }}>
            <span className="hidden sm:inline">Wedding Builder</span>
            <span className="sm:hidden">Builder</span>
          </h1>
          <div className="w-16 sm:w-24 md:w-32" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Steps */}
        <Card className="p-3 md:p-6 mb-4 md:mb-8 shadow-lg overflow-x-auto">
          <div className="flex items-center justify-between min-w-max md:min-w-0">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className="flex flex-col items-center flex-1 group"
                  >
                    <div
                      className={`size-8 md:size-10 lg:size-12 rounded-full flex items-center justify-center mb-1 md:mb-2 transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : isCurrent
                          ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white'
                          : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="size-3 md:size-4 lg:size-6" />
                      ) : (
                        <StepIcon className="size-3 md:size-4 lg:size-6" />
                      )}
                    </div>
                    <p className={`text-[10px] md:text-xs lg:text-sm text-center whitespace-nowrap px-1 ${isCurrent ? 'font-medium' : ''} group-hover:font-medium transition-all`}>
                      <span className="hidden md:inline">{step.name}</span>
                      <span className="md:hidden">{step.name.split(' ')[0]}</span>
                    </p>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 md:h-1 flex-1 mx-1 md:mx-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Step Content */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-4 md:p-6 lg:p-8 shadow-xl min-h-[400px] md:min-h-[600px]">
              {/* Step 0: Event Basics */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Event Basics</h2>
                    <p className="text-muted-foreground">Let's start with the fundamentals of your wedding</p>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="guestSize">Guest Count: {weddingPlan.guestSize}</Label>
                    <Slider
                      id="guestSize"
                      min={50}
                      max={1000}
                      step={10}
                      value={[weddingPlan.guestSize]}
                      onValueChange={(value) => updatePlan({ guestSize: value[0] })}
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {weddingPlan.guestSize < 150 ? 'Intimate' : weddingPlan.guestSize < 300 ? 'Medium' : weddingPlan.guestSize < 500 ? 'Large' : 'Grand'} celebration
                    </p>
                  </div>

                  <div>
                    <Label>Wedding Type</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Card
                        className={`p-6 cursor-pointer transition-all border-2 ${
                          weddingPlan.weddingType === 'destination'
                            ? 'border-[#DF6951] bg-rose-50'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => updatePlan({ weddingType: 'destination' })}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="size-8 text-[#DF6951]" />
                          <div>
                            <h4>Destination Wedding</h4>
                            <p className="text-sm text-muted-foreground">Celebrate at a dream location</p>
                          </div>
                        </div>
                      </Card>
                      <Card
                        className={`p-6 cursor-pointer transition-all border-2 ${
                          weddingPlan.weddingType === 'local'
                            ? 'border-[#DF6951] bg-rose-50'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => updatePlan({ weddingType: 'local' })}
                      >
                        <div className="flex items-center gap-3">
                          <Building2 className="size-8 text-[#DF6951]" />
                          <div>
                            <h4>Local Wedding</h4>
                            <p className="text-sm text-muted-foreground">Close to home celebration</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <Label>Wedding Theme</Label>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">Choose a theme that reflects your style</p>
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {themeDetails.slice(0, showAllThemes ? themeDetails.length : 10).map((theme) => (
                          <Card 
                            key={theme.name}
                            className={`relative cursor-pointer overflow-hidden transition-all group ${
                              weddingPlan.theme === theme.name 
                                ? 'ring-2 ring-[#DF6951] shadow-lg' 
                                : 'hover:shadow-md'
                            }`}
                          >
                            <div 
                              className="relative w-full"
                              style={{ paddingBottom: '100%' }}
                              onClick={() => updatePlan({ theme: theme.name })}
                            >
                              <div className="absolute inset-0">
                                <ImageWithFallback 
                                  src={theme.image}
                                  alt={theme.name}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                
                                {/* Hover Overlay with View More */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button
                                    size="sm"
                                    className="bg-white text-black hover:bg-gray-100 gap-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedThemeForDialog(theme.name);
                                    }}
                                  >
                                    <Eye className="size-4" />
                                    View More
                                  </Button>
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                                  <p className="text-white text-xs sm:text-sm font-semibold text-center">{theme.name}</p>
                                </div>
                                {weddingPlan.theme === theme.name && (
                                  <div className="absolute top-2 right-2 bg-[#DF6951] rounded-full p-1">
                                    <Check className="size-3 sm:size-4 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Show More/Less Button */}
                      {themeDetails.length > 10 && (
                        <div className="flex justify-center mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setShowAllThemes(!showAllThemes)}
                            className="gap-2"
                          >
                            {showAllThemes ? (
                              <>
                                Show Less
                                <ChevronLeft className="size-4" />
                              </>
                            ) : (
                              <>
                                Show More ({themeDetails.length - 10} more themes)
                                <ChevronRight className="size-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Theme Details Dialog */}
                    {themeDetails.map((theme) => (
                      <Dialog 
                        key={theme.name}
                        open={selectedThemeForDialog === theme.name}
                        onOpenChange={(open) => {
                          if (!open) {
                            setSelectedThemeForDialog(null);
                            setThemeGalleryIndex(0);
                          }
                        }}
                      >
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl" style={{ fontFamily: "Volkhov, serif" }}>
                              {theme.name} Wedding Theme
                            </DialogTitle>
                            <DialogDescription className="text-base mt-2">
                              {theme.description}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6 mt-4">
                            {/* Hero Image Gallery */}
                            <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden group">
                              <ImageWithFallback 
                                src={theme.gallery[themeGalleryIndex]}
                                alt={`${theme.name} ${themeGalleryIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                              
                              {/* Navigation Arrows */}
                              <button
                                onClick={() => setThemeGalleryIndex((prev) => 
                                  prev === 0 ? theme.gallery.length - 1 : prev - 1
                                )}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ChevronLeft className="size-6" />
                              </button>
                              <button
                                onClick={() => setThemeGalleryIndex((prev) => 
                                  prev === theme.gallery.length - 1 ? 0 : prev + 1
                                )}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ChevronRight className="size-6" />
                              </button>

                              {/* Image Counter */}
                              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm">
                                {themeGalleryIndex + 1} / {theme.gallery.length}
                              </div>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="flex gap-3 overflow-x-auto pb-2">
                              {theme.gallery.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setThemeGalleryIndex(idx)}
                                  className={`relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
                                    themeGalleryIndex === idx ? 'ring-2 ring-[#DF6951]' : ''
                                  }`}
                                >
                                  <ImageWithFallback 
                                    src={img}
                                    alt={`${theme.name} ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>

                            {/* Features */}
                            <div>
                              <h4 className="font-semibold mb-3">Key Features:</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {theme.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <Check className="size-4 text-[#DF6951] shrink-0" />
                                    <span className="text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                              <Button
                                className="flex-1 bg-[#DF6951] hover:bg-[#c5573d]"
                                onClick={() => {
                                  updatePlan({ theme: theme.name });
                                  setSelectedThemeForDialog(null);
                                  setThemeGalleryIndex(0);
                                }}
                              >
                                <Check className="size-4 mr-2" />
                                Select This Theme
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedThemeForDialog(null);
                                  setThemeGalleryIndex(0);
                                }}
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>

                  <div>
                    <Label>Budget Range: {formatCurrency(weddingPlan.budget[0])}</Label>
                    <Slider
                      min={100000}
                      max={10000000}
                      step={100000}
                      value={weddingPlan.budget}
                      onValueChange={(value) => updatePlan({ budget: value })}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹1L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">Event Duration (days): {weddingPlan.duration}</Label>
                    <Slider
                      id="duration"
                      min={1}
                      max={7}
                      step={1}
                      value={[weddingPlan.duration]}
                      onValueChange={(value) => updatePlan({ duration: value[0] })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Preferred Wedding Date</Label>
                    <Input type="date" className="mt-2" />
                  </div>
                </div>
              )}

              {/* Step 1: Destination */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Choose Your Destination</h2>
                    <p className="text-muted-foreground">Where do you dream of getting married?</p>
                  </div>

                  <Separator />

                  {/* Saved Destinations */}
                  {weddingPlan.destination && (
                    <div className="mb-4">
                      <Label className="mb-2 block">Your Selected Destination</Label>
                      <Card className="p-4 border-2 border-[#DF6951] bg-rose-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <MapPin className="size-5 text-[#DF6951]" />
                            <div>
                              <p className="font-medium">{weddingPlan.destination}</p>
                              <p className="text-xs text-muted-foreground">Saved to wedding plan</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updatePlan({ destination: '' })}
                          >
                            Remove
                          </Button>
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search destinations..."
                      value={destinationSearch}
                      onChange={(e) => setDestinationSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Destination Cards Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>
                        {showSavedDestinations 
                          ? 'Saved Destinations' 
                          : 'Destinations based on selected theme (Beach)'}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={showSavedDestinations ? "default" : "outline"}
                          className={showSavedDestinations ? "bg-[#DF6951] hover:bg-[#c5573d]" : ""}
                          onClick={() => {
                            const newState = !showSavedDestinations;
                            setShowSavedDestinations(newState);
                            // Show helper on first time viewing saved destinations
                            if (newState && !hasSeenSavedHelper) {
                              setShowSavedDestinationsHelper(true);
                            }
                          }}
                        >
                          <ArrowLeftRight className="size-3 mr-1" />
                          {showSavedDestinations ? 'Theme Destinations' : 'Saved Destinations'}
                        </Button>
                        <Button
                          variant="link"
                          className="text-[#DF6951] hover:text-[#c5573d] gap-1 p-0 h-auto"
                          onClick={() => window.location.href = '/destinations'}
                        >
                          Explore More
                          <ExternalLink className="size-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* First-time Helper for Saved Destinations */}
                    {showSavedDestinations && showSavedDestinationsHelper && (
                      <Alert className="mb-4 border-[#DF6951]/20 bg-[#DF6951]/5">
                        <Info className="size-4 text-[#DF6951]" />
                        <AlertDescription className="flex items-start justify-between gap-2">
                          <span className="text-sm">
                            These are the destinations you've saved! You currently have <strong>{savedDestinations.length} destinations</strong> saved. 
                            Click the heart icon on any destination card to add or remove it from your saved list.
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 hover:bg-transparent shrink-0"
                            onClick={() => {
                              setShowSavedDestinationsHelper(false);
                              setHasSeenSavedHelper(true);
                            }}
                          >
                            <X className="size-4 text-muted-foreground hover:text-foreground" />
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {/* Helper for Theme Destinations with Saved Items */}
                    {!showSavedDestinations && weddingPlan.theme && (() => {
                      const matchingSavedCount = destinationDetails.filter(dest => 
                        savedDestinations.includes(dest.name) && 
                        dest.themes?.includes(weddingPlan.theme)
                      ).length;
                      return matchingSavedCount > 0 ? (
                        <Alert className="mb-4 border-[#F1A501]/20 bg-[#F1A501]/5">
                          <Heart className="size-4 text-[#DF6951] fill-[#DF6951]" />
                          <AlertDescription className="text-sm">
                            <strong>{matchingSavedCount}</strong> of your saved destination{matchingSavedCount > 1 ? 's' : ''} match{matchingSavedCount === 1 ? 'es' : ''} the <strong>{weddingPlan.theme}</strong> theme! They're shown at the top.
                          </AlertDescription>
                        </Alert>
                      ) : null;
                    })()}
                    
                    <div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {destinationDetails
                          .filter(dest => {
                            // First filter by saved or theme-based
                            if (showSavedDestinations) {
                              // Show all saved destinations
                              return savedDestinations.includes(dest.name);
                            }
                            // Show all destinations for theme-based view
                            
                            // Then filter by search
                            return dest.name.toLowerCase().includes(destinationSearch.toLowerCase()) ||
                              dest.country.toLowerCase().includes(destinationSearch.toLowerCase()) ||
                              dest.tagline.toLowerCase().includes(destinationSearch.toLowerCase());
                          })
                          .sort((a, b) => {
                            // In theme view, sort saved destinations to the top
                            if (!showSavedDestinations) {
                              const aIsSaved = savedDestinations.includes(a.name);
                              const bIsSaved = savedDestinations.includes(b.name);
                              if (aIsSaved && !bIsSaved) return -1;
                              if (!aIsSaved && bIsSaved) return 1;
                            }
                            return 0;
                          })
                          .slice(0, showAllDestinations ? undefined : 9)
                          .map((dest) => (
                          <Card 
                            key={dest.name}
                            className={`overflow-hidden transition-all group hover:shadow-lg ${
                              weddingPlan.destination === dest.name 
                                ? 'ring-2 ring-[#DF6951]' 
                                : ''
                            }`}
                          >
                            <div className="relative h-48">
                              <ImageWithFallback 
                                src={dest.image}
                                alt={dest.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              
                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDestinationForDialog(dest.name);
                                  }}
                                >
                                  <Eye className="size-4" />
                                  View More
                                </Button>
                              </div>

                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-semibold mb-1">{dest.name}</h3>
                                <p className="text-white/90 text-xs">{dest.tagline}</p>
                              </div>

                              {weddingPlan.destination === dest.name && (
                                <div className="absolute top-2 right-2 bg-[#DF6951] rounded-full p-1">
                                  <Check className="size-4 text-white" />
                                </div>
                              )}
                            </div>

                            <div className="p-4 space-y-3">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{dest.venues} venues</span>
                                <span>{dest.bestTime}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => updatePlan({ destination: dest.name })}
                                >
                                  {weddingPlan.destination === dest.name ? (
                                    <>
                                      <Check className="size-3 mr-1" />
                                      Selected
                                    </>
                                  ) : (
                                    'Select'
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant={savedDestinations.includes(dest.name) ? "default" : "outline"}
                                  className={savedDestinations.includes(dest.name) ? "bg-[#DF6951] hover:bg-[#c5573d]" : ""}
                                  onClick={() => {
                                    if (savedDestinations.includes(dest.name)) {
                                      setSavedDestinations(prev => prev.filter(d => d !== dest.name));
                                    } else {
                                      setSavedDestinations(prev => [...prev, dest.name]);
                                    }
                                  }}
                                >
                                  <Heart className={`size-3 ${savedDestinations.includes(dest.name) ? 'fill-white' : ''}`} />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Show More/Less Button */}
                      {(() => {
                        const filteredDestinations = destinationDetails.filter(dest => {
                          if (showSavedDestinations) {
                            return savedDestinations.includes(dest.name);
                          }
                          return dest.name.toLowerCase().includes(destinationSearch.toLowerCase()) ||
                            dest.country.toLowerCase().includes(destinationSearch.toLowerCase()) ||
                            dest.tagline.toLowerCase().includes(destinationSearch.toLowerCase());
                        });
                        
                        return filteredDestinations.length > 9 && (
                          <div className="flex justify-center mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowAllDestinations(!showAllDestinations)}
                              className="gap-2"
                            >
                              {showAllDestinations ? (
                                <>
                                  Show Less
                                  <ChevronLeft className="size-4" />
                                </>
                              ) : (
                                <>
                                  Show More ({filteredDestinations.length - 9} more destinations)
                                  <ChevronRight className="size-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Destination Details Dialog */}
                  {destinationDetails.map((dest) => (
                    <Dialog 
                      key={dest.name}
                      open={selectedDestinationForDialog === dest.name}
                      onOpenChange={(open) => {
                        if (!open) {
                          setSelectedDestinationForDialog(null);
                          setDestinationGalleryIndex(0);
                        }
                      }}
                    >
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl" style={{ fontFamily: "Volkhov, serif" }}>
                            {dest.name}
                          </DialogTitle>
                          <DialogDescription className="text-base mt-2">
                            {dest.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 mt-4">
                          {/* Hero Image Gallery */}
                          <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden group">
                            <ImageWithFallback 
                              src={dest.gallery[destinationGalleryIndex]}
                              alt={`${dest.name} ${destinationGalleryIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            
                            {/* Navigation Arrows */}
                            <button
                              onClick={() => setDestinationGalleryIndex((prev) => 
                                prev === 0 ? dest.gallery.length - 1 : prev - 1
                              )}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronLeft className="size-6" />
                            </button>
                            <button
                              onClick={() => setDestinationGalleryIndex((prev) => 
                                prev === dest.gallery.length - 1 ? 0 : prev + 1
                              )}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronRight className="size-6" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm">
                              {destinationGalleryIndex + 1} / {dest.gallery.length}
                            </div>
                          </div>

                          {/* Thumbnail Strip */}
                          <div className="flex gap-3 overflow-x-auto pb-2">
                            {dest.gallery.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setDestinationGalleryIndex(idx)}
                                className={`relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
                                  destinationGalleryIndex === idx ? 'ring-2 ring-[#DF6951]' : ''
                                }`}
                              >
                                <ImageWithFallback 
                                  src={img}
                                  alt={`${dest.name} ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>

                          {/* Quick Facts */}
                          <div>
                            <h4 className="font-semibold mb-3">Quick Facts:</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2">
                                <Building2 className="size-4 text-[#DF6951]" />
                                <span className="text-sm">{dest.venues} Venues</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="size-4 text-[#DF6951]" />
                                <span className="text-sm">{dest.avgCost}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="size-4 text-[#DF6951]" />
                                <span className="text-sm">Best: {dest.bestTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="size-4 text-[#DF6951]" />
                                <span className="text-sm">{dest.country}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            {isLoggedIn && (
                              <Button
                                className="flex-1 bg-[#DF6951] hover:bg-[#c5573d]"
                                onClick={() => {
                                  updatePlan({ destination: dest.name });
                                  setSelectedDestinationForDialog(null);
                                  setDestinationGalleryIndex(0);
                                }}
                              >
                                <Check className="size-4 mr-2" />
                                Add to My Wedding Plan
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => {
                                // Navigate to public destination page
                                window.open(`/destinations/${dest.publicPageId}`, '_blank');
                              }}
                            >
                              <ExternalLink className="size-4 mr-2" />
                              Explore More
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedDestinationForDialog(null);
                                setDestinationGalleryIndex(0);
                              }}
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}

                  <div>
                    <Label htmlFor="weather">Weather Preference</Label>
                    <Select value={weddingPlan.weatherPreference} onValueChange={(value) => updatePlan({ weatherPreference: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select weather preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tropical">Tropical (Hot & Humid)</SelectItem>
                        <SelectItem value="moderate">Moderate (Pleasant)</SelectItem>
                        <SelectItem value="cool">Cool (Comfortable)</SelectItem>
                        <SelectItem value="cold">Cold (Winter)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="visa">Visa Requirements</Label>
                    <Select value={weddingPlan.visaRequired} onValueChange={(value) => updatePlan({ visaRequired: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Do guests need visas?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No visa required</SelectItem>
                        <SelectItem value="some">Some guests need visa</SelectItem>
                        <SelectItem value="all">All guests need visa</SelectItem>
                        <SelectItem value="unknown">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {weddingPlan.destination && (
                    <Card className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-rose-50">
                      <div className="flex items-start gap-3">
                        <Sparkles className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                        <div>
                          <h4 className="mb-1 text-sm md:text-base">Destination Tip</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {weddingPlan.destination} is a popular wedding destination! We have 15+ verified venues and 30+ local vendors ready to help.
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {/* Step 2: Moodboard */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Create Your Moodboard</h2>
                    <p className="text-muted-foreground">Visualize your perfect wedding style</p>
                  </div>

                  <Separator />

                  {/* Inspirations Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>
                        {showSavedInspirations 
                          ? 'Saved Inspirations' 
                          : `Inspirations based on ${weddingPlan.theme || 'selected theme'}`}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={showSavedInspirations ? "default" : "outline"}
                          className={showSavedInspirations ? "bg-[#DF6951] hover:bg-[#c5573d]" : ""}
                          onClick={() => setShowSavedInspirations(!showSavedInspirations)}
                        >
                          <ArrowLeftRight className="size-3 mr-1" />
                          {showSavedInspirations ? 'Theme Inspirations' : 'Saved Inspirations'}
                        </Button>
                        <Button
                          variant="link"
                          className="text-[#DF6951] hover:text-[#c5573d] gap-1 p-0 h-auto"
                          onClick={() => window.location.href = '/inspirations'}
                        >
                          Explore More
                          <ExternalLink className="size-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Selected Inspirations Display */}
                    {weddingPlan.selectedInspirations.length > 0 && (
                      <div className="mb-4">
                        <Label className="mb-2 block">Selected Inspirations ({weddingPlan.selectedInspirations.length})</Label>
                        <div className="flex flex-wrap gap-2">
                          {weddingPlan.selectedInspirations.map(id => {
                            const insp = inspirationDetails.find(i => i.id === id);
                            return insp ? (
                              <Badge key={id} className="bg-[#DF6951] gap-2 px-3 py-1">
                                {insp.name}
                                <X 
                                  className="size-3 cursor-pointer hover:opacity-70" 
                                  onClick={() => {
                                    updatePlan({ 
                                      selectedInspirations: weddingPlan.selectedInspirations.filter(i => i !== id) 
                                    });
                                  }}
                                />
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Search Bar */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        placeholder="Search inspirations..."
                        value={inspirationSearch}
                        onChange={(e) => setInspirationSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div>
                      <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 768: 3, 1024: 4 }}
                      >
                        <Masonry gutter="10px">
                          {inspirationDetails
                            .filter(insp => {
                              // Filter by saved or theme-based
                              if (showSavedInspirations) {
                                return savedInspirations.includes(insp.id);
                              }
                              // Filter by search
                              return insp.name.toLowerCase().includes(inspirationSearch.toLowerCase()) ||
                                insp.category.toLowerCase().includes(inspirationSearch.toLowerCase()) ||
                                insp.description.toLowerCase().includes(inspirationSearch.toLowerCase());
                            })
                            .sort((a, b) => {
                              // In theme view, sort saved inspirations to the top
                              if (!showSavedInspirations) {
                                const aIsSaved = savedInspirations.includes(a.id);
                                const bIsSaved = savedInspirations.includes(b.id);
                                if (aIsSaved && !bIsSaved) return -1;
                                if (!aIsSaved && bIsSaved) return 1;
                              }
                              return 0;
                            })
                            .slice(0, showAllInspirations ? undefined : 12)
                            .map((insp) => (
                              <div key={insp.id} className="group relative">
                                {/* Card Container matching InspirationsPage */}
                                <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                                  weddingPlan.selectedInspirations.includes(insp.id) ? 'ring-2 ring-[#DF6951]' : ''
                                }`}>
                                  {/* Image */}
                                  <div 
                                    className="relative overflow-hidden"
                                    onClick={() => setSelectedInspirationForDialog(insp.id)}
                                  >
                                    <ImageWithFallback
                                      src={insp.image}
                                      alt={insp.name}
                                      className="w-full h-auto object-cover"
                                    />
                                    
                                    {/* Hover Overlay - Minimal */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                                      <button
                                        className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg backdrop-blur-sm transition-colors"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedInspirationForDialog(insp.id);
                                        }}
                                      >
                                        <Eye className="size-4 text-foreground" />
                                      </button>
                                      <div className="flex gap-2">
                                        <button
                                          className={`rounded-full p-2 shadow-lg backdrop-blur-sm transition-colors ${
                                            weddingPlan.selectedInspirations.includes(insp.id)
                                              ? 'bg-[#DF6951] hover:bg-[#c5573d]'
                                              : 'bg-white/90 hover:bg-white'
                                          }`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const current = weddingPlan.selectedInspirations;
                                            updatePlan({
                                              selectedInspirations: current.includes(insp.id)
                                                ? current.filter(i => i !== insp.id)
                                                : [...current, insp.id]
                                            });
                                          }}
                                        >
                                          <Check className={`size-4 ${
                                            weddingPlan.selectedInspirations.includes(insp.id) ? 'text-white' : 'text-foreground'
                                          }`} />
                                        </button>
                                        <button
                                          className={`rounded-full p-2 shadow-lg backdrop-blur-sm transition-colors ${
                                            savedInspirations.includes(insp.id) 
                                              ? 'bg-red-500 hover:bg-red-600' 
                                              : 'bg-white/90 hover:bg-white'
                                          }`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (savedInspirations.includes(insp.id)) {
                                              setSavedInspirations(prev => prev.filter(i => i !== insp.id));
                                            } else {
                                              setSavedInspirations(prev => [...prev, insp.id]);
                                            }
                                          }}
                                        >
                                          <Heart className={`size-4 ${
                                            savedInspirations.includes(insp.id) ? 'fill-white text-white' : 'text-foreground'
                                          }`} />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Selected Badge */}
                                    {weddingPlan.selectedInspirations.includes(insp.id) && (
                                      <div className="absolute top-2 right-2 bg-[#DF6951] rounded-full px-2 py-1 text-xs text-white font-medium">
                                        Selected
                                      </div>
                                    )}
                                  </div>

                                  {/* User Info */}
                                  <div className="p-3">
                                    <div className="flex items-center gap-2">
                                      <img 
                                        src={insp.userAvatar} 
                                        alt={insp.userName}
                                        className="size-6 rounded-full"
                                      />
                                      <span className="text-sm text-foreground/80">{insp.userName}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </Masonry>
                      </ResponsiveMasonry>

                      {/* Show More/Less Button for Inspirations */}
                      {(() => {
                        const filteredInspirations = inspirationDetails.filter(insp => {
                          if (showSavedInspirations) {
                            return savedInspirations.includes(insp.id);
                          }
                          return insp.name.toLowerCase().includes(inspirationSearch.toLowerCase()) ||
                            insp.category.toLowerCase().includes(inspirationSearch.toLowerCase()) ||
                            insp.description.toLowerCase().includes(inspirationSearch.toLowerCase());
                        });
                        
                        return filteredInspirations.length > 12 && (
                          <div className="flex justify-center mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowAllInspirations(!showAllInspirations)}
                              className="gap-2"
                            >
                              {showAllInspirations ? (
                                <>
                                  Show Less
                                  <ChevronLeft className="size-4" />
                                </>
                              ) : (
                                <>
                                  Show More ({filteredInspirations.length - 12} more inspirations)
                                  <ChevronRight className="size-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Inspiration Details Dialog - Matching InspirationDetailPage */}
                    {inspirationDetails.map((insp) => {
                      const allImages = [insp.image, ...insp.gallery];
                      return (
                        <Dialog 
                          key={insp.id}
                          open={selectedInspirationForDialog === insp.id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setSelectedInspirationForDialog(null);
                              setInspirationGalleryIndex(0);
                            }
                          }}
                        >
                          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
                            <DialogHeader className="sr-only">
                              <DialogTitle>{insp.name}</DialogTitle>
                              <DialogDescription>{insp.description}</DialogDescription>
                            </DialogHeader>
                            
                            {/* Header with Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
                              <h2 className="text-xl md:text-2xl" style={{ fontFamily: "Volkhov, serif" }}>{insp.name}</h2>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="shrink-0"
                                  onClick={() => {
                                    if (savedInspirations.includes(insp.id)) {
                                      setSavedInspirations(prev => prev.filter(i => i !== insp.id));
                                    } else {
                                      setSavedInspirations(prev => [...prev, insp.id]);
                                    }
                                  }}
                                >
                                  <Heart className={`size-4 md:size-5 ${savedInspirations.includes(insp.id) ? "fill-red-500 text-red-500" : ""}`} />
                                </Button>
                                <Button variant="outline" size="icon" className="shrink-0">
                                  <Share2 className="size-4 md:size-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="shrink-0">
                                  <Download className="size-4 md:size-5" />
                                </Button>
                              </div>
                            </div>

                            {/* Main Content Grid */}
                            <div className="grid lg:grid-cols-[1fr,380px] gap-4 md:gap-6">
                              {/* Left Column - Images & Description */}
                              <div className="space-y-4 md:space-y-6">
                                {/* Main Image */}
                                <div className="relative rounded-xl overflow-hidden group">
                                  <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
                                    <ImageWithFallback
                                      src={allImages[inspirationGalleryIndex]}
                                      alt={insp.name}
                                      className="w-full h-full object-cover"
                                    />
                                    
                                    {/* Navigation Arrows */}
                                    {allImages.length > 1 && (
                                      <>
                                        <button
                                          onClick={() => setInspirationGalleryIndex((prev) => 
                                            prev === 0 ? allImages.length - 1 : prev - 1
                                          )}
                                          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                          <ChevronLeft className="size-4 md:size-6" />
                                        </button>
                                        <button
                                          onClick={() => setInspirationGalleryIndex((prev) => 
                                            prev === allImages.length - 1 ? 0 : prev + 1
                                          )}
                                          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                          <ChevronRight className="size-4 md:size-6" />
                                        </button>
                                      </>
                                    )}

                                    {/* Image Counter */}
                                    <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 px-2 md:px-3 py-1 rounded-full bg-black/60 text-white text-xs md:text-sm backdrop-blur-sm">
                                      {inspirationGalleryIndex + 1} / {allImages.length}
                                    </div>
                                  </div>
                                </div>

                                {/* Thumbnail Strip */}
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                                  {allImages.map((image, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setInspirationGalleryIndex(index)}
                                      className={`relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
                                        inspirationGalleryIndex === index ? "ring-2 ring-[#DF6951]" : ""
                                      }`}
                                    >
                                      <ImageWithFallback
                                        src={image}
                                        alt={`${insp.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </button>
                                  ))}
                                </div>

                                {/* Description - Hidden on mobile, shown on desktop after info */}
                                <Card className="p-4 md:p-6 hidden lg:block">
                                  <h3 className="mb-3 text-base">About This Inspiration</h3>
                                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    {insp.description}
                                  </p>

                                  <Separator className="my-4" />

                                  {/* Details */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Photographer</p>
                                      <p className="text-sm font-medium">{insp.photographer}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Location</p>
                                      <p className="text-sm font-medium">{insp.location}</p>
                                    </div>
                                  </div>
                                </Card>
                              </div>

                              {/* Right Column - Info (shows below on mobile, right on desktop) */}
                              <div className="space-y-4 md:space-y-6">
                                <Card className="p-4 md:p-5 lg:sticky lg:top-6">
                                  {/* Category Badge */}
                                  <div className="mb-4">
                                    <Badge className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white border-0 px-3 py-1">
                                      {insp.category}
                                    </Badge>
                                  </div>

                                  {/* Stats */}
                                  <div className="grid grid-cols-2 gap-3 mb-5">
                                    <div className="text-center">
                                      <p className="text-xs text-muted-foreground mb-1">Saves</p>
                                      <p className="text-xl" style={{ fontFamily: 'Volkhov, serif' }}>
                                        {insp.saves.toLocaleString()}
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-xs text-muted-foreground mb-1">Views</p>
                                      <p className="text-xl" style={{ fontFamily: 'Volkhov, serif' }}>
                                        {insp.views.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>

                                  <Separator className="my-4" />

                                  {/* Tags */}
                                  <div className="mb-5">
                                    <h4 className="mb-2.5 text-sm">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {insp.tags.map((tag, index) => (
                                        <Badge 
                                          key={index} 
                                          variant="outline" 
                                          className="hover:bg-rose-50 hover:border-[#DF6951] cursor-pointer border-border"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <Separator className="my-4" />

                                  {/* Color Palette */}
                                  <div className="mb-5">
                                    <h4 className="mb-3 text-sm">Color Palette</h4>
                                    <div className="flex gap-2 flex-wrap">
                                      {insp.colors.map((color, index) => (
                                        <button
                                          key={index}
                                          className="group relative"
                                          onClick={async () => {
                                            try {
                                              await navigator.clipboard.writeText(color);
                                            } catch (error) {
                                              console.log("Color code:", color);
                                            }
                                          }}
                                          title={`Copy ${color}`}
                                        >
                                          <div
                                            className="w-14 h-14 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                                            style={{ backgroundColor: color }}
                                          />
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <Separator className="my-4" />

                                  {/* Actions */}
                                  <div className="space-y-2.5">
                                    <Button
                                      className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                                      onClick={() => {
                                        const current = weddingPlan.selectedInspirations;
                                        updatePlan({
                                          selectedInspirations: current.includes(insp.id)
                                            ? current
                                            : [...current, insp.id]
                                        });
                                      }}
                                    >
                                      <Bookmark className="mr-2 size-4" />
                                      {weddingPlan.selectedInspirations.includes(insp.id) ? "Selected" : "Add to Moodboard"}
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      className="w-full"
                                      onClick={() => {
                                        setSelectedInspirationForDialog(null);
                                        setInspirationGalleryIndex(0);
                                      }}
                                    >
                                      Close
                                    </Button>
                                  </div>
                                </Card>

                                {/* Description - Shown on mobile below info, hidden on desktop (shown in left column) */}
                                <Card className="p-4 lg:hidden">
                                  <h3 className="mb-3 text-base">About This Inspiration</h3>
                                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    {insp.description}
                                  </p>

                                  <Separator className="my-4" />

                                  {/* Details */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Photographer</p>
                                      <p className="text-sm font-medium">{insp.photographer}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Location</p>
                                      <p className="text-sm font-medium">{insp.location}</p>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* Color Palettes - shown when inspirations are selected */}
                  {weddingPlan.selectedInspirations.length > 0 && (
                    <div>
                      <Label>Color Palettes from Your Inspirations</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on your selected inspirations, here are recommended color palettes
                      </p>
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          {(() => {
                            // Get unique color palettes from selected inspirations
                            const recommendedPalettes = Array.from(new Set(
                              weddingPlan.selectedInspirations.flatMap(id => {
                                const insp = inspirationDetails.find(i => i.id === id);
                                return insp ? insp.colorPalettes : [];
                              })
                            ));

                            // Get the actual palette objects
                            const palettesToShow = colorPalettes.filter(p => 
                              recommendedPalettes.includes(p.name)
                            );

                            const displayPalettes = showAllColorPalettes ? palettesToShow : palettesToShow.slice(0, 6);

                            return (
                              <>
                                {displayPalettes.map((palette) => (
                                  <Card
                                    key={palette.name}
                                    className={`p-3 md:p-4 cursor-pointer transition-all border-2 ${
                                      weddingPlan.colorPalette.includes(palette.name)
                                        ? 'border-[#DF6951] bg-rose-50'
                                        : 'hover:border-gray-300'
                                    }`}
                                    onClick={() => {
                                      const current = weddingPlan.colorPalette;
                                      updatePlan({
                                        colorPalette: current.includes(palette.name)
                                          ? current.filter(c => c !== palette.name)
                                          : [...current, palette.name]
                                      });
                                    }}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm md:text-base">{palette.name}</span>
                                      {weddingPlan.colorPalette.includes(palette.name) && (
                                        <Check className="size-4 md:size-5 text-[#DF6951]" />
                                      )}
                                    </div>
                                    <div className="flex gap-1.5 md:gap-2">
                                      {palette.colors.map((color, idx) => (
                                        <div
                                          key={idx}
                                          className="size-6 md:size-8 rounded-full border-2 border-white shadow"
                                          style={{ backgroundColor: color }}
                                        />
                                      ))}
                                    </div>
                                  </Card>
                                ))}
                              </>
                            );
                          })()}
                        </div>

                        {/* Show More/Less Button for Color Palettes */}
                        {(() => {
                          const recommendedPalettes = Array.from(new Set(
                            weddingPlan.selectedInspirations.flatMap(id => {
                              const insp = inspirationDetails.find(i => i.id === id);
                              return insp ? insp.colorPalettes : [];
                            })
                          ));
                          const palettesToShow = colorPalettes.filter(p => 
                            recommendedPalettes.includes(p.name)
                          );

                          return palettesToShow.length > 6 && (
                            <div className="flex justify-center mt-4">
                              <Button
                                variant="outline"
                                onClick={() => setShowAllColorPalettes(!showAllColorPalettes)}
                                className="gap-2"
                              >
                                {showAllColorPalettes ? (
                                  <>
                                    Show Less
                                    <ChevronLeft className="size-4" />
                                  </>
                                ) : (
                                  <>
                                    Show More ({palettesToShow.length - 6} more palettes)
                                    <ChevronRight className="size-4" />
                                  </>
                                )}
                              </Button>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Style Preferences</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Mandap Decor', 'Photo Booth', 'Floral Ceiling', 'String Lights', 'Vintage Props', 'LED Walls'].map((style) => (
                        <Badge
                          key={style}
                          variant={weddingPlan.styles.includes(style) ? "default" : "outline"}
                          className={`cursor-pointer px-4 py-2 ${
                            weddingPlan.styles.includes(style)
                              ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501]'
                              : ''
                          }`}
                          onClick={() => {
                            const current = weddingPlan.styles;
                            updatePlan({
                              styles: current.includes(style)
                                ? current.filter(s => s !== style)
                                : [...current, style]
                            });
                          }}
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Vendors */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Select Your Vendors</h2>
                    <p className="text-muted-foreground">Choose professionals to bring your vision to life</p>
                  </div>

                  <Separator />

                  <div className="space-y-3 md:space-y-4">
                    {[
                      { name: 'Wedding Planner', icon: Briefcase, key: 'planner' as keyof typeof vendorsByCategory },
                      { name: 'Photographer', icon: Camera, key: 'photographer' as keyof typeof vendorsByCategory },
                      { name: 'Videographer', icon: Video, key: 'videographer' as keyof typeof vendorsByCategory },
                      { name: 'Makeup Artist', icon: Sparkles, key: 'makeup' as keyof typeof vendorsByCategory },
                      { name: 'Decorator', icon: Palette, key: 'decorator' as keyof typeof vendorsByCategory },
                      { name: 'DJ / Entertainment', icon: Music, key: 'dj' as keyof typeof vendorsByCategory },
                    ].map((vendorCategory) => {
                      const VendorIcon = vendorCategory.icon;
                      const isExpanded = expandedVendorCategory === vendorCategory.key;
                      const selectedVendor = weddingPlan.selectedVendors[vendorCategory.key];
                      const selectedVendorData = selectedVendor 
                        ? vendorsByCategory[vendorCategory.key].find(v => v.id === selectedVendor)
                        : null;
                      
                      const categoryVendors = vendorsByCategory[vendorCategory.key];
                      
                      // Filter vendors based on saved toggle
                      const vendorsToShow = showSavedVendors
                        ? categoryVendors.filter(v => savedVendors[vendorCategory.key]?.includes(v.id))
                        : categoryVendors.filter(vendor => vendor.themeBased); // Show theme-based vendors by default

                      return (
                        <Card key={vendorCategory.key} className="overflow-hidden border-2 hover:shadow-lg transition-all">
                          {/* Collapsed Header */}
                          <div
                            className="p-4 md:p-5 cursor-pointer"
                            onClick={() => {
                              setExpandedVendorCategory(isExpanded ? null : vendorCategory.key);
                            }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 md:gap-4 flex-1">
                                <div className="p-2 md:p-3 bg-rose-50 rounded-lg shrink-0">
                                  <VendorIcon className="size-5 md:size-6 text-[#DF6951]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm md:text-base mb-0.5">{vendorCategory.name}</h4>
                                  {selectedVendorData ? (
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                      <Check className="size-3 md:size-4 text-green-600" />
                                      <span className="truncate">{selectedVendorData.name}</span>
                                      <Badge variant="outline" className="shrink-0 hidden sm:inline-flex">Selected</Badge>
                                    </div>
                                  ) : (
                                    <p className="text-xs md:text-sm text-muted-foreground">
                                      {vendorsToShow.length} available
                                    </p>
                                  )}
                                </div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="size-5 md:size-6 text-muted-foreground shrink-0" />
                              ) : (
                                <ChevronDown className="size-5 md:size-6 text-muted-foreground shrink-0" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="border-t bg-gradient-to-b from-white to-rose-50/20">
                              <div className="p-4 md:p-5 space-y-4">
                                {/* Filter Toggle */}
                                <div className="flex items-center justify-between">
                                  <Label className="text-xs md:text-sm">
                                    {showSavedVendors 
                                      ? 'Saved Vendors' 
                                      : 'Suggested Vendors'}
                                  </Label>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant={showSavedVendors ? "default" : "outline"}
                                      className={showSavedVendors ? "bg-[#DF6951] hover:bg-[#c5573d]" : ""}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowSavedVendors(!showSavedVendors);
                                      }}
                                    >
                                      <ArrowLeftRight className="size-3 mr-1" />
                                      {showSavedVendors ? 'Suggested Vendors' : 'Saved Vendors'}
                                    </Button>
                                    <Button
                                      variant="link"
                                      className="text-[#DF6951] hover:text-[#c5573d] gap-1 p-0 h-auto text-xs md:text-sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = '/vendors';
                                      }}
                                    >
                                      Explore More
                                      <ExternalLink className="size-3" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Helper Alert for Saved Vendors */}
                                {showSavedVendors && vendorsToShow.length === 0 && (
                                  <Alert className="border-[#DF6951]/20 bg-[#DF6951]/5">
                                    <Info className="size-4 text-[#DF6951]" />
                                    <AlertDescription className="text-sm">
                                      You haven't saved any {vendorCategory.name.toLowerCase()}s yet. Browse vendors and click the heart icon to save them to your list.
                                    </AlertDescription>
                                  </Alert>
                                )}

                                {showSavedVendors && vendorsToShow.length > 0 && (
                                  <Alert className="border-[#DF6951]/20 bg-[#DF6951]/5">
                                    <Info className="size-4 text-[#DF6951]" />
                                    <AlertDescription className="text-sm">
                                      Showing your <strong>{vendorsToShow.length} saved {vendorCategory.name.toLowerCase()}(s)</strong>. Click the heart icon on any vendor card to manage your saved list.
                                    </AlertDescription>
                                  </Alert>
                                )}

                                {/* Vendors Grid */}
                                <div className="grid gap-3 md:gap-4">
                                  {vendorsToShow.map((vendor) => {
                                    const isSelected = weddingPlan.selectedVendors[vendorCategory.key] === vendor.id;
                                    const isSaved = isLoggedIn && savedVendors[vendorCategory.key]?.includes(vendor.id);
                                    
                                    return (
                                      <Card
                                        key={vendor.id}
                                        className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                                          isSelected ? 'border-2 border-[#DF6951] bg-rose-50/50' : 'border'
                                        }`}
                                        onClick={() => {
                                          setSelectedVendorForDialog({ vendor, category: vendorCategory.key });
                                          setVendorGalleryIndex(0);
                                        }}
                                      >
                                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 p-3 md:p-4">
                                          {/* Image */}
                                          <div className="relative w-full sm:w-24 md:w-32 h-32 sm:h-24 md:h-32 rounded-lg overflow-hidden shrink-0">
                                            <ImageWithFallback
                                              src={vendor.image}
                                              alt={vendor.name}
                                              className="w-full h-full object-cover"
                                            />
                                            {vendor.verified && (
                                              <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full">
                                                <Award className="size-3 md:size-4" />
                                              </div>
                                            )}
                                            <button
                                              className="absolute top-2 left-2 bg-white/90 hover:bg-white text-red-500 p-1.5 rounded-full transition-all hover:scale-110 z-10"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const currentSaved = savedVendors[vendorCategory.key] || [];
                                                const newSaved = isSaved
                                                  ? currentSaved.filter(id => id !== vendor.id)
                                                  : [...currentSaved, vendor.id];
                                                setSavedVendors({
                                                  ...savedVendors,
                                                  [vendorCategory.key]: newSaved
                                                });
                                              }}
                                            >
                                              <Heart className={`size-3 md:size-4 ${isSaved ? 'fill-red-500' : ''}`} />
                                            </button>
                                          </div>

                                          {/* Info */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                              <div className="flex-1 min-w-0">
                                                <h4 className="text-sm md:text-base mb-1 truncate">{vendor.name}</h4>
                                                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-1">
                                                  <MapPinIcon className="size-3 md:size-4 shrink-0" />
                                                  <span className="truncate">{vendor.location}</span>
                                                </div>
                                              </div>
                                              {isSelected && (
                                                <div className="shrink-0 p-1.5 bg-green-100 rounded-full">
                                                  <Check className="size-3 md:size-4 text-green-600" />
                                                </div>
                                              )}
                                            </div>

                                            <div className="flex items-center gap-3 mb-2">
                                              <div className="flex items-center gap-1">
                                                <Star className="size-3 md:size-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs md:text-sm">{vendor.rating}</span>
                                              </div>
                                              <span className="text-xs text-muted-foreground">
                                                ({vendor.reviews} reviews)
                                              </span>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                              {vendor.specialties.slice(0, 2).map((specialty, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs px-2 py-0">
                                                  {specialty}
                                                </Badge>
                                              ))}
                                              {vendor.specialties.length > 2 && (
                                                <Badge variant="outline" className="text-xs px-2 py-0">
                                                  +{vendor.specialties.length - 2}
                                                </Badge>
                                              )}
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                              <span className="text-sm md:text-base">
                                                Starting at <span className="text-[#DF6951]">{vendor.startingPrice}</span>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </Card>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>

                  <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="flex items-start gap-3">
                      <Heart className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                      <div>
                        <h4 className="mb-1 text-sm md:text-base">Pro Tip</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Click on any vendor category to expand and browse verified professionals. Your selections will be saved automatically.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Step 4: Venue */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Choose Your Venue</h2>
                    <p className="text-muted-foreground">Find the perfect location for your celebration</p>
                  </div>

                  <Separator />

                  <div>
                    <Label>Venue Capacity</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Based on your guest count ({weddingPlan.guestSize} guests)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                      {[
                        { name: 'Intimate (50-150)', capacity: 150 },
                        { name: 'Medium (150-300)', capacity: 300 },
                        { name: 'Large (300-500)', capacity: 500 },
                        { name: 'Grand (500+)', capacity: 1000 },
                      ].map((option) => (
                        <Card
                          key={option.name}
                          className={`p-3 md:p-4 cursor-pointer transition-all border-2 ${
                            weddingPlan.guestSize <= option.capacity
                              ? 'border-[#DF6951] bg-rose-50'
                              : 'opacity-50'
                          }`}
                        >
                          <Building2 className="size-5 md:size-6 text-[#DF6951] mb-2" />
                          <span className="text-sm md:text-base">{option.name}</span>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Venue Type</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Indoor', 'Outdoor', 'Banquet Hall', 'Beach', 'Garden', 'Palace', 'Resort'].map((type) => (
                        <Badge
                          key={type}
                          variant="outline"
                          className="cursor-pointer px-4 py-2 hover:bg-rose-50 hover:border-[#DF6951]"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
                    Browse {weddingPlan.destination || 'All'} Venues
                  </Button>

                  <Card className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                    <div className="flex items-start gap-3">
                      <Building2 className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                      <div>
                        <h4 className="mb-1 text-sm md:text-base">Venue Recommendations</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Based on your preferences, we found 12 venues in {weddingPlan.destination || 'your selected destination'} that can accommodate {weddingPlan.guestSize} guests.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Step 5: Travel */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Travel Arrangements</h2>
                    <p className="text-muted-foreground">Plan travel for your guests</p>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="guestOrigins">Guest Origin Cities</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Where are most of your guests traveling from?
                    </p>
                    <Textarea
                      id="guestOrigins"
                      placeholder="e.g., Mumbai, Delhi, Bangalore..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Group Travel</Label>
                    <Card className="p-4 md:p-6 mt-2">
                      <div className="flex items-start gap-3 md:gap-4">
                        <Plane className="size-6 md:size-8 text-[#DF6951] flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="mb-1 text-sm md:text-base">Flight Coordination</h4>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                            We can help coordinate group bookings and find the best deals for your guests
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs md:text-sm">
                            <div className="flex items-center gap-2">
                              <Checkbox id="group-booking" />
                              <label htmlFor="group-booking">Group booking assistance</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="airport-pickup" />
                              <label htmlFor="airport-pickup">Airport pickup</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div>
                    <Label>Accommodation</Label>
                    <Card className="p-4 md:p-6 mt-2">
                      <div className="flex items-start gap-3 md:gap-4">
                        <Building2 className="size-6 md:size-8 text-[#DF6951] flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="mb-1 text-sm md:text-base">Guest Accommodation</h4>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                            Book rooms at nearby hotels or resorts for your guests
                          </p>
                          <Button variant="outline" className="w-full h-9 md:h-10 text-sm md:text-base">
                            View Nearby Hotels
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Step 6: Visa */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Visa & Documentation</h2>
                    <p className="text-muted-foreground">Ensure smooth travel for all guests</p>
                  </div>

                  <Separator />

                  {weddingPlan.visaRequired !== 'none' && (
                    <>
                      <div>
                        <Label htmlFor="nationalities">Guest Nationalities</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          List the countries your guests are traveling from
                        </p>
                        <Textarea
                          id="nationalities"
                          placeholder="e.g., India, USA, UK, Australia..."
                          className="mt-2"
                          rows={3}
                        />
                      </div>

                      <Card className="p-4 md:p-6 bg-blue-50">
                        <div className="flex items-start gap-3 md:gap-4">
                          <FileText className="size-6 md:size-8 text-blue-600 flex-shrink-0" />
                          <div>
                            <h4 className="mb-2 md:mb-3 text-sm md:text-base">Visa Requirements</h4>
                            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                              <div className="flex items-start gap-2">
                                <Check className="size-3 md:size-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">Tourist Visa Required</p>
                                  <p className="text-muted-foreground">Processing time: 7-10 days</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="size-3 md:size-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">Required Documents</p>
                                  <p className="text-muted-foreground">Passport, photos, invitation letter</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="size-3 md:size-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">Embassy Contact</p>
                                  <p className="text-muted-foreground">Available for assistance</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Button variant="outline" className="w-full h-9 md:h-10 text-sm md:text-base">
                        <FileText className="size-4 mr-2" />
                        Download Visa Checklist
                      </Button>
                    </>
                  )}

                  {weddingPlan.visaRequired === 'none' && (
                    <Card className="p-6 md:p-8 text-center bg-green-50">
                      <Check className="size-10 md:size-12 text-green-600 mx-auto mb-2 md:mb-3" />
                      <h3 className="mb-2 text-base md:text-lg">No Visa Required!</h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Great news! Your guests won't need visas for this destination.
                      </p>
                    </Card>
                  )}

                  <Card className="p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-start gap-3">
                      <Sparkles className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                      <div>
                        <h4 className="mb-1 text-sm md:text-base">Concierge Service</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Our premium concierge service can handle all visa applications and travel documentation for your guests.
                        </p>
                        <Button className="mt-3 bg-gradient-to-r from-[#DF6951] to-[#F1A501] h-9 md:h-10 text-sm md:text-base">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:block">
            <Card className="p-4 md:p-6 lg:sticky lg:top-24">
              <h3 className="mb-3 md:mb-4">Your Wedding Plan</h3>
              <Separator className="mb-3 md:mb-4" />
              
              <div className="space-y-3 md:space-y-4 text-sm">
                {weddingPlan.guestSize > 0 && (
                  <div>
                    <p className="text-muted-foreground">Guest Count</p>
                    <p className="font-medium">{weddingPlan.guestSize} guests</p>
                  </div>
                )}

                {weddingPlan.weddingType && (
                  <div>
                    <p className="text-muted-foreground">Wedding Type</p>
                    <p className="font-medium capitalize">{weddingPlan.weddingType}</p>
                  </div>
                )}

                {weddingPlan.theme && (
                  <div>
                    <p className="text-muted-foreground">Theme</p>
                    <p className="font-medium">{weddingPlan.theme}</p>
                  </div>
                )}

                {weddingPlan.budget[0] > 0 && (
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium">{formatCurrency(weddingPlan.budget[0])}</p>
                  </div>
                )}

                {weddingPlan.destination && (
                  <div>
                    <p className="text-muted-foreground">Destination</p>
                    <p className="font-medium">{weddingPlan.destination}</p>
                  </div>
                )}

                {weddingPlan.colorPalette.length > 0 && (
                  <div>
                    <p className="text-muted-foreground">Colors</p>
                    <p className="font-medium">{weddingPlan.colorPalette.join(', ')}</p>
                  </div>
                )}

                {weddingPlan.inspirationImages.length > 0 && (
                  <div>
                    <p className="text-muted-foreground">Inspiration Images</p>
                    <p className="font-medium">{weddingPlan.inspirationImages.length} selected</p>
                  </div>
                )}
              </div>

              <Separator className="my-3 md:my-4" />

              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] h-9 md:h-10 text-sm md:text-base">
                  Save Progress
                </Button>
                <Button variant="outline" className="w-full h-9 md:h-10 text-sm md:text-base">
                  Download Plan PDF
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3 mt-6 md:mt-8 pb-6 md:pb-0">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-2 h-10 md:h-11 px-4 md:px-6 text-sm md:text-base flex-1 sm:flex-initial"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              className="gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501] h-10 md:h-11 px-4 md:px-6 text-sm md:text-base flex-1 sm:flex-initial"
            >
              <span className="hidden sm:inline">Next Step</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 h-10 md:h-11 px-4 md:px-6 text-sm md:text-base flex-1 sm:flex-initial">
              <span className="hidden sm:inline">Complete Plan</span>
              <span className="sm:hidden">Complete</span>
              <Check className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Vendor Details Dialog */}
      {selectedVendorForDialog && (
        <Dialog open={!!selectedVendorForDialog} onOpenChange={() => {
          setSelectedVendorForDialog(null);
          setVendorGalleryIndex(0);
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl pr-8" style={{ fontFamily: "Volkhov, serif" }}>
                {selectedVendorForDialog.vendor.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                View detailed information about {selectedVendorForDialog.vendor.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-2 -mt-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-[#DF6951] text-[#DF6951] text-xs sm:text-sm">
                  {getVendorCategoryName(selectedVendorForDialog.category)}
                </Badge>
                {selectedVendorForDialog.vendor.verified && (
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                    <Award className="size-3 sm:size-3.5 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <MapPinIcon className="size-3.5 sm:size-4 flex-shrink-0" />
                <span className="truncate">{selectedVendorForDialog.vendor.location}</span>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 mt-4">
              {/* Image Gallery */}
              <div className="space-y-2 sm:space-y-3">
                {/* Main Image */}
                <div className="relative h-[200px] sm:h-[280px] md:h-[400px] rounded-lg sm:rounded-xl overflow-hidden group">
                  <ImageWithFallback
                    src={
                      selectedVendorForDialog.vendor.gallery 
                        ? selectedVendorForDialog.vendor.gallery[vendorGalleryIndex]
                        : selectedVendorForDialog.vendor.image
                    }
                    alt={selectedVendorForDialog.vendor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Gallery Navigation - only show if gallery exists and has multiple images */}
                  {selectedVendorForDialog.vendor.gallery && selectedVendorForDialog.vendor.gallery.length > 1 && (
                    <>
                      {/* Previous Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setVendorGalleryIndex((prev) => 
                            prev === 0 ? selectedVendorForDialog.vendor.gallery.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="size-4 sm:size-5 md:size-6" />
                      </button>
                      
                      {/* Next Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setVendorGalleryIndex((prev) => 
                            prev === selectedVendorForDialog.vendor.gallery.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next image"
                      >
                        <ChevronRight className="size-4 sm:size-5 md:size-6" />
                      </button>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 text-white text-xs sm:text-sm backdrop-blur-sm">
                        {vendorGalleryIndex + 1} / {selectedVendorForDialog.vendor.gallery.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Grid - only show if gallery exists and has multiple images */}
                {selectedVendorForDialog.vendor.gallery && selectedVendorForDialog.vendor.gallery.length > 1 && (
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                    {selectedVendorForDialog.vendor.gallery.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setVendorGalleryIndex(idx)}
                        className={`relative flex-shrink-0 w-16 h-14 sm:w-20 sm:h-16 md:w-24 md:h-20 rounded-md sm:rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
                          vendorGalleryIndex === idx ? 'ring-2 ring-[#DF6951]' : ''
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <ImageWithFallback 
                          src={img}
                          alt={`${selectedVendorForDialog.vendor.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating and Reviews */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Star className="size-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">{selectedVendorForDialog.vendor.rating}</span>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    ({selectedVendorForDialog.vendor.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <DollarSign className="size-4 text-[#DF6951] flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    <span className="hidden sm:inline">Starting from </span>
                    <span className="font-semibold">{selectedVendorForDialog.vendor.startingPrice}</span>
                  </span>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <Label className="mb-2 block text-sm">Specialties</Label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedVendorForDialog.vendor.specialties.map((specialty: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div>
                <Label className="mb-2 block text-sm">About</Label>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {selectedVendorForDialog.vendor.name} is a highly rated {getVendorCategoryName(selectedVendorForDialog.category).toLowerCase()} professional based in {selectedVendorForDialog.vendor.location}. 
                  With {selectedVendorForDialog.vendor.reviews} positive reviews and an average rating of {selectedVendorForDialog.vendor.rating} stars, 
                  they specialize in {selectedVendorForDialog.vendor.specialties.join(", ")}. Their services start from {selectedVendorForDialog.vendor.startingPrice}.
                </p>
              </div>

              {/* Portfolio Count */}
              {(selectedVendorForDialog.vendor.portfolio || selectedVendorForDialog.vendor.films || selectedVendorForDialog.vendor.clients || selectedVendorForDialog.vendor.events) && (
                <div>
                  <Label className="mb-2 block text-sm">Experience</Label>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Camera className="size-3.5 sm:size-4 text-[#DF6951] flex-shrink-0" />
                    <span>
                      {selectedVendorForDialog.vendor.portfolio && `${selectedVendorForDialog.vendor.portfolio}+ Portfolio Images`}
                      {selectedVendorForDialog.vendor.films && `${selectedVendorForDialog.vendor.films}+ Films Produced`}
                      {selectedVendorForDialog.vendor.clients && `${selectedVendorForDialog.vendor.clients}+ Happy Clients`}
                      {selectedVendorForDialog.vendor.events && `${selectedVendorForDialog.vendor.events}+ Events`}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3 pt-2">
                {/* View Full Profile Button */}
                <Button
                  variant="outline"
                  className="w-full h-9 sm:h-10 text-xs sm:text-sm border-[#DF6951] text-[#DF6951] hover:bg-[#DF6951] hover:text-white"
                  onClick={() => {
                    window.location.href = `/vendors/${selectedVendorForDialog.category}/${selectedVendorForDialog.vendor.id}`;
                  }}
                >
                  <Eye className="size-3.5 sm:size-4 mr-1.5 sm:mr-2" />
                  View Full Profile
                </Button>

                <Separator />

                {/* Other Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    className="flex-1 h-9 sm:h-10 text-xs sm:text-sm bg-[#DF6951] hover:bg-[#c5573d]"
                    onClick={() => {
                      const isSelected = weddingPlan.selectedVendors[selectedVendorForDialog.category] === selectedVendorForDialog.vendor.id;
                      updatePlan({
                        selectedVendors: {
                          ...weddingPlan.selectedVendors,
                          [selectedVendorForDialog.category]: isSelected ? undefined : selectedVendorForDialog.vendor.id
                        }
                      });
                      setSelectedVendorForDialog(null);
                    }}
                  >
                    {weddingPlan.selectedVendors[selectedVendorForDialog.category] === selectedVendorForDialog.vendor.id ? (
                      <>
                        <Check className="size-3.5 sm:size-4 mr-1.5 sm:mr-2" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Check className="size-3.5 sm:size-4 mr-1.5 sm:mr-2" />
                        <span className="hidden sm:inline">Select This Vendor</span>
                        <span className="sm:hidden">Select</span>
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-9 sm:h-10 text-xs sm:text-sm"
                    onClick={() => {
                      const isSaved = isLoggedIn && savedVendors[selectedVendorForDialog.category]?.includes(selectedVendorForDialog.vendor.id);
                      const currentSaved = savedVendors[selectedVendorForDialog.category] || [];
                      const newSaved = isSaved
                        ? currentSaved.filter(id => id !== selectedVendorForDialog.vendor.id)
                        : [...currentSaved, selectedVendorForDialog.vendor.id];
                      setSavedVendors({
                        ...savedVendors,
                        [selectedVendorForDialog.category]: newSaved
                      });
                    }}
                  >
                    <Heart 
                      className={`size-3.5 sm:size-4 mr-1.5 sm:mr-2 ${
                        isLoggedIn && savedVendors[selectedVendorForDialog.category]?.includes(selectedVendorForDialog.vendor.id) 
                          ? 'fill-red-500 text-red-500' 
                          : ''
                      }`} 
                    />
                    <span className="hidden sm:inline">
                      {isLoggedIn && savedVendors[selectedVendorForDialog.category]?.includes(selectedVendorForDialog.vendor.id) 
                        ? 'Saved' 
                        : 'Save for Later'}
                    </span>
                    <span className="sm:hidden">
                      {isLoggedIn && savedVendors[selectedVendorForDialog.category]?.includes(selectedVendorForDialog.vendor.id) 
                        ? 'Saved' 
                        : 'Save'}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

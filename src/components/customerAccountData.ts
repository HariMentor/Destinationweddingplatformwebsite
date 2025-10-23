// Customer Account Data Structure

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  memberSince: string;
  weddingDate?: string;
  partnersName?: string;
}

export interface SavedInspiration {
  id: number;
  title: string;
  category: string;
  image: string;
  savedOn: string;
}

export interface VenueBooking {
  id: string;
  venueName: string;
  location: string;
  image: string;
  bookingDate: string;
  eventDate: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled";
  amount: string;
  bookingReference: string;
}

export interface VendorBooking {
  id: string;
  vendorName: string;
  vendorType: string;
  image: string;
  bookingDate: string;
  serviceDate: string;
  status: "confirmed" | "pending" | "cancelled";
  amount: string;
  bookingReference: string;
}

export interface PlannerBooking {
  id: string;
  plannerName: string;
  location: string;
  image: string;
  bookingDate: string;
  status: "confirmed" | "pending" | "cancelled";
  packageType: string;
  amount: string;
  bookingReference: string;
  nextMeeting?: string;
}

export interface TourBooking {
  id: string;
  tourName: string;
  destination: string;
  image: string;
  bookingDate: string;
  tourDate: string;
  participants: number;
  status: "confirmed" | "pending" | "cancelled";
  amount: string;
  bookingReference: string;
}

export interface FlightBooking {
  id: string;
  airline: string;
  flightNumber: string;
  route: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  status: "confirmed" | "pending" | "cancelled";
  amount: string;
  bookingReference: string;
  class: string;
}

export interface VisaApplication {
  id: string;
  country: string;
  visaType: string;
  applicationDate: string;
  status: "approved" | "pending" | "in-review" | "rejected";
  expectedProcessing: string;
  applicationNumber: string;
  submissionDate: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  bookingReference: string;
  bookingType: "venue" | "vendor" | "planner" | "tour" | "flight" | "marketplace";
  itemName: string;
  paymentDate: string;
  amount: string;
  currency: string;
  paymentMethod: "credit-card" | "debit-card" | "bank-transfer" | "upi" | "paypal" | "net-banking";
  paymentStatus: "completed" | "pending" | "failed" | "refunded" | "awaiting-confirmation";
  cardLast4?: string;
  cardBrand?: string;
  bankName?: string;
  upiId?: string;
  invoiceUrl?: string;
  invoiceNumber: string;
  paidTo: string;
  description: string;
  transactionFee?: string;
  netAmount?: string;
  // Bank transfer specific fields
  bankTransferProof?: string; // URL to uploaded proof
  bankTransferStatus?: "pending-upload" | "uploaded" | "verified" | "rejected";
  bankTransferUploadDate?: string;
  bankTransferVerificationDate?: string;
  bankTransferRejectionReason?: string;
  bankAccountDetails?: {
    accountNumber: string;
    swiftCode: string;
    bankName: string;
    accountHolder: string;
    reference: string;
  };
}

export interface WeddingPlanData {
  // Basic Details
  eventName: string;
  guestSize: number;
  weddingType: "destination" | "local";
  theme: string;
  budget: number;
  weddingDate: string;
  duration: number;
  
  // Location
  destination: string;
  venue: string;
  
  // Design
  colorPalette: { name: string; colors: string[] };
  styles: string[];
  
  // Vendors
  vendors: {
    planner?: { name: string; service: string };
    photographer?: { name: string; service: string };
    videographer?: { name: string; service: string };
    makeup?: { name: string; service: string };
    decorator?: { name: string; service: string };
    dj?: { name: string; service: string };
    florist?: { name: string; service: string };
  };
  
  // Timeline/Checklist
  checklist: {
    id: number;
    task: string;
    category: string;
    dueDate: string;
    completed: boolean;
    priority: "high" | "medium" | "low";
  }[];
  
  // Travel Info
  guestOrigins: string[];
  accommodations: string;
  
  // Status
  planStatus: "in-progress" | "finalized" | "completed";
  completionPercentage: number;
  lastUpdated: string;
}

export const mockUserProfile: UserProfile = {
  name: "Sarah & Michael",
  email: "sarah.michael@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNDAwODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  location: "New York, USA",
  memberSince: "January 2025",
  weddingDate: "June 15, 2025",
  partnersName: "Michael",
};

export const mockSavedInspirations: SavedInspiration[] = [
  {
    id: 1,
    title: "Tuscan Villa Garden Wedding",
    category: "Outdoor Ceremony",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8ee97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc2MDA1OTQxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    savedOn: "Jan 10, 2025",
  },
  {
    id: 2,
    title: "Romantic Beach Sunset Setup",
    category: "Beach Wedding",
    image: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjBzZXR1cHxlbnwxfHx8fDE3NjAwNTk0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    savedOn: "Jan 12, 2025",
  },
  {
    id: 3,
    title: "Elegant Table Settings",
    category: "Decor",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc2MDA1OTQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    savedOn: "Jan 15, 2025",
  },
  {
    id: 4,
    title: "Floral Arch Design",
    category: "Ceremony Decor",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvcmFsJTIwYXJjaHxlbnwxfHx8fDE3NjAwNTk0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    savedOn: "Jan 18, 2025",
  },
];

export const mockVenueBookings: VenueBooking[] = [
  {
    id: "VB001",
    venueName: "Villa Bellissima",
    location: "Tuscany, Italy",
    image: "https://images.unsplash.com/photo-1698616596895-71e43af05b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDM2Mzk0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    bookingDate: "Jan 5, 2025",
    eventDate: "Jun 15, 2025",
    guests: 120,
    status: "confirmed",
    amount: "€35,000",
    bookingReference: "WDZ-VB-2025-001",
  },
  {
    id: "VB002",
    venueName: "Seaside Terrace",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDE0MDExMnww&ixlib=rb-4.1.0&q=80&w=1080",
    bookingDate: "Dec 20, 2024",
    eventDate: "Jun 14, 2025",
    guests: 50,
    status: "pending",
    amount: "€18,000",
    bookingReference: "WDZ-VB-2024-089",
  },
];

export const mockVendorBookings: VendorBooking[] = [
  {
    id: "VD001",
    vendorName: "Marco Photography",
    vendorType: "Photographer",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXJ8ZW58MXx8fHwxNzYwMTQwMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    bookingDate: "Jan 8, 2025",
    serviceDate: "Jun 15, 2025",
    status: "confirmed",
    amount: "€4,500",
    bookingReference: "WDZ-PH-2025-012",
  },
  {
    id: "VD002",
    vendorName: "Bella Floral Design",
    vendorType: "Florist",
    image: "https://images.unsplash.com/photo-1558535284-39fe3f893047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGNlbnRlcnBpZWNlfGVufDF8fHx8MTc2MDY5Njk5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    bookingDate: "Jan 10, 2025",
    serviceDate: "Jun 14-15, 2025",
    status: "confirmed",
    amount: "€3,200",
    bookingReference: "WDZ-FL-2025-034",
  },
  {
    id: "VD003",
    vendorName: "Antonio Videography",
    vendorType: "Videographer",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlb2dyYXBoZXIlMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDE0MDExNHww&ixlib=rb-4.1.0&q=80&w=1080",
    bookingDate: "Jan 12, 2025",
    serviceDate: "Jun 15, 2025",
    status: "confirmed",
    amount: "€3,800",
    bookingReference: "WDZ-VD-2025-023",
  },
];

export const mockPlannerBookings: PlannerBooking[] = [
  {
    id: "PL001",
    plannerName: "Elena Romano",
    location: "Florence, Italy",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGxhbm5lciUyMHdvbWFufGVufDF8fHx8MTc2MDE0MDExNHww&ixlib=rb-4.1.0&q=80&w=1080",
    bookingDate: "Dec 15, 2024",
    status: "confirmed",
    packageType: "Full Planning Service",
    amount: "€8,500",
    bookingReference: "WDZ-PL-2024-078",
    nextMeeting: "Jan 25, 2025 at 2:00 PM",
  },
];

export const mockTourBookings: TourBooking[] = [
  {
    id: "TR001",
    tourName: "Chianti Wine Country Tour",
    destination: "Tuscany, Italy",
    image: "https://images.unsplash.com/photo-1723492816139-05d24edd702a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwd2luZSUyMHRhc3Rpbmd8ZW58MXx8fHwxNzYxMTM5OTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    bookingDate: "Jan 6, 2025",
    tourDate: "Jun 13, 2025",
    participants: 10,
    status: "confirmed",
    amount: "€1,200",
    bookingReference: "WDZ-TR-2025-045",
  },
  {
    id: "TR002",
    tourName: "Florence Walking Tour",
    destination: "Florence, Italy",
    image: "https://images.unsplash.com/photo-1694765368961-2d142bed8154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MTEzOTk3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    bookingDate: "Jan 9, 2025",
    tourDate: "Jun 12, 2025",
    participants: 10,
    status: "confirmed",
    amount: "€450",
    bookingReference: "WDZ-TR-2025-056",
  },
];

export const mockFlightBookings: FlightBooking[] = [
  {
    id: "FL001",
    airline: "Emirates",
    flightNumber: "EK 123 / EK 124",
    route: "New York (JFK) ↔ Florence (FLR)",
    departureDate: "Jun 10, 2025",
    returnDate: "Jun 20, 2025",
    passengers: 2,
    status: "confirmed",
    amount: "$3,240",
    bookingReference: "WDZ-FL-2025-234",
    class: "Business Class",
  },
  {
    id: "FL002",
    airline: "Lufthansa",
    flightNumber: "LH 456 / LH 457",
    route: "New York (JFK) ↔ Athens (ATH)",
    departureDate: "Jun 13, 2025",
    returnDate: "Jun 15, 2025",
    passengers: 2,
    status: "pending",
    amount: "$1,680",
    bookingReference: "WDZ-FL-2025-245",
    class: "Economy Plus",
  },
];

export const mockVisaApplications: VisaApplication[] = [
  {
    id: "VA001",
    country: "Italy",
    visaType: "Schengen Tourist Visa",
    applicationDate: "Dec 10, 2024",
    status: "approved",
    expectedProcessing: "15 working days",
    applicationNumber: "IT-VISA-2024-98765",
    submissionDate: "Dec 10, 2024",
  },
  {
    id: "VA002",
    country: "Greece",
    visaType: "Schengen Tourist Visa",
    applicationDate: "Dec 12, 2024",
    status: "in-review",
    expectedProcessing: "15 working days",
    applicationNumber: "GR-VISA-2024-45678",
    submissionDate: "Dec 12, 2024",
  },
];

export const mockWeddingPlan: WeddingPlanData = {
  eventName: "Sarah & Michael's Tuscany Wedding",
  guestSize: 120,
  weddingType: "destination",
  theme: "Romantic Garden",
  budget: 3500000,
  weddingDate: "June 15, 2025",
  duration: 3,
  
  destination: "Tuscany, Italy",
  venue: "Villa Bellissima",
  
  colorPalette: {
    name: "Rose Gold & Blush",
    colors: ["#B76E79", "#E8B4B8", "#FFFFFF", "#F7E7CE"],
  },
  styles: ["Romantic", "Garden", "Elegant", "Vintage"],
  
  vendors: {
    planner: { name: "Elena Romano", service: "Full Planning Service" },
    photographer: { name: "Marco Photography", service: "Premium Package" },
    videographer: { name: "Antonio Videography", service: "Cinematic Film" },
    makeup: { name: "Isabella Beauty", service: "Bridal Makeup & Hair" },
    decorator: { name: "Bella Floral Design", service: "Complete Decor" },
    florist: { name: "Bella Floral Design", service: "Floral Arrangements" },
  },
  
  checklist: [
    {
      id: 1,
      task: "Book venue and secure date",
      category: "Venue",
      dueDate: "Jan 15, 2025",
      completed: true,
      priority: "high",
    },
    {
      id: 2,
      task: "Finalize guest list and send save-the-dates",
      category: "Planning",
      dueDate: "Feb 1, 2025",
      completed: true,
      priority: "high",
    },
    {
      id: 3,
      task: "Book wedding planner",
      category: "Vendors",
      dueDate: "Jan 20, 2025",
      completed: true,
      priority: "high",
    },
    {
      id: 4,
      task: "Confirm photographer and videographer",
      category: "Vendors",
      dueDate: "Feb 15, 2025",
      completed: true,
      priority: "high",
    },
    {
      id: 5,
      task: "Book florist and decorator",
      category: "Vendors",
      dueDate: "Mar 1, 2025",
      completed: true,
      priority: "medium",
    },
    {
      id: 6,
      task: "Send formal invitations",
      category: "Planning",
      dueDate: "Mar 15, 2025",
      completed: false,
      priority: "high",
    },
    {
      id: 7,
      task: "Finalize menu tasting and catering",
      category: "Catering",
      dueDate: "Apr 1, 2025",
      completed: false,
      priority: "high",
    },
    {
      id: 8,
      task: "Book makeup artist and hair stylist",
      category: "Beauty",
      dueDate: "Apr 10, 2025",
      completed: false,
      priority: "medium",
    },
    {
      id: 9,
      task: "Arrange guest accommodations",
      category: "Travel",
      dueDate: "Apr 15, 2025",
      completed: false,
      priority: "high",
    },
    {
      id: 10,
      task: "Plan rehearsal dinner",
      category: "Events",
      dueDate: "May 1, 2025",
      completed: false,
      priority: "medium",
    },
    {
      id: 11,
      task: "Finalize wedding day timeline",
      category: "Planning",
      dueDate: "May 15, 2025",
      completed: false,
      priority: "high",
    },
    {
      id: 12,
      task: "Confirm all vendor final details",
      category: "Vendors",
      dueDate: "Jun 1, 2025",
      completed: false,
      priority: "high",
    },
    {
      id: 13,
      task: "Pack for wedding trip",
      category: "Travel",
      dueDate: "Jun 8, 2025",
      completed: false,
      priority: "medium",
    },
    {
      id: 14,
      task: "Final venue walkthrough",
      category: "Venue",
      dueDate: "Jun 13, 2025",
      completed: false,
      priority: "high",
    },
  ],
  
  guestOrigins: ["New York, USA", "Los Angeles, USA", "London, UK", "Toronto, Canada"],
  accommodations: "Villa Bellissima Guest Rooms + Hotel Toscana",
  
  planStatus: "in-progress",
  completionPercentage: 42,
  lastUpdated: "Jan 20, 2025",
};

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: "family" | "friends" | "colleagues" | "other";
  invitationSent: boolean;
  rsvpStatus: "pending" | "attending" | "not-attending" | "maybe";
  rsvpDate?: string;
  plusOne: boolean;
  dietaryRestrictions?: string;
  specialRequests?: string;
}

export interface WeddingInvitation {
  id: string;
  invitationLink: string;
  createdDate: string;
  title: string;
  customMessage: string;
  designTheme: "elegant" | "romantic" | "modern" | "rustic";
  totalGuests: number;
  sentCount: number;
  rsvpReceived: number;
  attendingCount: number;
  notAttendingCount: number;
  maybeCount: number;
}

export interface GiftRegistryItem {
  id: string;
  name: string;
  description: string;
  category: "honeymoon" | "home" | "experience" | "cash" | "other";
  price: number;
  currency: string;
  image: string;
  storeLink?: string;
  storeName?: string;
  quantity: number;
  purchased: number;
  reservedBy?: string[];
  purchasedBy?: string[];
  priority: "high" | "medium" | "low";
  addedDate: string;
}

export interface GiftRegistry {
  id: string;
  registryLink: string;
  createdDate: string;
  title: string;
  welcomeMessage: string;
  shippingAddress?: string;
  allowCashGifts: boolean;
  honeymoonFundGoal?: number;
  honeymoonFundRaised?: number;
  items: GiftRegistryItem[];
  totalItems: number;
  purchasedItems: number;
  totalValue: number;
}

export interface ConciergeSaving {
  id: string;
  category: string;
  serviceName: string;
  originalPrice: number;
  negotiatedPrice: number;
  savedAmount: number;
  currency: string;
  savedDate: string;
  details: string;
}

export interface ConciergeService {
  id: string;
  tierName: string;
  tierLevel: "starter" | "premium" | "elite";
  status: "active" | "expired" | "cancelled";
  purchaseDate: string;
  expiryDate?: string;
  priceInr: number;
  features: string[];
  coinsBalance?: number;
  coinsEarned?: number;
  totalSavings: number;
  savingsBreakdown: ConciergeSaving[];
  conciergeAssigned?: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  stats: {
    negotiationsCompleted: number;
    venuesNegotiated: number;
    vendorsNegotiated: number;
    averageSavingsPercent: number;
    responseTime: string;
  };
}

export interface CustomerAccountData {
  profile: UserProfile;
  savedInspirations: SavedInspiration[];
  venueBookings: VenueBooking[];
  vendorBookings: VendorBooking[];
  plannerBookings: PlannerBooking[];
  tourBookings: TourBooking[];
  flightBookings: FlightBooking[];
  visaApplications: VisaApplication[];
  weddingPlan: WeddingPlanData | null;
  weddingInvitation: WeddingInvitation | null;
  guests: Guest[];
  giftRegistry: GiftRegistry | null;
  conciergeService: ConciergeService | null;
  payments?: Payment[];
}

const mockGuests: Guest[] = [
  {
    id: "G001",
    name: "Emma Johnson",
    email: "emma.j@email.com",
    phone: "+1 (555) 234-5678",
    category: "family",
    invitationSent: true,
    rsvpStatus: "attending",
    rsvpDate: "Jan 18, 2025",
    plusOne: true,
    dietaryRestrictions: "Vegetarian",
  },
  {
    id: "G002",
    name: "James Wilson",
    email: "james.w@email.com",
    category: "friends",
    invitationSent: true,
    rsvpStatus: "attending",
    rsvpDate: "Jan 19, 2025",
    plusOne: false,
  },
  {
    id: "G003",
    name: "Sophia Martinez",
    email: "sophia.m@email.com",
    phone: "+1 (555) 345-6789",
    category: "friends",
    invitationSent: true,
    rsvpStatus: "not-attending",
    rsvpDate: "Jan 17, 2025",
    plusOne: false,
  },
  {
    id: "G004",
    name: "Oliver Brown",
    email: "oliver.b@email.com",
    category: "family",
    invitationSent: true,
    rsvpStatus: "maybe",
    rsvpDate: "Jan 20, 2025",
    plusOne: true,
  },
  {
    id: "G005",
    name: "Ava Davis",
    email: "ava.d@email.com",
    phone: "+1 (555) 456-7890",
    category: "colleagues",
    invitationSent: true,
    rsvpStatus: "attending",
    rsvpDate: "Jan 16, 2025",
    plusOne: false,
    dietaryRestrictions: "Gluten-free",
  },
  {
    id: "G006",
    name: "Liam Anderson",
    email: "liam.a@email.com",
    category: "friends",
    invitationSent: true,
    rsvpStatus: "pending",
    plusOne: true,
  },
  {
    id: "G007",
    name: "Isabella Garcia",
    email: "isabella.g@email.com",
    phone: "+1 (555) 567-8901",
    category: "family",
    invitationSent: false,
    rsvpStatus: "pending",
    plusOne: false,
  },
  {
    id: "G008",
    name: "Noah Thompson",
    email: "noah.t@email.com",
    category: "colleagues",
    invitationSent: true,
    rsvpStatus: "attending",
    rsvpDate: "Jan 21, 2025",
    plusOne: true,
  },
];

const mockGiftRegistryItems: GiftRegistryItem[] = [
  {
    id: "GR001",
    name: "Honeymoon Fund - Villa Stay in Tuscany",
    description: "Help us enjoy a romantic villa stay during our Tuscan honeymoon",
    category: "honeymoon",
    price: 250,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1698616596895-71e43af05b70?w=600",
    quantity: 10,
    purchased: 3,
    purchasedBy: ["Emma Johnson", "James Wilson", "Ava Davis"],
    priority: "high",
    addedDate: "Jan 15, 2025",
  },
  {
    id: "GR002",
    name: "Espresso Machine - Breville Barista",
    description: "Premium espresso machine for our morning coffee rituals",
    category: "home",
    price: 599,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600",
    storeLink: "https://example.com/espresso",
    storeName: "Williams Sonoma",
    quantity: 1,
    purchased: 1,
    purchasedBy: ["Oliver Brown"],
    priority: "high",
    addedDate: "Jan 16, 2025",
  },
  {
    id: "GR003",
    name: "Wine Tour Experience in Tuscany",
    description: "Private guided wine tasting tour through Chianti region",
    category: "experience",
    price: 350,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600",
    quantity: 1,
    purchased: 0,
    priority: "high",
    addedDate: "Jan 16, 2025",
  },
  {
    id: "GR004",
    name: "Le Creuset Dutch Oven Set",
    description: "5.5 quart cast iron dutch oven in Caribbean blue",
    category: "home",
    price: 380,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600",
    storeLink: "https://example.com/dutch-oven",
    storeName: "Sur La Table",
    quantity: 1,
    purchased: 0,
    priority: "medium",
    addedDate: "Jan 17, 2025",
  },
  {
    id: "GR005",
    name: "Luxury Bedding Set - Queen",
    description: "Egyptian cotton 600 thread count sheet set in ivory",
    category: "home",
    price: 299,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600",
    storeLink: "https://example.com/bedding",
    storeName: "Pottery Barn",
    quantity: 1,
    purchased: 0,
    priority: "medium",
    addedDate: "Jan 17, 2025",
  },
  {
    id: "GR006",
    name: "Cooking Class for Two in Florence",
    description: "Traditional Italian cooking class with market tour",
    category: "experience",
    price: 200,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
    quantity: 1,
    purchased: 0,
    priority: "medium",
    addedDate: "Jan 18, 2025",
  },
  {
    id: "GR007",
    name: "Smart Home Hub",
    description: "Smart home control system with voice assistant",
    category: "home",
    price: 149,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1558089687-d6cd5605f7b1?w=600",
    storeLink: "https://example.com/smart-hub",
    storeName: "Best Buy",
    quantity: 1,
    purchased: 1,
    purchasedBy: ["Sophia Martinez"],
    priority: "low",
    addedDate: "Jan 18, 2025",
  },
  {
    id: "GR008",
    name: "Honeymoon Fund - Hot Air Balloon Ride",
    description: "Sunrise hot air balloon ride over the Tuscan countryside",
    category: "honeymoon",
    price: 300,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1498550744921-75f79806b163?w=600",
    quantity: 1,
    purchased: 0,
    priority: "high",
    addedDate: "Jan 19, 2025",
  },
  {
    id: "GR009",
    name: "Professional Knife Set",
    description: "12-piece German stainless steel knife block set",
    category: "home",
    price: 299,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600",
    storeLink: "https://example.com/knives",
    storeName: "Williams Sonoma",
    quantity: 1,
    purchased: 0,
    priority: "medium",
    addedDate: "Jan 19, 2025",
  },
  {
    id: "GR010",
    name: "Cash Gift - General Contribution",
    description: "Flexible contribution toward our new life together",
    category: "cash",
    price: 100,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=600",
    quantity: 20,
    purchased: 2,
    purchasedBy: ["Noah Thompson", "Liam Anderson"],
    priority: "low",
    addedDate: "Jan 20, 2025",
  },
];

const mockGiftRegistry: GiftRegistry = {
  id: "REG001",
  registryLink: "wedzway.com/registry/sarah-michael-tuscany-2025",
  createdDate: "Jan 15, 2025",
  title: "Sarah & Michael's Wedding Registry",
  welcomeMessage: "Thank you for being part of our special day! Your love and support mean the world to us. We've created this registry to help us start our new life together.",
  shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
  allowCashGifts: true,
  honeymoonFundGoal: 5000,
  honeymoonFundRaised: 750,
  items: mockGiftRegistryItems,
  totalItems: 10,
  purchasedItems: 4,
  totalValue: 2926,
};

const mockPayments: Payment[] = [
  {
    id: "PAY001",
    transactionId: "TXN202501150001",
    bookingReference: "VB001",
    bookingType: "venue",
    itemName: "Taj Lake Palace - Wedding Venue",
    paymentDate: "Jan 15, 2025",
    amount: "₹750,000",
    currency: "INR",
    paymentMethod: "bank-transfer",
    paymentStatus: "completed",
    bankName: "HDFC Bank",
    invoiceUrl: "/invoices/INV-2025-001.pdf",
    invoiceNumber: "INV-2025-001",
    paidTo: "Taj Hotels & Resorts",
    description: "Advance payment for wedding venue booking - 50% of total",
    transactionFee: "₹2,500",
    netAmount: "₹747,500",
    bankTransferStatus: "verified",
    bankTransferVerificationDate: "Jan 17, 2025",
    bankTransferProof: "/uploads/bank-proof-001.pdf",
    bankAccountDetails: {
      accountNumber: "GB29 WEDZ 6016 1331 9268 19",
      swiftCode: "WEDZGB2L",
      bankName: "Wedzway International Bank",
      accountHolder: "Wedzway Ltd",
      reference: "WDZ-VB001-TXN150001",
    },
  },
  {
    id: "PAY002",
    transactionId: "TXN202501180002",
    bookingReference: "VN001",
    bookingType: "vendor",
    itemName: "Capture Moments Studio - Photography",
    paymentDate: "Jan 18, 2025",
    amount: "₹125,000",
    currency: "INR",
    paymentMethod: "credit-card",
    paymentStatus: "completed",
    cardLast4: "4532",
    cardBrand: "Visa",
    invoiceUrl: "/invoices/INV-2025-002.pdf",
    invoiceNumber: "INV-2025-002",
    paidTo: "Capture Moments Studio",
    description: "Full payment for photography services - Premium Package",
    transactionFee: "₹2,500",
    netAmount: "₹122,500",
  },
  {
    id: "PAY003",
    transactionId: "TXN202501200003",
    bookingReference: "PL001",
    bookingType: "planner",
    itemName: "Elegant Affairs by Priya - Wedding Planning",
    paymentDate: "Jan 20, 2025",
    amount: "₹450,000",
    currency: "INR",
    paymentMethod: "upi",
    paymentStatus: "completed",
    upiId: "sarah.j@paytm",
    invoiceUrl: "/invoices/INV-2025-003.pdf",
    invoiceNumber: "INV-2025-003",
    paidTo: "Elegant Affairs by Priya",
    description: "Advance payment - Complete wedding planning services",
    transactionFee: "₹0",
    netAmount: "₹450,000",
  },
  {
    id: "PAY004",
    transactionId: "TXN202501220004",
    bookingReference: "VN002",
    bookingType: "vendor",
    itemName: "Floral Fantasy Decor - Wedding Decoration",
    paymentDate: "Jan 22, 2025",
    amount: "₹180,000",
    currency: "INR",
    paymentMethod: "debit-card",
    paymentStatus: "completed",
    cardLast4: "8765",
    cardBrand: "Mastercard",
    invoiceUrl: "/invoices/INV-2025-004.pdf",
    invoiceNumber: "INV-2025-004",
    paidTo: "Floral Fantasy Decor",
    description: "50% advance for complete wedding decoration",
    transactionFee: "₹1,800",
    netAmount: "₹178,200",
  },
  {
    id: "PAY005",
    transactionId: "TXN202501250005",
    bookingReference: "FL001",
    bookingType: "flight",
    itemName: "Flight Booking - Air India AI-101",
    paymentDate: "Jan 25, 2025",
    amount: "₹95,600",
    currency: "INR",
    paymentMethod: "credit-card",
    paymentStatus: "completed",
    cardLast4: "4532",
    cardBrand: "Visa",
    invoiceUrl: "/invoices/INV-2025-005.pdf",
    invoiceNumber: "INV-2025-005",
    paidTo: "Air India",
    description: "Round-trip flight booking for 2 passengers - Business Class",
    transactionFee: "₹1,914",
    netAmount: "₹93,686",
  },
  {
    id: "PAY006",
    transactionId: "TXN202501280006",
    bookingReference: "TR001",
    bookingType: "tour",
    itemName: "City Palace Heritage Tour",
    paymentDate: "Jan 28, 2025",
    amount: "₹12,500",
    currency: "INR",
    paymentMethod: "upi",
    paymentStatus: "completed",
    upiId: "sarah.j@paytm",
    invoiceUrl: "/invoices/INV-2025-006.pdf",
    invoiceNumber: "INV-2025-006",
    paidTo: "Udaipur Heritage Tours",
    description: "Group tour booking for 5 guests",
    transactionFee: "₹0",
    netAmount: "₹12,500",
  },
  {
    id: "PAY007",
    transactionId: "TXN202502010007",
    bookingReference: "MK001",
    bookingType: "marketplace",
    itemName: "Designer Bridal Lehenga - Sabyasachi",
    paymentDate: "Feb 1, 2025",
    amount: "₹385,000",
    currency: "INR",
    paymentMethod: "net-banking",
    paymentStatus: "completed",
    bankName: "ICICI Bank",
    invoiceUrl: "/invoices/INV-2025-007.pdf",
    invoiceNumber: "INV-2025-007",
    paidTo: "Sabyasachi Couture",
    description: "Custom bridal outfit with embellishments",
    transactionFee: "₹3,850",
    netAmount: "₹381,150",
  },
  {
    id: "PAY008",
    transactionId: "TXN202502050008",
    bookingReference: "VN003",
    bookingType: "vendor",
    itemName: "Cinematic Dreams - Videography",
    paymentDate: "Feb 5, 2025",
    amount: "₹95,000",
    currency: "INR",
    paymentMethod: "bank-transfer",
    paymentStatus: "awaiting-confirmation",
    bankName: "Axis Bank",
    invoiceUrl: "/invoices/INV-2025-008.pdf",
    invoiceNumber: "INV-2025-008",
    paidTo: "Cinematic Dreams Productions",
    description: "Advance payment for wedding videography - Cinematic Package",
    transactionFee: "₹1,500",
    netAmount: "₹93,500",
    bankTransferStatus: "pending-upload",
    bankAccountDetails: {
      accountNumber: "GB29 WEDZ 6016 1331 9268 20",
      swiftCode: "WEDZGB2L",
      bankName: "Wedzway International Bank",
      accountHolder: "Wedzway Ltd",
      reference: "WDZ-VN003-TXN050008",
    },
  },
  {
    id: "PAY009",
    transactionId: "TXN202501120009",
    bookingReference: "VB002",
    bookingType: "venue",
    itemName: "Umaid Bhawan Palace - Pre-wedding Venue",
    paymentDate: "Jan 12, 2025",
    amount: "₹250,000",
    currency: "INR",
    paymentMethod: "credit-card",
    paymentStatus: "refunded",
    cardLast4: "4532",
    cardBrand: "Visa",
    invoiceUrl: "/invoices/INV-2025-009.pdf",
    invoiceNumber: "INV-2025-009",
    paidTo: "Umaid Bhawan Palace",
    description: "Cancelled pre-wedding venue booking - Full refund processed",
    transactionFee: "₹0",
    netAmount: "₹250,000",
  },
  {
    id: "PAY010",
    transactionId: "TXN202502100010",
    bookingReference: "MK002",
    bookingType: "marketplace",
    itemName: "Wedding Jewelry Set - Tanishq",
    paymentDate: "Feb 10, 2025",
    amount: "₹425,000",
    currency: "INR",
    paymentMethod: "paypal",
    paymentStatus: "completed",
    invoiceUrl: "/invoices/INV-2025-010.pdf",
    invoiceNumber: "INV-2025-010",
    paidTo: "Tanishq Jewellery",
    description: "Complete bridal jewelry set with matching accessories",
    transactionFee: "₹12,750",
    netAmount: "₹412,250",
  },
  {
    id: "PAY011",
    transactionId: "TXN202502150011",
    bookingReference: "VN004",
    bookingType: "vendor",
    itemName: "Mehndi Magic - Bridal Henna Artist",
    paymentDate: "Feb 15, 2025",
    amount: "₹35,000",
    currency: "INR",
    paymentMethod: "bank-transfer",
    paymentStatus: "pending",
    bankName: "State Bank of India",
    invoiceUrl: "/invoices/INV-2025-011.pdf",
    invoiceNumber: "INV-2025-011",
    paidTo: "Mehndi Magic Studio",
    description: "Bridal and family mehndi services",
    transactionFee: "₹0",
    netAmount: "₹35,000",
    bankTransferStatus: "uploaded",
    bankTransferUploadDate: "Feb 16, 2025",
    bankTransferProof: "/uploads/bank-proof-011.pdf",
    bankAccountDetails: {
      accountNumber: "GB29 WEDZ 6016 1331 9268 21",
      swiftCode: "WEDZGB2L",
      bankName: "Wedzway International Bank",
      accountHolder: "Wedzway Ltd",
      reference: "WDZ-VN004-TXN150011",
    },
  },
  {
    id: "PAY012",
    transactionId: "TXN202502180012",
    bookingReference: "VN005",
    bookingType: "vendor",
    itemName: "Royal Caterers - Wedding Catering",
    paymentDate: "Feb 18, 2025",
    amount: "₹580,000",
    currency: "INR",
    paymentMethod: "bank-transfer",
    paymentStatus: "awaiting-confirmation",
    bankName: "Punjab National Bank",
    invoiceUrl: "/invoices/INV-2025-012.pdf",
    invoiceNumber: "INV-2025-012",
    paidTo: "Royal Caterers Ltd",
    description: "Advance payment for wedding catering - 120 guests",
    transactionFee: "₹0",
    netAmount: "₹580,000",
    bankTransferStatus: "rejected",
    bankTransferUploadDate: "Feb 19, 2025",
    bankTransferRejectionReason: "The uploaded document appears to be incomplete. Please upload a clear copy showing the full transaction details including amount, date, and reference number.",
    bankAccountDetails: {
      accountNumber: "GB29 WEDZ 6016 1331 9268 22",
      swiftCode: "WEDZGB2L",
      bankName: "Wedzway International Bank",
      accountHolder: "Wedzway Ltd",
      reference: "WDZ-VN005-TXN180012",
    },
  },
];

const mockWeddingInvitation: WeddingInvitation = {
  id: "INV001",
  invitationLink: "wedzway.com/wedding/sarah-michael-tuscany-2025",
  createdDate: "Jan 15, 2025",
  title: "Sarah & Michael's Tuscan Wedding",
  customMessage: "Join us for a magical celebration of love in the heart of Tuscany. Your presence would mean the world to us as we begin our forever together.",
  designTheme: "romantic",
  totalGuests: 8,
  sentCount: 7,
  rsvpReceived: 6,
  attendingCount: 4,
  notAttendingCount: 1,
  maybeCount: 1,
};

const mockConciergeSavings: ConciergeSaving[] = [
  {
    id: "SAV001",
    category: "Venue",
    serviceName: "Villa Bellissima - Wedding Venue",
    originalPrice: 4200000,
    negotiatedPrice: 3500000,
    savedAmount: 700000,
    currency: "INR",
    savedDate: "Jan 5, 2025",
    details: "Negotiated package discount including complimentary welcome dinner"
  },
  {
    id: "SAV002",
    category: "Photography",
    serviceName: "Marco Photography - Premium Package",
    originalPrice: 150000,
    negotiatedPrice: 125000,
    savedAmount: 25000,
    currency: "INR",
    savedDate: "Jan 8, 2025",
    details: "Secured off-season rates with complimentary engagement shoot"
  },
  {
    id: "SAV003",
    category: "Floral & Decor",
    serviceName: "Bella Floral Design - Complete Package",
    originalPrice: 220000,
    negotiatedPrice: 180000,
    savedAmount: 40000,
    currency: "INR",
    savedDate: "Jan 10, 2025",
    details: "Bundled ceremony and reception decor with volume discount"
  },
  {
    id: "SAV004",
    category: "Videography",
    serviceName: "Antonio Videography - Cinematic Film",
    originalPrice: 135000,
    negotiatedPrice: 95000,
    savedAmount: 40000,
    currency: "INR",
    savedDate: "Jan 12, 2025",
    details: "Multi-vendor booking discount + same-day edit included"
  },
  {
    id: "SAV005",
    category: "Planning",
    serviceName: "Elena Romano - Full Service Planning",
    originalPrice: 550000,
    negotiatedPrice: 450000,
    savedAmount: 100000,
    currency: "INR",
    savedDate: "Dec 15, 2024",
    details: "Early bird discount + complimentary month-of coordination"
  },
  {
    id: "SAV006",
    category: "Tours",
    serviceName: "Chianti Wine Country Tour",
    originalPrice: 1500,
    negotiatedPrice: 1200,
    savedAmount: 300,
    currency: "EUR",
    savedDate: "Jan 6, 2025",
    details: "Group booking discount for 10+ participants"
  },
];

const mockConciergeService: ConciergeService = {
  id: "CONC001",
  tierName: "Premium",
  tierLevel: "premium",
  status: "active",
  purchaseDate: "Dec 1, 2024",
  expiryDate: "Dec 1, 2026",
  priceInr: 150000,
  features: [
    "2 Wedding Coverage",
    "24/7 Dedicated Support",
    "In-person Venue Negotiations",
    "Priority Vendor Access",
    "Contract Review & Legal Support",
    "3 Complimentary Site Visits",
    "Wedzway Coins Rewards",
    "Family & Friends Discounts"
  ],
  coinsBalance: 12500,
  coinsEarned: 15000,
  totalSavings: 905300,
  savingsBreakdown: mockConciergeSavings,
  conciergeAssigned: {
    name: "Priya Sharma",
    email: "priya.sharma@wedzway.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
  },
  stats: {
    negotiationsCompleted: 6,
    venuesNegotiated: 1,
    vendorsNegotiated: 5,
    averageSavingsPercent: 18,
    responseTime: "2 hours"
  }
};

export const mockCustomerData = {
  profile: mockUserProfile,
  savedInspirations: mockSavedInspirations,
  venueBookings: mockVenueBookings,
  vendorBookings: mockVendorBookings,
  plannerBookings: mockPlannerBookings,
  tourBookings: mockTourBookings,
  flightBookings: mockFlightBookings,
  visaApplications: mockVisaApplications,
  weddingPlan: mockWeddingPlan,
  weddingInvitation: mockWeddingInvitation,
  guests: mockGuests,
  giftRegistry: mockGiftRegistry,
  conciergeService: mockConciergeService,
  payments: mockPayments,
};

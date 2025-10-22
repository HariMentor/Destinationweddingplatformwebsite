// Tourism Board data structure

export interface TourismBoardCoupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  terms: string;
  category: "accommodation" | "dining" | "activities" | "transport" | "general";
}

export interface TourismBoardPromotion {
  id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
  link?: string;
}

export interface ThingToDo {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
}

export interface MuseumBooking {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  openingHours: string;
  ticketPrice: string;
  rating: number;
  reviews: number;
  highlights: string[];
}

export interface TourPackage {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  includes: string[];
  rating: number;
  reviews: number;
  availability: string;
}

export interface TourismBoard {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  founded: string;
  website: string;
  email: string;
  phone: string;
  verified: true;
  coverImage: string;
  logo: string;
  stats: {
    visitors: string;
    attractions: number;
    partners: number;
    rating: number;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  coupons: TourismBoardCoupon[];
  promotions: TourismBoardPromotion[];
  thingsToDo: ThingToDo[];
  museums: MuseumBooking[];
  tourPackages: TourPackage[];
}

export const tourismBoards: { [key: string]: TourismBoard } = {
  "Visit Florence": {
    id: "visit-florence",
    name: "Visit Florence",
    tagline: "The Cradle of the Renaissance",
    description: "Visit Florence is the official tourism board for Florence, Italy. We are dedicated to promoting the art, culture, and heritage of this magnificent city. From world-renowned museums to authentic Tuscan experiences, we help visitors discover the best of Florence.",
    location: "Florence, Tuscany, Italy",
    founded: "1985",
    website: "www.visitflorence.com",
    email: "info@visitflorence.com",
    phone: "+39 055 290 832",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: {
      visitors: "16M+ annually",
      attractions: 450,
      partners: 1200,
      rating: 4.9,
    },
    socialMedia: {
      facebook: "visitflorence",
      instagram: "@visitflorence",
      twitter: "@visitflorence",
    },
    coupons: [
      {
        id: "c1",
        code: "FLORENCE20",
        title: "20% Off Museum Pass",
        description: "Get 20% discount on the Florence Museum Pass for unlimited access to 72+ museums",
        discount: "20% OFF",
        validUntil: "Dec 31, 2025",
        terms: "Valid for new bookings only. Cannot be combined with other offers.",
        category: "activities",
      },
      {
        id: "c2",
        code: "UFFIZI15",
        title: "Uffizi Gallery Skip-the-Line",
        description: "15% off skip-the-line tickets to the world-famous Uffizi Gallery",
        discount: "15% OFF",
        validUntil: "Dec 31, 2025",
        terms: "Book at least 48 hours in advance. Subject to availability.",
        category: "activities",
      },
      {
        id: "c3",
        code: "TUSCANDINE",
        title: "Tuscan Dining Experience",
        description: "€25 off at participating restaurants in Florence city center",
        discount: "€25 OFF",
        validUntil: "Nov 30, 2025",
        terms: "Minimum spend €100. Valid Monday-Thursday.",
        category: "dining",
      },
      {
        id: "c4",
        code: "HOTELS30",
        title: "Accommodation Special",
        description: "Up to 30% off selected hotels in Florence",
        discount: "30% OFF",
        validUntil: "Dec 15, 2025",
        terms: "Minimum 3-night stay. Based on availability.",
        category: "accommodation",
      },
    ],
    promotions: [
      {
        id: "p1",
        title: "Renaissance Week 2025",
        description: "Join us for a week-long celebration of art, culture, and history with special exhibitions, guided tours, and cultural performances.",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        validUntil: "June 15, 2025",
      },
      {
        id: "p2",
        title: "Summer Night at the Museums",
        description: "Extended museum hours until midnight with live music and wine tastings every Friday in July and August.",
        image: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        validUntil: "August 31, 2025",
      },
      {
        id: "p3",
        title: "Tuscan Wine & Food Festival",
        description: "Experience authentic Tuscan cuisine and wines from over 100 local producers in the historic city center.",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwd2luZSUyMHRhc3Rpbmd8ZW58MXx8fHwxNzYwMzc1MzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        validUntil: "September 20, 2025",
      },
    ],
    thingsToDo: [
      {
        id: "t1",
        title: "Walking Tour of Historic Center",
        description: "Discover Florence's UNESCO World Heritage sites with expert local guides. Visit the Duomo, Ponte Vecchio, and Piazza della Signoria.",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Culture & History",
        duration: "3 hours",
        price: "€45",
        rating: 4.9,
        reviews: 2847,
      },
      {
        id: "t2",
        title: "Chianti Wine Tasting Tour",
        description: "Full-day tour through the Chianti countryside with visits to 3 wineries, lunch included, and stunning Tuscan views.",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwd2luZSUyMHRhc3Rpbmd8ZW58MXx8fHwxNzYwMzc1MzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Wine & Food",
        duration: "8 hours",
        price: "€120",
        rating: 4.8,
        reviews: 1653,
      },
      {
        id: "t3",
        title: "Cooking Class with Market Visit",
        description: "Learn to make authentic Tuscan dishes starting with a visit to the local market, followed by hands-on cooking.",
        image: "https://images.unsplash.com/photo-1556909190-3163d2b35637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwY29va2luZyUyMGNsYXNzfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Wine & Food",
        duration: "5 hours",
        price: "€95",
        rating: 4.9,
        reviews: 1234,
      },
      {
        id: "t4",
        title: "Vespa Tour of Tuscan Hills",
        description: "Ride a classic Vespa through the rolling hills of Tuscany, stopping at scenic viewpoints and local villages.",
        image: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Adventure",
        duration: "4 hours",
        price: "€85",
        rating: 4.7,
        reviews: 876,
      },
      {
        id: "t5",
        title: "Private Gondola on the Arno",
        description: "Romantic gondola ride along the Arno River with champagne and stunning views of historic bridges.",
        image: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Romance",
        duration: "1 hour",
        price: "€150",
        rating: 5.0,
        reviews: 543,
      },
      {
        id: "t6",
        title: "Art Workshop Experience",
        description: "Learn Renaissance art techniques in a professional studio. Perfect for beginners and art enthusiasts.",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        category: "Art & Culture",
        duration: "3 hours",
        price: "€75",
        rating: 4.8,
        reviews: 645,
      },
    ],
    museums: [
      {
        id: "m1",
        name: "Uffizi Gallery",
        description: "One of the world's most famous art museums, housing masterpieces by Botticelli, Leonardo da Vinci, Michelangelo, and Raphael.",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        location: "Piazzale degli Uffizi, 6",
        openingHours: "Tue-Sun: 8:15 AM - 6:50 PM",
        ticketPrice: "€20 (Skip-the-line: €35)",
        rating: 4.9,
        reviews: 45234,
        highlights: [
          "Birth of Venus by Botticelli",
          "Annunciation by Leonardo da Vinci",
          "Tondo Doni by Michelangelo",
          "Portrait of Pope Leo X by Raphael",
        ],
      },
      {
        id: "m2",
        name: "Accademia Gallery",
        description: "Home to Michelangelo's iconic David sculpture and other Renaissance masterpieces. A must-visit for art lovers.",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        location: "Via Ricasoli, 58-60",
        openingHours: "Tue-Sun: 9:00 AM - 6:45 PM",
        ticketPrice: "€16 (Skip-the-line: €28)",
        rating: 4.9,
        reviews: 38765,
        highlights: [
          "Michelangelo's David",
          "The Prisoners by Michelangelo",
          "Madonna of the Sea",
          "Musical Instrument Collection",
        ],
      },
      {
        id: "m3",
        name: "Palazzo Pitti",
        description: "Vast Renaissance palace with multiple museums showcasing Medici treasures, royal apartments, and modern art.",
        image: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        location: "Piazza de' Pitti, 1",
        openingHours: "Tue-Sun: 8:15 AM - 6:50 PM",
        ticketPrice: "€16 (Combined ticket: €25)",
        rating: 4.8,
        reviews: 23456,
        highlights: [
          "Palatine Gallery",
          "Royal Apartments",
          "Boboli Gardens",
          "Modern Art Gallery",
        ],
      },
      {
        id: "m4",
        name: "Bargello Museum",
        description: "Former palace and prison, now housing the finest collection of Renaissance sculptures in Florence.",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        location: "Via del Proconsolo, 4",
        openingHours: "Daily: 8:15 AM - 1:50 PM",
        ticketPrice: "€9",
        rating: 4.7,
        reviews: 12345,
        highlights: [
          "Donatello's David",
          "Works by Michelangelo",
          "Cellini's Mercury",
          "Decorative Arts Collection",
        ],
      },
    ],
    tourPackages: [
      {
        id: "tp1",
        name: "Florence Highlights - 3 Day Package",
        description: "Comprehensive 3-day tour covering all major attractions, guided museum visits, wine tasting, and traditional Tuscan dinner.",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        duration: "3 Days / 2 Nights",
        price: "€450 per person",
        includes: [
          "2 nights 4-star hotel accommodation",
          "Skip-the-line tickets to Uffizi & Accademia",
          "Professional English-speaking guide",
          "Chianti wine tasting tour",
          "Traditional Tuscan dinner",
          "All entrance fees",
        ],
        rating: 4.9,
        reviews: 1876,
        availability: "Daily departures",
      },
      {
        id: "tp2",
        name: "Art Lover's Florence - 5 Day Package",
        description: "In-depth art and culture experience with extended museum visits, private gallery tours, and art workshops.",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwY2F0aGVkcmFsfGVufDF8fHx8MTc2MDM3NTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        duration: "5 Days / 4 Nights",
        price: "€890 per person",
        includes: [
          "4 nights boutique hotel accommodation",
          "Private art historian guide",
          "All museum skip-the-line access",
          "Renaissance art workshop",
          "Exclusive after-hours museum tour",
          "Welcome dinner & farewell lunch",
        ],
        rating: 5.0,
        reviews: 934,
        availability: "Mon, Wed, Fri",
      },
      {
        id: "tp3",
        name: "Tuscany Complete - 7 Day Package",
        description: "Ultimate Tuscany experience combining Florence, Siena, San Gimignano, and the Chianti region with accommodation and transport.",
        image: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        duration: "7 Days / 6 Nights",
        price: "€1,450 per person",
        includes: [
          "6 nights in luxury hotels & villas",
          "Private transportation throughout",
          "Multiple wine tasting tours",
          "Cooking class experience",
          "All major museum tickets",
          "Daily breakfast & 4 dinners",
        ],
        rating: 4.9,
        reviews: 2134,
        availability: "Weekly on Sundays",
      },
      {
        id: "tp4",
        name: "Romantic Florence Getaway",
        description: "Perfect couples package with romantic experiences, private tours, candlelit dinners, and luxury accommodation.",
        image: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjAzNzUzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        duration: "4 Days / 3 Nights",
        price: "€1,200 per couple",
        includes: [
          "3 nights 5-star hotel with river view",
          "Gondola ride on the Arno",
          "Private sunset tour of Florence",
          "Couples cooking class",
          "Romantic rooftop dinner",
          "Champagne & roses welcome package",
        ],
        rating: 5.0,
        reviews: 756,
        availability: "Available year-round",
      },
    ],
  },
  
  "Discover Bali": {
    id: "discover-bali",
    name: "Discover Bali",
    tagline: "Island of the Gods",
    description: "Discover Bali is the official tourism organization for Bali, Indonesia. We showcase the island's stunning beaches, ancient temples, vibrant culture, and world-class wedding venues.",
    location: "Bali, Indonesia",
    founded: "1992",
    website: "www.discoverbali.com",
    email: "info@discoverbali.com",
    phone: "+62 361 123 456",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhfGVufDF8fHx8MTc2MDcwNDU2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlfGVufDF8fHx8MTc2MDcwNDU3MHww&ixlib=rb-4.1.0&q=80&w=1080",
    stats: {
      visitors: "6M+ annually",
      attractions: 280,
      partners: 850,
      rating: 4.8,
    },
    socialMedia: {
      facebook: "discoverbali",
      instagram: "@discoverbali",
      twitter: "@discoverbali",
    },
    coupons: [
      {
        id: "c1",
        code: "BALI25",
        title: "25% Off Beach Clubs",
        description: "Get 25% discount at premium beach clubs in Seminyak and Canggu",
        discount: "25% OFF",
        validUntil: "Dec 31, 2025",
        terms: "Valid for new bookings. Minimum spend $50.",
        category: "activities",
      },
      {
        id: "c2",
        code: "SPA30",
        title: "Spa & Wellness Package",
        description: "30% off at luxury spas across Bali",
        discount: "30% OFF",
        validUntil: "Nov 30, 2025",
        terms: "Book 48 hours in advance.",
        category: "activities",
      },
    ],
    promotions: [],
    thingsToDo: [],
    museums: [],
    tourPackages: [],
  },
};

export function getTourismBoardById(id: string): TourismBoard | undefined {
  return Object.values(tourismBoards).find(board => board.id === id);
}

export function getTourismBoardByName(name: string): TourismBoard | undefined {
  return tourismBoards[name];
}

import {
  Hotel,
  Plane,
  Users,
  Camera,
  UtensilsCrossed,
  Music,
  Sparkles,
  Package,
  MapPin,
  Shield,
  Trophy,
  Heart
} from 'lucide-react';

export const providersData: { [key: string]: any } = {
  tui: {
    id: 'tui',
    name: 'TUI Weddings',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400',
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f29da8c6a4?w=1600',
    tagline: 'Europe\'s Leading Wedding Travel Provider',
    description: 'TUI brings over 50 years of travel expertise to create unforgettable destination weddings across the globe. From intimate beachfront ceremonies to grand palace celebrations, we curate exceptional experiences tailored to your vision.',
    longDescription: `Since 1968, TUI has been pioneering exceptional travel experiences, and our wedding division continues this legacy with unparalleled expertise. We understand that your wedding is one of the most important days of your life, which is why we've partnered with the world's finest hotels, resorts, and venues to offer you extraordinary locations coupled with impeccable service.

Our dedicated wedding specialists work closely with you from the moment you begin planning, offering personalized guidance, expert recommendations, and exclusive access to our network of 156 premium venues across 24 stunning destinations. Whether you dream of a romantic beach ceremony in Greece, a luxurious palace wedding in Turkey, or an intimate overwater celebration in the Maldives, we bring your vision to life with meticulous attention to detail.`,
    established: '1968',
    headquarters: 'Hanover, Germany',
    totalVenues: 156,
    destinations: 24,
    weddingsHosted: 8500,
    rating: 4.8,
    totalReviews: 2847,
    verified: true,
    premium: true,
    accentColor: '#E20074',
    contact: {
      phone: '+44 20 7771 7371',
      email: 'weddings@tui.com',
      website: 'www.tui.co.uk/weddings'
    },
    packages: [
      {
        name: 'Intimate Escape',
        price: '£15,000',
        description: 'Perfect for couples seeking a romantic, intimate celebration',
        includes: ['Venue hire', 'Ceremony setup', 'Floral arrangements', 'Photography (4 hours)', 'Dinner for 20 guests', 'Wedding coordinator']
      },
      {
        name: 'Classic Celebration',
        price: '£35,000',
        description: 'Our most popular package for memorable celebrations',
        includes: ['Premium venue hire', 'Ceremony & reception setup', 'Floral & decor', 'Photography & videography', 'Dinner & drinks for 75 guests', 'Entertainment', 'Dedicated wedding planner']
      },
      {
        name: 'Grand Affair',
        price: '£75,000',
        description: 'The ultimate luxury wedding experience',
        includes: ['Exclusive venue hire', 'Full design & styling', 'Premium floral installations', 'Full-day photography & videography', 'Gourmet dinner for 150 guests', 'Live band & DJ', 'Fireworks display', 'VIP wedding concierge']
      }
    ],
    venues: [
      { id: 1, name: 'TUI BLUE Palace Resort', location: 'Crete, Greece', region: 'Mediterranean', rating: 4.9, reviews: 342, capacity: 200, priceFrom: '£18,000', image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800', featured: true },
      { id: 2, name: 'TUI SENSATORI Barut Fethiye', location: 'Fethiye, Turkey', region: 'Mediterranean', rating: 4.8, reviews: 289, capacity: 150, priceFrom: '£16,000', image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800', featured: true },
      { id: 3, name: 'Robinson Club Maldives', location: 'Maldives', region: 'Indian Ocean', rating: 5.0, reviews: 156, capacity: 80, priceFrom: '£45,000', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', featured: true },
      { id: 4, name: 'TUI BLUE Adriatic', location: 'Dubrovnik, Croatia', region: 'Mediterranean', rating: 4.7, reviews: 234, capacity: 120, priceFrom: '£14,000', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', featured: false },
      { id: 5, name: 'Sensimar Royal Palm', location: 'Fuerteventura, Spain', region: 'Canary Islands', rating: 4.8, reviews: 298, capacity: 100, priceFrom: '£13,500', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', featured: false },
      { id: 6, name: 'TUI MAGIC LIFE Waterworld', location: 'Belek, Turkey', region: 'Mediterranean', rating: 4.6, reviews: 445, capacity: 180, priceFrom: '£15,500', image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', featured: false },
    ],
    services: [
      { icon: Hotel, title: 'Venue Selection', description: 'Curated selection of 156 premium venues worldwide' },
      { icon: Plane, title: 'Travel Coordination', description: 'Complete flight and accommodation packages for you and your guests' },
      { icon: Users, title: 'Wedding Planning', description: 'Dedicated wedding planner from booking to big day' },
      { icon: Camera, title: 'Photography & Video', description: 'Professional photography and videography packages' },
      { icon: UtensilsCrossed, title: 'Catering Excellence', description: 'Michelin-quality menus and beverage packages' },
      { icon: Music, title: 'Entertainment', description: 'DJs, live bands, and cultural performances' },
      { icon: Sparkles, title: 'Styling & Decor', description: 'Full event design and floral arrangements' },
      { icon: Package, title: 'All-Inclusive Options', description: 'Comprehensive packages with everything included' },
    ],
    whyChoose: [
      { icon: Shield, title: '50+ Years Experience', description: 'Trusted by thousands of couples worldwide since 1968' },
      { icon: Trophy, title: 'Award-Winning Service', description: 'Multiple industry awards for excellence in wedding travel' },
      { icon: Heart, title: '8,500+ Weddings', description: 'Successfully hosted celebrations in stunning locations globally' },
    ],
    testimonials: [
      {
        name: 'Sarah & James',
        location: 'London, UK',
        venue: 'TUI BLUE Palace Resort, Crete',
        rating: 5,
        text: 'TUI made our dream wedding a reality! Every detail was perfect, from the stunning venue to the incredible service. Our guests are still talking about it months later.',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400'
      },
      {
        name: 'Emily & Michael',
        location: 'Manchester, UK',
        venue: 'Robinson Club Maldives',
        rating: 5,
        text: 'The attention to detail was extraordinary. Our wedding planner understood our vision perfectly and exceeded all expectations. Worth every penny!',
        image: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400'
      },
      {
        name: 'Priya & Raj',
        location: 'Birmingham, UK',
        venue: 'TUI SENSATORI Barut Fethiye',
        rating: 5,
        text: 'An absolutely magical experience from start to finish. The venue was breathtaking and the team made everything seamless. Highly recommend!',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
      },
    ]
  },

  virgin: {
    id: 'virgin',
    name: 'Virgin Holidays Weddings',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400',
    coverImage: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600',
    tagline: 'Exceptional Experiences, Unforgettable Moments',
    description: 'Virgin Holidays specializes in luxury destination weddings with a focus on Caribbean and USA locations. Our dedicated wedding team ensures every detail is perfectly executed for your special day.',
    longDescription: `Since 1985, Virgin Holidays has been creating extraordinary travel experiences with our signature touch of innovation and excellence. Our wedding division brings this same passion to help you celebrate the most important day of your life in spectacular destinations across the Caribbean, USA, and beyond.

With exclusive partnerships with the world's finest luxury resorts and a team of dedicated wedding specialists, we offer personalized service that turns your dreams into reality. From intimate beach ceremonies to grand resort celebrations, every detail is crafted with care and attention.`,
    established: '1985',
    headquarters: 'Crawley, UK',
    totalVenues: 89,
    destinations: 18,
    weddingsHosted: 5200,
    rating: 4.7,
    totalReviews: 1834,
    verified: true,
    premium: true,
    accentColor: '#E10A0A',
    contact: {
      phone: '+44 344 557 3859',
      email: 'weddings@virginholidays.co.uk',
      website: 'www.virginholidays.co.uk/weddings'
    },
    packages: [
      {
        name: 'Beach Romance',
        price: '£18,000',
        description: 'Intimate Caribbean beach celebration',
        includes: ['Beachfront ceremony', 'Floral arch', 'Champagne toast', 'Photography package', 'Dinner for 15 guests', 'Wedding coordinator']
      },
      {
        name: 'Premium Paradise',
        price: '£45,000',
        description: 'Luxury resort experience with personalized service',
        includes: ['Premium resort venue', 'Full ceremony & reception', 'Luxury decor', 'Photography & videography', 'Gourmet dinner for 60 guests', 'Live music', 'Personal wedding planner']
      },
      {
        name: 'Ultimate Luxury',
        price: '£95,000',
        description: 'The pinnacle of destination wedding excellence',
        includes: ['Exclusive resort buyout option', 'Celebrity event designer', 'Full photography & videography team', 'Multi-day celebration for 120 guests', 'Premium entertainment', 'Private yacht excursion', 'VIP concierge service']
      }
    ],
    venues: [
      { id: 1, name: 'The Ritz-Carlton, Grand Cayman', location: 'Grand Cayman', region: 'Caribbean', rating: 4.9, reviews: 428, capacity: 200, priceFrom: '£22,000', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800', featured: true },
      { id: 2, name: 'Sandals Royal Barbados', location: 'Barbados', region: 'Caribbean', rating: 4.8, reviews: 367, capacity: 150, priceFrom: '£19,000', image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800', featured: true },
      { id: 3, name: 'One&Only Palmilla', location: 'Los Cabos, Mexico', region: 'Mexico', rating: 5.0, reviews: 201, capacity: 100, priceFrom: '£38,000', image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800', featured: true },
      { id: 4, name: 'Beaches Turks & Caicos', location: 'Turks & Caicos', region: 'Caribbean', rating: 4.7, reviews: 312, capacity: 180, priceFrom: '£17,500', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', featured: false },
      { id: 5, name: 'Four Seasons Nevis', location: 'Nevis', region: 'Caribbean', rating: 4.9, reviews: 256, capacity: 120, priceFrom: '£28,000', image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', featured: false },
    ],
    services: [
      { icon: Hotel, title: 'Luxury Venues', description: '89 handpicked luxury resorts and venues' },
      { icon: Plane, title: 'Flight Packages', description: 'Premium flight and transfer arrangements' },
      { icon: Users, title: 'Expert Planners', description: 'Award-winning wedding planning team' },
      { icon: Camera, title: 'Photography', description: 'Professional destination wedding photography' },
      { icon: UtensilsCrossed, title: 'Gourmet Dining', description: 'World-class cuisine and beverages' },
      { icon: Music, title: 'Entertainment', description: 'Live bands, DJs, and cultural shows' },
      { icon: Sparkles, title: 'Styling', description: 'Premium decor and floral design' },
      { icon: Package, title: 'All-Inclusive', description: 'Comprehensive wedding packages available' },
    ],
    whyChoose: [
      { icon: Shield, title: '35+ Years Excellence', description: 'Trusted wedding travel specialist since 1985' },
      { icon: Trophy, title: 'Industry Leader', description: 'Multiple awards for Caribbean wedding expertise' },
      { icon: Heart, title: '5,200+ Celebrations', description: 'Creating magical moments worldwide' },
    ],
    testimonials: [
      {
        name: 'Charlotte & David',
        location: 'Bristol, UK',
        venue: 'The Ritz-Carlton, Grand Cayman',
        rating: 5,
        text: 'Virgin Holidays exceeded every expectation. The attention to detail and personal service made our Caribbean wedding absolutely perfect!',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
      },
      {
        name: 'Jessica & Tom',
        location: 'Edinburgh, UK',
        venue: 'Sandals Royal Barbados',
        rating: 5,
        text: 'From planning to execution, everything was flawless. Our guests said it was the best wedding they\'ve ever attended!',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
      },
    ]
  },

  kuoni: {
    id: 'kuoni',
    name: 'Kuoni Weddings',
    logo: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600',
    tagline: 'Crafting Dreams Since 1906',
    description: 'With over a century of travel excellence, Kuoni offers bespoke wedding experiences in the world\'s most romantic destinations. Our heritage and expertise ensure sophisticated celebrations.',
    longDescription: `For over 115 years, Kuoni has been the gold standard in luxury travel. Our wedding division continues this proud tradition, offering unparalleled expertise in creating bespoke celebrations in the world's most breathtaking destinations.

From the Maldives to Mauritius, from Thailand to Tanzania, we specialize in exotic and romantic locations that provide the perfect backdrop for your special day. Our experienced wedding consultants work with you to create a completely personalized experience, ensuring every detail reflects your unique love story.`,
    established: '1906',
    headquarters: 'Zurich, Switzerland',
    totalVenues: 124,
    destinations: 32,
    weddingsHosted: 12300,
    rating: 4.9,
    totalReviews: 3456,
    verified: true,
    premium: true,
    accentColor: '#C41E3A',
    contact: {
      phone: '+44 1306 747008',
      email: 'weddings@kuoni.co.uk',
      website: 'www.kuoni.co.uk/weddings'
    },
    packages: [
      {
        name: 'Intimate Paradise',
        price: '£20,000',
        description: 'Exclusive intimate celebration in exotic locations',
        includes: ['Luxury venue', 'Ceremony arrangements', 'Tropical floral design', 'Photography', 'Gourmet dinner for 10 guests', 'Personal coordinator']
      },
      {
        name: 'Signature Celebration',
        price: '£48,000',
        description: 'Our signature luxury wedding experience',
        includes: ['Premium resort venue', 'Full event design', 'Luxury florals & styling', 'Photography & videography', 'Fine dining for 80 guests', 'Entertainment package', 'Dedicated wedding team']
      },
      {
        name: 'Bespoke Luxury',
        price: '£120,000',
        description: 'Fully customized ultra-luxury celebration',
        includes: ['Private island or resort buyout', 'World-class event designer', 'Complete photography & film team', 'Multi-day celebration for 200 guests', 'Celebrity entertainment', 'Private experiences', 'Elite concierge service']
      }
    ],
    venues: [
      { id: 1, name: 'Soneva Fushi', location: 'Maldives', region: 'Indian Ocean', rating: 5.0, reviews: 389, capacity: 120, priceFrom: '£42,000', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', featured: true },
      { id: 2, name: 'Rayavadee Resort', location: 'Krabi, Thailand', region: 'Asia', rating: 4.9, reviews: 445, capacity: 150, priceFrom: '£26,000', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', featured: true },
      { id: 3, name: 'Royal Palm Mauritius', location: 'Mauritius', region: 'Indian Ocean', rating: 4.8, reviews: 312, capacity: 180, priceFrom: '£32,000', image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', featured: true },
      { id: 4, name: 'The Oberoi Udaivilas', location: 'Udaipur, India', region: 'Asia', rating: 5.0, reviews: 267, capacity: 200, priceFrom: '£38,000', image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800', featured: false },
      { id: 5, name: 'Anantara Bali', location: 'Bali, Indonesia', region: 'Asia', rating: 4.8, reviews: 398, capacity: 140, priceFrom: '£28,000', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', featured: false },
    ],
    services: [
      { icon: Hotel, title: 'Exotic Venues', description: '124 handpicked luxury venues in 32 countries' },
      { icon: Plane, title: 'Premium Travel', description: 'First-class flights and luxury transfers' },
      { icon: Users, title: 'Bespoke Planning', description: 'Personalized wedding planning service' },
      { icon: Camera, title: 'Professional Media', description: 'Award-winning photography and videography' },
      { icon: UtensilsCrossed, title: 'Fine Dining', description: 'World-class culinary experiences' },
      { icon: Music, title: 'Premium Entertainment', description: 'International DJs and live performers' },
      { icon: Sparkles, title: 'Luxury Design', description: 'Bespoke styling and floral artistry' },
      { icon: Package, title: 'Tailored Packages', description: 'Completely customizable experiences' },
    ],
    whyChoose: [
      { icon: Shield, title: '115+ Years Heritage', description: 'Over a century of luxury travel expertise' },
      { icon: Trophy, title: 'Industry Pioneer', description: 'Award-winning destination wedding specialists' },
      { icon: Heart, title: '12,300+ Weddings', description: 'Creating unforgettable celebrations worldwide' },
    ],
    testimonials: [
      {
        name: 'Amelia & Sebastian',
        location: 'London, UK',
        venue: 'Soneva Fushi, Maldives',
        rating: 5,
        text: 'Kuoni made our Maldives wedding beyond our wildest dreams. The level of service and attention to detail was exceptional. Truly a once-in-a-lifetime experience!',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
      },
      {
        name: 'Olivia & William',
        location: 'Surrey, UK',
        venue: 'Rayavadee Resort, Thailand',
        rating: 5,
        text: 'Every moment was perfect. From the initial planning to the big day, Kuoni\'s team delivered excellence at every turn. Our guests are still amazed!',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      },
    ]
  },

  'ba-holidays': {
    id: 'ba-holidays',
    name: 'British Airways Holidays Weddings',
    logo: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600',
    tagline: 'Premium Weddings with British Excellence',
    description: 'British Airways Holidays combines world-class service with stunning destinations to create unforgettable wedding experiences. Fly in style and celebrate in luxury.',
    longDescription: `British Airways Holidays brings together the best of British excellence and global luxury to create extraordinary destination weddings. With access to exclusive venues worldwide and the comfort of flying with one of the world's most prestigious airlines, your wedding journey begins the moment you step on board.

Our wedding specialists work closely with you to design celebrations that reflect your style and vision, whether you dream of a Mediterranean paradise, Caribbean beach, or cosmopolitan city wedding.`,
    established: '1970',
    headquarters: 'London, UK',
    totalVenues: 76,
    destinations: 22,
    weddingsHosted: 4100,
    rating: 4.7,
    totalReviews: 1567,
    verified: true,
    premium: true,
    accentColor: '#075AAA',
    contact: {
      phone: '+44 344 493 0758',
      email: 'weddings@ba.com',
      website: 'www.ba.com/holidays/weddings'
    },
    packages: [
      {
        name: 'Classic Elegance',
        price: '£16,500',
        description: 'Timeless elegance for intimate celebrations',
        includes: ['Premium venue', 'Ceremony setup', 'Floral arrangements', 'Photography', 'Reception dinner for 25 guests', 'Wedding coordinator']
      },
      {
        name: 'Luxury Celebration',
        price: '£38,000',
        description: 'Sophisticated luxury for your special day',
        includes: ['Luxury venue hire', 'Full event styling', 'Premium florals', 'Photography & videography', 'Dinner & cocktails for 70 guests', 'Entertainment', 'Personal planner']
      },
      {
        name: 'First Class Affair',
        price: '£85,000',
        description: 'The ultimate first-class wedding experience',
        includes: ['Exclusive venue', 'Premium event design', 'Luxury florals & decor', 'Full media coverage', 'Gourmet dining for 140 guests', 'Premium entertainment', 'VIP service throughout']
      }
    ],
    venues: [
      { id: 1, name: 'Amara Resort', location: 'Cyprus', region: 'Mediterranean', rating: 4.8, reviews: 298, capacity: 160, priceFrom: '£19,500', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', featured: true },
      { id: 2, name: 'Forte Village Resort', location: 'Sardinia, Italy', region: 'Mediterranean', rating: 4.9, reviews: 356, capacity: 200, priceFrom: '£24,000', image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800', featured: true },
      { id: 3, name: 'St. Regis Dubai', location: 'Dubai, UAE', region: 'Middle East', rating: 4.8, reviews: 412, capacity: 250, priceFrom: '£35,000', image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800', featured: true },
      { id: 4, name: 'The Ritz-Carlton Abama', location: 'Tenerife, Spain', region: 'Canary Islands', rating: 4.7, reviews: 234, capacity: 140, priceFrom: '£21,000', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', featured: false },
    ],
    services: [
      { icon: Hotel, title: 'Premium Venues', description: '76 carefully selected luxury venues' },
      { icon: Plane, title: 'BA Flights', description: 'Fly in comfort with British Airways' },
      { icon: Users, title: 'Wedding Team', description: 'Dedicated British Airways wedding specialists' },
      { icon: Camera, title: 'Photography', description: 'Professional wedding photography packages' },
      { icon: UtensilsCrossed, title: 'Cuisine', description: 'Exquisite dining experiences' },
      { icon: Music, title: 'Entertainment', description: 'Premium music and entertainment' },
      { icon: Sparkles, title: 'Event Design', description: 'Sophisticated styling and decor' },
      { icon: Package, title: 'Flight Packages', description: 'Combined wedding and travel packages' },
    ],
    whyChoose: [
      { icon: Shield, title: '50+ Years Trust', description: 'British excellence and reliability since 1970' },
      { icon: Trophy, title: 'Premium Service', description: 'Award-winning customer service' },
      { icon: Heart, title: '4,100+ Weddings', description: 'Creating memorable celebrations worldwide' },
    ],
    testimonials: [
      {
        name: 'Sophie & Richard',
        location: 'Leeds, UK',
        venue: 'Amara Resort, Cyprus',
        rating: 5,
        text: 'Flying BA and having our wedding at Amara was perfect. Everything was seamlessly organized and the service was impeccable.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
      },
    ]
  },

  'thomas-cook': {
    id: 'thomas-cook',
    name: 'Thomas Cook Weddings',
    logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400',
    coverImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600',
    tagline: 'Trusted Wedding Travel Since 1841',
    description: 'With nearly two centuries of travel expertise, Thomas Cook Weddings offers trusted service and beautiful destinations for your perfect day.',
    longDescription: `Thomas Cook has been synonymous with travel excellence since 1841. Our wedding division brings this rich heritage to creating beautiful destination weddings that couples remember forever.

Whether you're looking for Mediterranean sunshine, Caribbean beaches, or exotic Asian destinations, our experienced team provides personalized service and expert guidance throughout your wedding journey.`,
    established: '1841',
    headquarters: 'London, UK',
    totalVenues: 98,
    destinations: 28,
    weddingsHosted: 6800,
    rating: 4.6,
    totalReviews: 2123,
    verified: true,
    premium: true,
    accentColor: '#E30613',
    contact: {
      phone: '+44 333 003 0503',
      email: 'weddings@thomascook.com',
      website: 'www.thomascook.com/weddings'
    },
    packages: [
      {
        name: 'Romantic Getaway',
        price: '£12,000',
        description: 'Affordable luxury for intimate weddings',
        includes: ['Beach venue', 'Ceremony setup', 'Basic florals', 'Photography (3 hours)', 'Dinner for 15 guests', 'Coordinator']
      },
      {
        name: 'Premium Package',
        price: '£28,000',
        description: 'Comprehensive celebration package',
        includes: ['Premium resort', 'Full ceremony & reception', 'Floral design', 'Photography & video', 'Dinner for 60 guests', 'DJ', 'Wedding planner']
      },
      {
        name: 'Luxury Experience',
        price: '£62,000',
        description: 'Ultimate luxury wedding package',
        includes: ['Exclusive resort access', 'Full event design', 'Premium styling', 'Complete media package', 'Fine dining for 100 guests', 'Live entertainment', 'Concierge service']
      }
    ],
    venues: [
      { id: 1, name: 'Atlantica Dreams Resort', location: 'Rhodes, Greece', region: 'Mediterranean', rating: 4.7, reviews: 378, capacity: 180, priceFrom: '£15,000', image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', featured: true },
      { id: 2, name: 'Iberostar Grand', location: 'Jamaica', region: 'Caribbean', rating: 4.6, reviews: 289, capacity: 150, priceFrom: '£18,500', image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800', featured: true },
      { id: 3, name: 'Pestana Porto Santo', location: 'Madeira, Portugal', region: 'Atlantic', rating: 4.5, reviews: 234, capacity: 120, priceFrom: '£13,500', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', featured: true },
    ],
    services: [
      { icon: Hotel, title: 'Venue Selection', description: '98 venues across 28 destinations' },
      { icon: Plane, title: 'Travel Packages', description: 'Comprehensive flight and hotel packages' },
      { icon: Users, title: 'Planning Support', description: 'Experienced wedding planning team' },
      { icon: Camera, title: 'Photography', description: 'Professional wedding photography' },
      { icon: UtensilsCrossed, title: 'Catering', description: 'Quality dining experiences' },
      { icon: Music, title: 'Entertainment', description: 'Music and entertainment options' },
      { icon: Sparkles, title: 'Decor', description: 'Beautiful venue styling' },
      { icon: Package, title: 'Value Packages', description: 'Affordable all-inclusive options' },
    ],
    whyChoose: [
      { icon: Shield, title: '180+ Years Heritage', description: 'Nearly two centuries of travel expertise' },
      { icon: Trophy, title: 'Trusted Brand', description: 'One of the world\'s most recognized travel names' },
      { icon: Heart, title: '6,800+ Weddings', description: 'Thousands of happy couples' },
    ],
    testimonials: [
      {
        name: 'Laura & Mark',
        location: 'Manchester, UK',
        venue: 'Atlantica Dreams, Rhodes',
        rating: 5,
        text: 'Thomas Cook made our Greek wedding affordable and beautiful. Great value and wonderful service throughout.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
      },
    ]
  },
};

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Star, 
  MapPin, 
  Users, 
  Calendar, 
  Trophy, 
  Shield, 
  Globe, 
  Sparkles,
  ChevronRight,
  BadgeCheck,
  Award,
  TrendingUp,
  Heart,
  Building2,
  Plane
} from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Venue {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
}

interface WeddingProvider {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  established: string;
  totalVenues: number;
  destinations: number;
  weddingsHosted: number;
  rating: number;
  verified: boolean;
  premium: boolean;
  specialties: string[];
  priceRange: string;
  featuredVenues: Venue[];
  accentColor: string;
}

const providers: WeddingProvider[] = [
  {
    id: 'tui',
    name: 'TUI Weddings',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400',
    tagline: 'Europe\'s Leading Wedding Travel Provider',
    description: 'TUI brings over 50 years of travel expertise to create unforgettable destination weddings across the globe. From intimate beachfront ceremonies to grand palace celebrations, we curate exceptional experiences.',
    established: '1968',
    totalVenues: 156,
    destinations: 24,
    weddingsHosted: 8500,
    rating: 4.8,
    verified: true,
    premium: true,
    specialties: ['Beach Weddings', 'All-Inclusive Resorts', 'European Destinations', 'Luxury Packages'],
    priceRange: '£15,000 - £75,000',
    accentColor: '#E20074',
    featuredVenues: [
      { name: 'TUI BLUE Palace Resort', location: 'Crete, Greece', rating: 4.9, reviews: 342, image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800' },
      { name: 'TUI SENSATORI Barut Fethiye', location: 'Fethiye, Turkey', rating: 4.8, reviews: 289, image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800' },
      { name: 'Robinson Club Maldives', location: 'Maldives', rating: 5.0, reviews: 156, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800' },
    ]
  },
  {
    id: 'virgin',
    name: 'Virgin Holidays Weddings',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400',
    tagline: 'Exceptional Experiences, Unforgettable Moments',
    description: 'Virgin Holidays specializes in luxury destination weddings with a focus on Caribbean and USA locations. Our dedicated wedding team ensures every detail is perfectly executed for your special day.',
    established: '1985',
    totalVenues: 89,
    destinations: 18,
    weddingsHosted: 5200,
    rating: 4.7,
    verified: true,
    premium: true,
    specialties: ['Caribbean Weddings', 'USA Destinations', 'Luxury Villas', 'Personalized Service'],
    priceRange: '£18,000 - £95,000',
    accentColor: '#E10A0A',
    featuredVenues: [
      { name: 'The Ritz-Carlton, Grand Cayman', location: 'Grand Cayman', rating: 4.9, reviews: 428, image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800' },
      { name: 'Sandals Royal Barbados', location: 'Barbados', rating: 4.8, reviews: 367, image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800' },
      { name: 'One&Only Palmilla', location: 'Los Cabos, Mexico', rating: 5.0, reviews: 201, image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800' },
    ]
  },
  {
    id: 'kuoni',
    name: 'Kuoni Weddings',
    logo: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400',
    tagline: 'Crafting Dreams Since 1906',
    description: 'With over a century of travel excellence, Kuoni offers bespoke wedding experiences in the world\'s most romantic destinations. Our heritage and expertise ensure sophisticated celebrations.',
    established: '1906',
    totalVenues: 124,
    destinations: 32,
    weddingsHosted: 12300,
    rating: 4.9,
    verified: true,
    premium: true,
    specialties: ['Exotic Destinations', 'Bespoke Experiences', 'Luxury Resorts', 'Heritage Venues'],
    priceRange: '£20,000 - £120,000',
    accentColor: '#0066B3',
    featuredVenues: [
      { name: 'Four Seasons Resort Bora Bora', location: 'Bora Bora, French Polynesia', rating: 5.0, reviews: 512, image: 'https://images.unsplash.com/photo-1589197331516-0a8c9c2a4c80?w=800' },
      { name: 'Anantara Peace Haven', location: 'Tangalle, Sri Lanka', rating: 4.9, reviews: 298, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },
      { name: 'Belmond Hotel Caruso', location: 'Ravello, Italy', rating: 4.9, reviews: 387, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' },
    ]
  },
  {
    id: 'ba-holidays',
    name: 'British Airways Holidays Weddings',
    logo: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400',
    tagline: 'Premium Weddings with British Excellence',
    description: 'British Airways Holidays combines world-class service with stunning destinations to create unforgettable wedding experiences. Fly in style and celebrate in luxury.',
    established: '1970',
    totalVenues: 76,
    destinations: 22,
    weddingsHosted: 4100,
    rating: 4.7,
    verified: true,
    premium: true,
    specialties: ['Premium Service', 'Mediterranean', 'City Weddings', 'BA Flights'],
    priceRange: '£16,500 - £85,000',
    accentColor: '#075AAA',
    featuredVenues: [
      { name: 'Amara Resort', location: 'Cyprus', rating: 4.8, reviews: 298, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' },
      { name: 'Forte Village Resort', location: 'Sardinia, Italy', rating: 4.9, reviews: 356, image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800' },
      { name: 'St. Regis Dubai', location: 'Dubai, UAE', rating: 4.8, reviews: 412, image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800' },
    ]
  },
  {
    id: 'thomas-cook',
    name: 'Thomas Cook Weddings',
    logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400',
    tagline: 'Trusted Wedding Travel Since 1841',
    description: 'With nearly two centuries of travel expertise, Thomas Cook Weddings offers trusted service and beautiful destinations for your perfect day.',
    established: '1841',
    totalVenues: 98,
    destinations: 28,
    weddingsHosted: 6800,
    rating: 4.6,
    verified: true,
    premium: true,
    specialties: ['Value Packages', 'Mediterranean Weddings', 'Caribbean', 'Heritage Brand'],
    priceRange: '£12,000 - £62,000',
    accentColor: '#E30613',
    featuredVenues: [
      { name: 'Atlantica Dreams Resort', location: 'Rhodes, Greece', rating: 4.7, reviews: 378, image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800' },
      { name: 'Iberostar Grand', location: 'Jamaica', rating: 4.6, reviews: 289, image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800' },
      { name: 'Pestana Porto Santo', location: 'Madeira, Portugal', rating: 4.5, reviews: 234, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800' },
    ]
  },
];

interface WeddingProvidersPageProps {
  onViewProfile?: (providerId: string) => void;
}

export function WeddingProvidersPage({ onViewProfile }: WeddingProvidersPageProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const filteredProviders = providers
    .filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          provider.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || 
                           (filterType === 'premium' && provider.premium) ||
                           (filterType === 'verified' && provider.verified);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'venues') return b.totalVenues - a.totalVenues;
      if (sortBy === 'experience') return parseInt(a.established) - parseInt(b.established);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1519167758481-83f29da8c6a4?w=1600"
            alt="Luxury Wedding"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <motion.div {...fadeInUp}>
            <Badge className="bg-[#DF6951] text-white border-0 px-4 py-2 mb-6">
              Premium Wedding Providers
            </Badge>
            <h1 className="text-5xl md:text-7xl mb-6 text-white" style={{ fontFamily: 'Volkhov, serif' }}>
              Leading Wedding<br />Package Providers
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-8">
              Discover prestigious travel companies offering curated destination wedding packages with verified venues worldwide
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white">
                <Trophy className="w-5 h-5 text-[#F1A501]" />
                <span>543 Premium Venues</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Globe className="w-5 h-5 text-[#F1A501]" />
                <span>124 Global Destinations</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Heart className="w-5 h-5 text-[#F1A501]" />
                <span>36,900+ Weddings Hosted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search providers by name, location, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="premium">Premium Only</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="venues">Most Venues</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 bg-gradient-to-r from-[#DF6951]/5 to-[#F1A501]/5">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl mb-1 text-[#DF6951]" style={{ fontFamily: 'Volkhov, serif' }}>{filteredProviders.length}</div>
              <div className="text-sm text-muted-foreground">Premium Providers</div>
            </div>
            <div>
              <div className="text-3xl mb-1 text-[#DF6951]" style={{ fontFamily: 'Volkhov, serif' }}>
                {filteredProviders.reduce((acc, p) => acc + p.totalVenues, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Curated Venues</div>
            </div>
            <div>
              <div className="text-3xl mb-1 text-[#DF6951]" style={{ fontFamily: 'Volkhov, serif' }}>
                {filteredProviders.reduce((acc, p) => acc + p.destinations, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
            <div>
              <div className="text-3xl mb-1 text-[#DF6951]" style={{ fontFamily: 'Volkhov, serif' }}>4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="space-y-12">
            {filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="overflow-hidden bg-white hover:shadow-2xl transition-shadow border-gray-200">
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Provider Info - Left Column */}
                    <div className="md:col-span-2 p-8 bg-gradient-to-br from-gray-50 to-white border-r">
                      {/* Logo & Badges */}
                      <div className="mb-6">
                        <div className="relative w-24 h-24 mb-4">
                          <ImageWithFallback
                            src={provider.logo}
                            alt={provider.name}
                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                          />
                          {provider.premium && (
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-full flex items-center justify-center shadow-lg">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {provider.verified && (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              <BadgeCheck className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {provider.premium && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                              <Award className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Provider Details */}
                      <h2 className="text-3xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>{provider.name}</h2>
                      <p className="text-[#DF6951] mb-4">{provider.tagline}</p>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{provider.description}</p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="w-4 h-4 text-[#F1A501]" />
                            <span className="text-sm text-muted-foreground">Established</span>
                          </div>
                          <div className="text-lg">{provider.established}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-[#F1A501]" />
                            <span className="text-sm text-muted-foreground">Venues</span>
                          </div>
                          <div className="text-lg">{provider.totalVenues}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-4 h-4 text-[#F1A501]" />
                            <span className="text-sm text-muted-foreground">Destinations</span>
                          </div>
                          <div className="text-lg">{provider.destinations}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="w-4 h-4 text-[#F1A501]" />
                            <span className="text-sm text-muted-foreground">Weddings</span>
                          </div>
                          <div className="text-lg">{provider.weddingsHosted.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < Math.floor(provider.rating) ? 'text-[#F1A501] fill-[#F1A501]' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-2xl" style={{ fontFamily: 'Volkhov, serif' }}>{provider.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Based on verified customer reviews</p>
                      </div>

                      {/* Specialties */}
                      <div className="mb-6">
                        <h4 className="text-sm mb-3 text-muted-foreground">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {provider.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="mb-6 p-4 bg-[#F1A501]/10 rounded-xl border border-[#F1A501]/20">
                        <div className="text-sm text-muted-foreground mb-1">Starting Price Range</div>
                        <div className="text-xl text-[#DF6951]" style={{ fontFamily: 'Volkhov, serif' }}>{provider.priceRange}</div>
                      </div>

                      {/* CTA */}
                      {onViewProfile ? (
                        <Button 
                          className="w-full h-12 text-base" 
                          style={{ background: provider.accentColor }}
                          onClick={() => onViewProfile(provider.id)}
                        >
                          View Full Profile
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      ) : (
                        <Link href={`/providers/${provider.id}`}>
                          <Button 
                            className="w-full h-12 text-base" 
                            style={{ background: provider.accentColor }}
                          >
                            View Full Profile
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </div>

                    {/* Featured Venues - Right Column */}
                    <div className="md:col-span-3 p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl" style={{ fontFamily: 'Volkhov, serif' }}>Featured Venues</h3>
                        <Link href={`/providers/${provider.id}/venues`}>
                          <Button variant="ghost" className="text-[#DF6951]">
                            View All {provider.totalVenues} Venues
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        {provider.featuredVenues.map((venue, vIdx) => (
                          <Card key={vIdx} className="overflow-hidden group hover:shadow-xl transition-all border-gray-200">
                            <div className="relative h-48 overflow-hidden">
                              <ImageWithFallback
                                src={venue.image}
                                alt={venue.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-3 right-3">
                                <div className="bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                  <Star className="w-4 h-4 text-[#F1A501] fill-[#F1A501]" />
                                  <span className="text-sm">{venue.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="mb-2 line-clamp-1">{venue.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                <MapPin className="w-4 h-4" />
                                <span className="line-clamp-1">{venue.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Users className="w-3 h-3" />
                                <span>{venue.reviews} reviews</span>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>

                      {/* Why Choose Section */}
                      <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                        <h4 className="mb-4" style={{ fontFamily: 'Volkhov, serif' }}>Why Choose {provider.name}?</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Shield className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm mb-1">Trusted Provider</div>
                              <div className="text-xs text-muted-foreground">All venues vetted and verified</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Award className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm mb-1">Award-Winning</div>
                              <div className="text-xs text-muted-foreground">Industry-recognized excellence</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <TrendingUp className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-sm mb-1">Proven Track Record</div>
                              <div className="text-xs text-muted-foreground">{provider.weddingsHosted.toLocaleString()}+ successful weddings</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Plane className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <div className="text-sm mb-1">Full-Service Support</div>
                              <div className="text-xs text-muted-foreground">Travel, accommodation & planning</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#DF6951] to-[#F1A501] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl mb-6 text-white" style={{ fontFamily: 'Volkhov, serif' }}>
              Are You a Wedding Provider?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join Wedzway's premium provider network and showcase your venues to thousands of couples planning destination weddings worldwide
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#DF6951] hover:bg-white/90 h-14 px-8 text-base">
                Become a Provider Partner
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-base">
                Download Partner Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

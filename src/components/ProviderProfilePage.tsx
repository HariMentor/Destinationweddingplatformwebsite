'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  BadgeCheck,
  Award,
  Heart,
  Building2,
  Search,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { providersData } from './providersData';

interface ProviderProfilePageProps {
  providerId: string;
}

export function ProviderProfilePage({ providerId }: ProviderProfilePageProps) {
  // URL decode the provider ID in case it has special characters
  const decodedProviderId = decodeURIComponent(providerId);
  const provider = providersData[decodedProviderId];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Debug logging
  console.log('Looking for providerId:', decodedProviderId);
  console.log('Available providers:', Object.keys(providersData));
  console.log('Provider found:', provider ? 'Yes' : 'No');
  console.log('Provider data:', provider);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center p-8">
          <h1 className="text-4xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>Provider Not Found</h1>
          <p className="text-gray-600 mb-6 text-lg">
            The provider "{decodedProviderId}" doesn't exist in our database.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-700 mb-2">Available providers:</p>
            <p className="text-sm text-gray-500 font-mono">
              {Object.keys(providersData).join(', ')}
            </p>
          </div>
          <Link href="/providers">
            <Button className="bg-[#DF6951] hover:bg-[#DF6951]/90">Back to Providers</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter and sort venues
  const filteredVenues = provider.venues.filter((venue: any) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || venue.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const sortedVenues = [...filteredVenues].sort((a: any, b: any) => {
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    if (sortBy === 'price-low') return parseInt(a.priceFrom.replace(/[^0-9]/g, '')) - parseInt(b.priceFrom.replace(/[^0-9]/g, ''));
    if (sortBy === 'price-high') return parseInt(b.priceFrom.replace(/[^0-9]/g, '')) - parseInt(a.priceFrom.replace(/[^0-9]/g, ''));
    return 0;
  });

  const regions = Array.from(new Set(provider.venues.map((v: any) => v.region)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Cover Image */}
      <div className="relative h-[400px] overflow-hidden">
        <ImageWithFallback 
          src={provider.coverImage}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        
        {/* Provider Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              <div className="w-24 h-24 bg-white rounded-xl shadow-xl p-4 flex items-center justify-center">
                <ImageWithFallback 
                  src={provider.logo}
                  alt={provider.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-white">{provider.name}</h1>
                  {provider.verified && (
                    <Badge className="bg-blue-500 border-0">
                      <BadgeCheck className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {provider.premium && (
                    <Badge className="border-0" style={{ background: provider.accentColor }}>
                      <Award className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-white/90 mb-3">{provider.tagline}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{provider.rating} ({provider.totalReviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{provider.totalVenues} Venues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{provider.destinations} Destinations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{provider.weddingsHosted.toLocaleString()} Weddings</span>
                  </div>
                </div>
              </div>
              <div>
                <Link href={`/providers/${provider.id}/venues`}>
                  <Button size="lg" className="h-12 px-8" style={{ background: provider.accentColor }}>
                    View All Venues
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6">About {provider.name}</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5" style={{ color: provider.accentColor }} />
                    <div className="text-sm text-gray-600">Established</div>
                  </div>
                  <div className="text-2xl">{provider.established}</div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5" style={{ color: provider.accentColor }} />
                    <div className="text-sm text-gray-600">Headquarters</div>
                  </div>
                  <div className="text-2xl">{provider.headquarters}</div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5" style={{ color: provider.accentColor }} />
                    <div className="text-sm text-gray-600">Weddings Hosted</div>
                  </div>
                  <div className="text-2xl">{provider.weddingsHosted.toLocaleString()}+</div>
                </Card>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {provider.longDescription}
              </p>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="mb-6">Services & Specialties</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {provider.services.map((service: any, index: number) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-all">
                    <service.icon className="w-8 h-8 mb-4" style={{ color: provider.accentColor }} />
                    <h3 className="mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-6">Why Choose {provider.name}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {provider.whyChoose.map((reason: any, index: number) => (
                  <Card key={index} className="p-8 text-center hover:shadow-lg transition-all">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                         style={{ background: `${provider.accentColor}15` }}>
                      <reason.icon className="w-8 h-8" style={{ color: provider.accentColor }} />
                    </div>
                    <h3 className="mb-2">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-8" style={{ borderTop: `4px solid ${provider.accentColor}` }}>
                <h3 className="mb-6">Contact Information</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: provider.accentColor }} />
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Phone</div>
                      <a href={`tel:${provider.contact.phone}`} className="hover:underline">
                        {provider.contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" style={{ color: provider.accentColor }} />
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <a href={`mailto:${provider.contact.email}`} className="hover:underline">
                        {provider.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5" style={{ color: provider.accentColor }} />
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Website</div>
                      <a href={`https://${provider.contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {provider.contact.website}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Venues Tab */}
          <TabsContent value="venues" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search venues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Venues Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVenues.map((venue: any) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all group">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback 
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {venue.featured && (
                        <Badge className="absolute top-3 left-3 border-0" style={{ background: provider.accentColor }}>
                          Featured
                        </Badge>
                      )}
                      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {venue.rating}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2">{venue.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{venue.location}</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">{venue.reviews} reviews</span>
                        <span className="text-sm text-gray-600">
                          <Users className="w-4 h-4 inline mr-1" />
                          Up to {venue.capacity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">From</div>
                          <div className="text-xl" style={{ color: provider.accentColor }}>{venue.priceFrom}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {sortedVenues.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No venues found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-8">
              {provider.packages.map((pkg: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-8 hover:shadow-xl transition-all h-full flex flex-col">
                    <div className="text-center mb-6">
                      <h3 className="mb-2">{pkg.name}</h3>
                      <div className="text-4xl mb-3" style={{ color: provider.accentColor }}>{pkg.price}</div>
                      <p className="text-gray-600">{pkg.description}</p>
                    </div>
                    <div className="space-y-3 flex-1">
                      {pkg.includes.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" 
                               style={{ background: `${provider.accentColor}15` }}>
                            <div className="w-2 h-2 rounded-full" style={{ background: provider.accentColor }} />
                          </div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-6" style={{ background: provider.accentColor }}>
                      Enquire Now
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {provider.testimonials.map((testimonial: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <ImageWithFallback 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div>{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.location}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">{testimonial.text}</p>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {testimonial.venue}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

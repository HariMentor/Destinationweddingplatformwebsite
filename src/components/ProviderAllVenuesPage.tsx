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
  ChevronRight,
  ArrowLeft,
  Filter,
  SlidersHorizontal,
  Search,
  Heart,
  Share2,
  Hotel,
  Utensils,
  Wifi,
  CarFront,
  Waves,
  Mountain,
  Building2
} from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Slider } from './ui/slider';

interface ProviderAllVenuesPageProps {
  providerId: string;
}

export function ProviderAllVenuesPage({ providerId }: ProviderAllVenuesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [capacityRange, setCapacityRange] = useState([0, 500]);

  // Mock provider data - in production, fetch from database
  const provider = {
    id: 'tui',
    name: 'TUI Weddings',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400',
    accentColor: '#E20074',
    totalVenues: 156
  };

  // Mock venues data - in production, fetch from database
  const allVenues = [
    { id: 1, name: 'TUI BLUE Palace Resort', location: 'Crete, Greece', region: 'Mediterranean', style: 'Beach Resort', rating: 4.9, reviews: 342, capacity: 200, priceFrom: 18000, image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800', amenities: ['Beachfront', 'Pool', 'Spa', 'Restaurant'] },
    { id: 2, name: 'TUI SENSATORI Barut Fethiye', location: 'Fethiye, Turkey', region: 'Mediterranean', style: 'Luxury Resort', rating: 4.8, reviews: 289, capacity: 150, priceFrom: 16000, image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800', amenities: ['All-Inclusive', 'Spa', 'Beach', 'Fine Dining'] },
    { id: 3, name: 'Robinson Club Maldives', location: 'Maldives', region: 'Indian Ocean', style: 'Overwater Resort', rating: 5.0, reviews: 156, capacity: 80, priceFrom: 45000, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', amenities: ['Private Villas', 'Overwater', 'Diving', 'Spa'] },
    { id: 4, name: 'TUI BLUE Adriatic', location: 'Dubrovnik, Croatia', region: 'Mediterranean', style: 'Coastal Hotel', rating: 4.7, reviews: 234, capacity: 120, priceFrom: 14000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', amenities: ['Historic City', 'Sea View', 'Rooftop', 'Restaurant'] },
    { id: 5, name: 'Sensimar Royal Palm', location: 'Fuerteventura, Spain', region: 'Canary Islands', style: 'Beach Resort', rating: 4.8, reviews: 298, capacity: 100, priceFrom: 13500, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', amenities: ['Adults Only', 'Beach', 'Spa', 'Golf'] },
    { id: 6, name: 'TUI MAGIC LIFE Waterworld', location: 'Belek, Turkey', region: 'Mediterranean', style: 'Family Resort', rating: 4.6, reviews: 445, capacity: 180, priceFrom: 15500, image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', amenities: ['Water Park', 'Kids Club', 'Beach', 'All-Inclusive'] },
    { id: 7, name: 'TUI BLUE Schladming', location: 'Austrian Alps, Austria', region: 'Alps', style: 'Mountain Resort', rating: 4.7, reviews: 189, capacity: 90, priceFrom: 19000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', amenities: ['Mountain Views', 'Skiing', 'Spa', 'Fine Dining'] },
    { id: 8, name: 'Riu Palace Aruba', location: 'Palm Beach, Aruba', region: 'Caribbean', style: 'Beach Resort', rating: 4.9, reviews: 378, capacity: 250, priceFrom: 22000, image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800', amenities: ['Beachfront', 'Casino', 'Pool', 'All-Inclusive'] },
    { id: 9, name: 'TUI SENSIMAR Atlantica Dreams', location: 'Rhodes, Greece', region: 'Mediterranean', style: 'Adults Only Resort', rating: 4.8, reviews: 267, capacity: 110, priceFrom: 17000, image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800', amenities: ['Adults Only', 'Infinity Pool', 'Beach', 'Spa'] },
    { id: 10, name: 'Robinson Club Jandia Playa', location: 'Fuerteventura, Spain', region: 'Canary Islands', style: 'Beach Resort', rating: 4.7, reviews: 312, capacity: 160, priceFrom: 14500, image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800', amenities: ['Beach', 'Sports', 'Kids Club', 'Spa'] },
    { id: 11, name: 'TUI BLUE Palazzo del Mare', location: 'Zakynthos, Greece', region: 'Mediterranean', style: 'Luxury Hotel', rating: 4.9, reviews: 201, capacity: 140, priceFrom: 20000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', amenities: ['Clifftop', 'Infinity Pool', 'Gourmet', 'Spa'] },
    { id: 12, name: 'Sensatori Resort Ibiza', location: 'Ibiza, Spain', region: 'Mediterranean', style: 'Beach Resort', rating: 4.8, reviews: 289, capacity: 170, priceFrom: 21000, image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', amenities: ['Beach Club', 'Spa', 'Fine Dining', 'Pool'] },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  // Filter and sort venues
  const filteredVenues = allVenues
    .filter(venue => {
      const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          venue.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || venue.region === selectedRegion;
      const matchesStyle = selectedStyle === 'all' || venue.style === selectedStyle;
      const matchesPrice = venue.priceFrom >= priceRange[0] && venue.priceFrom <= priceRange[1];
      const matchesCapacity = venue.capacity >= capacityRange[0] && venue.capacity <= capacityRange[1];
      return matchesSearch && matchesRegion && matchesStyle && matchesPrice && matchesCapacity;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.priceFrom - b.priceFrom;
      if (sortBy === 'price-high') return b.priceFrom - a.priceFrom;
      if (sortBy === 'capacity') return b.capacity - a.capacity;
      return 0;
    });

  const regions = ['all', ...Array.from(new Set(allVenues.map(v => v.region)))];
  const styles = ['all', ...Array.from(new Set(allVenues.map(v => v.style)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <section className="py-12 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <Link href="/providers">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Providers
              </Button>
            </Link>
            <Link href={`/providers/${providerId}`}>
              <Button variant="outline">View Provider Profile</Button>
            </Link>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <ImageWithFallback
              src={provider.logo}
              alt={provider.name}
              className="w-20 h-20 object-cover rounded-xl shadow-lg"
            />
            <div>
              <h1 className="text-4xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                {provider.name} Venues
              </h1>
              <p className="text-muted-foreground">
                Explore all {provider.totalVenues} premium wedding venues
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by venue name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block">
              <Card className="p-6 bg-white sticky top-48">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl" style={{ fontFamily: 'Volkhov, serif' }}>Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedRegion('all');
                      setSelectedStyle('all');
                      setPriceRange([0, 100000]);
                      setCapacityRange([0, 500]);
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Region Filter */}
                  <div>
                    <label className="text-sm mb-2 block">Region</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Regions" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>
                            {region === 'all' ? 'All Regions' : region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Style Filter */}
                  <div>
                    <label className="text-sm mb-2 block">Venue Style</label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Styles" />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map(style => (
                          <SelectItem key={style} value={style}>
                            {style === 'all' ? 'All Styles' : style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm mb-3 block">
                      Price Range: £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={100000}
                      step={1000}
                      className="mb-2"
                    />
                  </div>

                  {/* Capacity Range */}
                  <div>
                    <label className="text-sm mb-3 block">
                      Guest Capacity: {capacityRange[0]} - {capacityRange[1]}
                    </label>
                    <Slider
                      value={capacityRange}
                      onValueChange={setCapacityRange}
                      min={0}
                      max={500}
                      step={10}
                      className="mb-2"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters & Sort
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Same filters as desktop */}
                    <div>
                      <label className="text-sm mb-2 block">Region</label>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Regions" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map(region => (
                            <SelectItem key={region} value={region}>
                              {region === 'all' ? 'All Regions' : region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">Venue Style</label>
                      <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Styles" />
                        </SelectTrigger>
                        <SelectContent>
                          {styles.map(style => (
                            <SelectItem key={style} value={style}>
                              {style === 'all' ? 'All Styles' : style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm mb-3 block">
                        Price Range: £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={100000}
                        step={1000}
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-3 block">
                        Capacity: {capacityRange[0]} - {capacityRange[1]}
                      </label>
                      <Slider
                        value={capacityRange}
                        onValueChange={setCapacityRange}
                        min={0}
                        max={500}
                        step={10}
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Venues Grid */}
            <div className="lg:col-span-3">
              {/* Sort & Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredVenues.length} {filteredVenues.length === 1 ? 'venue' : 'venues'} found
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="capacity">Largest Capacity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Venues Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVenues.map((venue, idx) => (
                  <motion.div
                    key={venue.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-2xl transition-all border-gray-200 h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <ImageWithFallback
                          src={venue.image}
                          alt={venue.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button size="icon" variant="secondary" className="h-9 w-9 bg-white/90 hover:bg-white shadow-lg">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="secondary" className="h-9 w-9 bg-white/90 hover:bg-white shadow-lg">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <div className="bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                            <Star className="w-4 h-4 text-[#F1A501] fill-[#F1A501]" />
                            <span className="text-sm">{venue.rating}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge className="bg-white/95 text-gray-900 border-0">
                            {venue.style}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg mb-2 line-clamp-1" style={{ fontFamily: 'Volkhov, serif' }}>
                          {venue.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm line-clamp-1">{venue.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Users className="w-4 h-4" />
                          <span>Up to {venue.capacity} guests</span>
                          <span className="ml-auto">{venue.reviews} reviews</span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {venue.amenities.slice(0, 3).map((amenity, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {venue.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{venue.amenities.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">From</div>
                            <div className="text-xl text-[#DF6951]" style={{ fontFamily: 'Volkhov, serif' }}>
                              £{venue.priceFrom.toLocaleString()}
                            </div>
                          </div>
                          <Link href={`/venues/${venue.id}`}>
                            <Button size="sm">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* No Results */}
              {filteredVenues.length === 0 && (
                <div className="text-center py-16">
                  <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                    No venues found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('all');
                      setSelectedStyle('all');
                      setPriceRange([0, 100000]);
                      setCapacityRange([0, 500]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-4xl mb-4 text-white" style={{ fontFamily: 'Volkhov, serif' }}>
            Need Help Choosing?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Speak with a {provider.name} wedding specialist to find your perfect venue
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#DF6951] hover:bg-white/90 h-12 px-8">
              Contact Specialist
            </Button>
            <Link href={`/providers/${providerId}`}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-12 px-8">
                View Provider Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

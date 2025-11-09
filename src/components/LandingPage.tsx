import { useState } from "react";
import { ArrowRight, MapPin, Calendar, Users, Star, Check, Heart, Camera, Palette, Music, Search, Phone, Mail, ChevronDown, Play, Globe, Award, Shield, Clock, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface LandingPageProps {
  onNavigate: (page: 'venues' | 'destinations' | 'inspirations' | 'planners' | 'vendors' | 'tours' | 'visa-services' | 'builder' | 'marketplace') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'destination' | 'venue' | 'budget'>('destination');

  const popularDestinations = [
    {
      id: 1,
      name: "Santorini",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1664688023019-d4ab2703a7cb?w=800",
      venues: 45,
      priceRange: "₹20L - ₹50L",
    },
    {
      id: 2,
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1617424968251-8a347e71b3e9?w=800",
      venues: 52,
      priceRange: "₹15L - ₹35L",
    },
    {
      id: 3,
      name: "Udaipur",
      country: "India",
      image: "https://images.unsplash.com/photo-1640672246932-2f21e569d797?w=800",
      venues: 38,
      priceRange: "₹25L - ₹60L",
    },
    {
      id: 4,
      name: "Phuket",
      country: "Thailand",
      image: "https://images.unsplash.com/photo-1625486120534-a45ddbf213d5?w=800",
      venues: 41,
      priceRange: "₹18L - ₹40L",
    },
  ];

  const topDestinations = [
    {
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1664688023019-d4ab2703a7cb?w=400",
      type: "Beach & Heritage",
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1617424968251-8a347e71b3e9?w=400",
      type: "Tropical Paradise",
    },
    {
      name: "Udaipur, India",
      image: "https://images.unsplash.com/photo-1640672246932-2f21e569d797?w=400",
      type: "Royal Palace",
    },
    {
      name: "Tuscany, Italy",
      image: "https://images.unsplash.com/photo-1625486120534-a45ddbf213d5?w=400",
      type: "Vineyard Romance",
    },
    {
      name: "Maldives",
      image: "https://images.unsplash.com/photo-1759665996004-ff4c8f0745be?w=400",
      type: "Overwater Bliss",
    },
    {
      name: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1744805624954-a6686543c3ff?w=400",
      type: "Luxury Modern",
    },
    {
      name: "Goa, India",
      image: "https://images.unsplash.com/photo-1741269945082-b499145a916f?w=400",
      type: "Beach Vibes",
    },
    {
      name: "Jaipur, India",
      image: "https://images.unsplash.com/photo-1664530140722-7e3bdbf2b870?w=400",
      type: "Heritage Charm",
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Verified Vendors",
      description: "All vendors are carefully vetted and verified for quality assurance",
    },
    {
      icon: Globe,
      title: "Global Destinations",
      description: "Access to 50+ stunning wedding destinations worldwide",
    },
    {
      icon: Shield,
      title: "Secure Bookings",
      description: "Safe and secure payment processing with full refund protection",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 dedicated wedding planning support throughout your journey",
    },
  ];

  const testimonials = [
    {
      name: "Priya & Arjun",
      location: "Udaipur Wedding",
      text: "Wedzway made our palace wedding absolutely magical! The team was incredible and everything was perfect.",
      image: "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?w=400",
      rating: 5,
    },
    {
      name: "Sarah & Michael",
      location: "Santorini Wedding",
      text: "We couldn't have asked for a better experience. From planning to execution, everything was seamless!",
      image: "https://images.unsplash.com/photo-1759716550717-2616343c8d67?w=400",
      rating: 5,
    },
    {
      name: "Ananya & Karan",
      location: "Bali Wedding",
      text: "The vendors were exceptional and the destination was breathtaking. Highly recommend Wedzway!",
      image: "https://images.unsplash.com/photo-1721357566635-0ffd8fc602ad?w=400",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How far in advance should I book my destination wedding?",
      answer: "We recommend booking 12-18 months in advance to secure your preferred venue and vendors.",
    },
    {
      question: "What is included in your wedding planning packages?",
      answer: "Our packages include venue selection, vendor coordination, travel arrangements, and on-site support.",
    },
    {
      question: "Do you handle visa and travel documentation?",
      answer: "Yes, we provide complete assistance with visa applications and all travel documentation for your guests.",
    },
    {
      question: "Can I customize my wedding package?",
      answer: "Absolutely! All our packages are fully customizable to match your unique vision and budget.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1519167758481-83f29da8813d?w=1920"
            alt="Wedding destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                Plan Your Dream Destination Wedding Seamlessly
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-12">
                Discover amazing venues at exclusive deals
              </p>
              
              {/* Search Bar */}
              <Card className="p-4 md:p-6 shadow-2xl border-0 rounded-full max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* Location */}
                  <div className="flex-1 w-full md:w-auto">
                    <div className="text-left">
                      <label className="text-sm text-gray-900 mb-1 block">
                        Location
                      </label>
                      <Input 
                        placeholder="Where are you going?" 
                        className="border-0 focus-visible:ring-0 h-10 px-0 text-gray-600"
                      />
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                  
                  {/* Guest Requirements */}
                  <div className="flex-1 w-full md:w-auto">
                    <div className="text-left">
                      <label className="text-sm text-gray-900 mb-1 block">
                        Guest Requirements
                      </label>
                      <Input 
                        placeholder="2 Days - 50 Total Pas" 
                        className="border-0 focus-visible:ring-0 h-10 px-0 text-gray-600"
                      />
                    </div>
                  </div>
                  
                  {/* Search Button */}
                  <Button
                    className="bg-[#DF6951] hover:bg-[#DF6951]/90 text-white px-8 h-12 rounded-full whitespace-nowrap w-full md:w-auto"
                    onClick={() => onNavigate('venues')}
                  >
                    Find Your Destination Venue
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="size-8 text-white/60" />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-12 text-gray-900">
              Popular Destinations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {popularDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl"
                    onClick={() => onNavigate('destinations')}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl mb-1">{destination.name}</h3>
                        <p className="text-sm text-white/90 mb-2">{destination.country}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span>{destination.venues} Venues</span>
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            {destination.priceRange}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { value: "10", label: "Years of", sublabel: "Experience" },
              { value: "2K+", label: "Trusted", sublabel: "Vendors" },
              { value: "10K+", label: "Happy", sublabel: "Couples" },
              { value: "4.8", label: "Overall", sublabel: "Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl text-[#FF7757] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
                <div className="text-sm md:text-base text-gray-900">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-4 py-2 bg-orange-100 text-[#FF7757] border-0 text-base">
              EXPLORE NOW
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
              Find Your Dream Destination
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Finding The Perfect Travel Right Is Like Discovering A Hidden Treasure
            </p>
          </motion.div>

          {/* Search Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <Button
                variant={selectedCategory === 'destination' ? 'default' : 'outline'}
                className={selectedCategory === 'destination' ? 'bg-[#FF7757] hover:bg-[#FF6347]' : ''}
                onClick={() => setSelectedCategory('destination')}
              >
                <MapPin className="size-4 mr-2" />
                Destination
              </Button>
              <Button
                variant={selectedCategory === 'venue' ? 'default' : 'outline'}
                className={selectedCategory === 'venue' ? 'bg-[#FF7757] hover:bg-[#FF6347]' : ''}
                onClick={() => setSelectedCategory('venue')}
              >
                <Calendar className="size-4 mr-2" />
                Venue Type
              </Button>
              <Button
                variant={selectedCategory === 'budget' ? 'default' : 'outline'}
                className={selectedCategory === 'budget' ? 'bg-[#FF7757] hover:bg-[#FF6347]' : ''}
                onClick={() => setSelectedCategory('budget')}
              >
                <Users className="size-4 mr-2" />
                Budget Range
              </Button>
            </div>

            <Card className="p-6 md:p-8 shadow-xl border-0 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Location</label>
                  <Input placeholder="Where to?" className="h-12" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Guest Count</label>
                  <Input placeholder="How many guests?" className="h-12" type="number" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Budget</label>
                  <Input placeholder="Your budget" className="h-12" />
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-[#FF7757] hover:bg-[#FF6347] h-12 text-base"
                onClick={() => onNavigate('destinations')}
              >
                <Search className="size-5 mr-2" />
                Search Destinations
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Destinations Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {topDestinations.map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all rounded-2xl"
                  onClick={() => onNavigate('destinations')}
                >
                  <div className="relative aspect-[3/4]">
                    <ImageWithFallback
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                      <h4 className="text-sm md:text-base mb-1">{dest.name}</h4>
                      <p className="text-xs text-white/80">{dest.type}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
              Why Should You Choose Us
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best experience with verified vendors and global destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 md:p-8 text-center border-0 shadow-md hover:shadow-xl transition-all rounded-2xl h-full">
                    <div className="size-16 md:size-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#FF7757] to-[#FF9E7D] p-4 shadow-lg flex items-center justify-center">
                      <Icon className="size-full text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl mb-3">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Feature Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl rounded-3xl">
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759716550717-2616343c8d67?w=600"
                    alt="Happy couple"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl md:text-3xl mb-2">Destination</h3>
                    <p className="text-lg">Expert Planning</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl rounded-3xl">
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1651634038091-dcec00a2f94f?w=600"
                    alt="Wedding planning"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl md:text-3xl mb-2">Real History</h3>
                    <p className="text-lg">From Beloved Clients</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tours & Experiences */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <Badge className="mb-4 px-4 py-2 bg-orange-100 text-[#FF7757] border-0 text-base">
              EXPLORE EXPERIENCES
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
              Unforgettable Tours & Activities
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Make your destination wedding even more special with romantic experiences and exciting adventures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[
              {
                image: "https://images.unsplash.com/photo-1594244094968-cd4fe22fcd25?w=800",
                title: "Sunset Cruises",
                description: "Private romantic boat tours with champagne",
                price: "From ₹12,500",
              },
              {
                image: "https://images.unsplash.com/photo-1687877954846-00876ced28bf?w=800",
                title: "Wine Tasting",
                description: "Explore local vineyards and wineries",
                price: "From ₹8,500",
              },
              {
                image: "https://images.unsplash.com/photo-1507691640734-887fa7be3377?w=800",
                title: "Hot Air Balloons",
                description: "Breathtaking sunrise flight experiences",
                price: "From ₹18,500",
              },
            ].map((tour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl"
                  onClick={() => onNavigate('tours')}
                >
                  <div className="relative aspect-[4/3]">
                    <ImageWithFallback
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-xl md:text-2xl mb-2">{tour.title}</h3>
                      <p className="text-sm text-white/90 mb-3">{tour.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{tour.price}</span>
                        <Button 
                          size="sm" 
                          className="bg-white text-gray-900 hover:bg-white/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('tours');
                          }}
                        >
                          View Tours
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => onNavigate('tours')}
              className="bg-gradient-to-r from-[#FF7757] to-[#FF9E7D] hover:shadow-lg transition-all"
            >
              Explore All Tours & Experiences
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
              Real Wedding Stories From Our Beloved Clients
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from couples who made their dreams come true with Wedzway
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8 border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 md:size-5 fill-[#FF7757] text-[#FF7757]" />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-gray-700 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="size-12 md:size-14 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">{testimonial.name}</p>
                      <p className="text-xs md:text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about planning your destination wedding
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-base md:text-lg pr-8">{faq.question}</span>
                    <ChevronDown
                      className={`size-5 text-gray-500 flex-shrink-0 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-sm md:text-base text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1661668724998-fd8c24e1cd1a?w=1920"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="max-w-lg">
                <Badge className="mb-4 px-4 py-2 bg-[#FF7757] text-white border-0">
                  START TODAY
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
                  Best Way To Start Your Journey!!!
                </h2>
                <p className="text-base md:text-lg text-white/80 mb-8">
                  Begin planning your dream destination wedding today. Our experts are ready to guide you through every step of your special journey.
                </p>
                <Button
                  size="lg"
                  className="bg-[#FF7757] hover:bg-[#FF6347] text-white px-8 py-6 text-lg rounded-full shadow-xl"
                  onClick={() => onNavigate('builder')}
                >
                  Plan Your Wedding
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="relative aspect-[4/3] max-w-lg mx-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1721357566635-0ffd8fc602ad?w=800"
                  alt="Happy couple celebrating"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-[#FF7757] flex items-center justify-center">
                      <Heart className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl">10K+</p>
                      <p className="text-sm text-gray-600">Happy Couples</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
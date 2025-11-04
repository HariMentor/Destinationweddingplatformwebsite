'use client';

import React from 'react';
import { Button } from './ui/button';
import { Download, Mail, Globe, ArrowLeft, ArrowRight, CheckCircle2, Users, MapPin, TrendingUp, Award, DollarSign, Target, Heart, Sparkles, Star, Calendar, Camera, Music, Play, BadgeCheck, Shield, Zap, BarChart3, Megaphone, TrendingDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface VenueBrochurePageProps {
  onBack?: () => void;
}

export function VenueBrochurePage({ onBack }: VenueBrochurePageProps) {
  const handlePrint = () => {
    window.print();
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Animated Decorative Blur Circles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-rose-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Action Buttons - Hidden when printing */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        {onBack && (
          <Button onClick={onBack} variant="outline" size="sm" className="bg-white/90 backdrop-blur border-gray-200 hover:bg-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Button onClick={handlePrint} className="bg-[#DF6951] hover:bg-[#DF6951]/90 text-white">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Hero Slide */}
      <section className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div className="space-y-8" {...fadeInUp}>
              <div className="inline-block">
                <Badge className="bg-[#DF6951]/10 text-[#DF6951] hover:bg-[#DF6951]/20 border-[#DF6951]/20 px-4 py-2 uppercase tracking-wide">
                  Partnership Opportunity
                </Badge>
              </div>
              
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
                  Partner with <span className="text-[#DF6951]">Wedzway</span>
                </h1>
                <div className="relative inline-block mb-6">
                  <p className="text-2xl md:text-3xl text-gray-700">
                    The Global Destination Wedding Platform
                  </p>
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 385 12" fill="none">
                    <path d="M1 6C50 1 100 1 150 6C200 11 250 11 300 6C325 3.5 350 3.5 385 6" stroke="#DF6951" strokeWidth="3" fill="none"/>
                  </svg>
                </div>
              </div>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                We are a global destination wedding platform designed to simplify the complex process of planning an international destination wedding for affluent couples. We connect couples directly with exceptional wedding venues and a network of trusted, verified service providers worldwide.
              </p>

              {/* Commented out buttons section
              <div className="flex items-center gap-6 flex-wrap">
                <Button size="lg" className="bg-[#F1A501] hover:bg-[#F1A501]/90 text-white px-8">
                  Become a Partner
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <button className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#DF6951] rounded-full blur-xl opacity-30" />
                    <div className="relative bg-[#DF6951] rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                  <span className="text-muted-foreground">Watch Demo</span>
                </button>
              </div>
              */}
            </motion.div>

            {/* Right Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760669348731-232850e624d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0aW5hdGlvbiUyMHdlZGRpbmclMjBiZWFjaCUyMGx1eHVyeXxlbnwxfHx8fDE3NjIwMzA3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Destination Wedding"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-purple-300/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-orange-300/30 to-transparent rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" {...fadeInUp}>
            {[
              { icon: MapPin, value: '10+', label: 'Target Markets', color: 'from-rose-500 to-pink-500' },
              { icon: Users, value: '35%', label: 'India Market Share', color: 'from-amber-500 to-orange-500' },
              { icon: Award, value: '50-300', label: 'Avg Wedding Size', color: 'from-purple-500 to-indigo-500' },
              { icon: TrendingUp, value: 'Growing', label: 'Partner Network', color: 'from-teal-500 to-cyan-500' },
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-white/80 backdrop-blur border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* The Problem Slide */}
      <section className="py-24 relative z-10 bg-white/50 backdrop-blur">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="bg-[#DF6951]/10 text-[#DF6951] hover:bg-[#DF6951]/20 border-[#DF6951]/20 px-4 py-2 mb-6">
              The Challenge
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
              The Destination Wedding <span className="text-[#DF6951]">Visibility Gap</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Traditional venue marketing struggles to reach international couples planning destination weddings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingDown,
                title: 'Limited International Reach',
                description: 'Local marketing channels fail to connect with couples abroad seeking destination venues',
                stat: '70%',
                statLabel: 'venues struggle with global visibility'
              },
              {
                icon: DollarSign,
                title: 'High Acquisition Costs',
                description: 'Expensive international advertising with uncertain ROI and unqualified leads',
                stat: '$5K+',
                statLabel: 'average cost per qualified lead'
              },
              {
                icon: Users,
                title: 'Missed Opportunities',
                description: 'Unable to tap into the growing $50B+ destination wedding market effectively',
                stat: '85%',
                statLabel: 'of couples search online first'
              },
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="p-8 h-full bg-white border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                    <problem.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution Slide */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="bg-[#F1A501]/10 text-[#F1A501] hover:bg-[#F1A501]/20 border-[#F1A501]/20 px-4 py-2 mb-6">
              The Wedzway Solution
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
              Your <span className="text-[#F1A501]">Global Gateway</span> to Destination Weddings
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We connect couples directly with verified service providers including venues and wedding planners. Our mission is to ensure seamless, unforgettable destination wedding experiences by consolidating the world's finest resources onto one reliable platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Award,
                title: 'Premium Wedding Venues',
                description: 'Join our curated network of exceptional venues across the globe',
                features: ['Verified quality standards', 'Premium listing placement', 'Professional photography'],
                image: 'https://images.unsplash.com/photo-1759490821541-f78bb13a752d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBzZXR1cHxlbnwxfHx8fDE3NjIwMjk3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                icon: Users,
                title: 'Professional Planners',
                description: 'Connected with expert wedding planners who bring couples to your venue',
                features: ['Trusted planner network', 'Collaborative bookings', 'Seamless coordination'],
                image: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaGFwcHl8ZW58MXx8fHwxNzYyMDEzNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                icon: Camera,
                title: 'Elite Service Providers',
                description: 'Access to photographers, stylists, decorators, and florists for complete wedding services',
                features: ['Vetted professionals', 'Quality assurance', 'One-stop solution'],
                image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyfGVufDF8fHx8MTc2MjAyNDUzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                icon: MapPin,
                title: 'Travel & Tourism Partners',
                description: 'Specialized travel, accommodation partners, and tourism experience providers',
                features: ['Guest accommodation', 'Travel coordination', 'Local experiences'],
                image: 'https://images.unsplash.com/photo-1759978200438-38971e248641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBuZXR3b3JrJTIwd29ybGR8ZW58MXx8fHwxNzYxOTM3NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Card className="p-8 h-full bg-white border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#F1A501]/10 rounded-2xl flex items-center justify-center mb-6">
                    <solution.icon className="w-8 h-8 text-[#F1A501]" />
                  </div>
                  <h3 className="text-xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>{solution.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Showcase */}
      <section className="py-24 relative z-10 bg-white/50 backdrop-blur">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="bg-[#DF6951]/10 text-[#DF6951] hover:bg-[#DF6951]/20 border-[#DF6951]/20 px-4 py-2 mb-6">
              Global Reach
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
              Top <span className="text-[#DF6951]">Wedding Destinations</span> We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join our curated network of premium venues in the world's most sought-after locations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Udaipur', country: 'India', share: '35%', image: 'https://images.unsplash.com/photo-1674229010920-ad8493dc19eb?w=400' },
              { name: 'Santorini', country: 'Greece', share: '15%', image: 'https://images.unsplash.com/photo-1720535594377-1a8a890b0718?w=400' },
              { name: 'Tuscany', country: 'Italy', share: '12%', image: 'https://images.unsplash.com/photo-1698616596895-71e43af05b70?w=400' },
              { name: 'Bali', country: 'Indonesia', share: '10%', image: 'https://images.unsplash.com/photo-1729606559758-15542fc58607?w=400' },
              { name: 'Dubai', country: 'UAE', share: '8%', image: 'https://images.unsplash.com/photo-1600587193650-6a6615b3e95c?w=400' },
              { name: 'Maldives', country: 'Maldives', share: '8%', image: 'https://images.unsplash.com/photo-1697898109604-e06e88b15271?w=400' },
              { name: 'Goa', country: 'India', share: '7%', image: 'https://images.unsplash.com/photo-1755795652039-c95221cc55fa?w=400' },
              { name: 'French Riviera', country: 'France', share: '5%', image: 'https://images.unsplash.com/photo-1756302380078-9d274dad5793?w=400' },
            ].map((dest, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-2xl aspect-square cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-lg mb-1" style={{ fontFamily: 'Volkhov, serif' }}>{dest.name}</div>
                  <div className="text-xs text-white/80 mb-2">{dest.country}</div>
                  <Badge className="bg-[#F1A501] text-white hover:bg-[#F1A501]/90 border-0 text-xs">
                    {dest.share} Market Share
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="bg-[#F1A501]/10 text-[#F1A501] hover:bg-[#F1A501]/20 border-[#F1A501]/20 px-4 py-2 mb-6">
              Why Partner With Wedzway
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
              <span className="text-[#F1A501]">Significant Advantages</span> for Partner Venues
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Collaborating with Wedzway as a verified venue partner offers exclusive benefits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Globe,
                title: 'Targeted Global Access',
                description: 'Showcase your venue to a worldwide audience of qualified, high-spending couples actively searching for destination wedding locations',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: BadgeCheck,
                title: 'Verified Partner Credibility',
                description: 'Elevate your brand with our trusted verification badge, reinforcing your quality and standing in the luxury market',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: DollarSign,
                title: 'Zero Upfront Cost',
                description: 'Our commission-based model ensures you only pay when we deliver a confirmed booking',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: Megaphone,
                title: 'Extensive Marketing Reach',
                description: 'Leverage our targeted digital marketing campaigns and unique partnerships with local Tourism Boards for additional promotion',
                gradient: 'from-rose-500 to-pink-500'
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-8 h-full bg-white border-gray-200 hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-3" style={{ fontFamily: 'Volkhov, serif' }}>{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Service Section */}
      <section className="py-24 relative z-10 bg-white/50 backdrop-blur">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="bg-[#DF6951]/10 text-[#DF6951] hover:bg-[#DF6951]/20 border-[#DF6951]/20 px-4 py-2 mb-6">
              Customer Acquisition Engine
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
              Wedzway <span className="text-[#DF6951]\">Concierge Service</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our premium concierge service actively drives qualified, high-value customers to your venue through personalized matchmaking and dedicated planning support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left: Overview */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-gradient-to-br from-[#DF6951]/5 to-[#F1A501]/5 border-[#DF6951]/20 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>Premium Matchmaking Service</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our dedicated concierge team provides white-glove wedding planning services to affluent couples, guiding them through every step of their destination wedding journey. We personally match couples with the perfect venue based on their specific requirements, budget, and vision.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-[#F1A501] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Personalized venue recommendations based on couple's preferences</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-[#F1A501] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Site visit coordination with pre-qualified couples</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-[#F1A501] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">In-person negotiation support to close bookings</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right: Three Tiers */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-white border-gray-200 h-full">
                <h3 className="text-2xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>Three Membership Tiers</h3>
                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">Starter</span>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">Entry Level</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">₹50,000 / €1,500 - Remote support and venue recommendations</p>
                    <div className="flex items-center gap-2 text-sm text-[#DF6951]">
                      <Users className="w-4 h-4" />
                      <span>Budget-conscious couples (₹25-50L weddings)</span>
                    </div>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">Pro Member</span>
                      <Badge className="bg-[#F1A501] text-white hover:bg-[#F1A501]/90">Most Popular</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">₹1,00,000 / €3,000 - Site visits, in-person negotiations, 3 wedding coverage</p>
                    <div className="flex items-center gap-2 text-sm text-[#DF6951]">
                      <Users className="w-4 h-4" />
                      <span>₹50L-1Cr weddings, multiple family events</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">Elite Member</span>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">VIP 👑</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">₹1,50,000 / €5,000 - Full concierge, exclusive access, visa/flight coordination</p>
                    <div className="flex items-center gap-2 text-sm text-[#DF6951]">
                      <Users className="w-4 h-4" />
                      <span>₹1Cr+ weddings, NRI families, destination events</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Benefits Grid */}
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h3 className="text-3xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>How Our Concierge Service Drives Bookings to Your Venue</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every concierge member represents a high-value, pre-qualified booking opportunity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Qualified Lead Generation',
                description: 'Concierge members are serious couples who have paid for premium planning services, ensuring genuine booking intent and budget qualification',
                stat: '95%',
                statLabel: 'booking conversion rate'
              },
              {
                icon: Sparkles,
                title: 'Personal Venue Advocacy',
                description: 'Our concierge team actively promotes your venue to matched couples, highlighting unique features and arranging exclusive site visits',
                stat: '3-5',
                statLabel: 'venues shown per couple'
              },
              {
                icon: TrendingUp,
                title: 'Higher Booking Values',
                description: 'Concierge clients spend 40% more on average than direct bookings, with larger guest counts and premium package selections',
                stat: '₹60L+',
                statLabel: 'average venue spend'
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Card className="p-8 h-full bg-white border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-3" style={{ fontFamily: 'Volkhov, serif' }}>{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{benefit.description}</p>
                  <div className="pt-6 border-t border-gray-200">
                    <div className="text-3xl text-[#DF6951] mb-1" style={{ fontFamily: 'Volkhov, serif' }}>{benefit.stat}</div>
                    <div className="text-sm text-muted-foreground">{benefit.statLabel}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust & Services */}
          <motion.div 
            className="mt-16 bg-gradient-to-br from-[#DF6951]/5 to-[#F1A501]/5 border border-[#DF6951]/20 rounded-2xl p-10"
            {...fadeInUp}
          >
            <h3 className="text-2xl mb-6 text-center" style={{ fontFamily: 'Volkhov, serif' }}>Comprehensive Concierge Services</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our concierge team handles every aspect of the wedding planning journey, building trust and ensuring couples are confident in their venue choice
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: 'Trust & Safety Assurance' },
                { icon: Globe, label: 'Travel & Visa Coordination' },
                { icon: Users, label: 'Planner Matchmaking' },
                { icon: CheckCircle2, label: 'Venue Negotiation' },
                { icon: Calendar, label: 'Guest Travel Management' },
                { icon: Award, label: 'Smart Contracts' },
                { icon: Camera, label: 'Pre-Wedding Coordination' },
                { icon: Sparkles, label: 'Fashion & Styling' },
              ].map((service, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                    <service.icon className="w-7 h-7 text-[#DF6951]" />
                  </div>
                  <span className="text-sm">{service.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-24 relative z-10 bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-rose-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="bg-[#DF6951]/10 text-[#DF6951] hover:bg-[#DF6951]/20 border-[#DF6951]/20 px-4 py-2 mb-6">
              Our Affluent Customer Base
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
              Tap Into the <span className="text-[#F1A501]">$50B+</span> Market
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Wedzway targets high-net-worth customers seeking luxury destination wedding experiences. Our customers typically plan celebrations for 50-300 guests and value all-inclusive packages, personalized support, and exceptional service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { region: 'India', share: '35%', desc: 'Our largest market with strong demand for both domestic and international luxury settings' },
              { region: 'European Market', share: '30%', desc: 'Couples from UK, Germany, France, Italy, and Western Europe seeking exotic and culturally rich destinations' },
              { region: 'Asian Market', share: '25%', desc: 'High-spending clients from UAE, Qatar, Singapore, and Thailand interested in exclusive venues' },
            ].map((market, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="p-8 bg-white/80 backdrop-blur border-gray-200 hover:bg-white transition-all hover:shadow-lg">
                  <div className="text-5xl mb-3 text-[#F1A501]" style={{ fontFamily: 'Volkhov, serif' }}>{market.share}</div>
                  <h3 className="text-2xl mb-3">{market.region}</h3>
                  <p className="text-muted-foreground">{market.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* <motion.div
            className="mt-16 bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-10"
            {...fadeInUp}
          >
            <h3 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Volkhov, serif' }}>Typical Wedding Profile</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-2 text-[#F1A501]" style={{ fontFamily: 'Volkhov, serif' }}>50-300</div>
                <div className="text-lg text-muted-foreground">Guest Count</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2 text-[#F1A501]" style={{ fontFamily: 'Volkhov, serif' }}>3-5 Days</div>
                <div className="text-lg text-muted-foreground">Event Duration</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2 text-[#F1A501]" style={{ fontFamily: 'Volkhov, serif' }}>$25K-$50K</div>
                <div className="text-lg text-muted-foreground">Average Venue Spend</div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            className="bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
            {...fadeInUp}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
                Ready to Partner with Wedzway?
              </h2>
              <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
                We would be pleased to schedule a discussion on how we can work together to bring more international luxury weddings to your exceptional venue
              </p>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
                <h3 className="text-2xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>Next Steps</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {[
                    'Detailed presentation of the Wedzway platform',
                    'Review partnership terms and competitive commission structure',
                    'Begin creating your comprehensive venue profile',
                    'Start receiving qualified international leads'
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#DF6951] text-sm">✓</span>
                      </div>
                      <span className="text-lg">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#DF6951] hover:bg-white/90 px-8 text-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Partnership Team
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-2 border-white hover:bg-white/20 px-8 text-lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Visit Wedzway.com
                </Button>
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative z-10 border-t border-gray-200 bg-white/50 backdrop-blur">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Volkhov, serif' }}>Get in Touch</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#DF6951]/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#DF6951]" />
                </div>
                <span className="text-lg">partnerships@wedzway.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F1A501]/10 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#F1A501]" />
                </div>
                <span className="text-lg">www.wedzway.com</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              We look forward to the possibility of a successful partnership.
            </p>
            <p className="text-muted-foreground">
              Warm regards, The Wedzway Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { MapPin, Star, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const destinationData = {
  india: [
    {
      name: "Udaipur",
      country: "India",
      image: "https://images.unsplash.com/photo-1631116593186-7ca2dc21680f?w=800",
      description: "City of Lakes with majestic royal palaces",
      rating: 4.9,
      weddings: "3,200+",
      trending: true,
    },
    {
      name: "Jaipur",
      country: "India",
      image: "https://images.unsplash.com/photo-1664530140722-7e3bdbf2b870?w=800",
      description: "Pink City with historic forts and heritage",
      rating: 4.9,
      weddings: "2,800+",
      trending: true,
    },
    {
      name: "Goa",
      country: "India",
      image: "https://images.unsplash.com/photo-1741269945082-b499145a916f?w=800",
      description: "Beach paradise with Portuguese charm",
      rating: 4.8,
      weddings: "2,500+",
      trending: true,
    },
    {
      name: "Kerala",
      country: "India",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      description: "God's Own Country with backwaters and beaches",
      rating: 4.8,
      weddings: "1,900+",
      trending: false,
    },
  ],
  europe: [
    {
      name: "Santorini",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1719917522404-37c1e8dea3e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzYzOTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Iconic white architecture and sunset views",
      rating: 4.9,
      weddings: "3,200+",
      trending: true,
    },
    {
      name: "Tuscany",
      country: "Italy",
      image: "https://images.unsplash.com/photo-1698616596895-71e43af05b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwaXRhbHklMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDM2Mzk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Vineyards, countryside, and Italian charm",
      rating: 4.9,
      weddings: "2,800+",
      trending: true,
    },
    {
      name: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MDMyODIyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Romance capital with timeless elegance",
      rating: 4.8,
      weddings: "2,100+",
      trending: false,
    },
    {
      name: "Amalfi Coast",
      country: "Italy",
      image: "https://images.unsplash.com/photo-1583844056361-4418a8f2a985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWFsZmklMjBjb2FzdCUyMGl0YWx5fGVufDF8fHx8MTc2MDI1NjgxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Dramatic cliffs and Mediterranean beauty",
      rating: 4.8,
      weddings: "1,600+",
      trending: false,
    },
  ],
  asiaPacific: [
    {
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1693576588167-2e7148490dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwYmVhY2glMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDM2Mzk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Tropical temples and stunning beaches",
      rating: 4.9,
      weddings: "3,500+",
      trending: true,
    },
    {
      name: "Maldives",
      country: "Maldives",
      image: "https://images.unsplash.com/photo-1682308999971-208126ba75ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHJlc29ydHxlbnwxfHx8fDE3NjAyNzQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Overwater villas and crystal waters",
      rating: 4.9,
      weddings: "2,400+",
      trending: true,
    },
    {
      name: "Phuket",
      country: "Thailand",
      image: "https://images.unsplash.com/photo-1714785520961-1fc8d7360f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjB0aGFpbGFuZCUyMGJlYWNofGVufDF8fHx8MTc2MDM2Mzk1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Island paradise with luxury resorts",
      rating: 4.7,
      weddings: "1,900+",
      trending: false,
    },
    {
      name: "Rajasthan",
      country: "India",
      image: "https://images.unsplash.com/photo-1724382981275-f144e3a12cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBpbmRpYSUyMHBhbGFjZXxlbnwxfHx8fDE3NjAzNjM5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Royal palaces and desert majesty",
      rating: 4.8,
      weddings: "2,200+",
      trending: false,
    },
  ],
  middleEast: [
    {
      name: "Dubai",
      country: "UAE",
      image: "https://images.unsplash.com/photo-1600587193650-6a6615b3e95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGx1eHVyeSUyMGhvdGVsfGVufDF8fHx8MTc2MDM2Mzk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Ultra-luxury hotels and desert experiences",
      rating: 4.8,
      weddings: "1,800+",
      trending: true,
    },
  ],
};

const regionInfo = {
  india: {
    name: "India",
    share: "35%",
    description: "Royal palaces, pristine beaches, and rich cultural heritage",
    color: "from-rose-400 to-pink-500",
  },
  europe: {
    name: "Europe",
    share: "25%",
    description: "Classic romance with centuries of history and breathtaking landscapes",
    color: "from-purple-400 to-indigo-500",
  },
  asiaPacific: {
    name: "Asia-Pacific",
    share: "20%",
    description: "Exotic temples, pristine beaches, and luxurious island resorts",
    color: "from-amber-400 to-orange-500",
  },
  middleEast: {
    name: "Middle East",
    share: "15%",
    description: "Opulent luxury and desert adventures",
    color: "from-emerald-400 to-teal-500",
  },
};

export function TravelDestinationLocations() {
  const [activeTab, setActiveTab] = useState("india");

  return (
    <section className="py-24 bg-gradient-to-b from-rose-50/30 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Popular Destinations</p>
          <h2 className="text-4xl md:text-5xl capitalize mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
            Top Wedding Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the most sought-after locations for destination weddings across the globe
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto mb-12 bg-white/50 backdrop-blur-sm p-2 rounded-xl border-2 border-border">
            {Object.entries(regionInfo).map(([key, info]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-white data-[state=active]:shadow-md py-4 px-6 rounded-lg transition-all"
              >
                <div className="flex flex-col items-center gap-2">
                  <span>{info.name}</span>
                  <span className="text-xs text-muted-foreground">{info.share} market</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(destinationData).map(([regionKey, destinations]) => (
            <TabsContent key={regionKey} value={regionKey} className="mt-0">
              {/* Region Header */}
              <div className="mb-8 text-center">
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${regionInfo[regionKey as keyof typeof regionInfo].color} text-white mb-4`}>
                  <MapPin className="size-5" />
                  <span className="font-medium">{regionInfo[regionKey as keyof typeof regionInfo].name}</span>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {regionInfo[regionKey as keyof typeof regionInfo].description}
                </p>
              </div>

              {/* Destinations Grid */}
              <div className={`grid md:grid-cols-2 ${destinations.length >= 3 ? 'lg:grid-cols-3' : ''} ${destinations.length >= 4 ? 'xl:grid-cols-4' : ''} gap-6`}>
                {destinations.map((destination, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#DF6951]/20"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                        {destination.trending && (
                          <Badge className="bg-[#F1A501] text-white border-0 shadow-lg">
                            <TrendingUp className="size-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        <Badge className="ml-auto bg-white/90 text-foreground border-0 backdrop-blur-sm">
                          <Star className="size-3 mr-1 fill-amber-400 text-amber-400" />
                          {destination.rating}
                        </Badge>
                      </div>

                      {/* Bottom Info */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-white mb-1">{destination.name}</h3>
                        <p className="text-sm text-white/90">{destination.country}</p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        {destination.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]" />
                          <span className="text-muted-foreground">{destination.weddings} weddings</span>
                        </div>
                        <button className="text-sm text-[#DF6951] hover:underline font-medium">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Stats Footer */}
        <div className="mt-16 max-w-5xl mx-auto">
          {/* <Card className="p-8 bg-gradient-to-br from-amber-50 to-rose-50 border-2 border-amber-100">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                  50+
                </div>
                <p className="text-sm text-muted-foreground">Destinations Worldwide</p>
              </div>
              <div>
                <div className="text-3xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                  15K+
                </div>
                <p className="text-sm text-muted-foreground">Verified Vendors</p>
              </div>
              <div>
                <div className="text-3xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
                  4.8★
                </div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </Card> */}
        </div>
      </div>
    </section>
  );
}

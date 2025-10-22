import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Send } from "lucide-react";
import { Card } from "./ui/card";

const destinations = [
  {
    image: "https://images.unsplash.com/photo-1725395702929-39d283b2ffaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwd2VkZGluZyUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc2MDE4MDkwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Bali, Indonesia",
    price: "$8.2k",
    duration: "10 Days Trip",
  },
  {
    image: "https://images.unsplash.com/photo-1658994360830-752adf773957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGJlYWNoJTIwd2VkZGluZ3xlbnwxfHx8fDE3NjAxODA5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Maldives",
    price: "$12k",
    duration: "12 Days Trip",
  },
  {
    image: "https://images.unsplash.com/photo-1720535594340-48b247cf8f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMHdlZGRpbmclMjBlaWZmZWwlMjB0b3dlcnxlbnwxfHx8fDE3NjAxODA5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Paris, France",
    price: "$15k",
    duration: "14 Days Trip",
  },
];

const moreDestinations = [
  {
    image: "https://images.unsplash.com/photo-1707374661682-d804856cee22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGx1eHVyeSUyMHdlZGRpbmd8ZW58MXx8fHwxNzYwMTgwOTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Dubai, UAE",
    price: "$18k",
    duration: "7 Days Trip",
  },
  {
    image: "https://images.unsplash.com/photo-1622437800082-c984a140ae1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBwYWxhY2UlMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDE4MDkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Rajasthan, India",
    price: "$6.5k",
    duration: "10 Days Trip",
  },
  {
    image: "https://images.unsplash.com/photo-1727993405597-77d987063ce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJpYmJlYW4lMjBiZWFjaCUyMHdlZGRpbmd8ZW58MXx8fHwxNzYwMTgwOTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Caribbean Islands",
    price: "$9.8k",
    duration: "8 Days Trip",
  },
];

export function TravelDestinations() {
  return (
    <section id="destinations" className="py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Top Selling</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            Top Destinations
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {destinations.map((dest, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="relative h-72 overflow-hidden">
                <ImageWithFallback
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3>{dest.title}</h3>
                  <p className="text-muted-foreground">{dest.price}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  <span>{dest.duration}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Destinations */}
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl text-center mb-8" style={{ fontFamily: 'Volkhov, serif' }}>
            More Dream Destinations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreDestinations.map((dest, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h3>{dest.title}</h3>
                    <p className="text-muted-foreground">{dest.price}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{dest.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Decorative SVG */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
          <svg width="96" height="252" viewBox="0 0 96 252" fill="none">
            <path d="M8.95816 14.2344C15.985 5.71795 33.7527 -7.37604 48.6094 8.37933C63.4661 24.1347 43.423 53.6228 31.5443 66.3974" stroke="#84829A" />
          </svg>
        </div>
      </div>
    </section>
  );
}

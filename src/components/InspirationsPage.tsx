import { useState } from "react";
import { Search, Heart, Share2, Eye } from "lucide-react";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const categories = [
  "All",
  "Decor",
  "Flowers",
  "Cakes",
  "Dresses",
  "Venues",
  "Centerpieces",
  "Lighting",
  "Table Settings",
  "Ceremonies",
  "Invitations",
  "Photography",
];

const inspirations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1752857015591-c1b85c01c461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3IlMjBlbGVnYW50fGVufDF8fHx8MTc2MDM3NzQyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Elegant Garden Reception",
    category: "Decor",
    saves: 1234,
    userName: "Emma Wilson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1587635544862-0e0292bd8ab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMHJvc2VzfGVufDF8fHx8MTc2MDM3NzQyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Romantic Rose Bouquet",
    category: "Flowers",
    saves: 2341,
    userName: "Sophia Martinez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1640794334523-b299f14d28db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGx1eHVyeXxlbnwxfHx8fDE3NjAyNzc0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Five-Tier Luxury Cake",
    category: "Cakes",
    saves: 987,
    userName: "Oliver Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1677768061409-3d4fbd0250d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc2MDM3MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Rustic Table Setting",
    category: "Table Settings",
    saves: 1567,
    userName: "Isabella Rose",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1522229975700-0c897946d9d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBnb3dufGVufDF8fHx8MTc2MDM3NzQyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Classic Lace Gown",
    category: "Dresses",
    saves: 3421,
    userName: "Amelia Brooks",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1641834916652-c7436fd6f99a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBhcmNofGVufDF8fHx8MTc2MDM3NTEwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Floral Ceremony Arch",
    category: "Ceremonies",
    saves: 2109,
    userName: "Liam Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1723832348105-2e69f948135a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwbGlnaHRzfGVufDF8fHx8MTc2MDM3NzQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Sparkler Send-off",
    category: "Photography",
    saves: 1876,
    userName: "Ava Thompson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1759887244219-17c3d64a7f01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMGVsZWdhbnR8ZW58MXx8fHwxNzYwMzMyNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Minimalist Invitation",
    category: "Invitations",
    saves: 756,
    userName: "Noah Davis",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1578429031640-31345c8b8e34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VudGVycGllY2UlMjBmbG9yYWx8ZW58MXx8fHwxNzYwMzc1MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Tall Floral Centerpiece",
    category: "Centerpieces",
    saves: 1432,
    userName: "Mia Anderson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1596026339984-e16bfa013cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWN8ZW58MXx8fHwxNzYwMjU3NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Romantic Couple Portrait",
    category: "Photography",
    saves: 2654,
    userName: "Ethan Taylor",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1708743978241-a447efb1ee02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnJpZGFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMzc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Bridal Portrait Elegance",
    category: "Photography",
    saves: 3109,
    userName: "Charlotte Lee",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1578730169862-749bbdc763a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBvdXRkb29yfGVufDF8fHx8MTc2MDI1ODc3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Outdoor Garden Venue",
    category: "Venues",
    saves: 4231,
    userName: "James White",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1759760895771-a7f56d9843e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwbGlnaHRpbmclMjBjYW5kbGVzfGVufDF8fHx8MTc2MDM3NzQyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Candlelit Ambiance",
    category: "Lighting",
    saves: 1823,
    userName: "Harper Garcia",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harper",
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1629942878547-cfd0c89b54d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYmVhY2glMjBzdW5zZXR8ZW58MXx8fHwxNzYwMzc3NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Beach Wedding Sunset",
    category: "Venues",
    saves: 1654,
    userName: "Benjamin Scott",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin",
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1698082386199-fc60bc5b3e42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjBjb3VwbGV8ZW58MXx8fHwxNzYwMzQzNDgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Intimate Couple Moment",
    category: "Photography",
    saves: 2187,
    userName: "Evelyn King",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evelyn",
  },
];

interface InspirationsPageProps {
  onViewDetail: (inspirationId: number) => void;
}

export function InspirationsPage({ onViewDetail }: InspirationsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedItems, setSavedItems] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredInspirations = inspirations.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] pt-20">
      {/* Header */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: 'Volkhov, serif' }}>
              Wedding Inspirations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover ideas for your perfect day
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search inspirations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-[#DF6951]/20"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-foreground text-white shadow-md"
                    : "bg-white text-foreground hover:bg-gray-100 shadow-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 768: 3, 1024: 4, 1440: 5 }}
          >
            <Masonry gutter="10px">
              {filteredInspirations.map((item) => (
                <div
                  key={item.id}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    {/* Image */}
                    <div 
                      className="relative overflow-hidden"
                      onClick={() => onViewDetail(item.id)}
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover"
                      />
                      
                      {/* Hover Overlay - Minimal */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                        <button
                          className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg backdrop-blur-sm transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail(item.id);
                          }}
                        >
                          <Eye className="size-4 text-foreground" />
                        </button>
                        <button
                          className={`rounded-full p-2 shadow-lg backdrop-blur-sm transition-colors ${
                            savedItems.includes(item.id) 
                              ? 'bg-red-500 hover:bg-red-600' 
                              : 'bg-white/90 hover:bg-white'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(item.id);
                          }}
                        >
                          <Heart className={`size-4 ${
                            savedItems.includes(item.id) ? 'fill-white text-white' : 'text-foreground'
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="p-3">
                      <div className="flex items-center gap-2">
                        <img 
                          src={item.userAvatar} 
                          alt={item.userName}
                          className="size-6 rounded-full"
                        />
                        <span className="text-sm text-foreground/80">{item.userName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>

          {/* Empty State */}
          {filteredInspirations.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Search className="size-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2">No inspirations found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

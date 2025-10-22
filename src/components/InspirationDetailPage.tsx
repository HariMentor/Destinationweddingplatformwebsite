import { useState } from "react";
import { ArrowLeft, Heart, Share2, Download, Bookmark, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Separator } from "./ui/separator";
import Masonry from "react-responsive-masonry";

interface InspirationDetailPageProps {
  inspirationId: number;
  onBack: () => void;
}

const inspirationDetails = {
  1: {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGVsZWdhbnR8ZW58MXx8fHwxNzYwMzc2MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Elegant Garden Reception",
    category: "Decor",
    saves: 1234,
    views: 12540,
    description: "Transform your garden reception with this elegant setup featuring soft draping, romantic lighting, and lush floral arrangements. Perfect for an intimate outdoor celebration with a touch of sophistication.",
    tags: ["Garden", "Elegant", "Outdoor", "Romantic", "String Lights", "Draping"],
    colors: ["#F5E6D3", "#E8C4B8", "#D4A5A5", "#FFFFFF"],
    photographer: "Emma Richardson",
    location: "Tuscany, Italy",
    relatedImages: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZGVjb3J8ZW58MXx8fHwxNzYwMzc2MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwbGlnaHRpbmclMjBkZWNvcnxlbnwxfHx8fDE3NjAzNzYxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc2MDM3NjE0MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VudGVycGllY2UlMjBmbG9yYWx8ZW58MXx8fHwxNzYwMzc2MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    similarInspirations: [
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc2MDM3NjE0MHww&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Rustic Table Setting",
        saves: 1567,
      },
      {
        id: 10,
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZGVjb3J8ZW58MXx8fHwxNzYwMzc2MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Gold & White Reception",
        saves: 2654,
      },
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwbGlnaHRpbmclMjBkZWNvcnxlbnwxfHx8fDE3NjAzNzYxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "String Light Magic",
        saves: 1876,
      },
    ],
  },
};

export function InspirationDetailPage({ inspirationId, onBack }: InspirationDetailPageProps) {
  const inspiration = inspirationDetails[inspirationId as keyof typeof inspirationDetails] || inspirationDetails[1];
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [inspiration.image, ...inspiration.relatedImages];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      <div className="container mx-auto px-4 md:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Inspirations
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart className={`size-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="size-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="size-5" />
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Image */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden mb-6 group">
              <div className="relative h-[600px]">
                <ImageWithFallback
                  src={allImages[currentImageIndex]}
                  alt={inspiration.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="size-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="size-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
                    currentImageIndex === index ? "ring-2 ring-[#DF6951]" : ""
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${inspiration.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Description */}
            <Card className="p-6 mb-8">
              <h2 className="mb-4">About This Inspiration</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {inspiration.description}
              </p>

              <Separator className="my-6" />

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Photographer</p>
                  <p className="font-medium">{inspiration.photographer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">{inspiration.location}</p>
                </div>
              </div>
            </Card>

            {/* Similar Inspirations */}
            <div>
              <h2 className="mb-6">Similar Inspirations</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {inspiration.similarInspirations.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm mb-2 line-clamp-1">{item.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Bookmark className="size-3" />
                        <span>{item.saves.toLocaleString()} saves</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h1 className="text-2xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
                {inspiration.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white border-0">
                  {inspiration.category}
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-rose-50 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Heart className="size-4" />
                    <span className="text-sm">Saves</span>
                  </div>
                  <p className="text-xl" style={{ fontFamily: 'Volkhov, serif' }}>
                    {inspiration.saves.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Eye className="size-4" />
                    <span className="text-sm">Views</span>
                  </div>
                  <p className="text-xl" style={{ fontFamily: 'Volkhov, serif' }}>
                    {inspiration.views.toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Tags */}
              <div className="mb-6">
                <h3 className="mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {inspiration.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="hover:bg-rose-50 hover:border-[#DF6951] cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Color Palette */}
              <div className="mb-6">
                <h3 className="mb-3">Color Palette</h3>
                <div className="flex gap-3">
                  {inspiration.colors.map((color, index) => (
                    <button
                      key={index}
                      className="group relative"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(color);
                        } catch (error) {
                          // Silently fail or show fallback
                          console.log("Color code:", color);
                        }
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        style={{ backgroundColor: color }}
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark className="mr-2 size-4" />
                  {isSaved ? "Saved to Board" : "Save to Board"}
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 size-4" />
                  Share Inspiration
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 size-4" />
                  Download Image
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="p-4 bg-amber-50 rounded-lg">
                <p className="text-sm mb-2">
                  <strong>Love this style?</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Find similar vendors and venues that can bring this vision to life.
                </p>
                <Button className="w-full mt-3" variant="outline">
                  Find Vendors
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

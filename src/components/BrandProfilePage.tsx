import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Phone,
  Mail,
  Star,
  Award,
  Users,
  Package,
  TrendingUp,
  Heart,
  ShoppingCart,
  BadgeCheck,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar } from "./ui/avatar";
import { getBrandByName } from "./marketplaceData";

export function BrandProfilePage({ 
  onBack, 
  onViewProduct,
  brandName = "Sabyasachi"
}: { 
  onBack: () => void;
  onViewProduct?: (productId: string) => void;
  brandName?: string;
}) {
  const [following, setFollowing] = useState(false);

  const brandData = getBrandByName(brandName);
  
  if (!brandData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-purple-50/30 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl mb-4">Brand Not Found</h2>
          <Button onClick={onBack}>Back to Marketplace</Button>
        </Card>
      </div>
    );
  }

  const brand = brandData;

  const products = brand.products.slice(0, 6);
  const collections = brand.collections;

  const reviews = [
    {
      id: "1",
      author: "Priya Sharma",
      rating: 5,
      date: "2 weeks ago",
      product: products[0]?.name || "Product",
      comment:
        `Absolutely stunning! The quality from ${brand.name} is impeccable. Attention to detail is unmatched.`,
      verified: true,
    },
    {
      id: "2",
      author: "Anita Desai",
      rating: 5,
      date: "3 weeks ago",
      product: products[1]?.name || "Product",
      comment:
        `The quality is outstanding. Every piece from ${brand.name} is a work of art. Highly recommend!`,
      verified: true,
    },
    {
      id: "3",
      author: "Meera Patel",
      rating: 4,
      date: "1 month ago",
      product: products[2]?.name || "Product",
      comment:
        "Beautiful collection. The fabrics are luxurious and the craftsmanship is excellent.",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-purple-50/30">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Marketplace
          </Button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={brand.coverImage}
          alt={brand.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Brand Info Header */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <div className="size-32 rounded-lg bg-white border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1
                        className="text-3xl"
                        style={{ fontFamily: "Volkhov, serif" }}
                      >
                        {brand.name}
                      </h1>
                      {brand.verified && (
                        <Badge className="bg-blue-500 gap-1">
                          <BadgeCheck className="size-4" />
                          Verified Brand
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">
                      {brand.tagline}
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {brand.rating} ({brand.totalReviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="size-4" />
                        {brand.followers.toLocaleString()} followers
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Package className="size-4" />
                        {brand.totalProducts} products
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFollowing(!following)}
                      className={
                        following ? "bg-gray-100" : "bg-[#DF6951] text-white"
                      }
                    >
                      <Heart
                        className={`size-4 mr-2 ${
                          following ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {following ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {brand.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {brand.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="flex items-center gap-3">
              <Award className="size-8 text-[#DF6951]" />
              <div>
                <p className="text-2xl">{brand.founded}</p>
                <p className="text-xs text-muted-foreground">Established</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center gap-3">
              <Package className="size-8 text-purple-600" />
              <div>
                <p className="text-2xl">{brand.totalProducts}+</p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <TrendingUp className="size-8 text-green-600" />
              <div>
                <p className="text-2xl">{brand.totalSales.toLocaleString()}+</p>
                <p className="text-xs text-muted-foreground">Sales</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-center gap-3">
              <Star className="size-8 text-blue-600" />
              <div>
                <p className="text-2xl">{brand.rating}</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => onViewProduct?.(product.id)}
                  >
                    <div className="relative aspect-[4/3] bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          -{product.discount}%
                        </Badge>
                      )}
                      <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <Heart className="size-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm line-clamp-2 mb-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg text-[#DF6951]">
                          £{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            £{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <Button
                        className="w-full bg-[#DF6951] hover:bg-[#c55a41]"
                        size="sm"
                      >
                        <ShoppingCart className="size-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="relative aspect-[16/9] bg-gray-100">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl mb-2">{collection.name}</h3>
                        <p className="text-sm opacity-90">
                          {collection.products} products
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <div className="w-full h-full bg-gradient-to-br from-[#DF6951] to-[#F1A501] flex items-center justify-center text-white">
                        {review.author[0]}
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="flex items-center gap-2 mb-1">
                            {review.author}
                            {review.verified && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-700 gap-1"
                              >
                                <BadgeCheck className="size-3" />
                                Verified Purchase
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {review.product} • {review.date}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="size-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="size-5 text-[#DF6951]" />
                    <span className="text-sm">{brand.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="size-5 text-[#DF6951]" />
                    <a
                      href={`https://${brand.website}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {brand.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 text-[#DF6951]" />
                    <span className="text-sm">{brand.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="size-5 text-[#DF6951]" />
                    <span className="text-sm">{brand.phone}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4">Achievements & Awards</h3>
                <ul className="space-y-2">
                  {brand.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="size-4 text-[#F1A501] mt-1 shrink-0" />
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

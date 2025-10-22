import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Truck,
  RotateCcw,
  Shield,
  Tag,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { getProductById, allProducts } from "./marketplaceData";

export function ProductDetailPage({ 
  onBack, 
  onViewBrand,
  productId = "1"
}: { 
  onBack: () => void;
  onViewBrand?: (brandName: string) => void;
  productId?: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [inWishlist, setInWishlist] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const productData = getProductById(productId);
  
  if (!productData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-purple-50/30 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl mb-4">Product Not Found</h2>
          <Button onClick={onBack}>Back to Marketplace</Button>
        </Card>
      </div>
    );
  }

  const product = {
    ...productData,
    sizes: productData.sizes || ["XS", "S", "M", "L", "XL", "XXL"],
    colors: productData.colors || ["Red", "Maroon", "Pink", "Gold"],
    images: productData.images || [productData.image],
    description: productData.description || "Premium quality wedding product.",
    features: productData.features || ["Premium Quality", "Fast Delivery", "Easy Returns"],
    couponCode: productData.couponCode || "",
    inStock: productData.inStock !== false,
  };

  // Get related products from same category or brand
  const relatedProducts = allProducts
    .filter(p => 
      p.id !== productId && 
      (p.category === productData.category || p.brand === productData.brand)
    )
    .slice(0, 4);

  const reviews = [
    {
      id: "1",
      author: "Priya Sharma",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely stunning! The embroidery work is impeccable and the fit is perfect. Received so many compliments at my wedding.",
      verified: true,
    },
    {
      id: "2",
      author: "Anita Desai",
      rating: 5,
      date: "1 month ago",
      comment:
        "Quality is outstanding. Sabyasachi never disappoints. Worth every penny!",
      verified: true,
    },
    {
      id: "3",
      author: "Meera Patel",
      rating: 4,
      date: "2 months ago",
      comment:
        "Beautiful lehenga but delivery took longer than expected. Otherwise, very satisfied with the purchase.",
      verified: true,
    },
  ];

  const applyCoupon = () => {
    if (couponInput === product.couponCode) {
      setAppliedCoupon(couponInput);
      setCouponInput("");
    }
  };

  const discountedPrice = appliedCoupon
    ? product.price * 0.8
    : product.price;

  const ratingBreakdown = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 0 },
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <Card className="overflow-hidden mb-4">
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-lg">
                    -{product.discount}% OFF
                  </Badge>
                )}
                <button
                  onClick={() => setInWishlist(!inWishlist)}
                  className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <Heart
                    className={`size-5 ${
                      inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </button>

                {/* Image Navigation */}
                {selectedImage > 0 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                )}
                {selectedImage < product.images.length - 1 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                )}
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-[#DF6951]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <button 
                onClick={() => onViewBrand?.(product.brand)}
                className="text-sm text-[#DF6951] mb-2 hover:underline"
              >
                By {product.brand}
              </button>
              <h1 className="text-3xl mb-3" style={{ fontFamily: "Volkhov, serif" }}>
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl text-[#DF6951]">
                  £{discountedPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    £{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <Badge variant="secondary" className="text-green-600">
                  Save £{(product.originalPrice - discountedPrice).toLocaleString()}
                </Badge>
              </div>

              {product.inStock ? (
                <Badge className="bg-green-500 mb-4">
                  <Check className="size-3 mr-1" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive" className="mb-4">
                  Out of Stock
                </Badge>
              )}
            </div>

            <Card className="p-4 mb-6">
              {/* Size Selection */}
              <div className="mb-4">
                <label className="text-sm mb-2 block">Select Size</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition-all ${
                        selectedSize === size
                          ? "border-[#DF6951] bg-[#DF6951] text-white"
                          : "border-gray-300 hover:border-[#DF6951]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="text-sm mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="size-4 text-amber-600" />
                  <span className="text-sm">Apply Coupon Code</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={applyCoupon}
                    disabled={!couponInput}
                    className="bg-[#DF6951] hover:bg-[#c55a41]"
                  >
                    Apply
                  </Button>
                </div>
                {appliedCoupon ? (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Coupon applied! You saved 20%
                  </p>
                ) : (
                  <p className="text-xs text-amber-700 mt-2">
                    Use code <strong>{product.couponCode}</strong> for 20% off
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-[#DF6951] hover:bg-[#c55a41]"
                  size="lg"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="size-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="size-5 text-[#DF6951]" />
                  <div>
                    <p className="text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      On orders above £5,000
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="size-5 text-[#DF6951]" />
                  <div>
                    <p className="text-sm">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">
                      7 days return policy
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="size-5 text-[#DF6951]" />
                  <div>
                    <p className="text-sm">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">
                      100% secure checkout
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Button variant="ghost" className="w-full gap-2">
              <Share2 className="size-4" />
              Share this product
            </Button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="p-6 mb-12">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </TabsContent>

            <TabsContent value="features" className="mt-4">
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Sparkles className="size-4 text-[#DF6951]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              {/* Rating Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {product.reviews} reviews
                    </p>
                  </div>
                </Card>

                <div className="space-y-2">
                  {ratingBreakdown.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className="text-sm w-8">{item.stars}★</span>
                      <Progress value={item.percentage} className="flex-1" />
                      <span className="text-sm text-muted-foreground w-12">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="flex items-center gap-2">
                              {review.author}
                              {review.verified && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-green-100 text-green-700"
                                >
                                  <Check className="size-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {review.date}
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
          </Tabs>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl mb-6" style={{ fontFamily: "Volkhov, serif" }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-[#DF6951]">
                      £{item.price.toLocaleString()}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

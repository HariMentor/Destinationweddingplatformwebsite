import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  Filter,
  ShoppingCart,
  Heart,
  Star,
  Tag,
  TrendingUp,
  Sparkles,
  Crown,
  Gift,
  Percent,
  X,
  ChevronDown,
  Grid3x3,
  List,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { allProducts as mockProducts, type Product } from "./marketplaceData";

const categories = [
  { id: "all", name: "All Products", icon: Grid3x3 },
  { id: "bridal-wear", name: "Bridal Wear", icon: Sparkles },
  { id: "groom-wear", name: "Groom Wear", icon: Crown },
  { id: "jewelry", name: "Jewelry", icon: Sparkles },
  { id: "rings", name: "Wedding Rings", icon: Heart },
  { id: "accessories", name: "Accessories", icon: Gift },
  { id: "decor", name: "Decor Items", icon: Sparkles },
];

const brands = [
  "Sabyasachi",
  "Manish Malhotra",
  "Anita Dongre",
  "Tarun Tahiliani",
  "Cartier",
  "Tiffany & Co.",
  "Tanishq",
  "Zaveri Pearls",
  "Manyavar",
  "Raymond",
];

// Products are now imported from marketplaceData.ts

export function MarketplacePage({ 
  onBack, 
  onViewProduct, 
  onViewBrand 
}: { 
  onBack: () => void;
  onViewProduct?: (productId: string) => void;
  onViewBrand?: (brandName: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponInput, setCouponInput] = useState("");

  const toggleCart = (productId: string) => {
    setCartItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const applyCoupon = () => {
    if (couponInput) {
      setAppliedCoupon(couponInput);
      setCouponInput("");
    }
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return b.reviews - a.reviews;
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const cartTotal = cartItems.reduce((total, id) => {
    const product = mockProducts.find((p) => p.id === id);
    return total + (product?.price || 0);
  }, 0);

  const discountAmount = appliedCoupon ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discountAmount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-purple-50/30">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl text-[#DF6951]" style={{ fontFamily: "Volkhov, serif" }}>
                  Wedzway Marketplace
                </h1>
                <p className="text-sm text-muted-foreground">
                  Shop premium wedding essentials from top brands
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 relative"
                onClick={() => {}}
              >
                <Heart className="size-4" />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0 bg-[#DF6951]">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 relative"
              >
                <ShoppingCart className="size-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0 bg-[#DF6951]">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="size-4" />
                Filters
                {(selectedBrands.length > 0 || selectedCategory !== "all") && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedBrands.length + (selectedCategory !== "all" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3x3 className="size-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <motion.div
            initial={false}
            animate={{
              width: showFilters ? "auto" : 0,
              opacity: showFilters ? 1 : 0,
            }}
            className={`${showFilters ? "block" : "hidden lg:block"} lg:w-64 shrink-0`}
          >
            <Card className="p-4 space-y-6 sticky top-24">
              {/* Categories */}
              <div>
                <h3 className="mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-[#DF6951] text-white"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <cat.icon className="size-4" />
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="mb-3">Brands</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center gap-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label
                        htmlFor={brand}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="mb-3">Price Range</h3>
                <div className="space-y-3">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={20000}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>£{priceRange[0].toLocaleString()}</span>
                    <span>£{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Coupon */}
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <Tag className="size-4 text-[#DF6951]" />
                  Apply Coupon
                </h3>
                <div className="space-y-2">
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
                  {appliedCoupon && (
                    <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg text-sm">
                      <span className="text-green-700">{appliedCoupon} applied</span>
                      <button
                        onClick={() => setAppliedCoupon("")}
                        className="text-green-700 hover:text-green-900"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Popular codes: BRIDE20, PEARL15, JEWEL10
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedBrands.length > 0 || selectedCategory !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedCategory("all");
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </Card>
          </motion.div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedBrands.length > 0 || selectedCategory !== "all") && (
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => setSelectedCategory("all")}
                  >
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <X className="size-3" />
                  </Badge>
                )}
                {selectedBrands.map((brand) => (
                  <Badge
                    key={brand}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleBrand(brand)}
                  >
                    {brand}
                    <X className="size-3" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {sortedProducts.length} of {mockProducts.length} products
              </p>
            </div>

            {/* Products */}
            {sortedProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-2">No products found</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrands([]);
                    setSearchQuery("");
                  }}
                >
                  Clear filters
                </Button>
              </Card>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      <div className={viewMode === "list" ? "w-48 shrink-0" : ""}>
                        <div 
                          className="relative aspect-[4/3] bg-gray-100"
                          onClick={() => onViewProduct?.(product.id)}
                        >
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
                          {product.isNew && (
                            <Badge className="absolute top-2 right-2 bg-green-500">
                              New
                            </Badge>
                          )}
                          {product.isTrending && (
                            <Badge className="absolute top-2 right-2 bg-purple-500 gap-1">
                              <TrendingUp className="size-3" />
                              Trending
                            </Badge>
                          )}
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                          >
                            <Heart
                              className={`size-4 ${
                                wishlist.includes(product.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-600"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewBrand?.(product.brand);
                              }}
                              className="text-xs text-[#DF6951] mb-1 hover:underline block"
                            >
                              {product.brand}
                            </button>
                            <h3 
                              className="text-sm line-clamp-2 mb-1 cursor-pointer hover:text-[#DF6951]"
                              onClick={() => onViewProduct?.(product.id)}
                            >
                              {product.name}
                            </h3>
                          </div>
                        </div>

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

                        {product.couponCode && (
                          <div className="mb-3 flex items-center gap-1 text-xs bg-amber-50 border border-amber-200 rounded px-2 py-1 w-fit">
                            <Percent className="size-3 text-amber-600" />
                            <span className="text-amber-700">Use {product.couponCode}</span>
                          </div>
                        )}

                        <Button
                          onClick={() => toggleCart(product.id)}
                          className={`w-full mt-auto ${
                            cartItems.includes(product.id)
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-[#DF6951] hover:bg-[#c55a41]"
                          }`}
                          size="sm"
                        >
                          {cartItems.includes(product.id) ? (
                            <>
                              <ShoppingCart className="size-4 mr-2" />
                              Added to Cart
                            </>
                          ) : (
                            "Add to Cart"
                          )}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cart Summary (Fixed Bottom on Mobile) */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg p-4 lg:hidden z-50"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {cartItems.length} items
                </p>
                <p className="text-lg">
                  Total: <span className="text-[#DF6951]">£{finalTotal.toLocaleString()}</span>
                </p>
                {appliedCoupon && (
                  <p className="text-xs text-green-600">
                    Saved £{discountAmount.toFixed(2)} with {appliedCoupon}
                  </p>
                )}
              </div>
              <Button className="bg-[#DF6951] hover:bg-[#c55a41]">
                Checkout
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

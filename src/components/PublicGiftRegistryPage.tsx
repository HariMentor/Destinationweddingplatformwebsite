import { useState } from "react";
import { motion } from "motion/react";
import {
  Gift,
  Heart,
  ExternalLink,
  CheckCircle2,
  DollarSign,
  Home,
  Plane,
  Package,
  MapPin,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { GiftRegistryItem } from "./customerAccountData";

interface PublicGiftRegistryPageProps {
  registryId: string;
  onBack?: () => void;
  customData?: any;
}

const categoryIcons = {
  honeymoon: Plane,
  home: Home,
  experience: Heart,
  cash: DollarSign,
  other: Gift,
};

const categoryColors = {
  honeymoon: "text-[#DF6951] bg-orange-50 border-orange-200",
  home: "text-purple-600 bg-purple-50 border-purple-200",
  experience: "text-blue-600 bg-blue-50 border-blue-200",
  cash: "text-green-600 bg-green-50 border-green-200",
  other: "text-gray-600 bg-gray-50 border-gray-200",
};

export function PublicGiftRegistryPage({
  registryId,
  onBack,
  customData,
}: PublicGiftRegistryPageProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GiftRegistryItem | null>(null);
  const [purchaseFormData, setPurchaseFormData] = useState({
    name: "",
    email: "",
    quantity: 1,
  });
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  // Default registry data
  const defaultRegistryData = {
    title: "Sarah & Michael's Wedding Registry",
    welcomeMessage:
      "Thank you for being part of our special day! Your love and support mean the world to us. We've created this registry to help us start our new life together.",
    shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    allowCashGifts: true,
    honeymoonFundGoal: 5000,
    honeymoonFundRaised: 750,
    items: [] as GiftRegistryItem[],
    headerImage:
      "https://images.unsplash.com/photo-1631084854605-2ea7de264ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwd2VkZGluZ3xlbnwxfHx8fDE3NjExNDc1ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  };

  const registryData = customData || defaultRegistryData;

  const filteredItems =
    categoryFilter === "all"
      ? registryData.items
      : registryData.items.filter((item: GiftRegistryItem) => item.category === categoryFilter);

  const handlePurchaseClick = (item: GiftRegistryItem) => {
    if (item.purchased >= item.quantity) {
      toast.error("This item has already been purchased");
      return;
    }
    setSelectedItem(item);
    setPurchaseFormData({
      name: "",
      email: "",
      quantity: Math.min(1, item.quantity - item.purchased),
    });
    setShowPurchaseDialog(true);
  };

  const handlePurchaseSubmit = () => {
    if (!purchaseFormData.name || !purchaseFormData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setPurchasedItems([...purchasedItems, selectedItem!.id]);
    toast.success("Thank you! The couple has been notified of your gift.");
    setShowPurchaseDialog(false);
    setSelectedItem(null);
  };

  const honeymoonProgress = registryData.honeymoonFundGoal
    ? (registryData.honeymoonFundRaised / registryData.honeymoonFundGoal) * 100
    : 0;

  const totalPurchased = registryData.items.filter(
    (item: GiftRegistryItem) => item.purchased >= item.quantity
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-x-hidden">
      {/* Header Image */}
      <div className="relative h-[300px] lg:h-[400px]">
        <ImageWithFallback
          src={registryData.headerImage}
          alt="Wedding Registry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Gift className="size-12 sm:size-16 mb-4 mx-auto" />
            <h1 className="text-3xl sm:text-4xl md:text-6xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
              {registryData.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl">
              Help us start our new chapter together
            </p>
          </motion.div>
        </div>
        {onBack && (
          <Button
            onClick={onBack}
            variant="secondary"
            className="absolute top-4 left-4 gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 sm:p-6 md:p-8 text-center">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              {registryData.welcomeMessage}
            </p>
          </Card>
        </motion.div>

        {/* Honeymoon Fund Progress */}
        {registryData.allowCashGifts && registryData.honeymoonFundGoal > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-[#DF6951]">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 sm:size-12 bg-[#DF6951] rounded-full flex items-center justify-center shrink-0">
                  <Plane className="size-5 sm:size-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl truncate" style={{ fontFamily: "Volkhov, serif" }}>
                    Honeymoon Fund
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Help us create unforgettable memories
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                  <span className="font-semibold whitespace-nowrap">
                    ${registryData.honeymoonFundRaised} raised
                  </span>
                  <span className="text-muted-foreground whitespace-nowrap">
                    Goal: ${registryData.honeymoonFundGoal}
                  </span>
                </div>
                <Progress value={honeymoonProgress} className="h-3" />
                <p className="text-xs text-center text-muted-foreground">
                  {Math.round(honeymoonProgress)}% of goal reached
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Registry Stats */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-6">
          <Card className="p-3 sm:p-4 md:p-6 text-center">
            <Gift className="size-8 sm:size-10 mx-auto mb-2 sm:mb-3 text-[#DF6951]" />
            <p className="text-xl sm:text-2xl md:text-3xl mb-1">{registryData.items.length}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Items</p>
          </Card>
          <Card className="p-3 sm:p-4 md:p-6 text-center">
            <Package className="size-8 sm:size-10 mx-auto mb-2 sm:mb-3 text-green-600" />
            <p className="text-xl sm:text-2xl md:text-3xl mb-1">{totalPurchased}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Items Purchased</p>
          </Card>
          <Card className="p-3 sm:p-4 md:p-6 text-center">
            <ShoppingCart className="size-8 sm:size-10 mx-auto mb-2 sm:mb-3 text-blue-600" />
            <p className="text-xl sm:text-2xl md:text-3xl mb-1">
              {registryData.items.length - totalPurchased}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Items Available</p>
          </Card>
        </div>

        {/* Shipping Address */}
        {registryData.shippingAddress && (
          <Card className="p-4 sm:p-6 bg-blue-50">
            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-blue-600 mt-1 shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold mb-1">Shipping Address</h4>
                <p className="text-sm text-muted-foreground break-words">
                  {registryData.shippingAddress}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center px-2">
          <Badge
            variant={categoryFilter === "all" ? "default" : "outline"}
            className={`cursor-pointer text-xs sm:text-sm ${categoryFilter === "all" ? "bg-[#DF6951]" : ""}`}
            onClick={() => setCategoryFilter("all")}
          >
            All Items ({registryData.items.length})
          </Badge>
          <Badge
            variant={categoryFilter === "honeymoon" ? "default" : "outline"}
            className={`cursor-pointer text-xs sm:text-sm ${categoryFilter === "honeymoon" ? "bg-[#DF6951]" : ""}`}
            onClick={() => setCategoryFilter("honeymoon")}
          >
            <Plane className="size-3 mr-1" />
            Honeymoon (
            {registryData.items.filter((i: GiftRegistryItem) => i.category === "honeymoon").length})
          </Badge>
          <Badge
            variant={categoryFilter === "home" ? "default" : "outline"}
            className={`cursor-pointer text-xs sm:text-sm ${categoryFilter === "home" ? "bg-purple-600" : ""}`}
            onClick={() => setCategoryFilter("home")}
          >
            <Home className="size-3 mr-1" />
            Home ({registryData.items.filter((i: GiftRegistryItem) => i.category === "home").length}
            )
          </Badge>
          <Badge
            variant={categoryFilter === "experience" ? "default" : "outline"}
            className={`cursor-pointer text-xs sm:text-sm ${categoryFilter === "experience" ? "bg-blue-600" : ""}`}
            onClick={() => setCategoryFilter("experience")}
          >
            <Heart className="size-3 mr-1" />
            Experience (
            {registryData.items.filter((i: GiftRegistryItem) => i.category === "experience").length}
            )
          </Badge>
          <Badge
            variant={categoryFilter === "cash" ? "default" : "outline"}
            className={`cursor-pointer text-xs sm:text-sm ${categoryFilter === "cash" ? "bg-green-600" : ""}`}
            onClick={() => setCategoryFilter("cash")}
          >
            <DollarSign className="size-3 mr-1" />
            Cash ({registryData.items.filter((i: GiftRegistryItem) => i.category === "cash").length}
            )
          </Badge>
        </div>

        {/* Registry Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item: GiftRegistryItem) => {
            const Icon = categoryIcons[item.category];
            const isPurchased = item.purchased >= item.quantity || purchasedItems.includes(item.id);
            const availableQty = item.quantity - item.purchased;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${categoryColors[item.category]}`}
                    >
                      <Icon className="size-3 mr-1" />
                      {item.category}
                    </Badge>
                    {isPurchased && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle2 className="size-4 mr-1" />
                          Purchased
                        </Badge>
                      </div>
                    )}
                    {item.priority === "high" && !isPurchased && (
                      <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                        High Priority
                      </Badge>
                    )}
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base break-words">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 flex-1 break-words">
                      {item.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-lg sm:text-xl font-semibold text-[#DF6951] whitespace-nowrap">
                          ${item.price.toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <Badge variant="outline" className="text-xs whitespace-nowrap">
                            {availableQty} of {item.quantity} available
                          </Badge>
                        )}
                      </div>
                      {item.storeName && (
                        <p className="text-xs text-muted-foreground break-words">
                          Available at {item.storeName}
                        </p>
                      )}
                      <div className="flex flex-col sm:flex-row gap-2">
                        {item.storeLink && !isPurchased && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-2 text-xs sm:text-sm"
                            asChild
                          >
                            <a href={item.storeLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="size-3" />
                              View in Store
                            </a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className={`flex-1 gap-2 text-xs sm:text-sm ${
                            isPurchased
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-[#DF6951] hover:bg-[#c5573d]"
                          }`}
                          onClick={() => handlePurchaseClick(item)}
                          disabled={isPurchased}
                        >
                          {isPurchased ? (
                            <>
                              <CheckCircle2 className="size-3" />
                              Purchased
                            </>
                          ) : (
                            <>
                              <Gift className="size-3" />
                              <span className="hidden sm:inline">Mark as Purchased</span>
                              <span className="sm:hidden">Purchase</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <Card className="p-8 sm:p-12 text-center">
            <Gift className="size-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm sm:text-base text-muted-foreground">
              No {categoryFilter !== "all" ? categoryFilter : ""} items in this registry yet
            </p>
          </Card>
        )}
      </div>

      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Mark Item as Purchased</DialogTitle>
            <DialogDescription>
              Let the couple know you're giving them this gift
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex gap-3">
                  <ImageWithFallback
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="size-16 sm:size-20 object-cover rounded shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm sm:text-base break-words">{selectedItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${selectedItem.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaserName">Your Name *</Label>
                <Input
                  id="purchaserName"
                  value={purchaseFormData.name}
                  onChange={(e) =>
                    setPurchaseFormData({ ...purchaseFormData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaserEmail">Your Email *</Label>
                <Input
                  id="purchaserEmail"
                  type="email"
                  value={purchaseFormData.email}
                  onChange={(e) =>
                    setPurchaseFormData({ ...purchaseFormData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                />
              </div>

              {selectedItem.quantity > 1 && (
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={purchaseFormData.quantity}
                    onChange={(e) =>
                      setPurchaseFormData({
                        ...purchaseFormData,
                        quantity: Number(e.target.value),
                      })
                    }
                    min="1"
                    max={selectedItem.quantity - selectedItem.purchased}
                  />
                </div>
              )}

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-900">
                  The couple will be notified of your gift. You can purchase this item from the
                  store and have it shipped to their address.
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowPurchaseDialog(false);
                setSelectedItem(null);
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePurchaseSubmit}
              className="bg-[#DF6951] hover:bg-[#c5573d] w-full sm:w-auto"
            >
              Confirm Purchase
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

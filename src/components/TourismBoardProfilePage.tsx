import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Phone,
  Mail,
  Star,
  Users,
  Building2,
  BadgeCheck,
  Share2,
  Heart,
  Tag,
  Percent,
  Calendar,
  Clock,
  Ticket,
  Package,
  TrendingUp,
  Gift,
  Copy,
  Check,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { getTourismBoardByName } from "./tourismBoardData";

export function TourismBoardProfilePage({
  onBack,
  boardName = "Visit Florence",
}: {
  onBack: () => void;
  boardName?: string;
}) {
  const [following, setFollowing] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const boardData = getTourismBoardByName(boardName);

  if (!boardData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-purple-50/30 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl mb-4">Tourism Board Not Found</h2>
          <Button onClick={onBack}>Back to Destinations</Button>
        </Card>
      </div>
    );
  }

  const board = boardData;

  const copyCouponCode = async (code: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setCopiedCoupon(code);
        setTimeout(() => setCopiedCoupon(null), 2000);
      } else {
        // Fallback: create temporary input element
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopiedCoupon(code);
          setTimeout(() => setCopiedCoupon(null), 2000);
        } catch (err) {
          console.error('Fallback: Could not copy text: ', err);
          // Show code in alert as last resort
          alert(`Coupon Code: ${code}\n\nPlease copy this code manually.`);
        }
        textArea.remove();
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback method if clipboard API fails
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedCoupon(code);
        setTimeout(() => setCopiedCoupon(null), 2000);
      } catch (fallbackErr) {
        console.error('Fallback: Could not copy text: ', fallbackErr);
        // Show code in alert as last resort
        alert(`Coupon Code: ${code}\n\nPlease copy this code manually.`);
      }
      textArea.remove();
    }
  };

  const stats = [
    {
      icon: Users,
      label: "Annual Visitors",
      value: board.stats.visitors,
    },
    {
      icon: Building2,
      label: "Attractions",
      value: board.stats.attractions.toString(),
    },
    {
      icon: TrendingUp,
      label: "Partners",
      value: board.stats.partners.toString(),
    },
    {
      icon: Star,
      label: "Rating",
      value: board.stats.rating.toString(),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-purple-50/30 pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <Button variant="outline" onClick={onBack} className="gap-2 mb-6">
          <ArrowLeft className="size-4" />
          Back to Destination
        </Button>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={board.coverImage}
          alt={board.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <div className="size-32 rounded-lg bg-white border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={board.logo}
                    alt={board.name}
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
                        {board.name}
                      </h1>
                      <Badge className="bg-blue-500 gap-1">
                        <BadgeCheck className="size-4" />
                        Official Tourism Board
                      </Badge>
                    </div>
                    <p className="text-xl text-[#DF6951] mb-2">
                      {board.tagline}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        {board.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        Est. {board.founded}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={following ? "outline" : "default"}
                      onClick={() => setFollowing(!following)}
                      className="gap-2"
                    >
                      <Heart
                        className={`size-4 ${
                          following ? "fill-current" : ""
                        }`}
                      />
                      {following ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  {board.description}
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href={`https://${board.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#DF6951] hover:underline"
                  >
                    <Globe className="size-4" />
                    {board.website}
                  </a>
                  <a
                    href={`mailto:${board.email}`}
                    className="flex items-center gap-1 text-muted-foreground hover:text-[#DF6951]"
                  >
                    <Mail className="size-4" />
                    {board.email}
                  </a>
                  <a
                    href={`tel:${board.phone}`}
                    className="flex items-center gap-1 text-muted-foreground hover:text-[#DF6951]"
                  >
                    <Phone className="size-4" />
                    {board.phone}
                  </a>
                </div>

                {/* Social Media */}
                {board.socialMedia && (
                  <div className="flex gap-3 mt-4">
                    {board.socialMedia.facebook && (
                      <a
                        href={`https://facebook.com/${board.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        <Facebook className="size-4" />
                      </a>
                    )}
                    {board.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${board.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:opacity-90 transition-opacity"
                      >
                        <Instagram className="size-4" />
                      </a>
                    )}
                    {board.socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${board.socialMedia.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                      >
                        <Twitter className="size-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 text-center">
                <stat.icon className="size-8 mx-auto mb-2 text-[#DF6951]" />
                <p className="text-2xl mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="coupons" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="coupons" className="gap-2">
              <Tag className="size-4" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="promotions" className="gap-2">
              <Percent className="size-4" />
              Promotions
            </TabsTrigger>
            <TabsTrigger value="things-to-do" className="gap-2">
              <Gift className="size-4" />
              Things To Do
            </TabsTrigger>
            <TabsTrigger value="museums" className="gap-2">
              <Ticket className="size-4" />
              Museums
            </TabsTrigger>
            <TabsTrigger value="packages" className="gap-2">
              <Package className="size-4" />
              Tour Packages
            </TabsTrigger>
          </TabsList>

          {/* Coupons Tab */}
          <TabsContent value="coupons">
            <div className="mb-6">
              <h2 className="text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                Exclusive Coupons & Discounts
              </h2>
              <p className="text-muted-foreground">
                Save money on your visit with these exclusive offers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {board.coupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border-2 border-dashed border-[#DF6951]/30 hover:border-[#DF6951] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Badge className="bg-[#DF6951] mb-2">
                          {coupon.discount}
                        </Badge>
                        <h3 className="text-xl mb-2">{coupon.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {coupon.description}
                        </p>
                      </div>
                      <Tag className="size-8 text-[#DF6951] opacity-20" />
                    </div>

                    <Separator className="mb-4" />

                    <div className="bg-gray-100 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">
                            Coupon Code
                          </p>
                          <p 
                            className="font-mono tracking-wider select-all cursor-pointer hover:text-[#DF6951] transition-colors"
                            onClick={() => copyCouponCode(coupon.code)}
                            title="Click to copy"
                          >
                            {coupon.code}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyCouponCode(coupon.code)}
                          className="gap-2 shrink-0"
                        >
                          {copiedCoupon === coupon.code ? (
                            <>
                              <Check className="size-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="size-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 Click the code or button to copy
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="size-4" />
                        Valid until {coupon.validUntil}
                      </span>
                      <Badge variant="secondary">{coupon.category}</Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                      {coupon.terms}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions">
            <div className="mb-6">
              <h2 className="text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                Current Promotions & Events
              </h2>
              <p className="text-muted-foreground">
                Don't miss these special events and limited-time offers
              </p>
            </div>

            {board.promotions.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {board.promotions.map((promo, index) => (
                  <motion.div
                    key={promo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[16/9] bg-gray-100">
                        <img
                          src={promo.image}
                          alt={promo.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl mb-2">{promo.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {promo.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="size-4" />
                            Until {promo.validUntil}
                          </span>
                          {promo.link && (
                            <Button size="sm" variant="outline" className="gap-2">
                              Learn More
                              <ExternalLink className="size-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Percent className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No active promotions at the moment. Check back soon!
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Things To Do Tab */}
          <TabsContent value="things-to-do">
            <div className="mb-6">
              <h2 className="text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                Things To Do
              </h2>
              <p className="text-muted-foreground">
                Curated experiences and activities for your visit
              </p>
            </div>

            {board.thingsToDo.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {board.thingsToDo.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-[4/3] bg-gray-100">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2">
                          {activity.category}
                        </Badge>
                        <h3 className="text-lg mb-2">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="flex items-center gap-1 text-sm">
                            <Clock className="size-4 text-muted-foreground" />
                            {activity.duration}
                          </span>
                          <span className="text-[#DF6951]">
                            {activity.price}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="size-4 fill-yellow-400 text-yellow-400" />
                            <span>{activity.rating}</span>
                            <span className="text-muted-foreground">
                              ({activity.reviews})
                            </span>
                          </div>
                          <Button size="sm">Book Now</Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Gift className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Activities coming soon!
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Museums Tab */}
          <TabsContent value="museums">
            <div className="mb-6">
              <h2 className="text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                Museum Bookings
              </h2>
              <p className="text-muted-foreground">
                Book tickets to world-class museums and cultural attractions
              </p>
            </div>

            {board.museums.length > 0 ? (
              <div className="space-y-6">
                {board.museums.map((museum, index) => (
                  <motion.div
                    key={museum.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 aspect-[4/3] md:aspect-auto bg-gray-100">
                          <img
                            src={museum.image}
                            alt={museum.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-2xl mb-2">{museum.name}</h3>
                              <p className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                <MapPin className="size-4" />
                                {museum.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="size-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">
                                {museum.rating}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({museum.reviews.toLocaleString()})
                              </span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4">
                            {museum.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm mb-2 flex items-center gap-2">
                                <Clock className="size-4 text-[#DF6951]" />
                                <span className="font-semibold">
                                  Opening Hours:
                                </span>
                              </p>
                              <p className="text-sm text-muted-foreground ml-6">
                                {museum.openingHours}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm mb-2 flex items-center gap-2">
                                <Ticket className="size-4 text-[#DF6951]" />
                                <span className="font-semibold">Tickets:</span>
                              </p>
                              <p className="text-sm text-muted-foreground ml-6">
                                {museum.ticketPrice}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-semibold mb-2">
                              Highlights:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {museum.highlights.map((highlight, i) => (
                                <Badge key={i} variant="secondary">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Button className="w-full md:w-auto">
                            Book Tickets
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Ticket className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Museum bookings coming soon!
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Tour Packages Tab */}
          <TabsContent value="packages">
            <div className="mb-6">
              <h2 className="text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                Tour Packages
              </h2>
              <p className="text-muted-foreground">
                Complete tour packages with accommodation, guides, and experiences
              </p>
            </div>

            {board.tourPackages.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {board.tourPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                      <div className="aspect-[16/9] bg-gray-100">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl flex-1">{pkg.name}</h3>
                          <Badge className="bg-[#DF6951]">{pkg.duration}</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {pkg.description}
                        </p>

                        <div className="mb-4">
                          <p className="text-sm font-semibold mb-2">
                            Package Includes:
                          </p>
                          <ul className="space-y-1">
                            {pkg.includes.map((item, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-2 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="size-4 fill-yellow-400 text-yellow-400" />
                            <span>{pkg.rating}</span>
                            <span className="text-muted-foreground">
                              ({pkg.reviews})
                            </span>
                          </div>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="text-muted-foreground">
                            {pkg.availability}
                          </span>
                        </div>

                        <div className="mt-auto pt-4 border-t flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              From
                            </p>
                            <p className="text-2xl text-[#DF6951]">
                              {pkg.price}
                            </p>
                          </div>
                          <Button>View Details</Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Package className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Tour packages coming soon!
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

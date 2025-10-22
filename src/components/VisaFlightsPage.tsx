import { useState } from "react";
import { ArrowRight, CheckCircle, Clock, Shield, FileText, Users, Phone, Mail, AlertCircle, Search, Calendar, Plane, ArrowLeftRight, MapPin, SlidersHorizontal, Filter, DollarSign, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";

interface VisaFlightsPageProps {
  onRequestVisa: () => void;
  onBookFlight: (flight: any, passengers: number, tripType: string, returnFlight?: any) => void;
}

export function VisaFlightsPage({ onRequestVisa, onBookFlight }: VisaFlightsPageProps) {
  const [activeTab, setActiveTab] = useState<"flights" | "visa">("flights");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showFlightResults, setShowFlightResults] = useState(false);

  // Flight Search State
  const [flightSearch, setFlightSearch] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: "1",
    class: "economy",
    tripType: "roundtrip",
  });

  // Flight Filters
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    stops: [] as string[],
    airlines: [] as string[],
    departureTime: [] as string[],
  });

  const popularRoutes = [
    {
      from: "Mumbai",
      fromCode: "BOM",
      to: "Santorini",
      toCode: "JTR",
      price: "₹45,000",
      duration: "12h 30m",
      image: "https://images.unsplash.com/photo-1719917522404-37c1e8dea3e4?w=800",
    },
    {
      from: "Delhi",
      fromCode: "DEL",
      to: "Bali",
      toCode: "DPS",
      price: "₹35,000",
      duration: "9h 45m",
      image: "https://images.unsplash.com/photo-1693576588167-2e7148490dc5?w=800",
    },
    {
      from: "Bangalore",
      fromCode: "BLR",
      to: "Dubai",
      toCode: "DXB",
      price: "₹18,000",
      duration: "4h 15m",
      image: "https://images.unsplash.com/photo-1600587193650-6a6615b3e95c?w=800",
    },
    {
      from: "Mumbai",
      fromCode: "BOM",
      to: "Maldives",
      toCode: "MLE",
      price: "₹25,000",
      duration: "2h 30m",
      image: "https://images.unsplash.com/photo-1682308999971-208126ba75ec?w=800",
    },
  ];

  const flightResults = [
    {
      id: 1,
      airline: "Air India",
      logo: "🛫",
      from: flightSearch.from || "Mumbai",
      fromCode: "BOM",
      to: flightSearch.to || "Santorini",
      toCode: "JTR",
      departTime: "10:30",
      arriveTime: "23:00",
      duration: "12h 30m",
      stops: 1,
      stopCity: "Dubai",
      price: 45000,
      class: "Economy",
      seatsLeft: 12,
      baggage: "30 kg",
      departDate: flightSearch.departDate || "2025-06-15",
      arriveDate: flightSearch.departDate || "2025-06-16",
    },
    {
      id: 2,
      airline: "Emirates",
      logo: "✈️",
      from: flightSearch.from || "Mumbai",
      fromCode: "BOM",
      to: flightSearch.to || "Santorini",
      toCode: "JTR",
      departTime: "15:45",
      arriveTime: "04:15",
      duration: "12h 30m",
      stops: 1,
      stopCity: "Dubai",
      price: 52000,
      class: "Economy",
      seatsLeft: 8,
      baggage: "35 kg",
      departDate: flightSearch.departDate || "2025-06-15",
      arriveDate: flightSearch.departDate || "2025-06-16",
    },
    {
      id: 3,
      airline: "IndiGo",
      logo: "🛩️",
      from: flightSearch.from || "Mumbai",
      fromCode: "BOM",
      to: flightSearch.to || "Santorini",
      toCode: "JTR",
      departTime: "06:00",
      arriveTime: "20:30",
      duration: "14h 30m",
      stops: 2,
      stopCity: "Delhi, Istanbul",
      price: 38000,
      class: "Economy",
      seatsLeft: 20,
      baggage: "25 kg",
      departDate: flightSearch.departDate || "2025-06-15",
      arriveDate: flightSearch.departDate || "2025-06-16",
    },
    {
      id: 4,
      airline: "Qatar Airways",
      logo: "🛫",
      from: flightSearch.from || "Mumbai",
      fromCode: "BOM",
      to: flightSearch.to || "Santorini",
      toCode: "JTR",
      departTime: "22:30",
      arriveTime: "12:00",
      duration: "13h 30m",
      stops: 1,
      stopCity: "Doha",
      price: 48000,
      class: "Economy",
      seatsLeft: 15,
      baggage: "30 kg",
      departDate: flightSearch.departDate || "2025-06-15",
      arriveDate: flightSearch.departDate || "2025-06-16",
    },
  ];

  const airlines = ["Air India", "Emirates", "IndiGo", "Qatar Airways", "Vistara", "Singapore Airlines"];

  const visaServices = [
    {
      icon: FileText,
      title: "Visa Application Assistance",
      description: "Complete support with visa application forms and documentation",
      features: ["Form filling", "Document review", "Application submission"],
    },
    {
      icon: Clock,
      title: "Fast-Track Processing",
      description: "Expedited visa processing for urgent travel needs",
      features: ["Priority processing", "24-48 hour turnaround", "Urgent appointments"],
    },
    {
      icon: Shield,
      title: "Document Verification",
      description: "Professional verification of all required documents",
      features: ["Authentication", "Notarization", "Apostille services"],
    },
    {
      icon: Users,
      title: "Group Visa Processing",
      description: "Special packages for wedding guest groups",
      features: ["Bulk applications", "Group discounts", "Coordinated processing"],
    },
  ];

  const popularDestinations = [
    {
      country: "Greece",
      flag: "🇬🇷",
      visaType: "Schengen Visa",
      processingTime: "15-20 days",
      validity: "90 days",
      fee: "€80",
      requirements: 5,
    },
    {
      country: "Italy",
      flag: "🇮🇹",
      visaType: "Schengen Visa",
      processingTime: "15-20 days",
      validity: "90 days",
      fee: "€80",
      requirements: 5,
    },
    {
      country: "Thailand",
      flag: "🇹🇭",
      visaType: "Tourist Visa",
      processingTime: "3-5 days",
      validity: "60 days",
      fee: "₹2,400",
      requirements: 4,
    },
    {
      country: "UAE",
      flag: "🇦🇪",
      visaType: "Tourist Visa",
      processingTime: "3-4 days",
      validity: "30 days",
      fee: "₹8,500",
      requirements: 3,
    },
    {
      country: "Bali (Indonesia)",
      flag: "🇮🇩",
      visaType: "Visa on Arrival",
      processingTime: "On arrival",
      validity: "30 days",
      fee: "$35",
      requirements: 3,
    },
    {
      country: "Maldives",
      flag: "🇲🇻",
      visaType: "Free on Arrival",
      processingTime: "On arrival",
      validity: "30 days",
      fee: "Free",
      requirements: 2,
    },
  ];

  const handleFlightSearch = () => {
    if (flightSearch.from && flightSearch.to && flightSearch.departDate) {
      setShowFlightResults(true);
      window.scrollTo({ top: document.getElementById("flight-results")?.offsetTop || 0, behavior: "smooth" });
    }
  };

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentValues, value]
        };
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#DF6951]/10 via-[#F1A501]/10 to-[#DF6951]/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 px-4 py-2 bg-[#DF6951] text-white border-0 text-base">
              VISA + FLIGHTS
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Complete Travel <span className="text-[#DF6951]">Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Book flights and handle visa processing all in one place for your destination wedding
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "flights" | "visa")} className="max-w-7xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-14 mb-12">
              <TabsTrigger value="flights" className="text-base gap-2">
                <Plane className="size-5" />
                Flights
              </TabsTrigger>
              <TabsTrigger value="visa" className="text-base gap-2">
                <FileText className="size-5" />
                Visa Services
              </TabsTrigger>
            </TabsList>

            {/* FLIGHTS TAB */}
            <TabsContent value="flights" className="mt-0">
              {/* Flight Search Card */}
              <Card className="p-8 mb-12 border-2 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Search Flights</h2>
                  <div className="flex gap-4">
                    <Button
                      variant={flightSearch.tripType === "roundtrip" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFlightSearch(prev => ({ ...prev, tripType: "roundtrip" }))}
                    >
                      Round Trip
                    </Button>
                    <Button
                      variant={flightSearch.tripType === "oneway" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFlightSearch(prev => ({ ...prev, tripType: "oneway" }))}
                    >
                      One Way
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <Label htmlFor="from">From</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-foreground/40" />
                      <Input
                        id="from"
                        placeholder="Delhi, Mumbai, Bangalore..."
                        value={flightSearch.from}
                        onChange={(e) => setFlightSearch(prev => ({ ...prev, from: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="to">To</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-foreground/40" />
                      <Input
                        id="to"
                        placeholder="Destination..."
                        value={flightSearch.to}
                        onChange={(e) => setFlightSearch(prev => ({ ...prev, to: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="departDate">Departure Date</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-foreground/40" />
                      <Input
                        id="departDate"
                        type="date"
                        value={flightSearch.departDate}
                        onChange={(e) => setFlightSearch(prev => ({ ...prev, departDate: e.target.value }))}
                        className="pl-10"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  {flightSearch.tripType === "roundtrip" && (
                    <div>
                      <Label htmlFor="returnDate">Return Date</Label>
                      <div className="relative mt-2">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-foreground/40" />
                        <Input
                          id="returnDate"
                          type="date"
                          value={flightSearch.returnDate}
                          onChange={(e) => setFlightSearch(prev => ({ ...prev, returnDate: e.target.value }))}
                          className="pl-10"
                          min={flightSearch.departDate || new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="passengers">Passengers</Label>
                    <Select
                      value={flightSearch.passengers}
                      onValueChange={(value) => setFlightSearch(prev => ({ ...prev, passengers: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Passenger" : "Passengers"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={flightSearch.class}
                      onValueChange={(value) => setFlightSearch(prev => ({ ...prev, class: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premium-economy">Premium Economy</SelectItem>
                        <SelectItem value="business">Business Class</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] gap-2"
                      onClick={handleFlightSearch}
                    >
                      <Search className="size-5" />
                      Search Flights
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Popular Routes */}
              {!showFlightResults && (
                <div className="mb-12">
                  <h2 className="text-3xl mb-8 text-center">Popular Wedding Destinations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularRoutes.map((route, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-2 hover:border-[#DF6951]/20">
                          <div className="relative h-40">
                            <ImageWithFallback
                              src={route.image}
                              alt={route.to}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3 text-white">
                              <div className="flex items-center gap-2 mb-1">
                                <span>{route.from}</span>
                                <ArrowRight className="size-4" />
                                <span>{route.to}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-foreground/60">{route.duration}</span>
                              <Badge className="bg-green-50 text-green-600 border-0">
                                {route.price}
                              </Badge>
                            </div>
                            <Button
                              className="w-full"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setFlightSearch(prev => ({
                                  ...prev,
                                  from: route.from,
                                  to: route.to,
                                }));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                            >
                              Select Route
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flight Results */}
              {showFlightResults && (
                <div id="flight-results" className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl mb-2">Available Flights</h2>
                      <p className="text-foreground/60">
                        {flightSearch.from} → {flightSearch.to} • {flightSearch.departDate}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setShowFlightResults(false)}>
                      Modify Search
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <Card className="p-6 h-fit">
                      <div className="flex items-center gap-2 mb-6">
                        <SlidersHorizontal className="size-5" />
                        <h3>Filters</h3>
                      </div>

                      {/* Price Range */}
                      <div className="mb-6">
                        <Label className="mb-3 block">Price Range</Label>
                        <Slider
                          value={filters.priceRange}
                          onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                          min={0}
                          max={100000}
                          step={1000}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-foreground/60">
                          <span>₹{filters.priceRange[0].toLocaleString()}</span>
                          <span>₹{filters.priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Stops */}
                      <div className="mb-6">
                        <Label className="mb-3 block">Stops</Label>
                        <div className="space-y-2">
                          {["Non-stop", "1 Stop", "2+ Stops"].map((stop) => (
                            <div key={stop} className="flex items-center space-x-2">
                              <Checkbox
                                id={stop}
                                checked={filters.stops.includes(stop)}
                                onCheckedChange={() => toggleFilter("stops", stop)}
                              />
                              <Label htmlFor={stop} className="font-normal cursor-pointer">
                                {stop}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Airlines */}
                      <div className="mb-6">
                        <Label className="mb-3 block">Airlines</Label>
                        <div className="space-y-2">
                          {airlines.slice(0, 4).map((airline) => (
                            <div key={airline} className="flex items-center space-x-2">
                              <Checkbox
                                id={airline}
                                checked={filters.airlines.includes(airline)}
                                onCheckedChange={() => toggleFilter("airlines", airline)}
                              />
                              <Label htmlFor={airline} className="font-normal cursor-pointer">
                                {airline}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Departure Time */}
                      <div>
                        <Label className="mb-3 block">Departure Time</Label>
                        <div className="space-y-2">
                          {["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)", "Night (12AM-6AM)"].map((time) => (
                            <div key={time} className="flex items-center space-x-2">
                              <Checkbox
                                id={time}
                                checked={filters.departureTime.includes(time)}
                                onCheckedChange={() => toggleFilter("departureTime", time)}
                              />
                              <Label htmlFor={time} className="font-normal cursor-pointer text-sm">
                                {time}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>

                    {/* Flight List */}
                    <div className="lg:col-span-3 space-y-4">
                      {flightResults.map((flight) => (
                        <motion.div
                          key={flight.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-[#DF6951]/20">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              {/* Flight Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="text-3xl">{flight.logo}</span>
                                  <div>
                                    <h4>{flight.airline}</h4>
                                    <p className="text-sm text-foreground/60">{flight.class}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-6">
                                  <div>
                                    <div className="text-2xl mb-1">{flight.departTime}</div>
                                    <div className="text-sm text-foreground/60">{flight.fromCode}</div>
                                  </div>

                                  <div className="flex-1 text-center">
                                    <div className="text-sm text-foreground/60 mb-2">{flight.duration}</div>
                                    <div className="relative h-0.5 bg-foreground/20">
                                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/40" />
                                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/40" />
                                      <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-[#DF6951]" />
                                    </div>
                                    <div className="text-xs text-foreground/60 mt-2">
                                      {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
                                      {flight.stops > 0 && (
                                        <span className="block">{flight.stopCity}</span>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="text-2xl mb-1">{flight.arriveTime}</div>
                                    <div className="text-sm text-foreground/60">{flight.toCode}</div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 mt-4 text-sm text-foreground/60">
                                  <span>✓ {flight.baggage} baggage</span>
                                  <span>✓ Refundable</span>
                                  <Badge variant="outline" className="text-xs">
                                    {flight.seatsLeft} seats left
                                  </Badge>
                                </div>
                              </div>

                              {/* Price & Book */}
                              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                                <div className="text-right">
                                  <div className="text-3xl text-[#DF6951] mb-1">
                                    ₹{flight.price.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-foreground/60">per person</div>
                                </div>
                                <Button 
                                  className="bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                                  onClick={() => onBookFlight(
                                    flight, 
                                    parseInt(flightSearch.passengers),
                                    flightSearch.tripType,
                                    flightSearch.tripType === "roundtrip" ? flight : undefined
                                  )}
                                >
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bundle Offer */}
              <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-blue-600 text-white border-0">
                      BUNDLE & SAVE
                    </Badge>
                    <h3 className="text-2xl mb-2">Book Flight + Visa Together</h3>
                    <p className="text-foreground/70 mb-4">
                      Get up to 15% off when you book your flight and visa processing together. We'll handle everything for your destination wedding!
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-5 text-green-500" />
                        <span>Priority visa processing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-5 text-green-500" />
                        <span>Coordinated travel dates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-5 text-green-500" />
                        <span>Dedicated travel consultant</span>
                      </li>
                    </ul>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] gap-2"
                      onClick={onRequestVisa}
                    >
                      Get Bundle Quote
                      <ArrowRight className="size-5" />
                    </Button>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-6xl md:text-8xl">✈️🎫</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* VISA TAB */}
            <TabsContent value="visa" className="mt-0">
              {/* Visa Services Grid */}
              <div className="mb-12">
                <h2 className="text-3xl mb-8 text-center">Our Visa Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {visaServices.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="p-6 h-full hover:shadow-xl transition-all border-2 hover:border-[#DF6951]/20">
                          <div className="size-14 rounded-xl bg-gradient-to-br from-[#DF6951] to-[#F1A501] p-3 mb-4 flex items-center justify-center">
                            <Icon className="size-full text-white" />
                          </div>
                          <h3 className="mb-2">{service.title}</h3>
                          <p className="text-sm text-foreground/60 mb-4">{service.description}</p>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-foreground/70">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* How It Works */}
              <div className="mb-12 bg-gradient-to-b from-gray-50 to-white py-12 -mx-4 md:-mx-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                      Simple 4-step process to get your visa approved
                    </p>
                  </motion.div>

                  <div className="max-w-4xl mx-auto">
                    {[
                      {
                        step: 1,
                        title: "Submit Request",
                        description: "Fill out our simple visa request form with your travel details",
                        icon: FileText,
                      },
                      {
                        step: 2,
                        title: "Document Collection",
                        description: "We'll provide a personalized checklist of required documents",
                        icon: CheckCircle,
                      },
                      {
                        step: 3,
                        title: "Application Processing",
                        description: "Our experts review and submit your application",
                        icon: Clock,
                      },
                      {
                        step: 4,
                        title: "Visa Approval",
                        description: "Receive your visa and prepare for your destination wedding",
                        icon: Shield,
                      },
                    ].map((processStep, index) => {
                      const Icon = processStep.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex gap-6 mb-8 last:mb-0"
                        >
                          <div className="flex flex-col items-center">
                            <div className="size-16 rounded-full bg-gradient-to-br from-[#DF6951] to-[#F1A501] flex items-center justify-center text-white flex-shrink-0">
                              <Icon className="size-8" />
                            </div>
                            {index < 3 && (
                              <div className="w-0.5 flex-1 bg-gradient-to-b from-[#DF6951] to-[#F1A501] my-2 min-h-[60px]" />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-[#DF6951]/10 text-[#DF6951] border-0">
                                Step {processStep.step}
                              </Badge>
                              <h3>{processStep.title}</h3>
                            </div>
                            <p className="text-foreground/60">{processStep.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Popular Destinations for Visa */}
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl mb-4">Visa Requirements by Country</h2>
                  <p className="text-lg text-foreground/60">
                    Quick overview of visa requirements for popular wedding destinations
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularDestinations.map((destination, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-[#DF6951]/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl">{destination.flag}</span>
                            <div>
                              <h3 className="mb-1">{destination.country}</h3>
                              <Badge className="bg-blue-50 text-blue-600 border-0 text-xs">
                                {destination.visaType}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Processing:</span>
                            <span>{destination.processingTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Validity:</span>
                            <span>{destination.validity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Fee:</span>
                            <span className="text-[#DF6951]">{destination.fee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Documents:</span>
                            <span>{destination.requirements} required</span>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={onRequestVisa}
                        >
                          Apply Now
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Service Packages */}
              <div className="mb-12 bg-gradient-to-b from-gray-50 to-white py-12 -mx-4 md:-mx-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl md:text-4xl mb-4">Service Packages</h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                      Choose the perfect package for your visa needs
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                      {
                        name: "Basic",
                        price: "₹5,999",
                        description: "Essential visa assistance",
                        features: [
                          "Visa eligibility check",
                          "Document checklist",
                          "Form filling assistance",
                          "Email support",
                          "Standard processing time",
                        ],
                        popular: false,
                      },
                      {
                        name: "Premium",
                        price: "₹12,999",
                        description: "Complete visa support",
                        features: [
                          "Everything in Basic",
                          "Document verification",
                          "Application submission",
                          "Priority support",
                          "Fast-track processing",
                          "Interview preparation",
                        ],
                        popular: true,
                      },
                      {
                        name: "VIP",
                        price: "₹24,999",
                        description: "White-glove service",
                        features: [
                          "Everything in Premium",
                          "Dedicated visa consultant",
                          "24/7 phone support",
                          "Same-day appointments",
                          "Document pickup/delivery",
                          "Embassy liaison",
                          "Multiple destination support",
                        ],
                        popular: false,
                      },
                    ].map((plan, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card
                          className={`p-8 h-full flex flex-col ${
                            plan.popular
                              ? "border-2 border-[#DF6951] shadow-xl relative"
                              : "border-2 hover:border-[#DF6951]/20"
                          }`}
                        >
                          {plan.popular && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white border-0">
                              Most Popular
                            </Badge>
                          )}
                          <div className="mb-6">
                            <h3 className="text-2xl mb-2">{plan.name}</h3>
                            <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl text-[#DF6951]">{plan.price}</span>
                              <span className="text-foreground/60">per person</span>
                            </div>
                          </div>

                          <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            className={
                              plan.popular
                                ? "w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                                : "w-full"
                            }
                            variant={plan.popular ? "default" : "outline"}
                            onClick={onRequestVisa}
                          >
                            Get Started
                          </Button>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
                  <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                    Get answers to common visa-related questions
                  </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                  {[
                    {
                      question: "How long does the visa process take?",
                      answer: "Processing times vary by country. Schengen visas typically take 15-20 days, while some countries offer visa on arrival. We recommend applying at least 4-6 weeks before your travel date.",
                    },
                    {
                      question: "What if my visa application is rejected?",
                      answer: "While we maintain a 98% success rate, if your application is rejected, we'll help you understand the reasons and assist with reapplication if possible. Premium and VIP plans include one free reapplication support.",
                    },
                    {
                      question: "Can you handle group visa applications for wedding guests?",
                      answer: "Yes! We specialize in group visa processing for wedding parties. We offer special group rates and coordinated processing to ensure all guests receive their visas on time.",
                    },
                    {
                      question: "Do I need travel insurance for visa application?",
                      answer: "Travel insurance is mandatory for Schengen visa applications and highly recommended for all international travel. We can help you obtain appropriate coverage.",
                    },
                    {
                      question: "What if I need urgent visa processing?",
                      answer: "We offer fast-track and emergency processing services. With our VIP package, we can arrange same-day appointments and expedited processing for urgent cases (subject to embassy availability).",
                    },
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-all">
                        <h3 className="mb-3 flex items-start gap-2">
                          <AlertCircle className="size-5 text-[#DF6951] flex-shrink-0 mt-0.5" />
                          {faq.question}
                        </h3>
                        <p className="text-foreground/70 pl-7">{faq.answer}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Card className="p-8 bg-gradient-to-r from-[#DF6951]/10 to-[#F1A501]/10 border-2 border-[#DF6951]/20 text-center">
                <h2 className="text-3xl mb-4">Ready to Start Your Visa Application?</h2>
                <p className="text-lg text-foreground/70 mb-6 max-w-2xl mx-auto">
                  Our visa experts are here to assist you with all your documentation and application needs
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] gap-2"
                    onClick={onRequestVisa}
                  >
                    Request Visa Assistance
                    <ArrowRight className="size-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Phone className="size-5" />
                    +91 98765 43210
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50 border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "50K+", label: "Flights Booked" },
              { value: "10K+", label: "Visas Processed" },
              { value: "98%", label: "Success Rate" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl text-[#DF6951] mb-2">{stat.value}</div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

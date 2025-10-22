import { useState } from "react";
import { 
  ArrowLeft, ArrowRight, Check, Users, MapPin, Palette, 
  Briefcase, Building2, Plane, FileText, Calendar, DollarSign,
  Heart, Image as ImageIcon, Camera, Video, Music, Sparkles
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Checkbox } from "./ui/checkbox";

interface WeddingBuilderPageProps {
  onExit: () => void;
}

interface WeddingPlan {
  // Step 0: Basics
  guestSize: number;
  weddingType: 'destination' | 'local' | '';
  theme: string;
  budget: number[];
  dates: Date[];
  duration: number;
  
  // Step 1: Destination
  destination: string;
  weatherPreference: string;
  visaRequired: string;
  
  // Step 2: Moodboard
  colorPalette: string[];
  inspirationImages: string[];
  styles: string[];
  
  // Step 3: Vendors
  selectedVendors: {
    planner?: number;
    photographer?: number;
    videographer?: number;
    makeup?: number;
    decorator?: number;
    dj?: number;
  };
  
  // Step 4: Venue
  selectedVenues: number[];
  
  // Step 5: Travel
  guestOrigins: string[];
  
  // Step 6: Visa
  guestNationalities: string[];
}

const steps = [
  { id: 0, name: "Event Basics", icon: Users },
  { id: 1, name: "Destination", icon: MapPin },
  { id: 2, name: "Moodboard", icon: Palette },
  { id: 3, name: "Vendors", icon: Briefcase },
  { id: 4, name: "Venue", icon: Building2 },
  { id: 5, name: "Travel", icon: Plane },
  { id: 6, name: "Visa & Docs", icon: FileText },
];

const themes = [
  "Traditional", "Modern", "Beach", "Royal", "Minimal", "Bohemian", 
  "Rustic", "Garden", "Palace", "Vintage", "Contemporary"
];

const destinations = [
  "Goa, India", "Udaipur, India", "Jaipur, India", "Kerala, India",
  "Bali, Indonesia", "Phuket, Thailand", "Santorini, Greece",
  "Tuscany, Italy", "Dubai, UAE", "Maldives"
];

const colorPalettes = [
  { name: "Rose Gold", colors: ["#B76E79", "#E8B4B8", "#FFFFFF", "#F7E7CE"] },
  { name: "Royal Blue", colors: ["#1E3A8A", "#3B82F6", "#DBEAFE", "#FCD34D"] },
  { name: "Emerald Green", colors: ["#065F46", "#10B981", "#D1FAE5", "#FFFFFF"] },
  { name: "Sunset", colors: ["#F97316", "#FDE047", "#FCA5A5", "#FFFFFF"] },
  { name: "Lavender", colors: ["#7C3AED", "#C4B5FD", "#F3E8FF", "#FFFFFF"] },
  { name: "Blush Pink", colors: ["#DB2777", "#F9A8D4", "#FCE7F3", "#FFFFFF"] },
];

const inspirationImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400",
  "https://images.unsplash.com/photo-1606800052052-c96147d1f0b5?w=400",
  "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=400",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400",
];

export function WeddingBuilderPage({ onExit }: WeddingBuilderPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [weddingPlan, setWeddingPlan] = useState<WeddingPlan>({
    guestSize: 200,
    weddingType: '',
    theme: '',
    budget: [500000],
    dates: [],
    duration: 3,
    destination: '',
    weatherPreference: '',
    visaRequired: '',
    colorPalette: [],
    inspirationImages: [],
    styles: [],
    selectedVendors: {},
    selectedVenues: [],
    guestOrigins: [],
    guestNationalities: [],
  });

  const updatePlan = (updates: Partial<WeddingPlan>) => {
    setWeddingPlan(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-16 md:pt-20">
      <div className="container mx-auto px-3 md:px-6 lg:px-8 py-4 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <Button variant="outline" onClick={onExit} className="gap-2 text-sm md:text-base h-9 md:h-10 px-3 md:px-4">
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Exit Builder</span>
            <span className="sm:hidden">Exit</span>
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center" style={{ fontFamily: 'Volkhov, serif' }}>
            <span className="hidden sm:inline">Wedding Builder</span>
            <span className="sm:hidden">Builder</span>
          </h1>
          <div className="w-16 sm:w-24 md:w-32" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Steps */}
        <Card className="p-3 md:p-6 mb-4 md:mb-8 shadow-lg overflow-x-auto">
          <div className="flex items-center justify-between min-w-max md:min-w-0">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`size-8 md:size-10 lg:size-12 rounded-full flex items-center justify-center mb-1 md:mb-2 transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="size-3 md:size-4 lg:size-6" />
                      ) : (
                        <StepIcon className="size-3 md:size-4 lg:size-6" />
                      )}
                    </div>
                    <p className={`text-[10px] md:text-xs lg:text-sm text-center whitespace-nowrap px-1 ${isCurrent ? 'font-medium' : ''}`}>
                      <span className="hidden md:inline">{step.name}</span>
                      <span className="md:hidden">{step.name.split(' ')[0]}</span>
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 md:h-1 flex-1 mx-1 md:mx-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Step Content */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-4 md:p-6 lg:p-8 shadow-xl min-h-[400px] md:min-h-[600px]">
              {/* Step 0: Event Basics */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Event Basics</h2>
                    <p className="text-muted-foreground">Let's start with the fundamentals of your wedding</p>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="guestSize">Guest Count: {weddingPlan.guestSize}</Label>
                    <Slider
                      id="guestSize"
                      min={50}
                      max={1000}
                      step={10}
                      value={[weddingPlan.guestSize]}
                      onValueChange={(value) => updatePlan({ guestSize: value[0] })}
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {weddingPlan.guestSize < 150 ? 'Intimate' : weddingPlan.guestSize < 300 ? 'Medium' : weddingPlan.guestSize < 500 ? 'Large' : 'Grand'} celebration
                    </p>
                  </div>

                  <div>
                    <Label>Wedding Type</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Card
                        className={`p-6 cursor-pointer transition-all border-2 ${
                          weddingPlan.weddingType === 'destination'
                            ? 'border-[#DF6951] bg-rose-50'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => updatePlan({ weddingType: 'destination' })}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="size-8 text-[#DF6951]" />
                          <div>
                            <h4>Destination Wedding</h4>
                            <p className="text-sm text-muted-foreground">Celebrate at a dream location</p>
                          </div>
                        </div>
                      </Card>
                      <Card
                        className={`p-6 cursor-pointer transition-all border-2 ${
                          weddingPlan.weddingType === 'local'
                            ? 'border-[#DF6951] bg-rose-50'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => updatePlan({ weddingType: 'local' })}
                      >
                        <div className="flex items-center gap-3">
                          <Building2 className="size-8 text-[#DF6951]" />
                          <div>
                            <h4>Local Wedding</h4>
                            <p className="text-sm text-muted-foreground">Close to home celebration</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="theme">Wedding Theme</Label>
                    <Select value={weddingPlan.theme} onValueChange={(value) => updatePlan({ theme: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Budget Range: {formatCurrency(weddingPlan.budget[0])}</Label>
                    <Slider
                      min={100000}
                      max={10000000}
                      step={100000}
                      value={weddingPlan.budget}
                      onValueChange={(value) => updatePlan({ budget: value })}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹1L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">Event Duration (days): {weddingPlan.duration}</Label>
                    <Slider
                      id="duration"
                      min={1}
                      max={7}
                      step={1}
                      value={[weddingPlan.duration]}
                      onValueChange={(value) => updatePlan({ duration: value[0] })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Preferred Wedding Date</Label>
                    <Input type="date" className="mt-2" />
                  </div>
                </div>
              )}

              {/* Step 1: Destination */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Choose Your Destination</h2>
                    <p className="text-muted-foreground">Where do you dream of getting married?</p>
                  </div>

                  <Separator />

                  <div>
                    <Label>Select Destination</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2">
                      {destinations.map((dest) => (
                        <Card
                          key={dest}
                          className={`p-3 md:p-4 cursor-pointer transition-all border-2 ${
                            weddingPlan.destination === dest
                              ? 'border-[#DF6951] bg-rose-50'
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => updatePlan({ destination: dest })}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                            <span className="text-sm md:text-base">{dest}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="weather">Weather Preference</Label>
                    <Select value={weddingPlan.weatherPreference} onValueChange={(value) => updatePlan({ weatherPreference: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select weather preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tropical">Tropical (Hot & Humid)</SelectItem>
                        <SelectItem value="moderate">Moderate (Pleasant)</SelectItem>
                        <SelectItem value="cool">Cool (Comfortable)</SelectItem>
                        <SelectItem value="cold">Cold (Winter)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="visa">Visa Requirements</Label>
                    <Select value={weddingPlan.visaRequired} onValueChange={(value) => updatePlan({ visaRequired: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Do guests need visas?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No visa required</SelectItem>
                        <SelectItem value="some">Some guests need visa</SelectItem>
                        <SelectItem value="all">All guests need visa</SelectItem>
                        <SelectItem value="unknown">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {weddingPlan.destination && (
                    <Card className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-rose-50">
                      <div className="flex items-start gap-3">
                        <Sparkles className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                        <div>
                          <h4 className="mb-1 text-sm md:text-base">Destination Tip</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {weddingPlan.destination} is a popular wedding destination! We have 15+ verified venues and 30+ local vendors ready to help.
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {/* Step 2: Moodboard */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Create Your Moodboard</h2>
                    <p className="text-muted-foreground">Visualize your perfect wedding style</p>
                  </div>

                  <Separator />

                  <div>
                    <Label>Color Palette</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2">
                      {colorPalettes.map((palette) => (
                        <Card
                          key={palette.name}
                          className={`p-3 md:p-4 cursor-pointer transition-all border-2 ${
                            weddingPlan.colorPalette.includes(palette.name)
                              ? 'border-[#DF6951] bg-rose-50'
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => {
                            const current = weddingPlan.colorPalette;
                            updatePlan({
                              colorPalette: current.includes(palette.name)
                                ? current.filter(c => c !== palette.name)
                                : [...current, palette.name]
                            });
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm md:text-base">{palette.name}</span>
                            {weddingPlan.colorPalette.includes(palette.name) && (
                              <Check className="size-4 md:size-5 text-[#DF6951]" />
                            )}
                          </div>
                          <div className="flex gap-1.5 md:gap-2">
                            {palette.colors.map((color, idx) => (
                              <div
                                key={idx}
                                className="size-6 md:size-8 rounded-full border-2 border-white shadow"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Inspiration Images</Label>
                    <p className="text-sm text-muted-foreground mb-2">Select images that inspire your wedding style</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                      {inspirationImages.map((img, idx) => (
                        <div
                          key={idx}
                          className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 md:border-4 transition-all ${
                            weddingPlan.inspirationImages.includes(img)
                              ? 'border-[#DF6951]'
                              : 'border-transparent hover:border-gray-300'
                          }`}
                          onClick={() => {
                            const current = weddingPlan.inspirationImages;
                            updatePlan({
                              inspirationImages: current.includes(img)
                                ? current.filter(i => i !== img)
                                : [...current, img]
                            });
                          }}
                        >
                          <ImageWithFallback
                            src={img}
                            alt={`Inspiration ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {weddingPlan.inspirationImages.includes(img) && (
                            <div className="absolute inset-0 bg-[#DF6951]/20 flex items-center justify-center">
                              <Check className="size-6 md:size-8 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Style Preferences</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Mandap Decor', 'Photo Booth', 'Floral Ceiling', 'String Lights', 'Vintage Props', 'LED Walls'].map((style) => (
                        <Badge
                          key={style}
                          variant={weddingPlan.styles.includes(style) ? "default" : "outline"}
                          className={`cursor-pointer px-4 py-2 ${
                            weddingPlan.styles.includes(style)
                              ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501]'
                              : ''
                          }`}
                          onClick={() => {
                            const current = weddingPlan.styles;
                            updatePlan({
                              styles: current.includes(style)
                                ? current.filter(s => s !== style)
                                : [...current, style]
                            });
                          }}
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Vendors */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Select Your Vendors</h2>
                    <p className="text-muted-foreground">Choose professionals to bring your vision to life</p>
                  </div>

                  <Separator />

                  <div className="space-y-3 md:space-y-4">
                    {[
                      { name: 'Wedding Planner', icon: Briefcase, key: 'planner' },
                      { name: 'Photographer', icon: Camera, key: 'photographer' },
                      { name: 'Videographer', icon: Video, key: 'videographer' },
                      { name: 'Makeup Artist', icon: Sparkles, key: 'makeup' },
                      { name: 'Decorator', icon: Palette, key: 'decorator' },
                      { name: 'DJ / Entertainment', icon: Music, key: 'dj' },
                    ].map((vendor) => {
                      const VendorIcon = vendor.icon;
                      return (
                        <Card key={vendor.key} className="p-4 md:p-6 hover:shadow-lg transition-all">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 md:gap-4">
                              <div className="p-2 md:p-3 bg-rose-50 rounded-lg">
                                <VendorIcon className="size-5 md:size-6 text-[#DF6951]" />
                              </div>
                              <div>
                                <h4 className="text-sm md:text-base">{vendor.name}</h4>
                                <p className="text-xs md:text-sm text-muted-foreground">Browse verified professionals</p>
                              </div>
                            </div>
                            <Button className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] w-full sm:w-auto h-9 md:h-10 text-sm md:text-base">
                              Browse
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="flex items-start gap-3">
                      <Heart className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                      <div>
                        <h4 className="mb-1 text-sm md:text-base">Pro Tip</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          You can browse and shortlist vendors now, then request quotes later. All your favorites will be saved in your wedding plan.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Step 4: Venue */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Choose Your Venue</h2>
                    <p className="text-muted-foreground">Find the perfect location for your celebration</p>
                  </div>

                  <Separator />

                  <div>
                    <Label>Venue Capacity</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Based on your guest count ({weddingPlan.guestSize} guests)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                      {[
                        { name: 'Intimate (50-150)', capacity: 150 },
                        { name: 'Medium (150-300)', capacity: 300 },
                        { name: 'Large (300-500)', capacity: 500 },
                        { name: 'Grand (500+)', capacity: 1000 },
                      ].map((option) => (
                        <Card
                          key={option.name}
                          className={`p-3 md:p-4 cursor-pointer transition-all border-2 ${
                            weddingPlan.guestSize <= option.capacity
                              ? 'border-[#DF6951] bg-rose-50'
                              : 'opacity-50'
                          }`}
                        >
                          <Building2 className="size-5 md:size-6 text-[#DF6951] mb-2" />
                          <span className="text-sm md:text-base">{option.name}</span>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Venue Type</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Indoor', 'Outdoor', 'Banquet Hall', 'Beach', 'Garden', 'Palace', 'Resort'].map((type) => (
                        <Badge
                          key={type}
                          variant="outline"
                          className="cursor-pointer px-4 py-2 hover:bg-rose-50 hover:border-[#DF6951]"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]">
                    Browse {weddingPlan.destination || 'All'} Venues
                  </Button>

                  <Card className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                    <div className="flex items-start gap-3">
                      <Building2 className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                      <div>
                        <h4 className="mb-1 text-sm md:text-base">Venue Recommendations</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Based on your preferences, we found 12 venues in {weddingPlan.destination || 'your selected destination'} that can accommodate {weddingPlan.guestSize} guests.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Step 5: Travel */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Travel Arrangements</h2>
                    <p className="text-muted-foreground">Plan travel for your guests</p>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="guestOrigins">Guest Origin Cities</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Where are most of your guests traveling from?
                    </p>
                    <Textarea
                      id="guestOrigins"
                      placeholder="e.g., Mumbai, Delhi, Bangalore..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Group Travel</Label>
                    <Card className="p-4 md:p-6 mt-2">
                      <div className="flex items-start gap-3 md:gap-4">
                        <Plane className="size-6 md:size-8 text-[#DF6951] flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="mb-1 text-sm md:text-base">Flight Coordination</h4>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                            We can help coordinate group bookings and find the best deals for your guests
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs md:text-sm">
                            <div className="flex items-center gap-2">
                              <Checkbox id="group-booking" />
                              <label htmlFor="group-booking">Group booking assistance</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="airport-pickup" />
                              <label htmlFor="airport-pickup">Airport pickup</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div>
                    <Label>Accommodation</Label>
                    <Card className="p-4 md:p-6 mt-2">
                      <div className="flex items-start gap-3 md:gap-4">
                        <Building2 className="size-6 md:size-8 text-[#DF6951] flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="mb-1 text-sm md:text-base">Guest Accommodation</h4>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                            Book rooms at nearby hotels or resorts for your guests
                          </p>
                          <Button variant="outline" className="w-full h-9 md:h-10 text-sm md:text-base">
                            View Nearby Hotels
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Step 6: Visa */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2">Visa & Documentation</h2>
                    <p className="text-muted-foreground">Ensure smooth travel for all guests</p>
                  </div>

                  <Separator />

                  {weddingPlan.visaRequired !== 'none' && (
                    <>
                      <div>
                        <Label htmlFor="nationalities">Guest Nationalities</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          List the countries your guests are traveling from
                        </p>
                        <Textarea
                          id="nationalities"
                          placeholder="e.g., India, USA, UK, Australia..."
                          className="mt-2"
                          rows={3}
                        />
                      </div>

                      <Card className="p-4 md:p-6 bg-blue-50">
                        <div className="flex items-start gap-3 md:gap-4">
                          <FileText className="size-6 md:size-8 text-blue-600 flex-shrink-0" />
                          <div>
                            <h4 className="mb-2 md:mb-3 text-sm md:text-base">Visa Requirements</h4>
                            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                              <div className="flex items-start gap-2">
                                <Check className="size-3 md:size-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">Tourist Visa Required</p>
                                  <p className="text-muted-foreground">Processing time: 7-10 days</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="size-3 md:size-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">Required Documents</p>
                                  <p className="text-muted-foreground">Passport, photos, invitation letter</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="size-3 md:size-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">Embassy Contact</p>
                                  <p className="text-muted-foreground">Available for assistance</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Button variant="outline" className="w-full h-9 md:h-10 text-sm md:text-base">
                        <FileText className="size-4 mr-2" />
                        Download Visa Checklist
                      </Button>
                    </>
                  )}

                  {weddingPlan.visaRequired === 'none' && (
                    <Card className="p-6 md:p-8 text-center bg-green-50">
                      <Check className="size-10 md:size-12 text-green-600 mx-auto mb-2 md:mb-3" />
                      <h3 className="mb-2 text-base md:text-lg">No Visa Required!</h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Great news! Your guests won't need visas for this destination.
                      </p>
                    </Card>
                  )}

                  <Card className="p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-start gap-3">
                      <Sparkles className="size-5 md:size-6 text-[#DF6951] flex-shrink-0" />
                      <div>
                        <h4 className="mb-1 text-sm md:text-base">Concierge Service</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Our premium concierge service can handle all visa applications and travel documentation for your guests.
                        </p>
                        <Button className="mt-3 bg-gradient-to-r from-[#DF6951] to-[#F1A501] h-9 md:h-10 text-sm md:text-base">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:block">
            <Card className="p-4 md:p-6 lg:sticky lg:top-24">
              <h3 className="mb-3 md:mb-4">Your Wedding Plan</h3>
              <Separator className="mb-3 md:mb-4" />
              
              <div className="space-y-3 md:space-y-4 text-sm">
                {weddingPlan.guestSize > 0 && (
                  <div>
                    <p className="text-muted-foreground">Guest Count</p>
                    <p className="font-medium">{weddingPlan.guestSize} guests</p>
                  </div>
                )}

                {weddingPlan.weddingType && (
                  <div>
                    <p className="text-muted-foreground">Wedding Type</p>
                    <p className="font-medium capitalize">{weddingPlan.weddingType}</p>
                  </div>
                )}

                {weddingPlan.theme && (
                  <div>
                    <p className="text-muted-foreground">Theme</p>
                    <p className="font-medium">{weddingPlan.theme}</p>
                  </div>
                )}

                {weddingPlan.budget[0] > 0 && (
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium">{formatCurrency(weddingPlan.budget[0])}</p>
                  </div>
                )}

                {weddingPlan.destination && (
                  <div>
                    <p className="text-muted-foreground">Destination</p>
                    <p className="font-medium">{weddingPlan.destination}</p>
                  </div>
                )}

                {weddingPlan.colorPalette.length > 0 && (
                  <div>
                    <p className="text-muted-foreground">Colors</p>
                    <p className="font-medium">{weddingPlan.colorPalette.join(', ')}</p>
                  </div>
                )}

                {weddingPlan.inspirationImages.length > 0 && (
                  <div>
                    <p className="text-muted-foreground">Inspiration Images</p>
                    <p className="font-medium">{weddingPlan.inspirationImages.length} selected</p>
                  </div>
                )}
              </div>

              <Separator className="my-3 md:my-4" />

              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] h-9 md:h-10 text-sm md:text-base">
                  Save Progress
                </Button>
                <Button variant="outline" className="w-full h-9 md:h-10 text-sm md:text-base">
                  Download Plan PDF
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3 mt-6 md:mt-8 pb-6 md:pb-0">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-2 h-10 md:h-11 px-4 md:px-6 text-sm md:text-base flex-1 sm:flex-initial"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              className="gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501] h-10 md:h-11 px-4 md:px-6 text-sm md:text-base flex-1 sm:flex-initial"
            >
              <span className="hidden sm:inline">Next Step</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 h-10 md:h-11 px-4 md:px-6 text-sm md:text-base flex-1 sm:flex-initial">
              <span className="hidden sm:inline">Complete Plan</span>
              <span className="sm:hidden">Complete</span>
              <Check className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

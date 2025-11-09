import { useState } from "react";
import {
  Download,
  Share2,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Palette,
  Briefcase,
  Building2,
  Plane,
  FileText,
  Copy,
  Check,
  Edit,
  PartyPopper,
  Star,
  Camera,
  Video,
  Sparkles,
  Music,
  MapPinIcon,
  Award,
  Mail,
  X,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface SavedWeddingPlan {
  // Step 0: Basics
  guestSize: number;
  weddingType: 'destination' | 'local' | '';
  theme: string;
  budget: number[];
  dates: string[];
  duration: number;
  
  // Step 1: Destination
  destination: string;
  weatherPreference: string;
  visaRequired: string;
  
  // Step 2: Moodboard
  colorPalette: string[];
  inspirationImages: string[];
  selectedInspirations: number[];
  styles: string[];
  
  // Step 3: Vendors
  selectedVendors: {
    planner?: any;
    photographer?: any;
    videographer?: any;
    makeup?: any;
    decorator?: any;
    dj?: any;
  };
  
  // Step 4: Venue
  selectedVenues: any[];
  
  // Step 5: Travel
  guestOrigins: string[];
  
  // Step 6: Visa
  guestNationalities: string[];
  
  // Metadata
  eventName?: string;
  weddingDate?: string;
  savedAt?: string;
}

interface SavedWeddingPlanViewProps {
  onEdit?: () => void;
}

export function SavedWeddingPlanView({ onEdit }: SavedWeddingPlanViewProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Load wedding plan from localStorage
  const loadWeddingPlan = (): SavedWeddingPlan | null => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('wedzway_wedding_plan');
    return saved ? JSON.parse(saved) : null;
  };

  const plan = loadWeddingPlan();

  if (!plan) {
    return (
      <Card className="p-12 text-center">
        <PartyPopper className="size-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
          No Wedding Plan Yet
        </h3>
        <p className="text-muted-foreground mb-6">
          Start planning your dream wedding with our interactive builder
        </p>
        {onEdit && (
          <Button 
            className="gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
            onClick={onEdit}
          >
            <Sparkles className="size-4" />
            Create Wedding Plan
          </Button>
        )}
      </Card>
    );
  }

  const handlePrint = () => {
    window.print();
    toast.success("Opening print dialog...");
  };

  const handleCopyLink = () => {
    const shareableLink = `${window.location.origin}/wedding/${Date.now()}`;
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (shareEmail) {
      // Simulate sending email
      toast.success(`Wedding plan shared with ${shareEmail}!`);
      setShareEmail("");
      setShareDialogOpen(false);
    }
  };

  const formatBudget = (budget: number[]) => {
    if (!budget || budget.length === 0) return "Not set";
    return `₹${(budget[0] / 100000).toFixed(1)}L`;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-[#DF6951]/10 to-[#F1A501]/10 border-2 border-[#DF6951]/20 print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
              {plan.eventName || "Your Wedding Plan"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Created on {plan.savedAt || new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {onEdit && (
              <Button
                variant="outline"
                className="gap-2 flex-1 sm:flex-initial"
                onClick={onEdit}
              >
                <Edit className="size-4" />
                <span>Edit Plan</span>
              </Button>
            )}
            <Button
              variant="outline"
              className="gap-2 flex-1 sm:flex-initial"
              onClick={() => setShareDialogOpen(true)}
            >
              <Share2 className="size-4" />
              <span>Share</span>
            </Button>
            <Button
              className="gap-2 bg-[#DF6951] hover:bg-[#c5573d] flex-1 sm:flex-initial"
              onClick={handlePrint}
            >
              <Download className="size-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Plan Overview */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl mb-3" style={{ fontFamily: "Volkhov, serif" }}>
              Event Overview
            </h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              {plan.weddingType && (
                <Badge className="bg-[#DF6951]">
                  <PartyPopper className="size-3 mr-1" />
                  {plan.weddingType === "destination" ? "Destination Wedding" : "Local Wedding"}
                </Badge>
              )}
              {plan.theme && (
                <Badge variant="outline">{plan.theme}</Badge>
              )}
              {plan.guestSize && (
                <Badge variant="outline">
                  <Users className="size-3 mr-1" />
                  {plan.guestSize} Guests
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
              {plan.weddingDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-[#DF6951] shrink-0" />
                  <span className="truncate">{plan.weddingDate}</span>
                </div>
              )}
              {plan.destination && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#DF6951] shrink-0" />
                  <span className="truncate">{plan.destination}</span>
                </div>
              )}
              {plan.budget && plan.budget.length > 0 && (
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4 text-[#DF6951] shrink-0" />
                  <span>{formatBudget(plan.budget)} Budget</span>
                </div>
              )}
              {plan.duration && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-[#DF6951] shrink-0" />
                  <span>{plan.duration} Day{plan.duration > 1 ? 's' : ''} Event</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Selected Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Destination Details */}
        {plan.destination && (
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Volkhov, serif" }}>
              <MapPin className="size-5 text-[#DF6951]" />
              Destination
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-semibold">{plan.destination}</p>
              </div>
              {plan.weatherPreference && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Weather Preference</p>
                  <p>{plan.weatherPreference}</p>
                </div>
              )}
              {plan.visaRequired && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Visa Required</p>
                  <p>{plan.visaRequired}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Moodboard */}
        {(plan.colorPalette?.length > 0 || plan.styles?.length > 0) && (
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Volkhov, serif" }}>
              <Palette className="size-5 text-[#DF6951]" />
              Moodboard
            </h3>
            <div className="space-y-4">
              {plan.colorPalette && plan.colorPalette.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Color Palette</p>
                  <div className="flex gap-2 flex-wrap">
                    {plan.colorPalette.map((color, idx) => (
                      <div
                        key={idx}
                        className="size-8 sm:size-10 rounded-full border-2 border-gray-200 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
              {plan.styles && plan.styles.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Styles</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.styles.map((style, idx) => (
                      <Badge key={idx} variant="secondary">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Venues */}
        {plan.selectedVenues && plan.selectedVenues.length > 0 && (
          <Card className="p-4 sm:p-6 md:col-span-2">
            <h3 className="text-lg sm:text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Volkhov, serif" }}>
              <Building2 className="size-5 text-[#DF6951]" />
              Selected Venues
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plan.selectedVenues.map((venue, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow">
                  {venue.image && (
                    <div className="aspect-[4/3] relative">
                      <ImageWithFallback
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">{venue.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPinIcon className="size-3" />
                      <span className="truncate">{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span>{venue.rating}</span>
                      </div>
                      {venue.capacity && (
                        <div className="flex items-center gap-1">
                          <Users className="size-3" />
                          <span>{venue.capacity} guests</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Vendors */}
        {plan.selectedVendors && Object.keys(plan.selectedVendors).some(key => plan.selectedVendors[key as keyof typeof plan.selectedVendors]) && (
          <Card className="p-4 sm:p-6 md:col-span-2">
            <h3 className="text-lg sm:text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Volkhov, serif" }}>
              <Briefcase className="size-5 text-[#DF6951]" />
              Selected Vendors
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(plan.selectedVendors).map(([type, vendor]) => {
                if (!vendor) return null;
                
                const icons: { [key: string]: any } = {
                  planner: Briefcase,
                  photographer: Camera,
                  videographer: Video,
                  makeup: Sparkles,
                  decorator: Palette,
                  dj: Music,
                };
                
                const VendorIcon = icons[type] || Briefcase;
                
                return (
                  <Card key={type} className="overflow-hidden hover:shadow-md transition-shadow">
                    {vendor.image && (
                      <div className="aspect-[4/3] relative">
                        <ImageWithFallback
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <VendorIcon className="size-4 text-[#DF6951]" />
                        <Badge variant="outline" className="text-xs capitalize">
                          {type}
                        </Badge>
                      </div>
                      <h4 className="font-semibold mb-1">{vendor.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPinIcon className="size-3" />
                        <span className="truncate">{vendor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          <span>{vendor.rating}</span>
                        </div>
                        {vendor.verified && (
                          <Badge className="bg-blue-600 text-xs">
                            <Award className="size-2 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        )}

        {/* Guest Information */}
        {(plan.guestOrigins?.length > 0 || plan.guestNationalities?.length > 0) && (
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Volkhov, serif" }}>
              <Users className="size-5 text-[#DF6951]" />
              Guest Information
            </h3>
            <div className="space-y-4">
              {plan.guestSize && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Guests</p>
                  <p className="text-2xl font-semibold text-[#DF6951]">{plan.guestSize}</p>
                </div>
              )}
              {plan.guestOrigins && plan.guestOrigins.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Guest Origins</p>
                  <div className="space-y-1">
                    {plan.guestOrigins.map((origin, idx) => (
                      <p key={idx} className="text-sm flex items-center gap-2">
                        <Plane className="size-3 text-muted-foreground" />
                        {origin}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {plan.guestNationalities && plan.guestNationalities.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Guest Nationalities</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.guestNationalities.map((nationality, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {nationality}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "Volkhov, serif" }}>
              Share Wedding Plan
            </DialogTitle>
            <DialogDescription>
              Share your wedding plan with family, friends, or vendors
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Copy Link */}
            <div>
              <Label htmlFor="link" className="mb-2 block">Shareable Link</Label>
              <div className="flex gap-2">
                <Input
                  id="link"
                  readOnly
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/wedding/${Date.now()}`}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="gap-2 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Email Share */}
            <div>
              <Label htmlFor="email" className="mb-2 block">Send via Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="guest@example.com"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={handleShare}
                  className="gap-2 bg-[#DF6951] hover:bg-[#c5573d] shrink-0"
                  disabled={!shareEmail}
                >
                  <Mail className="size-4" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          .space-y-6 * {
            visibility: visible;
          }
          .space-y-6 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}

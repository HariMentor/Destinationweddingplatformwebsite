import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  Hotel,
  Plane,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  X,
  Edit,
  Users,
  MessageCircle,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ScheduleItem {
  time: string;
  event: string;
  icon: string;
}

interface WeddingPageData {
  coupleName: string;
  eventName: string;
  date: string;
  time: string;
  destination: string;
  venue: string;
  venueAddress: string;
  message: string;
  headerImage: string;
  venueImage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  schedule: ScheduleItem[];
  accommodationName: string;
  accommodationDescription: string;
  accommodationBookingInfo: string;
  travelAirport: string;
  travelDistance: string;
  travelTransportation: string;
  contactEmail: string;
  contactPhone: string;
}

interface WeddingPageEditorProps {
  onSave: (data: WeddingPageData) => void;
  onCancel: () => void;
  initialData?: WeddingPageData;
}

const iconOptions = [
  { value: "Users", label: "People", component: Users },
  { value: "Heart", label: "Heart", component: Heart },
  { value: "MessageCircle", label: "Chat", component: MessageCircle },
  { value: "Clock", label: "Clock", component: Clock },
];

const defaultData: WeddingPageData = {
  coupleName: "Sarah & Michael",
  eventName: "A Tuscan Love Story",
  date: "June 15, 2025",
  time: "4:00 PM",
  destination: "Tuscany, Italy",
  venue: "Villa Bellissima",
  venueAddress: "Via della Villa 123, 50022 Greve in Chianti, Florence, Italy",
  message: "Join us for a magical celebration of love in the heart of Tuscany. Your presence would mean the world to us as we begin our forever together.",
  headerImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200",
  venueImage: "https://images.unsplash.com/photo-1698616596895-71e43af05b70?w=800",
  primaryColor: "#B76E79",
  secondaryColor: "#E8B4B8",
  accentColor: "#F7E7CE",
  schedule: [
    { time: "3:30 PM", event: "Guest Arrival & Welcome Drinks", icon: "Users" },
    { time: "4:00 PM", event: "Ceremony Begins", icon: "Heart" },
    { time: "5:00 PM", event: "Cocktail Hour", icon: "MessageCircle" },
    { time: "6:30 PM", event: "Reception & Dinner", icon: "Users" },
    { time: "9:00 PM", event: "Dancing & Celebration", icon: "Heart" },
  ],
  accommodationName: "Villa Bellissima Guest Rooms + Hotel Toscana",
  accommodationDescription: "We have reserved rooms at the villa and nearby Hotel Toscana for our guests.",
  accommodationBookingInfo: "Please mention 'Sarah & Michael Wedding' when booking.",
  travelAirport: "Florence Airport (FLR)",
  travelDistance: "45 minutes from venue",
  travelTransportation: "Shuttle service will be provided from major hotels.",
  contactEmail: "sarah.michael@email.com",
  contactPhone: "+1 (555) 123-4567",
};

export function WeddingPageEditor({ onSave, onCancel, initialData }: WeddingPageEditorProps) {
  const [formData, setFormData] = useState<WeddingPageData>(initialData || defaultData);
  const [showImageUrlDialog, setShowImageUrlDialog] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageUrlType, setImageUrlType] = useState<"header" | "venue">("header");

  const updateField = (field: keyof WeddingPageData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const addScheduleItem = () => {
    setFormData({
      ...formData,
      schedule: [
        ...formData.schedule,
        { time: "", event: "", icon: "Users" },
      ],
    });
  };

  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setFormData({ ...formData, schedule: newSchedule });
  };

  const removeScheduleItem = (index: number) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index),
    });
  };

  const handleImageUrlSubmit = () => {
    if (imageUrlInput.trim()) {
      if (imageUrlType === "header") {
        updateField("headerImage", imageUrlInput.trim());
      } else {
        updateField("venueImage", imageUrlInput.trim());
      }
      setImageUrlInput("");
      setShowImageUrlDialog(false);
      toast.success("Image URL updated!");
    }
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.coupleName || !formData.venue || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSave(formData);
    toast.success("Wedding page updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
              Edit Wedding Page
            </h1>
            <p className="text-muted-foreground">
              Customize your wedding invitation page
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="gap-2">
              <X className="size-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#DF6951] hover:bg-[#c5573d] gap-2">
              <Save className="size-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="travel">Travel & Stay</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                Wedding Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coupleName">Couple Names *</Label>
                  <Input
                    id="coupleName"
                    value={formData.coupleName}
                    onChange={(e) => updateField("coupleName", e.target.value)}
                    placeholder="e.g., Sarah & Michael"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input
                    id="eventName"
                    value={formData.eventName}
                    onChange={(e) => updateField("eventName", e.target.value)}
                    placeholder="e.g., A Tuscan Love Story"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Wedding Date *</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    placeholder="e.g., June 15, 2025"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    placeholder="e.g., 4:00 PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => updateField("destination", e.target.value)}
                    placeholder="e.g., Tuscany, Italy"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue Name *</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => updateField("venue", e.target.value)}
                    placeholder="e.g., Villa Bellissima"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="venueAddress">Venue Address</Label>
                  <Input
                    id="venueAddress"
                    value={formData.venueAddress}
                    onChange={(e) => updateField("venueAddress", e.target.value)}
                    placeholder="Full venue address"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message">Welcome Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder="Your personal message to guests"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => updateField("contactEmail", e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => updateField("contactPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Images */}
          <TabsContent value="images" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                Page Images
              </h3>
              <div className="space-y-6">
                {/* Header Image */}
                <div>
                  <Label className="mb-2 block">Header Background Image</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="aspect-video rounded-lg overflow-hidden border">
                      <ImageWithFallback
                        src={formData.headerImage}
                        alt="Header"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Current URL: <span className="text-xs break-all">{formData.headerImage}</span>
                      </p>
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          setImageUrlType("header");
                          setImageUrlInput(formData.headerImage);
                          setShowImageUrlDialog(true);
                        }}
                      >
                        <ImageIcon className="size-4" />
                        Change Header Image
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Venue Image */}
                <div>
                  <Label className="mb-2 block">Venue Image</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="aspect-video rounded-lg overflow-hidden border">
                      <ImageWithFallback
                        src={formData.venueImage}
                        alt="Venue"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Current URL: <span className="text-xs break-all">{formData.venueImage}</span>
                      </p>
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          setImageUrlType("venue");
                          setImageUrlInput(formData.venueImage);
                          setShowImageUrlDialog(true);
                        }}
                      >
                        <ImageIcon className="size-4" />
                        Change Venue Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Event Schedule */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
                  Event Schedule
                </h3>
                <Button onClick={addScheduleItem} size="sm" className="gap-2">
                  <Plus className="size-4" />
                  Add Event
                </Button>
              </div>
              <div className="space-y-4">
                {formData.schedule.map((item, index) => (
                  <Card key={index} className="p-4 bg-gray-50">
                    <div className="grid md:grid-cols-4 gap-4 items-end">
                      <div className="space-y-2">
                        <Label htmlFor={`time-${index}`}>Time</Label>
                        <Input
                          id={`time-${index}`}
                          value={item.time}
                          onChange={(e) => updateScheduleItem(index, "time", e.target.value)}
                          placeholder="e.g., 4:00 PM"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`event-${index}`}>Event</Label>
                        <Input
                          id={`event-${index}`}
                          value={item.event}
                          onChange={(e) => updateScheduleItem(index, "event", e.target.value)}
                          placeholder="Event description"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`icon-${index}`}>Icon</Label>
                        <div className="flex gap-2">
                          <select
                            id={`icon-${index}`}
                            value={item.icon}
                            onChange={(e) => updateScheduleItem(index, "icon", e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {iconOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeScheduleItem(index)}
                            className="shrink-0"
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {formData.schedule.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No schedule items added yet. Click "Add Event" to get started.
                  </p>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Travel & Accommodation */}
          <TabsContent value="travel" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                <Plane className="size-5 inline mr-2 text-[#DF6951]" />
                Travel Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="airport">Nearest Airport</Label>
                  <Input
                    id="airport"
                    value={formData.travelAirport}
                    onChange={(e) => updateField("travelAirport", e.target.value)}
                    placeholder="e.g., Florence Airport (FLR)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance from Venue</Label>
                  <Input
                    id="distance"
                    value={formData.travelDistance}
                    onChange={(e) => updateField("travelDistance", e.target.value)}
                    placeholder="e.g., 45 minutes from venue"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="transportation">Transportation Details</Label>
                  <Textarea
                    id="transportation"
                    value={formData.travelTransportation}
                    onChange={(e) => updateField("travelTransportation", e.target.value)}
                    placeholder="Information about shuttles, car rentals, etc."
                    rows={2}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                <Hotel className="size-5 inline mr-2 text-[#DF6951]" />
                Accommodation
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="accomName">Hotel/Accommodation Name</Label>
                  <Input
                    id="accomName"
                    value={formData.accommodationName}
                    onChange={(e) => updateField("accommodationName", e.target.value)}
                    placeholder="e.g., Hotel Toscana"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accomDesc">Description</Label>
                  <Textarea
                    id="accomDesc"
                    value={formData.accommodationDescription}
                    onChange={(e) => updateField("accommodationDescription", e.target.value)}
                    placeholder="Brief description of accommodation options"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accomBooking">Booking Information</Label>
                  <Input
                    id="accomBooking"
                    value={formData.accommodationBookingInfo}
                    onChange={(e) => updateField("accommodationBookingInfo", e.target.value)}
                    placeholder="e.g., Please mention 'Sarah & Michael Wedding' when booking"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Colors */}
          <TabsContent value="colors" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
                Color Palette
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Customize the color scheme of your wedding page
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-3">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateField("primaryColor", e.target.value)}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => updateField("primaryColor", e.target.value)}
                      placeholder="#B76E79"
                    />
                  </div>
                  <div
                    className="h-20 rounded-lg border"
                    style={{ backgroundColor: formData.primaryColor }}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-3">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField("secondaryColor", e.target.value)}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => updateField("secondaryColor", e.target.value)}
                      placeholder="#E8B4B8"
                    />
                  </div>
                  <div
                    className="h-20 rounded-lg border"
                    style={{ backgroundColor: formData.secondaryColor }}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-3">
                    <Input
                      id="accentColor"
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => updateField("accentColor", e.target.value)}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      value={formData.accentColor}
                      onChange={(e) => updateField("accentColor", e.target.value)}
                      placeholder="#F7E7CE"
                    />
                  </div>
                  <div
                    className="h-20 rounded-lg border"
                    style={{ backgroundColor: formData.accentColor }}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Image URL Dialog */}
        <Dialog open={showImageUrlDialog} onOpenChange={setShowImageUrlDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Change {imageUrlType === "header" ? "Header" : "Venue"} Image
              </DialogTitle>
              <DialogDescription>
                Enter the URL of the image you want to use
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {imageUrlInput && (
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <ImageWithFallback
                    src={imageUrlInput}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowImageUrlDialog(false);
                  setImageUrlInput("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleImageUrlSubmit}
                className="bg-[#DF6951] hover:bg-[#c5573d]"
              >
                Update Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

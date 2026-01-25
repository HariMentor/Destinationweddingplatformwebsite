"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  Upload,
  X,
  Edit2,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

interface PlannerProfileEditPageProps {
  plannerId: number;
  onBack: () => void;
  onPreview: () => void;
}

export function PlannerProfileEditPage({
  plannerId,
  onBack,
  onPreview,
}: PlannerProfileEditPageProps) {
  const [activeSection, setActiveSection] = useState<string | null>("basic");
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isAddPackageDialogOpen, setIsAddPackageDialogOpen] = useState(false);
  const [isAddWeddingDialogOpen, setIsAddWeddingDialogOpen] = useState(false);
  const [isAddInspirationDialogOpen, setIsAddInspirationDialogOpen] =
    useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [editingWedding, setEditingWedding] = useState<any>(null);
  const [editingInspiration, setEditingInspiration] = useState<any>(null);

  // Form state
  const [profileData, setProfileData] = useState({
    name: "Elegant Affairs By Priya",
    tagline: "Crafting Timeless Wedding Memories",
    description:
      "With over 12 years of experience in creating unforgettable wedding celebrations, Elegant Affairs specializes in transforming your dreams into reality. We believe every couple has a unique story, and we're here to tell it through extraordinary design, meticulous planning, and flawless execution.",
    location: "Mumbai, India",
    experience: "12+ Years",
    startingPrice: "₹2,50,000",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
    responseTime: "Within 2 hours",
    languages: ["English", "Hindi", "Marathi"],
  });

  const [gallery, setGallery] = useState([
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
  ]);

  const [highlights, setHighlights] = useState([
    "Award Winning",
    "Detail Oriented",
    "Trusted Partner",
    "Creative Design",
    "Vendor Network",
    "Full Support",
    "Destination Expert",
  ]);

  const [services, setServices] = useState([
    {
      id: 1,
      category: "Planning & Coordination",
      items: [
        "Full Wedding Planning",
        "Day-of Coordination",
        "Month-of Coordination",
        "Timeline Creation",
      ],
    },
    {
      id: 2,
      category: "Design & Styling",
      items: [
        "Theme Development",
        "Decor Design",
        "Mood Boards",
        "Color Palettes",
      ],
    },
  ]);

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Basic",
      price: "₹2,50,000",
      popular: false,
      features: [
        "Up to 200 guests",
        "Venue coordination",
        "2 planning meetings",
        "Day-of coordination",
      ],
    },
    {
      id: 2,
      name: "Premium",
      price: "₹5,00,000",
      popular: true,
      features: [
        "Up to 400 guests",
        "Full planning service",
        "Unlimited meetings",
        "Custom theme design",
      ],
    },
  ]);

  const [realWeddings, setRealWeddings] = useState([
    {
      id: 1,
      couple: "Priya & Dev",
      location: "Udaipur, Rajasthan",
      date: "March 2024",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
      theme: "Royal Palace Wedding",
      guests: 350,
      description:
        "A majestic three-day celebration at a heritage palace overlooking Lake Pichola.",
    },
  ]);

  const [inspirations, setInspirations] = useState([
    {
      id: 1,
      title: "Romantic Garden Romance",
      description: "Soft pastels, floral arches, and enchanted garden vibes",
      theme: "Garden Wedding",
      imageCount: 12,
      coverImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
      ],
    },
  ]);

  const [destinations, setDestinations] = useState([
    "Goa",
    "Udaipur",
    "Jaipur",
    "Bali",
    "Tuscany",
    "Santorini",
  ]);

  // Service form
  const [serviceForm, setServiceForm] = useState({
    category: "",
    items: [""],
  });

  // Package form
  const [packageForm, setPackageForm] = useState({
    name: "",
    price: "",
    popular: false,
    features: [""],
  });

  // Wedding form
  const [weddingForm, setWeddingForm] = useState({
    couple: "",
    location: "",
    date: "",
    image: "",
    theme: "",
    guests: "",
    description: "",
  });

  // Inspiration form
  const [inspirationForm, setInspirationForm] = useState({
    title: "",
    description: "",
    theme: "",
    imageCount: "",
    coverImage: "",
    images: [""],
  });

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  // Service CRUD
  const handleAddService = () => {
    if (!serviceForm.category.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const filteredItems = serviceForm.items.filter((item) => item.trim());
    if (filteredItems.length === 0) {
      toast.error("Please add at least one service item");
      return;
    }

    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? { ...s, category: serviceForm.category, items: filteredItems }
            : s
        )
      );
      toast.success("Service updated successfully!");
    } else {
      setServices([
        ...services,
        {
          id: Date.now(),
          category: serviceForm.category,
          items: filteredItems,
        },
      ]);
      toast.success("Service added successfully!");
    }

    setServiceForm({ category: "", items: [""] });
    setEditingService(null);
    setIsAddServiceDialogOpen(false);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
    toast.success("Service deleted successfully!");
  };

  // Package CRUD
  const handleAddPackage = () => {
    if (!packageForm.name.trim() || !packageForm.price.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const filteredFeatures = packageForm.features.filter((f) => f.trim());
    if (filteredFeatures.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }

    if (editingPackage) {
      setPackages(
        packages.map((p) =>
          p.id === editingPackage.id
            ? {
                ...p,
                name: packageForm.name,
                price: packageForm.price,
                popular: packageForm.popular,
                features: filteredFeatures,
              }
            : p
        )
      );
      toast.success("Package updated successfully!");
    } else {
      setPackages([
        ...packages,
        {
          id: Date.now(),
          name: packageForm.name,
          price: packageForm.price,
          popular: packageForm.popular,
          features: filteredFeatures,
        },
      ]);
      toast.success("Package added successfully!");
    }

    setPackageForm({ name: "", price: "", popular: false, features: [""] });
    setEditingPackage(null);
    setIsAddPackageDialogOpen(false);
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter((p) => p.id !== id));
    toast.success("Package deleted successfully!");
  };

  // Wedding CRUD
  const handleAddWedding = () => {
    if (
      !weddingForm.couple.trim() ||
      !weddingForm.location.trim() ||
      !weddingForm.image.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingWedding) {
      setRealWeddings(
        realWeddings.map((w) =>
          w.id === editingWedding.id
            ? {
                ...w,
                couple: weddingForm.couple,
                location: weddingForm.location,
                date: weddingForm.date,
                image: weddingForm.image,
                theme: weddingForm.theme,
                guests: parseInt(weddingForm.guests) || 0,
                description: weddingForm.description,
              }
            : w
        )
      );
      toast.success("Wedding updated successfully!");
    } else {
      setRealWeddings([
        ...realWeddings,
        {
          id: Date.now(),
          couple: weddingForm.couple,
          location: weddingForm.location,
          date: weddingForm.date,
          image: weddingForm.image,
          theme: weddingForm.theme,
          guests: parseInt(weddingForm.guests) || 0,
          description: weddingForm.description,
        },
      ]);
      toast.success("Wedding added successfully!");
    }

    setWeddingForm({
      couple: "",
      location: "",
      date: "",
      image: "",
      theme: "",
      guests: "",
      description: "",
    });
    setEditingWedding(null);
    setIsAddWeddingDialogOpen(false);
  };

  const handleDeleteWedding = (id: number) => {
    setRealWeddings(realWeddings.filter((w) => w.id !== id));
    toast.success("Wedding deleted successfully!");
  };

  // Inspiration CRUD
  const handleAddInspiration = () => {
    if (
      !inspirationForm.title.trim() ||
      !inspirationForm.coverImage.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const filteredImages = inspirationForm.images.filter((img) => img.trim());

    if (editingInspiration) {
      setInspirations(
        inspirations.map((i) =>
          i.id === editingInspiration.id
            ? {
                ...i,
                title: inspirationForm.title,
                description: inspirationForm.description,
                theme: inspirationForm.theme,
                imageCount: parseInt(inspirationForm.imageCount) || 0,
                coverImage: inspirationForm.coverImage,
                images: filteredImages,
              }
            : i
        )
      );
      toast.success("Inspiration updated successfully!");
    } else {
      setInspirations([
        ...inspirations,
        {
          id: Date.now(),
          title: inspirationForm.title,
          description: inspirationForm.description,
          theme: inspirationForm.theme,
          imageCount: parseInt(inspirationForm.imageCount) || 0,
          coverImage: inspirationForm.coverImage,
          images: filteredImages,
        },
      ]);
      toast.success("Inspiration added successfully!");
    }

    setInspirationForm({
      title: "",
      description: "",
      theme: "",
      imageCount: "",
      coverImage: "",
      images: [""],
    });
    setEditingInspiration(null);
    setIsAddInspirationDialogOpen(false);
  };

  const handleDeleteInspiration = (id: number) => {
    setInspirations(inspirations.filter((i) => i.id !== id));
    toast.success("Inspiration deleted successfully!");
  };

  // Array helpers
  const addItemToArray = (
    array: string[],
    setter: (arr: string[]) => void
  ) => {
    setter([...array, ""]);
  };

  const removeItemFromArray = (
    index: number,
    array: string[],
    setter: (arr: string[]) => void
  ) => {
    const newArray = array.filter((_, i) => i !== index);
    setter(newArray);
  };

  const updateItemInArray = (
    index: number,
    value: string,
    array: string[],
    setter: (arr: string[]) => void
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20 pb-12 overflow-x-hidden w-full">
      <div className="container mx-auto px-4 md:px-8 w-full max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl" style={{ fontFamily: "Volkhov, serif" }}>
                Edit Profile
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your wedding planner profile
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onPreview} className="gap-2">
              <Eye className="size-4" />
              <span className="hidden sm:inline">Preview</span>
            </Button>
            <Button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#c5573d] hover:to-[#d89001] gap-2"
            >
              <Save className="size-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              <h3 className="font-semibold mb-4 text-sm">Sections</h3>
              <nav className="space-y-2">
                {[
                  { id: "basic", label: "Basic Information" },
                  { id: "gallery", label: "Gallery" },
                  { id: "highlights", label: "Highlights" },
                  { id: "services", label: "Services" },
                  { id: "packages", label: "Packages" },
                  { id: "weddings", label: "Real Weddings" },
                  { id: "inspirations", label: "Inspirations" },
                  { id: "destinations", label: "Destinations & Languages" },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-[#DF6951] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Basic Information */}
            {activeSection === "basic" && (
              <Card className="p-6">
                <h2 className="text-xl mb-6 flex items-center gap-2">
                  Basic Information
                </h2>

                <div className="space-y-6">
                  {/* Profile & Cover Images */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Profile Image</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <ImageWithFallback
                          src={profileData.profileImage}
                          alt="Profile"
                          className="size-20 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <Input
                            value={profileData.profileImage}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                profileImage: e.target.value,
                              })
                            }
                            placeholder="Image URL"
                            className="mb-2"
                          />
                          <Button variant="outline" size="sm" className="gap-2">
                            <Upload className="size-4" />
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Cover Image</Label>
                      <div className="mt-2">
                        <div className="relative h-32 rounded-lg overflow-hidden border-2 border-gray-200 mb-2">
                          <ImageWithFallback
                            src={profileData.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Input
                          value={profileData.coverImage}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              coverImage: e.target.value,
                            })
                          }
                          placeholder="Image URL"
                          className="mb-2"
                        />
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="size-4" />
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Basic Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Business Name *</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                        placeholder="Your business name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tagline">Tagline *</Label>
                      <Input
                        id="tagline"
                        value={profileData.tagline}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            tagline: e.target.value,
                          })
                        }
                        placeholder="A catchy tagline"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            location: e.target.value,
                          })
                        }
                        placeholder="City, Country"
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience">Experience *</Label>
                      <Input
                        id="experience"
                        value={profileData.experience}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            experience: e.target.value,
                          })
                        }
                        placeholder="e.g., 12+ Years"
                      />
                    </div>

                    <div>
                      <Label htmlFor="startingPrice">Starting Price *</Label>
                      <Input
                        id="startingPrice"
                        value={profileData.startingPrice}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            startingPrice: e.target.value,
                          })
                        }
                        placeholder="e.g., ₹2,50,000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="responseTime">Response Time *</Label>
                      <Input
                        id="responseTime"
                        value={profileData.responseTime}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            responseTime: e.target.value,
                          })
                        }
                        placeholder="e.g., Within 2 hours"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">About / Description *</Label>
                    <Textarea
                      id="description"
                      value={profileData.description}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Tell your story..."
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {profileData.description.length} characters
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Gallery */}
            {activeSection === "gallery" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">Gallery Images</h2>
                  <Button
                    onClick={() => setGallery([...gallery, ""])}
                    className="gap-2 bg-[#02542D] hover:bg-[#023a20]"
                  >
                    <Plus className="size-4" />
                    Add Image
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {gallery.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                        {image ? (
                          <ImageWithFallback
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="size-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={image}
                          onChange={(e) => {
                            const newGallery = [...gallery];
                            newGallery[index] = e.target.value;
                            setGallery(newGallery);
                          }}
                          placeholder="Image URL"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setGallery(gallery.filter((_, i) => i !== index))
                          }
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Highlights */}
            {activeSection === "highlights" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">Highlights</h2>
                  <Button
                    onClick={() => setHighlights([...highlights, ""])}
                    className="gap-2 bg-[#02542D] hover:bg-[#023a20]"
                  >
                    <Plus className="size-4" />
                    Add Highlight
                  </Button>
                </div>

                <div className="space-y-3">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={highlight}
                        onChange={(e) => {
                          const newHighlights = [...highlights];
                          newHighlights[index] = e.target.value;
                          setHighlights(newHighlights);
                        }}
                        placeholder="Highlight name"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setHighlights(highlights.filter((_, i) => i !== index))
                        }
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Services */}
            {activeSection === "services" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">Services</h2>
                  <Button
                    onClick={() => {
                      setEditingService(null);
                      setServiceForm({ category: "", items: [""] });
                      setIsAddServiceDialogOpen(true);
                    }}
                    className="gap-2 bg-[#02542D] hover:bg-[#023a20]"
                  >
                    <Plus className="size-4" />
                    Add Service Category
                  </Button>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="border rounded-lg p-4 hover:border-[#DF6951] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">{service.category}</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingService(service);
                              setServiceForm({
                                category: service.category,
                                items: [...service.items],
                              });
                              setIsAddServiceDialogOpen(true);
                            }}
                          >
                            <Edit2 className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="size-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {service.items.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Packages */}
            {activeSection === "packages" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">Packages</h2>
                  <Button
                    onClick={() => {
                      setEditingPackage(null);
                      setPackageForm({
                        name: "",
                        price: "",
                        popular: false,
                        features: [""],
                      });
                      setIsAddPackageDialogOpen(true);
                    }}
                    className="gap-2 bg-[#02542D] hover:bg-[#023a20]"
                  >
                    <Plus className="size-4" />
                    Add Package
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`border-2 rounded-lg p-4 ${
                        pkg.popular
                          ? "border-[#DF6951] bg-gradient-to-b from-[#DF6951]/5 to-transparent"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{pkg.name}</h3>
                          <p className="text-lg font-bold text-[#DF6951]">
                            {pkg.price}
                          </p>
                          {pkg.popular && (
                            <Badge className="mt-1 bg-[#DF6951]">Popular</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingPackage(pkg);
                              setPackageForm({
                                name: pkg.name,
                                price: pkg.price,
                                popular: pkg.popular,
                                features: [...pkg.features],
                              });
                              setIsAddPackageDialogOpen(true);
                            }}
                          >
                            <Edit2 className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            <Trash2 className="size-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#02542D]">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Real Weddings */}
            {activeSection === "weddings" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">Real Weddings</h2>
                  <Button
                    onClick={() => {
                      setEditingWedding(null);
                      setWeddingForm({
                        couple: "",
                        location: "",
                        date: "",
                        image: "",
                        theme: "",
                        guests: "",
                        description: "",
                      });
                      setIsAddWeddingDialogOpen(true);
                    }}
                    className="gap-2 bg-[#02542D] hover:bg-[#023a20]"
                  >
                    <Plus className="size-4" />
                    Add Wedding
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {realWeddings.map((wedding) => (
                    <div
                      key={wedding.id}
                      className="border rounded-lg overflow-hidden hover:border-[#DF6951] transition-colors"
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={wedding.image}
                          alt={wedding.couple}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{wedding.couple}</h3>
                            <p className="text-sm text-muted-foreground">
                              {wedding.location}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingWedding(wedding);
                                setWeddingForm({
                                  couple: wedding.couple,
                                  location: wedding.location,
                                  date: wedding.date,
                                  image: wedding.image,
                                  theme: wedding.theme,
                                  guests: wedding.guests.toString(),
                                  description: wedding.description,
                                });
                                setIsAddWeddingDialogOpen(true);
                              }}
                            >
                              <Edit2 className="size-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteWedding(wedding.id)}
                            >
                              <Trash2 className="size-3 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {wedding.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Inspirations */}
            {activeSection === "inspirations" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl flex items-center gap-2">
                    <Sparkles className="size-5 text-[#DF6951]" />
                    Wedding Inspirations
                  </h2>
                  <Button
                    onClick={() => {
                      setEditingInspiration(null);
                      setInspirationForm({
                        title: "",
                        description: "",
                        theme: "",
                        imageCount: "",
                        coverImage: "",
                        images: [""],
                      });
                      setIsAddInspirationDialogOpen(true);
                    }}
                    className="gap-2 bg-[#02542D] hover:bg-[#023a20]"
                  >
                    <Plus className="size-4" />
                    Add Board
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {inspirations.map((board) => (
                    <div
                      key={board.id}
                      className="border rounded-lg overflow-hidden hover:border-[#DF6951] transition-colors"
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={board.coverImage}
                          alt={board.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-3 left-3 bg-[#DF6951]">
                          {board.theme}
                        </Badge>
                        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                          <ImageIcon className="size-3" />
                          <span className="text-xs">{board.imageCount}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{board.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {board.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingInspiration(board);
                                setInspirationForm({
                                  title: board.title,
                                  description: board.description,
                                  theme: board.theme,
                                  imageCount: board.imageCount.toString(),
                                  coverImage: board.coverImage,
                                  images: [...board.images],
                                });
                                setIsAddInspirationDialogOpen(true);
                              }}
                            >
                              <Edit2 className="size-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteInspiration(board.id)}
                            >
                              <Trash2 className="size-3 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Destinations & Languages */}
            {activeSection === "destinations" && (
              <Card className="p-6">
                <h2 className="text-xl mb-6">Destinations & Languages</h2>

                <div className="space-y-6">
                  {/* Destinations */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label>Destinations</Label>
                      <Button
                        onClick={() => setDestinations([...destinations, ""])}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Plus className="size-3" />
                        Add
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {destinations.map((dest, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={dest}
                            onChange={(e) => {
                              const newDest = [...destinations];
                              newDest[index] = e.target.value;
                              setDestinations(newDest);
                            }}
                            placeholder="Destination name"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setDestinations(
                                destinations.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <Trash2 className="size-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Languages */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label>Languages</Label>
                      <Button
                        onClick={() =>
                          setProfileData({
                            ...profileData,
                            languages: [...profileData.languages, ""],
                          })
                        }
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Plus className="size-3" />
                        Add
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {profileData.languages.map((lang, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={lang}
                            onChange={(e) => {
                              const newLangs = [...profileData.languages];
                              newLangs[index] = e.target.value;
                              setProfileData({
                                ...profileData,
                                languages: newLangs,
                              });
                            }}
                            placeholder="Language name"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setProfileData({
                                ...profileData,
                                languages: profileData.languages.filter(
                                  (_, i) => i !== index
                                ),
                              })
                            }
                          >
                            <Trash2 className="size-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Service Dialog */}
      <Dialog
        open={isAddServiceDialogOpen}
        onOpenChange={setIsAddServiceDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service Category" : "Add Service Category"}
            </DialogTitle>
            <DialogDescription>
              Organize your services by category and list the specific items you
              offer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Category Name *</Label>
              <Input
                id="category"
                value={serviceForm.category}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, category: e.target.value })
                }
                placeholder="e.g., Planning & Coordination"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Service Items *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setServiceForm({
                      ...serviceForm,
                      items: [...serviceForm.items, ""],
                    })
                  }
                  className="gap-2"
                >
                  <Plus className="size-3" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-2">
                {serviceForm.items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newItems = [...serviceForm.items];
                        newItems[index] = e.target.value;
                        setServiceForm({ ...serviceForm, items: newItems });
                      }}
                      placeholder="Service item"
                    />
                    {serviceForm.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setServiceForm({
                            ...serviceForm,
                            items: serviceForm.items.filter(
                              (_, i) => i !== index
                            ),
                          })
                        }
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddServiceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddService}
              className="bg-[#02542D] hover:bg-[#023a20]"
            >
              {editingService ? "Update" : "Add"} Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Package Dialog */}
      <Dialog
        open={isAddPackageDialogOpen}
        onOpenChange={setIsAddPackageDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? "Edit Package" : "Add Package"}
            </DialogTitle>
            <DialogDescription>
              Create pricing packages for your wedding planning services.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pkgName">Package Name *</Label>
                <Input
                  id="pkgName"
                  value={packageForm.name}
                  onChange={(e) =>
                    setPackageForm({ ...packageForm, name: e.target.value })
                  }
                  placeholder="e.g., Premium"
                />
              </div>
              <div>
                <Label htmlFor="pkgPrice">Price *</Label>
                <Input
                  id="pkgPrice"
                  value={packageForm.price}
                  onChange={(e) =>
                    setPackageForm({ ...packageForm, price: e.target.value })
                  }
                  placeholder="e.g., ₹5,00,000"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="popular"
                checked={packageForm.popular}
                onChange={(e) =>
                  setPackageForm({ ...packageForm, popular: e.target.checked })
                }
                className="size-4"
              />
              <Label htmlFor="popular" className="cursor-pointer">
                Mark as Popular
              </Label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Features *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPackageForm({
                      ...packageForm,
                      features: [...packageForm.features, ""],
                    })
                  }
                  className="gap-2"
                >
                  <Plus className="size-3" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {packageForm.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...packageForm.features];
                        newFeatures[index] = e.target.value;
                        setPackageForm({ ...packageForm, features: newFeatures });
                      }}
                      placeholder="Package feature"
                    />
                    {packageForm.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setPackageForm({
                            ...packageForm,
                            features: packageForm.features.filter(
                              (_, i) => i !== index
                            ),
                          })
                        }
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddPackageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddPackage}
              className="bg-[#02542D] hover:bg-[#023a20]"
            >
              {editingPackage ? "Update" : "Add"} Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Wedding Dialog */}
      <Dialog
        open={isAddWeddingDialogOpen}
        onOpenChange={setIsAddWeddingDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingWedding ? "Edit Wedding" : "Add Real Wedding"}
            </DialogTitle>
            <DialogDescription>
              Showcase your past wedding projects to inspire potential clients.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="couple">Couple Names *</Label>
                <Input
                  id="couple"
                  value={weddingForm.couple}
                  onChange={(e) =>
                    setWeddingForm({ ...weddingForm, couple: e.target.value })
                  }
                  placeholder="e.g., Priya & Dev"
                />
              </div>
              <div>
                <Label htmlFor="wLocation">Location *</Label>
                <Input
                  id="wLocation"
                  value={weddingForm.location}
                  onChange={(e) =>
                    setWeddingForm({ ...weddingForm, location: e.target.value })
                  }
                  placeholder="e.g., Udaipur, Rajasthan"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wDate">Date</Label>
                <Input
                  id="wDate"
                  value={weddingForm.date}
                  onChange={(e) =>
                    setWeddingForm({ ...weddingForm, date: e.target.value })
                  }
                  placeholder="e.g., March 2024"
                />
              </div>
              <div>
                <Label htmlFor="wGuests">Guest Count</Label>
                <Input
                  id="wGuests"
                  type="number"
                  value={weddingForm.guests}
                  onChange={(e) =>
                    setWeddingForm({ ...weddingForm, guests: e.target.value })
                  }
                  placeholder="e.g., 350"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="wTheme">Theme</Label>
              <Input
                id="wTheme"
                value={weddingForm.theme}
                onChange={(e) =>
                  setWeddingForm({ ...weddingForm, theme: e.target.value })
                }
                placeholder="e.g., Royal Palace Wedding"
              />
            </div>

            <div>
              <Label htmlFor="wImage">Cover Image URL *</Label>
              <Input
                id="wImage"
                value={weddingForm.image}
                onChange={(e) =>
                  setWeddingForm({ ...weddingForm, image: e.target.value })
                }
                placeholder="https://..."
              />
              {weddingForm.image && (
                <div className="mt-2 relative h-48 rounded-lg overflow-hidden border">
                  <ImageWithFallback
                    src={weddingForm.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="wDescription">Description</Label>
              <Textarea
                id="wDescription"
                value={weddingForm.description}
                onChange={(e) =>
                  setWeddingForm({
                    ...weddingForm,
                    description: e.target.value,
                  })
                }
                placeholder="Brief description of this wedding..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddWeddingDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddWedding}
              className="bg-[#02542D] hover:bg-[#023a20]"
            >
              {editingWedding ? "Update" : "Add"} Wedding
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inspiration Dialog */}
      <Dialog
        open={isAddInspirationDialogOpen}
        onOpenChange={setIsAddInspirationDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingInspiration ? "Edit Inspiration Board" : "Add Inspiration Board"}
            </DialogTitle>
            <DialogDescription>
              Create mood boards to inspire couples with your creative vision.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="iTitle">Title *</Label>
                <Input
                  id="iTitle"
                  value={inspirationForm.title}
                  onChange={(e) =>
                    setInspirationForm({
                      ...inspirationForm,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g., Romantic Garden Romance"
                />
              </div>
              <div>
                <Label htmlFor="iTheme">Theme</Label>
                <Input
                  id="iTheme"
                  value={inspirationForm.theme}
                  onChange={(e) =>
                    setInspirationForm({
                      ...inspirationForm,
                      theme: e.target.value,
                    })
                  }
                  placeholder="e.g., Garden Wedding"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="iDescription">Description</Label>
              <Textarea
                id="iDescription"
                value={inspirationForm.description}
                onChange={(e) =>
                  setInspirationForm({
                    ...inspirationForm,
                    description: e.target.value,
                  })
                }
                placeholder="Describe this inspiration board..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="iCover">Cover Image URL *</Label>
              <Input
                id="iCover"
                value={inspirationForm.coverImage}
                onChange={(e) =>
                  setInspirationForm({
                    ...inspirationForm,
                    coverImage: e.target.value,
                  })
                }
                placeholder="https://..."
              />
              {inspirationForm.coverImage && (
                <div className="mt-2 relative h-40 rounded-lg overflow-hidden border">
                  <ImageWithFallback
                    src={inspirationForm.coverImage}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="iCount">Total Image Count</Label>
              <Input
                id="iCount"
                type="number"
                value={inspirationForm.imageCount}
                onChange={(e) =>
                  setInspirationForm({
                    ...inspirationForm,
                    imageCount: e.target.value,
                  })
                }
                placeholder="e.g., 12"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Preview Images (up to 4)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setInspirationForm({
                      ...inspirationForm,
                      images: [...inspirationForm.images, ""],
                    })
                  }
                  className="gap-2"
                  disabled={inspirationForm.images.length >= 4}
                >
                  <Plus className="size-3" />
                  Add Image
                </Button>
              </div>
              <div className="space-y-2">
                {inspirationForm.images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={img}
                      onChange={(e) => {
                        const newImages = [...inspirationForm.images];
                        newImages[index] = e.target.value;
                        setInspirationForm({
                          ...inspirationForm,
                          images: newImages,
                        });
                      }}
                      placeholder="Image URL"
                    />
                    {inspirationForm.images.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setInspirationForm({
                            ...inspirationForm,
                            images: inspirationForm.images.filter(
                              (_, i) => i !== index
                            ),
                          })
                        }
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddInspirationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddInspiration}
              className="bg-[#02542D] hover:bg-[#023a20]"
            >
              {editingInspiration ? "Update" : "Add"} Board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

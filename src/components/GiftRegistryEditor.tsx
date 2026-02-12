import { useState } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Save,
  X,
  Trash2,
  Edit,
  ExternalLink,
  DollarSign,
  Home,
  Plane,
  Heart,
  Gift,
  Image as ImageIcon,
  Package,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { GiftRegistryItem } from "./customerAccountData";

interface GiftRegistryEditorProps {
  registryData: any;
  onSave: (data: any) => void;
  onCancel: () => void;
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

export function GiftRegistryEditor({
  registryData,
  onSave,
  onCancel,
}: GiftRegistryEditorProps) {
  const [items, setItems] = useState<GiftRegistryItem[]>(
    registryData.items || [],
  );
  const [settings, setSettings] = useState({
    title: registryData.title || "",
    welcomeMessage: registryData.welcomeMessage || "",
    shippingAddress: registryData.shippingAddress || "",
    allowCashGifts: registryData.allowCashGifts ?? true,
    honeymoonFundGoal: registryData.honeymoonFundGoal || 0,
  });
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<GiftRegistryItem | null>(null);
  const [itemFormData, setItemFormData] = useState({
    name: "",
    description: "",
    category: "home" as const,
    price: 0,
    currency: "USD",
    image: "",
    storeLink: "",
    storeName: "",
    quantity: 1,
    priority: "medium" as const,
  });
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleAddItem = () => {
    setEditingItem(null);
    setItemFormData({
      name: "",
      description: "",
      category: "home",
      price: 0,
      currency: "USD",
      image: "",
      storeLink: "",
      storeName: "",
      quantity: 1,
      priority: "medium",
    });
    setShowItemDialog(true);
  };

  const handleEditItem = (item: GiftRegistryItem) => {
    setEditingItem(item);
    setItemFormData({
      name: item.name,
      description: item.description,
      category: "home",
      price: item.price,
      currency: item.currency,
      image: item.image,
      storeLink: item.storeLink || "",
      storeName: item.storeName || "",
      quantity: item.quantity,
      priority: "medium",
    });
    setShowItemDialog(true);
  };

  const handleSaveItem = () => {
    if (!itemFormData.name || itemFormData.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingItem) {
      // Update existing item
      setItems(
        items.map((item) =>
          item.id === editingItem.id ? { ...item, ...itemFormData } : item,
        ),
      );
      toast.success("Item updated successfully");
    } else {
      // Add new item
      const newItem: GiftRegistryItem = {
        id: `GR${Date.now()}`,
        ...itemFormData,
        purchased: 0,
        addedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setItems([...items, newItem]);
      toast.success("Item added successfully");
    }

    setShowItemDialog(false);
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
    toast.success("Item deleted");
  };

  const handleSave = () => {
    const totalValue = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const purchasedItems = items.filter((item) => item.purchased > 0).length;
    const honeymoonFundRaised = items
      .filter((item) => item.category === "honeymoon" && item.purchased > 0)
      .reduce((sum, item) => sum + item.price * item.purchased, 0);

    onSave({
      ...registryData,
      ...settings,
      items,
      totalItems: items.length,
      purchasedItems,
      totalValue,
      honeymoonFundRaised,
    });
  };

  const filteredItems =
    categoryFilter === "all"
      ? items
      : items.filter((item) => item.category === categoryFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-3xl mb-2"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Edit Gift Registry
            </h1>
            <p className="text-muted-foreground">
              Manage your registry items and settings
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="gap-2">
              <X className="size-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#DF6951] hover:bg-[#c5573d] gap-2"
            >
              <Save className="size-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="items">
              Registry Items ({items.length})
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Registry Items */}
          <TabsContent value="items" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant={categoryFilter === "all" ? "default" : "outline"}
                    className={`cursor-pointer ${categoryFilter === "all" ? "bg-[#DF6951]" : ""}`}
                    onClick={() => setCategoryFilter("all")}
                  >
                    All Items ({items.length})
                  </Badge>
                  <Badge
                    variant={
                      categoryFilter === "honeymoon" ? "default" : "outline"
                    }
                    className={`cursor-pointer ${categoryFilter === "honeymoon" ? "bg-[#DF6951]" : ""}`}
                    onClick={() => setCategoryFilter("honeymoon")}
                  >
                    <Plane className="size-3 mr-1" />
                    Honeymoon (
                    {items.filter((i) => i.category === "honeymoon").length})
                  </Badge>
                  <Badge
                    variant={categoryFilter === "home" ? "default" : "outline"}
                    className={`cursor-pointer ${categoryFilter === "home" ? "bg-purple-600" : ""}`}
                    onClick={() => setCategoryFilter("home")}
                  >
                    <Home className="size-3 mr-1" />
                    Home ({items.filter((i) => i.category === "home").length})
                  </Badge>
                  <Badge
                    variant={
                      categoryFilter === "experience" ? "default" : "outline"
                    }
                    className={`cursor-pointer ${categoryFilter === "experience" ? "bg-blue-600" : ""}`}
                    onClick={() => setCategoryFilter("experience")}
                  >
                    <Heart className="size-3 mr-1" />
                    Experience (
                    {items.filter((i) => i.category === "experience").length})
                  </Badge>
                  <Badge
                    variant={categoryFilter === "cash" ? "default" : "outline"}
                    className={`cursor-pointer ${categoryFilter === "cash" ? "bg-green-600" : ""}`}
                    onClick={() => setCategoryFilter("cash")}
                  >
                    <DollarSign className="size-3 mr-1" />
                    Cash ({items.filter((i) => i.category === "cash").length})
                  </Badge>
                </div>
                <Button
                  onClick={handleAddItem}
                  className="bg-[#DF6951] hover:bg-[#c5573d] gap-2"
                >
                  <Plus className="size-4" />
                  Add Item
                </Button>
              </div>

              {/* Items Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const Icon = categoryIcons[item.category];
                  return (
                    <Card key={item.id} className="overflow-hidden">
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
                        {item.purchased >= item.quantity && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Badge className="bg-green-600 text-white">
                              <Package className="size-3 mr-1" />
                              Purchased
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-1 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-lg">${item.price.toFixed(2)}</p>
                          <Badge variant="outline">
                            {item.purchased} / {item.quantity} purchased
                          </Badge>
                        </div>
                        {item.storeName && (
                          <p className="text-xs text-muted-foreground mb-3">
                            Available at {item.storeName}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-2"
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit className="size-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="size-3 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <Gift className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    No {categoryFilter !== "all" ? categoryFilter : ""} items in
                    your registry yet
                  </p>
                  <Button
                    onClick={handleAddItem}
                    className="bg-[#DF6951] hover:bg-[#c5573d] gap-2"
                  >
                    <Plus className="size-4" />
                    Add First Item
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h3
                className="text-xl mb-4"
                style={{ fontFamily: "Volkhov, serif" }}
              >
                Registry Information
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Registry Title</Label>
                  <Input
                    id="title"
                    value={settings.title}
                    onChange={(e) =>
                      setSettings({ ...settings, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={settings.welcomeMessage}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        welcomeMessage: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Shipping Address</Label>
                  <Textarea
                    id="shippingAddress"
                    value={settings.shippingAddress}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        shippingAddress: e.target.value,
                      })
                    }
                    rows={2}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3
                className="text-xl mb-4"
                style={{ fontFamily: "Volkhov, serif" }}
              >
                Cash Gifts & Honeymoon Fund
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Allow Cash Gifts</p>
                    <p className="text-sm text-muted-foreground">
                      Let guests contribute monetary gifts
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.allowCashGifts}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        allowCashGifts: e.target.checked,
                      })
                    }
                    className="size-4"
                  />
                </div>
                {settings.allowCashGifts && (
                  <div className="space-y-2">
                    <Label htmlFor="honeymoonGoal">Honeymoon Fund Goal</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="honeymoonGoal"
                        type="number"
                        value={settings.honeymoonFundGoal}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            honeymoonFundGoal: Number(e.target.value),
                          })
                        }
                        className="pl-8"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Item Dialog */}
        <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Registry Item" : "Add Registry Item"}
              </DialogTitle>
              <DialogDescription>
                {editingItem
                  ? "Update the details of your registry item"
                  : "Add a new item to your wedding registry"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="itemName">Item Name *</Label>
                  <Input
                    id="itemName"
                    value={itemFormData.name}
                    onChange={(e) =>
                      setItemFormData({ ...itemFormData, name: e.target.value })
                    }
                    placeholder="e.g., Espresso Machine"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="itemDescription">Description</Label>
                  <Textarea
                    id="itemDescription"
                    value={itemFormData.description}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the item"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemCategory">Category *</Label>
                  <Select
                    value={itemFormData.category}
                    onValueChange={(value: any) =>
                      setItemFormData({ ...itemFormData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honeymoon">Honeymoon</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                      <SelectItem value="cash">Cash Gift</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemPrice">Price *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="itemPrice"
                      type="number"
                      value={itemFormData.price}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          price: Number(e.target.value),
                        })
                      }
                      className="pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemQuantity">Quantity</Label>
                  <Input
                    id="itemQuantity"
                    type="number"
                    value={itemFormData.quantity}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        quantity: Number(e.target.value),
                      })
                    }
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemPriority">Priority</Label>
                  <Select
                    value={itemFormData.priority}
                    onValueChange={(value: any) =>
                      setItemFormData({ ...itemFormData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="itemImage">Image URL</Label>
                  <Input
                    id="itemImage"
                    value={itemFormData.image}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        image: e.target.value,
                      })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                  {itemFormData.image && (
                    <div className="aspect-video rounded-lg overflow-hidden border mt-2">
                      <ImageWithFallback
                        src={itemFormData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemStore">Store Name</Label>
                  <Input
                    id="itemStore"
                    value={itemFormData.storeName}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        storeName: e.target.value,
                      })
                    }
                    placeholder="e.g., Williams Sonoma"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemLink">Store Link</Label>
                  <Input
                    id="itemLink"
                    value={itemFormData.storeLink}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        storeLink: e.target.value,
                      })
                    }
                    placeholder="https://store.com/product"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowItemDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveItem}
                className="bg-[#DF6951] hover:bg-[#c5573d]"
              >
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

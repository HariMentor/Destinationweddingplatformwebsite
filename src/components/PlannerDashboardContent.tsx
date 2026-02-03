"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Users,
  Star,
  Package,
  DollarSign,
  BarChart3,
  TrendingUp,
  Award,
  MessageCircle,
  Eye,
  Heart,
  CheckCircle2,
  Clock,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Send,
  Search,
  Filter,
  X,
  Image as ImageIcon,
  Folder,
  Grid,
  List,
  ChevronRight,
  Save,
  FileText,
  Download,
  Upload,
  Check,
  XCircle,
  AlertCircle,
  MapPin,
  Tag,
  Sparkles,
  Globe,
  Phone,
  Mail,
  Palette,
  Wand2,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useCurrency } from "./CurrencyContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
// import { PlannerCalendarView } from "./PlannerCalendarView";
// import { PlannerQuotesView } from "./PlannerQuotesView";
// import { QuoteCreatorPage } from "./QuoteCreatorPage";

interface PlannerDashboardContentProps {
  activeTab: string;
  onNavigate?: (page: string) => void;
}

// Mock data types
interface CalendarAvailability {
  id: string;
  date: string;
  status: "available" | "booked" | "blocked" | "holiday";
  note?: string;
  clientName?: string;
  eventType?: string;
}

interface Message {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: ChatMessage[];
}

interface ChatMessage {
  id: string;
  sender: "planner" | "client";
  message: string;
  timestamp: string;
}

interface InspirationCollection {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  itemCount: number;
  isPublic: boolean;
  createdAt: string;
  items: InspirationItem[];
}

interface InspirationItem {
  id: string;
  title: string;
  image: string;
  category: string;
  tags: string[];
  description: string;
}

interface QuoteLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Quote {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  destination: string;
  eventDate: string;
  createdDate: string;
  validUntil: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  lineItems: QuoteLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  discountAmount: number;
  total: number;
  notes?: string;
  termsAndConditions?: string;
}

export function PlannerDashboardContent({ activeTab, onNavigate }: PlannerDashboardContentProps) {
  const { formatPrice } = useCurrency();

  // Mock planner business data
  const plannerStats = {
    totalClients: 24,
    activeBookings: 8,
    completedWeddings: 156,
    averageRating: 4.9,
    totalReviews: 142,
    monthlyEarnings: 12500,
    pendingQuotes: 5,
    messagesUnread: 12,
    profileViews: 1847,
    profileLikes: 523,
  };

  // Calendar State
  const [calendarData, setCalendarData] = useState<CalendarAvailability[]>([
    { id: "1", date: "2026-02-15", status: "booked", clientName: "Sarah & Michael", eventType: "Wedding Planning" },
    { id: "2", date: "2026-02-16", status: "available" },
    { id: "3", date: "2026-02-17", status: "blocked", note: "Personal day" },
    { id: "4", date: "2026-02-18", status: "available" },
    { id: "5", date: "2026-02-19", status: "booked", clientName: "Emma & James", eventType: "Venue Tour" },
    { id: "6", date: "2026-02-20", status: "holiday", note: "Public Holiday" },
    { id: "7", date: "2026-02-21", status: "available" },
    { id: "8", date: "2026-02-22", status: "booked", clientName: "Lisa & Tom", eventType: "Consultation" },
    { id: "9", date: "2026-02-23", status: "available" },
    { id: "10", date: "2026-02-24", status: "blocked", note: "Conference" },
  ]);
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const [editingCalendarItem, setEditingCalendarItem] = useState<CalendarAvailability | null>(null);
  const [calendarFormData, setCalendarFormData] = useState({
    date: "",
    status: "available" as "available" | "booked" | "blocked" | "holiday",
    note: "",
    clientName: "",
    eventType: "",
  });

  // Messages State
  const [messagesData, setMessagesData] = useState<Message[]>([
    {
      id: "1",
      clientId: "c1",
      clientName: "Sarah Johnson",
      clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "Thank you for the venue recommendations!",
      timestamp: "2 hours ago",
      unread: true,
      messages: [
        { id: "m1", sender: "client", message: "Hi! I'm looking for destination wedding planning services.", timestamp: "Yesterday" },
        { id: "m2", sender: "planner", message: "Hello Sarah! I'd be happy to help you plan your dream wedding. What destination are you considering?", timestamp: "Yesterday" },
        { id: "m3", sender: "client", message: "We're thinking about Bali or Santorini. Do you have experience with both?", timestamp: "Yesterday" },
        { id: "m4", sender: "planner", message: "Absolutely! I've planned over 50 weddings in Bali and 30 in Santorini. I can send you some venue recommendations for both destinations.", timestamp: "5 hours ago" },
        { id: "m5", sender: "client", message: "Thank you for the venue recommendations!", timestamp: "2 hours ago" },
      ],
    },
    {
      id: "2",
      clientId: "c2",
      clientName: "Michael Chen",
      clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      lastMessage: "Can we schedule a consultation for next week?",
      timestamp: "5 hours ago",
      unread: true,
      messages: [
        { id: "m1", sender: "client", message: "Can we schedule a consultation for next week?", timestamp: "5 hours ago" },
      ],
    },
    {
      id: "3",
      clientId: "c3",
      clientName: "Emma Rodriguez",
      clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      lastMessage: "Perfect! See you on the 15th.",
      timestamp: "1 day ago",
      unread: false,
      messages: [
        { id: "m1", sender: "planner", message: "Your venue has been confirmed for February 15th!", timestamp: "2 days ago" },
        { id: "m2", sender: "client", message: "Perfect! See you on the 15th.", timestamp: "1 day ago" },
      ],
    },
  ]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messageSearchTerm, setMessageSearchTerm] = useState("");

  // Inspiration Collections State
  const [inspirationCollections, setInspirationCollections] = useState<InspirationCollection[]>([
    {
      id: "1",
      name: "Beach Wedding Bliss",
      description: "Stunning beach wedding inspiration for destination couples",
      coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      itemCount: 24,
      isPublic: true,
      createdAt: "2024-01-15",
      items: [
        {
          id: "i1",
          title: "Tropical Beach Ceremony",
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
          category: "Ceremony",
          tags: ["Beach", "Tropical", "Sunset"],
          description: "Beautiful sunset beach ceremony setup",
        },
        {
          id: "i2",
          title: "Bohemian Beach Decor",
          image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
          category: "Decor",
          tags: ["Bohemian", "Beach", "Flowers"],
          description: "Elegant bohemian beach wedding decorations",
        },
      ],
    },
    {
      id: "2",
      name: "Elegant Garden Affairs",
      description: "Classic garden wedding inspiration with timeless elegance",
      coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      itemCount: 18,
      isPublic: true,
      createdAt: "2024-01-10",
      items: [
        {
          id: "i1",
          title: "Garden Ceremony Arch",
          image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
          category: "Ceremony",
          tags: ["Garden", "Arch", "Flowers"],
          description: "Stunning floral arch for garden ceremony",
        },
      ],
    },
    {
      id: "3",
      name: "Luxury Villa Celebrations",
      description: "Exclusive villa wedding setups for intimate gatherings",
      coverImage: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
      itemCount: 15,
      isPublic: false,
      createdAt: "2024-01-05",
      items: [],
    },
  ]);
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [editingCollection, setEditingCollection] = useState<InspirationCollection | null>(null);
  const [collectionFormData, setCollectionFormData] = useState({
    name: "",
    description: "",
    coverImage: "",
    isPublic: true,
  });
  const [selectedCollection, setSelectedCollection] = useState<InspirationCollection | null>(null);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [itemFormData, setItemFormData] = useState({
    title: "",
    image: "",
    category: "",
    tags: "",
    description: "",
  });
  const [collectionViewMode, setCollectionViewMode] = useState<"grid" | "list">("grid");

  // Quotes State
  const [quotesData, setQuotesData] = useState<Quote[]>([
    {
      id: "1",
      quoteNumber: "Q-240115",
      clientName: "Sarah & Michael Johnson",
      clientEmail: "sarah.johnson@email.com",
      clientPhone: "+1 555-0123",
      destination: "Bali, Indonesia",
      eventDate: "2026-06-15",
      createdDate: "2026-01-15",
      validUntil: "2026-02-15",
      status: "sent",
      lineItems: [
        { id: "1", description: "Full Wedding Planning Service", quantity: 1, rate: 5000, amount: 5000 },
        { id: "2", description: "Venue Coordination", quantity: 1, rate: 1500, amount: 1500 },
        { id: "3", description: "Vendor Management", quantity: 1, rate: 1000, amount: 1000 },
      ],
      subtotal: 7500,
      taxRate: 10,
      taxAmount: 750,
      discountType: "percentage",
      discountValue: 10,
      discountAmount: 750,
      total: 7500,
      notes: "Package includes full planning services for your dream destination wedding in Bali.",
      termsAndConditions: "Payment terms: 50% deposit upon booking, 50% due 30 days before the event.\\nCancellation policy: Deposits are non-refundable.\\nAll prices are in USD and subject to availability.",
    },
    {
      id: "2",
      quoteNumber: "Q-240116",
      clientName: "Emily & David Chen",
      clientEmail: "emily.chen@email.com",
      destination: "Santorini, Greece",
      eventDate: "2026-08-20",
      createdDate: "2026-01-16",
      validUntil: "2026-02-16",
      status: "draft",
      lineItems: [
        { id: "1", description: "Destination Wedding Planning", quantity: 1, rate: 6000, amount: 6000 },
        { id: "2", description: "Photography Coordination", quantity: 1, rate: 800, amount: 800 },
      ],
      subtotal: 6800,
      taxRate: 10,
      taxAmount: 680,
      discountType: "fixed",
      discountValue: 0,
      discountAmount: 0,
      total: 7480,
    },
  ]);
  const [showQuoteCreator, setShowQuoteCreator] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);

  // Calendar Functions
  const handleAddCalendarEntry = () => {
    setEditingCalendarItem(null);
    setCalendarFormData({
      date: "",
      status: "available",
      note: "",
      clientName: "",
      eventType: "",
    });
    setShowCalendarDialog(true);
  };

  const handleEditCalendarEntry = (item: CalendarAvailability) => {
    setEditingCalendarItem(item);
    setCalendarFormData({
      date: item.date,
      status: item.status,
      note: item.note || "",
      clientName: item.clientName || "",
      eventType: item.eventType || "",
    });
    setShowCalendarDialog(true);
  };

  const handleSaveCalendarEntry = () => {
    if (!calendarFormData.date) {
      toast.error("Please select a date");
      return;
    }

    if (editingCalendarItem) {
      setCalendarData(calendarData.map(item =>
        item.id === editingCalendarItem.id
          ? { ...item, ...calendarFormData }
          : item
      ));
      toast.success("Calendar entry updated!");
    } else {
      const newEntry: CalendarAvailability = {
        id: Date.now().toString(),
        ...calendarFormData,
      };
      setCalendarData([...calendarData, newEntry]);
      toast.success("Calendar entry added!");
    }
    setShowCalendarDialog(false);
  };

  const handleDeleteCalendarEntry = (id: string) => {
    setCalendarData(calendarData.filter(item => item.id !== id));
    toast.success("Calendar entry deleted!");
  };

  // Message Functions
  const handleSendMessage = () => {
    if (!selectedMessage || !newMessageText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "planner",
      message: newMessageText,
      timestamp: "Just now",
    };

    setMessagesData(messagesData.map(msg =>
      msg.id === selectedMessage.id
        ? {
            ...msg,
            messages: [...msg.messages, newMsg],
            lastMessage: newMessageText,
            timestamp: "Just now",
          }
        : msg
    ));

    setNewMessageText("");
    toast.success("Message sent!");
  };

  const markAsRead = (messageId: string) => {
    setMessagesData(messagesData.map(msg =>
      msg.id === messageId ? { ...msg, unread: false } : msg
    ));
  };

  // Collection Functions
  const handleAddCollection = () => {
    setEditingCollection(null);
    setCollectionFormData({
      name: "",
      description: "",
      coverImage: "",
      isPublic: true,
    });
    setShowCollectionDialog(true);
  };

  const handleEditCollection = (collection: InspirationCollection) => {
    setEditingCollection(collection);
    setCollectionFormData({
      name: collection.name,
      description: collection.description,
      coverImage: collection.coverImage,
      isPublic: collection.isPublic,
    });
    setShowCollectionDialog(true);
  };

  const handleSaveCollection = () => {
    if (!collectionFormData.name.trim()) {
      toast.error("Please enter a collection name");
      return;
    }

    if (editingCollection) {
      setInspirationCollections(inspirationCollections.map(col =>
        col.id === editingCollection.id
          ? { ...col, ...collectionFormData }
          : col
      ));
      toast.success("Collection updated!");
    } else {
      const newCollection: InspirationCollection = {
        id: Date.now().toString(),
        ...collectionFormData,
        itemCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        items: [],
      };
      setInspirationCollections([...inspirationCollections, newCollection]);
      toast.success("Collection created!");
    }
    setShowCollectionDialog(false);
  };

  const handleDeleteCollection = (id: string) => {
    setInspirationCollections(inspirationCollections.filter(col => col.id !== id));
    toast.success("Collection deleted!");
  };

  const handleAddItemToCollection = () => {
    setItemFormData({
      title: "",
      image: "",
      category: "",
      tags: "",
      description: "",
    });
    setShowItemDialog(true);
  };

  const handleSaveItem = () => {
    if (!selectedCollection || !itemFormData.title.trim()) {
      toast.error("Please enter item details");
      return;
    }

    const newItem: InspirationItem = {
      id: Date.now().toString(),
      title: itemFormData.title,
      image: itemFormData.image,
      category: itemFormData.category,
      tags: itemFormData.tags.split(",").map(t => t.trim()),
      description: itemFormData.description,
    };

    setInspirationCollections(inspirationCollections.map(col =>
      col.id === selectedCollection.id
        ? {
            ...col,
            items: [...col.items, newItem],
            itemCount: col.items.length + 1,
          }
        : col
    ));

    toast.success("Item added to collection!");
    setShowItemDialog(false);
  };

  const handleDeleteItem = (collectionId: string, itemId: string) => {
    setInspirationCollections(inspirationCollections.map(col =>
      col.id === collectionId
        ? {
            ...col,
            items: col.items.filter(item => item.id !== itemId),
            itemCount: col.items.length - 1,
          }
        : col
    ));
    toast.success("Item removed from collection!");
  };

  const filteredMessages = messagesData.filter(msg =>
    msg.clientName.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
    msg.lastMessage.toLowerCase().includes(messageSearchTerm.toLowerCase())
  );

  // Overview Tab
  if (activeTab === "overview") {
    return (
      <>
        {/* Business Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <Users className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-blue-600" />
              <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1 font-bold">{plannerStats.totalClients}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Clients</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <Calendar className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-[#DF6951]" />
              <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1 font-bold">{plannerStats.activeBookings}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Active Bookings</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CheckCircle2 className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-green-600" />
              <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1 font-bold">{plannerStats.completedWeddings}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Completed</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <Star className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-yellow-600 fill-yellow-600" />
              <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1 font-bold">{plannerStats.averageRating}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Avg Rating</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <DollarSign className="size-6 sm:size-8 mx-auto mb-1 sm:mb-2 text-purple-600" />
              <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1 font-bold">{formatPrice(plannerStats.monthlyEarnings)}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">This Month</p>
            </Card>
          </motion.div>
        </div>

        {/* Business Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Performance Overview */}
          <Card className="p-6 bg-gradient-to-br from-[#02542D]/5 to-[#02542D]/10 border-[#02542D]/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <BarChart3 className="size-5 text-[#02542D]" />
                Performance Overview
              </h3>
              <Badge className="bg-[#02542D]">This Month</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Profile Views</span>
                  <span className="text-sm font-semibold">{plannerStats.profileViews}</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                  <span className="text-sm font-semibold">32%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                  <span className="text-sm font-semibold">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </div>
            <Button className="w-full mt-4 bg-[#02542D] hover:bg-[#023a20]" size="sm">
              <BarChart3 className="size-4 mr-2" />
              View Detailed Analytics
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-to-br from-[#DF6951]/5 to-[#DF6951]/10 border-[#DF6951]/20">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Briefcase className="size-5 text-[#DF6951]" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => onNavigate?.('planner-edit')}
              >
                <Briefcase className="size-5 text-[#02542D]" />
                <span className="text-xs">Manage Profile</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageCircle className="size-5 text-blue-600" />
                <span className="text-xs">Messages ({plannerStats.messagesUnread})</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Package className="size-5 text-purple-600" />
                <span className="text-xs">Packages</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="size-5 text-[#DF6951]" />
                <span className="text-xs">Calendar</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity & Pending Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Quotes */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Pending Quotes</h3>
              <Badge variant="outline">{plannerStats.pendingQuotes} pending</Badge>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-[#DF6951] to-[#F1A501] flex items-center justify-center text-white font-semibold">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Client Name {i}</p>
                      <p className="text-xs text-muted-foreground">Bali, Indonesia</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Reviews */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Recent Reviews</h3>
              <div className="flex items-center gap-1">
                <Star className="size-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{plannerStats.averageRating}</span>
                <span className="text-sm text-muted-foreground">({plannerStats.totalReviews})</span>
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">Amazing Experience!</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="size-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Exceptional service from start to finish. Made our dream wedding come true!
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </>
    );
  }

  // Calendar Tab
  if (activeTab === "calendar") {
    return <PlannerCalendarView calendarData={calendarData} onUpdate={setCalendarData} />;
  }

  // Messages Tab
  if (activeTab === "messages") {
    return (
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <Card className="lg:col-span-1 p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={messageSearchTerm}
                onChange={(e) => setMessageSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            {filteredMessages.map((msg) => (
              <Card
                key={msg.id}
                className={`p-3 cursor-pointer transition-all ${
                  selectedMessage?.id === msg.id
                    ? "bg-[#DF6951]/10 border-[#DF6951]"
                    : "hover:bg-gray-50"
                } ${msg.unread ? "border-l-4 border-l-[#DF6951]" : ""}`}
                onClick={() => {
                  setSelectedMessage(msg);
                  markAsRead(msg.id);
                }}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-10">
                    <img src={msg.clientAvatar} alt={msg.clientName} />
                    <AvatarFallback>{msg.clientName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm truncate">{msg.clientName}</p>
                      {msg.unread && (
                        <div className="size-2 rounded-full bg-[#DF6951] shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{msg.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 p-6">
          {selectedMessage ? (
            <div className="flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b mb-4">
                <Avatar className="size-12">
                  <img src={selectedMessage.clientAvatar} alt={selectedMessage.clientName} />
                  <AvatarFallback>{selectedMessage.clientName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedMessage.clientName}</h3>
                  <p className="text-sm text-muted-foreground">Active now</p>
                </div>
                <Button variant="outline" size="sm">
                  <Phone className="size-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {selectedMessage.messages.map((chatMsg) => (
                  <div
                    key={chatMsg.id}
                    className={`flex ${chatMsg.sender === "planner" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        chatMsg.sender === "planner"
                          ? "bg-[#02542D] text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{chatMsg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          chatMsg.sender === "planner" ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {chatMsg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2 pt-4 border-t">
                <Input
                  placeholder="Type your message..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} className="bg-[#02542D] hover:bg-[#023a20]">
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] text-center">
              <MessageCircle className="size-16 text-muted-foreground/20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
              <p className="text-muted-foreground">
                Choose a message from the list to start chatting
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Portfolio (Inspiration Collections) Tab
  if (activeTab === "portfolio") {
    return (
      <>
        {/* Collections Overview */}
        {!selectedCollection && (
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Inspiration Collections</h2>
                <p className="text-muted-foreground">Create and manage your wedding inspiration collections</p>
              </div>
              <Button onClick={handleAddCollection} className="bg-[#02542D] hover:bg-[#023a20] gap-2">
                <Plus className="size-4" />
                New Collection
              </Button>
            </div>

            {/* Collections Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {inspirationCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setSelectedCollection(collection)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={collection.coverImage}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className={collection.isPublic ? "bg-green-600" : "bg-gray-600"}>
                        {collection.isPublic ? (
                          <>
                            <Globe className="size-3 mr-1" />
                            Public
                          </>
                        ) : (
                          <>
                            <Eye className="size-3 mr-1" />
                            Private
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ImageIcon className="size-4" />
                        <span>{collection.itemCount} items</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCollection(collection);
                          }}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCollection(collection.id);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Collection Detail View */}
        {selectedCollection && (
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCollection(null)}
              >
                <ChevronRight className="size-4 rotate-180" />
                Back
              </Button>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{selectedCollection.name}</h2>
                <p className="text-muted-foreground">{selectedCollection.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCollectionViewMode(collectionViewMode === "grid" ? "list" : "grid")}
                >
                  {collectionViewMode === "grid" ? <List className="size-4" /> : <Grid className="size-4" />}
                </Button>
                <Button onClick={handleAddItemToCollection} size="sm" className="bg-[#02542D] hover:bg-[#023a20] gap-2">
                  <Plus className="size-4" />
                  Add Item
                </Button>
              </div>
            </div>

            {/* Collection Items */}
            <div className={collectionViewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
              {selectedCollection.items.map((item) => (
                <Card key={item.id} className="overflow-hidden group">
                  <div className={collectionViewMode === "grid" ? "" : "flex gap-4"}>
                    <div className={`relative overflow-hidden ${collectionViewMode === "grid" ? "h-48" : "w-48 h-48 shrink-0"}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteItem(selectedCollection.id, item.id)}
                          className="text-red-600 hover:text-red-700 -mt-2"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      <Badge className="mb-2">{item.category}</Badge>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {selectedCollection.items.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="size-16 mx-auto text-muted-foreground/20 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No items yet</h3>
                <p className="text-muted-foreground mb-4">Start adding inspiration items to this collection</p>
                <Button onClick={handleAddItemToCollection} className="bg-[#02542D] hover:bg-[#023a20] gap-2">
                  <Plus className="size-4" />
                  Add First Item
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Collection Dialog */}
        <Dialog open={showCollectionDialog} onOpenChange={setShowCollectionDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCollection ? "Edit Collection" : "Create New Collection"}
              </DialogTitle>
              <DialogDescription>
                Organize your wedding inspiration into collections
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Collection Name</Label>
                <Input
                  value={collectionFormData.name}
                  onChange={(e) => setCollectionFormData({ ...collectionFormData, name: e.target.value })}
                  placeholder="e.g., Beach Wedding Bliss"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={collectionFormData.description}
                  onChange={(e) => setCollectionFormData({ ...collectionFormData, description: e.target.value })}
                  placeholder="Describe this collection"
                  rows={3}
                />
              </div>
              <div>
                <Label>Cover Image URL</Label>
                <Input
                  value={collectionFormData.coverImage}
                  onChange={(e) => setCollectionFormData({ ...collectionFormData, coverImage: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={collectionFormData.isPublic}
                  onChange={(e) => setCollectionFormData({ ...collectionFormData, isPublic: e.target.checked })}
                  className="size-4 rounded"
                />
                <Label htmlFor="isPublic" className="cursor-pointer">
                  Make this collection public (visible on your profile)
                </Label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveCollection} className="flex-1 bg-[#02542D] hover:bg-[#023a20]">
                  <Save className="size-4 mr-2" />
                  Save Collection
                </Button>
                <Button variant="outline" onClick={() => setShowCollectionDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Item Dialog */}
        <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Inspiration Item</DialogTitle>
              <DialogDescription>
                Add a new item to {selectedCollection?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={itemFormData.title}
                  onChange={(e) => setItemFormData({ ...itemFormData, title: e.target.value })}
                  placeholder="e.g., Tropical Beach Ceremony"
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  value={itemFormData.image}
                  onChange={(e) => setItemFormData({ ...itemFormData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={itemFormData.category}
                  onChange={(e) => setItemFormData({ ...itemFormData, category: e.target.value })}
                  placeholder="e.g., Ceremony, Decor, Venue"
                />
              </div>
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={itemFormData.tags}
                  onChange={(e) => setItemFormData({ ...itemFormData, tags: e.target.value })}
                  placeholder="e.g., Beach, Tropical, Sunset"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={itemFormData.description}
                  onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                  placeholder="Describe this inspiration"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveItem} className="flex-1 bg-[#02542D] hover:bg-[#023a20]">
                  <Save className="size-4 mr-2" />
                  Add Item
                </Button>
                <Button variant="outline" onClick={() => setShowItemDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Quotes Tab
  if (activeTab === "quotes") {
    if (showQuoteCreator) {
      return (
        <QuoteCreatorPage
          existingQuote={editingQuote || undefined}
          onSave={(quote) => {
            if (editingQuote) {
              setQuotesData(quotesData.map(q => q.id === quote.id ? quote : q));
            } else {
              setQuotesData([...quotesData, quote]);
            }
            setShowQuoteCreator(false);
            setEditingQuote(null);
          }}
          onBack={() => {
            setShowQuoteCreator(false);
            setEditingQuote(null);
          }}
        />
      );
    }

    return (
      <PlannerQuotesView
        quotes={quotesData}
        onUpdate={setQuotesData}
        onNavigateToCreate={(quote) => {
          setEditingQuote(quote || null);
          setShowQuoteCreator(true);
        }}
      />
    );
  }

  // Render planner-specific content for other tabs
  return (
    <Card className="p-8 text-center">
      <Briefcase className="size-16 mx-auto mb-4 text-[#02542D]/20" />
      <h3 className="text-xl font-semibold mb-2 capitalize">Business {activeTab}</h3>
      <p className="text-muted-foreground mb-4">
        This section contains your planner-specific {activeTab} information.
      </p>
      <Button 
        className="bg-[#02542D] hover:bg-[#023a20]"
        onClick={() => onNavigate?.('planner-edit')}
      >
        Manage Business Profile
      </Button>
    </Card>
  );
}
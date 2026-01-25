import { useState, useRef } from "react";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Send,
  Download,
  Eye,
  Check,
  X,
  Clock,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Save,
  Copy,
  Percent,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { useCurrency } from "./CurrencyContext";

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

interface PlannerQuotesViewProps {
  quotes: Quote[];
  onUpdate: (quotes: Quote[]) => void;
  onNavigateToCreate?: (quote?: Quote) => void;
}

export function PlannerQuotesView({ quotes, onUpdate, onNavigateToCreate }: PlannerQuotesViewProps) {
  const { formatPrice, currency } = useCurrency();
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [viewingQuote, setViewingQuote] = useState<Quote | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Form Data
  const [quoteFormData, setQuoteFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    destination: "",
    eventDate: "",
    validUntil: "",
    notes: "",
    termsAndConditions: "",
    taxRate: 10,
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 0,
  });

  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([
    { id: "1", description: "", quantity: 1, rate: 0, amount: 0 }
  ]);

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const discountAmount = quoteFormData.discountType === "percentage"
      ? (subtotal * quoteFormData.discountValue) / 100
      : quoteFormData.discountValue;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * quoteFormData.taxRate) / 100;
    const total = afterDiscount + taxAmount;

    return { subtotal, discountAmount, taxAmount, total };
  };

  const { subtotal, discountAmount, taxAmount, total } = calculateTotals();

  // Handle Line Items
  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: "", quantity: 1, rate: 0, amount: 0 }
    ]);
  };

  const handleUpdateLineItem = (id: string, field: keyof QuoteLineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    }));
  };

  const handleDeleteLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    } else {
      toast.error("At least one line item is required");
    }
  };

  // Handle Quote CRUD
  const handleCreateQuote = () => {
    if (onNavigateToCreate) {
      onNavigateToCreate();
    } else {
      // Fallback to dialog if no navigation provided
      setEditingQuote(null);
      setQuoteFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        destination: "",
        eventDate: "",
        validUntil: "",
        notes: "",
        termsAndConditions: "Payment terms: 50% deposit upon booking, 50% due 30 days before the event.\nCancellation policy: Deposits are non-refundable.\nAll prices are in the selected currency and subject to availability.",
        taxRate: 10,
        discountType: "percentage",
        discountValue: 0,
      });
      setLineItems([
        { id: "1", description: "Wedding Planning Services", quantity: 1, rate: 0, amount: 0 }
      ]);
      setShowQuoteDialog(true);
    }
  };

  const handleEditQuote = (quote: Quote) => {
    if (onNavigateToCreate) {
      onNavigateToCreate(quote);
    } else {
      // Fallback to dialog if no navigation provided
      setEditingQuote(quote);
      setQuoteFormData({
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        clientPhone: quote.clientPhone || "",
        destination: quote.destination,
        eventDate: quote.eventDate,
        validUntil: quote.validUntil,
        notes: quote.notes || "",
        termsAndConditions: quote.termsAndConditions || "",
        taxRate: quote.taxRate,
        discountType: quote.discountType,
        discountValue: quote.discountValue,
      });
      setLineItems(quote.lineItems);
      setShowQuoteDialog(true);
    }
  };

  const handleSaveQuote = () => {
    // Validation
    if (!quoteFormData.clientName.trim()) {
      toast.error("Please enter client name");
      return;
    }
    if (!quoteFormData.clientEmail.trim()) {
      toast.error("Please enter client email");
      return;
    }
    if (!quoteFormData.destination.trim()) {
      toast.error("Please enter destination");
      return;
    }
    if (!quoteFormData.eventDate) {
      toast.error("Please select event date");
      return;
    }
    if (lineItems.some(item => !item.description.trim())) {
      toast.error("Please fill in all line item descriptions");
      return;
    }

    const { subtotal, discountAmount, taxAmount, total } = calculateTotals();
    
    if (editingQuote) {
      // Update existing quote
      const updatedQuote: Quote = {
        ...editingQuote,
        ...quoteFormData,
        lineItems,
        subtotal,
        taxAmount,
        discountAmount,
        total,
      };
      onUpdate(quotes.map(q => q.id === editingQuote.id ? updatedQuote : q));
      toast.success("Quote updated successfully!");
    } else {
      // Create new quote
      const quoteNumber = `Q-${Date.now().toString().slice(-6)}`;
      const newQuote: Quote = {
        id: Date.now().toString(),
        quoteNumber,
        ...quoteFormData,
        createdDate: new Date().toISOString().split('T')[0],
        status: "draft",
        lineItems,
        subtotal,
        taxAmount,
        discountAmount,
        total,
      };
      onUpdate([...quotes, newQuote]);
      toast.success("Quote created successfully!");
    }
    setShowQuoteDialog(false);
  };

  const handleDeleteQuote = (id: string) => {
    onUpdate(quotes.filter(q => q.id !== id));
    toast.success("Quote deleted!");
  };

  const handleSendQuote = (quote: Quote) => {
    const updatedQuote = { ...quote, status: "sent" as const };
    onUpdate(quotes.map(q => q.id === quote.id ? updatedQuote : q));
    toast.success(`Quote sent to ${quote.clientEmail}!`);
  };

  const handleDuplicateQuote = (quote: Quote) => {
    const newQuote: Quote = {
      ...quote,
      id: Date.now().toString(),
      quoteNumber: `Q-${Date.now().toString().slice(-6)}`,
      status: "draft",
      createdDate: new Date().toISOString().split('T')[0],
    };
    onUpdate([...quotes, newQuote]);
    toast.success("Quote duplicated!");
  };

  const handlePreviewQuote = (quote: Quote) => {
    setViewingQuote(quote);
    setShowPreviewDialog(true);
  };

  // Download PDF
  const handleDownloadPDF = async () => {
    if (!pdfRef.current || !viewingQuote) return;

    try {
      toast.info("Generating PDF...");
      
      // Dynamic imports to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const element = pdfRef.current;
      
      // Set A4 dimensions for the element before capture
      const originalWidth = element.style.width;
      element.style.width = '210mm'; // A4 width
      element.style.maxWidth = '210mm';
      
      // Configure html2canvas for A4 layout
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI (210mm)
        windowWidth: 794,
      });

      // Restore original width
      element.style.width = originalWidth;
      element.style.maxWidth = '';

      // A4 dimensions in mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      // Calculate image dimensions to fit A4
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      // Save the PDF
      const fileName = `Quote-${viewingQuote.quoteNumber}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-700 border-gray-200";
      case "sent": return "bg-blue-100 text-blue-700 border-blue-200";
      case "accepted": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      case "expired": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft": return <Edit className="size-3" />;
      case "sent": return <Send className="size-3" />;
      case "accepted": return <Check className="size-3" />;
      case "rejected": return <X className="size-3" />;
      case "expired": return <Clock className="size-3" />;
      default: return <FileText className="size-3" />;
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quotes Management</h2>
            <p className="text-muted-foreground">Create and manage custom quotes for your clients</p>
          </div>
          <Button onClick={handleCreateQuote} className="bg-[#02542D] hover:bg-[#023a20] gap-2">
            <Plus className="size-4" />
            Create Quote
          </Button>
        </div>

        {/* Quote Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total</p>
            <p className="text-2xl font-bold">{quotes.length}</p>
          </Card>
          <Card className="p-4 text-center bg-gray-50">
            <p className="text-sm text-muted-foreground mb-1">Draft</p>
            <p className="text-2xl font-bold">{quotes.filter(q => q.status === "draft").length}</p>
          </Card>
          <Card className="p-4 text-center bg-blue-50">
            <p className="text-sm text-muted-foreground mb-1">Sent</p>
            <p className="text-2xl font-bold">{quotes.filter(q => q.status === "sent").length}</p>
          </Card>
          <Card className="p-4 text-center bg-green-50">
            <p className="text-sm text-muted-foreground mb-1">Accepted</p>
            <p className="text-2xl font-bold">{quotes.filter(q => q.status === "accepted").length}</p>
          </Card>
          <Card className="p-4 text-center bg-red-50">
            <p className="text-sm text-muted-foreground mb-1">Rejected</p>
            <p className="text-2xl font-bold">{quotes.filter(q => q.status === "rejected").length}</p>
          </Card>
        </div>

        <Separator className="my-6" />

        {/* Quotes List */}
        <div className="space-y-4">
          {quotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="size-16 mx-auto text-muted-foreground/20 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No quotes yet</h3>
              <p className="text-muted-foreground mb-4">Create your first quote to send to clients</p>
              <Button onClick={handleCreateQuote} className="bg-[#02542D] hover:bg-[#023a20] gap-2">
                <Plus className="size-4" />
                Create First Quote
              </Button>
            </div>
          ) : (
            quotes.map((quote) => (
              <Card key={quote.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{quote.quoteNumber}</h3>
                      <Badge className={`${getStatusColor(quote.status)} capitalize`}>
                        {getStatusIcon(quote.status)}
                        <span className="ml-1">{quote.status}</span>
                      </Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="size-4" />
                        <span className="font-medium">{quote.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="size-4" />
                        <span>{quote.clientEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="size-4" />
                        <span>{quote.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>{new Date(quote.eventDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-[#02542D]">{formatPrice(quote.total)}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({quote.lineItems.length} {quote.lineItems.length === 1 ? 'item' : 'items'})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePreviewQuote(quote)}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditQuote(quote)}
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDuplicateQuote(quote)}
                    >
                      <Copy className="size-4" />
                    </Button>
                    {quote.status === "draft" && (
                      <Button
                        size="sm"
                        className="bg-[#DF6951] hover:bg-[#c55a43]"
                        onClick={() => handleSendQuote(quote)}
                      >
                        <Send className="size-4 mr-1" />
                        Send
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteQuote(quote.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>

      {/* Create/Edit Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingQuote ? "Edit Quote" : "Create New Quote"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to create a custom quote for your client
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="font-semibold mb-3">Client Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Client Name *</Label>
                  <Input
                    value={quoteFormData.clientName}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, clientName: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label>Client Email *</Label>
                  <Input
                    type="email"
                    value={quoteFormData.clientEmail}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, clientEmail: e.target.value })}
                    placeholder="client@email.com"
                  />
                </div>
                <div>
                  <Label>Client Phone</Label>
                  <Input
                    value={quoteFormData.clientPhone}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, clientPhone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <Label>Destination *</Label>
                  <Input
                    value={quoteFormData.destination}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, destination: e.target.value })}
                    placeholder="e.g., Bali, Indonesia"
                  />
                </div>
                <div>
                  <Label>Event Date *</Label>
                  <Input
                    type="date"
                    value={quoteFormData.eventDate}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, eventDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Valid Until</Label>
                  <Input
                    type="date"
                    value={quoteFormData.validUntil}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, validUntil: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Line Items</h3>
                <Button size="sm" variant="outline" onClick={handleAddLineItem}>
                  <Plus className="size-4 mr-1" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-3">
                {lineItems.map((item, index) => (
                  <Card key={item.id} className="p-4">
                    <div className="grid gap-3">
                      <div className="grid sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-5">
                          <Label className="text-xs">Description *</Label>
                          <Input
                            value={item.description}
                            onChange={(e) => handleUpdateLineItem(item.id, "description", e.target.value)}
                            placeholder="Service or item description"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="text-xs">Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleUpdateLineItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="text-xs">Rate</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.rate}
                            onChange={(e) => handleUpdateLineItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="text-xs">Amount</Label>
                          <Input
                            value={formatPrice(item.amount)}
                            disabled
                            className="bg-gray-50"
                          />
                        </div>
                        <div className="sm:col-span-1 flex items-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteLineItem(item.id)}
                            className="w-full text-red-600 hover:text-red-700"
                            disabled={lineItems.length === 1}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Calculations */}
            <div>
              <h3 className="font-semibold mb-3">Pricing Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Tax Rate (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={quoteFormData.taxRate}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, taxRate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Discount Type</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={quoteFormData.discountType}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, discountType: e.target.value as "percentage" | "fixed" })}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <Label>Discount Value</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={quoteFormData.discountValue}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, discountValue: parseFloat(e.target.value) || 0 })}
                    placeholder={quoteFormData.discountType === "percentage" ? "0-100" : "0.00"}
                  />
                </div>
              </div>

              {/* Totals Summary */}
              <Card className="p-4 mt-4 bg-gray-50">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({quoteFormData.discountType === "percentage" ? `${quoteFormData.discountValue}%` : formatPrice(quoteFormData.discountValue)}):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax ({quoteFormData.taxRate}%):</span>
                    <span className="font-medium">{formatPrice(taxAmount)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-[#02542D]">{formatPrice(total)}</span>
                  </div>
                </div>
              </Card>
            </div>

            <Separator />

            {/* Notes and Terms */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={quoteFormData.notes}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, notes: e.target.value })}
                  placeholder="Additional notes for the client"
                  rows={4}
                />
              </div>
              <div>
                <Label>Terms & Conditions</Label>
                <Textarea
                  value={quoteFormData.termsAndConditions}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, termsAndConditions: e.target.value })}
                  placeholder="Payment terms, cancellation policy, etc."
                  rows={4}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveQuote} className="flex-1 bg-[#02542D] hover:bg-[#023a20]">
                <Save className="size-4 mr-2" />
                {editingQuote ? "Update Quote" : "Save Quote"}
              </Button>
              <Button variant="outline" onClick={() => setShowQuoteDialog(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Quote Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quote Preview</DialogTitle>
            <DialogDescription>Preview of quote {viewingQuote?.quoteNumber}</DialogDescription>
          </DialogHeader>

          {viewingQuote && (
            <div className="space-y-6" ref={pdfRef} style={{ backgroundColor: '#ffffff', color: '#000000', padding: '24px' }}>
              {/* Quote Header */}
              <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#02542D', marginBottom: '8px', margin: 0 }}>QUOTE</h2>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#000000', margin: 0 }}>{viewingQuote.quoteNumber}</p>
                  </div>
                  <span style={{ 
                    backgroundColor: viewingQuote.status === 'draft' ? '#f3f4f6' : 
                                   viewingQuote.status === 'sent' ? '#dbeafe' : 
                                   viewingQuote.status === 'accepted' ? '#dcfce7' : 
                                   viewingQuote.status === 'rejected' ? '#fee2e2' : '#fed7aa',
                    color: viewingQuote.status === 'draft' ? '#374151' : 
                           viewingQuote.status === 'sent' ? '#1e40af' : 
                           viewingQuote.status === 'accepted' ? '#166534' : 
                           viewingQuote.status === 'rejected' ? '#991b1b' : '#9a3412',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    border: '1px solid',
                    borderColor: viewingQuote.status === 'draft' ? '#e5e7eb' : 
                                viewingQuote.status === 'sent' ? '#bfdbfe' : 
                                viewingQuote.status === 'accepted' ? '#bbf7d0' : 
                                viewingQuote.status === 'rejected' ? '#fecaca' : '#fed7aa'
                  }}>
                    {viewingQuote.status}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                  <div>
                    <p style={{ color: '#6b7280', margin: 0, marginBottom: '4px' }}>Date Created:</p>
                    <p style={{ fontWeight: '500', color: '#000000', margin: 0 }}>{new Date(viewingQuote.createdDate).toLocaleDateString()}</p>
                  </div>
                  {viewingQuote.validUntil && (
                    <div>
                      <p style={{ color: '#6b7280', margin: 0, marginBottom: '4px' }}>Valid Until:</p>
                      <p style={{ fontWeight: '500', color: '#000000', margin: 0 }}>{new Date(viewingQuote.validUntil).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Client & Event Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <h3 style={{ fontWeight: '600', marginBottom: '8px', marginTop: 0, color: '#000000' }}>Bill To:</h3>
                  <p style={{ fontWeight: '500', color: '#000000', margin: 0, marginBottom: '4px' }}>{viewingQuote.clientName}</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, marginBottom: '4px' }}>{viewingQuote.clientEmail}</p>
                  {viewingQuote.clientPhone && (
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{viewingQuote.clientPhone}</p>
                  )}
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', marginBottom: '8px', marginTop: 0, color: '#000000' }}>Event Details:</h3>
                  <div style={{ fontSize: '14px' }}>
                    <p style={{ margin: 0, marginBottom: '4px', color: '#000000' }}>📍 {viewingQuote.destination}</p>
                    <p style={{ margin: 0, color: '#000000' }}>📅 {new Date(viewingQuote.eventDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '12px', marginTop: 0, color: '#000000' }}>Services & Items</h3>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9fafb' }}>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #e5e7eb' }}>Description</th>
                        <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #e5e7eb' }}>Qty</th>
                        <th style={{ textAlign: 'right', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #e5e7eb' }}>Rate</th>
                        <th style={{ textAlign: 'right', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #e5e7eb' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewingQuote.lineItems.map((item, index) => (
                        <tr key={item.id}>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#000000', borderTop: index > 0 ? '1px solid #f3f4f6' : 'none' }}>{item.description}</td>
                          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center', color: '#000000', borderTop: index > 0 ? '1px solid #f3f4f6' : 'none' }}>{item.quantity}</td>
                          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#000000', borderTop: index > 0 ? '1px solid #f3f4f6' : 'none' }}>{formatPrice(item.rate)}</td>
                          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', fontWeight: '500', color: '#000000', borderTop: index > 0 ? '1px solid #f3f4f6' : 'none' }}>{formatPrice(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', maxWidth: '320px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ color: '#6b7280' }}>Subtotal:</span>
                    <span style={{ fontWeight: '500', color: '#000000' }}>{formatPrice(viewingQuote.subtotal)}</span>
                  </div>
                  {viewingQuote.discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#10b981' }}>
                      <span>Discount:</span>
                      <span>-{formatPrice(viewingQuote.discountAmount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ color: '#6b7280' }}>Tax ({viewingQuote.taxRate}%):</span>
                    <span style={{ fontWeight: '500', color: '#000000' }}>{formatPrice(viewingQuote.taxAmount)}</span>
                  </div>
                  <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '8px', marginBottom: '8px' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#000000' }}>Total:</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#02542D' }}>{formatPrice(viewingQuote.total)}</span>
                  </div>
                </div>
              </div>

              {/* Notes & Terms */}
              {viewingQuote.notes && (
                <div>
                  <h3 style={{ fontWeight: '600', marginBottom: '8px', marginTop: 0, color: '#000000' }}>Notes:</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', whiteSpace: 'pre-wrap', margin: 0 }}>{viewingQuote.notes}</p>
                </div>
              )}
              {viewingQuote.termsAndConditions && (
                <div>
                  <h3 style={{ fontWeight: '600', marginBottom: '8px', marginTop: 0, color: '#000000' }}>Terms & Conditions:</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', whiteSpace: 'pre-wrap', margin: 0 }}>{viewingQuote.termsAndConditions}</p>
                </div>
              )}

              {/* Footer */}
              <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Thank you for considering our services!</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0, marginTop: '4px' }}>Powered by Wedzway</p>
              </div>
            </div>
          )}

          {/* Action buttons outside PDF ref */}
          {viewingQuote && (
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleDownloadPDF} className="flex-1 bg-[#02542D] hover:bg-[#023a20]">
                <Download className="size-4 mr-2" />
                Download PDF
              </Button>
              {viewingQuote.status === "draft" && (
                <Button 
                  className="flex-1 bg-[#DF6951] hover:bg-[#c55a43]"
                  onClick={() => {
                    handleSendQuote(viewingQuote);
                    setShowPreviewDialog(false);
                  }}
                >
                  <Send className="size-4 mr-2" />
                  Send to Client
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
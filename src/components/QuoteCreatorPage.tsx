"use client";

import { useState, useRef } from "react";
import {
  ArrowLeft,
  Save,
  Send,
  Download,
  Plus,
  Trash2,
  Eye,
  Percent,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
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

interface QuoteCreatorPageProps {
  existingQuote?: Quote;
  onSave: (quote: Quote) => void;
  onBack: () => void;
}

export function QuoteCreatorPage({ existingQuote, onSave, onBack }: QuoteCreatorPageProps) {
  const { formatPrice, currency } = useCurrency();
  const pdfRef = useRef<HTMLDivElement>(null);

  // Form Data
  const [quoteFormData, setQuoteFormData] = useState({
    clientName: existingQuote?.clientName || "",
    clientEmail: existingQuote?.clientEmail || "",
    clientPhone: existingQuote?.clientPhone || "",
    destination: existingQuote?.destination || "",
    eventDate: existingQuote?.eventDate || "",
    validUntil: existingQuote?.validUntil || "",
    notes: existingQuote?.notes || "",
    termsAndConditions: existingQuote?.termsAndConditions || "Payment terms: 50% deposit upon booking, 50% due 30 days before the event.\nCancellation policy: Deposits are non-refundable.\nAll prices are subject to availability.",
    taxRate: existingQuote?.taxRate || 10,
    discountType: (existingQuote?.discountType || "percentage") as "percentage" | "fixed",
    discountValue: existingQuote?.discountValue || 0,
  });

  const [lineItems, setLineItems] = useState<QuoteLineItem[]>(
    existingQuote?.lineItems || [
      { id: "1", description: "Wedding Planning Services", quantity: 1, rate: 0, amount: 0 }
    ]
  );

  const [showPreview, setShowPreview] = useState(false);

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

  // Handle Save
  const handleSave = (sendToClient = false) => {
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
    
    const quote: Quote = existingQuote ? {
      ...existingQuote,
      ...quoteFormData,
      lineItems,
      subtotal,
      taxAmount,
      discountAmount,
      total,
      status: sendToClient ? "sent" : existingQuote.status,
    } : {
      id: Date.now().toString(),
      quoteNumber: `Q-${Date.now().toString().slice(-6)}`,
      ...quoteFormData,
      createdDate: new Date().toISOString().split('T')[0],
      status: sendToClient ? "sent" : "draft",
      lineItems,
      subtotal,
      taxAmount,
      discountAmount,
      total,
    };

    onSave(quote);
    
    if (sendToClient) {
      toast.success(`Quote sent to ${quote.clientEmail}!`);
    } else {
      toast.success(existingQuote ? "Quote updated successfully!" : "Quote created successfully!");
    }
    
    onBack();
  };

  // Download PDF
  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    try {
      toast.info("Generating PDF...");
      
      // Dynamic imports to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const element = pdfRef.current;
      
      // Configure html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // Calculate dimensions for A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const fileName = `Quote-${existingQuote?.quoteNumber || 'NEW'}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="space-y-4">
            {/* Back Button */}
            <div>
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="size-4 mr-2" />
                Back to Quotes
              </Button>
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-2xl font-bold">
                {existingQuote ? `Edit Quote ${existingQuote.quoteNumber}` : "Create New Quote"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Fill in the details to {existingQuote ? "update" : "create"} a custom quote
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="size-4 mr-2" />
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
              <Button variant="outline" onClick={handleDownloadPDF}>
                <Download className="size-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => handleSave(false)}>
                <Save className="size-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-[#DF6951] hover:bg-[#c55a43]" onClick={() => handleSave(true)}>
                <Send className="size-4 mr-2" />
                Save & Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${showPreview ? "lg:grid-cols-2" : "grid-cols-1"} gap-6`}>
          {/* Form Section */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Client Information</h3>
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
            </Card>

            {/* Line Items */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Line Items</h3>
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
            </Card>

            {/* Pricing Details */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Pricing Details</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
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
              <Card className="p-4 bg-gray-50">
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
            </Card>

            {/* Notes and Terms */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Additional Information</h3>
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
            </Card>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Live Preview</h3>
                  <Badge className="bg-blue-100 text-blue-700">Preview</Badge>
                </div>
                <div className="border rounded-lg p-6 bg-white" ref={pdfRef}>
                  <QuotePDFContent
                    quoteData={{
                      quoteNumber: existingQuote?.quoteNumber || `Q-${Date.now().toString().slice(-6)}`,
                      createdDate: existingQuote?.createdDate || new Date().toISOString().split('T')[0],
                      ...quoteFormData,
                      lineItems,
                      subtotal,
                      taxAmount,
                      discountAmount,
                      total,
                    }}
                    formatPrice={formatPrice}
                    currency={currency}
                  />
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Hidden PDF Template for Download */}
      {!showPreview && (
        <div className="fixed -left-[9999px] top-0">
          <div ref={pdfRef} className="w-[210mm] bg-white p-[10mm]">
            <QuotePDFContent
              quoteData={{
                quoteNumber: existingQuote?.quoteNumber || `Q-${Date.now().toString().slice(-6)}`,
                createdDate: existingQuote?.createdDate || new Date().toISOString().split('T')[0],
                ...quoteFormData,
                lineItems,
                subtotal,
                taxAmount,
                discountAmount,
                total,
              }}
              formatPrice={formatPrice}
              currency={currency}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// PDF Content Component
function QuotePDFContent({ quoteData, formatPrice, currency }: any) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '14px', lineHeight: '1.5', color: '#374151' }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #02542D', paddingBottom: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#02542D', margin: '0 0 8px 0' }}>QUOTE</h1>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#4B5563', margin: 0 }}>{quoteData.quoteNumber}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 4px 0' }}>Date Created</p>
            <p style={{ fontWeight: '500', margin: '0 0 8px 0' }}>{new Date(quoteData.createdDate).toLocaleDateString()}</p>
            {quoteData.validUntil && (
              <>
                <p style={{ fontSize: '11px', color: '#6B7280', margin: '8px 0 4px 0' }}>Valid Until</p>
                <p style={{ fontWeight: '500', margin: 0 }}>{new Date(quoteData.validUntil).toLocaleDateString()}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Client & Event Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontWeight: '600', color: '#02542D', marginBottom: '8px', fontSize: '16px' }}>Bill To:</h3>
          <p style={{ fontWeight: '500', fontSize: '16px', margin: '0 0 4px 0' }}>{quoteData.clientName}</p>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
              <Mail className="size-3" style={{ width: '12px', height: '12px' }} />
              <span>{quoteData.clientEmail}</span>
            </div>
            {quoteData.clientPhone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
                <Phone className="size-3" style={{ width: '12px', height: '12px' }} />
                <span>{quoteData.clientPhone}</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <h3 style={{ fontWeight: '600', color: '#02542D', marginBottom: '8px', fontSize: '16px' }}>Event Details:</h3>
          <div style={{ fontSize: '11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
              <MapPin className="size-3" style={{ width: '12px', height: '12px', color: '#6B7280' }} />
              <span style={{ fontWeight: '500' }}>{quoteData.destination}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
              <Calendar className="size-3" style={{ width: '12px', height: '12px', color: '#6B7280' }} />
              <span style={{ fontWeight: '500' }}>{new Date(quoteData.eventDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontWeight: '600', color: '#02542D', marginBottom: '12px', fontSize: '16px' }}>Services & Items</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F3F4F6' }}>
              <th style={{ textAlign: 'left', padding: '8px', fontSize: '11px', fontWeight: '600', borderBottom: '2px solid #D1D5DB' }}>Description</th>
              <th style={{ textAlign: 'center', padding: '8px', fontSize: '11px', fontWeight: '600', width: '64px', borderBottom: '2px solid #D1D5DB' }}>Qty</th>
              <th style={{ textAlign: 'right', padding: '8px', fontSize: '11px', fontWeight: '600', width: '96px', borderBottom: '2px solid #D1D5DB' }}>Rate</th>
              <th style={{ textAlign: 'right', padding: '8px', fontSize: '11px', fontWeight: '600', width: '112px', borderBottom: '2px solid #D1D5DB' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {quoteData.lineItems.map((item: any, index: number) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px', fontSize: '11px' }}>{item.description}</td>
                <td style={{ padding: '8px', fontSize: '11px', textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ padding: '8px', fontSize: '11px', textAlign: 'right' }}>{formatPrice(item.rate)}</td>
                <td style={{ padding: '8px', fontSize: '11px', textAlign: 'right', fontWeight: '500' }}>{formatPrice(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <div style={{ width: '320px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '11px' }}>
            <span style={{ color: '#6B7280' }}>Subtotal:</span>
            <span style={{ fontWeight: '500' }}>{formatPrice(quoteData.subtotal)}</span>
          </div>
          {quoteData.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '11px', color: '#15803D' }}>
              <span>Discount:</span>
              <span>-{formatPrice(quoteData.discountAmount)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '11px' }}>
            <span style={{ color: '#6B7280' }}>Tax ({quoteData.taxRate}%):</span>
            <span style={{ fontWeight: '500' }}>{formatPrice(quoteData.taxAmount)}</span>
          </div>
          <div style={{ borderTop: '2px solid #D1D5DB', paddingTop: '8px', marginTop: '8px' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Total ({currency}):</span>
            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#02542D' }}>{formatPrice(quoteData.total)}</span>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {quoteData.notes && (
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px', marginBottom: '16px' }}>
          <h3 style={{ fontWeight: '600', color: '#02542D', marginBottom: '8px', fontSize: '14px' }}>Notes:</h3>
          <p style={{ fontSize: '11px', color: '#6B7280', whiteSpace: 'pre-wrap', margin: 0 }}>{quoteData.notes}</p>
        </div>
      )}
      {quoteData.termsAndConditions && (
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px', marginBottom: '16px' }}>
          <h3 style={{ fontWeight: '600', color: '#02542D', marginBottom: '8px', fontSize: '14px' }}>Terms & Conditions:</h3>
          <p style={{ fontSize: '11px', color: '#6B7280', whiteSpace: 'pre-wrap', margin: 0 }}>{quoteData.termsAndConditions}</p>
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 8px 0' }}>
          Thank you for choosing our services. We look forward to making your dream wedding a reality!
        </p>
        <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>Wedzway - Your Destination Wedding Partner</p>
      </div>
    </div>
  );
}
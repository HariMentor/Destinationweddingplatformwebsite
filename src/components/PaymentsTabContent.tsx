import {
  CreditCard,
  Building2,
  Wallet,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Download,
  Copy,
  Receipt,
  Calendar,
  Filter,
  Search,
  Upload,
  AlertCircle,
  FileCheck,
  FileX,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { useState } from "react";

interface Payment {
  id: string;
  transactionId: string;
  bookingReference: string;
  bookingType: string;
  itemName: string;
  paymentDate: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  cardLast4?: string;
  cardBrand?: string;
  bankName?: string;
  upiId?: string;
  invoiceUrl?: string;
  invoiceNumber: string;
  paidTo: string;
  description: string;
  transactionFee?: string;
  netAmount?: string;
  // Bank transfer specific fields
  bankTransferProof?: string;
  bankTransferStatus?: "pending-upload" | "uploaded" | "verified" | "rejected";
  bankTransferUploadDate?: string;
  bankTransferVerificationDate?: string;
  bankTransferRejectionReason?: string;
  bankAccountDetails?: {
    accountNumber: string;
    swiftCode: string;
    bankName: string;
    accountHolder: string;
    reference: string;
  };
}

interface PaymentsTabProps {
  payments: Payment[];
  paymentStatusFilter: string;
  setPaymentStatusFilter: (filter: string) => void;
  paymentMethodFilter: string;
  setPaymentMethodFilter: (filter: string) => void;
  paymentSearchTerm: string;
  setPaymentSearchTerm: (term: string) => void;
  filteredPayments: Payment[];
  paymentMethods: string[];
  // getStatusBadge: (status: string) => JSX.Element;
  getStatusBadge: (status: string) => React.ReactElement;
}

export function PaymentsTabContent({
  payments,
  paymentStatusFilter,
  setPaymentStatusFilter,
  paymentMethodFilter,
  setPaymentMethodFilter,
  paymentSearchTerm,
  setPaymentSearchTerm,
  filteredPayments,
  paymentMethods,
  getStatusBadge,
}: PaymentsTabProps) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showBankTransferDialog, setShowBankTransferDialog] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmitBankProof = async () => {
    if (!uploadedFile || !selectedPayment) return;

    setIsUploading(true);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUploading(false);
    setShowBankTransferDialog(false);
    setUploadedFile(null);

    toast.success(
      "Bank transfer proof uploaded successfully! We'll verify it within 2-3 business days.",
    );
  };

  const getBankTransferStatusBadge = (status?: string) => {
    switch (status) {
      case "pending-upload":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-300"
          >
            <Upload className="size-3 mr-1" />
            Awaiting Upload
          </Badge>
        );
      case "uploaded":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-300"
          >
            <Clock className="size-3 mr-1" />
            Under Review
          </Badge>
        );
      case "verified":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-300"
          >
            <FileCheck className="size-3 mr-1" />
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-300"
          >
            <FileX className="size-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit-card":
      case "debit-card":
        return <CreditCard className="size-5" />;
      case "bank-transfer":
      case "net-banking":
        return <Building2 className="size-5" />;
      case "upi":
        return <Wallet className="size-5" />;
      case "paypal":
        return <DollarSign className="size-5" />;
      default:
        return <CreditCard className="size-5" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      case "refunded":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Bank Transfer Upload Dialog */}
      <Dialog
        open={showBankTransferDialog}
        onOpenChange={setShowBankTransferDialog}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Bank Transfer Proof</DialogTitle>
            <DialogDescription>
              Upload your bank transfer confirmation to complete your payment
              verification
            </DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-6">
              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="font-medium mb-3">Payment Details</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Item</p>
                    <p className="font-medium">{selectedPayment.itemName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium text-[#DF6951]">
                      {selectedPayment.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Booking Reference</p>
                    <p className="font-mono text-xs">
                      {selectedPayment.bookingReference}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Transaction ID</p>
                    <p className="font-mono text-xs">
                      {selectedPayment.transactionId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Account Details */}
              {selectedPayment.bankAccountDetails && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium mb-3">Bank Account Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Bank Name:</span>
                      <span className="font-medium">
                        {selectedPayment.bankAccountDetails.bankName}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">
                        Account Number:
                      </span>
                      <span className="font-mono font-medium">
                        {selectedPayment.bankAccountDetails.accountNumber}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">SWIFT/BIC:</span>
                      <span className="font-mono font-medium">
                        {selectedPayment.bankAccountDetails.swiftCode}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">
                        Account Holder:
                      </span>
                      <span className="font-medium">
                        {selectedPayment.bankAccountDetails.accountHolder}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Reference:</span>
                      <span className="font-mono font-medium text-[#DF6951]">
                        {selectedPayment.bankAccountDetails.reference}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* File Upload */}
              <div className="space-y-3">
                <Label>Upload Transfer Confirmation</Label>
                <div className="relative">
                  <Input
                    id="bank-proof-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="bank-proof-upload"
                    className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-[#DF6951] hover:bg-rose-50/30 transition-colors"
                  >
                    <Upload className="size-6 text-muted-foreground" />
                    <div className="text-center">
                      <p className="font-medium">
                        {uploadedFile ? uploadedFile.name : "Click to upload"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="size-5 text-green-600" />
                    <span className="text-sm text-green-800">
                      File selected: {uploadedFile.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Verification Process:</p>
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Upload your bank transfer receipt or confirmation
                      </li>
                      <li>
                        • Our team will verify the payment within 2-3 business
                        days
                      </li>
                      <li>
                        • You'll receive an email confirmation once verified
                      </li>
                      <li>
                        • Your booking will be activated after verification
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowBankTransferDialog(false);
                setUploadedFile(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitBankProof}
              disabled={!uploadedFile || isUploading}
              className="bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="size-4 mr-2" />
                  Submit Proof
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
            Payment History
          </h3>
          <p className="text-muted-foreground">
            View all your wedding-related payments, invoices, and transactions
          </p>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="size-8 text-green-600" />
            <Badge className="bg-green-100 text-green-700">Completed</Badge>
          </div>
          <p className="text-2xl mb-1">
            {payments.filter((p) => p.paymentStatus === "completed").length}
          </p>
          <p className="text-sm text-muted-foreground">Successful Payments</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="size-8 text-yellow-600" />
            <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
          </div>
          <p className="text-2xl mb-1">
            {payments.filter((p) => p.paymentStatus === "pending").length}
          </p>
          <p className="text-sm text-muted-foreground">Pending Payments</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <Upload className="size-8 text-orange-600" />
            <Badge className="bg-orange-100 text-orange-700">Action</Badge>
          </div>
          <p className="text-2xl mb-1">
            {
              payments.filter(
                (p) =>
                  p.paymentStatus === "awaiting-confirmation" ||
                  p.bankTransferStatus === "pending-upload",
              ).length
            }
          </p>
          <p className="text-sm text-muted-foreground">Awaiting Upload</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <Wallet className="size-8 text-purple-600" />
            <Receipt className="size-5 text-purple-400" />
          </div>
          <p className="text-2xl mb-1">
            ₹
            {(
              payments
                .filter((p) => p.paymentStatus === "completed")
                .reduce((sum, p) => {
                  const amount = parseFloat(p.amount.replace(/[^0-9.]/g, ""));
                  return sum + (isNaN(amount) ? 0 : amount);
                }, 0) / 100000
            ).toFixed(2)}
            L
          </p>
          <p className="text-sm text-muted-foreground">Total Paid</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <Receipt className="size-8 text-blue-600" />
            <Download className="size-5 text-blue-400" />
          </div>
          <p className="text-2xl mb-1">{payments.length}</p>
          <p className="text-sm text-muted-foreground">Total Transactions</p>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by transaction ID, invoice number, or item name..."
              value={paymentSearchTerm}
              onChange={(e) => setPaymentSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Badges - Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="size-4" />
              <span>Filter by Status:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={paymentStatusFilter === "all" ? "default" : "outline"}
                className={`cursor-pointer ${paymentStatusFilter === "all" ? "bg-[#DF6951]" : ""}`}
                onClick={() => setPaymentStatusFilter("all")}
              >
                All ({payments.length})
              </Badge>
              <Badge
                variant={
                  paymentStatusFilter === "completed" ? "default" : "outline"
                }
                className={`cursor-pointer ${paymentStatusFilter === "completed" ? "bg-green-600" : ""}`}
                onClick={() => setPaymentStatusFilter("completed")}
              >
                <CheckCircle2 className="size-3 mr-1" />
                Completed (
                {payments.filter((p) => p.paymentStatus === "completed").length}
                )
              </Badge>
              <Badge
                variant={
                  paymentStatusFilter === "pending" ? "default" : "outline"
                }
                className={`cursor-pointer ${paymentStatusFilter === "pending" ? "bg-yellow-600" : ""}`}
                onClick={() => setPaymentStatusFilter("pending")}
              >
                <Clock className="size-3 mr-1" />
                Pending (
                {payments.filter((p) => p.paymentStatus === "pending").length})
              </Badge>
              <Badge
                variant={
                  paymentStatusFilter === "refunded" ? "default" : "outline"
                }
                className={`cursor-pointer ${paymentStatusFilter === "refunded" ? "bg-blue-600" : ""}`}
                onClick={() => setPaymentStatusFilter("refunded")}
              >
                <RefreshCw className="size-3 mr-1" />
                Refunded (
                {payments.filter((p) => p.paymentStatus === "refunded").length})
              </Badge>
              <Badge
                variant={
                  paymentStatusFilter === "failed" ? "default" : "outline"
                }
                className={`cursor-pointer ${paymentStatusFilter === "failed" ? "bg-red-600" : ""}`}
                onClick={() => setPaymentStatusFilter("failed")}
              >
                <XCircle className="size-3 mr-1" />
                Failed (
                {payments.filter((p) => p.paymentStatus === "failed").length})
              </Badge>
              <Badge
                variant={
                  paymentStatusFilter === "awaiting-confirmation"
                    ? "default"
                    : "outline"
                }
                className={`cursor-pointer ${paymentStatusFilter === "awaiting-confirmation" ? "bg-orange-600" : ""}`}
                onClick={() => setPaymentStatusFilter("awaiting-confirmation")}
              >
                <Upload className="size-3 mr-1" />
                Awaiting Confirmation (
                {
                  payments.filter(
                    (p) => p.paymentStatus === "awaiting-confirmation",
                  ).length
                }
                )
              </Badge>
            </div>
          </div>

          {/* Payment Method Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="size-4" />
              <span>Filter by Payment Method:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={paymentMethodFilter === "all" ? "default" : "outline"}
                className={`cursor-pointer ${paymentMethodFilter === "all" ? "bg-[#DF6951]" : ""}`}
                onClick={() => setPaymentMethodFilter("all")}
              >
                All Methods
              </Badge>
              {paymentMethods.map((method) => (
                <Badge
                  key={method}
                  variant={
                    paymentMethodFilter === method ? "default" : "outline"
                  }
                  className={`cursor-pointer ${paymentMethodFilter === method ? "bg-[#DF6951]" : ""}`}
                  onClick={() => setPaymentMethodFilter(method)}
                >
                  {method
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Payment List */}
      <div className="space-y-4">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <Card
              key={payment.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Section - Payment Method Icon */}
                <div className="shrink-0">
                  <div
                    className={`p-4 rounded-full ${getPaymentStatusColor(payment.paymentStatus)}`}
                  >
                    {getPaymentMethodIcon(payment.paymentMethod)}
                  </div>
                </div>

                {/* Middle Section - Payment Details */}
                <div className="flex-1 space-y-4">
                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <h4 className="text-xl mb-1">{payment.itemName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {payment.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(payment.paymentStatus)}
                    </div>
                  </div>

                  {/* Payment Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">
                        Transaction ID
                      </p>
                      <p className="font-mono text-xs">
                        {payment.transactionId}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Payment Date</p>
                      <p className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        {payment.paymentDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        Payment Method
                      </p>
                      <p className="capitalize">
                        {payment.paymentMethod.split("-").join(" ")}
                        {payment.cardLast4 && ` •••• ${payment.cardLast4}`}
                        {payment.cardBrand && ` (${payment.cardBrand})`}
                        {payment.bankName && ` - ${payment.bankName}`}
                        {payment.upiId && ` - ${payment.upiId}`}
                      </p>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Paid To</p>
                      <p className="font-semibold">{payment.paidTo}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        Booking Reference
                      </p>
                      <p className="font-mono text-xs">
                        {payment.bookingReference}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        Invoice Number
                      </p>
                      <p className="font-mono text-xs">
                        {payment.invoiceNumber}
                      </p>
                    </div>
                  </div>

                  {/* Amount Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Amount
                        </p>
                        <p className="text-xl text-[#DF6951]">
                          {payment.amount}
                        </p>
                      </div>
                      {payment.transactionFee && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Transaction Fee
                          </p>
                          <p className="text-sm">{payment.transactionFee}</p>
                        </div>
                      )}
                      {payment.netAmount && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Net Amount
                          </p>
                          <p className="text-sm font-semibold">
                            {payment.netAmount}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Notices */}
                  {payment.paymentStatus === "refunded" && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="size-4 text-blue-600" />
                        <p className="text-sm font-semibold text-blue-900">
                          This payment has been refunded to your original
                          payment method
                        </p>
                      </div>
                    </div>
                  )}

                  {payment.paymentStatus === "pending" && (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-yellow-600" />
                        <p className="text-sm font-semibold text-yellow-900">
                          Payment is being processed. Please allow 2-3 business
                          days.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Specific Statuses */}
                  {payment.paymentMethod === "bank-transfer" && (
                    <div className="space-y-3">
                      {/* Bank Transfer Status Badge */}
                      {payment.bankTransferStatus && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Transfer Status:
                          </span>
                          {getBankTransferStatusBadge(
                            payment.bankTransferStatus,
                          )}
                        </div>
                      )}

                      {/* Pending Upload Notice */}
                      {payment.bankTransferStatus === "pending-upload" && (
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Upload className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-amber-900 mb-1">
                                Upload Required
                              </p>
                              <p className="text-xs text-amber-800">
                                Please upload your bank transfer confirmation to
                                proceed with verification.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Uploaded - Under Review */}
                      {payment.bankTransferStatus === "uploaded" && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Clock className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-blue-900 mb-1">
                                Under Review
                              </p>
                              <p className="text-xs text-blue-800">
                                Uploaded on {payment.bankTransferUploadDate}.
                                We're verifying your payment.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Verified */}
                      {payment.bankTransferStatus === "verified" && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <FileCheck className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-green-900 mb-1">
                                Payment Verified
                              </p>
                              <p className="text-xs text-green-800">
                                Verified on{" "}
                                {payment.bankTransferVerificationDate}. Your
                                booking is confirmed!
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Rejected */}
                      {payment.bankTransferStatus === "rejected" && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <FileX className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-red-900 mb-1">
                                Proof Rejected
                              </p>
                              <p className="text-xs text-red-800 mb-2">
                                {payment.bankTransferRejectionReason ||
                                  "The uploaded proof could not be verified."}
                              </p>
                              <p className="text-xs text-red-700">
                                Please upload a clear copy of your bank transfer
                                confirmation.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Section - Actions */}
                <div className="shrink-0 flex flex-col gap-2 min-w-[140px]">
                  {/* Bank Transfer Upload Button */}
                  {payment.paymentMethod === "bank-transfer" &&
                    (payment.bankTransferStatus === "pending-upload" ||
                      payment.bankTransferStatus === "rejected") && (
                      <Button
                        size="sm"
                        className="w-full gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowBankTransferDialog(true);
                        }}
                      >
                        <Upload className="size-4" />
                        {payment.bankTransferStatus === "rejected"
                          ? "Re-upload"
                          : "Upload Proof"}
                      </Button>
                    )}

                  {/* View Proof Button for uploaded/verified */}
                  {payment.paymentMethod === "bank-transfer" &&
                    payment.bankTransferProof &&
                    (payment.bankTransferStatus === "uploaded" ||
                      payment.bankTransferStatus === "verified") && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          if (payment.bankTransferProof) {
                            window.open(payment.bankTransferProof, "_blank");
                          }
                        }}
                      >
                        <FileCheck className="size-4" />
                        View Proof
                      </Button>
                    )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      if (payment.invoiceUrl) {
                        window.open(payment.invoiceUrl, "_blank");
                      } else {
                        toast.info("Invoice generation in progress");
                      }
                    }}
                  >
                    <Download className="size-4" />
                    Invoice
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          payment.transactionId,
                        );
                        toast.success("Transaction ID copied!");
                      } catch (error) {
                        // Fallback: Show the ID in a toast
                        toast.info(`Transaction ID: ${payment.transactionId}`, {
                          duration: 5000,
                        });
                      }
                    }}
                  >
                    <Copy className="size-4" />
                    Copy ID
                  </Button>
                  <Button size="sm" variant="outline" className="w-full gap-2">
                    <Receipt className="size-4" />
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <Receipt className="size-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">
              {paymentSearchTerm
                ? "No payments found matching your search"
                : "No payments found"}
            </p>
            {paymentSearchTerm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPaymentSearchTerm("")}
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

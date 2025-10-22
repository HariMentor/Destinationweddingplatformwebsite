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
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";

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
  getStatusBadge: (status: string) => JSX.Element;
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="size-8 text-green-600" />
            <Badge className="bg-green-100 text-green-700">Completed</Badge>
          </div>
          <p className="text-2xl mb-1">
            {payments.filter(p => p.paymentStatus === "completed").length}
          </p>
          <p className="text-sm text-muted-foreground">Successful Payments</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="size-8 text-yellow-600" />
            <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
          </div>
          <p className="text-2xl mb-1">
            {payments.filter(p => p.paymentStatus === "pending").length}
          </p>
          <p className="text-sm text-muted-foreground">Pending Payments</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <Wallet className="size-8 text-purple-600" />
            <Receipt className="size-5 text-purple-400" />
          </div>
          <p className="text-2xl mb-1">
            ₹{((payments.filter(p => p.paymentStatus === "completed").reduce((sum, p) => {
              const amount = parseFloat(p.amount.replace(/[^0-9.]/g, ""));
              return sum + (isNaN(amount) ? 0 : amount);
            }, 0)) / 100000).toFixed(2)}L
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
                variant={paymentStatusFilter === "completed" ? "default" : "outline"}
                className={`cursor-pointer ${paymentStatusFilter === "completed" ? "bg-green-600" : ""}`}
                onClick={() => setPaymentStatusFilter("completed")}
              >
                <CheckCircle2 className="size-3 mr-1" />
                Completed ({payments.filter(p => p.paymentStatus === "completed").length})
              </Badge>
              <Badge
                variant={paymentStatusFilter === "pending" ? "default" : "outline"}
                className={`cursor-pointer ${paymentStatusFilter === "pending" ? "bg-yellow-600" : ""}`}
                onClick={() => setPaymentStatusFilter("pending")}
              >
                <Clock className="size-3 mr-1" />
                Pending ({payments.filter(p => p.paymentStatus === "pending").length})
              </Badge>
              <Badge
                variant={paymentStatusFilter === "refunded" ? "default" : "outline"}
                className={`cursor-pointer ${paymentStatusFilter === "refunded" ? "bg-blue-600" : ""}`}
                onClick={() => setPaymentStatusFilter("refunded")}
              >
                <RefreshCw className="size-3 mr-1" />
                Refunded ({payments.filter(p => p.paymentStatus === "refunded").length})
              </Badge>
              <Badge
                variant={paymentStatusFilter === "failed" ? "default" : "outline"}
                className={`cursor-pointer ${paymentStatusFilter === "failed" ? "bg-red-600" : ""}`}
                onClick={() => setPaymentStatusFilter("failed")}
              >
                <XCircle className="size-3 mr-1" />
                Failed ({payments.filter(p => p.paymentStatus === "failed").length})
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
                  variant={paymentMethodFilter === method ? "default" : "outline"}
                  className={`cursor-pointer ${paymentMethodFilter === method ? "bg-[#DF6951]" : ""}`}
                  onClick={() => setPaymentMethodFilter(method)}
                >
                  {method.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Payment List */}
      <div className="space-y-4">
        {filteredPayments.length > 0 ? filteredPayments.map((payment) => (
          <Card key={payment.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Section - Payment Method Icon */}
              <div className="shrink-0">
                <div className={`p-4 rounded-full ${getPaymentStatusColor(payment.paymentStatus)}`}>
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
                    <p className="text-muted-foreground mb-1">Transaction ID</p>
                    <p className="font-mono text-xs">{payment.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Payment Date</p>
                    <p className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      {payment.paymentDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Payment Method</p>
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
                    <p className="text-muted-foreground mb-1">Booking Reference</p>
                    <p className="font-mono text-xs">{payment.bookingReference}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Invoice Number</p>
                    <p className="font-mono text-xs">{payment.invoiceNumber}</p>
                  </div>
                </div>

                {/* Amount Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Amount</p>
                      <p className="text-xl text-[#DF6951]">{payment.amount}</p>
                    </div>
                    {payment.transactionFee && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Transaction Fee</p>
                        <p className="text-sm">{payment.transactionFee}</p>
                      </div>
                    )}
                    {payment.netAmount && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Net Amount</p>
                        <p className="text-sm font-semibold">{payment.netAmount}</p>
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
                        This payment has been refunded to your original payment method
                      </p>
                    </div>
                  </div>
                )}

                {payment.paymentStatus === "pending" && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-yellow-600" />
                      <p className="text-sm font-semibold text-yellow-900">
                        Payment is being processed. Please allow 2-3 business days.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Section - Actions */}
              <div className="shrink-0 flex flex-col gap-2 min-w-[140px]">
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
                      await navigator.clipboard.writeText(payment.transactionId);
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
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Receipt className="size-4" />
                  Details
                </Button>
              </div>
            </div>
          </Card>
        )) : (
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

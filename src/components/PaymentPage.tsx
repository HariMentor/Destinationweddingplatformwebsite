"use client";

import { useState } from "react";
import { 
  ArrowLeft, CreditCard, Building2, Shield, Lock, CheckCircle2,
  Calendar, MapPin, Users, Clock, AlertCircle, Info, Upload, 
  ArrowRight, Banknote, Globe, CheckCircle, Wallet
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
// import { useCurrency } from "./CurrencyContext";

interface PaymentPageProps {
  onBack: () => void;
  onPaymentComplete: () => void;
  bookingType?: 'venue' | 'planner' | 'vendor' | 'product' | 'tour' | 'flight';
}

type PaymentMethodType = 'stripe' | 'paypal' | 'bank-transfer' | 'wise' | null;
type PaymentStep = 'select-method' | 'payment-details' | 'bank-upload';

// Simulate payment provider availability based on country pairs
const getAvailablePaymentMethods = (vendorCountry: string, customerCountry: string): PaymentMethodType[] => {
  // Sample logic - in real app, this would come from backend
  const bothInEU = ['GB', 'ES', 'FR', 'IT', 'DE'].includes(vendorCountry) && ['GB', 'ES', 'FR', 'IT', 'DE'].includes(customerCountry);
  
  if (bothInEU) {
    return ['stripe', 'wise', 'bank-transfer'];
  } else if (vendorCountry === 'US' || customerCountry === 'US') {
    return ['stripe', 'paypal', 'bank-transfer'];
  } else if (vendorCountry === 'IN' || customerCountry === 'IN') {
    return ['stripe', 'wise', 'bank-transfer'];
  } else {
    // Default to bank transfer when no provider supports the pair
    return ['bank-transfer'];
  }
};

export function PaymentPage({ 
  onBack, 
  onPaymentComplete,
  bookingType = 'venue'
}: PaymentPageProps) {
  // const { formatPrice } = useCurrency();
  
  // Mock vendor and customer countries - in real app, this would come from booking data
  const vendorCountry = 'GB'; // Vendor is in Great Britain
  const customerCountry = 'ES'; // Customer is in Spain
  
  const availablePaymentMethods = getAvailablePaymentMethods(vendorCountry, customerCountry);
  
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('select-method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(null);
  const [showStripeAlert, setShowStripeAlert] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Mock booking data - in a real app this would come from booking state
  const bookingData = {
    venue: {
      name: "Cliffside Resort & Spa",
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzY0MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
    },
    eventDetails: {
      date: "June 15, 2026",
      time: "4:00 PM",
      guests: 150,
      package: "Premium Wedding Package",
    },
    pricing: {
      subtotal: 15000,
      serviceFee: 750,
      tax: 1312.50,
      discount: 0,
      total: 17062.50,
    }
  };

  const paymentMethodDetails = {
    stripe: {
      name: 'Stripe',
      description: 'Credit/Debit Card via Stripe',
      icon: CreditCard,
      processingTime: 'Instant confirmation',
      fees: '2.9% + $0.30',
    },
    paypal: {
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Wallet,
      processingTime: 'Instant confirmation',
      fees: '3.5% + fixed fee',
    },
    wise: {
      name: 'Wise',
      description: 'International bank transfer',
      icon: Globe,
      processingTime: '1-2 business days',
      fees: 'Low conversion fees',
    },
    'bank-transfer': {
      name: 'Direct Bank Transfer',
      description: 'Transfer directly from your bank',
      icon: Building2,
      processingTime: '2-5 business days',
      fees: 'No platform fees',
    }
  };

  const handleNextClick = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    if (selectedMethod === 'stripe') {
      setShowStripeAlert(true);
    } else if (selectedMethod === 'bank-transfer') {
      setPaymentStep('bank-upload');
    } else if (selectedMethod === 'paypal' || selectedMethod === 'wise') {
      // For PayPal and Wise, show similar alert
      alert(`We've partnered with ${paymentMethodDetails[selectedMethod].name} to securely enable this transaction. You'll be redirected to ${paymentMethodDetails[selectedMethod].name} to complete your payment.`);
      // In real app, redirect to payment provider
      setTimeout(() => {
        setPaymentStep('payment-details');
      }, 1000);
    }
  };

  const handleStripeAlertContinue = () => {
    setShowStripeAlert(false);
    setPaymentStep('payment-details');
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substr(0, 4);
    setCvv(value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPaymentComplete();
  };

  const handleBankUploadSubmit = async () => {
    if (!uploadedFile) {
      alert('Please upload your bank transfer confirmation');
      return;
    }

    setIsProcessing(true);
    
    // Simulate upload processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    onPaymentComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Stripe Alert Dialog */}
      <AlertDialog open={showStripeAlert} onOpenChange={setShowStripeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#635BFF] to-[#8A85FF]">
              <Shield className="size-8 text-white" />
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Secure Payment with Stripe
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              We've partnered with Stripe to securely enable this transaction. Stripe is a globally trusted payment processor that keeps your financial information safe with industry-leading encryption.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Shield className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm text-blue-800">
                <p className="font-medium mb-1">Your security is our priority:</p>
                <ul className="space-y-1 text-xs">
                  <li>• PCI DSS Level 1 certified</li>
                  <li>• 256-bit SSL encryption</li>
                  <li>• Your card details are never stored on our servers</li>
                  <li>• Trusted by millions worldwide</li>
                </ul>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowStripeAlert(false)}>
              Choose Different Method
            </Button>
            <Button 
              onClick={handleStripeAlertContinue}
              className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
            >
              Continue to Stripe
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              if (paymentStep === 'select-method') {
                onBack();
              } else {
                setPaymentStep('select-method');
              }
            }}
            className="rounded-full"
            disabled={isProcessing}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl" style={{ fontFamily: 'Volkhov, serif' }}>
              {paymentStep === 'select-method' ? 'Select Payment Method' : 
               paymentStep === 'bank-upload' ? 'Upload Transfer Confirmation' : 
               'Secure Payment'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {paymentStep === 'select-method' ? 'Choose how you want to pay' : 
               paymentStep === 'bank-upload' ? 'Submit your payment proof' : 
               'Complete your booking reservation'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="size-4 text-green-600" />
            <span className="hidden md:inline">SSL Encrypted</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {paymentStep === 'select-method' && (
              <>
                {/* Country Info */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-3">
                    <Info className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-blue-800">
                        Available payment methods for transactions from <strong>{customerCountry}</strong> to <strong>{vendorCountry}</strong>
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Payment Method Selection */}
                <Card className="p-6">
                  <h3 className="text-xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
                    Payment Methods
                  </h3>
                  
                  <RadioGroup value={selectedMethod || ''} onValueChange={(value) => setSelectedMethod(value as PaymentMethodType)}>
                    <div className="space-y-3">
                      {availablePaymentMethods.map((method) => {
                        const details = paymentMethodDetails[method];
                        const Icon = details.icon;
                        
                        return (
                          <label
                            key={method}
                            htmlFor={method}
                            className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedMethod === method 
                                ? 'border-[#DF6951] bg-rose-50/50' 
                                : 'border-border hover:border-[#DF6951]/30'
                            }`}
                          >
                            <RadioGroupItem value={method} id={method} className="mt-1" />
                            <Icon className="size-6 text-[#DF6951] mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="font-medium text-lg mb-1">{details.name}</div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {details.description}
                              </div>
                              <div className="flex flex-wrap gap-3 text-xs">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="size-3" />
                                  {details.processingTime}
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Banknote className="size-3" />
                                  {details.fees}
                                </span>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </RadioGroup>

                  {availablePaymentMethods.length === 1 && availablePaymentMethods[0] === 'bank-transfer' && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="size-5 text-amber-600 mt-0.5" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">Direct Bank Transfer Only</p>
                          <p>
                            No payment processor currently supports this country pair. 
                            Direct bank transfer is the only available option.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Next Button */}
                <Button
                  size="lg"
                  disabled={!selectedMethod}
                  onClick={handleNextClick}
                  className="w-full h-14 text-lg bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
                >
                  Next
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </>
            )}

            {paymentStep === 'payment-details' && selectedMethod === 'stripe' && (
              <>
                {/* Security Notice */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-3">
                    <Lock className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-1">Secure Payment with Stripe</h4>
                      <p className="text-sm text-blue-700">
                        Your payment information is encrypted and secure. We never store your full card details.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Payment Form */}
                <form onSubmit={handleSubmitPayment}>
                  <Card className="p-6">
                    <h3 className="text-xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
                      Card Information
                    </h3>

                    <div className="space-y-4">
                      {/* Card Number */}
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            required
                            className="pl-10"
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          type="text"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={handleExpiryChange}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            value={cvv}
                            onChange={handleCvvChange}
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Billing Address */}
                    <h4 className="font-medium mb-4">Billing Address</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          type="text"
                          placeholder="123 Main Street"
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            type="text"
                            placeholder="Madrid"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postal">Postal Code</Label>
                          <Input
                            id="postal"
                            type="text"
                            placeholder="28001"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          type="text"
                          placeholder="Spain"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Terms and Conditions */}
                  <Card className="p-6 mt-6">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="terms" 
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                        I agree to the{" "}
                        <a href="#" className="text-[#DF6951] hover:underline">Terms and Conditions</a>
                        {" "}and{" "}
                        <a href="#" className="text-[#DF6951] hover:underline">Privacy Policy</a>.
                        I understand that the payment is non-refundable after confirmation.
                      </label>
                    </div>
                  </Card>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isProcessing || !agreeToTerms}
                    className="w-full mt-6 h-14 text-lg bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 size-5" />
                        {/* Pay {formatPrice(bookingData.pricing.total)} */}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-3">
                    By clicking "Pay", you authorize Wedzway to charge your payment method via Stripe
                  </p>
                </form>
              </>
            )}

            {paymentStep === 'bank-upload' && (
              <>
                {/* Bank Transfer Instructions */}
                <Card className="p-6">
                  <h3 className="text-xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
                    Bank Transfer Instructions
                  </h3>

                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white flex-shrink-0 font-medium">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Transfer the Amount</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {/* Please transfer <strong>{formatPrice(bookingData.pricing.total)}</strong> to the following bank account: */}
                        </p>
                        <div className="p-4 bg-gray-50 rounded-lg border space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">Bank Name:</span>
                            <span className="font-medium">Wedzway International Bank</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">Account Number:</span>
                            <span className="font-mono font-medium">GB29 WEDZ 6016 1331 9268 19</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">SWIFT/BIC:</span>
                            <span className="font-mono font-medium">WEDZGB2L</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">Account Holder:</span>
                            <span className="font-medium">Wedzway Ltd</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">Reference:</span>
                            <span className="font-mono font-medium text-[#DF6951]">
                              WDZ-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-amber-700 mt-2 flex items-start gap-2">
                          <AlertCircle className="size-3 mt-0.5 flex-shrink-0" />
                          <span>Please include the reference number in your transfer to ensure quick processing</span>
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Step 2 */}
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white flex-shrink-0 font-medium">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Upload Transfer Confirmation</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          After making the transfer, upload your bank confirmation notification or receipt:
                        </p>
                        
                        <div className="space-y-3">
                          <div className="relative">
                            <Input
                              id="file-upload"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <label
                              htmlFor="file-upload"
                              className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-[#DF6951] hover:bg-rose-50/30 transition-colors"
                            >
                              <Upload className="size-6 text-muted-foreground" />
                              <div className="text-center">
                                <p className="font-medium">
                                  {uploadedFile ? uploadedFile.name : 'Click to upload'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  PDF, JPG, PNG (Max 5MB)
                                </p>
                              </div>
                            </label>
                          </div>

                          {uploadedFile && (
                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <CheckCircle className="size-5 text-green-600" />
                              <span className="text-sm text-green-800">
                                File uploaded successfully
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Step 3 */}
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white flex-shrink-0 font-medium">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Confirmation & Processing</h4>
                        <p className="text-sm text-muted-foreground">
                          Once we receive and verify your payment (typically 2-5 business days), 
                          we'll send you a confirmation email and your booking will be activated.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Important Notice */}
                <Card className="p-6 bg-amber-50 border-amber-200">
                  <div className="flex items-start gap-3">
                    <Info className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-2">Important Information:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Your booking will be held for 7 days pending payment confirmation</li>
                        <li>• Processing time: 2-5 business days after transfer</li>
                        <li>• You will receive email updates on payment status</li>
                        <li>• If payment is not confirmed within 7 days, your booking may be cancelled</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Submit Button */}
                <Button
                  size="lg"
                  disabled={isProcessing || !uploadedFile}
                  onClick={handleBankUploadSubmit}
                  className="w-full h-14 text-lg bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 size-5" />
                      Submit Transfer Confirmation
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-3">
                  We'll notify you via email once your payment is verified
                </p>
              </>
            )}
          </div>

          {/* Order Summary - Right Column (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Summary Card */}
              <Card className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={bookingData.venue.image}
                    alt={bookingData.venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg mb-1" style={{ fontFamily: 'Volkhov, serif' }}>
                      {bookingData.venue.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-3" />
                      <span>{bookingData.venue.location}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-[#DF6951]" />
                      <span>{bookingData.eventDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-[#DF6951]" />
                      <span>{bookingData.eventDetails.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-[#DF6951]" />
                      <span>{bookingData.eventDetails.guests} guests</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Badge variant="secondary" className="bg-gradient-to-r from-[#DF6951]/10 to-[#F1A501]/10">
                      {bookingData.eventDetails.package}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Price Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
                  Price Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Venue Package</span>
                    {/* <span>{formatPrice(bookingData.pricing.subtotal)}</span> */}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    {/* <span>{formatPrice(bookingData.pricing.serviceFee)}</span> */}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    {/* <span>{formatPrice(bookingData.pricing.tax)}</span> */}
                  </div>
                  {bookingData.pricing.discount > 0 && (
                    <div className="flex items-center justify-between text-green-600">
                      <span>Discount</span>
                      {/* <span>-{formatPrice(bookingData.pricing.discount)}</span> */}
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-medium text-2xl" style={{ fontFamily: 'Volkhov, serif' }}>
                      {/* {formatPrice(bookingData.pricing.total)} */}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Trust Badges */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500">
                      <CheckCircle2 className="size-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-green-900">Secure Payment</div>
                      <div className="text-xs text-green-700">256-bit SSL encryption</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500">
                      <Shield className="size-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-green-900">Money-back Guarantee</div>
                      <div className="text-xs text-green-700">Within 30 days</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

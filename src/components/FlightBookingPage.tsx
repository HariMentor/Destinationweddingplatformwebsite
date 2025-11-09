import { useState } from "react";
import { ArrowLeft, Plane, Clock, Calendar, User, Mail, Phone, CreditCard, Shield, CheckCircle, AlertCircle, MapPin, Luggage, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";

interface Flight {
  id: number;
  airline: string;
  logo: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  stopCity?: string;
  price: number;
  class: string;
  seatsLeft: number;
  baggage: string;
  departDate: string;
  arriveDate: string;
}

interface FlightBookingPageProps {
  selectedFlight: Flight;
  onBack: () => void;
  passengers: number;
  tripType: "roundtrip" | "oneway";
  returnFlight?: Flight;
}

export function FlightBookingPage({ 
  selectedFlight, 
  onBack, 
  passengers,
  tripType,
  returnFlight 
}: FlightBookingPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Passenger Details
    passengers: Array(passengers).fill(null).map((_, index) => ({
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      passportExpiry: "",
    })),
    
    // Contact Details
    email: "",
    phone: "",
    countryCode: "+91",
    
    // Add-ons
    mealPreference: [] as string[],
    seatPreference: [] as string[],
    extraBaggage: false,
    travelInsurance: false,
    
    // Payment
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const totalSteps = 4;
  const totalPrice = (selectedFlight.price + (returnFlight?.price || 0)) * passengers;
  const taxes = totalPrice * 0.12;
  const addOnsPrice = 
    (bookingData.extraBaggage ? 2500 : 0) + 
    (bookingData.travelInsurance ? 1500 * passengers : 0) +
    (bookingData.mealPreference.length * 800) +
    (bookingData.seatPreference.length * 1200);
  const grandTotal = totalPrice + taxes + addOnsPrice;

  const handleInputChange = (field: string, value: any) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePassengerChange = (index: number, field: string, value: string) => {
    setBookingData((prev) => {
      const newPassengers = [...prev.passengers];
      newPassengers[index] = {
        ...newPassengers[index],
        [field]: value,
      };
      return {
        ...prev,
        passengers: newPassengers,
      };
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return bookingData.passengers.every(p => 
          p.firstName && p.lastName && p.dateOfBirth
        );
      case 2:
        return !!(bookingData.email && bookingData.phone);
      case 3:
        return true; // Add-ons are optional
      case 4:
        return !!(
          bookingData.paymentMethod === "upi" ||
          (bookingData.cardNumber && bookingData.cardName && bookingData.expiryDate && bookingData.cvv)
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBooking = () => {
    if (validateStep(4)) {
      toast.success("Booking confirmed! Check your email for details.");
      setTimeout(() => {
        onBack();
      }, 2000);
    } else {
      toast.error("Please complete payment details");
    }
  };

  const renderFlightSummary = (flight: Flight, label: string) => (
    <Card className="p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <Badge className="bg-blue-50 text-blue-600 border-0">{label}</Badge>
        <div className="text-right">
          <div className="text-2xl text-[#DF6951]">₹{flight.price.toLocaleString()}</div>
          <div className="text-xs text-foreground/60">per person</div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{flight.logo}</span>
        <div>
          <h4>{flight.airline}</h4>
          <p className="text-sm text-foreground/60">{flight.class}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="text-2xl mb-1">{flight.departTime}</div>
          <div className="text-sm text-foreground/60">{flight.fromCode}</div>
          <div className="text-xs text-foreground/40">{flight.departDate}</div>
        </div>

        <div className="flex-1 text-center">
          <div className="text-sm text-foreground/60 mb-2">{flight.duration}</div>
          <div className="relative h-0.5 bg-foreground/20">
            <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-[#DF6951]" />
          </div>
          <div className="text-xs text-foreground/60 mt-2">
            {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
            {flight.stops > 0 && flight.stopCity && (
              <span className="block">{flight.stopCity}</span>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl mb-1">{flight.arriveTime}</div>
          <div className="text-sm text-foreground/60">{flight.toCode}</div>
          <div className="text-xs text-foreground/40">{flight.arriveDate}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-foreground/60">
        <span className="flex items-center gap-1">
          <Luggage className="size-4" /> {flight.baggage}
        </span>
        <span className="flex items-center gap-1">
          <Coffee className="size-4" /> Meal included
        </span>
      </div>
    </Card>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl mb-2">Passenger Details</h3>
              <p className="text-foreground/60">
                Enter passenger information as per passport/government ID
              </p>
            </div>

            {bookingData.passengers.map((passenger, index) => (
              <Card key={index} className="p-6">
                <h4 className="mb-4">Passenger {index + 1}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`title-${index}`}>Title *</Label>
                    <select
                      id={`title-${index}`}
                      value={passenger.title}
                      onChange={(e) => handlePassengerChange(index, "title", e.target.value)}
                      className="w-full mt-2 h-10 px-3 rounded-md border border-border bg-background"
                    >
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Miss">Miss</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                    <Input
                      id={`firstName-${index}`}
                      value={passenger.firstName}
                      onChange={(e) => handlePassengerChange(index, "firstName", e.target.value)}
                      placeholder="As per passport"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                    <Input
                      id={`lastName-${index}`}
                      value={passenger.lastName}
                      onChange={(e) => handlePassengerChange(index, "lastName", e.target.value)}
                      placeholder="As per passport"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`dateOfBirth-${index}`}>Date of Birth *</Label>
                    <Input
                      id={`dateOfBirth-${index}`}
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) => handlePassengerChange(index, "dateOfBirth", e.target.value)}
                      className="mt-2"
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`nationality-${index}`}>Nationality</Label>
                    <Input
                      id={`nationality-${index}`}
                      value={passenger.nationality}
                      onChange={(e) => handlePassengerChange(index, "nationality", e.target.value)}
                      placeholder="e.g., Indian"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`passportNumber-${index}`}>Passport Number</Label>
                    <Input
                      id={`passportNumber-${index}`}
                      value={passenger.passportNumber}
                      onChange={(e) => handlePassengerChange(index, "passportNumber", e.target.value)}
                      placeholder="Optional"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`passportExpiry-${index}`}>Passport Expiry</Label>
                    <Input
                      id={`passportExpiry-${index}`}
                      type="date"
                      value={passenger.passportExpiry}
                      onChange={(e) => handlePassengerChange(index, "passportExpiry", e.target.value)}
                      className="mt-2"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-4 bg-blue-50 border-blue-100">
              <div className="flex gap-3">
                <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Important</p>
                  <p>
                    Ensure passenger names match exactly with passport/government ID. Name changes are not allowed after booking.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl mb-2">Contact Details</h3>
              <p className="text-foreground/60">
                We'll send booking confirmation and updates to these details
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="mt-2"
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    Ticket will be sent to this email
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone">Mobile Number *</Label>
                  <div className="flex gap-2 mt-2">
                    <select
                      value={bookingData.countryCode}
                      onChange={(e) => handleInputChange("countryCode", e.target.value)}
                      className="w-24 h-10 px-3 rounded-md border border-border bg-background"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+971">+971</option>
                    </select>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-foreground/60 mt-1">
                    For booking updates and airport notifications
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-green-50 border-green-100">
              <div className="flex gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-900">
                  <p className="font-medium mb-1">Secure Booking</p>
                  <p>
                    Your information is encrypted and secure. We'll never share your details with third parties.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl mb-2">Add-ons & Extras</h3>
              <p className="text-foreground/60">
                Enhance your journey with these optional services
              </p>
            </div>

            {/* Meals */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Coffee className="size-6 text-[#DF6951]" />
                  <div>
                    <h4>Meal Preferences</h4>
                    <p className="text-sm text-foreground/60">
                      Pre-order your in-flight meal
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg">₹800</div>
                  <div className="text-xs text-foreground/60">per meal</div>
                </div>
              </div>
              <div className="space-y-2">
                {["Vegetarian", "Non-Vegetarian", "Vegan", "Jain"].map((meal) => (
                  <div key={meal} className="flex items-center space-x-2">
                    <Checkbox
                      id={meal}
                      checked={bookingData.mealPreference.includes(meal)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange("mealPreference", [...bookingData.mealPreference, meal]);
                        } else {
                          handleInputChange(
                            "mealPreference",
                            bookingData.mealPreference.filter((m) => m !== meal)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={meal} className="font-normal cursor-pointer">
                      {meal}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Seat Selection */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="size-6 text-[#DF6951]" />
                  <div>
                    <h4>Seat Selection</h4>
                    <p className="text-sm text-foreground/60">
                      Choose your preferred seat
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg">₹1,200</div>
                  <div className="text-xs text-foreground/60">per seat</div>
                </div>
              </div>
              <div className="space-y-2">
                {["Window", "Aisle", "Extra Legroom"].map((seat) => (
                  <div key={seat} className="flex items-center space-x-2">
                    <Checkbox
                      id={seat}
                      checked={bookingData.seatPreference.includes(seat)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange("seatPreference", [...bookingData.seatPreference, seat]);
                        } else {
                          handleInputChange(
                            "seatPreference",
                            bookingData.seatPreference.filter((s) => s !== seat)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={seat} className="font-normal cursor-pointer">
                      {seat}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Extra Baggage */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Luggage className="size-6 text-[#DF6951]" />
                  <div>
                    <h4>Extra Baggage</h4>
                    <p className="text-sm text-foreground/60">
                      Add 15kg extra baggage allowance
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg">₹2,500</div>
                    <div className="text-xs text-foreground/60">per person</div>
                  </div>
                  <Checkbox
                    id="extraBaggage"
                    checked={bookingData.extraBaggage}
                    onCheckedChange={(checked) =>
                      handleInputChange("extraBaggage", checked as boolean)
                    }
                  />
                </div>
              </div>
            </Card>

            {/* Travel Insurance */}
            <Card className="p-6 border-2 border-green-200 bg-green-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="size-6 text-green-600" />
                  <div>
                    <h4 className="flex items-center gap-2">
                      Travel Insurance
                      <Badge className="bg-green-600 text-white border-0 text-xs">
                        Recommended
                      </Badge>
                    </h4>
                    <p className="text-sm text-foreground/60">
                      Cover for medical emergencies, trip cancellation & delays
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg">₹1,500</div>
                    <div className="text-xs text-foreground/60">per person</div>
                  </div>
                  <Checkbox
                    id="travelInsurance"
                    checked={bookingData.travelInsurance}
                    onCheckedChange={(checked) =>
                      handleInputChange("travelInsurance", checked as boolean)
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl mb-2">Payment Details</h3>
              <p className="text-foreground/60">
                Complete your booking with secure payment
              </p>
            </div>

            <Card className="p-6">
              <h4 className="mb-4">Select Payment Method</h4>
              <RadioGroup
                value={bookingData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="font-normal cursor-pointer flex items-center gap-2 flex-1">
                    <CreditCard className="size-5" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="font-normal cursor-pointer flex-1">
                    UPI Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking" className="font-normal cursor-pointer flex-1">
                    Net Banking
                  </Label>
                </div>
              </RadioGroup>
            </Card>

            {bookingData.paymentMethod === "card" && (
              <Card className="p-6">
                <h4 className="mb-4">Card Details</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={bookingData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="mt-2"
                      maxLength={19}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      value={bookingData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value)}
                      placeholder="Name on card"
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={bookingData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        placeholder="MM/YY"
                        className="mt-2"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        type="password"
                        value={bookingData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        placeholder="123"
                        className="mt-2"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {bookingData.paymentMethod === "upi" && (
              <Card className="p-6">
                <h4 className="mb-4">UPI Details</h4>
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    className="mt-2"
                  />
                </div>
              </Card>
            )}

            <Card className="p-4 bg-amber-50 border-amber-100">
              <div className="flex gap-3">
                <Shield className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="font-medium mb-1">Secure Payment</p>
                  <p>
                    Your payment information is encrypted and secure. We use industry-standard security protocols.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="size-4" />
          Back to Flight Results
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Header */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Complete Your Booking</h2>
                <Badge className="bg-[#DF6951]/10 text-[#DF6951] border-0">
                  Step {currentStep} of {totalSteps}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="flex justify-between mb-2">
                  {["Passengers", "Contact", "Add-ons", "Payment"].map((label, index) => (
                    <div
                      key={index}
                      className={`text-xs ${
                        currentStep > index + 1
                          ? "text-green-600"
                          : currentStep === index + 1
                          ? "text-[#DF6951]"
                          : "text-foreground/40"
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] transition-all duration-500"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Form Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="size-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] gap-2"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleBooking}
                  className="bg-gradient-to-r from-green-600 to-green-500 gap-2"
                >
                  <CheckCircle className="size-4" />
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="mb-4">Booking Summary</h3>

              {/* Outbound Flight */}
              {renderFlightSummary(selectedFlight, "Outbound Flight")}

              {/* Return Flight */}
              {returnFlight && renderFlightSummary(returnFlight, "Return Flight")}

              <Separator className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Base Fare ({passengers} passenger{passengers > 1 ? 's' : ''})</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Taxes & Fees</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                {addOnsPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Add-ons</span>
                    <span>₹{addOnsPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span>Total Amount</span>
                <div className="text-right">
                  <div className="text-2xl text-[#DF6951]">₹{grandTotal.toLocaleString()}</div>
                  <div className="text-xs text-foreground/60">All inclusive</div>
                </div>
              </div>

              <Card className="p-3 bg-green-50 border-green-100 mt-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-green-900">
                    <p className="font-medium">Best Price Guaranteed</p>
                    <p className="text-green-700">Lowest fare for this route</p>
                  </div>
                </div>
              </Card>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

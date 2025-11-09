import { useState } from "react";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, AlertCircle, Calendar as CalendarIcon, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";

interface VisaRequestPageProps {
  onBack: () => void;
}

export function VisaRequestPage({ onBack }: VisaRequestPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    
    // Travel Details
    destinationCountry: "",
    visaType: "",
    travelPurpose: "wedding",
    departureDate: "",
    returnDate: "",
    numberOfTravelers: "1",
    
    // Wedding Details
    weddingVenue: "",
    weddingDate: "",
    isCouple: "no",
    partnerName: "",
    
    // Service Package
    servicePackage: "",
    fastTrack: false,
    groupVisa: false,
    numberOfGuests: "",
    
    // Additional Information
    previousVisaRejection: "no",
    rejectionDetails: "",
    specialRequirements: "",
    
    // Documents
    documents: {
      passport: null as File | null,
      photo: null as File | null,
      bankStatement: null as File | null,
      flightBooking: null as File | null,
      hotelBooking: null as File | null,
      invitationLetter: null as File | null,
    },
    
    // Agreement
    termsAccepted: false,
  });

  const totalSteps = 5;

  const countries = [
    "Greece", "Italy", "France", "Spain", "Thailand", "UAE", "Indonesia (Bali)",
    "Maldives", "United Kingdom", "United States", "Australia", "Switzerland",
    "Portugal", "Netherlands", "Turkey", "Mexico"
  ];

  const visaTypes = [
    "Tourist Visa",
    "Schengen Visa",
    "Business Visa",
    "Transit Visa",
    "Visa on Arrival",
    "E-Visa"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (documentType: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file,
      },
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.dateOfBirth &&
          formData.nationality &&
          formData.passportNumber
        );
      case 2:
        return !!(
          formData.destinationCountry &&
          formData.visaType &&
          formData.departureDate &&
          formData.returnDate
        );
      case 3:
        return !!(formData.weddingVenue && formData.weddingDate);
      case 4:
        return !!formData.servicePackage;
      case 5:
        return formData.termsAccepted;
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

  const handleSubmit = () => {
    if (validateStep(5)) {
      // In real app, submit to backend
      toast.success("Visa request submitted successfully! We'll contact you within 24 hours.");
      setTimeout(() => {
        onBack();
      }, 2000);
    } else {
      toast.error("Please accept the terms and conditions");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl mb-2">Personal Information</h3>
              <p className="text-foreground/60">
                Please provide your personal details as they appear on your passport
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="As per passport"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="As per passport"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  placeholder="e.g., Indian"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="passportNumber">Passport Number *</Label>
                <Input
                  id="passportNumber"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                  placeholder="A12345678"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="passportIssueDate">Issue Date</Label>
                <Input
                  id="passportIssueDate"
                  type="date"
                  value={formData.passportIssueDate}
                  onChange={(e) => handleInputChange("passportIssueDate", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="passportExpiryDate">Expiry Date</Label>
                <Input
                  id="passportExpiryDate"
                  type="date"
                  value={formData.passportExpiryDate}
                  onChange={(e) => handleInputChange("passportExpiryDate", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl mb-2">Travel Details</h3>
              <p className="text-foreground/60">
                Provide information about your intended travel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="destinationCountry">Destination Country *</Label>
                <Select
                  value={formData.destinationCountry}
                  onValueChange={(value) => handleInputChange("destinationCountry", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="visaType">Visa Type *</Label>
                <Select
                  value={formData.visaType}
                  onValueChange={(value) => handleInputChange("visaType", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="departureDate">Departure Date *</Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange("departureDate", e.target.value)}
                  className="mt-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="returnDate">Return Date *</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange("returnDate", e.target.value)}
                  className="mt-2"
                  min={formData.departureDate || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
              <Select
                value={formData.numberOfTravelers}
                onValueChange={(value) => handleInputChange("numberOfTravelers", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Person" : "People"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-100">
              <div className="flex gap-3">
                <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Important Note</p>
                  <p>
                    Visa processing typically takes 15-30 days. We recommend applying at least
                    6 weeks before your travel date.
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
              <h3 className="text-2xl mb-2">Wedding Details</h3>
              <p className="text-foreground/60">
                Tell us about your destination wedding
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="weddingVenue">Wedding Venue/Location *</Label>
                <Input
                  id="weddingVenue"
                  value={formData.weddingVenue}
                  onChange={(e) => handleInputChange("weddingVenue", e.target.value)}
                  placeholder="e.g., Santorini Gem, Greece"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="weddingDate">Wedding Date *</Label>
                <Input
                  id="weddingDate"
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => handleInputChange("weddingDate", e.target.value)}
                  className="mt-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <Label>Are you traveling as a couple? *</Label>
              <RadioGroup
                value={formData.isCouple}
                onValueChange={(value) => handleInputChange("isCouple", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="couple-yes" />
                  <Label htmlFor="couple-yes" className="font-normal cursor-pointer">
                    Yes, I'm traveling with my partner
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="couple-no" />
                  <Label htmlFor="couple-no" className="font-normal cursor-pointer">
                    No, I'm traveling alone/with family/friends
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.isCouple === "yes" && (
              <div>
                <Label htmlFor="partnerName">Partner's Full Name</Label>
                <Input
                  id="partnerName"
                  value={formData.partnerName}
                  onChange={(e) => handleInputChange("partnerName", e.target.value)}
                  placeholder="Partner's name"
                  className="mt-2"
                />
                <p className="text-sm text-foreground/60 mt-1">
                  If applying together, your partner will need to fill a separate form
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="groupVisa"
                checked={formData.groupVisa}
                onCheckedChange={(checked) =>
                  handleInputChange("groupVisa", checked as boolean)
                }
              />
              <Label
                htmlFor="groupVisa"
                className="font-normal cursor-pointer"
              >
                I need visa assistance for wedding guests as well
              </Label>
            </div>

            {formData.groupVisa && (
              <div>
                <Label htmlFor="numberOfGuests">Estimated Number of Guests</Label>
                <Input
                  id="numberOfGuests"
                  type="number"
                  value={formData.numberOfGuests}
                  onChange={(e) => handleInputChange("numberOfGuests", e.target.value)}
                  placeholder="Number of guests needing visa"
                  className="mt-2"
                  min="1"
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl mb-2">Service Package</h3>
              <p className="text-foreground/60">
                Choose the service package that suits your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "basic",
                  title: "Basic",
                  price: "₹5,999",
                  features: [
                    "Eligibility check",
                    "Document checklist",
                    "Form filling help",
                    "Email support",
                  ],
                },
                {
                  name: "premium",
                  title: "Premium",
                  price: "₹12,999",
                  features: [
                    "All Basic features",
                    "Document verification",
                    "Application submission",
                    "Fast-track processing",
                    "Interview prep",
                  ],
                  popular: true,
                },
                {
                  name: "vip",
                  title: "VIP",
                  price: "₹24,999",
                  features: [
                    "All Premium features",
                    "Dedicated consultant",
                    "24/7 phone support",
                    "Same-day appointments",
                    "Embassy liaison",
                  ],
                },
              ].map((plan) => (
                <Card
                  key={plan.name}
                  className={`p-6 cursor-pointer transition-all relative ${
                    formData.servicePackage === plan.name
                      ? "border-2 border-[#DF6951] shadow-lg"
                      : "border-2 hover:border-[#DF6951]/20"
                  }`}
                  onClick={() => handleInputChange("servicePackage", plan.name)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white border-0">
                      Popular
                    </Badge>
                  )}
                  <div className="text-center mb-4">
                    <h4 className="text-xl mb-2">{plan.title}</h4>
                    <div className="text-3xl text-[#DF6951] mb-4">{plan.price}</div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="fastTrack"
                checked={formData.fastTrack}
                onCheckedChange={(checked) =>
                  handleInputChange("fastTrack", checked as boolean)
                }
              />
              <Label htmlFor="fastTrack" className="font-normal cursor-pointer">
                Add fast-track processing (+₹5,000)
              </Label>
            </div>

            <div>
              <Label>Have you ever been rejected for a visa to this country?</Label>
              <RadioGroup
                value={formData.previousVisaRejection}
                onValueChange={(value) => handleInputChange("previousVisaRejection", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="rejection-no" />
                  <Label htmlFor="rejection-no" className="font-normal cursor-pointer">
                    No
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="rejection-yes" />
                  <Label htmlFor="rejection-yes" className="font-normal cursor-pointer">
                    Yes
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.previousVisaRejection === "yes" && (
              <div>
                <Label htmlFor="rejectionDetails">Please provide details</Label>
                <Textarea
                  id="rejectionDetails"
                  value={formData.rejectionDetails}
                  onChange={(e) => handleInputChange("rejectionDetails", e.target.value)}
                  placeholder="When was it rejected and what was the reason..."
                  className="mt-2"
                  rows={3}
                />
              </div>
            )}

            <div>
              <Label htmlFor="specialRequirements">
                Any special requirements or questions?
              </Label>
              <Textarea
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                placeholder="Tell us if you have any specific requirements..."
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl mb-2">Document Upload & Confirmation</h3>
              <p className="text-foreground/60">
                Upload required documents (optional at this stage)
              </p>
            </div>

            <Card className="p-4 bg-amber-50 border-amber-100">
              <div className="flex gap-3">
                <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="font-medium mb-1">Document Upload Optional</p>
                  <p>
                    You can upload documents now or our team will contact you within 24 hours
                    with a detailed checklist and secure upload portal.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "passport", label: "Passport Copy" },
                { id: "photo", label: "Passport Size Photo" },
                { id: "bankStatement", label: "Bank Statement" },
                { id: "flightBooking", label: "Flight Booking" },
                { id: "hotelBooking", label: "Hotel Booking" },
                { id: "invitationLetter", label: "Wedding Invitation" },
              ].map((doc) => (
                <div key={doc.id} className="space-y-2">
                  <Label htmlFor={doc.id}>{doc.label}</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-[#DF6951]/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id={doc.id}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileUpload(doc.id, file);
                      }}
                    />
                    <label htmlFor={doc.id} className="cursor-pointer block">
                      <Upload className="size-8 mx-auto mb-2 text-foreground/40" />
                      {formData.documents[doc.id as keyof typeof formData.documents] ? (
                        <p className="text-sm text-green-600">
                          ✓{" "}
                          {
                            (
                              formData.documents[
                                doc.id as keyof typeof formData.documents
                              ] as File
                            ).name
                          }
                        </p>
                      ) : (
                        <>
                          <p className="text-sm text-foreground/60">Click to upload</p>
                          <p className="text-xs text-foreground/40 mt-1">
                            PDF, JPG or PNG (Max 5MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 mt-6">
              <h4 className="mb-4">Review Your Application</h4>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-foreground/60">Name:</span>
                  <span className="col-span-2">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-foreground/60">Destination:</span>
                  <span className="col-span-2">{formData.destinationCountry}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-foreground/60">Travel Dates:</span>
                  <span className="col-span-2">
                    {formData.departureDate} to {formData.returnDate}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-foreground/60">Wedding Date:</span>
                  <span className="col-span-2">{formData.weddingDate}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="text-foreground/60">Service Package:</span>
                  <span className="col-span-2 capitalize">{formData.servicePackage}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-4">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) =>
                  handleInputChange("termsAccepted", checked as boolean)
                }
              />
              <Label htmlFor="terms" className="font-normal cursor-pointer text-sm">
                I agree to the{" "}
                <span className="text-[#DF6951] underline">terms and conditions</span> and{" "}
                <span className="text-[#DF6951] underline">privacy policy</span>. I understand
                that visa approval is subject to embassy discretion and processing fees are
                non-refundable.
              </Label>
            </div>

            <Card className="p-4 bg-green-50 border-green-100">
              <div className="flex gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-900">
                  <p className="font-medium mb-1">What Happens Next?</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Our visa consultant will contact you within 24 hours</li>
                    <li>We'll review your application and provide a detailed checklist</li>
                    <li>You'll receive a secure portal link to upload documents</li>
                    <li>We'll guide you through every step until visa approval</li>
                  </ul>
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
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="size-4" />
          Back to Visa Services
        </Button>

        {/* Progress Header */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Visa Assistance Request</h2>
            <Badge className="bg-[#DF6951]/10 text-[#DF6951] border-0">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="flex justify-between mb-2">
              {["Personal", "Travel", "Wedding", "Package", "Confirm"].map((label, index) => (
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
        <Card className="p-8">
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
          <div className="flex justify-between mt-8 pt-6 border-t">
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
                Next Step
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] gap-2"
              >
                Submit Request
                <CheckCircle className="size-4" />
              </Button>
            )}
          </div>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 p-6 bg-blue-50 border-blue-100">
          <div className="flex gap-4">
            <AlertCircle className="size-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="mb-2">Need Help?</h4>
              <p className="text-sm text-foreground/70 mb-3">
                Our visa consultants are here to help you with any questions
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="outline" className="gap-2">
                  <Phone className="size-4" />
                  +91 98765 43210
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Mail className="size-4" />
                  visa@wedzway.com
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

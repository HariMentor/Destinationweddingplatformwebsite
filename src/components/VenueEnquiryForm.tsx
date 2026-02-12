"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Info,
  Mail,
  Send,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Card } from "./ui/card";
import {
  initiateEnquiry,
  submitEnquiry,
} from "./DestinationServices/services/enquiryService";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface VenueEnquiryFormProps {
  packages: Array<{ name: string; price: number }>;
  formatPrice: (price: number) => string;
  venueId: string;
}

interface FormData {
  people: string;
  selectPackage: string;
  eventType: string;
  flexibleDates: boolean;
  message: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  otp: string;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

const isValidCountryCode = (code: string): boolean => {
  return /^\+\d{1,4}$/.test(code);
};

const isValidLocalPhone = (phone: string): boolean => {
  return /^\d{7,15}$/.test(phone);
};

const isValidFullPhone = (code: string, phone: string): boolean => {
  return isValidCountryCode(code) && isValidLocalPhone(phone);
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function VenueEnquiryForm({
  packages,
  formatPrice,
  venueId,
}: VenueEnquiryFormProps) {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  // UI State
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [enquiryType, setEnquiryType] = useState<"concierge" | "venue">(
    "concierge",
  );
  const [isConciergeInfoExpanded, setIsConciergeInfoExpanded] = useState(false);
  const [calendarMonths, setCalendarMonths] = useState(2);

  // Form State
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [formData, setFormData] = useState<FormData>({
    people: "",
    selectPackage: "",
    eventType: "",
    flexibleDates: false,
    message: "",
    budget: "",
    name: "",
    phone: "",
    email: "",
    otp: "",
  });

  // Phone Number State
  const [countryCode, setCountryCode] = useState("+91");
  const [localPhone, setLocalPhone] = useState("");
  const [otpPhone, setOtpPhone] = useState<string | null>(null);

  // OTP State
  const [otpSent, setOtpSent] = useState(false);

  // Loading State
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Computed State
  const isPhoneValid = isValidFullPhone(countryCode, localPhone);

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------

  // Handle responsive calendar months
  useEffect(() => {
    const handleResize = () => {
      setCalendarMonths(window.innerWidth >= 768 ? 2 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset OTP when phone number changes
  useEffect(() => {
    const currentFullPhone = `${countryCode}${localPhone}`;

    if (otpSent && otpPhone && currentFullPhone !== otpPhone) {
      setOtpSent(false);
      setOtpPhone(null);
      setFormData((prev) => ({ ...prev, otp: "" }));
    }
  }, [countryCode, localPhone, otpSent, otpPhone]);

  // --------------------------------------------------------------------------
  // EVENT HANDLERS
  // --------------------------------------------------------------------------

  const handleSendOTP = async () => {
    if (!isValidCountryCode(countryCode)) {
      toast.error("Please select a valid country code");
      return;
    }

    if (!isValidLocalPhone(localPhone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const fullPhoneNumber = `${countryCode}${localPhone}`;

    setIsOtpSending(true);
    try {
      await initiateEnquiry({
        venueId,
        dateRange: {
          start: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
          end: dateRange.to
            ? format(dateRange.to, "yyyy-MM-dd")
            : dateRange.from
              ? format(dateRange.from, "yyyy-MM-dd")
              : "",
        },
        peopleCount: parseInt(formData.people) || 0,
        package: formData.selectPackage,
        isFlexible: formData.flexibleDates,
        message: formData.message,
        name: formData.name,
        phone: fullPhoneNumber,
        eventType: formData.eventType,
        budget: parseInt(formData.budget) || 0,
      });

      setFormData((prev) => ({
        ...prev,
        phone: fullPhoneNumber,
        otp: "",
      }));

      setOtpPhone(fullPhoneNumber);
      setOtpSent(true);

      toast.success(`OTP sent to ${fullPhoneNumber}`);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error(error);
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleEnquirySubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.otp || formData.otp.length < 6) {
      toast.error("Please enter the 6-digit OTP sent to your phone");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        venueId: venueId,
        dateRange: {
          start: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
          end: dateRange.to
            ? format(dateRange.to, "yyyy-MM-dd")
            : dateRange.from
              ? format(dateRange.from, "yyyy-MM-dd")
              : "",
        },
        peopleCount: parseInt(formData.people) || 0,
        package: formData.selectPackage,
        isFlexible: formData.flexibleDates,
        message: formData.message,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventType: formData.eventType,
        budget: parseInt(formData.budget) || 0,
        otp: formData.otp,
        enquiryType: enquiryType,
      });

      const enquiryTypeMessage =
        enquiryType === "concierge"
          ? "Enquiry submitted successfully! Our wedding concierge will contact you within 24 hours."
          : "Enquiry sent directly to the venue! They will contact you within 24 hours.";

      toast.success(enquiryTypeMessage);

      // Reset form
      resetForm();
    } catch (error: any) {
      // Handle OTP verification error from the API
      if (
        error?.message?.includes("OTP") ||
        error?.response?.data?.message?.includes("OTP")
      ) {
        toast.error("Invalid OTP. Please check and try again.");
      } else {
        toast.error("Failed to submit enquiry. Please try again.");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepOneNext = () => {
    if (enquiryType === "concierge") {
      if (
        !dateRange.from ||
        !formData.people ||
        !formData.selectPackage ||
        !formData.eventType
      ) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else {
      if (!dateRange.from || !formData.people || !formData.message) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    setEnquiryStep(2);
  };

  const resetForm = () => {
    setEnquiryStep(1);
    setEnquiryType("concierge");
    setIsConciergeInfoExpanded(false);
    setDateRange({ from: undefined, to: undefined });
    setFormData({
      people: "",
      selectPackage: "",
      eventType: "",
      flexibleDates: false,
      message: "",
      budget: "",
      name: "",
      phone: "",
      email: "",
      otp: "",
    });
    setCountryCode("+91");
    setLocalPhone("");
    setOtpSent(false);
    setOtpPhone(null);
  };

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------

  const renderConciergeInfo = () => (
    <div className="space-y-2 mt-6">
      <button
        type="button"
        onClick={() => setIsConciergeInfoExpanded(!isConciergeInfoExpanded)}
        className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-[#02542D]/5 to-[#DF6951]/5 border border-[#02542D]/20 hover:border-[#02542D]/40 transition-all"
      >
        <div className="flex items-center gap-2">
          <Info className="size-4 text-[#DF6951]" />
          <span className="text-sm font-medium text-[#02542D]">
            What is Concierge Service?
          </span>
        </div>
        {isConciergeInfoExpanded ? (
          <ChevronUp className="size-4 text-[#02542D]" />
        ) : (
          <ChevronDown className="size-4 text-[#02542D]" />
        )}
      </button>

      {isConciergeInfoExpanded && (
        <div className="p-4 rounded-lg bg-white border border-gray-200 space-y-3 animate-in slide-in-from-top-2">
          <p className="text-sm text-muted-foreground">
            Our wedding concierge team acts as your personal wedding planning
            assistant, coordinating with the venue and all vendors to ensure
            your dream wedding comes to life.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Expert Guidance</p>
                <p className="text-xs text-muted-foreground">
                  Professional advice on venue selection, packages, and planning
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Price Negotiation</p>
                <p className="text-xs text-muted-foreground">
                  We negotiate the best rates and packages on your behalf
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">End-to-End Planning</p>
                <p className="text-xs text-muted-foreground">
                  Complete support from enquiry to your special day
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Single Point of Contact</p>
                <p className="text-xs text-muted-foreground">
                  Coordinated communication with all vendors and venue
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDatePicker = (id: string) => (
    <div>
      <Label htmlFor={id}>
        Dates <span className="text-red-500">*</span>
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left mt-1 h-10"
          >
            <Calendar className="mr-2 size-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} ~{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span className="text-muted-foreground">Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="range"
            selected={dateRange}
            onSelect={(range) =>
              setDateRange({
                from: range?.from,
                to: range?.to,
              })
            }
            numberOfMonths={enquiryType === "venue" ? calendarMonths : 1}
            disabled={
              enquiryType === "venue"
                ? (date) => date < new Date(new Date().setHours(0, 0, 0, 0))
                : undefined
            }
            className="rounded-md border"
            initialFocus={enquiryType === "venue"}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  const renderPhoneInput = (idPrefix: string) => (
    <div className="space-y-2">
      <Label htmlFor={`${idPrefix}-phone`}>
        Phone Number <span className="text-red-500">*</span>
      </Label>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex gap-2 w-full">
          <Input
            className="w-24"
            placeholder="+91"
            value={countryCode}
            onChange={(e) => {
              let value = e.target.value;
              if (!value.startsWith("+")) value = "+" + value;
              value = value.replace(/[^+\d]/g, "");
              setCountryCode(value);
            }}
          />
          <Input
            id={`${idPrefix}-phone`}
            type="tel"
            placeholder="Enter your Phone Number"
            value={localPhone}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              setLocalPhone(digits);
            }}
            className="flex-1"
          />
        </div>
        {!otpSent ? (
          <Button
            onClick={handleSendOTP}
            disabled={!isPhoneValid || isOtpSending}
            className="bg-[#DF6951] hover:bg-[#DF6951]/90 h-10 px-4 whitespace-nowrap sm:w-auto w-full"
          >
            {isOtpSending ? "Sending..." : "Send OTP"}
          </Button>
        ) : (
          <Button
            onClick={handleSendOTP}
            variant="outline"
            className="whitespace-nowrap sm:w-auto w-full"
            disabled={isOtpSending}
          >
            {isOtpSending ? "Sending..." : "Resend OTP"}
          </Button>
        )}
      </div>
      {otpSent && (
        <p className="text-xs text-green-600 mt-1">
          OTP sent to {countryCode}
          {localPhone}
        </p>
      )}
    </div>
  );

  const renderOtpInput = (id: string) =>
    otpSent && (
      <div className="space-y-2">
        <Label htmlFor={id}>
          Enter OTP <span className="text-red-500">*</span>
        </Label>
        <Input
          id={id}
          type="text"
          placeholder="Enter 6-digit OTP"
          value={formData.otp}
          onChange={(e) =>
            setFormData({
              ...formData,
              otp: e.target.value.replace(/\D/g, "").slice(0, 6),
            })
          }
          maxLength={6}
          className="w-full"
        />
      </div>
    );

  const renderConciergeStepOne = () => (
    <>
      {renderDatePicker("dates-concierge")}

      <div>
        <Label htmlFor="people-concierge">
          Number of People <span className="text-red-500">*</span>
        </Label>
        <Input
          id="people-concierge"
          type="number"
          placeholder="0"
          value={formData.people}
          onChange={(e) =>
            setFormData({
              ...formData,
              people: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="selectPackage-concierge">Select Package</Label>
        <Select
          value={formData.selectPackage}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              selectPackage: value,
            })
          }
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Package" />
          </SelectTrigger>
          <SelectContent>
            {packages.map((pkg) => (
              <SelectItem key={pkg.name} value={pkg.name}>
                {pkg.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="eventType-concierge">
          Event Type <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.eventType}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              eventType: value,
            })
          }
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wedding">Wedding</SelectItem>
            <SelectItem value="pre-wedding">Pre-Wedding</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
            <SelectItem value="reception">Reception</SelectItem>
            <SelectItem value="sangeet">Sangeet</SelectItem>
            <SelectItem value="mehendi">Mehendi</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="flexibleDates-concierge"
          checked={formData.flexibleDates}
          onCheckedChange={(checked) =>
            setFormData({
              ...formData,
              flexibleDates: checked as boolean,
            })
          }
        />
        <Label
          htmlFor="flexibleDates-concierge"
          className="text-sm cursor-pointer"
        >
          I have flexible dates
        </Label>
      </div>

      <Button
        className="w-full bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
        onClick={handleStepOneNext}
      >
        Next Step
        <ArrowRight className="ml-2 size-4" />
      </Button>

      {renderConciergeInfo()}
    </>
  );

  const renderConciergeStepTwo = () => (
    <>
      <div>
        <Label htmlFor="message-concierge">
          Message to the venue <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message-concierge"
          placeholder="Type here..."
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          rows={3}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="budget-concierge">
          Budget <span className="text-red-500">*</span>
        </Label>
        <Input
          id="budget-concierge"
          type="number"
          placeholder="0"
          value={formData.budget}
          onChange={(e) =>
            setFormData({
              ...formData,
              budget: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="name-concierge">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name-concierge"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="email-concierge">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email-concierge"
          type="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      {renderPhoneInput("concierge")}
      {renderOtpInput("otp-concierge")}

      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setEnquiryStep(1)}
          disabled={isSubmitting}
        >
          <ChevronLeft className="mr-1 size-4" />
          Back
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
          onClick={handleEnquirySubmit}
          disabled={
            !otpSent || !formData.otp || formData.otp.length < 6 || isSubmitting
          }
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Mail className="mr-2 size-5" />
              Submit Enquiry
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        We'll respond within 24 hours
      </p>
    </>
  );

  const renderVenueStepOne = () => (
    <>
      {renderDatePicker("dates-direct")}

      <div>
        <Label htmlFor="people-direct">
          Number of People <span className="text-red-500">*</span>
        </Label>
        <Input
          id="people-direct"
          type="number"
          placeholder="0"
          value={formData.people}
          onChange={(e) =>
            setFormData({
              ...formData,
              people: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="message-direct">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message-direct"
          placeholder="Tell us about your dream wedding..."
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          className="mt-1 min-h-[100px]"
        />
      </div>

      <Button
        className="w-full bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
        onClick={handleStepOneNext}
      >
        Continue
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </>
  );

  const renderVenueStepTwo = () => (
    <>
      <div>
        <Label htmlFor="budget-direct">
          Budget <span className="text-red-500">*</span>
        </Label>
        <Input
          id="budget-direct"
          type="number"
          placeholder="0"
          value={formData.budget}
          onChange={(e) =>
            setFormData({
              ...formData,
              budget: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="name-direct">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name-direct"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="email-direct">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email-direct"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>

      {renderPhoneInput("venue")}
      {renderOtpInput("otp-venue")}

      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setEnquiryStep(1)}
          disabled={isSubmitting}
        >
          <ChevronLeft className="mr-1 size-4" />
          Back
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
          onClick={handleEnquirySubmit}
          disabled={
            !otpSent || !formData.otp || formData.otp.length < 6 || isSubmitting
          }
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send className="mr-2 size-5" />
              Submit Enquiry
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        We'll respond within 24 hours
      </p>
    </>
  );

  // --------------------------------------------------------------------------
  // MAIN RENDER
  // --------------------------------------------------------------------------

  return (
    <Card className="p-4 sm:p-6 border-2">
      <Tabs
        value={enquiryType}
        onValueChange={(value) => {
          setEnquiryType(value as "concierge" | "venue");
          setEnquiryStep(1);
          // Reset phone and OTP state when switching tabs
          setCountryCode("+91");
          setLocalPhone("");
          setOtpSent(false);
          setOtpPhone(null);
          setFormData((prev) => ({ ...prev, otp: "" }));
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-transparent gap-2 sm:gap-3 p-0">
          <TabsTrigger
            value="concierge"
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10 data-[state=active]:from-[#02542D] data-[state=active]:to-[#DF6951] data-[state=active]:text-white transition-all duration-200 border-0"
          >
            <Sparkles className="size-4" />
            <span className="text-sm sm:text-base">Concierge</span>
          </TabsTrigger>
          <TabsTrigger
            value="venue"
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10 data-[state=active]:from-[#02542D] data-[state=active]:to-[#DF6951] data-[state- active]:text-white transition-all duration-200 border-0"
          >
            <Send className="size-4" />
            <span className="text-sm sm:text-base">Venue</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="concierge" className="space-y-4">
          {enquiryStep === 1
            ? renderConciergeStepOne()
            : renderConciergeStepTwo()}
        </TabsContent>

        <TabsContent value="venue" className="space-y-4">
          {enquiryStep === 1 ? renderVenueStepOne() : renderVenueStepTwo()}
        </TabsContent>
      </Tabs>
    </Card>
  );
}

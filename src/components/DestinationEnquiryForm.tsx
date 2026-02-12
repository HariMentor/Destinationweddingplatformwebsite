"use client";

import { useState } from "react";
import {
  Calendar,
  ArrowRight,
  Phone,
  Shield,
  ChevronLeft,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { Destination } from "./DestinationServices/types/destination";
import {
  initiateEnquiry,
  submitEnquiry,
} from "./DestinationServices/services/enquiryService";

// Wedding Concierge Enquiry Form Component
export function DestinationEnquiryForm({
  destination,
}: {
  destination: Destination;
}) {
  console.log(destination, "destination in enquiry form");
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    guestCount: "",
    eventType: "",
    budget: "",
    message: "",
    flexibleDates: false,
    needAccommodation: false,
    otp: "",
  });

  const handleSendOTP = async () => {
    if (!formData.phone) {
      toast.error("Please enter phone number");
      return;
    }

    try {
      await initiateEnquiry({
        enquiryFor: "DESTINATION",
        destinationId: destination._id,
        dateRange: {
          start: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
          end: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : "",
        },
        peopleCount: parseInt(formData.guestCount) || 0,
        eventType: formData.eventType,
        budget: parseInt(formData.budget) || 0,
        message: formData.message,
        name: formData.fullName,
        phone: formData.phone,
      });

      setOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOTP = () => {
    if (formData.otp.length === 6) {
      setOtpVerified(true);
      toast.success("Phone number verified!");
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  const handleEnquirySubmit = async () => {
    if (!otpVerified) {
      toast.error("Please verify OTP");
      return;
    }

    try {
      await submitEnquiry({
        enquiryFor: "DESTINATION",
        enquiryType: "concierge",

        destinationId: destination._id,

        dateRange: {
          start: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
          end: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : "",
        },

        peopleCount: parseInt(formData.guestCount) || 0,
        eventType: formData.eventType,
        budget: parseInt(formData.budget) || 0,
        message: formData.message,

        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,

        otp: formData.otp,
      });

      toast.success("Destination enquiry submitted!");
    } catch {
      toast.error("Failed to submit enquiry");
    }
  };

  return (
    <div className="space-y-4">
      {enquiryStep === 1 ? (
        <>
          {/* Step 1: Event Details */}
          <div>
            <Label htmlFor="destination-dates">
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
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range: any) => {
                    setDateRange({
                      from: range?.from,
                      to: range?.to,
                    });
                  }}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="destination-guests">
              Number of Guests <span className="text-red-500">*</span>
            </Label>
            <Input
              id="destination-guests"
              type="number"
              placeholder="e.g. 150"
              value={formData.guestCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  guestCount: e.target.value,
                })
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="destination-eventType">
              Event Type <span className="text-red-500">*</span>
            </Label>
            <Input
              id="destination-eventType"
              placeholder="e.g. Wedding, Pre-Wedding"
              value={formData.eventType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  eventType: e.target.value,
                })
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="destination-budget">Budget Range (Optional)</Label>
            <Input
              id="destination-budget"
              placeholder="e.g. $25,000 - $50,000"
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="destination-flexibleDates"
              checked={formData.flexibleDates}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  flexibleDates: checked === true,
                })
              }
            />
            <Label
              htmlFor="destination-flexibleDates"
              className="text-sm font-normal cursor-pointer"
            >
              I'm flexible with dates
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="destination-needAccommodation"
              checked={formData.needAccommodation}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  needAccommodation: checked === true,
                })
              }
            />
            <Label
              htmlFor="destination-needAccommodation"
              className="text-sm font-normal cursor-pointer"
            >
              Need accommodation assistance
            </Label>
          </div>

          <div>
            <Label htmlFor="destination-message">
              Special Requirements (Optional)
            </Label>
            <Textarea
              id="destination-message"
              placeholder="Tell us about your vision, special requirements, or any questions you have..."
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              className="mt-1 min-h-[80px]"
            />
          </div>

          <Button
            className="w-full bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
            onClick={() => setEnquiryStep(2)}
          >
            Continue
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </>
      ) : (
        <>
          {/* Step 2: Contact Details */}
          <div>
            <Label htmlFor="destination-fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="destination-fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="destination-email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="destination-email"
              type="email"
              placeholder="john@example.com"
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

          <div>
            <Label htmlFor="destination-phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="+1"
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    countryCode: e.target.value,
                  })
                }
                className="w-20"
              />
              <Input
                id="destination-phone"
                type="tel"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="flex-1"
              />
            </div>
          </div>

          {/* OTP Verification */}
          {!otpSent ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSendOTP}
            >
              <Phone className="mr-2 size-4" />
              Send OTP
            </Button>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="destination-otp">Enter OTP</Label>
              <div className="flex gap-2">
                <Input
                  id="destination-otp"
                  placeholder="000000"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otp: e.target.value,
                    })
                  }
                  maxLength={6}
                  className="flex-1"
                />
                <Button
                  onClick={handleVerifyOTP}
                  className="bg-[#02542D] hover:bg-[#02542D]/90"
                >
                  <Shield className="mr-1 size-4" />
                  Verify
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setEnquiryStep(1)}
            >
              <ChevronLeft className="mr-1 size-4" />
              Back
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
              onClick={handleEnquirySubmit}
              disabled={!otpVerified}
            >
              <Send className="mr-2 size-4" />
              Submit
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Our destination experts will contact you within 24 hours
          </p>
        </>
      )}
    </div>
  );
}

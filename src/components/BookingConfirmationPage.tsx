"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Clock,
  Mail,
  Phone,
  Download,
  Share2,
  ArrowLeft,
  CreditCard,
  Building,
  User,
  Info,
  Bell,
  Heart,
  Star,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
// import { useCurrency } from "./CurrencyContext";

interface BookingConfirmationPageProps {
  onBack: () => void;
  bookingType?: "venue" | "planner" | "vendor" | "product" | "tour" | "flight";
}

export function BookingConfirmationPage({
  onBack,
  bookingType = "venue",
}: BookingConfirmationPageProps) {
  // const { formatPrice } = useCurrency();
  const [emailSent, setEmailSent] = useState(false);

  // Mock booking data - in a real app this would come from the booking flow
  const bookingData = {
    confirmationNumber:
      "WDZ-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    bookingDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    venue: {
      name: "Cliffside Resort & Spa",
      location: "Santorini, Greece",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMzY0MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
      tax: 1312.5,
      total: 17062.5,
    },
    contact: {
      name: "Sarah & Michael Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
    },
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
              Booking Confirmation
            </h1>
            <p className="text-sm text-muted-foreground">
              Your reservation is confirmed
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Success Message */}
        <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 mb-4">
            <CheckCircle2 className="size-10 text-white" />
          </div>
          <h2
            className="text-3xl mb-2"
            style={{ fontFamily: "Volkhov, serif" }}
          >
            Booking Confirmed!
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Your dream wedding venue is reserved
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-200">
            <span className="text-sm text-muted-foreground">
              Confirmation Number:
            </span>
            <span className="font-mono font-medium text-green-700">
              {bookingData.confirmationNumber}
            </span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button variant="outline" className="gap-2" onClick={handleSendEmail}>
            <Mail className="size-4" />
            {emailSent ? "Email Sent!" : "Email Confirmation"}
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="size-4" />
            Share Details
          </Button>
        </div>

        {/* Booking Details */}
        <Card className="overflow-hidden">
          <div className="aspect-[21/9] relative overflow-hidden">
            <img
              src={bookingData.venue.image}
              alt={bookingData.venue.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                <Star className="size-3 mr-1 fill-yellow-400 text-yellow-400" />
                {bookingData.venue.rating}
              </Badge>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3
                className="text-2xl mb-1"
                style={{ fontFamily: "Volkhov, serif" }}
              >
                {bookingData.venue.name}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" />
                <span>{bookingData.venue.location}</span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-[#DF6951] mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Event Date
                    </div>
                    <div className="font-medium">
                      {bookingData.eventDetails.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-[#DF6951] mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Event Time
                    </div>
                    <div className="font-medium">
                      {bookingData.eventDetails.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="size-5 text-[#DF6951] mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Expected Guests
                    </div>
                    <div className="font-medium">
                      {bookingData.eventDetails.guests} guests
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="size-5 text-[#DF6951] mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Contact Name
                    </div>
                    <div className="font-medium">
                      {bookingData.contact.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-[#DF6951] mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">
                      {bookingData.contact.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-[#DF6951] mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">
                      {bookingData.contact.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="text-sm text-muted-foreground mb-2">
                Selected Package
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-[#DF6951]/10 to-[#F1A501]/10"
                >
                  {bookingData.eventDetails.package}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Summary */}
        <Card className="p-6">
          <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
            Payment Summary
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{bookingData.pricing.subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span>{bookingData.pricing.serviceFee}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{bookingData.pricing.tax}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">Total Paid</span>
              <span
                className="text-2xl font-medium text-green-600"
                style={{ fontFamily: "Volkhov, serif" }}
              >
                {bookingData.pricing.total}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <CreditCard className="size-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-blue-900 mb-1">
                  Payment Method
                </div>
                <div className="text-sm text-blue-700">
                  Visa ending in 4242 • Paid on {bookingData.bookingDate}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Information */}
        <Card className="p-6 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <Info className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-900 mb-2">
                Important Information
              </h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>
                  • A confirmation email has been sent to{" "}
                  {bookingData.contact.email}
                </li>
                <li>
                  • Please arrive 30 minutes before your scheduled event time
                </li>
                <li>
                  • Cancellation policy: Free cancellation up to 30 days before
                  the event
                </li>
                <li>
                  • For any changes to your booking, contact us at least 14 days
                  in advance
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6">
          <h3 className="text-xl mb-4" style={{ fontFamily: "Volkhov, serif" }}>
            What's Next?
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <div className="font-medium mb-1">
                  Venue Manager Will Contact You
                </div>
                <div className="text-sm text-muted-foreground">
                  Within 24-48 hours to discuss details and answer any questions
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <div className="font-medium mb-1">
                  Customize Your Experience
                </div>
                <div className="text-sm text-muted-foreground">
                  Work with our team to personalize every aspect of your special
                  day
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <div className="font-medium mb-1">Final Walk-Through</div>
                <div className="text-sm text-muted-foreground">
                  Schedule a visit 2-3 weeks before your event to finalize all
                  details
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => {
              /* Navigate to account/wedding-plan */
            }}
          >
            <Calendar className="size-5" />
            View My Wedding Plan
          </Button>
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90"
            onClick={() => {
              /* Navigate to marketplace or vendors */
            }}
          >
            <Heart className="size-5" />
            Continue Planning
          </Button>
        </div>

        {/* Support Card */}
        <Card className="p-6 text-center">
          <Bell className="size-10 text-[#DF6951] mx-auto mb-3" />
          <h4 className="font-medium mb-2">Need Help?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Our wedding planning team is here to assist you
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="size-4" />
              Call Support
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="size-4" />
              Email Us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

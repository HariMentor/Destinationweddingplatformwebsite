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
    Shield,
    Sparkles,
    Check,
    ArrowRight
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Card } from "./ui/card";

interface VenueEnquiryFormProps {
    packages: Array<{ name: string; price: number }>;
    formatPrice: (price: number) => string;
    venueId: string;
}

import { initiateEnquiry, submitEnquiry } from "./DestinationServices/services/enquiryService";

export function VenueEnquiryForm({ packages, formatPrice, venueId }: VenueEnquiryFormProps) {
    const [enquiryStep, setEnquiryStep] = useState(1);
    const [enquiryType, setEnquiryType] = useState<"concierge" | "venue">("concierge");

    console.log(enquiryType, "enquiry type")
    const [isConciergeInfoExpanded, setIsConciergeInfoExpanded] = useState(false);
    const [dateRange, setDateRange] = useState<{
        from: Date | undefined;
        to: Date | undefined;
    }>({
        from: undefined,
        to: undefined,
    });
    const [formData, setFormData] = useState({
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
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [calendarMonths, setCalendarMonths] = useState(2);
    const [isOtpSending, setIsOtpSending] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Responsive calendar months
    useEffect(() => {
        const handleResize = () => {
            setCalendarMonths(window.innerWidth >= 768 ? 2 : 1);
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSendOTP = async () => {
        if (!formData.phone || formData.phone.length < 10) {
            toast.error("Please enter a valid phone number");
            return;
        }

        setIsOtpSending(true);
        try {
            await initiateEnquiry({
                venueId: venueId,
                dateRange: {
                    start: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
                    end: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : (dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "")
                },
                peopleCount: parseInt(formData.people) || 0,
                package: formData.selectPackage,
                isFlexible: formData.flexibleDates,
                message: formData.message,
                name: formData.name,
                phone: formData.phone,
                eventType: formData.eventType,
                budget: parseInt(formData.budget) || 0
            });
            setOtpSent(true);
            toast.success(`OTP sent to ${formData.phone}`);
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
            console.error(error);
        } finally {
            setIsOtpSending(false);
        }
    };

    const handleVerifyOTP = () => {
        // This is now integrated into submit
    };

    const handleEnquirySubmit = async () => {
        // Validate required fields
        if (!formData.name || !formData.email || !formData.phone || !formData.otp) {
            toast.error("Please fill in all required fields including OTP");
            return;
        }

        setIsSubmitting(true);
        try {
            await submitEnquiry({
                venueId: venueId,
                dateRange: {
                    start: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
                    end: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : (dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "")
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
                enquiryType: enquiryType
            });

            const enquiryTypeMessage = enquiryType === "concierge"
                ? "Enquiry submitted successfully! Our wedding concierge will contact you within 24 hours."
                : "Enquiry sent directly to the venue! They will contact you within 24 hours.";

            toast.success(enquiryTypeMessage);

            // Reset form
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
            setOtpSent(false);
            setOtpVerified(false);
        } catch (error) {
            toast.error("Failed to submit enquiry. Please verify OTP and try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStepOneNext = () => {
        // Validate step 1 - different fields for concierge vs venue
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
            // venue enquiry only requires dates, people, and message in step 1
            if (
                !dateRange.from ||
                !formData.people ||
                !formData.message
            ) {
                toast.error("Please fill in all required fields");
                return;
            }
        }
        setEnquiryStep(2);
    };

    return (
        <Card className="p-4 sm:p-6 border-2">
            <Tabs value={enquiryType} onValueChange={(value) => setEnquiryType(value as "concierge" | "venue")} className="w-full">
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
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10 data-[state=active]:from-[#02542D] data-[state=active]:to-[#DF6951] data-[state=active]:text-white transition-all duration-200 border-0"
                    >
                        <Send className="size-4" />
                        <span className="text-sm sm:text-base">Venue</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent
                    value="concierge"
                    className="space-y-4"
                >
                    {enquiryStep === 1 ? (
                        <>
                            {/* Step 1: Event Details */}
                            <div>
                                <Label htmlFor="dates-concierge">
                                    Dates{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                                        {format(
                                                            dateRange.from,
                                                            "LLL dd, y",
                                                        )}{" "}
                                                        ~{" "}
                                                        {format(
                                                            dateRange.to,
                                                            "LLL dd, y",
                                                        )}
                                                    </>
                                                ) : (
                                                    format(
                                                        dateRange.from,
                                                        "LLL dd, y",
                                                    )
                                                )
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    Pick a date range
                                                </span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <CalendarComponent
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={(range) =>
                                                setDateRange({
                                                    from: range?.from,
                                                    to: range?.to,
                                                })
                                            }
                                            numberOfMonths={1}
                                            className="rounded-md border"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div>
                                <Label htmlFor="people-concierge">
                                    Number of People{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                <Label htmlFor="selectPackage-concierge">
                                    Select Package
                                </Label>
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
                                            <SelectItem
                                                key={pkg.name}
                                                value={pkg.name}
                                            >
                                                {pkg.name} -{" "}
                                                {formatPrice(pkg.price)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="eventType-concierge">
                                    Event Type{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                        <SelectItem value="wedding">
                                            Wedding
                                        </SelectItem>
                                        <SelectItem value="pre-wedding">
                                            Pre-Wedding
                                        </SelectItem>
                                        <SelectItem value="engagement">
                                            Engagement
                                        </SelectItem>
                                        <SelectItem value="reception">
                                            Reception
                                        </SelectItem>
                                        <SelectItem value="sangeet">
                                            Sangeet
                                        </SelectItem>
                                        <SelectItem value="mehendi">
                                            Mehendi
                                        </SelectItem>
                                        <SelectItem value="other">
                                            Other
                                        </SelectItem>
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
                                            flexibleDates:
                                                checked as boolean,
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

                            {/* Concierge Info - Expandable */}
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
                                            Our wedding concierge team acts as your personal wedding planning assistant, coordinating with the venue and all vendors to ensure your dream wedding comes to life.
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium">Expert Guidance</p>
                                                    <p className="text-xs text-muted-foreground">Professional advice on venue selection, packages, and planning</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium">Price Negotiation</p>
                                                    <p className="text-xs text-muted-foreground">We negotiate the best rates and packages on your behalf</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium">End-to-End Planning</p>
                                                    <p className="text-xs text-muted-foreground">Complete support from enquiry to your special day</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium">Single Point of Contact</p>
                                                    <p className="text-xs text-muted-foreground">Coordinated communication with all vendors and venue</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Step 2: Contact Details */}
                            <div>
                                <Label htmlFor="message-concierge">
                                    Message to the venue{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                    Budget{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                    Name{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                    Email{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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

                            <div>
                                <Label htmlFor="phone-concierge">
                                    Phone Number{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
                                </Label>
                                <div className="flex gap-2 mt-1">
                                    <Input
                                        id="phone-concierge"
                                        type="tel"
                                        placeholder="Enter your Phone Number"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleSendOTP}
                                        disabled={otpSent || isOtpSending}
                                        className="bg-[#DF6951] hover:bg-[#DF6951]/90"
                                    >
                                        {isOtpSending ? "Sending..." : otpSent ? "Sent" : "Send OTP"}
                                    </Button>
                                </div>
                            </div>

                            {otpSent && (
                                <div>
                                    <Label htmlFor="otp-concierge">
                                        Enter OTP{" "}
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </Label>
                                    <div className="flex gap-2 mt-1">
                                        <Input
                                            id="otp-concierge"
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
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
                                    </div>
                                </div>
                            )}

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
                                    disabled={!otpSent || !formData.otp || isSubmitting}
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
                    )}
                </TabsContent>

                <TabsContent
                    value="venue"
                    className="space-y-4"
                >
                    {enquiryStep === 1 ? (
                        <>
                            {/* Step 1: Event Details */}
                            <div>
                                <Label htmlFor="dates-direct">
                                    Dates{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                                        {format(
                                                            dateRange.from,
                                                            "LLL dd, y",
                                                        )}{" "}
                                                        ~{" "}
                                                        {format(
                                                            dateRange.to,
                                                            "LLL dd, y",
                                                        )}
                                                    </>
                                                ) : (
                                                    format(
                                                        dateRange.from,
                                                        "LLL dd, y",
                                                    )
                                                )
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    Pick a date range
                                                </span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <CalendarComponent
                                            mode="range"
                                            selected={{
                                                from: dateRange.from,
                                                to: dateRange.to,
                                            }}
                                            onSelect={(range) => {
                                                setDateRange({
                                                    from: range?.from,
                                                    to: range?.to,
                                                });
                                            }}
                                            initialFocus
                                            numberOfMonths={calendarMonths}
                                            disabled={(date) =>
                                                date <
                                                new Date(
                                                    new Date().setHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0,
                                                    ),
                                                )
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div>
                                <Label htmlFor="people-direct">
                                    People{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
                                </Label>
                                <Input
                                    id="people-direct"
                                    type="number"
                                    placeholder="Number of guests"
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
                                    Message{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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

                            <div>
                                <Button
                                    className="w-full bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
                                    onClick={handleStepOneNext}
                                >
                                    Continue
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </div>

                            {/* Concierge Info - Expandable */}
                            {enquiryType === "concierge" && (
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
                                                Our wedding concierge team acts as your personal wedding planning assistant, coordinating with the venue and all vendors to ensure your dream wedding comes to life.
                                            </p>
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-medium">Expert Guidance</p>
                                                        <p className="text-xs text-muted-foreground">Professional advice on venue selection, packages, and planning</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-medium">Price Negotiation</p>
                                                        <p className="text-xs text-muted-foreground">We negotiate the best rates and packages on your behalf</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-medium">End-to-End Planning</p>
                                                        <p className="text-xs text-muted-foreground">Complete support from enquiry to your special day</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-medium">Single Point of Contact</p>
                                                        <p className="text-xs text-muted-foreground">Coordinated communication with all vendors and venue</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Step 2: Contact Details */}
                            <div>
                                <Label htmlFor="message-final-direct">
                                    Message to the venue{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
                                </Label>
                                <Textarea
                                    id="message-final-direct"
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
                                <Label htmlFor="budget-direct">
                                    Budget{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                    Name{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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
                                    Email{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
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

                            <div>
                                <Label htmlFor="phone-direct">
                                    Phone{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
                                </Label>
                                <div className="flex gap-2 mt-1">
                                    <Input
                                        id="phone-direct"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="flex-1"
                                        disabled={otpVerified}
                                    />
                                    {!otpSent ? (
                                        <Button
                                            onClick={handleSendOTP}
                                            variant="outline"
                                            className="whitespace-nowrap"
                                        >
                                            Send OTP
                                        </Button>
                                    ) : !otpVerified ? (
                                        <Button
                                            onClick={handleSendOTP}
                                            variant="outline"
                                            className="whitespace-nowrap"
                                        >
                                            Resend
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            className="whitespace-nowrap gap-1 text-green-600 border-green-600"
                                            disabled
                                        >
                                            <Check className="size-4" />
                                            Verified
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {otpSent && (
                                <div>
                                    <Label htmlFor="otp-direct">
                                        Enter OTP{" "}
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="otp-direct"
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={formData.otp}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                otp: e.target.value,
                                            })
                                        }
                                        maxLength={6}
                                        className="mt-1"
                                    />
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
                                    disabled={!otpSent || !formData.otp || isSubmitting}
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
                    )}
                </TabsContent>
            </Tabs>
        </Card>
    );
}

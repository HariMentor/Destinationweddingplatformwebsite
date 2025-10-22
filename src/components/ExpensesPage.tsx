import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Cloud,
  Wrench,
  Megaphone,
  Calculator,
  AlertCircle,
  UserPlus,
  FileText,
  Globe,
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface ExpensesPageProps {
  onBack: () => void;
}

// Monthly expense data starting Jan 2026
const monthlyExpenses = [
  {
    month: "Jan 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Feb 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Mar 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Apr 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "May 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Jun 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Jul 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Aug 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Sep 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Oct 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Nov 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
  {
    month: "Dec 2026",
    developers: 833.33,
    cloud: 700,
    tools: 125,
    contentCreation: 800,
    videoCreation: 700,
    socialMedia: 600,
    seo: 400,
    miscellaneous: 416.67,
  },
];

export function ExpensesPage({ onBack }: ExpensesPageProps) {
  const [investmentAmount, setInvestmentAmount] =
    useState(15000);

  // Regional Operations Calculator State
  const [inboundBookings, setInboundBookings] = useState(20);
  const [outboundBookings, setOutboundBookings] = useState(20);
  const [
    destinationMarketingDeals,
    setDestinationMarketingDeals,
  ] = useState(2);
  const [otherOutboundRevenue, setOtherOutboundRevenue] =
    useState(50000);

  // Currency toggle state
  const [isINR, setIsINR] = useState(false);

  // Currency conversion and formatting functions
  const convertToINR = (gbp: number): number => gbp * 100;

  const formatINR = (amount: number): string => {
    if (amount >= 10000000) {
      // 1 Crore (100 Lakhs)
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      // 1 Lakh
      return `₹${(amount / 100000).toFixed(amount >= 1000000 ? 0 : 1)}L`;
    } else if (amount >= 1000) {
      // 1 Thousand
      return `₹${(amount / 1000).toFixed(0)}K`;
    } else {
      return `₹${amount.toFixed(0)}`;
    }
  };

  const formatCurrency = (
    gbpAmount: number,
    options?: { maximumFractionDigits?: number },
  ): string => {
    if (isINR) {
      const inrAmount = convertToINR(gbpAmount);
      return formatINR(inrAmount);
    } else {
      return `£${gbpAmount.toLocaleString(undefined, options)}`;
    }
  };

  // Calculate totals
  const calculateMonthlyTotal = (
    month: (typeof monthlyExpenses)[0],
  ) => {
    return (
      month.developers +
      month.cloud +
      month.tools +
      month.contentCreation +
      month.videoCreation +
      month.socialMedia +
      month.seo +
      month.miscellaneous
    );
  };

  const yearlyTotals = {
    developers: monthlyExpenses.reduce(
      (sum, m) => sum + m.developers,
      0,
    ),
    cloud: monthlyExpenses.reduce((sum, m) => sum + m.cloud, 0),
    tools: monthlyExpenses.reduce((sum, m) => sum + m.tools, 0),
    contentCreation: monthlyExpenses.reduce(
      (sum, m) => sum + m.contentCreation,
      0,
    ),
    videoCreation: monthlyExpenses.reduce(
      (sum, m) => sum + m.videoCreation,
      0,
    ),
    socialMedia: monthlyExpenses.reduce(
      (sum, m) => sum + m.socialMedia,
      0,
    ),
    seo: monthlyExpenses.reduce((sum, m) => sum + m.seo, 0),
    miscellaneous: monthlyExpenses.reduce(
      (sum, m) => sum + m.miscellaneous,
      0,
    ),
  };

  const grandTotal = Object.values(yearlyTotals).reduce(
    (sum, val) => sum + val,
    0,
  );

  // Equity calculator - baseline is £15K for 10% equity
  const baselineInvestment = 15000;
  const baselineEquity = 10;
  const companyValuation =
    baselineInvestment / (baselineEquity / 100);

  const equityPercentage =
    (investmentAmount / companyValuation) * 100;
  const monthlyContribution = investmentAmount / 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 gap-2 text-[#DF6951] hover:text-[#DF6951]/80"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#DF6951] to-[#F1A501] flex items-center justify-center">
                <DollarSign className="size-6 text-white" />
              </div>
              <div>
                <h1 style={{ fontFamily: "serif" }}>
                  Financials
                </h1>
                <p className="text-muted-foreground">
                  Financial planning for 2026
                </p>
              </div>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border-2 border-border shadow-sm">
              <span
                className={`text-sm ${!isINR ? "text-[#DF6951]" : "text-muted-foreground"}`}
              >
                GBP (£)
              </span>
              <Switch
                checked={isINR}
                onCheckedChange={setIsINR}
                className="data-[state=checked]:bg-[#DF6951]"
              />
              <span
                className={`text-sm ${isINR ? "text-[#DF6951]" : "text-muted-foreground"}`}
              >
                INR (₹)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Regional Operations Engagements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-white border-2 border-blue-400">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Globe className="size-6 text-white" />
              </div>
              <div>
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "serif" }}
                >
                  Regional Operations Engagements
                </h2>
                <p className="text-muted-foreground">
                  Revenue share model for regional growth
                  partners
                </p>
              </div>
            </div>

            {/* Model Explanation */}
            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg p-5 border-2 border-blue-200">
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <Building2 className="size-5 text-blue-600" />
                  Revenue Share Structure
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Regional Operations Leads will receive a
                  revenue share from direct sales activity in
                  their region. This performance-based model
                  helps us drive operations across different
                  regions while maintaining scalability.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inbound Sales */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowDownLeft className="size-5 text-green-600" />
                      <h4 className="text-sm">Inbound Sales</h4>
                    </div>
                    <div className="mb-3">
                      <p className="text-3xl text-green-600">
                        10%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Revenue Share
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      When customers{" "}
                      <strong>outside the region</strong> book
                      services <strong>in the region</strong>
                    </p>
                    <div className="mt-2 bg-white/60 rounded p-2">
                      <p className="text-xs">
                        <strong>Example:</strong> Customer from
                        Thailand books Europe wedding venue
                      </p>
                    </div>
                  </div>

                  {/* Outbound Sales */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowUpRight className="size-5 text-blue-600" />
                      <h4 className="text-sm">
                        Outbound Sales
                      </h4>
                    </div>
                    <div className="mb-3">
                      <p className="text-3xl text-blue-600">
                        12%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Revenue Share
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      When customers{" "}
                      <strong>from the region</strong> book
                      services{" "}
                      <strong>
                        outside or within the region
                      </strong>
                    </p>
                    <div className="mt-2 bg-white/60 rounded p-2">
                      <p className="text-xs">
                        <strong>Example:</strong> European
                        customer books Asia or European wedding
                        planner
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Destination Marketing */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="size-5 text-purple-600" />
                      <h4 className="text-sm">
                        Destination Marketing
                      </h4>
                    </div>
                    <div className="mb-3">
                      <p className="text-3xl text-purple-600">
                        15%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Flat Share
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      For non-booking commission models like
                      tourism board partnerships
                    </p>
                    <div className="bg-white/60 rounded p-2">
                      <p className="text-xs">
                        <strong>Min. Ticket Size:</strong>{" "}
                        £15,000/year
                      </p>
                    </div>
                  </div>

                  {/* Other Outbound Services */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="size-5 text-orange-600" />
                      <h4 className="text-sm">
                        Other Outbound Services
                      </h4>
                    </div>
                    <div className="mb-3">
                      <p className="text-3xl text-orange-600">
                        5%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Revenue Share
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For additional services and ancillary
                      revenue streams
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-amber-50 border border-amber-300 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-amber-900">
                        <strong>Fixed Timeframe:</strong> 2-year
                        commitment period with performance-based
                        revenue share
                      </p>
                      <p className="text-xs text-amber-900 mt-1">
                        <strong>After 2 Years:</strong> Option
                        to convert to salary payout with reduced
                        revenue share percentage (to be
                        discussed)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Calculator */}
            <div className="bg-white rounded-lg p-5 border-2 border-purple-200">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Calculator className="size-5 text-purple-600" />
                Revenue Calculator - Annual Projections
              </h3>

              <div className="space-y-6">
                {/* Inbound Bookings */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm flex items-center gap-2">
                      <ArrowDownLeft className="size-4 text-green-600" />
                      Inbound Bookings (Venues, Planners)
                    </label>
                    <span className="text-xl text-green-600">
                      {inboundBookings} bookings
                    </span>
                  </div>
                  <Slider
                    value={[inboundBookings]}
                    onValueChange={(value) =>
                      setInboundBookings(value[0])
                    }
                    min={0}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 bookings</span>
                    <span>100 bookings</span>
                  </div>
                </div>

                {/* Outbound Bookings */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm flex items-center gap-2">
                      <ArrowUpRight className="size-4 text-blue-600" />
                      Outbound Bookings (Venues, Planners)
                    </label>
                    <span className="text-xl text-blue-600">
                      {outboundBookings} bookings
                    </span>
                  </div>
                  <Slider
                    value={[outboundBookings]}
                    onValueChange={(value) =>
                      setOutboundBookings(value[0])
                    }
                    min={0}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 bookings</span>
                    <span>100 bookings</span>
                  </div>
                </div>

                {/* Destination Marketing Deals */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm flex items-center gap-2">
                      <Globe className="size-4 text-purple-600" />
                      Destination Marketing Deals
                    </label>
                    <span className="text-xl text-purple-600">
                      {destinationMarketingDeals} deals
                    </span>
                  </div>
                  <Slider
                    value={[destinationMarketingDeals]}
                    onValueChange={(value) =>
                      setDestinationMarketingDeals(value[0])
                    }
                    min={0}
                    max={10}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 deals</span>
                    <span>10 deals</span>
                  </div>
                </div>

                {/* Other Outbound Revenue */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm flex items-center gap-2">
                      <TrendingUp className="size-4 text-orange-600" />
                      Other Outbound Revenue
                    </label>
                    <span className="text-xl text-orange-600">
                      {formatCurrency(otherOutboundRevenue)}
                    </span>
                  </div>
                  <Slider
                    value={[otherOutboundRevenue]}
                    onValueChange={(value) =>
                      setOtherOutboundRevenue(value[0])
                    }
                    min={0}
                    max={200000}
                    step={5000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(0)}</span>
                    <span>{formatCurrency(200000)}</span>
                  </div>
                </div>

                {/* Calculations */}
                <div className="pt-4 border-t-2 border-dashed border-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Revenue Breakdown */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold mb-3">
                        Revenue Breakdown
                      </h4>

                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">
                            Inbound Bookings Value
                          </span>
                          <span className="text-sm">
                            {formatCurrency(
                              inboundBookings * 150000,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">
                            Wedzway 10% Commission
                          </span>
                          <span className="text-sm">
                            {formatCurrency(
                              inboundBookings * 150000 * 0.1,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-green-300 pt-1 mt-1">
                          <span className="text-xs">
                            Regional Lead 10%
                          </span>
                          <span className="text-sm text-green-600">
                            {formatCurrency(
                              inboundBookings *
                                150000 *
                                0.1 *
                                0.1,
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">
                            Outbound Bookings Value
                          </span>
                          <span className="text-sm">
                            {formatCurrency(
                              outboundBookings * 150000,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">
                            Wedzway 10% Commission
                          </span>
                          <span className="text-sm">
                            {formatCurrency(
                              outboundBookings * 150000 * 0.1,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-blue-300 pt-1 mt-1">
                          <span className="text-xs">
                            Regional Lead 12%
                          </span>
                          <span className="text-sm text-blue-600">
                            {formatCurrency(
                              outboundBookings *
                                150000 *
                                0.1 *
                                0.12,
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">
                            Destination Marketing Revenue
                          </span>
                          <span className="text-sm">
                            {formatCurrency(
                              destinationMarketingDeals * 15000,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-purple-300 pt-1 mt-1">
                          <span className="text-xs">
                            Regional Lead 15%
                          </span>
                          <span className="text-sm text-purple-600">
                            {formatCurrency(
                              destinationMarketingDeals *
                                15000 *
                                0.15,
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">
                            Other Outbound Revenue
                          </span>
                          <span className="text-sm">
                            {formatCurrency(
                              otherOutboundRevenue,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-orange-300 pt-1 mt-1">
                          <span className="text-xs">
                            Regional Lead 5%
                          </span>
                          <span className="text-sm text-orange-600">
                            {formatCurrency(
                              otherOutboundRevenue * 0.05,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Total Summary */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold mb-3">
                        Annual Summary
                      </h4>

                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-300">
                        <p className="text-xs text-muted-foreground mb-1">
                          Total Bookings Value
                        </p>
                        <p className="text-2xl">
                          {formatCurrency(
                            inboundBookings * 150000 +
                              outboundBookings * 150000,
                          )}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-300">
                        <p className="text-xs text-muted-foreground mb-1">
                          Wedzway's 10% Commission
                        </p>
                        <p className="text-2xl text-blue-700">
                          {formatCurrency(
                            inboundBookings * 150000 * 0.1 +
                              outboundBookings * 150000 * 0.1 +
                              destinationMarketingDeals *
                                15000 +
                              otherOutboundRevenue,
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Total platform revenue
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-xl p-5 text-white">
                        <p className="text-sm opacity-90 mb-2">
                          Regional Lead Total Share
                        </p>
                        <p className="text-4xl mb-1">
                          {formatCurrency(
                            inboundBookings *
                              150000 *
                              0.1 *
                              0.1 +
                              outboundBookings *
                                150000 *
                                0.1 *
                                0.12 +
                              destinationMarketingDeals *
                                15000 *
                                0.15 +
                              otherOutboundRevenue * 0.05,
                          )}
                        </p>
                        <p className="text-xs opacity-80 mt-2">
                          Per year (2-year commitment)
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <p className="text-xs text-muted-foreground mb-1">
                          Monthly Average
                        </p>
                        <p className="text-2xl text-green-600">
                          {formatCurrency(
                            (inboundBookings *
                              150000 *
                              0.1 *
                              0.1 +
                              outboundBookings *
                                150000 *
                                0.1 *
                                0.12 +
                              destinationMarketingDeals *
                                15000 *
                                0.15 +
                              otherOutboundRevenue * 0.05) /
                              12,
                            { maximumFractionDigits: 0 },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-300 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-2">
                      <Calculator className="size-4 text-blue-600 mt-0.5 shrink-0" />
                      <div className="text-xs text-blue-900">
                        <p className="mb-2">
                          <strong>Commission Structure:</strong>{" "}
                          Wedzway earns 10% commission on all
                          bookings (e.g.,{" "}
                          {formatCurrency(150000)} booking ={" "}
                          {formatCurrency(15000)} to Wedzway).
                          Regional leads then receive their
                          share from Wedzway's commission.
                          Average booking size of{" "}
                          {formatCurrency(150000)} for venues
                          and wedding planning. Destination
                          marketing deals have a minimum ticket
                          size of {formatCurrency(15000)} per
                          year per tourism board partnership.
                        </p>
                        <p>
                          <strong>Benefits:</strong> This
                          performance-based model aligns
                          regional leads' success with company
                          growth while providing predictable
                          commission structures for planning and
                          forecasting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equity Opportunity Section */}
            <div className="mt-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-purple-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <TrendingUp className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg">
                    Equity Opportunity for Regional Leads
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Long-term partnership with ownership stake
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* 3% Equity Based on Contribution */}
                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                      <Users className="size-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm mb-2">
                        Performance-Based Equity
                      </h4>
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm opacity-90">
                            Earn up to
                          </span>
                          <span className="text-3xl">3%</span>
                        </div>
                        <p className="text-xs opacity-80 mt-1">
                          equity in Wedzway
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Regional Operations Leads can earn{" "}
                        <strong>up to 3% equity</strong> based
                        on their contribution and performance
                        over a <strong>12-month period</strong>.
                      </p>
                      <div className="bg-purple-50 rounded p-3 border border-purple-200">
                        <p className="text-xs text-purple-900">
                          <strong>How it works:</strong> Equity
                          is awarded based on revenue generated,
                          regional growth metrics, partnership
                          development, and overall contribution
                          to platform success. Performance is
                          evaluated quarterly with final equity
                          allocation at the end of 12 months.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Equity for Initial Funding */}
                <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <DollarSign className="size-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm mb-2">
                        Additional Equity for Initial Funding
                        Contributors
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Regional Leads who contribute to the
                        initial funding round receive{" "}
                        <strong>additional equity</strong>
                        on top of the performance-based 3%
                        equity allocation.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-3 border border-indigo-200">
                          <p className="text-xs text-muted-foreground mb-1">
                            Example Contribution
                          </p>
                          <p className="text-xl text-indigo-600 mb-1">
                            {formatCurrency(5000)}
                          </p>
                          <p className="text-xs">
                            Grants <strong>~3.3% equity</strong>
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            (Based on {formatCurrency(150000)}{" "}
                            valuation)
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-3 border border-purple-200">
                          <p className="text-xs text-muted-foreground mb-1">
                            Combined Opportunity
                          </p>
                          <p className="text-xl text-purple-600 mb-1">
                            Up to 6.3%
                          </p>
                          <p className="text-xs">
                            <strong>3% performance</strong> +{" "}
                            <strong>3.3% funding</strong>
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Total potential equity stake
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 bg-indigo-50 rounded p-3 border border-indigo-200">
                        <p className="text-xs text-indigo-900">
                          <strong>Investment Advantage:</strong>{" "}
                          Contributing to initial funding not
                          only grants immediate equity but also
                          demonstrates commitment, making you
                          eligible for the full
                          performance-based equity opportunity.
                          This dual-path approach allows
                          Regional Leads to become significant
                          stakeholders in Wedzway's growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Combined Benefits */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-amber-900">
                      <p className="mb-2">
                        <strong>
                          Total Compensation Package:
                        </strong>{" "}
                        Regional Operations Leads enjoy a
                        comprehensive compensation structure
                        combining revenue share (10-15%),
                        performance-based equity (up to 3%), and
                        investment-based equity (variable based
                        on contribution).
                      </p>
                      <p>
                        <strong>Long-term Partnership:</strong>{" "}
                        After the initial 2-year commitment with
                        revenue share, there's an option to
                        convert to a salary-based model with
                        reduced but ongoing revenue
                        participation, while retaining all
                        earned equity. This ensures alignment
                        between regional success and company
                        growth throughout the journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 5-Year Financial Projection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-300">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="size-6 text-indigo-600" />
              <div>
                <h2 className="text-xl">
                  5-Year Financial Projection (2027-2031)
                </h2>
                <p className="text-sm text-muted-foreground">
                  Based on Regional Operations with 10% YoY
                  Growth
                </p>
              </div>
            </div>

            {/* Regional Distribution */}
            <div className="mb-6 bg-white rounded-lg p-4 border border-indigo-200">
              <h3 className="text-sm mb-3">
                Geographic Revenue Distribution
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 border border-red-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">India</span>
                  </div>
                  <p className="text-xl text-red-600">35%</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs">Europe</span>
                  </div>
                  <p className="text-xl text-purple-600">25%</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-3 rounded-full bg-orange-500"></div>
                    <span className="text-xs">
                      Asia-Pacific
                    </span>
                  </div>
                  <p className="text-xl text-orange-600">20%</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 border border-amber-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-3 rounded-full bg-amber-600"></div>
                    <span className="text-xs">Middle East</span>
                  </div>
                  <p className="text-xl text-amber-600">15%</p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-3 border border-teal-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-3 rounded-full bg-teal-500"></div>
                    <span className="text-xs">Others</span>
                  </div>
                  <p className="text-xl text-teal-600">5%</p>
                </div>
              </div>
            </div>

            {/* Projection Assumptions */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Calculator className="size-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-xs text-blue-900">
                  <p className="mb-2">
                    <strong>Base Year 2027 Assumptions:</strong>{" "}
                    Starting with 100 total bookings (50 inbound
                    + 50 outbound) at average booking value of{" "}
                    {formatCurrency(150000)}, 10 destination
                    marketing partnerships at{" "}
                    {formatCurrency(15000)} each, and{" "}
                    {formatCurrency(100000)} in other outbound
                    revenue.
                  </p>
                  <p>
                    <strong>Growth Model:</strong> 10%
                    year-over-year growth in all revenue
                    streams. Regional distribution remains
                    consistent across all years. Commission
                    structure: Wedzway 10%, Regional Leads
                    receive 10-15% of Wedzway's commission.
                  </p>
                </div>
              </div>
            </div>

            {/* Year-by-Year Projections Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-100">
                    <TableHead className="font-bold">
                      Year
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      Total Bookings
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      Booking Value
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      Wedzway Revenue
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      Regional Leads Share
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      Net to Wedzway
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    const years = [
                      2027, 2028, 2029, 2030, 2031,
                    ];
                    const baseBookings = 100;
                    const baseBookingValue = 150000;
                    const baseDestMarketing = 10 * 15000;
                    const baseOtherRevenue = 100000;

                    return years.map((year, index) => {
                      const growthFactor = Math.pow(1.1, index);
                      const totalBookings = Math.round(
                        baseBookings * growthFactor,
                      );
                      const bookingValue =
                        totalBookings *
                        baseBookingValue *
                        growthFactor;
                      const destMarketingRevenue =
                        baseDestMarketing * growthFactor;
                      const otherRevenue =
                        baseOtherRevenue * growthFactor;

                      // Wedzway's 10% commission on bookings
                      const wedzwayBookingCommission =
                        bookingValue * 0.1;
                      const wedzwayTotalRevenue =
                        wedzwayBookingCommission +
                        destMarketingRevenue +
                        otherRevenue;

                      // Regional leads get avg 11% of Wedzway's commission
                      // (10% for inbound, 12% for outbound, 15% for dest marketing, 5% for other)
                      const regionalLeadsShare =
                        wedzwayBookingCommission * 0.5 * 0.1 + // 50% inbound
                        wedzwayBookingCommission * 0.5 * 0.12 + // 50% outbound
                        destMarketingRevenue * 0.15 +
                        otherRevenue * 0.05;

                      const netToWedzway =
                        wedzwayTotalRevenue -
                        regionalLeadsShare;

                      return (
                        <TableRow
                          key={year}
                          className={
                            index % 2 === 0
                              ? "bg-indigo-50/30"
                              : "bg-white"
                          }
                        >
                          <TableCell className="font-semibold">
                            {year}
                          </TableCell>
                          <TableCell className="text-right">
                            {totalBookings}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(bookingValue)}
                          </TableCell>
                          <TableCell className="text-right text-green-600">
                            {formatCurrency(
                              wedzwayTotalRevenue,
                            )}
                          </TableCell>
                          <TableCell className="text-right text-orange-600">
                            {formatCurrency(regionalLeadsShare)}
                          </TableCell>
                          <TableCell className="text-right text-indigo-600">
                            {formatCurrency(netToWedzway)}
                          </TableCell>
                        </TableRow>
                      );
                    });
                  })()}
                </TableBody>
              </Table>
            </div>

            {/* Regional Breakdown for 2031 */}
            <div className="mt-6 bg-white rounded-lg p-5 border-2 border-indigo-200">
              <h3 className="text-sm mb-4">
                2031 Regional Revenue Distribution (Projected)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {(() => {
                  const year2031Index = 4;
                  const growthFactor = Math.pow(
                    1.1,
                    year2031Index,
                  );
                  const baseBookings = 100;
                  const baseBookingValue = 150000;
                  const baseDestMarketing = 10 * 15000;
                  const baseOtherRevenue = 100000;

                  const totalBookings = Math.round(
                    baseBookings * growthFactor,
                  );
                  const bookingValue =
                    totalBookings *
                    baseBookingValue *
                    growthFactor;
                  const destMarketingRevenue =
                    baseDestMarketing * growthFactor;
                  const otherRevenue =
                    baseOtherRevenue * growthFactor;
                  const wedzwayBookingCommission =
                    bookingValue * 0.1;
                  const wedzwayTotalRevenue =
                    wedzwayBookingCommission +
                    destMarketingRevenue +
                    otherRevenue;

                  const regions = [
                    {
                      name: "India",
                      percentage: 0.35,
                      color: "red",
                    },
                    {
                      name: "Europe",
                      percentage: 0.25,
                      color: "purple",
                    },
                    {
                      name: "Asia-Pacific",
                      percentage: 0.2,
                      color: "orange",
                    },
                    {
                      name: "Middle East",
                      percentage: 0.15,
                      color: "amber",
                    },
                    {
                      name: "Others",
                      percentage: 0.05,
                      color: "teal",
                    },
                  ];

                  return regions.map((region) => {
                    const regionalRevenue =
                      wedzwayTotalRevenue * region.percentage;
                    return (
                      <div
                        key={region.name}
                        className={`bg-gradient-to-br from-${region.color}-50 to-${region.color}-100 rounded-lg p-4 border border-${region.color}-200`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`size-3 rounded-full bg-${region.color}-500`}
                          ></div>
                          <span className="text-xs text-muted-foreground">
                            {region.name}
                          </span>
                        </div>
                        <p
                          className={`text-lg text-${region.color}-700 mb-1`}
                        >
                          {formatCurrency(regionalRevenue)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(region.percentage * 100).toFixed(0)}
                          % of total
                        </p>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Key Insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="size-5 text-green-600" />
                  <h4 className="text-sm">Total Growth</h4>
                </div>
                <p className="text-2xl text-green-600 mb-1">
                  46.4%
                </p>
                <p className="text-xs text-muted-foreground">
                  Cumulative revenue increase from 2027 to 2031
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="size-5 text-blue-600" />
                  <h4 className="text-sm">
                    India Leading Market
                  </h4>
                </div>
                <p className="text-2xl text-blue-600 mb-1">
                  35%
                </p>
                <p className="text-xs text-muted-foreground">
                  Largest revenue contributor across all years
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="size-5 text-purple-600" />
                  <h4 className="text-sm">Regional Partners</h4>
                </div>
                <p className="text-2xl text-purple-600 mb-1">
                  {(() => {
                    const year2031Index = 4;
                    const growthFactor = Math.pow(
                      1.1,
                      year2031Index,
                    );
                    const baseBookings = 100;
                    const baseBookingValue = 150000;
                    const baseDestMarketing = 10 * 15000;
                    const baseOtherRevenue = 100000;

                    const totalBookings = Math.round(
                      baseBookings * growthFactor,
                    );
                    const bookingValue =
                      totalBookings *
                      baseBookingValue *
                      growthFactor;
                    const destMarketingRevenue =
                      baseDestMarketing * growthFactor;
                    const otherRevenue =
                      baseOtherRevenue * growthFactor;
                    const wedzwayBookingCommission =
                      bookingValue * 0.1;

                    const regionalLeadsShare =
                      wedzwayBookingCommission * 0.5 * 0.1 +
                      wedzwayBookingCommission * 0.5 * 0.12 +
                      destMarketingRevenue * 0.15 +
                      otherRevenue * 0.05;

                    return formatCurrency(regionalLeadsShare);
                  })()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total earnings by regional leads in 2031
                </p>
              </div>
            </div>

            {/* Strategic Note */}
            <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-xs text-amber-900">
                  <p className="mb-2">
                    <strong>Strategic Outlook:</strong> This
                    5-year projection demonstrates sustainable
                    growth with India as the primary market
                    driver (35%), followed by Europe (25%) and
                    Asia-Pacific (20%). The Middle East (15%)
                    presents significant growth opportunities
                    given the rising destination wedding trend
                    in Dubai and beyond.
                  </p>
                  <p>
                    <strong>Risk Mitigation:</strong> Geographic
                    diversification across 5 major regions
                    reduces dependency on any single market. The
                    10% YoY growth is conservative compared to
                    industry trends (15-20%), providing a safety
                    margin. Regional Operations Leads'
                    performance-based compensation ensures
                    alignment with growth objectives.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Funding Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-white to-orange-50/50 border-2 border-[#DF6951]/20">
            <div className="flex items-center gap-3 mb-4">
              <Users className="size-6 text-[#DF6951]" />
              <h2 className="text-xl">Funding Summary</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white/60 rounded-lg p-4 border border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Initial Fund Source
                    </p>
                    <p className="text-lg">
                      Pooled from Friends and Family
                    </p>
                  </div>
                  <div className="text-right">
                    {/* <p className="text-sm text-muted-foreground mb-1">
                      
                    </p>
                    <p className="text-2xl text-green-600">
                      £35,000
                    </p> */}
                  </div>
                </div>
              </div>

              {/* <div className="bg-gradient-to-r from-[#DF6951]/10 to-[#F1A501]/10 rounded-lg p-4 border-2 border-[#DF6951]/30">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Additional Funding Required
                    </p>
                    <p className="text-lg">Against Equity</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">
                      Target Amount
                    </p>
                    <p className="text-2xl text-[#DF6951]">
                      £15,000
                    </p>
                    <p className="text-sm text-muted-foreground">
                      for 10% equity
                    </p>
                  </div>
                </div>
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/60 rounded-lg p-4 border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Funding Required
                  </p>
                  <p className="text-2xl text-green-600">
                    {formatCurrency(55000)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1"></p>
                </div>
                <div className="bg-gradient-to-br from-[#DF6951]/10 to-[#F1A501]/10 rounded-lg p-4 border-2 border-[#DF6951] text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Critical Funding Required
                  </p>
                  <p className="text-2xl text-[#DF6951]">
                    {formatCurrency(15000)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Against Equity
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4 border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Company Valuation
                  </p>
                  <p className="text-2xl">
                    {formatCurrency(150000)}
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4 border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    2026 Expenses
                  </p>
                  <p className="text-2xl">
                    {formatCurrency(grandTotal)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Critical Funding Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-red-500 flex items-center justify-center">
                <AlertCircle className="size-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl text-red-800">
                  Critical Funding Required
                </h2>
                <p className="text-sm text-red-600">
                  Immediate technology investment needed
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-lg p-5 border-2 border-red-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <UserPlus className="size-5 text-red-600" />
                    <h3 className="text-lg">
                      Technology Critical Fund:{" "}
                      {formatCurrency(15000)}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    This investment is essential for platform
                    development and scalability
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                      <div className="size-8 rounded-full bg-purple-500 flex items-center justify-center shrink-0 mt-0.5">
                        <UserPlus className="size-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <strong className="text-purple-800">
                            Hire 1 Additional Developer
                          </strong>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Expand development capacity to
                          accelerate feature rollout and handle
                          increasing platform complexity
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                      <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Cloud className="size-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <strong className="text-blue-800">
                            Cover Cloud Infrastructure Expenses
                          </strong>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ensure reliable hosting, database
                          services, and scalability for growing
                          user base
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-6 text-right shrink-0">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-5">
                    <p className="text-sm opacity-90 mb-1">
                      Required Amount
                    </p>
                    <p className="text-4xl mb-2">
                      {formatCurrency(15000)}
                    </p>
                    <div className="h-px bg-white/30 mb-2"></div>
                    <p className="text-xs opacity-90">
                      Against 10% Equity
                    </p>
                    <p className="text-xs opacity-80 mt-2">
                      Valuation: {formatCurrency(150000)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-900">
                    <strong>Why This Matters:</strong> Without
                    this critical funding, development velocity
                    will slow significantly, limiting our
                    ability to compete and meet market demands.
                    This investment directly impacts our
                    time-to-market for key features and platform
                    reliability.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Equity Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-white to-yellow-50/50">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="size-6 text-[#F1A501]" />
              <h2 className="text-xl">Investment Calculator</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm">
                    Investment Amount
                  </label>
                  <span className="text-2xl text-[#DF6951]">
                    {formatCurrency(investmentAmount)}
                  </span>
                </div>
                <Slider
                  value={[investmentAmount]}
                  onValueChange={(value) =>
                    setInvestmentAmount(value[0])
                  }
                  min={1000}
                  max={50000}
                  step={1000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatCurrency(1000)}</span>
                  <span>{formatCurrency(50000)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-lg p-4 text-white">
                  <p className="text-sm opacity-90 mb-1">
                    Equity Percentage
                  </p>
                  <p className="text-3xl">
                    {equityPercentage.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Monthly Contribution
                  </p>
                  <p className="text-2xl text-[#DF6951]">
                    {formatCurrency(monthlyContribution)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    over 12 months
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Company Valuation
                  </p>
                  <p className="text-2xl">
                    {formatCurrency(companyValuation)}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> The calculation is
                  based on a post-money valuation of{" "}
                  {formatCurrency(150000)}. Investing{" "}
                  {formatCurrency(investmentAmount)} gives you{" "}
                  {equityPercentage.toFixed(2)}% equity, which
                  can be paid as{" "}
                  {formatCurrency(monthlyContribution)} per
                  month over 12 months.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Expense Breakdown Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-xl mb-6">
              Annual Expense Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Technology Expenses */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="size-5 text-purple-600" />
                  <h3 className="text-sm">Technology</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      2 Developers
                    </span>
                    <span>
                      {formatCurrency(yearlyTotals.developers)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Cloud (GCP + MongoDB)
                    </span>
                    <span>
                      {formatCurrency(yearlyTotals.cloud)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      IT Tools
                    </span>
                    <span>
                      {formatCurrency(yearlyTotals.tools)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-purple-300 flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-purple-600">
                      {formatCurrency(
                        yearlyTotals.developers +
                          yearlyTotals.cloud +
                          yearlyTotals.tools,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Marketing Expenses */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="size-5 text-orange-600" />
                  <h3 className="text-sm">Marketing</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Content Creation
                    </span>
                    <span>
                      {formatCurrency(
                        yearlyTotals.contentCreation,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Video Creation
                    </span>
                    <span>
                      {formatCurrency(
                        yearlyTotals.videoCreation,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Social Media
                    </span>
                    <span>
                      {formatCurrency(yearlyTotals.socialMedia)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      SEO
                    </span>
                    <span>
                      {formatCurrency(yearlyTotals.seo)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-orange-300 flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-orange-600">
                      {formatCurrency(
                        yearlyTotals.contentCreation +
                          yearlyTotals.videoCreation +
                          yearlyTotals.socialMedia +
                          yearlyTotals.seo,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* IT Tools Detail */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Cloud className="size-5 text-blue-600" />
                  <h3 className="text-sm">
                    IT Tools Breakdown
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      ChatGPT (3 licenses)
                    </span>
                    <span>{formatCurrency(900)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Figma (1 license)
                    </span>
                    <span>{formatCurrency(300)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      GitLab
                    </span>
                    <span>{formatCurrency(300)}</span>
                  </div>
                  <div className="pt-2 border-t border-blue-300 flex justify-between">
                    <span>Total</span>
                    <span className="text-blue-600">
                      {formatCurrency(yearlyTotals.tools)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Miscellaneous Expenses */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="size-5 text-green-600" />
                  <h3 className="text-sm">Miscellaneous</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Admin
                    </span>
                    <span>
                      {formatCurrency(
                        yearlyTotals.miscellaneous / 3,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Legal
                    </span>
                    <span>
                      {formatCurrency(
                        yearlyTotals.miscellaneous / 3,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Operations
                    </span>
                    <span>
                      {formatCurrency(
                        yearlyTotals.miscellaneous / 3,
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-green-300 flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-green-600">
                      {formatCurrency(
                        yearlyTotals.miscellaneous,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-lg p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="size-5" />
                  <h3 className="text-sm">Annual Total</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs opacity-80 mb-1">
                      Total Technology
                    </p>
                    <p className="text-base">
                      {formatCurrency(
                        yearlyTotals.developers +
                          yearlyTotals.cloud +
                          yearlyTotals.tools,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80 mb-1">
                      Total Marketing
                    </p>
                    <p className="text-base">
                      {formatCurrency(
                        yearlyTotals.contentCreation +
                          yearlyTotals.videoCreation +
                          yearlyTotals.socialMedia +
                          yearlyTotals.seo,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80 mb-1">
                      Total Miscellaneous
                    </p>
                    <p className="text-base">
                      {formatCurrency(
                        yearlyTotals.miscellaneous,
                      )}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/30">
                    <p className="text-xs opacity-80 mb-1">
                      Grand Total 2026
                    </p>
                    <p className="text-3xl">
                      {formatCurrency(grandTotal)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Expense Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="size-6 text-[#DF6951]" />
              <h2 className="text-xl">
                Monthly Expense Schedule - 2026
              </h2>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">
                      Developers
                    </TableHead>
                    <TableHead className="text-right">
                      Cloud
                    </TableHead>
                    <TableHead className="text-right">
                      IT Tools
                    </TableHead>
                    <TableHead className="text-right">
                      Content
                    </TableHead>
                    <TableHead className="text-right">
                      Video
                    </TableHead>
                    <TableHead className="text-right">
                      Social
                    </TableHead>
                    <TableHead className="text-right">
                      SEO
                    </TableHead>
                    <TableHead className="text-right">
                      Misc
                    </TableHead>
                    <TableHead className="text-right">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyExpenses.map((month, index) => (
                    <TableRow key={index}>
                      <TableCell>{month.month}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(month.developers)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(month.cloud)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(month.tools)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(month.contentCreation)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(month.videoCreation)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(month.socialMedia)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(month.seo)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(month.miscellaneous)}
                      </TableCell>
                      <TableCell className="text-right text-[#DF6951]">
                        {formatCurrency(
                          calculateMonthlyTotal(month),
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gradient-to-r from-[#DF6951]/10 to-[#F1A501]/10">
                    <TableCell>Yearly Total</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(yearlyTotals.developers)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(yearlyTotals.cloud)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(yearlyTotals.tools)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        yearlyTotals.contentCreation,
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        yearlyTotals.videoCreation,
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(yearlyTotals.socialMedia)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(yearlyTotals.seo)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        yearlyTotals.miscellaneous,
                      )}
                    </TableCell>
                    <TableCell className="text-right text-[#DF6951]">
                      {formatCurrency(grandTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
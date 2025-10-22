import { Users, Heart, Building2, Globe2 } from "lucide-react";
import { Card } from "./ui/card";

const demographics = [
  {
    icon: Heart,
    title: "Engaged Couples",
    percentage: "45%",
    description: "Ages 25-35, planning destination weddings",
    details:
      "Tech-savvy, budget $30K-$150K, international travelers",
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-rose-50",
  },
  {
    icon: Users,
    title: "Wedding Planners",
    percentage: "30%",
    description:
      "Professional planners seeking verified vendors",
    details:
      "10-50 weddings/year, cross-border coordination needs",
    color: "from-purple-400 to-indigo-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Building2,
    title: "Service Providers",
    percentage: "20%",
    description: "Venues, photographers, and vendors",
    details:
      "Looking for international leads and verified bookings",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: Globe2,
    title: "Tourism Boards",
    percentage: "5%",
    description: "Government and destination marketing",
    details: "Promoting countries as wedding destinations",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50",
  },
];

const customerInsights = [
  {
    label: "Primary Markets",
    value: "Europe, India, Middle East, Australia",
  },
  {
    label: "Average Booking Value",
    value: "$50,000 - $120,000",
  },
  { label: "Planning Timeline", value: "12-18 months advance" },
  { label: "Guest Count", value: "50-150 attendees" },
];

export function TravelDemographics() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">
            Target Audience
          </p>
          <h2
            className="text-4xl md:text-5xl capitalize mb-6"
            style={{ fontFamily: "Volkhov, serif" }}
          >
            Customer Demographics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding our diverse customer base across the
            wedding ecosystem
          </p>
        </div>

        {/* Demographics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
          {demographics.map((demo, index) => (
            <Card
              key={index}
              className={`p-6 hover:shadow-xl transition-all duration-300 border-2 ${demo.bgColor}/50`}
            >
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${demo.color} w-fit mb-4`}
              >
                <demo.icon className="size-6 text-white" />
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className="text-4xl"
                    style={{ fontFamily: "Volkhov, serif" }}
                  >
                    {demo.percentage}
                  </span>
                </div>
                <h3 className="mb-2">{demo.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {demo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {demo.details}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Customer Insights */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-white border-2 border-amber-100">
            <h3 className="mb-6 text-center">
              Key Customer Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {customerInsights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-[#DF6951] to-[#F1A501] mt-2" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {insight.label}
                    </p>
                    <p className="font-medium">
                      {insight.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Geographic Heat */}
        <div className="mt-12 max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-rose-50 to-amber-50">
            <div className="text-center mb-6">
              <h3 className="mb-2">Geographic Distribution</h3>
              <p className="text-muted-foreground">
                Primary customer regions by market share
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  region: "India",
                  share: "35%",
                  color: "bg-rose-500",
                },
                {
                  region: "Europe",
                  share: "25%",
                  color: "bg-purple-500",
                },
                {
                  region: "Asia-Pacific",
                  share: "20%",
                  color: "bg-amber-500",
                },
                {
                  region: "Middle East",
                  share: "15%",
                  color: "bg-orange-500",
                },
                {
                  region: "Others",
                  share: "5%",
                  color: "bg-teal-500",
                },
              ].map((geo, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${geo.color}`}
                  />
                  <span className="text-sm font-medium">
                    {geo.region}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({geo.share})
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
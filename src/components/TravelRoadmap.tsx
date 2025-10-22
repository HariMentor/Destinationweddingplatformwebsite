import { Card } from "./ui/card";

const phases = [
  {
    quarter: "Q1",
    title: "Vendor Ecosystem",
    items: [
      "Onboard venues globally",
      "Photographer & videographer network",
      "Wedding planner partnerships",
      "Vendor verification system",
    ],
    color: "rose",
  },
  {
    quarter: "Q2",
    title: "Guest Portal + Payments",
    items: [
      "Guest management system",
      "Custom itinerary builder",
      "Secure payment gateway",
      "Contract management",
    ],
    color: "purple",
  },
  {
    quarter: "Q3",
    title: "AI & Marketplace",
    items: [
      "AI wedding planning assistant",
      "Smart vendor recommendations",
      "Marketplace commerce features",
      "Advanced analytics dashboard",
    ],
    color: "amber",
  },
  {
    quarter: "Q4",
    title: "International Expansion",
    items: [
      "Launch in Europe & Middle East",
      "Multi-language support",
      "Regional payment methods",
      "Local vendor partnerships",
    ],
    color: "blue",
  },
];

const colorClasses = {
  rose: {
    bg: "bg-rose-100",
    border: "border-rose-300",
    text: "text-rose-600",
    gradient: "from-rose-400 to-pink-500",
  },
  purple: {
    bg: "bg-purple-100",
    border: "border-purple-300",
    text: "text-purple-600",
    gradient: "from-purple-400 to-pink-500",
  },
  amber: {
    bg: "bg-amber-100",
    border: "border-amber-300",
    text: "text-amber-600",
    gradient: "from-amber-400 to-orange-500",
  },
  blue: {
    bg: "bg-blue-100",
    border: "border-blue-300",
    text: "text-blue-600",
    gradient: "from-blue-400 to-cyan-500",
  },
};

export function TravelRoadmap() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Our Journey</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            Roadmap
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {phases.map((phase, index) => {
            const colors = colorClasses[phase.color];
            return (
              <Card
                key={index}
                className={`p-6 border-2 ${colors.border} hover:shadow-xl transition-all`}
              >
                <div className={`inline-flex px-4 py-2 rounded-full ${colors.bg} ${colors.text} mb-4`}>
                  {phase.quarter}
                </div>
                <h3 className="mb-4">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-2 flex-shrink-0`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 rounded-full p-1 shadow-lg">
            <div className="bg-white rounded-full px-6 py-3">
              <p className="bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                12-Month Vision to Global Platform Leadership
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

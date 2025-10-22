import { Search, Sparkles, FileText, Calendar, LayoutDashboard, Star } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Search & Discovery",
    description: "Find perfect venues, planners, photographers, and travel coordinators worldwide",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Inspiration Board",
    description: "Explore themes, décor styles, and cultural traditions from around the globe",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: FileText,
    title: "Custom Quotes",
    description: "Receive instant proposals from verified vendors tailored to your vision",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Calendar,
    title: "Planner Tools",
    description: "Comprehensive budgeting, timeline management, and guest coordination",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: LayoutDashboard,
    title: "Vendor Dashboard",
    description: "Manage bookings, calendars, payments, and build your brand presence",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Star,
    title: "Reviews & Trust",
    description: "Verified listings with authentic reviews from real couples",
    gradient: "from-yellow-400 to-amber-500",
  },
];

export function TravelFeatures() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">What We Provide</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            Platform Features
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-border"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="size-8 text-white" />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { DollarSign, Users, Crown, Plane, MapPin } from "lucide-react";
import { Card } from "./ui/card";

const models = [
  {
    icon: DollarSign,
    title: "Commission per Booking",
    description: "Earn revenue from each successful wedding booking on the platform",
    badge: "B2C",
    color: "from-rose-400 to-orange-400",
  },
  {
    icon: Users,
    title: "Subscription + CRM Tools",
    description: "Monthly plans for planners and vendors with advanced business tools",
    badge: "B2B",
    color: "from-orange-400 to-amber-400",
  },
  {
    icon: Crown,
    title: "Premium Concierge",
    description: "White-glove service for high-net-worth clients seeking luxury experiences",
    badge: "HNI",
    color: "from-amber-400 to-yellow-400",
  },
  {
    icon: Plane,
    title: "Travel & Hospitality",
    description: "Strategic partnerships with hotels, airlines, and travel agencies",
    badge: "Partnership",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: MapPin,
    title: "Destination Marketing",
    description: "Partner with countries and tourism boards to promote destinations as premier wedding locations",
    badge: "B2G",
    color: "from-emerald-400 to-teal-400",
  },
];

export function TravelBusiness() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Revenue Streams</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            Business Model
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {models.map((model, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all border-border group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${model.color}`}>
                  <model.icon className="size-7 text-white" />
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-50 text-[#DF6951] border border-rose-200 text-sm">
                  {model.badge}
                </span>
              </div>
              <h3 className="mb-3">{model.title}</h3>
              <p className="text-muted-foreground">{model.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

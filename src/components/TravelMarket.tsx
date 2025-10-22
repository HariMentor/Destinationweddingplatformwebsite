import { TrendingUp, Globe2, Target } from "lucide-react";
import { Card } from "./ui/card";

const stats = [
  {
    icon: Globe2,
    value: "$300B",
    label: "Global Wedding Industry",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: TrendingUp,
    value: "$80B",
    label: "Destination Wedding Segment",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Target,
    value: "4 Regions",
    label: "India → Europe → Middle East → Americas",
    color: "from-purple-400 to-pink-500",
  },
];

export function TravelMarket() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Market Size</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            Market Opportunity
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-xl transition-all border-border"
            >
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${stat.color} mb-4`}>
                <stat.icon className="size-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl mb-3" style={{ fontFamily: 'Volkhov, serif' }}>
                {stat.value}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#FF946D] to-[#FF7D68] rounded-2xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto shadow-xl">
          <p className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Volkhov, serif' }}>
            Digital & international planning is on the rise
          </p>
          <p className="text-lg text-white/90">
            Post-pandemic couples are prioritizing meaningful celebrations in breathtaking destinations
          </p>
        </div>
      </div>
    </section>
  );
}

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, Layers, Shield, Sparkles } from "lucide-react";

const advantages = [
  {
    icon: Layers,
    title: "Full Planning Ecosystem",
    description: "Not just a directory – a comprehensive platform for end-to-end wedding planning",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: Award,
    title: "Multi-Service Integration",
    description: "Seamlessly combine venue + photo + travel + legal in one experience",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Shield,
    title: "Global Trust Network",
    description: "Rigorous vendor verification and authentic couple reviews worldwide",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Assistant",
    description: "Phase 2: Intelligent planning recommendations based on preferences and budget",
    color: "from-blue-400 to-cyan-500",
  },
];

export function TravelEdge() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            Our Competitive Edge
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="flex gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
              >
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${advantage.color}`}>
                    <advantage.icon className="size-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1628702109507-64e74d2d05f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY291cGxlfGVufDF8fHx8MTc2MDE4MDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Wedding Couple"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-[#DF6951]/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#F1A501]/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

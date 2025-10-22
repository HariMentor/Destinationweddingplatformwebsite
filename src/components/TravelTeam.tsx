import { Code, Heart, Cog, Users } from "lucide-react";
import { Card } from "./ui/card";

const expertise = [
  {
    icon: Code,
    title: "Product & Tech",
    description: "Experienced engineers building scalable, user-friendly platforms",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Wedding Industry",
    description: "Deep domain expertise in destination weddings and event planning",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: Cog,
    title: "Operations",
    description: "Proven track record in vendor partnerships and logistics management",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Users,
    title: "Growth & Marketing",
    description: "Strategic minds focused on customer acquisition and market expansion",
    gradient: "from-amber-400 to-orange-500",
  },
];

export function TravelTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Who We Are</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            Our Team
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {expertise.map((area, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-xl transition-all border-border group">
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${area.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                <area.icon className="size-8 text-white" />
              </div>
              <h3 className="mb-3">{area.title}</h3>
              <p className="text-muted-foreground">{area.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-2xl p-8 border border-rose-100">
            <p className="text-xl text-muted-foreground">
              We're a diverse, mission-driven team united by the vision of making dream destination weddings accessible to couples worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

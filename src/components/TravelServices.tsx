import { Satellite, Plane, Building2, Settings } from "lucide-react";
import { Card } from "./ui/card";

const services = [
  {
    icon: Satellite,
    title: "Calculated Weather",
    description: "Built Wicket longer admire do barton vanity itself do in it.",
    color: "from-rose-400 to-orange-400",
  },
  {
    icon: Plane,
    title: "Best Flights",
    description: "Engrossed listening. Park gate sell they west hard for the.",
    color: "from-orange-400 to-amber-400",
    featured: true,
  },
  {
    icon: Building2,
    title: "Local Events",
    description: "Barton vanity itself do in it. Preferd to men it engrossed listening.",
    color: "from-amber-400 to-yellow-400",
  },
  {
    icon: Settings,
    title: "Customization",
    description: "We deliver outsourced aviation services for military customers",
    color: "from-blue-400 to-cyan-400",
  },
];

export function TravelServices() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Category</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            We Offer Best Services
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`p-8 text-center hover:shadow-2xl transition-all duration-300 group ${
                service.featured ? 'bg-white shadow-xl relative' : ''
              }`}
            >
              {service.featured && (
                <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-[#DF6951] rounded-br-3xl rounded-tl-md opacity-20" />
              )}
              
              <div className={`inline-flex p-6 rounded-bl-3xl rounded-tr-3xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="size-12 text-white" />
              </div>
              
              <h3 className="mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

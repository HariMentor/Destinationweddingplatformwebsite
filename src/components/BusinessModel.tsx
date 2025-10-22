import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { DollarSign, Users, Crown, Plane } from "lucide-react";
import { Card } from "./ui/card";

const models = [
  {
    icon: DollarSign,
    title: "Commission per Booking",
    description: "Earn revenue from each successful wedding booking on the platform",
    badge: "B2C",
  },
  {
    icon: Users,
    title: "Subscription + CRM Tools",
    description: "Monthly plans for planners and vendors with advanced business tools",
    badge: "B2B",
  },
  {
    icon: Crown,
    title: "Premium Concierge",
    description: "White-glove service for high-net-worth clients seeking luxury experiences",
    badge: "HNI",
  },
  {
    icon: Plane,
    title: "Travel & Hospitality",
    description: "Strategic partnerships with hotels, airlines, and travel agencies",
    badge: "Partnership",
  },
];

export function BusinessModel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'serif' }}>
            Business Model
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Multiple revenue streams designed for sustainable growth and scalability
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all border-rose-100 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-rose-100 group-hover:bg-rose-200 transition-colors">
                    <model.icon className="size-7 text-rose-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                    {model.badge}
                  </span>
                </div>
                <h3 className="mb-3">{model.title}</h3>
                <p className="text-muted-foreground">{model.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

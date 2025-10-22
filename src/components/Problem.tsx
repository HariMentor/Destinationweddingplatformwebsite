import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { X, MapPinOff, DollarSign, Globe } from "lucide-react";
import { Card } from "./ui/card";

const problems = [
  {
    icon: MapPinOff,
    title: "Scattered Vendors",
    description: "Couples struggle with no unified platform to find trusted wedding vendors globally",
  },
  {
    icon: DollarSign,
    title: "No Price Transparency",
    description: "Hidden costs and lack of trust make budgeting a nightmare for destination weddings",
  },
  {
    icon: Globe,
    title: "Cross-Border Challenges",
    description: "Planning across countries involves complex travel, legal, and logistics hurdles",
  },
  {
    icon: X,
    title: "No Verified Leads",
    description: "Wedding planners struggle to connect with genuine international clients",
  },
];

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'serif' }}>
            The Problem
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Planning a destination wedding today is fragmented, stressful, and filled with uncertainty
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow border-rose-100">
                <div className="mb-4 inline-flex p-3 rounded-full bg-rose-100">
                  <problem.icon className="size-6 text-rose-600" />
                </div>
                <h3 className="mb-3">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

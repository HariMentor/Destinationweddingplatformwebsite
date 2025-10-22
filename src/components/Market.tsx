import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Globe2, Target } from "lucide-react";
import { Card } from "./ui/card";

const stats = [
  {
    icon: Globe2,
    value: "$300B",
    label: "Global Wedding Industry",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: TrendingUp,
    value: "$80B",
    label: "Destination Wedding Segment",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Target,
    value: "4 Regions",
    label: "India → Europe → Middle East → Americas",
    color: "bg-purple-100 text-purple-600",
  },
];

export function Market() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'serif' }}>
            Market Opportunity
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The destination wedding market is experiencing explosive growth as couples seek unique, memorable experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="p-8 text-center hover:shadow-xl transition-all border-rose-100 h-full">
                <div className={`inline-flex p-4 rounded-full ${stat.color} mb-4`}>
                  <stat.icon className="size-8" />
                </div>
                <div className="text-4xl md:text-5xl mb-3" style={{ fontFamily: 'serif' }}>
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto"
        >
          <p className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'serif' }}>
            Digital & international planning is on the rise
          </p>
          <p className="text-lg text-rose-50">
            Post-pandemic couples are prioritizing meaningful celebrations in breathtaking destinations
          </p>
        </motion.div>
      </div>
    </section>
  );
}

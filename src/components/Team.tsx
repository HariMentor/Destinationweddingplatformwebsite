import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
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

export function Team() {
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
            Our Team
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate team combining technology, wedding industry expertise, and operational excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {expertise.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full text-center hover:shadow-xl transition-all border-rose-100 group">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${area.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                  <area.icon className="size-8 text-white" />
                </div>
                <h3 className="mb-3">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100">
            <p className="text-xl text-muted-foreground">
              We're a diverse, mission-driven team united by the vision of making dream destination weddings accessible to couples worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

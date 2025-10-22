import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, Layers, Shield, Sparkles } from "lucide-react";

const advantages = [
  {
    icon: Layers,
    title: "Full Planning Ecosystem",
    description: "Not just a directory – a comprehensive platform for end-to-end wedding planning",
  },
  {
    icon: Award,
    title: "Multi-Service Integration",
    description: "Seamlessly combine venue + photo + travel + legal in one experience",
  },
  {
    icon: Shield,
    title: "Global Trust Network",
    description: "Rigorous vendor verification and authentic couple reviews worldwide",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Assistant",
    description: "Phase 2: Intelligent planning recommendations based on preferences and budget",
  },
];

export function CompetitiveEdge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-rose-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'serif' }}>
            Our Competitive Edge
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            What sets Wedzway apart in the global wedding marketplace
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-rose-100"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-rose-100 to-pink-100">
                      <advantage.icon className="size-6 text-rose-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2">{advantage.title}</h3>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1628702109507-64e74d2d05f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY291cGxlfGVufDF8fHx8MTc2MDE4MDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Wedding Couple"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-30 -z-10" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

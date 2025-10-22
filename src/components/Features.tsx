import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Search, Sparkles, FileText, Calendar, LayoutDashboard, Star } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Search & Discovery",
    description: "Find perfect venues, planners, photographers, and travel coordinators worldwide",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Inspiration Board",
    description: "Explore themes, décor styles, and cultural traditions from around the globe",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: FileText,
    title: "Custom Quotes",
    description: "Receive instant proposals from verified vendors tailored to your vision",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Calendar,
    title: "Planner Tools",
    description: "Comprehensive budgeting, timeline management, and guest coordination",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: LayoutDashboard,
    title: "Vendor Dashboard",
    description: "Manage bookings, calendars, payments, and build your brand presence",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Star,
    title: "Reviews & Trust",
    description: "Verified listings with authentic reviews from real couples",
    gradient: "from-yellow-400 to-amber-500",
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-rose-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'serif' }}>
            Platform Features
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to plan, coordinate, and execute the perfect destination wedding
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 h-full shadow-md hover:shadow-2xl transition-all duration-300 border border-rose-100 hover:border-rose-200">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="size-8 text-white" />
                </div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

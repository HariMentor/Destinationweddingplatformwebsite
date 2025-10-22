import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { CheckCircle2, Code, Building2, LayoutDashboard, Globe } from "lucide-react";
import { Badge } from "./ui/badge";

const mvpFeatures = [
  {
    icon: Code,
    title: "Vendor Onboarding System",
    description: "Complete registration and verification workflow for wedding service providers",
  },
  {
    icon: Building2,
    title: "Wedding Venue Discovery",
    description: "Interactive search and filtering for destination wedding venues globally",
  },
  {
    icon: LayoutDashboard,
    title: "Planner Login & Dashboard",
    description: "Professional tools for wedding planners to manage clients and bookings",
  },
  {
    icon: Globe,
    title: "Multi-Country Deployment",
    description: "Infrastructure ready for international markets and localization",
  },
];

export function MVP() {
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge className="bg-green-500 text-white px-4 py-1.5">LIVE</Badge>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: 'serif' }}>
              MVP Status
            </h2>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our Minimum Viable Product is live and operational, with core features ready for market validation
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {mvpFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-green-100 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-green-100">
                    <feature.icon className="size-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3>{feature.title}</h3>
                      <CheckCircle2 className="size-5 text-green-500 flex-shrink-0" />
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <p className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'serif' }}>
              Ready for Beta Testing & Early Partnerships
            </p>
            <p className="text-lg text-green-50 max-w-2xl mx-auto">
              We're actively seeking launch partners and early adopters to refine the platform before full-scale deployment
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

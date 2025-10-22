import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight, Mail, Users, TrendingUp } from "lucide-react";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1698616596895-71e43af05b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwdmluZXlhcmQlMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDE4MDYyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Wedding Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-purple-900/85 to-pink-900/90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-white max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8" style={{ fontFamily: 'serif' }}>
            Join the Movement
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-12" />
          <p className="text-xl md:text-2xl mb-12 text-rose-50 leading-relaxed">
            Be part of revolutionizing the destination wedding industry. Whether you're an investor, partner, or early adopter, there's a place for you in the Wedzway ecosystem.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <TrendingUp className="size-10 mx-auto mb-4 text-rose-300" />
              <h3 className="mb-2 text-white">Invest With Us</h3>
              <p className="text-rose-100">Join our journey to build a global platform</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <Users className="size-10 mx-auto mb-4 text-purple-300" />
              <h3 className="mb-2 text-white">Partner With Us</h3>
              <p className="text-rose-100">Strategic collaboration opportunities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <Mail className="size-10 mx-auto mb-4 text-pink-300" />
              <h3 className="mb-2 text-white">Join Beta</h3>
              <p className="text-rose-100">Early access to our platform</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 px-10 py-6">
              Get in Touch
              <ArrowRight className="ml-2 size-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 backdrop-blur-sm">
              View Pitch Deck
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full" />
      <div className="absolute top-1/2 right-20 w-16 h-16 border border-white/20 rounded-full" />
    </section>
  );
}

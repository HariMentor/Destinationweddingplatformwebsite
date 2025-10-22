import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight, Mail, Users, TrendingUp } from "lucide-react";

export function TravelCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1698616596895-71e43af05b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXNjYW55JTIwdmluZXlhcmQlMjB3ZWRkaW5nfGVufDF8fHx8MTc2MDE4MDYyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Wedding Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#DF6951]/95 via-[#F15A2B]/90 to-[#DF6951]/95" />
      </div>

      {/* Content */}
      {/* <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8" style={{ fontFamily: 'Volkhov, serif' }}>
            Join the Movement
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-12" />
          <p className="text-xl md:text-2xl mb-12 text-white/95 leading-relaxed">
            Be part of revolutionizing the destination wedding industry. Whether you're an investor, partner, or early adopter, there's a place for you in the Wedzway ecosystem.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <TrendingUp className="size-10 mx-auto mb-4 text-white" />
              <h3 className="mb-2 text-white">Invest With Us</h3>
              <p className="text-white/90">Join our journey to build a global platform</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <Users className="size-10 mx-auto mb-4 text-white" />
              <h3 className="mb-2 text-white">Partner With Us</h3>
              <p className="text-white/90">Strategic collaboration opportunities</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <Mail className="size-10 mx-auto mb-4 text-white" />
              <h3 className="mb-2 text-white">Join Beta</h3>
              <p className="text-white/90">Early access to our platform</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-[#DF6951] hover:bg-white/90 px-10 py-6">
              Get in Touch
              <ArrowRight className="ml-2 size-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 backdrop-blur-sm">
              View Pitch Deck
            </Button>
          </div>
        </div>
      </div> */}

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full" />
      <div className="absolute top-1/2 right-20 w-16 h-16 border border-white/20 rounded-full" />
    </section>
  );
}

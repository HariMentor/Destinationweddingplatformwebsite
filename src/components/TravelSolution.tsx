import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  "A unified digital marketplace + planning ecosystem",
  "Verified global wedding vendors with real reviews",
  "Tools for custom itineraries, budgeting & logistics",
  "Secure payments, contracts & concierge support",
];

export function TravelSolution() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div>
            <p className="text-muted-foreground uppercase tracking-wide mb-4">What We Offer</p>
            <h2 className="text-4xl md:text-5xl capitalize mb-8" style={{ fontFamily: 'Volkhov, serif' }}>
              Our Solution
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              A comprehensive ecosystem that brings together every element of destination wedding planning into one seamless experience
            </p>

            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle2 className="size-6 text-[#DF6951] flex-shrink-0 mt-0.5" />
                  <p className="text-lg">{solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1521543387600-c745f8e83d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzYwMTgwNjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Luxury Wedding Venue"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#DF6951]/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F1A501]/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

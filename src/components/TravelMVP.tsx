import {
  CheckCircle2,
  Code,
  Building2,
  LayoutDashboard,
  Globe,
} from "lucide-react";
import { Badge } from "./ui/badge";

const mvpFeatures = [
  {
    icon: Code,
    title: "Vendor Onboarding System",
    description:
      "Complete registration and verification workflow for wedding service providers",
    color: "from-rose-400 to-orange-400",
  },
  {
    icon: Building2,
    title: "Wedding Venue Discovery",
    description:
      "Interactive search and filtering for destination wedding venues globally",
    color: "from-orange-400 to-amber-400",
  },
  // {
  //   icon: LayoutDashboard,
  //   title: "Planner Login & Dashboard",
  //   description: "Professional tools for wedding planners to manage clients and bookings",
  //   color: "from-amber-400 to-yellow-400",
  // },
  // {
  //   icon: Globe,
  //   title: "Multi-Country Deployment",
  //   description: "Infrastructure ready for international markets and localization",
  //   color: "from-blue-400 to-cyan-400",
  // },
];

export function TravelMVP() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge className="bg-green-500 text-white px-4 py-1.5">
              LIVE
            </Badge>
          </div>
          <p className="text-muted-foreground uppercase tracking-wide mb-4">
            Current Status
          </p>
          <h2
            className="text-4xl md:text-5xl capitalize"
            style={{ fontFamily: "Volkhov, serif" }}
          >
            MVP Status
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {mvpFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border-2 border-green-100 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${feature.color}`}
                  >
                    <feature.icon className="size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3>{feature.title}</h3>
                      <CheckCircle2 className="size-5 text-green-500 flex-shrink-0" />
                    </div>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
            <p
              className="text-2xl md:text-3xl mb-4"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Ready for Beta Testing & Early Partnerships
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We're actively seeking launch partners and early
              adopters to refine the platform before full-scale
              deployment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
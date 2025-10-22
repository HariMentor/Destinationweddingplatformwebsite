import { Building2, Users, Camera, Video, Sparkles, Shirt, Plane, CheckCircle2, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

const rolloutFeatures = [
  {
    icon: Building2,
    title: "Venue Onboarding",
    subtitle: "Venue Listing",
    status: "completed",
    progress: 100,
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    icon: Users,
    title: "Wedding Planners",
    subtitle: "Coming Soon",
    status: "in-progress",
    progress: 60,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: Camera,
    title: "Photographers",
    subtitle: "In Development",
    status: "upcoming",
    progress: 30,
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    icon: Video,
    title: "Videographers",
    subtitle: "Planned",
    status: "upcoming",
    progress: 30,
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    icon: Sparkles,
    title: "Makeup Artists",
    subtitle: "Planned",
    status: "upcoming",
    progress: 0,
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    icon: Shirt,
    title: "Costume Designers",
    subtitle: "Planned",
    status: "upcoming",
    progress: 0,
    color: "from-indigo-400 to-purple-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    icon: Plane,
    title: "Travel Agents",
    subtitle: "Planned",
    status: "upcoming",
    progress: 0,
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
];

export function TravelFeatureRollout() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Launch Progress</p>
          <h2 className="text-4xl md:text-5xl capitalize mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
            Feature Rollout Status
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're progressively onboarding different service categories to build the complete wedding ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {rolloutFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`p-6 hover:shadow-xl transition-all duration-300 border-2 ${feature.borderColor} ${feature.bgColor}/30`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.status === "completed" ? (
                  <Badge className="bg-green-500 text-white border-0">
                    <CheckCircle2 className="size-3 mr-1" />
                    Done
                  </Badge>
                ) : feature.status === "in-progress" ? (
                  <Badge className="bg-blue-500 text-white border-0">
                    <Clock className="size-3 mr-1" />
                    Planned
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                    Planned
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h3 className="mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{feature.subtitle}</p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{feature.progress}%</span>
                </div>
                <Progress value={feature.progress} className="h-2" />
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="p-8 bg-white border-2 border-green-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="relative size-20">
                  <svg className="size-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(1 / 7) * 226} 226`}
                      className="text-green-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl">1/7</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="mb-2">Platform Launch Status</h3>
                <p className="text-muted-foreground">
                  <span className="text-green-600 font-medium">Venue listings are live!</span> Wedding planners onboarding is underway. 
                  Additional service categories will roll out progressively over the next quarters.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-700">Actively Building</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

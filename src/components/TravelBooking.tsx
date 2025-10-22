import { MapPin, CreditCard, Car } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const steps = [
  {
    icon: MapPin,
    title: "Choose Destination",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    color: "bg-[#F0BB1F]",
  },
  {
    icon: CreditCard,
    title: "Make Payment",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    color: "bg-[#F15A2B]",
  },
  {
    icon: Car,
    title: "Reach Airport on Selected Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    color: "bg-[#006380]",
  },
];

export function TravelBooking() {
  return (
    <section id="planning" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div>
            <p className="text-muted-foreground uppercase tracking-wide mb-4">Easy and Fast</p>
            <h2 className="text-4xl md:text-5xl capitalize mb-12" style={{ fontFamily: 'Volkhov, serif' }}>
              Book your next trip<br />in 3 easy steps
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-5">
                  <div className={`${step.color} rounded-xl p-4 h-fit`}>
                    <step.icon className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Trip Card */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md mx-auto">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1664688023019-d4ab2703a7cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0aW5hdGlvbiUyMHdlZGRpbmclMjBzYW50b3Jpbml8ZW58MXx8fHwxNzYwMTgwNjI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Trip to Greece"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="mb-2">Trip To Greece</h3>
              <p className="text-muted-foreground mb-4">14-29 June | by Robbin joseph</p>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-50 rounded-full">
                  <MapPin className="size-4 text-muted-foreground" />
                </div>
                <div className="p-2 bg-rose-50 rounded-full">
                  <Car className="size-4 text-muted-foreground" />
                </div>
                <div className="p-2 bg-rose-50 rounded-full">
                  <CreditCard className="size-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" />
                <span>24 people going</span>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-4 max-w-[260px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-md" />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1628702109507-64e74d2d05f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY291cGxlfGVufDF8fHx8MTc2MDE4MDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Rome"
                    className="relative size-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Ongoing</p>
                  <p>Trip to rome</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm mb-2">
                  <span className="text-[#8A79DF]">40%</span> completed
                </p>
                <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-[#8A79DF] rounded-full" />
                </div>
              </div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute -z-10 top-1/2 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Mike Taylor",
    location: "Lahore, Pakistan",
    image: "https://images.unsplash.com/photo-1628702109507-64e74d2d05f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY291cGxlfGVufDF8fHx8MTc2MDE4MDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    text: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
  },
  {
    name: "Chris Thomas",
    location: "CEO of Red Button",
    text: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
  },
];

export function TravelTestimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-rose-50/30 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Left Content */}
          <div>
            <p className="text-muted-foreground uppercase tracking-wide mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl capitalize mb-12" style={{ fontFamily: 'Volkhov, serif' }}>
              What people say<br />about Us.
            </h2>

            {/* Pagination Dots */}
            <div className="flex gap-3">
              <div className="w-3 h-3 rounded-full bg-foreground" />
              <div className="w-3 h-3 rounded-full bg-muted" />
              <div className="w-3 h-3 rounded-full bg-muted" />
            </div>
          </div>

          {/* Right Content - Testimonials */}
          <div className="relative">
            {/* Background Card */}
            <Card className="absolute top-16 -right-4 w-full p-8 bg-white border-2 border-rose-50">
              <p className="text-muted-foreground leading-relaxed mb-6">
                {testimonials[1].text}
              </p>
              <div>
                <p>{testimonials[1].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[1].location}</p>
              </div>
            </Card>

            {/* Foreground Card */}
            <Card className="relative z-10 p-8 bg-white shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <ImageWithFallback
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  className="size-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    {testimonials[0].text}
                  </p>
                </div>
              </div>
              
              <div>
                <p>{testimonials[0].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[0].location}</p>
              </div>
            </Card>

            {/* Navigation */}
            <div className="absolute -right-12 top-1/3 flex flex-col gap-4">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronUp className="size-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronDown className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

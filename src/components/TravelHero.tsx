import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";

export function TravelHero() {
  return (
    <section className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Animated Decorative Blur Circles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-rose-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <p className="text-[#DF6951] uppercase tracking-wide">
                The Global Destination Wedding Ecosystem
              </p>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
                One Platform for Every Dream Wedding, Anywhere in the World
              </h1>
              <div className="relative inline-block">
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 385 12" fill="none">
                  <path d="M57.8282 -2.53796L58.7692 -2.69614L56.9381 -2.92292L57.8159 -3.08892C58.696 -3.0874 59.8364 -2.83866 60.4569 -2.97083C60.5328 -3.09879 59.5744 -3.13986 59.3298 -3.24181C59.1134 -3.34631 58.9368 -3.45013 58.802 -3.55202C59.2814 -3.55092 59.8083 -3.52628 60.3517 -3.47953C61.0825 -3.40318 61.7993 -3.36607 62.4231 -3.37229C63.6986 -3.35167 64.9308 -3.37224 66.3175 -3.36771L65.8561 -3.67567L67.6433 -3.60362C67.8327 -3.58016 68.0585 -3.61789 68.2446 -3.58887C69.7934 -3.34329 70.4488 -3.47711 71.1923 -3.58807C71.3448 -3.61678 71.5284 -3.63822 71.7384 -3.65182C73.8045 -3.593 75.6677 -3.24878 77.5284 -3.07207C77.8786 -3.02695 78.2145 -2.96904 78.5123 -2.90243C79.1595 -2.77295 79.8794 -2.66724 80.6062 -2.59496C81.3329 -2.52269 82.0433 -2.48616 82.6724 -2.48871C84.0636 -2.49157 85.6353 -2.40593 87.2355 -2.24008C87.7113 -2.18545 88.1875 -2.14941 88.6336 -2.13426C89.0798 -2.11911 89.4861 -2.12517 89.8265 -2.15207L90.9084 -1.97627C91.3774 -2.04761 91.972 -2.08675 92.6563 -2.09131C93.3406 -2.09588 94.1001 -2.06577 94.8889 -2.00283C95.7295 -1.93455 96.5834 -1.88852 97.4555 -1.81633C99.2571 -1.67832 101.011 -1.59392 102.661 -1.56575C105.119 -1.48225 107.521 -1.4177 110.001 -1.31361C111.552 -1.26336 113.064 -1.23573 114.527 -1.23085C116.279 -1.21119 118.174 -1.11605 120.121 -0.950019V-0.950019C120.029 -0.794239 119.175 -0.840261 118.602 -0.845533C116.754 -0.871424 114.862 -0.938519 112.96 -0.988921C112.103 -1.00859 111.27 -1.01605 110.466 -1.01122C109.12 -1.01768 107.702 -1.05919 106.235 -1.13504C103.918 -1.2185 101.675 -1.25861 99.5288 -1.25498C99.3606 -1.24881 99.2064 -1.23788 99.069 -1.22236C99.0403 -1.20892 99.0346 -1.19198 99.0525 -1.17315C99.0704 -1.15433 99.1113 -1.13424 99.1712 -1.11484C99.2311 -1.09543 99.3081 -1.07735 99.3947 -1.06231C99.4813 -1.04728 99.5748 -1.0358 99.6661 -1.02897C100.518 -0.9234 101.434 -0.810013 102.238 -0.794062" fill="#DF6951"/>
                </svg>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-md">
              A unified digital marketplace connecting couples with verified wedding planners, venues, photographers, and all wedding service providers globally.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              {/* <Button size="lg" className="bg-[#F1A501] hover:bg-[#F1A501]/90 text-white px-8">
                Discover the Platform
                <ArrowRight className="ml-2 size-5" />
              </Button> */}
              {/* <button className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#DF6951] rounded-full blur-xl opacity-30" />
                  <div className="relative bg-[#DF6951] rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Play className="size-5 text-white fill-white" />
                  </div>
                </div>
                <span className="text-muted-foreground">Play Demo</span>
              </button> */}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1664688023019-d4ab2703a7cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0aW5hdGlvbiUyMHdlZGRpbmclMjBzYW50b3Jpbml8ZW58MXx8fHwxNzYwMTgwNjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Destination Wedding"
                className="w-full h-auto rounded-3xl"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-purple-300/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-orange-300/30 to-transparent rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

export function TravelSubscribe() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/30 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Background Card */}
          <div className="relative bg-rose-100/20 backdrop-blur-sm rounded-tl-3xl rounded-tr-[120px] rounded-bl-3xl rounded-br-3xl p-12 md:p-16">
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 text-neutral-200 text-xl">+</div>
            <div className="absolute top-12 right-16 text-neutral-200 text-xl">+</div>
            <div className="absolute top-20 right-8 text-rose-500 text-xl">+</div>
            <div className="absolute bottom-8 left-8 text-neutral-200 text-xl">+</div>

            {/* Content */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-muted-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Subscribe to get information, latest news and other
                <br />interesting offers about Wedzway
              </h2>
            </div>

            {/* Subscribe Form */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-white rounded-lg h-16 px-12 border-0 shadow-lg"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ✉️
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-[#FF946D] to-[#FF7D68] hover:opacity-90 h-16 px-8 rounded-lg text-white shadow-lg">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Send Icon */}
            <div className="absolute -top-8 right-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#747DEF] to-[#5E3BE1] rounded-full blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-[#747DEF] to-[#5E3BE1] rounded-full p-5 shadow-2xl">
                  <Send className="size-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10">
        <div className="relative w-[400px] h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-transparent rounded-full blur-3xl" />
        </div>
      </div>
      
      <div className="absolute right-0 top-1/4 opacity-10">
        <div className="relative w-[300px] h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-transparent rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}

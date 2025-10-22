import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "./ui/button";

const footerLinks = {
  company: ["About", "Careers", "Mobile"],
  contact: ["Help/FAQ", "Press", "Affilates"],
  more: ["Airlinefees", "Airline", "Low fare tips"],
};

export function TravelFooter() {
  return (
    <footer className="bg-white pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 max-w-7xl mx-auto">
          {/* Brand */}
          <div>
            <h3 className="text-4xl mb-4" style={{ fontFamily: 'serif' }}>Wedzway.</h3>
            <p className="text-muted-foreground text-sm">
              Book your trip in minute, get full
              <br />Control for much longer.
            </p>
          </div>

          {/* Company */}
          {/* <div>
            <h4 className="mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          {/* <div>
            <h4 className="mb-6">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* More */}
          {/* <div>
            <h4 className="mb-6">More</h4>
            <ul className="space-y-3">
              {footerLinks.more.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Social & Apps */}
          {/* <div>
            <div className="flex gap-3 mb-6">
              <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Facebook className="size-4" />
              </button>
              <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Instagram className="size-4" />
              </button>
              <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Twitter className="size-4" />
              </button>
            </div>

            <p className="text-sm mb-4">Discover our app</p>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="bg-foreground text-background hover:bg-foreground/90 justify-start gap-2 h-9 px-4">
                <svg className="size-4" fill="white" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span className="text-xs">App Store</span>
              </Button>

              <Button variant="outline" className="bg-foreground text-background hover:bg-foreground/90 justify-start gap-2 h-9 px-4">
                <svg className="size-4" fill="white" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span className="text-xs">Google Play</span>
              </Button>
            </div>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">All rights reserved @wedzway.co</p>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-3xl rotate-180" />
    </footer>
  );
}
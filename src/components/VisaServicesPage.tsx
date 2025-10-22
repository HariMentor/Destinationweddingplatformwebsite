import { useState } from "react";
import { ArrowRight, CheckCircle, Clock, Shield, FileText, Globe, Users, Phone, Mail, AlertCircle, Download, Search, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface VisaServicesPageProps {
  onRequestVisa: () => void;
}

export function VisaServicesPage({ onRequestVisa }: VisaServicesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const services = [
    {
      icon: FileText,
      title: "Visa Application Assistance",
      description: "Complete support with visa application forms and documentation",
      features: ["Form filling", "Document review", "Application submission"],
    },
    {
      icon: Clock,
      title: "Fast-Track Processing",
      description: "Expedited visa processing for urgent travel needs",
      features: ["Priority processing", "24-48 hour turnaround", "Urgent appointments"],
    },
    {
      icon: Shield,
      title: "Document Verification",
      description: "Professional verification of all required documents",
      features: ["Authentication", "Notarization", "Apostille services"],
    },
    {
      icon: Users,
      title: "Group Visa Processing",
      description: "Special packages for wedding guest groups",
      features: ["Bulk applications", "Group discounts", "Coordinated processing"],
    },
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "₹5,999",
      description: "Essential visa assistance",
      features: [
        "Visa eligibility check",
        "Document checklist",
        "Form filling assistance",
        "Email support",
        "Standard processing time",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "₹12,999",
      description: "Complete visa support",
      features: [
        "Everything in Basic",
        "Document verification",
        "Application submission",
        "Priority support",
        "Fast-track processing",
        "Interview preparation",
      ],
      popular: true,
    },
    {
      name: "VIP",
      price: "₹24,999",
      description: "White-glove service",
      features: [
        "Everything in Premium",
        "Dedicated visa consultant",
        "24/7 phone support",
        "Same-day appointments",
        "Document pickup/delivery",
        "Embassy liaison",
        "Multiple destination support",
      ],
      popular: false,
    },
  ];

  const popularDestinations = [
    {
      country: "Greece",
      flag: "🇬🇷",
      visaType: "Schengen Visa",
      processingTime: "15-20 days",
      validity: "90 days",
      fee: "€80",
      requirements: [
        "Valid passport (6 months validity)",
        "Completed application form",
        "2 passport photos",
        "Travel insurance",
        "Flight bookings",
        "Hotel reservations",
        "Bank statements (3 months)",
        "Invitation letter",
      ],
    },
    {
      country: "Italy",
      flag: "🇮🇹",
      visaType: "Schengen Visa",
      processingTime: "15-20 days",
      validity: "90 days",
      fee: "€80",
      requirements: [
        "Valid passport (6 months validity)",
        "Completed application form",
        "2 passport photos",
        "Travel insurance",
        "Flight bookings",
        "Hotel reservations",
        "Bank statements (3 months)",
        "Invitation letter",
      ],
    },
    {
      country: "Thailand",
      flag: "🇹🇭",
      visaType: "Tourist Visa",
      processingTime: "3-5 days",
      validity: "60 days",
      fee: "₹2,400",
      requirements: [
        "Valid passport (6 months validity)",
        "Completed application form",
        "2 passport photos",
        "Flight bookings",
        "Hotel reservations",
        "Bank statements (6 months)",
      ],
    },
    {
      country: "UAE",
      flag: "🇦🇪",
      visaType: "Tourist Visa",
      processingTime: "3-4 days",
      validity: "30 days",
      fee: "₹8,500",
      requirements: [
        "Valid passport (6 months validity)",
        "Passport copy",
        "Passport-size photo",
        "Confirmed flight tickets",
        "Hotel booking confirmation",
      ],
    },
    {
      country: "Bali (Indonesia)",
      flag: "🇮🇩",
      visaType: "Visa on Arrival",
      processingTime: "On arrival",
      validity: "30 days",
      fee: "$35",
      requirements: [
        "Valid passport (6 months validity)",
        "Return ticket",
        "Proof of accommodation",
        "Sufficient funds",
      ],
    },
    {
      country: "Maldives",
      flag: "🇲🇻",
      visaType: "Free on Arrival",
      processingTime: "On arrival",
      validity: "30 days",
      fee: "Free",
      requirements: [
        "Valid passport (6 months validity)",
        "Return ticket",
        "Hotel confirmation",
        "Proof of funds",
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Submit Request",
      description: "Fill out our simple visa request form with your travel details",
      icon: FileText,
    },
    {
      step: 2,
      title: "Document Collection",
      description: "We'll provide a personalized checklist of required documents",
      icon: CheckCircle,
    },
    {
      step: 3,
      title: "Application Processing",
      description: "Our experts review and submit your application",
      icon: Clock,
    },
    {
      step: 4,
      title: "Visa Approval",
      description: "Receive your visa and prepare for your destination wedding",
      icon: Shield,
    },
  ];

  const faqs = [
    {
      question: "How long does the visa process take?",
      answer: "Processing times vary by country. Schengen visas typically take 15-20 days, while some countries offer visa on arrival. We recommend applying at least 4-6 weeks before your travel date.",
    },
    {
      question: "What if my visa application is rejected?",
      answer: "While we maintain a 98% success rate, if your application is rejected, we'll help you understand the reasons and assist with reapplication if possible. Premium and VIP plans include one free reapplication support.",
    },
    {
      question: "Can you handle group visa applications for wedding guests?",
      answer: "Yes! We specialize in group visa processing for wedding parties. We offer special group rates and coordinated processing to ensure all guests receive their visas on time.",
    },
    {
      question: "Do I need travel insurance for visa application?",
      answer: "Travel insurance is mandatory for Schengen visa applications and highly recommended for all international travel. We can help you obtain appropriate coverage.",
    },
    {
      question: "What if I need urgent visa processing?",
      answer: "We offer fast-track and emergency processing services. With our VIP package, we can arrange same-day appointments and expedited processing for urgent cases (subject to embassy availability).",
    },
  ];

  const filteredDestinations = popularDestinations.filter((dest) =>
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#DF6951]/10 via-[#F1A501]/10 to-[#DF6951]/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 px-4 py-2 bg-[#DF6951] text-white border-0 text-base">
              VISA SERVICES
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Hassle-Free Visa <span className="text-[#DF6951]">Assistance</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Let us handle the paperwork while you focus on planning your dream destination wedding
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={onRequestVisa}
                className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] gap-2"
              >
                Request Visa Assistance
                <ArrowRight className="size-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Phone className="size-5" />
                Speak to Consultant
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "10K+", label: "Visas Processed" },
              { value: "98%", label: "Success Rate" },
              { value: "50+", label: "Countries Covered" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl text-[#DF6951] mb-2">{stat.value}</div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Our Visa Services</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Comprehensive visa support for all your destination wedding needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-xl transition-all border-2 hover:border-[#DF6951]/20">
                    <div className="size-14 rounded-xl bg-gradient-to-br from-[#DF6951] to-[#F1A501] p-3 mb-4 flex items-center justify-center">
                      <Icon className="size-full text-white" />
                    </div>
                    <h3 className="mb-2">{service.title}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Simple 4-step process to get your visa approved
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="size-16 rounded-full bg-gradient-to-br from-[#DF6951] to-[#F1A501] flex items-center justify-center text-white flex-shrink-0">
                      <Icon className="size-8" />
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-[#DF6951] to-[#F1A501] my-2 min-h-[60px]" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-[#DF6951]/10 text-[#DF6951] border-0">
                        Step {step.step}
                      </Badge>
                      <h3>{step.title}</h3>
                    </div>
                    <p className="text-foreground/60">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Visa Requirements by Country</h2>
            <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
              Explore visa requirements for popular wedding destinations
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-foreground/40" />
              <Input
                placeholder="Search for a country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 h-full hover:shadow-xl transition-all cursor-pointer border-2 ${
                    selectedCountry === destination.country
                      ? "border-[#DF6951]"
                      : "hover:border-[#DF6951]/20"
                  }`}
                  onClick={() =>
                    setSelectedCountry(
                      selectedCountry === destination.country ? null : destination.country
                    )
                  }
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{destination.flag}</span>
                      <div>
                        <h3 className="mb-1">{destination.country}</h3>
                        <Badge className="bg-blue-50 text-blue-600 border-0 text-xs">
                          {destination.visaType}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-foreground/60 mb-1">Processing Time</div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-[#DF6951]" />
                        <span>{destination.processingTime}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground/60 mb-1">Validity</div>
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-[#DF6951]" />
                        <span>{destination.validity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/60">Visa Fee</span>
                      <span className="text-lg text-[#DF6951]">{destination.fee}</span>
                    </div>
                  </div>

                  {selectedCountry === destination.country && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t"
                    >
                      <h4 className="text-sm mb-3">Required Documents:</h4>
                      <ul className="space-y-2">
                        {destination.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/70">{req}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRequestVisa();
                        }}
                      >
                        Apply Now
                      </Button>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Service Packages</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Choose the perfect package for your visa needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`p-8 h-full flex flex-col ${
                    plan.popular
                      ? "border-2 border-[#DF6951] shadow-xl relative"
                      : "border-2 hover:border-[#DF6951]/20"
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white border-0">
                      Most Popular
                    </Badge>
                  )}
                  <div className="mb-6">
                    <h3 className="text-2xl mb-2">{plan.name}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl text-[#DF6951]">{plan.price}</span>
                      <span className="text-foreground/60">per person</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={
                      plan.popular
                        ? "w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                        : "w-full"
                    }
                    variant={plan.popular ? "default" : "outline"}
                    onClick={onRequestVisa}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Get answers to common visa-related questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all">
                  <h3 className="mb-3 flex items-start gap-2">
                    <AlertCircle className="size-5 text-[#DF6951] flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-foreground/70 pl-7">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Ready to Start Your Visa Application?</h2>
            <p className="text-lg mb-8 text-white/90">
              Let our experts handle your visa processing so you can focus on your special day
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#DF6951] hover:bg-white/90 gap-2"
                onClick={onRequestVisa}
              >
                Request Visa Assistance
                <ArrowRight className="size-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                <Phone className="size-5" />
                +91 98765 43210
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

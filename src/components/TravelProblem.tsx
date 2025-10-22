import { X, MapPinOff, DollarSign, Globe } from "lucide-react";

const problems = [
  {
    icon: MapPinOff,
    title: "Scattered Vendors",
    description: "Couples struggle with no unified platform to find trusted wedding vendors globally",
    color: "from-rose-400 to-orange-400",
  },
  {
    icon: DollarSign,
    title: "No Price Transparency",
    description: "Hidden costs and lack of trust make budgeting a nightmare for destination weddings",
    color: "from-orange-400 to-amber-400",
  },
  {
    icon: Globe,
    title: "Cross-Border Challenges",
    description: "Planning across countries involves complex travel, legal, and logistics hurdles",
    color: "from-amber-400 to-yellow-400",
  },
  {
    icon: X,
    title: "No Verified Leads",
    description: "Wedding planners struggle to connect with genuine international clients",
    color: "from-blue-400 to-cyan-400",
  },
];

export function TravelProblem() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">The Challenge</p>
          <h2 className="text-4xl md:text-5xl capitalize" style={{ fontFamily: 'Volkhov, serif' }}>
            The Problem We're Solving
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-8 text-center hover:shadow-2xl transition-all duration-300 group bg-white rounded-2xl border border-border"
            >
              <div className={`inline-flex p-6 rounded-bl-3xl rounded-tr-3xl bg-gradient-to-br ${problem.color} mb-6 group-hover:scale-110 transition-transform`}>
                <problem.icon className="size-12 text-white" />
              </div>
              
              <h3 className="mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

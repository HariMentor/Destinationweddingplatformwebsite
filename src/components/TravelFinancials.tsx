import { TrendingUp, DollarSign, Users, Target } from "lucide-react";
import { Card } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Area, AreaChart } from "recharts";

const forecastData = [
  {
    year: "2026",
    revenue: 150,
    costs: 180,
    users: 500,
    bookings: 50,
    label: "Year 1",
  },
  {
    year: "2027",
    revenue: 850,
    costs: 420,
    users: 3500,
    bookings: 350,
    label: "Year 2",
  },
  {
    year: "2028",
    revenue: 2800,
    costs: 980,
    users: 12000,
    bookings: 1200,
    label: "Year 3",
  },
  {
    year: "2029",
    revenue: 6500,
    costs: 1950,
    users: 28000,
    bookings: 2800,
    label: "Year 4",
  },
  {
    year: "2030",
    revenue: 12000,
    costs: 3200,
    users: 50000,
    bookings: 5000,
    label: "Year 5",
  },
];

const milestones = [
  {
    year: "2026",
    title: "Foundation & Launch",
    description: "MVP launch, initial vendor onboarding, low traction phase",
    metrics: "500 users, 50 bookings, $150K revenue",
  },
  {
    year: "2027",
    title: "Growth & Scale",
    description: "Market penetration, partnerships, enhanced features",
    metrics: "3,500 users, 350 bookings, $850K revenue",
  },
  {
    year: "2028",
    title: "Expansion",
    description: "International growth, tourism board partnerships",
    metrics: "12K users, 1,200 bookings, $2.8M revenue",
  },
  {
    year: "2029",
    title: "Market Leadership",
    description: "Dominant market position, premium services",
    metrics: "28K users, 2,800 bookings, $6.5M revenue",
  },
  {
    year: "2030",
    title: "Profitability & Beyond",
    description: "Sustainable growth, new verticals, global presence",
    metrics: "50K users, 5,000 bookings, $12M revenue",
  },
];

export function TravelFinancials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-muted-foreground uppercase tracking-wide mb-4">Growth Projections</p>
          <h2 className="text-4xl md:text-5xl capitalize mb-6" style={{ fontFamily: 'Volkhov, serif' }}>
            5-Year Financial Forecast
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conservative projections with low initial traction scaling to significant market presence
          </p>
        </div>

        {/* Revenue Chart */}
        <Card className="p-8 mb-8 max-w-6xl mx-auto">
          <div className="mb-6">
            <h3 className="mb-2">Revenue vs Operating Costs</h3>
            <p className="text-sm text-muted-foreground">All figures in thousands USD ($K)</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280' }}
                label={{ value: 'Amount ($K)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                formatter={(value: number) => `$${value}K`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                name="Revenue"
              />
              <Area 
                type="monotone" 
                dataKey="costs" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorCosts)" 
                name="Operating Costs"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          {/* Users Growth */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500">
                <Users className="size-6 text-white" />
              </div>
              <div>
                <h3>Platform Users</h3>
                <p className="text-sm text-muted-foreground">Cumulative user growth</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => value.toLocaleString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Bookings Growth */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500">
                <Target className="size-6 text-white" />
              </div>
              <div>
                <h3>Wedding Bookings</h3>
                <p className="text-sm text-muted-foreground">Annual bookings</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="bookings" 
                  fill="url(#barGradient)" 
                  radius={[8, 8, 0, 0]}
                  name="Bookings"
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Year-by-Year Milestones */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center mb-8">Year-by-Year Milestones</h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <Card 
                key={index} 
                className={`p-6 hover:shadow-lg transition-all ${
                  index === 0 ? 'border-2 border-yellow-200 bg-yellow-50/30' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={`text-3xl px-4 py-2 rounded-lg ${
                      index === 0 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700'
                    }`} style={{ fontFamily: 'Volkhov, serif' }}>
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4>{milestone.title}</h4>
                      {index === 0 && (
                        <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs">
                          Low Traction Phase
                        </span>
                      )}
                      {index === milestones.length - 1 && (
                        <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-800 text-xs">
                          Profitability Target
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{milestone.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="size-4 text-emerald-600" />
                      <span className="text-muted-foreground">{milestone.metrics}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 hidden md:flex items-center">
                    <TrendingUp className={`size-10 ${
                      index === 0 ? 'text-yellow-500' : 'text-emerald-500'
                    }`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Assumptions */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 max-w-6xl mx-auto">
          <h3 className="mb-6 text-center">Key Assumptions</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Commission Rate</p>
              <p className="font-medium">8-12% per booking</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Avg Booking Value</p>
              <p className="font-medium">$50K - $120K</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Vendor Subscription</p>
              <p className="font-medium">$99-$499/month</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">User Acquisition Cost</p>
              <p className="font-medium">$150-$300</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
              <p className="font-medium">10-15% (inquiry to booking)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Break-even Target</p>
              <p className="font-medium">Late 2028 / Early 2029</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

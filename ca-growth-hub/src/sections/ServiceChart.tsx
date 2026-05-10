import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const serviceData = [
  { name: "GST", value: 240 },
  { name: "Income Tax", value: 180 },
  { name: "Audit", value: 120 },
  { name: "Others", value: 80 },
];

const COLORS = [
  "hsl(var(--status-progress))",
  "hsl(var(--status-success))",
  "hsl(var(--status-risk))",
  "hsl(262 83% 65%)",
];

const serviceDistribution = [
  { name: "GST", percentage: 80 },
  { name: "Income Tax", percentage: 60 },
  { name: "Audit", percentage: 40 },
];

export default function ServiceChart() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Most Used Services</h3>
      <p className="text-sm text-muted-foreground mt-1">Service distribution across clients.</p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donut Chart */}
        <div className="h-[280px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                stroke="hsl(var(--card))"
                strokeWidth={2}
              >
                {serviceData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Bars */}
        <div className="flex flex-col justify-center gap-6">
          {serviceDistribution.map((service) => (
            <div key={service.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{service.name}</span>
                <span className="text-sm font-semibold text-muted-foreground">{service.percentage}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-status-progress rounded-full transition-all"
                  style={{ width: `${service.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

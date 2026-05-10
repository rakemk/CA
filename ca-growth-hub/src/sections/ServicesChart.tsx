import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { requestedServices } from "@/data/dashboardData";

const COLORS = [
  "hsl(var(--status-progress))",
  "hsl(var(--status-success))",
  "hsl(var(--status-risk))",
  "hsl(var(--status-overdue))",
  "hsl(262 83% 65%)",
  "hsl(199 89% 55%)",
  "hsl(330 81% 60%)",
];

export default function ServicesChart() {
  const total = requestedServices.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-6 h-full">
      <h2 className="text-lg font-semibold text-foreground">Most Requested Services</h2>
      <p className="text-sm text-muted-foreground mt-1">Service mix across all transactions.</p>

      <div className="mt-5 grid gap-6 grid-cols-1 md:grid-cols-2 items-center">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={requestedServices}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                stroke="hsl(var(--card))"
                strokeWidth={2}
              >
                {requestedServices.map((_, i) => (
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

        <ul className="space-y-2">
          {requestedServices.map((s, i) => {
            const pct = ((s.value / total) * 100).toFixed(0);
            return (
              <li
                key={s.name}
                className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-foreground font-medium">{s.name}</span>
                </div>
                <span className="text-muted-foreground tabular-nums">
                  {s.value} ({pct}%)
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
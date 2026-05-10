import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { teamWorkload } from "@/data/dashboardData";

export default function TeamWorkload() {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-6 h-full">
      <h2 className="text-lg font-semibold text-foreground">Team Workload</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Open vs. completed vs. failed work per employee.
      </p>

      <div className="mt-5 h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={teamWorkload}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
            barCategoryGap={12}
          >
            <CartesianGrid horizontal={false} stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="open" name="Open" stackId="a" fill="hsl(var(--status-progress))" radius={[4, 0, 0, 4]} />
            <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="hsl(217 91% 75%)" />
            <Bar dataKey="completed" name="Completed" stackId="a" fill="hsl(var(--status-success))" />
            <Bar dataKey="failed" name="Failed" stackId="a" fill="hsl(var(--status-failed))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
import { BarChart3, Download, TrendingUp, Users, Wallet } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import ChartCard from "@/components/ChartCard";

const revenueGrowth = [
  { month: "Nov", revenue: 8.2, target: 8.0 },
  { month: "Dec", revenue: 9.1, target: 8.5 },
  { month: "Jan", revenue: 7.8, target: 8.8 },
  { month: "Feb", revenue: 10.4, target: 9.2 },
  { month: "Mar", revenue: 12.2, target: 9.8 },
  { month: "Apr", revenue: 14.5, target: 10.5 },
];

const clientAcquisition = [
  { month: "Nov", new: 8, churned: 2 },
  { month: "Dec", new: 12, churned: 1 },
  { month: "Jan", new: 6, churned: 3 },
  { month: "Feb", new: 15, churned: 2 },
  { month: "Mar", new: 18, churned: 1 },
  { month: "Apr", new: 21, churned: 2 },
];

const serviceRevenue = [
  { name: "GST Services", value: 38, color: "#6f79ff" },
  { name: "Income Tax", value: 26, color: "#10b981" },
  { name: "Audit & Assurance", value: 18, color: "#f59e0b" },
  { name: "Compliance", value: 12, color: "#8b6ef2" },
  { name: "Advisory", value: 6, color: "#ef4444" },
];

const teamPerformance = [
  { name: "Karishma Soni", completed: 141, revenue: "₹4.2L", rating: 98, trend: "up" as const },
  { name: "Kali Pandey", completed: 141, revenue: "₹3.9L", rating: 96, trend: "up" as const },
  { name: "Nilesh Parmar", completed: 66, revenue: "₹2.1L", rating: 91, trend: "up" as const },
  { name: "Gajendra Rawal", completed: 54, revenue: "₹1.8L", rating: 88, trend: "down" as const },
  { name: "Hitesh Sharma", completed: 12, revenue: "₹0.6L", rating: 85, trend: "up" as const },
];

const kpiCards = [
  { label: "Monthly Revenue", value: "₹14.5L", change: "+18%", positive: true, icon: Wallet },
  { label: "Net New Clients", value: "+19", change: "+26%", positive: true, icon: Users },
  { label: "Avg. Engagement Value", value: "₹48K", change: "+9%", positive: true, icon: BarChart3 },
  { label: "Growth Rate (YoY)", value: "34.2%", change: "+4.1pp", positive: true, icon: TrendingUp },
];

export default function GrowthMetrics() {
  return (
    <AppShell activeTab="Advisory">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">Growth Metrics</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Revenue trends, client acquisition, and team performance analytics.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl border border-[#d9d0e2] bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </section>

        {/* KPI Cards */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map(({ label, value, change, positive, icon: Icon }) => (
            <div key={label} className="rounded-[24px] bg-white px-5 py-5 shadow-[0_12px_32px_rgba(76,54,99,0.08)] ring-1 ring-[#eee2f2]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef1ff]">
                  <Icon className="h-4 w-4 text-[#6f79ff]" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-[#17223b]">{value}</p>
              <p className={`mt-1 text-xs font-semibold ${positive ? "text-emerald-600" : "text-rose-500"}`}>
                {change} vs last month
              </p>
            </div>
          ))}
        </section>

        {/* Revenue Charts */}
        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <ChartCard title="Revenue vs Target" subtitle="Monthly billing tracked against growth targets (in Lakhs)">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueGrowth}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6f79ff" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#6f79ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ede7f3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(v) => `₹${v}L`} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2" }} formatter={(v: number) => [`₹${v}L`, ""]} />
                  <Area type="monotone" dataKey="revenue" stroke="#6f79ff" strokeWidth={3} fill="url(#revenueGrad)" name="Revenue" />
                  <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Service Revenue Mix" subtitle="Revenue contribution by service line">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={serviceRevenue} dataKey="value" nameKey="name" innerRadius={62} outerRadius={100} paddingAngle={4}>
                    {serviceRevenue.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2" }} formatter={(v: number) => [`${v}%`, ""]} />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* Client Acquisition & Team Performance */}
        <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <ChartCard title="Client Acquisition" subtitle="New clients onboarded vs churned each month">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientAcquisition}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ede7f3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2" }} />
                  <Bar dataKey="new" fill="#10b981" radius={[8, 8, 0, 0]} name="New Clients" />
                  <Bar dataKey="churned" fill="#f43f5e" radius={[8, 8, 0, 0]} name="Churned" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Team Performance" subtitle="Individual contribution and efficiency scores">
            <div className="space-y-3">
              {teamPerformance.map((member) => (
                <div key={member.name} className="flex items-center justify-between gap-4 rounded-2xl bg-[#fbf8fd] p-4 ring-1 ring-[#f1e8f4]">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#17223b] truncate">{member.name}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-[#ede7f3]">
                        <div className="h-1.5 rounded-full bg-[#6f79ff]" style={{ width: `${member.rating}%` }} />
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">{member.rating}%</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#17223b]">{member.revenue}</p>
                    <Badge tone={member.trend === "up" ? "green" : "red"}>{member.completed} done</Badge>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </section>
      </div>
    </AppShell>
  );
}

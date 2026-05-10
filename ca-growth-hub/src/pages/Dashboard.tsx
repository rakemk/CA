import { ArrowRight, CalendarDays, Sparkles, TrendingUp } from "lucide-react";
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
import StatCard from "@/components/StatCard";
import { employeeLoad, topRepeatClients, upcomingDue, type StatItem } from "@/data/dashboardData";

const overviewStats: StatItem[] = [
  { label: "Total Clients", value: 589, caption: "portfolio entities under watch", icon: "clock", tone: "todo" },
  { label: "Active Engagements", value: 32, caption: "live advisory threads", icon: "activity", tone: "progress" },
  { label: "At Risk", value: 7, caption: "needs proactive follow-up", icon: "alert-triangle", tone: "risk" },
  { label: "Overdue", value: 12, caption: "requires escalation", icon: "alert-octagon", tone: "overdue" },
  { label: "Completed", value: 72, caption: "closed this month", icon: "x-circle", tone: "failed" },
  { label: "Growth Forecast", value: "+12.4%", caption: "forecasted next quarter", icon: "trophy", tone: "success" },
];

const engagementTrend = [
  { month: "Jan", advisory: 24, audit: 12 },
  { month: "Feb", advisory: 28, audit: 14 },
  { month: "Mar", advisory: 31, audit: 13 },
  { month: "Apr", advisory: 36, audit: 17 },
  { month: "May", advisory: 42, audit: 18 },
  { month: "Jun", advisory: 45, audit: 21 },
];

const pipelineData = [
  { name: "Completed", value: 48, color: "#10b981" },
  { name: "In Progress", value: 32, color: "#6366f1" },
  { name: "Needs Review", value: 14, color: "#f59e0b" },
  { name: "Overdue", value: 6, color: "#ef4444" },
];

const supportSignals = [
  { label: "Priority follow-ups", value: "18", tone: "bg-[#eef1ff] text-[#31446d]" },
  { label: "Average response time", value: "2.4h", tone: "bg-[#eefaf4] text-emerald-700" },
  { label: "Renewal probability", value: "87%", tone: "bg-[#fff5eb] text-amber-700" },
];

export default function Dashboard() {
  return (
    <AppShell title="Growth Hub" activeTab="Advisory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              A quick, high-signal overview of portfolio health, team performance, and growth momentum.
            </p>
          </div>

          <button className="inline-flex h-12 items-center gap-2 rounded-2xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(16,185,129,0.22)] transition-colors hover:bg-emerald-600">
            <Sparkles className="h-4.5 w-4.5" />
            Create Insight
          </button>
        </section>

        <section className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {overviewStats.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <ChartCard
            title="Engagement momentum"
            subtitle="Advisory and audit activity tracked across the current cycle"
            action={<Badge tone="blue">+14% vs last month</Badge>}
          >
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementTrend}>
                  <defs>
                    <linearGradient id="trendAdvisory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="trendAudit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.24} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ede7f3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2", boxShadow: "0 12px 32px rgba(76,54,99,0.12)" }}
                  />
                  <Area type="monotone" dataKey="advisory" stroke="#6366f1" strokeWidth={3} fill="url(#trendAdvisory)" />
                  <Area type="monotone" dataKey="audit" stroke="#10b981" strokeWidth={3} fill="url(#trendAudit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Portfolio mix" subtitle="Where the current workload is concentrated">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pipelineData} dataKey="value" nameKey="name" innerRadius={72} outerRadius={112} paddingAngle={4}>
                    {pipelineData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2", boxShadow: "0 12px 32px rgba(76,54,99,0.12)" }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <ChartCard title="Team capacity" subtitle="Open, in-progress, and completed volume by owner">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeeLoad} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ede7f3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    width={120}
                    tick={{ fill: "#475569", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2", boxShadow: "0 12px 32px rgba(76,54,99,0.12)" }}
                  />
                  <Bar dataKey="completed" stackId="a" fill="#6366f1" radius={[0, 8, 8, 0]} />
                  <Bar dataKey="open" stackId="a" fill="#10b981" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="rounded-[24px] bg-white p-5 shadow-[0_12px_32px_rgba(76,54,99,0.08)] ring-1 ring-[#eee2f2]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-[#17223b]">Priority signals</h3>
                <p className="mt-1 text-sm text-slate-500">Quick pulse on what deserves attention next.</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eef1ff] text-[#31446d]">
                <CalendarDays className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {supportSignals.map((signal) => (
                <div key={signal.label} className="rounded-2xl bg-[#fbf8fd] p-4 ring-1 ring-[#f1e8f4]">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-500">{signal.label}</p>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${signal.tone}`}>{signal.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#f7f5ff] p-4 ring-1 ring-[#ece5fb]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#17223b]">Portfolio growth</p>
                  <p className="mt-1 text-sm text-slate-500">The current forecast is leaning positive.</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <ChartCard title="Top repeat clients" subtitle="High-value relationships to nurture next" action={<ArrowRight className="h-5 w-5 text-slate-400" />}>
            <div className="space-y-3">
              {topRepeatClients.slice(0, 5).map((client, index) => (
                <div key={client.name} className="flex items-center justify-between gap-4 rounded-2xl bg-[#fbf8fd] p-4 ring-1 ring-[#f1e8f4]">
                  <div>
                    <p className="font-semibold text-[#17223b]">{client.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {client.topService} · {client.mobile}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#17223b]">#{index + 1}</p>
                    <p className="text-xs text-slate-400">{client.total} engagements</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Upcoming due dates" subtitle="Tasks that need close follow-up">
            <div className="space-y-3">
              {upcomingDue.map((task) => (
                <div key={`${task.client}-${task.dueDate}`} className="flex items-center justify-between gap-4 rounded-2xl bg-[#fbf8fd] p-4 ring-1 ring-[#f1e8f4]">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#17223b]">{task.client}</p>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {task.type} · {task.employee}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#17223b]">{task.dueDate}</p>
                    <p className="text-xs text-slate-400">
                      {task.overdueDays ? `${task.overdueDays} days overdue` : "On schedule"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </section>

        <section className="rounded-[24px] bg-white px-5 py-5 shadow-[0_12px_32px_rgba(76,54,99,0.08)] ring-1 ring-[#eee2f2]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Summary</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#17223b]">Client health snapshot</h3>
              <p className="mt-2 text-sm text-slate-500">A compact readout of active capacity, revenue, and forecasting confidence.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#f8f5ff] px-4 py-3 ring-1 ring-[#ece5fb]">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Assets</p>
                <p className="mt-1 text-xl font-bold text-[#17223b]">$142.8M</p>
              </div>
              <div className="rounded-2xl bg-[#eefaf4] px-4 py-3 ring-1 ring-[#dff4e8]">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Engagements</p>
                <p className="mt-1 text-xl font-bold text-[#17223b]">32</p>
              </div>
              <div className="rounded-2xl bg-[#fff5eb] px-4 py-3 ring-1 ring-[#f8e3c6]">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Forecast</p>
                <p className="mt-1 text-xl font-bold text-[#17223b]">+12.4%</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button className="rounded-xl border border-[#d9d0e2] bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Export CSV
          </button>
          <button className="rounded-xl bg-[#19164a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(25,22,74,0.24)] hover:bg-[#22205c]">
            Print Portfolio
          </button>
        </div>
      </div>
    </AppShell>
  );
}

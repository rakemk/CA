import { ArrowDownCircle, ArrowUpCircle, IndianRupee, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import ChartCard from "@/components/ChartCard";

const monthlyCashflow = [
  { month: "Nov", inflow: 4.2, outflow: 2.8 },
  { month: "Dec", inflow: 5.1, outflow: 3.2 },
  { month: "Jan", inflow: 3.8, outflow: 2.5 },
  { month: "Feb", inflow: 6.4, outflow: 3.9 },
  { month: "Mar", inflow: 7.2, outflow: 4.1 },
  { month: "Apr", inflow: 8.5, outflow: 4.7 },
];

const receivables = [
  { client: "Apex Foundations", amount: "₹4,80,000", dueDate: "May 5, 2024", status: "Overdue" as const, days: 12 },
  { client: "Luxe Retail Group", amount: "₹2,15,000", dueDate: "May 10, 2024", status: "Pending" as const, days: 5 },
  { client: "Aether Dynamics", amount: "₹1,35,000", dueDate: "May 18, 2024", status: "Pending" as const, days: 13 },
  { client: "Mittal Trading", amount: "₹78,500", dueDate: "May 22, 2024", status: "On Time" as const, days: 17 },
  { client: "NeuraLink Systems", amount: "₹3,20,000", dueDate: "Apr 28, 2024", status: "Overdue" as const, days: 30 },
];

const payables = [
  { vendor: "Office Rent – Saket Complex", amount: "₹45,000", due: "May 1", category: "Operations" },
  { vendor: "Tally Software License", amount: "₹12,500", due: "May 5", category: "Software" },
  { vendor: "Staff Salaries", amount: "₹1,85,000", due: "May 7", category: "Payroll" },
  { vendor: "CA ICAI Subscription", amount: "₹8,200", due: "May 12", category: "Membership" },
  { vendor: "Cloud Hosting (AWS)", amount: "₹6,400", due: "May 15", category: "Software" },
];

const bankAccounts = [
  { bank: "HDFC Bank – Current A/c", balance: "₹12,45,000", change: "+₹1,20,000", positive: true },
  { bank: "SBI – Savings A/c", balance: "₹3,82,500", change: "-₹45,000", positive: false },
  { bank: "Axis Bank – OD A/c", balance: "₹8,00,000", change: "+₹2,50,000", positive: true },
];

const receivableStatusTone = { Overdue: "red", Pending: "blue", "On Time": "green" } as const;

const categoryColors: Record<string, string> = {
  Operations: "#6f79ff",
  Software: "#8b6ef2",
  Payroll: "#10b981",
  Membership: "#f59e0b",
};

const payableBarData = [
  { name: "Operations", value: 45000 },
  { name: "Software", value: 18900 },
  { name: "Payroll", value: 185000 },
  { name: "Membership", value: 8200 },
];

export default function Cashflow() {
  const totalInflow = "₹8,50,000";
  const totalOutflow = "₹4,70,000";
  const netCashflow = "₹3,80,000";

  return (
    <AppShell activeTab="Advisory">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">Cashflow Engine</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Real-time inflow, outflow, and net position across all firm accounts.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl border border-[#d9d0e2] bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </button>
        </section>

        {/* Summary Cards */}
        <section className="grid gap-5 sm:grid-cols-3">
          {[
            { label: "Total Inflow (Apr)", value: totalInflow, icon: ArrowUpCircle, color: "text-emerald-600", bg: "bg-[#eefaf4]" },
            { label: "Total Outflow (Apr)", value: totalOutflow, icon: ArrowDownCircle, color: "text-rose-500", bg: "bg-[#fff1f2]" },
            { label: "Net Cashflow", value: netCashflow, icon: IndianRupee, color: "text-[#6f79ff]", bg: "bg-[#eef1ff]" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className={`rounded-[24px] ${bg} px-6 py-5 shadow-[0_8px_24px_rgba(76,54,99,0.08)] ring-1 ring-[#eee2f2]`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="mt-3 text-2xl font-bold text-[#17223b]">{value}</p>
            </div>
          ))}
        </section>

        {/* Charts */}
        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <ChartCard title="Monthly Cash Position" subtitle="Inflow vs outflow trend over the last 6 months">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyCashflow}>
                  <defs>
                    <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ede7f3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(v) => `₹${v}L`} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2", boxShadow: "0 12px 32px rgba(76,54,99,0.12)" }} formatter={(v: number) => [`₹${v}L`, ""]} />
                  <Area type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={3} fill="url(#inflowGrad)" name="Inflow" />
                  <Area type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={3} fill="url(#outflowGrad)" name="Outflow" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Expense Breakdown" subtitle="Payable distribution by category">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payableBarData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ede7f3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} tick={{ fill: "#475569", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2" }} formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, ""]} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {payableBarData.map((entry) => (
                      <Cell key={entry.name} fill={categoryColors[entry.name] || "#6f79ff"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* Receivables */}
        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <ChartCard title="Outstanding Receivables" subtitle="Pending payments from clients to collect">
            <div className="space-y-3">
              {receivables.map((r) => (
                <div key={r.client} className="flex items-center justify-between gap-4 rounded-2xl bg-[#fbf8fd] p-4 ring-1 ring-[#f1e8f4]">
                  <div className="min-w-0">
                    <p className="font-semibold text-[#17223b] truncate">{r.client}</p>
                    <p className="mt-1 text-xs text-slate-400">Due: {r.dueDate} · {r.days} days</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="font-bold text-[#17223b]">{r.amount}</p>
                    <Badge tone={receivableStatusTone[r.status]}>{r.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Payables & Bank */}
          <div className="space-y-6">
            <ChartCard title="Upcoming Payables" subtitle="Bills and expenses due this month">
              <div className="space-y-3">
                {payables.map((p) => (
                  <div key={p.vendor} className="flex items-center justify-between gap-4 rounded-2xl bg-[#fbf8fd] p-4 ring-1 ring-[#f1e8f4]">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#17223b] truncate">{p.vendor}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Due {p.due} · {p.category}</p>
                    </div>
                    <p className="text-sm font-bold text-rose-600 shrink-0">{p.amount}</p>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </section>

        {/* Bank Accounts */}
        <section className="rounded-[24px] bg-white px-5 py-5 shadow-[0_12px_32px_rgba(76,54,99,0.08)] ring-1 ring-[#eee2f2]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Bank Summary</p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-[#17223b]">Account Balances</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {bankAccounts.map((acc) => (
              <div key={acc.bank} className="rounded-2xl bg-[#f8f5ff] p-4 ring-1 ring-[#ece5fb]">
                <p className="text-sm font-semibold text-[#17223b]">{acc.bank}</p>
                <p className="mt-3 text-2xl font-bold text-[#17223b]">{acc.balance}</p>
                <div className={`mt-2 flex items-center gap-1 text-xs font-semibold ${acc.positive ? "text-emerald-600" : "text-rose-500"}`}>
                  {acc.positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {acc.change} this month
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

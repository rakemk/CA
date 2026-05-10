import { Bell, CheckCircle2, ChevronRight, CirclePlay, Plus, Send, ShieldCheck } from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import ChartCard from "@/components/ChartCard";
import FilterBar from "@/components/FilterBar";

type TransactionCard = {
  client: string;
  service: string;
  status: "To Do" | "In Progress" | "Completed";
  assigned: string;
  channel: string;
  dueDate: string;
  priority: "Overdue" | "On Time" | "At Risk";
};

const rows: TransactionCard[] = [
  { client: "Nadeem Ansari", service: "GST", assigned: "Jatin A.", dueDate: "Today", status: "To Do", channel: "Email", priority: "Overdue" },
  { client: "Shobha Ram (G-077)", service: "GST", assigned: "Gajendra", dueDate: "Tomorrow", status: "In Progress", channel: "WhatsApp", priority: "Overdue" },
  { client: "mittal trading", service: "GST", assigned: "Jatin A.", dueDate: "Today", status: "In Progress", channel: "Portal", priority: "Overdue" },
  { client: "Amir Munaf", service: "Income Tax", assigned: "Gajendra", dueDate: "Fri", status: "Completed", channel: "Call", priority: "On Time" },
  { client: "Apex Foundations", service: "Audit", assigned: "Karishma", dueDate: "Mon", status: "To Do", channel: "Email", priority: "At Risk" },
];

const statusTone = {
  "To Do": "gray",
  "In Progress": "blue",
  Completed: "green",
} as const;

const priorityTone = {
  Overdue: "red",
  "On Time": "green",
  "At Risk": "blue",
} as const;

export default function Transactions() {
  return (
    <AppShell activeTab="Advisory">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">Transactions</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Modern card-first transaction management for compliance and advisory work.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold shadow-[0_12px_28px_rgba(16,185,129,0.22)] transition-colors">
            <Plus className="h-4 w-4" />
            New Transaction
          </button>
        </section>

        <FilterBar
          searchPlaceholder="Search by client, service, or assigned user..."
          filters={["All Services", "All Status", "All Users"]}
          showActions={false}
        />

        <section className="grid gap-5 xl:grid-cols-2">
          {rows.map((row) => (
            <article key={row.client + row.service} className="rounded-[24px] bg-white p-5 shadow-[0_12px_32px_rgba(76,54,99,0.08)] ring-1 ring-[#eee2f2]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-[#17223b]">{row.client}</h3>
                    <Badge tone={priorityTone[row.priority]}>{row.priority}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Service: {row.service} · Assigned to {row.assigned}</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-[#f8f5ff] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Status</p>
                      <div className="mt-3"><Badge tone={statusTone[row.status]}>{row.status}</Badge></div>
                    </div>
                    <div className="rounded-2xl bg-[#f8f5ff] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Channel</p>
                      <p className="mt-3 font-semibold text-[#17223b]">{row.channel}</p>
                    </div>
                    <div className="rounded-2xl bg-[#f8f5ff] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Due</p>
                      <p className="mt-3 font-semibold text-[#17223b]">{row.dueDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-[#f3eef7] text-slate-500 hover:text-slate-700">
                    <Send className="h-4 w-4" />
                  </button>
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-[#f3eef7] text-slate-500 hover:text-slate-700">
                    <Bell className="h-4 w-4" />
                  </button>
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-[#f3eef7] text-slate-500 hover:text-slate-700">
                    <CirclePlay className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <ChartCard title="Transaction Focus" subtitle="Where the team is spending time right now." className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#eef1ff] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f79ff]">Ready</p>
                <p className="mt-3 text-2xl font-bold text-[#17223b]">18</p>
              </div>
              <div className="rounded-2xl bg-[#ecfdf3] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">In Progress</p>
                <p className="mt-3 text-2xl font-bold text-[#17223b]">12</p>
              </div>
              <div className="rounded-2xl bg-[#fff7ed] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Overdue</p>
                <p className="mt-3 text-2xl font-bold text-[#17223b]">5</p>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Quick Actions" subtitle="Helpful shortcuts for the team.">
            <div className="space-y-3">
              {[
                { label: "Review pending", icon: CheckCircle2 },
                { label: "Send reminders", icon: ShieldCheck },
                { label: "Export summary", icon: CirclePlay },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className="flex w-full items-center justify-between rounded-2xl border border-[#ece3f3] bg-[#fcfafe] px-4 py-3 text-left text-sm font-semibold text-[#17223b] hover:bg-white">
                  <span className="inline-flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef1ff] text-[#6f79ff]"><Icon className="h-4 w-4" /></span>
                    {label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </ChartCard>
        </section>
      </div>
    </AppShell>
  );
}

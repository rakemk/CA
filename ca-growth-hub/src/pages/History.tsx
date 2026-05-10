import { Clock3, Filter, Mail, MessageSquareText, Sparkles, UserRound } from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import ChartCard from "@/components/ChartCard";
import FilterBar from "@/components/FilterBar";

type ActivityItem = {
  client: string;
  action: string;
  status: "Completed" | "In Progress" | "Failed" | "To Do";
  time: string;
  actor: string;
  channel: "Email" | "WhatsApp" | "Portal" | "Call";
};

const history: ActivityItem[] = [
  { client: "mittal trading", action: "GST cancellation request updated", status: "In Progress", time: "10 mins ago", actor: "Jatin A.", channel: "Portal" },
  { client: "Shobha Ram (G-077)", action: "Missing documents requested", status: "To Do", time: "32 mins ago", actor: "Gajendra", channel: "WhatsApp" },
  { client: "Amir Munaf", action: "Income tax review completed", status: "Completed", time: "1 hour ago", actor: "Gajendra", channel: "Email" },
  { client: "Nadeem Ansari", action: "Escalation note added", status: "Failed", time: "3 hours ago", actor: "Karishma", channel: "Call" },
  { client: "Apex Foundations", action: "Renewal follow-up scheduled", status: "In Progress", time: "Yesterday", actor: "Priya", channel: "Email" },
];

const toneMap: Record<ActivityItem["status"], "green" | "blue" | "red" | "gray"> = {
  Completed: "green",
  "In Progress": "blue",
  Failed: "red",
  "To Do": "gray",
};

export default function History() {
  return (
    <AppShell activeTab="Advisory">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">History</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              A timeline-style view of client activity, follow-ups, and execution status.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-2xl bg-[#19164a] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(25,22,74,0.22)] hover:bg-[#22205c]">
            <Sparkles className="h-4 w-4" />
            Review Timeline
          </button>
        </section>

        <FilterBar
          searchPlaceholder="Search by client, action, or owner..."
          filters={["All Status", "All Channels", "All Time"]}
          showActions={false}
        />

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <ChartCard title="Activity feed" subtitle="The latest client events and service updates.">
            <div className="space-y-4">
              {history.map((item, index) => (
                <article key={`${item.client}-${item.time}`} className="relative pl-8">
                  {index !== history.length - 1 ? (
                    <span className="absolute left-[11px] top-10 h-[calc(100%-1.25rem)] w-px bg-[#e8def0]" />
                  ) : null}
                  <span className="absolute left-0 top-2 grid h-6 w-6 place-items-center rounded-full bg-[#eef1ff] text-[#6f79ff] ring-4 ring-white">
                    <MessageSquareText className="h-3.5 w-3.5" />
                  </span>

                  <div className="rounded-[22px] bg-[#fbf8fd] p-5 ring-1 ring-[#f1e8f4]">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-[#17223b]">{item.client}</h3>
                          <Badge tone={toneMap[item.status]}>{item.status}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">{item.action}</p>
                      </div>

                      <div className="text-sm text-slate-500 md:text-right">
                        <p className="font-semibold text-[#17223b]">{item.time}</p>
                        <p className="mt-1">{item.channel}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#ece3f3]">
                        <UserRound className="h-4 w-4" />
                        {item.actor}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#ece3f3]">
                        <Mail className="h-4 w-4" />
                        {item.channel}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ChartCard>

          <div className="space-y-6">
            <ChartCard title="Timeline stats" subtitle="A glance at the stream of recent activity.">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl bg-[#eef1ff] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f79ff]">Completed</p>
                  <p className="mt-3 text-2xl font-bold text-[#17223b]">18</p>
                </div>
                <div className="rounded-2xl bg-[#ecfdf3] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">In Progress</p>
                  <p className="mt-3 text-2xl font-bold text-[#17223b]">9</p>
                </div>
                <div className="rounded-2xl bg-[#fff7ed] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">To Do</p>
                  <p className="mt-3 text-2xl font-bold text-[#17223b]">11</p>
                </div>
                <div className="rounded-2xl bg-[#fff1f2] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">Failed</p>
                  <p className="mt-3 text-2xl font-bold text-[#17223b]">4</p>
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Recent actors" subtitle="Who touched the portfolio most recently.">
              <div className="space-y-3">
                {[
                  { name: "Gajendra", count: 9 },
                  { name: "Karishma", count: 7 },
                  { name: "Jatin A.", count: 6 },
                  { name: "Priya", count: 3 },
                ].map((actor) => (
                  <div key={actor.name} className="flex items-center justify-between rounded-2xl bg-[#fbf8fd] px-4 py-3 ring-1 ring-[#f1e8f4]">
                    <div className="inline-flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef1ff] text-[#6f79ff]">
                        <Clock3 className="h-4 w-4" />
                      </span>
                      <p className="font-semibold text-[#17223b]">{actor.name}</p>
                    </div>
                    <p className="text-sm text-slate-500">{actor.count} updates</p>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

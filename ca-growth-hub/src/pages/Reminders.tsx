import { BellRing, CheckCircle2, MonitorSmartphone, Plus, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import ChartCard from "@/components/ChartCard";

type ReminderStatus = "Active" | "Pending" | "Paused" | "Overdue";

type ReminderRecord = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: ReminderStatus;
  owner: string;
};

const initialReminders: ReminderRecord[] = [
  {
    id: "1",
    title: "GST filing follow-up",
    description: "Confirm missing invoices and request final documents from the client.",
    date: "Today · 10:30 AM",
    status: "Active",
    owner: "Gajendra Rawal",
  },
  {
    id: "2",
    title: "Payment confirmation",
    description: "Send a reminder for payment confirmation and ledger review.",
    date: "Today · 02:15 PM",
    status: "Pending",
    owner: "Jatin Ajitkumar",
  },
  {
    id: "3",
    title: "Tax document collection",
    description: "Request PAN and Aadhaar documents before submission.",
    date: "Tomorrow · 11:00 AM",
    status: "Paused",
    owner: "Pooja Pareek",
  },
  {
    id: "4",
    title: "Overdue escalation",
    description: "Escalate overdue work and notify the assigned team member.",
    date: "Fri · 09:00 AM",
    status: "Overdue",
    owner: "Sudhir Shinde",
  },
  {
    id: "5",
    title: "Service renewal check",
    description: "Check the status of service renewal and send a courtesy follow-up.",
    date: "Sat · 04:45 PM",
    status: "Active",
    owner: "Karishma Soni",
  },
];

const toneMap: Record<ReminderStatus, "green" | "blue" | "gray" | "red"> = {
  Active: "green",
  Pending: "blue",
  Paused: "gray",
  Overdue: "red",
};

export default function Reminders() {
  const [reminders, setReminders] = useState(initialReminders);

  const toggleStatus = (id: string) => {
    setReminders((current) =>
      current.map((reminder) =>
        reminder.id === id
          ? { ...reminder, status: reminder.status === "Active" ? "Paused" : "Active" }
          : reminder,
      ),
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((current) => current.filter((reminder) => reminder.id !== id));
  };

  return (
    <AppShell activeTab="Advisory">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">Reminders</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage reminder cards with a lighter, more actionable workflow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-[#d9d0e2] bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-[0_2px_8px_rgba(120,96,138,0.04)] hover:bg-slate-50">
              <MonitorSmartphone className="h-4 w-4" />
              Enable Desktop Alerts
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(16,185,129,0.22)] hover:bg-emerald-600">
              <Plus className="h-4 w-4" />
              Reminder
            </button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
          <ChartCard title="Reminder board" subtitle="Keep the team aligned with clear next steps and due dates.">
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <article key={reminder.id} className="rounded-[22px] bg-[#fbf8fd] p-5 ring-1 ring-[#f1e8f4]">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-[#17223b]">{reminder.title}</h3>
                        <Badge tone={toneMap[reminder.status]}>{reminder.status}</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{reminder.description}</p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#ece3f3]">
                          <BellRing className="h-4 w-4" />
                          {reminder.date}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#ece3f3]">
                          <CheckCircle2 className="h-4 w-4" />
                          {reminder.owner}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleStatus(reminder.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#eef1ff] px-4 py-2 text-sm font-semibold text-[#31446d] hover:bg-[#e6ebff]"
                      >
                        {reminder.status === "Active" ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                        {reminder.status === "Active" ? "Pause" : "Activate"}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteReminder(reminder.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-[#d9d0e2] bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Reminder snapshot" subtitle="Fast stats for the current reminder queue.">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl bg-[#eef1ff] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f79ff]">Active</p>
                <p className="mt-3 text-2xl font-bold text-[#17223b]">{reminders.filter((r) => r.status === "Active").length}</p>
              </div>
              <div className="rounded-2xl bg-[#ecfdf3] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Pending</p>
                <p className="mt-3 text-2xl font-bold text-[#17223b]">{reminders.filter((r) => r.status === "Pending").length}</p>
              </div>
              <div className="rounded-2xl bg-[#fff7ed] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Paused</p>
                <p className="mt-3 text-2xl font-bold text-[#17223b]">{reminders.filter((r) => r.status === "Paused").length}</p>
              </div>
              <div className="rounded-2xl bg-[#fff1f2] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">Overdue</p>
                <p className="mt-3 text-2xl font-bold text-[#17223b]">{reminders.filter((r) => r.status === "Overdue").length}</p>
              </div>
            </div>
          </ChartCard>
        </section>
      </div>
    </AppShell>
  );
}

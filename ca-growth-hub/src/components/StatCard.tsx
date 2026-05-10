import { Activity, AlertOctagon, AlertTriangle, Clock, Trophy, XCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/data/dashboardData";

const iconMap: Record<StatItem["icon"], LucideIcon> = {
  clock: Clock,
  activity: Activity,
  "alert-triangle": AlertTriangle,
  "alert-octagon": AlertOctagon,
  "x-circle": XCircle,
  trophy: Trophy,
};

const toneMap: Record<StatItem["tone"], { chip: string; icon: string }> = {
  todo: { chip: "bg-secondary text-status-todo", icon: "text-status-todo" },
  progress: { chip: "bg-soft-progress text-status-progress", icon: "text-status-progress" },
  risk: { chip: "bg-soft-overdue text-status-risk", icon: "text-status-risk" },
  overdue: { chip: "bg-soft-overdue text-status-overdue", icon: "text-status-overdue" },
  failed: { chip: "bg-soft-overdue text-status-failed", icon: "text-status-failed" },
  success: { chip: "bg-soft-success text-status-success", icon: "text-status-success" },
};

export default function StatCard({ item }: { item: StatItem }) {
  const Icon = iconMap[item.icon];
  const tones = toneMap[item.tone];

  return (
    <article className="rounded-[24px] bg-white p-5 shadow-[0_12px_32px_rgba(76,54,99,0.08)] ring-1 ring-[#f0e8f3] transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold leading-tight text-[#17223b]">{item.label}</h3>
          <p className="mt-1 text-xs text-slate-400">{item.caption}</p>
        </div>
        <span className={cn("h-10 w-10 rounded-2xl grid place-items-center", tones.chip)}>
          <Icon className={cn("h-5 w-5", tones.icon)} />
        </span>
      </div>

      <p className="mt-5 text-3xl font-bold tracking-tight text-[#17223b]">{item.value}</p>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full rounded-full", tones.icon.replace("text-", "bg-"))} style={{ width: "68%" }} />
      </div>
    </article>
  );
}
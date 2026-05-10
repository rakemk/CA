import { Trophy } from "lucide-react";
import { topPerformers } from "@/data/dashboardData";

export default function TopPerformers() {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-6 h-full">
      <h2 className="text-lg font-semibold text-foreground">Top 3 Performers</h2>
      <p className="text-sm text-muted-foreground mt-1">Highest closure counts this period.</p>

      <div className="mt-5 space-y-4">
        {topPerformers.map((p) => (
          <article
            key={p.name}
            className="rounded-xl border border-border/60 bg-soft-success/40 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Rank #{p.rank}
                </p>
                <h3 className="text-base font-semibold text-foreground mt-0.5">{p.name}</h3>
              </div>
              <span className="h-9 w-9 rounded-xl grid place-items-center bg-card text-status-success border border-border/60">
                <Trophy className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-card border border-border/60 py-2">
                <p className="text-[11px] uppercase text-muted-foreground">Completed</p>
                <p className="text-lg font-semibold text-status-success mt-0.5">{p.completed}</p>
              </div>
              <div className="rounded-lg bg-card border border-border/60 py-2">
                <p className="text-[11px] uppercase text-muted-foreground">Open</p>
                <p className="text-lg font-semibold text-status-progress mt-0.5">{p.open}</p>
              </div>
              <div className="rounded-lg bg-card border border-border/60 py-2">
                <p className="text-[11px] uppercase text-muted-foreground">Overdue</p>
                <p className="text-lg font-semibold text-status-overdue mt-0.5">{p.overdue}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
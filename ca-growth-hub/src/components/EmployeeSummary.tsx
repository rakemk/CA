import { Users, UserMinus } from "lucide-react";
import { employeeSummary } from "@/data/dashboardData";

const icons = [Users, UserMinus];

export default function EmployeeSummary() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">Employees</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Team capacity and workload distribution.
      </p>
      <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {employeeSummary.map((s, i) => {
          const Icon = icons[i] ?? Users;
          return (
            <article
              key={s.label}
              className="bg-card rounded-2xl p-5 shadow-card border border-border/60 hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground leading-tight">{s.label}</h3>
                <span className="h-9 w-9 rounded-xl grid place-items-center bg-soft-progress text-status-progress">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-4xl font-bold text-foreground">{s.value}</p>
              <p className="mt-4 text-sm text-muted-foreground">{s.caption}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
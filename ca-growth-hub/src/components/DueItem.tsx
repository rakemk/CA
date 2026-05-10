import { AlertCircle } from "lucide-react";
import type { DueTask } from "@/data/dashboardData";

export default function DueItem({ task }: { task: DueTask }) {
  const overdue = (task.overdueDays ?? 0) > 0;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${
        overdue ? "bg-soft-overdue border-soft-overdue" : "bg-card border-border"
      }`}
    >
      <div className="min-w-0">
        <p className="font-semibold text-foreground truncate">{task.client}</p>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {task.type} • {task.employee}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {overdue && <AlertCircle className="h-5 w-5 text-status-overdue" />}
        <div className="text-right">
          <p className={`text-sm font-semibold ${overdue ? "text-status-overdue" : "text-foreground"}`}>
            {task.dueDate}
          </p>
          {overdue && (
            <p className="text-xs text-status-overdue/80">{task.overdueDays} days overdue</p>
          )}
        </div>
      </div>
    </div>
  );
}
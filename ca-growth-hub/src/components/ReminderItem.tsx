import { Clock3, PlayCircle, Trash2, UserRound } from "lucide-react";
import Badge from "@/components/Badge";
import { cn } from "@/lib/utils";

export type ReminderStatus = "Active" | "Pending" | "Paused" | "Overdue";

export type ReminderRecord = {
  id: string;
  client: string;
  description: string;
  schedule: string;
  status: ReminderStatus;
  createdBy: string;
};

type Props = {
  reminder: ReminderRecord;
  onMarkActive: (id: string) => void;
  onDelete: (id: string) => void;
};

const statusTone: Record<ReminderStatus, "green" | "blue" | "gray" | "red"> = {
  Active: "green",
  Pending: "blue",
  Paused: "gray",
  Overdue: "red",
};

export default function ReminderItem({ reminder, onMarkActive, onDelete }: Props) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/20">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-start gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold text-foreground">{reminder.client}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{reminder.description}</p>
            </div>
            <Badge tone={statusTone[reminder.status]} className="rounded-full px-3">
              {reminder.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 shrink-0" />
              <span>{reminder.schedule}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <UserRound className="h-4 w-4 shrink-0" />
              <span>Created by {reminder.createdBy}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:pl-4">
          <button
            type="button"
            onClick={() => onMarkActive(reminder.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
              reminder.status === "Active"
                ? "bg-soft-success text-status-success"
                : "bg-soft-progress text-status-progress hover:bg-soft-progress/80",
            )}
          >
            <PlayCircle className="h-4 w-4" />
            Mark Active
          </button>
          <button
            type="button"
            onClick={() => onDelete(reminder.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
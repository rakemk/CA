import { ChevronDown } from "lucide-react";
import ReminderItem, { type ReminderRecord } from "@/components/ReminderItem";

type Props = {
  reminders: ReminderRecord[];
  onMarkActive: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ReminderList({ reminders, onMarkActive, onDelete }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Reminder History</h3>
          <p className="mt-1 text-sm text-muted-foreground">Shows all reminders created in your company.</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-secondary/70 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          All
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-4 p-5">
        {reminders.map((reminder) => (
          <ReminderItem
            key={reminder.id}
            reminder={reminder}
            onMarkActive={onMarkActive}
            onDelete={onDelete}
          />
        ))}

        {reminders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center text-sm text-muted-foreground">
            No reminders match the current filter.
          </div>
        ) : null}
      </div>
    </section>
  );
}
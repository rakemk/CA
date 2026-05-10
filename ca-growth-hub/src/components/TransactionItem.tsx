import { cn } from "@/lib/utils";
import type { Transaction, TxnStatus } from "@/data/dashboardData";

const statusStyles: Record<TxnStatus, string> = {
  Overdue: "bg-soft-overdue text-status-overdue",
  "In Progress": "bg-soft-progress text-status-progress",
  Completed: "bg-soft-success text-status-success",
  "On Time": "bg-soft-success text-status-success",
};

function StatusBadge({ status }: { status: TxnStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        statusStyles[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function TransactionItem({ txn }: { txn: Transaction }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
      <div className="min-w-0">
        <p className="font-semibold text-foreground truncate">{txn.client}</p>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {txn.type} • {txn.employee}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
        {txn.statuses.map((s) => (
          <StatusBadge key={s} status={s} />
        ))}
      </div>
    </div>
  );
}
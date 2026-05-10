import { useState } from "react";
import { MessageSquare, MoreHorizontal } from "lucide-react";

export type TxnRow = {
  id: string;
  client: string;
  mobile: string;
  service: "GST" | "INCOME TAX" | string;
  assigned: string;
  dueDate: string;
  risk: "Overdue" | "On Time" | "At Risk";
  status: "To Do" | "In Progress" | "Completed";
  chat: number;
};

const serviceStyles: Record<string, string> = {
  GST: "bg-soft-progress text-status-progress",
  "INCOME TAX": "bg-soft-success text-status-success",
};

const statusStyles: Record<TxnRow["status"], string> = {
  "To Do": "bg-secondary text-muted-foreground border border-border",
  "In Progress": "bg-soft-progress text-status-progress",
  Completed: "bg-soft-success text-status-success",
};

const riskStyles: Record<TxnRow["risk"], string> = {
  Overdue: "bg-soft-overdue text-status-overdue",
  "On Time": "bg-soft-success text-status-success",
  "At Risk": "bg-amber-50 text-amber-600",
};

type Props = { rows: TxnRow[] };

export default function TransactionTable({ rows }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allChecked = selected.size === rows.length && rows.length > 0;

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const toggleAll = () => {
    setSelected(allChecked ? new Set() : new Set(rows.map((r) => r.id)));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase text-muted-foreground border-b border-border">
            <th className="px-4 py-4 w-10">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="h-4 w-4 rounded border-border accent-status-progress"
              />
            </th>
            <th className="px-4 py-4">Client</th>
            <th className="px-4 py-4">Mobile Number</th>
            <th className="px-4 py-4">Service</th>
            <th className="px-4 py-4">Assigned To</th>
            <th className="px-4 py-4">Due Dates</th>
            <th className="px-4 py-4">Risk</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Chat</th>
            <th className="px-4 py-4 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
            >
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selected.has(r.id)}
                  onChange={() => toggle(r.id)}
                  className="h-4 w-4 rounded border-border accent-status-progress"
                />
              </td>
              <td className="px-4 py-4 font-semibold text-foreground">{r.client}</td>
              <td className="px-4 py-4 text-muted-foreground">{r.mobile}</td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                    serviceStyles[r.service] ?? "bg-secondary text-foreground"
                  }`}
                >
                  {r.service}
                </span>
              </td>
              <td className="px-4 py-4 text-foreground">{r.assigned}</td>
              <td className="px-4 py-4 text-muted-foreground">{r.dueDate}</td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${riskStyles[r.risk]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {r.risk}
                </span>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${statusStyles[r.status]}`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-4">
                <button className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">{r.chat}</span>
                </button>
              </td>
              <td className="px-4 py-4">
                <button
                  aria-label="Actions"
                  className="h-8 w-8 grid place-items-center rounded-lg hover:bg-secondary text-muted-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
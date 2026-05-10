import { useState } from "react";
import { MessageSquare, MoreHorizontal } from "lucide-react";
import Badge from "@/components/Badge";

export type HistoryRow = {
  id: string;
  client: string;
  mobile: string;
  service: "GST" | "INCOME TAX" | "OTHERS";
  assigned: string;
  dueDate: string;
  risk: "Overdue" | "On Time";
  status: "In Progress" | "To Do" | "Failed";
  chat: number;
};

const serviceTone: Record<HistoryRow["service"], "soft-gray" | "blue" | "neutral"> = {
  GST: "soft-gray",
  "INCOME TAX": "blue",
  OTHERS: "neutral",
};

const statusTone: Record<HistoryRow["status"], "blue" | "gray" | "red"> = {
  "In Progress": "blue",
  "To Do": "gray",
  Failed: "red",
};

const riskTone: Record<HistoryRow["risk"], "red" | "green"> = {
  Overdue: "red",
  "On Time": "green",
};

type Props = {
  rows: HistoryRow[];
};

export default function HistoryTable({ rows }: Props) {
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
    setSelected(allChecked ? new Set() : new Set(rows.map((row) => row.id)));
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase text-muted-foreground border-b border-border bg-muted/20">
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
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggle(row.id)}
                  className="h-4 w-4 rounded border-border accent-status-progress"
                />
              </td>
              <td className="px-4 py-4 font-semibold text-foreground">{row.client}</td>
              <td className="px-4 py-4 text-muted-foreground">{row.mobile}</td>
              <td className="px-4 py-4">
                <Badge tone={serviceTone[row.service]}>{row.service === "INCOME TAX" ? "INCOME TAX" : row.service}</Badge>
              </td>
              <td className="px-4 py-4 text-foreground">{row.assigned}</td>
              <td className="px-4 py-4 text-muted-foreground">{row.dueDate}</td>
              <td className="px-4 py-4">
                <Badge tone={riskTone[row.risk]} className="gap-1.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {row.risk}
                </Badge>
              </td>
              <td className="px-4 py-4">
                <Badge tone={statusTone[row.status]}>{row.status}</Badge>
              </td>
              <td className="px-4 py-4">
                <button className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">{row.chat}</span>
                </button>
              </td>
              <td className="px-4 py-4">
                <button aria-label="Actions" className="h-8 w-8 grid place-items-center rounded-lg hover:bg-secondary text-muted-foreground">
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
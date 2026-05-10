import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Badge from "@/components/Badge";

export type ClientRow = {
  id: string;
  name: string;
  mobile: string;
  status: "Active" | "Inactive";
  priority: "Normal" | "High";
  totalTasks: number;
  open: number;
  completed: number;
  lastActivity: string;
};

type Props = {
  rows: ClientRow[];
};

export default function ClientTable({ rows }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.mobile.includes(searchTerm)
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="border-b border-border px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search clients by name or mobile number..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-secondary/60 border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:bg-background transition-colors"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/60 hover:bg-secondary text-sm font-medium transition-colors">
              Status
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/60 hover:bg-secondary text-sm font-medium transition-colors">
              Priority
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase text-muted-foreground border-b border-border bg-muted/20">
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Mobile Number</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4 text-right">Total Tasks</th>
              <th className="px-6 py-4 text-right">Open</th>
              <th className="px-6 py-4 text-right">Completed</th>
              <th className="px-6 py-4">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="px-6 py-4 font-semibold text-foreground">{row.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{row.mobile}</td>
                <td className="px-6 py-4">
                  <Badge tone={row.status === "Active" ? "green" : "gray"}>
                    {row.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge tone={row.priority === "High" ? "red" : "blue"}>
                    {row.priority}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right font-medium text-foreground">{row.totalTasks}</td>
                <td className="px-6 py-4 text-right text-muted-foreground">{row.open}</td>
                <td className="px-6 py-4 text-right text-muted-foreground">{row.completed}</td>
                <td className="px-6 py-4 text-muted-foreground text-xs">{row.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRows.length === 0 && (
        <div className="px-6 py-12 text-center text-sm text-muted-foreground">
          No clients found matching your search.
        </div>
      )}
    </div>
  );
}

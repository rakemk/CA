import { Repeat } from "lucide-react";
import { topRepeatClients } from "@/data/dashboardData";

export default function TopRepeatClients() {
  return (
    <section className="bg-card rounded-2xl border border-border/60 shadow-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Repeat className="h-5 w-5 text-status-progress" />
          Top Repeat Clients
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <th className="text-left font-medium py-3 pr-4">Client</th>
              <th className="text-left font-medium py-3 px-4">Mobile Number</th>
              <th className="text-right font-medium py-3 px-4">Total Requests</th>
              <th className="text-right font-medium py-3 px-4">Open</th>
              <th className="text-right font-medium py-3 px-4">Completed</th>
              <th className="text-right font-medium py-3 pl-4">Top Service</th>
            </tr>
          </thead>
          <tbody>
            {topRepeatClients.map((c, i) => (
              <tr
                key={c.name + c.mobile}
                className={`border-b border-border/40 last:border-0 hover:bg-muted/40 transition-colors ${
                  i % 2 === 1 ? "bg-muted/20" : ""
                }`}
              >
                <td className="py-4 pr-4 font-medium text-status-progress">{c.name}</td>
                <td className="py-4 px-4 text-muted-foreground tabular-nums">{c.mobile}</td>
                <td className="py-4 px-4 text-right text-foreground tabular-nums">{c.total}</td>
                <td className="py-4 px-4 text-right text-status-progress tabular-nums">{c.open}</td>
                <td className="py-4 px-4 text-right text-status-success tabular-nums">{c.completed}</td>
                <td className="py-4 pl-4 text-right font-medium text-foreground">{c.topService}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
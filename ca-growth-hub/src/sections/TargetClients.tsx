import Badge from "@/components/Badge";

type TargetClient = {
  id: string;
  name: string;
  totalScore: number;
  open: number;
  completed: number;
  atRisk: number;
  highPriority: number;
  lastActivity: string;
};

const targetClientsData: TargetClient[] = [
  {
    id: "1",
    name: "mittal trading",
    totalScore: 85,
    open: 2,
    completed: 8,
    atRisk: 0,
    highPriority: 1,
    lastActivity: "27 Apr 2026",
  },
  {
    id: "2",
    name: "Amir Munaf",
    totalScore: 72,
    open: 1,
    completed: 6,
    atRisk: 1,
    highPriority: 0,
    lastActivity: "17 Apr 2026",
  },
  {
    id: "3",
    name: "Nadeem Ansari",
    totalScore: 65,
    open: 3,
    completed: 5,
    atRisk: 2,
    highPriority: 2,
    lastActivity: "27 Apr 2026",
  },
];

export default function TargetClients() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Target Clients</h3>
        <p className="text-sm text-muted-foreground mt-1">High-priority client engagement tracking.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase text-muted-foreground border-b border-border bg-muted/20">
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4 text-right">Total Score</th>
              <th className="px-6 py-4 text-right">Open</th>
              <th className="px-6 py-4 text-right">Completed</th>
              <th className="px-6 py-4 text-right">At Risk</th>
              <th className="px-6 py-4 text-center">High Priority</th>
              <th className="px-6 py-4">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {targetClientsData.map((client) => (
              <tr key={client.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="px-6 py-4 font-semibold text-foreground">{client.name}</td>
                <td className="px-6 py-4 text-right">
                  <Badge tone="blue">{client.totalScore}</Badge>
                </td>
                <td className="px-6 py-4 text-right font-medium text-muted-foreground">{client.open}</td>
                <td className="px-6 py-4 text-right font-medium text-muted-foreground">{client.completed}</td>
                <td className="px-6 py-4 text-right">
                  {client.atRisk > 0 && <Badge tone="red">{client.atRisk}</Badge>}
                  {client.atRisk === 0 && <span className="text-muted-foreground text-xs">—</span>}
                </td>
                <td className="px-6 py-4 text-center">
                  {client.highPriority > 0 && (
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-soft-overdue text-status-overdue text-xs font-semibold">
                      {client.highPriority}
                    </span>
                  )}
                  {client.highPriority === 0 && <span className="text-muted-foreground text-xs">—</span>}
                </td>
                <td className="px-6 py-4 text-muted-foreground text-xs">{client.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

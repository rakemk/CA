import { Users, UserCheck, UserPlus, TrendingUp, BarChart3, Zap } from "lucide-react";
import StatsCard from "@/components/StatsCard";

const stats = [
  { icon: Users, label: "Total Clients", value: 584, description: "All registered clients" },
  { icon: UserCheck, label: "Active Clients", value: 518, description: "Currently active" },
  { icon: UserPlus, label: "New Clients", value: 3, description: "This month" },
  { icon: TrendingUp, label: "Retention Rate", value: "28%", description: "Client retention" },
  { icon: BarChart3, label: "Avg Transactions", value: 3, description: "Per client monthly" },
  { icon: Zap, label: "Avg Per Client", value: "1.1", description: "Active services" },
];

export default function ClientStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </div>
  );
}

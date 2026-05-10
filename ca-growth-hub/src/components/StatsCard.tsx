import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
};

export default function StatsCard({ icon: Icon, label, value, description }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

type Tone = "red" | "green" | "blue" | "gray" | "neutral" | "soft-blue" | "soft-gray";

type Props = {
  children: React.ReactNode;
  tone: Tone;
  className?: string;
};

const toneStyles: Record<Tone, string> = {
  red: "bg-soft-overdue text-status-overdue",
  green: "bg-soft-success text-status-success",
  blue: "bg-soft-progress text-status-progress",
  gray: "bg-secondary text-muted-foreground border border-border",
  neutral: "bg-secondary text-foreground",
  "soft-blue": "bg-sky-50 text-sky-700",
  "soft-gray": "bg-muted text-muted-foreground",
};

export default function Badge({ children, tone, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${toneStyles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
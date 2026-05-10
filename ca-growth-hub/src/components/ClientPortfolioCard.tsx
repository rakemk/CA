import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ClientPortfolioCardData = {
  name: string;
  industry: string;
  lastContact: string;
  annualRevenue: string;
  status: "Active" | "Inactive";
  icon: ReactNode;
  avatars: string[];
  accent: string;
};

type Props = {
  client: ClientPortfolioCardData;
};

function AvatarStack({ initials }: { initials: string[] }) {
  return (
    <div className="flex items-center -space-x-2">
      {initials.map((initial, index) => (
        <div
          key={`${initial}-${index}`}
          className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-semibold text-slate-600 shadow-sm"
        >
          {initial}
        </div>
      ))}
    </div>
  );
}

export default function ClientPortfolioCard({ client }: Props) {
  return (
    <article className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(76,54,99,0.08)] ring-1 ring-[#f0e8f3] transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className={cn("grid h-10 w-10 place-items-center rounded-xl text-white shadow-sm", client.accent)}>
          {client.icon}
        </div>

        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-semibold",
            client.status === "Active"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-400",
          )}
        >
          {client.status}
        </span>
      </div>

      <h3 className="mt-5 text-[20px] font-bold tracking-tight text-[#17223b]">{client.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{client.industry}</p>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Last Contact</dt>
          <dd className="font-semibold text-slate-700">{client.lastContact}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Annual Revenue</dt>
          <dd className="font-semibold text-slate-700">{client.annualRevenue}</dd>
        </div>
      </dl>

      <div className="mt-7 flex items-center justify-between gap-3">
        <AvatarStack initials={client.avatars} />
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          aria-label={`Open ${client.name}`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}

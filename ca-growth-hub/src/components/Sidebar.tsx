import { NavLink } from "react-router-dom";
import {
  ArrowRightFromLine,
  BarChart3,
  Bell,
  FileText,
  HelpCircle,
  History,
  Home,
  LogOut,
  Sparkles,
  SquareUserRound,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Overview", to: "/", icon: Home },
  { label: "Client Portfolio", to: "/clients", icon: SquareUserRound },
  { label: "Transactions", to: "/transactions", icon: ArrowRightFromLine },
  { label: "Cashflow Engine", to: "/cashflow", icon: ArrowRightFromLine },
  { label: "Growth Metrics", to: "/growth-metrics", icon: BarChart3 },
  { label: "Document Vault", to: "/document-vault", icon: FileText },
  { label: "Team Hub", to: "/team-hub", icon: Users },
  { label: "Reminders", to: "/reminders", icon: Bell },
  { label: "History", to: "/history", icon: History },
];

function NavItem({ label, to, icon: Icon }: { label: string; to: string; icon: LucideIcon }) {
  const className =
    "flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors w-full";

  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        cn(
          className,
          isActive
            ? "bg-[#eef1ff] text-[#24335d] shadow-[inset_0_0_0_1px_rgba(88,99,242,0.12)]"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
        )
      }
    >
      <Icon className="h-4.5 w-4.5 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:z-20 w-[280px] shrink-0 flex-col border-r border-[#efe5f1] bg-white shadow-[0_12px_40px_rgba(94,60,129,0.08)]">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#f1e8f4]">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1f2344] text-white shadow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#132238]">CA Growth Hub</p>
          <p className="text-xs text-slate-500">Elite Advisory</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavItem key={item.label} label={item.label} to={item.to} icon={item.icon} />
        ))}
      </nav>

      <div className="px-4 pb-4 space-y-2">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
          <HelpCircle className="h-4.5 w-4.5 shrink-0" />
          <span>Help Center</span>
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
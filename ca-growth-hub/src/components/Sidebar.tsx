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
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  SquareUserRound,
  Users,
} from "lucide-react";
import { useState } from "react";
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

function NavItem({
  label,
  to,
  icon: Icon,
  collapsed = false,
}: {
  label: string;
  to: string;
  icon: LucideIcon;
  collapsed?: boolean;
}) {
  const className = "flex items-center rounded-xl py-3 text-left text-sm font-medium transition-colors w-full";

  return (
    <NavLink
      to={to}
      end={to === "/"}
      title={collapsed ? label : undefined}
      aria-label={label}
      className={({ isActive }) =>
        cn(
          className,
          collapsed ? "justify-center px-0" : "gap-3 px-3",
          isActive
            ? "bg-[#eef1ff] text-[#24335d] shadow-[inset_0_0_0_1px_rgba(88,99,242,0.12)]"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
        )
      }
    >
      <Icon className="h-4.5 w-4.5 shrink-0" />
      <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:z-20 shrink-0 flex-col border-r border-[#efe5f1] bg-white shadow-[0_12px_40px_rgba(94,60,129,0.08)] transition-all duration-200 ease-out",
        collapsed ? "w-[88px]" : "w-[280px]",
      )}
    >
      <div className={cn("flex items-center border-b border-[#f1e8f4] py-5", collapsed ? "justify-center px-3" : "gap-3 px-6")}>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1f2344] text-white shadow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#132238]">CA Growth Hub</p>
            <p className="text-xs text-slate-500">Elite Advisory</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4.5 w-4.5" /> : <PanelLeftClose className="h-4.5 w-4.5" />}
        </button>
      </div>

      <nav className={cn("flex-1 overflow-y-auto py-5", collapsed ? "px-3 space-y-2" : "px-4 space-y-1")}>
        {items.map((item) => (
          <NavItem key={item.label} label={item.label} to={item.to} icon={item.icon} collapsed={collapsed} />
        ))}
      </nav>

      <div className={cn("pb-4 space-y-2", collapsed ? "px-3" : "px-4")}>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
          <HelpCircle className="h-4.5 w-4.5 shrink-0" />
          <span className={cn(collapsed && "sr-only")}>Help Center</span>
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          <span className={cn(collapsed && "sr-only")}>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
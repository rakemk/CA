import { ArrowRightFromLine, HelpCircle, LayoutGrid, LogOut, Plus, SquareUserRound } from "lucide-react";

const navItems = [
  { label: "Overview", active: false, icon: LayoutGrid },
  { label: "Client Portfolio", active: true, icon: SquareUserRound },
  { label: "Cashflow Engine", active: false, icon: ArrowRightFromLine },
  { label: "Growth Metrics", active: false, icon: LayoutGrid },
  { label: "Document Vault", active: false, icon: LayoutGrid },
  { label: "Team Hub", active: false, icon: LayoutGrid },
];

export default function ClientPortfolioSidebar() {
  return (
    <aside className="hidden lg:flex w-[270px] shrink-0 flex-col bg-white border-r border-[#efe5f1] shadow-[0_10px_40px_rgba(94,60,129,0.08)]">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#f1e8f4]">
        <div className="h-10 w-10 rounded-xl bg-[#19364a] text-white grid place-items-center shadow-sm">
          <SquareUserRound className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#132238]">CA Growth Hub</p>
          <p className="text-xs text-slate-500">Elite Advisory</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5 space-y-1">
        {navItems.map(({ label, active, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
              active
                ? "bg-[#eef1ff] text-[#24335d] shadow-[inset_0_0_0_1px_rgba(88,99,242,0.12)]"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <Icon className="h-4.5 w-4.5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 pb-4 space-y-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
          <HelpCircle className="h-4.5 w-4.5" />
          <span>Help Center</span>
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
          <LogOut className="h-4.5 w-4.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

import { Bell, Search, Settings, Target } from "lucide-react";

type Props = {
  title: string;
  activeTab?: "Dashboard" | "Advisory" | "Audit" | "Tax";
};

const tabs = ["Dashboard", "Advisory", "Audit", "Tax"] as const;

export default function Navbar({ title, activeTab = "Advisory" }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#eadff0] bg-white/80 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-5 py-4 lg:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#1f2344] text-white shadow-sm">
            <Target className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-base font-bold leading-none text-[#17223b]">{title}</p>
            <p className="mt-1 text-xs text-slate-500">Elite Advisory Portal</p>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-slate-400 xl:flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={tab === activeTab ? "border-b-2 border-emerald-400 pb-1 text-[#1d2d52]" : "pb-1 hover:text-slate-600"}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3 lg:flex-none">
          <label className="hidden md:flex min-w-[260px] max-w-[360px] flex-1 items-center gap-2 rounded-full bg-[#f3eef7] px-4 py-2 text-sm text-slate-500 ring-1 ring-transparent focus-within:ring-[#dccfe5]">
            <Search className="h-4 w-4 shrink-0" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>

          <button className="grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100">
            <Settings className="h-5 w-5" />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1e3a4b] text-sm font-semibold text-white shadow-sm">
            S
          </div>
        </div>
      </div>
    </header>
  );
}
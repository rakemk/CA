import { ChevronDown, Grid2x2, List, Search, SlidersHorizontal } from "lucide-react";

type Props = {
  searchPlaceholder?: string;
  filters?: string[];
  showViewToggle?: boolean;
  showActions?: boolean;
};

const defaultFilters = [
  "Industry",
  "Last Contact",
];

export default function FilterBar({
  searchPlaceholder = "Search by client",
  filters = defaultFilters,
  showViewToggle = true,
  showActions = true,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] bg-white p-4 shadow-[0_12px_32px_rgba(76,54,99,0.08)] ring-1 ring-[#eee2f2] xl:flex-row xl:items-center xl:justify-between">
      <label className="relative flex h-11 min-w-[220px] flex-1 items-center gap-3 rounded-full border border-[#e6dff0] bg-white px-4 text-sm text-slate-500 shadow-[0_2px_8px_rgba(120,96,138,0.04)] focus-within:border-[#d0c0df]">
        <Search className="h-4.5 w-4.5 shrink-0" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        {filters.map((label) => (
          <button
            key={label}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#e6dff0] bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_2px_8px_rgba(120,96,138,0.04)] hover:bg-slate-50"
          >
            <span className="truncate">{label}</span>
            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
          </button>
        ))}

        {showViewToggle ? (
          <div className="flex items-center rounded-2xl border border-[#e6dff0] bg-white p-1 shadow-[0_2px_8px_rgba(120,96,138,0.04)]">
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-[#f1f4fb] text-[#374d73]">
              <Grid2x2 className="h-4.5 w-4.5" />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 hover:bg-slate-50">
              <List className="h-4.5 w-4.5" />
            </button>
          </div>
        ) : null}

        {showActions ? (
          <button className="inline-flex h-11 items-center gap-2 rounded-full border border-[#e6dff0] bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_2px_8px_rgba(120,96,138,0.04)] hover:bg-slate-50">
            <SlidersHorizontal className="h-4 w-4" />
            Quick Actions
          </button>
        ) : null}
      </div>
    </div>
  );
}
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react";

type Props = {
  start: number;
  end: number;
  total: number;
  pages?: Array<number | string>;
};

export default function Pagination({ start, end, total, pages = [1] }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          Showing <span className="font-semibold text-foreground">{start}–{end}</span> of{" "}
          <span className="font-semibold text-foreground">{total}</span> items
        </span>
        <span className="text-border">|</span>
        <button className="inline-flex items-center gap-1 h-8 px-2 rounded-lg bg-secondary/60 hover:bg-secondary text-foreground text-sm">
          10 <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <span>per page</span>
      </div>

      <div className="flex items-center gap-1">
        {[ChevronsLeft, ChevronLeft].map((Icon, i) => (
          <button
            key={i}
            className="h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:bg-secondary"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <button className="h-8 w-8 grid place-items-center rounded-lg bg-status-progress text-white text-sm font-semibold">
          1
        </button>
        {pages.slice(1).map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <button
              key={page}
              className="h-8 min-w-8 px-2 grid place-items-center rounded-lg text-muted-foreground hover:bg-secondary text-sm"
            >
              {page}
            </button>
          ),
        )}
        {[ChevronRight, ChevronsRight].map((Icon, i) => (
          <button
            key={i}
            className="h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:bg-secondary"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
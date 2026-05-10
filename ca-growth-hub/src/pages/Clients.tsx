import { ArrowUpFromLine, Eye, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";

type ClientPortfolioItem = {
  name: string;
  industry: string;
  lastContact: string;
  annualRevenue: string;
  status: "Active" | "Inactive";
};

const portfolioClients: ClientPortfolioItem[] = [
  {
    name: "Aether Dynamics",
    industry: "Aerospace & Defense",
    lastContact: "Oct 24, 2023",
    annualRevenue: "$12.4M",
    status: "Active",
  },
  {
    name: "NeuraLink Systems",
    industry: "Biotechnology",
    lastContact: "Oct 28, 2023",
    annualRevenue: "$8.2M",
    status: "Active",
  },
  {
    name: "Veridian Energy",
    industry: "Renewable Utilities",
    lastContact: "Sep 12, 2023",
    annualRevenue: "$4.1M",
    status: "Inactive",
  },
  {
    name: "Luxe Retail Group",
    industry: "Premium E-commerce",
    lastContact: "Nov 02, 2023",
    annualRevenue: "$21.8M",
    status: "Active",
  },
  {
    name: "Apex Foundations",
    industry: "Infrastructure",
    lastContact: "Oct 15, 2023",
    annualRevenue: "$45.0M",
    status: "Active",
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

  const filteredClients = useMemo(() => {
    return portfolioClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.industry.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const goToDocumentVault = (clientName: string, mode: "view" | "upload") => {
    const params = new URLSearchParams();
    if (mode === "view") {
      params.set("client", clientName);
    } else {
      params.set("uploadFor", clientName);
    }

    navigate(`/document-vault?${params.toString()}`);
  };

  return (
    <AppShell activeTab="Advisory">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">Client Portfolio</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">All clients in one compact row-based view for fast scanning.</p>
          </div>

          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-600">
            <Plus className="h-4.5 w-4.5" />
            Add New Client
          </button>
        </div>

        <div className="rounded-2xl border border-[#e8ecf3] bg-white p-3 sm:p-4">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by client or industry..."
                className="h-10 w-full rounded-xl border border-[#e6ebf2] bg-[#fbfcff] pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#bfd0ff] focus:ring-2 focus:ring-[#dce6ff]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "All" | "Active" | "Inactive")}
              className="h-10 min-w-[140px] rounded-xl border border-[#e6ebf2] bg-[#fbfcff] px-3 text-sm text-slate-700 outline-none transition focus:border-[#bfd0ff] focus:ring-2 focus:ring-[#dce6ff]"
            >
              <option value="All">All status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] border-collapse">
              <thead>
                <tr className="border-y border-[#eef1f6] bg-[#f8fafd] text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Industry</th>
                  <th className="px-4 py-3">Last activity</th>
                  <th className="px-4 py-3">Annual revenue</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Documents</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.name} className="border-b border-[#eef1f6] text-sm text-slate-700 transition-colors hover:bg-[#fafcff]">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-[#17223b]">{client.name}</p>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{client.industry}</td>
                    <td className="px-4 py-3.5 text-slate-600">{client.lastContact}</td>
                    <td className="px-4 py-3.5 font-semibold text-[#1f2c46]">{client.annualRevenue}</td>
                    <td className="px-4 py-3.5">
                      <Badge tone={client.status === "Active" ? "soft-blue" : "soft-gray"}>{client.status}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => goToDocumentVault(client.name, "upload")}
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e5eaf3] bg-white px-2.5 text-xs font-medium text-slate-600 transition-colors hover:border-[#c8d6f9] hover:text-[#2f4ca8]"
                          aria-label={`Upload document for ${client.name}`}
                        >
                          <ArrowUpFromLine className="h-3.5 w-3.5" />
                          Upload
                        </button>

                        <button
                          type="button"
                          onClick={() => goToDocumentVault(client.name, "view")}
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e5eaf3] bg-white px-2.5 text-xs font-medium text-slate-600 transition-colors hover:border-[#c8d6f9] hover:text-[#2f4ca8]"
                          aria-label={`View documents for ${client.name}`}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 && (
            <div className="py-8 text-center text-sm text-slate-500">No client matched your filters.</div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

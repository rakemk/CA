import { Download, Eye, FileCheck2, FileClock, FileText, FolderOpen, Search, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import ChartCard from "@/components/ChartCard";

type DocStatus = "Verified" | "Pending" | "Expired" | "Under Review";
type DocCategory = "GST" | "Income Tax" | "Audit" | "Registration" | "Compliance";

type Document = {
  id: string;
  name: string;
  client: string;
  category: DocCategory;
  status: DocStatus;
  uploadedBy: string;
  date: string;
  size: string;
};

const documents: Document[] = [
  { id: "1", name: "GST Registration Certificate", client: "Apex Foundations", category: "GST", status: "Verified", uploadedBy: "Karishma Soni", date: "Apr 28, 2024", size: "1.2 MB" },
  { id: "2", name: "ITR-3 FY 2023-24", client: "Aether Dynamics", category: "Income Tax", status: "Under Review", uploadedBy: "Kali Pandey", date: "Apr 25, 2024", size: "3.4 MB" },
  { id: "3", name: "Balance Sheet FY 2023", client: "Luxe Retail Group", category: "Audit", status: "Verified", uploadedBy: "Nilesh Parmar", date: "Apr 22, 2024", size: "4.8 MB" },
  { id: "4", name: "PAN Card – Company", client: "NeuraLink Systems", category: "Registration", status: "Verified", uploadedBy: "Gajendra Rawal", date: "Apr 20, 2024", size: "0.5 MB" },
  { id: "5", name: "TDS Return Q4 FY24", client: "Mittal Trading", category: "Compliance", status: "Pending", uploadedBy: "Jatin A.", date: "Apr 18, 2024", size: "2.1 MB" },
  { id: "6", name: "GST Monthly Return GSTR-3B", client: "Shobha Ram", category: "GST", status: "Pending", uploadedBy: "Karishma Soni", date: "Apr 15, 2024", size: "1.8 MB" },
  { id: "7", name: "Audit Report FY 2022", client: "Veridian Energy", category: "Audit", status: "Expired", uploadedBy: "Nilesh Parmar", date: "Mar 31, 2024", size: "6.2 MB" },
  { id: "8", name: "MSME Udyam Certificate", client: "RAUSHAN FAIZI", category: "Registration", status: "Verified", uploadedBy: "Kali Pandey", date: "Mar 28, 2024", size: "0.3 MB" },
];

const statusTone: Record<DocStatus, "green" | "blue" | "red" | "gray"> = {
  Verified: "green", Pending: "blue", Expired: "red", "Under Review": "gray",
};

const categoryColors: Record<DocCategory, string> = {
  GST: "bg-[#eef1ff] text-[#6f79ff]",
  "Income Tax": "bg-[#ecfdf3] text-emerald-700",
  Audit: "bg-[#fff7ed] text-orange-600",
  Registration: "bg-[#f5f3ff] text-violet-600",
  Compliance: "bg-[#fff1f2] text-rose-600",
};

const vaultStats = [
  { label: "Total Documents", value: "248", icon: FileText, bg: "bg-[#eef1ff]", color: "text-[#6f79ff]" },
  { label: "Verified", value: "186", icon: FileCheck2, bg: "bg-[#ecfdf3]", color: "text-emerald-600" },
  { label: "Pending Review", value: "41", icon: FileClock, bg: "bg-[#fff7ed]", color: "text-orange-500" },
  { label: "Expired / Outdated", value: "21", icon: FolderOpen, bg: "bg-[#fff1f2]", color: "text-rose-500" },
];

export default function DocumentVault() {
  const [searchParams] = useSearchParams();
  const clientFromQuery = searchParams.get("client")?.trim() ?? "";
  const uploadForClient = searchParams.get("uploadFor")?.trim() ?? "";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (clientFromQuery) {
      setSearch(clientFromQuery);
    }
  }, [clientFromQuery]);

  const categories = ["All", "GST", "Income Tax", "Audit", "Registration", "Compliance"];
  const filtered = documents.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.client.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || doc.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <AppShell activeTab="Advisory">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">Document Vault</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">Secure, organized document storage for all client compliance records.</p>
            {uploadForClient && (
              <p className="mt-2 text-xs font-medium text-[#2f4ca8]">Upload context: {uploadForClient}</p>
            )}
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(16,185,129,0.22)] hover:bg-emerald-600">
            <Upload className="h-4 w-4" />{uploadForClient ? `Upload for ${uploadForClient}` : "Upload Document"}
          </button>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {vaultStats.map(({ label, value, icon: Icon, bg, color }) => (
            <div key={label} className={`rounded-[24px] ${bg} px-5 py-5 shadow-[0_8px_24px_rgba(76,54,99,0.07)] ring-1 ring-[#eee2f2]`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="mt-3 text-2xl font-bold text-[#17223b]">{value}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[20px] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(76,54,99,0.07)] ring-1 ring-[#eee2f2]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search documents or clients..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-[#f8f5ff] pl-10 pr-4 py-2.5 text-sm text-[#17223b] placeholder:text-slate-400 outline-none ring-1 ring-[#e8dff4] focus:ring-[#6f79ff]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${selectedCategory === cat ? "bg-[#eef1ff] text-[#31446d] ring-1 ring-[#c7d0ff]" : "bg-[#f8f5ff] text-slate-500 hover:bg-[#eef1ff]"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <ChartCard title="Document Library" subtitle={`Showing ${filtered.length} of ${documents.length} documents`}>
          <div className="space-y-3">
            {filtered.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between gap-4 rounded-2xl bg-[#fbf8fd] p-4 ring-1 ring-[#f1e8f4] hover:ring-[#d7c8e8] transition-all">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${categoryColors[doc.category]}`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#17223b] truncate">{doc.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{doc.client} · {doc.uploadedBy} · {doc.date} · {doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge tone={statusTone[doc.status]}>{doc.status}</Badge>
                  <button className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef1ff] text-[#6f79ff] hover:bg-[#dde3ff]"><Eye className="h-4 w-4" /></button>
                  <button className="grid h-8 w-8 place-items-center rounded-lg bg-[#f3eef7] text-slate-500 hover:text-slate-700"><Download className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="py-12 text-center"><p className="text-slate-400 text-sm">No documents match your search.</p></div>}
          </div>
        </ChartCard>
      </div>
    </AppShell>
  );
}

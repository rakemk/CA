import { Award, Mail, Phone, Plus, Shield, Star, UserCheck, Users } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import ChartCard from "@/components/ChartCard";

type MemberRole = "Senior CA" | "Associate CA" | "Tax Analyst" | "Audit Executive" | "Compliance Officer";
type MemberStatus = "Active" | "On Leave" | "Probation";

type TeamMember = {
  id: string;
  name: string;
  role: MemberRole;
  status: MemberStatus;
  email: string;
  phone: string;
  assigned: number;
  completed: number;
  rating: number;
  joined: string;
  initials: string;
  color: string;
};

const team: TeamMember[] = [
  { id: "1", name: "Karishma Soni", role: "Senior CA", status: "Active", email: "karishma@cagrowth.in", phone: "+91 98201 11234", assigned: 153, completed: 140, rating: 98, joined: "Jan 2021", initials: "KS", color: "bg-[#6f79ff]" },
  { id: "2", name: "Kali Pandey", role: "Tax Analyst", status: "Active", email: "kali@cagrowth.in", phone: "+91 97201 22345", assigned: 162, completed: 141, rating: 96, joined: "Mar 2021", initials: "KP", color: "bg-[#10b981]" },
  { id: "3", name: "Nilesh Parmar", role: "Audit Executive", status: "Active", email: "nilesh@cagrowth.in", phone: "+91 96201 33456", assigned: 72, completed: 66, rating: 91, joined: "Jun 2022", initials: "NP", color: "bg-[#8b6ef2]" },
  { id: "4", name: "Gajendra Rawal", role: "Associate CA", status: "Active", email: "gajendra@cagrowth.in", phone: "+91 95201 44567", assigned: 59, completed: 54, rating: 88, joined: "Sep 2022", initials: "GR", color: "bg-[#f59e0b]" },
  { id: "5", name: "Hitesh Sharma", role: "Compliance Officer", status: "On Leave", email: "hitesh@cagrowth.in", phone: "+91 94201 55678", assigned: 12, completed: 12, rating: 85, joined: "Jan 2023", initials: "HS", color: "bg-[#ec4899]" },
  { id: "6", name: "Jatin A. Santwani", role: "Associate CA", status: "Active", email: "jatin@cagrowth.in", phone: "+91 93201 66789", assigned: 5, completed: 3, rating: 72, joined: "Nov 2023", initials: "JS", color: "bg-[#14b8a6]" },
  { id: "7", name: "Pooja Pareek", role: "Tax Analyst", status: "Probation", email: "pooja@cagrowth.in", phone: "+91 92201 77890", assigned: 8, completed: 5, rating: 68, joined: "Feb 2024", initials: "PP", color: "bg-[#6366f1]" },
  { id: "8", name: "Sudhir Shinde", role: "Senior CA", status: "Active", email: "sudhir@cagrowth.in", phone: "+91 91201 88901", assigned: 44, completed: 39, rating: 90, joined: "Apr 2022", initials: "SS", color: "bg-[#f43f5e]" },
];

const workloadData = team.slice(0, 6).map((m) => ({
  name: m.initials,
  completed: m.completed,
  pending: m.assigned - m.completed,
}));

const statusTone: Record<MemberStatus, "green" | "gray" | "blue"> = {
  Active: "green", "On Leave": "gray", Probation: "blue",
};

const teamStats = [
  { label: "Total Members", value: "10", icon: Users, bg: "bg-[#eef1ff]", color: "text-[#6f79ff]" },
  { label: "Active Now", value: "8", icon: UserCheck, bg: "bg-[#ecfdf3]", color: "text-emerald-600" },
  { label: "Avg. Completion Rate", value: "91%", icon: Star, bg: "bg-[#fff7ed]", color: "text-orange-500" },
  { label: "Top Performer", value: "Karishma", icon: Award, bg: "bg-[#f5f3ff]", color: "text-violet-600" },
];

export default function TeamHub() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedMember = team.find((m) => m.id === selected);

  return (
    <AppShell activeTab="Advisory">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17223b] sm:text-4xl">Team Hub</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">Manage team members, workload distribution, and performance scores.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(16,185,129,0.22)] hover:bg-emerald-600">
            <Plus className="h-4 w-4" />Add Member
          </button>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {teamStats.map(({ label, value, icon: Icon, bg, color }) => (
            <div key={label} className={`rounded-[24px] ${bg} px-5 py-5 shadow-[0_8px_24px_rgba(76,54,99,0.07)] ring-1 ring-[#eee2f2]`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="mt-3 text-2xl font-bold text-[#17223b]">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3">
            <div className="rounded-[24px] bg-white px-5 py-4 shadow-[0_12px_32px_rgba(76,54,99,0.08)] ring-1 ring-[#eee2f2]">
              <h3 className="text-lg font-semibold text-[#17223b]">Team Members</h3>
              <p className="text-sm text-slate-400 mt-1">Click a member to view details</p>
            </div>
            {team.map((member) => (
              <button key={member.id} onClick={() => setSelected(selected === member.id ? null : member.id)}
                className={`w-full text-left rounded-[22px] bg-white p-4 shadow-[0_8px_24px_rgba(76,54,99,0.06)] ring-1 transition-all hover:ring-[#c7d0ff] ${selected === member.id ? "ring-[#6f79ff] bg-[#fbf9ff]" : "ring-[#eee2f2]"}`}>
                <div className="flex items-center gap-4">
                  <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${member.color} text-white text-sm font-bold`}>
                    {member.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-[#17223b]">{member.name}</p>
                      <Badge tone={statusTone[member.status]}>{member.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{member.role} · Joined {member.joined}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-[#17223b]">{member.rating}%</p>
                    <p className="text-xs text-slate-400">{member.completed}/{member.assigned} done</p>
                  </div>
                </div>
                {selected === member.id && selectedMember && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 border-t border-[#f1e8f4] pt-4">
                    <a href={`mailto:${selectedMember.email}`} className="flex items-center gap-2 rounded-xl bg-[#f8f5ff] px-3 py-2.5 text-sm text-[#17223b] hover:bg-[#eef1ff]">
                      <Mail className="h-4 w-4 text-[#6f79ff]" />{selectedMember.email}
                    </a>
                    <div className="flex items-center gap-2 rounded-xl bg-[#f8f5ff] px-3 py-2.5 text-sm text-[#17223b]">
                      <Phone className="h-4 w-4 text-[#6f79ff]" />{selectedMember.phone}
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-[#ecfdf3] px-3 py-2.5 text-sm text-emerald-700">
                      <Shield className="h-4 w-4" />Completed: {selectedMember.completed} tasks
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-[#fff7ed] px-3 py-2.5 text-sm text-orange-600">
                      <Star className="h-4 w-4" />Rating: {selectedMember.rating}%
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <ChartCard title="Workload Distribution" subtitle="Completed vs pending tasks per member">
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workloadData} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ede7f3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={36} tick={{ fill: "#475569", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #eee2f2" }} />
                  <Bar dataKey="completed" stackId="a" fill="#6f79ff" radius={[0, 0, 0, 0]} name="Completed" />
                  <Bar dataKey="pending" stackId="a" fill="#f1e8f4" radius={[0, 8, 8, 0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>
      </div>
    </AppShell>
  );
}

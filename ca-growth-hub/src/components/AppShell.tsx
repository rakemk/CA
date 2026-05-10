import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

type Props = {
  children: ReactNode;
  activeTab?: "Dashboard" | "Advisory" | "Audit" | "Tax";
  title?: string;
};

export default function AppShell({ children, activeTab = "Advisory", title = "Growth Hub" }: Props) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(243,238,247,1)_34%,_rgba(239,243,255,1)_100%)] text-[#17223b]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar title={title} activeTab={activeTab} />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
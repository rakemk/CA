import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login";
import { useAuth } from "./lib/auth";
import Transactions from "./pages/Transactions.tsx";
import History from "./pages/History.tsx";
import Reminders from "./pages/Reminders.tsx";
import Clients from "./pages/Clients.tsx";
import Cashflow from "./pages/Cashflow.tsx";
import GrowthMetrics from "./pages/GrowthMetrics.tsx";
import DocumentVault from "./pages/DocumentVault.tsx";
import TeamHub from "./pages/TeamHub.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute>{/* Index renders Dashboard */}
              <Index />
            </PrivateRoute>}
          />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/history" element={<History />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/cashflow" element={<Cashflow />} />
          <Route path="/growth-metrics" element={<GrowthMetrics />} />
          <Route path="/document-vault" element={<DocumentVault />} />
          <Route path="/team-hub" element={<TeamHub />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

function PrivateRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  if (auth.loading) return <div className="p-6">Loading...</div>;
  return auth.token ? children : <Navigate to="/" replace />;
}

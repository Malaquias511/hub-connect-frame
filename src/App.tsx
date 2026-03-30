import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Index";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import Leave from "./pages/Leave";
import Evaluations from "./pages/Evaluations";
import HRPortal from "./pages/HRPortal";
import Intranet from "./pages/Intranet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<EmployeeProfile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/evaluations" element={<Evaluations />} />
            <Route path="/hr-portal" element={<HRPortal />} />
            <Route path="/intranet" element={<Intranet />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

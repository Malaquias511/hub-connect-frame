import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Index";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import Leave from "./pages/Leave";
import Evaluations from "./pages/Evaluations";
import HRPortal from "./pages/HRPortal";
import Intranet from "./pages/Intranet";
import Intra from "./pages/Intra";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PortalDocumentacao from "./pages/doc";
import LeaveManagement from "./pages/Ferias"
import EmployeesDirectory from "./pages/StaffDirectory"


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/intra" element={<Intra />} />
          <Route path="/doc" element={<PortalDocumentacao />} />
          <Route path="/staff" element={<EmployeesDirectory />} />
       
          

          {/* Public routes (no auth required) */}
          <Route element={<AppLayout />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<EmployeeProfile />} />
            <Route path="/intranet" element={<Intranet />} />
      
          </Route>

          {/* Protected routes (auth required) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leave2" element={<LeaveManagement />} />
              <Route path="/evaluations" element={<Evaluations />} />
              <Route path="/hr-portal" element={<HRPortal />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

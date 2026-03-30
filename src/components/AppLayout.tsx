import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Users, CalendarDays, ClipboardCheck,
  Newspaper, UserCog, Bell, Search, ChevronDown, Zap
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/employees", icon: Users, label: "Colaboradores" },
  { to: "/leave", icon: CalendarDays, label: "Férias" },
  { to: "/evaluations", icon: ClipboardCheck, label: "Avaliações" },
  { to: "/hr-portal", icon: UserCog, label: "Portal RH" },
  { to: "/intranet", icon: Newspaper, label: "Intranet" },
];

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 sidebar-gradient flex flex-col shrink-0 sticky top-0 h-screen">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Zap className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-sidebar-foreground">PeopleHub</h1>
            <p className="text-xs text-sidebar-muted">EDM · Recursos Humanos</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 mt-2 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-semibold text-sidebar-accent-foreground">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Ana Mondlane</p>
              <p className="text-xs text-sidebar-muted truncate">RH Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-sidebar-muted" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar colaboradores, documentos..."
              className="pl-10 pr-4 py-2 w-80 rounded-lg bg-muted text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

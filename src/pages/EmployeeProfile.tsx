import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Users } from "lucide-react";

const employeesData: Record<string, any> = {
  "1": { name: "Carlos Machel", code: "EDM-0012", department: "Engenharia", role: "Engenheiro Sénior", email: "c.machel@edm.co.mz", phone: "+258 84 123 4567", location: "Maputo", manager: "Ricardo Chissano", team: ["João Tembe", "Sofia Mabunda"], initials: "CM", joinDate: "15 Mar 2018", status: "Activo" },
  "2": { name: "Maria Sitoe", code: "EDM-0045", department: "Finanças", role: "Analista Financeiro", email: "m.sitoe@edm.co.mz", phone: "+258 84 234 5678", location: "Maputo", manager: "Ana Mondlane", team: ["Pedro Cossa"], initials: "MS", joinDate: "02 Jun 2020", status: "Activo" },
  "3": { name: "João Tembe", code: "EDM-0078", department: "Operações", role: "Técnico de Campo", email: "j.tembe@edm.co.mz", phone: "+258 84 345 6789", location: "Beira", manager: "Carlos Machel", team: [], initials: "JT", joinDate: "10 Jan 2019", status: "Activo" },
  "4": { name: "Fatima Nguema", code: "EDM-0091", department: "Recursos Humanos", role: "Especialista RH", email: "f.nguema@edm.co.mz", phone: "+258 84 456 7890", location: "Maputo", manager: "Ana Mondlane", team: [], initials: "FN", joinDate: "22 Sep 2021", status: "Activo" },
  "5": { name: "Pedro Cossa", code: "EDM-0103", department: "TI", role: "Administrador de Sistemas", email: "p.cossa@edm.co.mz", phone: "+258 84 567 8901", location: "Maputo", manager: "Maria Sitoe", team: [], initials: "PC", joinDate: "05 Apr 2017", status: "Activo" },
};

const EmployeeProfile = () => {
  const { id } = useParams();
  const emp = employeesData[id || "1"] || employeesData["1"];

  return (
    <div className="space-y-6">
      <Link to="/employees" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar ao Directório
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <div className="w-24 h-24 rounded-full bg-primary mx-auto flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {emp.initials}
          </div>
          <h2 className="font-heading text-xl font-bold mt-4 text-foreground">{emp.name}</h2>
          <p className="text-sm text-muted-foreground">{emp.code}</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
            {emp.status}
          </div>
          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{emp.department}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{emp.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{emp.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{emp.phone}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="stat-card">
              <p className="text-xs text-muted-foreground">Cargo</p>
              <p className="text-sm font-semibold mt-1 text-foreground">{emp.role}</p>
            </div>
            <div className="stat-card">
              <p className="text-xs text-muted-foreground">Data de Admissão</p>
              <p className="text-sm font-semibold mt-1 text-foreground">{emp.joinDate}</p>
            </div>
            <div className="stat-card">
              <p className="text-xs text-muted-foreground">Localização</p>
              <p className="text-sm font-semibold mt-1 text-foreground">{emp.location}</p>
            </div>
          </div>

          {/* Org Hierarchy */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> Hierarquia Organizacional
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Gestor Directo</p>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {emp.manager.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <span className="text-sm font-medium text-foreground">{emp.manager}</span>
                </div>
              </div>
              {emp.team.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Equipa ({emp.team.length})</p>
                  <div className="space-y-2">
                    {emp.team.map((t: string) => (
                      <div key={t} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                          {t.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm text-foreground">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

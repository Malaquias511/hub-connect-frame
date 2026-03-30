import { Search, Filter, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const employees = [
  { id: "1", name: "Carlos Machel", code: "EDM-0012", department: "Engenharia", role: "Engenheiro Sénior", photo: "CM" },
  { id: "2", name: "Maria Sitoe", code: "EDM-0045", department: "Finanças", role: "Analista Financeiro", photo: "MS" },
  { id: "3", name: "João Tembe", code: "EDM-0078", department: "Operações", role: "Técnico de Campo", photo: "JT" },
  { id: "4", name: "Fatima Nguema", code: "EDM-0091", department: "Recursos Humanos", role: "Especialista RH", photo: "FN" },
  { id: "5", name: "Pedro Cossa", code: "EDM-0103", department: "TI", role: "Administrador de Sistemas", photo: "PC" },
  { id: "6", name: "Ana Mondlane", code: "EDM-0002", department: "Recursos Humanos", role: "Gestora de RH", photo: "AM" },
  { id: "7", name: "Ricardo Chissano", code: "EDM-0156", department: "Engenharia", role: "Engenheiro Eléctrico", photo: "RC" },
  { id: "8", name: "Sofia Mabunda", code: "EDM-0189", department: "Marketing", role: "Coordenadora de Comunicação", photo: "SM" },
];

const departments = ["Todos", "Engenharia", "Finanças", "Operações", "Recursos Humanos", "TI", "Marketing"];

const Employees = () => {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("Todos");

  const filtered = employees.filter(e =>
    (dept === "Todos" || e.department === dept) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.code.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Directório de Colaboradores</h1>
        <p className="text-muted-foreground mt-1">{employees.length} colaboradores registados</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar por nome ou código..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {departments.map(d => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                dept === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(emp => (
          <Link
            key={emp.id}
            to={`/employees/${emp.id}`}
            className="bg-card border border-border rounded-xl p-5 card-hover group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                {emp.photo}
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="mt-4">
              <h3 className="font-heading font-semibold text-foreground">{emp.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{emp.code}</p>
              <div className="mt-3 flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">{emp.department}</span>
                <span className="text-xs font-medium text-foreground">{emp.role}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Employees;

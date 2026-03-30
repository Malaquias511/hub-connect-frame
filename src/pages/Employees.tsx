import { Search, ChevronRight, ChevronDown, Building2, Users, User, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  code: string;
  role: string;
  photo: string;
  email: string;
  phone: string;
}

interface OrgUnit {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  head: string;
  headRole: string;
  employees: Employee[];
  subUnits?: OrgUnit[];
}

const orgStructure: OrgUnit[] = [
  {
    id: "dg",
    name: "Direcção Geral",
    abbreviation: "DG",
    location: "Maputo – Sede",
    head: "Alberto Memory",
    headRole: "Director Geral",
    employees: [
      { id: "1", name: "Alberto Memory", code: "EDM-0001", role: "Director Geral", photo: "AM", email: "a.memory@edm.co.mz", phone: "+258 84 000 0001" },
      { id: "2", name: "Teresa Langa", code: "EDM-0003", role: "Assessora da DG", photo: "TL", email: "t.langa@edm.co.mz", phone: "+258 84 000 0003" },
    ],
    subUnits: [
      {
        id: "drh",
        name: "Direcção de Recursos Humanos",
        abbreviation: "DRH",
        location: "Maputo – Sede",
        head: "Ana Mondlane",
        headRole: "Directora de RH",
        employees: [
          { id: "6", name: "Ana Mondlane", code: "EDM-0002", role: "Directora de RH", photo: "AM", email: "a.mondlane@edm.co.mz", phone: "+258 84 000 0002" },
          { id: "4", name: "Fatima Nguema", code: "EDM-0091", role: "Especialista RH", photo: "FN", email: "f.nguema@edm.co.mz", phone: "+258 84 000 0091" },
          { id: "10", name: "Lídia Cossa", code: "EDM-0210", role: "Técnica de Recrutamento", photo: "LC", email: "l.cossa@edm.co.mz", phone: "+258 84 000 0210" },
        ],
      },
      {
        id: "deng",
        name: "Direcção de Engenharia",
        abbreviation: "DENG",
        location: "Maputo – Sede",
        head: "Carlos Machel",
        headRole: "Director de Engenharia",
        employees: [
          { id: "1b", name: "Carlos Machel", code: "EDM-0012", role: "Director de Engenharia", photo: "CM", email: "c.machel@edm.co.mz", phone: "+258 84 000 0012" },
          { id: "7", name: "Ricardo Chissano", code: "EDM-0156", role: "Engenheiro Eléctrico", photo: "RC", email: "r.chissano@edm.co.mz", phone: "+258 84 000 0156" },
          { id: "11", name: "Tomás Mabjaia", code: "EDM-0220", role: "Engenheiro de Redes", photo: "TM", email: "t.mabjaia@edm.co.mz", phone: "+258 84 000 0220" },
        ],
      },
      {
        id: "dfin",
        name: "Direcção de Finanças",
        abbreviation: "DFIN",
        location: "Maputo – Sede",
        head: "Maria Sitoe",
        headRole: "Directora Financeira",
        employees: [
          { id: "2b", name: "Maria Sitoe", code: "EDM-0045", role: "Directora Financeira", photo: "MS", email: "m.sitoe@edm.co.mz", phone: "+258 84 000 0045" },
          { id: "12", name: "José Bila", code: "EDM-0230", role: "Analista Financeiro", photo: "JB", email: "j.bila@edm.co.mz", phone: "+258 84 000 0230" },
        ],
      },
      {
        id: "dop",
        name: "Direcção de Operações",
        abbreviation: "DOP",
        location: "Maputo – Sede",
        head: "João Tembe",
        headRole: "Director de Operações",
        employees: [
          { id: "3b", name: "João Tembe", code: "EDM-0078", role: "Director de Operações", photo: "JT", email: "j.tembe@edm.co.mz", phone: "+258 84 000 0078" },
          { id: "13", name: "Samuel Macie", code: "EDM-0240", role: "Técnico de Campo", photo: "SM", email: "s.macie@edm.co.mz", phone: "+258 84 000 0240" },
          { id: "14", name: "Benedita Nhamuave", code: "EDM-0241", role: "Supervisora de Linha", photo: "BN", email: "b.nhamuave@edm.co.mz", phone: "+258 84 000 0241" },
        ],
      },
      {
        id: "dti",
        name: "Direcção de Tecnologias de Informação",
        abbreviation: "DTI",
        location: "Maputo – Sede",
        head: "Pedro Cossa",
        headRole: "Director de TI",
        employees: [
          { id: "5b", name: "Pedro Cossa", code: "EDM-0103", role: "Director de TI", photo: "PC", email: "p.cossa@edm.co.mz", phone: "+258 84 000 0103" },
          { id: "15", name: "Elisa Guebuza", code: "EDM-0250", role: "Administradora de Sistemas", photo: "EG", email: "e.guebuza@edm.co.mz", phone: "+258 84 000 0250" },
        ],
      },
      {
        id: "dcom",
        name: "Direcção de Comunicação e Marketing",
        abbreviation: "DCOM",
        location: "Maputo – Sede",
        head: "Sofia Mabunda",
        headRole: "Directora de Comunicação",
        employees: [
          { id: "8b", name: "Sofia Mabunda", code: "EDM-0189", role: "Directora de Comunicação", photo: "SM", email: "s.mabunda@edm.co.mz", phone: "+258 84 000 0189" },
          { id: "16", name: "Nuno Massinga", code: "EDM-0260", role: "Designer Gráfico", photo: "NM", email: "n.massinga@edm.co.mz", phone: "+258 84 000 0260" },
        ],
      },
    ],
  },
];

function countAllEmployees(units: OrgUnit[]): number {
  return units.reduce((sum, u) => sum + u.employees.length + (u.subUnits ? countAllEmployees(u.subUnits) : 0), 0);
}

function flattenUnits(units: OrgUnit[]): OrgUnit[] {
  return units.reduce<OrgUnit[]>((acc, u) => [...acc, u, ...(u.subUnits ? flattenUnits(u.subUnits) : [])], []);
}

const Employees = () => {
  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<OrgUnit | null>(null);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set(["dg"]));

  const allUnits = flattenUnits(orgStructure);
  const totalEmployees = countAllEmployees(orgStructure);

  const filteredUnits = search.trim()
    ? allUnits.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.abbreviation.toLowerCase().includes(search.toLowerCase()) ||
        u.employees.some(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.code.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  const toggleExpand = (id: string) => {
    setExpandedUnits(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderOrgTree = (units: OrgUnit[], depth = 0) => {
    return units.map(unit => {
      const isExpanded = expandedUnits.has(unit.id);
      const isSelected = selectedUnit?.id === unit.id;
      const hasSubUnits = unit.subUnits && unit.subUnits.length > 0;

      return (
        <div key={unit.id} style={{ paddingLeft: depth * 16 }}>
          <button
            onClick={() => {
              setSelectedUnit(unit);
              if (hasSubUnits) toggleExpand(unit.id);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group ${
              isSelected
                ? "bg-primary/10 text-primary border border-primary/20"
                : "hover:bg-muted text-foreground"
            }`}
          >
            {hasSubUnits ? (
              isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            ) : (
              <span className="w-4 shrink-0" />
            )}
            <Building2 className={`w-4 h-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
            <div className="flex-1 text-left min-w-0">
              <span className="font-medium truncate block">{unit.name}</span>
              <span className="text-xs text-muted-foreground">{unit.abbreviation} · {unit.employees.length} colaboradores</span>
            </div>
          </button>
          {hasSubUnits && isExpanded && (
            <div className="mt-0.5">
              {renderOrgTree(unit.subUnits!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Estrutura Organizacional</h1>
          <p className="text-muted-foreground mt-1">{allUnits.length} unidades orgânicas · {totalEmployees} colaboradores</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Pesquisar unidade orgânica ou colaborador..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Search Results */}
      {search.trim() && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            {filteredUnits.length} resultado(s) para "{search}"
          </p>
          {filteredUnits.map(unit => (
            <button
              key={unit.id}
              onClick={() => { setSelectedUnit(unit); setSearch(""); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <Building2 className="w-5 h-5 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{unit.name}</p>
                <p className="text-xs text-muted-foreground">{unit.abbreviation} · {unit.employees.length} colaboradores · {unit.location}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
            </button>
          ))}
          {filteredUnits.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhum resultado encontrado.</p>
          )}
        </div>
      )}

      {/* Main Content: Tree + Detail */}
      {!search.trim() && (
        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          {/* Org Tree */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-1 h-fit lg:sticky lg:top-24 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">Organograma</h2>
            {renderOrgTree(orgStructure)}
          </div>

          {/* Detail Panel */}
          <div className="space-y-6">
            {selectedUnit ? (
              <>
                {/* Unit Header */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-heading font-bold text-foreground">{selectedUnit.name}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{selectedUnit.abbreviation}</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{selectedUnit.location}</span>
                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{selectedUnit.employees.length} colaboradores</span>
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4" />Chefia: {selectedUnit.head}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-units if any */}
                {selectedUnit.subUnits && selectedUnit.subUnits.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sub-unidades ({selectedUnit.subUnits.length})</h3>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {selectedUnit.subUnits.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedUnit(sub)}
                          className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/30 hover:bg-primary/5 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <Building2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{sub.name}</p>
                              <p className="text-xs text-muted-foreground">{sub.employees.length} colaboradores</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Employees Table */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Colaboradores ({selectedUnit.employees.length})
                  </h3>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="text-left px-5 py-3 font-medium text-muted-foreground">Colaborador</th>
                            <th className="text-left px-5 py-3 font-medium text-muted-foreground">Código</th>
                            <th className="text-left px-5 py-3 font-medium text-muted-foreground">Função</th>
                            <th className="text-left px-5 py-3 font-medium text-muted-foreground">Contacto</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedUnit.employees.map(emp => (
                            <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                                    {emp.photo}
                                  </div>
                                  <span className="font-medium text-foreground">{emp.name}</span>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-muted-foreground font-mono text-xs">{emp.code}</td>
                              <td className="px-5 py-4 text-foreground">{emp.role}</td>
                              <td className="px-5 py-4">
                                <div className="flex flex-col gap-1">
                                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Mail className="w-3 h-3" />{emp.email}</span>
                                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="w-3 h-3" />{emp.phone}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-card border border-border rounded-xl p-12 flex flex-col items-center justify-center text-center">
                <Building2 className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <h3 className="font-heading font-semibold text-foreground text-lg">Seleccione uma Unidade Orgânica</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">Clique numa unidade no organograma à esquerda para ver os seus detalhes e colaboradores.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;

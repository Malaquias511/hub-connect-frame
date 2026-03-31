import { Search, ChevronRight, ChevronDown, Building2, Users, User, MapPin, Phone, Mail, Crown, Shield, Briefcase, UserCheck, Wrench } from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  code: string;
  role: string;
  level: "pca" | "administrador" | "director" | "coordenador" | "tecnico" | "operacional";
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

const levelConfig: Record<string, { label: string; icon: typeof Crown; color: string }> = {
  pca: { label: "PCA", icon: Crown, color: "bg-secondary/20 text-secondary-foreground" },
  administrador: { label: "Administrador", icon: Shield, color: "bg-primary/10 text-primary" },
  director: { label: "Director", icon: Briefcase, color: "bg-info/10 text-info" },
  coordenador: { label: "Coordenador", icon: UserCheck, color: "bg-success/10 text-success" },
  tecnico: { label: "Técnico", icon: User, color: "bg-accent text-accent-foreground" },
  operacional: { label: "Operacional", icon: Wrench, color: "bg-muted text-muted-foreground" },
};

const orgStructure: OrgUnit[] = [
  {
    id: "pca",
    name: "Presidência do Conselho de Administração",
    abbreviation: "PCA",
    location: "Maputo – Sede",
    head: "Marcelino Alberto",
    headRole: "Presidente do Conselho de Administração",
    employees: [
      { id: "pca1", name: "Marcelino Alberto", code: "EDM-0001", role: "Presidente do Conselho de Administração", level: "pca", photo: "MA", email: "m.alberto@edm.co.mz", phone: "+258 84 000 0001" },
      { id: "pca2", name: "Teresa Langa", code: "EDM-0003", role: "Assessora do PCA", level: "tecnico", photo: "TL", email: "t.langa@edm.co.mz", phone: "+258 84 000 0003" },
      { id: "pca3", name: "Hélio Maússe", code: "EDM-0004", role: "Secretário do Conselho", level: "tecnico", photo: "HM", email: "h.mausse@edm.co.mz", phone: "+258 84 000 0004" },
    ],
    subUnits: [
      {
        id: "adm-tecnica",
        name: "Administração Técnica",
        abbreviation: "ADM-T",
        location: "Maputo – Sede",
        head: "Carlos Machel",
        headRole: "Administrador Técnico",
        employees: [
          { id: "at1", name: "Carlos Machel", code: "EDM-0010", role: "Administrador Técnico", level: "administrador", photo: "CM", email: "c.machel@edm.co.mz", phone: "+258 84 000 0010" },
        ],
        subUnits: [
          {
            id: "deng",
            name: "Direcção de Engenharia",
            abbreviation: "DENG",
            location: "Maputo – Sede",
            head: "Ricardo Chissano",
            headRole: "Director de Engenharia",
            employees: [
              { id: "de1", name: "Ricardo Chissano", code: "EDM-0012", role: "Director de Engenharia", level: "director", photo: "RC", email: "r.chissano@edm.co.mz", phone: "+258 84 000 0012" },
            ],
            subUnits: [
              {
                id: "deng-proj",
                name: "Coordenação de Projectos",
                abbreviation: "DENG-PROJ",
                location: "Maputo – Sede",
                head: "Tomás Mabjaia",
                headRole: "Coordenador de Projectos",
                employees: [
                  { id: "dep1", name: "Tomás Mabjaia", code: "EDM-0220", role: "Coordenador de Projectos", level: "coordenador", photo: "TM", email: "t.mabjaia@edm.co.mz", phone: "+258 84 000 0220" },
                  { id: "dep2", name: "Amina Djalo", code: "EDM-0221", role: "Técnica de Projectos", level: "tecnico", photo: "AD", email: "a.djalo@edm.co.mz", phone: "+258 84 000 0221" },
                  { id: "dep3", name: "Fernando Zacarias", code: "EDM-0222", role: "Técnico de Desenho", level: "tecnico", photo: "FZ", email: "f.zacarias@edm.co.mz", phone: "+258 84 000 0222" },
                ],
              },
              {
                id: "deng-manut",
                name: "Coordenação de Manutenção",
                abbreviation: "DENG-MNT",
                location: "Maputo – Sede",
                head: "Jorge Namburete",
                headRole: "Coordenador de Manutenção",
                employees: [
                  { id: "dem1", name: "Jorge Namburete", code: "EDM-0230", role: "Coordenador de Manutenção", level: "coordenador", photo: "JN", email: "j.namburete@edm.co.mz", phone: "+258 84 000 0230" },
                  { id: "dem2", name: "Luísa Matavele", code: "EDM-0231", role: "Técnica de Manutenção", level: "tecnico", photo: "LM", email: "l.matavele@edm.co.mz", phone: "+258 84 000 0231" },
                  { id: "dem3", name: "Sérgio Cuamba", code: "EDM-0232", role: "Operador de Campo", level: "operacional", photo: "SC", email: "s.cuamba@edm.co.mz", phone: "+258 84 000 0232" },
                ],
              },
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
              { id: "do1", name: "João Tembe", code: "EDM-0078", role: "Director de Operações", level: "director", photo: "JT", email: "j.tembe@edm.co.mz", phone: "+258 84 000 0078" },
              { id: "do2", name: "Samuel Macie", code: "EDM-0240", role: "Coordenador de Distribuição", level: "coordenador", photo: "SM", email: "s.macie@edm.co.mz", phone: "+258 84 000 0240" },
              { id: "do3", name: "Benedita Nhamuave", code: "EDM-0241", role: "Técnica de Rede", level: "tecnico", photo: "BN", email: "b.nhamuave@edm.co.mz", phone: "+258 84 000 0241" },
              { id: "do4", name: "Moisés Guambe", code: "EDM-0242", role: "Operador de Subestação", level: "operacional", photo: "MG", email: "m.guambe@edm.co.mz", phone: "+258 84 000 0242" },
            ],
          },
        ],
      },
      {
        id: "adm-financeira",
        name: "Administração Financeira",
        abbreviation: "ADM-F",
        location: "Maputo – Sede",
        head: "Maria Sitoe",
        headRole: "Administradora Financeira",
        employees: [
          { id: "af1", name: "Maria Sitoe", code: "EDM-0020", role: "Administradora Financeira", level: "administrador", photo: "MS", email: "m.sitoe@edm.co.mz", phone: "+258 84 000 0020" },
        ],
        subUnits: [
          {
            id: "dfin",
            name: "Direcção de Finanças",
            abbreviation: "DFIN",
            location: "Maputo – Sede",
            head: "José Bila",
            headRole: "Director de Finanças",
            employees: [
              { id: "df1", name: "José Bila", code: "EDM-0045", role: "Director de Finanças", level: "director", photo: "JB", email: "j.bila@edm.co.mz", phone: "+258 84 000 0045" },
              { id: "df2", name: "Celeste Manhiça", code: "EDM-0046", role: "Coordenadora de Contabilidade", level: "coordenador", photo: "CM", email: "c.manhica@edm.co.mz", phone: "+258 84 000 0046" },
              { id: "df3", name: "Ângelo Muthemba", code: "EDM-0047", role: "Técnico de Tesouraria", level: "tecnico", photo: "ÂM", email: "a.muthemba@edm.co.mz", phone: "+258 84 000 0047" },
            ],
          },
          {
            id: "dcom",
            name: "Direcção Comercial",
            abbreviation: "DCOM",
            location: "Maputo – Sede",
            head: "Nuno Massinga",
            headRole: "Director Comercial",
            employees: [
              { id: "dc1", name: "Nuno Massinga", code: "EDM-0060", role: "Director Comercial", level: "director", photo: "NM", email: "n.massinga@edm.co.mz", phone: "+258 84 000 0060" },
              { id: "dc2", name: "Rosa Chibuto", code: "EDM-0061", role: "Coordenadora de Vendas", level: "coordenador", photo: "RC", email: "r.chibuto@edm.co.mz", phone: "+258 84 000 0061" },
              { id: "dc3", name: "Arlindo Pemba", code: "EDM-0062", role: "Técnico de Facturação", level: "tecnico", photo: "AP", email: "a.pemba@edm.co.mz", phone: "+258 84 000 0062" },
            ],
          },
        ],
      },
      {
        id: "adm-rh",
        name: "Administração de Recursos Humanos",
        abbreviation: "ADM-RH",
        location: "Maputo – Sede",
        head: "Ana Mondlane",
        headRole: "Administradora de RH",
        employees: [
          { id: "arh1", name: "Ana Mondlane", code: "EDM-0030", role: "Administradora de RH", level: "administrador", photo: "AM", email: "a.mondlane@edm.co.mz", phone: "+258 84 000 0030" },
        ],
        subUnits: [
          {
            id: "drh",
            name: "Direcção de Recursos Humanos",
            abbreviation: "DRH",
            location: "Maputo – Sede",
            head: "Fatima Nguema",
            headRole: "Directora de RH",
            employees: [
              { id: "drh1", name: "Fatima Nguema", code: "EDM-0091", role: "Directora de RH", level: "director", photo: "FN", email: "f.nguema@edm.co.mz", phone: "+258 84 000 0091" },
              { id: "drh2", name: "Lídia Cossa", code: "EDM-0210", role: "Coordenadora de Recrutamento", level: "coordenador", photo: "LC", email: "l.cossa@edm.co.mz", phone: "+258 84 000 0210" },
              { id: "drh3", name: "Gabriel Macuácua", code: "EDM-0211", role: "Técnico de Formação", level: "tecnico", photo: "GM", email: "g.macuacua@edm.co.mz", phone: "+258 84 000 0211" },
              { id: "drh4", name: "Esperança Nuvunga", code: "EDM-0212", role: "Técnica de Processamento Salarial", level: "tecnico", photo: "EN", email: "e.nuvunga@edm.co.mz", phone: "+258 84 000 0212" },
              { id: "drh4", name: "Rosária Mafume", code: "EDM-0502", role: "Técnica de RH", level: "tecnico", photo: "EN", email: "r.mafume@edm.co.mz", phone: "+258 84 502 31 66" },
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
              { id: "dti1", name: "Pedro Cossa", code: "EDM-0103", role: "Director de TI", level: "director", photo: "PC", email: "p.cossa@edm.co.mz", phone: "+258 84 000 0103" },
              { id: "dti2", name: "Elisa Guebuza", code: "EDM-0250", role: "Coordenadora de Sistemas", level: "coordenador", photo: "EG", email: "e.guebuza@edm.co.mz", phone: "+258 84 000 0250" },
              { id: "dti3", name: "Válter Chongo", code: "EDM-0251", role: "Técnico de Redes", level: "tecnico", photo: "VC", email: "v.chongo@edm.co.mz", phone: "+258 84 000 0251" },
              { id: "dti4", name: "Neusa Magaia", code: "EDM-0252", role: "Técnica de Suporte", level: "tecnico", photo: "NM", email: "n.magaia@edm.co.mz", phone: "+258 84 000 0252" },
            ],
          },
          {
            id: "dcmk",
            name: "Direcção de Comunicação e Marketing",
            abbreviation: "DCMK",
            location: "Maputo – Sede",
            head: "Sofia Mabunda",
            headRole: "Directora de Comunicação",
            employees: [
              { id: "dcm1", name: "Sofia Mabunda", code: "EDM-0189", role: "Directora de Comunicação", level: "director", photo: "SM", email: "s.mabunda@edm.co.mz", phone: "+258 84 000 0189" },
              { id: "dcm2", name: "Cláudio Mazive", code: "EDM-0260", role: "Coordenador de Imprensa", level: "coordenador", photo: "CM", email: "c.mazive@edm.co.mz", phone: "+258 84 000 0260" },
              { id: "dcm3", name: "Diana Nhaca", code: "EDM-0261", role: "Técnica de Design", level: "tecnico", photo: "DN", email: "d.nhaca@edm.co.mz", phone: "+258 84 000 0261" },
            ],
          },
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

function getBreadcrumb(units: OrgUnit[], targetId: string, path: OrgUnit[] = []): OrgUnit[] | null {
  for (const u of units) {
    const newPath = [...path, u];
    if (u.id === targetId) return newPath;
    if (u.subUnits) {
      const found = getBreadcrumb(u.subUnits, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
}

function flattenEmployees(units: OrgUnit[], parent?: OrgUnit): (Employee & { unit: OrgUnit })[] {
    return units.flatMap(u => [
      ...u.employees.map(e => ({ ...e, unit: u })),
      ...(u.subUnits ? flattenEmployees(u.subUnits, u) : []),
    ]);
  }

const Employees = () => {
  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<OrgUnit | null>(null);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set(["pca"]));

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

  const selectUnit = (unit: OrgUnit) => {
    setSelectedUnit(unit);
    // Expand all parents
    const crumb = getBreadcrumb(orgStructure, unit.id);
    if (crumb) {
      setExpandedUnits(prev => {
        const next = new Set(prev);
        crumb.forEach(u => next.add(u.id));
        return next;
      });
    }
  };

  const breadcrumb = selectedUnit ? getBreadcrumb(orgStructure, selectedUnit.id) : null;

  const renderOrgTree = (units: OrgUnit[], depth = 0) => {
    return units.map(unit => {
      const isExpanded = expandedUnits.has(unit.id);
      const isSelected = selectedUnit?.id === unit.id;
      const hasSubUnits = unit.subUnits && unit.subUnits.length > 0;

      return (
        <div key={unit.id} style={{ paddingLeft: depth * 14 }}>
          <button
            onClick={() => {
              selectUnit(unit);
              if (hasSubUnits) toggleExpand(unit.id);
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              isSelected
                ? "bg-primary/10 text-primary border border-primary/20"
                : "hover:bg-muted text-foreground"
            }`}
          >
            {hasSubUnits ? (
              isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            ) : (
              <span className="w-3.5 shrink-0" />
            )}
            <Building2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
            <div className="flex-1 text-left min-w-0">
              <span className="font-medium truncate block text-xs">{unit.abbreviation} – {unit.name}</span>
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

  const LevelBadge = ({ level }: { level: string }) => {
    const config = levelConfig[level];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="px-6 py-6 lg:px-10 lg:py-10 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Staff Directory</h1>
         
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-medium">{allUnits.length} Unidades</span>
          <span className="px-3 py-1.5 bg-success/10 text-success rounded-lg font-medium">{totalEmployees} Colaboradores</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(levelConfig).map(([key, cfg]) => {
          const Icon = cfg.icon;
          return (
            <span key={key} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
              <Icon className="w-3 h-3" /> {cfg.label}
            </span>
          );
        })}
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
              onClick={() => { selectUnit(unit); setSearch(""); }}
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

      {/* Main Content */}
      {!search.trim() && (
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Org Tree */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-1 h-fit lg:sticky lg:top-24 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">Organograma</h2>
            {renderOrgTree(orgStructure)}
          </div>

          {/* Detail Panel */}
          <div className="space-y-6">
            {selectedUnit ? (
              <>
                {/* Breadcrumb */}
                {breadcrumb && breadcrumb.length > 1 && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
                    {breadcrumb.map((b, i) => (
                      <span key={b.id} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight className="w-3 h-3" />}
                        <button
                          onClick={() => selectUnit(b)}
                          className={`hover:text-primary transition-colors ${b.id === selectedUnit.id ? "text-primary font-semibold" : ""}`}
                        >
                          {b.abbreviation}
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Unit Header */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-heading font-bold text-foreground">{selectedUnit.name}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{selectedUnit.abbreviation}</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{selectedUnit.location}</span>
                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{selectedUnit.employees.length} colaboradores</span>
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{selectedUnit.headRole}: {selectedUnit.head}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-units */}
                {selectedUnit.subUnits && selectedUnit.subUnits.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sub-unidades ({selectedUnit.subUnits.length})</h3>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {selectedUnit.subUnits.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => selectUnit(sub)}
                          className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/30 hover:bg-primary/5 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <Building2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{sub.name}</p>
                              <p className="text-xs text-muted-foreground">{sub.abbreviation} · {sub.employees.length} colab.</p>
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
                            <th className="text-left px-5 py-3 font-medium text-muted-foreground">Nível</th>
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
                              <td className="px-5 py-4"><LevelBadge level={emp.level} /></td>
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
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                  Navegue pela hierarquia à esquerda: PCA → Administradores → Directores → Coordenadores → Técnicos
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;

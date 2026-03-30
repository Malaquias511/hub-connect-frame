import { useState } from "react";
import { ClipboardCheck, Star, ChevronDown } from "lucide-react";

const pastEvaluations = [
  { employee: "Carlos Machel", period: "2025 Q4", score: 4.5, status: "Completa", reviewer: "Ricardo Chissano" },
  { employee: "Maria Sitoe", period: "2025 Q4", score: 4.2, status: "Completa", reviewer: "Ana Mondlane" },
  { employee: "João Tembe", period: "2025 Q4", score: 3.8, status: "Completa", reviewer: "Carlos Machel" },
  { employee: "Fatima Nguema", period: "2026 Q1", score: 0, status: "Pendente", reviewer: "Ana Mondlane" },
  { employee: "Pedro Cossa", period: "2026 Q1", score: 0, status: "Pendente", reviewer: "Maria Sitoe" },
];

const criteria = [
  "Qualidade do Trabalho",
  "Pontualidade",
  "Trabalho em Equipa",
  "Iniciativa",
  "Comunicação",
];

const Evaluations = () => {
  const [view, setView] = useState<"manager" | "employee">("manager");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Avaliação de Desempenho</h1>
          <p className="text-muted-foreground mt-1">Avaliar e acompanhar o desempenho dos colaboradores</p>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setView("manager")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === "manager" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Gestor
          </button>
          <button
            onClick={() => setView("employee")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === "employee" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Colaborador
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Evaluation Form */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4" /> Nova Avaliação
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Colaborador</label>
              <div className="relative">
                <select className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground appearance-none outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Fatima Nguema - EDM-0091</option>
                  <option>Pedro Cossa - EDM-0103</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {criteria.map(c => (
              <div key={c}>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{c}</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} className="p-1 hover:scale-110 transition-transform">
                      <Star className={`w-5 h-5 ${s <= 3 ? "fill-secondary text-secondary" : "text-muted"}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Comentários</label>
              <textarea
                rows={3}
                placeholder="Adicionar observações sobre o desempenho..."
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <button className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Submeter Avaliação
            </button>
          </div>
        </div>

        {/* Past Evaluations */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Histórico de Avaliações</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Colaborador</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Período</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Nota</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pastEvaluations.map((ev, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium text-foreground">{ev.employee}</p>
                        <p className="text-xs text-muted-foreground">Por: {ev.reviewer}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{ev.period}</td>
                    <td className="py-3 px-2">
                      {ev.score > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                          <span className="font-medium text-foreground">{ev.score}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <span className={ev.status === "Completa" ? "badge-approved" : "badge-pending"}>
                        {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluations;

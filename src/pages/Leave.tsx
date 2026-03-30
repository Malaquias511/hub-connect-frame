import { useState } from "react";
import { CalendarDays, Plus, X } from "lucide-react";

const leaveRequests = [
  { id: 1, name: "Carlos Machel", type: "Férias Anuais", start: "2026-04-10", end: "2026-04-20", days: 10, status: "approved" },
  { id: 2, name: "Maria Sitoe", type: "Licença Médica", start: "2026-04-05", end: "2026-04-07", days: 2, status: "pending" },
  { id: 3, name: "João Tembe", type: "Férias Anuais", start: "2026-04-15", end: "2026-04-25", days: 10, status: "pending" },
  { id: 4, name: "Fatima Nguema", type: "Licença Pessoal", start: "2026-03-28", end: "2026-03-29", days: 1, status: "rejected" },
  { id: 5, name: "Pedro Cossa", type: "Férias Anuais", start: "2026-05-01", end: "2026-05-12", days: 11, status: "approved" },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// Simulated leave blocks on the calendar
const leaveBlocks = [
  { start: 10, end: 20, name: "CM", color: "bg-success/20 text-success" },
  { start: 5, end: 7, name: "MS", color: "bg-warning/20 text-warning" },
  { start: 15, end: 25, name: "JT", color: "bg-info/20 text-info" },
];

const Leave = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Gestão de Férias</h1>
          <p className="text-muted-foreground mt-1">Gerir pedidos de férias e licenças</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancelar" : "Novo Pedido"}
        </button>
      </div>

      {/* Request Form */}
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h3 className="font-heading font-semibold text-foreground mb-4">Solicitar Férias</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Tipo de Licença</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20">
                <option>Férias Anuais</option>
                <option>Licença Médica</option>
                <option>Licença Pessoal</option>
                <option>Licença de Maternidade</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Data Início</label>
              <input type="date" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Data Fim</label>
              <input type="date" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors">
                Submeter Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Abril 2026
            </h3>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* offset for Wednesday start */}
            {[0, 1].map(i => <div key={`empty-${i}`} />)}
            {calendarDays.map(day => {
              const hasLeave = leaveBlocks.find(b => day >= b.start && day <= b.end);
              return (
                <div
                  key={day}
                  className={`relative aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${
                    hasLeave ? hasLeave.color : "hover:bg-muted text-foreground"
                  } ${day === 30 ? "text-muted-foreground" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
            {leaveBlocks.map(b => (
              <span key={b.name} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded ${b.color.split(" ")[0]}`} /> {b.name}
              </span>
            ))}
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Pedidos Recentes</h3>
          <div className="space-y-3">
            {leaveRequests.map(r => (
              <div key={r.id} className="p-3 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{r.name}</span>
                  <span className={`badge-${r.status}`}>
                    {r.status === "approved" ? "Aprovado" : r.status === "pending" ? "Pendente" : "Rejeitado"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{r.type} · {r.days} dias</p>
                <p className="text-xs text-muted-foreground">{r.start} → {r.end}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;

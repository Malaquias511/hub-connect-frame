import { useState, useMemo } from "react";
import { 
  CalendarDays, Plus, X, CheckCircle, XCircle, AlertTriangle, 
  Users, User, ChevronLeft, ChevronRight, FileText, Bell 
} from "lucide-react";

type LeaveRequest = {
  id: number;
  name: string;
  type: string;
  start: string;
  end: string;
  days: number;
  status: "approved" | "pending" | "rejected";
  unidade: string;
};

const initialRequests: LeaveRequest[] = [
  { id: 1, name: "Carlos Machel", type: "Férias Anuais", start: "2026-04-10", end: "2026-04-25", days: 16, status: "approved", unidade: "Direcção Técnica" },
  { id: 2, name: "Maria Sitoe", type: "Licença Médica", start: "2026-04-05", end: "2026-04-08", days: 4, status: "pending", unidade: "RH" },
  { id: 3, name: "João Tembe", type: "Férias Anuais", start: "2026-04-20", end: "2026-05-02", days: 13, status: "pending", unidade: "Manutenção" },
  { id: 4, name: "Fátima Nguema", type: "Licença Pessoal", start: "2026-04-28", end: "2026-04-29", days: 2, status: "rejected", unidade: "Finanças" },
  { id: 5, name: "Stelio Malaquias", type: "Férias Anuais", start: "2026-04-15", end: "2026-04-22", days: 8, status: "approved", unidade: "Direcção de RH" },
];

const LeaveManagement = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"calendario" | "meu" | "equipa" | "todos">("calendario");
  const [currentMonth, setCurrentMonth] = useState(3); // Abril 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [newRequest, setNewRequest] = useState({
    type: "Férias Anuais",
    start: "",
    end: "",
  });

  const closeModal = () => setSelectedDay(null);

  const handleSubmitRequest = () => {
    if (!newRequest.start || !newRequest.end) return alert("Preencha as datas!");

    const startDate = new Date(newRequest.start);
    const endDate = new Date(newRequest.end);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    if (days > 30) return alert("Máximo de 30 dias!");

    const newReq: LeaveRequest = {
      id: Date.now(),
      name: "Rosária Mafume",
      type: newRequest.type,
      start: newRequest.start,
      end: newRequest.end,
      days,
      status: "pending",
      unidade: "Direcção de RH",
    };

    setRequests(prev => [newReq, ...prev]);
    setShowForm(false);
    setNewRequest({ type: "Férias Anuais", start: "", end: "" });
    alert("Pedido submetido com sucesso!");
  };

  const updateStatus = (id: number, status: "approved" | "rejected") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const pendingRequests = requests.filter(r => r.status === "pending");

  const filteredRequests = useMemo(() => {
    if (activeTab === "meu") return requests.filter(r => r.name === "Rosaria Mafume");
    if (activeTab === "equipa") return requests.filter(r => r.unidade === "Direcção de RH");
    return requests;
  }, [requests, activeTab]);

  const currentMonthRequests = useMemo(() => {
    return requests.filter(req => {
      const sMonth = new Date(req.start).getMonth();
      const eMonth = new Date(req.end).getMonth();
      return sMonth === currentMonth || eMonth === currentMonth;
    });
  }, [requests, currentMonth]);

  const getLeavesForDay = (day: number) => {
    return currentMonthRequests.filter(req => {
      const startDay = new Date(req.start).getDate();
      const endDay = new Date(req.end).getDate();
      return day >= startDay && day <= endDay;
    });
  };

  const handleDayClick = (day: number) => {
    if (getLeavesForDay(day).length > 0) setSelectedDay(day);
  };

  const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const currentMonthName = monthNames[currentMonth];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#003087]">Gestão de Ausências e Férias</h1>
          <p className="text-zinc-600">Planeamento e aprovação de ausências</p>
        </div>

        <div className="flex items-center gap-4">
          {pendingRequests.length > 0 && (
            <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2.5 rounded-2xl font-medium">
              <Bell className="w-5 h-5" />
              {pendingRequests.length} pendente{pendingRequests.length > 1 ? "s" : ""}
            </div>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-3 bg-[#FF9F1C] hover:bg-amber-500 text-[#003087] font-semibold px-6 py-3 rounded-2xl transition-all"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />} Novo Pedido
          </button>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-8">
          <h3 className="font-bold text-xl mb-6">Novo Pedido de Ausência</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Ausência</label>
              <select
                value={newRequest.type}
                onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                className="w-full p-3 border border-zinc-300 rounded-2xl focus:border-[#FF9F1C]"
              >
                <option>Férias Anuais</option>
                <option>Licença Médica</option>
                <option>Licença Pessoal</option>
                <option>Licença de Maternidade</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Data Início</label>
              <input type="date" value={newRequest.start} onChange={(e) => setNewRequest({ ...newRequest, start: e.target.value })} className="w-full p-3 border border-zinc-300 rounded-2xl" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Data Fim</label>
              <input type="date" value={newRequest.end} onChange={(e) => setNewRequest({ ...newRequest, end: e.target.value })} className="w-full p-3 border border-zinc-300 rounded-2xl" />
            </div>
            <div className="flex items-end">
              <button onClick={handleSubmitRequest} className="w-full bg-[#003087] text-white py-3.5 rounded-2xl font-semibold hover:bg-blue-900">
                Submeter Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-zinc-200">
        {[
          { key: "calendario", label: "Calendário", icon: CalendarDays },
          { key: "meu", label: "Meu Plano", icon: User },
          { key: "equipa", label: "Minha Equipa", icon: Users },
          { key: "todos", label: "Todos os Pedidos", icon: FileText },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`flex items-center gap-3 px-8 py-4 font-medium border-b-2 transition-all ${
              activeTab === t.key ? "border-[#FF9F1C] text-[#FF9F1C]" : "border-transparent text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <t.icon className="w-5 h-5" /> {t.label}
          </button>
        ))}
      </div>

      {/* PEDIDOS PENDENTES */}
      {pendingRequests.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-amber-700">
            <AlertTriangle /> Pedidos Pendentes de Aprovação
          </h3>
          <div className="space-y-4">
            {pendingRequests.map((req) => (
              <div key={req.id} className="bg-white p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-semibold">{req.name}</p>
                  <p className="text-sm text-zinc-600">{req.type} • {req.days} dias</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(req.start).toLocaleDateString("pt-MZ")} → {new Date(req.end).toLocaleDateString("pt-MZ")}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => updateStatus(req.id, "approved")} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">Aprovar</button>
                  <button onClick={() => updateStatus(req.id, "rejected")} className="px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700">Reprovar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== CALENDÁRIO ==================== */}
      {activeTab === "calendario" && (
        <>
          <div className="bg-white rounded-3xl border p-8">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setCurrentMonth(m => (m - 1 + 12) % 12)} className="p-3 hover:bg-zinc-100 rounded-xl"><ChevronLeft /></button>
              <h2 className="text-3xl font-bold text-[#003087]">{currentMonthName} 2026</h2>
              <button onClick={() => setCurrentMonth(m => (m + 1) % 12)} className="p-3 hover:bg-zinc-100 rounded-xl"><ChevronRight /></button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(d => (
                <div key={d} className="font-semibold text-zinc-500 py-3">{d}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2;
                if (day < 1 || day > 30) return <div key={i} className="aspect-square" />;

                const leaves = getLeavesForDay(day);
                const hasApproved = leaves.some(l => l.status === "approved");

                return (
                  <div
                    key={i}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square flex items-center justify-center rounded-2xl text-lg font-medium cursor-pointer transition-all border ${
                      hasApproved ? "bg-emerald-100 border-emerald-400 text-emerald-700" : "hover:bg-zinc-50"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAPA MENSAL */}
          <div className="bg-white rounded-3xl border p-8">
            <h3 className="font-bold text-xl mb-6">Mapa de Ausências - {currentMonthName} 2026</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-zinc-100">
                    <th className="text-left p-4 font-semibold w-56">Colaborador</th>
                    {Array.from({ length: 30 }).map((_, i) => (
                      <th key={i} className="text-center p-2 text-xs font-medium w-8 border-x">{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {requests.map(req => {
                    const startDay = new Date(req.start).getDate();
                    const endDay = new Date(req.end).getDate();
                    return (
                      <tr key={req.id} className="hover:bg-zinc-50">
                        <td className="p-4 font-medium">{req.name}</td>
                        {Array.from({ length: 30 }).map((_, i) => {
                          const day = i + 1;
                          const isOnLeave = day >= startDay && day <= endDay;
                          return (
                            <td
                              key={i}
                              className={`text-center p-2 text-xs border-x transition-all ${
                                isOnLeave && req.status === "approved" ? "bg-emerald-100 text-emerald-700 font-bold" : ""
                              }`}
                            >
                              {isOnLeave ? "●" : ""}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Outras Tabs */}
      {(activeTab === "meu" || activeTab === "equipa" || activeTab === "todos") && (
        <div className="bg-white rounded-3xl border overflow-hidden">
          <div className="p-6 border-b bg-zinc-50 font-semibold text-lg">
            {activeTab === "meu" && "Meu Plano de Férias e Ausências"}
            {activeTab === "equipa" && "Ausências da Minha Equipa"}
            {activeTab === "todos" && "Todos os Pedidos"}
          </div>

          <div className="divide-y">
            {filteredRequests.length === 0 ? (
              <p className="p-12 text-center text-zinc-500">Nenhum pedido encontrado.</p>
            ) : (
              filteredRequests.map((req) => (
                <div key={req.id} className="p-6 flex items-center justify-between hover:bg-zinc-50">
                  <div className="flex-1">
                    <p className="font-semibold">{req.name}</p>
                    <p className="text-sm text-zinc-500">{req.unidade} • {req.type}</p>
                    <p className="text-sm text-zinc-600 mt-1">
                      {new Date(req.start).toLocaleDateString("pt-MZ")} → {new Date(req.end).toLocaleDateString("pt-MZ")}
                      <span className="ml-3">({req.days} dias)</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    {req.status === "approved" && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle /> Aprovado</span>}
                    {req.status === "pending" && <span className="text-amber-600 flex items-center gap-1"><AlertTriangle /> Pendente</span>}
                    {req.status === "rejected" && <span className="text-red-600 flex items-center gap-1"><XCircle /> Rejeitado</span>}

                    {req.status === "pending" && (activeTab === "equipa" || activeTab === "todos") && (
                      <div className="flex gap-3">
                        <button onClick={() => updateStatus(req.id, "approved")} className="px-6 py-2.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">Aprovar</button>
                        <button onClick={() => updateStatus(req.id, "rejected")} className="px-6 py-2.5 bg-red-600 text-white rounded-2xl hover:bg-red-700">Reprovar</button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedDay !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6">Ausências - {selectedDay} de {currentMonthName} 2026</h3>
            {getLeavesForDay(selectedDay).map(leave => (
              <div key={leave.id} className="flex justify-between py-4 border-b last:border-0">
                <div>
                  <p className="font-semibold">{leave.name}</p>
                  <p className="text-sm text-zinc-500">{leave.type}</p>
                </div>
                <div className={`px-5 py-1.5 rounded-full text-sm ${leave.status === "approved" ? "bg-emerald-100 text-emerald-700" : leave.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                  {leave.status === "approved" ? "Aprovado" : leave.status === "pending" ? "Pendente" : "Rejeitado"}
                </div>
              </div>
            ))}
            <button onClick={closeModal} className="mt-6 w-full py-3.5 bg-zinc-800 text-white rounded-2xl">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
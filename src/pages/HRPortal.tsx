import { User, FileText, Bell, Save } from "lucide-react";

const notifications = [
  { title: "Férias aprovadas", desc: "O seu pedido de férias para Maio foi aprovado.", time: "Há 1 hora", read: false },
  { title: "Avaliação pendente", desc: "Complete a sua auto-avaliação até 15 de Abril.", time: "Há 3 horas", read: false },
  { title: "Dados actualizados", desc: "Os seus dados de contacto foram actualizados com sucesso.", time: "Há 1 dia", read: true },
  { title: "Novo documento disponível", desc: "Regulamento interno 2026 disponível para download.", time: "Há 2 dias", read: true },
];

const requests = [
  { type: "Alteração de Dados", date: "25 Mar 2026", status: "pending" },
  { type: "Pedido de Férias", date: "20 Mar 2026", status: "approved" },
  { type: "Certificado de Emprego", date: "15 Mar 2026", status: "approved" },
];

const HRPortal = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Portal de Auto-Serviço</h1>
      <p className="text-muted-foreground mt-1">Gerir os seus dados pessoais e pedidos</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Personal Data Form */}
      <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-5 flex items-center gap-2">
          <User className="w-4 h-4" /> Dados Pessoais
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Nome Completo", value: "Ana Maria Mondlane", type: "text" },
            { label: "Email", value: "a.mondlane@edm.co.mz", type: "email" },
            { label: "Telefone", value: "+258 84 987 6543", type: "tel" },
            { label: "Morada", value: "Av. 25 de Setembro, Maputo", type: "text" },
            { label: "Data de Nascimento", value: "1985-06-15", type: "date" },
            { label: "NIF", value: "400123456", type: "text" },
            { label: "Estado Civil", value: "Casada", type: "text" },
            { label: "Contacto de Emergência", value: "+258 84 111 2222", type: "tel" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{f.label}</label>
              <input
                type={f.type}
                defaultValue={f.value}
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}
        </div>
        <button className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Save className="w-4 h-4" /> Guardar Alterações
        </button>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notificações
          </h3>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className={`p-3 rounded-lg ${n.read ? "bg-muted/30" : "bg-accent"}`}>
                <div className="flex items-start gap-2">
                  {!n.read && <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Requests */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Meus Pedidos
          </h3>
          <div className="space-y-3">
            {requests.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.type}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <span className={`badge-${r.status}`}>
                  {r.status === "approved" ? "Aprovado" : "Pendente"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HRPortal;

import { CalendarDays, Users, Clock, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Colaboradores", value: "1,247", icon: Users, change: "+12 este mês", color: "text-primary" },
  { label: "Pedidos Pendentes", value: "23", icon: Clock, change: "5 urgentes", color: "text-secondary" },
  { label: "Férias Aprovadas", value: "45", icon: CalendarDays, change: "Este trimestre", color: "text-success" },
  { label: "Avaliações Pendentes", value: "18", icon: FileText, change: "Prazo: 15 dias", color: "text-info" },
];

const recentActivity = [
  { name: "Carlos Machel", action: "Pedido de férias aprovado", time: "Há 2 horas", status: "approved" },
  { name: "Maria Sitoe", action: "Avaliação de desempenho submetida", time: "Há 3 horas", status: "pending" },
  { name: "João Tembe", action: "Dados pessoais atualizados", time: "Há 5 horas", status: "approved" },
  { name: "Fatima Nguema", action: "Pedido de férias pendente", time: "Há 1 dia", status: "pending" },
  { name: "Pedro Cossa", action: "Pedido de férias rejeitado", time: "Há 1 dia", status: "rejected" },
];

const quickActions = [
  { label: "Solicitar Férias", to: "/leave", icon: CalendarDays },
  { label: "Ver Directório", to: "/employees", icon: Users },
  { label: "Avaliações", to: "/evaluations", icon: FileText },
  { label: "Portal RH", to: "/hr-portal", icon: TrendingUp },
];

const Dashboard = () => (
  <div className="space-y-8">
    {/* Welcome */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="text-2xl font-heading font-bold text-foreground">Bom dia, Ana 👋</h1>
      <p className="text-muted-foreground mt-1">Bem-vinda ao PeopleHub. Aqui está o resumo de hoje.</p>
    </motion.div>

    {/* KPIs */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((s, i) => (
        <motion.div key={s.label} className="stat-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-3xl font-heading font-bold mt-1 text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{s.change}</p>
            </div>
            <div className={`p-3 rounded-xl bg-accent ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Recent Activity */}
      <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-semibold text-foreground">Actividade Recente</h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">Ver tudo <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">
                {a.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.action}</p>
              </div>
              <span className={`badge-${a.status}`}>
                {a.status === "approved" ? "Aprovado" : a.status === "pending" ? "Pendente" : "Rejeitado"}
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold text-foreground mb-5">Acções Rápidas</h2>
        <div className="space-y-3">
          {quickActions.map(a => (
            <Link key={a.to} to={a.to} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
              <div className="p-2 rounded-lg bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <a.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-foreground">{a.label}</span>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;

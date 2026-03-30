import { Newspaper, Calendar, FileText, Search, Clock } from "lucide-react";

const news = [
  { title: "EDM lança programa de electrificação rural", excerpt: "Novo programa visa levar electricidade a 500 comunidades rurais em Moçambique até 2028.", date: "28 Mar 2026", category: "Institucional" },
  { title: "Resultados do 1º Trimestre 2026", excerpt: "A empresa registou um crescimento de 12% na receita comparado com o período homólogo.", date: "25 Mar 2026", category: "Finanças" },
  { title: "Formação em Segurança no Trabalho", excerpt: "Inscrições abertas para a formação obrigatória em segurança e higiene no trabalho.", date: "22 Mar 2026", category: "RH" },
  { title: "Novo sistema de gestão de RH", excerpt: "PeopleHub: a nova plataforma digital de recursos humanos da EDM está agora disponível.", date: "20 Mar 2026", category: "TI" },
];

const events = [
  { title: "Dia do Trabalhador", date: "01 Mai 2026", type: "Feriado" },
  { title: "Workshop de Liderança", date: "10 Abr 2026", type: "Formação" },
  { title: "Reunião Geral Anual", date: "15 Abr 2026", type: "Evento" },
  { title: "Team Building - Departamento de TI", date: "22 Abr 2026", type: "Social" },
];

const documents = [
  { name: "Regulamento Interno 2026", type: "PDF", size: "2.4 MB", date: "15 Mar 2026" },
  { name: "Manual de Segurança", type: "PDF", size: "5.1 MB", date: "10 Mar 2026" },
  { name: "Política de Férias", type: "PDF", size: "890 KB", date: "01 Mar 2026" },
  { name: "Código de Conduta", type: "PDF", size: "1.2 MB", date: "15 Fev 2026" },
  { name: "Organograma EDM 2026", type: "PDF", size: "3.8 MB", date: "01 Jan 2026" },
];

const pastEvents = [
  { title: "Festa de Natal 2025", date: "20 Dez 2025" },
  { title: "Conferência Energética SADC", date: "15 Nov 2025" },
  { title: "Formação em Excel Avançado", date: "01 Out 2025" },
];

const categoryColors: Record<string, string> = {
  Institucional: "bg-primary/10 text-primary",
  Finanças: "bg-success/10 text-success",
  RH: "bg-secondary/20 text-secondary-foreground",
  TI: "bg-info/10 text-info",
};

const Intranet = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Intranet EDM</h1>
      <p className="text-muted-foreground mt-1">Notícias, eventos e documentos internos</p>
    </div>

    {/* News */}
    <section>
      <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
        <Newspaper className="w-4 h-4" /> Notícias e Comunicados
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {news.map((n, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-5 card-hover">
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${categoryColors[n.category] || "bg-muted text-muted-foreground"}`}>
              {n.category}
            </span>
            <h3 className="font-heading font-semibold text-foreground text-sm leading-snug">{n.title}</h3>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{n.excerpt}</p>
            <p className="text-xs text-muted-foreground mt-3">{n.date}</p>
          </div>
        ))}
      </div>
    </section>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Upcoming Events */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Próximos Eventos
        </h3>
        <div className="space-y-3">
          {events.map((e, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent flex flex-col items-center justify-center text-xs shrink-0">
                <span className="font-bold text-accent-foreground">{e.date.split(" ")[0]}</span>
                <span className="text-muted-foreground text-[10px]">{e.date.split(" ")[1]}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{e.title}</p>
                <p className="text-xs text-muted-foreground">{e.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Repository */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Repositório de Documentos
        </h3>
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar documentos..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          {documents.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded bg-destructive/10 flex items-center justify-center text-xs font-bold text-destructive shrink-0">
                  PDF
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.size}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Eventos Passados
        </h3>
        <div className="space-y-3">
          {pastEvents.map((e, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium text-foreground">{e.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{e.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Intranet;

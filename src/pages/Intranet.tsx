import { useState } from "react";
import {
  Newspaper, Calendar, FileText, Search, Clock, ChevronRight,
  BarChart3, Table2, Mail, Megaphone, BookOpen, Download, Star, ArrowRight,
  Zap, Users, ClipboardCheck, CalendarDays
} from "lucide-react";
import edmBanner from "@/assets/edm-banner.jpg";
import edmNews1 from "@/assets/edm-news1.jpg";
import edmNews2 from "@/assets/edm-news2.jpg";

const bannerSlides = [
  { title: "Programa de Electrificação Rural 2026", subtitle: "Levando energia a 500 comunidades em todo o Moçambique", cta: "Saber mais", image: edmBanner },
  { title: "Resultados do 1º Trimestre", subtitle: "Crescimento de 12% na receita — leia o relatório completo", cta: "Ver relatório", image: edmNews1 },
  { title: "Energia Renovável em Expansão", subtitle: "Novos projectos solares e eólicos em 5 províncias", cta: "Explorar", image: edmNews2 },
];

const quickTools = [
  { icon: CalendarDays, label: "Plano de Férias", href: "/leave", color: "bg-info/10 text-info" },
  { icon: ClipboardCheck, label: "Avaliação de Desempenho", href: "/evaluations", color: "bg-success/10 text-success" },
  { icon: Users, label: "Colaboradores", href: "/employees", color: "bg-primary/10 text-primary" },
  { icon: Table2, label: "Tabela de Funções", href: "#", color: "bg-secondary/20 text-secondary-foreground" },
  { icon: BarChart3, label: "Dashboard", href: "/", color: "bg-destructive/10 text-destructive" },
  { icon: Mail, label: "Newsletter", href: "#", color: "bg-accent text-accent-foreground" },
];

const news = [
  { title: "EDM lança programa de electrificação rural", excerpt: "Novo programa visa levar electricidade a 500 comunidades rurais em Moçambique até 2028. O projecto envolve investimentos significativos em infra-estrutura.", date: "28 Mar 2026", category: "Institucional", image: edmBanner, featured: true },
  { title: "Resultados do 1º Trimestre 2026", excerpt: "A empresa registou um crescimento de 12% na receita comparado com o período homólogo.", date: "25 Mar 2026", category: "Finanças", image: edmNews1, featured: false },
  { title: "Formação em Segurança no Trabalho", excerpt: "Inscrições abertas para a formação obrigatória em segurança e higiene no trabalho.", date: "22 Mar 2026", category: "RH", image: null, featured: false },
  { title: "Novo sistema de gestão de RH", excerpt: "PeopleHub: a nova plataforma digital de recursos humanos da EDM está agora disponível para todos.", date: "20 Mar 2026", category: "TI", image: null, featured: false },
  { title: "Expansão da rede em Nampula", excerpt: "Projecto de expansão da rede eléctrica na província de Nampula avança conforme planeado.", date: "18 Mar 2026", category: "Operações", image: edmNews2, featured: false },
  { title: "Dia Internacional da Mulher na EDM", excerpt: "EDM celebrou o Dia Internacional da Mulher com actividades de reconhecimento e workshops.", date: "08 Mar 2026", category: "Social", image: null, featured: false },
];

const newsletters = [
  { title: "Newsletter EDM #24 — Março 2026", date: "01 Mar 2026", size: "1.8 MB" },
  { title: "Newsletter EDM #23 — Fevereiro 2026", date: "01 Fev 2026", size: "2.1 MB" },
  { title: "Newsletter EDM #22 — Janeiro 2026", date: "01 Jan 2026", size: "1.5 MB" },
];

const events = [
  { title: "Dia do Trabalhador", date: "01 Mai 2026", type: "Feriado" },
  { title: "Workshop de Liderança", date: "10 Abr 2026", type: "Formação" },
  { title: "Reunião Geral Anual", date: "15 Abr 2026", type: "Evento" },
  { title: "Team Building — Dep. de TI", date: "22 Abr 2026", type: "Social" },
];

const documents = [
  { name: "Regulamento Interno 2026", type: "PDF", size: "2.4 MB" },
  { name: "Manual de Segurança", type: "PDF", size: "5.1 MB" },
  { name: "Política de Férias", type: "PDF", size: "890 KB" },
  { name: "Código de Conduta", type: "PDF", size: "1.2 MB" },
  { name: "Tabela de Funções 2026", type: "XLSX", size: "780 KB" },
  { name: "Organograma EDM 2026", type: "PDF", size: "3.8 MB" },
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
  Operações: "bg-warning/20 text-warning-foreground",
  Social: "bg-accent text-accent-foreground",
};

const horizontalMenuItems = [
  { label: "Início", active: true },
  { label: "Notícias" },
  { label: "Eventos" },
  { label: "Documentos" },
  { label: "Newsletters" },
  { label: "Contactos" },
];

const Intranet = () => {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [docSearch, setDocSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Início");

  const filteredDocs = docSearch.trim()
    ? documents.filter(d => d.name.toLowerCase().includes(docSearch.toLowerCase()))
    : documents;

  const currentBanner = bannerSlides[bannerIdx];
  const featuredNews = news.find(n => n.featured);
  const regularNews = news.filter(n => !n.featured);

  return (
    <div className="space-y-0 -m-8">
      {/* Horizontal Navigation Bar */}
      <div className="bg-primary px-8 sticky top-16 z-10">
        <div className="flex items-center gap-1 overflow-x-auto">
          {horizontalMenuItems.map(item => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === item.label
                  ? "text-primary-foreground"
                  : "text-primary-foreground/60 hover:text-primary-foreground/80"
              }`}
            >
              {item.label}
              {activeTab === item.label && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-t" />
              )}
            </button>
          ))}
          <div className="ml-auto flex items-center">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" />
              <input
                type="text"
                placeholder="Pesquisar na intranet..."
                className="pl-9 pr-4 py-1.5 w-56 rounded-full bg-primary-foreground/10 text-xs text-primary-foreground placeholder:text-primary-foreground/40 border-0 outline-none focus:bg-primary-foreground/20 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[360px] overflow-hidden">
        <img
          src={currentBanner.image}
          alt={currentBanner.title}
          className="w-full h-full object-cover"
          width={1920}
          height={512}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-12">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider mb-4">
              <Megaphone className="w-3 h-3" /> Destaque
            </span>
            <h1 className="text-3xl font-heading font-bold text-white leading-tight">{currentBanner.title}</h1>
            <p className="text-white/80 mt-3 text-base">{currentBanner.subtitle}</p>
            <button className="mt-6 px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 transition-colors inline-flex items-center gap-2">
              {currentBanner.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Banner dots */}
        <div className="absolute bottom-6 right-12 flex gap-2">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === bannerIdx ? "bg-secondary w-8" : "bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Tools Bar */}
      <div className="bg-card border-b border-border px-8 py-5">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0 mr-2">Acesso Rápido:</span>
          {quickTools.map(tool => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.label}
                href={tool.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors shrink-0"
              >
                <span className={`w-7 h-7 rounded-md flex items-center justify-center ${tool.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-medium text-foreground">{tool.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Featured + Latest News */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-foreground text-lg flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary" /> Notícias e Comunicados
            </h2>
            <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              Ver todas <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
            {/* Featured Article */}
            {featuredNews && (
              <div className="bg-card rounded-xl border border-border overflow-hidden card-hover group cursor-pointer">
                {featuredNews.image && (
                  <div className="h-52 overflow-hidden">
                    <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={512} />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[featuredNews.category] || "bg-muted text-muted-foreground"}`}>
                      {featuredNews.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-secondary-foreground bg-secondary/20 px-2 py-0.5 rounded-full font-medium">
                      <Star className="w-3 h-3" /> Destaque
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-lg leading-snug">{featuredNews.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{featuredNews.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-4">{featuredNews.date}</p>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid gap-3">
              {regularNews.slice(0, 4).map((n, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-4 flex gap-4 card-hover cursor-pointer">
                  {n.image ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img src={n.image} alt={n.title} className="w-full h-full object-cover" loading="lazy" width={80} height={80} />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Newspaper className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryColors[n.category] || "bg-muted text-muted-foreground"}`}>
                        {n.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{n.date}</span>
                    </div>
                    <h4 className="font-heading font-semibold text-foreground text-sm leading-snug">{n.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Column Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-primary/5 px-6 py-4 border-b border-border">
              <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Próximos Eventos
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {events.map((e, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-xs shrink-0">
                    <span className="font-bold text-primary text-sm">{e.date.split(" ")[0]}</span>
                    <span className="text-muted-foreground text-[10px] uppercase">{e.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{e.title}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{e.type}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Past Events */}
            <div className="border-t border-border px-6 py-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Eventos Passados
              </h4>
              {pastEvents.map((e, i) => (
                <div key={i} className="py-2">
                  <p className="text-xs font-medium text-foreground">{e.title}</p>
                  <p className="text-[10px] text-muted-foreground">{e.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Document Repository */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-primary/5 px-6 py-4 border-b border-border">
              <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Repositório de Documentos
              </h3>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pesquisar documentos..."
                  value={docSearch}
                  onChange={e => setDocSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1.5">
                {filteredDocs.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        d.type === "PDF" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                      }`}>
                        {d.type}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                        <p className="text-[10px] text-muted-foreground">{d.size}</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletters & Links */}
          <div className="space-y-6">
            {/* Newsletters */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="bg-primary/5 px-6 py-4 border-b border-border">
                <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Newsletters
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {newsletters.map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{n.title}</p>
                      <p className="text-[10px] text-muted-foreground">{n.date} · {n.size}</p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links vertical menu */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="bg-secondary/10 px-6 py-4 border-b border-border">
                <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary-foreground" /> Links Úteis
                </h3>
              </div>
              <div className="p-2">
                {[
                  { label: "Portal de Auto-Serviço", icon: Users },
                  { label: "Avaliação de Desempenho", icon: ClipboardCheck },
                  { label: "Tabela de Funções", icon: Table2 },
                  { label: "Calendário de Férias", icon: CalendarDays },
                  { label: "Contacto de TI", icon: Mail },
                ].map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <button key={i} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-primary/5 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-heading font-bold text-foreground">Electricidade de Moçambique, E.P.</p>
            <p className="text-xs text-muted-foreground mt-1">Intranet Corporativa — PeopleHub © 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Zap className="w-5 h-5 text-secondary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intranet;

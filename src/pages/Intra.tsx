import { useState, useEffect } from "react";
import {
  Users, Newspaper, Calendar, FileText, Search, Clock, ChevronRight, ChevronLeft,
  Award, Star, TrendingUp, Shield, Lightbulb, Heart, BookOpen, Megaphone,
  ArrowRight, Zap, ClipboardCheck, CalendarDays, Target, UserCheck, Bell, Mail,
  UserMinus, Gift, Mic, AlertTriangle, TrendingUp as TrendIcon,
  Contact2Icon,
  Contact
} from "lucide-react";

const bannerSlides = [
  {
    title: "Bem-vindo à PeopleHub",
    subtitle: "Cuidando das nossas pessoas • Desenvolvendo o nosso talento • Construindo o futuro juntos",
    cta: "Explorar iniciativas 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
  },
  {
    title: "Funcionário do Mês - Março 2026",
    subtitle: "Parabéns à Eng.ª Carla M. Nhantumbo pela excelência e dedicação exemplar!",
    cta: "Ver perfil e história",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076",
  },
  {
    title: "HR Talks: Edição Abril",
    subtitle: "‘Liderança com Propósito’ – com o Diretor de Operações",
    cta: "Inscrever-se agora",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
  },
];

const kpis = [
  { label: "Colaboradores", value: "2.847", change: "+12 este mês", icon: Users, color: "text-blue-600" },
  { label: "Taxa de Retenção", value: "94%", change: "+2%", icon: Heart, color: "text-rose-500" },
  { label: "Satisfação Interna", value: "88%", change: "+5%", icon: Star, color: "text-amber-500" },
  { label: "Engagement Score", value: "82%", change: "+7%", icon: TrendIcon, color: "text-emerald-600" },
  { label: "Treinamentos", value: "47", change: "este trimestre", icon: BookOpen, color: "text-violet-600" },
];

const quickTools = [
  { icon: CalendarDays, label: "Plano de Férias", href: "#/leave2", color: "bg-blue-100 text-blue-700" },
  { icon: ClipboardCheck, label: "Avaliação de Desempenho", href: "#", color: "bg-emerald-100 text-emerald-700" },
  { icon: Contact, label: "Staff Directory", href: "#/staff", color: "bg-violet-100 text-violet-700" },
  { icon: Heart, label: "Bem-Estar & Saúde", href: "#", color: "bg-rose-100 text-rose-700" },
  { icon: Award, label: "Reconhecimentos", href: "#", color: "bg-amber-100 text-amber-700" },
  { icon: FileText, label: "Portal de Documentos", href: "#/doc", color: "bg-sky-100 text-sky-700" },
];

const proximosEventos = [
  { title: "Workshop: Inteligência Emocional para Líderes", data: "08 Abr 2026", local: "Auditório Principal" },
  { title: "Dia da Família EDM", data: "18 Abr 2026", local: "Complexo Desportivo" },
  { title: "Formação: Segurança Psicológica", data: "22 Abr 2026", local: "Online" },
];

const hrTalks = [
  { title: "HR Talks – Liderança com Propósito", data: "10 Abr 2026", speaker: "Eng. António Macamo" },
  { title: "HR Talks – Equilíbrio entre Vida e Trabalho", data: "25 Abr 2026", speaker: "Dra. Isabel Chemane" },
];

const safetyStandDown = {
  title: "Parada de Segurança – Abril 2026",
  tema: "Ergonomia e Prevenção de Lesões Musculares",
  data: "15 Abr 2026 | 10:00 - 11:00",
  descricao: "Momento obrigatório de paragem para reforçar boas práticas de segurança.",
};

const proximosReforma = [
  { nome: "Sr. Manuel A. Cossa", departamento: "Manutenção", idade: "62 anos", data: "Outubro 2027", status: "Planeamento de sucessão iniciado" },
  { nome: "Dra. Fátima M. Sulemane", departamento: "Finanças", idade: "61 anos", data: "Janeiro 2028", status: "Reunião agendada" },
];

const trabalhosAndamento = [
  { titulo: "Revisão do Plano de Sucessão", estado: "Em revisão", responsavel: "Dra. Sofia Langa", progresso: 75 },
  { titulo: "Novo Sistema de Avaliação 360°", estado: "Em testes", responsavel: "Eng. Paulo Chemane", progresso: 45 },
  { titulo: "Programa de Mentoria 2026", estado: "Em execução", responsavel: "Equipe de Desenvolvimento", progresso: 60 },
];

const employeeVoice = [
  "Sugestão: Criar mais espaços de descompressão nas províncias.",
  "Feedback positivo: O novo programa de bem-estar está a fazer diferença!",
];

const Intra = () => {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx((prev) => (prev + 1) % bannerSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  const currentBanner = bannerSlides[bannerIdx];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Nav */}
      <nav className="bg-[#003087] text-white sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
              <img src="https://cdn.prod.website-files.com/657db7118d8a314907c9c6a2/657de198c680bd80d798f5fc_EDM_OG.png" alt="Logo EDM" className="w-8 h-8 object-contain" />
            </div>
            <div>
              
             
            </div>
          </div>

          <div className="flex gap-8 text-sm font-medium">
            {["Início", "Notícias", "Eventos", "Desenvolvimento", "Bem-Estar", "Documentos", "Contactos"].map((item) => (
              <button key={item} className="hover:text-[#FF9F1C] transition-colors">{item}</button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Pesquisar na PeopleHub..."
                className="w-full bg-white/10 border border-white/20 pl-11 pr-4 py-3 rounded-2xl text-sm placeholder:text-white/60 focus:outline-none focus:border-[#FF9F1C]"
              />
            </div>
            <div className="relative w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/20">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF9F1C] rounded-full flex items-center justify-center text-[10px] font-bold">3</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner dinâmico */}
      <div className="relative h-[460px] overflow-hidden">
        <img src={currentBanner.image} alt={currentBanner.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003087]/95 to-transparent" />
        
        <div className="absolute inset-0 flex items-center px-8 md:px-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FF9F1C] text-[#003087] px-5 py-1.5 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Megaphone className="w-5 h-5" /> EM DESTAQUE
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-6">{currentBanner.title}</h1>
            <p className="text-xl text-white/90 mb-10">{currentBanner.subtitle}</p>
            <button className="px-10 py-4 bg-[#FF9F1C] hover:bg-amber-400 text-[#003087] font-semibold rounded-2xl flex items-center gap-3 text-lg transition-all active:scale-95">
              {currentBanner.cta} <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {bannerSlides.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} className={`w-3 h-3 rounded-full transition-all ${i === bannerIdx ? "bg-[#FF9F1C] scale-125" : "bg-white/60"}`} />
          ))}
        </div>
      </div>

      {/* KPIs mais ricos */}
      <div className="bg-white dark:bg-zinc-900 py-8 border-b">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-5 gap-6">
          {kpis.map((kpi, i) => (
            <div key={i} className="flex items-center gap-5 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-3xl hover:shadow-md transition-all">
              <kpi.icon className={`w-12 h-12 ${kpi.color}`} />
              <div>
                <p className="text-4xl font-bold tracking-tighter">{kpi.value}</p>
                <p className="text-zinc-600 dark:text-zinc-400">{kpi.label}</p>
                <p className={`text-sm font-medium ${kpi.color}`}>{kpi.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acesso Rápido */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="text-[#FF9F1C] w-7 h-7" />
          <h2 className="text-2xl font-bold">Acesso Rápido</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {quickTools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <a key={i} href={tool.href} className="group bg-white dark:bg-zinc-900 border hover:border-[#FF9F1C] p-8 rounded-3xl transition-all hover:-translate-y-2 hover:shadow-xl flex flex-col items-center text-center gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${tool.color}`}>
                  <Icon className="w-9 h-9" />
                </div>
                <span className="font-semibold">{tool.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-20 space-y-20">
        {/* Notícias e Circulares */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3"><Newspaper className="text-[#003087]" /> Notícias e Circulares</h2>
            <button className="text-[#003087] flex items-center gap-2 hover:underline">Ver todas <ChevronRight /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Novo Programa de Desenvolvimento de Liderança 2026", date: "28 Mar 2026", category: "Desenvolvimento" },
              { title: "Campanha de Vacinação – 2ª fase", date: "25 Mar 2026", category: "Saúde" },
              { title: "Alterações no Regulamento de Férias", date: "20 Mar 2026", category: "Circular" },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border hover:shadow-md transition-all">
                <div className="text-xs text-[#FF9F1C] font-medium mb-2">{item.category}</div>
                <h4 className="font-semibold text-lg mb-3">{item.title}</h4>
                <p className="text-sm text-zinc-500">{item.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Funcionário do Mês + Próximos Eventos + HR Talks */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Funcionário do Mês */}
          <div className="lg:col-span-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-amber-950 border border-amber-200 rounded-3xl p-10 text-center">
            <Award className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-7xl mb-6 shadow-inner">👏</div>
            <h3 className="text-2xl font-bold">Funcionário do Mês</h3>
            <p className="text-xl font-semibold text-amber-700 mt-1">Eng.ª Carla M. Nhantumbo</p>
            <p className="text-zinc-600 dark:text-zinc-400">Departamento de Formação • Maputo</p>
          </div>

          {/* Próximos Eventos + HR Talks */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-8 border space-y-8">
            <div>
              <h3 className="font-bold text-2xl mb-6 flex items-center gap-3"><Calendar className="text-[#003087]" /> Próximos Eventos</h3>
              {proximosEventos.map((evt, i) => (
                <div key={i} className="flex gap-6 border-l-4 border-[#FF9F1C] pl-6 py-3">
                  <div className="text-sm font-medium text-[#FF9F1C] min-w-[80px]">{evt.data}</div>
                  <div>
                    <p className="font-semibold">{evt.title}</p>
                    <p className="text-sm text-zinc-500">{evt.local}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-4 flex items-center gap-3"><Mic className="text-purple-600" /> HR Talks</h3>
              {hrTalks.map((talk, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-t">
                  <div>
                    <p className="font-medium">{talk.title}</p>
                    <p className="text-sm text-zinc-500">Com {talk.speaker}</p>
                  </div>
                  <button className="text-xs bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200">Inscrever</button>
                </div>
              ))}
            </div>
          </div>

          {/* Parada de Segurança */}
          <div className="lg:col-span-3 bg-gradient-to-br from-red-50 to-orange-50 dark:from-zinc-900 dark:to-red-950 border border-red-200 rounded-3xl p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-600 w-8 h-8" />
              <h3 className="font-bold text-2xl">Parada de Segurança</h3>
            </div>
            <p className="font-semibold text-lg">{safetyStandDown.title}</p>
            <p className="text-red-700 dark:text-red-400 mt-1">{safetyStandDown.tema}</p>
            <p className="mt-4 text-sm">{safetyStandDown.data}</p>
            <p className="mt-auto text-sm italic">{safetyStandDown.descricao}</p>
            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-medium">Confirmar Participação</button>
          </div>
        </div>

        {/* Colaboradores Próximos à Reforma */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border">
          <div className="flex items-center gap-3 mb-8">
            <UserMinus className="text-amber-600 w-8 h-8" />
            <div>
              <h3 className="font-bold text-2xl">Colaboradores Próximos à Reforma</h3>
              <p className="text-sm text-zinc-500">Acompanhe e prepare a sucessão com antecedência</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {proximosReforma.map((col, i) => (
              <div key={i} className="border-l-4 border-amber-500 pl-6 py-2 bg-amber-50 dark:bg-zinc-800 rounded-r-2xl">
                <p className="font-semibold">{col.nome}</p>
                <p className="text-sm text-zinc-600">{col.departamento} • {col.idade}</p>
                <p className="text-xs text-amber-700 mt-1">Reforma prevista: {col.data}</p>
                <div className="mt-4 text-xs bg-white dark:bg-zinc-700 px-4 py-2 rounded-lg inline-block">
                  {col.status}
                </div>
                <button className="mt-4 text-xs text-amber-600 flex items-center gap-1 hover:underline">Iniciar plano de sucessão <ArrowRight className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Trabalhos em Andamento + Dicas */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border">
            <h3 className="font-bold text-2xl mb-6 flex items-center gap-3"><Target className="text-[#FF9F1C]" /> Trabalhos em Andamento</h3>
            <div className="space-y-7">
              {trabalhosAndamento.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-6 last:border-0">
                  <div>
                    <p className="font-medium">{item.titulo}</p>
                    <p className="text-sm text-zinc-500">Por: {item.responsavel}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-4 py-1 text-xs rounded-full bg-blue-100 text-blue-700">{item.estado}</span>
                    <div className="mt-3 h-2 bg-zinc-200 rounded-full w-32 overflow-hidden">
                      <div className="h-full bg-[#FF9F1C]" style={{ width: `${item.progresso}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border">
            <h3 className="font-bold text-2xl mb-6 flex items-center gap-3"><Shield className="text-emerald-600" /> Dicas de Segurança & Bem-Estar</h3>
            <ul className="space-y-5">
              {[
                "Faça pausas ativas a cada 90 minutos para alongamento",
                "Mantenha a sua password forte e ativa a autenticação de dois fatores",
                "Reporte qualquer risco de segurança imediatamente",
                "Pratique gratidão diária para melhorar o bem-estar emocional",
              ].map((dica, i) => (
                <li key={i} className="flex gap-4">
                  <Lightbulb className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <p>{dica}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Employee Voice + Leave Donation + Newsletters */}

        
        <div className="grid lg:grid-cols-3 gap-8">
         

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border">
            <h3 className="font-bold text-xl mb-6">Employee Voice</h3>
            {employeeVoice.map((msg, i) => (
              <div key={i} className="italic border-l-4 border-zinc-300 pl-5 py-3 text-sm">“{msg}”</div>
            ))}
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border">
            <h3 className="font-bold text-2xl mb-6 flex items-center gap-3"><Mail className="text-sky-600" /> Newsletters</h3>
            {[
              { title: "PeopleHub Newsletter – Março 2026", date: "30 Mar 2026" },
              { title: "Bem-Estar no Trabalho: Edição Especial", date: "18 Mar 2026" },
            ].map((nl, i) => (
              <a key={i} href="#" className="block py-4 border-b last:border-0 hover:text-[#FF9F1C]">
                <p className="font-medium">{nl.title}</p>
                <p className="text-xs text-zinc-500">{nl.date}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003087] text-white/80 py-12">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <Users className="w-9 h-9 text-[#FF9F1C]" />
              <span className="font-bold text-3xl">PeopleHub</span>
            </div>
            <p className="text-sm">Recursos Humanos • Electricidade de Moçambique, E.P.</p>
          </div>
          <div className="text-sm">© 2026 EDM • Versão 2.3 • Março 2026</div>
          <div className="text-sm md:text-right">
            Suporte RH: ext. 1200<br />
            Bem-Estar: ext. 1210<br />
            rh@edm.co.mz
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Intra;
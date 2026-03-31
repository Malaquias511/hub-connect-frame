import { useState, useMemo } from "react";
import {
  Search, FileText, Download, Filter, BookOpen, Shield, ClipboardList,
  Award, FolderOpen, ArrowLeft, ExternalLink,Clock
} from "lucide-react";

type Documento = {
  id: string;
  codigo: string;
  titulo: string;
  categoria: string;
  data: string;
  palavrasChave: string[];
  descricao: string;
  arquivoUrl: string; // link para abrir em nova aba
  unidade?: string;
};

const todosDocumentos: Documento[] = [
  {
    id: "1",
    codigo: "POL-RH-001/2025",
    titulo: "Política de Férias e Ausências",
    categoria: "Políticas",
    data: "15 Mar 2026",
    palavrasChave: ["férias", "ausências", "férias anuais"],
    descricao: "Regulamento interno de concessão, marcação e gozo de férias.",
    arquivoUrl: "https://example.com/docs/POL-RH-001.pdf",
    unidade: "Direcção de RH",
  },
  {
    id: "2",
    codigo: "NOR-RH-012/2026",
    titulo: "Normativo de Recrutamento e Seleção",
    categoria: "Normativos",
    data: "28 Fev 2026",
    palavrasChave: ["recrutamento", "seleção", "contratação"],
    descricao: "Regras e procedimentos para recrutamento interno e externo.",
    arquivoUrl: "https://example.com/docs/NOR-RH-012.pdf",
    unidade: "Departamento de Talentos",
  },
  {
    id: "3",
    codigo: "OS-RH-045/2026",
    titulo: "Ordem de Serviço - Campanha de Avaliação de Desempenho",
    categoria: "Ordens de Serviço",
    data: "20 Mar 2026",
    palavrasChave: ["avaliação", "desempenho", "KPI"],
    descricao: "Instruções para a realização da avaliação do 1º trimestre 2026.",
    arquivoUrl: "https://example.com/docs/OS-RH-045.pdf",
  },
  {
    id: "4",
    codigo: "MAN-RH-008/2025",
    titulo: "Manual de Onboarding e Integração de Novos Colaboradores",
    categoria: "Manuais de Formação",
    data: "10 Jan 2026",
    palavrasChave: ["onboarding", "integração", "novos colaboradores"],
    descricao: "Guia completo para acolhimento e formação inicial.",
    arquivoUrl: "https://example.com/docs/MAN-RH-008.pdf",
  },
  {
    id: "5",
    codigo: "CIR-RH-019/2026",
    titulo: "Circular - Atualização do Código de Conduta",
    categoria: "Diversos",
    data: "05 Mar 2026",
    palavrasChave: ["código de conduta", "ética", "valores"],
    descricao: "Atualizações importantes ao código de ética empresarial.",
    arquivoUrl: "https://example.com/docs/CIR-RH-019.pdf",
  },
  {
    id: "6",
    codigo: "POL-RH-002/2026",
    titulo: "Política de Bem-Estar e Saúde Ocupacional",
    categoria: "Políticas",
    data: "01 Mar 2026",
    palavrasChave: ["bem-estar", "saúde ocupacional", "segurança"],
    descricao: "Programa integrado de saúde física e mental dos colaboradores.",
    arquivoUrl: "https://example.com/docs/POL-RH-002.pdf",
  },
];

const categorias = ["Todas", "Políticas", "Normativos", "Ordens de Serviço", "Manuais de Formação", "Diversos"];

const PortalDocumentacao = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedUnidade, setSelectedUnidade] = useState("Todas");

  const filteredDocs = useMemo(() => {
    return todosDocumentos.filter((doc) => {
      const term = searchTerm.toLowerCase().trim();

      const matchSearch =
        !term ||
        doc.codigo.toLowerCase().includes(term) ||
        doc.titulo.toLowerCase().includes(term) ||
        doc.descricao.toLowerCase().includes(term) ||
        doc.palavrasChave.some((kw) => kw.toLowerCase().includes(term));

      const matchCategory = selectedCategory === "Todas" || doc.categoria === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleOpenDocument = (url: string, titulo: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header da página */}
      <div className="bg-[#003087] text-white py-6">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 hover:text-[#FF9F1C] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar à Intranet</span>
            </button>
            <div className="h-8 w-px bg-white/30" />
            <div>
              <h1 className="text-3xl font-bold">Portal de Documentação RH</h1>
              <p className="text-white/70 text-sm">Central de Normativos, Políticas e Manuais</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="bg-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              <span>{filteredDocs.length} documentos encontrados</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Barra de Pesquisa Avançada */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Pesquisar por código (ex: POL-RH-001), título ou palavra-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 focus:border-[#FF9F1C] outline-none text-lg"
              />
            </div>

            <div className="flex gap-3">
              {/* Filtro por Categoria */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-[#FF9F1C]"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Filtro futuro por Unidade (já preparado) */}
              <select
                value={selectedUnidade}
                onChange={(e) => setSelectedUnidade(e.target.value)}
                className="px-6 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-[#FF9F1C]"
              >
                <option value="Todas">Todas as Unidades</option>
                <option value="Direcção de RH">Direcção de RH</option>
                <option value="Departamento de Talentos">Departamento de Talentos</option>
                <option value="Departamento de Formação">Departamento de Formação</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => handleOpenDocument(doc.arquivoUrl, doc.titulo)}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-6 hover:border-[#FF9F1C] hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-4 py-1 text-xs font-medium bg-[#FF9F1C]/10 text-[#FF9F1C] rounded-full">
                  {doc.categoria}
                </span>
                <span className="text-xs text-zinc-500 font-mono">{doc.codigo}</span>
              </div>

              <h3 className="font-semibold text-xl leading-tight mb-3 group-hover:text-[#FF9F1C] transition-colors">
                {doc.titulo}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-6">
                {doc.descricao}
              </p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-500">
                  <FileText className="w-4 h-4" />
                  <span>{doc.data}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDocument(doc.arquivoUrl, doc.titulo);
                  }}
                  className="flex items-center gap-2 bg-[#003087] text-white px-5 py-2.5 rounded-2xl text-sm hover:bg-[#FF9F1C] hover:text-[#003087] transition-all"
                >
                  <span>Abrir documento</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-20 text-zinc-400">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-xl">Nenhum documento encontrado</p>
            <p className="text-sm">Tente ajustar os termos de pesquisa</p>
          </div>
        )}

        {/* Documentos Recentes */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Clock className="text-[#FF9F1C]" /> Documentos Mais Recentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {todosDocumentos.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleOpenDocument(doc.arquivoUrl, doc.titulo)}
                className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border hover:border-[#FF9F1C] cursor-pointer"
              >
                <FileText className="w-10 h-10 text-[#003087]" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{doc.titulo}</p>
                  <p className="text-xs text-zinc-500">{doc.codigo} • {doc.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalDocumentacao;
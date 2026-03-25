import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, BookOpen, Users, ChevronDown, ChevronUp, GraduationCap, Layers } from "lucide-react";
import cursosData from "../cursos.json";

interface Licao {
  // just strings
}

interface Modulo {
  ordem: number;
  titulo: string;
  licoes: string[];
}

interface Curso {
  id: string;
  titulo: string;
  categoria: string;
  publico_alvo: string;
  descricao: string;
  modulos: Modulo[];
}

const cursos: Curso[] = cursosData as Curso[];

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Saúde Geral":          { bg: "bg-emerald-50",  text: "text-emerald-700",  dot: "bg-emerald-400" },
  "Higiene e Dignidade":  { bg: "bg-sky-50",       text: "text-sky-700",      dot: "bg-sky-400" },
  "Saúde Reprodutiva":    { bg: "bg-violet-50",    text: "text-violet-700",   dot: "bg-violet-400" },
  "Inclusão Social":      { bg: "bg-amber-50",     text: "text-amber-700",    dot: "bg-amber-400" },
  "Direitos e Proteção":  { bg: "bg-rose-50",      text: "text-rose-700",     dot: "bg-rose-400" },
  "Ciclos de Vida":       { bg: "bg-pink-50",      text: "text-pink-700",     dot: "bg-pink-400" },
  "Capacitação Profissional": { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-400" },
  "Inclusão e Direitos":  { bg: "bg-teal-50",      text: "text-teal-700",     dot: "bg-teal-400" },
  "Educação e Psicologia":{ bg: "bg-orange-50",    text: "text-orange-700",   dot: "bg-orange-400" },
  "Saúde Clínica":        { bg: "bg-red-50",       text: "text-red-700",      dot: "bg-red-400" },
  "Saúde e Direitos":     { bg: "bg-fuchsia-50",   text: "text-fuchsia-700",  dot: "bg-fuchsia-400" },
  "Saúde Intercultural":  { bg: "bg-lime-50",      text: "text-lime-700",     dot: "bg-lime-400" },
};

function getCategoryStyle(cat: string) {
  return categoryColors[cat] ?? { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" };
}

function ModuloAccordion({ modulo, index }: { modulo: Modulo; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
            {modulo.ordem}
          </span>
          <span className="font-semibold text-sm text-gray-900">{modulo.titulo}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="p-4 space-y-2.5 bg-white">
              {modulo.licoes.map((licao, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600 leading-relaxed">{licao}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CursoModal({ curso, onClose }: { curso: Curso; onClose: () => void }) {
  const style = getCategoryStyle(curso.categoria);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="relative bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-7 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {curso.categoria}
            </span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-900 mb-3 leading-tight">
            {curso.titulo}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">{curso.descricao}</p>
          <div className="flex items-center gap-2 mt-4">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">{curso.publico_alvo}</span>
          </div>
        </div>

        {/* Módulos scrollable */}
        <div className="p-7 overflow-y-auto space-y-3 flex-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            {curso.modulos.length} Módulos
          </h3>
          {curso.modulos.map((mod, i) => (
            <ModuloAccordion key={mod.ordem} modulo={mod} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CursoCard({ curso, onClick }: { curso: Curso; onClick: () => void }) {
  const style = getCategoryStyle(curso.categoria);
  const totalLicoes = curso.modulos.reduce((acc, m) => acc + m.licoes.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group bg-white border border-gray-100 rounded-[24px] p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
    >
      {/* Category badge */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${style.bg} ${style.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {curso.categoria}
        </span>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Title + desc */}
      <div className="flex-1">
        <h3 className="font-serif font-bold text-lg leading-snug text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
          {curso.titulo}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{curso.descricao}</p>
      </div>

      {/* Footer stats */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Layers className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{curso.modulos.length} módulos</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{totalLicoes} lições</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AprendizagemPage() {
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(cursos.map(c => c.categoria)));

  const filtered = cursos.filter(c => {
    const matchSearch = c.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory ? c.categoria === activeCategory : true;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Voltar
          </Link>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-bold tracking-tight">Área de Aprendizagem</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">{cursos.length} cursos</span>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-violet-50" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.4em] text-pink-500 mb-5">
              Plataforma Educativa NDINGA
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1] text-gray-900 mb-6">
              Conhecimento que<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                transforma.
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
              Cursos sobre saúde sexual, reprodutiva e higiene menstrual para todas as mulheres.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 max-w-md mx-auto"
          >
            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar cursos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-400 transition-all shadow-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === null
                ? "bg-black text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            Todos ({cursos.length})
          </button>
          {categories.map(cat => {
            const style = getCategoryStyle(cat);
            const count = cursos.filter(c => c.categoria === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? `${style.bg} ${style.text} shadow-md`
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Course Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Nenhum curso encontrado</p>
            <p className="text-sm mt-1">Tente outra pesquisa ou categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(curso => (
              <CursoCard
                key={curso.id}
                curso={curso}
                onClick={() => setSelectedCurso(curso)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCurso && (
          <CursoModal
            curso={selectedCurso}
            onClose={() => setSelectedCurso(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

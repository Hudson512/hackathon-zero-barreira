import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, PlayCircle, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import OpenAI from "openai";

import cursosData from "../cursos.json";

interface Licao {
  // mapped as strings in json
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

// Initialize OpenAI client for Groq
const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true, // Required to call from frontend
});

export default function SalaDeAulaPage() {
  const { cursoId, moduloIndex } = useParams();
  const navigate = useNavigate();
  
  const curso = cursos.find(c => c.id === cursoId);
  const activeModuleIndex = parseInt(moduloIndex || "0", 10);
  
  const [content, setContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!curso) return;
    const modulo = curso.modulos[activeModuleIndex];
    if (!modulo) return;

    generateContent(curso, modulo);

    // Cleanup on unmount or module change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [cursoId, activeModuleIndex]);

  const generateContent = async (curso: Curso, modulo: Modulo) => {
    // Cancel previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setContent("");
    setIsGenerating(true);
    setError(null);

    // Sleep artificial (remover bugs de clique duplo/rápido e mostrar loading)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check API Key
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      setError("Chave da API do Groq não configurada. Defina VITE_GROQ_API_KEY no arquivo .env");
      setIsGenerating(false);
      return;
    }

    const prompt = `Atues como um professor especialista em saúde e educação.
    
Estou a estudar o curso: "${curso.titulo}"
Categoria: ${curso.categoria}
Público Alvo: ${curso.publico_alvo}

O módulo actual é: Módulo ${modulo.ordem} - "${modulo.titulo}"

Os tópicos desta lição são:
${modulo.licoes.map(l => `- ${l}`).join('\n')}

Gera um conteúdo educativo detalhado, didático e acolhedor para a página da sala de aula. 
Formata a resposta em Markdown bem estruturado, utilizando títulos (##), listas e negrito onde apropriado.
- Começa com uma breve introdução entusiasmante.
- Desenvolve cada um dos tópicos listados com rigor, clareza e empatia (lembra-te do público alvo).
- Inclui um pequeno "Desafio prático" ou "Reflexão" no final.
- Escreve em Português (PT-PT ou PT-BR dependendo do contexto da NDINGA, mas focado na lusofonia Africana se aplicável, tom amigável e profissional).
`;

    try {
      const stream = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        stream: true,
      }, { signal: abortControllerRef.current.signal });

      let accumulated = "";
      for await (const chunk of stream) {
        if (abortControllerRef.current?.signal.aborted) break;
        const delta = chunk.choices[0]?.delta?.content || "";
        accumulated += delta;
        setContent(accumulated);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError' && err.name !== 'APIUserAbortError' && !err.message?.includes('aborted')) {
        console.error("Erro na geração:", err);
        setError(err.message || "Ocorreu um erro ao gerar o conteúdo.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!curso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <h2 className="text-xl font-bold">Curso não encontrado</h2>
        <Link to="/aprender" className="text-pink-500 hover:underline">Voltar à Área de Aprendizagem</Link>
      </div>
    );
  }

  // Line-by-line Markdown parser for safe rendering during streaming
  const renderMarkdown = (text: string) => {
    // Process inline bold/italic
    const processInline = (str: string) => {
      const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-black font-bold font-sans">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={j} className="text-black italic font-sans">{part.slice(1, -1)}</em>;
        }
        return part;
      });
    };

    // Normalize newlines and split into blocks
    // We replace single newlines followed by text with double newlines if it's after a header
    let normalized = text.replace(/^(#+\s.*)\n([^\n])/gm, "$1\n\n$2");
    
    const blocks = normalized.split(/\n\n+/);
    
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold mt-6 mb-3 text-black font-sans">{processInline(trimmed.replace('### ', ''))}</h3>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4 text-black border-b border-gray-100 pb-2 font-sans">{processInline(trimmed.replace('## ', ''))}</h2>;
      }
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4 text-black font-sans">{processInline(trimmed.replace('# ', ''))}</h1>;
      }
      
      // Handle lists
      if (trimmed.split('\n').every(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
        const items = trimmed.split('\n').map(line => line.trim().replace(/^[-*]\s/, ''));
        return (
          <ul key={idx} className="list-disc list-outside ml-6 mb-4 space-y-2 text-black leading-relaxed font-sans">
            {items.map((item, i) => (
              <li key={i}>{processInline(item)}</li>
            ))}
          </ul>
        );
      }

      // Regular paragraph
      return (
        <p key={idx} className="mb-4 text-black leading-relaxed text-lg break-words font-sans">
           {processInline(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
      {/* Top Navbar */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <Link 
            to="/aprender" 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 px-2 py-1 rounded-md">
              Sala de Aula
            </span>
            <h1 className="text-sm font-semibold text-gray-900 hidden md:block">
              {curso.titulo}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar (Modules) */}
        <aside className="w-80 bg-gray-50 border-r border-gray-100 flex flex-col hidden md:flex overflow-y-auto">
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Conteúdo do Curso
            </p>
            <div className="space-y-2">
              {curso.modulos.map((mod, idx) => {
                const isActive = idx === activeModuleIndex;
                return (
                  <button
                    key={mod.ordem}
                    onClick={() => navigate(`/sala/${curso.id}/${idx}`)}
                    className={`w-full text-left p-4 rounded-2xl transition-all ${
                      isActive 
                      ? "bg-white border-2 border-pink-500 shadow-sm" 
                      : "bg-transparent border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                        isActive ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-500"
                      }`}>
                        {mod.ordem}
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold mb-1 ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                          {mod.titulo}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <PlayCircle className="w-3 h-3" />
                          <span>{mod.licoes.length} lições</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Lesson Content Area */}
        <main className="flex-1 bg-white overflow-y-auto w-full custom-scrollbar relative scroll-smooth">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
            
            {/* Header of the current module */}
            <motion.div 
              key={`header-${activeModuleIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                {curso.modulos[activeModuleIndex]?.titulo}
              </h1>
              <p className="text-lg text-gray-500 flex items-center gap-2">
                Módulo {curso.modulos[activeModuleIndex]?.ordem} <ChevronRight className="w-4 h-4" /> {curso.titulo}
              </p>
            </motion.div>

            {/* Error State */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl mb-8 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* AI Generated Content */}
            <div className="prose prose-lg max-w-none prose-pink prose-headings:font-serif">
               {content ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   {renderMarkdown(content)}
                 </motion.div>
               ) : isGenerating ? (
                 <div className="flex items-center gap-3 text-pink-500 mt-10">
                   <Loader2 className="w-6 h-6 animate-spin" />
                   <span className="font-medium animate-pulse">A IA da NDINGA está a preparar esta aula...</span>
                 </div>
               ) : null}

               {isGenerating && content.length > 0 && (
                 <div className="mt-8">
                   <span className="inline-block w-3 h-5 bg-pink-400 animate-pulse" />
                 </div>
               )}
            </div>

            {/* Bottom Navigation */}
            <div className="mt-20 pt-8 border-t border-gray-100 flex items-center justify-between">
              {activeModuleIndex > 0 ? (
                <button
                  onClick={() => navigate(`/sala/${curso.id}/${activeModuleIndex - 1}`)}
                  className="px-6 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Módulo Anterior
                </button>
              ) : <div />}

              {activeModuleIndex < curso.modulos.length - 1 && (
                <button
                  onClick={() => navigate(`/sala/${curso.id}/${activeModuleIndex + 1}`)}
                  className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-medium transition-colors flex items-center gap-2"
                >
                  Próximo Módulo <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

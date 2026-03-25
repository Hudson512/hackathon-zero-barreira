/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ShoppingCart, ArrowRight, ChevronDown, ShieldCheck, Droplets, Leaf, Layers, Wind, Heart } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-pink-100 scroll-smooth">
      {/* Navigation */}
      

      {/* Hero Section */}
      <section id="design" className="relative pt-32 px-8 md:px-20 min-h-screen flex flex-col md:flex-row items-center justify-between overflow-hidden">
        
        {/* Background Video (Full Screen) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
          >
            <source src="/oficial32.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Left Content */}
        <div className="z-10 max-w-2xl">
          
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif font-bold tracking-tight leading-[0.9] mb-8"
          >
            Tecnologia que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">se adapta</span> <br />
            a ti.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl opacity-60 max-w-md leading-relaxed mb-10"
          >
            Proteção de alta performance, fixação inclusiva e monitorização inteligente. 
            O futuro do cuidado menstrual é reutilizável, tecnológico e para todas as mulheres.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform group">
              Comprar Agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#tecnologia" className="px-8 py-4 bg-white border border-black/10 rounded-full font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
              Explorar <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Center/Right Product Image (Floating) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full md:w-1/2 h-[500px] flex items-center justify-center mt-20 md:mt-0"
        >
          {/* Abstract Circle behind product */}
          <div className="absolute w-[400px] h-[400px] border border-black/5 rounded-full animate-[spin_20s_linear_infinite]" />
          
          {/* Product Image Placeholder */}
         

          {/* Feature Cards floating on the right */}
         
        </motion.div>
      </section>

      {/* Technology Section (Layers) */}
      <section id="tecnologia" className="py-32 px-8 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] opacity-30 mb-4">Arquitetura de Proteção</h2>
            <p className="text-4xl md:text-5xl font-serif font-bold tracking-tight">5 Camadas de Engenharia Pura</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Layers Visual */}
            <div className="relative flex flex-col items-center">
              {[
                { name: "Algodão Estonado", color: "bg-pink-50", z: 50 },
                { name: "Núcleo Microfibra", color: "bg-pink-100", z: 40 },
                { name: "Membrana TPU", color: "bg-pink-200", z: 30 },
                { name: "Base Algodão", color: "bg-pink-100", z: 20 },
                { name: "Cobertura Macia", color: "bg-pink-50", z: 10 },
              ].map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 45 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  style={{ zIndex: layer.z, marginTop: i === 0 ? 0 : -60 }}
                  className={`w-64 h-32 ${layer.color} rounded-[40px] shadow-xl border border-white/50 flex items-center justify-center transform perspective-1000`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{layer.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Layers Description */}
            <div className="space-y-8">
              <TechItem 
                icon={<Wind className="w-5 h-5" />}
                title="Camada Superior Respirável"
                desc="Algodão estonado que mantém a pele seca e fresca durante todo o dia."
              />
              <TechItem 
                icon={<Droplets className="w-5 h-5" />}
                title="Núcleo Ultra-Absorvente"
                desc="Toalha de microfibra de alta densidade que retém o fluxo no centro."
              />
              <TechItem 
                icon={<ShieldCheck className="w-5 h-5" />}
                title="Barreira Impermeável TPU"
                desc="Membrana tecnológica que impede vazamentos sem comprometer a ventilação."
              />
              <TechItem 
                icon={<Heart className="w-5 h-5" />}
                title="Conforto Anatômico"
                desc="Design com abas de fixação que se adaptam perfeitamente ao seu corpo."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-32 px-8 md:px-20 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-12 shadow-sm border border-black/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <SpecItem label="Vida Útil" value="3-5 Anos" />
            <SpecItem label="Lavagens" value="+1000" />
            <SpecItem label="Absorção" value="Até 8h" />
            <SpecItem label="Material" value="Orgânico" />
          </div>
        </div>
      </section>

      {/* Footer hint */}
      <footer className="py-20 flex flex-col items-center gap-8 opacity-40">
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <span>© 2026 Rethink.pro</span>
          <span>Privacidade</span>
          <span>Termos</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="w-64 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 hover:scale-105 transition-transform cursor-default group"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
          {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">{title.split(' ')[0]}</span>
      </div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs opacity-50 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function TechItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6 items-start"
    >
      <div className="mt-1 w-10 h-10 rounded-xl bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-sm opacity-50 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function SpecItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-2">{label}</p>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

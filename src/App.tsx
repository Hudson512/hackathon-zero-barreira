import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingCart, ArrowRight, ChevronDown, ShieldCheck, Droplets, Leaf, Layers, Wind, Heart, 
  Cpu, Zap, Radio, Bell, AlertTriangle, X, Globe, MessageSquare, ExternalLink, Shield, 
  BookOpen, Thermometer, Activity, Calendar, ZapOff, RefreshCcw
} from "lucide-react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bracelet-sim" element={<BraceletSimulator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingPage() {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);

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
            <button 
              onClick={() => setIsPreOrderModalOpen(true)}
              className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform group"
            >
              Comprar Agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIsExploreModalOpen(true)}
              className="px-8 py-4 bg-white border border-black/10 rounded-full font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              Explorar <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

      </section>

      {/* Technology Section (Inovative Sticky Layout) */}
      <section id="tecnologia" className="relative bg-white">
        <div className="flex flex-col md:flex-row min-h-screen">
          
          {/* Left Content (Scrolling) */}
          <div className="w-full md:w-1/2 px-8 md:px-20 py-[30vh] space-y-[40vh]">
            <div className="mb-20">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] opacity-30 mb-4">Arquitetura de Proteção</h2>
              <p className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight">5 Camadas de <br />Engenharia Pura</p>
            </div>

            <ScrollTechItem 
              icon={<Wind className="w-6 h-6" />}
              title="Camada Superior Respirável"
              desc="Algodão estonado que mantém a pele seca e fresca durante todo o dia. Uma inovação em suavidade."
            />
            <ScrollTechItem 
              icon={<Droplets className="w-6 h-6" />}
              title="Núcleo Ultra-Absorvente"
              desc="Toalha de microfibra de alta densidade que retém o fluxo no centro com tecnologia de bloqueio."
            />
            <ScrollTechItem 
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Barreira Impermeável TPU"
              desc="Membrana tecnológica que impede vazamentos sem comprometer a ventilação necessária."
            />
            <ScrollTechItem 
              icon={<Heart className="w-6 h-6" />}
              title="Conforto Anatômico"
              desc="Design com abas de fixação que se adaptam perfeitamente ao seu corpo, para total liberdade."
            />
            
            <div className="h-[20vh]" /> {/* Bottom Padding for scroll space */}
          </div>

          {/* Right Content (Sticky Image) */}
          <div className="md:sticky md:top-0 md:h-screen w-full md:w-1/2 flex items-center justify-center overflow-hidden bg-[#F9F9FB]">
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <img 
                src="/absorvente desmontado.png" 
                alt="Tecnologia do Absorvente" 
                className="w-full h-full object-cover"
              />
              {/* Decorative elements over the fixed image */}
              <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent" />
              <div className="absolute bottom-10 right-10 flex flex-col items-end opacity-20">
                <span className="text-8xl font-serif font-bold italic">05</span>
                <span className="text-xs font-bold uppercase tracking-widest -mt-4">Camadas Tech</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section 2 (Pulseira - Inovative Sticky Layout Inverted) */}
      <section id="tecnologia-pulseira" className="relative bg-[#F9F9FB] border-t border-black/5">
        <div className="flex flex-col md:flex-row-reverse min-h-screen">
          
          {/* Right Content (Scrolling) */}
          <div className="w-full md:w-1/2 px-8 md:px-20 py-[30vh] space-y-[40vh] bg-white">
            <div className="mb-20">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] opacity-30 mb-4">Engenharia de Monitorização</h2>
              <p className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight">Módulos de <br />Inteligência Corporal</p>
            </div>

            <ScrollTechItem 
              icon={<Cpu className="w-6 h-6" />}
              title="Núcleo de Processamento de Ciclo"
              desc="Unidade lógica baseada em microcontrolador (MCU) que orquestra o tempo do ciclo menstrual e as fases biológicas com precisão digital."
            />
            <ScrollTechItem 
              icon={<Zap className="w-6 h-6" />}
              title="Sincronização de Tempo (RTC)"
              desc="Módulo de Relógio em Tempo Real (RTC) que mantém o controlo exato da data e hora, garantindo que o ciclo Dia-a-Dia nunca falhe."
            />
            <ScrollTechItem 
              icon={<Bell className="w-6 h-6" />}
              title="Módulo de Comunicação de Alerta"
              desc="O 'Cérebro' do sistema que envia os dados e alertas via Bluetooth Low Energy para a aplicação móvel e pulseira."
            />
            <ScrollTechItem 
              icon={<Radio className="w-6 h-6" />}
              title="Atuador de Feedback Háptico"
              desc="Microvibrador integrado que fornece feedback físico discreto (vibração no pulso) para alertas silenciosos."
            />
            <ScrollTechItem 
              icon={<AlertTriangle className="w-6 h-6" />}
              title="Interface de Emergência"
              desc="Botões dedicados de controle e um botão de Emergência de alta visibilidade, conectando a usuária a apoio imediato."
            />
            
            <div className="h-[20vh]" />
          </div>

          {/* Left Content (Sticky Image) */}
          <div className="md:sticky md:top-0 md:h-screen w-full md:w-1/2 flex items-center justify-center overflow-hidden">
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full h-full p-12 flex items-center justify-center"
            >
              <img 
                src="/1.png" 
                alt="Tecnologia da Pulseira" 
                className="w-full h-auto max-h-[80vh] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
              <div className="absolute bottom-10 left-10 flex flex-col items-start opacity-20">
                <span className="text-8xl font-serif font-bold italic">Smart</span>
                <span className="text-xs font-bold uppercase tracking-widest -mt-4 ml-1">Pulseira Tech</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs Section (Adjusted Visibility) */}
      <section id="specs" className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-90">
          <img 
            src="/Gemini_Generated_Image_4iurow4iurow4iur.png" 
            alt="Fundo Specs" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-pink-400 text-xs font-bold uppercase tracking-[0.6em] mb-4">Performance Extrema</h2>
            <p className="text-white text-5xl md:text-6xl font-serif font-bold tracking-tight">Especificações Do Absorvente</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SpecCard delay={0.1} label="Vida Útil" value="3-5 Anos" desc="Durabilidade garantida para uso prolongado." />
            <SpecCard delay={0.2} label="Lavagens" value="+1000" desc="Resistência superior a ciclos de lavagem." />
            <SpecCard delay={0.3} label="Absorção" value="Até 8h" desc="Proteção contínua e segura durante o dia." />
            <SpecCard delay={0.4} label="Material" value="Orgânico" desc="Algodão certificado e livre de químicos." />
          </div>
        </div>
      </section>

      {/* Footer hint */}
      <footer className="py-20 flex flex-col items-center gap-8 opacity-40">
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <span>© 2026 NDINGA</span>
          <span>Privacidade</span>
          <span>Termos</span>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {isPreOrderModalOpen && (
          <Modal onClose={() => setIsPreOrderModalOpen(false)} title="Compra Antecipada">
            <PreOrderForm onSuccess={() => setIsPreOrderModalOpen(false)} />
          </Modal>
        )}
        {isExploreModalOpen && (
          <Modal onClose={() => setIsExploreModalOpen(false)} title="Plataforma de Aprendizagem">
            <ExploreContent />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function BraceletSimulator() {
  const [temp, setTemp] = useState(36.5);
  const [pressure] = useState("12/8");
  const [day] = useState(14);
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60); // 4h in seconds
  const [alertSent, setAlertSent] = useState(false);
  const [alertPulsing, setAlertPulsing] = useState(false);

  // Fluctuate temperature
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(t => +(t + (Math.random() * 0.2 - 0.1)).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 60 * 60; // less than 1h

  const handleSendAlert = () => {
    setAlertPulsing(true);
    setTimeout(() => {
      setAlertSent(true);
      setAlertPulsing(false);
    }, 1500);
  };

  const handleSnooze = () => {
    setTimeLeft(60 * 60); // snooze 1h
    setAlertSent(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0B] text-white font-sans flex flex-col">
      {/* Glow effect background */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-pink-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center px-8 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">NDINGA OS v1.0 — Live Sync</span>
        </div>
        <Link to="/" className="text-white/30 hover:text-white/70 transition-colors text-[10px] uppercase tracking-widest flex items-center gap-2">
          <ArrowRight className="w-3 h-3 rotate-180" /> Voltar ao Site
        </Link>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 flex-1 grid grid-cols-3 gap-4 p-6 min-h-0">

        {/* === Card 1: Device Vitals === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/60 backdrop-blur-3xl border border-white/10 rounded-[36px] p-6 flex flex-col items-center justify-between"
        >
          <div className="w-full flex justify-between items-center text-[9px] font-bold uppercase tracking-widest opacity-30">
            <span>Sinais Vitais</span>
            <span>Monitorização</span>
          </div>

          {/* Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
              <motion.circle
                cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="7" fill="transparent"
                strokeDasharray="502"
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: 502 - (502 * 0.65) }}
                transition={{ duration: 2, ease: "easeOut" }}
                className={isUrgent ? "text-red-400" : "text-pink-500"}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <motion.span key={temp} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-serif font-black block">
                {temp}°
              </motion.span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-40">Temp. Corporal</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl text-center">
              <Activity className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="text-lg font-bold block">{pressure}</span>
              <span className="text-[7px] font-bold uppercase tracking-widest opacity-30">Pressão Art.</span>
            </div>
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl text-center">
              <Calendar className="w-4 h-4 text-pink-400 mx-auto mb-1" />
              <span className="text-lg font-bold block">{day}º Dia</span>
              <span className="text-[7px] font-bold uppercase tracking-widest opacity-30">Ciclo</span>
            </div>
          </div>

          <div className="w-full bg-pink-500/10 border border-pink-500/20 p-4 rounded-2xl flex gap-3 items-center">
            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center animate-pulse flex-shrink-0">
              <Heart className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold">Fase Lútea</h4>
              <p className="text-[9px] opacity-60">Pico de progesterona. Mantenha-se hidratada.</p>
            </div>
          </div>
        </motion.div>

        {/* === Card 2: Pad Timer === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`backdrop-blur-3xl border rounded-[36px] p-6 flex flex-col justify-between ${
            isUrgent ? "bg-red-900/30 border-red-500/30" : "bg-zinc-900/50 border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isUrgent ? "bg-red-500" : "bg-amber-500"}`}>
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Troca do Absorvente</h3>
                <p className="text-[9px] opacity-50">Temporizador de higiene ativo</p>
              </div>
              {isUrgent && (
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="ml-auto w-3 h-3 rounded-full bg-red-400" />
              )}
            </div>
          </div>

          {/* Big Countdown */}
          <div className="text-center flex-1 flex flex-col items-center justify-center gap-2">
            <motion.span
              key={`${hours}-${minutes}-${seconds}`}
              className={`text-7xl font-serif font-black tracking-tight ${isUrgent ? "text-red-400" : "text-white"}`}
            >
              {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
            </motion.span>
            <span className={`text-4xl font-serif font-bold opacity-40 ${isUrgent ? "text-red-300" : ""}`}>
              :{String(seconds).padStart(2, "0")}
            </span>
            <p className="text-[9px] opacity-40 uppercase tracking-widest">Tempo Restante para Troca</p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
            <motion.div
              className={`h-full rounded-full ${isUrgent ? "bg-red-400" : "bg-amber-400"}`}
              animate={{ width: `${(timeLeft / (4 * 3600)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <button
            onClick={handleSnooze}
            className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-3 h-3" /> Adiar 1 hora
          </button>
        </motion.div>

        {/* === Card 3: Alerts Feed (Responsável) === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[36px] p-6 flex flex-col gap-4 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Notificações Recebidas</h3>
                <p className="text-[9px] opacity-50">Pulseira NDINGA da utilizadora</p>
              </div>
            </div>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-[8px] opacity-40 uppercase tracking-widest">BLE Live</span>
            </motion.div>
          </div>

          {/* Alerts List */}
          <div className="flex flex-col gap-3 flex-1 overflow-auto">
            {/* Alert 1 - Pad Change */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <RefreshCcw className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-amber-300">Hora de Trocar o Absorvente</p>
                <p className="text-[10px] opacity-50 mt-0.5">A utilizadora atingiu 4h de uso. Troca recomendada.</p>
                <p className="text-[9px] opacity-30 mt-1">há 2 min · Pulseira #NDINGA-001</p>
              </div>
            </motion.div>

            {/* Alert 2 - Temp */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-2xl"
            >
              <div className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Thermometer className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-red-300">Temperatura Elevada Detetada</p>
                <p className="text-[10px] opacity-50 mt-0.5">Temp. corporal: 37.8°C. Pode indicar febre.</p>
                <p className="text-[9px] opacity-30 mt-1">há 18 min · Pulseira #NDINGA-001</p>
              </div>
            </motion.div>

            {/* Alert 3 - Emergency */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-start gap-3 p-3 bg-pink-500/10 border border-pink-500/20 rounded-2xl"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-pink-300">Início do Ciclo Menstrual</p>
                <p className="text-[10px] opacity-50 mt-0.5">Dia 1 do novo ciclo detetado. Apoio recomendado.</p>
                <p className="text-[9px] opacity-30 mt-1">há 2 horas · Pulseira #NDINGA-001</p>
              </div>
            </motion.div>

            {/* Alert 4 - Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="flex items-start gap-3 p-3 bg-white/5 border border-white/5 rounded-2xl"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Activity className="w-4 h-4 opacity-60" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold opacity-60">Sinais Vitais Normais</p>
                <p className="text-[10px] opacity-30 mt-0.5">Pressão: 12/8 · Temp: 36.5°C. Tudo estável.</p>
                <p className="text-[9px] opacity-20 mt-1">há 3 horas · Pulseira #NDINGA-001</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode, onClose: () => void, title: string }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-2xl font-serif font-bold tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function PreOrderForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(onSuccess, 2000);
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h4 className="text-2xl font-bold mb-2">Dados Enviados!</h4>
        <p className="opacity-50">Entraremos em contacto com a sua empresa em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Nome da Empresa</label>
        <input required type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all" placeholder="Sua Empresa Lda" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest opacity-40 mb-2">E-mail de Contacto</label>
        <input required type="email" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all" placeholder="contacto@empresa.com" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Telemóvel / WhatsApp</label>
        <input required type="tel" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all" placeholder="+244 ..." />
      </div>
      <button 
        disabled={isSubmitting}
        className="w-full py-5 bg-black text-white rounded-2xl font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : "Enviar Dados"} 
        {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      </button>
    </form>
  );
}

function ExploreContent() {
  const platforms = [
    { name: "Love Matters", url: "https://lovematters.in/en", desc: "Plataforma global sobre amor, sexo e relacionamentos.", icon: <Heart className="w-5 h-5" /> },
    { name: "P&OP Desenvolvimento", url: "https://popdesenvolvimento.org/", desc: "Foco em desenvolvimento e saúde reprodutiva.", icon: <Globe className="w-5 h-5" /> },
    { name: "FEMCONNECT", url: "https://femconnect.godaddysites.com/", desc: "Conectando mulheres a serviços de saúde essencial.", icon: <ShieldCheck className="w-5 h-5" /> },
    { name: "PAT-MED (Saúde Sexual)", url: "https://pat-med.org/category/saude-sexual-reprodutiva/", desc: "Portal de medicina e saúde preventiva.", icon: <Shield className="w-5 h-5" /> },
    { name: "Coalizão (Vibrações)", url: "https://www.coalizao.org.mz/vibracoes/", desc: "Iniciativa moçambicana para jovens.", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "SRHR Portfolio", url: "https://www.srhr.org/", desc: "Recursos internacionais sobre direitos sexuais.", icon: <BookOpen className="w-5 h-5" /> },
    { name: "UNFPA Moçambique", url: "https://mozambique.unfpa.org/pt/what-we-do", desc: "Agência da ONU para saúde reprodutiva.", icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      <p className="text-sm opacity-60 leading-relaxed mb-6">
        Explore plataformas parceiras e recursos educativos sobre saúde sexual, reprodutiva e higiene menstrual.
      </p>

      <div className="grid gap-3">
        {platforms.map((p, i) => (
          <a 
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-pink-50 hover:border-pink-200 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 group-hover:text-pink-500 shadow-sm transition-colors">
                {p.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{p.name}</h4>
                <p className="text-[11px] opacity-50">{p.desc}</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 text-pink-500 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </a>
        ))}
      </div>
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

function ScrollTechItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex gap-8 items-start max-w-md group"
    >
      <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500 transition-colors duration-500 shadow-xl">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-serif font-bold mb-4 tracking-tight">{title}</h4>
        <p className="text-lg opacity-40 leading-relaxed font-sans">{desc}</p>
      </div>
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

function SpecCard({ label, value, desc, delay }: { label: string, value: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-[32px] text-center group transition-all duration-500 hover:bg-white/20"
    >
      <p className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-4 opacity-70 group-hover:opacity-100 transition-opacity">{label}</p>
      <p className="text-white text-4xl font-serif font-bold mb-4 tracking-tighter">{value}</p>
      <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">{desc}</p>
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

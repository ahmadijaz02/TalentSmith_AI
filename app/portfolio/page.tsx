"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Layout, 
  Bot, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Eye,
  Zap, 
  Palette,
  Globe,
  Monitor
} from "lucide-react";
import Navbar from "../components/Navbar";
// We might not have PORTFOLIO_CONFIGS yet, so defining some mock data here for now
// import { TEMPLATE_CONFIGS } from "@/app/lib/template-config";

// --- MOCK PORTFOLIO TEMPLATES DATA ---
const PORTFOLIO_TEMPLATES = [
  // === NEW: USER UPLOADED TEMPLATE ===
  {
    id: 101, // Unique ID for this template
    name: "Animated Portfolio v1",
    category: "Interactive",
    level: "All Levels",
    // Placeholder image from the template assets
    image: "/portfolio1.jpg", 
    score: 95,
    views: "New",
    tags: ["Animations", "Sticky Nav", "Dark Mode"],
    isPopular: true,
    isNew: true,
    isPreviewAvailable: true, 
    previewUrl: "/portfolio-templates/Template1/index.html" 
  }
];

export default function PortfolioPage() {
  const [mode, setMode] = useState<"selection" | "manual" | "ai">("selection");
  const [role, setRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<number | null>(null);
  const [comingSoon, setComingSoon] = useState(false);

  // --- AI LOGIC FOR PORTFOLIOS ---
  const recommendTemplate = (inputText: string): number => {
    const lowerText = inputText.toLowerCase();
    
    // 1. CREATIVE / DESIGN
    if (lowerText.match(/design|art|creative|artist|illustrator|photographer|ui|ux|graphic|fashion|animator/)) {
        if (lowerText.match(/dark|night|bold/)) return 3; 
        if (lowerText.match(/agency|studio/)) return 2;
        return 1; // Visionary Canvas
    }

    // 2. TECH / DEV
    if (lowerText.match(/software|developer|engineer|coder|tech|data|web|app/)) {
        if (lowerText.match(/minimal|simple/)) return 5;
        return 4; // Full Stack
    }

    // 3. BUSINESS / PROFESSIONAL
    if (lowerText.match(/manager|consultant|business|executive|marketing|sales|writer|copywriter/)) {
        if (lowerText.match(/corporate/)) return 7;
        return 6; // Executive Brief
    }

    // DEFAULT
    return 1;
  };

  const handleAiAnalysis = () => {
    setComingSoon(true);
  };
  const router = useRouter();

  const handleSelectTemplate = (templateId: number) => {
   // Special case for our new template
   if (templateId === 101) {
       router.push(`/portfolio/builder/template1`);
       return;
   }
   // Assuming we will have a builder for portfolios too, or redirect to a specific route
   // For now keeping it consistent with resume builder route but maybe with a query param or different segment in future
   // router.push(`/portfolio/builder/${templateId}`); 
   // Using existing builder for now or a placeholder alert if that page doesn't exist
   router.push(`/builder/${templateId}?type=portfolio`);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-slate-300 selection:bg-[#0EA5E9] selection:text-white">
      <Navbar />
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#0EA5E9]/5 blur-[120px] rounded-full" /> 
        {/* Color reset to Sky #0EA5E9 for consistency */}
      </div>

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            >
                Build Your  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-white to-[#14B8A6]">Dream Portfolio</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
            >
                Showcase your work with professional portfolio websites. Choose a design manually or let AI curate the perfect look for your brand.
            </motion.p>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <AnimatePresence mode="wait">
            
            {/* === 1. SELECTION SCREEN === */}
            {mode === "selection" && (
                <motion.div
                    key="selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    {/* OPTION A: MANUAL SELECTION (SKY BLUE #0EA5E9) */}
                    <div className="group relative bg-slate-900/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 hover:border-[#0EA5E9]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(14,165,233,0.1)] cursor-default">
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#0EA5E9]/20 group-hover:scale-110 transition-transform duration-500">
                                <Palette className="w-7 h-7 text-[#0EA5E9]" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-3">Browse Designs</h3>
                            <p className="text-slate-400 mb-8 h-12">
                                Explore our curated collection of stunning portfolio layouts designed for every profession.
                            </p>
                            
                            {/* Simple Feature List */}
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#0EA5E9]/20 text-[#0EA5E9]"><Layout size={14} /></div>
                                    Diverse Styles
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#0EA5E9]/20 text-[#0EA5E9]"><Globe size={14} /></div>
                                    SEO Optimized
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#0EA5E9]/20 text-[#0EA5E9]"><Monitor size={14} /></div>
                                    Fully Responsive
                                </li>
                            </ul>

                            <button 
                                onClick={() => setMode("manual")}
                                className="w-full h-14 bg-slate-800 border border-white/10 rounded-xl text-white font-semibold flex items-center justify-center gap-2 group-hover:bg-[#0EA5E9] transition-colors duration-300"
                            >
                                View Portfolio Designs
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* OPTION B: AI SELECTION (TEAL #14B8A6) */}
                    <div className="group relative bg-slate-900/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 hover:border-[#14B8A6]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(20,184,166,0.1)] cursor-default">
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#14B8A6]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#14B8A6]/20 group-hover:scale-110 transition-transform duration-500">
                                <Sparkles className="w-7 h-7 text-[#14B8A6]" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-3">Ask AI to Select</h3>
                            <p className="text-slate-400 mb-8 h-12">
                                Tell us about your creative work, and let our AI match you with the ideal portfolio style.
                            </p>
                            
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#14B8A6]/20 text-[#14B8A6]"><Bot size={14} /></div>
                                    Smart Matching
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#14B8A6]/20 text-[#14B8A6]"><Zap size={14} /></div>
                                    Instant Setup
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#14B8A6]/20 text-[#14B8A6]"><CheckCircle2 size={14} /></div>
                                    Tailored for You
                                </li>
                            </ul>

                            <button 
                                onClick={() => setMode("ai")}
                                className="w-full h-14 bg-gradient-to-r from-[#14B8A6]/20 to-[#0EA5E9]/20 border border-[#14B8A6]/50 rounded-xl text-white font-semibold flex items-center justify-center gap-2 group-hover:bg-[#14B8A6] group-hover:border-[#14B8A6] transition-all duration-300"
                            >
                                Get AI Recommendation
                                <Sparkles size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

           {/* === 2. MANUAL BROWSE (PORTFOLIO GRID) === */}
            {mode === "manual" && (
                <motion.div
                    key="manual"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                >
                    {/* Navigation Header */}
                    <div className="flex items-center justify-between mb-8">
                        <button 
                            onClick={() => setMode("selection")}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                        >
                            <div className="p-2 rounded-full bg-slate-800 group-hover:bg-[#0EA5E9] transition-colors">
                                <ArrowRight className="rotate-180 text-white" size={14} />
                            </div>
                            <span className="text-sm font-medium">Back to Selection</span>
                        </button>

                        <div className="flex gap-2">
                             <span className="px-3 py-1 rounded-full bg-slate-800 border border-white/5 text-xs text-slate-400">
                                Available Designs: <span className="text-white">{PORTFOLIO_TEMPLATES.length}</span>
                             </span>
                        </div>
                    </div>

                    {/* THE GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {PORTFOLIO_TEMPLATES.map((template, i) => (
                            <motion.div 
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative flex flex-col h-[420px] bg-[#0F172A] border border-white/10 rounded-2xl overflow-hidden hover:border-[#0EA5E9]/50 hover:shadow-[0_0_40px_rgba(14,165,233,0.1)] transition-all duration-500"
                            >
                                {/* --- 1. CARD HEADER (Image) --- */}
                                <div className="relative h-[65%] overflow-hidden bg-slate-900 border-b border-white/5">
                                    
                                    {/* Image with Zoom Effect */}
                                    <img 
                                        src={template.image} 
                                        alt={template.name}
                                        className="w-full h-full object-fill opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                    
                                    {/* Hover Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                                   {/* HOVER ACTIONS */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 px-6 bg-slate-900/60 backdrop-blur-sm">
    
                                    {/* 1. SELECT BUTTON */}
                                    <button 
                                    onClick={() => handleSelectTemplate(template.id)}
                                    className="w-full py-3 rounded-lg bg-[#0EA5E9] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:bg-[#0284c7] transition-colors cursor-pointer transform translate-y-4 group-hover:translate-y-0 duration-300"
                                    >
                                    <Palette size={16} />
                                    {template.id === 101 ? "Build Portfolio" : "Use This Design"}
                                    </button>

                                    {/* 2. PREVIEW BUTTON */}
                                    <button 
                                        onClick={(e) => {
                                            if (template.isPreviewAvailable && template.previewUrl) {
                                                e.stopPropagation();
                                                window.open(template.previewUrl, '_blank');
                                            }
                                        }}
                                        className="w-full py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-colors cursor-pointer transform translate-y-4 group-hover:translate-y-0 duration-500"
                                    >
                                    <Eye size={16} />
                                    {template.id === 101 ? "Live Preview" : "Live Demo"}
                                    </button>

                                    </div>
                                </div>

                                {/* --- 2. CARD BODY (Info) --- */}
                                <div className="flex-1 p-4 flex flex-col justify-between relative bg-[#0F172A]">
                                    
                                    {/* Title Section */}
                                    <div>
                                        <div className="flex justify-between items-center gap-2 mb-2">
                                            <h3 className="text-white font-bold text-base leading-tight group-hover:text-[#0EA5E9] transition-colors flex-1">
                                                {template.name}
                                            </h3>
                                            {/* Badges */}
                                            <div className="flex gap-1">
                                                {template.isPopular && (
                                                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-bold uppercase tracking-wider rounded">
                                                        <Sparkles size={8} fill="currentColor" />
                                                        Hot
                                                    </div>
                                                )}
                                                {template.isNew && (
                                                    <div className="px-1.5 py-0.5 bg-[#0EA5E9] text-white text-[9px] font-bold uppercase tracking-wider rounded">
                                                        New
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-xs font-medium text-slate-500 px-2 py-0.5 rounded bg-slate-800 border border-white/5">
                                                {template.category}
                                            </span>
                                            <span className="text-xs text-slate-600">•</span>
                                            <span className="text-xs text-slate-400">
                                                {template.level}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-2 mb-3 py-2 border-y border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1">Impact Score</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_#14B8A6]" />
                                                <span className="text-sm font-bold text-slate-200">{template.score}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col border-l border-white/5 pl-3">
                                            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1">Views</span>
                                            <div className="flex items-center gap-1.5">
                                                <Eye size={12} className="text-slate-400" />
                                                <span className="text-sm font-bold text-slate-200">{template.views}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags & Action */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {template.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded text-slate-500 bg-slate-900 border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* === 3. AI FORM (Portfolio Context) === */}
            {mode === "ai" && (
                <motion.div
                    key="ai"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="max-w-3xl mx-auto"
                >
                    <button 
                        onClick={() => setMode("selection")}
                        className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowRight className="rotate-180" size={16} />
                        Back
                    </button>

                    <div className="relative bg-slate-900/90 backdrop-blur-xl border border-[#14B8A6]/30 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(20,184,166,0.15)] overflow-hidden">
                        
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#14B8A6] to-transparent" />

                        {!isAnalyzing && !aiResult && !comingSoon && (
                            <div className="space-y-8 relative z-10">
                                <div className="text-center">
                                    <div className="inline-flex p-4 bg-[#14B8A6]/10 rounded-2xl text-[#14B8A6] mb-4 border border-[#14B8A6]/20">
                                        <Bot size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">AI Portfolio Consultant</h2>
                                    <p className="text-slate-400">
                                        Describe your profession, key projects, and the vibe you want to convey. Our AI will curate the perfect portfolio structure for you.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                                            What do you want to showcase?
                                        </label>
                                        <div className="relative">
                                            <textarea 
                                                placeholder="e.g. I am a Graphic Designer specializing in brand identity. I want a portfolio that is bold, colorful, and puts my images front and center. I also want a section for my case studies..." 
                                                className="w-full h-40 bg-slate-950/80 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all placeholder:text-slate-600 resize-none leading-relaxed"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <div className="absolute bottom-4 right-4 text-xs text-slate-500">
                                                {role.length} chars
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleAiAnalysis}
                                    disabled={!role}
                                    className="w-full mt-6 bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={20} />
                                    Find My Match
                                </button>
                            </div>
                        )}

                        {comingSoon && (
                            <div className="text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
                                <div className="inline-flex items-center justify-center p-4 bg-[#14B8A6]/10 rounded-full mb-4 border border-[#14B8A6]/20">
                                    <Bot size={48} className="text-[#14B8A6]" />
                                </div>
                                
                                <h3 className="text-3xl font-bold text-white">Feature Coming Soon</h3>
                                <p className="text-slate-400 max-w-md mx-auto text-lg">
                                    Our AI Portfolio Consultant is currently under development. 
                                    <br />
                                    <span className="text-[#14B8A6] font-semibold">We are working hard to bring this to you!</span>
                                </p>

                                <button 
                                    onClick={() => { setComingSoon(false); setRole(""); }}
                                    className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-medium border border-white/10"
                                >
                                    Back
                                </button>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="flex flex-col items-center justify-center py-10 space-y-8 text-center">
                                <div className="relative">
                                    <div className="w-24 h-24 border-2 border-[#14B8A6]/20 rounded-full animate-[spin_3s_linear_infinite]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Bot size={32} className="text-[#14B8A6]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">Analyzing your creative profile...</h3>
                                    <p className="text-slate-400 text-sm">Matching aesthetic and structure</p>
                                </div>
                            </div>
                        )}

                        {aiResult && !isAnalyzing && (
                            <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
                                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#14B8A6]/20 text-[#14B8A6] text-sm font-bold border border-[#14B8A6]/30">
                                    <CheckCircle2 size={18} />
                                    Perfect Match Found
                                </div>
                                
                                <h3 className="text-3xl font-bold text-white">
                                    {PORTFOLIO_TEMPLATES.find(t => t.id === aiResult)?.name || "Recommended Design"}
                                </h3>
                                <p className="text-slate-400 max-w-md mx-auto">
                                    This layout emphasizes visual impact and clean typography, perfect for your line of work.
                                </p>

                                <div onClick={() => router.push(`/builder/${aiResult}?type=portfolio`)} 
                                     className="relative w-64 mx-auto aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden border-2 border-[#14B8A6] shadow-[0_0_50px_rgba(20,184,166,0.3)] group cursor-pointer hover:scale-105 transition-transform">
                                     <img 
                                        src={PORTFOLIO_TEMPLATES.find(t => t.id === aiResult)?.image || "/1.jpg"} 
                                        className="w-full h-full object-cover" 
                                        alt="Preview" 
                                     />
                                     <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                        <button className="w-full py-2 bg-[#14B8A6] text-white font-bold rounded shadow-lg text-sm">
                                            Start with this Design
                                        </button>
                                     </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </main>
    </div>
  );
}

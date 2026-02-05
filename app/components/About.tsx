"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Bot, 
  Layers, 
  Github, 
  CheckCircle2, 
  Cpu, 
  Scan,
  Palette
} from "lucide-react";
import { cn } from "../lib/utils";

// --- FEATURE DATA ---
const FEATURES = [
  {
    id: 1,
    title: "Neural Resume Architect",
    subtitle: "AI-POWERED ANALYSIS",
    description: "Our engine scans your experience against industry standards, optimizing keywords for ATS algorithms while maintaining human readability. It identifies gaps and suggests impact-driven bullet points.",
    icon: <Bot className="w-6 h-6 text-[#0EA5E9]" />,
    color: "#0EA5E9",
    // UPGRADED VISUAL: Image + Animated Scan Overlay
    visual: (
      <div className="relative w-full h-full rounded-xl overflow-hidden group">
        {/* Background Image: Professional Resume/Dashboard */}
        <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop" 
            alt="Resume Analysis"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-slate-900/40" />

        {/* Floating AI Analysis Card */}
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-slate-900/90 backdrop-blur-md border border-[#0EA5E9]/30 rounded-lg p-3 shadow-2xl"
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#0EA5E9] tracking-wider">ATS SCORE</span>
                <span className="text-xs font-bold text-white">98/100</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "98%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[#0EA5E9]"
                />
            </div>
            <div className="space-y-1">
                 <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                    <CheckCircle2 size={10} className="text-[#14B8A6]" />
                    <span>Keywords Optimized</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                    <CheckCircle2 size={10} className="text-[#14B8A6]" />
                    <span>Formatting Fixed</span>
                 </div>
            </div>
        </motion.div>

        {/* Moving Laser Line */}
        <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-[#0EA5E9] shadow-[0_0_20px_#0EA5E9] z-20 opacity-50"
        />
      </div>
    )
  },
  {
    id: 2,
    title: "Static Core Generation",
    subtitle: "PORTFOLIO ENGINE",
    description: "Transform raw data into a high-performance static website. Choose from our 'Obsidian', 'Glass', or 'Minimalist' design systems. Pure, semantic React code generated instantly.",
    icon: <Layers className="w-6 h-6 text-[#14B8A6]" />,
    color: "#14B8A6",
    // UPGRADED VISUAL: Image + Floating UI Selectors
    visual: (
      <div className="relative w-full h-full rounded-xl overflow-hidden group">
         {/* Background Image: Modern Web Design */}
         <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Portfolio Design"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
         <div className="absolute inset-0 bg-slate-900/40" />

         {/* Floating Theme Picker Animation */}
         <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg shadow-lg"
                >
                    <div className={cn(
                        "w-6 h-6 rounded-md",
                        i === 1 ? "bg-gradient-to-br from-[#0EA5E9] to-[#14B8A6]" : 
                        i === 2 ? "bg-slate-700" : "bg-white"
                    )} />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                            {i === 1 ? "Active Theme" : "Option 0" + i}
                        </span>
                        <span className="text-xs text-white font-medium">
                            {i === 1 ? "Neon Glass" : i === 2 ? "Dark Mode" : "Minimal"}
                        </span>
                    </div>
                    {i === 1 && <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />}
                </motion.div>
            ))}
         </div>
         
         <div className="absolute top-4 left-4 p-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md">
            <Palette className="w-5 h-5 text-white" />
         </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Auto-Deploy Pipeline",
    subtitle: "GITHUB INTEGRATION",
    description: "One click to initialize a repo, commit your portfolio code, and trigger GitHub Pages. We handle the git permissions, branch management, and build settings so you are live in seconds.",
    icon: <Github className="w-6 h-6 text-[#0EA5E9]" />,
    color: "#0EA5E9",
    // ORIGINAL VISUAL (Terminal) - Kept because user liked it
    visual: (
      <div className="w-full h-full bg-[#0d1117] rounded-xl border border-slate-700/50 p-4 font-mono text-[10px] md:text-xs text-slate-300 overflow-hidden relative shadow-inner">
        <div className="flex gap-1.5 mb-4 border-b border-slate-800 pb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="space-y-2">
            <div className="flex gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-[#0EA5E9]">~</span>
                <span>initializing git repository...</span>
            </div>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-2"
            >
                <span className="text-green-400">✓</span>
                <span>remote origin added</span>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="flex gap-2"
            >
                <span className="text-green-400">➜</span>
                <span className="text-[#0EA5E9]">~</span>
                <span>git push -u origin main</span>
            </motion.div>
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-slate-500 pl-4"
            >
                Enumerating objects: 12, done.
            </motion.div>
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
                className="text-[#14B8A6] mt-2 p-2 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded"
            >
                ★ Site live: username.github.io
            </motion.div>
        </div>
        {/* Cursor Blink */}
        <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute bottom-4 right-4 w-2 h-4 bg-[#0EA5E9]"
        />
      </div>
    )
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    // Reduced padding (py-24) to bring it closer to Hero
    <section 
        ref={containerRef} 
        className="relative w-full bg-[#0F172A] py-24 overflow-hidden"
    >
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#0EA5E9] to-transparent" />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-20 px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] text-xs font-medium tracking-wider mb-6">
                <Cpu size={14} />
                <span>SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6]">Neural Forge</span> Process
            </h2>
            <p className="text-slate-400 text-lg">
                Not just a builder. A complete career deployment pipeline.
            </p>
        </motion.div>
      </div>

      {/* --- THE PIPELINE --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* CENTRAL BEAM */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-slate-800/50 rounded-full hidden md:block">
            <motion.div 
                style={{ height: beamHeight }}
                className="w-full bg-gradient-to-b from-[#0EA5E9] via-[#14B8A6] to-[#0EA5E9] shadow-[0_0_15px_#0EA5E9]"
            />
        </div>

        {/* NODES */}
        <div className="space-y-32">
            {FEATURES.map((feature, index) => {
                const isEven = index % 2 === 0;
                
                return (
                    <div key={feature.id} className={cn(
                        "relative flex flex-col md:flex-row items-center gap-8 md:gap-20",
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                    )}>
                        
                        {/* CENTER DOT */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-[#0F172A] border border-slate-600 z-20">
                             <div className={cn("w-2 h-2 rounded-full animate-pulse", isEven ? "bg-[#0EA5E9]" : "bg-[#14B8A6]")} />
                        </div>

                        {/* TEXT SIDE */}
                        <motion.div 
                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={cn(
                                "flex-1 w-full md:text-right space-y-4 relative z-10",
                                !isEven && "md:text-left"
                            )}
                        >
                            {/* Horizontal Connector Line */}
                             <div className={cn(
                                 "absolute top-8 h-[1px] bg-slate-800 hidden md:block w-10 md:w-20",
                                 isEven ? "-right-10 md:-right-20" : "-left-10 md:-left-20"
                             )} />

                            <div className={cn(
                                "flex items-center gap-3 mb-2",
                                isEven ? "md:flex-row-reverse" : "md:flex-row"
                            )}>
                                <span className="text-[#0EA5E9] font-mono text-sm tracking-wider uppercase opacity-80">
                                    0{feature.id} | {feature.subtitle}
                                </span>
                            </div>
                            
                            <h3 className="text-3xl font-bold text-white">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-base">
                                {feature.description}
                            </p>
                            
                            <ul className="space-y-2 pt-2">
                                <li className={cn(
                                    "flex items-center gap-2 text-sm text-slate-500",
                                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                                )}>
                                    <CheckCircle2 size={14} className="text-[#14B8A6]" />
                                    <span>System verified optimization</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* VISUAL SIDE */}
                        <motion.div 
                             initial={{ opacity: 0, scale: 0.9, y: 20 }}
                             whileInView={{ opacity: 1, scale: 1, y: 0 }}
                             viewport={{ margin: "-100px" }}
                             transition={{ duration: 0.8 }}
                             className="flex-1 w-full"
                        >
                            {/* Card Container */}
                            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl bg-[#1e293b]/50 border border-white/5 p-2 backdrop-blur-sm shadow-2xl hover:border-[#0EA5E9]/30 transition-colors duration-500 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                                
                                {/* Inner visual content */}
                                {feature.visual}
                            </div>
                        </motion.div>

                    </div>
                );
            })}
        </div>

      </div>
    </section>
  );
}
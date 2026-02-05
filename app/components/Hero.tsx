"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Added Variants type for better safety
import { ArrowRight, LayoutGrid, ScanLine, FileText, Globe, GitBranch } from "lucide-react";

// --- TALENTSMITH AI IMAGES & DATA ---
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop",
    alt: "AI Resume Builder",
    title: "AI-Guided Resumes",
    desc: "ATS-ready templates tailored to your role.",
    icon: <FileText className="w-5 h-5 text-[#0EA5E9]" />
  },
  {
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop",
    alt: "Portfolio Generator",
    title: "Instant Portfolios",
    desc: "Turn your experience into a live website.",
    icon: <LayoutGrid className="w-5 h-5 text-[#14B8A6]" />
  },
  {
    src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2000&auto=format&fit=crop",
    alt: "GitHub Integration",
    title: "GitHub Deployment",
    desc: "Auto-push to GitHub Pages in one click.",
    icon: <GitBranch className="w-5 h-5 text-[#0EA5E9]" />
  },
];

// --- SLOWED DOWN PREMIUM PHYSICS ---
// Fix: We explicitly type this object as 'Variants' to help TypeScript
const orbitVariants: Variants = {
  enter: {
    opacity: 0,
    x: 250,
    scale: 0.8,
    rotateY: 30,
    filter: "blur(8px)",
    z: -100,
  },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    z: 0,
    transition: {
      duration: 2.0,
      // FIX HERE: Cast the array as a tuple so TypeScript knows it's a Bezier curve
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number], 
    }
  },
  exit: {
    opacity: 0,
    x: -250,
    scale: 0.8,
    rotateY: -30,
    filter: "blur(8px)",
    z: -100,
    transition: {
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-cycle logic (7 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-12 pt-10 pb-20 overflow-hidden md:overflow-visible">
      
      {/* --- LEFT COLUMN: Text Content --- */}
      <div className="flex-1 space-y-8 z-10 px-4 md:px-0">
        <div className="space-y-2">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
                Forge Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-[#14B8A6] to-[#0EA5E9] animate-gradient bg-300%">
                    Career Legacy
                </span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-slate-400 max-w-lg leading-relaxed"
            >
                Deploy professional portfolios and ATS-optimized resumes in seconds. 
                Powered by an intelligent engine that understands your worth.
            </motion.p>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
        >
            <Link href="/templates" className="group relative h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 focus:ring-offset-slate-900">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_0%,#14B8A6_50%,#0EA5E9_100%)]" />
                <span className="relative flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 text-sm font-semibold text-white backdrop-blur-3xl transition-all group-hover:bg-slate-900">
                    Create Resume
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
            </Link>
            <Link href="/portfolio" className="group relative h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 focus:ring-offset-slate-900">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_0%,#14B8A6_50%,#0EA5E9_100%)]" />
                <span className="relative flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 text-sm font-semibold text-white backdrop-blur-3xl transition-all group-hover:bg-slate-900">
                    Create Portfolio
                    <Globe className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
            </Link>
        </motion.div>
      </div>


      {/* --- RIGHT COLUMN: The Premium Orbital Stage --- */}
      <div className="relative flex-1 w-full h-[600px] flex items-center justify-center perspective-[2000px]">
        
        {/* 1. Background Atmosphere */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Soft Ambient Glow */}
            <div className="w-[600px] h-[600px] bg-gradient-radial from-[#0EA5E9]/10 to-transparent blur-[80px]" />
            
            {/* The Horizontal Orbit Ring (Visual Reference) */}
            <div className="absolute w-[120%] h-[400px] border border-slate-800/60 rounded-[100%] rotate-x-[75deg] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" style={{ transform: "translate(-50%, -50%) rotateX(75deg)" }}>
                <div className="absolute top-0 left-0 w-full h-full rounded-[100%] border-t border-white/10" />
            </div>
        </div>

        {/* 2. The Main Content */}
        <AnimatePresence mode="popLayout">
            <motion.div
                key={index}
                variants={orbitVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full max-w-[500px] aspect-[16/10] rounded-2xl z-20"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* --- THE CARD CONTAINER --- */}
                <div className="relative group w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
                    
                    {/* Image */}
                    <img 
                        src={IMAGES[index].src} 
                        alt={IMAGES[index].alt}
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                    />

                    {/* Overlay Gradient (Cinematic look) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />

                    {/* Slow Gloss Reflection Animation */}
                    <motion.div 
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "200%", opacity: 0.2 }}
                        transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 z-30"
                    />

                    {/* INFO BAR (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between z-40">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                                {IMAGES[index].icon}
                            </div>
                            <div>
                                <motion.h3 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="text-white font-semibold text-lg"
                                >
                                    {IMAGES[index].title}
                                </motion.h3>
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="text-slate-400 text-sm"
                                >
                                    {IMAGES[index].desc}
                                </motion.p>
                            </div>
                        </div>
                        
                        {/* Scanner Icon Animation (Slower) */}
                        <div className="relative w-8 h-8 flex items-center justify-center">
                             <ScanLine className="w-full h-full text-white/20" />
                             <motion.div 
                                animate={{ height: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 w-full bg-[#0EA5E9]/50 shadow-[0_0_10px_#0EA5E9]"
                             />
                        </div>
                    </div>

                </div>

                {/* Tech Lines behind */}
                <div className="absolute -inset-4 border border-[#0EA5E9]/20 rounded-3xl -z-10 scale-95 opacity-50" />
                <div className="absolute -inset-8 border border-[#14B8A6]/10 rounded-3xl -z-20 scale-90 opacity-30" />

            </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

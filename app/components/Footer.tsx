"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Terminal,
  ShieldCheck,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";

const SOCIALS = [
  { icon: <Github size={20} />, href: "https://github.com/NadeemAhmad3", label: "GitHub" },
  { icon: <Instagram size={20} />, href: "https://www.instagram.com/engr.nadeem_/", label: "Instagram" },
  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/nadeem-ahmad3/", label: "LinkedIn" },
];

const LINKS = {
  Product: ["Resume Templates", "Portfolio Engine", "AI Analysis", "Pricing"],
  Resources: ["Documentation", "Career Guide", "API Status", "System Logs"],
  Legal: ["Privacy Protocol", "Terms of Service", "Data Governance"],
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0F172A] pt-32 pb-10 overflow-hidden">
      
      {/* --- 1. THE FLOOR GRID (Perspective Background) --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* The Grid */}
         <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
            style={{ maskImage: "radial-gradient(circle at 50% 0%, black 0%, transparent 80%)" }} 
         />
         {/* Top Blue Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-[#0EA5E9]/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* --- 2. THE FINAL CTA (The Launchpad) --- */}
        <div className="flex flex-col items-center text-center mb-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                {/* Decoration Circles */}
                <div className="absolute -left-12 top-0 text-[#0EA5E9]/20 animate-pulse">
                    <Cpu size={40} />
                </div>
                <div className="absolute -right-12 bottom-0 text-[#14B8A6]/20 animate-pulse delay-700">
                    <Terminal size={40} />
                </div>

                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                    Ready to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-white to-[#14B8A6]">
                        Deploy Your Future?
                    </span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">
                    Join the network of professionals using AI to bypass the gatekeepers.
                    Your legacy begins with a single commit.
                </p>

                {/* THE GIANT BUTTON */}
                <button className="group relative h-16 px-10 rounded-2xl overflow-hidden bg-white text-slate-900 font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] via-[#14B8A6] to-[#0EA5E9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                        Launch TalentSmith
                        <ArrowRight className="w-5 h-5" />
                    </span>
                </button>
            </motion.div>
        </div>


        {/* --- 3. THE NAVIGATION TERMINAL --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16">
            
            {/* BRAND COLUMN */}
            <div className="md:col-span-5 space-y-6">
                <div className="flex items-center gap-2 text-white font-bold text-2xl">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#14B8A6] flex items-center justify-center">
                        <Terminal size={18} className="text-white" />
                    </div>
                    <span>TALENT<span className="text-[#0EA5E9]">SMITH</span></span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                    An AI-powered career orchestration platform. We translate your human experience into digital assets that algorithms love and recruiters respect.
                </p>
                
                {/* Socials */}
                <div className="flex items-center gap-4">
                    {SOCIALS.map((social, i) => (
                        <a 
                            key={i} 
                            href={social.href} 
                            className="w-10 h-10 rounded-full bg-slate-800/50 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0EA5E9] hover:border-[#0EA5E9] transition-all duration-300"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* LINKS COLUMNS */}
            <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                {Object.entries(LINKS).map(([category, items]) => (
                    <div key={category} className="space-y-4">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                            {category}
                        </h4>
                        <ul className="space-y-2">
                            {items.map((item) => (
                                <li key={item}>
                                    <Link 
                                        href="#" 
                                        className="text-slate-500 text-sm hover:text-[#0EA5E9] transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-[#0EA5E9] transition-colors" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        {/* --- 4. BOTTOM BAR --- */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-mono">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-6">
                <span>© 2026 TALENTSMITH AI.</span>
                <span className="flex items-center gap-1">
                    <ShieldCheck size={12} />
                    SECURE CONNECTION
                </span>
            </div>
        </div>

      </div>
    </footer>
  );
}
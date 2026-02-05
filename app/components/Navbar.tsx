"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { ArrowRight, Menu, X, User } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";

// --- 1. THE PRISM LOGO ---
const PrismLogo = () => {
  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="#0EA5E9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M2 17L12 22L22 17"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M2 7V17M22 7V17"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="3"
          className="fill-[#0EA5E9]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 bg-[#0EA5E9]/20 blur-xl rounded-full" />
    </div>
  );
};

// --- 2. MAIN NAVBAR ---

const navLinks = [
  { name: "Resume Templates", href: "/templates" },
  { name: "Portfolio Engine", href: "/portfolio" },
  { name: "AI Career Coach", href: "/ai-coach" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Changed "flex" to "block" so the mobile menu can stack below correctly
    <div className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-8 flex flex-col items-center">
      
      {/* --- DESKTOP BAR --- */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative w-full max-w-7xl h-20 z-50", // Added z-50
          "flex items-center justify-between px-2",
          "bg-[#0F172A]/80 backdrop-blur-xl", // Increased opacity slightly for legibility
          "border border-white/10 rounded-2xl",
          "shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]"
        )}
      >
        {/* BRAND */}
        <div className="flex items-center gap-4 pl-4 cursor-pointer group">
          <PrismLogo />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-display">
              TALENT<span className="text-[#0EA5E9]">SMITH</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium group-hover:text-[#0EA5E9] transition-colors">
              AI Forge v1.0
            </span>
          </div>
        </div>

        {/* CENTER NAV (Desktop Only) */}
        <div className="hidden md:flex items-center justify-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-6 py-3 text-sm font-medium transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-glass"
                    className="absolute inset-0 rounded-lg bg-white/5 border border-white/5 shadow-[0_0_15px_rgba(14,165,233,0.1)] backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className={cn(
                    "relative z-10 transition-all duration-200",
                    hoveredIndex === index 
                        ? "text-[#0EA5E9] drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" 
                        : "text-slate-400"
                )}>
                    {link.name}
                </span>
                {hoveredIndex === index && (
                    <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-[#0EA5E9] rounded-full"
                    />
                )}
              </Link>
            ))}
        </div>

        {/* RIGHT ACTIONS (Desktop Only) */}
        <div className="hidden md:flex items-center gap-4 pr-4">
            <Link 
                href="/login" 
                className="group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 transition-all hover:text-white hover:bg-white/5"
            >
                <User size={16} className="text-slate-500 group-hover:text-[#0EA5E9] transition-colors" />
                <span>Sign In</span>
            </Link>
            <button className="group relative inline-flex h-11 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 focus:ring-offset-slate-900">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_0%,#14B8A6_50%,#0EA5E9_100%)]" />
                <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#1e293b] to-[#0f172a] px-6 py-1 text-sm font-semibold text-white backdrop-blur-3xl transition-all group-hover:bg-[#1e293b]/80 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <span className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:animate-shimmer group-hover:duration-1000">
                        <span className="relative h-full w-8 bg-white/10" />
                    </span>
                    <span className="relative z-10">Start Building</span>
                    <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0EA5E9]" />
                </span>
            </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden pr-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

      </motion.nav>

      {/* --- NEW CODE: THE MOBILE MENU DROPDOWN --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden w-full max-w-7xl mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col p-4 space-y-2">
              {/* Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  <span className="font-medium">{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#0EA5E9] transition-colors" />
                </Link>
              ))}

              <div className="h-px bg-white/10 my-2" />

              {/* Mobile Actions */}
              <Link 
                href="/login"
                className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>Sign In</span>
              </Link>
              
              <button className="w-full mt-2 group relative h-12 overflow-hidden rounded-xl p-[1px]">
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_0%,#14B8A6_50%,#0EA5E9_100%)]" />
                  <span className="relative flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 text-sm font-semibold text-white backdrop-blur-3xl">
                      Start Building
                      <ArrowRight className="w-4 h-4" />
                  </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
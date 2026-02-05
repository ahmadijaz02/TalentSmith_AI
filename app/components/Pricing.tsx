"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Zap, Layout, FileText } from "lucide-react";
import { cn } from "../lib/utils";

const PLANS = [
  {
    id: "starter",
    name: "Resume Core",
    price: "100",
    description: "Essential tools to break into the industry.",
    icon: <FileText className="w-6 h-6 text-slate-400" />,
    features: [
      "3 AI-Generated Resume Options",
      "Real-time ATS Score Analysis",
      "Keyword Optimization Engine",
      "Basic Formatting Suggestions"
    ],
    cta: "Forge Resume",
    popular: false,
    gradient: "from-slate-700 to-slate-800"
  },
  {
    id: "pro",
    name: "Web Identity",
    price: "500",
    description: "Launch your personal brand online.",
    icon: <Layout className="w-6 h-6 text-[#14B8A6]" />,
    features: [
      "1 Standard Portfolio Website",
      "1 AI-Optimized Resume",
      "GitHub Auto-Deployment",
      "Custom Domain Connection",
      "Standard Theme Selection"
    ],
    cta: "Deploy Portfolio",
    popular: true, // This is the "Standard" but popular option
    gradient: "from-[#14B8A6]/20 to-[#0EA5E9]/20"
  },
  {
    id: "ultimate",
    name: "Legacy Suite",
    price: "5000",
    description: "The complete arsenal for career dominance.",
    icon: <Crown className="w-6 h-6 text-amber-400" />,
    features: [
      "Access to ALL Portfolio Templates",
      "1 Premium 3D Portfolio",
      "3 Standard Portfolios",
      "10 AI-Tailored Resumes",
      "Priority AI Career Coach",
      "Lifetime Updates"
    ],
    cta: "Unlock All Access",
    popular: false,
    isJumbo: true, // Special flag for the Bumper Offer
    gradient: "from-amber-500/20 to-purple-600/20"
  }
];

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-[#0F172A] py-24 overflow-hidden">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0EA5E9]/10 blur-[100px] rounded-full" />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20 px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Initialize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6]">Access</span>
            </h2>
            <p className="text-slate-400 text-lg">
                Select a clearance level to begin your deployment. 
                Transparent pricing. No hidden algorithms.
            </p>
        </motion.div>
      </div>

      {/* --- PRICING CARDS --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {PLANS.map((plan, index) => {
          const isJumbo = plan.isJumbo;
          const isHovered = hoveredPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border transition-all duration-300 group",
                // Styling based on plan type
                isJumbo 
                  ? "bg-slate-900/80 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15)] md:-mt-8 md:mb-8" // Jumbo pops out
                  : "bg-slate-900/40 border-white/10 hover:border-[#0EA5E9]/50 hover:bg-slate-900/60"
              )}
            >
              
              {/* Jumbo / Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0EA5E9] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_#0EA5E9]">
                  Most Popular
                </div>
              )}
              {isJumbo && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2">
                  <Sparkles size={12} fill="currentColor" />
                  Bumper Offer
                  <Sparkles size={12} fill="currentColor" />
                </div>
              )}

              {/* Background Gradient Effect on Hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none bg-gradient-to-b",
                plan.gradient
              )} />

              {/* HEADER CONTENT */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "p-3 rounded-xl bg-white/5 border border-white/10",
                    isJumbo && "bg-amber-500/10 border-amber-500/20"
                  )}>
                    {plan.icon}
                  </div>
                  {isJumbo && (
                    <span className="text-amber-500 text-xs font-mono border border-amber-500/30 px-2 py-1 rounded">
                      ALL ACCESS
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 h-10">{plan.description}</p>
              </div>

              {/* PRICE */}
              <div className="relative z-10 mb-8 flex items-baseline gap-1">
                <span className="text-lg text-slate-400">Rs.</span>
                <span className={cn(
                    "text-5xl font-bold tracking-tight text-white",
                    isJumbo && "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"
                )}>
                    {plan.price}
                </span>
                <span className="text-sm text-slate-500">/ lifetime</span>
              </div>

              {/* DIVIDER */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

              {/* FEATURES LIST */}
              <ul className="relative z-10 space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className={cn(
                        "w-5 h-5 shrink-0", 
                        isJumbo ? "text-amber-500" : "text-[#14B8A6]"
                    )} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA BUTTON */}
              <button className={cn(
                "relative z-10 w-full h-12 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden",
                isJumbo 
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-[1.02]" 
                  : "bg-slate-800 text-white hover:bg-[#0EA5E9] hover:text-white border border-white/5"
              )}>
                 {/* Shiny wipe effect */}
                 <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-shimmer" />
                 
                 {plan.cta}
                 {isJumbo ? <Crown size={16} /> : <Zap size={16} />}
              </button>

            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
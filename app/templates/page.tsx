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
  Briefcase,
  ScanLine,
  Eye,
  FileCheck,
  Grid,
  User,
  Zap
} from "lucide-react";
import Navbar from "../components/Navbar";
import { cn } from "../lib/utils";
import { TEMPLATE_CONFIGS } from "@/app/lib/template-config";


// --- UPDATED DATA: 31 UNIQUE DESIGN STYLES ---
const RAW_TEMPLATES = [
  // === GROUP 1: MINIMALIST & CLEAN (Text Focus, Mostly B&W) ===
  {
    id: 1,
    name: "The Harvard Classic",
    category: "Minimalist",
    level: "All Levels",
    image: "/1.jpg",
    atsScore: 99,
    views: "24.5k",
    tags: ["No Photo", "Serif Font", "Traditional"],
    isPopular: true,
    isNew: false
  },
  {
    id: 2,
    name: "Swiss Clean",
    category: "Minimalist",
    level: "Mid-Senior",
    image: "/2.jpg",
    atsScore: 98,
    views: "18.2k",
    tags: ["No Photo", "Sans-Serif", "Grid Layout"],
    isPopular: true,
    isNew: false
  },
  {
    id: 3,
    name: "Mono Typewriter",
    category: "Minimalist",
    level: "Tech/Dev",
    image: "/3.jpg",
    atsScore: 96,
    views: "12.1k",
    tags: ["No Photo", "Monospaced", "Code Style"],
    isPopular: false,
    isNew: true
  },
  {
    id: 4,
    name: "Pure White",
    category: "Minimalist",
    level: "Entry Level",
    image: "/4.jpg",
    atsScore: 97,
    views: "9.4k",
    tags: ["No Photo", "Lots of Whitespace"],
    isPopular: false,
    isNew: false
  },
  {
    id: 5,
    name: "The Essential",
    category: "Minimalist",
    level: "All Levels",
    image: "/5.jpg",
    atsScore: 95,
    views: "11.8k",
    tags: ["No Photo", "Single Column"],
    isPopular: false,
    isNew: false
  },

  // === GROUP 2: MODERN & STRUCTURED (Sidebar, Subtle Colors) ===
  {
    id: 6,
    name: "Modern Sidebar Blue",
    category: "Modern",
    level: "Mid-Level",
    image: "/6.jpg",
    atsScore: 94,
    views: "22.1k",
    tags: ["Photo Optional", "Blue Accents", "2-Column"],
    isPopular: true,
    isNew: false
  },
  {
    id: 7,
    name: "Slate Professional",
    category: "Modern",
    level: "Senior",
    image: "/7.jpg",
    atsScore: 93,
    views: "14.3k",
    tags: ["Photo Optional", "Grey Sidebar"],
    isPopular: false,
    isNew: false
  },
  {
    id: 8,
    name: "Mint Fresh",
    category: "Modern",
    level: "Junior/Mid",
    image: "/8.jpg",
    atsScore: 91,
    views: "10.5k",
    tags: ["With Photo", "Teal Accents", "Fresh"],
    isPopular: false,
    isNew: true
  },
  {
    id: 9,
    name: "Corporate Gold",
    category: "Modern",
    level: "Executive",
    image: "/9.jpg",
    atsScore: 90,
    views: "7.2k",
    tags: ["With Photo", "Gold/Serif", "Premium"],
    isPopular: false,
    isNew: false
  },
  {
    id: 10,
    name: "Silicon Valley",
    category: "Modern",
    level: "Tech",
    image: "/10.jpg",
    atsScore: 96,
    views: "19.8k",
    tags: ["No Photo", "Clean Header", "Skills Focus"],
    isPopular: true,
    isNew: false
  },

  // === GROUP 3: CREATIVE & BOLD (Colors, Unique Layouts) ===
  {
    id: 11,
    name: "Studio Red",
    category: "Creative",
    level: "Design/Art",
    image: "/11.jpg",
    atsScore: 85,
    views: "8.1k",
    tags: ["With Photo", "Bold Color", "Magazine Style"],
    isPopular: false,
    isNew: false
  },
  {
    id: 12,
    name: "The Architect",
    category: "Creative",
    level: "Creative",
    image: "/12.jpg",
    atsScore: 88,
    views: "9.2k",
    tags: ["No Photo", "Geometric", "Black & White"],
    isPopular: false,
    isNew: false
  },
  {
    id: 13,
    name: "Peach Gradient",
    category: "Creative",
    level: "Marketing",
    image: "/13.jpg",
    atsScore: 82,
    views: "6.5k",
    tags: ["With Photo", "Gradient Header", "Soft"],
    isPopular: false,
    isNew: true
  },
  {
    id: 14,
    name: "Dark Mode Dev",
    category: "Creative",
    level: "Tech",
    image: "/14.jpg",
    atsScore: 90,
    views: "13.4k",
    tags: ["Dark Background", "Green Text", "Terminal"],
    isPopular: true,
    isNew: false
  },
  {
    id: 15,
    name: "Violet Split",
    category: "Creative",
    level: "All Levels",
    image: "/15.jpg",
    atsScore: 89,
    views: "7.8k",
    tags: ["With Photo", "Purple Sidebar", "Modern"],
    isPopular: false,
    isNew: false
  },
  {
    id: 16,
    name: "Bold Header Yellow",
    category: "Creative",
    level: "Junior",
    image: "/16.jpg",
    atsScore: 91,
    views: "5.4k",
    tags: ["No Photo", "High Contrast", "Impact"],
    isPopular: false,
    isNew: false
  },

  // === GROUP 4: PROFESSIONAL & CORPORATE (Traditional, Dense) ===
  {
    id: 17,
    name: "Global Executive",
    category: "Professional",
    level: "C-Suite",
    image: "/17.jpg",
    atsScore: 95,
    views: "4.2k",
    tags: ["With Photo", "Navy Blue", "Formal"],
    isPopular: false,
    isNew: false
  },
  {
    id: 18,
    name: "Compact Consultant",
    category: "Professional",
    level: "Senior",
    image: "/18.jpg",
    atsScore: 97,
    views: "11.1k",
    tags: ["No Photo", "Dense Text", "1-Page"],
    isPopular: true,
    isNew: false
  },
  {
    id: 19,
    name: "Legal Standard",
    category: "Professional",
    level: "Legal",
    image: "/19.jpg",
    atsScore: 98,
    views: "3.5k",
    tags: ["No Photo", "Serif", "Very Formal"],
    isPopular: false,
    isNew: false
  },
  {
    id: 20,
    name: "The Diplomat",
    category: "Professional",
    level: "Senior",
    image: "/20.jpg",
    atsScore: 94,
    views: "2.9k",
    tags: ["With Photo", "Header Banner", "Elegant"],
    isPopular: false,
    isNew: false
  },

  // === GROUP 5: ACADEMIC & CV (Long Form) ===
  {
    id: 21,
    name: "Academic CV",
    category: "Academic",
    level: "PhD/Research",
    image: "/21.jpg",
    atsScore: 99,
    views: "6.7k",
    tags: ["No Photo", "Multi-Page", "Publications"],
    isPopular: false,
    isNew: false
  },
  {
    id: 22,
    name: "Research Grant",
    category: "Academic",
    level: "Research",
    image: "/22.jpg",
    atsScore: 98,
    views: "2.3k",
    tags: ["No Photo", "Simple", "Reference List"],
    isPopular: false,
    isNew: false
  },

  // === GROUP 6: INFOGRAPHIC & VISUAL ===
  {
    id: 23,
    name: "Infographic Timeline",
    category: "Visual",
    level: "Creative",
    image: "/23.jpg",
    atsScore: 75,
    views: "15.6k",
    tags: ["Visual Timeline", "Icons", "Charts"],
    isPopular: true,
    isNew: true
  },
  {
    id: 24,
    name: "Skill Bars Pro",
    category: "Visual",
    level: "Technical",
    image: "/24.jpg",
    atsScore: 85,
    views: "8.9k",
    tags: ["Skill Graphs", "Side Column"],
    isPopular: false,
    isNew: false
  },

  // === GROUP 7: UNIQUE LAYOUTS ===
  {
    id: 25,
    name: "Horizontal Split",
    category: "Unique",
    level: "Mid-Level",
    image: "/25.jpg",
    atsScore: 88,
    views: "5.5k",
    tags: ["Landscape Mode", "Creative"],
    isPopular: false,
    isNew: true
  },
  {
    id: 26,
    name: "Typography Heavy",
    category: "Unique",
    level: "Copywriter",
    image: "/26.jpg",
    atsScore: 93,
    views: "4.1k",
    tags: ["Big Fonts", "No Photo", "Bold"],
    isPopular: false,
    isNew: false
  },
  {
    id: 27,
    name: "Boxed Layout",
    category: "Unique",
    level: "Mid-Level",
    image: "/27.jpg",
    atsScore: 90,
    views: "3.8k",
    tags: ["Borders", "Structured", "Clean"],
    isPopular: false,
    isNew: false
  },
  {
    id: 28,
    name: "Pastel Minimalist",
    category: "Modern",
    level: "Entry/Mid",
    image: "/28.jpg",
    atsScore: 94,
    views: "12.8k",
    tags: ["Soft Colors", "Friendly", "Clean"],
    isPopular: true,
    isNew: false
  },
  {
    id: 29,
    name: "The International (A4)",
    category: "Professional",
    level: "All Levels",
    image: "/29.jpg",
    atsScore: 96,
    views: "6.9k",
    tags: ["A4 Size", "Photo Optional", "Standard"],
    isPopular: false,
    isNew: false
  },
  {
    id: 30,
    name: "Center Aligned",
    category: "Unique",
    level: "Senior",
    image: "/30.jpg",
    atsScore: 91,
    views: "4.7k",
    tags: ["Centered Text", "Elegant", "Simple"],
    isPopular: false,
    isNew: false
  },
  {
    id: 31,
    name: "The Chrono Structure",
    category: "Professional",
    level: "All Levels",
    image: "/31.jpg",
    atsScore: 95,
    views: "8.3k",
    tags: ["Timeline", "Clean", "Modern"],
    isPopular: false,
    isNew: true
  },
   {
    id: 32,
    name: "The Executive Curve",
    category: "Professional",
    level: "Management",
    image: "/32.jpg", // Make sure to save your screenshot as 32.png
    atsScore: 94,
    views: "3.2k",
    tags: ["Navy", "Skill Dots", "Sidebar"],
    isNew: true
  },
  {
    id: 33,
    name: "The Slate Medical",
    category: "Medical",
    level: "Professional",
    image: "/33.jpg", 
    atsScore: 96,
    views: "5.1k",
    tags: ["Medical", "Progress Bars", "Clean"],
    isNew: true
  }
];

// Merge RAW_TEMPLATES with TEMPLATE_CONFIGS to ensure consistency
const TEMPLATES = RAW_TEMPLATES.map(t => {
  const config = TEMPLATE_CONFIGS[t.id];
  if (config) {
    return {
      ...t,
      name: config.name, // Use name from config
      // You can sync other properties if needed
    };
  }
  return t;
});

export default function TemplatesPage() {
  const [mode, setMode] = useState<"selection" | "manual" | "ai">("selection");
  const [role, setRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<number | null>(null);

  // --- AI LOGIC ---
  const recommendTemplate = (inputText: string): number => {
    const lowerText = inputText.toLowerCase();
    
    // 1. TECH / DEV / DATA
    if (lowerText.match(/software|developer|engineer|programmer|coder|stack|tech|data|scientist|analyst|devops|cloud|aws|azure/)) {
        if (lowerText.match(/junior|entry|student|intern/)) return 28; // Junior Developer
        if (lowerText.match(/devops|sre|cloud|infra/)) return 10; // DevOps
        if (lowerText.match(/data|ai|ml|machine learning/)) return 8; // Data Scientist
        if (lowerText.match(/manager|lead|principal|architect/)) return 7; // Product Manager / Lead
        return 6; // Full Stack (Default Tech)
    }

    // 2. EXECUTIVE / MANAGEMENT / BUSINESS
    if (lowerText.match(/manager|director|vp|president|ceo|cfo|cto|executive|founder|owner|business|strategy|consultant|mba/)) {
        if (lowerText.match(/product|project/)) return 16; // Project Coordinator
        if (lowerText.match(/sales|account|revenue/)) return 17; // Sales Exec
        if (lowerText.match(/marketing|brand|cmo/)) return 14; // Marketing Lead
        if (lowerText.match(/hr|human resources|recruiter|talent/)) return 18; // HR Specialist
        if (lowerText.match(/consultant|advisor/)) return 2; // Global Consultant
        return 1; // The CEO (Default Exec)
    }

    // 3. MEDICAL / HEALTH
    if (lowerText.match(/medical|nurse|doctor|physician|clinic|health|hospital|pharmacy|therapist|dental/)) {
        if (lowerText.match(/student|intern|resident/)) return 20; // Nurse/Medical
        return 33; // The Slate Medical
    }

    // 4. CREATIVE / DESIGN / ARTS
    if (lowerText.match(/design|art|creative|ux|ui|graphic|fashion|writer|editor|content|media|film|music/)) {
        if (lowerText.match(/fashion|style/)) return 15; // Fashion
        if (lowerText.match(/ux|ui|product design/)) return 11; // UX Designer
        if (lowerText.match(/content|writer|copy/)) return 24; // Content Creator
        return 12; // Art Director
    }

    // 5. ACADEMIC / EDUCATION
    if (lowerText.match(/professor|teacher|academic|research|phd|university|college|education|lecturer/)) {
        if (lowerText.match(/research|grant|lab/)) return 22; // Researcher
        return 21; // University Professor
    }

    // 6. FINANCE / LEGAL
    if (lowerText.match(/finance|bank|invest|account|audit|tax|legal|law|attorney|paralegal/)) {
        if (lowerText.match(/legal|law|attorney/)) return 5; // Legal Counsel
        return 3; // Investment Banker
    }

    // 7. REAL ESTATE / ARCHITECTURE
    if (lowerText.match(/architect|real estate|agent|broker|construction/)) {
        if (lowerText.match(/architect/)) return 23; // The Architect
        return 25; // Real Estate Agent
    }

    // DEFAULT FALLBACKS
    if (lowerText.match(/modern|clean|simple/)) return 29; // The Freelancer
    if (lowerText.match(/classic|traditional/)) return 13; // The Minimalist
    
    return 31; // The Chrono Structure (Safe Default)
  };

  const handleAiAnalysis = () => {
    if (!role) return;
    setIsAnalyzing(true);
    
    // STORE USER CONTEXT FOR THE NEXT PAGE
    if (typeof window !== 'undefined') {
        localStorage.setItem('talentSmith_userContext', role);
        localStorage.setItem('talentSmith_isAiSession', 'true');
    }

    // Simulate thinking
    setTimeout(() => {
      setIsAnalyzing(false);
      const recommendedId = recommendTemplate(role);
      setAiResult(recommendedId); 
    }, 2500);
  };
  const router = useRouter();

  const handleSelectTemplate = (templateId: number) => {
   // Navigate to the Builder Page with the ID
   router.push(`/builder/${templateId}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-slate-300 selection:bg-[#0EA5E9] selection:text-white">
      <Navbar />
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#0EA5E9]/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            >
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-white to-[#14B8A6]">Resume Style</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
            >
                Select a template manually from our collection, or simply tell us your 
                profession and let our AI find the best match for you.
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
                    {/* OPTION A: MANUAL SELECTION */}
                    <div className="group relative bg-slate-900/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 hover:border-[#0EA5E9]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(14,165,233,0.1)] cursor-default">
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#0EA5E9]/20 group-hover:scale-110 transition-transform duration-500">
                                <Grid className="w-7 h-7 text-[#0EA5E9]" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-3">Browse Templates</h3>
                            <p className="text-slate-400 mb-8 h-12">
                                Explore our collection of 20+ professional designs and pick the one that suits you best.
                            </p>
                            
                            {/* Simple Feature List */}
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#0EA5E9]/20 text-[#0EA5E9]"><Layout size={14} /></div>
                                    See All Designs
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#0EA5E9]/20 text-[#0EA5E9]"><Eye size={14} /></div>
                                    Live Preview
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#0EA5E9]/20 text-[#0EA5E9]"><CheckCircle2 size={14} /></div>
                                    Easy Selection
                                </li>
                            </ul>

                            <button 
                                onClick={() => setMode("manual")}
                                className="w-full h-14 bg-slate-800 border border-white/10 rounded-xl text-white font-semibold flex items-center justify-center gap-2 group-hover:bg-[#0EA5E9] transition-colors duration-300"
                            >
                                View All Templates
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* OPTION B: AI SELECTION */}
                    <div className="group relative bg-slate-900/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 hover:border-[#14B8A6]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(20,184,166,0.1)] cursor-default">
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#14B8A6]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#14B8A6]/20 group-hover:scale-110 transition-transform duration-500">
                                <Sparkles className="w-7 h-7 text-[#14B8A6]" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-3">Ask AI to Select</h3>
                            <p className="text-slate-400 mb-8 h-12">
                                Provide your profession and skills, and our AI will recommend the best template for you.
                            </p>
                            
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#14B8A6]/20 text-[#14B8A6]"><Bot size={14} /></div>
                                    Personalized Recommendation
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#14B8A6]/20 text-[#14B8A6]"><Zap size={14} /></div>
                                    Saves Time
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded bg-[#14B8A6]/20 text-[#14B8A6]"><CheckCircle2 size={14} /></div>
                                    Best Industry Match
                                </li>
                            </ul>

                            <button 
                                onClick={() => setMode("ai")}
                                className="w-full h-14 bg-gradient-to-r from-[#14B8A6]/20 to-[#0EA5E9]/20 border border-[#14B8A6]/50 rounded-xl text-white font-semibold flex items-center justify-center gap-2 group-hover:bg-[#14B8A6] group-hover:border-[#14B8A6] transition-all duration-300"
                            >
                                Start AI Recommendation
                                <Sparkles size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

           {/* === 2. MANUAL BROWSE (PREMIUM GRID) === */}
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
                                Total Assets: <span className="text-white">33</span>
                             </span>
                        </div>
                    </div>

                    {/* THE GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {TEMPLATES.map((template, i) => (
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
                                        className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    />
                                    
                                    {/* Hover Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                                   {/* HOVER ACTIONS: REPLACED THIS SECTION */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 px-6 bg-slate-900/60 backdrop-blur-sm">
    
                                    {/* 1. SELECT BUTTON (Triggers Navigation) */}
                                    <button 
                                    onClick={() => handleSelectTemplate(template.id)}
                                    className="w-full py-3 rounded-lg bg-[#0EA5E9] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:bg-[#0284c7] transition-colors cursor-pointer transform translate-y-4 group-hover:translate-y-0 duration-300"
                                    >
                                    <Zap size={16} />
                                    Select This Template
                                    </button>

                                    {/* 2. PREVIEW BUTTON (Visual Only) */}
                                    <button className="w-full py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-colors cursor-pointer transform translate-y-4 group-hover:translate-y-0 duration-500">
                                    <Eye size={16} />
                                    Quick Preview
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
                                                        Popular
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
                                            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1">ATS Score</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_#14B8A6]" />
                                                <span className="text-sm font-bold text-slate-200">{template.atsScore}%</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col border-l border-white/5 pl-3">
                                            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1">Downloads</span>
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase size={12} className="text-slate-400" />
                                                <span className="text-sm font-bold text-slate-200">{template.views}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags & Action */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {template.tags.map(tag => (
                                                <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded text-slate-500 bg-slate-900 border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        {/* Select Button (Icon only to save space, expands on action if needed) */}
                                        <button className="w-8 h-8 rounded-lg bg-[#0EA5E9]/10 border border-[#0EA5E9]/50 flex items-center justify-center text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all shadow-[0_0_15px_rgba(14,165,233,0.1)] group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                                            <Zap size={16} fill="currentColor" />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* === 3. AI FORM (Simple Input) === */}
            {/* REPLACEMENT CODE FOR AI FORM SECTION IN templates/page.tsx */}
{mode === "ai" && (
    <motion.div
        key="ai"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-3xl mx-auto" // Increased width
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

            {!isAnalyzing && !aiResult && (
                <div className="space-y-8 relative z-10">
                    <div className="text-center">
                        <div className="inline-flex p-4 bg-[#14B8A6]/10 rounded-2xl text-[#14B8A6] mb-4 border border-[#14B8A6]/20">
                            <Bot size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">AI Career Consultant</h2>
                        <p className="text-slate-400">
                            Describe your background, skills, and goals. The more details you provide, the better the AI can guide you.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Tell me about your professional background
                            </label>
                            <div className="relative">
                                {/* CHANGED: Input to Textarea for larger input */}
                                <textarea 
                                    placeholder="e.g. I am a Senior Marketing Manager with 8 years of experience in SaaS. I specialize in SEO, content strategy, and team leadership. I'm looking for a modern resume that highlights my metrics-driven approach..." 
                                    className="w-full h-40 bg-slate-950/80 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all placeholder:text-slate-600 resize-none leading-relaxed"
                                    value={role} // Using 'role' state variable for the description text
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
                        Analyze & Recommend
                    </button>
                </div>
            )}

            {/* KEEP EXISTING Loading & Result states... */}
            {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-10 space-y-8 text-center">
                    <div className="relative">
                        <div className="w-24 h-24 border-2 border-[#14B8A6]/20 rounded-full animate-[spin_3s_linear_infinite]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Bot size={32} className="text-[#14B8A6]" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">Analyzing your profile...</h3>
                        <p className="text-slate-400 text-sm">Matching skills to industry standards</p>
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
                        {TEMPLATES.find(t => t.id === aiResult)?.name || "Recommended Template"}
                    </h3>
                    <p className="text-slate-400 max-w-md mx-auto">
                        Based on your detailed input, this layout is best for displaying your career progression and specific skill sets effectively.
                    </p>

                    <div onClick={() => router.push(`/builder/${aiResult}`)} 
                         className="relative w-64 mx-auto aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden border-2 border-[#14B8A6] shadow-[0_0_50px_rgba(20,184,166,0.3)] group cursor-pointer hover:scale-105 transition-transform">
                         {/* Make sure this image exists or use a placeholder */}
                         <img 
                            src={TEMPLATES.find(t => t.id === aiResult)?.image || "/1.jpg"} 
                            className="w-full h-full object-cover" 
                            alt="Template Preview" 
                         />
                         <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                            <button className="w-full py-2 bg-[#14B8A6] text-white font-bold rounded shadow-lg text-sm">
                                Use This Template
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
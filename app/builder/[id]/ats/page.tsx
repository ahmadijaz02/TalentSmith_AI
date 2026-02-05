"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, CheckCircle2, AlertTriangle, Loader2, 
  TrendingUp, Download, Sparkles, FileCheck, Target,
  ChevronRight, CheckCircle, XCircle
} from "lucide-react";

type WeakPoint = {
  category: string;
  issue: string;
  impact: "high" | "medium" | "low";
  suggestion: string;
  scoreReduction: number;
};

type Recommendation = {
  field: string;
  current: string;
  suggested: string;
  reason: string;
};

type ATSResult = {
  overallScore: number;
  categoryScores: {
    keywords: number;
    formatting: number;
    content: number;
    completeness: number;
  };
  weakPoints: WeakPoint[];
  strengths: string[];
  recommendations: Recommendation[];
  summary: string;
};

export default function ATSCheckPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = Number(params.id);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState("");
  const [applyingFixes, setApplyingFixes] = useState<number[]>([]);

  useEffect(() => {
    // Auto-run analysis on mount
    // Triggering rebuild
    runATSCheck();
  }, []);

  const runATSCheck = async () => {
    setIsAnalyzing(true);
    setError("");

    try {
      // Get resume data from localStorage
      const formDataStr = localStorage.getItem(`resume_formData_${templateId}`);
      if (!formDataStr) {
        throw new Error("No resume data found");
      }

      const resumeData = JSON.parse(formDataStr);

      const res = await fetch("/api/ats/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      setAtsResult(data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyRecommendation = async (index: number, recommendation: Recommendation) => {
    setApplyingFixes([...applyingFixes, index]);

    try {
      // Get current form data
      const formDataStr = localStorage.getItem(`resume_formData_${templateId}`);
      if (!formDataStr) return;

      const formData = JSON.parse(formDataStr);

      // Apply the suggestion based on the field
      // This is a simplified version - you'd need more complex logic for different fields
      if (recommendation.field.toLowerCase().includes('summary')) {
        formData.summary.text = recommendation.suggested;
      } else if (recommendation.field.toLowerCase().includes('experience')) {
        // Update the first experience entry as an example
        if (formData.experience.length > 0) {
          formData.experience[0].description = recommendation.suggested;
        }
      }

      // Save back to localStorage
      localStorage.setItem(`resume_formData_${templateId}`, JSON.stringify(formData));

      // Also save to backend
      const resumeId = localStorage.getItem(`resume_${templateId}`);
      if (resumeId) {
        await fetch("/api/resume", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeId,
            formData,
          }),
        });
      }

      // Remove from applying list after a delay
      setTimeout(() => {
        setApplyingFixes(prev => prev.filter(i => i !== index));
      }, 1000);
    } catch (err) {
      console.error(err);
      setApplyingFixes(prev => prev.filter(i => i !== index));
    }
  };

  const handleDownloadResume = () => {
    // Since the resume preview is not rendered on this page, we need to navigate back to the builder
    // and trigger the download there, OR we can render a hidden preview here.
    // For simplicity and reliability (as requested), we'll navigate back to the builder with a query param
    // that triggers the download.
    router.push(`/builder/${templateId}?action=download`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getImpactColor = (impact: string) => {
    if (impact === "high") return "text-red-400 bg-red-500/10 border-red-500/20";
    if (impact === "medium") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-blue-400 bg-blue-500/10 border-blue-500/20";
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0F172A]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/builder/${templateId}`)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">ATS Score Analysis</h1>
              <p className="text-xs text-slate-400">Optimize your resume for Applicant Tracking Systems</p>
            </div>
          </div>
          
          <button
            onClick={runATSCheck}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-[#14B8A6] hover:bg-[#0d9488] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Re-analyze
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Loading State */}
        {isAnalyzing && !atsResult && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <div className="w-24 h-24 border-4 border-[#14B8A6]/20 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileCheck size={32} className="text-[#14B8A6]" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Analyzing Your Resume</h2>
            <p className="text-slate-400 text-sm">This may take a few moments...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
            <AlertTriangle size={24} />
            <div>
              <h3 className="font-bold">Analysis Failed</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {atsResult && (
          <div className="space-y-6">
            {/* Overall Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#14B8A6]/20 border border-[#14B8A6]/30 rounded-full text-[#14B8A6] text-sm font-bold mb-4">
                <Target size={16} />
                ATS Compatibility Score
              </div>
              
              <div className={`text-7xl font-bold mb-4 ${getScoreColor(atsResult.overallScore)}`}>
                {atsResult.overallScore}%
              </div>
              
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {atsResult.summary}
              </p>
            </motion.div>

            {/* Category Scores */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(atsResult.categoryScores).map(([key, score], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-white/10 rounded-xl p-6"
                >
                  <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                    {key}
                  </div>
                  <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Strengths */}
            {atsResult.strengths.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 text-green-400 font-bold mb-4">
                  <CheckCircle size={20} />
                  <h3 className="text-lg">Strengths</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {atsResult.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Weak Points */}
            {atsResult.weakPoints.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 text-red-400 font-bold mb-4">
                  <AlertTriangle size={20} />
                  <h3 className="text-lg">Areas for Improvement</h3>
                </div>
                <div className="space-y-4">
                  {atsResult.weakPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800 border border-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold border ${getImpactColor(point.impact)}`}>
                            {point.impact.toUpperCase()}
                          </span>
                          <h4 className="font-semibold text-white">{point.category}</h4>
                        </div>
                        <span className="text-red-400 text-sm font-mono">-{point.scoreReduction} pts</span>
                      </div>
                      
                      <p className="text-sm text-slate-400 mb-2">
                        <span className="text-red-400 font-semibold">Issue:</span> {point.issue}
                      </p>
                      
                      <p className="text-sm text-green-400">
                        <span className="font-semibold">Fix:</span> {point.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recommendations */}
            {atsResult.recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 text-[#14B8A6] font-bold mb-4">
                  <TrendingUp size={20} />
                  <h3 className="text-lg">AI Suggestions (Click to Apply)</h3>
                </div>
                <div className="space-y-4">
                  {atsResult.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800 border border-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{rec.field}</h4>
                        <button
                          onClick={() => applyRecommendation(idx, rec)}
                          disabled={applyingFixes.includes(idx)}
                          className="px-3 py-1 bg-[#14B8A6] hover:bg-[#0d9488] text-white rounded text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                          {applyingFixes.includes(idx) ? (
                            <>
                              <Loader2 className="animate-spin" size={12} />
                              Applying...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={12} />
                              Apply Fix
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="bg-red-500/10 border-l-4 border-red-500 p-3 rounded">
                          <div className="text-red-400 font-semibold mb-1">Current:</div>
                          <div className="text-slate-300">{rec.current || "Not provided"}</div>
                        </div>
                        
                        <div className="bg-green-500/10 border-l-4 border-green-500 p-3 rounded">
                          <div className="text-green-400 font-semibold mb-1">Suggested:</div>
                          <div className="text-slate-300">{rec.suggested}</div>
                        </div>
                        
                        <div className="text-slate-400 italic text-xs">
                          <strong>Why:</strong> {rec.reason}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-6">
              <button
                onClick={() => router.push(`/builder/${templateId}`)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Editor
              </button>
              
              <button
                onClick={handleDownloadResume}
                className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6] text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <Download size={18} />
                Download Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

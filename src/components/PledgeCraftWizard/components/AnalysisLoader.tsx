"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Check } from "lucide-react";
import { ANALYSIS_PHASES } from "../constants";

interface AnalysisLoaderProps {
  category: string;
  targets: string[];
}

export default function AnalysisLoader({ category, targets }: AnalysisLoaderProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase cycling: advance every 4.5 seconds
    const phaseTimer = setInterval(() => {
      setPhase((p) => (p < ANALYSIS_PHASES.length - 1 ? p + 1 : p));
    }, 4500);
    // Smooth progress bar
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return 95; // cap at 95 until actually done
        return p + 0.4;
      });
    }, 100);
    return () => { clearInterval(phaseTimer); clearInterval(progressTimer); };
  }, []);

  return (
    <motion.div
      key="analysis-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[480px] py-8"
    >
      {/* Central pulse animation */}
      <div className="relative mb-8">
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[var(--primary)]/30"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[var(--primary)]/20"
          animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
        AI가 맞춤형 공약을 설계하고 있습니다
      </h3>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">
        {category} · {targets.join(", ")}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-8">
        <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[#3378FF] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-[var(--text-tertiary)]">분석 진행 중</span>
          <span className="text-[10px] font-bold text-[var(--primary)]">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Phase steps */}
      <div className="w-full max-w-sm space-y-2">
        {ANALYSIS_PHASES.map((p, i) => {
          const isActive = i === phase;
          const isDone = i < phase;
          const isPending = i > phase;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-[var(--primary-50)] border border-[var(--primary)]/20"
                  : isDone
                  ? "bg-emerald-50/60"
                  : "bg-transparent"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : isDone
                  ? "bg-emerald-500 text-white"
                  : "bg-[var(--surface)] text-[var(--text-tertiary)]"
              }`}>
                {isDone ? (
                  <Check className="w-4 h-4" />
                ) : isActive ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <p.icon className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <p.icon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${
                  isActive ? "text-[var(--primary)]" : isDone ? "text-emerald-600" : "text-[var(--text-tertiary)]"
                }`}>
                  {p.label}
                </p>
                {(isActive || isDone) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-[10px] text-[var(--text-tertiary)] truncate"
                  >
                    {p.desc}
                  </motion.p>
                )}
              </div>
              {isActive && (
                <Loader2 className="w-4 h-4 text-[var(--primary)] animate-spin shrink-0" />
              )}
              {isDone && (
                <span className="text-[10px] font-bold text-emerald-500 shrink-0">완료</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

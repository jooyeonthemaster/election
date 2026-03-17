"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  AlertTriangle,
  Brain,
  Target,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { SloganOption, SloganScores } from "../types";
import { ScoreBar } from "./ScoreDisplay";
import { SCORE_LABELS } from "../constants";

interface StepSloganCompareProps {
  slogans: SloganOption[];
  strategicContext: string;
  selectedSlogan: SloganOption | null;
  onSelectSlogan: (s: SloganOption) => void;
}

export default function StepSloganCompare({
  slogans,
  strategicContext,
  selectedSlogan,
  onSelectSlogan,
}: StepSloganCompareProps) {
  const [expandedReasoning, setExpandedReasoning] = useState<number | null>(null);

  return (
    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
        AI가 3가지 슬로건을 제안합니다
      </h3>
      {strategicContext && <p className="text-sm text-[var(--text-secondary)] mb-6">{strategicContext}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slogans.map((s) => {
          const isSelected = selectedSlogan?.id === s.id;
          const approachColor =
            s.approach === "혁신형" ? "text-violet-600 bg-violet-50"
            : s.approach === "신뢰형" ? "text-blue-600 bg-blue-50"
            : s.approach === "공감형" ? "text-emerald-600 bg-emerald-50"
            : "text-amber-600 bg-amber-50";
          const isExpanded = expandedReasoning === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectSlogan(s)}
              className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                isSelected
                  ? "border-pink-500 bg-pink-50/30 shadow-lg shadow-pink-500/10"
                  : "border-[var(--border-light)] hover:border-pink-300 bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${approachColor}`}>
                  {s.approach}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* Main Slogan */}
              <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                &ldquo;{s.mainSlogan}&rdquo;
              </h4>
              {s.subSlogan && <p className="text-xs text-[var(--text-secondary)] mb-3">{s.subSlogan}</p>}

              {/* Variations */}
              <div className="mb-3 space-y-1">
                {[
                  { label: "SNS", val: s.variations.sns },
                  { label: "포스터", val: s.variations.poster },
                  { label: "청년", val: s.variations.youth },
                  { label: "시니어", val: s.variations.senior },
                ].map((v) => (
                  <div key={v.label} className="flex items-start gap-2 text-[10px]">
                    <span className="font-bold text-pink-500 w-8 shrink-0">{v.label}</span>
                    <span className="text-[var(--text-tertiary)]">{v.val}</span>
                  </div>
                ))}
              </div>

              {/* Risk Alerts */}
              {s.riskAlerts && s.riskAlerts.length > 0 && (
                <div className="mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200/50">
                  {s.riskAlerts.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[10px] text-amber-700">
                      <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* AI Reasoning (Toggle) */}
              <div
                onClick={(e) => { e.stopPropagation(); setExpandedReasoning(isExpanded ? null : s.id); }}
                className="mb-3 cursor-pointer"
              >
                <div className="flex items-center gap-1 text-[10px] font-bold text-pink-500 mb-1">
                  <Brain className="w-3 h-3" />
                  AI 분석 근거
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </div>
                {isExpanded && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1 text-[10px] text-[var(--text-secondary)]">
                    <div className="flex items-start gap-1.5"><Target className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /><span><strong>타겟:</strong> {s.reasoning.targetAlignment}</span></div>
                    <div className="flex items-start gap-1.5"><Shield className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" /><span><strong>차별화:</strong> {s.reasoning.differentiation}</span></div>
                    <div className="flex items-start gap-1.5"><Sparkles className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" /><span><strong>감성:</strong> {s.reasoning.emotionalAppeal}</span></div>
                    <div className="flex items-start gap-1.5"><Brain className="w-3 h-3 text-violet-500 shrink-0 mt-0.5" /><span><strong>기억성:</strong> {s.reasoning.memorability}</span></div>
                  </motion.div>
                )}
              </div>

              {/* Scores */}
              <div className="space-y-1.5">
                {(Object.keys(s.scores) as (keyof SloganScores)[]).map((key) => (
                  <ScoreBar key={key} label={SCORE_LABELS[key]} value={s.scores[key]} />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

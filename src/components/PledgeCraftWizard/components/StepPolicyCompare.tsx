"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Policy, Scores } from "../types";
import { SCORE_LABELS } from "../constants";
import ScoreBar from "./ScoreBar";

interface StepPolicyCompareProps {
  situation: string;
  policies: Policy[];
  selectedPolicy: Policy | null;
  setSelectedPolicy: (p: Policy) => void;
}

export default function StepPolicyCompare({
  situation,
  policies,
  selectedPolicy,
  setSelectedPolicy,
}: StepPolicyCompareProps) {
  return (
    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
        AI가 3가지 공약을 제안합니다
      </h3>
      {situation && <p className="text-sm text-[var(--text-secondary)] mb-6">{situation}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {policies.map((p) => {
          const isSelected = selectedPolicy?.id === p.id;
          const approachColor =
            p.approach === "혁신적" ? "text-[var(--accent)] bg-[var(--accent-light)]"
            : p.approach === "실용적" ? "text-[var(--primary)] bg-[var(--primary-50)]"
            : "text-emerald-600 bg-emerald-50";
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPolicy(p)}
              className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary-50)]/50 shadow-lg shadow-[var(--primary)]/10"
                  : "border-[var(--border-light)] hover:border-[var(--primary)]/30 bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${approachColor}`}>
                  {p.approach}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <h4 className="text-base font-bold text-[var(--text-primary)] mb-1">{p.title}</h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">{p.subtitle}</p>
              <ul className="space-y-1.5 mb-4">
                {p.keyPoints.map((kp, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                    <Check className="w-3 h-3 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)] mb-4">
                <span>{p.budget}</span>
                <span>{p.timeline}</span>
              </div>
              {/* Scores */}
              <div className="space-y-1.5">
                {(Object.keys(p.scores) as (keyof Scores)[]).map((key) => (
                  <ScoreBar key={key} label={SCORE_LABELS[key]} value={p.scores[key]} />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

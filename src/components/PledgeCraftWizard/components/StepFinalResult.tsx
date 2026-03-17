"use client";

import { motion } from "framer-motion";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import type { FinalPolicy, Scores } from "../types";
import { SCORE_LABELS } from "../constants";
import ScoreBar from "./ScoreBar";

interface StepFinalResultProps {
  finalPolicy: FinalPolicy;
  copied: boolean;
  onCopyFinal: () => void;
  onReset: () => void;
}

export default function StepFinalResult({
  finalPolicy,
  copied,
  onCopyFinal,
  onReset,
}: StepFinalResultProps) {
  return (
    <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            공약서가 완성되었습니다
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">캠페인에 바로 활용할 수 있는 공약서입니다.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCopyFinal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs font-medium hover:bg-[var(--primary-50)] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "복사됨" : "복사"}
          </button>
          <button onClick={onReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs font-medium hover:bg-[var(--primary-50)] transition-all">
            <RotateCcw className="w-3.5 h-3.5" />
            새 공약
          </button>
        </div>
      </div>

      {/* Policy document */}
      <div className="rounded-2xl border border-[var(--border-light)] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-[#3378FF] p-6 text-white">
          <p className="text-xs font-medium text-white/60 mb-1">네안데르 후보 | 강남구청장 공약</p>
          <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{finalPolicy.title}</h4>
          <p className="text-sm text-white/80 italic">&ldquo;{finalPolicy.slogan}&rdquo;</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Background & Objective */}
          <div>
            <h5 className="text-xs font-bold text-[var(--primary)] mb-1.5 tracking-wider">공약 배경</h5>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{finalPolicy.background}</p>
          </div>
          <div>
            <h5 className="text-xs font-bold text-[var(--primary)] mb-1.5 tracking-wider">목표</h5>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{finalPolicy.objective}</p>
          </div>

          {/* Plans */}
          <div>
            <h5 className="text-xs font-bold text-[var(--primary)] mb-3 tracking-wider">실행 계획</h5>
            <div className="space-y-3">
              {finalPolicy.plans.map((plan, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary-50)] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[var(--primary)]">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{plan.phase}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{plan.content}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{plan.budget}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget & Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[var(--surface)]">
              <h5 className="text-xs font-bold text-[var(--primary)] mb-2">기대 효과</h5>
              <ul className="space-y-1.5">
                {finalPolicy.expectedEffects.map((e, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                    <Sparkles className="w-3 h-3 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-[var(--surface)]">
              <h5 className="text-xs font-bold text-[var(--primary)] mb-2">5축 평가</h5>
              <div className="space-y-1.5">
                {(Object.keys(finalPolicy.scores) as (keyof Scores)[]).map((key) => (
                  <ScoreBar key={key} label={SCORE_LABELS[key]} value={finalPolicy.scores[key]} />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)] text-[10px] text-[var(--text-tertiary)]">
            <span>총 예산: <strong className="text-[var(--text-primary)]">{finalPolicy.totalBudget}</strong></span>
            <span>핵심 타겟: <strong className="text-[var(--text-primary)]">{finalPolicy.targetVoters}</strong></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

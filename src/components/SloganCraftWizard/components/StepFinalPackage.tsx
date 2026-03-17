"use client";

import { motion } from "framer-motion";
import {
  Check,
  Copy,
  X,
  Sparkles,
  Shield,
  AlertTriangle,
} from "lucide-react";
import type { FinalPackage, SloganScores } from "../types";
import { ScoreBar } from "./ScoreDisplay";
import { SCORE_LABELS } from "../constants";

interface StepFinalPackageProps {
  finalPackage: FinalPackage;
  copied: boolean;
  onCopyToClipboard: () => void;
}

export default function StepFinalPackage({
  finalPackage,
  copied,
  onCopyToClipboard,
}: StepFinalPackageProps) {
  return (
    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            슬로건 전략 패키지
          </h3>
          <p className="text-xs text-[var(--text-tertiary)]">네안데르 후보 | 강남구청장</p>
        </div>
        <button
          onClick={onCopyToClipboard}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-xs font-medium hover:bg-pink-50 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "복사됨" : "전체 복사"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Main Slogan Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 text-center">
          <p className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
            &ldquo;{finalPackage.mainSlogan}&rdquo;
          </p>
          {finalPackage.tagline && (
            <p className="text-sm text-white/80">{finalPackage.tagline}</p>
          )}
        </div>

        {/* Strategic Rationale */}
        <div className="p-4 rounded-xl bg-[var(--surface)]">
          <h5 className="text-xs font-bold text-pink-600 mb-2 tracking-wider">전략적 배경</h5>
          <p className="text-sm text-[var(--text-secondary)] mb-3">{finalPackage.strategicRationale.positioning}</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-bold text-[var(--text-primary)] mb-1">타겟 유권자</p>
              <p className="text-[var(--text-tertiary)]">{finalPackage.strategicRationale.targetVoters.join(", ")}</p>
            </div>
            <div>
              <p className="font-bold text-[var(--text-primary)] mb-1">경쟁 차별화</p>
              <p className="text-[var(--text-tertiary)]">{finalPackage.strategicRationale.competitiveDiff}</p>
            </div>
          </div>
        </div>

        {/* Variations Table */}
        <div>
          <h5 className="text-xs font-bold text-pink-600 mb-3 tracking-wider">맥락별 슬로건 변주</h5>
          <div className="space-y-2">
            {finalPackage.variations.map((v, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface)]">
                <span className="text-[10px] font-bold text-pink-500 bg-pink-50 rounded-full px-2 py-0.5 shrink-0 mt-0.5">{v.context}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">&ldquo;{v.slogan}&rdquo;</p>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{v.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <h5 className="text-xs font-bold text-emerald-600 mb-2">DO</h5>
            <ul className="space-y-1">
              {finalPackage.applicationGuide.dos.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                  <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /><span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
            <h5 className="text-xs font-bold text-red-600 mb-2">DON&apos;T</h5>
            <ul className="space-y-1">
              {finalPackage.applicationGuide.donts.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                  <X className="w-3 h-3 text-red-500 shrink-0 mt-0.5" /><span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
            <h5 className="text-xs font-bold text-amber-600 mb-2">BEST PRACTICE</h5>
            <ul className="space-y-1">
              {finalPackage.applicationGuide.bestPractices.map((b, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" /><span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Voter Segment Appeal */}
        <div>
          <h5 className="text-xs font-bold text-pink-600 mb-3 tracking-wider">유권자 세그먼트별 호소력</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {finalPackage.voterSegmentAppeal.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface)]">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[var(--text-primary)]">{v.segment}</span>
                    <span className="text-xs font-bold text-pink-500">{v.appealScore}점</span>
                  </div>
                  <div className="h-1.5 bg-white rounded-full overflow-hidden mb-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${v.appealScore}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400"
                    />
                  </div>
                  <p className="text-[10px] text-[var(--text-tertiary)]">{v.reasoning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[var(--surface)]">
            <h5 className="text-xs font-bold text-pink-600 mb-2">선관위 법적 컴플라이언스</h5>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-2 ${
              finalPackage.legalCompliance.status === "적합" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
            }`}>
              {finalPackage.legalCompliance.status === "적합" ? <Shield className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
              {finalPackage.legalCompliance.status}
            </div>
            <ul className="space-y-1">
              {finalPackage.legalCompliance.checks.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                  <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /><span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)]">
            <h5 className="text-xs font-bold text-pink-600 mb-2">6축 평가</h5>
            <div className="space-y-1.5">
              {(Object.keys(finalPackage.scores) as (keyof SloganScores)[]).map((key) => (
                <ScoreBar key={key} label={SCORE_LABELS[key]} value={finalPackage.scores[key]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Users,
  Target,
  Vote,
  Sparkles,
  Check,
  Loader2,
  Quote,
} from "lucide-react";
import { TARGETS, VOTER_DATA, TONES, PURPOSES, SLOGAN_PHASES } from "../constants";

/* ================================================
   ANALYSIS LOADER
   ================================================ */
function SloganAnalysisLoader({ targets, tone }: { targets: string[]; tone: string }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhase((p) => (p < SLOGAN_PHASES.length - 1 ? p + 1 : p));
    }, 4500);
    const progressTimer = setInterval(() => {
      setProgress((p) => (p >= 95 ? 95 : p + 0.4));
    }, 100);
    return () => { clearInterval(phaseTimer); clearInterval(progressTimer); };
  }, []);

  return (
    <motion.div
      key="slogan-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[480px] py-8"
    >
      <div className="relative mb-8">
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote className="w-10 h-10 text-white" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400/30"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400/20"
          animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
        AI가 전략적 슬로건을 설계하고 있습니다
      </h3>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">
        {tone} · {targets.join(", ")}
      </p>

      <div className="w-full max-w-sm mb-8">
        <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-[var(--text-tertiary)]">전략 분석 중</span>
          <span className="text-[10px] font-bold text-pink-500">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-2">
        {SLOGAN_PHASES.map((p, i) => {
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
                isActive ? "bg-pink-50 border border-pink-200/50" : isDone ? "bg-emerald-50/60" : "bg-transparent"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                isActive ? "bg-pink-500 text-white" : isDone ? "bg-emerald-500 text-white" : "bg-[var(--surface)] text-[var(--text-tertiary)]"
              }`}>
                {isDone ? <Check className="w-4 h-4" /> : isActive ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <p.icon className="w-4 h-4" />
                  </motion.div>
                ) : <p.icon className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${isActive ? "text-pink-600" : isDone ? "text-emerald-600" : "text-[var(--text-tertiary)]"}`}>
                  {p.label}
                </p>
                {(isActive || isDone) && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-[10px] text-[var(--text-tertiary)] truncate">
                    {p.desc}
                  </motion.p>
                )}
              </div>
              {isActive && <Loader2 className="w-4 h-4 text-pink-500 animate-spin shrink-0" />}
              {isDone && <span className="text-[10px] font-bold text-emerald-500 shrink-0">완료</span>}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ================================================
   STEP 0: Context Input
   ================================================ */
interface StepContextInputProps {
  targets: string[];
  tone: string;
  purposes: string[];
  keywords: string;
  isGenerating: boolean;
  onToggleTarget: (t: string) => void;
  onSetTone: (t: string) => void;
  onTogglePurpose: (p: string) => void;
  onSetKeywords: (k: string) => void;
}

export default function StepContextInput({
  targets,
  tone,
  purposes,
  keywords,
  isGenerating,
  onToggleTarget,
  onSetTone,
  onTogglePurpose,
  onSetKeywords,
}: StepContextInputProps) {
  const [infoTarget, setInfoTarget] = useState<string | null>(null);

  if (isGenerating) {
    return <SloganAnalysisLoader targets={targets} tone={tone} />;
  }

  return (
    <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
        슬로건 전략을 설정하세요
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-6">타겟 유권자, 톤, 용도를 선택하면 AI가 전략적 근거에 기반한 슬로건을 설계합니다.</p>

      {/* Targets */}
      <div className="mb-5">
        <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">
          타겟 유권자 (복수 선택) <span className="font-normal text-[var(--text-tertiary)]">— 돋보기를 눌러 실제 데이터를 확인하세요</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TARGETS.map((t) => (
            <div key={t} className="flex items-center gap-0.5">
              <button
                onClick={() => onToggleTarget(t)}
                className={`px-3 py-1.5 rounded-l-full text-xs font-medium transition-all ${
                  targets.includes(t)
                    ? "bg-pink-500 text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border border-r-0 border-[var(--border-light)] hover:border-pink-300"
                }`}
              >
                {t}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setInfoTarget(infoTarget === t ? null : t); }}
                className={`px-1.5 py-1.5 rounded-r-full text-xs transition-all ${
                  targets.includes(t)
                    ? "bg-pink-500 text-white/70 hover:text-white"
                    : "bg-[var(--surface)] text-[var(--text-tertiary)] border border-l-0 border-[var(--border-light)] hover:text-pink-500"
                }`}
              >
                <Search className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Voter Data Popup */}
        <AnimatePresence>
          {infoTarget && VOTER_DATA[infoTarget] && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-3 overflow-hidden"
            >
              <div className="rounded-2xl border border-[var(--border-light)] bg-gradient-to-br from-white to-pink-50/30 shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-400">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/80" />
                    <h4 className="text-sm font-bold text-white">{infoTarget}</h4>
                  </div>
                  <button onClick={() => setInfoTarget(null)} className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1 p-2.5 rounded-xl bg-pink-50 border border-pink-100">
                      <p className="text-[10px] font-bold text-pink-600 mb-0.5">인구 규모</p>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{VOTER_DATA[infoTarget].population}</p>
                      <p className="text-[10px] text-[var(--text-tertiary)]">{VOTER_DATA[infoTarget].ratio}</p>
                    </div>
                    <div className="flex-1 p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                      <p className="text-[10px] font-bold text-amber-600 mb-0.5">투표 성향</p>
                      <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{VOTER_DATA[infoTarget].votingPattern}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-primary)] mb-1.5 flex items-center gap-1"><Target className="w-3 h-3 text-emerald-500" />핵심 가치</p>
                      {VOTER_DATA[infoTarget].values.map((v, i) => (
                        <div key={i} className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)] mb-0.5">
                          <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />{v}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-primary)] mb-1.5 flex items-center gap-1"><Vote className="w-3 h-3 text-rose-500" />정치적 동기</p>
                      {VOTER_DATA[infoTarget].politicalMotivation.map((m, i) => (
                        <div key={i} className="flex items-start gap-1 text-[10px] text-[var(--text-secondary)] mb-0.5">
                          <div className="w-1 h-1 rounded-full bg-rose-400 shrink-0 mt-1" />{m}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[9px] text-[var(--text-tertiary)] text-right pt-1 border-t border-[var(--border-light)]">
                    출처: 강남구청, 통계청, 중앙선관위 (2024~2025 기준)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tone */}
      <div className="mb-5">
        <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">캠페인 톤</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TONES.map((t) => (
            <button
              key={t.id}
              onClick={() => onSetTone(t.id)}
              className={`text-left p-3 rounded-xl border-2 transition-all ${
                tone === t.id
                  ? "border-pink-500 bg-pink-50/50 shadow-sm"
                  : "border-[var(--border-light)] hover:border-pink-300 bg-white"
              }`}
            >
              <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${t.color} flex items-center justify-center mb-2`}>
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)]">{t.label}</p>
              <p className="text-[10px] text-[var(--text-tertiary)]">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Purposes */}
      <div className="mb-5">
        <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">슬로건 용도 (복수 선택)</label>
        <div className="flex flex-wrap gap-2">
          {PURPOSES.map((p) => (
            <button
              key={p}
              onClick={() => onTogglePurpose(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                purposes.includes(p)
                  ? "bg-pink-500 text-white"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-pink-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div>
        <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">핵심 키워드 (선택)</label>
        <input
          value={keywords}
          onChange={(e) => onSetKeywords(e.target.value)}
          placeholder="예: 청년일자리, 강남의 미래, 재건축 정상화, 스마트 도시..."
          className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/10"
        />
      </div>
    </motion.div>
  );
}

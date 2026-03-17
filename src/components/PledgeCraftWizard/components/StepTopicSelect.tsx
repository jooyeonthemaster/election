"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Users, TrendingUp, Target, Vote } from "lucide-react";
import { CATEGORIES, TARGETS, VOTER_DATA, PRIORITIES, BUDGETS } from "../constants";

interface StepTopicSelectProps {
  step: number;
  category: string;
  setCategory: (v: string) => void;
  targets: string[];
  toggleTarget: (t: string) => void;
  priority: string;
  setPriority: (v: string) => void;
  budgetScale: string;
  setBudgetScale: (v: string) => void;
  concern: string;
  setConcern: (v: string) => void;
  infoTarget: string | null;
  setInfoTarget: (v: string | null) => void;
}

export default function StepTopicSelect({
  step,
  category,
  setCategory,
  targets,
  toggleTarget,
  priority,
  setPriority,
  budgetScale,
  setBudgetScale,
  concern,
  setConcern,
  infoTarget,
  setInfoTarget,
}: StepTopicSelectProps) {
  if (step === 0) {
    return (
      <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
          어떤 분야의 공약을 개발할까요?
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-6">강남구 핵심 정책 분야를 선택하세요. 각 분야의 현황 데이터가 자동으로 반영됩니다.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`group text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                category === c.id
                  ? "border-[var(--primary)] bg-[var(--primary-50)] shadow-md shadow-[var(--primary)]/10"
                  : "border-[var(--border-light)] hover:border-[var(--primary)]/30 bg-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">{c.id}</p>
              <p className="text-[10px] text-[var(--text-tertiary)] leading-snug">{c.stat}</p>
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  // step === 1
  return (
    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
        누구를 위한 공약인가요?
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-6">타겟 유권자, 우선순위, 예산 규모를 설정하면 AI가 맞춤형 공약을 생성합니다.</p>

      {/* Targets */}
      <div className="mb-5">
        <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">타겟 유권자 (복수 선택) <span className="font-normal text-[var(--text-tertiary)]">— 돋보기를 눌러 실제 데이터를 확인하세요</span></label>
        <div className="flex flex-wrap gap-2">
          {TARGETS.map((t) => (
            <div key={t} className="flex items-center gap-0.5">
              <button
                onClick={() => toggleTarget(t)}
                className={`px-3 py-1.5 rounded-l-full text-xs font-medium transition-all ${
                  targets.includes(t)
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border border-r-0 border-[var(--border-light)] hover:border-[var(--primary)]/30"
                }`}
              >
                {t}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setInfoTarget(infoTarget === t ? null : t); }}
                className={`px-1.5 py-1.5 rounded-r-full text-xs transition-all ${
                  targets.includes(t)
                    ? "bg-[var(--primary)] text-white/70 hover:text-white"
                    : "bg-[var(--surface)] text-[var(--text-tertiary)] border border-l-0 border-[var(--border-light)] hover:text-[var(--primary)]"
                }`}
                title={`${t} 유권자 데이터 보기`}
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
              <div className="rounded-2xl border border-[var(--border-light)] bg-gradient-to-br from-white to-[#F8FAFD] shadow-lg overflow-hidden">
                {/* Popup Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[var(--primary)] to-[#3378FF]">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/80" />
                    <h4 className="text-sm font-bold text-white">{infoTarget}</h4>
                  </div>
                  <button onClick={() => setInfoTarget(null)} className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  {/* Population */}
                  <div className="flex gap-4">
                    <div className="flex-1 p-3 rounded-xl bg-[var(--primary-50)] border border-[var(--primary)]/10">
                      <p className="text-[10px] font-bold text-[var(--primary)] mb-0.5 tracking-wider">인구 규모</p>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{VOTER_DATA[infoTarget].population}</p>
                      <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{VOTER_DATA[infoTarget].ratio}</p>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-amber-50 border border-amber-200/50">
                      <p className="text-[10px] font-bold text-amber-600 mb-0.5 tracking-wider">투표 성향</p>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{VOTER_DATA[infoTarget].votingPattern}</p>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <p className="text-[10px] font-bold text-[var(--text-primary)] tracking-wider">핵심 통계</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {VOTER_DATA[infoTarget].keyStats.map((stat, i) => (
                        <div key={i} className="flex items-start gap-1.5 px-2.5 py-2 rounded-lg bg-[var(--surface)]">
                          <span className="text-[9px] font-bold text-[var(--primary)] bg-[var(--primary-50)] rounded-full w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-[11px] text-[var(--text-secondary)] leading-snug">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Values & Motivations */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Target className="w-3.5 h-3.5 text-emerald-500" />
                        <p className="text-[10px] font-bold text-[var(--text-primary)] tracking-wider">핵심 가치관</p>
                      </div>
                      <div className="space-y-1">
                        {VOTER_DATA[infoTarget].values.map((v, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            {v}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Vote className="w-3.5 h-3.5 text-rose-500" />
                        <p className="text-[10px] font-bold text-[var(--text-primary)] tracking-wider">정치적 동기</p>
                      </div>
                      <div className="space-y-1">
                        {VOTER_DATA[infoTarget].politicalMotivation.map((m, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1" />
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Source */}
                  <p className="text-[9px] text-[var(--text-tertiary)] text-right pt-1 border-t border-[var(--border-light)]">
                    출처: 강남구청, 통계청, 중앙선관위, 서울열린데이터광장 (2024~2025 기준)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Priority */}
      <div className="mb-5">
        <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">우선순위</label>
        <div className="flex flex-wrap gap-2">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                priority === p
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-[var(--primary)]/30"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-5">
        <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">예산 규모</label>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              onClick={() => setBudgetScale(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                budgetScale === b
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-[var(--primary)]/30"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Concern */}
      <div>
        <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">핵심 관심사 (선택)</label>
        <input
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          placeholder="예: 대치동 학원비 부담 해소, 위례신사선 조기 착공..."
          className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--primary)]/40 focus:ring-2 focus:ring-[var(--primary)]/10"
        />
      </div>
    </motion.div>
  );
}

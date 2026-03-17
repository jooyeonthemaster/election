"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Tablet, Smartphone, Heart } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { pledgeCategories, pledgeCards } from "../constants";

/* ─── Interactive Pledge Book Mockup ─── */

function PledgeBookMockup() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] shadow-2xl overflow-hidden max-w-3xl mx-auto">
      {/* Mockup browser chrome */}
      <div className="flex items-center gap-2 px-5 py-3 bg-[#F8FAFC] border-b border-[var(--border-light)]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <div
          className="ml-4 flex-1 h-7 bg-white rounded-lg border border-[var(--border-light)] flex items-center px-3"
        >
          <span
            className="text-[11px] text-[var(--text-tertiary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            pledge.electai.kr/kim-candidate
          </span>
        </div>
      </div>

      {/* Candidate header */}
      <div className="bg-gradient-to-r from-[#0052FF] to-[#3B82F6] p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold shrink-0">
            K
          </div>
          <div>
            <p className="text-sm text-white/70 font-medium">서울특별시 OO구 기초의원 후보</p>
            <h3
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              김선거 후보의 공약집
            </h3>
            <p className="text-sm text-white/60 mt-1">
              &ldquo;함께 만드는 살기 좋은 OO구&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex border-b border-[var(--border-light)] overflow-x-auto">
        {pledgeCategories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(i)}
            className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors relative cursor-pointer ${
              activeCategory === i
                ? "text-[var(--primary)]"
                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {cat}
            {activeCategory === i && (
              <motion.div
                layoutId="pledge-tab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--primary)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Pledge cards */}
      <div className="p-5 space-y-4 bg-[#FAFBFD]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {pledgeCards.map((pledge, i) => (
              <motion.div
                key={pledge.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl border border-[var(--border-light)] p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-[15px] font-bold text-[var(--text-primary)]">
                    {pledge.title}
                  </h4>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary-50)] text-[var(--primary)] shrink-0"
                  >
                    {pledgeCategories[activeCategory]}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {pledge.desc}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)] mb-4">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-[var(--text-primary)]">예산</span>{" "}
                    {pledge.budget}
                  </span>
                  <span className="w-px h-3 bg-[var(--border)]" />
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-[var(--text-primary)]">기간</span>{" "}
                    {pledge.timeline}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[var(--text-tertiary)]">이행률</span>
                    <span className="font-semibold text-[var(--primary)]">선거 전</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--surface)]">
                    <div className="h-full rounded-full bg-[var(--primary)] w-0" />
                  </div>
                </div>
                {/* Like button */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--primary-50)] transition-colors text-sm cursor-pointer group">
                    <Heart className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors" />
                    <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors">
                      관심있어요
                    </span>
                    <span className="text-xs font-bold text-[var(--text-tertiary)]">
                      {pledge.likes.toLocaleString()}
                    </span>
                  </button>
                  <button className="text-xs font-medium text-[var(--primary)] hover:underline cursor-pointer">
                    자세히 보기
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Live Preview Section ─── */

export default function PledgePreview() {
  return (
    <section id="live-preview" className="py-24 md:py-32 bg-white relative">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
            <Monitor className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-semibold text-[var(--primary)]">실시간 미리보기</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            실제로 이렇게{" "}
            <span className="text-gradient-primary">보입니다</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            카테고리별 공약을 탐색하고, 관심 공약에 반응하고, 예산과 일정을 한눈에 파악할 수 있습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <PledgeBookMockup />
        </FadeIn>

        {/* Device indicators */}
        <FadeIn delay={0.4} className="mt-10">
          <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-tertiary)]">
            {[
              { icon: Monitor, label: "데스크톱" },
              { icon: Tablet, label: "태블릿" },
              { icon: Smartphone, label: "모바일" },
            ].map((device) => (
              <div key={device.label} className="flex items-center gap-2">
                <device.icon className="w-4 h-4" />
                <span className="font-medium">{device.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

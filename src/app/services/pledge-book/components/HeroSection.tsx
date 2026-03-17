"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight, Share2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

/* ─── Hero Visual: Tablet + Phone Mockup ─── */

function HeroVisual() {
  const barData = [
    { label: "교육", value: 35, color: "#0052FF" },
    { label: "복지", value: 25, color: "#7C3AED" },
    { label: "경제", value: 20, color: "#059669" },
    { label: "환경", value: 12, color: "#D97706" },
    { label: "교통", value: 8, color: "#E11D48" },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Tablet frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative bg-[#1A1A2E] rounded-[24px] p-3 shadow-2xl"
      >
        <div className="bg-white rounded-[16px] overflow-hidden">
          {/* Tablet header bar */}
          <div className="bg-gradient-to-r from-[#0052FF] to-[#3B82F6] px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30" />
              <div>
                <div className="h-2.5 w-24 bg-white/80 rounded-full" />
                <div className="h-2 w-16 bg-white/40 rounded-full mt-1.5" />
              </div>
            </div>
            {/* Category pills */}
            <div className="flex gap-2">
              {["교육", "복지", "경제", "환경"].map((cat, i) => (
                <div
                  key={cat}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                    i === 0
                      ? "bg-white text-[#0052FF]"
                      : "bg-white/15 text-white/70"
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Pledge cards preview */}
            <div className="space-y-3">
              {[
                { title: "무상 교복 지원 확대", budget: "12억원", pct: 78 },
                { title: "학교 돌봄교실 24시", budget: "28억원", pct: 45 },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border-light)]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[13px] font-bold text-[var(--text-primary)]">
                      {card.title}
                    </span>
                    <span className="text-[10px] font-semibold text-[var(--primary)] bg-[var(--primary-50)] px-2 py-0.5 rounded-full">
                      {card.budget}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--border-light)] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[var(--primary)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-[var(--text-tertiary)]">관심도</span>
                    <span className="text-[10px] font-bold text-[var(--primary)]">{card.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Budget pie chart mockup */}
            <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border-light)]">
              <p className="text-[12px] font-bold text-[var(--text-primary)] mb-3">예산 배분 현황</p>
              {/* Horizontal bar chart */}
              <div className="space-y-2.5">
                {barData.map((item, i) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[var(--text-secondary)] font-medium">{item.label}</span>
                      <span className="font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--border-light)] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 1 + i * 0.12,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Phone frame - overlapping bottom-right */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute -bottom-8 -right-4 md:right-4 w-[160px] md:w-[200px] bg-[#1A1A2E] rounded-[20px] p-2 shadow-2xl"
      >
        <div className="bg-white rounded-[14px] overflow-hidden">
          <div className="bg-gradient-to-b from-[#0052FF] to-[#3B82F6] p-3 text-center">
            <div className="w-8 h-8 rounded-full bg-white/20 mx-auto mb-1.5 border border-white/30" />
            <div className="h-2 w-12 bg-white/60 rounded-full mx-auto" />
          </div>
          <div className="p-2.5 space-y-2">
            {["교육", "복지", "경제"].map((cat, i) => (
              <div key={cat} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: ["#0052FF", "#7C3AED", "#059669"][i],
                  }}
                />
                <div className="flex-1 h-1.5 rounded-full bg-[var(--border-light)]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: ["#0052FF", "#7C3AED", "#059669"][i],
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${[75, 55, 40][i]}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 w-12 h-12 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center"
      >
        <BookOpen className="w-5 h-5 text-[#7C3AED]" />
      </motion.div>
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 -right-8 w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center"
      >
        <Share2 className="w-4 h-4 text-[var(--accent)]" />
      </motion.div>
    </div>
  );
}

/* ─── Hero Section ─── */

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-[#7C3AED] rounded-full blur-[200px] opacity-[0.04]" />
      <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-[var(--primary)] rounded-full blur-[200px] opacity-[0.03]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE9FE] border border-[#7C3AED]/10 mb-8">
              <BookOpen className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-sm font-semibold text-[#7C3AED]">
                인터랙티브 공약집
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-6xl lg:text-[68px] font-extrabold leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[var(--text-primary)]">공약집의 미래,</span>
              <br />
              <span
                className="bg-gradient-to-r from-[#7C3AED] to-[#0052FF] bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                인터랙티브 웹으로
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
              PDF 공약집은 그만. AI가 디자인한 인터랙티브 웹 공약집으로
              <br className="hidden md:block" />
              유권자 참여를 극대화하세요.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#live-preview"
                className="group flex items-center gap-2.5 px-8 py-4 bg-[var(--primary)] text-white text-[16px] font-bold rounded-2xl hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-[var(--shadow-primary)] hover:scale-[1.02]"
              >
                만들어보기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#templates"
                className="flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--text-primary)] text-[16px] font-bold rounded-2xl border-2 border-[var(--border)] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-300"
              >
                템플릿 미리보기
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <HeroVisual />
        </FadeIn>
      </div>
    </section>
  );
}

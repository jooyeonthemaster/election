"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Check,
  Zap,
  Shield,
  Database,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ChatInterface from "@/components/ChatInterface";
import {
  problems,
  solutions,
  features,
  steps,
  metrics,
  useCases,
  AnimatedCounter,
  HeroChatMockup,
} from "./constants";

/* =====================================================
   PAGE
   ===================================================== */

export default function PledgeBotPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[200px] opacity-[0.03]" />

        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-blue-400 opacity-10"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-orange-300 opacity-10"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <div>
              <FadeIn delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/10 mb-8">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-sm font-semibold text-[var(--accent)]">
                    BEST 인기 서비스
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-[var(--text-primary)]">
                    후보자의 목소리로
                  </span>
                  <br />
                  <span className="text-gradient-primary">공약을 전합니다</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                  AI가 후보자의 말투, 성격, 핵심 가치관을 학습하여 유권자의
                  질문에 24시간 답변합니다. 실제 후보자와 대화하는 듯한 자연스러운
                  소통으로 공약 전달력을 극대화하세요.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="#demo"
                    className="group flex items-center gap-2.5 px-8 py-4 bg-[var(--primary)] text-white text-[16px] font-bold rounded-2xl hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-[var(--shadow-primary)] hover:scale-[1.02]"
                  >
                    지금 시작하기
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-[var(--text-tertiary)]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--success)]" />
                    <span>5분 만에 설정 완료</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--success)]" />
                    <span>선관위 가이드라인 준수</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right - Chat Mockup */}
            <FadeIn delay={0.3} direction="left">
              <HeroChatMockup />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ====== PROBLEM / SOLUTION SECTION ====== */}
      <section className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[300px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          {/* Problems */}
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--danger)]" />
              <span className="text-sm font-semibold text-[var(--danger)]">
                기존 유권자 소통의 한계
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              선거 캠프가 직면한{" "}
              <span className="text-[var(--danger)]">3가지 문제</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {problems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-[var(--border-light)] h-full hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-[var(--danger)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Arrow */}
          <FadeIn className="flex justify-center mb-16">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-[var(--primary)]">
                AI 공약 챗봇의 해결책
              </span>
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center animate-bounce">
                <ChevronRight className="w-5 h-5 text-white rotate-90" />
              </div>
            </div>
          </FadeIn>

          {/* Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border-2 border-[var(--primary)]/10 h-full hover:shadow-lg hover:border-[var(--primary)]/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary-50)] flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== KEY FEATURES GRID ====== */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Zap className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">
                핵심 기능
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-primary">6가지 핵심 기능</span>으로
              <br />
              완벽한 유권자 소통
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              단순한 챗봇이 아닙니다. AI가 후보자의 철학과 가치관까지 학습하여
              유권자에게 진정성 있는 소통 경험을 제공합니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-8 border border-[var(--border-light)] h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-400">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INTERACTIVE DEMO SECTION ====== */}
      <section
        id="demo"
        className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[250px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[250px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">
                AI 실시간 체험
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              직접 <span className="text-gradient-primary">대화</span>해보세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              강남구 정책과 공약에 대해 AI 정책비서에게 무엇이든 물어보세요.
              <br className="hidden md:block" />
              실제 강남구 데이터를 기반으로 즉시 답변합니다.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <ChatInterface />
            </div>
          </FadeIn>

          {/* Trust badges */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--primary)]" />
                <span>선관위 가이드라인 준수</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--primary)]" />
                <span>실시간 AI 응답</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[var(--primary)]" />
                <span>2026년 최신 데이터 기반</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              시작은{" "}
              <span className="text-gradient-primary">간단합니다</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              4단계로 완성하는 AI 공약 챗봇. 복잡한 기술 지식 없이도 누구나
              시작할 수 있습니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="relative bg-white rounded-2xl p-8 border border-[var(--border-light)] h-full hover:shadow-xl transition-all duration-300 group">
                  {/* Step number */}
                  <div
                    className="text-[64px] font-extrabold text-[var(--primary)]/5 absolute top-4 right-6 leading-none select-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.num}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary-50)] flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-[var(--primary)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div
                    className="text-xs font-bold text-[var(--primary)] mb-3 tracking-wider"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    STEP {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Connector arrow */}
                  {i < 3 && (
                    <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)]" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== METRICS SECTION ====== */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#0B1222] to-[#141E33] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)] rounded-full blur-[300px] opacity-[0.08]" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              숫자로 증명합니다
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              실제 선거 캠프에서 검증된 AI 공약 챗봇의 성과입니다
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.1} className="text-center">
                <AnimatedCounter value={m.value} suffix={m.suffix} />
                <p className="mt-3 text-base font-semibold text-white/80">
                  {m.label}
                </p>
                <p className="mt-1 text-xs text-white/40">{m.sub}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== USE CASES ====== */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/10 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-semibold text-[var(--accent)]">
                활용 사례
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              이렇게 <span className="text-gradient-accent">활용</span>하세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              다양한 선거 현장에서 AI 공약 챗봇이 어떻게 활용되는지 확인하세요
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {useCases.map((uc, i) => (
              <FadeIn key={uc.title} delay={i * 0.12}>
                <div className="group bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-400">
                  {/* Visual top */}
                  <div className="relative bg-gradient-to-br from-[var(--primary-50)] to-[var(--surface)] p-8 text-center border-b border-[var(--border-light)]">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <uc.icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                      {uc.img}
                    </p>
                  </div>
                  {/* Content */}
                  <div className="p-7">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                      {uc.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

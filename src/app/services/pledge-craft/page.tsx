"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Lightbulb,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  BarChart3,
  Users,
  Shield,
  Brain,
  Layers,
  GitCompare,
  FileText,
  MessageSquare,
  Zap,
  Database,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import PledgeCraftWizard from "@/components/PledgeCraftWizard";

/* =====================================================
   DATA
   ===================================================== */

const differentiators = [
  {
    icon: Database,
    title: "실제 데이터 기반",
    desc: "강남구 예산 1.48조원, 인구 55.6만명, 22개 행정동 데이터가 사전 학습되어 현실적인 공약만 생성합니다.",
    bad: "GPT: 일반적인 정책 제안",
    good: "ElectAI: 강남구 실정 맞춤 공약",
  },
  {
    icon: GitCompare,
    title: "3가지 대안 비교",
    desc: "하나의 답이 아닌, 실용적·혁신적·점진적 3가지 접근법을 동시에 제안하고 5축 평가로 비교합니다.",
    bad: "GPT: 단일 답변",
    good: "ElectAI: 3개 대안 + 5축 비교분석",
  },
  {
    icon: Target,
    title: "타겟 유권자 맞춤",
    desc: "청년, 학부모, 시니어 등 타겟 유권자를 지정하면 해당 계층의 니즈에 최적화된 공약을 생성합니다.",
    bad: "GPT: 범용 정책",
    good: "ElectAI: 유권자 세그먼트 맞춤",
  },
  {
    icon: BarChart3,
    title: "5축 정량 평가",
    desc: "실현가능성, 예산효율, 주민호감도, 차별성, 파급효과를 정량 평가하여 객관적 판단 근거를 제공합니다.",
    bad: "GPT: 정성적 설명만",
    good: "ElectAI: 5축 점수 + 정량 분석",
  },
  {
    icon: MessageSquare,
    title: "대화형 정제",
    desc: "생성된 공약을 채팅으로 수정하고 발전시킵니다. 예산 조정, 일정 변경, 세부 사업 추가를 실시간으로.",
    bad: "GPT: 재생성 필요",
    good: "ElectAI: 대화로 실시간 조정",
  },
  {
    icon: FileText,
    title: "캠페인 레디 출력",
    desc: "최종 공약서를 배경·목표·실행계획·예산·기대효과 구조로 정리하여 캠프에서 바로 활용할 수 있습니다.",
    bad: "GPT: 비정형 텍스트",
    good: "ElectAI: 구조화된 공약서 출력",
  },
];

const steps = [
  { num: "01", title: "분야 선택", desc: "교통, 교육, 주거, 환경 등 8개 핵심 분야 중 선택. 강남구 분야별 현황 데이터가 자동 반영됩니다.", icon: Layers },
  { num: "02", title: "조건 설정", desc: "타겟 유권자, 우선순위, 예산 규모, 핵심 관심사를 설정합니다. 세밀한 조건이 더 정교한 공약을 만듭니다.", icon: Target },
  { num: "03", title: "AI 공약 생성", desc: "3가지 접근법의 공약을 동시에 생성하고, 5축 평가 점수로 비교 분석합니다. 최적의 공약을 선택하세요.", icon: Brain },
  { num: "04", title: "대화형 정제", desc: "선택한 공약을 AI와 대화하며 구체화합니다. 예산 조정, 사업 추가 등 실시간으로 발전시킵니다.", icon: MessageSquare },
  { num: "05", title: "공약서 완성", desc: "캠페인에 즉시 활용 가능한 구조화된 공약서를 자동 생성합니다. 복사하여 바로 사용하세요.", icon: FileText },
];

/* =====================================================
   PAGE
   ===================================================== */

export default function PledgeCraftPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ====== HERO ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-[var(--primary)] rounded-full blur-[200px] opacity-[0.03]" />

        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[15%] w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-orange-300 opacity-10"
        />
        <motion.div
          animate={{ y: [8, -12, 8], rotate: [0, 3, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-[18%] w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-400 opacity-10"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/10 mb-8">
                <Lightbulb className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-sm font-semibold text-[var(--accent)]">AI 공약 개발 엔진</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[var(--text-primary)]">데이터가 만드는</span>
                <br />
                <span className="text-gradient-accent">맞춤형 공약</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto">
                강남구 예산·인구·현안 데이터를 기반으로 AI가 실현 가능한 공약을 설계합니다.
                3가지 대안을 비교하고, 대화로 정제하여, 캠페인 레디 공약서를 완성하세요.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#craft"
                  className="group flex items-center gap-2.5 px-8 py-4 bg-[var(--primary)] text-white text-[16px] font-bold rounded-2xl hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-[var(--shadow-primary)] hover:scale-[1.02]"
                >
                  공약 개발 시작하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#how"
                  className="flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--text-primary)] text-[16px] font-bold rounded-2xl border-2 border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
                >
                  작동 원리 보기
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[var(--text-tertiary)]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  <span>강남구 실제 데이터 기반</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  <span>5축 정량 평가</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  <span>캠페인 레디 출력</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ====== DIFFERENTIATORS ====== */}
      <section className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[300px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Zap className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">GPT와의 차이</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              일반 AI와는 <span className="text-gradient-primary">차원이 다릅니다</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              범용 AI에게 공약을 물어보면 뻔한 답이 나옵니다. ElectAI는 강남구 데이터와 선거 전문 로직이 내장되어 있습니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <FadeIn key={d.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-7 border border-[var(--border-light)] h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <d.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{d.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{d.desc}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="text-[var(--text-tertiary)] line-through">{d.bad}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[var(--primary)] font-semibold">{d.good}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section id="how" className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-gradient-primary">5단계</span>로 완성하는 맞춤 공약
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              분야 선택부터 캠페인 레디 공약서까지, AI가 단계별로 안내합니다.
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-4">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div className="group flex items-start gap-5 bg-white rounded-2xl p-6 border border-[var(--border-light)] hover:shadow-lg transition-all duration-300">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary-50)] flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors duration-300">
                      <s.icon className="w-6 h-6 text-[var(--primary)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-[var(--primary)] tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>STEP {s.num}</span>
                      <h3 className="text-base font-bold text-[var(--text-primary)]">{s.title}</h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--text-tertiary)] shrink-0 mt-3 group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INTERACTIVE WIZARD ====== */}
      <section id="craft" className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[250px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[250px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">AI 공약 개발 엔진</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              직접 <span className="text-gradient-primary">공약</span>을 만들어보세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              강남구 데이터 기반으로 AI가 맞춤형 공약을 설계합니다. 분야를 선택하고 시작하세요.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <PledgeCraftWizard />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--primary)]" />
                <span>선관위 가이드라인 준수</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[var(--primary)]" />
                <span>강남구 실제 데이터 기반</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--primary)]" />
                <span>유권자 세그먼트 맞춤</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-[var(--primary)] to-[#0043CC] rounded-3xl p-12 md:p-20 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-grid opacity-5" />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8"
                >
                  <Lightbulb className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  데이터 기반 공약으로
                  <br />
                  유권자를 설득하세요
                </h2>
                <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                  강남구 556,330명의 주민이 체감할 수 있는 공약을 AI가 함께 만듭니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="#craft"
                    className="group flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--primary)] text-[16px] font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    지금 시작하기
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

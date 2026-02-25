"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Quote,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  BarChart3,
  Users,
  Shield,
  Brain,
  Layers,
  MessageSquare,
  Zap,
  Database,
  FileText,
  Megaphone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SloganCraftWizard from "@/components/SloganCraftWizard";

/* =====================================================
   DATA
   ===================================================== */

const differentiators = [
  {
    icon: Database,
    title: "유권자 심리 데이터 내장",
    desc: "강남구 8개 유권자 세그먼트(청년·학부모·시니어 등)의 투표 동기, 핵심 관심사, 심리적 트리거가 사전 학습되어 있습니다.",
    bad: "GPT: 일반적인 문구 생성",
    good: "ElectAI: 유권자 심리 기반 슬로건",
  },
  {
    icon: BarChart3,
    title: "6축 정량 평가",
    desc: "기억성·유권자 공명·차별성·진정성·활용도·법적 안전성을 정량 분석하여 '감'이 아닌 '데이터'로 슬로건을 검증합니다.",
    bad: "GPT: 주관적 느낌에 의존",
    good: "ElectAI: 6축 점수로 객관적 검증",
  },
  {
    icon: Target,
    title: "경쟁 후보 차별화 분석",
    desc: "야당 후보의 통상적 프레임(복지·평등·참여)을 사전 분석하여 메시지가 겹치지 않는 차별화된 슬로건을 설계합니다.",
    bad: "GPT: 경쟁 분석 없음",
    good: "ElectAI: 차별화 전략 내장",
  },
  {
    icon: Layers,
    title: "맥락별 4종 변주",
    desc: "하나의 슬로건을 SNS·포스터·청년·시니어 버전으로 자동 변주합니다. 채널별 최적화된 메시지를 즉시 활용하세요.",
    bad: "GPT: 단일 텍스트 출력",
    good: "ElectAI: 4종 맥락별 자동 변주",
  },
  {
    icon: MessageSquare,
    title: "전략적 대화형 정제",
    desc: "AI가 수정 이유를 전략적 근거와 함께 설명합니다. '더 짧게', '더 강하게' 등 빠른 조정으로 실시간 발전시킵니다.",
    bad: "GPT: 이유 없는 재생성",
    good: "ElectAI: 전략 근거 + 실시간 정제",
  },
  {
    icon: FileText,
    title: "캠페인 레디 패키지",
    desc: "슬로건+전략배경+맥락변주+활용가이드+법적검증을 하나의 패키지로 출력합니다. 캠프에서 바로 사용 가능합니다.",
    bad: "GPT: 슬로건 텍스트만",
    good: "ElectAI: 전략 패키지 일체 출력",
  },
];

const steps = [
  { num: "01", title: "전략 방향 설정", desc: "타겟 유권자, 캠페인 톤, 슬로건 용도, 키워드를 설정합니다. 각 유권자 세그먼트의 특성을 확인하며 정밀한 전략을 수립하세요.", icon: Target },
  { num: "02", title: "AI 슬로건 생성", desc: "3가지 접근법(혁신형·신뢰형·공감형)의 슬로건을 동시에 생성합니다. 6축 점수, AI 분석 근거, 4종 변주를 확인하세요.", icon: Brain },
  { num: "03", title: "대화형 정제", desc: "선택한 슬로건을 AI와 대화하며 발전시킵니다. 수정마다 전략적 근거가 제시되어 왜 이렇게 바뀌었는지 투명하게 이해할 수 있습니다.", icon: MessageSquare },
  { num: "04", title: "전략 패키지 완성", desc: "메인 슬로건+맥락별 변주 5종+활용 가이드+유권자 호소력 분석+법적 검증이 포함된 캠페인 레디 패키지를 완성합니다.", icon: Megaphone },
];

/* =====================================================
   PAGE
   ===================================================== */

export default function SloganCraftPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ====== HERO ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-pink-500 rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-rose-400 rounded-full blur-[200px] opacity-[0.03]" />

        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[15%] w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-300 opacity-10"
        />
        <motion.div
          animate={{ y: [8, -12, 8], rotate: [0, 3, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-[18%] w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-300 opacity-10"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200/50 mb-8">
                <Quote className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-semibold text-pink-600">AI 슬로건 전략 엔진</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[var(--text-primary)]">전략이 담긴</span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">캠페인 슬로건</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto">
                유권자 심리 분석과 6축 정량 평가로 검증된 슬로건을 생성합니다.
                맥락별 변주와 전략 패키지로 캠페인에 즉시 활용하세요.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#craft"
                  className="group flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white text-[16px] font-bold rounded-2xl hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  슬로건 제작 시작하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#how"
                  className="flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--text-primary)] text-[16px] font-bold rounded-2xl border-2 border-[var(--border)] hover:border-pink-400 hover:text-pink-500 transition-all duration-300"
                >
                  작동 원리 보기
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[var(--text-tertiary)]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-500" />
                  <span>6축 정량 평가</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-500" />
                  <span>맥락별 4종 변주</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-500" />
                  <span>선관위 법적 검증</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ====== DIFFERENTIATORS ====== */}
      <section className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-400 rounded-full blur-[300px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200/50 mb-6">
              <Zap className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-semibold text-pink-600">GPT와의 차이</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              일반 AI 슬로건과는 <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">차원이 다릅니다</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              범용 AI에게 슬로건을 물어보면 뻔한 문구가 나옵니다. ElectAI는 유권자 심리와 선거 전략 로직이 내장되어 있습니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <FadeIn key={d.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-7 border border-[var(--border-light)] h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
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
                      <span className="text-pink-500 font-semibold">{d.good}</span>
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
              <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">4단계</span>로 완성하는 전략 슬로건
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              전략 설정부터 캠페인 레디 패키지까지, AI가 단계별로 안내합니다.
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-4">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div className="group flex items-start gap-5 bg-white rounded-2xl p-6 border border-[var(--border-light)] hover:shadow-lg transition-all duration-300">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-rose-400 transition-all duration-300">
                      <s.icon className="w-6 h-6 text-pink-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-pink-500 tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>STEP {s.num}</span>
                      <h3 className="text-base font-bold text-[var(--text-primary)]">{s.title}</h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--text-tertiary)] shrink-0 mt-3 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INTERACTIVE WIZARD ====== */}
      <section id="craft" className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-400 rounded-full blur-[250px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-300 rounded-full blur-[250px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-semibold text-pink-600">AI 슬로건 전략 엔진</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              직접 <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">슬로건</span>을 만들어보세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              유권자 심리 데이터와 6축 전략 평가로 검증된 캠페인 슬로건을 설계합니다.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <SloganCraftWizard />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-pink-500" />
                <span>선관위 법적 안전성 검증</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-pink-500" />
                <span>유권자 심리 데이터 기반</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-pink-500" />
                <span>8개 세그먼트 맞춤</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-pink-500 to-rose-400 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
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
                  <Quote className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  전략적 슬로건으로
                  <br />
                  유권자의 마음을 잡으세요
                </h2>
                <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                  데이터가 검증한 슬로건은 단순한 문구가 아닙니다. 유권자의 마음을 움직이는 전략입니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="#craft"
                    className="group flex items-center gap-2.5 px-8 py-4 bg-white text-pink-500 text-[16px] font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
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

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Zap,
  FileText,
  RefreshCw,
  ArrowRight,
  Activity,
  Target,
  Clock,
  ChevronRight,
  LineChart,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const features = [
  {
    icon: TrendingUp,
    title: "다변량 예측 모델",
    description:
      "경제지표, 인구통계, 지역 이슈 등 50개 이상의 변수를 동시에 분석하여 정확한 여론 예측 모델을 구축합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: LineChart,
    title: "시계열 분석",
    description:
      "과거 20년간의 선거 데이터를 기반으로 시간에 따른 여론 변화 패턴을 파악하고 미래 추세를 예측합니다.",
    color: "#FF6B2C",
    bg: "#FFF3ED",
  },
  {
    icon: AlertTriangle,
    title: "이벤트 영향도 분석",
    description:
      "정치적 이벤트, 언론 보도, SNS 이슈가 여론에 미치는 영향을 실시간으로 정량화하여 대응 전략을 수립합니다.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    icon: Target,
    title: "시나리오 시뮬레이션",
    description:
      "다양한 선거 시나리오를 시뮬레이션하여 각 상황별 당선 확률과 최적의 대응 전략을 제시합니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: FileText,
    title: "자동 리포트 생성",
    description:
      "주 2회 자동으로 분석 리포트를 생성하여 캠프 의사결정에 필요한 핵심 인사이트를 즉시 전달합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: RefreshCw,
    title: "실시간 업데이트",
    description:
      "뉴스, SNS, 검색 트렌드를 24시간 수집하여 예측 모델을 실시간으로 갱신하고 변화를 즉시 알려드립니다.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
];

const steps = [
  {
    step: "01",
    title: "데이터 수집",
    description: "뉴스, SNS, 검색어, 여론조사 등 다양한 소스에서 실시간 데이터를 자동 수집합니다.",
  },
  {
    step: "02",
    title: "AI 모델 분석",
    description: "50개 이상의 변수를 다변량 모델에 투입하여 여론 변화를 정밀하게 분석합니다.",
  },
  {
    step: "03",
    title: "예측 생성",
    description: "신뢰구간과 함께 향후 여론 추이를 예측하고 시나리오별 확률을 산출합니다.",
  },
  {
    step: "04",
    title: "리포트 & 알림",
    description: "자동 생성된 리포트와 중요 변화 알림으로 최적의 의사결정을 지원합니다.",
  },
];

const metrics = [
  { value: "89%", label: "예측 정확도", icon: Target, description: "과거 선거 백테스트 기준" },
  { value: "1,200+", label: "분석 변수", icon: BarChart3, description: "다변량 예측 모델 투입" },
  { value: "20년", label: "과거 데이터", icon: Calendar, description: "역대 선거 결과 학습" },
  { value: "주 2회", label: "자동 리포트", icon: FileText, description: "맞춤 분석 리포트 생성" },
];

export default function OpinionForecastPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-[72px]">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/40 to-white" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/8 to-transparent rounded-full blur-[100px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <FadeIn delay={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-400/10 border border-amber-200/60 mb-8">
                    <Activity className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-700">
                      Opinion Forecast AI
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1
                    className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    AI가 여론의
                    <br />
                    <span className="bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
                      미래를 예측합니다
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                    20년간의 선거 데이터와 1,200개 이상의 변수를 분석하는 AI가
                    여론의 흐름을 정확하게 예측하고, 선거 전략에 필요한
                    인사이트를 자동으로 전달합니다.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      체험하기
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="#features"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-[var(--border)] text-[var(--text-primary)] font-semibold rounded-2xl hover:bg-[var(--surface)] transition-all duration-300"
                    >
                      기능 살펴보기
                    </Link>
                  </div>
                </FadeIn>
              </div>

              {/* Right - Dashboard Mockup */}
              <FadeIn delay={0.3} direction="left">
                <div className="relative">
                  <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border-light)] p-6 space-y-5">
                    {/* Mockup Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">여론 예측 대시보드</h3>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">2026년 6월 지방선거</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                        실시간 업데이트
                      </div>
                    </div>

                    {/* Prediction Chart Mockup */}
                    <div className="bg-[var(--surface)] rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-[var(--text-secondary)]">지지율 예측 추이</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-1.5 rounded-full bg-amber-500" />
                            <span className="text-[10px] text-[var(--text-tertiary)]">후보 A</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-1.5 rounded-full bg-[var(--text-tertiary)]" />
                            <span className="text-[10px] text-[var(--text-tertiary)]">후보 B</span>
                          </div>
                        </div>
                      </div>
                      {/* SVG Chart */}
                      <svg viewBox="0 0 400 160" className="w-full h-32" aria-label="여론 예측 차트">
                        {/* Confidence Interval */}
                        <defs>
                          <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,80 Q50,70 100,65 T200,50 T300,35 T400,25 L400,55 T300,65 T200,80 T100,95 Q50,100 0,110 Z"
                          fill="url(#confGrad)"
                        />
                        {/* Trend Line A */}
                        <motion.path
                          d="M0,95 Q50,85 100,80 T200,65 T300,50 T400,40"
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                        {/* Trend Line B */}
                        <motion.path
                          d="M0,70 Q50,75 100,85 T200,90 T300,95 T400,100"
                          fill="none"
                          stroke="#94A3B8"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                        />
                        {/* Event Marker */}
                        <line x1="200" y1="0" x2="200" y2="160" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                        <circle cx="200" cy="65" r="4" fill="#EF4444" />
                        <rect x="170" y="2" width="60" height="16" rx="4" fill="#EF4444" opacity="0.9" />
                        <text x="200" y="13" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">정책 발표</text>
                        {/* Data Points */}
                        <circle cx="100" cy="80" r="3" fill="#F59E0B" />
                        <circle cx="300" cy="50" r="3" fill="#F59E0B" />
                        <circle cx="400" cy="40" r="3" fill="#F59E0B" stroke="white" strokeWidth="2" />
                      </svg>
                      <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mt-2 px-1">
                        <span>4월</span><span>5월</span><span>6월 (선거일)</span>
                      </div>
                    </div>

                    {/* Bottom Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "예측 지지율", value: "47.3%", change: "+2.1%", positive: true },
                        { label: "신뢰구간", value: "±3.2%", change: "95% CI", positive: true },
                        { label: "당선 확률", value: "68.7%", change: "+5.4%", positive: true },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-[var(--surface)] rounded-xl p-3 text-center">
                          <p className="text-[10px] text-[var(--text-tertiary)] mb-1">{stat.label}</p>
                          <p className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                            {stat.value}
                          </p>
                          <p className={`text-[10px] font-semibold ${stat.positive ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                            {stat.change}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-[var(--border-light)] p-3 flex items-center gap-2"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Target className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-primary)]">정확도 89%</p>
                      <p className="text-[9px] text-[var(--text-tertiary)]">백테스트 검증</p>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 lg:py-32 bg-white relative">
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-amber-600 tracking-wider uppercase mb-4">
                  Core Features
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  데이터 기반의 정밀 예측
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  AI가 수천 개의 변수를 실시간으로 분석하여 여론의 흐름을 정확하게 예측합니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <FadeIn key={feature.title} delay={i * 0.08}>
                  <div className="group bg-white rounded-2xl border border-[var(--border-light)] p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-400">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: feature.bg }}
                    >
                      <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 lg:py-32 bg-[var(--surface)] relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-amber-600 tracking-wider uppercase mb-4">
                  How It Works
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4단계로 완성되는 여론 예측
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.12}>
                  <div className="relative bg-white rounded-2xl border border-[var(--border-light)] p-7 text-center">
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: "var(--font-display)" }}>
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                    {i < steps.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 w-6 h-6 text-[var(--text-tertiary)] -translate-y-1/2" />
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-[#0B1222] to-[#1a2744] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[120px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-amber-400 tracking-wider uppercase mb-4">
                  Performance Metrics
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  검증된 예측 성능
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  과거 선거 데이터를 활용한 백테스트로 검증된 예측 정확도를 제공합니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.1}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-5">
                      <metric.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div
                      className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {metric.value}
                    </div>
                    <p className="text-white font-semibold mb-1">{metric.label}</p>
                    <p className="text-sm text-white/40">{metric.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Demo Section */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block text-sm font-bold text-amber-600 tracking-wider uppercase mb-4">
                    Scenario Simulation
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    시나리오별 당선 확률을
                    <br />실시간으로 시뮬레이션
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    후보 사퇴, 정책 발표, 돌발 이슈 등 다양한 시나리오를 설정하고 각 상황에서의
                    여론 변화와 당선 확률을 즉시 확인할 수 있습니다.
                  </p>
                  <div className="space-y-4">
                    {[
                      "무제한 시나리오 생성 및 비교",
                      "실시간 변수 조정으로 즉각적 결과 확인",
                      "과거 유사 사례 기반 신뢰도 검증",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-6 space-y-4">
                  <div className="text-sm font-bold text-[var(--text-primary)] mb-3">시나리오 시뮬레이션</div>
                  {[
                    { scenario: "기본 시나리오", prob: 68.7, color: "#F59E0B" },
                    { scenario: "정책 발표 후", prob: 74.2, color: "#10B981" },
                    { scenario: "상대 후보 합류", prob: 52.1, color: "#EF4444" },
                  ].map((item) => (
                    <div key={item.scenario} className="bg-white rounded-xl p-4 border border-[var(--border-light)]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">{item.scenario}</span>
                        <span className="text-sm font-bold" style={{ color: item.color }}>
                          {item.prob}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.prob}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-400" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                여론 예측 AI로 선거 전략을 한 단계 업그레이드하세요
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                데이터 기반의 정밀한 여론 예측으로 불확실성을 줄이고 최적의 전략적 의사결정을 지원합니다.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  시작하기
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  상담 문의
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

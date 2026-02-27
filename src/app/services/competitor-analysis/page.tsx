"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Eye,
  FileSearch,
  BarChart3,
  ArrowRight,
  Zap,
  ChevronRight,
  CheckCircle2,
  Radio,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Radar,
  FileText,
  Search,
  Bell,
  GitCompare,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const features = [
  {
    icon: Radio,
    title: "실시간 미디어 모니터링",
    description:
      "뉴스, SNS, 방송, 온라인 커뮤니티까지 24시간 자동 모니터링하여 경쟁 후보의 모든 활동을 추적합니다.",
    color: "#6366F1",
    bg: "#EEF2FF",
  },
  {
    icon: GitCompare,
    title: "공약 비교 분석",
    description:
      "경쟁 후보와 우리 후보의 공약을 자동으로 비교 분석하여 차별화 포인트와 보완 영역을 제시합니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: BarChart3,
    title: "여론 반응 비교",
    description:
      "각 후보에 대한 유권자의 반응을 실시간으로 비교하여 상대적 강점과 약점을 분석합니다.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
  {
    icon: FileText,
    title: "자동 비교 리포트",
    description:
      "매일 자동으로 경쟁 후보 비교 리포트를 생성하여 캠프의 신속한 대응을 지원합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: Bell,
    title: "전략 변화 감지",
    description:
      "경쟁 후보의 전략 변화를 30분 이내에 감지하고 즉시 알림을 전송하여 빠른 대응을 가능하게 합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: Search,
    title: "약점/기회 분석",
    description:
      "경쟁 후보의 약점과 우리에게 주어진 기회를 AI가 자동으로 분석하여 공격/방어 전략을 제안합니다.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
];

const steps = [
  {
    step: "01",
    title: "데이터 수집",
    description: "뉴스, SNS, 방송 등 전 채널에서 경쟁 후보 관련 데이터를 24시간 자동 수집합니다.",
  },
  {
    step: "02",
    title: "AI 비교 분석",
    description: "수집된 데이터를 AI가 분석하여 공약, 여론, 전략을 다각도로 비교합니다.",
  },
  {
    step: "03",
    title: "인사이트 도출",
    description: "경쟁 후보의 약점, 전략 변화, 기회 요인 등 핵심 인사이트를 자동 도출합니다.",
  },
  {
    step: "04",
    title: "알림 & 대응",
    description: "중요 변화 감지 시 즉시 알림을 보내고 AI 기반 대응 전략을 제안합니다.",
  },
];

const metrics = [
  { value: "24/7", label: "실시간 모니터링", icon: Radio, description: "전 채널 자동 추적" },
  { value: "100%", label: "활동 추적", icon: Eye, description: "경쟁 후보 활동 커버리지" },
  { value: "일 1회", label: "자동 리포트", icon: FileText, description: "비교 분석 리포트 생성" },
  { value: "30분", label: "변화 감지", icon: Clock, description: "전략 변화 감지 시간" },
];

const competitors = [
  {
    name: "후보 A (우리)",
    approval: 47,
    trend: "up",
    color: "#0052FF",
    issues: [
      { name: "경제", score: 82 },
      { name: "복지", score: 75 },
      { name: "교육", score: 68 },
    ],
  },
  {
    name: "후보 B",
    approval: 38,
    trend: "down",
    color: "#94A3B8",
    issues: [
      { name: "경제", score: 65 },
      { name: "복지", score: 71 },
      { name: "교육", score: 79 },
    ],
  },
  {
    name: "후보 C",
    approval: 15,
    trend: "down",
    color: "#CBD5E1",
    issues: [
      { name: "경제", score: 42 },
      { name: "복지", score: 55 },
      { name: "교육", score: 48 },
    ],
  },
];

export default function CompetitorAnalysisPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-[72px]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50/40 to-white" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/8 to-transparent rounded-full blur-[100px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn delay={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-400/10 border border-indigo-200/60 mb-8">
                    <Radar className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-indigo-700">
                      Competitor Analysis
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1
                    className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    경쟁 후보의
                    <br />
                    <span className="bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent">
                      모든 움직임을 파악합니다
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                    24시간 실시간 모니터링과 AI 분석으로 경쟁 후보의 전략 변화를
                    30분 이내에 감지하고, 자동 비교 리포트로 최적의 대응
                    전략을 즉시 제안합니다.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      경쟁 분석 시작
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

              {/* Right - Competitor Dashboard Mockup */}
              <FadeIn delay={0.3} direction="left">
                <div className="relative">
                  <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border-light)] p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">경쟁 분석 대시보드</h3>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">실시간 모니터링 중</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                        LIVE
                      </div>
                    </div>

                    {/* Side-by-side Comparison */}
                    <div className="space-y-3">
                      {competitors.map((candidate) => (
                        <div key={candidate.name} className="bg-[var(--surface)] rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: candidate.color }} />
                              <span className="text-xs font-bold text-[var(--text-primary)]">{candidate.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold" style={{ color: candidate.color }}>
                                {candidate.approval}%
                              </span>
                              {candidate.trend === "up" ? (
                                <TrendingUp className="w-3 h-3 text-[var(--success)]" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-[var(--danger)]" />
                              )}
                            </div>
                          </div>
                          {/* Approval bar */}
                          <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-2">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: candidate.color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${candidate.approval}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </div>
                          {/* Issue scores */}
                          <div className="flex gap-2">
                            {candidate.issues.map((issue) => (
                              <div key={issue.name} className="flex-1 text-center">
                                <p className="text-[9px] text-[var(--text-tertiary)]">{issue.name}</p>
                                <p className="text-[11px] font-bold" style={{ color: candidate.color }}>{issue.score}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Activity Timeline Mini */}
                    <div className="bg-[var(--surface)] rounded-xl p-3">
                      <p className="text-[10px] font-semibold text-[var(--text-secondary)] mb-2">최근 경쟁 후보 활동</p>
                      <div className="space-y-2">
                        {[
                          { time: "30분 전", text: "후보 B - 교육 공약 발표", type: "alert" },
                          { time: "2시간 전", text: "후보 C - 언론 인터뷰 진행", type: "info" },
                          { time: "4시간 전", text: "후보 B - SNS 캠페인 변경", type: "alert" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <AlertCircle className={`w-3 h-3 shrink-0 ${item.type === "alert" ? "text-[var(--warning)]" : "text-[var(--text-tertiary)]"}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-[var(--text-primary)] truncate">{item.text}</p>
                            </div>
                            <span className="text-[9px] text-[var(--text-tertiary)] shrink-0">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-[var(--border-light)] p-3 flex items-center gap-2"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-primary)]">24/7 모니터링</p>
                      <p className="text-[9px] text-[var(--text-tertiary)]">실시간 추적 중</p>
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
                <span className="inline-block text-sm font-bold text-indigo-600 tracking-wider uppercase mb-4">
                  Core Features
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  경쟁 후보 분석의 모든 것
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  AI가 경쟁 후보의 활동, 전략, 여론을 24시간 추적하고 분석합니다.
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

        {/* How It Works */}
        <section className="py-24 lg:py-32 bg-[var(--surface)] relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-indigo-600 tracking-wider uppercase mb-4">
                  How It Works
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4단계 경쟁 분석 프로세스
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.12}>
                  <div className="relative bg-white rounded-2xl border border-[var(--border-light)] p-7 text-center">
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: "var(--font-display)" }}>
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

        {/* Visual Demo - Sentiment Comparison */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block text-sm font-bold text-indigo-600 tracking-wider uppercase mb-4">
                    Sentiment Comparison
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    후보별 여론 반응을
                    <br />한눈에 비교합니다
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    뉴스, SNS, 커뮤니티에서 각 후보에 대한 긍정/부정/중립 반응을
                    실시간으로 추적하고 시계열 변화를 비교 분석합니다.
                  </p>
                  <div className="space-y-4">
                    {[
                      "후보별 감성 분석 점수 실시간 비교",
                      "이슈별 여론 반응 차이 자동 분석",
                      "전략 변화 시점의 여론 영향도 측정",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-6 space-y-4">
                  <p className="text-sm font-bold text-[var(--text-primary)]">여론 감성 비교</p>

                  {/* Sentiment Bars */}
                  {[
                    { name: "후보 A (우리)", positive: 62, neutral: 25, negative: 13, color: "#0052FF" },
                    { name: "후보 B", positive: 41, neutral: 32, negative: 27, color: "#94A3B8" },
                    { name: "후보 C", positive: 28, neutral: 38, negative: 34, color: "#CBD5E1" },
                  ].map((candidate) => (
                    <div key={candidate.name} className="bg-white rounded-xl p-4 border border-[var(--border-light)]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: candidate.color }} />
                          <span className="text-xs font-bold text-[var(--text-primary)]">{candidate.name}</span>
                        </div>
                      </div>
                      <div className="flex h-6 rounded-lg overflow-hidden gap-0.5">
                        <motion.div
                          className="rounded-l-lg flex items-center justify-center"
                          style={{ backgroundColor: "#10B981" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${candidate.positive}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        >
                          <span className="text-[9px] font-bold text-white">{candidate.positive}%</span>
                        </motion.div>
                        <motion.div
                          className="flex items-center justify-center"
                          style={{ backgroundColor: "#94A3B8" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${candidate.neutral}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        >
                          <span className="text-[9px] font-bold text-white">{candidate.neutral}%</span>
                        </motion.div>
                        <motion.div
                          className="rounded-r-lg flex items-center justify-center"
                          style={{ backgroundColor: "#EF4444" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${candidate.negative}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        >
                          <span className="text-[9px] font-bold text-white">{candidate.negative}%</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-6 pt-1">
                    {[
                      { label: "긍정", color: "#10B981" },
                      { label: "중립", color: "#94A3B8" },
                      { label: "부정", color: "#EF4444" },
                    ].map((l) => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: l.color }} />
                        <span className="text-[10px] text-[var(--text-tertiary)]">{l.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* AI Insight */}
                  <div className="bg-indigo-50 rounded-xl p-3 flex items-start gap-2">
                    <Radar className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-indigo-700 leading-relaxed">
                      <span className="font-bold">AI 인사이트:</span> 후보 B의 교육 공약 발표 이후 부정 여론이 5% 감소했습니다. 우리 후보도 교육 분야 공약 보강을 권장합니다.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-[#0B1222] to-[#1a2744] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-indigo-400 tracking-wider uppercase mb-4">
                  Performance Metrics
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  실시간 경쟁 분석의 위력
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  AI 경쟁 분석 시스템의 핵심 성능 지표입니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.1}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                      <metric.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div
                      className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent"
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

        {/* CTA Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-400" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                경쟁에서 한 발 앞서 나가세요
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                AI 실시간 경쟁 분석으로 상대 후보의 모든 움직임을 파악하고 최적의 대응 전략을 수립하세요.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  경쟁 분석 시작하기
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

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  PieChart,
  Brain,
  Heart,
  UserCheck,
  ArrowRight,
  Target,
  ChevronRight,
  CheckCircle2,
  Zap,
  BarChart3,
  TrendingUp,
  MessageCircle,
  Layers,
  Fingerprint,
  UserX,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const features = [
  {
    icon: PieChart,
    title: "인구통계 분석",
    description:
      "연령, 성별, 직업, 소득 수준 등 다차원 인구통계 데이터를 분석하여 유권자 구성을 정밀하게 파악합니다.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
  {
    icon: Layers,
    title: "관심사 클러스터링",
    description:
      "유권자의 온라인 활동, 검색 트렌드, SNS 반응을 분석하여 관심사별 그룹을 자동으로 분류합니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: Brain,
    title: "투표 성향 예측",
    description:
      "과거 투표 데이터와 현재 여론을 결합하여 세그먼트별 투표 참여율과 지지 성향을 예측합니다.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: MessageCircle,
    title: "세대별 메시지 전략",
    description:
      "MZ세대부터 시니어 세대까지, 각 세대의 소통 방식과 관심사에 맞는 최적의 메시지를 설계합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: UserX,
    title: "이탈 유권자 분석",
    description:
      "기존 지지층 중 이탈 위험이 있는 유권자를 조기에 식별하고 맞춤형 재유입 전략을 제시합니다.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    icon: Target,
    title: "부동층 공략 전략",
    description:
      "아직 지지 후보를 정하지 않은 부동층의 특성을 분석하고 효과적인 설득 전략을 수립합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

const steps = [
  {
    step: "01",
    title: "데이터 통합",
    description: "인구통계, SNS, 검색 트렌드, 과거 투표 데이터를 통합하여 유권자 프로파일을 구축합니다.",
  },
  {
    step: "02",
    title: "세그먼트 분류",
    description: "AI가 32개 세그먼트로 유권자를 자동 분류하고 각 그룹의 특성을 정밀 분석합니다.",
  },
  {
    step: "03",
    title: "인사이트 도출",
    description: "세그먼트별 핵심 니즈, 투표 성향, 이탈 위험도 등 전략적 인사이트를 도출합니다.",
  },
  {
    step: "04",
    title: "맞춤 전략 실행",
    description: "세그먼트별 최적의 메시지와 채널 전략을 자동 생성하여 정밀 타겟팅을 지원합니다.",
  },
];

const metrics = [
  { value: "32개", label: "유권자 세그먼트", icon: Layers, description: "정밀 세그먼트 분류" },
  { value: "91%", label: "프로파일 정확도", icon: Fingerprint, description: "AI 유권자 분석 기준" },
  { value: "자동", label: "맞춤 메시지 생성", icon: MessageCircle, description: "세그먼트별 최적화" },
  { value: "87%", label: "부동층 식별", icon: Target, description: "부동층 분류 정확도" },
];

const personas = [
  {
    name: "30대 직장인 남성",
    segment: "교통/주거 관심층",
    issues: ["출퇴근 교통", "주거 안정", "직장 환경"],
    support: 62,
    swing: false,
    color: "#0EA5E9",
  },
  {
    name: "20대 대학생 여성",
    segment: "일자리/복지 관심층",
    issues: ["청년 일자리", "등록금", "안전"],
    support: 45,
    swing: true,
    color: "#F59E0B",
  },
  {
    name: "60대 자영업자",
    segment: "경제/복지 관심층",
    issues: ["소상공인 지원", "의료비", "연금"],
    support: 71,
    swing: false,
    color: "#10B981",
  },
];

export default function VoterInsightPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-[72px]">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50/40 to-white" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-400/10 to-blue-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-500/8 to-transparent rounded-full blur-[100px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn delay={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/10 to-blue-400/10 border border-sky-200/60 mb-8">
                    <Users className="w-4 h-4 text-sky-600" />
                    <span className="text-sm font-semibold text-sky-700">
                      Voter Insight
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1
                    className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    유권자를
                    <br />
                    <span className="bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent">
                      깊이 이해합니다
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                    32개 세그먼트로 분류된 유권자 프로파일을 기반으로 각 그룹의
                    관심사, 투표 성향, 최적 메시지 전략까지 AI가 분석하여
                    정밀한 선거 전략을 지원합니다.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-sky-500 to-blue-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      유권자 분석 시작
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

              {/* Right - Voter Dashboard Mockup */}
              <FadeIn delay={0.3} direction="left">
                <div className="relative">
                  <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border-light)] p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">유권자 인사이트 대시보드</h3>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">영등포구 전체 유권자 분석</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold">
                        <Users className="w-3 h-3" />
                        324,500명
                      </div>
                    </div>

                    {/* Demographic Chart Mockup */}
                    <div className="bg-[var(--surface)] rounded-2xl p-4">
                      <p className="text-xs font-semibold text-[var(--text-secondary)] mb-3">연령대별 분포</p>
                      <div className="space-y-2.5">
                        {[
                          { age: "20대", pct: 18, color: "#0EA5E9" },
                          { age: "30대", pct: 22, color: "#0052FF" },
                          { age: "40대", pct: 24, color: "#8B5CF6" },
                          { age: "50대", pct: 20, color: "#10B981" },
                          { age: "60대+", pct: 16, color: "#F59E0B" },
                        ].map((item) => (
                          <div key={item.age} className="flex items-center gap-3">
                            <span className="text-[11px] font-medium text-[var(--text-secondary)] w-10">{item.age}</span>
                            <div className="flex-1 h-5 bg-white rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.pct * 3.5}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-[11px] font-bold text-[var(--text-primary)] w-8 text-right">{item.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Persona Cards */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-semibold text-[var(--text-secondary)]">핵심 유권자 페르소나</p>
                      {personas.map((persona) => (
                        <div key={persona.name} className="bg-[var(--surface)] rounded-xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${persona.color}15` }}>
                            <UserCheck className="w-5 h-5" style={{ color: persona.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-[var(--text-primary)]">{persona.name}</p>
                              {persona.swing && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600">부동층</span>
                              )}
                            </div>
                            <p className="text-[10px] text-[var(--text-tertiary)]">{persona.segment}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold" style={{ color: persona.color }}>{persona.support}%</p>
                            <p className="text-[9px] text-[var(--text-tertiary)]">지지율</p>
                          </div>
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
                    <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                      <Fingerprint className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-primary)]">정확도 91%</p>
                      <p className="text-[9px] text-[var(--text-tertiary)]">유권자 프로파일</p>
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
                <span className="inline-block text-sm font-bold text-sky-600 tracking-wider uppercase mb-4">
                  Core Features
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  유권자의 마음을 데이터로 읽다
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  AI가 다차원 데이터를 분석하여 유권자 한 명 한 명의 특성과 니즈를 파악합니다.
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
                <span className="inline-block text-sm font-bold text-sky-600 tracking-wider uppercase mb-4">
                  How It Works
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4단계 유권자 인사이트 프로세스
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.12}>
                  <div className="relative bg-white rounded-2xl border border-[var(--border-light)] p-7 text-center">
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: "var(--font-display)" }}>
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

        {/* Visual Demo - Heat Map */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block text-sm font-bold text-sky-600 tracking-wider uppercase mb-4">
                    Segment Analysis
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    세그먼트별 관심 이슈
                    <br />히트맵 분석
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    32개 유권자 세그먼트가 어떤 이슈에 관심을 가지고 있는지
                    한눈에 파악할 수 있습니다. 부동층의 핵심 관심사를 식별하여
                    효과적인 공략 전략을 수립하세요.
                  </p>
                  <div className="space-y-4">
                    {[
                      "세그먼트별 관심 이슈 자동 매핑",
                      "부동층 핵심 관심사 하이라이트",
                      "시간에 따른 관심사 변화 추적",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-6">
                  <p className="text-sm font-bold text-[var(--text-primary)] mb-4">세그먼트 x 이슈 히트맵</p>
                  {/* Heat Map Mockup */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-[var(--text-tertiary)] w-16 text-right pr-2" />
                      {["교통", "주거", "일자리", "교육", "복지", "환경"].map((h) => (
                        <span key={h} className="flex-1 text-center text-[9px] font-semibold text-[var(--text-tertiary)]">{h}</span>
                      ))}
                    </div>
                    {[
                      { seg: "20대", vals: [0.3, 0.5, 0.9, 0.4, 0.3, 0.6] },
                      { seg: "30대", vals: [0.8, 0.9, 0.6, 0.5, 0.3, 0.4] },
                      { seg: "40대", vals: [0.6, 0.7, 0.4, 0.9, 0.5, 0.5] },
                      { seg: "50대", vals: [0.4, 0.5, 0.3, 0.6, 0.8, 0.4] },
                      { seg: "60대+", vals: [0.3, 0.3, 0.2, 0.4, 0.9, 0.3] },
                    ].map((row) => (
                      <div key={row.seg} className="flex items-center gap-1">
                        <span className="text-[10px] font-medium text-[var(--text-secondary)] w-16 text-right pr-2">{row.seg}</span>
                        {row.vals.map((val, ci) => (
                          <motion.div
                            key={ci}
                            className="flex-1 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: `rgba(14, 165, 233, ${val})`,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: ci * 0.05 }}
                          >
                            <span className={`text-[10px] font-bold ${val > 0.6 ? "text-white" : "text-sky-700"}`}>
                              {Math.round(val * 100)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <span className="text-[9px] text-[var(--text-tertiary)]">낮음</span>
                    <div className="flex gap-0.5">
                      {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
                        <div key={v} className="w-5 h-3 rounded-sm" style={{ backgroundColor: `rgba(14, 165, 233, ${v})` }} />
                      ))}
                    </div>
                    <span className="text-[9px] text-[var(--text-tertiary)]">높음</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-[#0B1222] to-[#1a2744] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-sky-400 tracking-wider uppercase mb-4">
                  Performance Metrics
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  유권자 분석의 정밀도
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  AI 유권자 인사이트의 핵심 성능 지표입니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.1}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center mx-auto mb-5">
                      <metric.icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <div
                      className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent"
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
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-400" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                유권자를 이해하는 것이 승리의 시작입니다
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                AI 유권자 인사이트로 32개 세그먼트의 특성을 정밀하게 파악하고 맞춤 전략을 수립하세요.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  유권자 분석 시작하기
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

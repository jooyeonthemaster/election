"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Image,
  Palette,
  Share2,
  Flag,
  ArrowRight,
  Zap,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  LayoutGrid,
  Smartphone,
  ShieldCheck,
  FlaskConical,
  Clock,
  Layers,
  FileImage,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const features = [
  {
    icon: Image,
    title: "포스터 자동 생성",
    description:
      "후보 사진, 슬로건, 공약을 입력하면 AI가 전문 디자이너 수준의 선거 포스터를 자동으로 생성합니다.",
    color: "#D946EF",
    bg: "#FDF4FF",
  },
  {
    icon: LayoutGrid,
    title: "카드뉴스 제작",
    description:
      "공약, 활동 보고 등의 콘텐츠를 카드뉴스 형태로 자동 변환하여 SNS에 최적화된 콘텐츠를 만듭니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: Share2,
    title: "SNS 콘텐츠 최적화",
    description:
      "플랫폼별 최적 사이즈, 해시태그, 게시 시간까지 AI가 분석하여 최대 도달률을 달성합니다.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
  {
    icon: Flag,
    title: "현수막 디자인",
    description:
      "설치 위치와 크기에 맞는 현수막을 자동 디자인하고 가독성과 시인성을 최적화합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: FlaskConical,
    title: "A/B 테스트",
    description:
      "여러 디자인 시안을 동시에 테스트하여 유권자 반응이 가장 좋은 디자인을 데이터로 선정합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: ShieldCheck,
    title: "선관위 규정 자동 검증",
    description:
      "제작된 모든 홍보물이 선거관리위원회 규정에 부합하는지 AI가 자동으로 검증하여 법적 리스크를 제거합니다.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
];

const steps = [
  {
    step: "01",
    title: "콘텐츠 입력",
    description: "후보 정보, 공약, 슬로건 등 홍보물에 들어갈 콘텐츠를 입력합니다.",
  },
  {
    step: "02",
    title: "AI 디자인",
    description: "AI가 입력된 콘텐츠를 기반으로 다양한 디자인 시안을 3초 만에 생성합니다.",
  },
  {
    step: "03",
    title: "규정 검증",
    description: "선관위 규정 자동 검증을 통해 법적 리스크 없는 홍보물을 보장합니다.",
  },
  {
    step: "04",
    title: "최적화 & 배포",
    description: "A/B 테스트와 플랫폼별 최적화를 거쳐 최종 홍보물을 배포합니다.",
  },
];

const metrics = [
  { value: "3초", label: "생성 속도", icon: Clock, description: "AI 디자인 생성 시간" },
  { value: "500+", label: "템플릿", icon: Layers, description: "전문 디자인 템플릿" },
  { value: "35%", label: "성과 향상", icon: FlaskConical, description: "A/B 테스트 기반 개선" },
  { value: "100%", label: "규정 검증", icon: ShieldCheck, description: "선관위 규정 자동 체크" },
];

const templateCategories = [
  { name: "포스터", count: 120, color: "#D946EF" },
  { name: "카드뉴스", count: 85, color: "#0052FF" },
  { name: "SNS 배너", count: 150, color: "#0EA5E9" },
  { name: "현수막", count: 60, color: "#10B981" },
  { name: "명함", count: 45, color: "#F59E0B" },
  { name: "전단지", count: 40, color: "#EF4444" },
];

export default function PRStudioPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-[72px]">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-50 via-pink-50/40 to-white" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-400/10 to-pink-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-fuchsia-500/8 to-transparent rounded-full blur-[100px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn delay={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-pink-400/10 border border-fuchsia-200/60 mb-8">
                    <Sparkles className="w-4 h-4 text-fuchsia-600" />
                    <span className="text-sm font-semibold text-fuchsia-700">
                      AI PR Studio
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1
                    className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    선거 홍보물,
                    <br />
                    <span className="bg-gradient-to-r from-fuchsia-500 to-pink-400 bg-clip-text text-transparent">
                      AI가 디자인합니다
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                    포스터, 카드뉴스, 현수막까지 3초 만에 전문 디자이너 수준의
                    홍보물을 생성하고, 선관위 규정까지 자동으로 검증합니다.
                    500개 이상의 템플릿으로 시작하세요.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-fuchsia-500 to-pink-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all duration-300 hover:-translate-y-0.5"
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

              {/* Right - Studio Mockup */}
              <FadeIn delay={0.3} direction="left">
                <div className="relative">
                  <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border-light)] p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">AI 홍보물 스튜디오</h3>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">디자인 에디터</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[var(--success-light)] text-[var(--success)] text-[10px] font-bold">
                          규정 적합
                        </span>
                      </div>
                    </div>

                    {/* Editor Preview Mockup */}
                    <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-2xl p-6 relative overflow-hidden">
                      {/* Poster Preview */}
                      <div className="bg-white rounded-xl shadow-lg p-5 mx-auto max-w-[200px] relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-200 to-pink-200 mx-auto mb-3" />
                        <div className="h-2 w-20 bg-fuchsia-300 rounded-full mx-auto mb-2" />
                        <div className="h-1.5 w-24 bg-gray-200 rounded-full mx-auto mb-1" />
                        <div className="h-1.5 w-20 bg-gray-200 rounded-full mx-auto mb-3" />
                        <div className="h-6 w-full bg-gradient-to-r from-fuchsia-500 to-pink-400 rounded-lg" />
                        {/* Sparkle indicator */}
                        <motion.div
                          className="absolute -top-2 -right-2 w-6 h-6 bg-fuchsia-500 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-3 h-3 text-white" />
                        </motion.div>
                      </div>

                      {/* Format Badges */}
                      <div className="flex justify-center gap-2 mt-4">
                        {["포스터", "카드뉴스", "현수막"].map((fmt, i) => (
                          <span key={fmt} className={`text-[10px] font-bold px-3 py-1 rounded-full ${i === 0 ? "bg-fuchsia-500 text-white" : "bg-white text-[var(--text-secondary)]"}`}>
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Template Gallery Mini */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-[var(--text-secondary)]">템플릿 카테고리</p>
                        <span className="text-[10px] text-[var(--text-tertiary)]">총 500+ 템플릿</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {templateCategories.map((cat) => (
                          <div key={cat.name} className="bg-[var(--surface)] rounded-xl p-2.5 text-center hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="w-8 h-8 rounded-lg mx-auto mb-1.5 flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                              <FileImage className="w-4 h-4" style={{ color: cat.color }} />
                            </div>
                            <p className="text-[10px] font-semibold text-[var(--text-primary)]">{cat.name}</p>
                            <p className="text-[9px] text-[var(--text-tertiary)]">{cat.count}개</p>
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
                    <div className="w-8 h-8 rounded-lg bg-fuchsia-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-fuchsia-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-primary)]">생성 3초</p>
                      <p className="text-[9px] text-[var(--text-tertiary)]">AI 디자인 완성</p>
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
                <span className="inline-block text-sm font-bold text-fuchsia-600 tracking-wider uppercase mb-4">
                  Core Features
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  AI 크리에이티브 파워
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  전문 디자이너 없이도 선거 캠프에 필요한 모든 홍보물을 AI가 제작합니다.
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
                <span className="inline-block text-sm font-bold text-fuchsia-600 tracking-wider uppercase mb-4">
                  How It Works
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4단계 홍보물 제작 프로세스
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.12}>
                  <div className="relative bg-white rounded-2xl border border-[var(--border-light)] p-7 text-center">
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-pink-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: "var(--font-display)" }}>
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

        {/* Visual Demo - A/B Test */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[var(--text-primary)]">A/B 테스트 결과</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--success-light)] text-[var(--success)]">완료</span>
                  </div>

                  {/* Two Design Variants */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { variant: "A", engagement: 72, clicks: 1240, color: "#D946EF", winner: false },
                      { variant: "B", engagement: 89, clicks: 1680, color: "#10B981", winner: true },
                    ].map((v) => (
                      <div key={v.variant} className={`bg-white rounded-xl p-4 border-2 ${v.winner ? "border-[var(--success)]" : "border-transparent"} relative`}>
                        {v.winner && (
                          <span className="absolute -top-2 -right-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--success)] text-white">
                            승자
                          </span>
                        )}
                        {/* Mini poster preview */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-24 mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`w-8 h-8 rounded-full mx-auto mb-1`} style={{ backgroundColor: `${v.color}30` }} />
                            <div className="h-1 w-10 bg-gray-300 rounded-full mx-auto mb-0.5" />
                            <div className="h-1 w-8 bg-gray-200 rounded-full mx-auto" />
                          </div>
                        </div>
                        <p className="text-xs font-bold text-center text-[var(--text-primary)] mb-2">시안 {v.variant}</p>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="text-[var(--text-tertiary)]">참여율</span>
                              <span className="font-bold" style={{ color: v.color }}>{v.engagement}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: v.color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${v.engagement}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-[var(--text-tertiary)]">클릭 수</p>
                            <p className="text-sm font-bold text-[var(--text-primary)]">{v.clicks.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Insight */}
                  <div className="bg-fuchsia-50 rounded-xl p-3 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-fuchsia-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-fuchsia-700 leading-relaxed">
                      <span className="font-bold">AI 인사이트:</span> 시안 B의 밝은 컬러 배경이 20대 유권자의 참여율을 23% 더 높였습니다.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div>
                  <span className="inline-block text-sm font-bold text-fuchsia-600 tracking-wider uppercase mb-4">
                    A/B Testing
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    데이터가 선택하는
                    <br />최고의 디자인
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    여러 디자인 시안을 실제 유권자에게 노출하여 참여율, 클릭률 등
                    데이터를 기반으로 최적의 디자인을 과학적으로 선정합니다.
                  </p>
                  <div className="space-y-4">
                    {[
                      "무제한 시안 생성 및 자동 A/B 테스트",
                      "세그먼트별 최적 디자인 자동 추천",
                      "평균 35% 이상의 성과 향상 달성",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-fuchsia-500 shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-[#0B1222] to-[#1a2744] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/8 rounded-full blur-[120px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-fuchsia-400 tracking-wider uppercase mb-4">
                  Performance Metrics
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  AI 디자인의 놀라운 성능
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  AI 홍보물 스튜디오의 핵심 성능 지표입니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.1}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-5">
                      <metric.icon className="w-6 h-6 text-fuchsia-400" />
                    </div>
                    <div
                      className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
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
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-400" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                전문 디자이너 없이도 완벽한 홍보물을
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                AI 홍보물 스튜디오로 3초 만에 선거 홍보물을 생성하고 선관위 규정까지 자동 검증하세요.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-fuchsia-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
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

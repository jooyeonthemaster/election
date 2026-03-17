"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Target,
  ChevronRight,
  CheckCircle2,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { features, steps, metrics, swotData } from "./constants";

export default function CampStrategyPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-[72px]">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50/40 to-white" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-rose-400/10 to-pink-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-rose-500/8 to-transparent rounded-full blur-[100px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn delay={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/10 to-pink-400/10 border border-rose-200/60 mb-8">
                    <Target className="w-4 h-4 text-rose-600" />
                    <span className="text-sm font-semibold text-rose-700">
                      Camp Strategy Advisor
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1
                    className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    AI 전략가가
                    <br />
                    <span className="bg-gradient-to-r from-rose-500 to-pink-400 bg-clip-text text-transparent">
                      캠프를 이끕니다
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                    243개 지역구의 데이터를 분석한 AI가 맞춤 전략을 수립하고,
                    유세 동선부터 메시지 프레이밍까지 캠프의 모든 의사결정을
                    지원합니다.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-rose-500 to-pink-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      전략 컨설팅 신청
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

              {/* Right - Strategy Dashboard Mockup */}
              <FadeIn delay={0.3} direction="left">
                <div className="relative">
                  <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border-light)] p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">캠프 전략 대시보드</h3>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">서울 영등포구 선거구</p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                        D-45
                      </div>
                    </div>

                    {/* Timeline Mockup */}
                    <div className="bg-[var(--surface)] rounded-2xl p-4">
                      <p className="text-xs font-semibold text-[var(--text-secondary)] mb-3">이번 주 핵심 일정</p>
                      <div className="space-y-3">
                        {[
                          { time: "월 09:00", task: "영등포 시장 유세", priority: "high", done: true },
                          { time: "화 14:00", task: "청년 정책 간담회", priority: "high", done: false },
                          { time: "수 10:00", task: "노인복지관 방문", priority: "medium", done: false },
                          { time: "목 18:00", task: "SNS 라이브 방송", priority: "medium", done: false },
                        ].map((item) => (
                          <div key={item.task} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${item.done ? "border-rose-500 bg-rose-500" : "border-[var(--border)]"}`}>
                              {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-medium ${item.done ? "text-[var(--text-tertiary)] line-through" : "text-[var(--text-primary)]"}`}>
                                {item.task}
                              </p>
                              <p className="text-[10px] text-[var(--text-tertiary)]">{item.time}</p>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.priority === "high" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"}`}>
                              {item.priority === "high" ? "핵심" : "권장"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SWOT Mini */}
                    <div className="grid grid-cols-2 gap-2">
                      {swotData.map((item) => (
                        <div key={item.type} className="rounded-xl p-3" style={{ backgroundColor: item.bg }}>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-xs font-extrabold" style={{ color: item.color }}>{item.type}</span>
                            <span className="text-[10px] font-semibold" style={{ color: item.color }}>{item.label}</span>
                          </div>
                          {item.items.map((text) => (
                            <p key={text} className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                              {text}
                            </p>
                          ))}
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
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-primary)]">243개 지역구</p>
                      <p className="text-[9px] text-[var(--text-tertiary)]">맞춤 전략 분석</p>
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
                <span className="inline-block text-sm font-bold text-rose-600 tracking-wider uppercase mb-4">
                  Core Features
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  AI가 설계하는 종합 선거 전략
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  데이터 분석부터 실행 계획까지, 캠프 운영의 모든 영역을 AI가 지원합니다.
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
                <span className="inline-block text-sm font-bold text-rose-600 tracking-wider uppercase mb-4">
                  How It Works
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4단계 전략 수립 프로세스
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.12}>
                  <div className="relative bg-white rounded-2xl border border-[var(--border-light)] p-7 text-center">
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: "var(--font-display)" }}>
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

        {/* Visual Demo - Priority Matrix */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-6 space-y-4">
                  <p className="text-sm font-bold text-[var(--text-primary)]">전략 우선순위 매트릭스</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* High Impact, High Urgency */}
                    <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                      <p className="text-[10px] font-bold text-rose-600 mb-2">높은 영향 + 긴급</p>
                      <div className="space-y-1.5">
                        {["청년 정책 발표", "SNS 캠페인 강화"].map((t) => (
                          <div key={t} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="text-[11px] text-[var(--text-primary)] font-medium">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* High Impact, Low Urgency */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-[10px] font-bold text-blue-600 mb-2">높은 영향 + 계획</p>
                      <div className="space-y-1.5">
                        {["지역 기업 협력", "인프라 공약 구체화"].map((t) => (
                          <div key={t} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-[11px] text-[var(--text-primary)] font-medium">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Low Impact, High Urgency */}
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                      <p className="text-[10px] font-bold text-amber-600 mb-2">낮은 영향 + 긴급</p>
                      <div className="space-y-1.5">
                        {["언론 인터뷰 대응", "일정 조율 완료"].map((t) => (
                          <div key={t} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="text-[11px] text-[var(--text-primary)] font-medium">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Low Impact, Low Urgency */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-500 mb-2">낮은 영향 + 여유</p>
                      <div className="space-y-1.5">
                        {["홈페이지 업데이트", "홍보물 재주문"].map((t) => (
                          <div key={t} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                            <span className="text-[11px] text-[var(--text-primary)] font-medium">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div>
                  <span className="inline-block text-sm font-bold text-rose-600 tracking-wider uppercase mb-4">
                    Priority Matrix
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    우선순위 기반의
                    <br />전략적 의사결정
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    AI가 모든 전략 과제를 영향도와 긴급도 기준으로 자동 분류하여,
                    캠프가 가장 중요한 활동에 집중할 수 있도록 지원합니다.
                  </p>
                  <div className="space-y-4">
                    {[
                      "영향도/긴급도 자동 분류로 즉각적 우선순위 결정",
                      "매일 업데이트되는 실행 가능한 액션 아이템",
                      "캠프 인력 배치와 자원 배분 최적화 제안",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
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
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/8 rounded-full blur-[120px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-rose-400 tracking-wider uppercase mb-4">
                  Performance Metrics
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  데이터로 증명하는 전략 효과
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  AI 전략 어드바이저의 실제 성능 지표입니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.1}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center mx-auto mb-5">
                      <metric.icon className="w-6 h-6 text-rose-400" />
                    </div>
                    <div
                      className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent"
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
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-400" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                AI 전략가와 함께 선거를 준비하세요
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                데이터 기반의 정밀 전략으로 당선 확률을 높이고 캠프 운영의 효율성을 극대화합니다.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rose-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  전략 컨설팅 시작하기
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

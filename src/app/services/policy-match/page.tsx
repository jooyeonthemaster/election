"use client";

import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  ArrowRight,
  Hand,
  ThumbsDown,
  Info,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { candidates, features, steps, metricsData } from "./constants";
import WelcomeScreen from "./components/WelcomeScreen";
import SwipeCardDemo from "./components/QuestionCard";
import { ConvictionRing } from "./components/ResultsView";

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function PolicyMatchPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <WelcomeScreen />

        {/* Features Section */}
        <section
          id="features"
          className="py-24 lg:py-32 bg-white relative"
        >
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-teal-600 tracking-wider uppercase mb-4">
                  Core Features
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  정치를 쉽게, 매칭을 정확하게
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  직관적인 스와이프 UX와 AI 분석이 만나 가장 정확한 후보 매칭을 제공합니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <FadeIn key={feature.title} delay={i * 0.04}>
                  <div className="group bg-white rounded-2xl border border-[var(--border-light)] p-7 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: feature.bg }}
                    >
                      <feature.icon
                        className="w-6 h-6"
                        style={{ color: feature.color }}
                      />
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
                <span className="inline-block text-sm font-bold text-teal-600 tracking-wider uppercase mb-4">
                  How It Works
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4단계로 나의 후보를 찾으세요
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.06}>
                  <div className="relative bg-white rounded-2xl border border-[var(--border-light)] p-7 text-center">
                    <div
                      className="text-4xl font-extrabold bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
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

        {/* Interactive Demo */}
        <section id="demo" className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="right">
                <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-6 lg:p-8">
                  <SwipeCardDemo />
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="lg:sticky lg:top-32">
                  <span className="inline-block text-sm font-bold text-teal-600 tracking-wider uppercase mb-4">
                    Interactive Demo
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    직접 스와이프로
                    <br />
                    체험해보세요
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    15개 지역 정책 이슈에 대해 스와이프로 답하면 AI가 나와
                    가장 잘 맞는 후보를 찾아줍니다. 카드를 탭하면 찬반 논거를
                    확인할 수 있습니다.
                  </p>

                  <div className="space-y-5">
                    {[
                      {
                        icon: Hand,
                        title: "오른쪽 스와이프 = 찬성",
                        desc: "정책에 찬성하면 오른쪽으로 밀어주세요",
                      },
                      {
                        icon: ThumbsDown,
                        title: "왼쪽 스와이프 = 반대",
                        desc: "정책에 반대하면 왼쪽으로 밀어주세요",
                      },
                      {
                        icon: Info,
                        title: "카드 탭 = 논거 보기",
                        desc: "판단이 어려우면 카드를 눌러 찬반 논거를 확인하세요",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--text-primary)]">
                            {item.title}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Conviction Score Explainer */}
        <section className="py-24 lg:py-32 bg-[var(--surface)] relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block text-sm font-bold text-teal-600 tracking-wider uppercase mb-4">
                    Conviction Score
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    공약만 보지 마세요
                    <br />
                    <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
                      일관성을 확인하세요
                    </span>
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    후보가 이번 선거에서 한 공약만이 아니라, 과거 발언·의정활동·입장
                    변경 이력을 AI가 분석하여 공약 일관성 점수(Conviction
                    Score)를 산출합니다. 5년간 같은 입장을 유지한 후보가 최근
                    입장을 바꾼 후보보다 높은 점수를 받습니다.
                  </p>
                  <div className="space-y-3">
                    {[
                      "과거 의정활동 기록과 현재 공약 비교 분석",
                      "공개 발언 및 인터뷰 일관성 추적",
                      "입장 변경 시점과 맥락까지 고려한 정밀 평가",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="bg-white rounded-3xl border border-[var(--border-light)] p-6 space-y-4">
                  <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
                    신뢰도 점수 예시
                  </p>
                  {candidates.slice(0, 4).map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[var(--surface)]"
                    >
                      <div
                        className="w-10 h-10 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          {c.name}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)]">
                          {c.party}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{
                            backgroundColor:
                              c.convictionScore >= 80
                                ? "#ECFDF5"
                                : c.convictionScore >= 60
                                ? "#FFFBEB"
                                : "#FEF2F2",
                            color:
                              c.convictionScore >= 80
                                ? "#10B981"
                                : c.convictionScore >= 60
                                ? "#F59E0B"
                                : "#EF4444",
                          }}
                        >
                          {c.convictionLabel}
                        </span>
                        <ConvictionRing score={c.convictionScore} />
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-[#0B1222] to-[#1a2744] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[80px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-teal-400 tracking-wider uppercase mb-4">
                  Performance Metrics
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  데이터로 증명하는 매칭 성과
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  정책 스와이프 매칭의 실제 성능 지표입니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.05}>
                  <div className="bg-white/5 bg-white/[0.03] border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-[transform,box-shadow,background-color] duration-200">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center mx-auto mb-5">
                      <metric.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div
                      className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {metric.value}
                    </div>
                    <p className="text-white font-semibold mb-1">
                      {metric.label}
                    </p>
                    <p className="text-sm text-white/40">
                      {metric.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-400" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                스와이프 한 번으로 나의 후보를 찾으세요
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                5분이면 충분합니다. 지금 바로 정책 매칭을 시작하고 나와 가장 잘 맞는 후보를 확인해보세요.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#demo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 font-bold rounded-2xl hover:shadow-xl transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5"
                >
                  매칭 시작하기
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 bg-white/[0.03] border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-[transform,box-shadow,background-color] duration-200"
                >
                  도입 문의
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

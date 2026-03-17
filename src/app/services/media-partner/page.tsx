"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Newspaper,
  Globe,
  ArrowRight,
  ChevronRight,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import {
  mediaPartners,
  features,
  processSteps,
  metricsData,
} from "./constants";
import WidgetPreviewDemo from "./components/WidgetPreviewDemo";

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function MediaPartnerPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-[72px]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50/40 to-white" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-500/8 to-transparent rounded-full blur-[60px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn delay={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-400/10 border border-orange-200/60 mb-8">
                    <Newspaper className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-semibold text-orange-700">
                      Media Partner Hub
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1
                    className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    언론사 브랜드로
                    <br />
                    <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                      유권자에게 다가갑니다
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                    핀란드 Vaalikone 모델을 한국에. 각 언론사의 브랜드로
                    커스터마이징된 정책 매칭 위젯을 독자에게 제공하세요.
                    제작은 우리가, 브랜딩은 언론사가.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-orange-500/25 transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5"
                    >
                      파트너 신청하기
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="#demo"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-[var(--border)] text-[var(--text-primary)] font-semibold rounded-2xl hover:bg-[var(--surface)] transition-[transform,box-shadow,background-color] duration-200"
                    >
                      위젯 미리보기
                    </Link>
                  </div>
                </FadeIn>
              </div>

              {/* Right — Partner showcase mockup */}
              <FadeIn delay={0.3} direction="left">
                <div className="relative">
                  <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border-light)] p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          파트너 네트워크
                        </h3>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          전국 12개 언론사 제휴
                        </p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
                        LIVE
                      </div>
                    </div>

                    {/* Partner logos grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {mediaPartners.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)]"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ backgroundColor: p.color }}
                          >
                            {p.abbr[0]}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-[var(--text-primary)]">
                              {p.name}
                            </p>
                            <p className="text-[8px] text-[var(--text-tertiary)]">
                              {p.readers} 독자
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "총 독자 도달", value: "900만+" },
                        { label: "일 매칭 수", value: "12,000+" },
                        { label: "평균 완료율", value: "78%" },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 text-center"
                        >
                          <p className="text-lg font-extrabold text-orange-600">
                            {s.value}
                          </p>
                          <p className="text-[9px] text-[var(--text-tertiary)]">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-[var(--border-light)] p-3 flex items-center gap-2"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-primary)]">
                        전국 네트워크
                      </p>
                      <p className="text-[9px] text-[var(--text-tertiary)]">
                        12개 언론사 파트너
                      </p>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Partner Grid Section */}
        <section className="py-24 lg:py-32 bg-[var(--surface)] relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-orange-600 tracking-wider uppercase mb-4">
                  Partner Network
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  전국 주요 언론사와 함께합니다
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  각 언론사의 브랜드와 지역 전문성을 살린 맞춤형 정책 매칭 서비스를 제공합니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaPartners.map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.04}>
                  <div className="bg-white rounded-2xl border border-[var(--border-light)] p-6 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold"
                          style={{ backgroundColor: p.color }}
                        >
                          {p.abbr[0]}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[var(--text-primary)]">
                            {p.name}
                          </h3>
                          <p className="text-xs text-[var(--text-tertiary)]">
                            {p.region}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          p.tier === "Enterprise"
                            ? "bg-orange-100 text-orange-700"
                            : p.tier === "Pro"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.tier}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[var(--surface)] rounded-xl p-3">
                        <p className="text-lg font-extrabold text-[var(--text-primary)]">
                          {p.readers}
                        </p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">
                          월간 독자
                        </p>
                      </div>
                      <div className="bg-[var(--surface)] rounded-xl p-3">
                        <p className="text-lg font-extrabold text-[var(--text-primary)]">
                          {p.articles.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">
                          뉴스 기사
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-orange-600 tracking-wider uppercase mb-4">
                  Core Features
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  언론사를 위한 올인원 솔루션
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  화이트라벨 위젯부터 분석 대시보드까지, 필요한 모든 것을 제공합니다.
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
                <span className="inline-block text-sm font-bold text-orange-600 tracking-wider uppercase mb-4">
                  How It Works
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4단계 파트너 온보딩
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.06}>
                  <div className="relative bg-white rounded-2xl border border-[var(--border-light)] p-7 text-center">
                    <div
                      className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mb-4"
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
                    {i < processSteps.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 w-6 h-6 text-[var(--text-tertiary)] -translate-y-1/2" />
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Widget Preview Demo */}
        <section id="demo" className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-orange-600 tracking-wider uppercase mb-4">
                  Widget Preview
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  언론사별 위젯을 직접 확인하세요
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  파트너를 선택하고 커스터마이징 옵션을 조절해 실시간 미리보기를 확인하세요.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-6 lg:p-10">
                <WidgetPreviewDemo />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-[#0B1222] to-[#1a2744] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[80px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-orange-400 tracking-wider uppercase mb-4">
                  Performance Metrics
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  파트너 네트워크의 실제 성과
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  전국 언론사 파트너 네트워크의 실제 성능 지표입니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.05}>
                  <div className="bg-white/5 bg-white/[0.03] border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-[transform,box-shadow,background-color] duration-200">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-5">
                      <metric.icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <div
                      className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
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
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                언론사의 새로운 수익 모델을 만드세요
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                제작은 ElectAI가, 브랜딩은 언론사가. 핀란드에서 검증된 화이트라벨 모델로
                독자 참여와 데이터 인사이트를 동시에 얻으세요.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:shadow-xl transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5"
                >
                  파트너 신청하기
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 bg-white/[0.03] border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-[transform,box-shadow,background-color] duration-200"
                >
                  위젯 미리보기
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

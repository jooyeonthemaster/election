"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  Palette,
  Type,
  Layout,
  Image,
  BookOpen,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { features, colorSwatches, metrics } from "../constants";

/* ─── Key Features Section ─── */

function KeyFeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[300px] opacity-[0.03]" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
        <FadeIn className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[var(--text-primary)]">강력한 </span>
            <span className="text-gradient-primary">핵심 기능</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            인터랙티브 공약집을 완벽하게 만드는 6가지 기능을 확인하세요.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.08}>
              <div className="bg-white rounded-2xl border border-[var(--border-light)] p-7 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Customization Section ─── */

function CustomizationSection() {
  const [selectedSwatch, setSelectedSwatch] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[250px] opacity-[0.03]" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
        <FadeIn className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            캠프 브랜드에 맞게{" "}
            <span
              className="bg-gradient-to-r from-[#7C3AED] to-[#0052FF] bg-clip-text"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              커스터마이징
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            색상, 폰트, 레이아웃, 브랜딩까지. 모든 요소를 캠프에 맞게 조정할 수 있습니다.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Color theme */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-[var(--border-light)] p-6 h-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center mb-4">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-3">
                컬러 테마
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {colorSwatches.map((s, i) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSwatch(i)}
                    className={`relative w-full aspect-square rounded-xl transition-all duration-200 cursor-pointer ${
                      selectedSwatch === i
                        ? "scale-110 shadow-md"
                        : "hover:scale-105"
                    }`}
                    style={{
                      background: s.color,
                      outline: selectedSwatch === i ? `2px solid ${s.color}` : "none",
                      outlineOffset: "3px",
                    }}
                    aria-label={`${s.name} 테마 선택`}
                  >
                    {selectedSwatch === i && (
                      <Check className="w-3 h-3 text-white absolute inset-0 m-auto" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[var(--text-tertiary)] mt-3">
                선택: {colorSwatches[selectedSwatch].name}
              </p>
            </div>
          </FadeIn>

          {/* Font */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl border border-[var(--border-light)] p-6 h-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#3B82F6] flex items-center justify-center mb-4">
                <Type className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-3">
                폰트 선택
              </h3>
              <div className="space-y-2">
                {[
                  { name: "Pretendard", sample: "깔끔한 고딕" },
                  { name: "Noto Serif", sample: "격식있는 명조" },
                  { name: "Gothic A1", sample: "부드러운 고딕" },
                ].map((font, i) => (
                  <div
                    key={font.name}
                    className={`px-3 py-2.5 rounded-lg border text-sm cursor-pointer transition-all ${
                      i === 0
                        ? "border-[var(--primary)] bg-[var(--primary-50)] text-[var(--primary)] font-semibold"
                        : "border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--primary)]/30"
                    }`}
                  >
                    <span className="text-xs font-medium">{font.name}</span>
                    <span className="text-[10px] text-[var(--text-tertiary)] ml-2">
                      {font.sample}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Layout */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl border border-[var(--border-light)] p-6 h-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center mb-4">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-3">
                레이아웃
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "카드형", active: true },
                  { label: "스크롤형", active: false },
                  { label: "매거진", active: false },
                  { label: "인포", active: false },
                ].map((l) => (
                  <div
                    key={l.label}
                    className={`px-3 py-3 rounded-lg border text-center text-xs font-semibold cursor-pointer transition-all ${
                      l.active
                        ? "border-[var(--primary)] bg-[var(--primary-50)] text-[var(--primary)]"
                        : "border-[var(--border-light)] text-[var(--text-tertiary)] hover:border-[var(--primary)]/30"
                    }`}
                  >
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Branding */}
          <FadeIn delay={0.4}>
            <div className="bg-white rounded-2xl border border-[var(--border-light)] p-6 h-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D97706] to-[#F59E0B] flex items-center justify-center mb-4">
                <Image className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-3">
                브랜딩
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border-light)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--border-light)] flex items-center justify-center">
                    <Image className="w-4 h-4 text-[var(--text-tertiary)]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-primary)]">로고 업로드</p>
                    <p className="text-[10px] text-[var(--text-tertiary)]">PNG, SVG</p>
                  </div>
                </div>
                <div className="px-3 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border-light)]">
                  <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                    슬로건
                  </p>
                  <p className="text-[10px] text-[var(--text-tertiary)]">
                    &ldquo;함께 만드는 살기 좋은 OO구&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Metrics Section ─── */

function MetricsSection() {
  return (
    <section className="py-24 md:py-32 bg-white border-y border-[var(--border-light)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <FadeIn className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            숫자로 증명하는{" "}
            <span className="text-gradient-primary">성과</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            인터랙티브 공약집을 도입한 캠프들의 실제 데이터입니다.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <FadeIn key={metric.label} delay={i * 0.1}>
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] p-7 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary-50)] flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, type: "spring" }}
                  className="mb-2"
                >
                  <span
                    className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-[var(--primary)]">
                    {metric.unit}
                  </span>
                </motion.div>
                <p className="text-sm font-bold text-[var(--text-primary)] mb-1">
                  {metric.label}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">{metric.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */

function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <FadeIn>
          <div className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]">
            {/* Decorative orbs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#0052FF]/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A855F7]/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-grid opacity-5" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-8"
              >
                <BookOpen className="w-8 h-8 text-white" />
              </motion.div>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                지금 인터랙티브 공약집을
                <br />
                만들어보세요
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                5분이면 완성되는 AI 공약집. 유권자와의 새로운 소통을 시작하세요.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/#services"
                  className="px-8 py-4 bg-white text-[#7C3AED] text-[16px] font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  시작하기
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Combined Export ─── */

export default function FeaturesSection() {
  return (
    <>
      <KeyFeaturesSection />
      <CustomizationSection />
      <MetricsSection />
      <CTASection />
    </>
  );
}

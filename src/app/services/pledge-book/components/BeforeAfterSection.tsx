"use client";

import { Check, X, Sparkles } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { beforeAfter } from "../constants";

export default function BeforeAfterSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7C3AED] rounded-full blur-[300px] opacity-[0.03]" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
        <FadeIn className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[var(--text-primary)]">왜 </span>
            <span
              className="bg-gradient-to-r from-[#7C3AED] to-[#0052FF] bg-clip-text"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              인터랙티브 공약집
            </span>
            <span className="text-[var(--text-primary)]">인가요?</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            기존 PDF 공약집과 비교해보세요. 차이는 명확합니다.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Before */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-[var(--border-light)] p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-300" />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 mb-6">
                <X className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs font-bold text-red-600">BEFORE</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                {beforeAfter.before.title}
              </h3>
              <ul className="space-y-4">
                {beforeAfter.before.items.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* After */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl border border-[var(--primary)]/20 p-8 h-full relative overflow-hidden shadow-lg ring-1 ring-[var(--primary)]/5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] to-[#0052FF]" />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary-50)] mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="text-xs font-bold text-[var(--primary)]">AFTER</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                {beforeAfter.after.title}
              </h3>
              <ul className="space-y-4">
                {beforeAfter.after.items.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--primary-50)] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[var(--primary)]" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] font-medium">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

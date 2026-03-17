"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Repeat2,
  ArrowRight,
  Zap,
  Bus,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { candidates } from "../constants";

export default function WelcomeScreen() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-[72px]">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50/40 to-white" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-500/8 to-transparent rounded-full blur-[60px]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-400/10 border border-teal-200/60 mb-8">
                <Repeat2 className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-semibold text-teal-700">
                  Policy Swipe Match
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                스와이프로
                <br />
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  나의 후보를 찾다
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                15개 지역 정책 이슈에 스와이프로 답하면, AI가 나와 가장
                잘 맞는 후보를 찾아줍니다. 후보의 공약 일관성 점수까지
                한눈에 확인하세요.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#demo"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-teal-500/25 transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5"
                >
                  지금 매칭 시작
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-[var(--border)] text-[var(--text-primary)] font-semibold rounded-2xl hover:bg-[var(--surface)] transition-[transform,box-shadow,background-color] duration-200"
                >
                  기능 살펴보기
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right — Static card preview */}
          <FadeIn delay={0.3} direction="left">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border-light)] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      정책 매칭 미리보기
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                      수원시 영통구 · 6명 후보
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold">
                    15개 이슈
                  </div>
                </div>

                {/* Mini cards stack preview */}
                <div className="relative h-[200px]">
                  {[2, 1, 0].map((depth) => (
                    <div
                      key={depth}
                      className="absolute inset-x-0 bg-white rounded-2xl border border-[var(--border-light)] p-4"
                      style={{
                        top: depth * 10,
                        transform: `scale(${1 - depth * 0.04})`,
                        zIndex: 3 - depth,
                        opacity: 1 - depth * 0.2,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-teal-50 flex items-center justify-center">
                          <Bus className="w-3 h-3 text-teal-600" />
                        </div>
                        <span className="text-xs font-bold text-teal-600">
                          교통
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">
                        대중교통 무료 환승 구간을 확대해야 할까요?
                      </p>
                    </div>
                  ))}
                </div>

                {/* Mini result bar */}
                <div className="bg-[var(--surface)] rounded-xl p-3 space-y-2">
                  <p className="text-[10px] font-bold text-[var(--text-secondary)]">
                    매칭 예시
                  </p>
                  {candidates.slice(0, 3).map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full text-white text-[8px] font-bold flex items-center justify-center"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.name[0]}
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            backgroundColor: c.color,
                            width: `${60 + Math.random() * 30}%`,
                          }}
                        />
                      </div>
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
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[var(--text-primary)]">
                    5분 완료
                  </p>
                  <p className="text-[9px] text-[var(--text-tertiary)]">
                    스와이프 매칭
                  </p>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

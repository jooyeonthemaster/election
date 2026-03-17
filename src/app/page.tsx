"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  Repeat2,
  BookOpen,
  Megaphone,
  ArrowRight,
  Zap,
  Shield,
  Heart,
  ChevronRight,
  Sparkles,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const residentServices = [
  {
    id: "pledge-bot",
    icon: MessageSquare,
    name: "AI 공약 챗봇",
    tagline: "후보의 공약을 AI에게 물어보세요",
    description: "궁금한 정책이 있으신가요? AI가 후보자를 대신해 공약을 자세히 설명해드립니다. 24시간 언제든 편하게 질문하세요.",
    tag: "BEST",
    tagColor: "accent",
    metrics: "응답률 97%",
    href: "/services/pledge-bot",
    gradient: "from-blue-500 to-cyan-400",
    bgAccent: "bg-blue-50",
  },
  {
    id: "resident-voice",
    icon: Megaphone,
    name: "구민의 소리",
    tagline: "우리 동네 이야기를 들려주세요",
    description: "교통, 환경, 교육, 복지 등 지역 현안에 대한 의견이나 제안을 자유롭게 나눠주세요. 주민의 목소리가 정책이 됩니다.",
    tag: "NEW",
    tagColor: "primary",
    metrics: "실시간 접수",
    href: "/services/resident-voice",
    gradient: "from-emerald-500 to-teal-400",
    bgAccent: "bg-emerald-50",
  },
  {
    id: "policy-match",
    icon: Repeat2,
    name: "정책 매칭",
    tagline: "나와 맞는 후보를 찾아보세요",
    description: "카드 스와이프로 15개 지역 이슈에 대한 입장을 표명하면, AI가 나와 가장 잘 맞는 후보를 찾아드립니다.",
    tag: "NEW",
    tagColor: "primary",
    metrics: "5분이면 완료",
    href: "/services/policy-match",
    gradient: "from-violet-500 to-purple-400",
    bgAccent: "bg-violet-50",
  },
  {
    id: "pledge-book",
    icon: BookOpen,
    name: "인터랙티브 공약집",
    tagline: "한눈에 보는 디지털 공약집",
    description: "복잡한 PDF 대신 깔끔한 디지털 공약집으로 후보의 비전과 공약을 쉽고 편하게 살펴보세요.",
    tag: "",
    tagColor: "",
    metrics: "모바일 최적화",
    href: "/services/pledge-book",
    gradient: "from-amber-500 to-orange-400",
    bgAccent: "bg-amber-50",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[200px] opacity-[0.03]" />

        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-blue-400 opacity-10"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 opacity-10"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-8">
                <Heart className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">강남구민을 위한 AI 서비스</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-[var(--text-primary)]">강남구의 미래,</span>
                <br />
                <span className="text-gradient-primary">함께</span>
                <span className="text-[var(--text-primary)]"> 만들어갑니다</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
                AI 기술로 정책을 쉽게 이해하고, 내 의견을 직접 전달하세요.
                <br className="hidden md:block" />
                주민의 목소리가 강남구를 바꿉니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/services/pledge-bot"
                  className="group flex items-center gap-2.5 px-8 py-4 bg-[var(--primary)] text-white text-[16px] font-bold rounded-2xl hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-[var(--shadow-primary)] hover:scale-[1.02]"
                >
                  AI에게 공약 물어보기
                  <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
                <Link
                  href="/services/resident-voice"
                  className="flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--text-primary)] text-[16px] font-bold rounded-2xl border-2 border-[var(--border)] hover:border-emerald-400 hover:text-emerald-600 transition-all duration-300"
                >
                  <Megaphone className="w-5 h-5" />
                  구민의 소리 전하기
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex items-center justify-center gap-8 mt-12 text-sm text-[var(--text-tertiary)]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>개인정보 보호</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>24시간 이용 가능</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>누구나 무료</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ====== SERVICES ====== */}
      <section id="services" className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">주민 서비스</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              구민을 위한
              <br />
              <span className="text-gradient-primary">4가지 AI 서비스</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              로그인 없이 누구나 자유롭게 이용할 수 있습니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {residentServices.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.1}>
                <Link href={service.href} className="block h-full">
                  <div className="service-card group relative bg-white rounded-2xl border border-[var(--border-light)] p-7 h-full overflow-hidden">
                    {service.tag && (
                      <div className="absolute top-5 right-5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          service.tagColor === "accent"
                            ? "bg-[var(--accent-light)] text-[var(--accent)]"
                            : "bg-[var(--primary-light)] text-[var(--primary)]"
                        }`}>
                          {service.tag}
                        </span>
                      </div>
                    )}

                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{service.name}</h3>
                    <p className="text-sm text-[var(--primary)] font-medium mb-3">{service.tagline}</p>
                    <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mb-5">{service.description}</p>

                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${service.bgAccent} mb-4`}>
                      <span className="text-xs font-bold text-[var(--text-primary)]">{service.metrics}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] group-hover:gap-3 transition-all duration-300">
                      시작하기
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section id="features" className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[300px] opacity-[0.03]" />
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              이렇게 <span className="text-gradient-primary">이용</span>하세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              쉽고 빠르게, 누구나 바로 사용할 수 있습니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "서비스 선택", desc: "공약 질문, 의견 전달, 정책 매칭 등 원하는 서비스를 선택하세요.", icon: "👆" },
              { step: "02", title: "AI와 대화", desc: "AI가 친절하게 안내하고, 필요한 정보를 제공하거나 의견을 수집합니다.", icon: "💬" },
              { step: "03", title: "결과 확인", desc: "맞춤형 정책 정보를 받거나, 전달된 의견이 정책에 반영됩니다.", icon: "✅" },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="relative bg-white rounded-2xl p-8 border border-[var(--border-light)] hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <div className="text-xs font-bold text-[var(--primary)] mb-3 tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  {i < 2 && (
                    <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-6 h-6 text-[var(--text-tertiary)]" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

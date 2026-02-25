"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  Clock,
  Globe,
  BarChart3,
  Heart,
  Shield,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Users,
  Bot,
  Send,
  QrCode,
  Share2,
  Presentation,
  Check,
  Zap,
  Database,
  Brain,
  Rocket,
  Activity,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ChatInterface from "@/components/ChatInterface";

/* =====================================================
   DATA
   ===================================================== */

const problems = [
  {
    icon: Clock,
    title: "제한된 소통 시간",
    desc: "사무실 운영시간에만 유권자 응대가 가능하며, 야간/주말 문의 대부분 유실",
  },
  {
    icon: Users,
    title: "일관성 없는 메시지",
    desc: "캠프 인원마다 공약 설명 방식이 달라 유권자에게 혼선 초래",
  },
  {
    icon: BarChart3,
    title: "높은 운영 비용",
    desc: "전화/방문 응대 인력 유지 비용이 캠프 예산의 30% 이상 차지",
  },
];

const solutions = [
  {
    icon: Bot,
    title: "24시간 AI 자동 응대",
    desc: "새벽이든 휴일이든, AI가 후보자의 어조로 즉시 답변합니다",
  },
  {
    icon: MessageSquare,
    title: "완벽한 메시지 일관성",
    desc: "학습된 페르소나 기반으로 어떤 질문에도 동일한 메시지 전달",
  },
  {
    icon: Zap,
    title: "운영 비용 70% 절감",
    desc: "인력 최소화로 소통 품질은 높이고, 캠프 예산은 절약합니다",
  },
];

const features = [
  {
    icon: Bot,
    title: "후보자 아바타 AI",
    desc: "실제 후보자의 말투와 성격을 학습한 AI 아바타가 유권자와 자연스럽게 대화합니다. 연설문, 인터뷰, SNS 데이터를 종합 분석하여 후보자 고유의 화법을 재현합니다.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Clock,
    title: "24시간 실시간 응대",
    desc: "야간, 주말, 공휴일 관계없이 유권자 질문에 즉각적인 답변을 제공합니다. 평균 응답시간 3초로 유권자 이탈률을 획기적으로 줄입니다.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: Globe,
    title: "다국어 지원",
    desc: "한국어, 영어, 중국어 등 12개 언어로 공약을 소개합니다. 다문화 가정, 외국인 주민에게도 공약을 정확하게 전달할 수 있습니다.",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: Heart,
    title: "감정 분석 리포트",
    desc: "유권자 반응과 감정을 실시간으로 분석합니다. 긍정/부정/중립 감정 비율과 핵심 키워드를 대시보드에서 한눈에 파악할 수 있습니다.",
    color: "from-rose-500 to-pink-400",
  },
  {
    icon: Sparkles,
    title: "맞춤형 공약 추천",
    desc: "유권자의 관심사와 질문 패턴을 분석하여 가장 관련성 높은 공약을 자동으로 추천합니다. 개인화된 공약 소개로 유권자 설득력을 극대화합니다.",
    color: "from-amber-500 to-orange-400",
  },
  {
    icon: Shield,
    title: "선관위 가이드라인 준수",
    desc: "공직선거법과 선관위 가이드라인을 자동으로 검토합니다. 부적절한 표현이나 위반 소지가 있는 답변을 사전 차단하여 법적 안전성을 보장합니다.",
    color: "from-sky-500 to-blue-400",
  },
];

const candidates = [
  { name: "성준기", district: "서울 강남구", party: "#0052FF", role: "구청장 후보" },
  { name: "이서연", district: "경기 성남시", party: "#10B981", role: "시장 후보" },
  { name: "박준혁", district: "부산 해운대구", party: "#EF4444", role: "구청장 후보" },
  { name: "정하은", district: "대전 유성구", party: "#F59E0B", role: "구청장 후보" },
];

const chatMessages = [
  {
    sender: "voter",
    text: "안녕하세요, 강남구 교통 문제에 대한 공약이 궁금합니다.",
    time: "오후 3:24",
  },
  {
    sender: "bot",
    text: "안녕하세요! 교통 문제에 관심을 가져주셔서 감사합니다. 저는 강남구의 교통 혁신을 위해 3가지 핵심 공약을 준비했습니다.\n\n1. 스마트 교통 신호 시스템 도입으로 출퇴근 시간 정체 30% 감소\n2. GTX-C 연계 버스 노선 12개 신설\n3. 자전거 전용 도로 25km 확충\n\n어떤 공약에 대해 더 자세히 알고 싶으신가요?",
    time: "오후 3:24",
  },
  {
    sender: "voter",
    text: "스마트 교통 신호 시스템이 구체적으로 어떤 건가요?",
    time: "오후 3:25",
  },
  {
    sender: "bot",
    text: "좋은 질문입니다! AI 기반 교통 신호 시스템은 실시간 교통량을 분석하여 신호 주기를 자동 최적화하는 시스템입니다.\n\n현재 강남역 사거리 기준 평균 대기시간이 180초인데, 이 시스템으로 120초 이내로 줄일 수 있습니다. 올해 시범 운영 후 2027년까지 강남구 전역에 확대할 계획입니다.",
    time: "오후 3:25",
  },
];

const steps = [
  {
    icon: Database,
    num: "01",
    title: "후보자 데이터 입력",
    desc: "공약집, 연설문, 인터뷰 영상, SNS 게시물 등 후보자의 공식 발언 데이터를 업로드합니다. 다양한 형식(PDF, 텍스트, 영상, 오디오)을 모두 지원합니다.",
  },
  {
    icon: Brain,
    num: "02",
    title: "AI 페르소나 학습",
    desc: "업로드된 데이터를 기반으로 AI가 후보자의 말투, 어조, 성격, 핵심 가치관을 학습합니다. 약 48시간 내에 후보자 고유의 대화 모델이 완성됩니다.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "챗봇 배포",
    desc: "학습 완료된 챗봇을 캠프 웹사이트, 카카오톡 채널, 네이버 스마트스토어 등 원하는 플랫폼에 원클릭으로 배포합니다.",
  },
  {
    icon: Activity,
    num: "04",
    title: "실시간 분석",
    desc: "유권자 대화 내용, 감정 분석, 주요 관심 키워드를 실시간 대시보드로 모니터링합니다. 주간 리포트를 자동으로 생성하여 캠프 전략에 반영할 수 있습니다.",
  },
];

const metrics = [
  { value: "97", suffix: "%", label: "응답 정확도", sub: "전문가 평가 기준" },
  { value: "3", suffix: "초", label: "평균 응답시간", sub: "질문 수신 후 답변까지" },
  { value: "24/7", suffix: "", label: "무중단 서비스", sub: "연중무휴 자동 운영" },
  { value: "50", suffix: "만+", label: "누적 대화", sub: "2025년 12월 기준" },
];

const useCases = [
  {
    icon: QrCode,
    title: "유세 현장",
    desc: "선거 유세 현장에서 QR 코드를 배포하여 유권자가 즉시 챗봇에 접속할 수 있습니다. 현장에서 미처 전달하지 못한 공약도 AI가 상세히 설명합니다.",
    img: "유세차량에 QR 부착 → 스마트폰 스캔 → 즉시 AI 대화 시작",
  },
  {
    icon: Share2,
    title: "SNS 캠페인",
    desc: "카카오톡 채널, 인스타그램 DM, 페이스북 메신저와 연동하여 SNS에서 바로 공약 챗봇을 이용할 수 있습니다. MZ세대 유권자와의 소통을 극대화합니다.",
    img: "카카오톡 · 인스타그램 · 페이스북 실시간 연동",
  },
  {
    icon: Presentation,
    title: "공약 설명회",
    desc: "비대면 온라인 공약 설명회에서 AI가 진행을 보조합니다. 참석자의 실시간 질문에 AI가 즉시 답변하여 설명회의 효율을 높입니다.",
    img: "온라인 설명회 중 AI 실시간 Q&A 자동 운영",
  },
];

/* =====================================================
   COMPONENTS
   ===================================================== */

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-5xl md:text-6xl font-extrabold tracking-tight"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {value}
      <span className="text-[var(--primary)]">{suffix}</span>
    </motion.span>
  );
}

function ChatBubble({
  sender,
  text,
  time,
  delay = 0,
}: {
  sender: "voter" | "bot";
  text: string;
  time: string;
  delay?: number;
}) {
  const isBot = sender === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`flex gap-3 ${isBot ? "" : "flex-row-reverse"}`}
    >
      {isBot && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-400 flex items-center justify-center shrink-0 mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] ${isBot ? "" : "text-right"}`}>
        <div
          className={`inline-block px-4 py-3 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line ${
            isBot
              ? "bg-white border border-[var(--border-light)] text-[var(--text-primary)] rounded-tl-md"
              : "bg-[var(--primary)] text-white rounded-tr-md"
          }`}
        >
          {text}
        </div>
        <p
          className={`text-[11px] text-[var(--text-tertiary)] mt-1.5 ${
            isBot ? "" : "text-right"
          }`}
        >
          {time}
        </p>
      </div>
      {!isBot && (
        <div className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border-light)] flex items-center justify-center shrink-0 mt-1">
          <Users className="w-4 h-4 text-[var(--text-tertiary)]" />
        </div>
      )}
    </motion.div>
  );
}

/* =====================================================
   PAGE
   ===================================================== */

export default function PledgeBotPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[200px] opacity-[0.03]" />

        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-blue-400 opacity-10"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-orange-300 opacity-10"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <div>
              <FadeIn delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/10 mb-8">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-sm font-semibold text-[var(--accent)]">
                    BEST 인기 서비스
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-[var(--text-primary)]">
                    후보자의 목소리로
                  </span>
                  <br />
                  <span className="text-gradient-primary">공약을 전합니다</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                  AI가 후보자의 말투, 성격, 핵심 가치관을 학습하여 유권자의
                  질문에 24시간 답변합니다. 실제 후보자와 대화하는 듯한 자연스러운
                  소통으로 공약 전달력을 극대화하세요.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="#demo"
                    className="group flex items-center gap-2.5 px-8 py-4 bg-[var(--primary)] text-white text-[16px] font-bold rounded-2xl hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-[var(--shadow-primary)] hover:scale-[1.02]"
                  >
                    지금 시작하기
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="#demo"
                    className="flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--text-primary)] text-[16px] font-bold rounded-2xl border-2 border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
                  >
                    데모 체험하기
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-[var(--text-tertiary)]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--success)]" />
                    <span>5분 만에 설정 완료</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--success)]" />
                    <span>선관위 가이드라인 준수</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--success)]" />
                    <span>14일 무료 체험</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right - Chat Mockup */}
            <FadeIn delay={0.3} direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-[32px] blur-xl" />
                <div className="relative bg-white rounded-3xl border border-[var(--border-light)] shadow-2xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-[var(--primary)] to-[#3378FF] px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-[15px]">
                          성준기 후보 AI
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-white/70 text-xs">
                            온라인 - 평균 3초 내 응답
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Body */}
                  <div className="p-5 space-y-4 bg-[var(--surface)] min-h-[340px] max-h-[400px] overflow-y-auto">
                    <div className="text-center">
                      <span className="text-[11px] text-[var(--text-tertiary)] bg-white px-3 py-1 rounded-full border border-[var(--border-light)]">
                        2026년 2월 24일 오후 3:24
                      </span>
                    </div>
                    {chatMessages.map((msg, i) => (
                      <ChatBubble
                        key={i}
                        sender={msg.sender as "voter" | "bot"}
                        text={msg.text}
                        time={msg.time}
                        delay={0.5 + i * 0.15}
                      />
                    ))}
                    {/* Typing Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-400 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex items-center gap-1.5 bg-white px-4 py-3 rounded-2xl rounded-tl-md border border-[var(--border-light)]">
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]"
                        />
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]"
                        />
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Chat Input */}
                  <div className="px-5 py-4 bg-white border-t border-[var(--border-light)]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[var(--surface)] rounded-xl px-4 py-3 text-sm text-[var(--text-tertiary)]">
                        공약에 대해 궁금한 점을 물어보세요...
                      </div>
                      <button className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors shrink-0">
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ====== PROBLEM / SOLUTION SECTION ====== */}
      <section className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[300px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          {/* Problems */}
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--danger)]" />
              <span className="text-sm font-semibold text-[var(--danger)]">
                기존 유권자 소통의 한계
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              선거 캠프가 직면한{" "}
              <span className="text-[var(--danger)]">3가지 문제</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {problems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-[var(--border-light)] h-full hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-[var(--danger)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Arrow */}
          <FadeIn className="flex justify-center mb-16">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-[var(--primary)]">
                AI 공약 챗봇의 해결책
              </span>
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center animate-bounce">
                <ChevronRight className="w-5 h-5 text-white rotate-90" />
              </div>
            </div>
          </FadeIn>

          {/* Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border-2 border-[var(--primary)]/10 h-full hover:shadow-lg hover:border-[var(--primary)]/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary-50)] flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== KEY FEATURES GRID ====== */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Zap className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">
                핵심 기능
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-primary">6가지 핵심 기능</span>으로
              <br />
              완벽한 유권자 소통
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              단순한 챗봇이 아닙니다. AI가 후보자의 철학과 가치관까지 학습하여
              유권자에게 진정성 있는 소통 경험을 제공합니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-8 border border-[var(--border-light)] h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-400">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INTERACTIVE DEMO SECTION ====== */}
      <section
        id="demo"
        className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[250px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[250px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">
                AI 실시간 데모
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              직접 <span className="text-gradient-primary">대화</span>해보세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              강남구 정책과 공약에 대해 AI 정책비서에게 무엇이든 물어보세요.
              <br className="hidden md:block" />
              실제 강남구 데이터를 기반으로 즉시 답변합니다.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <ChatInterface />
            </div>
          </FadeIn>

          {/* Trust badges */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--primary)]" />
                <span>선관위 가이드라인 준수</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--primary)]" />
                <span>실시간 AI 응답</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[var(--primary)]" />
                <span>2026년 최신 데이터 기반</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              시작은{" "}
              <span className="text-gradient-primary">간단합니다</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              4단계로 완성하는 AI 공약 챗봇. 복잡한 기술 지식 없이도 누구나
              시작할 수 있습니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="relative bg-white rounded-2xl p-8 border border-[var(--border-light)] h-full hover:shadow-xl transition-all duration-300 group">
                  {/* Step number */}
                  <div
                    className="text-[64px] font-extrabold text-[var(--primary)]/5 absolute top-4 right-6 leading-none select-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.num}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary-50)] flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-[var(--primary)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div
                    className="text-xs font-bold text-[var(--primary)] mb-3 tracking-wider"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    STEP {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Connector arrow */}
                  {i < 3 && (
                    <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)]" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== METRICS SECTION ====== */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#0B1222] to-[#141E33] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)] rounded-full blur-[300px] opacity-[0.08]" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              숫자로 증명합니다
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              실제 선거 캠프에서 검증된 AI 공약 챗봇의 성과입니다
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.1} className="text-center">
                <AnimatedCounter value={m.value} suffix={m.suffix} />
                <p className="mt-3 text-base font-semibold text-white/80">
                  {m.label}
                </p>
                <p className="mt-1 text-xs text-white/40">{m.sub}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== USE CASES ====== */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/10 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-semibold text-[var(--accent)]">
                활용 사례
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              이렇게 <span className="text-gradient-accent">활용</span>하세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              다양한 선거 현장에서 AI 공약 챗봇이 어떻게 활용되는지 확인하세요
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {useCases.map((uc, i) => (
              <FadeIn key={uc.title} delay={i * 0.12}>
                <div className="group bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-400">
                  {/* Visual top */}
                  <div className="relative bg-gradient-to-br from-[var(--primary-50)] to-[var(--surface)] p-8 text-center border-b border-[var(--border-light)]">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <uc.icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                      {uc.img}
                    </p>
                  </div>
                  {/* Content */}
                  <div className="p-7">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                      {uc.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section id="contact" className="py-24 md:py-32 bg-[var(--surface)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-[var(--primary)] to-[#0043CC] rounded-3xl p-12 md:p-20 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-grid opacity-5" />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8"
                >
                  <MessageSquare className="w-8 h-8 text-white" />
                </motion.div>

                <h2
                  className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  지금 AI 공약 챗봇을
                  <br />
                  시작하세요
                </h2>
                <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                  14일 무료 체험으로 AI 공약 챗봇의 효과를 직접 확인하세요.
                  <br />
                  카드 등록 없이, 설정 5분이면 충분합니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="group flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--primary)] text-[16px] font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer">
                    무료 체험 시작하기
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 bg-white/10 text-white text-[16px] font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    상담 예약하기
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/40">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>카드 등록 불필요</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>14일 전체 기능 이용</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>언제든 해지 가능</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import {
  Clock,
  Users,
  BarChart3,
  Bot,
  MessageSquare,
  Zap,
  Globe,
  Heart,
  Sparkles,
  Shield,
  Database,
  Brain,
  Rocket,
  Activity,
  QrCode,
  Share2,
  Presentation,
  Send,
} from "lucide-react";

/* =====================================================
   DATA ARRAYS
   ===================================================== */

export const problems = [
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

export const solutions = [
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

export const features = [
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

export const candidates = [
  { name: "네안데르", district: "서울 강남구", party: "#0052FF", role: "구청장 후보" },
  { name: "이서연", district: "경기 성남시", party: "#10B981", role: "시장 후보" },
  { name: "박준혁", district: "부산 해운대구", party: "#EF4444", role: "구청장 후보" },
  { name: "정하은", district: "대전 유성구", party: "#F59E0B", role: "구청장 후보" },
];

export const chatMessages = [
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

export const steps = [
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

export const metrics = [
  { value: "97", suffix: "%", label: "응답 정확도", sub: "전문가 평가 기준" },
  { value: "3", suffix: "초", label: "평균 응답시간", sub: "질문 수신 후 답변까지" },
  { value: "24/7", suffix: "", label: "무중단 서비스", sub: "연중무휴 자동 운영" },
  { value: "50", suffix: "만+", label: "누적 대화", sub: "2025년 12월 기준" },
];

export const useCases = [
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
   HELPER COMPONENTS
   ===================================================== */

import { motion } from "framer-motion";

export function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
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

export function ChatBubble({
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

export function HeroChatMockup() {
  return (
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
                네안데르 후보 AI
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
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Radio,
  ArrowRight,
  Search,
  Brain,
  TrendingUp,
  FileText,
  AlertTriangle,
  Users,
  Newspaper,
  MessageCircle,
  Globe,
  Twitter,
  Instagram,
  Youtube,
  Calendar,
  MapPin,
  ChevronRight,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Zap,
  BarChart3,
  Activity,
  Filter,
  Clock,
  CheckCircle2,
  Shield,
  Sparkles,
  Database,
  Cpu,
  LineChart,
  Eye,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

/* ─── Data ────────────────────────────────────────────────── */

const dataSources = [
  {
    name: "네이버 뉴스",
    icon: Newspaper,
    volume: "일 12,000건",
    color: "#03C75A",
    bgColor: "bg-green-50",
  },
  {
    name: "다음 카페",
    icon: MessageCircle,
    volume: "일 8,500건",
    color: "#FFCD00",
    bgColor: "bg-yellow-50",
  },
  {
    name: "지역 커뮤니티",
    icon: Globe,
    volume: "일 6,200건",
    color: "#0052FF",
    bgColor: "bg-blue-50",
  },
  {
    name: "X (트위터)",
    icon: Twitter,
    volume: "일 9,800건",
    color: "#0B1222",
    bgColor: "bg-gray-50",
  },
  {
    name: "인스타그램",
    icon: Instagram,
    volume: "일 7,300건",
    color: "#E4405F",
    bgColor: "bg-pink-50",
  },
  {
    name: "유튜브 댓글",
    icon: Youtube,
    volume: "일 6,200건",
    color: "#FF0000",
    bgColor: "bg-red-50",
  },
];

const features = [
  {
    icon: Search,
    title: "자동 크롤링 엔진",
    description:
      "6개 플랫폼에서 24시간 자동 수집. 키워드 기반 정밀 필터링으로 지역구 관련 게시물만 선별하여 수집합니다.",
    tag: "CORE",
  },
  {
    icon: Brain,
    title: "AI 감성 분석",
    description:
      "긍정/부정/중립 자동 분류에 더해 분노, 기대, 불안 등 세부 감정까지 태깅합니다. 한국어 특화 NLP 모델 적용.",
    tag: "AI",
  },
  {
    icon: TrendingUp,
    title: "트렌드 키워드",
    description:
      "실시간 인기 키워드 및 급상승 이슈를 자동 추적합니다. 시간대별 키워드 변화 추이를 한눈에 파악할 수 있습니다.",
    tag: "",
  },
  {
    icon: FileText,
    title: "일일 리포트 자동화",
    description:
      "매일 아침 8시, 전일 민심 요약 리포트를 자동 발송합니다. PDF, 이메일, 카카오톡 등 원하는 채널로 수신 가능.",
    tag: "AUTO",
  },
  {
    icon: AlertTriangle,
    title: "위기 감지 알림",
    description:
      "부정 여론 급증, 가짜뉴스 확산, 경쟁 후보 공격 등 위기 상황을 실시간 감지하고 즉시 알림을 전송합니다.",
    tag: "ALERT",
  },
  {
    icon: Users,
    title: "경쟁 후보 비교",
    description:
      "나와 경쟁 후보의 민심을 병렬 비교 분석합니다. 강점/약점 매트릭스와 주제별 여론 우위 분석을 제공합니다.",
    tag: "",
  },
];

const pipelineSteps = [
  {
    icon: Database,
    step: "01",
    title: "데이터 수집",
    description: "6개 플랫폼에서 키워드 기반 실시간 크롤링",
    detail: "네이버, 다음, X, 인스타그램, 유튜브, 지역 커뮤니티",
  },
  {
    icon: Filter,
    step: "02",
    title: "전처리 & 정제",
    description: "중복 제거, 스팸 필터링, 텍스트 정규화",
    detail: "자동 언어 감지, 비속어 필터, 봇 게시물 제거",
  },
  {
    icon: Cpu,
    step: "03",
    title: "AI 분석 & 분류",
    description: "감성 분석, 키워드 추출, 토픽 모델링",
    detail: "한국어 특화 BERT 모델, 정확도 94%",
  },
  {
    icon: LineChart,
    step: "04",
    title: "시각화 & 리포트",
    description: "대시보드 반영 및 자동 리포트 생성",
    detail: "실시간 대시보드, PDF/이메일 자동 발송",
  },
];

const metrics = [
  { value: "50,000", suffix: "+", label: "일일 데이터 분석", unit: "건" },
  { value: "6", suffix: "개", label: "플랫폼 실시간 모니터링", unit: "" },
  { value: "94", suffix: "%", label: "감성 분석 정확도", unit: "" },
  { value: "3", suffix: "분", label: "위기 감지 평균 소요시간", unit: "" },
];

const trendingKeywords = [
  { text: "재개발", size: "text-2xl", weight: "font-extrabold", color: "text-[#0052FF]" },
  { text: "교통", size: "text-lg", weight: "font-bold", color: "text-[#0B1222]" },
  { text: "학군", size: "text-xl", weight: "font-bold", color: "text-emerald-600" },
  { text: "일자리", size: "text-base", weight: "font-semibold", color: "text-[#475569]" },
  { text: "주차장", size: "text-sm", weight: "font-medium", color: "text-[#94A3B8]" },
  { text: "공원", size: "text-xl", weight: "font-bold", color: "text-[#FF6B2C]" },
  { text: "소음", size: "text-base", weight: "font-semibold", color: "text-red-500" },
  { text: "안전", size: "text-lg", weight: "font-bold", color: "text-[#0052FF]" },
  { text: "환경", size: "text-sm", weight: "font-medium", color: "text-emerald-500" },
  { text: "복지", size: "text-xl", weight: "font-extrabold", color: "text-[#0B1222]" },
  { text: "도서관", size: "text-sm", weight: "font-medium", color: "text-[#94A3B8]" },
  { text: "상권", size: "text-lg", weight: "font-bold", color: "text-amber-600" },
  { text: "보육", size: "text-base", weight: "font-semibold", color: "text-[#475569]" },
  { text: "노후", size: "text-sm", weight: "font-medium", color: "text-[#94A3B8]" },
  { text: "GTX", size: "text-xl", weight: "font-extrabold", color: "text-[#0052FF]" },
];

const recentMentions = [
  {
    source: "네이버 뉴스",
    sourceColor: "bg-green-100 text-green-700",
    text: "OO구 재개발 추진위, 주민 설명회 개최... 찬반 의견 팽팽",
    sentiment: "중립",
    sentimentColor: "bg-gray-100 text-gray-600",
    time: "2분 전",
  },
  {
    source: "X",
    sourceColor: "bg-gray-100 text-gray-700",
    text: "우리 동네 교통체증 진짜 심각한데 후보들은 뭐하는건지...",
    sentiment: "부정",
    sentimentColor: "bg-red-100 text-red-600",
    time: "5분 전",
  },
  {
    source: "다음 카페",
    sourceColor: "bg-yellow-100 text-yellow-700",
    text: "새로 생긴 공원 너무 좋네요! 이런 정책 더 해주세요",
    sentiment: "긍정",
    sentimentColor: "bg-emerald-100 text-emerald-600",
    time: "8분 전",
  },
  {
    source: "유튜브",
    sourceColor: "bg-red-100 text-red-700",
    text: "OO구 예산 집행 현황 분석 영상... 주민들 반응 뜨거워",
    sentiment: "긍정",
    sentimentColor: "bg-emerald-100 text-emerald-600",
    time: "12분 전",
  },
];

/* ─── Helper Components ───────────────────────────────────── */

function SentimentBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-[#475569] w-8 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-3 bg-[#F7F9FC] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span
        className="text-sm font-bold w-10 text-right"
        style={{ color }}
      >
        {value}%
      </span>
    </div>
  );
}

function MiniBarChart() {
  const bars = [35, 52, 44, 68, 55, 72, 60, 78, 65, 82, 70, 58];
  return (
    <div className="flex items-end gap-1 h-20">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="flex-1 rounded-t-sm"
          style={{
            backgroundColor:
              i === bars.length - 1
                ? "#0052FF"
                : i >= bars.length - 3
                ? "#0052FF80"
                : "#E2E8F0",
          }}
        />
      ))}
    </div>
  );
}

function DailyTrendChart() {
  const points = [45, 52, 48, 62, 58, 72, 65];
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const maxVal = Math.max(...points);
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2 h-24">
        {points.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(val / maxVal) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-300"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {days.map((day) => (
          <span
            key={day}
            className="flex-1 text-center text-[10px] font-medium text-[#94A3B8]"
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */

export default function SentimentRadarPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-teal-400 rounded-full blur-[200px] opacity-[0.03]" />

        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 opacity-10"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 opacity-10"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-emerald-700">
                  NEW 실시간 민심 분석
                </span>
                <Radio className="w-4 h-4 text-emerald-600" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                className="text-5xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[#0B1222]">지역구 민심을</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  24시간 감지
                </span>
                <span className="text-[#0B1222]">합니다</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-[#475569] leading-relaxed max-w-2xl mx-auto mb-10">
                AI가 SNS, 뉴스, 커뮤니티를 자동 크롤링하고
                <br className="hidden md:block" />
                감성 분석하여 매일 리포트를 생성합니다
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#contact"
                  className="group flex items-center gap-2.5 px-8 py-4 bg-emerald-600 text-white text-[16px] font-bold rounded-2xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02]"
                >
                  무료 체험 시작하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#dashboard"
                  className="flex items-center gap-2.5 px-8 py-4 bg-white text-[#0B1222] text-[16px] font-bold rounded-2xl border-2 border-[#E2E8F0] hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300"
                >
                  대시보드 미리보기
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="flex items-center justify-center gap-8 mt-10 text-sm text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>선관위 가이드라인 준수</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>3분 내 위기 감지</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>일 50,000건 분석</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Hero Dashboard Visual */}
          <FadeIn delay={0.5} className="mt-20">
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
              <div className="bg-[#F7F9FC] rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span
                    className="ml-4 text-sm text-[#94A3B8]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    민심 레이더 - 서울 OO구 대시보드
                  </span>
                </div>

                {/* Dashboard grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Sentiment Score */}
                  <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-[#0B1222]">
                        감성 분석 현황
                      </h4>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        LIVE
                      </span>
                    </div>
                    <div className="space-y-3">
                      <SentimentBar
                        label="긍정"
                        value={62}
                        color="#10B981"
                        delay={0.8}
                      />
                      <SentimentBar
                        label="부정"
                        value={23}
                        color="#EF4444"
                        delay={0.9}
                      />
                      <SentimentBar
                        label="중립"
                        value={15}
                        color="#94A3B8"
                        delay={1.0}
                      />
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600">
                          +4.2%
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          전일 대비 긍정 상승
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trending Keywords */}
                  <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-[#0B1222]">
                        트렌드 키워드
                      </h4>
                      <span
                        className="text-[10px] text-[#94A3B8]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        최근 24h
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 min-h-[100px]">
                      {trendingKeywords.slice(0, 10).map((kw, i) => (
                        <motion.span
                          key={kw.text}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7 + i * 0.06 }}
                          className={`${kw.size} ${kw.weight} ${kw.color} cursor-default hover:opacity-70 transition-opacity`}
                        >
                          {kw.text}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Daily Trend */}
                  <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-[#0B1222]">
                        일별 긍정률 추이
                      </h4>
                      <span
                        className="text-[10px] text-[#94A3B8]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        이번 주
                      </span>
                    </div>
                    <DailyTrendChart />
                    <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                      <div className="flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5 text-[#0052FF]" />
                        <span className="text-xs text-[#475569]">
                          주간 평균 <strong className="text-[#0B1222]">62.4%</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini bar chart row */}
                <div className="mt-4 bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-[#0B1222]">
                      시간대별 수집량
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-[#94A3B8]">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
                        현재 시간
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#E2E8F0]" />
                        이전 시간
                      </span>
                    </div>
                  </div>
                  <MiniBarChart />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== DATA SOURCES ====== */}
      <section className="py-24 md:py-32 bg-[#F7F9FC] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[300px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] mb-6">
              <Database className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">
                6개 플랫폼 실시간 수집
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              어디서든{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                민심을 수집
              </span>
              합니다
            </h2>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto">
              주요 온라인 플랫폼의 게시글, 댓글, 뉴스를 AI가 24시간 자동으로 수집하고 분석합니다
            </p>
          </FadeIn>

          {/* Source Cards + Central Engine */}
          <div className="relative max-w-5xl mx-auto">
            {/* Central Analysis Engine */}
            <div className="hidden lg:flex absolute inset-0 items-center justify-center z-0 pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-[280px] h-[280px] rounded-full border-2 border-dashed border-emerald-200 opacity-40"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {dataSources.map((source, i) => (
                <FadeIn key={source.name} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-lg transition-all duration-300 cursor-default"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${source.bgColor} flex items-center justify-center mb-4`}
                    >
                      <source.icon
                        className="w-6 h-6"
                        style={{ color: source.color }}
                      />
                    </div>
                    <h3 className="text-base font-bold text-[#0B1222] mb-1">
                      {source.name}
                    </h3>
                    <p
                      className="text-sm font-semibold text-emerald-600"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {source.volume}
                    </p>
                    {/* Connection indicator */}
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#E2E8F0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-medium text-[#94A3B8]">
                        실시간 연결됨
                      </span>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            {/* Aggregation visual */}
            <FadeIn delay={0.5} className="mt-8">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                <div className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
                  <Cpu className="w-5 h-5" />
                  <span className="text-sm font-bold">
                    AI 분석 엔진 가동 중
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ====== DASHBOARD PREVIEW ====== */}
      <section id="dashboard" className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              실제{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                대시보드
              </span>
              를 미리 보세요
            </h2>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto">
              복잡한 데이터를 직관적인 시각화로 한눈에 파악할 수 있습니다
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-6xl mx-auto bg-[#F7F9FC] rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xl">
              {/* Top Bar */}
              <div className="bg-white border-b border-[#E2E8F0] px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                      <Radio className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className="text-base font-bold text-[#0B1222]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      민심 레이더
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#F7F9FC] rounded-xl border border-[#E2E8F0] text-sm text-[#475569]">
                      <Calendar className="w-4 h-4" />
                      <span style={{ fontFamily: "var(--font-mono)" }}>
                        2026.02.24
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#F7F9FC] rounded-xl border border-[#E2E8F0] text-sm text-[#475569]">
                      <MapPin className="w-4 h-4" />
                      <span>서울 강남구</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left - Sentiment Analysis */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                      <h4 className="text-sm font-bold text-[#0B1222] mb-1">
                        종합 감성 지수
                      </h4>
                      <p className="text-[10px] text-[#94A3B8] mb-4">
                        오늘 수집된 4,832건 기준
                      </p>

                      {/* Large circular score */}
                      <div className="flex justify-center mb-5">
                        <div className="relative w-28 h-28">
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full -rotate-90"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="42"
                              fill="none"
                              stroke="#E2E8F0"
                              strokeWidth="8"
                            />
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="42"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={`${62 * 2.64} ${100 * 2.64}`}
                              initial={{ strokeDashoffset: 264 }}
                              whileInView={{ strokeDashoffset: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.5 }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span
                              className="text-2xl font-extrabold text-[#0B1222]"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              62
                            </span>
                            <span className="text-[10px] font-medium text-[#94A3B8]">
                              긍정 지수
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <SentimentBar
                          label="긍정"
                          value={62}
                          color="#10B981"
                          delay={0.6}
                        />
                        <SentimentBar
                          label="부정"
                          value={23}
                          color="#EF4444"
                          delay={0.7}
                        />
                        <SentimentBar
                          label="중립"
                          value={15}
                          color="#94A3B8"
                          delay={0.8}
                        />
                      </div>
                    </div>

                    {/* Emotion Breakdown */}
                    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                      <h4 className="text-sm font-bold text-[#0B1222] mb-3">
                        세부 감정 분석
                      </h4>
                      <div className="space-y-2">
                        {[
                          { emotion: "기대", value: 34, color: "#0052FF" },
                          { emotion: "만족", value: 22, color: "#10B981" },
                          { emotion: "불만", value: 18, color: "#F59E0B" },
                          { emotion: "분노", value: 12, color: "#EF4444" },
                          { emotion: "불안", value: 8, color: "#8B5CF6" },
                          { emotion: "기타", value: 6, color: "#94A3B8" },
                        ].map((item) => (
                          <div
                            key={item.emotion}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-xs text-[#475569]">
                                {item.emotion}
                              </span>
                            </div>
                            <span
                              className="text-xs font-bold"
                              style={{ fontFamily: "var(--font-mono)", color: item.color }}
                            >
                              {item.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center - Keywords & Trend */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Trending Keywords Cloud */}
                    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h4 className="text-sm font-bold text-[#0B1222]">
                            트렌드 키워드
                          </h4>
                          <p className="text-[10px] text-[#94A3B8] mt-0.5">
                            최근 24시간 기준 주요 키워드
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 bg-[#0052FF] text-white text-[10px] font-bold rounded-lg">
                            24H
                          </button>
                          <button className="px-3 py-1.5 bg-[#F7F9FC] text-[#94A3B8] text-[10px] font-bold rounded-lg">
                            7D
                          </button>
                          <button className="px-3 py-1.5 bg-[#F7F9FC] text-[#94A3B8] text-[10px] font-bold rounded-lg">
                            30D
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 min-h-[140px] py-4">
                        {trendingKeywords.map((kw, i) => (
                          <motion.span
                            key={kw.text}
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.04 }}
                            whileHover={{ scale: 1.15 }}
                            className={`${kw.size} ${kw.weight} ${kw.color} cursor-default transition-all`}
                          >
                            {kw.text}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Weekly Trend */}
                    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-[#0B1222]">
                            주간 감성 추이
                          </h4>
                          <p className="text-[10px] text-[#94A3B8] mt-0.5">
                            일별 긍정/부정 비율 변화
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px]">
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                            <span className="text-[#475569]">긍정</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-sm bg-red-400" />
                            <span className="text-[#475569]">부정</span>
                          </span>
                        </div>
                      </div>
                      {/* Dual bar chart */}
                      <div className="space-y-2">
                        {["월", "화", "수", "목", "금", "토", "일"].map(
                          (day, i) => {
                            const positive = [58, 55, 63, 60, 67, 65, 62][i];
                            const negative = [25, 28, 22, 24, 18, 21, 23][i];
                            return (
                              <div key={day} className="flex items-center gap-3">
                                <span className="text-xs font-medium text-[#94A3B8] w-5 shrink-0">
                                  {day}
                                </span>
                                <div className="flex-1 flex gap-1">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{
                                      width: `${positive}%`,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                      duration: 0.8,
                                      delay: 0.2 + i * 0.05,
                                    }}
                                    className="h-4 bg-emerald-400 rounded-l-sm"
                                  />
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{
                                      width: `${negative}%`,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                      duration: 0.8,
                                      delay: 0.3 + i * 0.05,
                                    }}
                                    className="h-4 bg-red-300 rounded-r-sm"
                                  />
                                </div>
                                <span
                                  className="text-[10px] font-semibold text-emerald-600 w-8 text-right"
                                  style={{ fontFamily: "var(--font-mono)" }}
                                >
                                  {positive}%
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right - Recent Mentions & Map */}
                  <div className="lg:col-span-3 space-y-4">
                    {/* Region Mini Map */}
                    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                      <h4 className="text-sm font-bold text-[#0B1222] mb-3">
                        지역 감성 지도
                      </h4>
                      <div className="relative bg-[#F7F9FC] rounded-xl p-4 h-[120px] flex items-center justify-center">
                        {/* Stylized map placeholder */}
                        <div className="grid grid-cols-5 grid-rows-3 gap-1">
                          {Array.from({ length: 15 }).map((_, i) => {
                            const colors = [
                              "bg-emerald-300",
                              "bg-emerald-400",
                              "bg-emerald-200",
                              "bg-yellow-200",
                              "bg-emerald-300",
                              "bg-red-200",
                              "bg-emerald-400",
                              "bg-emerald-300",
                              "bg-yellow-300",
                              "bg-emerald-200",
                              "bg-emerald-300",
                              "bg-emerald-400",
                              "bg-red-200",
                              "bg-emerald-200",
                              "bg-emerald-300",
                            ];
                            const hidden = [0, 4, 10, 14];
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: hidden.includes(i) ? 0 : 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.03 }}
                                className={`w-6 h-6 rounded-md ${
                                  hidden.includes(i)
                                    ? "bg-transparent"
                                    : colors[i]
                                }`}
                              />
                            );
                          })}
                        </div>
                        <div className="absolute bottom-2 right-2 flex items-center gap-2 text-[8px] text-[#94A3B8]">
                          <span className="flex items-center gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            긍정
                          </span>
                          <span className="flex items-center gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
                            중립
                          </span>
                          <span className="flex items-center gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                            부정
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Mentions */}
                    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-[#0B1222]">
                          최근 언급
                        </h4>
                        <Eye className="w-4 h-4 text-[#94A3B8]" />
                      </div>
                      <div className="space-y-3">
                        {recentMentions.map((mention, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="pb-3 border-b border-[#E2E8F0] last:border-0 last:pb-0"
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${mention.sourceColor}`}
                              >
                                {mention.source}
                              </span>
                              <span className="text-[9px] text-[#94A3B8]">
                                {mention.time}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#475569] leading-relaxed line-clamp-2 mb-1.5">
                              {mention.text}
                            </p>
                            <span
                              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${mention.sentimentColor}`}
                            >
                              {mention.sentiment}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== KEY FEATURES ====== */}
      <section className="py-24 md:py-32 bg-[#F7F9FC] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[300px] opacity-[0.03]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] mb-6">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">
                핵심 기능
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              민심 분석의{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                모든 것
              </span>
            </h2>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto">
              데이터 수집부터 위기 감지까지, 민심 분석에 필요한 모든 기능을 제공합니다
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-7 border border-[#E2E8F0] hover:shadow-xl hover:border-emerald-200 transition-all duration-300 h-full relative overflow-hidden group"
                >
                  {feature.tag && (
                    <div className="absolute top-5 right-5">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                        {feature.tag}
                      </span>
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1222] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW ANALYSIS WORKS - PIPELINE ====== */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              분석은 이렇게{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                동작합니다
              </span>
            </h2>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto">
              4단계 자동화 파이프라인으로 데이터 수집부터 리포트 생성까지 완전
              자동화됩니다
            </p>
          </FadeIn>

          <div className="max-w-5xl mx-auto">
            {/* Desktop Pipeline */}
            <div className="hidden md:grid grid-cols-4 gap-0 items-start">
              {pipelineSteps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.15}>
                  <div className="relative flex flex-col items-center text-center px-4">
                    {/* Step circle */}
                    <div className="relative mb-5">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <step.icon className="w-9 h-9 text-white" />
                      </div>
                      <div
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-[#0B1222] flex items-center justify-center"
                      >
                        <span
                          className="text-[10px] font-extrabold text-white"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {step.step}
                        </span>
                      </div>
                    </div>
                    {/* Arrow connector */}
                    {i < pipelineSteps.length - 1 && (
                      <div className="absolute top-10 -right-2 z-10">
                        <ChevronRight className="w-5 h-5 text-emerald-400" />
                      </div>
                    )}
                    <h3 className="text-base font-bold text-[#0B1222] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#475569] mb-2 leading-relaxed">
                      {step.description}
                    </p>
                    <p
                      className="text-[10px] text-[#94A3B8]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Mobile Pipeline */}
            <div className="md:hidden space-y-6">
              {pipelineSteps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shrink-0">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                      {i < pipelineSteps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-emerald-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <span
                        className="text-[10px] font-bold text-emerald-600 mb-1 block"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        STEP {step.step}
                      </span>
                      <h3 className="text-base font-bold text-[#0B1222] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== ALERT SYSTEM ====== */}
      <section className="py-24 md:py-32 bg-[#F7F9FC] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-400 rounded-full blur-[250px] opacity-[0.04]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <FadeIn direction="left">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-6">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-red-600">
                    위기 감지 시스템
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  위기 상황을
                  <br />
                  <span className="text-red-500">즉시 감지</span>하고
                  알립니다
                </h2>
                <p className="text-lg text-[#475569] leading-relaxed mb-8">
                  부정 여론이 급증하거나 가짜뉴스가 확산될 때, AI가 실시간으로
                  감지하고 담당자에게 즉시 알림을 전송합니다. 골든타임 내 대응이
                  가능합니다.
                </p>

                {/* Alert channels */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#0B1222]">
                    알림 채널
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        icon: MessageSquare,
                        name: "카카오톡",
                        desc: "즉시 알림",
                      },
                      {
                        icon: Smartphone,
                        name: "SMS",
                        desc: "긴급 문자",
                      },
                      {
                        icon: Mail,
                        name: "이메일",
                        desc: "상세 리포트",
                      },
                    ].map((channel) => (
                      <div
                        key={channel.name}
                        className="bg-white rounded-xl p-4 border border-[#E2E8F0] text-center"
                      >
                        <channel.icon className="w-6 h-6 text-[#475569] mx-auto mb-2" />
                        <p className="text-xs font-bold text-[#0B1222]">
                          {channel.name}
                        </p>
                        <p className="text-[10px] text-[#94A3B8]">
                          {channel.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right - Alert Dashboard Mockup */}
            <FadeIn direction="right" delay={0.2}>
              <div className="space-y-4">
                {/* Alert notification card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-5 border-2 border-red-200 shadow-lg shadow-red-100/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                  <div className="flex items-start gap-3 ml-2">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          긴급 알림
                        </span>
                        <span
                          className="text-[10px] text-[#94A3B8]"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          방금 전
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#0B1222] mb-1">
                        OO구 재개발 관련 부정 여론 47% 급증 감지
                      </p>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        지난 1시간 동안 재개발 관련 부정 게시물이 급증했습니다.
                        주요 불만 사항: 보상 기준, 이주 대책, 공사 소음
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Warning Dashboard Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-2xl p-5 border border-[#E2E8F0]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-[#0B1222]">
                      위기 지표 대시보드
                    </h4>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-600">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      경고 단계
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "부정 여론 비율",
                        value: "47%",
                        level: 47,
                        warning: true,
                      },
                      {
                        label: "확산 속도",
                        value: "3.2배",
                        level: 72,
                        warning: true,
                      },
                      {
                        label: "관련 게시물",
                        value: "892건",
                        level: 55,
                        warning: false,
                      },
                      {
                        label: "주요 채널 영향도",
                        value: "높음",
                        level: 80,
                        warning: true,
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#475569]">
                            {item.label}
                          </span>
                          <span
                            className={`text-xs font-bold ${
                              item.warning
                                ? "text-red-500"
                                : "text-[#475569]"
                            }`}
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {item.value}
                          </span>
                        </div>
                        <div className="h-2 bg-[#F7F9FC] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className={`h-full rounded-full ${
                              item.warning
                                ? "bg-gradient-to-r from-red-400 to-red-500"
                                : "bg-gradient-to-r from-amber-300 to-amber-400"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Response suggestion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#0B1222] rounded-2xl p-5 text-white"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400">
                      AI 대응 제안
                    </span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    &ldquo;재개발 보상 기준에 대한 주민 우려가 높습니다.
                    투명한 보상 절차 안내 및 주민 설명회 개최를
                    권장합니다.&rdquo;
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] font-medium text-white/50 bg-white/10 px-2 py-1 rounded-md">
                      #보상기준
                    </span>
                    <span className="text-[10px] font-medium text-white/50 bg-white/10 px-2 py-1 rounded-md">
                      #이주대책
                    </span>
                    <span className="text-[10px] font-medium text-white/50 bg-white/10 px-2 py-1 rounded-md">
                      #주민소통
                    </span>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ====== METRICS ====== */}
      <section className="py-24 md:py-32 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              숫자로 보는{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                민심 레이더
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {metrics.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div
                    className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1222] mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                    <span className="text-emerald-600">{stat.suffix}</span>
                  </div>
                  <p className="text-sm font-medium text-[#94A3B8]">
                    {stat.label}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Extra trust badges */}
          <FadeIn delay={0.4} className="mt-16">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {[
                { icon: CheckCircle2, text: "한국어 특화 NLP 엔진" },
                { icon: Shield, text: "개인정보 보호 준수" },
                { icon: Clock, text: "99.9% 서비스 가동률" },
                { icon: Zap, text: "실시간 스트리밍 분석" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-sm text-[#475569]"
                >
                  <badge.icon className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-grid opacity-5" />
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-12 left-[15%] w-12 h-12 rounded-xl bg-white/10"
              />
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-16 right-[12%] w-16 h-16 rounded-full bg-white/5"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
                  <Radio className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white/90">
                    민심 레이더
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  민심 레이더를
                  <br />
                  시작하세요
                </h2>
                <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
                  지역구 민심의 흐름을 24시간 감지하고
                  <br className="hidden sm:block" />
                  데이터 기반 선거 전략을 수립하세요
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-8 py-4 bg-white text-emerald-700 text-[16px] font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer">
                    무료 체험 시작하기
                  </button>
                  <Link
                    href="/"
                    className="px-8 py-4 bg-white/10 text-white text-[16px] font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    다른 서비스 둘러보기
                  </Link>
                </div>
                <p className="text-sm text-white/50 mt-6">
                  7일 무료 체험 &middot; 신용카드 불필요 &middot; 언제든 해지 가능
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

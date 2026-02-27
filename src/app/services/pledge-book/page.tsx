"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Wand2,
  BarChart3,
  Moon,
  Share2,
  Eye,
  Smartphone,
  Heart,
  ChevronRight,
  Palette,
  Type,
  Layout,
  Image,
  Layers,
  Monitor,
  Tablet,
  Users,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

/* ─── data ─── */

const beforeAfter = {
  before: {
    title: "기존 PDF 공약집",
    items: [
      { text: "단방향 정보 전달", bad: true },
      { text: "낮은 조회율 (평균 30초)", bad: true },
      { text: "SNS 공유 어려움", bad: true },
      { text: "디자인 외주 비용 높음", bad: true },
      { text: "수정 시 재인쇄 필요", bad: true },
      { text: "접근성 제한적", bad: true },
    ],
  },
  after: {
    title: "인터랙티브 공약집",
    items: [
      { text: "양방향 유권자 참여", bad: false },
      { text: "높은 참여율 (평균 4.2분)", bad: false },
      { text: "SNS 공유 최적화", bad: false },
      { text: "AI 자동 디자인", bad: false },
      { text: "실시간 업데이트 가능", bad: false },
      { text: "모든 기기에서 접근 가능", bad: false },
    ],
  },
};

const templates = [
  {
    name: "클래식",
    desc: "깔끔한 카드형 레이아웃",
    color: "#0052FF",
    accent: "#E8F0FF",
    layout: "cards",
  },
  {
    name: "모던",
    desc: "풀스크린 스크롤형",
    color: "#7C3AED",
    accent: "#EDE9FE",
    layout: "scroll",
  },
  {
    name: "매거진",
    desc: "잡지 스타일 레이아웃",
    color: "#059669",
    accent: "#ECFDF5",
    layout: "magazine",
  },
  {
    name: "인포그래픽",
    desc: "데이터 시각화 중심",
    color: "#DC2626",
    accent: "#FEF2F2",
    layout: "infographic",
  },
];

const features = [
  {
    icon: Wand2,
    title: "AI 자동 디자인",
    desc: "공약 내용을 입력하면 AI가 최적의 레이아웃과 색상 배합을 제안합니다. 디자인 전문가 없이도 전문적인 공약집을 제작할 수 있습니다.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: BarChart3,
    title: "인터랙티브 차트",
    desc: "예산 배분, 실행 계획, 달성률 등을 인터랙티브 차트로 시각화합니다. 유권자가 직접 탐색하며 공약을 이해할 수 있습니다.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Moon,
    title: "다크모드 지원",
    desc: "밝은/어두운 테마를 자동으로 전환합니다. 사용자 환경에 맞는 최적의 가독성을 제공하여 모든 환경에서 편안한 열람이 가능합니다.",
    gradient: "from-slate-600 to-slate-400",
  },
  {
    icon: Share2,
    title: "SNS 공유 최적화",
    desc: "카카오톡, 인스타그램, 페이스북 공유 시 최적화된 미리보기를 자동 생성합니다. Open Graph 태그 자동 설정으로 공유가 간편합니다.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Eye,
    title: "유권자 반응 추적",
    desc: "어떤 공약에 유권자의 관심이 높은지 실시간으로 분석합니다. 조회수, 체류시간, 관심 표시 데이터를 대시보드에서 확인하세요.",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    desc: "모바일, 태블릿, 데스크톱에서 완벽하게 동작합니다. 기기에 따라 레이아웃이 자동 최적화되어 어디서든 최고의 경험을 제공합니다.",
    gradient: "from-rose-500 to-pink-400",
  },
];

const pledgeCategories = ["교육", "복지", "경제", "환경", "교통"];

const pledgeCards = [
  {
    title: "무상 교복 지원 확대",
    desc: "관내 모든 중·고등학교 학생에게 연 1회 교복 구매비를 지원합니다.",
    budget: "12억원",
    timeline: "2027.03 ~ 2030.06",
    progress: 0,
    likes: 1247,
  },
  {
    title: "학교 돌봄교실 24시 운영",
    desc: "맞벌이 가정을 위해 초등학교 돌봄교실을 야간까지 확대 운영합니다.",
    budget: "28억원",
    timeline: "2027.06 ~ 2030.12",
    progress: 0,
    likes: 982,
  },
  {
    title: "AI 교육 특구 조성",
    desc: "관내 학교에 AI 교육 인프라를 구축하고 전문 강사를 배치합니다.",
    budget: "45억원",
    timeline: "2027.09 ~ 2030.06",
    progress: 0,
    likes: 2156,
  },
];

const colorSwatches = [
  { name: "블루", color: "#0052FF", light: "#E8F0FF" },
  { name: "바이올렛", color: "#7C3AED", light: "#EDE9FE" },
  { name: "에메랄드", color: "#059669", light: "#ECFDF5" },
  { name: "로즈", color: "#E11D48", light: "#FFF1F2" },
  { name: "앰버", color: "#D97706", light: "#FFFBEB" },
  { name: "슬레이트", color: "#475569", light: "#F8FAFC" },
];

const metrics = [
  {
    value: "4.2",
    unit: "분",
    label: "평균 체류시간",
    sub: "PDF 대비 8배",
    icon: Clock,
  },
  {
    value: "340",
    unit: "%",
    label: "SNS 공유율 증가",
    sub: "기존 대비",
    icon: TrendingUp,
  },
  {
    value: "80",
    unit: "%",
    label: "제작 시간 단축",
    sub: "AI 자동 디자인",
    icon: Zap,
  },
  {
    value: "96",
    unit: "%",
    label: "유권자 만족도",
    sub: "공약 전달력",
    icon: Users,
  },
];

/* ─── sub-components ─── */

function TemplatePreview({ layout, color }: { layout: string; color: string }) {
  if (layout === "cards") {
    return (
      <div className="flex flex-col gap-1.5 p-3">
        <div className="h-3 w-16 rounded-sm" style={{ background: color }} />
        <div className="grid grid-cols-2 gap-1.5 mt-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 rounded-md border"
              style={{ borderColor: color + "30", background: color + "08" }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (layout === "scroll") {
    return (
      <div className="flex flex-col gap-1.5 p-3">
        <div className="h-14 rounded-md" style={{ background: color + "15" }} />
        <div className="h-8 rounded-md" style={{ background: color + "10" }} />
        <div className="h-8 rounded-md" style={{ background: color + "08" }} />
      </div>
    );
  }
  if (layout === "magazine") {
    return (
      <div className="grid grid-cols-3 gap-1.5 p-3">
        <div
          className="col-span-2 h-16 rounded-md"
          style={{ background: color + "15" }}
        />
        <div className="flex flex-col gap-1.5">
          <div
            className="h-[29px] rounded-md"
            style={{ background: color + "10" }}
          />
          <div
            className="h-[29px] rounded-md"
            style={{ background: color + "08" }}
          />
        </div>
        <div className="col-span-3 h-6 rounded-md" style={{ background: color + "06" }} />
      </div>
    );
  }
  /* infographic */
  return (
    <div className="flex flex-col gap-1.5 p-3">
      <div className="flex gap-1.5">
        <div
          className="w-10 h-10 rounded-full"
          style={{ background: color + "20" }}
        />
        <div className="flex-1 flex flex-col gap-1 justify-center">
          <div className="h-2 w-full rounded-full" style={{ background: color + "15" }} />
          <div className="h-2 w-3/4 rounded-full" style={{ background: color + "10" }} />
        </div>
      </div>
      <div className="flex gap-1 mt-1">
        {[60, 40, 80, 55].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{ height: `${h * 0.3}px`, background: color + (30 - i * 5).toString() }}
          />
        ))}
      </div>
    </div>
  );
}

function PledgeBookMockup() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] shadow-2xl overflow-hidden max-w-3xl mx-auto">
      {/* Mockup browser chrome */}
      <div className="flex items-center gap-2 px-5 py-3 bg-[#F8FAFC] border-b border-[var(--border-light)]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <div
          className="ml-4 flex-1 h-7 bg-white rounded-lg border border-[var(--border-light)] flex items-center px-3"
        >
          <span
            className="text-[11px] text-[var(--text-tertiary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            pledge.electai.kr/kim-candidate
          </span>
        </div>
      </div>

      {/* Candidate header */}
      <div className="bg-gradient-to-r from-[#0052FF] to-[#3B82F6] p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold shrink-0">
            K
          </div>
          <div>
            <p className="text-sm text-white/70 font-medium">서울특별시 OO구 기초의원 후보</p>
            <h3
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              김선거 후보의 공약집
            </h3>
            <p className="text-sm text-white/60 mt-1">
              &ldquo;함께 만드는 살기 좋은 OO구&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex border-b border-[var(--border-light)] overflow-x-auto">
        {pledgeCategories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(i)}
            className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors relative cursor-pointer ${
              activeCategory === i
                ? "text-[var(--primary)]"
                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {cat}
            {activeCategory === i && (
              <motion.div
                layoutId="pledge-tab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--primary)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Pledge cards */}
      <div className="p-5 space-y-4 bg-[#FAFBFD]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {pledgeCards.map((pledge, i) => (
              <motion.div
                key={pledge.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl border border-[var(--border-light)] p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-[15px] font-bold text-[var(--text-primary)]">
                    {pledge.title}
                  </h4>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary-50)] text-[var(--primary)] shrink-0"
                  >
                    {pledgeCategories[activeCategory]}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {pledge.desc}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)] mb-4">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-[var(--text-primary)]">예산</span>{" "}
                    {pledge.budget}
                  </span>
                  <span className="w-px h-3 bg-[var(--border)]" />
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-[var(--text-primary)]">기간</span>{" "}
                    {pledge.timeline}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[var(--text-tertiary)]">이행률</span>
                    <span className="font-semibold text-[var(--primary)]">선거 전</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--surface)]">
                    <div className="h-full rounded-full bg-[var(--primary)] w-0" />
                  </div>
                </div>
                {/* Like button */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--primary-50)] transition-colors text-sm cursor-pointer group">
                    <Heart className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors" />
                    <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors">
                      관심있어요
                    </span>
                    <span className="text-xs font-bold text-[var(--text-tertiary)]">
                      {pledge.likes.toLocaleString()}
                    </span>
                  </button>
                  <button className="text-xs font-medium text-[var(--primary)] hover:underline cursor-pointer">
                    자세히 보기
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Hero Visual: Tablet + Phone Mockup ─── */

function HeroVisual() {
  const barData = [
    { label: "교육", value: 35, color: "#0052FF" },
    { label: "복지", value: 25, color: "#7C3AED" },
    { label: "경제", value: 20, color: "#059669" },
    { label: "환경", value: 12, color: "#D97706" },
    { label: "교통", value: 8, color: "#E11D48" },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Tablet frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative bg-[#1A1A2E] rounded-[24px] p-3 shadow-2xl"
      >
        <div className="bg-white rounded-[16px] overflow-hidden">
          {/* Tablet header bar */}
          <div className="bg-gradient-to-r from-[#0052FF] to-[#3B82F6] px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30" />
              <div>
                <div className="h-2.5 w-24 bg-white/80 rounded-full" />
                <div className="h-2 w-16 bg-white/40 rounded-full mt-1.5" />
              </div>
            </div>
            {/* Category pills */}
            <div className="flex gap-2">
              {["교육", "복지", "경제", "환경"].map((cat, i) => (
                <div
                  key={cat}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                    i === 0
                      ? "bg-white text-[#0052FF]"
                      : "bg-white/15 text-white/70"
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Pledge cards preview */}
            <div className="space-y-3">
              {[
                { title: "무상 교복 지원 확대", budget: "12억원", pct: 78 },
                { title: "학교 돌봄교실 24시", budget: "28억원", pct: 45 },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border-light)]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[13px] font-bold text-[var(--text-primary)]">
                      {card.title}
                    </span>
                    <span className="text-[10px] font-semibold text-[var(--primary)] bg-[var(--primary-50)] px-2 py-0.5 rounded-full">
                      {card.budget}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--border-light)] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[var(--primary)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-[var(--text-tertiary)]">관심도</span>
                    <span className="text-[10px] font-bold text-[var(--primary)]">{card.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Budget pie chart mockup */}
            <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border-light)]">
              <p className="text-[12px] font-bold text-[var(--text-primary)] mb-3">예산 배분 현황</p>
              {/* Horizontal bar chart */}
              <div className="space-y-2.5">
                {barData.map((item, i) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[var(--text-secondary)] font-medium">{item.label}</span>
                      <span className="font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--border-light)] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 1 + i * 0.12,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Phone frame - overlapping bottom-right */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute -bottom-8 -right-4 md:right-4 w-[160px] md:w-[200px] bg-[#1A1A2E] rounded-[20px] p-2 shadow-2xl"
      >
        <div className="bg-white rounded-[14px] overflow-hidden">
          <div className="bg-gradient-to-b from-[#0052FF] to-[#3B82F6] p-3 text-center">
            <div className="w-8 h-8 rounded-full bg-white/20 mx-auto mb-1.5 border border-white/30" />
            <div className="h-2 w-12 bg-white/60 rounded-full mx-auto" />
          </div>
          <div className="p-2.5 space-y-2">
            {["교육", "복지", "경제"].map((cat, i) => (
              <div key={cat} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: ["#0052FF", "#7C3AED", "#059669"][i],
                  }}
                />
                <div className="flex-1 h-1.5 rounded-full bg-[var(--border-light)]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: ["#0052FF", "#7C3AED", "#059669"][i],
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${[75, 55, 40][i]}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 w-12 h-12 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center"
      >
        <BookOpen className="w-5 h-5 text-[#7C3AED]" />
      </motion.div>
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 -right-8 w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center"
      >
        <Share2 className="w-4 h-4 text-[var(--accent)]" />
      </motion.div>
    </div>
  );
}

/* ─── main page ─── */

export default function PledgeBookPage() {
  const [selectedSwatch, setSelectedSwatch] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ====== HERO ====== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-[#7C3AED] rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-[var(--primary)] rounded-full blur-[200px] opacity-[0.03]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE9FE] border border-[#7C3AED]/10 mb-8">
                <BookOpen className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-sm font-semibold text-[#7C3AED]">
                  인터랙티브 공약집
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                className="text-4xl md:text-6xl lg:text-[68px] font-extrabold leading-[1.08] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[var(--text-primary)]">공약집의 미래,</span>
                <br />
                <span
                  className="bg-gradient-to-r from-[#7C3AED] to-[#0052FF] bg-clip-text"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  인터랙티브 웹으로
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
                PDF 공약집은 그만. AI가 디자인한 인터랙티브 웹 공약집으로
                <br className="hidden md:block" />
                유권자 참여를 극대화하세요.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#live-preview"
                  className="group flex items-center gap-2.5 px-8 py-4 bg-[var(--primary)] text-white text-[16px] font-bold rounded-2xl hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-[var(--shadow-primary)] hover:scale-[1.02]"
                >
                  만들어보기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#templates"
                  className="flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--text-primary)] text-[16px] font-bold rounded-2xl border-2 border-[var(--border)] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-300"
                >
                  템플릿 미리보기
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <HeroVisual />
          </FadeIn>
        </div>
      </section>

      {/* ====== BEFORE / AFTER ====== */}
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

      {/* ====== TEMPLATE GALLERY ====== */}
      <section id="templates" className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE9FE] border border-[#7C3AED]/10 mb-6">
              <Layers className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-sm font-semibold text-[#7C3AED]">4가지 템플릿</span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              캠프에 맞는{" "}
              <span
                className="bg-gradient-to-r from-[#7C3AED] to-[#0052FF] bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                템플릿
              </span>
              을 선택하세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              캠프의 성격과 타깃 유권자에 맞는 최적의 디자인을 골라보세요.
              AI가 콘텐츠에 맞게 자동 커스터마이징합니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {templates.map((tpl, i) => (
              <FadeIn key={tpl.name} delay={i * 0.1}>
                <div className="group bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden hover:shadow-xl transition-all duration-400 hover:-translate-y-2 cursor-pointer">
                  {/* Preview area */}
                  <div
                    className="h-40 relative overflow-hidden"
                    style={{ background: tpl.accent }}
                  >
                    <div className="absolute inset-3 bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
                      <TemplatePreview layout={tpl.layout} color={tpl.color} />
                    </div>
                    <div
                      className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60"
                      style={{ background: tpl.color }}
                    />
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: tpl.color }}
                      />
                      <h3 className="text-[15px] font-bold text-[var(--text-primary)]">
                        {tpl.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--text-tertiary)]">{tpl.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[var(--primary)] group-hover:gap-2 transition-all">
                      미리보기
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== KEY FEATURES ====== */}
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

      {/* ====== LIVE PREVIEW MOCKUP ====== */}
      <section id="live-preview" className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Monitor className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">실시간 미리보기</span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              실제로 이렇게{" "}
              <span className="text-gradient-primary">보입니다</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              카테고리별 공약을 탐색하고, 관심 공약에 반응하고, 예산과 일정을 한눈에 파악할 수 있습니다.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <PledgeBookMockup />
          </FadeIn>

          {/* Device indicators */}
          <FadeIn delay={0.4} className="mt-10">
            <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-tertiary)]">
              {[
                { icon: Monitor, label: "데스크톱" },
                { icon: Tablet, label: "태블릿" },
                { icon: Smartphone, label: "모바일" },
              ].map((device) => (
                <div key={device.label} className="flex items-center gap-2">
                  <device.icon className="w-4 h-4" />
                  <span className="font-medium">{device.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== CUSTOMIZATION ====== */}
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

      {/* ====== METRICS ====== */}
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

      {/* ====== CTA ====== */}
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

      <Footer />
    </div>
  );
}

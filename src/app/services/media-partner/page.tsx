"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Newspaper,
  Palette,
  BarChart3,
  Code,
  Globe,
  PieChart,
  FileText,
  Paintbrush,
  Rocket,
  Activity,
  ArrowRight,
  ChevronRight,
  Zap,
  Eye,
  Copy,
  Check,
  ExternalLink,
  Users,
  Star,
  Shield,
  Building,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

/* ============================================================
   MOCK DATA
   ============================================================ */

interface MediaPartner {
  name: string;
  abbr: string;
  color: string;
  bgColor: string;
  tier: "Basic" | "Pro" | "Enterprise";
  readers: string;
  articles: number;
  region: string;
}

const mediaPartners: MediaPartner[] = [
  {
    name: "경기일보",
    abbr: "경기",
    color: "#1E40AF",
    bgColor: "bg-blue-100",
    tier: "Enterprise",
    readers: "180만",
    articles: 4200,
    region: "경기도",
  },
  {
    name: "부산일보",
    abbr: "부산",
    color: "#DC2626",
    bgColor: "bg-red-100",
    tier: "Pro",
    readers: "120만",
    articles: 3800,
    region: "부산",
  },
  {
    name: "매일경제",
    abbr: "매경",
    color: "#0B1222",
    bgColor: "bg-gray-100",
    tier: "Enterprise",
    readers: "350만",
    articles: 8500,
    region: "전국",
  },
  {
    name: "한국일보",
    abbr: "한국",
    color: "#2563EB",
    bgColor: "bg-blue-100",
    tier: "Pro",
    readers: "200만",
    articles: 5200,
    region: "전국",
  },
  {
    name: "강원일보",
    abbr: "강원",
    color: "#059669",
    bgColor: "bg-emerald-100",
    tier: "Basic",
    readers: "45만",
    articles: 1200,
    region: "강원도",
  },
  {
    name: "전남일보",
    abbr: "전남",
    color: "#7C3AED",
    bgColor: "bg-violet-100",
    tier: "Basic",
    readers: "38만",
    articles: 980,
    region: "전라남도",
  },
];

const partnerTiers = [
  {
    name: "Basic",
    price: "월 99만원",
    description: "소규모 지역 언론사에 적합",
    features: [
      "위젯 1개 제공",
      "기본 브랜드 커스터마이징",
      "월간 성과 리포트",
      "이메일 기술 지원",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "월 249만원",
    description: "중견 언론사를 위한 프리미엄 솔루션",
    features: [
      "위젯 3개 제공",
      "풀 브랜드 커스터마이징",
      "실시간 분석 대시보드",
      "전담 파트너 매니저",
      "API 접근 권한",
      "맞춤 질문 설계",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "맞춤 견적",
    description: "대형 언론사를 위한 엔터프라이즈 솔루션",
    features: [
      "무제한 위젯",
      "완전 화이트라벨",
      "맞춤 기능 개발",
      "SLA 99.9% 보장",
      "전용 인프라",
      "우선 기술 지원",
    ],
    highlight: false,
  },
];

const features = [
  {
    icon: Palette,
    title: "완전 화이트라벨",
    description:
      "로고, 컬러, 폰트를 언론사 브랜드에 맞게 완전히 커스터마이징합니다. 독자는 언론사 자체 서비스로 인식합니다.",
    color: "#EA580C",
    bg: "#FFF7ED",
  },
  {
    icon: Code,
    title: "간편 임베드",
    description:
      "iframe 한 줄로 기존 뉴스 기사에 즉시 삽입 가능합니다. 개발 리소스 없이 빠르게 배포합니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: BarChart3,
    title: "실시간 분석",
    description:
      "독자 참여율, 완료율, 인기 이슈를 실시간 대시보드에서 확인합니다. 콘텐츠 전략에 활용하세요.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: Globe,
    title: "네트워크 효과",
    description:
      "전국 언론사 파트너 네트워크를 통해 후보 데이터를 교차 검증하고 커버리지를 극대화합니다.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: PieChart,
    title: "독자 인사이트",
    description:
      "독자의 정책 성향 통계를 익명 집계하여 뉴스룸의 편집 방향 설정에 데이터를 제공합니다.",
    color: "#E11D48",
    bg: "#FFF1F2",
  },
  {
    icon: Shield,
    title: "엔터프라이즈 보안",
    description:
      "SOC2 인증, ISMS 기준을 충족하는 보안 인프라로 언론사와 독자 데이터를 안전하게 보호합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

const processSteps = [
  {
    step: "01",
    title: "파트너 등록",
    description:
      "언론사 정보와 브랜드 가이드라인을 등록하면 전담 매니저가 배정됩니다.",
  },
  {
    step: "02",
    title: "브랜드 설정",
    description:
      "로고, 컬러, 질문을 언론사 브랜드와 지역 이슈에 맞게 커스터마이징합니다.",
  },
  {
    step: "03",
    title: "위젯 배포",
    description:
      "임베드 코드 한 줄로 뉴스 사이트에 즉시 배포합니다. 모바일 최적화 완료.",
  },
  {
    step: "04",
    title: "분석 & 최적화",
    description:
      "실시간 대시보드로 성과를 모니터링하고 AI가 질문과 UX를 자동 최적화합니다.",
  },
];

const metricsData = [
  {
    value: "12+",
    label: "언론사 파트너",
    icon: Newspaper,
    description: "전국 주요 언론사 제휴",
  },
  {
    value: "900만",
    label: "독자 도달",
    icon: Users,
    description: "파트너 네트워크 총 독자",
  },
  {
    value: "99.9%",
    label: "가동률",
    icon: Activity,
    description: "SLA 기반 안정 운영",
  },
  {
    value: "4.8x",
    label: "참여율",
    icon: TrendingUp,
    description: "일반 기사 대비 체류 시간",
  },
];

/* ============================================================
   HELPER COMPONENTS
   ============================================================ */

function WidgetPreviewDemo() {
  const [selectedPartner, setSelectedPartner] = useState(0);
  const [questionCount, setQuestionCount] = useState(15);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const partner = mediaPartners[selectedPartner];

  const embedCode = `<!-- ${partner.name} × ElectAI 정책 매칭 위젯 -->
<iframe
  src="https://electai.kr/widget/${partner.abbr}?theme=${partner.color.slice(1)}&questions=${questionCount}"
  width="100%" height="600"
  frameborder="0"
  style="border-radius:16px; border:1px solid #E2E8F0;"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)] mb-3">
            파트너 선택
          </p>
          <div className="grid grid-cols-3 gap-2">
            {mediaPartners.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setSelectedPartner(i)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                  selectedPartner === i
                    ? "border-orange-400 bg-orange-50 shadow-sm"
                    : "border-[var(--border-light)] bg-white hover:border-orange-200"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: p.color }}
                >
                  {p.abbr[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                    {p.name}
                  </p>
                  <p className="text-[9px] text-[var(--text-tertiary)]">
                    {p.region}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-[var(--text-primary)]">
              질문 수
            </p>
            <span className="text-sm font-bold text-orange-600">
              {questionCount}개
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={20}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mt-1">
            <span>5개 (간편)</span>
            <span>20개 (상세)</span>
          </div>
        </div>

        <div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <Code className="w-4 h-4" />
            {showCode ? "임베드 코드 숨기기" : "임베드 코드 보기"}
          </button>
          <AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="relative mt-3">
                  <pre className="bg-[#0B1222] text-green-400 rounded-xl p-4 text-xs overflow-x-auto font-mono">
                    {embedCode}
                  </pre>
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/60" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-[var(--text-tertiary)]" />
          <p className="text-sm font-bold text-[var(--text-primary)]">
            라이브 미리보기
          </p>
        </div>
        <div className="border-2 border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPartner}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Widget header */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ backgroundColor: partner.color }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                    {partner.abbr[0]}
                  </div>
                  <span className="text-white font-bold text-sm">
                    {partner.name} × ElectAI
                  </span>
                </div>
                <span className="text-white/70 text-xs">
                  {questionCount}개 질문
                </span>
              </div>

              {/* Widget body */}
              <div className="bg-white p-5 space-y-4">
                <div className="text-center py-4">
                  <div
                    className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: partner.color + "15" }}
                  >
                    <Newspaper
                      className="w-6 h-6"
                      style={{ color: partner.color }}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    나의 후보 찾기
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {partner.region} 지역 이슈 {questionCount}개에
                    답하고
                    <br />
                    나와 가장 맞는 후보를 확인하세요
                  </p>
                </div>

                {/* Sample question card */}
                <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border-light)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: partner.color }}
                    >
                      Q1
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      교통
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    대중교통 무료 환승 구간을 확대해야 할까요?
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      className="flex-1 py-2 rounded-lg text-sm font-semibold text-white"
                      style={{ backgroundColor: partner.color }}
                    >
                      찬성
                    </button>
                    <button className="flex-1 py-2 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)]">
                      반대
                    </button>
                  </div>
                </div>

                <button
                  className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
                  style={{ backgroundColor: partner.color }}
                >
                  매칭 시작하기
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Widget footer */}
              <div className="bg-[var(--surface)] px-5 py-3 flex items-center justify-center gap-1.5 border-t border-[var(--border-light)]">
                <Zap className="w-3 h-3 text-[var(--text-tertiary)]" />
                <span className="text-[10px] text-[var(--text-tertiary)]">
                  Powered by ElectAI
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

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
                      href="/#contact"
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

        {/* Partnership Tiers */}
        <section className="py-24 lg:py-32 bg-[var(--surface)] relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-orange-600 tracking-wider uppercase mb-4">
                  Partnership Plans
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  언론사 규모에 맞는 플랜을 선택하세요
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {partnerTiers.map((tier, i) => (
                <FadeIn key={tier.name} delay={i * 0.06}>
                  <div
                    className={`relative bg-white rounded-2xl border p-7 transition-[transform,box-shadow,background-color] duration-200 ${
                      tier.highlight
                        ? "border-orange-400 shadow-xl shadow-orange-500/10 scale-105"
                        : "border-[var(--border-light)] hover:shadow-lg"
                    }`}
                  >
                    {tier.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        추천
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-[var(--text-tertiary)] mb-4">
                      {tier.description}
                    </p>
                    <div
                      className="text-3xl font-extrabold mb-6"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: tier.highlight ? "#EA580C" : "var(--text-primary)",
                      }}
                    >
                      {tier.price}
                    </div>
                    <div className="space-y-3 mb-6">
                      {tier.features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5">
                          <Check
                            className="w-4 h-4 shrink-0"
                            style={{
                              color: tier.highlight ? "#EA580C" : "#10B981",
                            }}
                          />
                          <span className="text-sm text-[var(--text-secondary)]">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/#contact"
                      className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                        tier.highlight
                          ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white hover:shadow-lg hover:shadow-orange-500/25"
                          : "bg-[var(--surface)] text-[var(--text-primary)] hover:bg-gray-100"
                      }`}
                    >
                      {tier.name === "Enterprise" ? "문의하기" : "시작하기"}
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
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
                  href="/#contact"
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

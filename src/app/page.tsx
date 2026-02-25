"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  Lightbulb,
  Radio,
  BookOpen,
  TrendingUp,
  Target,
  Users,
  Palette,
  BarChart3,
  Repeat2,
  Newspaper,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Globe,
  ChevronRight,
  Sparkles,
  Quote,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const services = [
  {
    id: "pledge-bot",
    icon: MessageSquare,
    name: "AI 공약 챗봇",
    tagline: "후보자 아바타가 직접 공약을 설명합니다",
    description: "AI가 후보자의 페르소나를 학습하여 유권자에게 공약을 자연스럽게 소개합니다. 실시간 대화형 인터페이스로 24시간 유권자와 소통하세요.",
    tag: "BEST",
    tagColor: "accent",
    metrics: "응답률 97%",
    href: "/services/pledge-bot",
    gradient: "from-blue-500 to-cyan-400",
    bgAccent: "bg-blue-50",
  },
  {
    id: "pledge-craft",
    icon: Lightbulb,
    name: "맞춤형 공약 개발",
    tagline: "데이터 기반 AI 공약 설계 엔진",
    description: "강남구 예산·인구·현안 데이터를 기반으로 3가지 대안을 생성하고, 5축 정량 평가와 대화형 정제를 거쳐 캠페인 레디 공약서를 완성합니다.",
    tag: "NEW",
    tagColor: "primary",
    metrics: "5축 정량 평가",
    href: "/services/pledge-craft",
    gradient: "from-amber-500 to-orange-400",
    bgAccent: "bg-amber-50",
  },
  {
    id: "slogan-craft",
    icon: Quote,
    name: "AI 슬로건 제작",
    tagline: "데이터 기반 캠페인 슬로건 전략 엔진",
    description: "유권자 심리 분석과 6축 정량 평가로 맞춤형 슬로건을 생성하고, 맥락별 변주와 전략 패키지로 캠페인 레디 결과물을 완성합니다.",
    tag: "NEW",
    tagColor: "primary",
    metrics: "6축 전략 평가",
    href: "/services/slogan-craft",
    gradient: "from-pink-500 to-rose-400",
    bgAccent: "bg-pink-50",
  },
  {
    id: "sentiment-radar",
    icon: Radio,
    name: "민심 레이더",
    tagline: "지역구 민심을 실시간으로 감지합니다",
    description: "SNS, 뉴스, 커뮤니티를 AI가 24시간 자동 크롤링하고 분석합니다. 일별·주별 민심 변화를 대시보드로 한눈에 파악하세요.",
    tag: "NEW",
    tagColor: "primary",
    metrics: "일 5만건 분석",
    href: "/services/sentiment-radar",
    gradient: "from-emerald-500 to-teal-400",
    bgAccent: "bg-emerald-50",
  },
  {
    id: "pledge-book",
    icon: BookOpen,
    name: "인터랙티브 공약집",
    tagline: "웹에서 바로 보는 디지털 공약집",
    description: "캠프별 맞춤 디자인의 인터랙티브 웹 공약집을 자동으로 생성합니다. 유권자 친화적 UX로 공약 전달력을 극대화합니다.",
    tag: "",
    tagColor: "",
    metrics: "제작시간 80%↓",
    href: "/services/pledge-book",
    gradient: "from-violet-500 to-purple-400",
    bgAccent: "bg-violet-50",
  },
  {
    id: "opinion-forecast",
    icon: TrendingUp,
    name: "여론 예측 AI",
    tagline: "AI가 여론의 흐름을 예측합니다",
    description: "빅데이터와 AI 예측 모델로 향후 여론 동향을 분석합니다. 선거 캠프의 전략 수립에 필수적인 데이터 인사이트를 제공합니다.",
    tag: "PRO",
    tagColor: "primary",
    metrics: "예측 정확도 89%",
    href: "/services/opinion-forecast",
    gradient: "from-amber-500 to-orange-400",
    bgAccent: "bg-amber-50",
  },
  {
    id: "camp-strategy",
    icon: Target,
    name: "캠프 전략 어드바이저",
    tagline: "AI가 선거 전략을 설계합니다",
    description: "과거 선거 데이터와 현재 여론을 종합 분석하여 맞춤형 선거 전략을 제안합니다. 지역구 특성에 최적화된 캠프 운영 전략을 수립합니다.",
    tag: "",
    tagColor: "",
    metrics: "전략 제안 120+",
    href: "/services/camp-strategy",
    gradient: "from-rose-500 to-pink-400",
    bgAccent: "bg-rose-50",
  },
  {
    id: "voter-insight",
    icon: Users,
    name: "유권자 인사이트",
    tagline: "유권자 세그먼트를 정밀 분석합니다",
    description: "연령별·지역별·관심사별 유권자 그룹을 AI가 세밀하게 분류하고 각 그룹에 최적화된 메시지 전략을 제안합니다.",
    tag: "",
    tagColor: "",
    metrics: "세그먼트 32개",
    href: "/services/voter-insight",
    gradient: "from-sky-500 to-blue-400",
    bgAccent: "bg-sky-50",
  },
  {
    id: "pr-studio",
    icon: Palette,
    name: "AI 홍보물 스튜디오",
    tagline: "선거 홍보물을 AI가 자동 생성합니다",
    description: "포스터, 카드뉴스, SNS 콘텐츠, 현수막 등 선거 홍보물을 AI가 자동으로 디자인하고 메시지를 최적화합니다.",
    tag: "NEW",
    tagColor: "primary",
    metrics: "생성속도 3초",
    href: "/services/pr-studio",
    gradient: "from-fuchsia-500 to-pink-400",
    bgAccent: "bg-fuchsia-50",
  },
  {
    id: "competitor-analysis",
    icon: BarChart3,
    name: "실시간 경쟁 분석",
    tagline: "경쟁 후보의 동향을 실시간 추적합니다",
    description: "경쟁 후보의 공약, 미디어 활동, 여론 반응을 실시간으로 모니터링하고 비교 분석 리포트를 자동 생성합니다.",
    tag: "",
    tagColor: "",
    metrics: "모니터링 24/7",
    href: "/services/competitor-analysis",
    gradient: "from-indigo-500 to-blue-400",
    bgAccent: "bg-indigo-50",
  },
  {
    id: "policy-match",
    icon: Repeat2,
    name: "정책 스와이프 매칭",
    tagline: "스와이프로 나의 후보를 찾아보세요",
    description:
      "Tinder 스타일의 카드 스와이프로 15개 지역 정책 이슈에 대한 입장을 표명하고, AI가 나와 가장 잘 맞는 후보를 찾아줍니다.",
    tag: "NEW",
    tagColor: "primary",
    metrics: "5분 매칭 완료",
    href: "/services/policy-match",
    gradient: "from-teal-500 to-cyan-400",
    bgAccent: "bg-teal-50",
  },
  {
    id: "media-partner",
    icon: Newspaper,
    name: "언론사 파트너 허브",
    tagline: "언론사 브랜드로 유권자에게 다가갑니다",
    description:
      "언론사 파트너에게 화이트라벨 정책 매칭 위젯을 제공합니다. 각 언론사의 브랜드로 커스터마이징된 위젯이 독자와 유권자를 연결합니다.",
    tag: "",
    tagColor: "",
    metrics: "12개 언론사 제휴",
    href: "/services/media-partner",
    gradient: "from-orange-500 to-amber-400",
    bgAccent: "bg-orange-50",
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
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] left-[8%] w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-400 opacity-10"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-8">
                <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-sm font-semibold text-[var(--primary)]">2026 지방선거 AI 전략 플랫폼</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-[var(--text-primary)]">선거 전략의</span>
                <br />
                <span className="text-gradient-primary">새로운 기준</span>
                <span className="text-[var(--text-primary)]">을</span>
                <br />
                <span className="text-[var(--text-primary)]">만듭니다</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
                AI가 분석하고, AI가 예측하고, AI가 소통합니다.
                <br className="hidden md:block" />
                8가지 핵심 AI 솔루션으로 2026 지방선거를 완벽하게 준비하세요.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#services"
                  className="group flex items-center gap-2.5 px-8 py-4 bg-[var(--primary)] text-white text-[16px] font-bold rounded-2xl hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-[var(--shadow-primary)] hover:scale-[1.02]"
                >
                  서비스 둘러보기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#contact"
                  className="flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--text-primary)] text-[16px] font-bold rounded-2xl border-2 border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
                >
                  무료 상담 신청
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex items-center justify-center gap-8 mt-12 text-sm text-[var(--text-tertiary)]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>선관위 가이드라인 준수</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>24시간 실시간 모니터링</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>전국 243개 지역구 지원</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Hero Visual */}
          <FadeIn delay={0.5} className="mt-20">
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
              <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-4 text-sm text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>ElectAI Dashboard</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {services.slice(0, 4).map((service, i) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="bg-white rounded-2xl p-5 border border-[var(--border-light)] hover:shadow-lg transition-all duration-300"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-3`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{service.name}</h4>
                      <p className="text-xs text-[var(--text-tertiary)]">{service.metrics}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== SERVICES ====== */}
      <section id="services" className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-50)] border border-[var(--primary)]/10 mb-6">
              <Zap className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">8가지 핵심 서비스</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              선거의 모든 순간을
              <br />
              <span className="text-gradient-primary">AI가 함께합니다</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              유권자 분석부터 공약 전달, 여론 예측까지. 선거 캠프에 필요한 모든 AI 솔루션을 하나의 플랫폼에서 경험하세요.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.08}>
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
                      자세히 보기
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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              이렇게 <span className="text-gradient-primary">활용</span>하세요
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              3단계로 시작하는 AI 선거 전략. 복잡한 설정 없이 바로 사용할 수 있습니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "캠프 등록", desc: "후보자 정보와 지역구를 등록하면 AI가 해당 지역의 데이터를 자동 수집하기 시작합니다.", icon: "📋" },
              { step: "02", title: "AI 분석 시작", desc: "민심, 여론, 경쟁 후보 데이터를 종합적으로 분석하여 맞춤 전략 리포트를 생성합니다.", icon: "🤖" },
              { step: "03", title: "전략 실행", desc: "AI 추천 전략을 기반으로 공약 챗봇, 홍보물, 공약집 등을 자동 제작하고 배포합니다.", icon: "🚀" },
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

      {/* ====== CTA ====== */}
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-[var(--primary)] to-[#0043CC] rounded-3xl p-12 md:p-20 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-grid opacity-5" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  지금 시작하세요
                </h2>
                <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
                  2026 지방선거까지 남은 시간은 한정되어 있습니다.
                  <br />
                  AI와 함께 한발 앞선 선거 전략을 수립하세요.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-8 py-4 bg-white text-[var(--primary)] text-[16px] font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer">
                    무료 체험 시작하기
                  </button>
                  <button className="px-8 py-4 bg-white/10 text-white text-[16px] font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    데모 예약하기
                  </button>
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

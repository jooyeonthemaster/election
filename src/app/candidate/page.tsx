"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Radio,
  TrendingUp,
  Users,
  BarChart3,
  ArrowRight,
  LogOut,
  Zap,
  Shield,
  Activity,
  MessageSquare,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface Session {
  id: string;
  role: string;
  name: string;
}

const candidateServices = [
  {
    id: "sentiment-radar",
    icon: Radio,
    name: "민심 레이더",
    tagline: "지역구 민심을 실시간으로 감지합니다",
    description: "네이버/카카오 뉴스, 블로그, 카페를 AI가 실시간 수집·분석하여 민심의 흐름을 대시보드로 보여줍니다.",
    metrics: "실시간 분석",
    href: "/services/sentiment-radar",
    gradient: "from-emerald-500 to-teal-400",
    bgAccent: "bg-emerald-50",
    status: "active",
  },
  {
    id: "opinion-forecast",
    icon: TrendingUp,
    name: "여론 예측 AI",
    tagline: "AI가 여론의 흐름을 예측합니다",
    description: "검색 트렌드와 뉴스 감성 데이터를 종합 분석하여 시나리오별 여론 예측 리포트를 생성합니다.",
    metrics: "시나리오 분석",
    href: "/services/opinion-forecast",
    gradient: "from-amber-500 to-orange-400",
    bgAccent: "bg-amber-50",
    status: "active",
  },
  {
    id: "voter-insight",
    icon: Users,
    name: "유권자 인사이트",
    tagline: "유권자 세그먼트를 정밀 분석합니다",
    description: "연령별·지역별·관심사별 유권자 그룹을 세밀하게 분류하고 맞춤형 메시지 전략을 제안합니다.",
    metrics: "32개 세그먼트",
    href: "/services/voter-insight",
    gradient: "from-sky-500 to-blue-400",
    bgAccent: "bg-sky-50",
    status: "ready",
  },
  {
    id: "competitor-analysis",
    icon: BarChart3,
    name: "실시간 경쟁 분석",
    tagline: "경쟁 후보의 동향을 실시간 추적합니다",
    description: "경쟁 후보의 공약, 미디어 활동, 여론 반응을 모니터링하고 비교 분석 리포트를 생성합니다.",
    metrics: "24/7 모니터링",
    href: "/services/competitor-analysis",
    gradient: "from-indigo-500 to-blue-400",
    bgAccent: "bg-indigo-50",
    status: "ready",
  },
];

export default function CandidateDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [voiceCount, setVoiceCount] = useState(0);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.session) setSession(data.session);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch("/api/resident-voice/list", { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setVoiceCount(data.stats?.total || 0))
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <div className="w-8 h-8 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Top Bar */}
      <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">
              <span className="text-[var(--text-primary)]">Elect</span>
              <span className="text-[var(--primary)]">AI</span>
            </span>
            <span className="text-xs font-medium text-white bg-blue-600 px-2 py-0.5 rounded-full ml-1">후보자</span>
          </Link>

          <div className="flex items-center gap-4">
            {session && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Shield className="w-4 h-4" />
                <span>{session.name}</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[var(--text-tertiary)] hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        {/* Welcome */}
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              후보자 분석 대시보드
            </h1>
            <p className="text-[var(--text-secondary)]">
              민심, 여론, 유권자 데이터를 한눈에 파악하세요.
            </p>
          </div>
        </FadeIn>

        {/* Quick Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "오늘 수집 뉴스", value: "-", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50", href: "" },
              { label: "민심 긍정률", value: "-", icon: Radio, color: "text-blue-600", bg: "bg-blue-50", href: "" },
              { label: "구민의 소리", value: voiceCount > 0 ? `${voiceCount}건` : "-", icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50", href: "/candidate/voices" },
              { label: "검색 트렌드", value: "-", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50", href: "" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                onClick={() => stat.href && router.push(stat.href)}
                className={`bg-white rounded-xl border border-[var(--border-light)] p-5 ${stat.href ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all" : ""}`}
              >
                <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Services */}
        <FadeIn delay={0.2}>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">분석 도구</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidateServices.map((service, i) => (
            <FadeIn key={service.id} delay={0.25 + i * 0.05}>
              <Link href={service.href} className="block">
                <div className="group bg-white rounded-xl border border-[var(--border-light)] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-[var(--text-primary)]">{service.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          service.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {service.status === "active" ? "LIVE" : "READY"}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-tertiary)] mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${service.bgAccent}`}>
                          {service.metrics}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                          열기 <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </main>
    </div>
  );
}

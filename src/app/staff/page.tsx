"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Lightbulb,
  Quote,
  Target,
  Palette,
  Newspaper,
  ArrowRight,
  LogOut,
  Zap,
  Users,
  FileText,
  PenTool,
  Megaphone,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface Session {
  id: string;
  role: string;
  name: string;
}

const staffServices = [
  {
    id: "pledge-craft",
    icon: Lightbulb,
    name: "맞춤형 공약 개발",
    tagline: "데이터 기반 AI 공약 설계 엔진",
    description: "강남구 데이터를 기반으로 3가지 공약 대안을 생성하고, 5축 정량 평가와 대화형 정제를 거쳐 공약서를 완성합니다.",
    metrics: "5축 정량 평가",
    href: "/services/pledge-craft",
    gradient: "from-amber-500 to-orange-400",
    bgAccent: "bg-amber-50",
    status: "active",
  },
  {
    id: "slogan-craft",
    icon: Quote,
    name: "AI 슬로건 제작",
    tagline: "데이터 기반 캠페인 슬로건 전략",
    description: "유권자 심리 분석과 6축 정량 평가로 맞춤형 슬로건을 생성하고, 전략 패키지를 완성합니다.",
    metrics: "6축 전략 평가",
    href: "/services/slogan-craft",
    gradient: "from-pink-500 to-rose-400",
    bgAccent: "bg-pink-50",
    status: "active",
  },
  {
    id: "camp-strategy",
    icon: Target,
    name: "캠프 전략 어드바이저",
    tagline: "AI가 선거 전략을 설계합니다",
    description: "과거 선거 데이터와 현재 여론을 종합 분석하여 맞춤형 캠프 운영 전략을 제안합니다.",
    metrics: "120+ 전략 제안",
    href: "/services/camp-strategy",
    gradient: "from-rose-500 to-pink-400",
    bgAccent: "bg-rose-50",
    status: "ready",
  },
  {
    id: "pr-studio",
    icon: Palette,
    name: "AI 홍보물 스튜디오",
    tagline: "선거 홍보물을 AI가 자동 생성합니다",
    description: "포스터, 카드뉴스, SNS 콘텐츠, 현수막 등 선거 홍보물을 자동으로 디자인합니다.",
    metrics: "500+ 템플릿",
    href: "/services/pr-studio",
    gradient: "from-fuchsia-500 to-pink-400",
    bgAccent: "bg-fuchsia-50",
    status: "ready",
  },
  {
    id: "media-partner",
    icon: Newspaper,
    name: "언론사 파트너 허브",
    tagline: "언론사 브랜드로 유권자에게 다가갑니다",
    description: "화이트라벨 정책 매칭 위젯을 언론사에 제공하여 독자와 유권자를 연결합니다.",
    metrics: "12개 언론사",
    href: "/services/media-partner",
    gradient: "from-orange-500 to-amber-400",
    bgAccent: "bg-orange-50",
    status: "ready",
  },
];

export default function StaffDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.session) setSession(data.session);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
            <span className="text-xs font-medium text-white bg-orange-500 px-2 py-0.5 rounded-full ml-1">선거팀</span>
          </Link>

          <div className="flex items-center gap-4">
            {session && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Users className="w-4 h-4" />
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
              선거팀 작업실
            </h1>
            <p className="text-[var(--text-secondary)]">
              공약 개발, 슬로건 제작, 홍보물 생성 등 캠프 운영에 필요한 도구를 사용하세요.
            </p>
          </div>
        </FadeIn>

        {/* Quick Actions */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "공약 생성", icon: FileText, color: "text-amber-600", bg: "bg-amber-50", href: "/services/pledge-craft" },
              { label: "슬로건 제작", icon: PenTool, color: "text-pink-600", bg: "bg-pink-50", href: "/services/slogan-craft" },
              { label: "홍보물 제작", icon: Palette, color: "text-fuchsia-600", bg: "bg-fuchsia-50", href: "/services/pr-studio" },
              { label: "전략 수립", icon: Megaphone, color: "text-rose-600", bg: "bg-rose-50", href: "/services/camp-strategy" },
            ].map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <Link href={action.href} className="block">
                  <div className="bg-white rounded-xl border border-[var(--border-light)] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center">
                    <div className={`w-10 h-10 ${action.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">{action.label}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Services */}
        <FadeIn delay={0.2}>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">작업 도구</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staffServices.map((service, i) => (
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Users,
  LogOut,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  Heart,
  Clock,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface Session {
  id: string;
  role: string;
  name: string;
}

interface Voice {
  id: string;
  category: string;
  neighborhood: string;
  summary: string;
  request: string;
  emotion: string;
  full_conversation: string | null;
  created_at: string;
}

interface VoiceStats {
  total: number;
  byCategory: Record<string, number>;
  byEmotion: Record<string, number>;
}

const emotionConfig: Record<string, { icon: typeof AlertTriangle; color: string; bg: string }> = {
  "불만": { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  "제안": { icon: Lightbulb, color: "text-blue-600", bg: "bg-blue-50" },
  "기대": { icon: Heart, color: "text-emerald-600", bg: "bg-emerald-50" },
  "긴급": { icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
};

export default function StaffVoicesPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [stats, setStats] = useState<VoiceStats>({ total: 0, byCategory: {}, byEmotion: {} });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("전체");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.session) setSession(data.session);
      })
      .catch(() => {});

    fetch("/api/resident-voice/list")
      .then((res) => res.json())
      .then((data) => {
        setVoices(data.voices || []);
        setStats(data.stats || { total: 0, byCategory: {}, byEmotion: {} });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const categories = ["전체", ...Object.keys(stats.byCategory).sort((a, b) => (stats.byCategory[b] || 0) - (stats.byCategory[a] || 0))];
  const filtered = filter === "전체" ? voices : voices.filter((v) => v.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <div className="w-8 h-8 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
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
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.push("/staff")}
              className="w-8 h-8 rounded-lg bg-white border border-[var(--border-light)] flex items-center justify-center hover:bg-[var(--surface)] transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-amber-500" />
                구민의 소리
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">주민들이 접수한 의견을 확인하세요</p>
            </div>
          </div>
        </FadeIn>

        {/* 통계 카드 */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="bg-white rounded-xl border border-[var(--border-light)] p-4">
              <p className="text-xs text-[var(--text-tertiary)] mb-1">총 접수</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.total}건</p>
            </div>
            {Object.entries(stats.byEmotion)
              .sort(([, a], [, b]) => b - a)
              .map(([emotion, count]) => {
                const config = emotionConfig[emotion] || emotionConfig["제안"];
                return (
                  <div key={emotion} className={`rounded-xl border border-[var(--border-light)] p-4 ${config.bg}`}>
                    <p className={`text-xs ${config.color} mb-1`}>{emotion}</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{count}건</p>
                  </div>
                );
              })}
          </div>
        </FadeIn>

        {/* 카테고리 필터 */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === cat
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-[var(--primary)]/30"
                }`}
              >
                {cat} {cat !== "전체" && stats.byCategory[cat] ? `(${stats.byCategory[cat]})` : ""}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* 목록 */}
        <div className="space-y-3">
          {filtered.map((voice, i) => {
            const config = emotionConfig[voice.emotion] || emotionConfig["제안"];
            const EmotionIcon = config.icon;
            return (
              <motion.div
                key={voice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                className={`bg-white rounded-xl border border-[var(--border-light)] overflow-hidden ${voice.full_conversation ? "cursor-pointer" : ""}`}
                onClick={() => voice.full_conversation && setExpandedId(expandedId === voice.id ? null : voice.id)}
              >
                <div className="p-4 flex items-start gap-3">
                  <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <EmotionIcon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-medium px-2 py-0.5 bg-[var(--surface)] rounded border border-[var(--border-light)]">
                        {voice.category}
                      </span>
                      <span className="text-xs text-[var(--text-tertiary)]">{voice.neighborhood}</span>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                        {voice.emotion}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-primary)] mb-1">{voice.summary}</p>
                    {voice.request && (
                      <p className="text-xs text-[var(--text-tertiary)]">요청: {voice.request}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[11px] text-[var(--text-tertiary)] pt-1">
                      {new Date(voice.created_at).toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {voice.full_conversation && (
                      <ChevronDown className={`w-4 h-4 text-[var(--text-tertiary)] transition-transform ${expandedId === voice.id ? "rotate-180" : ""}`} />
                    )}
                  </div>
                </div>

                {expandedId === voice.id && voice.full_conversation && (
                  <div className="border-t border-[var(--border-light)] bg-[#F7F9FC] px-4 py-3">
                    <p className="text-[10px] font-bold text-[var(--text-tertiary)] mb-2 uppercase tracking-wider">대화 원문</p>
                    <div className="space-y-1.5">
                      {voice.full_conversation.split("\n").filter(Boolean).map((line, j) => (
                        <p key={j} className={`text-xs leading-relaxed ${line.startsWith("[주민]") ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--text-tertiary)]">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>접수된 의견이 없습니다</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

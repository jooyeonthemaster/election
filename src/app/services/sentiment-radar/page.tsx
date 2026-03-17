"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Radio,
  ArrowLeft,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Newspaper,
  MessageCircle,
  Globe,
  BarChart3,
  Activity,
  AlertTriangle,
  Zap,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

interface SentimentData {
  analysisDate: string;
  totalArticles: number;
  overallSentiment: { positive: number; negative: number; neutral: number };
  summary: string;
  trendingKeywords: Array<{ text: string; score: number; sentiment: string; change: string }>;
  recentMentions: Array<{ source: string; text: string; sentiment: string; timeAgo: string }>;
  hotIssues: Array<{ title: string; description: string; sentimentScore: number; urgency: string }>;
  weeklyTrend: number[];
  channelBreakdown: Array<{ channel: string; count: number; sentiment: string }>;
}

const topics = [
  { label: "전체", value: "" },
  { label: "재건축", value: "재건축" },
  { label: "교통", value: "교통" },
  { label: "교육", value: "교육" },
  { label: "환경", value: "환경" },
  { label: "복지", value: "복지" },
  { label: "청년", value: "청년 주거" },
];

function SentimentBar({ positive, negative, neutral }: { positive: number; negative: number; neutral: number }) {
  return (
    <div className="w-full">
      <div className="flex h-4 rounded-full overflow-hidden bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${positive}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-emerald-500"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${neutral}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="bg-gray-400"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${negative}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="bg-red-500"
        />
      </div>
      <div className="flex justify-between mt-2 text-xs">
        <span className="text-emerald-600 font-medium">긍정 {positive}%</span>
        <span className="text-gray-500 font-medium">중립 {neutral}%</span>
        <span className="text-red-500 font-medium">부정 {negative}%</span>
      </div>
    </div>
  );
}

function MiniTrendChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div className="flex items-end gap-1.5 h-20">
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${((val - min) / range) * 60 + 16}px` }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`w-full rounded-t-md ${i === data.length - 1 ? "bg-[var(--primary)]" : "bg-[var(--primary)]/30"}`}
          />
          <span className="text-[10px] text-[var(--text-tertiary)]">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function SentimentRadarPage() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [data, setData] = useState<SentimentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/sentiment-radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic }),
      });

      if (!res.ok) throw new Error("분석 실패");

      const result = await res.json();
      setData(result);
    } catch {
      setError("민심 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <Link href="/candidate" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6">
              <ArrowLeft className="w-4 h-4" />
              후보자 대시보드
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)]">
                  민심 레이더
                </h1>
                <p className="text-[var(--text-secondary)]">실시간 뉴스/블로그/웹 데이터 기반 AI 민심 분석</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Analysis Controls */}
      <section className="py-8 border-b border-[var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.value}
                  onClick={() => setSelectedTopic(topic.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTopic === topic.value
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--primary-50)] hover:text-[var(--primary)]"
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {isLoading ? "분석 중..." : "분석 시작"}
            </button>
          </div>

          <p className="text-xs text-[var(--text-tertiary)] mt-3">
            <Zap className="w-3 h-3 inline mr-1" />
            네이버 뉴스/블로그 + 카카오 웹 실시간 수집 → Gemini AI 감성 분석
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
              {error}
            </div>
          )}

          {!data && !isLoading && !error && (
            <div className="text-center py-20">
              <Radio className="w-16 h-16 text-[var(--text-tertiary)] mx-auto mb-4 opacity-30" />
              <p className="text-[var(--text-tertiary)] text-lg">주제를 선택하고 &ldquo;분석 시작&rdquo;을 클릭하세요</p>
              <p className="text-[var(--text-tertiary)] text-sm mt-2">네이버/카카오에서 실시간 데이터를 수집하여 AI가 분석합니다</p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-20">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-emerald-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin" />
                <Radio className="absolute inset-0 m-auto w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-[var(--text-primary)] font-semibold text-lg">민심 분석 중...</p>
              <p className="text-[var(--text-tertiary)] text-sm mt-2">뉴스/블로그 수집 → AI 감성 분석 → 리포트 생성</p>
            </div>
          )}

          <AnimatePresence>
            {data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Summary Header */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-emerald-600 font-medium mb-1">AI 분석 리포트 (여론조사 아님)</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        분석일: {data.analysisDate} | 수집 데이터: {data.totalArticles}건
                      </p>
                    </div>
                    <button
                      onClick={handleAnalyze}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition"
                    >
                      <RefreshCw className="w-3 h-3" />
                      다시 분석
                    </button>
                  </div>
                  <p className="text-[var(--text-primary)] font-medium leading-relaxed">{data.summary}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Overall Sentiment */}
                  <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-500" />
                      전체 민심
                    </h3>
                    <SentimentBar
                      positive={data.overallSentiment.positive}
                      negative={data.overallSentiment.negative}
                      neutral={data.overallSentiment.neutral}
                    />
                  </div>

                  {/* Weekly Trend */}
                  <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[var(--primary)]" />
                      주간 관심도
                    </h3>
                    <MiniTrendChart data={data.weeklyTrend} />
                  </div>

                  {/* Channel Breakdown */}
                  <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      채널별 수집
                    </h3>
                    <div className="space-y-2">
                      {data.channelBreakdown?.map((ch, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-[var(--text-secondary)]">{ch.channel}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{ch.count}건</span>
                            <span className={`w-2 h-2 rounded-full ${
                              ch.sentiment === "positive" ? "bg-emerald-500" :
                              ch.sentiment === "negative" ? "bg-red-500" : "bg-gray-400"
                            }`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hot Issues & Keywords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hot Issues */}
                  <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      핫 이슈
                    </h3>
                    <div className="space-y-3">
                      {data.hotIssues?.map((issue, i) => (
                        <div key={i} className="p-3 bg-[var(--surface)] rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-[var(--text-primary)]">{issue.title}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              issue.urgency === "high" ? "bg-red-100 text-red-700" :
                              issue.urgency === "medium" ? "bg-amber-100 text-amber-700" :
                              "bg-gray-100 text-gray-600"
                            }`}>
                              {issue.urgency === "high" ? "긴급" : issue.urgency === "medium" ? "주의" : "관찰"}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-tertiary)]">{issue.description}</p>
                          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                issue.sentimentScore > 60 ? "bg-emerald-500" :
                                issue.sentimentScore > 40 ? "bg-amber-500" : "bg-red-500"
                              }`}
                              style={{ width: `${issue.sentimentScore}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trending Keywords */}
                  <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
                      트렌딩 키워드
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.trendingKeywords?.map((kw, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                            kw.sentiment === "positive" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                            kw.sentiment === "negative" ? "bg-red-50 text-red-700 border border-red-200" :
                            "bg-gray-50 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {kw.text}
                          <span className="text-[10px] opacity-60">{kw.change}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Mentions */}
                <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-gray-500" />
                    최근 주요 언급
                  </h3>
                  <div className="space-y-3">
                    {data.recentMentions?.map((mention, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-[var(--surface)] rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          mention.sentiment === "긍정" ? "bg-emerald-500" :
                          mention.sentiment === "부정" ? "bg-red-500" : "bg-gray-400"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[var(--text-primary)]">{mention.text}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[var(--text-tertiary)]">{mention.source}</span>
                            <span className="text-xs text-[var(--text-tertiary)]">{mention.timeAgo}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                          mention.sentiment === "긍정" ? "bg-emerald-100 text-emerald-700" :
                          mention.sentiment === "부정" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {mention.sentiment}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="text-center py-4">
                  <p className="text-xs text-[var(--text-tertiary)]">
                    본 분석은 AI가 공개 데이터를 기반으로 생성한 참고 자료이며, 공식 여론조사가 아닙니다.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}

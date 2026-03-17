"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  ArrowLeft,
  Search,
  BarChart3,
  Target,
  AlertTriangle,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Zap,
  Shield,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

interface ForecastData {
  scenario: string;
  analysisDate: string;
  prediction: {
    candidateA: { name: string; party: string; supportRate: number; change: string };
    candidateB: { name: string; party: string; supportRate: number; change: string };
    undecided: number;
  };
  winProbability: number;
  confidenceInterval: string;
  monthlyTrend: Array<{ month: string; candidateA: number; candidateB: number }>;
  keyFactors: Array<{ factor: string; impact: string; weight: number; description: string }>;
  scenarios: Array<{ name: string; probability: number; description: string }>;
  searchTrendSummary: string;
  strategicAdvice: string;
  riskFactors: string[];
  disclaimer: string;
}

const predefinedScenarios = [
  { label: "기본 시나리오", value: "기본 시나리오 - 현 상태 유지", icon: "📊" },
  { label: "핵심 공약 발표 후", value: "네안데르 후보가 강남구 재건축 촉진 핵심 공약을 발표한 상황", icon: "📢" },
  { label: "상대 후보 단일화", value: "야당 후보 단일화가 이루어진 상황", icon: "🤝" },
  { label: "재건축 이슈 부각", value: "은마아파트 재건축 지연 이슈가 크게 부각된 상황", icon: "🏗️" },
];

export default function OpinionForecastPage() {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [customScenario, setCustomScenario] = useState("");
  const [data, setData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForecast = async (scenario?: string) => {
    const sc = scenario || customScenario || "기본 시나리오";
    setSelectedScenario(sc);
    setIsLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/opinion-forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: sc }),
      });

      if (!res.ok) throw new Error("예측 실패");
      const result = await res.json();
      setData(result);
    } catch {
      setError("여론 예측 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <Link href="/candidate" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6">
              <ArrowLeft className="w-4 h-4" />
              후보자 대시보드
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)]">
                  여론 예측 AI
                </h1>
                <p className="text-[var(--text-secondary)]">검색 트렌드 + 뉴스 분석 기반 시나리오별 예측</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Scenario Selection */}
      <section className="py-8 border-b border-[var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">시나리오 선택</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {predefinedScenarios.map((sc) => (
              <button
                key={sc.value}
                onClick={() => handleForecast(sc.value)}
                disabled={isLoading}
                className={`p-4 rounded-xl border text-left transition-all hover:shadow-md disabled:opacity-50 ${
                  selectedScenario === sc.value
                    ? "border-amber-400 bg-amber-50"
                    : "border-[var(--border-light)] bg-white hover:border-amber-200"
                }`}
              >
                <span className="text-2xl mb-2 block">{sc.icon}</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">{sc.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customScenario}
              onChange={(e) => setCustomScenario(e.target.value)}
              placeholder="커스텀 시나리오를 직접 입력하세요..."
              className="flex-1 px-4 py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              onClick={() => handleForecast()}
              disabled={isLoading || !customScenario}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              예측
            </button>
          </div>

          <p className="text-xs text-[var(--text-tertiary)] mt-3">
            <Zap className="w-3 h-3 inline mr-1" />
            네이버 DataLab 검색 트렌드 + 뉴스 데이터 → Gemini AI 예측 분석
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">{error}</div>
          )}

          {!data && !isLoading && !error && (
            <div className="text-center py-20">
              <TrendingUp className="w-16 h-16 text-[var(--text-tertiary)] mx-auto mb-4 opacity-30" />
              <p className="text-[var(--text-tertiary)] text-lg">시나리오를 선택하면 AI가 여론을 예측합니다</p>
              <p className="text-[var(--text-tertiary)] text-sm mt-2">네이버 검색 트렌드와 최신 뉴스를 종합 분석합니다</p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-20">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-amber-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin" />
                <TrendingUp className="absolute inset-0 m-auto w-8 h-8 text-amber-500" />
              </div>
              <p className="text-[var(--text-primary)] font-semibold text-lg">여론 예측 분석 중...</p>
              <p className="text-[var(--text-tertiary)] text-sm mt-2">검색 트렌드 수집 → 뉴스 분석 → 시나리오 시뮬레이션</p>
            </div>
          )}

          <AnimatePresence>
            {data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Main Prediction */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-amber-600 font-medium mb-1">AI 예측 분석 (여론조사 아님)</p>
                      <p className="text-sm text-[var(--text-secondary)]">시나리오: {data.scenario} | {data.analysisDate}</p>
                    </div>
                    <button
                      onClick={() => handleForecast(selectedScenario)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-white rounded-lg border border-amber-200 hover:bg-amber-50 transition"
                    >
                      <RefreshCw className="w-3 h-3" />
                      다시 분석
                    </button>
                  </div>

                  {/* Support Rate Comparison */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 text-center">
                      <p className="text-xs text-blue-600 font-medium mb-1">{data.prediction.candidateA.party}</p>
                      <p className="text-2xl font-extrabold text-[var(--text-primary)]">{data.prediction.candidateA.supportRate}%</p>
                      <p className="text-sm font-medium text-[var(--text-secondary)]">{data.prediction.candidateA.name}</p>
                      <p className={`text-xs mt-1 ${data.prediction.candidateA.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                        {data.prediction.candidateA.change}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-5 text-center flex flex-col items-center justify-center">
                      <p className="text-xs text-[var(--text-tertiary)] mb-1">당선 확률</p>
                      <p className="text-3xl font-extrabold text-amber-600">{data.winProbability}%</p>
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">{data.confidenceInterval}</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 text-center">
                      <p className="text-xs text-red-600 font-medium mb-1">{data.prediction.candidateB.party}</p>
                      <p className="text-2xl font-extrabold text-[var(--text-primary)]">{data.prediction.candidateB.supportRate}%</p>
                      <p className="text-sm font-medium text-[var(--text-secondary)]">{data.prediction.candidateB.name}</p>
                      <p className={`text-xs mt-1 ${data.prediction.candidateB.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                        {data.prediction.candidateB.change}
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-sm text-[var(--text-tertiary)]">
                    부동층: <span className="font-bold text-[var(--text-primary)]">{data.prediction.undecided}%</span>
                  </p>
                </div>

                {/* Monthly Trend + Scenarios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-amber-500" />
                      월별 추이 예측
                    </h3>
                    <div className="space-y-3">
                      {data.monthlyTrend?.map((mt, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[var(--text-secondary)]">{mt.month}</span>
                            <div className="flex gap-3">
                              <span className="text-blue-600">{mt.candidateA}%</span>
                              <span className="text-red-500">{mt.candidateB}%</span>
                            </div>
                          </div>
                          <div className="flex gap-1 h-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${mt.candidateA}%` }}
                              transition={{ duration: 0.6, delay: i * 0.1 }}
                              className="bg-blue-500 rounded-l-full"
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${mt.candidateB}%` }}
                              transition={{ duration: 0.6, delay: i * 0.1 }}
                              className="bg-red-400 rounded-r-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[var(--primary)]" />
                      시나리오별 당선 확률
                    </h3>
                    <div className="space-y-3">
                      {data.scenarios?.map((sc, i) => (
                        <div key={i} className="p-3 bg-[var(--surface)] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{sc.name}</span>
                            <span className={`text-lg font-extrabold ${
                              sc.probability > 60 ? "text-emerald-600" :
                              sc.probability > 40 ? "text-amber-600" : "text-red-500"
                            }`}>
                              {sc.probability}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${sc.probability}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                              className={`h-full rounded-full ${
                                sc.probability > 60 ? "bg-emerald-500" :
                                sc.probability > 40 ? "bg-amber-500" : "bg-red-500"
                              }`}
                            />
                          </div>
                          <p className="text-xs text-[var(--text-tertiary)]">{sc.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Factors */}
                <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    핵심 영향 요인
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.keyFactors?.map((kf, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-[var(--surface)] rounded-lg">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          kf.impact === "positive" ? "bg-emerald-100" :
                          kf.impact === "negative" ? "bg-red-100" : "bg-gray-100"
                        }`}>
                          {kf.impact === "positive" ? (
                            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                          ) : kf.impact === "negative" ? (
                            <ArrowDownRight className="w-3 h-3 text-red-500" />
                          ) : (
                            <Minus className="w-3 h-3 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{kf.factor}</span>
                            <span className="text-[10px] text-[var(--text-tertiary)]">영향도 {kf.weight}/10</span>
                          </div>
                          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{kf.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Advice & Risks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
                    <h3 className="text-sm font-bold text-blue-800 mb-2">전략 조언</h3>
                    <p className="text-sm text-blue-700">{data.strategicAdvice}</p>
                    {data.searchTrendSummary && (
                      <p className="text-xs text-blue-600 mt-3 pt-3 border-t border-blue-200">
                        검색 트렌드: {data.searchTrendSummary}
                      </p>
                    )}
                  </div>
                  <div className="bg-red-50 rounded-xl border border-red-100 p-5">
                    <h3 className="text-sm font-bold text-red-800 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      리스크 요인
                    </h3>
                    <ul className="space-y-1.5">
                      {data.riskFactors?.map((risk, i) => (
                        <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 mt-1 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="text-center py-4">
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {data.disclaimer || "본 분석은 AI가 공개 데이터를 기반으로 생성한 참고 자료이며, 공식 여론조사가 아닙니다."}
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

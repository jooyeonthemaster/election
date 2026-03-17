"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  Code,
  ArrowRight,
  Zap,
  Eye,
  Copy,
  Check,
} from "lucide-react";
import { mediaPartners } from "../constants";

export default function WidgetPreviewDemo() {
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

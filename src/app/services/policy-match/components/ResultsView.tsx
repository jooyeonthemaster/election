"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { candidates } from "../constants";

function ConvictionRing({
  score,
  size = 48,
}: {
  score: number;
  size?: number;
}) {
  const color =
    score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";
  const circumference = 2 * Math.PI * 18;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="4"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (score / 100) * circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{
            strokeDashoffset:
              circumference - (score / 100) * circumference,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold" style={{ color }}>
          {score}
        </span>
      </div>
    </div>
  );
}

export { ConvictionRing };

export default function ResultsView({
  answers,
  onReset,
}: {
  answers: number[];
  onReset: () => void;
}) {
  const results = candidates
    .map((c) => {
      let match = 0;
      answers.forEach((a, i) => {
        if (a === c.positions[i]) match++;
      });
      return {
        ...c,
        matchPercent: Math.round((match / answers.length) * 100),
      };
    })
    .sort((a, b) => b.matchPercent - a.matchPercent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          나의 매칭 결과
        </h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-sm text-teal-600 font-semibold hover:text-teal-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          다시하기
        </button>
      </div>

      {results.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-4 bg-white rounded-2xl border border-[var(--border-light)] p-4"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: r.color }}>
            {r.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-[var(--text-primary)]">
                {r.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: r.color + "15", color: r.color }}>
                {r.party}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <motion.div
                className="h-2.5 rounded-full"
                style={{ backgroundColor: r.color }}
                initial={{ width: 0 }}
                animate={{ width: `${r.matchPercent}%` }}
                transition={{ duration: 0.4, delay: i * 0.05 + 0.15 }}
              />
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-lg font-extrabold" style={{ color: r.color }}>
              {r.matchPercent}%
            </span>
          </div>
          <ConvictionRing score={r.convictionScore} size={40} />
        </motion.div>
      ))}

      <div className="flex items-center gap-2 mt-3 px-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-200" />
          <span className="text-[10px] text-[var(--text-tertiary)]">매칭률 바</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border-2 border-green-500" />
          <span className="text-[10px] text-[var(--text-tertiary)]">신뢰도 점수</span>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function ScoreBar({ label, value }: { label: string; value: number }) {
  const color =
    value >= 80 ? "bg-emerald-500" : value >= 60 ? "bg-blue-500" : value >= 40 ? "bg-amber-500" : "bg-red-400";
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-[var(--text-secondary)] w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-[var(--surface)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-[11px] font-bold text-[var(--text-primary)] w-8 text-right">{value}</span>
    </div>
  );
}

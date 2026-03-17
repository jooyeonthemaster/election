"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, Bot, User, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Policy, RefineMessage } from "../types";

interface StepRefineChatProps {
  selectedPolicy: Policy;
  refineMessages: RefineMessage[];
  refineInput: string;
  setRefineInput: (v: string) => void;
  isRefining: boolean;
  isFinalizing: boolean;
  onSendRefine: (text: string) => void;
  onFinalize: () => void;
  refineContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function StepRefineChat({
  selectedPolicy,
  refineMessages,
  refineInput,
  setRefineInput,
  isRefining,
  isFinalizing,
  onSendRefine,
  onFinalize,
  refineContainerRef,
}: StepRefineChatProps) {
  return (
    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            공약을 함께 발전시켜요
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            &ldquo;{selectedPolicy.title}&rdquo; — 수정하거나 구체화하고 싶은 부분을 말씀하세요.
          </p>
        </div>
        <button
          onClick={onFinalize}
          disabled={isFinalizing}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-dark)] transition-all disabled:opacity-50"
        >
          {isFinalizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
          최종 완성
        </button>
      </div>

      {/* Chat area */}
      <div
        ref={refineContainerRef}
        className="h-[360px] overflow-y-auto rounded-2xl bg-[#F8FAFD] border border-[var(--border-light)] p-4 space-y-3 mb-3"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Initial context */}
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-3 h-3 text-white" />
          </div>
          <div className="bg-white border border-[var(--border-light)] rounded-2xl rounded-tl-md px-3.5 py-2.5 text-sm text-[var(--text-primary)] max-w-[85%]">
            <p className="font-semibold mb-1">{selectedPolicy.title}</p>
            <ul className="text-xs text-[var(--text-secondary)] space-y-1">
              {selectedPolicy.keyPoints.map((kp, i) => (
                <li key={i}>• {kp}</li>
              ))}
            </ul>
            <p className="text-xs text-[var(--text-tertiary)] mt-2">
              어떤 부분을 수정하거나 구체화할까요? 예산 조정, 일정 변경, 세부 사업 추가 등 자유롭게 요청하세요.
            </p>
          </div>
        </div>

        {refineMessages.map((m) => (
          <div key={m.id} className={`flex items-start gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            {m.role === "assistant" ? (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-white" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3 h-3 text-[var(--text-tertiary)]" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "assistant"
                  ? "bg-white border border-[var(--border-light)] rounded-2xl rounded-tl-md text-[var(--text-primary)]"
                  : "bg-[var(--primary)] text-white rounded-2xl rounded-tr-md"
              }`}
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <span className="whitespace-pre-wrap">{m.content}</span>
              )}
            </div>
          </div>
        ))}

        {isRefining && refineMessages[refineMessages.length - 1]?.content === "" && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center shrink-0">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <div className="bg-white border border-[var(--border-light)] rounded-2xl rounded-tl-md px-3.5 py-2.5 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-[var(--primary)] animate-spin" />
              <span className="text-xs text-[var(--text-tertiary)]">분석 중...</span>
            </div>
          </div>
        )}
      </div>

      {/* Refine input */}
      <div className="flex items-center gap-2">
        <input
          value={refineInput}
          onChange={(e) => setRefineInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSendRefine(refineInput); } }}
          placeholder="예산을 줄여줘, 1단계에 OO 사업을 추가해줘..."
          disabled={isRefining}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm outline-none focus:border-[var(--primary)]/40 focus:ring-2 focus:ring-[var(--primary)]/10 disabled:opacity-50"
        />
        <button
          onClick={() => onSendRefine(refineInput)}
          disabled={!refineInput.trim() || isRefining}
          className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary-dark)] transition-all disabled:opacity-40 shrink-0"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </motion.div>
  );
}

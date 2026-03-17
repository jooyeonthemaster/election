"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Send,
  Bot,
  User,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { SloganOption, RefineMessage } from "../types";
import { QUICK_REFINE } from "../constants";

interface StepRefineChatProps {
  selectedSlogan: SloganOption | null;
  refineMessages: RefineMessage[];
  refineInput: string;
  isRefining: boolean;
  isFinalizing: boolean;
  onSetRefineInput: (val: string) => void;
  onSendRefine: (text: string) => void;
  onFinalize: () => void;
}

export default function StepRefineChat({
  selectedSlogan,
  refineMessages,
  refineInput,
  isRefining,
  isFinalizing,
  onSetRefineInput,
  onSendRefine,
  onFinalize,
}: StepRefineChatProps) {
  const refineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refineContainerRef.current) {
      refineContainerRef.current.scrollTop = refineContainerRef.current.scrollHeight;
    }
  }, [refineMessages]);

  return (
    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            슬로건을 발전시키세요
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            &ldquo;{selectedSlogan?.mainSlogan}&rdquo;
          </p>
        </div>
        <button
          onClick={onFinalize}
          disabled={isFinalizing}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold hover:bg-pink-600 transition-all disabled:opacity-40"
        >
          {isFinalizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {isFinalizing ? "생성 중..." : "패키지 완성"}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {QUICK_REFINE.map((q) => (
          <button
            key={q}
            onClick={() => onSendRefine(q)}
            disabled={isRefining}
            className="px-3 py-1 rounded-full text-[10px] font-medium bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-200/50 transition-all disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div ref={refineContainerRef} className="h-[340px] overflow-y-auto rounded-2xl border border-[var(--border-light)] bg-[var(--surface)] p-4 space-y-3 mb-4">
        {refineMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquare className="w-8 h-8 text-[var(--text-tertiary)] mb-2" />
            <p className="text-sm text-[var(--text-tertiary)]">톤, 길이, 타겟, 차별화 등<br />조정하고 싶은 부분을 말씀하세요.</p>
          </div>
        )}
        {refineMessages.map((m) => (
          <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-pink-500 text-white rounded-br-md"
                : "bg-white border border-[var(--border-light)] text-[var(--text-primary)] rounded-bl-md"
            }`}>
              {m.role === "assistant" ? (
                <div className="prose prose-sm max-w-none [&>p]:m-0 [&>ul]:m-0 [&>ol]:m-0">
                  <ReactMarkdown>
                    {m.content || "..."}
                  </ReactMarkdown>
                </div>
              ) : m.content}
            </div>
            {m.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              </div>
            )}
          </div>
        ))}
        {isRefining && (
          <div className="flex items-center gap-2 px-4 py-2">
            <Loader2 className="w-3.5 h-3.5 text-pink-500 animate-spin" />
            <span className="text-xs text-[var(--text-tertiary)]">분석 중...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={refineInput}
          onChange={(e) => onSetRefineInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSendRefine(refineInput); } }}
          placeholder="수정 요청을 입력하세요..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/10"
          disabled={isRefining}
        />
        <button
          onClick={() => onSendRefine(refineInput)}
          disabled={isRefining || !refineInput.trim()}
          className="px-4 py-2.5 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-all disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

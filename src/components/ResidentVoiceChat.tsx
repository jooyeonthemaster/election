"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  Megaphone,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_TOPICS = [
  "우리 동네 교통이 너무 불편해요",
  "재건축 소음 때문에 힘들어요",
  "어린이 놀이터가 부족합니다",
  "노인 돌봄 서비스를 늘려주세요",
  "강남역 주변 치안이 걱정됩니다",
  "자유롭게 의견을 말씀해주세요",
];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function ResidentVoiceChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isNearBottomRef = useRef(true);

  const scrollContainerToBottom = useCallback((instant = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: instant ? "instant" : "smooth",
    });
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      isNearBottomRef.current = distanceFromBottom < 80;
      setShowScrollDown(distanceFromBottom > 200);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading || isStreaming) return;

    setHasStarted(true);
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = "auto";

    setTimeout(() => scrollContainerToBottom(), 50);

    try {
      const assistantId = generateId();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      const response = await fetch("/api/resident-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("API error");

      setIsLoading(false);
      setIsStreaming(true);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: accumulated } : m
                  )
                );
                if (isNearBottomRef.current) {
                  scrollContainerToBottom();
                }
              }
            } catch {
              // skip malformed JSON
            }
          }
        }
      }

      setIsStreaming(false);

      // Check for summary and store in localStorage
      if (accumulated.includes("---SUMMARY_START---")) {
        try {
          const summaryMatch = accumulated.match(/---SUMMARY_START---([\s\S]*?)---SUMMARY_END---/);
          if (summaryMatch) {
            const summaryText = summaryMatch[1].trim();
            const lines = summaryText.split("\n");
            const voice: Record<string, string> = { id: generateId(), timestamp: new Date().toISOString() };
            for (const line of lines) {
              const [key, ...vals] = line.split(":");
              if (key && vals.length) {
                const cleanKey = key.trim().replace(/[[\]]/g, "");
                voice[cleanKey] = vals.join(":").trim();
              }
            }
            const existing = JSON.parse(localStorage.getItem("resident-voices") || "[]");
            existing.push(voice);
            localStorage.setItem("resident-voices", JSON.stringify(existing));
          }
        } catch {
          // ignore localStorage errors
        }
      }
    } catch {
      setIsLoading(false);
      setIsStreaming(false);
      setMessages((prev) => [
        ...prev.filter((m) => m.content !== ""),
        {
          id: generateId(),
          role: "assistant",
          content: "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setHasStarted(false);
    setInput("");
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold">구민의 소리</h3>
            <p className="text-emerald-100 text-xs">주민 의견 접수 창구</p>
          </div>
        </div>
        {hasStarted && (
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs hover:bg-white/30 transition"
          >
            <RotateCcw className="w-3 h-3" />
            새 대화
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="h-[500px] overflow-y-auto p-4 space-y-4 relative"
      >
        {!hasStarted && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
              <Megaphone className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              무엇이든 말씀해주세요
            </h4>
            <p className="text-sm text-[var(--text-tertiary)] mb-6 max-w-sm">
              교통, 교육, 환경, 복지 등 강남구에 바라는 점을 자유롭게 이야기해주세요. 주민의 목소리를 후보에게 전달합니다.
            </p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-md">
              {SUGGESTED_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => sendMessage(topic)}
                  className="text-left px-3 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-700 hover:bg-emerald-100 transition"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === "user"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-emerald-100 text-emerald-600"
              }`}>
                {msg.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={`max-w-[75%] ${msg.role === "user" ? "text-right" : ""}`}>
                <div className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--primary)] text-white rounded-tr-md"
                    : "bg-[var(--surface)] text-[var(--text-primary)] rounded-tl-md"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>
                        {msg.content.replace(/---SUMMARY_START---[\s\S]*?---SUMMARY_END---/, "").trim() || (isStreaming ? "..." : "")}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                <p className={`text-[10px] text-[var(--text-tertiary)] mt-1 ${msg.role === "user" ? "text-right" : ""}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="bg-[var(--surface)] px-4 py-3 rounded-2xl rounded-tl-md">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {showScrollDown && (
          <button
            onClick={() => scrollContainerToBottom()}
            className="sticky bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center border border-[var(--border-light)] hover:shadow-xl transition"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[var(--border-light)] p-4">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={handleKeyDown}
            placeholder="의견이나 건의사항을 입력해주세요..."
            rows={1}
            className="flex-1 resize-none px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading || isStreaming}
            className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading || isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

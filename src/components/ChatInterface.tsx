"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  RotateCcw,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "강남구 교통 정체 해결 공약이 궁금합니다",
  "재건축은 언제 완료되나요?",
  "소각장 증설에 대한 입장은?",
  "청년 주거 지원 정책이 있나요?",
  "영동대로 지하공간 개발은 어떻게 진행되나요?",
  "AI 스마트 교통 시스템이 뭔가요?",
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

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isNearBottomRef = useRef(true);
  const prevMessageCountRef = useRef(0);

  // Only scrolls the chat container, never the page
  const scrollContainerToBottom = useCallback((instant = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: instant ? "instant" : "smooth",
    });
  }, []);

  // Auto-scroll: only when user is near bottom, and only on new messages (not every stream chunk)
  useEffect(() => {
    const count = messages.length;
    if (count > prevMessageCountRef.current) {
      // A new message was added — always scroll for that
      prevMessageCountRef.current = count;
      // Use instant for user messages, smooth for assistant
      const lastMsg = messages[count - 1];
      scrollContainerToBottom(lastMsg?.role === "user");
    }
  }, [messages.length, messages, scrollContainerToBottom]);

  // During streaming, scroll only if user is near the bottom (throttled)
  const streamScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!isStreaming || !isNearBottomRef.current) return;
    if (streamScrollTimerRef.current) return; // throttle active
    streamScrollTimerRef.current = setTimeout(() => {
      streamScrollTimerRef.current = null;
      if (isNearBottomRef.current) {
        const container = messagesContainerRef.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }
    }, 120);
    return () => {
      if (streamScrollTimerRef.current) {
        clearTimeout(streamScrollTimerRef.current);
        streamScrollTimerRef.current = null;
      }
    };
  }, [isStreaming, messages]);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    isNearBottomRef.current = distanceFromBottom < 80;
    setShowScrollDown(distanceFromBottom > 100);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    if (!hasStarted) setHasStarted(true);

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setIsStreaming(false);

    // Auto-resize textarea back
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    const assistantId = generateId();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      setIsStreaming(true);
      setMessages((prev) => [...prev, assistantMessage]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      if (reader) {
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
                  accumulatedText += parsed.text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: accumulatedText }
                        : m
                    )
                  );
                }
                if (parsed.error) {
                  accumulatedText = parsed.error;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: accumulatedText }
                        : m
                    )
                  );
                }
              } catch {
                // skip malformed JSON
              }
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== assistantId),
        {
          ...assistantMessage,
          content:
            "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setHasStarted(false);
    setInput("");
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  return (
    <div className="flex flex-col h-[680px] md:h-[720px] bg-white rounded-3xl border border-[var(--border-light)] shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="relative bg-gradient-to-r from-[var(--primary)] to-[#3378FF] px-5 md:px-6 py-4 shrink-0">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-[15px] tracking-tight">
                네안데르 후보 AI 정책비서
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-white/60 text-xs">
                  서울 강남구청장 후보 &middot; 온라인
                </span>
              </div>
            </div>
          </div>

          {hasStarted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium transition-all duration-200 border border-white/10"
              title="새 대화 시작"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              새 대화
            </motion.button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-1 bg-[#F8FAFD] relative"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--border) transparent",
        }}
      >
        {!hasStarted ? (
          /* Welcome Screen */
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center mx-auto shadow-lg shadow-[var(--primary)]/20">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-xl font-bold text-[var(--text-primary)] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              강남구 정책이 궁금하신가요?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-sm text-[var(--text-secondary)] mb-8 max-w-sm leading-relaxed"
            >
              네안데르 후보의 AI 정책비서가 강남구 발전을 위한
              <br />
              비전과 공약을 상세히 안내해드립니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg"
            >
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
                  onClick={() => sendMessage(q)}
                  className="group text-left px-4 py-3 rounded-xl bg-white border border-[var(--border-light)] hover:border-[var(--primary)]/30 hover:shadow-md hover:shadow-[var(--primary)]/5 transition-all duration-200 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)]"
                >
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-3.5 h-3.5 mt-0.5 text-[var(--primary)]/40 group-hover:text-[var(--primary)] transition-colors shrink-0" />
                    <span className="leading-snug">{q}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        ) : (
          /* Chat Messages */
          <>
            {/* Date divider */}
            <div className="flex justify-center mb-4">
              <span className="text-[11px] text-[var(--text-tertiary)] bg-white px-3 py-1 rounded-full border border-[var(--border-light)] shadow-sm">
                {new Date().toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 mb-4 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  {message.role === "assistant" ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[82%] ${
                      message.role === "user" ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-3 text-[14px] leading-relaxed ${
                        message.role === "assistant"
                          ? "bg-white border border-[var(--border-light)] text-[var(--text-primary)] rounded-2xl rounded-tl-md shadow-sm"
                          : "bg-[var(--primary)] text-white rounded-2xl rounded-tr-md shadow-sm shadow-[var(--primary)]/20"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-strong:text-[var(--text-primary)] prose-headings:text-[var(--text-primary)] prose-headings:mt-3 prose-headings:mb-1.5 prose-headings:text-base">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                          {isStreaming &&
                            message.id ===
                              messages[messages.length - 1]?.id && (
                              <span className="inline-block w-1.5 h-4 bg-[var(--primary)] ml-0.5 animate-pulse rounded-sm" />
                            )}
                        </div>
                      ) : (
                        <span className="whitespace-pre-wrap">
                          {message.content}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[10px] text-[var(--text-tertiary)] mt-1 px-1 ${
                        message.role === "user" ? "text-right" : ""
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && !isStreaming && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 mb-4"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl rounded-tl-md border border-[var(--border-light)] shadow-sm">
                  <Loader2 className="w-4 h-4 text-[var(--primary)] animate-spin" />
                  <span className="text-xs text-[var(--text-tertiary)]">
                    답변을 생성하고 있습니다...
                  </span>
                </div>
              </motion.div>
            )}

            <div />
          </>
        )}

        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollDown && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollContainerToBottom()}
              className="sticky bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[var(--border)] shadow-lg flex items-center justify-center hover:bg-[var(--surface)] transition-colors z-10"
            >
              <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Suggested chips when conversation started */}
      {hasStarted && messages.length >= 2 && !isLoading && (
        <div className="px-4 md:px-6 py-2 bg-white border-t border-[var(--border-light)] shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["교육 정책", "교통 개선", "환경 공약", "청년 지원"].map(
              (chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(`${chip}에 대해 자세히 알려주세요`)}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-[var(--primary-50)] text-[var(--primary)] text-xs font-medium hover:bg-[var(--primary)]/10 transition-colors border border-[var(--primary)]/10"
                >
                  {chip}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="px-4 md:px-6 py-3 md:py-4 bg-white border-t border-[var(--border-light)] shrink-0"
      >
        <div className="flex items-end gap-2.5">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder="강남구 정책에 대해 궁금한 점을 물어보세요..."
              disabled={isLoading}
              rows={1}
              className="w-full resize-none bg-[var(--surface)] rounded-xl px-4 py-3 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] border border-[var(--border-light)] focus:border-[var(--primary)]/40 focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all duration-200 disabled:opacity-50"
              style={{ maxHeight: "120px" }}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary-dark)] transition-all duration-200 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:shadow-[var(--primary)]/20 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
        <p className="text-[10px] text-[var(--text-tertiary)] mt-2 text-center">
          AI 정책비서의 답변은 참고용이며, 정확한 공약은 공식 홈페이지를
          확인해주세요.
        </p>
      </form>
    </div>
  );
}

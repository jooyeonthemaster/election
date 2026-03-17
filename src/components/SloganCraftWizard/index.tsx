"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
} from "lucide-react";
import type { SloganOption, FinalPackage, RefineMessage } from "./types";
import { STEP_NAMES, genId } from "./constants";
import StepContextInput from "./components/StepContextInput";
import StepSloganCompare from "./components/StepSloganCompare";
import StepRefineChat from "./components/StepRefineChat";
import StepFinalPackage from "./components/StepFinalPackage";

export default function SloganCraftWizard() {
  const [step, setStep] = useState(0);
  const [targets, setTargets] = useState<string[]>([]);
  const [tone, setTone] = useState("");
  const [purposes, setPurposes] = useState<string[]>([]);
  const [keywords, setKeywords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [strategicContext, setStrategicContext] = useState("");
  const [slogans, setSlogans] = useState<SloganOption[]>([]);
  const [selectedSlogan, setSelectedSlogan] = useState<SloganOption | null>(null);

  const [refineMessages, setRefineMessages] = useState<RefineMessage[]>([]);
  const [refineInput, setRefineInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  const [finalPackage, setFinalPackage] = useState<FinalPackage | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleTarget = (t: string) => {
    setTargets((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const togglePurpose = (p: string) => {
    setPurposes((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const canProceed = () => {
    if (step === 0) return targets.length > 0 && !!tone && purposes.length > 0;
    if (step === 1) return !!selectedSlogan;
    return true;
  };

  /* ---- API calls ---- */
  const generateSlogans = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/slogan-craft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "generate", targets, tone, purposes, keywords }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStrategicContext(data.strategicContext || "");
      setSlogans(data.slogans || []);
      setStep(1);
    } catch {
      alert("슬로건 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  const sendRefine = async (text: string) => {
    if (!text.trim() || isRefining || !selectedSlogan) return;
    const userMsg: RefineMessage = { id: genId(), role: "user", content: text.trim() };
    const newMessages = [...refineMessages, userMsg];
    setRefineMessages(newMessages);
    setRefineInput("");
    setIsRefining(true);

    const assistantId = genId();
    setRefineMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/slogan-craft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "refine",
          slogan: selectedSlogan,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const payload = line.slice(6);
            if (payload === "[DONE]") break;
            try {
              const parsed = JSON.parse(payload);
              if (parsed.text) {
                acc += parsed.text;
                setRefineMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
                );
              }
            } catch { /* skip */ }
          }
        }
      }
    } catch {
      setRefineMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: "오류가 발생했습니다. 다시 시도해주세요." } : m))
      );
    } finally {
      setIsRefining(false);
    }
  };

  const finalize = async () => {
    if (!selectedSlogan) return;
    setIsFinalizing(true);
    try {
      const res = await fetch("/api/slogan-craft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "finalize",
          slogan: selectedSlogan,
          refinements: refineMessages.filter((m) => m.role === "assistant").map((m) => m.content),
          targets,
          tone,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setFinalPackage(data);
      setStep(3);
    } catch {
      alert("최종 패키지 생성에 실패했습니다.");
    } finally {
      setIsFinalizing(false);
    }
  };

  const copyToClipboard = useCallback(() => {
    if (!finalPackage) return;
    const text = `[슬로건 전략 패키지]\n\n메인 슬로건: ${finalPackage.mainSlogan}\n${finalPackage.tagline ? `부슬로건: ${finalPackage.tagline}\n` : ""}\n전략: ${finalPackage.strategicRationale.positioning}\n차별화: ${finalPackage.strategicRationale.competitiveDiff}\n\n맥락별 변주:\n${finalPackage.variations.map((v) => `- ${v.context}: ${v.slogan}`).join("\n")}\n\n활용 가이드:\nDO: ${finalPackage.applicationGuide.dos.join(", ")}\nDON'T: ${finalPackage.applicationGuide.donts.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [finalPackage]);

  const reset = () => {
    setStep(0);
    setTargets([]);
    setTone("");
    setPurposes([]);
    setKeywords("");
    setSlogans([]);
    setSelectedSlogan(null);
    setRefineMessages([]);
    setFinalPackage(null);
    setStrategicContext("");
  };

  /* ================================================
     RENDER
     ================================================ */
  return (
    <div className="bg-white rounded-3xl border border-[var(--border-light)] shadow-2xl overflow-hidden">
      {/* Progress Bar */}
      <div className="px-6 pt-6 pb-4 border-b border-[var(--border-light)]">
        <div className="flex items-center justify-between mb-3">
          {STEP_NAMES.map((name, i) => (
            <div key={name} className="flex items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < step
                    ? "bg-pink-500 text-white"
                    : i === step
                    ? "bg-pink-500 text-white ring-4 ring-pink-500/20"
                    : "bg-[var(--surface)] text-[var(--text-tertiary)] border border-[var(--border)]"
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${i <= step ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>
                {name}
              </span>
              {i < 3 && <ChevronRight className="w-3.5 h-3.5 text-[var(--text-tertiary)] mx-1 hidden sm:inline" />}
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / 4) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 min-h-[520px]">
        <AnimatePresence mode="wait">
          {/* STEP 0: Strategy Setup (including loading state) */}
          {(step === 0 || isGenerating) && (
            <StepContextInput
              targets={targets}
              tone={tone}
              purposes={purposes}
              keywords={keywords}
              isGenerating={isGenerating}
              onToggleTarget={toggleTarget}
              onSetTone={setTone}
              onTogglePurpose={togglePurpose}
              onSetKeywords={setKeywords}
            />
          )}

          {/* STEP 1: Generated Slogans */}
          {step === 1 && !isGenerating && (
            <StepSloganCompare
              slogans={slogans}
              strategicContext={strategicContext}
              selectedSlogan={selectedSlogan}
              onSelectSlogan={setSelectedSlogan}
            />
          )}

          {/* STEP 2: Refine */}
          {step === 2 && (
            <StepRefineChat
              selectedSlogan={selectedSlogan}
              refineMessages={refineMessages}
              refineInput={refineInput}
              isRefining={isRefining}
              isFinalizing={isFinalizing}
              onSetRefineInput={setRefineInput}
              onSendRefine={sendRefine}
              onFinalize={finalize}
            />
          )}

          {/* STEP 3: Final Package */}
          {step === 3 && finalPackage && (
            <StepFinalPackage
              finalPackage={finalPackage}
              copied={copied}
              onCopyToClipboard={copyToClipboard}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {!isGenerating && !isFinalizing && (
        <div className="px-6 md:px-8 py-4 border-t border-[var(--border-light)] flex items-center justify-between">
          <button
            onClick={() => { if (step > 0 && step < 3) setStep(step - 1); else if (step === 3) reset(); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              step === 0
                ? "opacity-0 pointer-events-none"
                : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-pink-50 border border-[var(--border-light)]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 3 ? "처음부터" : "이전"}
          </button>

          {step === 0 && (
            <button
              onClick={generateSlogans}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-bold hover:bg-pink-600 transition-all disabled:opacity-40 shadow-sm hover:shadow-md hover:shadow-pink-500/20"
            >
              슬로건 생성하기
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              disabled={!selectedSlogan}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-bold hover:bg-pink-600 transition-all disabled:opacity-40 shadow-sm"
            >
              이 슬로건 발전시키기
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 2 && <div />}
          {step === 3 && <div />}
        </div>
      )}
    </div>
  );
}

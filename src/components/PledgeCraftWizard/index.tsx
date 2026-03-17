"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  ChevronRight,
} from "lucide-react";
import type { Policy, FinalPolicy, RefineMessage } from "./types";
import { STEP_NAMES, genId } from "./constants";
import StepTopicSelect from "./components/StepTopicSelect";
import StepPolicyCompare from "./components/StepPolicyCompare";
import StepRefineChat from "./components/StepRefineChat";
import StepFinalResult from "./components/StepFinalResult";
import AnalysisLoader from "./components/AnalysisLoader";

export default function PledgeCraftWizard() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [targets, setTargets] = useState<string[]>([]);
  const [priority, setPriority] = useState("");
  const [concern, setConcern] = useState("");
  const [budgetScale, setBudgetScale] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [situation, setSituation] = useState("");
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const [refineMessages, setRefineMessages] = useState<RefineMessage[]>([]);
  const [refineInput, setRefineInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  const [finalPolicy, setFinalPolicy] = useState<FinalPolicy | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [infoTarget, setInfoTarget] = useState<string | null>(null);

  const refineContainerRef = useRef<HTMLDivElement>(null);

  const toggleTarget = (t: string) => {
    setTargets((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const canProceed = () => {
    if (step === 0) return !!category;
    if (step === 1) return targets.length > 0 && !!priority && !!budgetScale;
    if (step === 2) return !!selectedPolicy;
    return true;
  };

  /* ---- API calls ---- */
  const generatePolicies = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/pledge-craft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "generate", category, targets, priority, concern, budgetScale }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSituation(data.situation || "");
      setPolicies(data.policies || []);
      setStep(2);
    } catch {
      alert("공약 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  const sendRefine = async (text: string) => {
    if (!text.trim() || isRefining || !selectedPolicy) return;
    const userMsg: RefineMessage = { id: genId(), role: "user", content: text.trim() };
    const newMessages = [...refineMessages, userMsg];
    setRefineMessages(newMessages);
    setRefineInput("");
    setIsRefining(true);

    const assistantId = genId();
    setRefineMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/pledge-craft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "refine",
          policy: selectedPolicy,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (line.startsWith("data: ")) {
              const d = line.slice(6);
              if (d === "[DONE]") break;
              try {
                const p = JSON.parse(d);
                if (p.text) {
                  acc += p.text;
                  setRefineMessages((prev) =>
                    prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
                  );
                }
              } catch { /* skip */ }
            }
          }
        }
      }
    } catch {
      setRefineMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: "오류가 발생했습니다. 다시 시도해주세요." } : m))
      );
    } finally {
      setIsRefining(false);
      setTimeout(() => {
        refineContainerRef.current?.scrollTo({ top: refineContainerRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    }
  };

  const finalize = async () => {
    if (!selectedPolicy) return;
    setIsFinalizing(true);
    try {
      const refinements = refineMessages.filter((m) => m.role === "assistant").map((m) => m.content);
      const res = await fetch("/api/pledge-craft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "finalize",
          policy: selectedPolicy,
          refinements,
          category,
          targets,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setFinalPolicy(data);
      setStep(4);
    } catch {
      alert("최종 공약서 생성에 실패했습니다.");
    } finally {
      setIsFinalizing(false);
    }
  };

  const copyFinal = useCallback(() => {
    if (!finalPolicy) return;
    const text = `[${finalPolicy.title}]\n슬로건: ${finalPolicy.slogan}\n\n■ 배경\n${finalPolicy.background}\n\n■ 목표\n${finalPolicy.objective}\n\n■ 실행 계획\n${finalPolicy.plans.map((p) => `${p.phase}: ${p.content} (${p.budget})`).join("\n")}\n\n■ 총 예산: ${finalPolicy.totalBudget}\n\n■ 기대 효과\n${finalPolicy.expectedEffects.map((e) => `- ${e}`).join("\n")}\n\n■ 핵심 타겟: ${finalPolicy.targetVoters}\n■ 차별점: ${finalPolicy.differentiator}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [finalPolicy]);

  const reset = () => {
    setStep(0);
    setCategory("");
    setTargets([]);
    setPriority("");
    setConcern("");
    setBudgetScale("");
    setPolicies([]);
    setSelectedPolicy(null);
    setRefineMessages([]);
    setFinalPolicy(null);
    setSituation("");
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
                    ? "bg-[var(--primary)] text-white"
                    : i === step
                    ? "bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/20"
                    : "bg-[var(--surface)] text-[var(--text-tertiary)] border border-[var(--border)]"
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  i <= step ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"
                }`}
              >
                {name}
              </span>
              {i < 4 && <ChevronRight className="w-3.5 h-3.5 text-[var(--text-tertiary)] mx-1 hidden sm:inline" />}
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[#3378FF] rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / 5) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 min-h-[520px]">
        <AnimatePresence mode="wait">
          {/* Steps 0 & 1: Topic/Target selection */}
          {(step === 0 || (step === 1 && !isGenerating)) && (
            <StepTopicSelect
              step={step}
              category={category}
              setCategory={setCategory}
              targets={targets}
              toggleTarget={toggleTarget}
              priority={priority}
              setPriority={setPriority}
              budgetScale={budgetScale}
              setBudgetScale={setBudgetScale}
              concern={concern}
              setConcern={setConcern}
              infoTarget={infoTarget}
              setInfoTarget={setInfoTarget}
            />
          )}

          {/* Loading: Analysis Screen */}
          {isGenerating && (
            <AnalysisLoader category={category} targets={targets} />
          )}

          {/* Step 2: Generated Policies */}
          {step === 2 && !isGenerating && (
            <StepPolicyCompare
              situation={situation}
              policies={policies}
              selectedPolicy={selectedPolicy}
              setSelectedPolicy={setSelectedPolicy}
            />
          )}

          {/* Step 3: Refine */}
          {step === 3 && selectedPolicy && (
            <StepRefineChat
              selectedPolicy={selectedPolicy}
              refineMessages={refineMessages}
              refineInput={refineInput}
              setRefineInput={setRefineInput}
              isRefining={isRefining}
              isFinalizing={isFinalizing}
              onSendRefine={sendRefine}
              onFinalize={finalize}
              refineContainerRef={refineContainerRef}
            />
          )}

          {/* Step 4: Final */}
          {step === 4 && finalPolicy && (
            <StepFinalResult
              finalPolicy={finalPolicy}
              copied={copied}
              onCopyFinal={copyFinal}
              onReset={reset}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {!isGenerating && !isFinalizing && (
      <div className="px-6 md:px-8 py-4 border-t border-[var(--border-light)] flex items-center justify-between">
        <button
          onClick={() => { if (step > 0 && step < 4) setStep(step - 1); else if (step === 4) reset(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            step === 0
              ? "opacity-0 pointer-events-none"
              : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--primary-50)] border border-[var(--border-light)]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 4 ? "처음부터" : "이전"}
        </button>

        {step < 2 && (
          <button
            onClick={() => {
              if (step === 1) generatePolicies();
              else setStep(step + 1);
            }}
            disabled={!canProceed() || isGenerating}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-bold hover:bg-[var(--primary-dark)] transition-all disabled:opacity-40 shadow-sm hover:shadow-md hover:shadow-[var(--primary)]/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                AI 분석 중...
              </>
            ) : (
              <>
                {step === 1 ? "공약 생성하기" : "다음"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}

        {step === 2 && (
          <button
            onClick={() => setStep(3)}
            disabled={!selectedPolicy}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-bold hover:bg-[var(--primary-dark)] transition-all disabled:opacity-40 shadow-sm"
          >
            이 공약 발전시키기
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {step === 3 && <div />}
        {step === 4 && <div />}
      </div>
      )}
    </div>
  );
}

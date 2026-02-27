"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Send,
  Bot,
  User,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Search,
  X,
  Users,
  TrendingUp,
  Target,
  Vote,
  Database,
  BarChart3,
  Brain,
  Zap,
  AlertTriangle,
  Quote,
  Shield,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

/* ================================================
   TYPES
   ================================================ */
interface SloganScores {
  memorability: number;
  voterResonance: number;
  differentiation: number;
  authenticity: number;
  versatility: number;
  legalSafety: number;
}

interface SloganOption {
  id: number;
  mainSlogan: string;
  subSlogan?: string;
  approach: string;
  variations: {
    sns: string;
    poster: string;
    youth: string;
    senior: string;
  };
  reasoning: {
    targetAlignment: string;
    differentiation: string;
    emotionalAppeal: string;
    memorability: string;
  };
  scores: SloganScores;
  riskAlerts?: string[];
}

interface FinalPackage {
  mainSlogan: string;
  tagline?: string;
  strategicRationale: {
    positioning: string;
    targetVoters: string[];
    competitiveDiff: string;
    toneJustification: string;
  };
  variations: { context: string; slogan: string; usage: string }[];
  applicationGuide: {
    dos: string[];
    donts: string[];
    bestPractices: string[];
  };
  voterSegmentAppeal: { segment: string; appealScore: number; reasoning: string }[];
  legalCompliance: { status: string; checks: string[] };
  scores: SloganScores;
}

interface RefineMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/* ================================================
   CONSTANTS
   ================================================ */
const TARGETS = [
  "2030 청년", "학부모", "직장인/통근자", "시니어(65+)",
  "자영업자", "다문화가정", "1인가구", "신혼부부",
];

const VOTER_DATA: Record<string, {
  population: string;
  ratio: string;
  keyStats: string[];
  values: string[];
  votingPattern: string;
  politicalMotivation: string[];
}> = {
  "2030 청년": {
    population: "약 10~12만 명 (20~39세)",
    ratio: "강남구 전체 인구의 약 20%",
    keyStats: [
      "전세 보증금 평균 2억원 이상 (서울 최고 수준)",
      "역삼·테헤란로 IT/스타트업 종사 비중 높음",
      "월 주거비 부담 약 97만원 (1인가구 기준)",
      "2024 강남구 사전투표율 27.21% (서울 최저)",
    ],
    values: ["주거 안정", "일자리·창업", "교통 편의", "문화·여가"],
    votingPattern: "20대 남성 보수 지지 74.1%, 20대 여성 진보 성향. 투표율 낮으나 SNS 여론 주도.",
    politicalMotivation: ["내집마련·주거비 절감", "스타트업 지원·규제 완화", "대중교통 심야 확대", "디지털 기반 소통"],
  },
  "학부모": {
    population: "약 5~6만 가구",
    ratio: "초등학생 약 25,029명(2023)",
    keyStats: ["가구당 월 사교육비 65~103만원", "대치동 전국 최대 사교육 특구", "우수 학군 밀집", "영재교육원·특목고 진학률 상위"],
    values: ["교육 품질", "사교육비 경감", "안전 등하교", "돌봄 확대"],
    votingPattern: "교육감 선거 80%+ 보수 성향. 교육 정책이 투표 최우선 요인.",
    politicalMotivation: ["공교육 강화 (AI·코딩)", "사교육비 절감 대안", "통학 안전", "방과후 돌봄 확대"],
  },
  "직장인/통근자": {
    population: "일 유동인구 약 80만+ 명",
    ratio: "역삼동 유동인구 20만, 강남역 19만+",
    keyStats: ["테헤란로 IT밸리", "평균 통근 34.5분", "GTX-A 수서역 운행 중", "사전투표율 서울 최저"],
    values: ["출퇴근 개선", "점심·여가 인프라", "야간 교통", "직주근접"],
    votingPattern: "사전투표 의존 높음. 통근자 대부분 비거주자.",
    politicalMotivation: ["교통 체증 해소", "GTX-C 삼성역 조기 개통", "테헤란로 보행환경 개선", "편의시설 확충"],
  },
  "시니어(65+)": {
    population: "약 7~7.5만 명",
    ratio: "약 12.3%, 10년간 1.7배 증가",
    keyStats: ["투표율 64~87% (최고)", "독거노인 돌봄 수요 급증", "고령화 가속", "어르신 복지관 6개소"],
    values: ["건강·의료", "돌봄 서비스", "사회 참여", "교통약자 이동권"],
    votingPattern: "보수 70%+. 투표율 전 연령 최고. 재건축·소각장에 민감.",
    politicalMotivation: ["어르신 돌봄 강화", "의료·건강 인프라", "복지관 현대화", "교통약자 지원"],
  },
  "자영업자": {
    population: "약 104,551개 사업체 (서울 1위)",
    ratio: "서울시 사업체 최다",
    keyStats: ["배달앱 수수료 16~35%", "89.9%가 비용 증가 호소", "상권 양극화", "골목상권 격차 심화"],
    values: ["임대료 경감", "상권 활성화", "규제 완화", "디지털 전환"],
    votingPattern: "경제적 이해관계로 투표. 보수 우세, 소상공인 정책에 민감.",
    politicalMotivation: ["공공 배달앱 도입", "임대료 안정화", "강남 상권 브랜딩", "소상공인 디지털 지원"],
  },
  "다문화가정": {
    population: "약 3,000~4,000가구",
    ratio: "전체 가구의 약 2.3%",
    keyStats: ["중국·베트남 출신 다수", "이중언어 교육 수요", "다문화센터 1개소", "행정서비스 접근 어려움"],
    values: ["언어·문화 지원", "자녀 교육", "취업·자립", "사회 통합"],
    votingPattern: "귀화자 투표율 낮음. 생활 밀착 정책에 민감.",
    politicalMotivation: ["다국어 행정서비스", "이중언어 교육", "취업 연계", "문화 교류 확대"],
  },
  "1인가구": {
    population: "약 9~9.6만 가구",
    ratio: "전체 가구의 약 40.2% (최대)",
    keyStats: ["평균 월세 97만원, 전세 2.4억원", "20~30대 직장인 최다", "고독사 위험 증가", "배달·편의점 의존"],
    values: ["합리적 주거비", "안전·치안", "생활 편의", "커뮤니티"],
    votingPattern: "투표율 낮음. 주거비 최대 관심. 여성 안심 치안에 민감.",
    politicalMotivation: ["소형 공공주택 공급", "스마트 CCTV 확대", "커뮤니티 공간", "고독사 예방 AI"],
  },
  "신혼부부": {
    population: "약 8,000~10,000쌍",
    ratio: "3년 연속 두자릿수 출생률 증가 (유일 구)",
    keyStats: ["아파트 평균 매매가 30억+", "가격상승률 13.12%", "첫째 출산 지원금 790만원", "주택대출 지원 2배 확대"],
    values: ["내집마련", "출산·육아 지원", "보육시설", "워라밸"],
    votingPattern: "주거·출산 정책에 가장 민감. 실질 혜택 제공 후보 지지.",
    politicalMotivation: ["신혼 공공주택 확대", "출산 장려금 확대", "국공립 어린이집 확충", "육아 친화 도시환경"],
  },
};

const TONES = [
  { id: "혁신·변화", label: "혁신·변화", desc: "미래지향적, 새로운 시작", color: "from-violet-500 to-purple-400" },
  { id: "신뢰·안정", label: "신뢰·안정", desc: "검증된 리더십, 든든한 행정", color: "from-blue-500 to-cyan-400" },
  { id: "공감·소통", label: "공감·소통", desc: "주민과 함께, 따뜻한 행정", color: "from-emerald-500 to-teal-400" },
  { id: "실용·성과", label: "실용·성과", desc: "확실한 결과, 실질적 변화", color: "from-amber-500 to-orange-400" },
];

const PURPOSES = [
  "메인 캠페인 슬로건",
  "SNS·온라인 전용",
  "벽보·현수막용",
  "연령대별 맞춤형",
  "이슈 대응형",
];

const STEP_NAMES = ["전략 설정", "슬로건 생성", "상세 정제", "전략 패키지"];

const SCORE_LABELS: Record<keyof SloganScores, string> = {
  memorability: "기억성",
  voterResonance: "유권자 공명",
  differentiation: "차별성",
  authenticity: "진정성",
  versatility: "활용도",
  legalSafety: "법적 안전성",
};

/* ================================================
   HELPERS
   ================================================ */
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color =
    value >= 80 ? "bg-emerald-500" : value >= 60 ? "bg-blue-500" : value >= 40 ? "bg-amber-500" : "bg-red-400";
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-[var(--text-secondary)] w-20 shrink-0">{label}</span>
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

/* ================================================
   ANALYSIS LOADER
   ================================================ */
const SLOGAN_PHASES = [
  { icon: Database, label: "후보·지역 프로필 로드", desc: "네안데르 후보 · 강남구 · 국민의힘 맥락 분석" },
  { icon: Users, label: "타겟 유권자 심리 분석", desc: "선택된 세그먼트의 핵심 가치관·투표 동기 매핑" },
  { icon: Target, label: "경쟁 후보 차별화 분석", desc: "야당 메시지 패턴 대비 포지셔닝 전략 수립" },
  { icon: Brain, label: "언어 패턴 최적화", desc: "기억성·호소력·진정성 균형 언어 설계" },
  { icon: BarChart3, label: "6축 평가 시뮬레이션", desc: "다차원 슬로건 품질 스코어링" },
  { icon: Zap, label: "맥락별 변주 생성", desc: "SNS·포스터·연령대별 최적 변형 도출" },
];

function SloganAnalysisLoader({ targets, tone }: { targets: string[]; tone: string }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhase((p) => (p < SLOGAN_PHASES.length - 1 ? p + 1 : p));
    }, 4500);
    const progressTimer = setInterval(() => {
      setProgress((p) => (p >= 95 ? 95 : p + 0.4));
    }, 100);
    return () => { clearInterval(phaseTimer); clearInterval(progressTimer); };
  }, []);

  return (
    <motion.div
      key="slogan-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[480px] py-8"
    >
      <div className="relative mb-8">
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote className="w-10 h-10 text-white" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400/30"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400/20"
          animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
        AI가 전략적 슬로건을 설계하고 있습니다
      </h3>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">
        {tone} · {targets.join(", ")}
      </p>

      <div className="w-full max-w-sm mb-8">
        <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-[var(--text-tertiary)]">전략 분석 중</span>
          <span className="text-[10px] font-bold text-pink-500">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-2">
        {SLOGAN_PHASES.map((p, i) => {
          const isActive = i === phase;
          const isDone = i < phase;
          const isPending = i > phase;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isActive ? "bg-pink-50 border border-pink-200/50" : isDone ? "bg-emerald-50/60" : "bg-transparent"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                isActive ? "bg-pink-500 text-white" : isDone ? "bg-emerald-500 text-white" : "bg-[var(--surface)] text-[var(--text-tertiary)]"
              }`}>
                {isDone ? <Check className="w-4 h-4" /> : isActive ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <p.icon className="w-4 h-4" />
                  </motion.div>
                ) : <p.icon className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${isActive ? "text-pink-600" : isDone ? "text-emerald-600" : "text-[var(--text-tertiary)]"}`}>
                  {p.label}
                </p>
                {(isActive || isDone) && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-[10px] text-[var(--text-tertiary)] truncate">
                    {p.desc}
                  </motion.p>
                )}
              </div>
              {isActive && <Loader2 className="w-4 h-4 text-pink-500 animate-spin shrink-0" />}
              {isDone && <span className="text-[10px] font-bold text-emerald-500 shrink-0">완료</span>}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ================================================
   WIZARD
   ================================================ */
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
  const [infoTarget, setInfoTarget] = useState<string | null>(null);
  const [expandedReasoning, setExpandedReasoning] = useState<number | null>(null);

  const refineContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (refineContainerRef.current) {
      refineContainerRef.current.scrollTop = refineContainerRef.current.scrollHeight;
    }
  }, [refineMessages]);

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
    setExpandedReasoning(null);
  };

  const QUICK_REFINE = ["더 짧게", "더 강하게", "젊게", "격식있게", "차별화 강조"];

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
          {/* ====== STEP 0: Strategy Setup ====== */}
          {step === 0 && !isGenerating && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                슬로건 전략을 설정하세요
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">타겟 유권자, 톤, 용도를 선택하면 AI가 전략적 근거에 기반한 슬로건을 설계합니다.</p>

              {/* Targets */}
              <div className="mb-5">
                <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">
                  타겟 유권자 (복수 선택) <span className="font-normal text-[var(--text-tertiary)]">— 돋보기를 눌러 실제 데이터를 확인하세요</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {TARGETS.map((t) => (
                    <div key={t} className="flex items-center gap-0.5">
                      <button
                        onClick={() => toggleTarget(t)}
                        className={`px-3 py-1.5 rounded-l-full text-xs font-medium transition-all ${
                          targets.includes(t)
                            ? "bg-pink-500 text-white"
                            : "bg-[var(--surface)] text-[var(--text-secondary)] border border-r-0 border-[var(--border-light)] hover:border-pink-300"
                        }`}
                      >
                        {t}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setInfoTarget(infoTarget === t ? null : t); }}
                        className={`px-1.5 py-1.5 rounded-r-full text-xs transition-all ${
                          targets.includes(t)
                            ? "bg-pink-500 text-white/70 hover:text-white"
                            : "bg-[var(--surface)] text-[var(--text-tertiary)] border border-l-0 border-[var(--border-light)] hover:text-pink-500"
                        }`}
                      >
                        <Search className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Voter Data Popup */}
                <AnimatePresence>
                  {infoTarget && VOTER_DATA[infoTarget] && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="rounded-2xl border border-[var(--border-light)] bg-gradient-to-br from-white to-pink-50/30 shadow-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-400">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-white/80" />
                            <h4 className="text-sm font-bold text-white">{infoTarget}</h4>
                          </div>
                          <button onClick={() => setInfoTarget(null)} className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex gap-3">
                            <div className="flex-1 p-2.5 rounded-xl bg-pink-50 border border-pink-100">
                              <p className="text-[10px] font-bold text-pink-600 mb-0.5">인구 규모</p>
                              <p className="text-xs font-bold text-[var(--text-primary)]">{VOTER_DATA[infoTarget].population}</p>
                              <p className="text-[10px] text-[var(--text-tertiary)]">{VOTER_DATA[infoTarget].ratio}</p>
                            </div>
                            <div className="flex-1 p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                              <p className="text-[10px] font-bold text-amber-600 mb-0.5">투표 성향</p>
                              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{VOTER_DATA[infoTarget].votingPattern}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-[10px] font-bold text-[var(--text-primary)] mb-1.5 flex items-center gap-1"><Target className="w-3 h-3 text-emerald-500" />핵심 가치</p>
                              {VOTER_DATA[infoTarget].values.map((v, i) => (
                                <div key={i} className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)] mb-0.5">
                                  <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />{v}
                                </div>
                              ))}
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-[var(--text-primary)] mb-1.5 flex items-center gap-1"><Vote className="w-3 h-3 text-rose-500" />정치적 동기</p>
                              {VOTER_DATA[infoTarget].politicalMotivation.map((m, i) => (
                                <div key={i} className="flex items-start gap-1 text-[10px] text-[var(--text-secondary)] mb-0.5">
                                  <div className="w-1 h-1 rounded-full bg-rose-400 shrink-0 mt-1" />{m}
                                </div>
                              ))}
                            </div>
                          </div>
                          <p className="text-[9px] text-[var(--text-tertiary)] text-right pt-1 border-t border-[var(--border-light)]">
                            출처: 강남구청, 통계청, 중앙선관위 (2024~2025 기준)
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tone */}
              <div className="mb-5">
                <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">캠페인 톤</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`text-left p-3 rounded-xl border-2 transition-all ${
                        tone === t.id
                          ? "border-pink-500 bg-pink-50/50 shadow-sm"
                          : "border-[var(--border-light)] hover:border-pink-300 bg-white"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${t.color} flex items-center justify-center mb-2`}>
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{t.label}</p>
                      <p className="text-[10px] text-[var(--text-tertiary)]">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Purposes */}
              <div className="mb-5">
                <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">슬로건 용도 (복수 선택)</label>
                <div className="flex flex-wrap gap-2">
                  {PURPOSES.map((p) => (
                    <button
                      key={p}
                      onClick={() => togglePurpose(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        purposes.includes(p)
                          ? "bg-pink-500 text-white"
                          : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-pink-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">핵심 키워드 (선택)</label>
                <input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="예: 청년일자리, 강남의 미래, 재건축 정상화, 스마트 도시..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/10"
                />
              </div>
            </motion.div>
          )}

          {/* ====== LOADING ====== */}
          {isGenerating && (
            <SloganAnalysisLoader targets={targets} tone={tone} />
          )}

          {/* ====== STEP 1: Generated Slogans ====== */}
          {step === 1 && !isGenerating && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
                AI가 3가지 슬로건을 제안합니다
              </h3>
              {strategicContext && <p className="text-sm text-[var(--text-secondary)] mb-6">{strategicContext}</p>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {slogans.map((s) => {
                  const isSelected = selectedSlogan?.id === s.id;
                  const approachColor =
                    s.approach === "혁신형" ? "text-violet-600 bg-violet-50"
                    : s.approach === "신뢰형" ? "text-blue-600 bg-blue-50"
                    : s.approach === "공감형" ? "text-emerald-600 bg-emerald-50"
                    : "text-amber-600 bg-amber-50";
                  const isExpanded = expandedReasoning === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSlogan(s)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-pink-500 bg-pink-50/30 shadow-lg shadow-pink-500/10"
                          : "border-[var(--border-light)] hover:border-pink-300 bg-white hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${approachColor}`}>
                          {s.approach}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Main Slogan */}
                      <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                        &ldquo;{s.mainSlogan}&rdquo;
                      </h4>
                      {s.subSlogan && <p className="text-xs text-[var(--text-secondary)] mb-3">{s.subSlogan}</p>}

                      {/* Variations */}
                      <div className="mb-3 space-y-1">
                        {[
                          { label: "SNS", val: s.variations.sns },
                          { label: "포스터", val: s.variations.poster },
                          { label: "청년", val: s.variations.youth },
                          { label: "시니어", val: s.variations.senior },
                        ].map((v) => (
                          <div key={v.label} className="flex items-start gap-2 text-[10px]">
                            <span className="font-bold text-pink-500 w-8 shrink-0">{v.label}</span>
                            <span className="text-[var(--text-tertiary)]">{v.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Risk Alerts */}
                      {s.riskAlerts && s.riskAlerts.length > 0 && (
                        <div className="mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200/50">
                          {s.riskAlerts.map((r, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[10px] text-amber-700">
                              <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* AI Reasoning (Toggle) */}
                      <div
                        onClick={(e) => { e.stopPropagation(); setExpandedReasoning(isExpanded ? null : s.id); }}
                        className="mb-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-1 text-[10px] font-bold text-pink-500 mb-1">
                          <Brain className="w-3 h-3" />
                          AI 분석 근거
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </div>
                        {isExpanded && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1 text-[10px] text-[var(--text-secondary)]">
                            <div className="flex items-start gap-1.5"><Target className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /><span><strong>타겟:</strong> {s.reasoning.targetAlignment}</span></div>
                            <div className="flex items-start gap-1.5"><Shield className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" /><span><strong>차별화:</strong> {s.reasoning.differentiation}</span></div>
                            <div className="flex items-start gap-1.5"><Sparkles className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" /><span><strong>감성:</strong> {s.reasoning.emotionalAppeal}</span></div>
                            <div className="flex items-start gap-1.5"><Brain className="w-3 h-3 text-violet-500 shrink-0 mt-0.5" /><span><strong>기억성:</strong> {s.reasoning.memorability}</span></div>
                          </motion.div>
                        )}
                      </div>

                      {/* Scores */}
                      <div className="space-y-1.5">
                        {(Object.keys(s.scores) as (keyof SloganScores)[]).map((key) => (
                          <ScoreBar key={key} label={SCORE_LABELS[key]} value={s.scores[key]} />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ====== STEP 2: Refine ====== */}
          {step === 2 && (
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
                  onClick={finalize}
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
                    onClick={() => sendRefine(q)}
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
                  onChange={(e) => setRefineInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendRefine(refineInput); } }}
                  placeholder="수정 요청을 입력하세요..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/10"
                  disabled={isRefining}
                />
                <button
                  onClick={() => sendRefine(refineInput)}
                  disabled={isRefining || !refineInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-all disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ====== STEP 3: Final Package ====== */}
          {step === 3 && finalPackage && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                    슬로건 전략 패키지
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)]">네안데르 후보 | 강남구청장</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-xs font-medium hover:bg-pink-50 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "복사됨" : "전체 복사"}
                </button>
              </div>

              <div className="space-y-6">
                {/* Main Slogan Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    &ldquo;{finalPackage.mainSlogan}&rdquo;
                  </p>
                  {finalPackage.tagline && (
                    <p className="text-sm text-white/80">{finalPackage.tagline}</p>
                  )}
                </div>

                {/* Strategic Rationale */}
                <div className="p-4 rounded-xl bg-[var(--surface)]">
                  <h5 className="text-xs font-bold text-pink-600 mb-2 tracking-wider">전략적 배경</h5>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">{finalPackage.strategicRationale.positioning}</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-bold text-[var(--text-primary)] mb-1">타겟 유권자</p>
                      <p className="text-[var(--text-tertiary)]">{finalPackage.strategicRationale.targetVoters.join(", ")}</p>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)] mb-1">경쟁 차별화</p>
                      <p className="text-[var(--text-tertiary)]">{finalPackage.strategicRationale.competitiveDiff}</p>
                    </div>
                  </div>
                </div>

                {/* Variations Table */}
                <div>
                  <h5 className="text-xs font-bold text-pink-600 mb-3 tracking-wider">맥락별 슬로건 변주</h5>
                  <div className="space-y-2">
                    {finalPackage.variations.map((v, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface)]">
                        <span className="text-[10px] font-bold text-pink-500 bg-pink-50 rounded-full px-2 py-0.5 shrink-0 mt-0.5">{v.context}</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">&ldquo;{v.slogan}&rdquo;</p>
                          <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{v.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Guide */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <h5 className="text-xs font-bold text-emerald-600 mb-2">DO</h5>
                    <ul className="space-y-1">
                      {finalPackage.applicationGuide.dos.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /><span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
                    <h5 className="text-xs font-bold text-red-600 mb-2">DON&apos;T</h5>
                    <ul className="space-y-1">
                      {finalPackage.applicationGuide.donts.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                          <X className="w-3 h-3 text-red-500 shrink-0 mt-0.5" /><span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                    <h5 className="text-xs font-bold text-amber-600 mb-2">BEST PRACTICE</h5>
                    <ul className="space-y-1">
                      {finalPackage.applicationGuide.bestPractices.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                          <Sparkles className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" /><span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Voter Segment Appeal */}
                <div>
                  <h5 className="text-xs font-bold text-pink-600 mb-3 tracking-wider">유권자 세그먼트별 호소력</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {finalPackage.voterSegmentAppeal.map((v, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface)]">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[var(--text-primary)]">{v.segment}</span>
                            <span className="text-xs font-bold text-pink-500">{v.appealScore}점</span>
                          </div>
                          <div className="h-1.5 bg-white rounded-full overflow-hidden mb-1">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${v.appealScore}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                              className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400"
                            />
                          </div>
                          <p className="text-[10px] text-[var(--text-tertiary)]">{v.reasoning}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legal & Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[var(--surface)]">
                    <h5 className="text-xs font-bold text-pink-600 mb-2">선관위 법적 컴플라이언스</h5>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-2 ${
                      finalPackage.legalCompliance.status === "적합" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {finalPackage.legalCompliance.status === "적합" ? <Shield className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {finalPackage.legalCompliance.status}
                    </div>
                    <ul className="space-y-1">
                      {finalPackage.legalCompliance.checks.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /><span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--surface)]">
                    <h5 className="text-xs font-bold text-pink-600 mb-2">6축 평가</h5>
                    <div className="space-y-1.5">
                      {(Object.keys(finalPackage.scores) as (keyof SloganScores)[]).map((key) => (
                        <ScoreBar key={key} label={SCORE_LABELS[key]} value={finalPackage.scores[key]} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Train,
  GraduationCap,
  Home,
  Leaf,
  HeartHandshake,
  Briefcase,
  Palette,
  ShieldCheck,
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
  FileText,
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
} from "lucide-react";
import ReactMarkdown from "react-markdown";

/* ================================================
   TYPES
   ================================================ */
interface Policy {
  id: number;
  title: string;
  subtitle: string;
  approach: string;
  keyPoints: string[];
  budget: string;
  timeline: string;
  expectedImpact: string;
  scores: Scores;
}

interface Scores {
  feasibility: number;
  budgetEfficiency: number;
  voterAppeal: number;
  uniqueness: number;
  impact: number;
}

interface FinalPolicy {
  title: string;
  slogan: string;
  background: string;
  objective: string;
  plans: { phase: string; content: string; budget: string }[];
  totalBudget: string;
  expectedEffects: string[];
  targetVoters: string;
  differentiator: string;
  scores: Scores;
}

interface RefineMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/* ================================================
   DATA
   ================================================ */
const CATEGORIES = [
  { id: "교통/인프라", icon: Train, stat: "일 20만+ 강남역 이용객", color: "from-blue-500 to-cyan-400" },
  { id: "교육", icon: GraduationCap, stat: "대치동 사교육 특구", color: "from-violet-500 to-purple-400" },
  { id: "주거/재건축", icon: Home, stat: "2025 가격상승 13.12%", color: "from-rose-500 to-pink-400" },
  { id: "환경", icon: Leaf, stat: "2034 탄소중립 55% 감축", color: "from-emerald-500 to-teal-400" },
  { id: "복지/돌봄", icon: HeartHandshake, stat: "고령화 가속·돌봄 수요↑", color: "from-amber-500 to-orange-400" },
  { id: "경제/일자리", icon: Briefcase, stat: "테헤란로 스타트업 밸리", color: "from-indigo-500 to-blue-400" },
  { id: "문화/관광", icon: Palette, stat: "코엑스·K-의료관광 허브", color: "from-fuchsia-500 to-pink-400" },
  { id: "안전/치안", icon: ShieldCheck, stat: "스마트 CCTV 확대 요구", color: "from-sky-500 to-blue-400" },
];

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
    values: ["주거 안정 (전세·월세 부담 완화)", "일자리·창업 생태계", "교통 편의성", "문화·여가 인프라"],
    votingPattern: "2022년 대선 기준 20대 남성 보수 지지 74.1%, 20대 여성 진보 성향 다수. 30대는 성별 격차 축소. 투표율은 타 연령 대비 낮으나 SNS 여론 주도층.",
    politicalMotivation: [
      "내집마련·주거비 절감 정책 (최대 관심사)",
      "스타트업·IT 일자리 지원 및 규제 완화",
      "대중교통 심야 확대, GTX 삼성역 조기 개통",
      "SNS·디지털 기반 소통 선호 (비대면 행정)",
    ],
  },
  "학부모": {
    population: "약 5~6만 가구 (초·중·고 자녀 보유)",
    ratio: "초등학생 약 25,029명(2023), 신입생 2,575명(2024)",
    keyStats: [
      "가구당 월 사교육비 65~103만원 (전국 최고)",
      "대치동 학원가 전국 최대 사교육 특구",
      "중동중·대청중·휘문고 등 우수 학군 밀집",
      "영재교육원·특목고 진학률 전국 상위",
    ],
    values: ["교육 품질·학군 유지", "사교육비 부담 경감", "안전한 등하교 환경", "돌봄 서비스 확대"],
    votingPattern: "교육감 선거에서 80% 이상 보수 성향 후보 지지. 교육 정책이 투표 결정의 최우선 요인. 재건축 정책도 주요 관심사.",
    politicalMotivation: [
      "공교육 강화 (AI·코딩 교육, 방과후 프로그램)",
      "사교육비 절감 대안 (구립 영재교육 확대)",
      "통학 안전 (스쿨존 CCTV, 안심 귀가 서비스)",
      "방과후 돌봄·초등 전일제 확대",
    ],
  },
  "직장인/통근자": {
    population: "일 유동인구 약 80만+ 명",
    ratio: "역삼동 유동인구 20만, 강남역 일 이용객 19만+",
    keyStats: [
      "테헤란로 IT·스타트업 밸리 (한국의 실리콘밸리)",
      "평균 통근시간 34.5분, 출퇴근 정체 심각",
      "GTX-A 수서역 운행 중, GTX-C 삼성역 2027 예정",
      "사전투표율 27.21% (서울 25개 구 중 최저)",
    ],
    values: ["출퇴근 교통 개선", "점심·여가 인프라", "야간 대중교통 확대", "직주근접 주거"],
    votingPattern: "사전투표 의존 높음 (근무 중 투표 어려움). 통근자 대부분 강남구 비거주자로 직접 투표권 없으나 상권·인프라 수요에 핵심 영향.",
    politicalMotivation: [
      "교통 체증 해소 (영동대로 지하공간, 위례신사선)",
      "GTX-C 삼성역 조기 개통·환승 편의",
      "테헤란로 보행환경 개선·녹지화",
      "점심 문화·편의시설 확충",
    ],
  },
  "시니어(65+)": {
    population: "약 7~7.5만 명",
    ratio: "강남구 전체의 약 12.3%, 10년간 1.7배 증가",
    keyStats: [
      "투표율 64~87% (전 연령 중 최고)",
      "서울시 무연고 사망 784명(2024), 독거노인 돌봄 수요 급증",
      "노인 인구 비율 지속 증가 (고령화 가속)",
      "강남구 어르신 복지관 6개소 운영",
    ],
    values: ["건강·의료 접근성", "돌봄·안부 확인 서비스", "일자리·사회 참여", "교통약자 이동권"],
    votingPattern: "압도적 보수 성향 (70%+). 투표율이 전 연령 중 가장 높아 선거 결과에 결정적 영향. 지역 현안(재건축, 소각장)에 매우 민감.",
    politicalMotivation: [
      "어르신 돌봄 강화 (AI 안부확인, 방문간호)",
      "의료·건강 인프라 (강남 메디컬 허브 활용)",
      "경로당·복지관 현대화 및 프로그램 확대",
      "교통약자 이동 지원 (저상버스, 콜택시)",
    ],
  },
  "자영업자": {
    population: "약 104,551개 사업체 (서울 1위)",
    ratio: "강남구 전체 사업체 서울시 최다",
    keyStats: [
      "배달앱 수수료 16~35% 부담",
      "89.9%가 비용 증가 호소 (임대료·인건비)",
      "신사동·압구정 F&B, 역삼 IT 상권 양극화",
      "골목상권 vs 대형상권 격차 심화",
    ],
    values: ["임대료·수수료 부담 경감", "상권 활성화 지원", "규제 완화", "소상공인 디지털 전환"],
    votingPattern: "경제적 이해관계에 따라 투표. 보수 성향 우세하나, 소상공인 지원 정책에 민감하게 반응. 지역상인회 조직력 높음.",
    politicalMotivation: [
      "공공 배달앱·수수료 상한제 도입",
      "임대료 안정화 (상가 임대차 보호 강화)",
      "강남 특화 상권 브랜딩 (K-뷰티, 메디컬투어)",
      "소상공인 디지털 전환 지원 (AI 마케팅, 키오스크)",
    ],
  },
  "다문화가정": {
    population: "약 3,000~4,000가구",
    ratio: "전체 가구의 약 2.3%",
    keyStats: [
      "결혼이민자 중 중국·베트남 출신 다수",
      "자녀 이중언어 교육 수요 증가",
      "강남구 다문화가족지원센터 1개소 운영",
      "언어 장벽으로 행정서비스 접근 어려움",
    ],
    values: ["언어·문화 적응 지원", "자녀 교육 통합", "취업·경제적 자립", "차별 해소·사회 통합"],
    votingPattern: "귀화자 투표율 상대적으로 낮음. 정당 지지보다 생활 밀착형 정책(교육, 통역, 취업)에 민감. 지역 커뮤니티 네트워크 영향 큼.",
    politicalMotivation: [
      "다국어 행정서비스 (AI 통역 키오스크)",
      "자녀 이중언어·글로벌 교육 프로그램",
      "다문화가정 취업 연계 (강남 국제기업 매칭)",
      "문화 교류 축제·커뮤니티 공간 확대",
    ],
  },
  "1인가구": {
    population: "약 9~9.6만 가구",
    ratio: "강남구 전체 가구의 약 40.2% (최대 비중)",
    keyStats: [
      "평균 월세 약 97만원/월, 전세 2.4억원",
      "20~30대 직장인 1인가구 비중 가장 높음",
      "고독사 위험 증가 (서울 무연고 사망 784명/2024)",
      "배달·편의점 의존 생활패턴",
    ],
    values: ["합리적 주거비", "안전·치안 (특히 여성)", "생활 편의 인프라", "고립 예방·커뮤니티"],
    votingPattern: "20~30대 1인가구 투표율 낮음. 주거비 부담이 최대 관심사. 여성 안심 치안·야간 안전에 민감. SNS 기반 정보 수집.",
    politicalMotivation: [
      "1인가구 맞춤형 소형 공공주택 공급",
      "여성안심귀가·스마트 CCTV 확대",
      "1인가구 커뮤니티 공간 (공유주방, 코리빙)",
      "고독사 예방 AI 안부확인 시스템",
    ],
  },
  "신혼부부": {
    population: "약 8,000~10,000쌍 (연간 혼인 기준)",
    ratio: "강남구 3년 연속 두자릿수 출생률 증가 (유일한 구)",
    keyStats: [
      "아파트 평균 매매가 30억+ (진입 장벽 최고)",
      "2025 가격상승률 13.12%",
      "첫째 출산 지원금 790만원",
      "신혼부부·청년 주택대출 지원 2배 확대 예정",
    ],
    values: ["내집마련·주거 안정", "출산·육아 지원", "보육시설 접근성", "워라밸·가족 여가"],
    votingPattern: "주거·출산 정책에 가장 민감한 층. 보수·진보 가리지 않고 실질적 혜택 제공 후보 지지. 맞벌이 부부 비중 높아 돌봄 정책 중시.",
    politicalMotivation: [
      "신혼 특화 공공주택·전세 지원 확대",
      "출산 장려금 확대 (강남형 추가 지원)",
      "국공립 어린이집 확충 (대기 zero 목표)",
      "육아 친화 도시환경 (유모차 보행로, 키즈카페)",
    ],
  },
};

const PRIORITIES = ["시급한 과제 (임기 1년 내)", "중기 목표 (임기 내 완료)", "장기 비전 (5년 이상)"];
const BUDGETS = ["소규모 (10억 이하)", "중규모 (10~100억)", "대규모 (100억 이상)"];

const SCORE_LABELS: Record<keyof Scores, string> = {
  feasibility: "실현가능성",
  budgetEfficiency: "예산효율",
  voterAppeal: "주민호감도",
  uniqueness: "차별성",
  impact: "파급효과",
};

const STEP_NAMES = ["분야 선택", "타겟 설정", "공약 생성", "상세 발전", "최종 완성"];

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

/* ================================================
   ANALYSIS LOADER
   ================================================ */
const ANALYSIS_PHASES = [
  { icon: Database, label: "강남구 데이터 수집", desc: "인구 556,330명 · 예산 1조 4,804억원 데이터 로드" },
  { icon: Users, label: "유권자 세그먼트 분석", desc: "타겟 유권자의 핵심 가치관과 투표 성향 매칭" },
  { icon: TrendingUp, label: "현안 우선순위 매핑", desc: "분야별 긴급도와 주민 체감도 교차 분석" },
  { icon: Brain, label: "AI 공약 시뮬레이션", desc: "실현가능성 · 예산효율 · 차별성 다축 최적화" },
  { icon: BarChart3, label: "3개 대안 비교 생성", desc: "실용적 · 혁신적 · 점진적 접근방식 도출" },
  { icon: Zap, label: "최종 스코어링", desc: "5축 평가 점수 산출 및 결과 정리" },
];

function AnalysisLoader({ category, targets }: { category: string; targets: string[] }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase cycling: advance every 4.5 seconds
    const phaseTimer = setInterval(() => {
      setPhase((p) => (p < ANALYSIS_PHASES.length - 1 ? p + 1 : p));
    }, 4500);
    // Smooth progress bar
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return 95; // cap at 95 until actually done
        return p + 0.4;
      });
    }, 100);
    return () => { clearInterval(phaseTimer); clearInterval(progressTimer); };
  }, []);

  return (
    <motion.div
      key="analysis-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[480px] py-8"
    >
      {/* Central pulse animation */}
      <div className="relative mb-8">
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#3378FF] flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[var(--primary)]/30"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[var(--primary)]/20"
          animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
        AI가 맞춤형 공약을 설계하고 있습니다
      </h3>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">
        {category} · {targets.join(", ")}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-8">
        <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[#3378FF] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-[var(--text-tertiary)]">분석 진행 중</span>
          <span className="text-[10px] font-bold text-[var(--primary)]">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Phase steps */}
      <div className="w-full max-w-sm space-y-2">
        {ANALYSIS_PHASES.map((p, i) => {
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
                isActive
                  ? "bg-[var(--primary-50)] border border-[var(--primary)]/20"
                  : isDone
                  ? "bg-emerald-50/60"
                  : "bg-transparent"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : isDone
                  ? "bg-emerald-500 text-white"
                  : "bg-[var(--surface)] text-[var(--text-tertiary)]"
              }`}>
                {isDone ? (
                  <Check className="w-4 h-4" />
                ) : isActive ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <p.icon className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <p.icon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${
                  isActive ? "text-[var(--primary)]" : isDone ? "text-emerald-600" : "text-[var(--text-tertiary)]"
                }`}>
                  {p.label}
                </p>
                {(isActive || isDone) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-[10px] text-[var(--text-tertiary)] truncate"
                  >
                    {p.desc}
                  </motion.p>
                )}
              </div>
              {isActive && (
                <Loader2 className="w-4 h-4 text-[var(--primary)] animate-spin shrink-0" />
              )}
              {isDone && (
                <span className="text-[10px] font-bold text-emerald-500 shrink-0">완료</span>
              )}
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
          {/* ====== STEP 0: Category ====== */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                어떤 분야의 공약을 개발할까요?
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">강남구 핵심 정책 분야를 선택하세요. 각 분야의 현황 데이터가 자동으로 반영됩니다.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`group text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      category === c.id
                        ? "border-[var(--primary)] bg-[var(--primary-50)] shadow-md shadow-[var(--primary)]/10"
                        : "border-[var(--border-light)] hover:border-[var(--primary)]/30 bg-white"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
                      <c.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-bold text-[var(--text-primary)] mb-1">{c.id}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] leading-snug">{c.stat}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ====== STEP 1: Target ====== */}
          {step === 1 && !isGenerating && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                누구를 위한 공약인가요?
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">타겟 유권자, 우선순위, 예산 규모를 설정하면 AI가 맞춤형 공약을 생성합니다.</p>

              {/* Targets */}
              <div className="mb-5">
                <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">타겟 유권자 (복수 선택) <span className="font-normal text-[var(--text-tertiary)]">— 돋보기를 눌러 실제 데이터를 확인하세요</span></label>
                <div className="flex flex-wrap gap-2">
                  {TARGETS.map((t) => (
                    <div key={t} className="flex items-center gap-0.5">
                      <button
                        onClick={() => toggleTarget(t)}
                        className={`px-3 py-1.5 rounded-l-full text-xs font-medium transition-all ${
                          targets.includes(t)
                            ? "bg-[var(--primary)] text-white"
                            : "bg-[var(--surface)] text-[var(--text-secondary)] border border-r-0 border-[var(--border-light)] hover:border-[var(--primary)]/30"
                        }`}
                      >
                        {t}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setInfoTarget(infoTarget === t ? null : t); }}
                        className={`px-1.5 py-1.5 rounded-r-full text-xs transition-all ${
                          targets.includes(t)
                            ? "bg-[var(--primary)] text-white/70 hover:text-white"
                            : "bg-[var(--surface)] text-[var(--text-tertiary)] border border-l-0 border-[var(--border-light)] hover:text-[var(--primary)]"
                        }`}
                        title={`${t} 유권자 데이터 보기`}
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
                      <div className="rounded-2xl border border-[var(--border-light)] bg-gradient-to-br from-white to-[#F8FAFD] shadow-lg overflow-hidden">
                        {/* Popup Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[var(--primary)] to-[#3378FF]">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-white/80" />
                            <h4 className="text-sm font-bold text-white">{infoTarget}</h4>
                          </div>
                          <button onClick={() => setInfoTarget(null)} className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>

                        <div className="p-4 space-y-4">
                          {/* Population */}
                          <div className="flex gap-4">
                            <div className="flex-1 p-3 rounded-xl bg-[var(--primary-50)] border border-[var(--primary)]/10">
                              <p className="text-[10px] font-bold text-[var(--primary)] mb-0.5 tracking-wider">인구 규모</p>
                              <p className="text-sm font-bold text-[var(--text-primary)]">{VOTER_DATA[infoTarget].population}</p>
                              <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{VOTER_DATA[infoTarget].ratio}</p>
                            </div>
                            <div className="flex-1 p-3 rounded-xl bg-amber-50 border border-amber-200/50">
                              <p className="text-[10px] font-bold text-amber-600 mb-0.5 tracking-wider">투표 성향</p>
                              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{VOTER_DATA[infoTarget].votingPattern}</p>
                            </div>
                          </div>

                          {/* Key Stats */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)]" />
                              <p className="text-[10px] font-bold text-[var(--text-primary)] tracking-wider">핵심 통계</p>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {VOTER_DATA[infoTarget].keyStats.map((stat, i) => (
                                <div key={i} className="flex items-start gap-1.5 px-2.5 py-2 rounded-lg bg-[var(--surface)]">
                                  <span className="text-[9px] font-bold text-[var(--primary)] bg-[var(--primary-50)] rounded-full w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                  <span className="text-[11px] text-[var(--text-secondary)] leading-snug">{stat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Values & Motivations */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="flex items-center gap-1.5 mb-2">
                                <Target className="w-3.5 h-3.5 text-emerald-500" />
                                <p className="text-[10px] font-bold text-[var(--text-primary)] tracking-wider">핵심 가치관</p>
                              </div>
                              <div className="space-y-1">
                                {VOTER_DATA[infoTarget].values.map((v, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                    {v}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 mb-2">
                                <Vote className="w-3.5 h-3.5 text-rose-500" />
                                <p className="text-[10px] font-bold text-[var(--text-primary)] tracking-wider">정치적 동기</p>
                              </div>
                              <div className="space-y-1">
                                {VOTER_DATA[infoTarget].politicalMotivation.map((m, i) => (
                                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1" />
                                    {m}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Source */}
                          <p className="text-[9px] text-[var(--text-tertiary)] text-right pt-1 border-t border-[var(--border-light)]">
                            출처: 강남구청, 통계청, 중앙선관위, 서울열린데이터광장 (2024~2025 기준)
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Priority */}
              <div className="mb-5">
                <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">우선순위</label>
                <div className="flex flex-wrap gap-2">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        priority === p
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-5">
                <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">예산 규모</label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudgetScale(b)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        budgetScale === b
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concern */}
              <div>
                <label className="text-xs font-bold text-[var(--text-primary)] mb-2 block">핵심 관심사 (선택)</label>
                <input
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  placeholder="예: 대치동 학원비 부담 해소, 위례신사선 조기 착공..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--primary)]/40 focus:ring-2 focus:ring-[var(--primary)]/10"
                />
              </div>
            </motion.div>
          )}

          {/* ====== LOADING: Analysis Screen ====== */}
          {isGenerating && (
            <AnalysisLoader category={category} targets={targets} />
          )}

          {/* ====== STEP 2: Generated Policies ====== */}
          {step === 2 && !isGenerating && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
                AI가 3가지 공약을 제안합니다
              </h3>
              {situation && <p className="text-sm text-[var(--text-secondary)] mb-6">{situation}</p>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {policies.map((p) => {
                  const isSelected = selectedPolicy?.id === p.id;
                  const approachColor =
                    p.approach === "혁신적" ? "text-[var(--accent)] bg-[var(--accent-light)]"
                    : p.approach === "실용적" ? "text-[var(--primary)] bg-[var(--primary-50)]"
                    : "text-emerald-600 bg-emerald-50";
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPolicy(p)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary-50)]/50 shadow-lg shadow-[var(--primary)]/10"
                          : "border-[var(--border-light)] hover:border-[var(--primary)]/30 bg-white hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${approachColor}`}>
                          {p.approach}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-[var(--text-primary)] mb-1">{p.title}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mb-3">{p.subtitle}</p>
                      <ul className="space-y-1.5 mb-4">
                        {p.keyPoints.map((kp, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                            <Check className="w-3 h-3 text-[var(--primary)] shrink-0 mt-0.5" />
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)] mb-4">
                        <span>{p.budget}</span>
                        <span>{p.timeline}</span>
                      </div>
                      {/* Scores */}
                      <div className="space-y-1.5">
                        {(Object.keys(p.scores) as (keyof Scores)[]).map((key) => (
                          <ScoreBar key={key} label={SCORE_LABELS[key]} value={p.scores[key]} />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ====== STEP 3: Refine ====== */}
          {step === 3 && selectedPolicy && (
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
                  onClick={finalize}
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
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendRefine(refineInput); } }}
                  placeholder="예산을 줄여줘, 1단계에 OO 사업을 추가해줘..."
                  disabled={isRefining}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm outline-none focus:border-[var(--primary)]/40 focus:ring-2 focus:ring-[var(--primary)]/10 disabled:opacity-50"
                />
                <button
                  onClick={() => sendRefine(refineInput)}
                  disabled={!refineInput.trim() || isRefining}
                  className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary-dark)] transition-all disabled:opacity-40 shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ====== STEP 4: Final ====== */}
          {step === 4 && finalPolicy && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                    공약서가 완성되었습니다
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">캠페인에 바로 활용할 수 있는 공약서입니다.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyFinal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs font-medium hover:bg-[var(--primary-50)] transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "복사됨" : "복사"}
                  </button>
                  <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs font-medium hover:bg-[var(--primary-50)] transition-all">
                    <RotateCcw className="w-3.5 h-3.5" />
                    새 공약
                  </button>
                </div>
              </div>

              {/* Policy document */}
              <div className="rounded-2xl border border-[var(--border-light)] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[var(--primary)] to-[#3378FF] p-6 text-white">
                  <p className="text-xs font-medium text-white/60 mb-1">네안데르 후보 | 강남구청장 공약</p>
                  <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{finalPolicy.title}</h4>
                  <p className="text-sm text-white/80 italic">&ldquo;{finalPolicy.slogan}&rdquo;</p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Background & Objective */}
                  <div>
                    <h5 className="text-xs font-bold text-[var(--primary)] mb-1.5 tracking-wider">공약 배경</h5>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{finalPolicy.background}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[var(--primary)] mb-1.5 tracking-wider">목표</h5>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{finalPolicy.objective}</p>
                  </div>

                  {/* Plans */}
                  <div>
                    <h5 className="text-xs font-bold text-[var(--primary)] mb-3 tracking-wider">실행 계획</h5>
                    <div className="space-y-3">
                      {finalPolicy.plans.map((plan, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-full bg-[var(--primary-50)] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold text-[var(--primary)]">{i + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{plan.phase}</p>
                            <p className="text-xs text-[var(--text-secondary)]">{plan.content}</p>
                            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{plan.budget}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget & Effects */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[var(--surface)]">
                      <h5 className="text-xs font-bold text-[var(--primary)] mb-2">기대 효과</h5>
                      <ul className="space-y-1.5">
                        {finalPolicy.expectedEffects.map((e, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                            <Sparkles className="w-3 h-3 text-[var(--primary)] shrink-0 mt-0.5" />
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-[var(--surface)]">
                      <h5 className="text-xs font-bold text-[var(--primary)] mb-2">5축 평가</h5>
                      <div className="space-y-1.5">
                        {(Object.keys(finalPolicy.scores) as (keyof Scores)[]).map((key) => (
                          <ScoreBar key={key} label={SCORE_LABELS[key]} value={finalPolicy.scores[key]} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)] text-[10px] text-[var(--text-tertiary)]">
                    <span>총 예산: <strong className="text-[var(--text-primary)]">{finalPolicy.totalBudget}</strong></span>
                    <span>핵심 타겟: <strong className="text-[var(--text-primary)]">{finalPolicy.targetVoters}</strong></span>
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

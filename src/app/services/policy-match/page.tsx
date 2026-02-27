"use client";

import { useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import {
  Repeat2,
  Scale,
  Percent,
  ShieldCheck,
  MapPin,
  Lock,
  Map,
  Hand,
  Brain,
  Trophy,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ChevronRight,
  Zap,
  Info,
  RotateCcw,
  Bus,
  Home,
  Leaf,
  GraduationCap,
  HeartHandshake,
  ShieldAlert,
  Briefcase,
  Music,
  Building2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

/* ============================================================
   MOCK DATA
   ============================================================ */

interface PolicyQuestion {
  id: number;
  category: string;
  categoryIcon: React.ElementType;
  question: string;
  description: string;
  proArgs: string[];
  conArgs: string[];
}

const policyQuestions: PolicyQuestion[] = [
  {
    id: 1,
    category: "교통",
    categoryIcon: Bus,
    question: "대중교통 무료 환승 구간을 확대해야 할까요?",
    description:
      "현재 30분인 환승 시간을 60분으로, 환승 횟수를 무제한으로 확대하는 정책입니다.",
    proArgs: [
      "교통비 부담 감소로 서민 경제 도움",
      "대중교통 이용률 증가 → 탄소 배출 감소",
    ],
    conArgs: [
      "연간 200억원 추가 재정 부담",
      "재원 확보를 위한 다른 예산 삭감 불가피",
    ],
  },
  {
    id: 2,
    category: "교통",
    categoryIcon: Bus,
    question: "시내 중심부 차량 통행을 제한해야 할까요?",
    description:
      "평일 오전 7시~오후 9시까지 시내 핵심 구간의 차량 진입을 제한하는 정책입니다.",
    proArgs: [
      "보행 환경 개선과 대기질 향상",
      "상권 활성화 사례 (서울 세종대로 등)",
    ],
    conArgs: [
      "물류·상업 차량 우회로 인한 비용 증가",
      "주변 도로 교통 정체 심화 우려",
    ],
  },
  {
    id: 3,
    category: "주거",
    categoryIcon: Home,
    question: "청년 전세자금 이자 지원을 확대해야 할까요?",
    description:
      "만 19~34세 청년에게 전세자금 대출 이자를 최대 2%p 추가 지원하는 정책입니다.",
    proArgs: [
      "청년 주거비 부담 실질적 경감",
      "지역 정주 유도로 인구 유출 방지",
    ],
    conArgs: [
      "전세가격 상승 부추길 가능성",
      "소득 기준 없이 지원 시 형평성 문제",
    ],
  },
  {
    id: 4,
    category: "주거",
    categoryIcon: Home,
    question: "공공임대주택을 추가 건설해야 할까요?",
    description:
      "향후 4년간 5,000가구 규모의 공공임대주택을 추가 건설하는 정책입니다.",
    proArgs: [
      "저소득층 주거 안정에 직접적 도움",
      "장기적으로 부동산 시장 안정 효과",
    ],
    conArgs: [
      "대규모 재정 투입 필요 (약 1조원)",
      "주변 지역 주민 반대 및 집값 하락 우려",
    ],
  },
  {
    id: 5,
    category: "환경",
    categoryIcon: Leaf,
    question: "1회용품 사용을 전면 금지해야 할까요?",
    description:
      "음식점, 카페, 편의점 등에서 1회용 컵·봉투·빨대 사용을 전면 금지하는 정책입니다.",
    proArgs: [
      "연간 쓰레기 배출량 30% 감소 가능",
      "환경 보호와 탄소 중립 실현 기여",
    ],
    conArgs: [
      "소상공인 비용 부담 증가",
      "소비자 불편과 단속 행정 비용 발생",
    ],
  },
  {
    id: 6,
    category: "환경",
    categoryIcon: Leaf,
    question: "도심 내 녹지 공간을 30% 확대해야 할까요?",
    description:
      "유휴 부지와 노후 건물 부지를 활용하여 공원·녹지를 대폭 확충하는 정책입니다.",
    proArgs: [
      "도시 열섬 효과 완화 및 대기질 개선",
      "시민 여가 공간 확대로 삶의 질 향상",
    ],
    conArgs: [
      "토지 매입·조성 비용 수천억원 필요",
      "주거·상업용 토지 공급 감소 우려",
    ],
  },
  {
    id: 7,
    category: "교육",
    categoryIcon: GraduationCap,
    question: "초등학교 돌봄교실을 저녁 8시까지 연장해야 할까요?",
    description:
      "현재 오후 5시까지인 돌봄교실 운영 시간을 저녁 8시까지 연장하는 정책입니다.",
    proArgs: [
      "맞벌이 가정의 양육 부담 크게 완화",
      "사교육비 절감 효과 기대",
    ],
    conArgs: [
      "돌봄 교사 확충 및 인건비 증가",
      "아동의 장시간 학교 체류에 대한 우려",
    ],
  },
  {
    id: 8,
    category: "교육",
    categoryIcon: GraduationCap,
    question: "고교 무상급식을 전면 시행해야 할까요?",
    description:
      "현재 초·중학교에 한정된 무상급식을 고등학교까지 확대하는 정책입니다.",
    proArgs: [
      "교육 복지 사각지대 해소",
      "가정 경제 부담 경감 (연 약 100만원)",
    ],
    conArgs: [
      "연간 500억원 이상 추가 예산 필요",
      "고소득 가정까지 지원하는 것이 적절한지 논란",
    ],
  },
  {
    id: 9,
    category: "복지",
    categoryIcon: HeartHandshake,
    question: "기초연금을 월 40만원으로 인상해야 할까요?",
    description:
      "현재 월 32만원인 기초연금을 40만원으로 인상하는 정책입니다.",
    proArgs: [
      "노인 빈곤율 감소에 직접적 효과",
      "고령화 시대 사회 안전망 강화",
    ],
    conArgs: [
      "재정 부담 연 5조원 이상 증가",
      "미래 세대 부담 전가 우려",
    ],
  },
  {
    id: 10,
    category: "복지",
    categoryIcon: HeartHandshake,
    question: "지역화폐 발행을 대폭 확대해야 할까요?",
    description:
      "지역화폐 발행량을 현재의 2배로 늘리고 캐시백률을 10%로 인상하는 정책입니다.",
    proArgs: [
      "지역 소상공인 매출 증대",
      "지역 경제 선순환 효과",
    ],
    conArgs: [
      "캐시백 재원 확보 부담",
      "실질적 소비 증가 효과 미미하다는 연구 결과",
    ],
  },
  {
    id: 11,
    category: "안전",
    categoryIcon: ShieldAlert,
    question: "CCTV 설치를 2배로 늘려야 할까요?",
    description:
      "범죄 예방을 위해 골목, 공원, 주차장 등에 CCTV를 현재의 2배로 확충하는 정책입니다.",
    proArgs: [
      "범죄 억제 효과 (설치 지역 범죄율 20~30% 감소 사례)",
      "시민 체감 안전도 향상",
    ],
    conArgs: [
      "사생활 침해 및 감시 사회 우려",
      "설치·유지관리 비용 연간 수백억원",
    ],
  },
  {
    id: 12,
    category: "경제",
    categoryIcon: Briefcase,
    question: "전통시장에 대형 주차장을 건설해야 할까요?",
    description:
      "주요 전통시장 인근에 500면 이상 규모의 공영 주차장을 건설하는 정책입니다.",
    proArgs: [
      "전통시장 접근성 향상으로 매출 증대",
      "주변 도로 불법 주차 해소",
    ],
    conArgs: [
      "건설 비용 대비 실질 이용률 불확실",
      "대형마트와의 경쟁력 차이는 주차만으로 해결 불가",
    ],
  },
  {
    id: 13,
    category: "경제",
    categoryIcon: Briefcase,
    question: "지역 스타트업에 대한 세금 감면을 확대해야 할까요?",
    description:
      "설립 5년 이내 지역 스타트업의 법인세·취득세를 50% 감면하는 정책입니다.",
    proArgs: [
      "지역 일자리 창출 및 청년 유출 방지",
      "혁신 기업 유치로 지역 경쟁력 강화",
    ],
    conArgs: [
      "세수 감소로 다른 공공서비스 예산 부족",
      "감면 혜택이 실제 필요한 기업에 갈지 불확실",
    ],
  },
  {
    id: 14,
    category: "문화",
    categoryIcon: Music,
    question: "공공 문화시설 야간 운영을 확대해야 할까요?",
    description:
      "도서관, 체육관, 문화센터의 운영 시간을 밤 10시까지 연장하는 정책입니다.",
    proArgs: [
      "직장인·학생의 문화생활 접근성 향상",
      "야간 경제 활성화 및 유동인구 증가",
    ],
    conArgs: [
      "추가 인건비 및 관리 비용 발생",
      "심야 소음 등 주변 주민 민원 가능성",
    ],
  },
  {
    id: 15,
    category: "도시계획",
    categoryIcon: Building2,
    question: "노후 아파트 단지를 리모델링 지원해야 할까요?",
    description:
      "준공 30년 이상 노후 아파트의 리모델링 비용을 50%까지 지원하는 정책입니다.",
    proArgs: [
      "재건축보다 빠르고 비용 효율적",
      "주거 환경 개선으로 지역 가치 상승",
    ],
    conArgs: [
      "특정 지역·소유자에게만 혜택 집중",
      "리모델링 효과의 한계 (구조적 문제 해결 불가)",
    ],
  },
];

interface Candidate {
  name: string;
  party: string;
  district: string;
  role: string;
  color: string;
  positions: number[];
  convictionScore: number;
  convictionLabel: string;
}

const candidates: Candidate[] = [
  {
    name: "김태호",
    party: "미래시민당",
    district: "수원시 영통구",
    role: "시장 후보",
    color: "#0052FF",
    positions: [1, 1, 1, -1, 1, 1, -1, 1, 1, -1, 1, 1, -1, 1, 1],
    convictionScore: 87,
    convictionLabel: "매우 일관",
  },
  {
    name: "박서연",
    party: "국민연대",
    district: "수원시 영통구",
    role: "시장 후보",
    color: "#E11D48",
    positions: [-1, 1, 1, 1, -1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1],
    convictionScore: 72,
    convictionLabel: "대체로 일관",
  },
  {
    name: "이준혁",
    party: "녹색미래당",
    district: "수원시 영통구",
    role: "시장 후보",
    color: "#10B981",
    positions: [1, 1, -1, 1, 1, 1, 1, 1, -1, 1, -1, 1, 1, 1, 1],
    convictionScore: 91,
    convictionLabel: "매우 일관",
  },
  {
    name: "최민지",
    party: "진보연합",
    district: "수원시 영통구",
    role: "시장 후보",
    color: "#F59E0B",
    positions: [1, -1, 1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, -1, 1],
    convictionScore: 65,
    convictionLabel: "변동 있음",
  },
  {
    name: "정도현",
    party: "자유한국당",
    district: "수원시 영통구",
    role: "시장 후보",
    color: "#7C3AED",
    positions: [-1, -1, -1, 1, -1, -1, 1, -1, -1, 1, 1, 1, -1, -1, -1],
    convictionScore: 78,
    convictionLabel: "대체로 일관",
  },
  {
    name: "한소율",
    party: "청년당",
    district: "수원시 영통구",
    role: "시장 후보",
    color: "#06B6D4",
    positions: [1, 1, 1, 1, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1],
    convictionScore: 83,
    convictionLabel: "매우 일관",
  },
];

const features = [
  {
    icon: Repeat2,
    title: "스와이프 매칭",
    description:
      "틴더 스타일의 직관적 카드 스와이프로 정책 이슈에 대한 내 입장을 빠르게 표명합니다.",
    color: "#0D9488",
    bg: "#F0FDFA",
  },
  {
    icon: Scale,
    title: "찬반 논거 분석",
    description:
      "각 정책 이슈의 찬성·반대 논거를 균형 있게 제시하여 합리적 판단을 돕습니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: Percent,
    title: "정밀 매칭률",
    description:
      "내 응답과 후보자 입장을 정밀 비교하여 %로 환산된 정확한 매칭률을 제공합니다.",
    color: "#E11D48",
    bg: "#FFF1F2",
  },
  {
    icon: ShieldCheck,
    title: "신뢰도 점수",
    description:
      "후보자의 과거 발언, 의정활동, 입장 변경 이력을 분석해 공약 일관성 점수를 산출합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: MapPin,
    title: "지역 맞춤 이슈",
    description:
      "광역·기초단체별로 실제 쟁점이 되는 지역 이슈를 선별하여 질문을 구성합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: Lock,
    title: "개인정보 보호",
    description:
      "응답 데이터는 기기에만 저장되며 서버에 전송되지 않습니다. 완전한 익명성을 보장합니다.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
];

const steps = [
  {
    step: "01",
    title: "지역구 선택",
    description:
      "투표할 지역구를 선택하면 해당 지역의 핵심 이슈로 질문이 구성됩니다.",
  },
  {
    step: "02",
    title: "스와이프 응답",
    description:
      "15개 정책 카드를 오른쪽(찬성) 또는 왼쪽(반대)으로 스와이프합니다.",
  },
  {
    step: "03",
    title: "AI 분석",
    description:
      "AI가 내 응답과 후보자 입장을 비교하고 일관성 점수를 가중하여 분석합니다.",
  },
  {
    step: "04",
    title: "매칭 결과",
    description:
      "나와 가장 잘 맞는 후보를 매칭률 순으로 확인하고 상세 비교합니다.",
  },
];

const metricsData = [
  {
    value: "5분",
    label: "매칭 완료",
    icon: Hand,
    description: "평균 응답 소요 시간",
  },
  {
    value: "15개",
    label: "정책 이슈",
    icon: Scale,
    description: "지역 맞춤 질문 구성",
  },
  {
    value: "92%",
    label: "정확도",
    icon: Brain,
    description: "유권자 만족도 기반",
  },
  {
    value: "100만+",
    label: "매칭 완료",
    icon: Trophy,
    description: "누적 이용자 수",
  },
];

/* ============================================================
   HELPER COMPONENTS
   ============================================================ */

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

function MatchResults({
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

function SwipeCardDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const agreeOpacity = useTransform(x, [0, 100], [0, 1]);
  const disagreeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleSwipe = useCallback(
    (direction: number) => {
      const newAnswers = [...answers, direction];
      setAnswers(newAnswers);
      setIsFlipped(false);

      if (currentIndex >= policyQuestions.length - 1) {
        setShowResults(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
      x.set(0);
    },
    [answers, currentIndex, x]
  );

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsFlipped(false);
    setShowResults(false);
    x.set(0);
  }, [x]);

  if (showResults) {
    return <MatchResults answers={answers} onReset={handleReset} />;
  }

  const question = policyQuestions[currentIndex];
  const progress = ((currentIndex + 1) / policyQuestions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        <span className="text-sm font-bold text-[var(--text-secondary)] shrink-0">
          {currentIndex + 1}/{policyQuestions.length}
        </span>
      </div>

      {/* Card Stack */}
      <div className="relative h-[380px] w-full max-w-[340px] mx-auto">
        {policyQuestions
          .slice(currentIndex, currentIndex + 3)
          .reverse()
          .map((q, stackIndex) => {
            const visibleCount = Math.min(
              3,
              policyQuestions.length - currentIndex
            );
            const isTop = stackIndex === visibleCount - 1;
            const depth = visibleCount - 1 - stackIndex;

            return (
              <motion.div
                key={q.id}
                className="absolute inset-0 bg-white rounded-3xl border border-[var(--border-light)] shadow-xl overflow-hidden will-change-transform"
                style={{
                  zIndex: stackIndex,
                  scale: 1 - depth * 0.05,
                  y: depth * 12,
                  ...(isTop ? { x, rotate } : {}),
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.8}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 100) {
                    handleSwipe(info.offset.x > 0 ? 1 : -1);
                  }
                }}
                onClick={() => isTop && setIsFlipped(!isFlipped)}
              >
                {/* Agree/Disagree overlays */}
                {isTop && (
                  <>
                    <motion.div
                      style={{ opacity: agreeOpacity }}
                      className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-teal-500 text-white font-bold text-lg -rotate-12 z-10"
                    >
                      찬성
                    </motion.div>
                    <motion.div
                      style={{ opacity: disagreeOpacity }}
                      className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-lg rotate-12 z-10"
                    >
                      반대
                    </motion.div>
                  </>
                )}

                {/* Card content */}
                <div className="h-full p-6 flex flex-col" style={{ perspective: 1000 }}>
                  <AnimatePresence mode="wait">
                    {!isFlipped || !isTop ? (
                      <motion.div
                        key="front"
                        initial={{ rotateY: 0 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                            <q.categoryIcon className="w-4 h-4 text-teal-600" />
                          </div>
                          <span className="text-sm font-bold text-teal-600">
                            {q.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] leading-snug mb-4">
                          {q.question}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                          {q.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] mt-4">
                          <Info className="w-3.5 h-3.5" />
                          <span className="text-xs">탭하여 찬반 논거 보기</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ rotateY: -90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <Scale className="w-5 h-5 text-teal-600" />
                          <span className="text-sm font-bold text-teal-600">
                            찬반 논거
                          </span>
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <ThumbsUp className="w-4 h-4 text-teal-500" />
                              <span className="text-sm font-bold text-teal-600">
                                찬성 논거
                              </span>
                            </div>
                            {q.proArgs.map((arg) => (
                              <p
                                key={arg}
                                className="text-xs text-[var(--text-secondary)] leading-relaxed mb-1.5 pl-5"
                              >
                                • {arg}
                              </p>
                            ))}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <ThumbsDown className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-bold text-red-500">
                                반대 논거
                              </span>
                            </div>
                            {q.conArgs.map((arg) => (
                              <p
                                key={arg}
                                className="text-xs text-[var(--text-secondary)] leading-relaxed mb-1.5 pl-5"
                              >
                                • {arg}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] mt-4">
                          <Info className="w-3.5 h-3.5" />
                          <span className="text-xs">탭하여 질문으로 돌아가기</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Swipe Buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={() => handleSwipe(-1)}
          className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors"
        >
          <ThumbsDown className="w-6 h-6 text-red-500" />
        </button>
        <button
          onClick={() => handleSwipe(1)}
          className="w-14 h-14 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center hover:bg-teal-100 transition-colors"
        >
          <ThumbsUp className="w-6 h-6 text-teal-500" />
        </button>
      </div>

      <p className="text-center text-xs text-[var(--text-tertiary)]">
        카드를 좌우로 드래그하거나 버튼을 눌러 응답하세요
      </p>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function PolicyMatchPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-[72px]">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50/40 to-white" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-500/8 to-transparent rounded-full blur-[60px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn delay={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-400/10 border border-teal-200/60 mb-8">
                    <Repeat2 className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-semibold text-teal-700">
                      Policy Swipe Match
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1
                    className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-[var(--text-primary)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    스와이프로
                    <br />
                    <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                      나의 후보를 찾다
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
                    15개 지역 정책 이슈에 스와이프로 답하면, AI가 나와 가장
                    잘 맞는 후보를 찾아줍니다. 후보의 공약 일관성 점수까지
                    한눈에 확인하세요.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="#demo"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-teal-500/25 transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5"
                    >
                      지금 매칭 시작
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="#features"
                      className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-[var(--border)] text-[var(--text-primary)] font-semibold rounded-2xl hover:bg-[var(--surface)] transition-[transform,box-shadow,background-color] duration-200"
                    >
                      기능 살펴보기
                    </Link>
                  </div>
                </FadeIn>
              </div>

              {/* Right — Static card preview */}
              <FadeIn delay={0.3} direction="left">
                <div className="relative">
                  <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border-light)] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          정책 매칭 미리보기
                        </h3>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          수원시 영통구 · 6명 후보
                        </p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold">
                        15개 이슈
                      </div>
                    </div>

                    {/* Mini cards stack preview */}
                    <div className="relative h-[200px]">
                      {[2, 1, 0].map((depth) => (
                        <div
                          key={depth}
                          className="absolute inset-x-0 bg-white rounded-2xl border border-[var(--border-light)] p-4"
                          style={{
                            top: depth * 10,
                            transform: `scale(${1 - depth * 0.04})`,
                            zIndex: 3 - depth,
                            opacity: 1 - depth * 0.2,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-md bg-teal-50 flex items-center justify-center">
                              <Bus className="w-3 h-3 text-teal-600" />
                            </div>
                            <span className="text-xs font-bold text-teal-600">
                              교통
                            </span>
                          </div>
                          <p className="text-sm font-bold text-[var(--text-primary)]">
                            대중교통 무료 환승 구간을 확대해야 할까요?
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Mini result bar */}
                    <div className="bg-[var(--surface)] rounded-xl p-3 space-y-2">
                      <p className="text-[10px] font-bold text-[var(--text-secondary)]">
                        매칭 예시
                      </p>
                      {candidates.slice(0, 3).map((c) => (
                        <div key={c.name} className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full text-white text-[8px] font-bold flex items-center justify-center"
                            style={{ backgroundColor: c.color }}
                          >
                            {c.name[0]}
                          </div>
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full"
                              style={{
                                backgroundColor: c.color,
                                width: `${60 + Math.random() * 30}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-[var(--border-light)] p-3 flex items-center gap-2"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-primary)]">
                        5분 완료
                      </p>
                      <p className="text-[9px] text-[var(--text-tertiary)]">
                        스와이프 매칭
                      </p>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 lg:py-32 bg-white relative"
        >
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-teal-600 tracking-wider uppercase mb-4">
                  Core Features
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  정치를 쉽게, 매칭을 정확하게
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  직관적인 스와이프 UX와 AI 분석이 만나 가장 정확한 후보 매칭을 제공합니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <FadeIn key={feature.title} delay={i * 0.04}>
                  <div className="group bg-white rounded-2xl border border-[var(--border-light)] p-7 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: feature.bg }}
                    >
                      <feature.icon
                        className="w-6 h-6"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 lg:py-32 bg-[var(--surface)] relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-teal-600 tracking-wider uppercase mb-4">
                  How It Works
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4단계로 나의 후보를 찾으세요
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.06}>
                  <div className="relative bg-white rounded-2xl border border-[var(--border-light)] p-7 text-center">
                    <div
                      className="text-4xl font-extrabold bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                    {i < steps.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 w-6 h-6 text-[var(--text-tertiary)] -translate-y-1/2" />
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section id="demo" className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="right">
                <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border-light)] p-6 lg:p-8">
                  <SwipeCardDemo />
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="lg:sticky lg:top-32">
                  <span className="inline-block text-sm font-bold text-teal-600 tracking-wider uppercase mb-4">
                    Interactive Demo
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    직접 스와이프로
                    <br />
                    체험해보세요
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    15개 지역 정책 이슈에 대해 스와이프로 답하면 AI가 나와
                    가장 잘 맞는 후보를 찾아줍니다. 카드를 탭하면 찬반 논거를
                    확인할 수 있습니다.
                  </p>

                  <div className="space-y-5">
                    {[
                      {
                        icon: Hand,
                        title: "오른쪽 스와이프 = 찬성",
                        desc: "정책에 찬성하면 오른쪽으로 밀어주세요",
                      },
                      {
                        icon: ThumbsDown,
                        title: "왼쪽 스와이프 = 반대",
                        desc: "정책에 반대하면 왼쪽으로 밀어주세요",
                      },
                      {
                        icon: Info,
                        title: "카드 탭 = 논거 보기",
                        desc: "판단이 어려우면 카드를 눌러 찬반 논거를 확인하세요",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--text-primary)]">
                            {item.title}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Conviction Score Explainer */}
        <section className="py-24 lg:py-32 bg-[var(--surface)] relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block text-sm font-bold text-teal-600 tracking-wider uppercase mb-4">
                    Conviction Score
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    공약만 보지 마세요
                    <br />
                    <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
                      일관성을 확인하세요
                    </span>
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    후보가 이번 선거에서 한 공약만이 아니라, 과거 발언·의정활동·입장
                    변경 이력을 AI가 분석하여 공약 일관성 점수(Conviction
                    Score)를 산출합니다. 5년간 같은 입장을 유지한 후보가 최근
                    입장을 바꾼 후보보다 높은 점수를 받습니다.
                  </p>
                  <div className="space-y-3">
                    {[
                      "과거 의정활동 기록과 현재 공약 비교 분석",
                      "공개 발언 및 인터뷰 일관성 추적",
                      "입장 변경 시점과 맥락까지 고려한 정밀 평가",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="bg-white rounded-3xl border border-[var(--border-light)] p-6 space-y-4">
                  <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
                    신뢰도 점수 예시
                  </p>
                  {candidates.slice(0, 4).map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[var(--surface)]"
                    >
                      <div
                        className="w-10 h-10 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          {c.name}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)]">
                          {c.party}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{
                            backgroundColor:
                              c.convictionScore >= 80
                                ? "#ECFDF5"
                                : c.convictionScore >= 60
                                ? "#FFFBEB"
                                : "#FEF2F2",
                            color:
                              c.convictionScore >= 80
                                ? "#10B981"
                                : c.convictionScore >= 60
                                ? "#F59E0B"
                                : "#EF4444",
                          }}
                        >
                          {c.convictionLabel}
                        </span>
                        <ConvictionRing score={c.convictionScore} />
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-[#0B1222] to-[#1a2744] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[80px]" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-sm font-bold text-teal-400 tracking-wider uppercase mb-4">
                  Performance Metrics
                </span>
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  데이터로 증명하는 매칭 성과
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  정책 스와이프 매칭의 실제 성능 지표입니다.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.05}>
                  <div className="bg-white/5 bg-white/[0.03] border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-[transform,box-shadow,background-color] duration-200">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center mx-auto mb-5">
                      <metric.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div
                      className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {metric.value}
                    </div>
                    <p className="text-white font-semibold mb-1">
                      {metric.label}
                    </p>
                    <p className="text-sm text-white/40">
                      {metric.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-400" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                스와이프 한 번으로 나의 후보를 찾으세요
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                5분이면 충분합니다. 지금 바로 정책 매칭을 시작하고 나와 가장 잘 맞는 후보를 확인해보세요.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#demo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 font-bold rounded-2xl hover:shadow-xl transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5"
                >
                  매칭 시작하기
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 bg-white/[0.03] border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-[transform,box-shadow,background-color] duration-200"
                >
                  도입 문의
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

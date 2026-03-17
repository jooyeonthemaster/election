import {
  Radio,
  GitCompare,
  BarChart3,
  FileText,
  Bell,
  Search,
  Eye,
  Clock,
} from "lucide-react";

export const features = [
  {
    icon: Radio,
    title: "실시간 미디어 모니터링",
    description:
      "뉴스, SNS, 방송, 온라인 커뮤니티까지 24시간 자동 모니터링하여 경쟁 후보의 모든 활동을 추적합니다.",
    color: "#6366F1",
    bg: "#EEF2FF",
  },
  {
    icon: GitCompare,
    title: "공약 비교 분석",
    description:
      "경쟁 후보와 우리 후보의 공약을 자동으로 비교 분석하여 차별화 포인트와 보완 영역을 제시합니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: BarChart3,
    title: "여론 반응 비교",
    description:
      "각 후보에 대한 유권자의 반응을 실시간으로 비교하여 상대적 강점과 약점을 분석합니다.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
  {
    icon: FileText,
    title: "자동 비교 리포트",
    description:
      "매일 자동으로 경쟁 후보 비교 리포트를 생성하여 캠프의 신속한 대응을 지원합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: Bell,
    title: "전략 변화 감지",
    description:
      "경쟁 후보의 전략 변화를 30분 이내에 감지하고 즉시 알림을 전송하여 빠른 대응을 가능하게 합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: Search,
    title: "약점/기회 분석",
    description:
      "경쟁 후보의 약점과 우리에게 주어진 기회를 AI가 자동으로 분석하여 공격/방어 전략을 제안합니다.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
];

export const steps = [
  {
    step: "01",
    title: "데이터 수집",
    description: "뉴스, SNS, 방송 등 전 채널에서 경쟁 후보 관련 데이터를 24시간 자동 수집합니다.",
  },
  {
    step: "02",
    title: "AI 비교 분석",
    description: "수집된 데이터를 AI가 분석하여 공약, 여론, 전략을 다각도로 비교합니다.",
  },
  {
    step: "03",
    title: "인사이트 도출",
    description: "경쟁 후보의 약점, 전략 변화, 기회 요인 등 핵심 인사이트를 자동 도출합니다.",
  },
  {
    step: "04",
    title: "알림 & 대응",
    description: "중요 변화 감지 시 즉시 알림을 보내고 AI 기반 대응 전략을 제안합니다.",
  },
];

export const metrics = [
  { value: "24/7", label: "실시간 모니터링", icon: Radio, description: "전 채널 자동 추적" },
  { value: "100%", label: "활동 추적", icon: Eye, description: "경쟁 후보 활동 커버리지" },
  { value: "일 1회", label: "자동 리포트", icon: FileText, description: "비교 분석 리포트 생성" },
  { value: "30분", label: "변화 감지", icon: Clock, description: "전략 변화 감지 시간" },
];

export const competitors = [
  {
    name: "후보 A (우리)",
    approval: 47,
    trend: "up",
    color: "#0052FF",
    issues: [
      { name: "경제", score: 82 },
      { name: "복지", score: 75 },
      { name: "교육", score: 68 },
    ],
  },
  {
    name: "후보 B",
    approval: 38,
    trend: "down",
    color: "#94A3B8",
    issues: [
      { name: "경제", score: 65 },
      { name: "복지", score: 71 },
      { name: "교육", score: 79 },
    ],
  },
  {
    name: "후보 C",
    approval: 15,
    trend: "down",
    color: "#CBD5E1",
    issues: [
      { name: "경제", score: 42 },
      { name: "복지", score: 55 },
      { name: "교육", score: 48 },
    ],
  },
];

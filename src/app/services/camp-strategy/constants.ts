import {
  MapPin,
  BarChart3,
  Calendar,
  Route,
  Shield,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  Flag,
} from "lucide-react";

export const features = [
  {
    icon: MapPin,
    title: "지역구 맞춤 전략",
    description:
      "지역구의 인구통계, 산업구조, 과거 투표 성향을 종합 분석하여 최적의 맞춤 전략을 수립합니다.",
    color: "#E11D48",
    bg: "#FFF1F2",
  },
  {
    icon: BarChart3,
    title: "과거 선거 패턴 분석",
    description:
      "20년간의 역대 선거 결과를 분석하여 지역구별 당선 패턴과 유권자 이동 추세를 파악합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: Calendar,
    title: "일정 최적화",
    description:
      "선거 운동 기간의 모든 일정을 AI가 최적화하여 효율적인 시간 배분과 핵심 활동을 추천합니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: Route,
    title: "유세 동선 설계",
    description:
      "유동인구, 핵심 거점, 교통 동선을 분석하여 최대 효과를 내는 유세 경로를 자동 설계합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: Shield,
    title: "이슈 대응 전략",
    description:
      "돌발 이슈 발생 시 실시간으로 대응 전략과 메시지를 생성하여 위기 상황에 즉각 대처합니다.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    icon: MessageSquare,
    title: "메시지 프레이밍",
    description:
      "지역별, 세대별 유권자에게 최적화된 핵심 메시지와 표현 방식을 AI가 자동으로 제안합니다.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
];

export const steps = [
  {
    step: "01",
    title: "지역구 분석",
    description: "인구통계, 과거 선거, 지역 이슈 등 지역구의 모든 데이터를 수집하고 분석합니다.",
  },
  {
    step: "02",
    title: "전략 수립",
    description: "AI가 데이터를 기반으로 지역구에 최적화된 종합 선거 전략을 수립합니다.",
  },
  {
    step: "03",
    title: "실행 계획",
    description: "일정, 동선, 메시지를 포함한 구체적인 실행 계획과 타임라인을 생성합니다.",
  },
  {
    step: "04",
    title: "모니터링 & 조정",
    description: "실시간 데이터를 기반으로 전략 효과를 측정하고 즉각적으로 조정합니다.",
  },
];

export const metrics = [
  { value: "120+", label: "전략 제안", icon: Lightbulb, description: "맞춤 전략 자동 제안" },
  { value: "243개", label: "지역구 분석", icon: MapPin, description: "전국 지역구 맞춤 분석" },
  { value: "실시간", label: "당선 확률", icon: TrendingUp, description: "시뮬레이션 기반 예측" },
  { value: "매주", label: "AI 브리핑", icon: Flag, description: "전략 브리핑 자동 제공" },
];

export const swotData = [
  { type: "S", label: "강점", items: ["현직 인지도 우위", "지역 경제 성장 실적"], color: "#0052FF", bg: "#E8F0FF" },
  { type: "W", label: "약점", items: ["청년층 지지율 부족", "SNS 활동 미흡"], color: "#EF4444", bg: "#FEF2F2" },
  { type: "O", label: "기회", items: ["상대 후보 이미지 하락", "교통 인프라 이슈 부각"], color: "#10B981", bg: "#ECFDF5" },
  { type: "T", label: "위협", items: ["야당 단일화 가능성", "경기 침체 여론 악화"], color: "#F59E0B", bg: "#FFFBEB" },
];

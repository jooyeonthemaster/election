import {
  PieChart,
  Layers,
  Brain,
  MessageCircle,
  UserX,
  Target,
  Fingerprint,
} from "lucide-react";

export const features = [
  {
    icon: PieChart,
    title: "인구통계 분석",
    description:
      "연령, 성별, 직업, 소득 수준 등 다차원 인구통계 데이터를 분석하여 유권자 구성을 정밀하게 파악합니다.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
  {
    icon: Layers,
    title: "관심사 클러스터링",
    description:
      "유권자의 온라인 활동, 검색 트렌드, SNS 반응을 분석하여 관심사별 그룹을 자동으로 분류합니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: Brain,
    title: "투표 성향 예측",
    description:
      "과거 투표 데이터와 현재 여론을 결합하여 세그먼트별 투표 참여율과 지지 성향을 예측합니다.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: MessageCircle,
    title: "세대별 메시지 전략",
    description:
      "MZ세대부터 시니어 세대까지, 각 세대의 소통 방식과 관심사에 맞는 최적의 메시지를 설계합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: UserX,
    title: "이탈 유권자 분석",
    description:
      "기존 지지층 중 이탈 위험이 있는 유권자를 조기에 식별하고 맞춤형 재유입 전략을 제시합니다.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    icon: Target,
    title: "부동층 공략 전략",
    description:
      "아직 지지 후보를 정하지 않은 부동층의 특성을 분석하고 효과적인 설득 전략을 수립합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

export const steps = [
  {
    step: "01",
    title: "데이터 통합",
    description: "인구통계, SNS, 검색 트렌드, 과거 투표 데이터를 통합하여 유권자 프로파일을 구축합니다.",
  },
  {
    step: "02",
    title: "세그먼트 분류",
    description: "AI가 32개 세그먼트로 유권자를 자동 분류하고 각 그룹의 특성을 정밀 분석합니다.",
  },
  {
    step: "03",
    title: "인사이트 도출",
    description: "세그먼트별 핵심 니즈, 투표 성향, 이탈 위험도 등 전략적 인사이트를 도출합니다.",
  },
  {
    step: "04",
    title: "맞춤 전략 실행",
    description: "세그먼트별 최적의 메시지와 채널 전략을 자동 생성하여 정밀 타겟팅을 지원합니다.",
  },
];

export const metrics = [
  { value: "32개", label: "유권자 세그먼트", icon: Layers, description: "정밀 세그먼트 분류" },
  { value: "91%", label: "프로파일 정확도", icon: Fingerprint, description: "AI 유권자 분석 기준" },
  { value: "자동", label: "맞춤 메시지 생성", icon: MessageCircle, description: "세그먼트별 최적화" },
  { value: "87%", label: "부동층 식별", icon: Target, description: "부동층 분류 정확도" },
];

export const personas = [
  {
    name: "30대 직장인 남성",
    segment: "교통/주거 관심층",
    issues: ["출퇴근 교통", "주거 안정", "직장 환경"],
    support: 62,
    swing: false,
    color: "#0EA5E9",
  },
  {
    name: "20대 대학생 여성",
    segment: "일자리/복지 관심층",
    issues: ["청년 일자리", "등록금", "안전"],
    support: 45,
    swing: true,
    color: "#F59E0B",
  },
  {
    name: "60대 자영업자",
    segment: "경제/복지 관심층",
    issues: ["소상공인 지원", "의료비", "연금"],
    support: 71,
    swing: false,
    color: "#10B981",
  },
];

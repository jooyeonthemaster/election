import {
  Palette,
  BarChart3,
  Code,
  Globe,
  PieChart,
  Shield,
  Newspaper,
  Users,
  Activity,
  TrendingUp,
} from "lucide-react";

/* ============================================================
   TYPES
   ============================================================ */

export interface MediaPartner {
  name: string;
  abbr: string;
  color: string;
  bgColor: string;
  tier: "Basic" | "Pro" | "Enterprise";
  readers: string;
  articles: number;
  region: string;
}

/* ============================================================
   MOCK DATA
   ============================================================ */

export const mediaPartners: MediaPartner[] = [
  {
    name: "경기일보",
    abbr: "경기",
    color: "#1E40AF",
    bgColor: "bg-blue-100",
    tier: "Enterprise",
    readers: "180만",
    articles: 4200,
    region: "경기도",
  },
  {
    name: "부산일보",
    abbr: "부산",
    color: "#DC2626",
    bgColor: "bg-red-100",
    tier: "Pro",
    readers: "120만",
    articles: 3800,
    region: "부산",
  },
  {
    name: "매일경제",
    abbr: "매경",
    color: "#0B1222",
    bgColor: "bg-gray-100",
    tier: "Enterprise",
    readers: "350만",
    articles: 8500,
    region: "전국",
  },
  {
    name: "한국일보",
    abbr: "한국",
    color: "#2563EB",
    bgColor: "bg-blue-100",
    tier: "Pro",
    readers: "200만",
    articles: 5200,
    region: "전국",
  },
  {
    name: "강원일보",
    abbr: "강원",
    color: "#059669",
    bgColor: "bg-emerald-100",
    tier: "Basic",
    readers: "45만",
    articles: 1200,
    region: "강원도",
  },
  {
    name: "전남일보",
    abbr: "전남",
    color: "#7C3AED",
    bgColor: "bg-violet-100",
    tier: "Basic",
    readers: "38만",
    articles: 980,
    region: "전라남도",
  },
];

export const features = [
  {
    icon: Palette,
    title: "완전 화이트라벨",
    description:
      "로고, 컬러, 폰트를 언론사 브랜드에 맞게 완전히 커스터마이징합니다. 독자는 언론사 자체 서비스로 인식합니다.",
    color: "#EA580C",
    bg: "#FFF7ED",
  },
  {
    icon: Code,
    title: "간편 임베드",
    description:
      "iframe 한 줄로 기존 뉴스 기사에 즉시 삽입 가능합니다. 개발 리소스 없이 빠르게 배포합니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: BarChart3,
    title: "실시간 분석",
    description:
      "독자 참여율, 완료율, 인기 이슈를 실시간 대시보드에서 확인합니다. 콘텐츠 전략에 활용하세요.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: Globe,
    title: "네트워크 효과",
    description:
      "전국 언론사 파트너 네트워크를 통해 후보 데이터를 교차 검증하고 커버리지를 극대화합니다.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: PieChart,
    title: "독자 인사이트",
    description:
      "독자의 정책 성향 통계를 익명 집계하여 뉴스룸의 편집 방향 설정에 데이터를 제공합니다.",
    color: "#E11D48",
    bg: "#FFF1F2",
  },
  {
    icon: Shield,
    title: "엔터프라이즈 보안",
    description:
      "SOC2 인증, ISMS 기준을 충족하는 보안 인프라로 언론사와 독자 데이터를 안전하게 보호합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "파트너 등록",
    description:
      "언론사 정보와 브랜드 가이드라인을 등록하면 전담 매니저가 배정됩니다.",
  },
  {
    step: "02",
    title: "브랜드 설정",
    description:
      "로고, 컬러, 질문을 언론사 브랜드와 지역 이슈에 맞게 커스터마이징합니다.",
  },
  {
    step: "03",
    title: "위젯 배포",
    description:
      "임베드 코드 한 줄로 뉴스 사이트에 즉시 배포합니다. 모바일 최적화 완료.",
  },
  {
    step: "04",
    title: "분석 & 최적화",
    description:
      "실시간 대시보드로 성과를 모니터링하고 AI가 질문과 UX를 자동 최적화합니다.",
  },
];

export const metricsData = [
  {
    value: "12+",
    label: "언론사 파트너",
    icon: Newspaper,
    description: "전국 주요 언론사 제휴",
  },
  {
    value: "900만",
    label: "독자 도달",
    icon: Users,
    description: "파트너 네트워크 총 독자",
  },
  {
    value: "99.9%",
    label: "가동률",
    icon: Activity,
    description: "SLA 기반 안정 운영",
  },
  {
    value: "4.8x",
    label: "참여율",
    icon: TrendingUp,
    description: "일반 기사 대비 체류 시간",
  },
];

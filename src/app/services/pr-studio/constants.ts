import {
  Image,
  LayoutGrid,
  Share2,
  Flag,
  FlaskConical,
  ShieldCheck,
  Clock,
  Layers,
} from "lucide-react";

export const features = [
  {
    icon: Image,
    title: "포스터 자동 생성",
    description:
      "후보 사진, 슬로건, 공약을 입력하면 AI가 전문 디자이너 수준의 선거 포스터를 자동으로 생성합니다.",
    color: "#D946EF",
    bg: "#FDF4FF",
  },
  {
    icon: LayoutGrid,
    title: "카드뉴스 제작",
    description:
      "공약, 활동 보고 등의 콘텐츠를 카드뉴스 형태로 자동 변환하여 SNS에 최적화된 콘텐츠를 만듭니다.",
    color: "#0052FF",
    bg: "#E8F0FF",
  },
  {
    icon: Share2,
    title: "SNS 콘텐츠 최적화",
    description:
      "플랫폼별 최적 사이즈, 해시태그, 게시 시간까지 AI가 분석하여 최대 도달률을 달성합니다.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
  {
    icon: Flag,
    title: "현수막 디자인",
    description:
      "설치 위치와 크기에 맞는 현수막을 자동 디자인하고 가독성과 시인성을 최적화합니다.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: FlaskConical,
    title: "A/B 테스트",
    description:
      "여러 디자인 시안을 동시에 테스트하여 유권자 반응이 가장 좋은 디자인을 데이터로 선정합니다.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: ShieldCheck,
    title: "선관위 규정 자동 검증",
    description:
      "제작된 모든 홍보물이 선거관리위원회 규정에 부합하는지 AI가 자동으로 검증하여 법적 리스크를 제거합니다.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
];

export const steps = [
  {
    step: "01",
    title: "콘텐츠 입력",
    description: "후보 정보, 공약, 슬로건 등 홍보물에 들어갈 콘텐츠를 입력합니다.",
  },
  {
    step: "02",
    title: "AI 디자인",
    description: "AI가 입력된 콘텐츠를 기반으로 다양한 디자인 시안을 3초 만에 생성합니다.",
  },
  {
    step: "03",
    title: "규정 검증",
    description: "선관위 규정 자동 검증을 통해 법적 리스크 없는 홍보물을 보장합니다.",
  },
  {
    step: "04",
    title: "최적화 & 배포",
    description: "A/B 테스트와 플랫폼별 최적화를 거쳐 최종 홍보물을 배포합니다.",
  },
];

export const metrics = [
  { value: "3초", label: "생성 속도", icon: Clock, description: "AI 디자인 생성 시간" },
  { value: "500+", label: "템플릿", icon: Layers, description: "전문 디자인 템플릿" },
  { value: "35%", label: "성과 향상", icon: FlaskConical, description: "A/B 테스트 기반 개선" },
  { value: "100%", label: "규정 검증", icon: ShieldCheck, description: "선관위 규정 자동 체크" },
];

export const templateCategories = [
  { name: "포스터", count: 120, color: "#D946EF" },
  { name: "카드뉴스", count: 85, color: "#0052FF" },
  { name: "SNS 배너", count: 150, color: "#0EA5E9" },
  { name: "현수막", count: 60, color: "#10B981" },
  { name: "명함", count: 45, color: "#F59E0B" },
  { name: "전단지", count: 40, color: "#EF4444" },
];

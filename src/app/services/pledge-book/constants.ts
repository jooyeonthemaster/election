import {
  Wand2,
  BarChart3,
  Moon,
  Share2,
  Eye,
  Smartphone,
  Clock,
  TrendingUp,
  Zap,
  Users,
} from "lucide-react";

/* ─── Before / After comparison data ─── */

export const beforeAfter = {
  before: {
    title: "기존 PDF 공약집",
    items: [
      { text: "단방향 정보 전달", bad: true },
      { text: "낮은 조회율 (평균 30초)", bad: true },
      { text: "SNS 공유 어려움", bad: true },
      { text: "디자인 외주 비용 높음", bad: true },
      { text: "수정 시 재인쇄 필요", bad: true },
      { text: "접근성 제한적", bad: true },
    ],
  },
  after: {
    title: "인터랙티브 공약집",
    items: [
      { text: "양방향 유권자 참여", bad: false },
      { text: "높은 참여율 (평균 4.2분)", bad: false },
      { text: "SNS 공유 최적화", bad: false },
      { text: "AI 자동 디자인", bad: false },
      { text: "실시간 업데이트 가능", bad: false },
      { text: "모든 기기에서 접근 가능", bad: false },
    ],
  },
};

/* ─── Template options ─── */

export const templates = [
  {
    name: "클래식",
    desc: "깔끔한 카드형 레이아웃",
    color: "#0052FF",
    accent: "#E8F0FF",
    layout: "cards",
  },
  {
    name: "모던",
    desc: "풀스크린 스크롤형",
    color: "#7C3AED",
    accent: "#EDE9FE",
    layout: "scroll",
  },
  {
    name: "매거진",
    desc: "잡지 스타일 레이아웃",
    color: "#059669",
    accent: "#ECFDF5",
    layout: "magazine",
  },
  {
    name: "인포그래픽",
    desc: "데이터 시각화 중심",
    color: "#DC2626",
    accent: "#FEF2F2",
    layout: "infographic",
  },
];

/* ─── Key features ─── */

export const features = [
  {
    icon: Wand2,
    title: "AI 자동 디자인",
    desc: "공약 내용을 입력하면 AI가 최적의 레이아웃과 색상 배합을 제안합니다. 디자인 전문가 없이도 전문적인 공약집을 제작할 수 있습니다.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: BarChart3,
    title: "인터랙티브 차트",
    desc: "예산 배분, 실행 계획, 달성률 등을 인터랙티브 차트로 시각화합니다. 유권자가 직접 탐색하며 공약을 이해할 수 있습니다.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Moon,
    title: "다크모드 지원",
    desc: "밝은/어두운 테마를 자동으로 전환합니다. 사용자 환경에 맞는 최적의 가독성을 제공하여 모든 환경에서 편안한 열람이 가능합니다.",
    gradient: "from-slate-600 to-slate-400",
  },
  {
    icon: Share2,
    title: "SNS 공유 최적화",
    desc: "카카오톡, 인스타그램, 페이스북 공유 시 최적화된 미리보기를 자동 생성합니다. Open Graph 태그 자동 설정으로 공유가 간편합니다.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Eye,
    title: "유권자 반응 추적",
    desc: "어떤 공약에 유권자의 관심이 높은지 실시간으로 분석합니다. 조회수, 체류시간, 관심 표시 데이터를 대시보드에서 확인하세요.",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    desc: "모바일, 태블릿, 데스크톱에서 완벽하게 동작합니다. 기기에 따라 레이아웃이 자동 최적화되어 어디서든 최고의 경험을 제공합니다.",
    gradient: "from-rose-500 to-pink-400",
  },
];

/* ─── Pledge data ─── */

export const pledgeCategories = ["교육", "복지", "경제", "환경", "교통"];

export const pledgeCards = [
  {
    title: "무상 교복 지원 확대",
    desc: "관내 모든 중·고등학교 학생에게 연 1회 교복 구매비를 지원합니다.",
    budget: "12억원",
    timeline: "2027.03 ~ 2030.06",
    progress: 0,
    likes: 1247,
  },
  {
    title: "학교 돌봄교실 24시 운영",
    desc: "맞벌이 가정을 위해 초등학교 돌봄교실을 야간까지 확대 운영합니다.",
    budget: "28억원",
    timeline: "2027.06 ~ 2030.12",
    progress: 0,
    likes: 982,
  },
  {
    title: "AI 교육 특구 조성",
    desc: "관내 학교에 AI 교육 인프라를 구축하고 전문 강사를 배치합니다.",
    budget: "45억원",
    timeline: "2027.09 ~ 2030.06",
    progress: 0,
    likes: 2156,
  },
];

/* ─── Color swatches for customization ─── */

export const colorSwatches = [
  { name: "블루", color: "#0052FF", light: "#E8F0FF" },
  { name: "바이올렛", color: "#7C3AED", light: "#EDE9FE" },
  { name: "에메랄드", color: "#059669", light: "#ECFDF5" },
  { name: "로즈", color: "#E11D48", light: "#FFF1F2" },
  { name: "앰버", color: "#D97706", light: "#FFFBEB" },
  { name: "슬레이트", color: "#475569", light: "#F8FAFC" },
];

/* ─── Metrics ─── */

export const metrics = [
  {
    value: "4.2",
    unit: "분",
    label: "평균 체류시간",
    sub: "PDF 대비 8배",
    icon: Clock,
  },
  {
    value: "340",
    unit: "%",
    label: "SNS 공유율 증가",
    sub: "기존 대비",
    icon: TrendingUp,
  },
  {
    value: "80",
    unit: "%",
    label: "제작 시간 단축",
    sub: "AI 자동 디자인",
    icon: Zap,
  },
  {
    value: "96",
    unit: "%",
    label: "유권자 만족도",
    sub: "공약 전달력",
    icon: Users,
  },
];

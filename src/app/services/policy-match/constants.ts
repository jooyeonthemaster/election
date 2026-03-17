import {
  Repeat2,
  Scale,
  Percent,
  ShieldCheck,
  MapPin,
  Lock,
  Hand,
  Brain,
  Trophy,
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
import type { PolicyQuestion, Candidate, Feature, Step, Metric } from "./types";

export const policyQuestions: PolicyQuestion[] = [
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

export const candidates: Candidate[] = [
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

export const features: Feature[] = [
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

export const steps: Step[] = [
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

export const metricsData: Metric[] = [
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

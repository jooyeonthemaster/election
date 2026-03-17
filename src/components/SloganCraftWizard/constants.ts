import { Database, Users, Target, Brain, BarChart3, Zap } from "lucide-react";
import type { SloganScores } from "./types";

export const TARGETS = [
  "2030 청년", "학부모", "직장인/통근자", "시니어(65+)",
  "자영업자", "다문화가정", "1인가구", "신혼부부",
];

export const VOTER_DATA: Record<string, {
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

export const TONES = [
  { id: "혁신·변화", label: "혁신·변화", desc: "미래지향적, 새로운 시작", color: "from-violet-500 to-purple-400" },
  { id: "신뢰·안정", label: "신뢰·안정", desc: "검증된 리더십, 든든한 행정", color: "from-blue-500 to-cyan-400" },
  { id: "공감·소통", label: "공감·소통", desc: "주민과 함께, 따뜻한 행정", color: "from-emerald-500 to-teal-400" },
  { id: "실용·성과", label: "실용·성과", desc: "확실한 결과, 실질적 변화", color: "from-amber-500 to-orange-400" },
];

export const PURPOSES = [
  "메인 캠페인 슬로건",
  "SNS·온라인 전용",
  "벽보·현수막용",
  "연령대별 맞춤형",
  "이슈 대응형",
];

export const STEP_NAMES = ["전략 설정", "슬로건 생성", "상세 정제", "전략 패키지"];

export const SCORE_LABELS: Record<keyof SloganScores, string> = {
  memorability: "기억성",
  voterResonance: "유권자 공명",
  differentiation: "차별성",
  authenticity: "진정성",
  versatility: "활용도",
  legalSafety: "법적 안전성",
};

export const SLOGAN_PHASES = [
  { icon: Database, label: "후보·지역 프로필 로드", desc: "네안데르 후보 · 강남구 · 국민의힘 맥락 분석" },
  { icon: Users, label: "타겟 유권자 심리 분석", desc: "선택된 세그먼트의 핵심 가치관·투표 동기 매핑" },
  { icon: Target, label: "경쟁 후보 차별화 분석", desc: "야당 메시지 패턴 대비 포지셔닝 전략 수립" },
  { icon: Brain, label: "언어 패턴 최적화", desc: "기억성·호소력·진정성 균형 언어 설계" },
  { icon: BarChart3, label: "6축 평가 시뮬레이션", desc: "다차원 슬로건 품질 스코어링" },
  { icon: Zap, label: "맥락별 변주 생성", desc: "SNS·포스터·연령대별 최적 변형 도출" },
];

export const QUICK_REFINE = ["더 짧게", "더 강하게", "젊게", "격식있게", "차별화 강조"];

export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

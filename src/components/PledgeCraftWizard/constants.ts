import {
  Train,
  GraduationCap,
  Home,
  Leaf,
  HeartHandshake,
  Briefcase,
  Palette,
  ShieldCheck,
  Database,
  Users,
  TrendingUp,
  Brain,
  BarChart3,
  Zap,
} from "lucide-react";
import type { Scores } from "./types";

export const CATEGORIES = [
  { id: "교통/인프라", icon: Train, stat: "일 20만+ 강남역 이용객", color: "from-blue-500 to-cyan-400" },
  { id: "교육", icon: GraduationCap, stat: "대치동 사교육 특구", color: "from-violet-500 to-purple-400" },
  { id: "주거/재건축", icon: Home, stat: "2025 가격상승 13.12%", color: "from-rose-500 to-pink-400" },
  { id: "환경", icon: Leaf, stat: "2034 탄소중립 55% 감축", color: "from-emerald-500 to-teal-400" },
  { id: "복지/돌봄", icon: HeartHandshake, stat: "고령화 가속·돌봄 수요↑", color: "from-amber-500 to-orange-400" },
  { id: "경제/일자리", icon: Briefcase, stat: "테헤란로 스타트업 밸리", color: "from-indigo-500 to-blue-400" },
  { id: "문화/관광", icon: Palette, stat: "코엑스·K-의료관광 허브", color: "from-fuchsia-500 to-pink-400" },
  { id: "안전/치안", icon: ShieldCheck, stat: "스마트 CCTV 확대 요구", color: "from-sky-500 to-blue-400" },
];

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

export const PRIORITIES = ["시급한 과제 (임기 1년 내)", "중기 목표 (임기 내 완료)", "장기 비전 (5년 이상)"];
export const BUDGETS = ["소규모 (10억 이하)", "중규모 (10~100억)", "대규모 (100억 이상)"];

export const SCORE_LABELS: Record<keyof Scores, string> = {
  feasibility: "실현가능성",
  budgetEfficiency: "예산효율",
  voterAppeal: "주민호감도",
  uniqueness: "차별성",
  impact: "파급효과",
};

export const STEP_NAMES = ["분야 선택", "타겟 설정", "공약 생성", "상세 발전", "최종 완성"];

export const ANALYSIS_PHASES = [
  { icon: Database, label: "강남구 데이터 수집", desc: "인구 556,330명 · 예산 1조 4,804억원 데이터 로드" },
  { icon: Users, label: "유권자 세그먼트 분석", desc: "타겟 유권자의 핵심 가치관과 투표 성향 매칭" },
  { icon: TrendingUp, label: "현안 우선순위 매핑", desc: "분야별 긴급도와 주민 체감도 교차 분석" },
  { icon: Brain, label: "AI 공약 시뮬레이션", desc: "실현가능성 · 예산효율 · 차별성 다축 최적화" },
  { icon: BarChart3, label: "3개 대안 비교 생성", desc: "실용적 · 혁신적 · 점진적 접근방식 도출" },
  { icon: Zap, label: "최종 스코어링", desc: "5축 평가 점수 산출 및 결과 정리" },
];

export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

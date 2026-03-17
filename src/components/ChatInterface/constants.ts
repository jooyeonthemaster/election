export const SUGGESTED_QUESTIONS = [
  "강남구 교통 정체 해결 공약이 궁금합니다",
  "재건축은 언제 완료되나요?",
  "소각장 증설에 대한 입장은?",
  "청년 주거 지원 정책이 있나요?",
  "영동대로 지하공간 개발은 어떻게 진행되나요?",
  "AI 스마트 교통 시스템이 뭔가요?",
];

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function formatTime(date: Date) {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

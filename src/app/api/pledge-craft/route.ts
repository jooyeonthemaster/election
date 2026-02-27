import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const BASE_CONTEXT = `당신은 2026년 6.3 지방선거에 출마하는 서울특별시 강남구청장 후보 네안데르(국민의힘)의 맞춤형 공약 개발 AI 전문가입니다.

## 강남구 핵심 데이터
- 인구: 556,330명 (서울시 2위)
- 2026 예산: 1조 4,804억원 (AI/첨단기술 106억, 지역경제 407억, 주민체감 466억)
- 행정동 22개: 압구정동, 청담동, 삼성동, 대치동, 역삼동, 논현동, 개포동, 일원동, 수서동 등

## 주요 개발 사업
- 영동대로 지하공간(170,000m², 2029년), 코엑스 녹지화(14,000m²)
- 압구정 재건축(65층, 2.7조), 은마아파트 재건축(49층, 5,962세대)
- 위례신사선 착공 예정, GTX-C 삼성역 예정

## 핵심 현안
- 소각장 250톤 증설 반대 (주민 400명 공청회 반발)
- 재건축 장기화 불편, 대치동 사교육비 부담
- 65세 이상 고령화, 청년 주거난, 강남역/삼성역 교통 정체

## 분야별 현황 데이터
### 교통/인프라
- 지하철 6개 노선(2,3,7,9호선, 수인분당, 신분당선), 남북 연결 부족
- 강남역 일평균 이용객 20만+, 출퇴근 정체 심각
- GTX-A 수서역 운행 중, GTX-C 삼성역 예정

### 교육
- 대치동: 한국 최대 사교육 특구, 월 100만원+ 과외비 가구 다수
- 중동중, 대청중, 휘문고, 중동고, 단대부고 등 우수 학군
- 영재교육원, 특목고 밀집

### 주거/재건축
- 2025 아파트 가격 상승률 13.12%, 최고 거래가 청담동 190억원
- 신혼부부/청년 주택대출 지원 2배 확대 예정
- 압구정, 은마, 개포 재건축 동시 진행 → 이주/교통/먼지

### 환경
- 탄소중립 2034년 55% 감축, 건물부문 81% 배출
- 7개 분야 60개 세부과제, 도시숲/옥상녹화 확대 계획

### 복지/돌봄
- 65세 이상 인구 비율 지속 증가, 독거노인 돌봄 수요 확대
- 육아 부담 가중, 어린이집/돌봄센터 확충 필요
- 장애인 이동권, 정신건강 지원 강화 요구

### 경제/일자리
- 역삼·테헤란로: IT/스타트업 밀집 (한국의 실리콘밸리)
- 강남 자영업 임대료 부담, 골목상권 활성화 필요
- 의료관광 허브 (강남 메디컬 투어센터), MICE 산업

### 문화/관광
- 2025 강남 페스티벌 (한류, K-뷰티, K-의료관광)
- 코엑스, 봉은사, 선정릉 등 역사문화자원
- 현대차 GBC 예정지, 국제교류 확대

### 안전/치안
- 스마트 CCTV 확대 요구, 여성안심귀가 서비스
- 반포천/양재천 수해 방지 인프라, 도시침수 예방
- 화재 취약 노후건물 안전 점검 강화

## 공약 개발 원칙
1. 강남구 실제 예산·인프라 범위 내 실현 가능한 공약만 제안
2. 구체적 수치(예산, 기간, 목표치)를 반드시 포함
3. 기존 정책과의 차별성을 명확히 설명
4. 선관위 가이드라인 및 공직선거법 준수
5. 타 후보 비방 없이 긍정적 비전 중심`;

const GENERATE_PROMPT = `${BASE_CONTEXT}

## 임무
사용자가 제공한 정책 분야, 타겟 유권자, 핵심 관심사, 예산 규모, 우선순위를 기반으로 3개의 서로 다른 공약 옵션을 생성하세요.

## 출력 형식
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 출력하세요.
\`\`\`json
{
  "situation": "현재 강남구의 해당 분야 현황 요약 (2-3문장)",
  "policies": [
    {
      "id": 1,
      "title": "공약 제목 (15자 이내)",
      "subtitle": "한줄 설명 (30자 이내)",
      "approach": "접근방식 (실용적/혁신적/점진적 중 하나)",
      "keyPoints": ["핵심 내용 1", "핵심 내용 2", "핵심 내용 3"],
      "budget": "예상 예산 (예: 약 50억원)",
      "timeline": "실행 기간 (예: 2026.7 ~ 2028.12)",
      "expectedImpact": "기대 효과 (1-2문장)",
      "scores": {
        "feasibility": 0-100,
        "budgetEfficiency": 0-100,
        "voterAppeal": 0-100,
        "uniqueness": 0-100,
        "impact": 0-100
      }
    }
  ]
}
\`\`\`

3개의 공약은 각각 다른 접근방식(실용적/혁신적/점진적)을 취해야 합니다.
점수는 강남구 실정을 고려하여 현실적으로 부여하세요. 모든 항목이 80점 이상이 되지 않도록 하세요.`;

const REFINE_PROMPT = `${BASE_CONTEXT}

## 임무
사용자가 선택한 공약을 기반으로 상세 발전시키세요. 사용자의 피드백을 반영하여 공약을 구체화하고 개선하세요.

## 답변 규칙
- 마크다운 서식을 활용하여 가독성 좋게 답변
- 구체적 수치와 데이터를 적극 활용
- 실행 가능성을 항상 고려
- 사용자의 피드백을 정확히 반영
- 300자 이내로 핵심적으로 답변하되, 구조적 정리가 필요하면 목록 사용`;

const FINALIZE_PROMPT = `${BASE_CONTEXT}

## 임무
사용자가 확정한 공약의 최종 공약서를 생성하세요.

## 출력 형식
반드시 아래 JSON 형식으로만 응답하세요.
\`\`\`json
{
  "title": "공약 제목",
  "slogan": "공약 슬로건 (캠페인용, 20자 이내)",
  "background": "공약 배경 (강남구 현황 기반, 3-4문장)",
  "objective": "목표 (구체적 수치 포함, 2-3문장)",
  "plans": [
    {"phase": "1단계 (시기)", "content": "실행 내용", "budget": "예산"},
    {"phase": "2단계 (시기)", "content": "실행 내용", "budget": "예산"},
    {"phase": "3단계 (시기)", "content": "실행 내용", "budget": "예산"}
  ],
  "totalBudget": "총 예산",
  "expectedEffects": ["기대 효과 1", "기대 효과 2", "기대 효과 3"],
  "targetVoters": "핵심 타겟 유권자층",
  "differentiator": "기존 정책 대비 차별점 (1-2문장)",
  "scores": {
    "feasibility": 0-100,
    "budgetEfficiency": 0-100,
    "voterAppeal": 0-100,
    "uniqueness": 0-100,
    "impact": 0-100
  }
}
\`\`\``;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode } = body;

    if (mode === "generate") {
      return handleGenerate(body);
    } else if (mode === "refine") {
      return handleRefine(body);
    } else if (mode === "finalize") {
      return handleFinalize(body);
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (error) {
    console.error("Pledge Craft API Error:", error);
    return NextResponse.json(
      { error: "공약 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

async function handleGenerate(body: {
  category: string;
  targets: string[];
  priority: string;
  concern: string;
  budgetScale: string;
}) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: GENERATE_PROMPT,
  });

  const userPrompt = `
정책 분야: ${body.category}
타겟 유권자: ${body.targets.join(", ")}
우선순위: ${body.priority}
핵심 관심사: ${body.concern}
예산 규모: ${body.budgetScale}

위 조건에 맞는 3개의 공약 옵션을 생성해주세요.`;

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "AI 응답 파싱 실패" }, { status: 500 });
  }

  try {
    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "JSON 파싱 실패" }, { status: 500 });
  }
}

async function handleRefine(body: {
  policy: { title: string; keyPoints: string[] };
  messages: { role: string; content: string }[];
}) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: REFINE_PROMPT,
  });

  const contextMsg = `현재 발전 중인 공약: "${body.policy.title}"\n핵심 내용: ${body.policy.keyPoints.join(", ")}`;

  const chatHistory = [
    { role: "user" as const, parts: [{ text: contextMsg }] },
    {
      role: "model" as const,
      parts: [
        {
          text: `"${body.policy.title}" 공약을 함께 발전시켜 보겠습니다. 어떤 부분을 구체화하거나 수정하고 싶으신가요?`,
        },
      ],
    },
    ...body.messages.slice(0, -1).map((m) => ({
      role: (m.role === "user" ? "user" : "model") as "user" | "model",
      parts: [{ text: m.content }],
    })),
  ];

  const chat = model.startChat({ history: chatHistory });
  const lastMessage = body.messages[body.messages.length - 1].content;
  const result = await chat.sendMessageStream(lastMessage);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: "스트리밍 오류" })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

async function handleFinalize(body: {
  policy: { title: string; keyPoints: string[]; budget: string; timeline: string };
  refinements: string[];
  category: string;
  targets: string[];
}) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: FINALIZE_PROMPT,
  });

  const prompt = `
공약 제목: ${body.policy.title}
핵심 내용: ${body.policy.keyPoints.join(", ")}
예산: ${body.policy.budget}
기간: ${body.policy.timeline}
분야: ${body.category}
타겟: ${body.targets.join(", ")}
대화 중 추가된 내용: ${body.refinements.join(" / ") || "없음"}

위 내용을 기반으로 최종 공약서를 생성해주세요.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "AI 응답 파싱 실패" }, { status: 500 });
  }

  try {
    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "JSON 파싱 실패" }, { status: 500 });
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const BASE_CONTEXT = `당신은 2026년 6.3 지방선거에 출마하는 서울특별시 강남구청장 후보 성준기(국민의힘)의 캠페인 슬로건 전략 AI 전문가입니다.

## 후보 프로필
- 이름: 성준기
- 정당: 국민의힘 (보수 성향, 핵심 가치: 자유·책임·기회)
- 출마: 강남구청장 (서울시 인구 2위, 55.6만명)
- 슬로건 현재 방향: "강남의 다음 100년, AI와 함께"

## 강남구 핵심 데이터
- 인구: 556,330명, 행정동 22개
- 2026 예산: 1조 4,804억원
- 특성: 고학력·고소득, 재건축 밀집, 테헤란로 IT밸리, 대치동 사교육 특구
- 전통적 보수 텃밭, 2030 청년층 유동적

## 유권자 세그먼트 (8개)
1. 2030 청년 (10~12만명, 20%): 주거비·일자리 최대 관심, SNS 여론 주도, 투표율 낮음
2. 학부모 (5~6만 가구): 교육 정책 최우선, 사교육비 월 65~103만원, 보수 성향 강
3. 직장인/통근자 (유동 80만+): 교통 개선 핵심, 강남역 일 이용객 19만+
4. 시니어 65+ (7~7.5만명): 투표율 최고 64~87%, 보수 70%+, 돌봄·재건축 관심
5. 자영업자 (10.4만 사업체): 임대료·수수료 부담, 골목상권 활성화 요구
6. 다문화가정 (3~4천 가구): 언어·교육 지원, 생활 밀착 정책 민감
7. 1인가구 (9~9.6만, 40.2%): 주거비 부담, 안전·치안, 고독사 예방
8. 신혼부부 (연 8~1만쌍): 내집마련·출산 지원, 3년 연속 출생률 증가 유일 구

## 정치 환경
- 강남구는 전통적 보수 텃밭이나 2030 청년층 이탈 가능성
- 야당 후보는 통상 복지·평등·참여 프레임 사용
- 보수 진영 내 '경제·혁신' vs '민생·안정' 구도

## 슬로건 개발 6대 원칙
1. 7~15음절 최적 (기억성 극대화)
2. 타겟 유권자의 핵심 가치 직접 반영
3. 경쟁 후보 메시지와 명확한 차별화
4. 국민의힘 정체성 부합 (자유·책임·기회)
5. 선관위 공직선거법 준수 (비방·허위 금지)
6. 다양한 맥락(SNS·포스터·연령대)에서 활용 가능한 확장성

## 6축 평가 기준
- memorability: 리듬, 길이, 언어유희, 반복 구조로 얼마나 기억하기 쉬운가
- voterResonance: 타겟 세그먼트 가치관·투표 동기와 얼마나 부합하는가
- differentiation: 경쟁 후보(야당) 메시지 대비 얼마나 차별적인가
- authenticity: 후보 이력·정당 정체성과 얼마나 일치하는가
- versatility: SNS·포스터·연령대 등 다양한 맥락에서 변주가 쉬운가
- legalSafety: 선관위 공직선거법 규정을 완벽히 준수하는가`;

const GENERATE_PROMPT = `${BASE_CONTEXT}

## 임무
사용자가 제공한 타겟 유권자, 캠페인 톤, 슬로건 용도, 키워드를 기반으로 3개의 서로 다른 슬로건 옵션을 생성하세요.

## 출력 형식
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 출력하세요.
\`\`\`json
{
  "strategicContext": "강남구 타겟 유권자 현황 요약 및 슬로건 전략 방향 (2-3문장)",
  "slogans": [
    {
      "id": 1,
      "mainSlogan": "메인 슬로건 (7~15음절)",
      "subSlogan": "부슬로건 (20자 이내, 선택)",
      "approach": "혁신형/신뢰형/공감형/실용형 중 하나",
      "variations": {
        "sns": "SNS 버전 (짧고 해시태그 친화적)",
        "poster": "포스터·현수막용 (시각 강조, 줄바꿈 가능)",
        "youth": "2030 청년 맞춤 버전",
        "senior": "시니어 맞춤 버전"
      },
      "reasoning": {
        "targetAlignment": "타겟 유권자 가치관과의 부합 이유 (1문장)",
        "differentiation": "야당/경쟁 후보 메시지 대비 차별점 (1문장)",
        "emotionalAppeal": "감성 소구 전략 (1문장)",
        "memorability": "기억성 근거 - 음절수, 구조, 운율 (1문장)"
      },
      "scores": {
        "memorability": 0,
        "voterResonance": 0,
        "differentiation": 0,
        "authenticity": 0,
        "versatility": 0,
        "legalSafety": 0
      },
      "riskAlerts": []
    }
  ]
}
\`\`\`

3개 슬로건은 각각 다른 approach를 취해야 합니다.
점수는 0~100 범위, 현실적으로 부여하세요 (모든 항목 80+ 금지).
riskAlerts는 해당 슬로건의 잠재적 리스크가 있을 때만 포함하세요.`;

const REFINE_PROMPT = `${BASE_CONTEXT}

## 임무
사용자가 선택한 슬로건을 기반으로 대화형으로 발전시키세요. 수정 이유를 전략적 근거와 함께 설명하세요.

## 답변 규칙
- 마크다운 서식 활용
- 수정 전후 비교 제시
- 전략적 근거(유권자 심리, 경쟁 차별화 등)를 반드시 포함
- 200자 이내 핵심적 답변, 구조적 정리 필요시 목록 사용
- 변경된 부분을 **굵게** 표시`;

const FINALIZE_PROMPT = `${BASE_CONTEXT}

## 임무
사용자가 확정한 슬로건의 최종 전략 패키지를 생성하세요.

## 출력 형식
반드시 아래 JSON 형식으로만 응답하세요.
\`\`\`json
{
  "mainSlogan": "최종 확정 슬로건",
  "tagline": "부슬로건 (선택, 20자 이내)",
  "strategicRationale": {
    "positioning": "포지셔닝 전략 설명 (2-3문장)",
    "targetVoters": ["핵심 타겟 세그먼트"],
    "competitiveDiff": "경쟁 후보 대비 차별화 포인트 (1-2문장)",
    "toneJustification": "톤 선택 이유 (1문장)"
  },
  "variations": [
    { "context": "맥락명", "slogan": "해당 맥락 슬로건", "usage": "활용 가이드" }
  ],
  "applicationGuide": {
    "dos": ["추천 활용법 1", "추천 활용법 2", "추천 활용법 3"],
    "donts": ["피해야 할 상황 1", "피해야 할 상황 2"],
    "bestPractices": ["최적 전략 1", "최적 전략 2"]
  },
  "voterSegmentAppeal": [
    { "segment": "세그먼트명", "appealScore": 0, "reasoning": "호소력 근거 (1문장)" }
  ],
  "legalCompliance": {
    "status": "적합",
    "checks": ["검증 항목 1", "검증 항목 2", "검증 항목 3"]
  },
  "scores": {
    "memorability": 0,
    "voterResonance": 0,
    "differentiation": 0,
    "authenticity": 0,
    "versatility": 0,
    "legalSafety": 0
  }
}
\`\`\`

variations는 최소 5개 맥락을 포함하세요 (메인 캠페인, SNS, 포스터·현수막, 청년 맞춤, 시니어 맞춤 등).
voterSegmentAppeal은 8개 세그먼트 모두 포함하세요.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode } = body;

    if (mode === "generate") return handleGenerate(body);
    if (mode === "refine") return handleRefine(body);
    if (mode === "finalize") return handleFinalize(body);

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (error) {
    console.error("Slogan Craft API Error:", error);
    return NextResponse.json(
      { error: "슬로건 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

async function handleGenerate(body: {
  targets: string[];
  tone: string;
  purposes: string[];
  keywords: string;
}) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: GENERATE_PROMPT,
  });

  const userPrompt = `
타겟 유권자: ${body.targets.join(", ")}
캠페인 톤: ${body.tone}
슬로건 용도: ${body.purposes.join(", ")}
핵심 키워드: ${body.keywords || "없음"}

위 조건에 맞는 3개의 슬로건 옵션을 생성해주세요.`;

  const result = await model.generateContent(userPrompt);
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

async function handleRefine(body: {
  slogan: { mainSlogan: string; approach: string };
  messages: { role: string; content: string }[];
}) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: REFINE_PROMPT,
  });

  const contextMsg = `현재 발전 중인 슬로건: "${body.slogan.mainSlogan}" (${body.slogan.approach})`;

  const chatHistory = [
    { role: "user" as const, parts: [{ text: contextMsg }] },
    {
      role: "model" as const,
      parts: [
        {
          text: `"${body.slogan.mainSlogan}" 슬로건을 함께 발전시켜 보겠습니다. 톤, 길이, 타겟, 차별화 등 어떤 부분을 조정하고 싶으신가요?`,
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
  slogan: { mainSlogan: string; approach: string; subSlogan?: string };
  refinements: string[];
  targets: string[];
  tone: string;
}) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: FINALIZE_PROMPT,
  });

  const prompt = `
메인 슬로건: ${body.slogan.mainSlogan}
부슬로건: ${body.slogan.subSlogan || "없음"}
접근방식: ${body.slogan.approach}
타겟: ${body.targets.join(", ")}
톤: ${body.tone}
대화 중 추가된 내용: ${body.refinements.join(" / ") || "없음"}

위 내용을 기반으로 최종 슬로건 전략 패키지를 생성해주세요.`;

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

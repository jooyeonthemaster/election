import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID!;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET!;

// Naver DataLab Search Trend
async function fetchNaverTrend(keywords: string[][]) {
  const body = {
    startDate: "2026-01-01",
    endDate: new Date().toISOString().split('T')[0],
    timeUnit: "week",
    keywordGroups: keywords.map((kws, i) => ({
      groupName: kws[0],
      keywords: kws,
    })),
  };

  try {
    const res = await fetch('https://openapi.naver.com/v1/datalab/search', {
      method: 'POST',
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Naver News for context
async function fetchRecentNews(query: string) {
  try {
    const res = await fetch(
      `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=15&sort=date`,
      {
        headers: {
          'X-Naver-Client-Id': NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item: { title: string; description: string }) => ({
      title: item.title.replace(/<[^>]*>/g, ''),
      description: item.description.replace(/<[^>]*>/g, ''),
    }));
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const { scenario } = await request.json();

    // Fetch trend data and news in parallel
    const [trendData, news] = await Promise.all([
      fetchNaverTrend([
        ["강남구청장", "강남구 선거"],
        ["강남구 재건축", "강남 재건축"],
        ["강남구 교통", "강남 교통"],
      ]),
      fetchRecentNews(`강남구 선거 2026 ${scenario || ''}`),
    ]);

    // Format trend data for context
    let trendContext = "검색 트렌드 데이터 없음";
    if (trendData?.results) {
      trendContext = trendData.results.map((group: { title: string; data: Array<{ period: string; ratio: number }> }) =>
        `${group.title}: ${group.data?.slice(-4).map((d: { period: string; ratio: number }) => `${d.period}=${d.ratio}`).join(', ')}`
      ).join('\n');
    }

    // Format news for context
    const newsContext = news.slice(0, 10).map((n: { title: string; description: string }, i: number) =>
      `${i+1}. ${n.title}`
    ).join('\n');

    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
      systemInstruction: `당신은 강남구 2026 지방선거 여론 예측 AI입니다.
실제 검색 트렌드와 뉴스 데이터를 기반으로 선거 예측 분석을 생성합니다.
반드시 JSON 형식으로만 응답하세요.

중요 사항:
- 이것은 "AI 분석"이며 공식 여론조사가 아님을 명확히 하세요
- 현실적이고 보수적인 예측을 제공하세요
- 공직선거법을 준수하여 특정 후보에 대한 허위 정보를 생성하지 마세요
- 시나리오별 분석은 객관적이어야 합니다`,
    });

    const prompt = `다음 데이터를 기반으로 강남구 2026 지방선거 예측 분석을 생성하세요.

시나리오: "${scenario || '기본 시나리오'}"

[네이버 검색 트렌드]
${trendContext}

[최근 뉴스]
${newsContext}

다음 JSON 형식으로 응답하세요:

{
  "scenario": "${scenario || '기본 시나리오'}",
  "analysisDate": "${new Date().toISOString().split('T')[0]}",
  "prediction": {
    "candidateA": { "name": "네안데르", "party": "국민의힘", "supportRate": 00.0, "change": "+0.0%" },
    "candidateB": { "name": "상대후보", "party": "더불어민주당", "supportRate": 00.0, "change": "+0.0%" },
    "undecided": 00.0
  },
  "winProbability": 00.0,
  "confidenceInterval": "±0.0%",
  "monthlyTrend": [
    { "month": "1월", "candidateA": 00, "candidateB": 00 },
    { "month": "2월", "candidateA": 00, "candidateB": 00 },
    { "month": "3월", "candidateA": 00, "candidateB": 00 }
  ],
  "keyFactors": [
    { "factor": "요인명", "impact": "positive|negative|neutral", "weight": 1~10, "description": "설명" }
  ],
  "scenarios": [
    { "name": "낙관", "probability": 00.0, "description": "설명" },
    { "name": "기본", "probability": 00.0, "description": "설명" },
    { "name": "비관", "probability": 00.0, "description": "설명" }
  ],
  "searchTrendSummary": "검색 트렌드 기반 분석 요약 1-2문장",
  "strategicAdvice": "전략 조언 1-2문장",
  "riskFactors": ["리스크1", "리스크2", "리스크3"],
  "disclaimer": "본 분석은 AI가 공개 데이터를 기반으로 생성한 참고 자료이며, 공식 여론조사가 아닙니다."
}

keyFactors는 4-6개 생성하세요. JSON만 출력하세요.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI 응답 파싱 실패' }, { status: 500 });
    }

    const forecast = JSON.parse(jsonMatch[0]);
    return NextResponse.json(forecast);
  } catch (error) {
    console.error('Opinion forecast error:', error);
    return NextResponse.json(
      { error: '여론 예측 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

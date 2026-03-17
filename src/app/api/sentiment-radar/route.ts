import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID!;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET!;
const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY!;

// Naver News Search
async function fetchNaverNews(query: string) {
  const res = await fetch(
    `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=20&sort=date`,
    {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items || []).map((item: { title: string; description: string; originallink: string; link: string; pubDate: string }) => ({
    source: '네이버 뉴스',
    title: item.title.replace(/<[^>]*>/g, ''),
    content: item.description.replace(/<[^>]*>/g, ''),
    url: item.originallink || item.link,
    published_at: new Date(item.pubDate).toISOString(),
  }));
}

// Naver Blog Search
async function fetchNaverBlog(query: string) {
  const res = await fetch(
    `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(query)}&display=10&sort=date`,
    {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items || []).map((item: { title: string; description: string; link: string; postdate: string }) => ({
    source: '네이버 블로그',
    title: item.title.replace(/<[^>]*>/g, ''),
    content: item.description.replace(/<[^>]*>/g, ''),
    url: item.link,
    published_at: item.postdate ? `${item.postdate.slice(0,4)}-${item.postdate.slice(4,6)}-${item.postdate.slice(6,8)}` : new Date().toISOString(),
  }));
}

// Kakao Web Search
async function fetchKakaoWeb(query: string) {
  const res = await fetch(
    `https://dapi.kakao.com/v2/search/web?query=${encodeURIComponent(query)}&size=10&sort=recency`,
    {
      headers: {
        'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.documents || []).map((doc: { title: string; contents: string; url: string; datetime: string }) => ({
    source: '카카오 웹',
    title: doc.title.replace(/<[^>]*>/g, ''),
    content: doc.contents.replace(/<[^>]*>/g, ''),
    url: doc.url,
    published_at: doc.datetime,
  }));
}

// Store articles in Supabase
async function storeArticles(articles: Array<{ source: string; title: string; content: string; url: string; published_at: string }>) {
  if (articles.length === 0) return;

  const rows = articles.map(a => ({
    source: a.source,
    title: a.title,
    content: a.content,
    url: a.url,
    published_at: a.published_at,
    district: '강남구',
  }));

  if (supabaseAdmin) {
    await supabaseAdmin.from('articles').upsert(rows, { onConflict: 'url' }).select();
  }
}

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    const query = topic ? `강남구 ${topic}` : '강남구 선거 2026';

    // Fetch from multiple sources in parallel
    const [naverNews, naverBlog, kakaoWeb] = await Promise.all([
      fetchNaverNews(query),
      fetchNaverBlog(query),
      fetchKakaoWeb(query),
    ]);

    const allArticles = [...naverNews, ...naverBlog, ...kakaoWeb];

    // Store in Supabase (fire and forget)
    storeArticles(allArticles).catch(console.error);

    // Use Gemini to analyze sentiment
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-preview-05-20',
      systemInstruction: `당신은 강남구 2026 지방선거 민심 분석 AI입니다.
실제 뉴스/블로그 데이터를 기반으로 민심 분석 리포트를 생성합니다.
반드시 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.

분석 시 주의사항:
- 실제 데이터에 기반하여 현실적인 분석을 제공하세요
- "AI 분석" 결과임을 명확히 하세요 (여론조사가 아님)
- 감성 비율의 합은 100이어야 합니다`,
    });

    const articleSummary = allArticles.slice(0, 30).map((a, i) =>
      `${i+1}. [${a.source}] ${a.title} - ${a.content?.slice(0, 100) || ''}`
    ).join('\n');

    const prompt = `다음은 "${query}" 관련 최신 뉴스/블로그 ${allArticles.length}건 중 상위 내용입니다:

${articleSummary}

이 데이터를 분석하여 다음 JSON 형식으로 민심 분석 리포트를 생성하세요:

{
  "analysisDate": "${new Date().toISOString().split('T')[0]}",
  "totalArticles": ${allArticles.length},
  "overallSentiment": { "positive": 0~100, "negative": 0~100, "neutral": 0~100 },
  "summary": "2-3문장 요약",
  "trendingKeywords": [
    { "text": "키워드", "score": 1~100, "sentiment": "positive|negative|neutral", "change": "+X%" }
  ],
  "recentMentions": [
    { "source": "출처", "text": "실제 기사/글 요약 1줄", "sentiment": "긍정|부정|중립", "timeAgo": "X시간 전" }
  ],
  "hotIssues": [
    { "title": "이슈명", "description": "설명", "sentimentScore": 0~100, "urgency": "high|medium|low" }
  ],
  "weeklyTrend": [45, 52, 48, 62, 58, 72, 65],
  "channelBreakdown": [
    { "channel": "채널명", "count": 건수, "sentiment": "positive|negative|neutral" }
  ]
}

trendingKeywords는 8-12개, recentMentions는 5-6개, hotIssues는 3-5개, channelBreakdown은 수집 채널별로 생성하세요.
JSON만 출력하세요.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI 응답 파싱 실패' }, { status: 500 });
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Sentiment radar error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: '민심 분석 중 오류가 발생했습니다.', detail: message },
      { status: 500 }
    );
  }
}

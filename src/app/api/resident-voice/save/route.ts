import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabaseAdmin } from '@/lib/supabase';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const CLASSIFY_PROMPT = `사용자의 민원/의견 메시지를 분석하여 JSON으로 분류하세요.
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 출력하세요.

{
  "category": "교통/교육/주거/환경/복지/안전/경제/문화/기타 중 하나",
  "neighborhood": "메시지에서 언급된 동네명. 없으면 미지정",
  "summary": "핵심 내용 1-2문장 종합 요약",
  "request": "구체적 요청사항 1문장. 없으면 빈 문자열",
  "emotion": "불만/제안/기대/긴급 중 하나"
}`;

const ACCUMULATE_PROMPT = `이전 대화 요약과 새로운 사용자 메시지를 종합하여, 전체 대화의 핵심을 JSON으로 분류하세요.
이전 요약 내용과 새 메시지를 모두 반영한 종합 요약을 작성하세요.
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 출력하세요.

{
  "category": "교통/교육/주거/환경/복지/안전/경제/문화/기타 중 하나",
  "neighborhood": "언급된 동네명. 없으면 미지정",
  "summary": "전체 대화의 핵심 내용 1-2문장 종합 요약",
  "request": "종합적 요청사항 1문장. 없으면 빈 문자열",
  "emotion": "불만/제안/기대/긴급 중 하나"
}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 직접 분류된 데이터가 오면 그대로 저장 (기존 호환)
    if (body.category && body.summary) {
      return saveToSupabase(body);
    }

    // 사용자 원문 메시지가 오면 AI로 분류 후 저장
    if (!body.message) {
      return NextResponse.json({ error: '메시지 필드 누락' }, { status: 400 });
    }

    // 같은 세션이면 기존 데이터 가져와서 누적 요약
    if (body.voiceId && supabaseAdmin) {
      const { data: existing } = await supabaseAdmin
        .from('resident_voices')
        .select('summary, full_conversation')
        .eq('id', body.voiceId)
        .single();

      if (existing) {
        // 대화 원문 누적
        const prevConversation = existing.full_conversation || '';
        const newConversation = prevConversation
          ? `${prevConversation}\n[주민] ${body.message}`
          : `[주민] ${body.message}`;

        // 이전 요약 + 새 메시지로 종합 분류
        const model = genAI.getGenerativeModel({
          model: 'gemini-3.1-flash-lite-preview',
          systemInstruction: ACCUMULATE_PROMPT,
        });

        const prompt = `이전 요약: "${existing.summary}"\n\n새로운 메시지: "${body.message}"`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          return NextResponse.json({ error: 'AI 분류 실패' }, { status: 500 });
        }

        const classified = JSON.parse(jsonMatch[0]);
        return updateVoice(body.voiceId, classified, newConversation);
      }
    }

    // 첫 메시지: 새 row 생성
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite-preview',
      systemInstruction: CLASSIFY_PROMPT,
    });

    const result = await model.generateContent(body.message);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI 분류 실패' }, { status: 500 });
    }

    const classified = JSON.parse(jsonMatch[0]);
    return saveToSupabase(classified, `[주민] ${body.message}`);
  } catch (error) {
    console.error('Save voice error:', error);
    return NextResponse.json({ error: '저장 실패' }, { status: 500 });
  }
}

async function updateVoice(voiceId: string, voice: Record<string, string>, conversation: string) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'DB 미설정' }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from('resident_voices')
    .update({
      category: voice.category || '기타',
      neighborhood: voice.neighborhood || '미지정',
      summary: voice.summary,
      request: voice.request || '',
      emotion: voice.emotion || '제안',
      full_conversation: conversation,
    })
    .eq('id', voiceId)
    .select()
    .single();

  if (error) {
    console.error('Supabase update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

async function saveToSupabase(voice: Record<string, string>, conversation?: string) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'DB 미설정' }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from('resident_voices')
    .insert({
      category: voice.category || '기타',
      neighborhood: voice.neighborhood || '미지정',
      summary: voice.summary,
      request: voice.request || '',
      emotion: voice.emotion || '제안',
      full_conversation: conversation || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

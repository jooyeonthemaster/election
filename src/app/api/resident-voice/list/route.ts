import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ voices: [], stats: {} });
    }

    const { data: voices, error } = await supabaseAdmin
      .from('resident_voices')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ voices: [], stats: {} });
    }

    // 카테고리별 통계
    const stats: Record<string, number> = {};
    const emotions: Record<string, number> = {};
    for (const v of voices || []) {
      stats[v.category] = (stats[v.category] || 0) + 1;
      emotions[v.emotion] = (emotions[v.emotion] || 0) + 1;
    }

    return NextResponse.json({
      voices: voices || [],
      stats: {
        total: voices?.length || 0,
        byCategory: stats,
        byEmotion: emotions,
      },
    });
  } catch (error) {
    console.error('List voices error:', error);
    return NextResponse.json({ voices: [], stats: {} });
  }
}

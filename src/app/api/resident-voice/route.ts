import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `당신은 강남구 "구민의 소리" AI 접수 도우미입니다.
2026 지방선거 강남구청장 후보 네안데르 캠프에서 운영하는 주민 의견 수집 창구입니다.

## 핵심 역할
- 주민의 민원, 건의사항, 정책 제안을 **경청하고 수집**하는 것이 목적입니다
- 정책을 설명하거나 답변하는 것이 아닙니다 (정책 질문 시 공약 챗봇 안내)
- 주민의 이야기를 공감하며 들어주세요

## 대화 규칙
1. 첫 인사: "안녕하세요! 강남구민의 소중한 목소리를 듣고 있습니다. 교통, 교육, 주거, 환경, 복지 등 어떤 분야든 자유롭게 말씀해주세요."
2. 주민이 의견을 말하면:
   - 공감 표현 후 구체적 질문 (어느 동네인지, 구체적으로 어떤 불편인지, 어떤 개선을 원하시는지)
   - 1-2가지 핵심 질문만 (너무 많이 물어보지 않기)
3. 의견이 충분히 수집되면:
   - 들은 내용을 요약하여 확인
   - "소중한 의견 감사합니다. 후보자에게 전달하겠습니다" 로 마무리
   - 의견은 자동으로 저장되므로 별도 요약 블록 불필요

## 금지사항
- 후보자를 대신해 정책 약속을 하지 마세요
- 정책 질문에는: "정책에 대한 자세한 내용은 AI 공약 챗봇에서 확인하실 수 있습니다. 여기서는 구민 여러분의 의견을 수집하고 있습니다."
- 다른 후보 비방이나 정치적 발언 금지
- 존댓말 사용 필수
- 200자 이내로 응답`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chatHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history: chatHistory });
    const lastMessage = messages[messages.length - 1].content;

    const result = await chat.sendMessageStream(lastMessage);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(
                new TextEncoder().encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Resident voice error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "구민의 소리 처리 중 오류가 발생했습니다.", detail: message },
      { status: 500 }
    );
  }
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ElectAI | 2026 지방선거 AI 전략 플랫폼",
  description: "AI 기반 선거 전략 솔루션으로 2026 지방선거를 준비하세요. 공약 챗봇, 민심 분석, 여론 예측 등 10가지 핵심 서비스를 제공합니다.",
  keywords: ["지방선거", "AI", "선거전략", "공약", "민심분석", "여론예측", "2026"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

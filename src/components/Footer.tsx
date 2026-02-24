"use client";

import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  서비스: [
    { name: "AI 공약 챗봇", href: "/services/pledge-bot" },
    { name: "민심 레이더", href: "/services/sentiment-radar" },
    { name: "인터랙티브 공약집", href: "/services/pledge-book" },
    { name: "여론 예측 AI", href: "/services/opinion-forecast" },
    { name: "캠프 전략 어드바이저", href: "/services/camp-strategy" },
    { name: "유권자 인사이트", href: "/services/voter-insight" },
    { name: "AI 홍보물 스튜디오", href: "/services/pr-studio" },
    { name: "실시간 경쟁 분석", href: "/services/competitor-analysis" },
  ],
  회사: [
    { name: "소개", href: "#" },
    { name: "팀", href: "#" },
    { name: "채용", href: "#" },
    { name: "블로그", href: "#" },
    { name: "보도자료", href: "#" },
  ],
  지원: [
    { name: "도움말 센터", href: "#" },
    { name: "API 문서", href: "#" },
    { name: "개인정보처리방침", href: "#" },
    { name: "이용약관", href: "#" },
    { name: "서비스 상태", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0B1222] text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary)] rounded-full blur-[200px] opacity-5" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-[200px] opacity-5" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                  Elect
                </span>
                <span className="text-xl font-extrabold tracking-tight text-[var(--primary)]" style={{ fontFamily: "var(--font-display)" }}>
                  AI
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              AI 기반 선거 전략 솔루션으로<br />
              2026 지방선거의 새로운 기준을<br />
              만들어갑니다.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@electai.kr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>02-1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>서울특별시 영등포구 여의도동</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white/80 mb-4">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-xs text-white/30">
            &copy; 2026 ElectAI. All rights reserved. 선거관리위원회 등록번호 제2026-001호
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30">대한민국 AI 선거 전략의 새로운 기준</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

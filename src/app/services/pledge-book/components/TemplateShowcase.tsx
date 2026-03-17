"use client";

import { Layers, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { templates } from "../constants";

/* ─── Template layout preview thumbnails ─── */

function TemplatePreview({ layout, color }: { layout: string; color: string }) {
  if (layout === "cards") {
    return (
      <div className="flex flex-col gap-1.5 p-3">
        <div className="h-3 w-16 rounded-sm" style={{ background: color }} />
        <div className="grid grid-cols-2 gap-1.5 mt-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 rounded-md border"
              style={{ borderColor: color + "30", background: color + "08" }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (layout === "scroll") {
    return (
      <div className="flex flex-col gap-1.5 p-3">
        <div className="h-14 rounded-md" style={{ background: color + "15" }} />
        <div className="h-8 rounded-md" style={{ background: color + "10" }} />
        <div className="h-8 rounded-md" style={{ background: color + "08" }} />
      </div>
    );
  }
  if (layout === "magazine") {
    return (
      <div className="grid grid-cols-3 gap-1.5 p-3">
        <div
          className="col-span-2 h-16 rounded-md"
          style={{ background: color + "15" }}
        />
        <div className="flex flex-col gap-1.5">
          <div
            className="h-[29px] rounded-md"
            style={{ background: color + "10" }}
          />
          <div
            className="h-[29px] rounded-md"
            style={{ background: color + "08" }}
          />
        </div>
        <div className="col-span-3 h-6 rounded-md" style={{ background: color + "06" }} />
      </div>
    );
  }
  /* infographic */
  return (
    <div className="flex flex-col gap-1.5 p-3">
      <div className="flex gap-1.5">
        <div
          className="w-10 h-10 rounded-full"
          style={{ background: color + "20" }}
        />
        <div className="flex-1 flex flex-col gap-1 justify-center">
          <div className="h-2 w-full rounded-full" style={{ background: color + "15" }} />
          <div className="h-2 w-3/4 rounded-full" style={{ background: color + "10" }} />
        </div>
      </div>
      <div className="flex gap-1 mt-1">
        {[60, 40, 80, 55].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{ height: `${h * 0.3}px`, background: color + (30 - i * 5).toString() }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Template Gallery Section ─── */

export default function TemplateShowcase() {
  return (
    <section id="templates" className="py-24 md:py-32 bg-white relative">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE9FE] border border-[#7C3AED]/10 mb-6">
            <Layers className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-sm font-semibold text-[#7C3AED]">4가지 템플릿</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            캠프에 맞는{" "}
            <span
              className="bg-gradient-to-r from-[#7C3AED] to-[#0052FF] bg-clip-text"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              템플릿
            </span>
            을 선택하세요
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            캠프의 성격과 타깃 유권자에 맞는 최적의 디자인을 골라보세요.
            AI가 콘텐츠에 맞게 자동 커스터마이징합니다.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {templates.map((tpl, i) => (
            <FadeIn key={tpl.name} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden hover:shadow-xl transition-all duration-400 hover:-translate-y-2 cursor-pointer">
                {/* Preview area */}
                <div
                  className="h-40 relative overflow-hidden"
                  style={{ background: tpl.accent }}
                >
                  <div className="absolute inset-3 bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
                    <TemplatePreview layout={tpl.layout} color={tpl.color} />
                  </div>
                  <div
                    className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60"
                    style={{ background: tpl.color }}
                  />
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: tpl.color }}
                    />
                    <h3 className="text-[15px] font-bold text-[var(--text-primary)]">
                      {tpl.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-tertiary)]">{tpl.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[var(--primary)] group-hover:gap-2 transition-all">
                    미리보기
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

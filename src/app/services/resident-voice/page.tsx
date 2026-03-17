"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Megaphone,
  ArrowLeft,
  Shield,
  Clock,
  Heart,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ResidentVoiceChat from "@/components/ResidentVoiceChat";

export default function ResidentVoicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] mb-6">
              <ArrowLeft className="w-4 h-4" />
              메인으로
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)]">
                    구민의 소리
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">NEW</span>
                </div>
                <p className="text-[var(--text-secondary)]">강남구민의 목소리를 후보에게 직접 전달합니다</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 border-b border-[var(--border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Heart, label: "공감 수집", desc: "AI가 경청합니다", color: "text-rose-500", bg: "bg-rose-50" },
              { icon: Shield, label: "익명 보장", desc: "개인정보 보호", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: Clock, label: "24시간", desc: "언제든 접수", color: "text-amber-500", bg: "bg-amber-50" },
              { icon: CheckCircle2, label: "후보 전달", desc: "소중히 전달됩니다", color: "text-emerald-500", bg: "bg-emerald-50" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-3 p-3"
              >
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Demo */}
      <section className="py-12">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <ResidentVoiceChat />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-tertiary)]">
                접수된 의견은 AI가 분류하여 후보자에게 전달됩니다.
                <br />
                개인정보는 수집되지 않으며, 의견 내용만 활용됩니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

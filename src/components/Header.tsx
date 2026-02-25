"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap } from "lucide-react";

const services = [
  { name: "AI 공약 챗봇", href: "/services/pledge-bot", tag: "HOT" },
  { name: "맞춤형 공약 개발", href: "/services/pledge-craft", tag: "NEW" },
  { name: "AI 슬로건 제작", href: "/services/slogan-craft", tag: "NEW" },
  { name: "민심 레이더", href: "/services/sentiment-radar", tag: "" },
  { name: "인터랙티브 공약집", href: "/services/pledge-book", tag: "" },
  { name: "여론 예측 AI", href: "/services/opinion-forecast", tag: "" },
  { name: "캠프 전략 어드바이저", href: "/services/camp-strategy", tag: "" },
  { name: "유권자 인사이트", href: "/services/voter-insight", tag: "" },
  { name: "AI 홍보물 스튜디오", href: "/services/pr-studio", tag: "NEW" },
  { name: "실시간 경쟁 분석", href: "/services/competitor-analysis", tag: "" },
  { name: "정책 스와이프 매칭", href: "/services/policy-match", tag: "NEW" },
  { name: "언론사 파트너 허브", href: "/services/media-partner", tag: "" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-md group-hover:shadow-[var(--shadow-primary)] transition-shadow duration-300">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold tracking-tight text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                  Elect
                </span>
                <span className="text-xl font-extrabold tracking-tight text-[var(--primary)]" style={{ fontFamily: "var(--font-display)" }}>
                  AI
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--surface)]">
                  서비스
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-[280px] bg-white rounded-2xl shadow-xl border border-[var(--border-light)] p-2 overflow-hidden"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-50)] transition-all duration-200"
                        >
                          <span>{service.name}</span>
                          {service.tag && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              service.tag === "HOT"
                                ? "bg-[var(--accent-light)] text-[var(--accent)]"
                                : "bg-[var(--primary-light)] text-[var(--primary)]"
                            }`}>
                              {service.tag}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/#features" className="px-4 py-2 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--surface)]">
                주요 기능
              </Link>
              <Link href="/#pricing" className="px-4 py-2 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--surface)]">
                요금제
              </Link>
              <Link href="/#contact" className="px-4 py-2 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--surface)]">
                문의하기
              </Link>
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/#contact"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white text-[14px] font-semibold rounded-xl hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-[var(--shadow-primary)]"
              >
                무료 체험 시작
              </Link>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--surface)] transition-colors"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-[320px] bg-white shadow-2xl p-6 pt-24"
            >
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-4 mb-2">서비스</p>
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-50)] transition-all"
                  >
                    <span>{service.name}</span>
                    {service.tag && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        service.tag === "HOT"
                          ? "bg-[var(--accent-light)] text-[var(--accent)]"
                          : "bg-[var(--primary-light)] text-[var(--primary)]"
                      }`}>
                        {service.tag}
                      </span>
                    )}
                  </Link>
                ))}
                <div className="h-px bg-[var(--border-light)] my-4" />
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--primary)] text-white text-[15px] font-semibold rounded-xl"
                >
                  무료 체험 시작
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

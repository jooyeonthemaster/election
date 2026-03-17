"use client";

import { useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Scale,
  ThumbsUp,
  ThumbsDown,
  Info,
} from "lucide-react";
import { policyQuestions } from "../constants";
import ResultsView from "./ResultsView";

export default function SwipeCardDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const agreeOpacity = useTransform(x, [0, 100], [0, 1]);
  const disagreeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleSwipe = useCallback(
    (direction: number) => {
      const newAnswers = [...answers, direction];
      setAnswers(newAnswers);
      setIsFlipped(false);

      if (currentIndex >= policyQuestions.length - 1) {
        setShowResults(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
      x.set(0);
    },
    [answers, currentIndex, x]
  );

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsFlipped(false);
    setShowResults(false);
    x.set(0);
  }, [x]);

  if (showResults) {
    return <ResultsView answers={answers} onReset={handleReset} />;
  }

  const question = policyQuestions[currentIndex];
  const progress = ((currentIndex + 1) / policyQuestions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        <span className="text-sm font-bold text-[var(--text-secondary)] shrink-0">
          {currentIndex + 1}/{policyQuestions.length}
        </span>
      </div>

      {/* Card Stack */}
      <div className="relative h-[380px] w-full max-w-[340px] mx-auto">
        {policyQuestions
          .slice(currentIndex, currentIndex + 3)
          .reverse()
          .map((q, stackIndex) => {
            const visibleCount = Math.min(
              3,
              policyQuestions.length - currentIndex
            );
            const isTop = stackIndex === visibleCount - 1;
            const depth = visibleCount - 1 - stackIndex;

            return (
              <motion.div
                key={q.id}
                className="absolute inset-0 bg-white rounded-3xl border border-[var(--border-light)] shadow-xl overflow-hidden will-change-transform"
                style={{
                  zIndex: stackIndex,
                  scale: 1 - depth * 0.05,
                  y: depth * 12,
                  ...(isTop ? { x, rotate } : {}),
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.8}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 100) {
                    handleSwipe(info.offset.x > 0 ? 1 : -1);
                  }
                }}
                onClick={() => isTop && setIsFlipped(!isFlipped)}
              >
                {/* Agree/Disagree overlays */}
                {isTop && (
                  <>
                    <motion.div
                      style={{ opacity: agreeOpacity }}
                      className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-teal-500 text-white font-bold text-lg -rotate-12 z-10"
                    >
                      찬성
                    </motion.div>
                    <motion.div
                      style={{ opacity: disagreeOpacity }}
                      className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-lg rotate-12 z-10"
                    >
                      반대
                    </motion.div>
                  </>
                )}

                {/* Card content */}
                <div className="h-full p-6 flex flex-col" style={{ perspective: 1000 }}>
                  <AnimatePresence mode="wait">
                    {!isFlipped || !isTop ? (
                      <motion.div
                        key="front"
                        initial={{ rotateY: 0 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                            <q.categoryIcon className="w-4 h-4 text-teal-600" />
                          </div>
                          <span className="text-sm font-bold text-teal-600">
                            {q.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] leading-snug mb-4">
                          {q.question}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                          {q.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] mt-4">
                          <Info className="w-3.5 h-3.5" />
                          <span className="text-xs">탭하여 찬반 논거 보기</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ rotateY: -90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <Scale className="w-5 h-5 text-teal-600" />
                          <span className="text-sm font-bold text-teal-600">
                            찬반 논거
                          </span>
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <ThumbsUp className="w-4 h-4 text-teal-500" />
                              <span className="text-sm font-bold text-teal-600">
                                찬성 논거
                              </span>
                            </div>
                            {q.proArgs.map((arg) => (
                              <p
                                key={arg}
                                className="text-xs text-[var(--text-secondary)] leading-relaxed mb-1.5 pl-5"
                              >
                                • {arg}
                              </p>
                            ))}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <ThumbsDown className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-bold text-red-500">
                                반대 논거
                              </span>
                            </div>
                            {q.conArgs.map((arg) => (
                              <p
                                key={arg}
                                className="text-xs text-[var(--text-secondary)] leading-relaxed mb-1.5 pl-5"
                              >
                                • {arg}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] mt-4">
                          <Info className="w-3.5 h-3.5" />
                          <span className="text-xs">탭하여 질문으로 돌아가기</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Swipe Buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={() => handleSwipe(-1)}
          className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors"
        >
          <ThumbsDown className="w-6 h-6 text-red-500" />
        </button>
        <button
          onClick={() => handleSwipe(1)}
          className="w-14 h-14 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center hover:bg-teal-100 transition-colors"
        >
          <ThumbsUp className="w-6 h-6 text-teal-500" />
        </button>
      </div>

      <p className="text-center text-xs text-[var(--text-tertiary)]">
        카드를 좌우로 드래그하거나 버튼을 눌러 응답하세요
      </p>
    </div>
  );
}

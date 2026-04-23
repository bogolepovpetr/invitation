"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { Reaction } from "@/components/ui/Reaction";
import { ScreenProps } from "@/components/GameShell";

export function CharacterTestScreen({ onNext }: ScreenProps) {
  const { characterTest } = content;
  const total = characterTest.questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const diagnosisRef = useRef<HTMLDivElement | null>(null);

  const q = characterTest.questions[index];
  const chosenId = answers[q?.id];
  const chosenOption = q?.options.find((o) => o.id === chosenId);

  const handleSelect = (id: string) => {
    if (chosenId) return;
    setAnswers((p) => ({ ...p, [q.id]: id }));
    window.setTimeout(() => {
      if (index < total - 1) {
        setIndex((i) => i + 1);
      } else {
        setShowDiagnosis(true);
      }
    }, 1300);
  };

  useEffect(() => {
    if (showDiagnosis && diagnosisRef.current) {
      diagnosisRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showDiagnosis]);

  return (
    <ScreenFrame className="pt-12 pb-10">
      <div className="flex flex-col items-center gap-1 mb-3">
        <div className="eyebrow">быстрый тест на характер</div>
        <div className="font-hand text-rose/80 text-[18px] leading-none -rotate-1">
          три подряд
        </div>
      </div>
      <p className="text-cream/60 text-center font-serif italic mb-8">
        {characterTest.intro}
      </p>

      {/* Индикатор прогресса мини-теста — жемчужинки */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {characterTest.questions.map((_, i) => {
          const active = i <= index;
          return (
            <span
              key={i}
              className="h-2 w-2 rounded-full transition-all duration-500"
              style={{
                background: active
                  ? "radial-gradient(circle at 30% 30%, #f4cbd4, #c04257 70%)"
                  : "rgba(239,217,168,0.22)",
                boxShadow: active
                  ? "0 0 10px rgba(232,165,184,0.8)"
                  : "none",
              }}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-6"
        >
          <h2 className="display text-[28px] text-cream text-center">
            {q.question}
          </h2>

          <div className="flex flex-col gap-3">
            {q.options.map((opt) => (
              <NoirButton
                key={opt.id}
                variant="option"
                selected={chosenId === opt.id}
                disabled={!!chosenId && chosenId !== opt.id}
                onClick={() => handleSelect(opt.id)}
              >
                {opt.label}
              </NoirButton>
            ))}
          </div>

          <div className="min-h-[72px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {chosenOption && (
                <Reaction key={chosenOption.id} text={chosenOption.reaction} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showDiagnosis && (
          <motion.div
            ref={diagnosisRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 pt-8 space-y-5"
          >
            <div className="rose-divider text-gold/60 mb-2">
              <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
                <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.8" />
              </svg>
            </div>

            <div className="font-serif italic text-[22px] leading-snug text-cream/90 text-center space-y-1">
              {characterTest.diagnosis.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.4 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="pt-4"
            >
              <NoirButton
                onClick={() =>
                  onNext({
                    id: "character",
                    value: Object.values(answers).join(","),
                  })
                }
              >
                Дальше
              </NoirButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenFrame>
  );
}

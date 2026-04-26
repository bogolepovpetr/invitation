"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ReactionChat } from "@/components/ui/ReactionChat";
import { ScreenProps } from "@/components/GameShell";

export function CharacterTestScreen({ onNext }: ScreenProps) {
  const { characterTest } = content;
  const total = characterTest.questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showNext, setShowNext] = useState(false);
  const nextRef = useRef<HTMLDivElement | null>(null);

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
        setShowNext(true);
      }
    }, 1300);
  };

  useEffect(() => {
    if (showNext && nextRef.current) {
      nextRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showNext]);

  return (
    <ScreenFrame className="pt-12 pb-10">
      <div className="flex flex-col items-center gap-1 mb-3">
        <div className="eyebrow">{characterTest.eyebrow}</div>
      </div>
      <p className="text-cream/60 text-center font-serif italic mb-8 whitespace-pre-line">
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

          <div className="min-h-[88px] flex items-start">
            <AnimatePresence mode="wait">
              {chosenOption && (
                <ReactionChat
                  key={chosenOption.id}
                  text={chosenOption.reaction}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showNext && (
          <motion.div
            ref={nextRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-auto pt-8"
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
        )}
      </AnimatePresence>
    </ScreenFrame>
  );
}

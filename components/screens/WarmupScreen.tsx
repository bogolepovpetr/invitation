"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ReactionChat } from "@/components/ui/ReactionChat";
import { ScreenProps } from "@/components/GameShell";

export function WarmupScreen({ onNext }: ScreenProps) {
  const { warmup } = content;
  const [chosen, setChosen] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);

  const option = warmup.options.find((o) => o.id === chosen);

  const handleSelect = (id: string) => {
    if (chosen) return;
    setChosen(id);
    window.setTimeout(() => setShowNext(true), 1400);
  };

  return (
    <ScreenFrame className="pt-14 pb-8">
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="eyebrow">{warmup.eyebrow}</div>
      </div>

      <h2 className="display text-[32px] text-cream text-center mb-8">
        {warmup.question}
      </h2>

      <div className="flex flex-col gap-3">
        {warmup.options.map((opt) => (
          <NoirButton
            key={opt.id}
            variant="option"
            selected={chosen === opt.id}
            disabled={!!chosen && chosen !== opt.id}
            onClick={() => handleSelect(opt.id)}
          >
            {opt.label}
          </NoirButton>
        ))}
      </div>

      <div className="mt-8 min-h-[80px] flex items-start">
        <AnimatePresence mode="wait">
          {option && <ReactionChat key={option.id} text={option.reaction} />}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-6">
        <AnimatePresence>
          {showNext && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NoirButton
                onClick={() =>
                  onNext({
                    id: "warmup",
                    value: chosen ?? "",
                  })
                }
              >
                Дальше
              </NoirButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScreenFrame>
  );
}

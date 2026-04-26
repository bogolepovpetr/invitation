"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ReactionChat } from "@/components/ui/ReactionChat";
import { ScreenProps } from "@/components/GameShell";

export function StatusScreen({ onNext }: ScreenProps) {
  const { status } = content;
  const [chosen, setChosen] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);

  const chosenOption = status.options.find((o) => o.id === chosen);

  const handleSelect = (id: string) => {
    if (chosen) return;
    setChosen(id);
    window.setTimeout(() => setShowNext(true), 1800);
  };

  return (
    <ScreenFrame className="pt-14 pb-10">
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="eyebrow">{status.eyebrow}</div>
      </div>

      <h2 className="display text-[28px] text-cream text-center mb-10">
        {status.title}
      </h2>

      <div className="flex flex-col gap-3">
        {status.options.map((opt) => (
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

      <div className="mt-8 min-h-[96px] flex items-start">
        <AnimatePresence mode="wait">
          {chosenOption && (
            <ReactionChat key={chosenOption.id} text={chosenOption.reaction} />
          )}
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
                  onNext({ id: "status", value: chosen ?? "" })
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

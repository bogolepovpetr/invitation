"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { Reaction } from "@/components/ui/Reaction";
import { RewardCard } from "@/components/ui/RewardCard";
import { ScreenProps } from "@/components/GameShell";

export function WarmupScreen({ onNext }: ScreenProps) {
  const { warmup } = content;
  const [chosen, setChosen] = useState<string | null>(null);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [rewardSeen, setRewardSeen] = useState(false);

  const option = warmup.options.find((o) => o.id === chosen);

  const handleSelect = (id: string) => {
    if (chosen) return;
    setChosen(id);
    window.setTimeout(() => setRewardOpen(true), 1400);
  };

  return (
    <ScreenFrame className="pt-14 pb-8">
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="eyebrow">вопрос 01</div>
        <div className="font-hand text-rose/80 text-[17px] leading-none -rotate-1">
          разминка
        </div>
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

      <div className="mt-8 min-h-[64px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {option && <Reaction key={option.id} text={option.reaction} />}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-8">
        <AnimatePresence>
          {rewardSeen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
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

      <RewardCard
        open={rewardOpen}
        text={warmup.rewardCard}
        onClose={() => {
          setRewardOpen(false);
          setRewardSeen(true);
        }}
      />
    </ScreenFrame>
  );
}

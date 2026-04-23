"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { Reaction } from "@/components/ui/Reaction";
import { RewardCard } from "@/components/ui/RewardCard";
import { ScreenProps } from "@/components/GameShell";

export function StatusScreen({ onNext }: ScreenProps) {
  const { status } = content;
  const [chosen, setChosen] = useState<string | null>(null);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [rewardSeen, setRewardSeen] = useState(false);

  const chosenOption = status.options.find((o) => o.id === chosen);

  const handleSelect = (id: string) => {
    if (chosen) return;
    setChosen(id);
    window.setTimeout(() => setRewardOpen(true), 1800);
  };

  return (
    <ScreenFrame className="pt-14 pb-10">
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="eyebrow">официальный статус</div>
        <div className="font-hand text-rose/80 text-[17px] leading-none -rotate-1">
          под запись
        </div>
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

      <div className="mt-8 min-h-[80px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {chosenOption && (
            <Reaction key={chosenOption.id} text={chosenOption.reaction} />
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-8">
        <AnimatePresence>
          {rewardSeen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
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

      <RewardCard
        open={rewardOpen}
        text={status.rewardCard}
        variant="stamp"
        stampText="ОФИЦИАЛЬНО"
        onClose={() => {
          setRewardOpen(false);
          setRewardSeen(true);
        }}
      />
    </ScreenFrame>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ReactionChat } from "@/components/ui/ReactionChat";
import { ScreenProps } from "@/components/GameShell";

export function ChoiceCardScreen({ onNext }: ScreenProps) {
  const { choiceCard } = content;
  const [chosen, setChosen] = useState<string | null>(null);

  const chosenOption = choiceCard.options.find((o) => o.id === chosen);

  const handleSelect = (id: string) => {
    if (chosen) return;
    setChosen(id);
  };

  return (
    <ScreenFrame className="pt-14 pb-10">
      <div className="flex flex-col items-center gap-1 mb-10">
        <div className="eyebrow">карточка выбора</div>
        <div className="font-hand text-rose/80 text-[18px] leading-none -rotate-1">
          аккуратно
        </div>
      </div>

      <h2 className="display text-[30px] text-cream text-center mb-10">
        {choiceCard.title}
      </h2>

      <div className="flex flex-col gap-3">
        {choiceCard.options.map((opt) => (
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

      <div className="min-h-[88px] mt-8 flex items-start">
        <AnimatePresence mode="wait">
          {chosenOption && (
            <ReactionChat key={chosenOption.id} text={chosenOption.reaction} />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {chosen && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-2 text-center font-hand text-rose/80 text-[20px] -rotate-1"
          >
            {choiceCard.chemistryNote}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-10">
        <AnimatePresence>
          {chosen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <NoirButton
                onClick={() =>
                  onNext({ id: "choice", value: chosen ?? "" })
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

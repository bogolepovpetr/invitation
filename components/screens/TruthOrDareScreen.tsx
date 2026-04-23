"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { RewardCard } from "@/components/ui/RewardCard";
import { ScreenProps } from "@/components/GameShell";

type Side = "truth" | "dare";

export function TruthOrDareScreen({ onNext }: ScreenProps) {
  const { truthOrDare } = content;
  const [flipped, setFlipped] = useState(false);
  const [side, setSide] = useState<Side | null>(null);
  const [rewardStage, setRewardStage] = useState<
    "idle" | "primary" | "secondary" | "done"
  >("idle");

  const chosen = truthOrDare.options.find((o) => o.id === side);

  const pick = (s: Side) => {
    if (side) return;
    setSide(s);
    setFlipped(true);
    window.setTimeout(() => setRewardStage("primary"), 2200);
  };

  const handleCloseReward = () => {
    if (rewardStage === "primary") {
      if (truthOrDare.rewardCardSecondary) {
        setRewardStage("idle");
        window.setTimeout(() => setRewardStage("secondary"), 450);
      } else {
        setRewardStage("done");
      }
    } else if (rewardStage === "secondary") {
      setRewardStage("done");
    }
  };

  const rewardOpen =
    rewardStage === "primary" || rewardStage === "secondary";
  const rewardText =
    rewardStage === "secondary" && truthOrDare.rewardCardSecondary
      ? truthOrDare.rewardCardSecondary
      : truthOrDare.rewardCard;

  return (
    <ScreenFrame className="pt-14 pb-10">
      <div className="flex flex-col items-center gap-1 mb-4">
        <div className="eyebrow">карточка · переверни её</div>
        <div className="font-hand text-rose/80 text-[17px] leading-none -rotate-1">
          выбирай смелее
        </div>
      </div>

      <h2 className="display text-[28px] text-cream text-center mb-10">
        {truthOrDare.title}
      </h2>

      {/* Flip card */}
      <div className="perspective mx-auto w-full max-w-[320px] aspect-[5/7]">
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 0.8, 0.36, 1] }}
          className="relative w-full h-full preserve-3d"
        >
          {/* Front — «рубашка» с монограммой К */}
          <div className="absolute inset-0 backface-hidden rounded-[22px] overflow-hidden paper-surface flex flex-col items-center justify-center px-6 text-center">
            <CardBack />
          </div>

          {/* Back — открытая сторона с реакцией */}
          <div
            className="absolute inset-0 backface-hidden rounded-[22px] paper-surface flex flex-col items-center justify-center px-7 text-center"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="eyebrow text-gold mb-6">
              {side === "truth" ? "правда" : "действие"}
            </div>
            <div className="rose-divider mb-5 text-gold/60">
              <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden>
                <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
            <div className="font-serif text-cream text-[22px] italic leading-[1.35] whitespace-pre-line">
              {chosen?.reaction}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3">
        {truthOrDare.options.map((opt) => (
          <NoirButton
            key={opt.id}
            variant={side === opt.id ? "primary" : "option"}
            disabled={!!side && side !== opt.id}
            onClick={() => pick(opt.id)}
          >
            {opt.label}
          </NoirButton>
        ))}
      </div>

      <div className="mt-auto pt-10">
        <AnimatePresence>
          {rewardStage === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <NoirButton
                onClick={() =>
                  onNext({ id: "truth-or-dare", value: side ?? "" })
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
        text={rewardText}
        onClose={handleCloseReward}
      />
    </ScreenFrame>
  );
}

/** Рубашка игральной карты с монограммой К. */
function CardBack() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      {/* Двойная золотая рамка */}
      <div
        className="absolute inset-3 rounded-[16px]"
        style={{ boxShadow: "inset 0 0 0 1px rgba(217,182,121,0.35)" }}
      />
      <div
        className="absolute inset-5 rounded-[12px]"
        style={{ boxShadow: "inset 0 0 0 1px rgba(217,182,121,0.18)" }}
      />

      {/* Сетка узора */}
      <svg
        className="absolute inset-6 opacity-25"
        viewBox="0 0 100 140"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern
            id="rosePattern"
            x="0"
            y="0"
            width="18"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="9" cy="13" r="1.4" fill="rgba(232,165,184,0.8)" />
            <circle cx="0" cy="0" r="0.8" fill="rgba(217,182,121,0.6)" />
            <circle cx="18" cy="26" r="0.8" fill="rgba(217,182,121,0.6)" />
            <path
              d="M0,13 L18,13 M9,0 L9,26"
              stroke="rgba(217,182,121,0.18)"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100" height="140" fill="url(#rosePattern)" />
      </svg>

      {/* Центральная монограмма */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(239,217,168,0.3), rgba(139,30,46,0.25) 70%)",
            boxShadow:
              "inset 0 0 0 1px rgba(217,182,121,0.55), 0 0 20px rgba(192,66,87,0.25)",
          }}
        >
          <span
            className="font-serif italic text-[52px] leading-none text-gold-soft"
            style={{
              textShadow: "0 0 20px rgba(232,165,184,0.45)",
            }}
          >
            К
          </span>
        </div>
        <div className="eyebrow text-gold/70">правда · действие</div>
      </div>

      {/* Надпись в углах */}
      <span className="absolute top-6 left-6 font-serif italic text-gold/50 text-[12px] leading-none">
        к
      </span>
      <span className="absolute bottom-6 right-6 font-serif italic text-gold/50 text-[12px] leading-none rotate-180">
        к
      </span>
    </div>
  );
}

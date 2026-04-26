"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ScreenProps } from "@/components/GameShell";

export function PreFinalScreen({ onNext }: ScreenProps) {
  const { preFinal } = content;
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= preFinal.bullets.length) return;
    const t = window.setTimeout(() => setRevealed((r) => r + 1), 1100);
    return () => window.clearTimeout(t);
  }, [revealed, preFinal.bullets.length]);

  const allShown = revealed >= preFinal.bullets.length;

  return (
    <ScreenFrame className="pt-14 pb-10">
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="eyebrow">{preFinal.eyebrow}</div>
      </div>

      <div className="space-y-3 font-serif italic text-[24px] leading-snug text-cream text-center mb-10">
        {preFinal.intro.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3 + i * 0.4, duration: 0.7 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div className="rose-divider mb-8 text-gold/60">
        <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      <ol className="space-y-5 mb-auto">
        {preFinal.bullets.map((text, i) => (
          <AnimatePresence key={i}>
            {i < revealed && (
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="flex gap-4 items-start"
              >
                <span
                  className="font-serif italic text-[22px] leading-none mt-1"
                  style={{
                    color: "#efd9a8",
                    textShadow: "0 0 12px rgba(232,165,184,0.4)",
                  }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="font-serif text-[18px] leading-snug text-cream/90">
                  {text}
                </span>
              </motion.li>
            )}
          </AnimatePresence>
        ))}
      </ol>

      <AnimatePresence>
        {allShown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-10"
          >
            <NoirButton onClick={() => onNext()}>
              {preFinal.button}
            </NoirButton>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenFrame>
  );
}

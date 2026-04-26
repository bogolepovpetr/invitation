"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ScreenProps } from "@/components/GameShell";

export function IntroScreen({ onNext }: ScreenProps) {
  const { intro } = content;

  const stagger = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 0.15 + i * 0.25, duration: 0.85, ease: [0.22, 0.8, 0.36, 1] },
    }),
  };

  return (
    <ScreenFrame className="justify-between pt-16 pb-10">
      <div className="flex flex-col items-center gap-2">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-hand text-rose text-[22px] leading-none -rotate-2"
        >
          {intro.kicker}
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-7">
        {/* Декоративная роза-орнамент */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          custom={2}
          className="rose-divider text-gold/60"
        >
          <RoseOrnament />
        </motion.div>

        <motion.h1
          variants={stagger}
          initial="hidden"
          animate="show"
          custom={3}
          className="display text-[42px] sm:text-[48px] text-cream text-center"
          style={{
            textShadow: "0 2px 40px rgba(232,165,184,0.25)",
          }}
        >
          {intro.title}
        </motion.h1>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          custom={4}
          className="font-serif italic text-[20px] leading-snug text-cream/75 text-center"
        >
          {intro.subtitle.map((line, i) => (
            <p key={i} className={line ? "" : "h-3"}>
              {line || "\u00A0"}
            </p>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        custom={5}
      >
        <NoirButton onClick={() => onNext()}>{intro.button}</NoirButton>
      </motion.div>
    </ScreenFrame>
  );
}

function RoseOrnament() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path
        d="M12 6 Q13 9 12 12 Q11 9 12 6 Z M18 12 Q15 13 12 12 Q15 11 18 12 Z M12 18 Q11 15 12 12 Q13 15 12 18 Z M6 12 Q9 11 12 12 Q9 13 6 12 Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

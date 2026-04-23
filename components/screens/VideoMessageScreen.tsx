"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ScreenProps } from "@/components/GameShell";

export function VideoMessageScreen({ onNext }: ScreenProps) {
  const { videoMessage } = content;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [hasSource, setHasSource] = useState(true);

  useEffect(() => {
    if (!started || ended) return;
    const t = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [started, ended]);

  const canSkip = ended || elapsed >= videoMessage.skipAfterSec;

  const start = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      setHasSource(false);
    });
    setStarted(true);
  };

  const stagger = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 0.1 + i * 0.2, duration: 0.7, ease: [0.22, 0.8, 0.36, 1] },
    }),
  };

  return (
    <ScreenFrame className="pt-14 pb-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        custom={0}
        className="eyebrow text-center text-gold/80 mb-2"
      >
        {videoMessage.kicker}
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        custom={1}
        className="font-hand text-rose text-[20px] text-center -rotate-1 mb-2"
      >
        без шуток
      </motion.div>

      <motion.h2
        variants={stagger}
        initial="hidden"
        animate="show"
        custom={2}
        className="display text-[26px] text-cream text-center mb-2"
      >
        {videoMessage.title}
      </motion.h2>

      <motion.p
        variants={stagger}
        initial="hidden"
        animate="show"
        custom={3}
        className="text-cream/60 italic font-serif text-center text-[15px] mb-8 px-2"
      >
        {videoMessage.subtitle}
      </motion.p>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        custom={4}
        className="relative mx-auto w-full max-w-[340px] aspect-[9/16] rounded-[20px] overflow-hidden paper-surface"
      >
        {/* Тонкая золотая внутренняя рамка */}
        <div
          className="absolute inset-2 rounded-[14px] pointer-events-none z-10"
          style={{ boxShadow: "inset 0 0 0 1px rgba(217,182,121,0.25)" }}
        />
        <video
          ref={videoRef}
          src={assetPath(videoMessage.videoSrc)}
          poster={videoMessage.poster ? assetPath(videoMessage.poster) : undefined}
          playsInline
          preload="metadata"
          controls={started}
          onEnded={() => setEnded(true)}
          onError={() => setHasSource(false)}
          className={`absolute inset-0 h-full w-full object-cover ${
            started ? "" : "opacity-50"
          }`}
        />

        {!started && (
          <button
            type="button"
            onClick={start}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cream/90 active:scale-[0.99] transition-transform z-20"
          >
            <motion.span
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 0 0 rgba(232,165,184,0)",
                  "0 0 36px 4px rgba(232,165,184,0.55)",
                  "0 0 0 0 rgba(232,165,184,0)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 backdrop-blur-sm"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(232,165,184,0.5), rgba(139,30,46,0.55) 70%)",
              }}
            >
              <PlayIcon />
            </motion.span>
            <span className="eyebrow text-cream/70">нажми play</span>
            {!hasSource && (
              <span className="mt-1 px-6 text-center font-serif italic text-cream/60 text-[14px] leading-snug whitespace-pre-line">
                {videoMessage.placeholder}
              </span>
            )}
          </button>
        )}
      </motion.div>

      <div className="mt-auto pt-10">
        <AnimatePresence>
          {canSkip && (
            <motion.div
              key="next"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NoirButton onClick={() => onNext()}>
                {videoMessage.nextButton}
              </NoirButton>
            </motion.div>
          )}
          {!canSkip && started && (
            <motion.p
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="eyebrow text-cream/45 text-center"
            >
              кнопка появится через {Math.max(0, videoMessage.skipAfterSec - elapsed)} сек
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </ScreenFrame>
  );
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
    </svg>
  );
}

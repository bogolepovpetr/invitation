"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { assetPath } from "@/lib/assetPath";

/**
 * Тихая фоновая музыка.
 * - Файл: /audio/background.mp3
 * - Громкость стартует ~22%
 * - Старт после первого клика/тапа пользователя (autoplay policy)
 * - Кнопка mute в правом верхнем углу
 */
export function AudioPlayer() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.volume = 0.22;

    const start = () => {
      if (started) return;
      el.play().catch(() => {
        /* autoplay policies — тихо игнорируем */
      });
      setStarted(true);
    };

    const handler = () => {
      start();
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };
    window.addEventListener("pointerdown", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [started]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  return (
    <>
      <audio ref={ref} src={assetPath("/audio/background.mp3")} loop preload="auto" />
      <motion.button
        type="button"
        aria-label={muted ? "Включить звук" : "Выключить звук"}
        onClick={() => setMuted((m) => !m)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-3 right-3 z-[60] h-11 w-11 rounded-full border border-gold/30 bg-plum-deep/70 backdrop-blur-md text-cream/75 hover:text-cream hover:border-gold/60 transition-colors flex items-center justify-center shadow-[0_0_20px_-6px_rgba(232,165,184,0.5)]"
        style={{
          bottom: "max(0.75rem, env(safe-area-inset-bottom))",
          right: "max(0.75rem, env(safe-area-inset-right))",
        }}
      >
        {muted ? <IconMuted /> : <IconSound />}
      </motion.button>
    </>
  );
}

function IconSound() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10v4h3l5 4V6L7 10H4z"
        fill="currentColor"
      />
      <path
        d="M15.5 8.5a5 5 0 010 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18 6a9 9 0 010 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMuted() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10v4h3l5 4V6L7 10H4z" fill="currentColor" />
      <path
        d="M16 9l5 5M21 9l-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

"use client";

import { motion } from "framer-motion";

/**
 * Реакция в виде пузырька-сообщения «от автора».
 * Слева — круглая печать с инициалом «П», справа — пузырь с хвостиком вверху-слева.
 * Появляется в потоке страницы (не как модалка/всплывашка).
 */
export function ReactionChat({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12, y: 6 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: -8, y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.7 }}
      className="flex items-start gap-2.5 w-full max-w-[92%]"
    >
      {/* Аватар-печать */}
      <motion.div
        initial={{ scale: 0.4, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 16,
          delay: 0.05,
        }}
        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, #f4cbd4, #8b1e2e 60%, #5a0f1d 100%)",
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(0,0,0,0.35), 0 6px 14px -6px rgba(90,15,29,0.85)",
        }}
        aria-hidden
      >
        <span className="font-serif italic text-cream/95 text-[15px] leading-none pt-0.5">
          П
        </span>
      </motion.div>

      {/* Пузырёк */}
      <div
        className="relative flex-1 rounded-[18px] rounded-tl-[4px] px-4 py-3.5"
        style={{
          background:
            "linear-gradient(160deg, rgba(44,18,30,0.96) 0%, rgba(22,10,16,0.96) 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(217,182,121,0.32), 0 14px 28px -16px rgba(0,0,0,0.8), 0 0 22px -10px rgba(232,165,184,0.4)",
        }}
      >
        {/* Хвостик пузырька — маленький треугольник в верхнем-левом углу */}
        <span
          aria-hidden
          className="absolute -left-[6px] top-2 h-3 w-3 rotate-45"
          style={{
            background:
              "linear-gradient(160deg, rgba(44,18,30,0.96) 0%, rgba(22,10,16,0.96) 100%)",
            boxShadow: "inset 0 0 0 1px rgba(217,182,121,0.32)",
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />

        <p className="font-serif italic text-cream/95 text-[17px] leading-[1.45] whitespace-pre-line">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

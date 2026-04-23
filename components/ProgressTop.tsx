"use client";

import { motion } from "framer-motion";

/**
 * «Жемчужная нить» — верхний прогресс.
 * Точки-маркеры по числу шагов, тонкая золотая линия между ними,
 * справа пульсирующая подарочная шкатулка/бант на финале.
 */
export function ProgressTop({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  const progress = Math.min(1, Math.max(0, (step + 1) / total));
  const isFinal = step >= total - 1;
  const dots = Math.max(total - 1, 1);

  return (
    <div
      className="fixed left-0 right-0 z-[55] pointer-events-none"
      style={{ top: "env(safe-area-inset-top)" }}
    >
      <div className="relative mx-auto flex w-full max-w-[440px] items-center gap-3 px-5 pt-3">
        {/* Нить: точки + подсвеченная линия */}
        <div className="relative h-5 flex-1">
          {/* Базовая хайрлайновая нить */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-cream/10" />

          {/* Подсвеченная часть нити */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(217,182,121,0.55) 0%, rgba(232,165,184,0.95) 60%, rgba(217,182,121,0.9) 100%)",
              boxShadow: "0 0 10px rgba(232,165,184,0.5)",
            }}
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.9, ease: [0.22, 0.8, 0.36, 1] }}
          />

          {/* Точки-жемчужины */}
          <div className="absolute inset-0 flex items-center justify-between">
            {Array.from({ length: dots }).map((_, i) => {
              const active = i <= step;
              return (
                <motion.span
                  key={i}
                  animate={
                    active
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.85, opacity: 0.6 }
                  }
                  transition={{ duration: 0.5 }}
                  className="block h-[6px] w-[6px] rounded-full"
                  style={{
                    background: active
                      ? "radial-gradient(circle at 30% 30%, #f4cbd4, #c04257 70%)"
                      : "rgba(239,217,168,0.25)",
                    boxShadow: active
                      ? "0 0 10px rgba(232,165,184,0.8), inset 0 0.5px 0 rgba(255,255,255,0.4)"
                      : "none",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Подарочная шкатулка с бантом */}
        <motion.div
          animate={
            isFinal
              ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, -4, 4, 0],
                }
              : { scale: 1 }
          }
          transition={
            isFinal
              ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 }
          }
          className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-700 ${
            isFinal
              ? "border border-gold/70 bg-gradient-to-br from-wine/50 via-wine-glow/35 to-rose/25 text-cream shadow-[0_0_22px_-4px_rgba(232,165,184,0.8)]"
              : "border border-gold/25 bg-plum/60 text-cream/70 backdrop-blur-sm"
          }`}
        >
          <GiftBoxIcon active={isFinal} />
          {isFinal && (
            <motion.span
              aria-hidden
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-xl"
              style={{
                boxShadow: "0 0 28px 2px rgba(232,165,184,0.6)",
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function GiftBoxIcon({ active }: { active: boolean }) {
  const gold = active ? "#efd9a8" : "rgba(239,217,168,0.75)";
  const strap = active ? "#f4cbd4" : "rgba(232,165,184,0.7)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* box */}
      <rect
        x="4"
        y="10"
        width="16"
        height="10"
        rx="1.2"
        stroke={gold}
        strokeWidth="1.3"
      />
      <rect
        x="3.2"
        y="8"
        width="17.6"
        height="3.2"
        rx="1"
        stroke={gold}
        strokeWidth="1.3"
      />
      {/* vertical ribbon */}
      <path d="M12 8v12" stroke={strap} strokeWidth="1.3" />
      {/* bow */}
      <path
        d="M12 8c-1.5-2-4-2.5-4.5-1s1 3 4.5 1zM12 8c1.5-2 4-2.5 4.5-1s-1 3-4.5 1z"
        stroke={strap}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

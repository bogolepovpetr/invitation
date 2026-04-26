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
      <div className="relative mx-auto flex w-full max-w-[440px] items-center gap-3 px-5 pt-2">
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

        {/* Подарочная шкатулка с бантом — большая, постоянно «дышит» */}
        <motion.div
          animate={
            isFinal
              ? {
                  scale: [1, 1.14, 1],
                  rotate: [0, -6, 6, -3, 3, 0],
                  y: [0, -2, 0],
                }
              : {
                  scale: [1, 1.04, 1],
                  rotate: [0, -2, 2, 0],
                  y: [0, -1, 0],
                }
          }
          transition={
            isFinal
              ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
          className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-700 ${
            isFinal
              ? "border border-gold/80 bg-gradient-to-br from-wine via-wine-glow to-rose/55 text-cream shadow-[0_0_36px_-4px_rgba(232,165,184,0.95),inset_0_1px_0_rgba(255,255,255,0.2)]"
              : "border border-gold/45 bg-gradient-to-br from-plum-soft via-wine/30 to-plum text-cream shadow-[0_0_18px_-6px_rgba(232,165,184,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"
          }`}
          style={{
            backdropFilter: "blur(6px)",
          }}
        >
          <GiftBoxIcon active={isFinal} />

          {/* Постоянное мягкое свечение */}
          <motion.span
            aria-hidden
            animate={{ opacity: isFinal ? [0.45, 1, 0.45] : [0.25, 0.55, 0.25] }}
            transition={{ duration: isFinal ? 1.6 : 3, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: isFinal
                ? "0 0 38px 4px rgba(232,165,184,0.75)"
                : "0 0 22px 1px rgba(232,165,184,0.35)",
            }}
          />

          {/* Искры по углам — оживляют коробочку */}
          <Sparkle
            className="absolute -top-1 -right-1"
            delay={0}
            color={isFinal ? "#efd9a8" : "#f4cbd4"}
          />
          <Sparkle
            className="absolute -bottom-1 -left-1"
            delay={1.4}
            color={isFinal ? "#f4cbd4" : "#efd9a8"}
            small
          />
          {isFinal && (
            <Sparkle
              className="absolute top-1 -left-2"
              delay={0.7}
              color="#efd9a8"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function GiftBoxIcon({ active }: { active: boolean }) {
  const gold = active ? "#efd9a8" : "#d9b679";
  const strap = active ? "#f4cbd4" : "#e8a5b8";
  const boxFill = active
    ? "url(#giftBoxGradActive)"
    : "url(#giftBoxGrad)";

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      style={{
        filter: active
          ? "drop-shadow(0 2px 6px rgba(232,165,184,0.6))"
          : "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
      }}
    >
      <defs>
        <linearGradient id="giftBoxGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b1e2e" />
          <stop offset="100%" stopColor="#5a0f1d" />
        </linearGradient>
        <linearGradient id="giftBoxGradActive" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c04257" />
          <stop offset="100%" stopColor="#8b1e2e" />
        </linearGradient>
      </defs>

      {/* Корпус коробки */}
      <rect
        x="5"
        y="13"
        width="22"
        height="14"
        rx="1.6"
        fill={boxFill}
        stroke={gold}
        strokeWidth="1.4"
      />
      {/* Крышка */}
      <rect
        x="3.5"
        y="10"
        width="25"
        height="4.5"
        rx="1.2"
        fill={boxFill}
        stroke={gold}
        strokeWidth="1.4"
      />

      {/* Вертикальная лента */}
      <rect
        x="14.6"
        y="10"
        width="2.8"
        height="17"
        fill={strap}
        opacity="0.9"
      />
      {/* Подложка ленты — золотая полоска */}
      <path
        d="M16 10 L16 27"
        stroke={gold}
        strokeWidth="0.6"
        opacity="0.7"
      />

      {/* Большой бант сверху */}
      <path
        d="M16 10 C13 6, 8 6, 8.5 9 C9 11.5, 13 11, 16 10 Z"
        fill={strap}
        stroke={gold}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M16 10 C19 6, 24 6, 23.5 9 C23 11.5, 19 11, 16 10 Z"
        fill={strap}
        stroke={gold}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Узел банта */}
      <ellipse
        cx="16"
        cy="10"
        rx="1.6"
        ry="1.4"
        fill={gold}
        stroke={active ? "#b8914f" : "#8a6a3b"}
        strokeWidth="0.5"
      />

      {/* Блик на крышке */}
      <path
        d="M5.5 11.5 L9 11.5"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sparkle({
  className,
  delay = 0,
  color = "#efd9a8",
  small = false,
}: {
  className?: string;
  delay?: number;
  color?: string;
  small?: boolean;
}) {
  const size = small ? 6 : 9;
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={className}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        filter: `drop-shadow(0 0 4px ${color})`,
      }}
    >
      <path
        d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
        fill={color}
      />
    </motion.svg>
  );
}

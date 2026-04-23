"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Амбиент-слой: живой фон, который создаёт «воздух».
 * - Мягкий двигающийся прожектор сверху.
 * - Плывущие золотые частицы.
 * - Декоративные SVG-ленты по краям.
 * Полностью неинтерактивный, лежит между body-фоном и UI.
 */
export function Ambience() {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2,
        dur: 14 + Math.random() * 10,
        delay: Math.random() * 6,
        drift: 20 + Math.random() * 30,
        hue: Math.random() > 0.55 ? "rgba(239,217,168,0.85)" : "rgba(232,165,184,0.75)",
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Двигающийся «прожектор» сверху */}
      <motion.div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[520px] w-[720px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,165,184,0.16), rgba(192,66,87,0.08) 40%, transparent 70%)",
          filter: "blur(14px)",
        }}
        animate={{ x: [-140, 140, -140], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Нижний тёплый «боке» */}
      <motion.div
        className="absolute -bottom-[15%] right-[-10%] h-[460px] w-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,182,121,0.14), rgba(139,30,46,0.08) 45%, transparent 75%)",
          filter: "blur(10px)",
        }}
        animate={{ x: [0, -60, 0], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Левое боке */}
      <motion.div
        className="absolute top-1/3 -left-[12%] h-[340px] w-[440px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(192,66,87,0.14), transparent 70%)",
          filter: "blur(14px)",
        }}
        animate={{ y: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Золотые частицы */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.hue,
            boxShadow: `0 0 ${p.size * 4}px ${p.hue}`,
            mixBlendMode: "screen",
          }}
          animate={{
            y: [0, -p.drift, 0],
            x: [0, p.drift * 0.4, 0],
            opacity: [0.1, 0.9, 0.1],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Декоративные шёлковые ленты SVG, слева сверху и справа снизу */}
      <svg
        className="absolute -top-8 -left-6 w-[280px] h-[180px] opacity-40"
        viewBox="0 0 280 180"
        fill="none"
        aria-hidden
      >
        <path
          d="M-20,40 C60,0 120,90 220,40 S320,90 320,60"
          stroke="url(#ribbon1)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-20,80 C80,50 140,130 240,80"
          stroke="url(#ribbon1)"
          strokeWidth="0.6"
          fill="none"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="ribbon1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(217,182,121,0)" />
            <stop offset="50%" stopColor="rgba(217,182,121,0.6)" />
            <stop offset="100%" stopColor="rgba(232,165,184,0)" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute -bottom-6 -right-8 w-[320px] h-[200px] opacity-35"
        viewBox="0 0 320 200"
        fill="none"
        aria-hidden
      >
        <path
          d="M340,40 C260,80 200,10 100,70 S0,40 -20,80"
          stroke="url(#ribbon2)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M340,120 C240,90 180,160 80,120"
          stroke="url(#ribbon2)"
          strokeWidth="0.6"
          fill="none"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="ribbon2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(232,165,184,0)" />
            <stop offset="50%" stopColor="rgba(232,165,184,0.55)" />
            <stop offset="100%" stopColor="rgba(217,182,121,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Общий контейнер для каждого экрана.
 * Задаёт «телефонную» колонку max-width, safe-area, вертикальный ритм
 * и анимацию появления/исчезновения (fade + slide + blur-in).
 */
export function ScreenFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
      transition={{ duration: 0.65, ease: [0.22, 0.8, 0.36, 1] }}
      className={`relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col px-6 safe-top safe-bottom ${className}`}
    >
      {children}
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";

export function ChemistryBar({
  value,
  note,
}: {
  value: number;
  note?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full px-1">
      <div className="flex items-baseline justify-between mb-2 text-cream/60 text-xs uppercase tracking-[0.2em]">
        <span>уровень химии</span>
        <motion.span
          key={clamped}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-base text-cream"
        >
          {clamped}%
        </motion.span>
      </div>
      <div className="h-[6px] rounded-full bg-cream/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-wine-deep via-wine to-wine-glow"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1.1, ease: [0.22, 0.8, 0.36, 1] }}
        />
      </div>
      {note && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-2 text-xs text-cream/50 italic text-right"
        >
          {note}
        </motion.p>
      )}
    </div>
  );
}

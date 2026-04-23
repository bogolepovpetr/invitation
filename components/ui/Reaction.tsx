"use client";

import { motion } from "framer-motion";

export function Reaction({ text }: { text: string }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 0.8, 0.36, 1] }}
      className="text-center px-2"
    >
      <p className="relative inline-block text-cream/85 font-serif italic text-[18px] leading-snug whitespace-pre-line">
        <span
          aria-hidden
          className="absolute -left-5 -top-2 font-serif text-gold/50 text-[30px] leading-none select-none"
        >
          &ldquo;
        </span>
        {text}
        <span
          aria-hidden
          className="font-serif text-gold/50 text-[30px] leading-none align-[-0.25em] ml-1 select-none"
        >
          &rdquo;
        </span>
      </p>
    </motion.div>
  );
}

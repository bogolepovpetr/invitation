"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "ghost" | "option";

interface NoirButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  selected?: boolean;
}

const base =
  "group relative w-full min-h-[56px] px-5 py-3.5 rounded-2xl text-[15px] leading-snug font-sans tracking-wide transition-all duration-300 select-none touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-40 disabled:pointer-events-none overflow-hidden";

const variants: Record<Variant, string> = {
  primary:
    "text-cream border border-gold/40 shadow-[0_18px_40px_-18px_rgba(192,66,87,0.75),inset_0_1px_0_rgba(255,255,255,0.12)] bg-[linear-gradient(135deg,#5a0f1d_0%,#8b1e2e_45%,#c04257_80%,#e8a5b8_100%)] hover:shadow-[0_22px_48px_-16px_rgba(232,165,184,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] active:scale-[0.99]",
  ghost:
    "text-cream border border-gold/30 bg-cream/[0.03] backdrop-blur-xl hover:border-gold/60 hover:bg-cream/[0.06] active:scale-[0.99]",
  option:
    "text-cream/90 border border-gold/15 bg-cream/[0.03] backdrop-blur-xl text-left pl-7 hover:border-gold/45 hover:bg-cream/[0.06] active:scale-[0.995]",
};

export const NoirButton = forwardRef<HTMLButtonElement, NoirButtonProps>(
  function NoirButton(
    { variant = "primary", selected, className = "", children, ...rest },
    ref,
  ) {
    const isOption = variant === "option";
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.985 }}
        className={`${base} ${variants[variant]} ${
          selected
            ? "border-gold/70 bg-gradient-to-br from-wine/25 via-wine-glow/15 to-rose/20 text-cream shadow-[0_0_24px_-6px_rgba(232,165,184,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]"
            : ""
        } ${className}`}
        {...(rest as any)}
      >
        {isOption && (
          <span
            aria-hidden
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              selected
                ? "bg-gold shadow-[0_0_10px_rgba(217,182,121,0.9)]"
                : "bg-gold/40 group-hover:bg-gold/70"
            }`}
          />
        )}
        {variant === "primary" && !rest.disabled && (
          <span aria-hidden className="cta-shimmer" />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  },
);

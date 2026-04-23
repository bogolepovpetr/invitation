"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type RewardVariant = "default" | "stamp";

export function RewardCard({
  open,
  text,
  onClose,
  hint = "Коснись, чтобы закрыть",
  variant = "default",
  stampText = "ОФИЦИАЛЬНО",
}: {
  open: boolean;
  text: string;
  onClose: () => void;
  hint?: string;
  variant?: RewardVariant;
  stampText?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="reward-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-plum-deep/85 backdrop-blur-md px-6"
        >
          <motion.div
            key="reward-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: -18, y: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 22,
              mass: 0.7,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[360px] rounded-[20px] paper-surface px-8 py-11 text-center"
          >
            {/* Wax seal / stamp */}
            {variant === "stamp" ? (
              <motion.div
                initial={{ scale: 0.4, opacity: 0, rotate: -25 }}
                animate={{ scale: 1, opacity: 1, rotate: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 10,
                  delay: 0.25,
                }}
                className="absolute top-6 right-5 pointer-events-none"
              >
                <Stamp text={stampText} />
              </motion.div>
            ) : (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <WaxSeal />
              </div>
            )}

            {/* Corner ornaments */}
            <CornerOrnament className="absolute top-3 left-3" />
            <CornerOrnament className="absolute top-3 right-3 scale-x-[-1]" />
            <CornerOrnament className="absolute bottom-3 left-3 scale-y-[-1]" />
            <CornerOrnament className="absolute bottom-3 right-3 scale-[-1]" />

            <div className="mt-3 eyebrow mb-5">награда</div>

            <div className="rose-divider mb-5 text-gold/60">
              <RoseDot />
            </div>

            <p className="font-serif text-[22px] leading-[1.35] text-cream italic whitespace-pre-line">
              {text}
            </p>

            <button
              onClick={onClose}
              className="mt-8 text-[10px] uppercase tracking-[0.35em] text-gold/60 hover:text-gold transition-colors"
            >
              {hint}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WaxSeal() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
      className="relative h-12 w-12 rounded-full flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #e8a5b8, #8b1e2e 55%, #5a0f1d 100%)",
        boxShadow:
          "0 8px 18px -6px rgba(90,15,29,0.9), inset 0 2px 3px rgba(255,255,255,0.35), inset 0 -4px 8px rgba(0,0,0,0.35)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3l2.6 5.3 5.8.9-4.2 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.6 9.2l5.8-.9L12 3z"
          fill="rgba(255,240,210,0.9)"
        />
      </svg>
    </motion.div>
  );
}

function Stamp({ text }: { text: string }) {
  return (
    <div
      className="relative flex items-center justify-center h-20 w-20 rounded-full"
      style={{
        border: "2px solid rgba(192,66,87,0.85)",
        boxShadow:
          "0 0 0 4px rgba(192,66,87,0.15), inset 0 0 0 1px rgba(232,165,184,0.5)",
        opacity: 0.85,
        mixBlendMode: "screen" as any,
      }}
    >
      <div
        className="absolute inset-[5px] rounded-full"
        style={{ border: "1px solid rgba(232,165,184,0.65)" }}
      />
      <span
        className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-rose-pale text-center leading-none"
        style={{ textShadow: "0 0 6px rgba(192,66,87,0.8)" }}
      >
        {text}
      </span>
    </div>
  );
}

function RoseDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.8" />
      <circle
        cx="8"
        cy="8"
        r="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.45"
      />
    </svg>
  );
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M2 2 L10 2 M2 2 L2 10"
        stroke="rgba(217,182,121,0.6)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="10.5" cy="2" r="1" fill="rgba(217,182,121,0.7)" />
      <circle cx="2" cy="10.5" r="1" fill="rgba(217,182,121,0.7)" />
    </svg>
  );
}

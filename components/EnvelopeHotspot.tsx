"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "@/lib/content";

/**
 * «Скрытый» конвертик в левом нижнем углу.
 * Настоящий SVG-конверт с восковой печатью и рукописной подписью «для К.».
 * Появляется только если visible=true и ещё не открыт.
 */
export function EnvelopeHotspot({
  visible,
  onOpened,
}: {
  visible: boolean;
  onOpened: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { envelopeBonus } = content;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    window.setTimeout(() => onOpened(), 250);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            key="envelope-hotspot"
            type="button"
            aria-label="Скрытое письмо"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 12, rotate: -6 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [-3, 3, -3],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.7 },
              y: { duration: 0.5 },
              rotate: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.06, rotate: 0 }}
            whileTap={{ scale: 0.96 }}
            className="fixed z-[56] group"
            style={{
              bottom: "max(1rem, env(safe-area-inset-bottom))",
              left: "max(1rem, env(safe-area-inset-left))",
              filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.6))",
            }}
          >
            <MiniEnvelope />
            {/* Подпись от руки «для К.» */}
            <span className="absolute -top-1 left-full ml-1 whitespace-nowrap font-hand text-rose/80 text-[15px] leading-none opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              для К.
            </span>
            {/* red dot badge */}
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose shadow-[0_0_12px_rgba(232,165,184,0.95)]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="envelope-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-plum-deep/90 backdrop-blur-md px-6"
          >
            <motion.div
              key="envelope-letter"
              initial={{ opacity: 0, scale: 0.9, rotateX: -12, y: 12 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 22,
                mass: 0.7,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[360px] rounded-[18px] paper-surface px-8 py-11 text-center"
            >
              {/* Wax seal */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 14,
                    delay: 0.15,
                  }}
                  className="relative h-12 w-12 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #e8a5b8, #8b1e2e 55%, #5a0f1d 100%)",
                    boxShadow:
                      "0 8px 18px -6px rgba(90,15,29,0.9), inset 0 2px 3px rgba(255,255,255,0.35), inset 0 -4px 8px rgba(0,0,0,0.35)",
                  }}
                >
                  <span className="font-serif italic text-cream/95 text-[16px] leading-none pt-0.5">
                    К
                  </span>
                </motion.div>
              </div>

              {/* Подпись от руки */}
              <div className="font-hand text-rose text-[22px] leading-none mt-2 mb-2 -rotate-3">
                для К.
              </div>

              <div className="eyebrow mb-5">личное</div>

              <div className="rose-divider mb-5">
                <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
                  <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.8" />
                </svg>
              </div>

              <p className="font-serif text-[21px] leading-[1.4] text-cream italic whitespace-pre-line">
                {envelopeBonus.body}
              </p>

              <button
                onClick={handleClose}
                className="mt-8 text-[10px] uppercase tracking-[0.3em] text-gold/60 hover:text-gold transition-colors"
              >
                {envelopeBonus.buttonHint}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MiniEnvelope() {
  return (
    <svg
      width="44"
      height="32"
      viewBox="0 0 44 32"
      fill="none"
      aria-hidden
      className="block"
    >
      {/* body */}
      <rect
        x="1"
        y="5"
        width="42"
        height="26"
        rx="2"
        fill="url(#envBody)"
        stroke="rgba(217,182,121,0.6)"
        strokeWidth="1"
      />
      {/* flap */}
      <path
        d="M1 6 L22 20 L43 6"
        stroke="rgba(217,182,121,0.7)"
        strokeWidth="1"
        strokeLinejoin="round"
        fill="url(#envFlap)"
      />
      {/* wax seal */}
      <circle cx="22" cy="18" r="5" fill="url(#seal)" />
      <circle
        cx="22"
        cy="18"
        r="5"
        fill="none"
        stroke="rgba(255,240,210,0.35)"
        strokeWidth="0.4"
      />
      <defs>
        <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#221019" />
          <stop offset="100%" stopColor="#120809" />
        </linearGradient>
        <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c121c" />
          <stop offset="100%" stopColor="#180a12" />
        </linearGradient>
        <radialGradient id="seal" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f4cbd4" />
          <stop offset="60%" stopColor="#8b1e2e" />
          <stop offset="100%" stopColor="#5a0f1d" />
        </radialGradient>
      </defs>
    </svg>
  );
}

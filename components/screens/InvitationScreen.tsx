"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ScreenProps } from "@/components/GameShell";

type Stage = "sealed" | "opening" | "card";

export function InvitationScreen(_: ScreenProps) {
  const { invitation } = content;
  const [stage, setStage] = useState<Stage>("sealed");
  const [accepted, setAccepted] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleOpen = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    window.setTimeout(() => setStage("card"), 1200);
  };

  const handleAccept = () => {
    if (accepted) return;
    setAccepted(true);
    setConfetti(true);
  };

  return (
    <ScreenFrame className="pt-16 pb-12 justify-center">
      <AnimatePresence>
        {stage !== "card" && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col items-center justify-center gap-6"
          >
            <div className="eyebrow text-gold/90">финал</div>

            <div className="font-hand text-rose text-[24px] leading-none -rotate-2">
              открой меня
            </div>

            <motion.button
              type="button"
              onClick={handleOpen}
              disabled={stage !== "sealed"}
              animate={
                stage === "opening"
                  ? {
                      scale: [1, 1.15, 0.95],
                      rotate: [0, -4, 6, 0],
                    }
                  : {
                      scale: [1, 1.03, 1],
                    }
              }
              transition={
                stage === "opening"
                  ? { duration: 1.1, ease: [0.22, 0.8, 0.36, 1] }
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative"
              style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.7))" }}
            >
              <BigEnvelope opening={stage === "opening"} />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === "sealed" ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="eyebrow text-cream/55"
            >
              {invitation.sealHint}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 18,
              mass: 0.8,
            }}
            className="relative mx-auto w-full max-w-[380px] rounded-[22px] paper-surface px-8 py-10"
          >
            {/* Уголки */}
            <Corner className="absolute top-3 left-3" />
            <Corner className="absolute top-3 right-3 scale-x-[-1]" />
            <Corner className="absolute bottom-3 left-3 scale-y-[-1]" />
            <Corner className="absolute bottom-3 right-3 scale-[-1]" />

            {/* Насечки билета */}
            <div className="absolute -left-2 top-1/3 h-4 w-4 rounded-full bg-plum-deep" />
            <div className="absolute -right-2 top-1/3 h-4 w-4 rounded-full bg-plum-deep" />

            <div className="text-center eyebrow">{invitation.kicker}</div>

            <div className="mt-3 flex justify-center">
              <span className="font-hand text-rose text-[22px] leading-none -rotate-2">
                для Кати
              </span>
            </div>

            <h2 className="mt-5 display text-[28px] text-cream text-center">
              {invitation.title}
            </h2>

            <div className="my-5 rose-divider">
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.85" />
              </svg>
            </div>

            <DateBlock
              options={invitation.dateOptions}
              caption={invitation.dateCaption}
              note={invitation.dateNote}
            />

            <div className="mt-8 space-y-4">
              {!accepted && (
                <NoirButton onClick={handleAccept}>
                  {invitation.accept.label}
                </NoirButton>
              )}

              <AnimatePresence>
                {accepted && (
                  <motion.p
                    key="accept-reaction"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif italic text-center text-[19px] text-cream/95 px-2 whitespace-pre-line"
                  >
                    {invitation.accept.reaction}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* warm glow вспышка при accept */}
      <AnimatePresence>
        {confetti && (
          <motion.div
            key="glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.5] }}
            transition={{ duration: 1.8 }}
            className="pointer-events-none fixed inset-0 z-[45]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(232,165,184,0.55), rgba(217,182,121,0.2) 40%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      <ConfettiBurst active={confetti} />
    </ScreenFrame>
  );
}

function BigEnvelope({ opening }: { opening: boolean }) {
  return (
    <div className="relative h-[180px] w-[260px]">
      {/* body */}
      <div
        className="absolute inset-0 rounded-md border border-gold/50"
        style={{
          background:
            "linear-gradient(145deg, #2a111a 0%, #180a11 55%, #0e0609 100%)",
          boxShadow:
            "0 30px 60px -25px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(217,182,121,0.2)",
        }}
      />
      {/* рамка-орнамент */}
      <div
        className="absolute inset-2 rounded-sm border border-gold/20"
        style={{ pointerEvents: "none" }}
      />
      {/* flap */}
      <motion.div
        animate={opening ? { rotateX: -170, y: -8 } : { rotateX: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 0.8, 0.36, 1] }}
        style={{ transformOrigin: "top center" }}
        className="absolute left-0 right-0 top-0 h-[55%]"
      >
        <div
          className="h-full w-full"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            background:
              "linear-gradient(180deg, #321320 0%, #1b0c13 100%)",
            borderBottom: "1px solid rgba(217,182,121,0.4)",
          }}
        />
      </motion.div>
      {/* seal */}
      <motion.div
        animate={
          opening
            ? { scale: 0, rotate: 30, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #e8a5b8, #8b1e2e 55%, #5a0f1d 100%)",
          boxShadow:
            "0 10px 22px -8px rgba(90,15,29,0.95), inset 0 2px 3px rgba(255,255,255,0.35), inset 0 -5px 10px rgba(0,0,0,0.4)",
        }}
      >
        <span className="font-serif italic text-cream text-[20px] leading-none pt-0.5">
          К
        </span>
      </motion.div>
    </div>
  );
}

function ConfettiBurst({ active }: { active: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 32 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 360,
        y: -Math.random() * 320 - 40,
        r: Math.random() * 300 - 150,
        d: 1.4 + Math.random() * 1.4,
        delay: Math.random() * 0.25,
        hue:
          Math.random() > 0.6
            ? "#efd9a8"
            : Math.random() > 0.3
            ? "#e8a5b8"
            : "#c04257",
        shape: Math.random() > 0.5 ? "bar" : "dot",
      })),
    [],
  );

  useEffect(() => {
    if (!active) return;
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[50] flex items-center justify-center">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: p.x,
            y: p.y,
            rotate: p.r,
          }}
          transition={{
            duration: p.d,
            delay: p.delay,
            ease: [0.22, 0.8, 0.36, 1],
          }}
          className={`absolute ${
            p.shape === "bar" ? "h-2 w-[6px] rounded-sm" : "h-[6px] w-[6px] rounded-full"
          }`}
          style={{
            backgroundColor: p.hue,
            boxShadow: `0 0 8px ${p.hue}`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Блок даты-приглашения: две крупные цифры, между ними золотая «или»,
 * сверху и снизу — тонкие хайрлайны. Под цифрами — caption и handwritten note.
 */
function DateBlock({
  options,
  caption,
  note,
}: {
  options: string[];
  caption: string;
  note: string;
}) {
  const [a, b] = options;

  return (
    <div className="flex flex-col items-center gap-3 my-3">
      {/* Цифры с разделителем «или» */}
      <div className="flex items-center justify-center gap-5">
        <DateCard digit={a ?? ""} delay={0.05} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 240, damping: 18 }}
          className="flex flex-col items-center"
          aria-hidden
        >
          <span
            className="font-serif italic text-[20px] leading-none text-gold"
            style={{ textShadow: "0 0 14px rgba(232,165,184,0.5)" }}
          >
            или
          </span>
          <span
            className="mt-1 block h-px w-7"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(217,182,121,0.7), transparent)",
            }}
          />
        </motion.div>

        <DateCard digit={b ?? ""} delay={0.18} />
      </div>

      {/* Caption: мая · вечером */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="eyebrow text-gold/85"
      >
        {caption}
      </motion.div>

      {/* Handwritten note: когда тебе удобнее */}
      <motion.div
        initial={{ opacity: 0, y: 4, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-hand text-rose text-[20px] leading-none"
      >
        {note}
      </motion.div>
    </div>
  );
}

/** Большая цифра-«билетик» с золотой рамкой, лёгким свечением и блёсткой. */
function DateCard({ digit, delay = 0 }: { digit: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.85, rotate: -4 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 16,
        mass: 0.7,
      }}
      className="relative flex h-[78px] w-[68px] items-center justify-center rounded-xl"
      style={{
        background:
          "linear-gradient(160deg, rgba(36,16,28,0.95) 0%, rgba(22,10,16,0.95) 60%, rgba(36,16,28,0.95) 100%)",
        boxShadow:
          "inset 0 0 0 1px rgba(217,182,121,0.55), inset 0 0 0 5px rgba(217,182,121,0.08), 0 14px 30px -14px rgba(0,0,0,0.85), 0 0 22px -10px rgba(232,165,184,0.4)",
      }}
    >
      {/* Уголки-засечки на билетике */}
      <span
        aria-hidden
        className="absolute top-1.5 left-1.5 h-2 w-2"
        style={{
          borderTop: "1px solid rgba(217,182,121,0.55)",
          borderLeft: "1px solid rgba(217,182,121,0.55)",
        }}
      />
      <span
        aria-hidden
        className="absolute top-1.5 right-1.5 h-2 w-2"
        style={{
          borderTop: "1px solid rgba(217,182,121,0.55)",
          borderRight: "1px solid rgba(217,182,121,0.55)",
        }}
      />
      <span
        aria-hidden
        className="absolute bottom-1.5 left-1.5 h-2 w-2"
        style={{
          borderBottom: "1px solid rgba(217,182,121,0.55)",
          borderLeft: "1px solid rgba(217,182,121,0.55)",
        }}
      />
      <span
        aria-hidden
        className="absolute bottom-1.5 right-1.5 h-2 w-2"
        style={{
          borderBottom: "1px solid rgba(217,182,121,0.55)",
          borderRight: "1px solid rgba(217,182,121,0.55)",
        }}
      />

      {/* Сама цифра */}
      <span
        className="font-serif italic text-cream leading-none"
        style={{
          fontSize: 50,
          textShadow:
            "0 0 18px rgba(232,165,184,0.45), 0 2px 0 rgba(0,0,0,0.4)",
        }}
      >
        {digit}
      </span>

      {/* Постоянное мягкое мерцание ободка */}
      <motion.span
        aria-hidden
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "0 0 16px 1px rgba(232,165,184,0.35)",
        }}
      />
    </motion.div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
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

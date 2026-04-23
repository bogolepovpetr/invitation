"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ScreenProps } from "@/components/GameShell";

export function SliderScreen({ onNext }: ScreenProps) {
  const { slider } = content;
  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);
  const [committed, setCommitted] = useState(false);

  const zone = useMemo(
    () => slider.zones.find((z) => value <= z.max) ?? slider.zones[slider.zones.length - 1],
    [value],
  );

  // Рукописный ярлычок над бегунком
  const tagLabel = useMemo(() => {
    if (value <= 25) return "чуть-чуть…";
    if (value <= 50) return "ну ладно";
    if (value <= 75) return "уже тепло";
    return "ох";
  }, [value]);

  const handleCommit = () => {
    setCommitted(true);
  };

  return (
    <ScreenFrame className="pt-14 pb-10">
      <div className="flex flex-col items-center gap-1 mb-6">
        <div className="eyebrow">шкала честности</div>
        <div className="font-hand text-rose/80 text-[17px] leading-none -rotate-1">
          только без вранья
        </div>
      </div>

      <h2 className="display text-[26px] text-cream text-center mb-12">
        {slider.question}
      </h2>

      <div className="relative px-2 mb-10">
        {/* Ярлычок, который едет вместе с бегунком */}
        <div className="relative h-10 mb-2">
          <motion.div
            className="absolute -translate-x-1/2 font-hand text-rose text-[20px] leading-none whitespace-nowrap"
            animate={{ left: `${value}%`, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {tagLabel}
          </motion.div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
            setTouched(true);
          }}
          className="noir-slider"
          style={
            {
              ["--val" as any]: `${value}%`,
            } as React.CSSProperties
          }
        />
        <div className="flex justify-between eyebrow text-cream/40 mt-4">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={zone.label}
          initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
          transition={{ duration: 0.4 }}
          className="text-center min-h-[120px]"
        >
          <div className="eyebrow text-gold/70 mb-2">{value}%</div>
          <p className="font-serif italic text-cream text-[22px] leading-snug px-2 body-quote">
            {zone.label}
          </p>
          {touched && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-cream/70 font-serif italic text-[15px] px-4 whitespace-pre-line"
            >
              {zone.reaction}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto pt-10">
        {!committed ? (
          <NoirButton onClick={handleCommit} disabled={!touched}>
            Зафиксировать
          </NoirButton>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <NoirButton onClick={() => onNext({ id: "slider", value })}>
              Дальше
            </NoirButton>
          </motion.div>
        )}
      </div>
    </ScreenFrame>
  );
}

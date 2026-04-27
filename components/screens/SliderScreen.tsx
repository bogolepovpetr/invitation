"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { content } from "@/lib/content";
import { NoirButton } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ui/ScreenFrame";
import { ScreenProps } from "@/components/GameShell";

type Props = ScreenProps & {
  /** Индекс слайдера в content.sliders.items (0..n-1) */
  index?: number;
};

export function SliderScreen({ onNext, index = 0 }: Props) {
  const { sliders } = content;
  const total = sliders.items.length;
  const slider = sliders.items[index];
  const isLast = index >= total - 1;

  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);
  const [committed, setCommitted] = useState(false);

  const zone = useMemo(
    () =>
      slider.zones.find((z) => value <= z.max) ??
      slider.zones[slider.zones.length - 1],
    [value, slider.zones],
  );

  const handleCommit = () => {
    setCommitted(true);
  };

  const answerId = `slider-${index + 1}`;

  return (
    <ScreenFrame className="pt-14 pb-10">
      <div className="flex flex-col items-center gap-1 mb-3">
        <div className="eyebrow">{sliders.eyebrow}</div>
        {total > 1 && (
          <div className="font-hand text-rose/70 text-[15px] leading-none -rotate-1">
            шкала {index + 1} из {total}
          </div>
        )}
      </div>

      <h2 className="display text-[26px] text-cream text-center mb-12 mt-4 whitespace-pre-line">
        {slider.question}
      </h2>

      <div className="relative px-2 mb-6">
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
            Далее
          </NoirButton>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <NoirButton onClick={() => onNext({ id: answerId, value })}>
              Далее
            </NoirButton>
          </motion.div>
        )}
      </div>
    </ScreenFrame>
  );
}

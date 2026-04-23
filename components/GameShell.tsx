"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { ProgressTop } from "./ProgressTop";
import { EnvelopeHotspot } from "./EnvelopeHotspot";
import { Ambience } from "./Ambience";
import { DesktopFrame } from "./DesktopFrame";
import { IntroScreen } from "./screens/IntroScreen";
import { WarmupScreen } from "./screens/WarmupScreen";
import { CharacterTestScreen } from "./screens/CharacterTestScreen";
import { ChoiceCardScreen } from "./screens/ChoiceCardScreen";
import { TruthOrDareScreen } from "./screens/TruthOrDareScreen";
import { SliderScreen } from "./screens/SliderScreen";
import { StatusScreen } from "./screens/StatusScreen";
import { PreFinalScreen } from "./screens/PreFinalScreen";
import { VideoMessageScreen } from "./screens/VideoMessageScreen";
import { InvitationScreen } from "./screens/InvitationScreen";

export type Answers = Record<string, string | number>;

export type ScreenProps = {
  onNext: (answer?: { id: string; value: string | number }) => void;
  answers: Answers;
};

const STEPS: {
  id: string;
  Component: (p: ScreenProps) => JSX.Element;
}[] = [
  { id: "intro", Component: IntroScreen },
  { id: "warmup", Component: WarmupScreen },
  { id: "character", Component: CharacterTestScreen },
  { id: "choice", Component: ChoiceCardScreen },
  { id: "truth-or-dare", Component: TruthOrDareScreen },
  { id: "slider", Component: SliderScreen },
  { id: "status", Component: StatusScreen },
  { id: "prefinal", Component: PreFinalScreen },
  { id: "video-message", Component: VideoMessageScreen },
  { id: "invitation", Component: InvitationScreen },
];

export function GameShell() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const advance = useCallback(
    (answer?: { id: string; value: string | number }) => {
      if (answer) {
        setAnswers((prev) => ({ ...prev, [answer.id]: answer.value }));
      }
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    },
    [],
  );

  const current = STEPS[step];
  const Screen = current.Component;

  const props = useMemo<ScreenProps>(
    () => ({
      onNext: advance,
      answers,
    }),
    [advance, answers],
  );

  const envelopeVisible = !envelopeOpened && step >= 1 && step <= 7;

  return (
    <main className="relative">
      <Ambience />
      <DesktopFrame />
      <AudioPlayer />
      <ProgressTop step={step} total={STEPS.length} />
      <EnvelopeHotspot
        visible={envelopeVisible}
        onOpened={() => setEnvelopeOpened(true)}
      />
      <AnimatePresence mode="wait" initial={false}>
        <div key={current.id} className="relative z-10">
          <Screen {...props} />
        </div>
      </AnimatePresence>
    </main>
  );
}

// -----------------------------------------------------------------------------
// ВЕСЬ ТЕКСТ ИГРЫ ЖИВЁТ ЗДЕСЬ.
// Любой перенос строки (\n) отрисовывается как новая строка — компоненты
// уважают whitespace-pre-line. Просто пиши как хочешь.
// -----------------------------------------------------------------------------

export type OptionWithReaction = {
  id: string;
  label: string;
  reaction: string;
};

export type SliderConfig = {
  question: string;
  zones: { max: number; label: string; reaction: string }[];
};

export type Content = {
  intro: {
    kicker: string;
    title: string;
    subtitle: string[];
    button: string;
  };

  warmup: {
    eyebrow: string;
    question: string;
    options: OptionWithReaction[];
  };

  characterTest: {
    eyebrow: string;
    intro: string;
    questions: {
      id: string;
      question: string;
      options: OptionWithReaction[];
    }[];
  };

  choiceCard: {
    title: string;
    options: { id: string; label: string; reaction: string }[];
    chemistryNote: string;
  };

  truthOrDare: {
    eyebrow: string;
    title: string;
    options: { id: "truth" | "dare"; label: string; reaction: string }[];
  };

  sliders: {
    eyebrow: string;
    items: SliderConfig[];
  };

  status: {
    eyebrow: string;
    title: string;
    options: OptionWithReaction[];
  };

  preFinal: {
    eyebrow: string;
    intro: string[];
    bullets: string[];
    button: string;
  };

  videoMessage: {
    kicker: string;
    title: string;
    subtitle: string;
    videoSrc: string;
    poster?: string;
    skipAfterSec: number;
    nextButton: string;
    placeholder: string;
  };

  invitation: {
    kicker: string;
    title: string;
    /** Большие цифры дат-вариантов (например: ["2", "3"]) */
    dateOptions: string[];
    /** Подпись под цифрами, напр. "мая · вечером" */
    dateCaption: string;
    /** Рукописная подпись (мелкая, под датами), напр. "когда тебе удобнее" */
    dateNote: string;
    sealHint: string;
    accept: { label: string; reaction: string };
  };

  envelopeBonus: {
    buttonHint: string;
    body: string;
  };
};

export const content: Content = {
  intro: {
    kicker: "только для Кати",
    title: "Катя, у меня для тебя маленький тест",
    subtitle: [
      "Формально — ничего особенного.",
      "",
      "Но если честно — в конце тебя ждёт кое-что интересное.",
    ],
    button: "Начать",
  },

  warmup: {
    eyebrow: "вопрос 01 · разминка",
    question: "Как ты для себя оцениваешь наше знакомство?",
    options: [
      {
        id: "coincidence",
        label: "Просто совпадение",
        reaction:
          "Конечно.\nТы любишь делать вид, что всё под контролем.",
      },
      {
        id: "hooked",
        label: "Ты меня зацепил",
        reaction: "Вот это уже честно.\nИ я это почувствовал сразу.",
      },
      {
        id: "thinking",
        label: "Пока не разобралась",
        reaction:
          "Ты всё уже поняла.\nПросто не спешишь это признавать.",
      },
    ],
  },

  characterTest: {
    eyebrow: "быстрый тест на характер",
    intro: "Три вопроса подряд.\nОтвечай не думая.",
    questions: [
      {
        id: "q-interest",
        question: "Что из этого для тебя интереснее?",
        options: [
          {
            id: "touch",
            label:
              "Случайное касание, которое будто ничего не значит",
            reaction:
              "Такие моменты запоминаются\nдаже если делать вид, что нет",
          },
          {
            id: "glance",
            label: "Задержать взгляд чуть дольше, чем обычно",
            reaction:
              "Ты так иногда смотришь\nи в этот момент уже всё понятно",
          },
          {
            id: "silence",
            label:
              "Момент, когда уже всё ясно, но никто не говорит",
            reaction:
              "Наверное, самый любимый\nкогда и так всё понятно",
          },
        ],
      },
      {
        id: "q-self",
        question:
          "Как ты себя ведёшь, когда понимаешь, что всё так и должно быть?",
        options: [
          {
            id: "surrender",
            label: "Я просто перестаю сопротивляться",
            reaction:
              "Ну да…\nв какой-то момент это само происходит",
          },
          {
            id: "enjoy",
            label: "Я начинаю кайфовать от происходящего",
            reaction: "Вот это уже честно",
          },
          {
            id: "pretend",
            label:
              "Я делаю вид, что ничего особенного не происходит",
            reaction:
              "Ты так можешь\nно внутри уже всё понятно",
          },
        ],
      },
      {
        id: "q-important",
        question: "Что для тебя между нами самое важное?",
        options: [
          {
            id: "honesty",
            label: "Честность",
            reaction: "Когда можно говорить как есть\nбез лишнего",
          },
          {
            id: "trust",
            label: "Доверие",
            reaction:
              "Когда спокойно рядом\nи не надо напрягаться",
          },
          {
            id: "tension",
            label: "Флирт и вот это напряжение между нами",
            reaction: "Да\nэто сложно не заметить",
          },
          {
            id: "interest",
            label: "Интерес друг к другу",
            reaction: "Когда правда хочется продолжать",
          },
          {
            id: "unspoken",
            label: "То, что сложно объяснить",
            reaction: "Иногда просто чувствуется\nи всё",
          },
        ],
      },
    ],
  },

  choiceCard: {
    title: "Выбери вариант. Любой.",
    options: [
      {
        id: "innocent",
        label: "Невинный вариант",
        reaction: "Упс…\nа чего это мы вдруг такие невинные?",
      },
      {
        id: "romantic",
        label: "Романтичный вариант",
        reaction:
          "Ты ведь сама чувствуешь\nчто это уже давно не просто «милое общение»",
      },
      {
        id: "risky",
        label: "Рискованный вариант",
        reaction: "no risk, no story",
      },
    ],
    chemistryNote: "С тобой слишком быстро становится чем-то настоящим",
  },

  truthOrDare: {
    eyebrow: "карточка · переверни её",
    title: "Выбери сторону",
    options: [
      {
        id: "truth",
        label: "Правда",
        reaction: "Ты отвечаешь искренне\nили сдерживаешься?",
      },
      {
        id: "dare",
        label: "Действие",
        reaction:
          "Улыбнись прямо сейчас\n\nНикто не проверит\nно я почти уверен, что ты это сделала",
      },
    ],
  },

  sliders: {
    eyebrow: "шкала честности",
    items: [
      {
        question: "Насколько тебе со мной комфортно?",
        zones: [
          {
            max: 25,
            label: "так себе",
            reaction: "Окей,\nпринято.",
          },
          {
            max: 50,
            label: "нормально",
            reaction: "Спокойный ответ.",
          },
          {
            max: 75,
            label: "хорошо",
            reaction: "Это приятно слышать.",
          },
          {
            max: 100,
            label: "правда хорошо",
            reaction: "Взаимно.",
          },
        ],
      },
      {
        question: "Насколько ты рада, что мы встретились?",
        zones: [
          {
            max: 25,
            label: "ну как сказать",
            reaction: "Принято.",
          },
          {
            max: 50,
            label: "нормально",
            reaction: "Спокойно.",
          },
          {
            max: 75,
            label: "рада",
            reaction: "Я тоже.",
          },
          {
            max: 100,
            label: "очень рада",
            reaction: "Я тоже\nи довольно сильно.",
          },
        ],
      },
    ],
  },

  status: {
    eyebrow: "официальный статус · под запись",
    title: "Как называется то, что сейчас происходит?",
    options: [
      {
        id: "nothing",
        label: "ничего особенного",
        reaction:
          "Можно и так сказать\nно звучит слишком спокойно",
      },
      {
        id: "dubious",
        label: "сомнительно, но увлекательно",
        reaction: "Звучит честно",
      },
      {
        id: "liking",
        label: "мне это начинает нравиться",
        reaction: "Похоже на правду",
      },
      {
        id: "lawyer",
        label: "мне нужен адвокат",
        reaction: "🙂\nуже поздно",
      },
    ],
  },

  preFinal: {
    eyebrow: "проверка завершена",
    intro: ["Катя, всё.", "", "И результаты…", "очень хорошие."],
    bullets: [
      "С тобой легко",
      "Рядом с тобой не хочется торопиться",
      "Мне правда повезло, что ты есть",
    ],
    button: "Дальше",
  },

  videoMessage: {
    kicker: "на полминуты — серьёзно",
    title: "Есть вещи, которые лучше сказать голосом",
    subtitle: "Сними один наушник и нажми play",
    videoSrc: "/video/message.mp4",
    skipAfterSec: 20,
    nextButton: "К приглашению",
    placeholder:
      "Здесь скоро будет короткое видео.\nЧуть позже — появится.",
  },

  invitation: {
    kicker: "ровно месяц",
    title: "Катя, приглашаю тебя отпраздновать месяц знакомства",
    dateOptions: ["2", "3"],
    dateCaption: "мая · вечером",
    dateNote: "когда тебе удобнее",
    sealHint: "нажми, чтобы распечатать",
    accept: {
      label: "Принять",
      reaction:
        "Я так и думал.\nИ, если честно, очень этому рад.",
    },
  },

  envelopeBonus: {
    buttonHint: "коснись, чтобы закрыть",
    body:
      "Ты правда думала,\nчто просто проходишь этот тест?",
  },
};

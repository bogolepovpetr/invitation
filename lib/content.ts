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
        id: "q-danger",
        question: "Что из этого опаснее?",
        options: [
          {
            id: "touch",
            label: "случайное касание руки",
            reaction:
              "У тебя очень интересное понимание «опасности».",
          },
          {
            id: "glance",
            label: "задержать взгляд дольше, чем нужно",
            reaction:
              "У тебя очень интересное понимание «опасности».",
          },
          {
            id: "kiss",
            label: "поцелуй в толпе",
            reaction:
              "У тебя очень интересное понимание «опасности».",
          },
        ],
      },
      {
        id: "q-self",
        question: "Какая ты, когда начинаешь реально вовлекаться?",
        options: [
          {
            id: "control",
            label: "Я держу всё под контролем",
            reaction:
              "Ты очень стараешься.\nНо это работает не всегда.",
          },
          {
            id: "play",
            label: "Я играю и смотрю, что будет",
            reaction: "Вот это уже ты настоящая.",
          },
          {
            id: "deny",
            label: "Я делаю вид, что ничего не происходит",
            reaction:
              "Да.\nИ именно в этот момент всё уже происходит.",
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
            reaction:
              "Ты умеешь быть честной.\nДаже когда это неудобно.",
          },
          {
            id: "trust",
            label: "Доверие",
            reaction: "Ты его не раздаёшь просто так.",
          },
          {
            id: "tension",
            label: "Флирт и вот это напряжение между нами",
            reaction: "Да.\nТы прекрасно понимаешь, о чём речь.",
          },
          {
            id: "interest",
            label: "Интерес друг к другу",
            reaction:
              "И он у тебя уже сильнее, чем ты планировала.",
          },
          {
            id: "unspoken",
            label: "То, что сложно объяснить",
            reaction:
              "Да.\nИ именно поэтому это не отпускает.",
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
          "Ты ведь сама чувствуешь,\nчто это уже давно не просто «милое общение».",
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
        reaction:
          "Ты сейчас сдерживаешься\nили уже позволяешь себе это проживать?",
      },
      {
        id: "dare",
        label: "Действие",
        reaction:
          "Улыбнись прямо сейчас.\n\nНикто не проверит.\nНо я почти уверен, что ты это сделала.",
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
            label: "я просто отвечаю",
            reaction:
              "Конечно.\nИ именно поэтому дошла до этого момента.",
          },
          {
            max: 50,
            label: "нормально",
            reaction: "Осторожный ответ.",
          },
          {
            max: 75,
            label: "довольно комфортно",
            reaction: "Уже честнее.",
          },
          {
            max: 100,
            label: "очень комфортно",
            reaction: "Вот это чувствуется.",
          },
        ],
      },
      {
        question: "Насколько ты рада, что мы встретились?",
        zones: [
          {
            max: 25,
            label: "ну… так получилось",
            reaction: "Слабая версия.\nНе верю.",
          },
          {
            max: 50,
            label: "норм",
            reaction: "Очень нейтрально.",
          },
          {
            max: 75,
            label: "рада",
            reaction: "Вот это уже ближе.",
          },
          {
            max: 100,
            label: "очень рада",
            reaction: "Вот тут ты уже не скрываешься.",
          },
        ],
      },
    ],
  },

  status: {
    eyebrow: "официальный статус · под запись",
    title: "Как это всё называется?",
    options: [
      {
        id: "nothing",
        label: "ничего особенного",
        reaction:
          "Ты можешь так это называть.\nНо сама же в это не веришь.",
      },
      {
        id: "dubious",
        label: "сомнительно, но увлекательно",
        reaction: "Вот это максимально про тебя.",
      },
      {
        id: "liking",
        label: "мне это начинает нравиться",
        reaction: "Начинает? 🙂",
      },
      {
        id: "lawyer",
        label: "мне нужен адвокат",
        reaction:
          "Поздно.\nТы уже зашла дальше, чем планировала.",
      },
    ],
  },

  preFinal: {
    eyebrow: "проверка завершена",
    intro: ["Катя, всё.", "", "И результаты…", "слишком хорошие."],
    bullets: [
      "Ты умеешь делать вид, что ничего не происходит — даже когда происходит слишком многое",
      "Ты очень быстро считываешь намёки",
      "С тобой шутки долго шутками не остаются",
    ],
    button: "Дальше",
  },

  videoMessage: {
    kicker: "на полминуты — серьёзно",
    title: "Есть вещи, которые лучше сказать голосом",
    subtitle: "Сними один наушник и нажми play",
    videoSrc: "/video/message.mp4",
    poster: "/video/poster.jpg",
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

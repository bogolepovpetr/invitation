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

export type Content = {
  intro: {
    title: string;
    subtitle: string[];
    button: string;
  };

  warmup: {
    question: string;
    options: OptionWithReaction[];
    rewardCard: string;
  };

  characterTest: {
    intro: string;
    questions: {
      id: string;
      question: string;
      options: OptionWithReaction[];
    }[];
    diagnosis: string[];
  };

  choiceCard: {
    title: string;
    options: { id: string; label: string; reaction: string }[];
    chemistryNote: string;
  };

  truthOrDare: {
    title: string;
    options: { id: "truth" | "dare"; label: string; reaction: string }[];
    rewardCard: string;
    rewardCardSecondary?: string;
  };

  slider: {
    question: string;
    zones: { max: number; label: string; reaction: string }[];
  };

  status: {
    title: string;
    options: OptionWithReaction[];
    rewardCard: string;
  };

  preFinal: {
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
    date: string;
    time: string;
    place: string;
    promise: string;
    sealHint: string;
    accept: { label: string; reaction: string };
    hesitate: { label: string; reaction: string };
  };

  envelopeBonus: {
    buttonHint: string;
    body: string;
  };
};

export const content: Content = {
  intro: {
    title: "Катя, это маленький тест.",
    subtitle: [
      "Формально — ничего особенного.",
      "Неформально — в конце тебя ждёт подарок.",
    ],
    button: "Начать и перестать вредничать",
  },

  warmup: {
    question: "Зачем мы познакомились?",
    options: [
      {
        id: "lovers",
        label: "Стать любовниками?",
        reaction: "Слишком быстрый ответ.\nИ очень самоуверенный.",
      },
      {
        id: "karma",
        label: "Это кармическая судьбоносная встреча.",
        reaction:
          "Вот это уже красиво.\nПочти поверил, что ты отвечала серьёзно.",
      },
      {
        id: "shy",
        label: "Екатерина стесняется отвечать на вопрос",
        reaction: "Ну конечно.\nИменно этого ответа я от тебя и ждал.",
      },
    ],
    rewardCard: "Едем дальше))",
  },

  characterTest: {
    intro: "Три вопроса подряд. Быстро, без пауз.",
    questions: [
      {
        id: "q-danger",
        question: "Что опаснее?",
        options: [
          {
            id: "touch",
            label: "случайное касание руки",
            reaction:
              "У тебя очень интересное представление о безопасности.",
          },
          {
            id: "glance",
            label: "задержать взгляд дольше, чем можно",
            reaction:
              "У тебя очень интересное представление о безопасности.",
          },
          {
            id: "kiss",
            label: "поцелуй в толпе",
            reaction:
              "У тебя очень интересное представление о безопасности.",
          },
        ],
      },
      {
        id: "q-self",
        question: "Что больше похоже на Катю?",
        options: [
          {
            id: "control",
            label: "я всё контролирую",
            reaction: "Допустим. Пока.",
          },
          {
            id: "watch",
            label: "я просто смотрю, что будет",
            reaction: "Вот это уже самая опасная из трёх формулировок.",
          },
          {
            id: "blame",
            label: "я ни в чём не виновата, это атмосфера",
            reaction: "Да-да. Конечно.\nИсключительно атмосфера.",
          },
        ],
      },
      {
        id: "q-loud",
        question: "Что между нами обычно говорит громче всего?",
        options: [
          {
            id: "words",
            label: "слова",
            reaction:
              "Приличный ответ.\nСлишком приличный для тебя.",
          },
          {
            id: "tone",
            label: "интонация",
            reaction: "Вот это уже ближе к правде.",
          },
          {
            id: "pause",
            label: "пауза перед ответом",
            reaction:
              "Да.\nВот в этот момент обычно и начинается всё самое интересное.",
          },
        ],
      },
    ],
    diagnosis: [
      "Предварительный вывод:",
      "держишься уверенно.",
      "но слишком многое выдаёшь глазами.",
    ],
  },

  choiceCard: {
    title: "Выберите вариант. Любой.",
    options: [
      {
        id: "innocent",
        label: "Невинный вариант",
        reaction:
          "Тебе очень идёт делать вид, что это просто игра и ты ко всему относишься несерьёзно.",
      },
      {
        id: "honest",
        label: "Честный вариант",
        reaction:
          "Иногда самый опасный момент — когда всё ещё весело, но уже слишком интересно.",
      },
      {
        id: "risky",
        label: "Рискованный вариант",
        reaction:
          "Екатерина Ренатовна, у вас очень привлекательная манера выбирать не самый безопасный путь.",
      },
    ],
    chemistryNote: "Как-то слишком быстро становится интересно.",
  },

  truthOrDare: {
    title: "Выбери сторону карточки.",
    options: [
      {
        id: "truth",
        label: "Правда",
        reaction:
          "Скажи честно: ты уже понимаешь, к чему всё это идёт, или тебе нравится делать вид, что нет?",
      },
      {
        id: "dare",
        label: "Действие",
        reaction:
          "Улыбнись прямо сейчас.\nНикто не проверит.\nНо я почему-то уверен, что ты это сделала.",
      },
    ],
    rewardCard:
      "Мне нравится, как ты всё это проходишь. Слишком уж уверенно для человека, который просто играет.",
    rewardCardSecondary:
      "Мне-то уже всё понятно. Теперь разберись в себе.",
  },

  slider: {
    question: "Катя, насколько тебе нравится то, что между нами?",
    zones: [
      {
        max: 25,
        label: "я вообще случайно сюда нажала",
        reaction: "Конечно случайно.\nИ именно поэтому дошла уже сюда.",
      },
      {
        max: 50,
        label: "это просто сайт",
        reaction:
          "Да, конечно.\nПросто сайт.\nА ты просто из вежливости отвечаешь на все вопросы.",
      },
      {
        max: 75,
        label: "допустим, забавно",
        reaction:
          "Вот это уже похоже на правду.\nТебе нравится, просто ты ещё не решила, насколько честно это признавать.",
      },
      {
        max: 100,
        label: "уже интересно",
        reaction:
          "Ну вот.\nТак звучит человек, которому и правда интересно.\nС тобой приятно заходить чуть дальше, чем планировалось.",
      },
    ],
  },

  status: {
    title: "Выберите официальный статус происходящего",
    options: [
      {
        id: "nothing",
        label: "ничего особенного",
        reaction: "Да-да.\nИ именно поэтому ты всё ещё здесь.",
      },
      {
        id: "dubious",
        label: "сомнительно, но увлекательно",
        reaction:
          "Наконец-то формулировка, с которой я полностью согласен.",
      },
      {
        id: "liking",
        label: "это уже начинает мне нравиться",
        reaction: "Вот это был честный ход, Катя.",
      },
      {
        id: "lawyer",
        label: "я требую адвоката и ещё один вопрос",
        reaction:
          "Адвокат сейчас недоступен.\nЕму тоже стало интересно, чем всё это закончится.",
      },
    ],
    rewardCard:
      "Самое опасное в тебе — это спокойный вид в моменты, когда тебе уже интересно.",
  },

  preFinal: {
    intro: [
      "Екатерина, проверка завершена.",
      "Результаты получились подозрительно хорошими.",
    ],
    bullets: [
      "Ты умеешь держаться так, будто ничего не происходит — даже когда происходит слишком многое.",
      "Ты слишком быстро понимаешь намёки.",
      "С тобой любая шутка довольно быстро перестаёт быть просто шуткой.",
    ],
    button: "Дальше",
  },

  videoMessage: {
    kicker: "на полминуты — серьёзно",
    title: "Есть вещи, которые лучше сказать голосом.",
    subtitle: "Сними наушник с одного уха и нажми play.",
    videoSrc: "/video/message.mp4",
    poster: "/video/poster.jpg",
    skipAfterSec: 20,
    nextButton: "К приглашению",
    placeholder:
      "Здесь будет короткое видео.\nПока оно ещё не загружено — но скоро будет на месте.",
  },

  invitation: {
    kicker: "ровно месяц",
    title: "Екатерина, приглашаю тебя на свидание",
    date: "со 2 на 3 мая",
    time: "уточню отдельно",
    place: "узнаешь в тот вечер",
    promise:
      "Месяц — уже серьёзный повод.\nДавай отметим его как следует.",
    sealHint: "нажми, чтобы распечатать",
    accept: {
      label: "Принять",
      reaction: "Ожидаемо.\nИ, честно говоря, очень приятно.",
    },
    hesitate: {
      label: "Мне нужно подумать",
      reaction:
        "Подумай.\nНо у меня есть ощущение, что ты уже всё решила.",
    },
  },

  envelopeBonus: {
    buttonHint: "коснись, чтобы закрыть",
    body:
      "Ты думала, что просто проходишь этот тест.\nА я весь последний месяц думаю о том, как мы проведём один конкретный вечер.",
  },
};

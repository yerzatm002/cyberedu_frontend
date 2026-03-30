const mockLessons = [
  {
    id: 1,
    block: 1,
    title: 'Кіріспе: Цифрлық дүниеде қауіпсіздік неге маңызды?',
    level: 'Бастауыш',
    completed: true,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    presentationTitle: 'Цифрлық қауіпсіздікке кіріспе',
    description:
      'Бұл сабақта цифрлық ортадағы негізгі қауіптер, интернеттегі қауіпсіз мінез-құлық және киберқауіпсіздіктің күнделікті өмірдегі маңызы қарастырылады.',
    task: {
      title: 'Өмірлік жағдаят тапсырмасы',
      description:
        'Интернетте жеке мәліметтеріңізді қорғау не үшін маңызды екенін 5–6 сөйлеммен түсіндіріңіз.',
      status: 'Тексерілді',
    },
    quiz: {
      questionsCount: 5,
      passingScore: 70,
      status: 'Өтілді',
    },
  },
  {
    id: 2,
    block: 1,
    title: 'Интернет қалай жұмыс істейді? Желінің негіздері',
    level: 'Бастауыш',
    completed: true,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    presentationTitle: 'Желінің негізгі ұғымдары',
    description:
      'Бұл сабақта интернеттің негізгі жұмыс принциптері, желі түсінігі және деректердің бір құрылғыдан екіншісіне қалай жеткізілетіні түсіндіріледі.',
    task: {
      title: 'Өмірлік жағдаят тапсырмасы',
      description:
        'Үйдегі интернеттің қалай жұмыс істейтінін өз сөзіңізбен қысқаша сипаттаңыз.',
      status: 'Тексерілді',
    },
    quiz: {
      questionsCount: 5,
      passingScore: 70,
      status: 'Өтілді',
    },
  },
  {
    id: 3,
    block: 1,
    title: 'OSI моделі: 7 қабат және олардың рөлі',
    level: 'Орта',
    completed: false,
    progress: 55,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    presentationTitle: 'OSI моделінің 7 қабаты',
    description:
      'Бұл сабақта OSI моделінің құрылымы, әр қабаттың міндеті және олардың желілік байланыстағы рөлі қарастырылады.',
    task: {
      title: 'Өмірлік жағдаят тапсырмасы',
      description:
        'OSI моделінің кемінде 3 қабатын атап, олардың қызметін қысқаша түсіндіріңіз.',
      status: 'Орындалып жатыр',
    },
    quiz: {
      questionsCount: 7,
      passingScore: 70,
      status: 'Басталмаған',
    },
  },
  {
    id: 4,
    block: 1,
    title: 'TCP/IP хаттамалары: деректер қалай жіберіледі?',
    level: 'Орта',
    completed: false,
    progress: 0,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    presentationTitle: 'TCP/IP хаттамалары',
    description:
      'Бұл сабақта TCP/IP стек ұғымы, пакеттер, адресация және деректердің жіберілу логикасы түсіндіріледі.',
    task: {
      title: 'Өмірлік жағдаят тапсырмасы',
      description:
        'Деректердің интернет арқылы жіберілу үдерісін мысалмен түсіндіріңіз.',
      status: 'Басталмаған',
    },
    quiz: {
      questionsCount: 6,
      passingScore: 70,
      status: 'Басталмаған',
    },
  },
  {
    id: 5,
    block: 2,
    title: 'Пароль дегеніміз не? Бұзылу тәсілдері',
    level: 'Бастауыш',
    completed: false,
    progress: 0,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    presentationTitle: 'Пароль қауіпсіздігі',
    description:
      'Бұл сабақта пароль ұғымы, әлсіз парольдердің қаупі және бұзылу тәсілдерінің негізгі түрлері қарастырылады.',
    task: {
      title: 'Өмірлік жағдаят тапсырмасы',
      description:
        'Бір парольді бірнеше сайтта қолданудың қауіпті тұстарын жазыңыз.',
      status: 'Басталмаған',
    },
    quiz: {
      questionsCount: 5,
      passingScore: 70,
      status: 'Басталмаған',
    },
  },
  {
    id: 6,
    block: 2,
    title: 'Күшті пароль жасау ережелері',
    level: 'Бастауыш',
    completed: false,
    progress: 0,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    presentationTitle: 'Күшті пароль құру',
    description:
      'Бұл сабақта қауіпсіз пароль құру принциптері, ұзындық, символдар және пароль менеджерлердің маңызы түсіндіріледі.',
    task: {
      title: 'Өмірлік жағдаят тапсырмасы',
      description:
        'Қауіпсіз пароль құрудың 4 ережесін жазып шығыңыз.',
      status: 'Басталмаған',
    },
    quiz: {
      questionsCount: 5,
      passingScore: 70,
      status: 'Басталмаған',
    },
  },
]

export default mockLessons
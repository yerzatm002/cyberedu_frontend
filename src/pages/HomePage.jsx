import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-10 border-b border-green-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-green-800">CyberQazaq.kz</h1>
            <p className="text-sm text-gray-500">
              Киберқауіпсіздік бойынша оқу платформасы
            </p>
          </div>

          <nav className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-green-700 px-4 py-2 text-sm font-medium text-green-800 transition hover:bg-green-50"
            >
              Кіру
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Тіркелу
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-white to-green-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-medium text-yellow-800">
                8–10 сынып оқушыларына арналған
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-green-900 md:text-5xl">
                Киберқауіпсіздікті қазақ тілінде үйренетін заманауи платформа
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-700">
                CyberQazaq.kz платформасы оқушыларға интернеттегі қауіпсіздік,
                пароль қорғау, фишинг, жеке деректерді қорғау және цифрлық
                мәдениет негіздерін үйретуге арналған.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  Платформаға кіру
                </Link>

                <Link
                  to="/register"
                  className="rounded-2xl border border-green-700 px-6 py-3 font-semibold text-green-800 transition hover:bg-green-50"
                >
                  Тіркелу
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Сабақ саны</p>
                  <p className="mt-2 text-2xl font-bold text-green-800">34</p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Тақырыптық блок</p>
                  <p className="mt-2 text-2xl font-bold text-green-800">8</p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Рөлдер</p>
                  <p className="mt-2 text-2xl font-bold text-green-800">3</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-green-800">
                Прототиптің ағымдағы нұсқасы
              </h3>

              <p className="mt-4 text-gray-700">
                Бұл нұсқа алдын ала қорғауға арналған бастапқы frontend
                прототипі болып табылады. Қазіргі кезде жүйе mock-деректермен
                жұмыс істейді және backend бөлігі әлі қосылмаған.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-green-50 p-4">
                  <h4 className="font-semibold text-green-900">
                    Негізгі мүмкіндіктер
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-700">
                    <li>• Қазақ тіліндегі интерфейс</li>
                    <li>• Оқушы, мұғалім, әкімші рөлдері</li>
                    <li>• 34 сабақтан тұратын курс құрылымы</li>
                    <li>• Тест, тапсырма, прогресс жүйесі</li>
                    <li>• Мұғалімге арналған бақылау панелі</li>
                    <li>• Әкімшіге арналған басқару интерфейсі</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-yellow-50 p-4">
                  <h4 className="font-semibold text-yellow-800">Мақсаты</h4>
                  <p className="mt-2 text-sm text-gray-700">
                    Оқушылардың цифрлық сауаттылығын арттыру және интернетте
                    қауіпсіз әрекет ету дағдыларын қалыптастыру.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-bold text-green-900">
              Платформа артықшылықтары
            </h3>
            <p className="mt-3 text-gray-600">
              Оқыту үдерісін мектеп жағдайына бейімдеп құрастырылған
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
                🛡️
              </div>
              <h4 className="text-xl font-semibold text-green-800">
                Қауіпсіздік дағдылары
              </h4>
              <p className="mt-3 text-gray-700">
                Оқушылар интернеттегі алаяқтық, фишинг және қауіпсіз пароль құру
                бойынша тәжірибелік білім алады.
              </p>
            </div>

            <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-xl">
                📘
              </div>
              <h4 className="text-xl font-semibold text-green-800">
                34 құрылымдалған сабақ
              </h4>
              <p className="mt-3 text-gray-700">
                Әр сабақта презентация, бейнесабақ, өмірлік жағдаят тапсырмасы
                және тест қарастырылған.
              </p>
            </div>

            <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
                👩‍🏫
              </div>
              <h4 className="text-xl font-semibold text-green-800">
                Мұғалімге ыңғайлы бақылау
              </h4>
              <p className="mt-3 text-gray-700">
                Мұғалімдер оқушылардың үлгерімін, белсенділігін және тест
                нәтижелерін бір жерден бақылай алады.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-10 text-center">
              <h3 className="text-3xl font-bold text-green-900">
                Платформадағы рөлдер
              </h3>
              <p className="mt-3 text-gray-600">
                Жүйе үш негізгі пайдаланушы рөліне негізделген
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="text-4xl">🎓</div>
                <h4 className="mt-4 text-xl font-semibold text-green-800">
                  Оқушы
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>• Сабақтарды оқу</li>
                  <li>• Тест тапсыру</li>
                  <li>• Тапсырма жіберу</li>
                  <li>• Прогресті бақылау</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="text-4xl">👨‍🏫</div>
                <h4 className="mt-4 text-xl font-semibold text-green-800">
                  Мұғалім
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>• Топты басқару</li>
                  <li>• Сабақ мазмұнын жүктеу</li>
                  <li>• Тест құрастыру</li>
                  <li>• Пікір мен балл қою</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="text-4xl">⚙️</div>
                <h4 className="mt-4 text-xl font-semibold text-green-800">
                  Әкімші
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>• Пайдаланушыларды басқару</li>
                  <li>• Жүйе параметрлерін өзгерту</li>
                  <li>• Хабарландыру жіберу</li>
                  <li>• Жалпы статистиканы көру</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-green-800">
          <div className="mx-auto max-w-7xl px-6 py-14 text-center text-white">
            <h3 className="text-3xl font-bold">
              CyberQazaq.kz платформасын бірге дамытайық
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-green-50">
              Бұл прототип болашақта толыққанды оқу платформасына айналады.
              Келесі нұсқаларда сабақтар модулі, авторизация, тесттер және
              рөлдік жүйе кезең-кезеңімен енгізіледі.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="inline-block rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-green-900 transition hover:bg-yellow-300"
              >
                Кіру бетіне өту
              </Link>

              <Link
                to="/register"
                className="inline-block rounded-2xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-green-900"
              >
                Тіркелу бетіне өту
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
const CertificateCard = ({ isAvailable = false, studentName = '' }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-green-800">Сертификат</h3>
          <p className="mt-2 text-gray-600">
            Курс толық аяқталғаннан кейін сертификат жүктеуге қолжетімді болады
          </p>
        </div>

        <div className="text-4xl">🏆</div>
      </div>

      <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
        <p className="text-sm text-gray-600">Оқушы</p>
        <p className="mt-1 text-lg font-semibold text-green-900">{studentName}</p>

        <p className="mt-4 text-sm text-gray-600">Күйі</p>
        <p
          className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
            isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isAvailable ? 'Қолжетімді' : 'Әлі дайын емес'}
        </p>
      </div>

      <div className="mt-6">
        <button
          disabled={!isAvailable}
          className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
            isAvailable
              ? 'bg-green-700 text-white hover:bg-green-800'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
        >
          {isAvailable ? 'Сертификатты жүктеу' : 'Алдымен курсты аяқтау қажет'}
        </button>
      </div>
    </div>
  )
}

export default CertificateCard
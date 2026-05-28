import {
  useGenerateStudentCertificate,
  useStudentCertificate,
} from '@/features/certificates/certificates.queries'

const CertificateCard = ({ studentName = '' }) => {
  const { data, isLoading, isError, error } = useStudentCertificate()
  const generateMutation = useGenerateStudentCertificate()

  const certificate = data?.certificate
  const eligibility = data?.eligibility

  const canGenerate = Boolean(eligibility?.canGenerate)
  const isCompleted = Boolean(eligibility?.isCompleted)
  const completionPercent = eligibility?.completionPercent ?? 0

  const handleGenerate = () => {
    generateMutation.mutate()
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-green-800">Сертификат</h3>
          <p className="mt-2 text-gray-600">
            Курс толық аяқталғаннан кейін сертификат алуға болады
          </p>
        </div>

        <div className="text-4xl">🏆</div>
      </div>

      {isLoading && (
        <div className="mt-6 rounded-2xl bg-green-50 p-4 text-gray-700">
          Сертификат статусы жүктеліп жатыр...
        </div>
      )}

      {isError && (
        <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          {error.message}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm text-gray-600">Оқушы</p>
            <p className="mt-1 text-lg font-semibold text-green-900">
              {studentName}
            </p>

            <p className="mt-4 text-sm text-gray-600">Курс аяқталуы</p>
            <p className="mt-1 text-lg font-semibold text-green-900">
              {completionPercent}%
            </p>

            <p className="mt-4 text-sm text-gray-600">Күйі</p>
            <p
              className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                certificate
                  ? 'bg-green-100 text-green-800'
                  : isCompleted
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-200 text-gray-600'
              }`}
            >
              {certificate
                ? 'Берілген'
                : isCompleted
                  ? 'Генерациялауға дайын'
                  : 'Әлі дайын емес'}
            </p>

            {certificate && (
              <>
                <p className="mt-4 text-sm text-gray-600">Сертификат нөмірі</p>
                <p className="mt-1 font-semibold text-green-900">
                  {certificate.certificateNumber}
                </p>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {certificate?.fileUrl ? (
              <a
                href={certificate.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                Сертификатты ашу
              </a>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!canGenerate || generateMutation.isPending}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  canGenerate
                    ? 'bg-green-700 text-white hover:bg-green-800'
                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                }`}
              >
                {generateMutation.isPending
                  ? 'Жасалып жатыр...'
                  : canGenerate
                    ? 'Сертификат жасау'
                    : 'Алдымен курсты аяқтау қажет'}
              </button>
            )}
          </div>

          {generateMutation.isError && (
            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
              {generateMutation.error.message}
            </div>
          )}

          {generateMutation.data?.alreadyIssued && (
            <div className="mt-5 rounded-2xl bg-yellow-50 p-4 text-sm text-gray-700">
              Сертификат бұрын берілген. Жүйе дайын сертификатты қайтарды.
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CertificateCard
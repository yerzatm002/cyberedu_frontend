import MainLayout from '@/components/layout/MainLayout'

const AdminDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Әкімші панелі</h2>
          <p className="mt-2 text-gray-600">
            Жүйе бойынша жалпы статистика мен басқару элементтері
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Жалпы пайдаланушылар саны</p>
            <p className="mt-3 text-3xl font-bold text-green-800">156</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Белсенді оқушылар</p>
            <p className="mt-3 text-3xl font-bold text-green-800">117</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Орташа жүйелік белсенділік</p>
            <p className="mt-3 text-3xl font-bold text-green-800">79%</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-green-800">Жүйелік ескерту</h3>
          <p className="mt-4 text-gray-700">
            Бұл бөлімде кейін пайдаланушыларды басқару, рөлдерді өзгерту,
            мектептерді қосу және хабарландыру жіберу функциялары енгізіледі.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminDashboardPage
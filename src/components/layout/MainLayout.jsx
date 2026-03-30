import Sidebar from './Sidebar'
import Header from './Header'

const MainLayout = ({ user, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role={user?.role} />

        <div className="flex min-h-screen flex-1 flex-col">
          <Header user={user} />

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
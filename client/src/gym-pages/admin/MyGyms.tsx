import AdminGyms from './AdminGyms'
import AdminSidebar from './AdminSidebar'

const MyGyms = () => {
  return (
    <div className="flex bg-black h-screen text-white font-stencil">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <AdminGyms />
      </div>
    </div>
  )
}

export default MyGyms

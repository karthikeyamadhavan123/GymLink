import AdminGyms from '@/gym-pages/admin/AdminGyms'
import useUserStore from '@/zustand'
import Sidebar from "@/components/Sidebar";
const MyGyms = () => {
  const role = useUserStore((state) => state.details?.role)
  return (
    <div className="flex bg-black h-screen text-white font-stencil">
      <Sidebar role={role} />
      <div className="flex-1 overflow-auto">
        <AdminGyms />
      </div>
    </div>
  )
}

export default MyGyms

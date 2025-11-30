import Sidebar from "@/components/Sidebar"
import Gyms from "@/gym-pages/gym-related-pages-users/Gyms"

const GymMain = () => {
  return (
    <div className="flex bg-black h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
      <Gyms />
      </div>
    </div>
  )
}

export default GymMain

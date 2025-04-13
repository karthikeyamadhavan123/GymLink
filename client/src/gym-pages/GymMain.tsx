import Sidebar from "../components/Sidebar"
import Gyms from "./Gyms"

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

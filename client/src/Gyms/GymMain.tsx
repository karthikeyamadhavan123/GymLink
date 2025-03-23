import Sidebar from "@/Components/Sidebar"
import Gyms from "./Gyms"

const GymMain = () => {
  return (
    <div className="flex bg-black h-screen w-screen">
      <Sidebar/>
      <Gyms/>
    </div>
  )
}

export default GymMain

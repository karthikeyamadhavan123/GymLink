import Sidebar from "../../components/Sidebar"
import AllTrainers from "./AllTrainers"

const TrainerMain = () => {
  return (
    <div className="flex bg-black h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
      <AllTrainers/>
      </div>
    </div>
  )
}

export default TrainerMain
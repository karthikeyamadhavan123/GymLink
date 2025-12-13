import useUserStore from "@/zustand";
import Sidebar from "../../components/Sidebar"
import AllTrainers from "./AllTrainers"

const TrainerMain = () => {
   const role = useUserStore((state) => state.details?.role);
  return (
    <div className="flex bg-black h-screen">
      <Sidebar role={role} />
      <div className="flex-1 overflow-auto">
      <AllTrainers/>
      </div>
    </div>
  )
}

export default TrainerMain
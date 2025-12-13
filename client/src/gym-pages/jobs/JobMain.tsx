import useUserStore from "@/zustand";
import Sidebar from "../../components/Sidebar"
import Jobs from "./Jobs"
const JobMain = () => {
   const role = useUserStore((state) => state.details?.role);
  return (
    <div className="flex bg-black h-screen">
    <Sidebar role={role}/>
    <div className="flex-1 overflow-auto">
   <Jobs/>
    </div>
  </div>
  )
}

export default JobMain

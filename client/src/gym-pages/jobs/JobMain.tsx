import Sidebar from "../../components/Sidebar"
import Jobs from "./Jobs"
const JobMain = () => {
  return (
    <div className="flex bg-black h-screen">
    <Sidebar />
    <div className="flex-1 overflow-auto">
   <Jobs/>
    </div>
  </div>
  )
}

export default JobMain

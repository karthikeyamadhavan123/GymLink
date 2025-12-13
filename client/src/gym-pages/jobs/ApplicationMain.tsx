import useUserStore from "@/zustand";
import Sidebar from "../../components/Sidebar"
import Application from "./Application"
const JobMain = () => {
    const role = useUserStore((state) => state.details?.role);
    return (
        <div className="flex bg-black h-screen">
            <Sidebar role={role} />
            <div className="flex-1 overflow-auto">
                <Application />
            </div>
        </div>
    )
}

export default JobMain

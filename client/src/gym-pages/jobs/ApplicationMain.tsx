import Sidebar from "../../components/Sidebar"
import Application from "./Application"
const JobMain = () => {
    return (
        <div className="flex bg-black h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Application />
            </div>
        </div>
    )
}

export default JobMain

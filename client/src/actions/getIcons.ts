import { Home, Users, Settings,Briefcase } from "lucide-react"

const sidebarLinks = [
    {
        label: "Dashboard",
        icon: Home,
        path: "/dashboard/gyms",
    },
    {
        label: "Trainers",
        icon: Users,
        path: "/trainers",
    },
    {
        label: "My Applications",
        icon: Briefcase,
        path: "/applications",
    },
    {
        label: "Settings",
        icon: Settings,
        path: "/settings",
    },
    {
        label:"Jobs",
        icon:Briefcase,
        path:'/jobs'
    }
];

export default sidebarLinks;
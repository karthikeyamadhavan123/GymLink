import { Home, Users, Briefcase, BriefcaseBusiness, CalendarCheck } from "lucide-react";

const adminSidebarLinks = [
    {
        label: "Dashboard",
        icon: Home,
        path: "/admin-dashboard",
    },
    {
        label: "My Trainers",
        icon: Users,
        path: "/admin-trainers",
    },
    {
        label: "My Bookings",
        icon: CalendarCheck,
        path: "/bookings",
    },
    {
        label: "Jobs Posted",
        icon: BriefcaseBusiness,
        path: "/my-jobs",
    }
];

export default adminSidebarLinks;

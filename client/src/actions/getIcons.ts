import { 
  Home, 
  Users, 
  Settings, 
  Briefcase, 
  CalendarCheck, 
  BriefcaseBusiness, 
  MessageCircle, 
  Grid, 
  UserPlus, 
  UserCheck 
} from "lucide-react";

// --------------------- USER LINKS ---------------------
export const userSidebarLinks = [
  {
    label: "Dashboard",
    icon: Home,
    path: "/dashboard/gyms",
  },
  {
    label: "My Trainers",
    icon: Users,
    path: "/trainers",
  },
  {
    label: "Chat",
    icon: MessageCircle,
    path: "/chat",
  },
  {
    label: "Find People",
    icon: UserPlus,
    path: "/partner-matching",
  },
  {
    label: "Kanban Board",
    icon: Grid,
    path: "/kanban",
  },
  // {
  //   label: "My Applications",
  //   icon: Briefcase,
  //   path: "/applications",
  // },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  // {
  //   label: "Jobs",
  //   icon: Briefcase,
  //   path: "/jobs",
  // },
];

// --------------------- TRAINER LINKS ---------------------
export const trainerSidebarLinks = [
  {
    label: "Dashboard",
    icon: Home,
    path: "/trainer-dashboard",
  },
  {
    label: "My Trainees",
    icon: Users,
    path: "/trainer-trainees",
  },
  {
    label: "Chat",
    icon: MessageCircle,
    path: "/trainer-chat",
  },
  {
    label: "Partner Matching",
    icon: UserCheck,
    path: "/trainer-partners",
  },
  {
    label: "Kanban Board",
    icon: Grid,
    path: "/trainer-kanban",
  },
  {
    label: "My Schedule",
    icon: CalendarCheck,
    path: "/trainer-schedule",
  },
  {
    label: "Apply for Trainer Jobs",
    icon: Briefcase,
    path: "/trainer-job-applications",
  },
  {
    label: "Followers",
    icon: UserPlus,
    path: "/trainer-followers",
  },
  {
    label: "Following",
    icon: UserCheck,
    path: "/trainer-following",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/trainer-settings",
  },
];

// --------------------- ADMIN LINKS ---------------------
export const adminSidebarLinks = [
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
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin-settings",
  },
];

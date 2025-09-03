import {
  RiDashboardLine,
  RiUser3Line,
  RiShieldLine,
  RiBuildingLine,
  RiAddLine,
  RiStethoscopeLine,
  RiClipboardLine,
  RiBarChartLine,
  RiPieChartLine,
  RiUserLine,
  RiInboxLine,
  RiCalendarLine,
  RiMessage2Line,
} from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import { RiMessage3Line, RiRobot2Line } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiAlarmWarningLine, RiHistoryLine } from "react-icons/ri";
import { MdOutlineEmergency } from "react-icons/md";
import { RiMapPinLine, RiMap2Line } from "react-icons/ri";

export const adminMenuItems = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: RiDashboardLine,
    gradient: "from-green-500 to-green-600",
    children: [
      {
        title: "Home",
        icon: RiDashboardLine,
        route: "/dashboard",
        key: "home",
      },
    ],
  },
  {
    key: "userManagement",
    title: "User Management",
    icon: RiUser3Line,
    gradient: "from-blue-500 to-purple-600",
    children: [
      {
        title: "All Users",
        icon: RiUser3Line,
        route: "/user-management",
        key: "allUsers",
      },
    ],
  },
  {
    key: "departments",
    title: "Departments",
    icon: RiBuildingLine,
    gradient: "from-yellow-500 to-orange-600",
    children: [
      {
        title: "All Departments",
        icon: RiBuildingLine,
        route: "/departments",
        key: "allDepartments",
      },
    ],
  },
  {
    key: "services",
    title: "Services",
    icon: RiStethoscopeLine,
    gradient: "from-teal-500 to-green-600",
    children: [
      {
        title: "All Services",
        icon: RiClipboardLine,
        route: "/services",
        key: "allServices",
      },
    ],
  },
  {
    key: "analytics",
    title: "Analytics",
    icon: RiBarChartLine,
    gradient: "from-pink-500 to-red-600",
    children: [
      {
        title: "System Analytics",
        icon: RiBarChartLine,
        route: "/analytics?type=system",
        key: "systemAnalytics",
      },
      {
        title: "User Analytics",
        icon: RiBarChartLine,
        route: "/analytics?type=users",
        key: "userAnalytics",
      },
      {
        title: "Department Analytics",
        icon: RiPieChartLine,
        route: "/analytics?type=departments",
        key: "departmentAnalytics",
      },
    ],
  },
  {
    key: "settings",
    title: "Settings",
    icon: LuSettings,
    gradient: "from-indigo-500 to-blue-700",
    children: [
      {
        title: "My Profile",
        icon: RiUserLine,
        route: "/profile",
        key: "myProfile",
      },
      // {
      //   title: "Settings",
      //   icon: LuSettings,
      //   route: "/settings",
      //   key: "settings",
      // },
    ],
  },
];

export const hodMenuItems = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: RiDashboardLine,
    gradient: "from-green-500 to-green-600",
    children: [{ title: "Home", icon: RiDashboardLine, route: "/dashboard" }],
  },
  {
    key: "staffManagement",
    title: "Staff Management",
    icon: RiUser3Line,
    gradient: "from-blue-500 to-purple-600",
    children: [{ title: "Staff", icon: RiUserLine, route: "/staff" }],
  },
  {
    key: "analytics",
    title: "Analytics",
    icon: RiBarChartLine,
    gradient: "from-pink-500 to-red-600",
    children: [
      {
        title: "Department Analytics",
        icon: RiPieChartLine,
        route: "/analytics",
      },
    ],
  },
  {
    key: "enquiries",
    title: "Enquiries",
    icon: RiInboxLine,
    gradient: "from-yellow-500 to-orange-600",
    children: [
      { title: "All Enquiries", icon: RiMessage2Line, route: "/enquiries" },
    ],
  },
  {
    key: "settings",
    title: "Settings",
    icon: LuSettings,
    gradient: "from-indigo-500 to-blue-700",
    children: [
      {
        title: "My Profile",
        icon: RiUserLine,
        route: "/profile",
        key: "myProfile",
      },
      // {
      //   title: "Settings",
      //   icon: LuSettings,
      //   route: "/settings",
      //   key: "settings",
      // },
    ],
  },
];

export const staffMenuItems = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: RiDashboardLine,
    gradient: "from-green-500 to-green-600",
    children: [{ title: "Home", icon: RiDashboardLine, route: "/dashboard" }],
  },
  {
    key: "emergencies",
    title: "Emergencies",
    icon: MdOutlineEmergency,
    gradient: "from-red-500 to-orange-600",
    children: [
      {
        title: "Active Emergency",
        icon: RiAlarmWarningLine,
        route: "/active-emergency",
        key: "activeEmergency",
      },
      {
        title: "Past Emergencies",
        icon: RiHistoryLine,
        route: "/past-emergencies",
        key: "pastEmergency",
      },
    ],
  },
  {
    key: "appointments",
    title: "Appointments",
    icon: RiCalendarLine,
    gradient: "from-blue-500 to-purple-600",
    children: [
      {
        title: "Pending",
        icon: RiCalendarLine,
        route: "/appointments?status=pending",
      },
      {
        title: "Completed",
        icon: RiCalendarLine,
        route: "/appointments?status=completed",
      },
      {
        title: "Cancelled",
        icon: RiCalendarLine,
        route: "/appointments?status=cancelled",
      },
    ],
  },
  {
    key: "settings",
    title: "Settings",
    icon: LuSettings,
    gradient: "from-indigo-500 to-blue-700",
    children: [
      {
        title: "My Profile",
        icon: RiUserLine,
        route: "/profile",
        key: "myProfile",
      },
      // {
      //   title: "Settings",
      //   icon: LuSettings,
      //   route: "/settings",
      //   key: "settings",
      // },
    ],
  },
];

export const nurseMenuItems = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: RiDashboardLine,
    gradient: "from-green-500 to-green-600",
    children: [{ title: "Home", icon: RiDashboardLine, route: "/dashboard" }],
  },
  {
    key: "settings",
    title: "Settings",
    icon: LuSettings,
    gradient: "from-indigo-500 to-blue-700",
    children: [
      {
        title: "My Profile",
        icon: RiUserLine,
        route: "/profile",
        key: "myProfile",
      },
      // {
      //   title: "Settings",
      //   icon: LuSettings,
      //   route: "/settings",
      //   key: "settings",
      // },
    ],
  },
];

export const doctorMenuItems = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: RiDashboardLine,
    gradient: "from-green-500 to-green-600",
    children: [{ title: "Home", icon: RiDashboardLine, route: "/dashboard" }],
  },
  {
    key: "appointments",
    title: "Appointments",
    icon: RiCalendarLine,
    gradient: "from-blue-500 to-purple-600",
    children: [
      {
        title: "All appointments",
        icon: RiCalendarLine,
        route: "/appointments",
      }
    ],
  },
  {
    key: "settings",
    title: "Settings",
    icon: LuSettings,
    gradient: "from-indigo-500 to-blue-700",
    children: [
      {
        title: "My Profile",
        icon: RiUserLine,
        route: "/profile",
        key: "myProfile",
      },
      // {
      //   title: "Settings",
      //   icon: LuSettings,
      //   route: "/settings",
      //   key: "settings",
      // },
    ],
  },
];

export const ambulanceDriver = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: RiDashboardLine,
    gradient: "from-green-500 to-green-600",
    children: [{ title: "Home", icon: RiDashboardLine, route: "/dashboard" }],
  },
  {
    key: "emergencies",
    title: "Emergencies",
    icon: MdOutlineEmergency,
    gradient: "from-red-500 to-orange-600",
    children: [
      {
        title: "Active Emergency",
        icon: RiAlarmWarningLine,
        route: "/active-emergency",
        key: "activeEmergency",
      },
      {
        title: "Past Emergencies",
        icon: RiHistoryLine,
        route: "/past-emergencies",
        key: "pastEmergency",
      },
    ],
  },
  {
    key: "settings",
    title: "Settings",
    icon: LuSettings,
    gradient: "from-indigo-500 to-blue-700",
    children: [
      {
        title: "My Profile",
        icon: RiUserLine,
        route: "/profile",
        key: "myProfile",
      },
      // {
      //   title: "Settings",
      //   icon: LuSettings,
      //   route: "/settings",
      //   key: "settings",
      // },
    ],
  },
];

export const patientMenuItems = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: RiDashboardLine,
    gradient: "from-green-500 to-green-600",
    children: [
      {
        title: "Home",
        icon: RiDashboardLine,
        route: "/dashboard",
        key: "home",
      },
    ],
  },
  {
    key: "enquiries",
    title: "Enquiries",
    icon: RiMessage3Line,
    gradient: "from-blue-500 to-purple-600",
    children: [
      {
        title: "Wezi Bot",
        icon: RiRobot2Line,
        route: "/wezi-bot",
        key: "wezBot",
      },
    ],
  },
  {
    key: "appointments",
    title: "Appointments",
    icon: RiCalendarLine,
    gradient: "from-blue-500 to-purple-600",
    children: [
      {
        title: "All Appointments",
        icon: RiCalendarLine,
        route: "/appointments",
        key: "appointments",
      },
    ],
  },
  {
    key: "emergencies",
    title: "Emergencies",
    icon: MdOutlineEmergency,
    gradient: "from-red-500 to-orange-600",
    children: [
      {
        title: "Active Emergency",
        icon: RiAlarmWarningLine,
        route: "/active-emergency",
        key: "activeEmergency",
      },
      {
        title: "Past Emergencies",
        icon: RiHistoryLine,
        route: "/past-emergencies",
        key: "pastEmergency",
      },
    ],
  },
  {
    key: "navigation",
    title: "Navigation",
    icon: RiMapPinLine,
    gradient: "from-green-500 to-teal-600",
    children: [
      {
        title: "Wezi Map",
        icon: RiMap2Line,
        route: "/wezi-virtual-map",
        key: "navigation",
      },
    ],
  },
  {
    key: "medicalRecords",
    title: "Medical Records",
    icon: RiClipboardLine,
    gradient: "from-teal-500 to-green-600",
    children: [
      {
        title: "My Records",
        icon: RiClipboardLine,
        route: "/records",
        key: "myRecords",
      },
    ],
  },
  {
    key: "settings",
    title: "Settings",
    icon: LuSettings,
    gradient: "from-indigo-500 to-blue-700",
    children: [
      {
        title: "My Profile",
        icon: RiUserLine,
        route: "/profile",
        key: "myProfile",
      },
      // {
      //   title: "Settings",
      //   icon: LuSettings,
      //   route: "/settings",
      //   key: "settings",
      // },
    ],
  },
];

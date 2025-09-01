import { IoIosPeople } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiBuildingLine } from "react-icons/ri";

export const admin = [
  {
    title: "Patients",
    iconBg: "bg-blue-50",
    icon: FaUser,
    textColor: "text-blue-900",
    borderColor: "border-blue-900",
    route: "/user-management?=role=patient",
    variable: "patients",
  },
  {
    title: "HODs",
    icon: FaUserTie,
    iconBg: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "border-purple-600",
    route: "/user-management?role=hod",
    variable: "hods",
  },
  {
    title: "Staff",
    icon: IoIosPeople,
    iconBg: "bg-teal-50",
    textColor: "text-teal-600",
    borderColor: "border-teal-600",
    route: "/user-management?role=staff",
    variable: "staff",
  },
  {
    title: "Departments",
    icon: RiBuildingLine,
    iconBg: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-600",
    route: "/departments",
    variable: "departments",
  },
];

export default { admin };

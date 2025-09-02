import { RiCloseLine, RiCheckLine, RiClockwiseLine } from "react-icons/ri";
import { TbAlertTriangle } from "react-icons/tb";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "active":
      return "bg-green-50 text-green-700 border-green-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    case "in-progress":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "scheduled":
      return <RiClockwiseLine className="w-4 h-4" />;
    case "completed":
      return <RiCheckLine className="w-4 h-4" />;
    case "cancelled":
      return <RiCloseLine className="w-4 h-4" />;
    case "in-progress":
      return <TbAlertTriangle className="w-4 h-4" />;
    default:
      return <RiClockwiseLine className="w-4 h-4" />;
  }
};

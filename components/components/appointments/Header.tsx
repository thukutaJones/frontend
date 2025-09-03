import React from "react";
import {
  RiCalendarLine,
  RiSearchLine,
  RiFilterLine,
  RiAddLine,
} from "react-icons/ri";

const Header = ({
  role,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  openModal,
}: {
  role: string;
  searchTerm: any;
  setSearchTerm: any;
  filterStatus: any;
  setFilterStatus: any;
  openModal: any;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-xl flex flex-row justify-between">
      <div className="hidden md:block">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
        <p className="text-gray-600 font-medium">
          {role === "patient"
            ? "Manage your medical appointments"
            : "View scheduled appointments"}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="relative">
          <RiFilterLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e: any) => setFilterStatus(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>
        {role === "patient" && (
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 "
          >
            <RiAddLine className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <p className="font-semibold">Book Appointment</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

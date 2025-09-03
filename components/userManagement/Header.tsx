import React from "react";
import { FiUserPlus, FiSearch, FiFilter } from "react-icons/fi";

type Role =
  | "patient"
  | "ambulance_driver"
  | "doctor"
  | "nurse"
  | "admin"
  | "hod";

const Header = ({
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
  openAddModal,
  handleAddUser
}: {
  searchTerm: string;
  setSearchTerm: any;
  setFilterRole: any;
  filterRole: string;
  openAddModal: any;
  handleAddUser: any;
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div className="flex flex-col sm:flex-row md:justify-end w-full gap-4">
          {/* Search */}
          <div className="flex items-center w-full sm:flex-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2">
            <FiSearch className="text-gray-500 w-5 h-5 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 min-w-[150px]">
            <FiFilter className="text-gray-400 w-5 h-5 mr-2 shrink-0" />
            <select
              value={filterRole}
              onChange={(e: any) =>
                setFilterRole(e.target.value as Role | "all")
              }
              className="w-full bg-transparent outline-none text-sm"
            >
              <option value="all">All Roles</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="ambulance_driver">Ambulance Driver</option>
              <option value="admin">Admin</option>
              <option value="hod">HOD</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddUser}
            className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FiUserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

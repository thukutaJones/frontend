import React, { useState } from "react";

import {
  FiEdit3,
  FiPower,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiClock,
  FiHeart,
  FiActivity,
  FiMapPin,
} from "react-icons/fi";

const UsersTable = ({
  users = [],
  openEditModal,
}: {
  users: any[];
  openEditModal: any;
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (userId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedRows(newExpanded);
  };

  const toggleUserStatus = (userId: string) => {};

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-black bg-gray-100">
            <tr>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user: any, index: number) => (
              <React.Fragment key={index?.toString()}>
                <tr className="hover:bg-blue-50/50 transition-all duration-200 group">
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                        <FiUser className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-900">
                          {user?.full_name}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <FiMail className="w-4 h-4" />
                          {user?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                        user?.role === "admin"
                          ? "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600"
                          : user?.role === "doctor" ||
                            user?.role === "ambulance_driver" ||
                            user?.role === "nurse"
                          ? "bg-gradient-to-r from-emerald-50 to-green-100 text-green-600"
                          : user?.role === "patient"
                          ? "bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-600"
                          : "bg-gradient-to-r from-orange-50 to-red-100 text-red-600"
                      }`}
                    >
                      {user?.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                        !(user?.is_deleted === "active")
                          ? "bg-gradient-to-r from-emerald-50 to-green-100 text-green-600"
                          : "bg-gradient-to-r from-red-50 to-red-100 text-red-600"
                      }`}
                    >
                      {!(user?.is_deleted === "active")
                        ? "Active"
                        : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                    {new Date(user?.createdAt)?.toDateString()}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {(user?.patientDetails || user?.staffDetails) && (
                        <button
                          onClick={() => toggleRowExpansion(user?.id)}
                          className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                          title="View Details"
                        >
                          {expandedRows.has(user?.id) ? (
                            <FiChevronUp className="w-5 h-5" />
                          ) : (
                            <FiChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-3 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                        title="Edit User"
                      >
                        <FiEdit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user?.id)}
                        className={`p-3 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                          user?.status === "active"
                            ? "text-red-600 hover:bg-red-100"
                            : "text-green-600 hover:bg-green-100"
                        }`}
                        title={
                          user?.status === "active" ? "Deactivate" : "Activate"
                        }
                      >
                        <FiPower className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expandable Row */}
                {expandedRows.has(user?.id) &&
                  (user?.patientDetails || user?.staffDetails) && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50"
                      >
                        <div className="space-y-6">
                          <h4 className="font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-2">
                            Additional Details
                          </h4>

                          {user?.patientDetails && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <FiMapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-700 block">
                                        Address
                                      </span>
                                      <span className="text-gray-600">
                                        {user?.patientDetails?.address}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                      <FiFileText className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-700 block">
                                        Nation ID
                                      </span>
                                      <span className="text-gray-600">
                                        {user?.patientDetails?.nationId}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                      <FiPhone className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-700 block">
                                        Emergency Contact
                                      </span>
                                      <span className="text-gray-600">
                                        {user?.patientDetails?.emergencyContact}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-start gap-3 text-sm">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <FiHeart className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div className="flex-1">
                                      <span className="font-semibold text-gray-700 block mb-2">
                                        Medical Conditions
                                      </span>
                                      <div className="flex flex-wrap gap-2">
                                        {user?.patientDetails?.conditions?.map(
                                          (condition: any, index: number) => (
                                            <span
                                              key={index?.toString()}
                                              className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-medium shadow-sm"
                                            >
                                              {condition}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {user?.staffDetails && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <FiActivity className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-700 block">
                                        Role
                                      </span>
                                      <span className="text-gray-600 capitalize">
                                        {user?.staffDetails.roleWithin.replace(
                                          "_",
                                          " "
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                      <FiFileText className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-700 block">
                                        Department
                                      </span>
                                      <span className="text-gray-600">
                                        {user?.staffDetails.department}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                      <FiClock className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-700 block">
                                        Working Hours
                                      </span>
                                      <span className="text-gray-600">
                                        {user?.staffDetails.workingHours}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-start gap-3 text-sm">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <FiHeart className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                      <span className="font-semibold text-gray-700 block mb-2">
                                        Specialties
                                      </span>
                                      <div className="flex flex-wrap gap-2">
                                        {user?.staffDetails.specialties.map(
                                          (specialty: any, index: number) => (
                                            <span
                                              key={index?.toString()}
                                              className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-medium shadow-sm"
                                            >
                                              {specialty}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;

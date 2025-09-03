import React from "react";
import {
  FiUser,
  FiMail,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiGlobe,
  FiUsers,
} from "react-icons/fi";

const StaffTable = ({ staffMembers = [] }: { staffMembers: any[] }) => {
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
                Gender
              </th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                Availability
              </th>
              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staffMembers?.map((user: any, index: number) => (
              <React.Fragment key={user._id || index.toString()}>
                <tr className="hover:bg-blue-50/50 transition-all duration-200 group">
                  {/* User Info */}
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                        <FiUser className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-900">
                          {user?.name}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <FiMail className="w-4 h-4" />
                          {user?.email || "--"}
                        </div>
                        {user?.username && (
                          <div className="text-xs text-gray-500">
                            @{user.username}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                        user?.role === "admin"
                          ? "bg-purple-100 text-purple-600"
                          : user?.role === "doctor" ||
                            user?.role === "ambulance_driver" ||
                            user?.role === "nurse"
                          ? "bg-green-100 text-green-600"
                          : user?.role === "patient"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user?.role?.toUpperCase()}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                        user?.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user?.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Gender */}
                  <td className="px-6 py-5 text-sm text-gray-600">
                    {user?.gender ? user.gender : "--"}
                  </td>

                  {/* Preferred Language */}
                  <td className="px-6 py-5 text-sm text-gray-600 flex items-center gap-2">
                    <FiGlobe className="w-4 h-4" />
                    {user?.preferredLanguage?.toUpperCase() || "N/A"}
                  </td>

                  {/* Availability */}
                  <td className="px-6 py-5">
                    {user?.linkedStaffId?.isAvailable ? (
                      <span className="flex items-center gap-2 text-green-600 font-medium">
                        <FiCheckCircle className="w-4 h-4" />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-600 font-medium">
                        <FiXCircle className="w-4 h-4" />
                        Unavailable
                      </span>
                    )}
                  </td>

                  {/* Joined Date */}
                  <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                    {user?.createdAt
                      ? new Date(user.createdAt).toDateString()
                      : "--"}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;

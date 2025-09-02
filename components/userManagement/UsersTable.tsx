import React, { useState } from "react";
import {
  FiEdit3,
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
  FiUserX,
  FiUserCheck,
} from "react-icons/fi";
import FastBouncingDots from "../BouncingAnimation";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";

const UsersTable = ({
  users = [],
  openEditModal,
  user_,
  callBack,
}: {
  users: any[];
  openEditModal: any;
  user_: {
    id: string;
    name: string;
    role: string;
    email: string;
    token: string;
  };
  callBack: any;
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isChangingStatus, setIsChangingStatus] = useState<string>("");

  const toggleRowExpansion = (userId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedRows(newExpanded);
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      setIsChangingStatus(userId);
      await axios.put(
        `${baseUrl}/api/changeStatus/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user_?.token}`,
          },
        }
      );
      await callBack();
    } catch (error) {
      console.log(error);
    } finally {
      setIsChangingStatus("");
    }
  };

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
              <React.Fragment key={user._id || index.toString()}>
                <tr className="hover:bg-blue-50/50 transition-all duration-200 group">
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
                          {user?.email || user?.phone || "--"}
                        </div>
                        {user?.username && (
                          <div className="text-xs text-gray-500">
                            @{user.username}
                          </div>
                        )}
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
                      {user?.role?.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                        user?.status === "active"
                          ? "bg-gradient-to-r from-emerald-50 to-green-100 text-green-600"
                          : "bg-gradient-to-r from-red-50 to-red-100 text-red-600"
                      }`}
                    >
                      {user?.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                    {user?.createdAt
                      ? new Date(user.createdAt).toDateString()
                      : "--"}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {user?.linkedPatientId && (
                        <button
                          onClick={() => toggleRowExpansion(user._id)}
                          className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                          title="View Patient Details"
                        >
                          {expandedRows.has(user._id) ? (
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
                        onClick={() => toggleUserStatus(user._id)}
                        className={`p-3 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                          user?.status === "active"
                            ? "text-red-600 hover:bg-red-100"
                            : "text-green-600 hover:bg-green-100"
                        }`}
                        title={
                          user?.status === "active" ? "Deactivate" : "Activate"
                        }
                      >
                        {isChangingStatus === user?.id ? (
                          <div className="flex items-center justify-center space-x-1">
                            <span
                              className={`w-2 h-2 ${
                                user?.status === "active"
                                  ? "bg-green-900"
                                  : "bg-red-900"
                              }  rounded-full bounce-fast`}
                              style={{ animationDelay: "-0.2s" }}
                            ></span>
                            <span
                              className="w-2 h-2 bg-blue-900 rounded-full bounce-fast"
                              style={{ animationDelay: "-0.1s" }}
                            ></span>
                            <span className="w-2 h-2 bg-white rounded-full bounce-fast"></span>
                          </div>
                        ) : user?.status === "active" ? (
                          <FiUserX className="w-5 h-5" />
                        ) : (
                          <FiUserCheck className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expandable Row for Patient Details */}
                {expandedRows.has(user._id) && user?.linkedPatientId && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50"
                    >
                      <div className="space-y-6">
                        <h4 className="font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-2">
                          Patient Details
                        </h4>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            {/* Address Section */}
                            {user.linkedPatientId.address && (
                              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-start gap-3 text-sm">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <FiMapPin className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-semibold text-gray-700 block mb-1">
                                      Address
                                    </span>
                                    <div className="text-gray-600 space-y-1">
                                      {user.linkedPatientId.address.line1 && (
                                        <div>
                                          {user.linkedPatientId.address.line1}
                                        </div>
                                      )}
                                      {user.linkedPatientId.address.line2 && (
                                        <div>
                                          {user.linkedPatientId.address.line2}
                                        </div>
                                      )}
                                      {user.linkedPatientId.address.city && (
                                        <div>
                                          {user.linkedPatientId.address.city}
                                        </div>
                                      )}
                                      {user.linkedPatientId.address.region && (
                                        <div>
                                          {user.linkedPatientId.address.region}
                                        </div>
                                      )}
                                      {user.linkedPatientId.address
                                        .postalCode && (
                                        <div>
                                          {
                                            user.linkedPatientId.address
                                              .postalCode
                                          }
                                        </div>
                                      )}
                                      {user.linkedPatientId.district && (
                                        <div>
                                          District:{" "}
                                          {user.linkedPatientId.district}
                                        </div>
                                      )}
                                      {!user.linkedPatientId.address.line1 &&
                                        !user.linkedPatientId.district && (
                                          <span className="text-gray-400 italic">
                                            No address provided
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Emergency Contact */}
                            {user.linkedPatientId.emergencyContact && (
                              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-start gap-3 text-sm">
                                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <FiPhone className="w-4 h-4 text-red-600" />
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-semibold text-gray-700 block mb-1">
                                      Emergency Contact
                                    </span>
                                    <div className="text-gray-600 space-y-1">
                                      {user.linkedPatientId.emergencyContact
                                        .name && (
                                        <div>
                                          Name:{" "}
                                          {
                                            user.linkedPatientId
                                              .emergencyContact.name
                                          }
                                        </div>
                                      )}
                                      {user.linkedPatientId.emergencyContact
                                        .phone && (
                                        <div>
                                          Phone:{" "}
                                          {
                                            user.linkedPatientId
                                              .emergencyContact.phone
                                          }
                                        </div>
                                      )}
                                      {user.linkedPatientId.emergencyContact
                                        .relation && (
                                        <div>
                                          Relation:{" "}
                                          {
                                            user.linkedPatientId
                                              .emergencyContact.relation
                                          }
                                        </div>
                                      )}
                                      {!user.linkedPatientId.emergencyContact
                                        .name &&
                                        !user.linkedPatientId.emergencyContact
                                          .phone && (
                                          <span className="text-gray-400 italic">
                                            No emergency contact provided
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            {/* Medical Conditions */}
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                              <div className="flex items-start gap-3 text-sm">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <FiHeart className="w-4 h-4 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-semibold text-gray-700 block mb-2">
                                    Medical Conditions
                                  </span>
                                  {user.linkedPatientId.conditions?.length >
                                  0 ? (
                                    <div className="flex flex-wrap gap-2">
                                      {user.linkedPatientId.conditions.map(
                                        (condition: any, idx: number) => (
                                          <span
                                            key={idx}
                                            className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-medium shadow-sm"
                                          >
                                            {condition}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-400 italic">
                                      No conditions recorded
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Medical Records Count */}
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                              <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                  <FiFileText className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-700 block">
                                    Medical Records
                                  </span>
                                  <span className="text-gray-600">
                                    {user.linkedPatientId.medicalRecords
                                      ?.length || 0}{" "}
                                    records
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional User Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <FiUser className="w-4 h-4 text-indigo-600" />
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700 block">
                                  Gender
                                </span>
                                <span className="text-gray-600 capitalize">
                                  {user.gender || "Not specified"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FiClock className="w-4 h-4 text-yellow-600" />
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700 block">
                                  Date of Birth
                                </span>
                                <span className="text-gray-600">
                                  {user.dob
                                    ? new Date(user.dob).toDateString()
                                    : "Not provided"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                                <FiActivity className="w-4 h-4 text-teal-600" />
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700 block">
                                  Language
                                </span>
                                <span className="text-gray-600 uppercase">
                                  {user.preferredLanguage || "Not set"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
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

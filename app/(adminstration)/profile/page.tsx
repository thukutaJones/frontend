"use client";

import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiFileText,
  FiHeart,
  FiActivity,
  FiEdit3,
  FiSave,
  FiX,
  FiClock,
  FiFile,
  FiUpload,
  FiPower,
} from "react-icons/fi";

// Types (same as user management)
type Role =
  | "patient"
  | "ambulance_driver"
  | "admin"
  | "hod"
  | "doctor"
  | "nurse";
type Status = "active" | "deactivated";
type Gender = "male" | "female" | "other";
type StaffRole = "doctor" | "nurse" | "ambulance_driver" | "technician";

interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
  gender: Gender;
  dob: string;
  createdAt: string;
  lastLogin: string;
}

interface PatientDetails {
  address: string;
  nationId: string;
  conditions: string[];
  emergencyContact: string;
  medicalRecords: File[];
}

interface StaffDetails {
  roleWithin: StaffRole;
  specialties: string[];
  department: string;
  workingHours: string;
}

interface User extends BaseUser {
  patientDetails?: PatientDetails;
  staffDetails?: StaffDetails;
}

// Sample user data for different roles
const sampleUsers: User[] = [
  {
    id: "1",
    fullName: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1234567890",
    role: "ambulance_driver",
    status: "active",
    gender: "female",
    dob: "1985-03-15",
    createdAt: "2024-01-15",
    lastLogin: "2024-08-27T10:30:00Z",
    staffDetails: {
      roleWithin: "doctor",
      specialties: ["Cardiology", "Internal Medicine"],
      department: "Cardiology",
      workingHours: "8:00 AM - 6:00 PM",
    },
  },
  {
    id: "2",
    fullName: "John Smith",
    email: "john.smith@gmail.com",
    phone: "+0987654321",
    role: "patient",
    status: "active",
    gender: "male",
    dob: "1990-07-22",
    createdAt: "2024-02-10",
    lastLogin: "2024-08-26T14:20:00Z",
    patientDetails: {
      address: "123 Main St, City, State 12345",
      nationId: "ID123456789",
      conditions: ["Hypertension", "Diabetes Type 2"],
      emergencyContact: "+1122334455",
      medicalRecords: [],
    },
  },
  {
    id: "3",
    fullName: "Admin User",
    email: "admin@hospital.com",
    phone: "+1111222233",
    role: "admin",
    status: "active",
    gender: "male",
    dob: "1980-12-01",
    createdAt: "2024-01-01",
    lastLogin: "2024-08-27T09:15:00Z",
  },
  {
    id: "4",
    fullName: "Dr. Michael Chen",
    email: "michael.chen@hospital.com",
    phone: "+1555666777",
    role: "hod",
    status: "active",
    gender: "male",
    dob: "1975-08-10",
    createdAt: "2023-06-01",
    lastLogin: "2024-08-27T08:45:00Z",
    staffDetails: {
      roleWithin: "doctor",
      specialties: ["Neurosurgery", "Trauma Surgery"],
      department: "Neurology",
      workingHours: "7:00 AM - 7:00 PM",
    },
  },
];

const ProfilePage = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);

  const currentUser = sampleUsers[currentUserIndex];

  const handleEdit = () => {
    setEditData({ ...currentUser });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData) {
      // In a real app, this would update the user in the database
      sampleUsers[currentUserIndex] = editData;
      setIsEditing(false);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatLastLogin = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "admin":
        return "from-purple-500 to-purple-600";
      case "nurse":
      case "ambulance_driver":
      case "doctor":
        return "from-emerald-500 to-green-600";
      case "patient":
        return "from-blue-500 to-indigo-600";
      case "hod":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with User Selector */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                User Profile
              </h1>
              <p className="text-gray-600">
                View and manage user information based on role
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={currentUserIndex}
                onChange={(e) => {
                  setCurrentUserIndex(Number(e.target.value));
                  setIsEditing(false);
                  setEditData(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium"
              >
                {sampleUsers.map((user, index) => (
                  <option key={user.id} value={index}>
                    {user.fullName} ({user.role})
                  </option>
                ))}
              </select>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 font-semibold shadow-md"
                >
                  <FiEdit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden mb-8">
          <div
            className={`bg-gradient-to-r ${getRoleColor(currentUser.role)} p-8`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FiUser className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {currentUser.fullName}
                </h2>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    <span>{currentUser.phone}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold text-white">
                    {currentUser.role.toUpperCase()}
                  </span>
                  <span
                    className={`ml-3 px-4 py-2 rounded-full text-sm font-bold ${
                      currentUser.status === "active"
                        ? "bg-green-500/20 text-green-100"
                        : "bg-red-500/20 text-red-100"
                    }`}
                  >
                    {currentUser.status === "active" ? "Active" : "Deactivated"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Basic Information
                  </h3>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSave}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <FiSave className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData?.fullName || ""}
                        onChange={(e) =>
                          setEditData(
                            editData
                              ? { ...editData, fullName: e.target.value }
                              : null
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {currentUser.fullName}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData?.email || ""}
                        onChange={(e) =>
                          setEditData(
                            editData
                              ? { ...editData, email: e.target.value }
                              : null
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {currentUser.email}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData?.phone || ""}
                        onChange={(e) =>
                          setEditData(
                            editData
                              ? { ...editData, phone: e.target.value }
                              : null
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {currentUser.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        value={editData?.gender || ""}
                        onChange={(e) =>
                          setEditData(
                            editData
                              ? {
                                  ...editData,
                                  gender: e.target.value as Gender,
                                }
                              : null
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-medium capitalize">
                        {currentUser.gender}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData?.dob || ""}
                        onChange={(e) =>
                          setEditData(
                            editData
                              ? { ...editData, dob: e.target.value }
                              : null
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {formatDate(currentUser.dob)}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Login
                    </label>
                    <p className="text-gray-900 font-medium">
                      {formatLastLogin(currentUser.lastLogin)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Account Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">User ID</span>
                  <span className="font-medium text-gray-900">
                    #{currentUser.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Created</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(currentUser.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Role</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getRoleColor(
                      currentUser.role
                    )}`}
                  >
                    {currentUser.role.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      currentUser.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentUser.status === "active" ? "Active" : "Deactivated"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific Information */}
        {currentUser.patientDetails && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <FiHeart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Patient Information
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiMapPin className="w-5 h-5 text-red-600" />
                    <label className="text-sm font-semibold text-red-800">
                      Address
                    </label>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {currentUser.patientDetails.address}
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiFileText className="w-5 h-5 text-red-600" />
                    <label className="text-sm font-semibold text-red-800">
                      National ID
                    </label>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {currentUser.patientDetails.nationId}
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiPhone className="w-5 h-5 text-red-600" />
                    <label className="text-sm font-semibold text-red-800">
                      Emergency Contact
                    </label>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {currentUser.patientDetails.emergencyContact}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FiHeart className="w-5 h-5 text-red-600" />
                    <label className="text-sm font-semibold text-red-800">
                      Medical Conditions
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.patientDetails.conditions.map(
                      (condition, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-medium"
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
        )}

        {currentUser.staffDetails && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <FiActivity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentUser.role === "hod"
                  ? "Head of Department Information"
                  : "Staff Information"}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiActivity className="w-5 h-5 text-green-600" />
                    <label className="text-sm font-semibold text-green-800">
                      Staff Role
                    </label>
                  </div>
                  <p className="text-gray-900 font-medium capitalize">
                    {currentUser.staffDetails.roleWithin.replace("_", " ")}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiFileText className="w-5 h-5 text-green-600" />
                    <label className="text-sm font-semibold text-green-800">
                      Department
                    </label>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {currentUser.staffDetails.department}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiClock className="w-5 h-5 text-green-600" />
                    <label className="text-sm font-semibold text-green-800">
                      Working Hours
                    </label>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {currentUser.staffDetails.workingHours}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FiHeart className="w-5 h-5 text-green-600" />
                    <label className="text-sm font-semibold text-green-800">
                      Specialties
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.staffDetails.specialties.map(
                      (specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium"
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
        )}

        {!currentUser.patientDetails && !currentUser.staffDetails && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-8">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiUser className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Basic Account
              </h3>
              <p className="text-gray-600">
                This is a {currentUser.role} account with standard privileges.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

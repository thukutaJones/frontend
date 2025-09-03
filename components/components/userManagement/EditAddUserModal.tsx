import React, { useState } from "react";
import { FiActivity, FiHeart, FiUser, FiX } from "react-icons/fi";
import MultiTextInput from "../MultiTextInput";
import FileUpload from "../FileUpload";

type Status = "active" | "deactivated";
type Gender = "male" | "female" | "other";
// type StaffRole = "doctor" | "nurse" | "ambulance_driver" | "technician";
type Role = "patient" | "doctor" | "nurse" | "ambulance_driver" | "admin" | "hod";

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

const EditAddUserModal = ({
  editingUser,
  closeModal,
  formData,
  setFormData,
}: {
  editingUser: any;
  closeModal: any;
  formData: any;
  setFormData: any;
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      ...formData,
      id: editingUser?.id || Date.now().toString(),
      createdAt:
        editingUser?.createdAt || new Date().toISOString().split("T")[0],
      lastLogin: editingUser?.lastLogin || new Date().toISOString(),
    } as User;
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-2xl shadow-lg max-w-5xl w-full h-[95vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r h-[100px] from-blue-900 to-indigo-800 text-white px-8 py-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl text-white font-bold">
                {editingUser ? "Edit User" : "Add new user"}
              </h2>
              <p className="text-white text-xs">
                {editingUser
                  ? "Update user information and details"
                  : "Create a new user account with role-specific information"}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="p-3 text-blue-100 hover:text-white hover:bg-blue-700/50 rounded-xl transition-all duration-200"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="space-y-4 h-[calc(95vh-100px)] overflow-hidden"
        >
          {/* Basic Information Section */}
          <div className="h-[calc(95vh-200px)] p-8 overflow-auto scroll-container">
            <div className="bg-white rounded-2xl p-8 mb-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    User Role
                  </label>
                  <select
                    required
                    value={formData.role || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as Role,
                      })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                  >
                    <option value="">Select Role</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="ambulance_driver">Ambulance Driver</option>
                    <option value="admin">Administrator</option>
                    <option value="hod">Head of Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Gender
                  </label>
                  <select
                    required
                    value={formData.gender || "male"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as Gender,
                      })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Role-specific sections */}
            {formData.role === "patient" && (
              <div className="bg-white rounded-2xl p-8 border border-red-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FiHeart className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Patient Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Home Address{" "}
                      <span className="text-gray-500 font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={formData.patientDetails?.address || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          patientDetails: {
                            ...formData.patientDetails,
                            address: e.target.value,
                          } as PatientDetails,
                        })
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium resize-none"
                      rows={3}
                      placeholder="Enter full address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      National ID{" "}
                      <span className="text-gray-500 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.patientDetails?.nationId || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          patientDetails: {
                            ...formData.patientDetails,
                            nationId: e.target.value,
                          } as PatientDetails,
                        })
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                      placeholder="Enter national ID"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Emergency Contact{" "}
                    <span className="text-gray-500 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={formData.patientDetails?.emergencyContact || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        patientDetails: {
                          ...formData.patientDetails,
                          emergencyContact: e.target.value,
                        } as PatientDetails,
                      })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="Enter emergency contact number"
                  />
                </div>

                <div className="mb-6">
                  <MultiTextInput
                    values={formData.patientDetails?.conditions || []}
                    onChange={(conditions) =>
                      setFormData({
                        ...formData,
                        patientDetails: {
                          ...formData.patientDetails,
                          conditions,
                        } as PatientDetails,
                      })
                    }
                    label="Medical Conditions"
                    placeholder="Type condition and press Enter..."
                    optional={true}
                  />
                </div>

                <div>
                  <FileUpload
                    files={formData.patientDetails?.medicalRecords || []}
                    onChange={(medicalRecords) =>
                      setFormData({
                        ...formData,
                        patientDetails: {
                          ...formData.patientDetails,
                          medicalRecords,
                        } as PatientDetails,
                      })
                    }
                    label="Medical Records"
                    optional={true}
                  />
                </div>
              </div>
            )}

            {formData.role === "staff" && (
              <div className="rounded-2xl p-8 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FiActivity className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Staff Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Staff Role
                    </label>
                    <select
                      required
                      value={formData.staffDetails?.roleWithin || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          staffDetails: {
                            ...formData.staffDetails,
                            roleWithin: e.target.value as StaffRole,
                          } as StaffDetails,
                        })
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                    >
                      <option value="">Select Staff Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="ambulance_driver">Ambulance Driver</option>
                      <option value="technician">Technician</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Department
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.staffDetails?.department || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          staffDetails: {
                            ...formData.staffDetails,
                            department: e.target.value,
                          } as StaffDetails,
                        })
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                      placeholder="e.g., Cardiology, Emergency, Pediatrics"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Working Hours{" "}
                    <span className="text-gray-500 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.staffDetails?.workingHours || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        staffDetails: {
                          ...formData.staffDetails,
                          workingHours: e.target.value,
                        } as StaffDetails,
                      })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="e.g., 8:00 AM - 5:00 PM, Night Shift"
                  />
                </div>

                <div>
                  <MultiTextInput
                    values={formData.staffDetails?.specialties || []}
                    onChange={(specialties) =>
                      setFormData({
                        ...formData,
                        staffDetails: {
                          ...formData.staffDetails,
                          specialties,
                        } as StaffDetails,
                      })
                    }
                    label="Medical Specialties"
                    placeholder="Type specialty and press Enter..."
                    optional={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-row justify-end gap-4 px-8 py-2 h-[100px] border-t border-gray-100">
            <div className="flex flex-row gap-4 items-center">
              <button
                type="button"
                onClick={closeModal}
                className="px-8 py-4 border-2 text-sm border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-4 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {editingUser ? "Update User" : "Add User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddUserModal;

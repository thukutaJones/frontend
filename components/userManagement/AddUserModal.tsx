import React, { useEffect, useState } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiUserCheck,
  FiEdit3,
  FiSave,
  FiAlertCircle,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";

interface Department {
  _id: string;
  name: string;
  description: string;
  location: string;
  isEmergencyService: boolean;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; id: string; email: string; token: string };
  callack: () => void;
}

interface FormData {
  name: string;
  username: string;
  role: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
}

interface FormErrors {
  [key: string]: string;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  user,
  callack
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    role: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
  });
  const [departments, setDepartments] = useState<any[]>([]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { value: "doctor", label: "Doctor" },
    { value: "nurse", label: "Nurse" },
    { value: "ambulance_driver", label: "Ambulance Driver" },
    { value: "admin", label: "Admin" },
    { value: "hod", label: "Head of Department" },
    { value: "patient", label: "Patient" },
  ];

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const rolesRequiringDepartment = [
    "ambulance_driver",
    "hod",
    "nurse",
    "doctor",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Department validation
    if (
      rolesRequiringDepartment.includes(formData.role) &&
      !formData.department
    ) {
      newErrors.department = "Department is required for this role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Clear department when role changes to non-department role
    if (field === "role" && !rolesRequiringDepartment.includes(value)) {
      setFormData((prev) => ({ ...prev, department: "" }));
    }
  };

  const fetchDepartments = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${baseUrl}/api/all-departments`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setDepartments(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [user]);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare submission data
      const submissionData = {
        ...formData,
        department: rolesRequiringDepartment.includes(formData.role)
          ? formData.department
          : undefined,
      };

      await axios.post(`${baseUrl}/api/create-user`, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      // Reset form
      setFormData({
        name: "",
        username: "",
        role: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        gender: "",
        department: "",
      });
      await callack()
      setErrors({});
      onClose();
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      username: "",
      role: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      gender: "",
      department: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-6">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
            <div
              className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 translate-y-12 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add New User</h2>
                <p className="text-blue-100 text-sm">
                  Create a new user account
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Enter full name"
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiEdit3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.username
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Enter username"
                    />
                  </div>
                  {errors.username && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.username}</span>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUserCheck className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 appearance-none ${
                        errors.role
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.role && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.role}</span>
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Gender
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 appearance-none ${
                        errors.gender
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                    >
                      <option value="">Select gender</option>
                      {genders.map((gender) => (
                        <option key={gender.value} value={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.gender && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.gender}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                Other Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Enter email address"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiPhone className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phone && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Date of Birth (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiCalendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.dateOfBirth
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.dateOfBirth}</span>
                    </div>
                  )}
                </div>

                {/* Department - Only show for certain roles */}
                {rolesRequiringDepartment.includes(formData.role) && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Department
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaBuilding className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        value={formData.department}
                        onChange={(e) =>
                          handleInputChange("department", e.target.value)
                        }
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 appearance-none ${
                          errors.department
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                        }`}
                      >
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                          <option key={dept._id} value={dept._id}>
                            {dept.name} - {dept.location}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.department && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <FiAlertCircle className="w-4 h-4" />
                        <span>{errors.department}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    <span>Create User</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;

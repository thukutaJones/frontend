"use client";

import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiMapPin,
  FiPhone,
  FiFileText,
  FiX,
  FiSave,
  FiSearch,
  FiExternalLink,
  FiMap,
  FiNavigation,
  FiClock,
} from "react-icons/fi";
import {
  createDepartment,
  updateDepartment,
  fetchDepartmentsAPI,
  deleteDepartmentAPI,
  getAuthHeader,
} from "./departmentOp";
import { RiBuildingLine } from "react-icons/ri";
import { useAuth } from "@/hooks/useAuth";
import LoadingAnimation from "@/components/LoadingAnimation";
// Types
interface Department {
  _id: string;
  id: string;
  name: string;
  roomNumber: string;
  contactPhone: string;
  description: string;
  code: string;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  createdAt: string;
}

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<Department>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useAuth(["admin"]);
  // ✅ Load from backend
  const fetchDepartments = async () => {
    try {
      if (!user?.token) return;
      setIsLoading(true);
      const res = await fetchDepartmentsAPI(user.token);
      console.log(`Departments res: ${res}`);
      setDepartments(res);
    } catch (error) {
      console.error(`Error fetching departments:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuthHeader(user?.token);
    fetchDepartments();
  }, [user]);

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      roomNumber: "",
      contactPhone: "",
      description: "",
      locationName: "",
      latitude: undefined,
      longitude: undefined,
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingDepartment(null);
    setShowModal(true);
  };

  const openEditModal = (department: Department) => {
    setFormData(department);
    setEditingDepartment(department);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
    resetForm();
  };

  // ✅ Save (Add or Update)
  // ✅ Save (Add or Update)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user?.token) return;

      if (editingDepartment) {
        // Only include fields that have changed
        const updatedFields: Partial<Department> = {};

        (Object.keys(formData) as (keyof Department)[]).forEach((key) => {
          if (formData[key] !== editingDepartment[key]) {
            updatedFields[key] = formData[key] as any;
          }
        });

        if (Object.keys(updatedFields).length === 0) {
          console.log("No changes made.");
          closeModal();
          return;
        }
        console.log(editingDepartment);
        await updateDepartment(
          editingDepartment._id,
          updatedFields,
          user.token
        );
        // setDepartments(
        //   departments.map((d) => (d._id === editingDepartment._id ? updated : d))
        // );
      } else {
        await createDepartment(formData, user.token);
      }
      await fetchDepartments();
      closeModal();
    } catch (err) {
      console.error("Error saving department:", err);
    }
  };

  // ✅ Delete (backend + local state)
  const deleteDepartment = async (id: string) => {
    try {
      await deleteDepartmentAPI(id, user?.token);
      await fetchDepartments();
    } catch (err) {
      console.error("Error deleting department:", err);
    }
    setShowDeleteConfirm(null);
  };

  // ✅ Location helpers
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData({
          ...formData,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Error getting location:", err);
        alert("Unable to retrieve your location.");
      }
    );
  };

  const openGoogleMaps = () => {
    if (formData.latitude && formData.longitude) {
      window.open(
        `https://maps.google.com/?q=${formData.latitude},${formData.longitude}`,
        "_blank"
      );
    }
  };

  // Filtering
  const filteredDepartments = departments.filter(
    (dept) =>
      (dept.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dept.roomNumber ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (dept.description ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (dept.locationName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateGoogleMapsUrl = (lat: number, lng: number) =>
    `https://maps.google.com/?q=${lat},${lng}`;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const hasLocation = (dept: Department) => dept.latitude && dept.longitude;

  if (!user || isLoading) return <LoadingAnimation />;
  return (
    <div className="min-h-screen bg-gradient-to-br text-gray-600 from-slate-50 via-blue-50/30 to-indigo-50/40 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 mb-8 shadow border border-white/20">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-blue-900 ">
                Department Management
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <RiBuildingLine className="w-4 h-4" />
                  <span>{departments.length} Departments</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiMapPin className="w-4 h-4" />
                  <span>
                    {departments.filter((d) => hasLocation(d)).length} With
                    Locations
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
              {/* Search */}
              <div className="flex items-center w-full sm:flex-1 lg:w-80 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 shadow-sm">
                <FiSearch className="text-gray-400 w-5 h-5 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search departments, rooms, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                />
              </div>

              {/* Add Button */}
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                <FiPlus className="w-5 h-5" />
                New Department
              </button>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDepartments.map((department, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 hover:border-blue-200/50"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <RiBuildingLine className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {department.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-500">
                      Room {department.roomNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => openEditModal(department)}
                    className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                    title="Edit Department"
                  >
                    <FiEdit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(department._id)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                    title="Delete Department"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Description */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-4 border border-gray-100/50">
                  <div className="flex items-start gap-3">
                    <FiFileText className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {department.description}
                    </p>
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50/50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                    <FiPhone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Contact
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {department.contactPhone}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50/50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-sm">
                    <FiMapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Location
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {department.locationName || "Location not specified"}
                      </p>
                      {hasLocation(department) && (
                        <a
                          href={generateGoogleMapsUrl(
                            department.latitude!,
                            department.longitude!
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="View on Google Maps"
                        >
                          <FiExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiClock className="w-3 h-3" />
                    <span>Created {formatDate(department.createdAt)}</span>
                  </div>
                  {hasLocation(department) && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                      <FiMap className="w-3 h-3" />
                      <span>GPS Enabled</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDepartments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <RiBuildingLine className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No departments found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm
                ? "No departments match your search criteria. Try different keywords."
                : "Start organizing your hospital by creating your first department."}
            </p>
            {!searchTerm && (
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Create First Department
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-8 py-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {editingDepartment
                        ? "Edit Department"
                        : "Create New Department"}
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      {editingDepartment
                        ? "Update department information and settings"
                        : "Add a new department to your hospital system"}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto scroll-container">
                {/* Department Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Department Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="e.g., Emergency Department, Cardiology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Department Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="e.g., Emergency Department, Cardiology"
                  />
                </div>

                {/* Room Number */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Room Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roomNumber || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, roomNumber: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="e.g., ER-001, CD-102, PD-205"
                  />
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contactPhone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="e.g., +265-1-234-567"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 font-medium resize-none"
                    rows={3}
                    placeholder="Describe the department's services, specialties, and purpose"
                  />
                </div>

                {/* Location Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Location Description
                  </label>
                  <input
                    type="text"
                    value={formData.locationName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, locationName: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="e.g., Ground Floor Main Building, Second Floor East Wing"
                  />
                </div>

                {/* GPS Coordinates Section */}
                <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        GPS Location (Optional)
                      </h3>
                      <p className="text-sm text-gray-600">
                        Add precise coordinates for navigation
                      </p>
                    </div>
                    <FiMapPin className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* Location Buttons */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                    >
                      <FiNavigation className="w-4 h-4" />
                      Use My Location
                    </button>
                    {formData.latitude && formData.longitude && (
                      <button
                        type="button"
                        onClick={openGoogleMaps}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        View on Maps
                      </button>
                    )}
                  </div>

                  {/* Coordinate Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={formData.latitude || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            latitude: parseFloat(e.target.value) || undefined,
                          })
                        }
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800"
                        placeholder="e.g., -13.9626"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={formData.longitude || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            longitude: parseFloat(e.target.value) || undefined,
                          })
                        }
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800"
                        placeholder="e.g., 33.7741"
                      />
                    </div>
                  </div>

                  {formData.latitude && formData.longitude && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <FiMap className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          GPS coordinates saved: {formData.latitude.toFixed(6)},{" "}
                          {formData.longitude.toFixed(6)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FiSave className="w-4 h-4" />
                    {editingDepartment
                      ? "Update Department"
                      : "Create Department"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full p-8 border border-white/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FiTrash2 className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Delete Department
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Are you sure you want to permanently delete this department?
                  This action cannot be undone and all associated data will be
                  lost.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                  >
                    Keep Department
                  </button>
                  <button
                    onClick={() => deleteDepartment(showDeleteConfirm)}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold shadow-lg"
                  >
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsPage;

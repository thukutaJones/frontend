"use client";

import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiChevronUp,
  FiActivity,
  FiClock,
  FiX,
  FiSave,
  FiSearch,
  FiFilter,
  FiAlertCircle,
  FiCheckCircle,
  FiMapPin,
  FiFileText,
} from "react-icons/fi";

// Types
interface Department {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  departmentId: string;
  department?: string; // populated from departmentId
  description: string;
  isEmergencyService: boolean;
  createdAt: string;
}

// Sample departments data
const departments: Department[] = [
  { id: "1", name: "Cardiology" },
  { id: "2", name: "Emergency" },
  { id: "3", name: "Pediatrics" },
  { id: "4", name: "Radiology" },
  { id: "5", name: "Laboratory" },
  { id: "6", name: "Orthopedics" },
  { id: "7", name: "Neurology" },
  { id: "8", name: "Oncology" },
];

// Sample services data
const initialServices: Service[] = [
  {
    id: "1",
    name: "Cardiac Catheterization",
    departmentId: "1",
    department: "Cardiology",
    description:
      "Minimally invasive procedure to diagnose and treat cardiovascular conditions",
    isEmergencyService: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Emergency Room Treatment",
    departmentId: "2",
    department: "Emergency",
    description: "24/7 emergency medical care for acute conditions and trauma",
    isEmergencyService: true,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Pediatric Consultation",
    departmentId: "3",
    department: "Pediatrics",
    description:
      "Comprehensive medical care and consultation for children and adolescents",
    isEmergencyService: false,
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "X-Ray Imaging",
    departmentId: "4",
    department: "Radiology",
    description:
      "Digital radiography for diagnostic imaging of bones and internal structures",
    isEmergencyService: false,
    createdAt: "2024-01-20",
  },
  {
    id: "5",
    name: "Blood Testing",
    departmentId: "5",
    department: "Laboratory",
    description:
      "Complete blood count, chemistry panels, and specialized laboratory tests",
    isEmergencyService: false,
    createdAt: "2024-01-25",
  },
];

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterEmergency, setFilterEmergency] = useState<string>("all");

  const resetForm = () => {
    setFormData({
      name: "",
      departmentId: "",
      description: "",
      isEmergencyService: false,
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingService(null);
    setShowModal(true);
  };

  const openEditModal = (service: Service) => {
    setFormData(service);
    setEditingService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    resetForm();
  };

  const toggleRowExpansion = (serviceId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedRows(newExpanded);
  };

  const handleDelete = (serviceId: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== serviceId));
    }
  };

  const handleSaveService = () => {
    // Validate required fields
    if (!formData.name || !formData.departmentId || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    // Find department name from departmentId
    const selectedDepartment = departments.find(
      (dept) => dept.id === formData.departmentId
    );

    const serviceData = {
      ...formData,
      id: editingService?.id || Date.now().toString(),
      department: selectedDepartment?.name || "",
      createdAt:
        editingService?.createdAt || new Date().toISOString().split("T")[0],
    } as Service;

    if (editingService) {
      setServices(
        services.map((service) =>
          service.id === editingService.id ? serviceData : service
        )
      );
    } else {
      setServices([...services, serviceData]);
    }

    closeModal();
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.department?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || service.departmentId === filterDepartment;

    const matchesEmergency =
      filterEmergency === "all" ||
      (filterEmergency === "emergency" && service.isEmergencyService) ||
      (filterEmergency === "regular" && !service.isEmergencyService);

    return matchesSearch && matchesDepartment && matchesEmergency;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen p-6 text-gray-600">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Services</h1>
              <p className="text-gray-600 text-xs">
                Manage hospital services and departments
              </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
              {/* Search */}
              <div className="flex items-center w-full sm:flex-1 lg:w-80 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2">
                <FiSearch className="text-gray-500 w-5 h-5 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>

              {/* Department Filter */}
              <div className="flex items-center bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 min-w-[150px]">
                <FiFilter className="text-gray-400 w-5 h-5 mr-2 shrink-0" />
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Emergency Filter */}
              <div className="flex items-center bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 min-w-[130px]">
                <FiAlertCircle className="text-gray-400 w-5 h-5 mr-2 shrink-0" />
                <select
                  value={filterEmergency}
                  onChange={(e) => setFilterEmergency(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                >
                  <option value="all">All Services</option>
                  <option value="emergency">Emergency</option>
                  <option value="regular">Regular</option>
                </select>
              </div>

              {/* Add Button */}
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FiPlus className="w-5 h-5" />
                Add Service
              </button>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-black bg-gray-300">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredServices.map((service) => (
                  <React.Fragment key={service.id}>
                    <tr className="hover:bg-blue-50/50 transition-all duration-200 group">
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div>
                            <div className="text-base font-bold text-gray-900">
                              {service.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-4 py-2 rounded-full text-sm font-bold shadow-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                          {service.department}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                            service.isEmergencyService
                              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          }`}
                        >
                          {service.isEmergencyService ? "Emergency" : "Regular"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                        {formatDate(service.createdAt)}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleRowExpansion(service.id)}
                            className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                            title="View Details"
                          >
                            {expandedRows.has(service.id) ? (
                              <FiChevronUp className="w-5 h-5" />
                            ) : (
                              <FiChevronDown className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={() => openEditModal(service)}
                            className="p-3 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                            title="Edit Service"
                          >
                            <FiEdit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                            title="Delete Service"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Row */}
                    {expandedRows.has(service.id) && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50"
                        >
                          <div className="space-y-6">
                            <h4 className="font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-2">
                              Service Details
                            </h4>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-start gap-3 text-sm">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <FiFileText className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-semibold text-gray-700 block mb-2">
                                      Description
                                    </span>
                                    <p className="text-gray-600 leading-relaxed">
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 text-sm">
                                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FiMapPin className="w-4 h-4 text-green-600" />
                                  </div>
                                  <div>
                                    <span className="font-semibold text-gray-700 block">
                                      Department
                                    </span>
                                    <span className="text-gray-600">
                                      {service.department}
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
                                      Created Date
                                    </span>
                                    <span className="text-gray-600">
                                      {formatDate(service.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 text-sm">
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                      service.isEmergencyService
                                        ? "bg-red-100"
                                        : "bg-green-100"
                                    }`}
                                  >
                                    {service.isEmergencyService ? (
                                      <FiAlertCircle className="w-4 h-4 text-red-600" />
                                    ) : (
                                      <FiCheckCircle className="w-4 h-4 text-green-600" />
                                    )}
                                  </div>
                                  <div>
                                    <span className="font-semibold text-gray-700 block">
                                      Service Type
                                    </span>
                                    <span className="text-gray-600">
                                      {service.isEmergencyService
                                        ? "Emergency Service"
                                        : "Regular Service"}
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

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiActivity className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No services found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-50 rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-8 py-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {editingService ? "Edit Service" : "Add New Service"}
                    </h2>
                    <p className="text-blue-100 text-sm">
                      {editingService
                        ? "Update service information and details"
                        : "Create a new hospital service"}
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

              <div className="p-8 space-y-6 max-h-[calc(90vh-140px)] overflow-auto">
                {/* Service Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                    placeholder="Enter service name"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Department
                  </label>
                  <select
                    value={formData.departmentId || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, departmentId: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-gray-800 font-medium resize-none"
                    rows={4}
                    placeholder="Enter service description"
                  />
                </div>

                {/* Emergency Service Toggle */}
                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.isEmergencyService || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isEmergencyService: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-800">
                      Emergency Service
                    </span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1 ml-8">
                    Check if this is an emergency or urgent care service
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveService}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {editingService ? "Update Service" : "Create Service"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
       
      </div>
    </div>
  );
};

export default ServicesPage;

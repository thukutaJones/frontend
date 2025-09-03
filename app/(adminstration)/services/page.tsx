"use client";
import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiActivity,
  FiX,
  FiSearch,
  FiFilter,
  FiAlertCircle,
} from "react-icons/fi";
import {
  fetchServices,
  createServiceAPI,
  updateServiceAPI,
  deleteServiceAPI,
  getAuthHeader,
} from "./serviceOp"; // your servicesOps file
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import LoadingAnimation from "@/components/LoadingAnimation";
// Types
interface Department {
  _id: string;
  name: string;
}

interface Service {
  _id: string;
  department: string;
  name: string;
  departmentId: any;
  description: string;
  isEmergencyService: boolean;
  createdAt: string;
}

interface User {
  token: string;
}

const ServicesPage = () => {
  const user = useAuth(["admin"]);

  const [services, setServices] = useState<Service[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterEmergency, setFilterEmergency] = useState<string>("all");
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  // Load services and departments on mount

  // Load all services
  const loadServices = async () => {
    if (!user?.token) return;
    try {
      setLoadingServices(true);
      const data = await fetchServices(user.token);
      // console.log(data)
      if (Array.isArray(data)) setServices(data);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoadingServices(false);
    }
  };

  // Load all departments
  const loadDepartments = async () => {
    try {
      setLoadingDepartments(true);
      const res = await axios.get(`${baseUrl}/api/all-departments`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (Array.isArray(res.data)) setDepartments(res.data);
    } catch (err) {
      console.error("Failed to load departments:", err);
    } finally {
      setLoadingDepartments(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      loadServices();
      loadDepartments();
    }
  }, [user]);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      departmentId: "",
      description: "",
      isEmergencyService: false,
    });
  };

  // Modal controls
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

  const toggleRowExpansion = (id: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedRows(newSet);
  };

  // Delete service
  const handleDelete = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await deleteServiceAPI(id, user.token);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete service");
    }
  };

  // Save service (create or update)
  const handleSaveService = async () => {
    if (!user) return;
    if (!formData.name || !formData.departmentId) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      name: formData.name,
      departmentId: formData.departmentId,
      description: formData.description,
      isEmergencyService: formData.isEmergencyService || false,
    };

    try {
      if (editingService) {
        const updated = await updateServiceAPI(
          editingService._id,
          payload,
          user.token
        );
      } else {
        await createServiceAPI(payload, user.token);
      }
      await fetchServices();
      closeModal();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to save service");
    }
  };
  // Filter & search
  // Filtering effect
  useEffect(() => {
    const filtered = services.filter((s: any) => {
      const serviceName = s?.name || "";
      const serviceDesc = s?.description || "";
      const departmentName = s?.departmentId?.name || "";
      const departmentId = s?.departmentId?._id || "";

      const matchesSearch =
        serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serviceDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        departmentName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        filterDepartment === "all" || departmentId === filterDepartment;

      const matchesEmergency =
        filterEmergency === "all" ||
        (filterEmergency === "emergency" && s.isEmergencyService) ||
        (filterEmergency === "regular" && !s.isEmergencyService);

      return matchesSearch && matchesDepartment && matchesEmergency;
    });

    setFilteredServices(filtered);
  }, [services, searchTerm, filterDepartment, filterEmergency]);
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  if (!user || loadingDepartments || loadingServices)
    return <LoadingAnimation />;

  return (
    <div className="min-h-screen p-6 text-gray-600">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Services</h1>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
              {/* Search */}
              <div className="flex items-center w-full sm:flex-1 lg:w-80 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2">
                <FiSearch className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>

              {/* Filter Department */}
              <div className="flex items-center bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 min-w-[150px]">
                <FiFilter className="text-gray-400 w-5 h-5 mr-2" />
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Emergency */}
              <div className="flex items-center bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 min-w-[130px]">
                <FiAlertCircle className="text-gray-400 w-5 h-5 mr-2" />
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

              {/* Add Service */}
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white px-8 py-3 rounded-xl flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all"
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
            {loadingServices ? (
              <div className="text-center py-12">
                <FiActivity className="w-10 h-10 mx-auto text-gray-400 animate-spin" />
                <p>Loading services...</p>
              </div>
            ) : (
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
                  {filteredServices?.map((service: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr className="hover:bg-blue-50/50 transition-all group">
                        <td className="px-6 py-5">{service.name}</td>
                        <td className="px-6 py-5">{service.departmentId?.name}</td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                              service.isEmergencyService
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {service.isEmergencyService
                              ? "Emergency"
                              : "Regular"}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          {formatDate(service.createdAt)}
                        </td>
                        <td className="px-6 py-5 space-x-2">
                          <button
                            onClick={() => openEditModal(service)}
                            className="text-blue-700 hover:text-blue-900"
                          >
                            <FiEdit3 />
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 />
                          </button>
                          <button
                            onClick={() => toggleRowExpansion(service._id)}
                            className="text-gray-500 hover:text-gray-900"
                          >
                            {expandedRows.has(service._id) ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedRows.has(service._id) && (
                        <tr className="bg-gray-50">
                          <td colSpan={5} className="px-6 py-4">
                            {service.description}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  {filteredServices?.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No services found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-bold mb-4">
                {editingService ? "Edit Service" : "Add Service"}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none"
                />
                <select
                  value={formData.departmentId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentId: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isEmergencyService || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isEmergencyService: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <label className="text-gray-700 text-sm font-semibold">
                    Emergency Service
                  </label>
                </div>
                <button
                  onClick={handleSaveService}
                  className="w-full bg-gradient-to-r from-blue-900 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {editingService ? "Update Service" : "Add Service"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;

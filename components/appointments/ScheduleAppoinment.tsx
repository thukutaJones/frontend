import React, { useEffect, useState } from "react";
import {
  FiX,
  FiCalendar,
  FiClock,
  FiUser,
  FiUserCheck,
  FiMapPin,
  FiSave,
  FiAlertCircle,
  FiFileText,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";
import { FaBuilding, FaUserMd, FaStethoscope } from "react-icons/fa";

// Mock data based on your specifications
const mockDoctors = [
  {
    _id: "68b63e75f1a7db883e78a648",
    name: "Dr. Jones Thukuta",
    username: "moth_joe",
    email: "moth@test.com",
    phone: "0888941871",
    linkedStaffId: {
      _id: "68b63e75f1a7db883e78a646",
      specialties: ["Cardiology", "Internal Medicine"],
      workingHours: [],
      isAvailable: true,
      departmentId: "68b6303dead27f943db16382"
    },
    role: "doctor",
    status: "active",
    gender: "male"
  },
  {
    _id: "68b63e75f1a7db883e78a649",
    name: "Dr. Sarah Wilson",
    username: "sarah_wilson",
    email: "sarah@test.com",
    phone: "0888941872",
    linkedStaffId: {
      _id: "68b63e75f1a7db883e78a647",
      specialties: ["Dental Surgery", "Orthodontics"],
      workingHours: [],
      isAvailable: false,
      departmentId: "68b6303dead27f943db16383"
    },
    role: "doctor",
    status: "active",
    gender: "female"
  }
];

const mockServices = [
  {
    _id: "68b645f285ec70b6fb783b24",
    name: "Dental surgery",
    isEmergencyService: false,
    departmentId: "68b6303dead27f943db16382"
  },
  {
    _id: "68b645f285ec70b6fb783b25",
    name: "General Consultation",
    isEmergencyService: false,
    departmentId: "68b6303dead27f943db16383"
  },
  {
    _id: "68b645f285ec70b6fb783b26",
    name: "Emergency Care",
    isEmergencyService: true,
    departmentId: "68b6303dead27f943db16382"
  }
];

const mockDepartments = [
  {
    _id: "68b6303dead27f943db16382",
    name: "Cardiology Department",
    description: "Handles heart and cardiovascular care",
    location: "Building A",
    isEmergencyService: true
  },
  {
    _id: "68b6303dead27f943db16383",
    name: "Dental Department",
    description: "Handles dental care and oral health",
    location: "Building B",
    isEmergencyService: false
  }
];

interface AppointmentSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; id: string; email: string; token: string };
  callBack: any;
}

interface FormData {
  patientId: string;
  serviceId: string;
  staffId: string;
  departmentId: string;
  date: string;
  time: string;
  status: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  isOpen,
  onClose,
  user,
  callBack
}) => {
  const [formData, setFormData] = useState<FormData>({
    patientId: "",
    serviceId: "",
    staffId: "",
    departmentId: "",
    date: "",
    time: "",
    status: "scheduled",
    notes: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [filteredStaff, setFilteredStaff] = useState(mockDoctors);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);


  // Filter services and staff based on department selection
  useEffect(() => {
    if (formData.departmentId) {
      const filtered = mockServices.filter(
        service => service.departmentId === formData.departmentId
      );
      setFilteredServices(filtered);

      const filteredDocs = mockDoctors.filter(
        doctor => doctor.linkedStaffId.departmentId === formData.departmentId
      );
      setFilteredStaff(filteredDocs);

      const dept = mockDepartments.find(d => d._id === formData.departmentId);
      setSelectedDepartment(dept);
    } else {
      setFilteredServices(mockServices);
      setFilteredStaff(mockDoctors);
      setSelectedDepartment(null);
    }
  }, [formData.departmentId]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.patientId) newErrors.patientId = "Patient is required";
    if (!formData.serviceId) newErrors.serviceId = "Service is required";
    if (!formData.staffId) newErrors.staffId = "Staff member is required";
    if (!formData.departmentId) newErrors.departmentId = "Department is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";

    // Check if selected date is in the future
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    // Reset dependent fields when department changes
    if (field === "departmentId") {
      setFormData(prev => ({
        ...prev,
        serviceId: "",
        staffId: ""
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Combine date and time for the appointment
      const appointmentDateTime = `${formData.date}T${formData.time}:00`;

      const appointmentData = {
        patientId: formData.patientId,
        serviceId: formData.serviceId,
        staffId: formData.staffId,
        departmentId: formData.departmentId,
        time: appointmentDateTime,
        status: formData.status,
        notes: formData.notes || undefined
      };

      console.log("Appointment Data to be sent:", appointmentData);

      // Call the onSubmit prop or make API call here
      if (onSubmit) {
        await onSubmit(appointmentData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Appointment scheduled successfully!");
      }

      // Reset form and close modal
      setFormData({
        patientId: "",
        serviceId: "",
        staffId: "",
        departmentId: "",
        date: "",
        time: "",
        status: "scheduled",
        notes: ""
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Error scheduling appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      patientId: "",
      serviceId: "",
      staffId: "",
      departmentId: "",
      date: "",
      time: "",
      status: "scheduled",
      notes: ""
    });
    setErrors({});
    onClose();
  };

  const getSelectedStaff = () => {
    return filteredStaff.find(staff => staff._id === formData.staffId);
  };

  const getSelectedService = () => {
    return filteredServices.find(service => service._id === formData.serviceId);
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
      <div className="relative w-full max-w-5xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
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
                <FiCalendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Schedule Appointment</h2>
                <p className="text-blue-100 text-sm">
                  Book a new patient appointment
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
        <div className="p-8 max-h-[calc(95vh-120px)] overflow-y-auto">
          <div className="space-y-8">
            {/* Patient & Department Selection */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center space-x-2">
                <FiUser className="w-5 h-5 text-blue-600" />
                <span>Patient & Department</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Selection */}
                

                {/* Department Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Department
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaBuilding className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      value={formData.departmentId}
                      onChange={(e) => handleInputChange("departmentId", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 appearance-none ${
                        errors.departmentId
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                    >
                      <option value="">Select department</option>
                      {mockDepartments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name} - {dept.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.departmentId && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.departmentId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Department Info Display */}
              {selectedDepartment && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FaBuilding className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900">{selectedDepartment.name}</h4>
                      <p className="text-sm text-blue-700 mt-1">{selectedDepartment.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center text-sm text-blue-600">
                          <FiMapPin className="w-4 h-4 mr-1" />
                          {selectedDepartment.location}
                        </span>
                        {selectedDepartment.isEmergencyService && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                            Emergency Service Available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service & Staff Selection */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center space-x-2">
                <FaStethoscope className="w-5 h-5 text-emerald-600" />
                <span>Appointment details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Service Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiActivity className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => handleInputChange("serviceId", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 appearance-none ${
                        errors.serviceId
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      disabled={!formData.departmentId}
                    >
                      <option value="">
                        {formData.departmentId ? "Choose service" : "Select department first"}
                      </option>
                      {filteredServices.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                          {service.isEmergencyService && " (Emergency)"}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.serviceId && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.serviceId}</span>
                    </div>
                  )}
                </div>

                {/* Staff Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Doctor
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUserMd className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      value={formData.staffId}
                      onChange={(e) => handleInputChange("staffId", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 appearance-none ${
                        errors.staffId
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      disabled={!formData.departmentId}
                    >
                      <option value="">
                        {formData.departmentId ? "Choose doctor" : "Select department first"}
                      </option>
                      {filteredStaff.map((staff) => (
                        <option key={staff._id} value={staff._id}>
                          {staff.name}
                          {!staff.linkedStaffId.isAvailable && " (Unavailable)"}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.staffId && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.staffId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Staff Info */}
              {getSelectedStaff() && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FaUserMd className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-blue-900">{getSelectedStaff()?.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          getSelectedStaff()?.linkedStaffId.isAvailable 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {getSelectedStaff()?.linkedStaffId.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">
                        Specialties: {getSelectedStaff()?.linkedStaffId.specialties.join(", ")}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Email: {getSelectedStaff()?.email} | Phone: {getSelectedStaff()?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Date & Time Selection */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center space-x-2">
                <FiClock className="w-5 h-5 text-blue-600" />
                <span>Date & Time</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Appointment Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiCalendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.date
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.date}</span>
                    </div>
                  )}
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiClock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.time
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.time && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>{errors.time}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center space-x-2">
                <FiFileText className="w-5 h-5 text-emerald-600" />
                <span>Additional Information</span>
              </h3>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Notes (Optional)
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <FiFileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-emerald-500 hover:border-gray-300 rounded-xl focus:outline-none transition-all duration-200 resize-none"
                    placeholder="Add any special instructions or notes for this appointment..."
                  />
                </div>
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
                className="px-8 py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Scheduling...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    <span>Schedule Appointment</span>
                  </>
                )}
              </button>
            </div>

            {/* Summary Card */}
            {(formData.patientId && formData.serviceId && formData.staffId && formData.date && formData.time) && (
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-2xl p-6 mt-6">
                <h4 className="text-lg font-bold text-emerald-900 mb-4 flex items-center space-x-2">
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Appointment Summary</span>
                </h4>

                {formData.notes && (
                  <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <FiFileText className="w-4 h-4" />
                      <span>Notes</span>
                    </div>
                    <p className="text-gray-900">{formData.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const AppointmentSchedulerDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const mockUser = {
    name: "Admin User",
    id: "admin123",
    email: "admin@hospital.com",
    token: "mock-token-123"
  };

  const handleAppointmentSubmit = async (appointmentData: any) => {
    console.log("Appointment data to send to API:", appointmentData);
    // Here you would make your actual API call
    // Example:
    // await axios.post(`${baseUrl}/api/appointments`, appointmentData, {
    //   headers: { Authorization: `Bearer ${mockUser.token}` }
    // });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Appointment Management System
          </h1>
          <p className="text-gray-600 mb-8">
            Click the button below to open the appointment scheduler modal.
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-2"
          >
            <FiCalendar className="w-5 h-5" />
            <span>Schedule New Appointment</span>
          </button>

          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Data Format:</h3>
            <pre className="text-xs text-gray-600 overflow-x-auto">
{`{
  patientId: "patient1",
  serviceId: "68b645f285ec70b6fb783b24", 
  staffId: "68b63e75f1a7db883e78a648",
  departmentId: "68b6303dead27f943db16382",
  time: "2025-09-03T10:30:00",
  status: "scheduled",
  notes: "Optional notes here"
}`}
            </pre>
          </div>
        </div>

        <AppointmentScheduler
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={mockUser}
          onSubmit={handleAppointmentSubmit}
        />
      </div>
    </div>
  );
};

export default AppointmentSchedulerDemo;
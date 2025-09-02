import React, { useEffect, useState } from "react";
import {
  FiX,
  FiCalendar,
  FiClock,
  FiSave,
  FiAlertCircle,
  FiFileText,
  FiActivity,
} from "react-icons/fi";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { RiCloseLine } from "react-icons/ri";

interface AppointmentSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; id: string; email: string; token: string };
  callBack: any;
}

interface FormData {
  patientId: string;
  serviceId: string;
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
  callBack,
}) => {
  const [formData, setFormData] = useState<FormData>({
    patientId: "",
    serviceId: "",
    date: "",
    time: "",
    status: "scheduled",
    notes: "",
  });

  const [services, setServices] = useState<any[]>([]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>("");

  const fetchData = async () => {
    try {
      const resServices = await axios.get(`${baseUrl}/api/all-services`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setServices(resServices?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({ ...prev, patientId: user.id }));
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.patientId) newErrors.patientId = "Patient is required";
    if (!formData.serviceId) newErrors.serviceId = "Service is required";
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
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      // Combine date and time for the appointment
      const appointmentDateTime = `${formData.date}T${formData.time}:00`;

      const appointmentData = {
        patientId: user?.id,
        serviceId: formData.serviceId,
        time: appointmentDateTime,
        status: formData.status,
        notes: formData.notes || undefined,
      };

      console.log("Appointment Data to be sent:", appointmentData);
      await axios.post(`${baseUrl}/api/create-appointment`, appointmentData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      await callBack();

      // Reset form and close modal
      setFormData({
        patientId: "",
        serviceId: "",
        date: "",
        time: "",
        status: "scheduled",
        notes: "",
      });
      setErrors({});
      onClose();
    } catch (error: any) {
      console.log("Error scheduling appointment:", error);
      setFormError(
        error?.response?.data?.error || "Error scheduling appointment"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      patientId: "",
      serviceId: "",
      date: "",
      time: "",
      status: "scheduled",
      notes: "",
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
                <h2 className="text-2xl font-bold text-white">
                  Schedule Appointment
                </h2>
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

        {formError && (
          <div className="px-8 mt-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="flex items-center space-x-3">
                <RiCloseLine
                  className="w-5 h-5 text-red-500 flex-shrink-0"
                  onClick={() => setFormError("")}
                />
                <p className="text-red-700 text-sm font-medium">{formError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-8 max-h-[calc(95vh-120px)] overflow-y-auto">
          <div className="space-y-4">
            {/* Service & Staff Selection */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Service
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiActivity className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      value={formData.serviceId}
                      onChange={(e) =>
                        handleInputChange("serviceId", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 appearance-none ${
                        errors.serviceId
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                    >
                      <option value="">Choose service</option>
                      {services.map((service, index) => (
                        <option key={index?.toString()} value={service._id}>
                          {service.name}
                          {service.isEmergencyService && "(Emergency)"}
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
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="space-y-6">
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
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
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
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
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
                className="px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;

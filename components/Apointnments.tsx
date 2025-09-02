import { getStatusColor, getStatusIcon } from "@/utils/statusIndicators";
import React from "react";
import {
  RiCalendarLine,
  RiEditLine,
  RiDeleteBinLine,
  RiTimeLine,
  RiUserLine,
  RiStethoscopeLine,
  RiHospitalLine,
  RiEyeLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";
import { FiClock } from "react-icons/fi";




interface AppointmentsProps {
  filteredAppointments: any[];
  role: string;
  openEditModal: (appointment: any) => void;
  handleDelete: (id: string) => void;
  handleStatusUpdate?: (id: string, status: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({
  filteredAppointments,
  role,
  openEditModal,
  handleDelete,
  handleStatusUpdate,
}) => {
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const canEditStatus = (role: string) => {
    return ['doctor', 'nurse', 'admin', 'hod'].includes(role);
  };

  const getStatusActions = (appointment: any) => {
    if (!canEditStatus(role) || !handleStatusUpdate) return null;

    const currentStatus = appointment.status;
    const appointmentId = appointment._id;

    const statusButtons = [];

    if (currentStatus === 'pending') {
      statusButtons.push(
        <button
          key="approve"
          onClick={() => handleStatusUpdate(appointmentId, 'approved')}
          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          title="Approve Appointment"
        >
          <RiCheckLine className="w-4 h-4" />
        </button>,
        <button
          key="cancel"
          onClick={() => handleStatusUpdate(appointmentId, 'cancelled')}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          title="Cancel Appointment"
        >
          <RiCloseLine className="w-4 h-4" />
        </button>
      );
    }

    if (currentStatus === 'approved') {
      statusButtons.push(
        <button
          key="complete"
          onClick={() => handleStatusUpdate(appointmentId, 'completed')}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          title="Mark as Completed"
        >
          <RiCheckLine className="w-4 h-4" />
        </button>,
        <button
          key="no-show"
          onClick={() => handleStatusUpdate(appointmentId, 'no-show')}
          className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
          title="Mark as No-show"
        >
          <FiClock className="w-4 h-4" />
        </button>
      );
    }

    return statusButtons;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredAppointments?.map((appointment: any, index: number) => (
        <div
          key={appointment._id || index}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Card Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(
                  appointment.status
                )}`}
              >
                {getStatusIcon(appointment.status)}
                <span className="capitalize">{appointment.status}</span>
              </div>

              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Patient Actions */}
                {role === "patient" && (
                  <>
                    <button
                      onClick={() => openEditModal(appointment)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                      title="Edit Notes"
                    >
                      <RiEditLine className="w-4 h-4" />
                    </button>
                    {appointment.status === 'pending' && (
                      <button
                        onClick={() => handleDelete(appointment._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                        title="Cancel Appointment"
                      >
                        <RiDeleteBinLine className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}

                {/* Staff Actions */}
                {(role === "nurse" || role === "doctor" || role === "ambulance_driver" || role === "admin" || role === "hod") && (
                  <>
                    {getStatusActions(appointment)}
                    <button
                      className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all duration-200"
                      title="View Details"
                    >
                      <RiEyeLine className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {appointment.serviceId?.name || "Unknown Service"}
            </h3>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <RiCalendarLine className="w-4 h-4" />
                <span>{formatDate(appointment.time)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <RiTimeLine className="w-4 h-4" />
                <span>{formatTime(appointment.time)}</span>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-4">
            {/* Patient View - Show Staff Details */}
            {role === "patient" && (
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <RiStethoscopeLine className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">
                      {appointment.staffId?.name || "Staff Not Assigned"}
                    </p>
                    <p className="text-sm text-blue-700 capitalize">
                      Healthcare Provider
                    </p>
                    {appointment.staffId?.specialties && appointment.staffId.specialties.length > 0 && (
                      <p className="text-xs text-blue-600">
                        {appointment.staffId.specialties.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Staff View - Show Patient Details */}
            {(role === "nurse" || role === "doctor" || role === "ambulance_driver" || role === "admin" || role === "hod") && (
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <RiUserLine className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">
                      {appointment.patientId?.name || "Unknown Patient"}
                    </p>
                    {appointment.patientId?.phone && (
                      <p className="text-sm text-green-700">
                        {appointment.patientId.phone}
                      </p>
                    )}
                    {appointment.patientId?.email && (
                      <p className="text-xs text-green-600">
                        {appointment.patientId.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Department Information */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="p-2 bg-gray-100 rounded-xl">
                <RiHospitalLine className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {appointment.departmentId?.name || "Unknown Department"}
                </p>
                {appointment.departmentId?.location && (
                  <p className="text-xs text-gray-600">
                    {appointment.departmentId.location}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div className="p-3 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-800">
                  <strong>Notes:</strong> {appointment.notes}
                </p>
              </div>
            )}

            {/* Emergency Service Indicator */}
            {appointment.serviceId?.isEmergencyService && (
              <div className="p-2 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-700 font-medium text-center">
                  🚨 Emergency Service
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
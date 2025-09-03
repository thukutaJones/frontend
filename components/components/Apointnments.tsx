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
} from "react-icons/ri";

const Appointnments = ({
  filteredAppointments,
  role,
  openEditModal,
  handleDelete,
}: {
  filteredAppointments: any;
  role: string;
  openEditModal: any;
  handleDelete: any;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredAppointments?.map((appointment: any, index: number) => (
        <div
          key={index?.toString()}
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

              {role === "patient" && (
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => openEditModal(appointment)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    title="Edit Notes"
                  >
                    <RiEditLine className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                    title="Delete Appointment"
                  >
                    <RiDeleteBinLine className="w-4 h-4" />
                  </button>
                </div>
              )}

              {(role === "nurse" ||
                role === "doctor" ||
                role === "ambulance_driver") && (
                <button
                  className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  title="View Details"
                >
                  <RiEyeLine className="w-4 h-4" />
                </button>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {appointment.service}
            </h3>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <RiCalendarLine className="w-4 h-4" />
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <RiTimeLine className="w-4 h-4" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-4">
            {role === "patient" && (
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <RiStethoscopeLine className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">
                      {appointment.staffIdDetails.full_name}
                    </p>
                    <p className="text-sm text-blue-700 capitalize">
                      {appointment.staffIdDetails.roleWithin}
                    </p>
                    {appointment.staffIdDetails.specialties.length > 0 && (
                      <p className="text-xs text-blue-600">
                        {appointment.staffIdDetails.specialties.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {(role === "nurse" ||
              role === "doctor" ||
              role === "ambulance_driver") && (
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <RiUserLine className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">
                      {appointment.patientDetails.full_name}
                    </p>
                    <p className="text-sm text-green-700">
                      {appointment.patientDetails.phone_number}
                    </p>
                    <p className="text-xs text-green-600">
                      Age:{" "}
                      {new Date().getFullYear() -
                        new Date(appointment.patientDetails.dob).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="p-2 bg-gray-100 rounded-xl">
                <RiHospitalLine className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {appointment.department.name}
                </p>
              </div>
            </div>

            {appointment.notes && (
              <div className="p-3 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-800">
                  <strong>Notes:</strong> {appointment.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointnments;

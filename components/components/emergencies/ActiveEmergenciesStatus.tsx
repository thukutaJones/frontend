import { formatDate, formatTime } from "@/utils/formatDatenTime";
import { getStatusColor } from "@/utils/statusIndicators";
import React from "react";
import {
  RiMapPinLine,
  RiTimeLine,
  RiStethoscopeLine,
  RiCalendarLine,
} from "react-icons/ri";

interface Emergency {
  _id: string;
  status: "pending" | "assigned" | "onHold" | "completed";
  locationLat: number;
  locationLang: number;
  estimatedArrival?: string;
  createdAt?: string;
  assignedTo?: {
    name: string;
    specialty?: string;
    phone?: string;
  } | null;
}

const ActiveEmergenciesStatus = ({ activeEmergency }: { activeEmergency: Emergency }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-in slide-in-from-bottom-8 fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Emergency Status</h2>
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
            activeEmergency?.status
          )}`}
        >
          <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
          {activeEmergency?.status}
        </div>
      </div>

      <div className="space-y-6">
        {/* Status Info */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeEmergency?.estimatedArrival && (
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <RiTimeLine className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Arrival</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {activeEmergency?.estimatedArrival}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <RiMapPinLine className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location Shared</p>
                <p className="text-lg font-semibold text-gray-900">Confirmed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Staff Info */}
        {activeEmergency?.assignedTo && activeEmergency?.status === "assigned" && (
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <RiStethoscopeLine className="w-5 h-5 text-blue-600 mr-2" />
              Assigned Medical Staff
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {activeEmergency?.assignedTo?.name
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("")}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">
                  {activeEmergency?.assignedTo?.name}
                </p>
                {activeEmergency?.assignedTo?.specialty && (
                  <p className="text-sm text-gray-600">
                    {activeEmergency?.assignedTo?.specialty}
                  </p>
                )}
                {activeEmergency?.assignedTo?.phone && (
                  <p className="text-sm text-blue-600 font-medium">
                    {activeEmergency?.assignedTo?.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Emergency Details */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="space-y-3">
            {activeEmergency?.createdAt && (
              <div className="flex items-center text-sm text-gray-600">
                <RiCalendarLine className="w-4 h-4 mr-3" />
                {formatDate(activeEmergency?.createdAt)} at{" "}
                {formatTime(activeEmergency?.createdAt)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveEmergenciesStatus;

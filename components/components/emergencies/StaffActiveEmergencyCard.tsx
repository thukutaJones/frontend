import { formatDate, formatTime } from "@/utils/formatDatenTime";
import { getStatusColor } from "@/utils/statusIndicators";
import React from "react";
import {
  RiMapPinLine,
  RiTimeLine,
  RiUserLine,
  RiMailLine,
  RiCheckLine,
  RiNavigationLine,
} from "react-icons/ri";
import FastBouncingDots from "../BouncingAnimation";

const StaffActiveEmergencyCard = ({
  staffEmergency,
  showConfirmComplete,
  setShowConfirmComplete,
  handleCompleteEmergency,
  isCompleting,
}: {
  staffEmergency: any;
  showConfirmComplete: string | null;
  setShowConfirmComplete: (id: string | null) => void;
  handleCompleteEmergency: (id: string) => void;
  isCompleting: boolean;
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-8 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
            <RiUserLine className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {staffEmergency?.sender?.name || "Unknown Patient"}
            </h3>
            <p className="text-sm text-gray-600">
              {staffEmergency?.createdAt &&
                formatTime(staffEmergency?.createdAt)}
            </p>
          </div>
        </div>

        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
            staffEmergency?.status
          )}`}
        >
          <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
          {staffEmergency?.status?.charAt(0)?.toUpperCase() +
            staffEmergency?.status?.slice(1)}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Patient Details */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <RiUserLine className="w-4 h-4 mr-2" />
            Patient Info
          </h4>
          <div className="space-y-2 text-sm">
            {staffEmergency?.sender?.email && (
              <div className="flex items-center text-gray-600">
                <RiMailLine className="w-4 h-4 mr-2" />
                {staffEmergency?.sender?.email}
              </div>
            )}
            {staffEmergency?.description && (
              <p className="text-gray-700 mt-2">
                {staffEmergency?.description}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <RiMapPinLine className="w-4 h-4 mr-2" />
            Location
          </h4>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${staffEmergency?.locationLat},${staffEmergency?.locationLang}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl text-sm font-medium transition-colors duration-200"
          >
            <RiNavigationLine className="w-4 h-4 mr-2" />
            View on Maps
          </a>
          <p className="text-xs text-gray-500 mt-2">
            Lat: {staffEmergency?.locationLat}, Lng:{" "}
            {staffEmergency?.locationLang}
          </p>
        </div>

        {/* Timing */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <RiTimeLine className="w-4 h-4 mr-2" />
            Timeline
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            {staffEmergency?.createdAt && (
              <>
                <p>Submitted: {formatTime(staffEmergency?.createdAt)}</p>
                <p>Date: {formatDate(staffEmergency?.createdAt)}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        {showConfirmComplete === staffEmergency?._id ? (
          <div className="flex items-center space-x-3">
            <p className="text-sm text-gray-600">Mark as completed?</p>
            <button
              onClick={() => setShowConfirmComplete(null)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleCompleteEmergency(staffEmergency?._id)}
              disabled={isCompleting}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors duration-200 flex items-center"
            >
              {isCompleting ? (
                <FastBouncingDots />
              ) : (
                <>
                  <RiCheckLine className="w-4 h-4 mr-2" />
                  Confirm
                </>
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmComplete(staffEmergency?._id)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg"
          >
            <RiCheckLine className="w-5 h-5 mr-2" />
            Mark Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default StaffActiveEmergencyCard;

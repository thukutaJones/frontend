import React from "react";
import {
  RiCalendarLine,
  RiAddLine,
  RiStethoscopeLine,
  RiSearchLine,
  RiCloseLine,
  RiSaveLine,
} from "react-icons/ri";

const EmptyState = ({
  searchTerm,
  filterStatus,
  role,
  openModal,
}: {
  searchTerm: any;
  filterStatus: any;
  role: string;
  openModal: any;
}) => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <RiCalendarLine className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Appointments Found
      </h3>
      <p className="text-gray-600 mb-6">
        {searchTerm || filterStatus !== "all"
          ? "No appointments match your current filters."
          : role === "patient"
          ? "You don't have any appointments yet. Book your first appointment!"
          : "No appointments are currently scheduled."}
      </p>
      {role === "patient" && (
        <button
          onClick={openModal}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <RiAddLine className="w-5 h-5" />
          <span>Book Appointment</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;

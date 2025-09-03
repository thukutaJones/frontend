import React from "react";
import {
  RiStethoscopeLine,
  RiSearchLine,
  RiCloseLine,
  RiSaveLine,
} from "react-icons/ri";

const ScheduleAppoinment = ({
  isEditing,
  closeModal,
  formData,
  handleSubmit,
  setFormData,
  selectedStaff,
  setSelectedStaff,
  staffSearchTerm,
  setStaffSearchTerm,
  filteredStaff,
  handleStaffSelect,
  services,
}: {
  isEditing: boolean;
  closeModal: any;
  formData: any;
  handleSubmit: any;
  setFormData: any;
  selectedStaff: any;
  setSelectedStaff: any;
  staffSearchTerm: any;
  setStaffSearchTerm: any;
  filteredStaff: any;
  handleStaffSelect: any;
  services: any[];
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full h-[95vh]">
        <form onSubmit={handleSubmit} className="h-[95vh] py-8 overflow-hidden">
          <div className="flex items-center justify-between h-[60px] px-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Appointment Notes" : "Book New Appointment"}
            </h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <RiCloseLine className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="h-[calc(95vh-190px)] px-8 overflow-auto scroll-container">
            {!isEditing && (
              <>
                {/* Service */}
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service
                  </label>
                  <select
                    required
                    value={formData?.service}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        service: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((service: any, index: number) => (
                      <option key={index?.toString()} value={service?.name}>
                        {service?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Staff Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Healthcare Provider
                  </label>

                  {selectedStaff ? (
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-blue-900">
                            {selectedStaff.full_name}
                          </p>
                          <p className="text-sm text-blue-700 capitalize">
                            {selectedStaff.roleWithin}
                          </p>
                          <p className="text-sm text-blue-600">
                            {selectedStaff.department.name}
                          </p>
                          {selectedStaff.specialties.length > 0 && (
                            <p className="text-xs text-blue-600 mt-1">
                              Specialties:{" "}
                              {selectedStaff.specialties.join(", ")}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedStaff(null)}
                          className="p-2 hover:bg-blue-100 rounded-xl transition-colors duration-200"
                        >
                          <RiCloseLine className="w-5 h-5 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="relative">
                        <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search healthcare providers..."
                          value={staffSearchTerm}
                          onChange={(e: any) =>
                            setStaffSearchTerm(e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div className="max-h-60 overflow-y-auto space-y-2 bg-gray-50 rounded-xl p-2">
                        {filteredStaff?.map((staff: any) => (
                          <button
                            key={staff.id}
                            type="button"
                            onClick={() => handleStaffSelect(staff)}
                            className="w-full p-4 text-left bg-white hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 group-hover:bg-blue-100 rounded-xl transition-colors duration-200">
                                <RiStethoscopeLine className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 group-hover:text-blue-900">
                                  {staff.full_name}
                                </p>
                                <p className="text-sm text-gray-600 capitalize">
                                  {staff.roleWithin} • {staff.department.name}
                                </p>
                                {staff.specialties.length > 0 && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {staff.specialties.join(", ")}
                                  </p>
                                )}
                                <div className="flex items-center mt-2">
                                  <div
                                    className={`w-2 h-2 rounded-full mr-2 ${
                                      staff.isAvailable
                                        ? "bg-green-400"
                                        : "bg-red-400"
                                    }`}
                                  ></div>
                                  <span className="text-xs text-gray-500">
                                    {staff.isAvailable
                                      ? "Available"
                                      : "Not Available"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e: any) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e: any) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Department (Read-only, auto-populated) */}
            {selectedStaff && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700">
                  {selectedStaff.department.name}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes{" "}
                {isEditing && (
                  <span className="text-gray-500 text-xs">
                    (Only notes can be edited)
                  </span>
                )}
              </label>
              <textarea
                value={formData.notes}
                onChange={(e: any) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Additional notes or special requirements..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center h-[100px] px-8 justify-end space-x-4 border-t border-gray-100">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !isEditing &&
                (!selectedStaff ||
                  !formData.service ||
                  !formData.date ||
                  !formData.time)
              }
              className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <RiSaveLine className="w-5 h-5" />
              <span>{isEditing ? "Update Notes" : "Book Appointment"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppoinment;

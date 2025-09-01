"use client";

import Appointnments from "@/components/Apointnments";
import EmptyState from "@/components/appointments/EmptyState";
import Header from "@/components/appointments/Header";
import ScheduleAppoinment from "@/components/appointments/ScheduleAppoinment";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useAuth } from "@/hooks/useAuth";
import React, { useState, useEffect } from "react";

// Mock data
const mockDepartments: any[] = [
  { id: "1", name: "Out Patient Department" },
  { id: "2", name: "In Patient Department" },
  { id: "3", name: "Emergency Department" },
  { id: "4", name: "Antenatal" },
  { id: "5", name: "Theatre" },
  { id: "6", name: "Optometry" },
];

const mockStaff: any[] = [
  {
    id: "1",
    createdAt: "2025-08-28T09:38:26.552Z",
    updatedAt: "2025-08-28T09:38:26.552Z",
    is_deleted: false,
    full_name: "Dr. John Smith",
    roleWithin: "doctor",
    specialties: ["Cardiology", "Internal Medicine"],
    departmentId: "1",
    department: { id: "1", name: "Out Patient Department" },
    workingHours: [{ monday: "08:00-17:00", tuesday: "08:00-17:00" }],
    isAvailable: true,
  },
  {
    id: "2",
    createdAt: "2025-08-28T09:38:26.552Z",
    updatedAt: "2025-08-28T09:38:26.552Z",
    is_deleted: false,
    full_name: "Dr. Sarah Johnson",
    roleWithin: "doctor",
    specialties: ["Surgery", "General Practice"],
    departmentId: "5",
    department: { id: "5", name: "Theatre" },
    workingHours: [{ monday: "06:00-14:00", tuesday: "06:00-14:00" }],
    isAvailable: true,
  },
  {
    id: "3",
    createdAt: "2025-08-28T09:38:26.552Z",
    updatedAt: "2025-08-28T09:38:26.552Z",
    is_deleted: false,
    full_name: "Nurse Mary Wilson",
    roleWithin: "nurse",
    specialties: ["Emergency Care"],
    departmentId: "3",
    department: { id: "3", name: "Emergency Department" },
    workingHours: [{ monday: "07:00-19:00", tuesday: "07:00-19:00" }],
    isAvailable: true,
  },
];

const mockPatient: any = {
  id: "1",
  createdAt: "2025-08-28T09:38:26.552Z",
  updatedAt: "2025-08-28T09:38:26.552Z",
  is_deleted: false,
  email: "patient@example.com",
  full_name: "Jane Doe",
  gender: "female",
  dob: "1990-05-15",
  phone_number: "+265991234567",
  preferred_lang: "en",
  accessibility: "Wheelchair access required",
  address: "123 Main St, Blantyre",
  nationId: "12345678",
  conditions: ["Hypertension", "Diabetes"],
  emergencyContact: {
    name: "John Doe",
    relationship: "Husband",
    phone: "+265997654321",
  },
  medicalRecords: ["Record1", "Record2"],
};

const mockAppointments: any[] = [
  {
    id: "1",
    patientDetails: mockPatient,
    service: "Cardiology Consultation",
    staffIdDetails: mockStaff[0],
    department: mockDepartments[0],
    time: "10:00",
    date: "2025-08-29",
    status: "scheduled",
    notes: "Follow-up appointment for blood pressure monitoring",
  },
  {
    id: "2",
    patientDetails: mockPatient,
    service: "Pre-operative Assessment",
    staffIdDetails: mockStaff[1],
    department: mockDepartments[4],
    time: "14:30",
    date: "2025-08-30",
    status: "in-progress",
    notes: "Prepare for surgery next week",
  },
];

const mockServices = [
  { id: "1", name: "Theatre" },
  { id: "2", name: "General Consultation" },
  { id: "3", name: "Surgery" },
];

export default function AppointmentsPage() {
  // Role configuration - change this to "patient" or "staff members"
  const user = useAuth(["patient", "doctor", "ambulance_driver", "nurse"]); // This determines the view and functionality

  const [appointments, setAppointments] = useState<any[]>(mockAppointments);
  const [services, setServices] = useState<any[]>(mockServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [role, setRole] = useState<string>("role");

  // Form state
  const [formData, setFormData] = useState({
    service: "",
    staffId: "",
    time: "",
    date: "",
    notes: "",
  });

  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [filteredStaff, setFilteredStaff] = useState<any[]>(mockStaff);
  const [staffSearchTerm, setStaffSearchTerm] = useState("");

  // Filter appointments based on search and filters
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientDetails.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.staffIdDetails.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || appointment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Filter staff based on search
  useEffect(() => {
    const filtered = mockStaff.filter(
      (staff) =>
        staff.full_name.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
        staff.roleWithin
          ?.toLowerCase()
          ?.includes(staffSearchTerm.toLowerCase()) ||
        staff?.specialties?.some((specialty: any) =>
          specialty?.toLowerCase()?.includes(staffSearchTerm?.toLowerCase())
        )
    );
    setFilteredStaff(filtered);
  }, [staffSearchTerm]);

  const handleStaffSelect = (staff: any) => {
    setSelectedStaff(staff);
    setFormData((prev) => ({
      ...prev,
      staffId: staff.id,
    }));
    setStaffSearchTerm("");
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setFormData({
      service: "",
      staffId: "",
      time: "",
      date: "",
      notes: "",
    });
    setSelectedStaff(null);
  };

  const openEditModal = (appointment: any) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingId(appointment.id);
    setFormData({
      service: appointment.service,
      staffId: appointment.staffIdDetails.id,
      time: appointment.time,
      date: appointment.date,
      notes: appointment.notes,
    });
    setSelectedStaff(appointment.staffIdDetails);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setSelectedStaff(null);
    setStaffSearchTerm("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStaff) return;

    if (isEditing && editingId) {
      // Update existing appointment (only notes can be edited)
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === editingId
            ? { ...appointment, notes: formData.notes }
            : appointment
        )
      );
    } else {
      // Create new appointment
      const newAppointment: any = {
        id: Date.now().toString(),
        patientDetails: mockPatient,
        service: formData.service,
        staffIdDetails: selectedStaff,
        department: selectedStaff.department,
        time: formData.time,
        date: formData.date,
        status: "scheduled",
        notes: formData.notes,
      };

      setAppointments((prev) => [...prev, newAppointment]);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== id)
      );
    }
  };

  useEffect(() => {
    const setCurrentUserRole = () => {
      if (!user) return;
      setRole(user?.role);
    };
    setCurrentUserRole();
  }, [user]);

  if (!user) return <LoadingAnimation />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <Header
          role={role}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          openModal={openModal}
        />
        <Appointnments
          filteredAppointments={filteredAppointments}
          role={role}
          openEditModal={openEditModal}
          handleDelete={handleDelete}
        />

        {filteredAppointments.length === 0 && (
          <EmptyState
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            role={role}
            openModal={openModal}
          />
        )}
      </div>
      {isModalOpen && (
        <ScheduleAppoinment
          isEditing={isEditing}
          closeModal={closeModal}
          formData={formData}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
          staffSearchTerm={staffSearchTerm}
          setStaffSearchTerm={setStaffSearchTerm}
          filteredStaff={filteredStaff}
          handleStaffSelect={handleStaffSelect}
          services={services}
        />
      )}
    </div>
  );
}

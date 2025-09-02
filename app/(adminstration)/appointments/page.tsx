"use client";

import Appointnments from "@/components/Apointnments";
import EmptyState from "@/components/appointments/EmptyState";
import Header from "@/components/appointments/Header";
import AppointmentScheduler from "@/components/appointments/ScheduleAppoinment";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useAuth } from "@/hooks/useAuth";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AppointmentSchedulerDemo from "@/components/appointments/ScheduleAppoinment";

export default function AppointmentsPage() {
  const user = useAuth(["patient", "doctor", "ambulance_driver", "nurse"]);

  const [appointments, setAppointments] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);





  // if (!user || loading) return <LoadingAnimation />;

  // if (loading) return <LoadingAnimation />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <Header
          role={user.role}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          openModal={() => setIsModalOpen(true)}
        />

        {/* <Appointnments
          filteredAppointments={filteredAppointments}
          role={user.role}
          openEditModal={openEditModal}
          handleDelete={handleDelete}
          handleStatusUpdate={handleStatusUpdate}
        /> */}

        {appointments.length === 0 && (
           <EmptyState
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            role={user.role}
            openModal={() => setIsModalOpen(true)}
            />
          )}
      </div>

      {isModalOpen && (
        <AppointmentSchedulerDemo />
      )}
    </div>
  );
}

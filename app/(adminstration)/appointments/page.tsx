"use client";

import Appointnments from "@/components/Apointnments";
import EmptyState from "@/components/appointments/EmptyState";
import Header from "@/components/appointments/Header";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useAuth } from "@/hooks/useAuth";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AppointmentScheduler from "@/components/appointments/ScheduleAppoinment";

export default function AppointmentsPage() {
  const user = useAuth(["patient", "doctor", "ambulance_driver", "nurse"]);

  const [appointments, setAppointments] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/api/get-appointment/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmenId: string) => {
    setIsChangingStatus(true);
    try {
      await axios.put(`${baseUrl}/api/approve-appointment/${appointmenId}`);
      await fetchAppointments();
    } catch (error) {
      console.log(error);
    } finally {
      setIsChangingStatus(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  if (!user || loading) return <LoadingAnimation />;

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

        <Appointnments
          filteredAppointments={appointments}
          role={user.role}
          openEditModal={(appointment: any) => {}}
          handleDelete={() => {}}
          handleStatusUpdate={() => {}}
        />

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
        <AppointmentScheduler
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={user}
          callBack={fetchAppointments}
        />
      )}
    </div>
  );
}

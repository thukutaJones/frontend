"use client";

import LoadingAnimation from "@/components/LoadingAnimation";
import EditAddUserModal from "@/components/userManagement/EditAddUserModal";
import Header from "@/components/userManagement/Header";
import UsersTable from "@/components/userManagement/UsersTable";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import { Role, User } from "@/types/user";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const user = useAuth(["admin"]);
  const [users, setUsers] = useState<any[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<Role | "all">("all");
  const [formData, setFormData] = useState<Partial<User>>({});

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone_number: "",
      role: undefined,
      status: "active",
      gender: "male",
      dob: "",
      patientDetails: {
        address: "",
        nationId: "",
        conditions: [],
        emergencyContact: "",
        medicalRecords: [],
      },
      staffDetails: {
        roleWithin: "doctor",
        specialties: [],
        department: "",
        workingHours: "",
      },
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingUser(null);
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setFormData(user);
    setEditingUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    resetForm();
  };

  const fetchUsers = async () => {
    try {
      if (!user) return;
      setIsFetchingUsers(true);
      const res = await axios.get(`${baseUrl}/users/all`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsFetchingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const filteredUsers = users?.filter((user: any) => {
    const matchesSearch =
      user?.full_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = filterRole === "all" || user?.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (!user || isFetchingUsers) return <LoadingAnimation />;

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          openAddModal={openAddModal}
        />
        <UsersTable users={filteredUsers} openEditModal={openEditModal} />

        {showModal && (
          <EditAddUserModal
            editingUser={editingUser}
            closeModal={closeModal}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

export default page;

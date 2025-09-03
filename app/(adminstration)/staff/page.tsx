"use client";

import LoadingAnimation from "@/components/LoadingAnimation";
import Header from "@/components/staff/Header";
import StaffTable from "@/components/staff/StaffTable";
import UsersTable from "@/components/userManagement/UsersTable";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import { Role, User } from "@/types/user";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const user = useAuth(["hod"]);
  const [users, setUsers] = useState<any[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<Role | "all">("all");

  const fetchUsers = async () => {
    try {
      if (!user) return;
      setIsFetchingUsers(true);
      const res = await axios.get(
        `${baseUrl}/api/get-department-staff/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Chace-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching users:", error);
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
        />
        <StaffTable staffMembers={filteredUsers} />
      </div>
    </div>
  );
};

export default page;

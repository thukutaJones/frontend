"use client";

import React, { useEffect } from "react";
import {
  adminMenuItems,
  hodMenuItems,
  staffMenuItems,
  patientMenuItems,
} from "@/constants/sideBarContents";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardTopBar from "@/components/dashboard/DasboardTopar";
import { useAuth } from "@/hooks/useAuth";
import { retriveUserData } from "@/utils/retriveUserData";
import { MdEmail } from "react-icons/md";
import { subscribeUser } from "@/utils/subscribePush";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const user = useAuth([
    "admin",
    "hod",
    "patient",
    "doctor",
    "ambulance_driver",
    "nurse",
  ]);
  const userRole: any = user?.role;

  useEffect(() => {
    if (!user) return;
    subscribeUser(user?.token);
  }, [user]);

  const getMenuItems = () => {
    switch (userRole) {
      case "admin":
        return adminMenuItems;
      case "hod":
        return hodMenuItems;
      case "nurse":
      case "doctor":
      case "ambulance_driver":
        return staffMenuItems;
      case "patient":
        return patientMenuItems;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row">
      <Sidebar
        menuItems={getMenuItems()}
        userRole={user?.role}
        userEmail={user?.email}
        userName={user?.name}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardTopBar userEmail={user?.email} userName={user?.name} />
        <div className="flex-1 h-[calc(100vh-70px)] overflow-auto scroll-container">
          {children}
        </div>
      </main>
    </div>
  );
}

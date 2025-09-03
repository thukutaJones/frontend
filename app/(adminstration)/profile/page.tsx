"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Clock,
  Stethoscope,
  Building2,
  Activity,
  Heart,
  FileText,
  Edit,
  Save,
  X,
  UserCheck,
  Briefcase,
  Globe,
  Users,
} from "lucide-react";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import LoadingAnimation from "@/components/LoadingAnimation";

// Define types for different user structures
interface BaseUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  preferredLanguage?: string;
  gender?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  username?: string;
  phone?: string;
}

interface Department {
  _id: string;
  name: string;
  description?: string;
  roomNumber?: string;
  code?: string;
}

interface StaffInfo {
  _id: string;
  specialties?: string[];
  isAvailable: boolean;
  workingHours?: any[];
}

interface PatientInfo {
  _id: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    region?: string;
    postalCode?: string;
  };
  emergencyContact?: {
    name?: string;
    phone?: string;
    relation?: string;
  };
  district?: string;
  conditions?: any[];
  medicalRecords?: any[];
}

interface UserData extends BaseUser {
  linkedStaffId?: StaffInfo;
  linkedPatientId?: PatientInfo;
  departmentId?: Department;
}

const ProfilePage = () => {
  const user = useAuth([
    "admin",
    "patient",
    "hod",
    "doctor",
    "nurse",
    "ambulance_driver",
  ]);
  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRole = (role: string) => {
    const roleMap: { [key: string]: string } = {
      hod: "Head of Department",
      doctor: "Doctor",
      patient: "Patient",
      admin: "Administrator",
      nurse: "Nurse",
      staff: "Staff Member",
      ambulance_driver: "Ambulance Driver",
    };
    return roleMap[role] || role?.charAt(0)?.toUpperCase() + role?.slice(1);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case "doctor":
      case "hod":
        return <Stethoscope className="w-5 h-5" />;
      case "patient":
        return <Heart className="w-5 h-5" />;
      case "admin":
        return <Shield className="w-5 h-5" />;
      case "nurse":
        return <Activity className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const InfoCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    className?: string;
  }> = ({ icon, label, value, className = "" }) => (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-lg font-semibold text-gray-900 break-words">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  const SectionCard: React.FC<{
    title: string;
    children: React.ReactNode;
    className?: string;
  }> = ({ title, children, className = "" }) => (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const fetchUserData = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseUrl}/api/getUser/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUserData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  if (!user || isLoading) return <LoadingAnimation />;

  return (
    <div className="h-[calc(100vh-70px)] overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700"></div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-3xl">
                      {userData?.name
                        ?.split(" ")
                        ?.map((n: any) => n[0])
                        ?.join("")
                        ?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pb-6 px-6 text-center mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {userData?.name}
                </h2>

                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 font-medium text-sm mb-4">
                  {getRoleIcon(user?.role)}
                  <span>{formatRole(user?.role)}</span>
                </div>

                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    userData?.status
                  )}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      userData?.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  {userData?.status?.charAt(0)?.toUpperCase() +
                    userData?.status?.slice(1)}
                </div>

                {userData?.lastLogin && (
                  <p className="text-sm text-gray-500 mt-4">
                    Last active: {formatDate(userData?.lastLogin)}
                  </p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="border-t border-gray-100 px-6 py-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {userData?.createdAt
                        ? new Date(userData?.createdAt).getFullYear()
                        : "--"}
                    </p>
                    <p className="text-xs text-gray-500">Member Since</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 h-[calc(100vh-70px)] overflow-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: "overview", label: "Overview", icon: User },
                    { id: "contact", label: "Contact Info", icon: Mail },
                    {
                      id: "professional",
                      label: "Professional",
                      icon: Briefcase,
                    },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                          activeTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <SectionCard title="Basic Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                      icon={<User className="w-5 h-5" />}
                      label="Full Name"
                      value={userData?.name || ""}
                    />
                    <InfoCard
                      icon={<UserCheck className="w-5 h-5" />}
                      label="Username"
                      value={userData?.username || "N/A"}
                    />
                    <InfoCard
                      icon={<Users className="w-5 h-5" />}
                      label="Gender"
                      value={
                        userData?.gender
                          ? userData?.gender.charAt(0).toUpperCase() +
                            userData?.gender.slice(1)
                          : "N/A"
                      }
                    />
                    <InfoCard
                      icon={<Globe className="w-5 h-5" />}
                      label="Preferred Language"
                      value={userData?.preferredLanguage?.toUpperCase() || "EN"}
                    />
                  </div>
                </SectionCard>

                <SectionCard title="Account Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                      icon={<Calendar className="w-5 h-5" />}
                      label="Created"
                      value={formatDate(userData?.createdAt)}
                    />
                    <InfoCard
                      icon={<Clock className="w-5 h-5" />}
                      label="Last Updated"
                      value={formatDate(userData?.updatedAt)}
                    />
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <SectionCard title="Contact Information">
                  <div className="grid grid-cols-1 gap-4">
                    <InfoCard
                      icon={<Mail className="w-5 h-5" />}
                      label="Email Address"
                      value={userData?.email}
                    />
                    {userData?.phone && (
                      <InfoCard
                        icon={<Phone className="w-5 h-5" />}
                        label="Phone Number"
                        value={userData?.phone}
                      />
                    )}
                  </div>
                </SectionCard>

                {userData?.linkedPatientId?.address && (
                  <SectionCard title="Address Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userData?.linkedPatientId.address.line1 && (
                        <InfoCard
                          icon={<MapPin className="w-5 h-5" />}
                          label="Address Line 1"
                          value={userData?.linkedPatientId.address.line1}
                        />
                      )}
                      {userData?.linkedPatientId.address.city && (
                        <InfoCard
                          icon={<MapPin className="w-5 h-5" />}
                          label="City"
                          value={userData?.linkedPatientId.address.city}
                        />
                      )}
                    </div>
                  </SectionCard>
                )}

                {userData?.linkedPatientId?.emergencyContact && (
                  <SectionCard title="Emergency Contact">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {userData?.linkedPatientId.emergencyContact.name && (
                        <InfoCard
                          icon={<User className="w-5 h-5" />}
                          label="Contact Name"
                          value={
                            userData?.linkedPatientId.emergencyContact.name
                          }
                        />
                      )}
                      {userData?.linkedPatientId.emergencyContact.phone && (
                        <InfoCard
                          icon={<Phone className="w-5 h-5" />}
                          label="Contact Phone"
                          value={
                            userData?.linkedPatientId.emergencyContact.phone
                          }
                        />
                      )}
                      {userData?.linkedPatientId.emergencyContact.relation && (
                        <InfoCard
                          icon={<Heart className="w-5 h-5" />}
                          label="Relationship"
                          value={
                            userData?.linkedPatientId.emergencyContact.relation
                          }
                        />
                      )}
                    </div>
                  </SectionCard>
                )}
              </div>
            )}

            {activeTab === "professional" && (
              <div className="space-y-6">
                {userData?.departmentId && (
                  <SectionCard title="Department Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoCard
                        icon={<Building2 className="w-5 h-5" />}
                        label="Department"
                        value={userData?.departmentId.name}
                      />
                      {userData?.departmentId.roomNumber && (
                        <InfoCard
                          icon={<MapPin className="w-5 h-5" />}
                          label="Room Number"
                          value={userData?.departmentId.roomNumber}
                        />
                      )}
                    </div>
                    {userData?.departmentId.description && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {userData?.departmentId.description}
                        </p>
                      </div>
                    )}
                  </SectionCard>
                )}

                {userData?.linkedStaffId && (
                  <SectionCard title="Staff Information">
                    <div className="space-y-4">
                      <InfoCard
                        icon={<Activity className="w-5 h-5" />}
                        label="Availability Status"
                        value={
                          userData?.linkedStaffId.isAvailable
                            ? "Available"
                            : "Not Available"
                        }
                        className={
                          userData?.linkedStaffId.isAvailable
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }
                      />

                      {userData?.linkedStaffId.specialties &&
                        userData?.linkedStaffId.specialties.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                              Specialties
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {userData?.linkedStaffId.specialties.map(
                                (specialty: any, index: number) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                  >
                                    {specialty}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </SectionCard>
                )}

                {userData?.linkedPatientId && (
                  <SectionCard title="Medical Information">
                    <div className="space-y-4">
                      <InfoCard
                        icon={<FileText className="w-5 h-5" />}
                        label="Medical Records"
                        value={`${
                          userData?.linkedPatientId.medicalRecords?.length || 0
                        } Records`}
                      />
                      <InfoCard
                        icon={<Heart className="w-5 h-5" />}
                        label="Conditions"
                        value={`${
                          userData?.linkedPatientId.conditions?.length || 0
                        } Conditions`}
                      />
                    </div>
                  </SectionCard>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

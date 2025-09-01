"use client";

import HeroSection from "@/components/dashboard/HeroSection";
import Stats from "@/components/dashboard/Stats";
import LoadingAnimation from "@/components/LoadingAnimation";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
  const user = useAuth(["admin", "hod", "patient", "doctor", "ambulance_driver", "nurse"]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const fetchStats = async () => {
    try {
      if (!user?.token) return;
      setIsLoading(true);
      if (user?.role === "admin") {
        const res = await axios.get(`${baseUrl}/dashboard/${user?.role}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setStats(res?.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  if (!user || isLoading) return <LoadingAnimation />;

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-auto scroll-container p-8">
      <HeroSection name={user?.name} />
      {user?.role === "admin" && (
        <>
          <Stats
            stats={{
              patients: stats?.users?.patients,
              staff: stats?.users?.staff,
              hods: stats?.users?.hods,
              departments: stats?.departments,
            }}
          />
        </>
      )}
      {user?.role === "hod" && <></>}
      {user?.role === "patient" && <></>}
    </div>
  );
};

export default page;

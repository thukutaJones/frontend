"use client";

import { v4 as uuidv4 } from "uuid";
import { connectSocket, disconnectSocket } from "@/utils/socket";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import EmergencyRequestutton from "@/components/emergencies/EmergencyRequestutton";
import ActiveEmergenciesStatus from "@/components/emergencies/ActiveEmergenciesStatus";
import StaffActiveEmergencyCard from "@/components/emergencies/StaffActiveEmergencyCard";
import EmptyState from "@/components/emergencies/EmptyState";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useSendEmergency } from "@/hooks/handleSendEmergency";

export default function EmergenciesPage() {
  const user = useAuth(["ambulance_driver", "patient", "nurse", "doctor"]);
  const { handleEmergencyRequest } = useSendEmergency();

  const [activeEmergency, setActiveEmergency] = useState<any>(null);
  const [staffEmergency, setStaffEmergency] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmComplete, setShowConfirmComplete] = useState<string | null>(
    null
  );
  const [isCompleting, setIsCompleting] = useState<boolean>(false);

  const fetchActiveEmergency = async () => {
    if (!user) return;

    try {
      let url = "";
      let userType: "guest" | "registred" | undefined;
      let id: string | null = null;

      if (user.role === "patient") {
        if (localStorage.getItem("device_id")) {
          userType = "guest";
          id = localStorage.getItem("device_id");
        } else {
          userType = "registred";
          id = user.id;
        }
        url = `${baseUrl}/api/emergency/active/${userType}/${id}`;
      } else if (user.role === "ambulance_driver") {
        id = user.id;
        url = `${baseUrl}/api/emergency/active/${id}`;
      }

      if (!url || !id) return;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (user.role === "patient") setActiveEmergency(res.data.emergency);
      if (user.role === "ambulance_driver")
        setStaffEmergency(res.data.emergency);
    } catch (error) {
      console.log("Error fetching active emergency:", error);
    }
  };

  const handleCompleteEmergency = (emergencyId: string) => {
    setIsCompleting(true);
    try {
      socket.emit("completeEmergency", emergencyId, (response: any) => {
        if (response?.status === "success") {
          setShowConfirmComplete(null);
          setStaffEmergency(null);
          localStorage.removeItem("hasMedicalEmergency");
        } else {
          console.log("Failed to send emergency:", response?.message);
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsCompleting(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const newSocket = connectSocket({ userId: user?.id });
    setSocket(newSocket);

   newSocket.on("receiveEmergency", (newEmergency: any) => {
  if (user?.role === "ambulance_driver") {
    setStaffEmergency(newEmergency);

    try {
      // 🔔 Play a short notification beep
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = 880; // A5 tone
      oscillator.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.2); // 200ms beep

      // 🗣️ Speech synthesis alert
      const synth = window.speechSynthesis;
      if (synth) {
        const isGuest = newEmergency?.userType === "guest";
        const senderName = isGuest
          ? "an anonymous user"
          : newEmergency?.sender?.name || "a patient";

        const message = `New emergency assigned from ${senderName}. Please check it out.`;

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        // Choose a female voice if available
        const voices = synth.getVoices();
        const femaleVoice = voices.find(
          (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
        );
        if (femaleVoice) utterance.voice = femaleVoice;

        synth.cancel(); // stop any ongoing speech
        synth.speak(utterance);
      }
    } catch (err) {
      console.error("Notification/speech synthesis error:", err);
    }
  }
});


    newSocket.on("completedEmergency", fetchActiveEmergency);

    return () => disconnectSocket();
  }, [user]);

  useEffect(() => {
    fetchActiveEmergency();
  }, [user]);

  if (!user) return <LoadingAnimation />;

  if (user?.role === "patient") {
    return (
      <div className="min-h-[calc(100vh-90px)] bg-gradient-to-br from-blue-50 via-white to-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          {!activeEmergency ? (
            <EmergencyRequestutton
              handleEmergencyRequest={() =>
                handleEmergencyRequest(
                  user?.role ? "registred" : "guest",
                  user,
                  socket,
                  setActiveEmergency,
                  setIsLoading,
                  user?.id
                )
              }
              isLoading={isLoading}
            />
          ) : (
            <ActiveEmergenciesStatus activeEmergency={activeEmergency} />
          )}
        </div>
      </div>
    );
  }

  if (user?.role === "ambulance_driver") {
    return (
      <div className="min-h-[calc(100vh-90px)] bg-gradient-to-br from-blue-50 via-white to-gray-50 p-6">
        <div className="mx-auto">
          {staffEmergency ? (
            <StaffActiveEmergencyCard
              staffEmergency={staffEmergency}
              showConfirmComplete={showConfirmComplete}
              setShowConfirmComplete={setShowConfirmComplete}
              handleCompleteEmergency={handleCompleteEmergency}
              isCompleting={isCompleting}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    );
  }

  return null;
}

import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  email: string;
  token: string;
  name: string;
}

interface EmergencyPayload {
  userType: "guest" | "registred";
  sender?: string;
  userDeviceId?: string;
  locationLat: number;
  locationLang: number;
  status: "pending" | "assigned" | "onHold";
}

export const useSendEmergency = () => {
  const handleEmergencyRequest = async (
    userType: "guest" | "registred",
    user: User,
    socket: any,
    setActiveEmergency: (emergency: EmergencyPayload) => void,
    setIsLoading: (loading: boolean) => void,
    senderId?: string
  ) => {
    setIsLoading(true);

    if (!("geolocation" in navigator)) {
      console.log("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const deviceId = localStorage.getItem("device_id") || uuidv4();
          localStorage.setItem("device_id", deviceId);

          const emergencyPayload: EmergencyPayload = {
            userType,
            sender: userType === "registred" ? senderId : undefined,
            userDeviceId: userType === "guest" ? deviceId : undefined,
            locationLat: coords.lat,
            locationLang: coords.lng,
            status: "pending",
          };

          // ✅ Emit with callback
          socket.emit(
            "sendEmergency",
            emergencyPayload,
            (response: any) => {
              if (response?.status === "success") {
                setActiveEmergency(response.emergency); // <-- confirmed by server
                localStorage.setItem("hasMedicalEmergency", "true");
              } else {
                console.error("Failed to send emergency:", response?.message);
              }
              setIsLoading(false);
            }
          );
        } catch (error) {
          console.error("Error sending emergency:", error);
          setIsLoading(false);
        }
      },
      (err) => {
        console.log("Geolocation error:", err.message);
        setIsLoading(false);
      }
    );
  };

  return { handleEmergencyRequest };
};

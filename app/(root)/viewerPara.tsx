"use client";

import { useEffect } from "react";
import "pannellum/build/pannellum.css";
import pannellum from "pannellum";

export default function ClinicTour() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const viewer = pannellum.viewer("clinicTour", {
      default: {
        firstScene: "reception",
        author: "Wezi Medical Centre",
        sceneFadeDuration: 1000,
      },
      scenes: {
        reception: {
          title: "Reception",
          panorama: "/b1.jpg",
          hotSpots: [
            { pitch: 0, yaw: 90, type: "scene", text: "Go to Consultation Room", sceneId: "consultation" },
            { pitch: 0, yaw: -90, type: "scene", text: "Go to Lab", sceneId: "lab" },
          ],
        },
        consultation: {
          title: "Consultation Room",
          panorama: "/b1.jpg",
          hotSpots: [{ pitch: 0, yaw: -90, type: "scene", text: "Back to Reception", sceneId: "reception" }],
        },
        lab: {
          title: "Laboratory",
          panorama: "/b2.webp",
          hotSpots: [
            { pitch: 0, yaw: 90, type: "scene", text: "Back to Reception", sceneId: "reception" },
            { pitch: 0, yaw: 180, type: "scene", text: "Go to Pharmacy", sceneId: "pharmacy" },
          ],
        },
        pharmacy: {
          title: "Pharmacy",
          panorama: "/b1.jpg",
          hotSpots: [{ pitch: 0, yaw: 0, type: "scene", text: "Back to Lab", sceneId: "lab" }],
        },
      },
    });
  }, []);

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-lg overflow-hidden">
      <div id="clinicTour" className="w-full h-full"></div>
    </div>
  );
}

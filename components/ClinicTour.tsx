/* eslint-disable */
"use client";

import { useEffect } from "react";
import "pannellum/build/pannellum.css";

export default function ClinicTour() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "/pannellum/pannellum.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      window.pannellum.viewer("clinicTour", {
        firstScene: "reception",
        author: "Wezi Medical Centre",
        sceneFadeDuration: 1000,
        scenes: {
          reception: {
            title: "Reception",
            panorama: "/b1.jpg",
            hotSpots: [
              {
                pitch: 0,   // vertical angle
                yaw: 90,    // horizontal angle
                type: "scene",
                text: "Go to Consultation Room",
                sceneId: "consultation",
              },
              {
                pitch: 0,
                yaw: -90,
                type: "scene",
                text: "Go to Lab",
                sceneId: "lab",
              },
            ],
          },
          consultation: {
            title: "Consultation Room",
            panorama: "/b2.webp",
            hotSpots: [
              { pitch: 0, yaw: -90, type: "scene", text: "Back to Reception", sceneId: "reception" },
            ],
          },
          lab: {
            title: "Laboratory",
            panorama: "/images/b3.jpg",
            hotSpots: [
              { pitch: 0, yaw: 90, type: "scene", text: "Back to Reception", sceneId: "reception" },
              { pitch: 0, yaw: 180, type: "scene", text: "Go to Pharmacy", sceneId: "pharmacy" },
            ],
          },
          pharmacy: {
            title: "Pharmacy",
            panorama: "/images/b4.jpg",
            hotSpots: [
              { pitch: 0, yaw: 0, type: "scene", text: "Back to Lab", sceneId: "lab" },
            ],
          },
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-lg overflow-hidden">
      <div id="clinicTour" className="w-full h-full"></div>
    </div>
  );
}

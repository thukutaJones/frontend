/* eslint-disable */
"use client";

import { useEffect } from "react";
import "pannellum/build/pannellum.css";

// Define config type (extends pannellum config to allow "default")
type PannellumConfig = {
  default?: {
    firstScene?: string;
    author?: string;
    sceneFadeDuration?: number;
  };
  scenes: Record<
    string,
    {
      title: string;
      panorama: string;
      hotSpots?: {
        pitch: number;
        yaw: number;
        type: string;
        text: string;
        sceneId?: string;
      }[];
    }
  >;
};

export default function ClinicTour() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "/pannellum/pannellum.js";
    script.async = true;

    script.onload = () => {
      // @ts-expect-error pannellum types are incomplete
      window.pannellum.viewer("clinicTour", {
        default: {
          firstScene: "reception",
          author: "Wezi Medical Centre",
          sceneFadeDuration: 1000,
        },
        scenes: {
          reception: {
            title: "Reception",
            panorama: "/images/b1.jpg",
            hotSpots: [
              {
                pitch: 0,
                yaw: 90,
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
        },
      } as PannellumConfig);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-lg overflow-hidden">
      <div id="clinicTour" className="w-full h-full"></div>
    </div>
  );
}

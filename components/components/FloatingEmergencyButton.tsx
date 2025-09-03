"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaAmbulance } from "react-icons/fa";

const FloatingEmergencyButton = () => {
  const router = useRouter();
  const hasActiveEmergency = false;
  return (
    <div className="fixed bottom-24 right-6 z-30">
      <button
        onClick={() => router.push(`/active-emergency?triggered=${true}`)}
        disabled={!!hasActiveEmergency}
        className={`
          relative group p-5 rounded-full border-red-500 shadow-xl 
       hover:scale-110 overflow-hidden
          bg-red-900 hover:bg-red-700 hover:shadow-red-500/50
          ${
            hasActiveEmergency
              ? "scale-95 shadow-red-600/75"
              : ""
          }
        `}
      >
        <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
        <div
          className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full animate-spin-slow opacity-75 blur-sm"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div
          className={`
          relative z-10 transition-all duration-500 
          ${
            hasActiveEmergency
              ? "rotate-12 scale-110"
              : "group-hover:scale-110 group-hover:rotate-6"
          }
        `}
        >
          <FaAmbulance
            className={`
            w-5 h-5 text-white transition-all duration-500
            ${
              hasActiveEmergency
                ? "animate-bounce"
                : "group-hover:drop-shadow-lg"
            }
          `}
          />
        </div>

        {hasActiveEmergency && (
          <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-40"></div>
        )}
      </button>
    </div>
  );
};

export default FloatingEmergencyButton;

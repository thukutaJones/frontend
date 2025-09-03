"use client";

import React from "react";
import { RiMessage3Line, RiCalendarLine, RiCloseLine } from "react-icons/ri";

type StatusType = "chat" | "appointment booking" | "initialized";

interface FloatingStatusProps {
  status: StatusType;
  handleClick: () => void;
  isCancelling: boolean;
  isProcessing: boolean;
}

const statusConfig = {
  chat: {
    icon: RiMessage3Line,
    title: "Chat",
    subtitle: "Live conversation",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    shadowColor: "shadow-blue-500/25",
    glowColor: "shadow-blue-400/40",
    iconBg: "bg-blue-500",
    textColor: "text-blue-900",
    accentColor: "bg-blue-500",
  },
  "appointment booking": {
    icon: RiCalendarLine,
    title: "Appointment",
    subtitle: "Booking session",
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100",
    shadowColor: "shadow-emerald-500/25",
    glowColor: "shadow-emerald-400/40",
    iconBg: "bg-emerald-500",
    textColor: "text-emerald-900",
    accentColor: "bg-emerald-500",
  },
  initialized: {
    icon: RiCalendarLine,
    title: "Appointment",
    subtitle: "Booking session",
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100",
    shadowColor: "shadow-emerald-500/25",
    glowColor: "shadow-emerald-400/40",
    iconBg: "bg-emerald-500",
    textColor: "text-emerald-900",
    accentColor: "bg-emerald-500",
  },
};

export default function ChatBotStatus({
  status,
  handleClick,
  isCancelling,
  isProcessing,
}: FloatingStatusProps) {
  const config = statusConfig[status];
  const Icon = config?.icon;

  return (
    <>
      {/* Floating Status Component */}
      <div className="fixed top-14 z-50 left-1/2 transform -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="relative group">
          {/* Main Container */}
          <div
            className={`
              relative flex items-center space-x-4 px-6 py-2 rounded-2xl
              bg-white/80
              ${config?.shadowColor} shadow-xl hover:${config?.glowColor} hover:shadow-2xl
              transition-all duration-500 hover:scale-105 hover:-translate-y-1
              overflow-hidden
            `}
          >
            {/* Status Indicator Dot */}
            <div className="relative">
              <div
                className={`w-3 h-3 ${config?.accentColor} rounded-full animate-pulse`}
              ></div>
              <div
                className={`absolute inset-0 w-3 h-3 ${config?.accentColor} rounded-full animate-ping opacity-20`}
              ></div>
            </div>

            {/* Icon Container */}
            <div className="relative">
              <div
                className={`
                  p-3 rounded-xl ${config?.iconBg} shadow-lg
                  transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                `}
              >
                {config && <Icon className="w-5 h-5 text-white" />}
                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Icon Glow Effect */}
              <div
                className={`absolute inset-0 p-3 rounded-xl ${config?.iconBg} opacity-20 blur-md scale-110 group-hover:opacity-40 transition-opacity duration-500`}
              ></div>
            </div>

            {/* Status Text */}
            {isProcessing || isCancelling ? (
              <div className="flex items-center justify-center space-x-1">
                <span
                  className="w-2 h-2 bg-red-600 rounded-full bounce-fast"
                  style={{ animationDelay: "-0.2s" }}
                ></span>
                <span
                  className="w-2 h-2 bg-red-600 rounded-full bounce-fast"
                  style={{ animationDelay: "-0.1s" }}
                ></span>
                <span className="w-2 h-2 bg-red-600 rounded-full bounce-fast"></span>
              </div>
            ) : (
              <div className="flex flex-col space-y-1 relative z-10">
                <h3
                  className={`font-bold text-sm ${config?.textColor} tracking-tight`}
                >
                  {config?.title}
                </h3>
                <p className="text-gray-600 text-xs font-medium">
                  {config?.subtitle}
                </p>
              </div>
            )}

            {/* Cancel Button */}
            <button
              onClick={handleClick}
              disabled={isCancelling}
              className="ml-4 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-300"
              aria-label="Cancel session"
            >
              <RiCloseLine className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

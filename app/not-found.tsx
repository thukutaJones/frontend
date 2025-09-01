"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  RiHomeLine,
  RiArrowLeftLine,
  RiSearchLine,
  RiStethoscopeLine,
  RiHeartPulseLine,
  RiMedicineBottleLine,
} from "react-icons/ri";
import Image from "next/image";

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const floatingIcons = [
    { Icon: RiStethoscopeLine, delay: "0s", position: "top-20 left-20" },
    { Icon: RiHeartPulseLine, delay: "1s", position: "top-32 right-32" },
    { Icon: RiMedicineBottleLine, delay: "2s", position: "bottom-32 left-32" },
    { Icon: RiSearchLine, delay: "1.5s", position: "bottom-20 right-20" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br p-8 from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full translate-x-40 translate-y-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gray-100 rounded-full -translate-x-32 -translate-y-32 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Medical Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-20 animate-bounce`}
          style={{ animationDelay: delay, animationDuration: "3s" }}
        >
          <Icon className="w-16 h-16 text-blue-300" />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div
          className={`
            text-center max-w-2xl mx-auto transition-all duration-1000 transform
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          {/* Logo Section */}
          <div className="mb-8 animate-in slide-in-from-top-8 fade-in duration-700">
            <div className="flex justify-center mb-6">
              <div className="relative p-4 bg-white rounded-3xl shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 hover:scale-105">
                <Image
                  src="/wezLogo.png"
                  alt="Wezi Medical Centre Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent rounded-3xl"></div>
              </div>
            </div>
            <h1 className="text-blue-900 font-bold text-3xl tracking-tight mb-2">
              Wezi Medical Centre
            </h1>
          </div>

          {/* 404 Display */}
          <div className="mb-12 animate-in slide-in-from-top-8 fade-in duration-700 delay-200">
            <div className="relative">
              <h2 className="text-9xl md:text-[12rem] font-black text-blue-900/10 leading-none mb-4">
                404
              </h2>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100">
                  <RiSearchLine className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Page Not Found
                  </h3>
                  <p className="text-gray-600 text-lg">
                    We couldn't locate the page you're looking for
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in slide-in-from-bottom-8 fade-in duration-700 delay-600">
            {/* Go Home Button */}
            <button
              onClick={handleGoHome}
              onMouseEnter={() => setHoveredButton("home")}
              onMouseLeave={() => setHoveredButton(null)}
              className="group relative px-8 py-4 bg-blue-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-blue-900/25 transition-all duration-500 hover:scale-105 transform-gpu overflow-hidden"
            >
              {hoveredButton === "home" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 animate-pulse"></div>
              )}
              <div className="flex items-center space-x-3 relative z-10">
                <RiHomeLine className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Return to Home</span>
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Go Back Button */}
            <button
              onClick={handleGoBack}
              onMouseEnter={() => setHoveredButton("back")}
              onMouseLeave={() => setHoveredButton(null)}
              className="group relative px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-2xl font-bold text-lg shadow-xl hover:shadow-blue-100/50 hover:bg-blue-50 transition-all duration-500 hover:scale-105 transform-gpu overflow-hidden"
            >
              {hoveredButton === "back" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white animate-pulse"></div>
              )}
              <div className="flex items-center space-x-3 relative z-10">
                <RiArrowLeftLine className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Go Back</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-50/30 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50/20 to-transparent"></div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
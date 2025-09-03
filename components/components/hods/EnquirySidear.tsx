"use client";

import React, { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine, RiUser3Line } from "react-icons/ri";

interface Patient {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Enquiry {
  _id: string;
  lastMessage: string;
  lastMessageAt: string;
  patientId: string;
  patient: Patient;
}

interface EnquirySidebarProps {
  enquiries: Enquiry[];
  onEnquiryClick: (patient: Patient) => void;
  activeEnquiryId?: string;
}

export default function EnquirySidebar({
  enquiries,
  onEnquiryClick,
  activeEnquiryId,
}: EnquirySidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24)
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {!isExpanded && (
        <div className="p-1 h-full">
          <button
            onClick={() => setIsExpanded(true)}
            className="px-3 py-2 h-full bg-blue-900 text-white rounded-xl shadow-lg hover:scale-110 transition-all duration-300"
          >
            <RiMenuLine className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        h-[calc(100vh-80px)] z-40 rounded-r-xl bg-white transition-all duration-300
          ${isExpanded ? "w-80" : isMobile && isExpanded ? "w-full" : "w-0"}
          ${!isExpanded && "overflow-hidden"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Enquiries</h2>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* Enquiries List */}
        <div className="flex-1 overflow-y-auto">
          {enquiries.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <RiUser3Line className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No enquiries yet</p>
            </div>
          ) : (
            <div className="p-2">
              {enquiries.map((enquiry) => (
                <button
                  key={enquiry._id}
                  onClick={() => {
                    onEnquiryClick(enquiry?.patient);
                    if (isMobile) setIsExpanded(false);
                  }}
                  className={`
                    w-full p-4 mb-2 rounded-xl text-left transition-all hover:bg-gray-50
                    ${
                      activeEnquiryId === enquiry._id
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {enquiry?.patient?.name
                            ?.split(" ")
                            ?.map((n) => n[0])
                            ?.join("")
                            ?.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {enquiry?.patient?.name}
                        </h3>
                        <p className="text-xs text-gray-500 capitalize">
                          {enquiry.lastMessage}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatTime(enquiry?.lastMessageAt)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

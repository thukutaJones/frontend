"use client"

import React from "react";
import { RiChatSmile3Fill, RiCloseLine } from "react-icons/ri";

const ChatToggleutton = ({
  setIsOpen,
  isOpen,
  messages = [],
}: {
  setIsOpen: any;
  isOpen: boolean;
  messages: any[];
}) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`
          relative group p-4 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden backdrop-blur-sm
          ${
            isOpen
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : "bg-blue-900 text-white hover:bg-blue-800 hover:shadow-blue-900/25"
          }
        `}
    >
      <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {!isOpen && messages?.length > 1 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-white text-xs font-bold">
            {messages?.filter((m) => m?.sender === "bot").length - 1}
          </span>
        </div>
      )}

      <div className="relative z-10 transition-all duration-500 group-hover:scale-110">
        {isOpen ? (
          <RiCloseLine className="w-6 h-6" />
        ) : (
          <RiChatSmile3Fill className="w-6 h-6" />
        )}
      </div>
    </button>
  );
};

export default ChatToggleutton;

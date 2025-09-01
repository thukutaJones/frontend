import React from "react";
import { RiRobot2Line } from "react-icons/ri";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-white px-6 py-4 rounded-3xl rounded-bl-lg shadow-lg border border-gray-100 max-w-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <RiRobot2Line className="w-4 h-4 text-blue-900" />
          </div>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-blue-900 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-blue-900 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-900 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

import React from "react";
import { RiCloseLine, RiRobot2Fill } from "react-icons/ri";

const Header = ({ setIsOpen }: { setIsOpen: any }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 p-6 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-24 h-24 bg-white/3 rounded-full translate-x-12 translate-y-12 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
            <RiRobot2Fill className="w-6 h-6 text-white" />
            <div className="absolute inset-0 bg-white/5 rounded-2xl animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Wezi AI Assistant</h3>
            <p className="text-blue-100 text-sm">Always here to help you</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90"
        >
          <RiCloseLine className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;

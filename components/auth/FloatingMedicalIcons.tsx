import React from "react";
import { RiStethoscopeLine, RiHeartPulseLine } from "react-icons/ri";

const FloatingMedicalIcons = () => {
  return (
    <>
      <div
        className="absolute top-20 left-20 opacity-10 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      >
        <RiStethoscopeLine className="w-16 h-16 text-blue-300" />
      </div>
      <div
        className="absolute bottom-32 right-32 opacity-10 animate-bounce"
        style={{ animationDelay: "1.5s", animationDuration: "3s" }}
      >
        <RiHeartPulseLine className="w-12 h-12 text-blue-300" />
      </div>
    </>
  );
};

export default FloatingMedicalIcons;

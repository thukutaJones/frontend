import React from "react";

const AnimatedBackgroundPattern = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full translate-x-40 translate-y-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-gray-100 rounded-full -translate-x-32 -translate-y-32 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

export default AnimatedBackgroundPattern;

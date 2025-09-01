import React from "react";

const Footer = () => {
  return (
    <div className="text-center mt-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-400">
      <p className="text-gray-500 text-sm">
        Need help? Contact our{" "}
        <button className="text-blue-900 font-semibold hover:underline transition-all duration-200">
          support team
        </button>
      </p>
    </div>
  );
};

export default Footer;

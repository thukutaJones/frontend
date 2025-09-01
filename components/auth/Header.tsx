import Image from "next/image";
import React from "react";

const Header = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="text-center mb-8 animate-in slide-in-from-top-8 fade-in duration-700">
      <div className="flex justify-center mb-6">
        <div className="relative p-4 bg-white rounded-3xl shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 hover:scale-105">
          <Image
            src="/wezLogo.png"
            alt="Wezi Medical Centre Logo"
            width={60}
            height={60}
            className="w-15 h-15 object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent rounded-3xl"></div>
        </div>
      </div>
      <h1 className="text-blue-900 font-bold text-2xl tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-gray-600 text-sm font-medium">{subTitle}</p>
    </div>
  );
};

export default Header;

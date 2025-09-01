"use client";

import AnimatedBgEelments from "@/components/auth/AnimatedBgEelments";
import BrandingColumn from "@/components/auth/BrandingColumn";
import SignUpFormColumn from "@/components/auth/SignUpFormColumn";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      <AnimatedBgEelments />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
          <BrandingColumn />
          <SignUpFormColumn />
        </div>
      </div>
    </div>
  );
};

export default page;

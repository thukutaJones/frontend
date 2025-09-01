"use client";

import FAQs from "@/components/root/FAQs";
import HeroSection from "@/components/root/HeroSection";
import Services from "@/components/root/Services";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <Services />
      <FAQs />
    </div>
  );
};

export default page;

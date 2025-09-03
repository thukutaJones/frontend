"use client";

import React from "react";
import Footer from "@/components/root/Footer";
import HeroSection from "@/components/root/HeroSection";
import Services from "@/components/root/Services";
import FAQs from "@/components/root/FAQs";
// import ClinicTour from "@/components/ClinicTour";

export default function Page() {
  return (
    <div className="w-full">
      <HeroSection />
      <Services />
      <FAQs />
      <Footer />
      {/* <ClinicTour /> */}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/auth/Header";
import AnimatedBackgroundPattern from "@/components/auth/AnimatedBackgroundPattern";
import FloatingMedicalIcons from "@/components/auth/FloatingMedicalIcons";
import SignInForm from "@/components/auth/SignInForm";
import Footer from "@/components/auth/Footer";
import DecorativeElements from "@/components/auth/DecorativeElements";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignIn() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <AnimatedBackgroundPattern />
      <FloatingMedicalIcons />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div
          className={`
            w-full max-w-md transition-all duration-1000 transform
            ${
              isPageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
          `}
        >
          <Header
            title="Create Your Account"
            subTitle="Create your Wezi Medical Centre"
          />
          <SignUpForm />
          <Footer />
        </div>
      </div>
      <DecorativeElements />
    </div>
  );
}

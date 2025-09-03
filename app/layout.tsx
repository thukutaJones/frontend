"use client";

import "./globals.css";

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";
import { useEffect, useState } from "react";
import LoadingAnimation from "@/components/LoadingAnimation";
import FloatingWeziBot from "@/components/components/FloatingWeziBot";
import FloatingEmergencyButton from "@/components/components/FloatingEmergencyButton";
import { useAuth } from "@/hooks/useAuth";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = useAuth([
    "admin",
    "nurse",
    "doctor",
    "ambulance_driver",
    "hod",
    "patient",
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
    setMounted(true);
  }, []);


  return (
    <html lang="en">
      <body className="bg-white font-sans text-gray-900 antialiased">
        <I18nextProvider i18n={i18n}>
          {mounted ? (
            <>
              {children}
              {(!user || user?.role === "patient") && (
                <>
                  <FloatingWeziBot />
                  <FloatingEmergencyButton />
                </>
              )}
            </>
          ) : (
            <LoadingAnimation />
          )}
        </I18nextProvider>
      </body>
    </html>
  );
};

export default RootLayout;

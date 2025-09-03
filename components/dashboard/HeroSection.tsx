"use client";

import { getGreeting } from "@/utils/getGreeting";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = ({
  name,
  user,
}: {
  name: string;
  user: {
    id: string;
    email: string;
    name: string;
    token: string;
    role: string;
  };
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-blue-900 md:mt-20 rounded-xl h-[25vh] relative flex flex-row">
      <div className="hidden md:block w-[25%] h-full relative">
        <Image
          src="/hero2.png"
          width={300}
          height={300}
          alt="doctor_img"
          className="absolute bottom-0 h-[150%] w-full"
        />
      </div>
      <div className="w-full md:w-[70%] h-full px-4 py-4 flex flex-col justify-center font-sans">
        <p className="text-3xl text-white font-bold">
          {t(`greeting.${getGreeting()}`)}, {name}
        </p>
        <p className="text-sm text-white opacity-80 mt-2 md:max-w-[65%]">
          {t(`greeting.dashboard.${user?.role}`)}
        </p>
        <div className="absolute h-full w-full top-0 left-0 bg-[url('/noise.png')] opacity-50 pointer-events-none [mask-image:linear-gradient(to_left,black,transparent)] [-webkit-mask-image:linear-gradient(to_left,black,transparent)]" />
      </div>
    </div>
  );
};

export default HeroSection;

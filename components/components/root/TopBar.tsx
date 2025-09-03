"use client";

import { navContent } from "@/constants/rootConstants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLogin } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="z-20 w-full fixed bg-white/80 h-[70px] flex flex-row justify-between items-center px-8">
      <div className="flex flex-row items-center gap-2">
        <Image
          width={500}
          height={500}
          alt=""
          src={"/wezLogo.png"}
          className="h-10 w-10 object-contain"
        />
        <h1 className="text-xl font-bold text-blue-900">WMC</h1>
      </div>
      <div className="hidden md:flex flex-row items-center gap-10">
        <nav className="flex flex-roe gap-8 items-center">
          {navContent?.map((item: any, index: number) => (
            <Link
              href={item?.route}
              key={index?.toString()}
              className="flex flex-row gap-2 items-center"
            >
              {item?.icon && (
                <item.icon className="text-blue-900 mr-1" size={16} />
              )}
              <p className="text-blue-900 font-semibold text-sm">
                {t(`root.top_bar.${item?.key}`)}
              </p>
            </Link>
          ))}
        </nav>
        <div className="flex flex-row gap-4">
          <LanguageSwitcher />
          <button
            className="px-4 py-2 flex flex-row items-center bg-gray-50 hover:scale-105 hover:shadow hover:shadow-blue-600 transition-colors duration-300 text-blue-900 font-semibold rounded-full"
            onClick={() => location.href = "/sign-in"}
          >
            <CiLogin className="text-blue-900 mr-2 inline" size={20} />
            <p className="text-sm">{t("root.top_bar.signIn")}</p>
          </button>
          <button
            className="px-4 py-2 flex flex-row items-center bg-blue-900 hover:scale-105 hover:shadow hover:shadow-blue-600 transition-colors duration-300 text-white font-semibold rounded-full"
            onClick={() => router.push("/sign-up")}
          >
            <p className="text-sm">{t("root.top_bar.getStarted")}</p>
            <FaArrowRight className="text-white ml-4 inline" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const BrandingColumn = () => {
  const { t } = useTranslation()
  return (
    <div className="text-center animated fadeInUp md:px-16">
      <div className="relative inline-block">
        <div className="w-20 h-20 p-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <Image
            src={"/wezLogo.png"}
            width={300}
            height={300}
            alt="logo"
            className="h-full w-full"
          />
          <div className="absolute -inset-2 rounded-3xl blur opacity-30 animate-pulse" />
        </div>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-2">
        Wezi Medical Centre
      </h1>
      <p className="text-gray-600 text-lg font-medium">{t('general.slogan')}</p>
      <div className="hidden md:flex max-w-md flex-wrap justify-center gap-8 mt-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-blue-900" />
          <span>{t('general.subSlogan1')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-blue-900" />
          <span>{t('general.subSlogan2')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-blue-900" />
          <span>{t('general.subSlogan3')}</span>
        </div>
      </div>
    </div>
  );
};

export default BrandingColumn;

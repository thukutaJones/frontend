"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const DashboardTopBar = ({
  userEmail,
  userName,
}: {
  userName: string | null | undefined;
  userEmail: string | null | undefined;
}) => {
  const { t } = useTranslation()
  return (
    <div className="w-full bg-white h-[70px] px-8 flex flex-row justify-between items-center">
      <div className="flex flex-row h-[60%] bg-gray-100 w-[30%] items-center px-4 rounded-full gap-2">
        <FaSearch className="text-gray-400" size={15} />
        <input
          className="w-full h-full bg-transparent focus:outline-0 text-black italic text-sm"
          placeholder={t('general.search')}
        />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <LanguageSwitcher />
        <div className="flex flex-row gap-2 cursor-pointer hover:scale-105">
          <div
            className="p-1 rounded-full border-2 border-gray-200 hover:border-blue-900"
            onClick={() => (location.href = `/profile`)}
          >
            <IoMdPerson className="text-gray-400" size={30} />
          </div>
          <p
            className="text-sm text-black font-bold"
            onClick={() => (location.href = `/profile`)}
          >
            {userName} <br />
            <span className="text-xs text-gray-500 font-medium">
              {userEmail}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopBar;

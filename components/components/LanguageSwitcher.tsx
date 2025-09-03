"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/config";
import { RiGlobalLine, RiArrowDownSLine, RiCheckLine } from "react-icons/ri";

const LanguageSwitcher = () => {
  const { i18n: i18nInstance } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ny", name: "Chichewa", flag: "🇲🇼" },
    { code: "tum", name: "Tumbuka", flag: "🇲🇼" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18nInstance.language) ||
    languages[0];

  // Change language and save to localStorage
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // save selection
    setIsOpen(false);
  };

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && savedLang !== i18nInstance.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18nInstance]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center space-x-3 px-4 py-2 rounded-2xl
          transition-all duration-500 group overflow-hidden backdrop-blur-sm
          bg-white hover:bg-gray-50 text-gray-700 hover:text-black 
          hover:shadow-xl hover:scale-[1.02] border border-gray-100
          min-w-[160px]
          ${isOpen ? "shadow-xl scale-[1.02] bg-gray-50 text-black" : ""}
        `}
      >
        {/* Globe icon */}
        <div
          className={`
          relative p-1 rounded-xl transition-all duration-500 group-hover:scale-110
          bg-gray-100 group-hover:bg-white group-hover:shadow-lg
          ${isOpen ? "bg-white shadow-lg scale-110" : ""}
        `}
        >
          <RiGlobalLine
            className={`
            w-4 h-4 transition-all duration-500
            text-gray-600 group-hover:text-blue-900
            ${isOpen ? "text-blue-900" : ""}
          `}
          />
        </div>

        {/* Language info */}
        <div className="flex-1 text-left relative z-10">
          <div className="flex items-center space-x-2">
            <span className="text-sm">{currentLanguage.flag}</span>
            <span className="font-semibold text-xs">
              {currentLanguage.name}
            </span>
          </div>
        </div>

        {/* Arrow icon */}
        <div className="relative z-10 transition-all duration-500">
          <RiArrowDownSLine
            className={`
            w-5 h-5 transition-all duration-500
            text-gray-400 group-hover:text-gray-700
            ${isOpen ? "rotate-180 text-gray-700" : ""}
          `}
          />
        </div>

        {/* Active indicator line */}
        {isOpen && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-900 rounded-r-full animate-in slide-in-from-left-2 duration-500"></div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-transparent z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Container */}
          <div className="absolute w-[250px] top-full left-0 right-0 mt-2 z-70 animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/30 rounded-full -translate-y-10 translate-x-10 animate-pulse"></div>
                <div
                  className="absolute bottom-0 left-0 w-16 h-16 bg-gray-50/30 rounded-full translate-y-8 -translate-x-8 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Language Options */}
              <div className="relative z-10 py-2">
                {languages.map((language, index) => {
                  const isActive = language.code === i18nInstance.language;
                  const isHovered = hoveredItem === language.code;

                  return (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      onMouseEnter={() => setHoveredItem(language.code)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3.5
                        transition-all duration-400 group relative overflow-hidden
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-900"
                            : "hover:bg-gray-50 text-gray-700 hover:text-black"
                        }
                        ${index === 0 ? "rounded-t-2xl" : ""}
                        ${index === languages.length - 1 ? "rounded-b-2xl" : ""}
                        transform-gpu
                      `}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "slideInLeft 0.4s ease-out forwards",
                      }}
                    >
                      <div className="flex items-center space-x-3 relative z-10">
                        {/* Language name */}
                        <div className="text-left">
                          <div className="font-semibold text-sm">
                            {language.name}
                          </div>
                        </div>
                      </div>

                      {/* Check mark for active language */}
                      {isActive && (
                        <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full animate-in zoom-in-50 duration-300">
                          <RiCheckLine className="w-4 h-4 text-white" />
                        </div>
                      )}

                      {/* Hover indicator */}
                      {isHovered && !isActive && (
                        <div className="relative z-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      )}

                      {/* Active border indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-900 rounded-r-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;

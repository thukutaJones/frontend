"use client"

import React from "react";
import { useTranslation } from "react-i18next";
import { RiRobot2Line, RiSparklingFill } from "react-icons/ri";

const WelcomeMessage = ({
  typingText,
  welcomeText,
  type,
}: {
  typingText: string;
  welcomeText: any;
  type: string;
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-8 animate-in fade-in duration-1000">
        {/* Animated Icon */}
        {type === "bot" && (
          <div className="relative mx-auto">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 animate-pulse rounded-full"></div>
              <RiRobot2Line className="w-12 h-12 md:w-16 md:h-16 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-transparent rounded-full"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-40"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-1/2 -right-4 w-2 h-2 bg-blue-500 rounded-full animate-bounce opacity-50"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        )}

        {/* Typing Welcome Text */}
        <div className="space-y-4">
          <div
            className={`${
              type === "bot"
                ? "text-3xl md:text-4xl lg:text-5xl"
                : "text-xl md:text-3xl lg:text-3xl"
            }  font-bold text-gray-900 leading-tight`}
          >
            {typingText?.split("\n").map((line: any, index: any) => (
              <div
                key={index?.toString()}
                className={index === 0 ? "text-blue-900" : ""}
              >
                {line}
                {index === typingText.split("\n").length - 1 && (
                  <span className="animate-blink text-blue-900">|</span>
                )}
              </div>
            ))}
          </div>

          {typingText === welcomeText && type === "bot" && (
            <div className="flex items-center justify-center space-x-2 animate-in fade-in duration-1000 delay-1000">
              <RiSparklingFill className="w-5 h-5 text-blue-500 animate-spin" />
              <p className="text-lg md:text-xl text-gray-600">
                {t('greeting.readyToAssist')}
              </p>
              <RiSparklingFill
                className="w-5 h-5 text-blue-500 animate-spin"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;

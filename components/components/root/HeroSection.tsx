"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const content = t("root.hero_section.content", {
    returnObjects: true,
  }) as Array<{
    title: string;
    description: string;
    img: string;
  }>;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [content.length]);

  return (
    <div className="w-full h-[60vh] md:h-[calc(100vh-70px)] mt-[70px] relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Image
            src={content[index].img}
            alt="Hero Background"
            fill
            className="w-full h-full object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 flex flex-col items-center justify-center px-6 md:px-20 text-center text-white">
            <motion.h1
              key={content[index].title}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="text-3xl md:text-6xl font-bold leading-tight drop-shadow-lg"
            >
              {content[index].title}
            </motion.h1>

            <motion.p
              key={content[index].description}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              className="mt-6 text-sm md:text-xl max-w-3xl font-light text-gray-200"
            >
              {content[index].description}
            </motion.p>

            <motion.div
              key={`buttons-${index}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              className="mt-10 flex gap-5"
            >
              <button className="px-8 py-3 bg-blue-900 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/40 transition duration-500 text-white font-semibold rounded-full">
                {t("root.hero_section.buttons.contactUs")}
              </button>
              <button className="px-8 py-3 bg-gray-50 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/40 transition duration-500 text-blue-900 font-semibold rounded-full">
                {t("root.hero_section.buttons.ourServices")}
              </button>
            </motion.div>
            {/* Smooth Dots Indicator */}
            <div className="absolute bottom-10 w-full flex justify-center gap-3">
              {content.map((_, i) => (
                <motion.div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    index === i ? "bg-blue-500" : "bg-white/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;

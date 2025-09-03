"use client";

import { cardsData } from "@/constants/homeCardsData";
import React from "react";
import HomeCard from "./HomeCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  // Get cards from i18n
  const cards = t("root.services.cards", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    image: string;
  }>;

  return (
    <section className="mt-8 md:mt-28 bg-white w-full flex flex-col items-center px-4 md:px-0" id="services">
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          {t("root.services.header")}
        </h2>
        <div className="w-24 h-1 bg-blue-900 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {t("root.services.description")}
        </p>
      </div>

      {/* Cards */}
      <div className="w-full md:w-[85%] flex flex-col">
        {cards?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HomeCard data={item} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;

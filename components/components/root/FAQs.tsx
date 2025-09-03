"use client";

import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaClock,
  FaShieldAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaAmbulance,
  FaSyringe,
  FaStethoscope,
  FaBaby,
  FaPhone,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  icon: any;
  category: string;
  keywords: string[];
};

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { t } = useTranslation();

  const faqs: FAQ[] = t("root.faqs.entries", { returnObjects: true }) as FAQ[];

  const header = t("root.faqs.header");
  const description = t("root.faqs.description");

  const categories = [
    "All",
    ...Array.from(new Set(faqs?.map((faq: any) => faq.category))),
  ];

  const filteredFAQs = faqs?.filter((faq: any) => {
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.keywords.some((keyword: string) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <FaQuestionCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            {header}
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No FAQs Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openFAQ === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center gap-4 pr-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {faq.category}
                    </span>
                    {openFAQ === faq.id ? (
                      <FaChevronUp className="w-5 h-5 text-blue-600 transition-transform duration-300" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-blue-600 transition-transform duration-300" />
                    )}
                  </div>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  className={`transition-all duration-400 ease-in-out ${
                    openFAQ === faq.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                >
                  <div className="px-8 pb-6 pt-2 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-20">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-slate-600/5"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {t("root.faqs.footer.header")}
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("root.faqs.footer.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  <FaEnvelope className="w-4 h-4" />
                  {t("root.faqs.footer.emailUs")}
                </button>
                <button className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  <FaPhone className="w-4 h-4" />
                  {t("root.faqs.footer.call")}: 0880 33 39 80
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default FAQs;

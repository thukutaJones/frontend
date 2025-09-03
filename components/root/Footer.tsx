/* eslint-disable */
"use client";
import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";


interface FAQ {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
  keywords: string[];
}

const FAQs: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqs: FAQ[] = [
    // ... your FAQ items here
  ];

  const categories = ["All", ...Array.from(new Set(faqs.map((faq) => faq.category)))];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <div className="space-y-6">
          {filteredFAQs.map((faq, index) => (
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
                    {faq.icon}
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
                className={`transition-all duration-400 ease-in-out ${openFAQ === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                role="region"
                aria-labelledby={`faq-question-${faq.id}`}
              >
                <div className="px-8 pb-6 pt-2 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                  <p className="text-gray-700 leading-relaxed text-base">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
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

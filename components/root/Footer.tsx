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
      <div className="max-w-5xl mx-auto flex-grow">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <FaQuestionCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our services, appointments, and facilities.
            Use the search and filters below to quickly find what you're looking for.
          </p>
        </div>

        {/* FAQ Items */}
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
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer className="mt-20 bg-gray-900 text-gray-200 w-full">
        <div className="w-full px-6 sm:px-12 py-12 max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-2">Mapale, Mzuzu, Malawi</p>
            <p className="mb-2">Phone: 0880 33 39 80</p>
            <p>Email: wezi.enquiries@gmail.com</p>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Appointments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm w-full">
          &copy; {new Date().getFullYear()} Wezi Medical Centre. All rights reserved.
        </div>
      </footer>

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

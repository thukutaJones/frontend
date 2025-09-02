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
import ClinicPanorama from "../tour/viewerPara";

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

          {/* 360° Virtual Tour */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Take a Tour of Wezi Clinic
            </h3>
            <ClinicPanorama />
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

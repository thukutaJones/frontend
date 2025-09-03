import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HomeCardProps {
  data: {
    title: string;
    description: string;
    image: string;
  };
  index: number;
  about?: boolean;
}

const HomeCard = ({ data, index, about }: HomeCardProps) => {
  return (
    <div
      className={`w-full flex ${
        about ? "flex-col" : "flex-col-reverse"
      } md:flex-row gap-8 justify-between mt-20 text-gray-700 ${
        index % 2 === 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Left Content */}
      <div className="flex flex-col gap-4 w-full md:w-1/2 h-full">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
          {data?.title}
        </h3>
        <p className="text-base md:text-lg font-light leading-relaxed text-gray-600">
          {data?.description}
        </p>
      </div>

      {/* Right Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={data?.image}
          alt="cover pic"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          quality={90}
          priority
        />
      </div>
    </div>
  );
};

export default HomeCard;

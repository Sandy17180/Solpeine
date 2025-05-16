"use client";

import { useState } from "react";
import Image from "next/image";

function TestimonialCard({ name, quote, fontClass, profile }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const preview = quote.slice(0, 200);
  const isLong = quote.length > 200;

  const toggleExpansion = () => {
    if (isLong) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#BFB4B4] to-[#F7F7F7] shadow-[0_6px_23.5px_0_rgba(0,0,0,0.25)] rounded-3xl px-[51px] py-8 flex flex-col items-center mx-auto transition-all duration-300 ease-in-out max-w-[400px] border-[#433A3A] border-4 gap-4">
      {/* Quote Icon */}
      <div className="w-full flex justify-start">
        <Image
          src="/apostrophe.svg"
          alt="icon"
          width={38}
          height={38}
          className="text-orange-500"
        />
      </div>

      {/* Content */}
      <div
        className={`flex flex-col items-center justify-between ${
          isExpanded ? "gap-8" : "gap-20"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Quote Text */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={toggleExpansion}
        >
          <p
            className={`text-center text-lg text-[#433a3a] ${fontClass} tracking-wider font-medium leading-6`}
          >
            "{isExpanded ? quote : preview + "..."}"
          </p>

          {!isExpanded && isLong && (
            <span className="text-[#433a3a] text-lg tracking-wider font-bold leading-6 underline mt-6">
              see more
            </span>
          )}
        </div>

        {/* Name and Profile */}
        <div className="flex flex-col items-center">
          <p
            className={`text-xl! font-bold! text-[#433a3a] ${fontClass} leading-6 tracking-wider`}
          >
            {name}
          </p>
          <p className={`text-base italic! text-[#433a3a] ${fontClass}`}>
            {profile}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;

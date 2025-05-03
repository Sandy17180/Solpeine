"use client";

import { useState } from "react";
import Image from "next/image";
function TestimonialCard({ name, quote, fontClass, fontClass1, profile }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const preview = quote.slice(0, 200);
  const isLong = quote.length > 200;

return (
  <div className="bg-gradient-to-b from-[#BFB4B4] to-[#F7F7F7] shadow-lg rounded-2xl px-6 py-8 flex flex-col items-center mx-auto transition-all duration-300 ease-in-out max-w-[399px] border-[#433A3A] border-2">
    {/* Quote Icon */}
    <div className="w-full flex justify-start mb-2">
      <Image
        src="/apostrophe.svg"
        alt="icon"
        width={38}
        height={38}
        className="rotate-180 text-orange-500"
      />
    </div>

    {/* Content */}
    <div className="flex flex-col items-center justify-between gap-14">
      {/* Quote Text */}
      <div className="flex flex-col items-center">
        <p className={`text-center text-md text-gray-700 ${fontClass}`}>
          "{isExpanded ? quote : preview + "..."}"
        </p>
        {isLong && (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-black text-sm underline cursor-pointer mt-2"
          >
            {isExpanded ? "See less" : "See more"}
          </span>
        )}
      </div>

      {/* Name and Profile */}
      <div className="flex flex-col items-center">
        <p className={`text-xl font-bold text-black ${fontClass1}`}>
          {name}
        </p>
        <p className={`text-base italic text-black ${fontClass}`}>
          {profile}
        </p>
      </div>
    </div>
  </div>
);
}

export default TestimonialCard;

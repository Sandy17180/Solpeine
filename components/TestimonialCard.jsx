"use client";

import { useState } from "react";
import Image from "next/image";

function TestimonialCard({ name, quote, fontClass, profile }) {
  // const [isExpanded, setIsExpanded] = useState(false);
  // const preview = quote.slice(0, 200);
  // const isLong = quote.length > 200;

  // const toggleExpansion = () => {
  //   if (isLong) {
  //     setIsExpanded((prev) => !prev);
  //   }
  // };

  return (
    <div className="bg-[#f3e6e3] shadow-[6px_0_25.44px_0_rgba(0,0,0,0.14)] rounded-3xl border-[#f3e6e3] border-2 px-8 py-5 flex flex-col items-start transition-all duration-300 ease-in-out w-[587px] h-[333px] justify-center gap-5">
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
        className={`flex flex-col justify-between gap-8 transition-all duration-300 ease-in-out`}
      >
        {/* Quote Text */}
        <p
          className={`self-stretch text-lg text-[#433a3a] ${fontClass} tracking-wider font-medium leading-6`}
        >
          "{quote}"
        </p>

        {/* Name and Profile */}
        <div className="flex flex-col items-start gap-[10px]">
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

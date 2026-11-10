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
    <div className="bg-[#f3e6e3] shadow-[6px_0_25.44px_0_rgba(0,0,0,0.14)] rounded-3xl border-[#f3e6e3] md:border-2 md:px-8 md:py-5 py-2 px-4 flex flex-col items-start transition-all duration-300 ease-in-out md:w-[600px] md:h-[333px] w-[303px] h-[167px] justify-center md:gap-5">
      {/* Quote Icon */}
      <div className="w-full flex justify-start">
        <Image
          src="/apostrophe.svg"
          alt="icon"
          width={38}
          height={38}
          unoptimized
          className="text-orange-500 md:w-[38px] md:h-[38px] w-[20px] h-[20px] md:mb-0 mb-1"
        />
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-between md:gap-8 gap-1 transition-all duration-300 ease-in-out`}
      >
        {/* Quote Text */}
        <p
          className={`self-stretch md:text-lg text-[8px] text-[#433a3a] ${fontClass} tracking-wider font-medium md:leading-6 leading-3.5`}
        >
          "{quote}"
        </p>

        {/* Name and Profile */}
        <div className="flex flex-col items-start md:gap-[10px]">
          <p
            className={`md:!text-xl text-[10px] !font-bold text-[#433a3a] ${fontClass} leading-6 tracking-wider`}
          >
            {name}
          </p>
          <p className={`md:text-base text-[10px] !italic text-[#433a3a] ${fontClass}`}>
            {profile}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;

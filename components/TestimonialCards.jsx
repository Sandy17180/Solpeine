"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function TestimonialCard({
  name,
  quote,
  fontClass,
  profile,
  genre,
  isActive = false,
  onClick,
}) {
  return (
    <motion.div
      onClick={onClick}
      className={`bg-[#f3e6e3] rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 w-full min-h-[240px] md:min-h-[280px] gap-4 relative text-left ${
        onClick ? "cursor-pointer" : ""
      } ${
        isActive
          ? "border-2 border-[#d94a27] shadow-[0_10px_30px_rgba(217,74,39,0.18)] scale-[1.01]"
          : "border-2 border-transparent shadow-md hover:shadow-xl hover:border-[#d94a27]/30"
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Top Header: Quote Icon + Genre Badge */}
      <div className="w-full flex items-center justify-between">
        <Image
          src="/apostrophe.svg"
          alt="icon"
          width={32}
          height={32}
          className="text-orange-500 w-6 h-6 md:w-8 md:h-8"
        />
        {genre && (
          <span className="text-[11px] md:text-xs font-semibold px-3 py-1 rounded-full bg-[#d94a27]/10 text-[#d94a27] tracking-wider uppercase">
            {genre}
          </span>
        )}
      </div>

      {/* Quote Text */}
      <p
        className={`${fontClass} text-[#4a4a4a] text-sm md:text-base leading-relaxed tracking-wide flex-1`}
        style={{
          fontStyle: "normal",
        }}
      >
        "{quote}"
      </p>

      {/* Name and Profile */}
      <div className="flex flex-col items-start pt-3 border-t border-[#d94a27]/15">
        <p
          className={`${fontClass} text-[#2d2d2d] text-base md:text-lg font-bold tracking-wide`}
        >
          {name}
        </p>
        <p
          className={`${fontClass} text-[#666] text-xs md:text-sm italic font-medium`}
        >
          {profile}
        </p>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;

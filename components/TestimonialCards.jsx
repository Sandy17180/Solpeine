"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function TestimonialCard({ name, quote, fontClass, profile }) {
  return (
    <motion.div
      className="bg-[#f3e6e3] rounded-xl border-[#f3e6e3] md:border-2 px-4 py-6 flex flex-col items-start transition-all duration-300 ease-in-out w-full max-w-[440px] min-h-[180px] md:min-h-[320px] justify-center gap-4"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Quote Icon */}
      <div className="w-full flex justify-start">
        <Image
          src="/apostrophe.svg"
          alt="icon"
          width={38}
          height={38}
          className="text-orange-500 w-5 h-5 md:w-9 md:h-9"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between gap-2 md:gap-6 transition-all duration-300 ease-in-out">
        {/* Quote Text */}
        <p
          className={`${fontClass} text-[#505050] font-medium`}
          style={{
            textAlign: "justify",
            fontStyle: "normal",
            fontSize: "clamp(14px, 2vw, 18px)",
            lineHeight: "1.5",
            letterSpacing: "0.05em",
          }}
        >
          "{quote}"
        </p>

        {/* Name and Profile */}
        <div className="flex flex-col items-start gap-1 md:gap-2">
          <p
            className={`${fontClass} text-[#505050]`}
            style={{
              textAlign: "left",
              fontSize: "clamp(16px, 2.2vw, 20px)",
              fontWeight: 700,
              lineHeight: "1.4",
              letterSpacing: "0.03em",
              fontStyle: "normal",
            }}
          >
            {name}
          </p>

          <p
            className={`${fontClass} text-[#505050] border-b-2 border-red-600`}
            style={{
              textAlign: "left",
              fontSize: "clamp(14px, 1.8vw, 16px)",
              fontWeight: 400,
              lineHeight: "1.4",
              letterSpacing: "0.03em",
              fontStyle: "italic",
            }}
          >
            {profile}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;

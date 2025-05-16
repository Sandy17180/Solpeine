"use client";

import Image from "next/image";
import { Lato } from "next/font/google";
import { testimonials } from "@/data/testimonials"; // Make sure this file exists and is exporting `testimonials`
import TestimonialCard from "./TestimonialCard";
import { useState } from "react";

const lato = Lato({ subsets: ["latin, italic"], weight: ["400"] });

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(3);

  // const handleLoadMore = () => {
  //   setVisibleCount((prevCount) => prevCount + 3);
  // };

  // const isMoreToShow = visibleCount < testimonials.length;

  return (
    <div className="py-[72px] bg-[#FAF4EF]">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-20">
          <Image
            src="/testimonial.png"
            alt="ECG line under heading"
            width={480}
            height={115}
            className="h-[115px] w-auto"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto items-start">
        {testimonials.slice(0, visibleCount).map((t, index) => (
          <TestimonialCard
            key={index}
            name={t.name}
            quote={t.quote}
            fontClass={lato.className}
            profile={t.profile}
          />
        ))}
      </div>

      {/* {isMoreToShow && (
        <div className="text-center mt-[72px]">
          <button
            onClick={handleLoadMore}
            className="bg-[#D94A27] text-white px-6 py-2 rounded-full text-sm shadow-[0_6px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] duration-300 cursor-pointer"
          >
            View more testimonials
          </button>
        </div>
      )} */}
    </div>
  );
}

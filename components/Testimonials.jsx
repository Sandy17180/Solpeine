"use client";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";
import { useState } from "react";
import Link from "next/link";
import { lato } from "@/lib/fonts";

export default function Testimonials() {
  const [positions, setPositions] = useState([0, 1, 2]);
  const positionStyles = [
    "md:translate-x-[-250px] translate-x-[-50px] scale-80 z-10 opacity-90",
    "translate-x-0 scale-90 z-20 opacity-95",
    "md:translate-x-[250px] translate-x-[50px] scale-100 z-30 opacity-100",
  ];

  const handleCardClick = (clickedIndex) => {
    setPositions((prev) => {
      const currentPos = prev[clickedIndex];
      if (currentPos === 2) return prev;

      return prev.map((pos, i) => {
        if (i === clickedIndex) return 2;
        if (currentPos === 1) {
          if (pos === 2) return 1;
          return pos;
        } else {
          if (pos === 2) return 1;
          if (pos === 1) return 0;
          return pos;
        }
      });
    });
  };

  return (
    <div className="md:py-[72px] py-[16px] overflow-x-hidden">
      <div className="text-center md:mb-14">
        <div className="flex justify-center md:mb-20 mb-[10px]">
          <Image
            src="/testimonial.png"
            alt="Heading ECG Line"
            width={480}
            height={115}
            priority
            className="h-[60px] md:h-[115px] w-auto"
          />
        </div>
      </div>

      <div className="relative flex justify-center items-center md:min-h-[400px] min-h-[236px] md:max-w-7xl max-w-3xl md:mx-auto mx-[15px] gap-10">
        {testimonials.slice(0, 3).map((testimonial, i) => (
          <div
            key={i}
            onClick={() => handleCardClick(i)}
            className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${
              positionStyles[positions[i]]
            }`}
          >
            <TestimonialCard
              name={testimonial.name}
              quote={testimonial.quote}
              profile={testimonial.profile}
              fontClass={lato.className}
            />
          </div>
        ))}
      </div>

      <Link href="/testimonials" className="block">
        <button className="mt-4 sm:mt-6 md:mt-12 px-6 sm:px-8 lg:px-10 py-2.5 border-2 border-[#d94a27] hover:border-[#9e3c23] text-sm sm:text-base lg:text-lg text-white bg-[#d94a27] hover:bg-[#9e3c23] transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-xl hover:shadow-black/70 rounded-sm mx-auto block cursor-pointer">
          View More..
        </button>
      </Link>
    </div>
  );
}

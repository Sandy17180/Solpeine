"use client";
import Image from "next/image";
import { Lato } from "next/font/google";
import { testimonials } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";
import { useState } from "react";

const lato = Lato({ subsets: ["latin"], weight: ["400"] });

export default function Testimonials() {
  const [positions, setPositions] = useState([0, 1, 2]);
  const positionStyles = [
    "md:translate-x-[-250px] translate-x-[-50px] scale-80 z-10 opacity-90",
    "translate-x-0 scale-90 z-20 opacity-95",
    "md:translate-x-[250px] translate-x-[50px] scale-100 z-30 opacity-100",
  ];

  const handleCardClick = (clickedIndex) => {
    setPositions((prev) => {
      const newPositions = [...prev];
      const clickedCardPosition = newPositions[clickedIndex];

      const updated = newPositions.map((pos, i) => {
        if (i === clickedIndex) return 2;
        if (pos === 2) return 1;
        if (pos === 1) return 0;
        return 0;
      });

      return updated;
    });
  };

  return (
    <div className="md:py-[72px] py-[16px] overflow-x-hidden">
      <div className="text-center md:mb-14">
        <div className="flex justify-center md:mb-20 md-[10px]">
          <Image
            src="/testimonial.png"
            alt="Heading ECG Line"
            width={480}
            height={115}
            className="h-[60px] md:h-[115px] w-auto"
          />
        </div>
      </div>

      <div className="relative flex justify-center items-center md:min-h-[360px] min-h-[236px] md:max-w-7xl max-w-3xl md:mx-auto mx-[15px] mr-[50px] gap-10">
        {testimonials.map((testimonial, i) => (
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
    </div>
  );
}

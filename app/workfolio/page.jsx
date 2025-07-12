"use client";

import { useState } from "react";
import { genres, genreImages, genreCaption } from "@/data/genres";
import Link from "next/link";
import Image from "next/image";

export default function WorkfolioPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  

  return (
    <div className="grid md:grid-cols-3 lg:gap-[62px] gap-x-[10px] gap-y-[27px] lg:px-20 px-3.5 lg:py-[62px] py-[10px] w-full grid-cols-2">
      {genres.map((genre, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const hoveredRow =
          hoveredIndex !== null ? Math.floor(hoveredIndex / 3) : null;
        const hoveredCol = hoveredIndex !== null ? hoveredIndex % 3 : null;

        let shiftClass = "";

        if (
          hoveredIndex !== null &&
          row === hoveredRow &&
          hoveredIndex !== index
        ) {
          if (hoveredCol === 0 && col === 1) shiftClass = "translate-x-3";
          else if (hoveredCol === 0 && col === 2) shiftClass = "translate-x-6";
          else if (hoveredCol === 1 && col === 0) shiftClass = "-translate-x-3";
          else if (hoveredCol === 1 && col === 2) shiftClass = "translate-x-3";
          else if (hoveredCol === 2 && col === 0) shiftClass = "-translate-x-6";
          else if (hoveredCol === 2 && col === 1) shiftClass = "-translate-x-3";
        }

        return (
          <div
            key={genre}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative overflow-hidden lg:h-[295px] lg:w-[425px] w-auto h-[131px] shadow-md transition-all duration-300 flex items-center justify-center group
              ${hoveredIndex === index ? "scale-110 z-10" : ""}
              ${shiftClass}`}
          >
            <Link
            
              href={`/workfolio/${genre}`}
              className="h-full w-full flex items-center justify-center bg-black"
            >
              <Image
                src={genreImages[genre]}
                alt={genre}
                fill
                className="object-contain transition duration-300"
              />

              <div className="absolute inset-0 transition duration-300" />

              <div className="absolute w-full h-auto flex items-center justify-center backdrop-blur group-hover:opacity-0 transition-all duration-500">
                <Image
                  src={genreCaption[genre]}
                  alt={`${genre} caption`}
                  width={416}
                  height={80}
                  className="object-none md:w-[416px] md:h-[80px] h-[45px] w-[180px] mb-0"
                />
              </div>
            </Link>
          </div>
        );
      })}

    </div>
  );
}

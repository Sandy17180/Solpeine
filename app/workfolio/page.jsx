"use client";

import { useState } from "react";
import { genres, genreImages, genreCaption } from "@/data/genres";
import { Taprom } from "next/font/google";
import cameraline from "@/public/cameraLine.svg";
import Link from "next/link";
import Image from "next/image";

const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });

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
          if (hoveredCol === 0 && col === 1) shiftClass = "lg:translate-x-3";
          else if (hoveredCol === 0 && col === 2)
            shiftClass = "lg:translate-x-6";
          else if (hoveredCol === 1 && col === 0)
            shiftClass = "lg:-translate-x-3";
          else if (hoveredCol === 1 && col === 2)
            shiftClass = "lg:translate-x-3";
          else if (hoveredCol === 2 && col === 0)
            shiftClass = "lg:-translate-x-6";
          else if (hoveredCol === 2 && col === 1)
            shiftClass = "lg:-translate-x-3";
        }

        return (
          <div
            key={genre}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative overflow-hidden lg:h-[295px] lg:w-[425px] w-auto h-[131px] shadow-md transition-all duration-300 flex items-center justify-center group
  ${hoveredIndex === index ? "lg:scale-110 lg:z-10" : ""}
  ${hoveredIndex !== null ? shiftClass && "lg:" + shiftClass : ""}
`}
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

              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:opacity-0">
                <div className="backdrop-blur-md bg-[#00000022] px-4 md:pt-1 md:py-0 py-1 w-full flex items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    <p
                      className={`${taprom.className} lg:text-[38px] md:text-[30px] text-[20px] text-white lg:leading-[50px] md:leading-[40px] leading-[25px] items-center text-center md:max-w-[200px] max-w-[100px] `}
                    >
                      {genreCaption[index] ||
                        genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </p>
                    {/* Underline with attached SVG */}
                    <div className="relative flex items-end md:-mt-6 -mt-1.5">
                      <Image
                        src={cameraline}
                        alt="decor"
                        width={340}
                        height={40}
                        className="md:ml-4 ml-2 text-white md:w-[340px] md:h-[40px] "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

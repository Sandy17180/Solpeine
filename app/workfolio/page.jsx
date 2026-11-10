"use client";

import { genres, genreImages, genreCaption } from "@/data/genres";
import { taprom } from "@/lib/fonts";
import cameraline from "@/public/cameraLine.svg";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// Memoized Card Component for performance
const GenreCard = React.memo(
  ({
    index,
    genre,
    hoveredIndex,
    setHoveredIndex,
    shiftClass,
  }) => {
    const caption =
      genreCaption[index] || genre.charAt(0).toUpperCase() + genre.slice(1);

    return (
      <motion.div
        key={genre}
        variants={cardVariants}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={`
          relative overflow-hidden 
          h-[160px] sm:h-[200px] md:h-[240px] lg:h-[295px]
          w-full shadow-md transition-all duration-300 
          flex items-center justify-center group
          ${hoveredIndex === index ? "lg:scale-110 lg:z-10" : ""}
          ${hoveredIndex !== null ? shiftClass : ""}
        `}
      >
        <Link
          href={`/workfolio/${genre}`}
          className="h-full w-full flex items-center justify-center bg-black"
        >
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{
              aspectRatio: "16 / 10",
            }}
          >
            <Image
              src={genreImages[genre]}
              alt={genre}
              fill
              priority={index < 3}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-contain transition duration-300 rounded-b-2xl"
            />
          </div>

          {/* Caption */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:opacity-0">
            <div className="backdrop-blur-md bg-[#00000022] px-4 py-2 w-full h-full flex items-center justify-center">
              <div className="relative flex flex-col items-center text-center">
                <p
                  className={`
                    ${taprom.className}
                    text-white
                    text-[16px] sm:text-[22px] md:text-[28px] lg:text-[38px]
                    leading-tight sm:leading-[32px] md:leading-[40px] lg:leading-[50px]
                    max-w-[180px] sm:max-w-[220px]
                  `}
                >
                  {caption}
                </p>

                {/* Decorative Line */}
                <div className="relative flex items-end mt-1 md:-mt-4">
                  <Image
                    src={cameraline}
                    alt="decor"
                    width={260}
                    height={30}
                    priority={index < 3}
                    style={{ width: "auto", height: "auto" }}
                    className="sm:w-[300px] md:w-[340px] lg:w-[380px] "
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
);

export default function WorkfolioPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Memoize layout & shift logic to avoid recomputation
  const computedCards = useMemo(() => {
    return genres.map((genre, index) => {
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
        else if (hoveredCol === 0 && col === 2) shiftClass = "lg:translate-x-6";
        else if (hoveredCol === 1 && col === 0)
          shiftClass = "lg:-translate-x-3";
        else if (hoveredCol === 1 && col === 2) shiftClass = "lg:translate-x-3";
        else if (hoveredCol === 2 && col === 0)
          shiftClass = "lg:-translate-x-6";
        else if (hoveredCol === 2 && col === 1)
          shiftClass = "lg:-translate-x-3";
      }

      return (
        <GenreCard
          key={genre}
          index={index}
          genre={genre}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          shiftClass={shiftClass}
        />
      );
    });
  }, [hoveredIndex]);

  return (
    <motion.div
      className="
        grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 
        gap-3 sm:gap-4 md:gap-6 lg:gap-[62px]
        px-3.5 md:px-10 lg:px-20
        py-4 md:py-8 lg:py-[62px]
        w-full
      "
      variants={containerVariants}
      initial="hidden"
      animate="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {computedCards}
    </motion.div>
  );
}

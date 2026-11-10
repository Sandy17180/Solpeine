"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const DEFAULT_FALLBACK_IMAGES = [
  "/clientLogos/josco-jewellers.jpg",
  "/clientLogos/rove-clothing.jpg",
  "/clientLogos/illuminating-windows.png",
  "/clientLogos/tec.jpeg",
  "/clientLogos/zenable-me.png",
];

const AdvancedCameraReel = ({
  images = [],
  speed = 35, // seconds for a full loop
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const clientImages = useMemo(() => {
    return images && images.length > 0 ? images : DEFAULT_FALLBACK_IMAGES;
  }, [images]);

  // Create an unbreakable continuous track:
  // 1. Ensure the base set has at least 10 items so it's always wider than 4K screens
  // 2. Double it ([...baseSet, ...baseSet]) so translating from 0% to -50% is 100% seamless
  const duplicatedImages = useMemo(() => {
    if (!clientImages || clientImages.length === 0) return [];
    let base = [...clientImages];
    while (base.length < 10) {
      base = [...base, ...clientImages];
    }
    return [...base, ...base];
  }, [clientImages]);

  if (duplicatedImages.length === 0) {
    return (
      <div className="w-full h-32 sm:h-40 bg-black animate-pulse" />
    );
  }

  return (
    <div
      className="w-full relative overflow-hidden bg-black py-2 sm:py-3 select-none"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Edge Gradient Vignettes for Seamless Entry/Exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 md:w-32 bg-gradient-to-r from-[#F5F1EA] via-[#F5F1EA]/50 to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 md:w-32 bg-gradient-to-l from-[#F5F1EA] via-[#F5F1EA]/50 to-transparent z-20" />

      {/* Film Reel Strip - Animated Continuous Loop */}
      <motion.div
        className="flex items-center w-max will-change-transform"
        animate={{
          x: isPaused ? undefined : ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedImages.map((image, index) => {
          const clientIndex = (index % clientImages.length) + 1;

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-shrink-0 bg-black px-2 sm:px-3 md:px-4"
            >
              {/* Top Film Sprockets for this frame */}
              <div className="w-full flex justify-between items-center py-1 sm:py-1.5 px-1 sm:px-2">
                <div className="w-2.5 h-2 sm:w-3.5 sm:h-2.5 md:w-4 md:h-3 bg-[#F5F1EA] rounded-[2px]" />
                <div className="w-2.5 h-2 sm:w-3.5 sm:h-2.5 md:w-4 md:h-3 bg-[#F5F1EA] rounded-[2px]" />
                <div className="w-2.5 h-2 sm:w-3.5 sm:h-2.5 md:w-4 md:h-3 bg-[#F5F1EA] rounded-[2px]" />
              </div>

              {/* Film Frame Cell (Logo) */}
              <div className="relative p-1 sm:p-1.5 bg-[#141414] border-x border-[#2a2a2a] rounded-sm group transition-transform duration-300 hover:scale-[1.03]">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 relative bg-white rounded-md p-2.5 sm:p-3 flex items-center justify-center shadow-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Client ${clientIndex}`}
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 176px"
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Bottom Film Sprockets for this frame */}
              <div className="w-full flex justify-between items-center py-1 sm:py-1.5 px-1 sm:px-2">
                <div className="w-2.5 h-2 sm:w-3.5 sm:h-2.5 md:w-4 md:h-3 bg-[#F5F1EA] rounded-[2px]" />
                <div className="w-2.5 h-2 sm:w-3.5 sm:h-2.5 md:w-4 md:h-3 bg-[#F5F1EA] rounded-[2px]" />
                <div className="w-2.5 h-2 sm:w-3.5 sm:h-2.5 md:w-4 md:h-3 bg-[#F5F1EA] rounded-[2px]" />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AdvancedCameraReel;

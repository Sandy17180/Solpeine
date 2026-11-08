"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const AdvancedCameraReel = ({
  images = [],
  speed = 20, // seconds for a full loop
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const reelRef = useRef(null);
  const [reelWidth, setReelWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const DEFAULT_FALLBACK_IMAGES = [
    "/Portrait.jpg",
    "/Fashion.jpg",
    "/Girl.jpg",
    "/Katie.jpeg",
    "/man.png",
    "/man_standing.jpg",
    "/Headshot.jpg",
    "/fashionPortrait.jpg",
    "/image8.jpg",
    "/image9.jpg",
    "/image10.jpg",
    "/image11.jpg",
  ];

  const clientImages = images && images.length > 0 ? images : DEFAULT_FALLBACK_IMAGES;
  const duplicatedImages =
    clientImages.length > 0
      ? [
          ...clientImages,
          ...clientImages,
          ...clientImages,
          ...clientImages,
          ...clientImages,
        ]
      : [];

  // measure reel width once rendered
  useEffect(() => {
    if (reelRef.current && clientImages.length > 0) {
      // Use requestAnimationFrame to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const width = reelRef.current.scrollWidth / 5;
        setReelWidth(width);
        setIsAnimating(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [clientImages]);

  return (
    <div className="w-full overflow-hidden py-8 px-4 sm:px-6 md:px-12">
      {duplicatedImages.length === 0 ? (
        <div className="h-24 sm:h-32 md:h-40 bg-gray-200 rounded-lg animate-pulse" />
      ) : (
        <>
          <div
            className="relative"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          >
            {/* Film perforations top */}
            <div className="absolute top-0 left-0 right-0 h-4 sm:h-5 md:h-6 bg-black flex items-center z-10 overflow-hidden">
              <motion.div
                className="flex space-x-2 sm:space-x-3"
                animate={
                  isAnimating
                    ? { x: isPaused ? undefined : [0, -reelWidth] }
                    : {}
                }
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: speed,
                    ease: "linear",
                  },
                }}
              >
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-[#F5F1EA] rounded-sm flex-shrink-0"
                  ></div>
                ))}
              </motion.div>
            </div>

            {/* Main film container */}
            <div className="relative bg-black py-4 sm:py-6 overflow-hidden">
              <motion.div
                ref={reelRef}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6"
                animate={
                  isAnimating
                    ? { x: isPaused ? undefined : [0, -reelWidth] }
                    : {}
                }
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: speed,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 relative group cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      opacity: {
                        duration: 0.6,
                        delay: (index % clientImages.length) * 0.08,
                        ease: "easeOut",
                      },
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                      <div
                        className="
                        w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40
                        relative overflow-hidden rounded-md
                      "
                      >
                        <Image
                          src={image}
                          alt={`Client ${(index % clientImages.length) + 1}`}
                          fill
                          sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 160px"
                          className="object-cover transition-all duration-300 group-hover:brightness-110"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Film perforations bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-5 md:h-6 bg-black flex items-center z-10 overflow-hidden">
              <motion.div
                className="flex space-x-2 sm:space-x-3"
                animate={
                  isAnimating
                    ? { x: isPaused ? undefined : [0, -reelWidth] }
                    : {}
                }
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: speed,
                    ease: "linear",
                  },
                }}
              >
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-[#F5F1EA] rounded-sm flex-shrink-0"
                  ></div>
                ))}
              </motion.div>
            </div>

            {/* Shadow effects */}
            <div className="absolute left-0 top-4 sm:top-6 bottom-4 sm:bottom-6 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-gray-900 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-4 sm:top-6 bottom-4 sm:bottom-6 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-gray-900 to-transparent z-20 pointer-events-none"></div>
          </div>

          {pauseOnHover && (
            <p className="text-center text-xs sm:text-sm mt-2 text-gray-600">
              Hover to pause
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AdvancedCameraReel;

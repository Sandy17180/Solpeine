"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import arrowRight from "@/public/arrowRight.svg";
import arrowLeft from "@/public/arrowLeft.svg";

const HeroImagesClient = ({ initialImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);
  const images = initialImages;
  const total = images.length;

  const startSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }, 3000);
  };

  const stopSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startSlide();
    return () => stopSlide();
  }, [total]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + total) % total);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full md:h-[720px] h-[209px] overflow-hidden"
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
      priority={true}
      fetchPriority="high"
      
    >
      {/* All Slides - rendered absolutely */}
      <div className="relative w-full h-full pb-auto hover:cursor-pointer">
        {images.map((photo, index) => (
          <Image
            key={photo.id || index}
            src={photo.src}
            alt={photo.alt || `Slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`absolute top-0 left-0 w-full object-cover object-bottom transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 md:left-[42px] left-2 transform -translate-y-1/2 bg-white/40 text-white p-2 rounded-full hover:bg-white/60 z-20 cursor-pointer md:w-[60px] md:h-[60px] h-6 w-6 flex items-center justify-center"
        aria-label="Previous Slide"
      >
        <Image src={arrowLeft} alt="arrow left" priority aria-label="Previous Slide"/>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 md:right-[42px] right-2 transform -translate-y-1/2 bg-white/40 text-white p-2 rounded-full hover:bg-white/60 z-20 cursor-pointer md:w-[60px] md:h-[60px] h-6 w-6 flex items-center justify-center"
        aria-label="Next Slide"
      >
        <Image src={arrowRight} alt="arrow right" priority aria-label="Next Slide"/>
      </button>

      {/* Dots */}
      <div className="absolute md:bottom-[86px] bottom-[7px] left-1/2 transform -translate-x-1/2 flex md:gap-2 gap-[6px] z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`md:w-[17px] md:h-[17px] w-[10px] h-[10px] rounded-full transition-colors ${
              index === currentIndex
                ? "bg-white/80 border-[1px] shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroImagesClient;

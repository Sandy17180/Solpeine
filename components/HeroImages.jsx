"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import arrowRight from "@/public/arrowRight.svg";
import arrowLeft from "@/public/arrowLeft.svg";

const images = [
  "/image1.jpeg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
  "/image7.png",
  "/image8.png",
  "/image9.png",
  "/image10.png",
  "/image11.png",
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);
  const total = images.length;

  const startSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }, 5000);
  };

  const stopSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startSlide();
    return () => stopSlide();
  }, []);

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
      className="relative w-full h-[639px] overflow-hidden"
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
    >
      {/* All Slides - rendered absolutely */}
      <div className="relative w-full h-full pb-auto">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className={`absolute top-0 left-0 w-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-[42px] transform -translate-y-1/2 bg-white/40 text-white p-2 rounded-full hover:bg-white/60 z-20 cursor-pointer w-[60px] h-[60px] flex items-center justify-center"
        aria-label="Previous Slide"
      >
        <Image src={arrowLeft} alt="arrow left"/>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-[42px] transform -translate-y-1/2 bg-white/40 text-white p-2 rounded-full hover:bg-white/60 z-20 cursor-pointer w-[60px] h-[60px] flex items-center justify-center"
        aria-label="Next Slide"
      >
        <Image src={arrowRight} alt="arrow right"/>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-[17px] h-[17px] rounded-full transition-colors ${
              index === currentIndex
                ? "bg-white border-[1px] shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

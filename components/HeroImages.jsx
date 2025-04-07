"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/image1.jpeg",
  "/image2.jpeg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
  "/image6.jpg",
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);
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
      className="relative w-full h-[70vh] overflow-hidden px-2"
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
    >
      {/* All Slides - rendered absolutely */}
      <div className="relative w-full h-full">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 z-20 cursor-pointer"
        aria-label="Previous Slide"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 z-20 cursor-pointer"
        aria-label="Next Slide"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

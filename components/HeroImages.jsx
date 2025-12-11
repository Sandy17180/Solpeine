"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import arrowRight from "@/public/arrowRight.svg";
import arrowLeft from "@/public/arrowLeft.svg";

// Fallback local image list (used if Cloudinary isn't configured or returns nothing)
const FALLBACK_IMAGES = [
  "/image6.jpg",
  "/image9.jpg",
  "/statue.jpg",
  "/image10.jpg",
  "/image12.jpg",
  "/image16.png",
  "/image18.png",
  "/image21.png",
  "/image45.png",
];

function parseNameToAlt(name) {
  const n = String(name || "");
  const base = n.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);
  // normalize fallback strings into objects {src, alt}
  const [images, setImages] = useState(
    FALLBACK_IMAGES.map((s, i) => ({
      id: i + 1,
      src: s,
      alt: parseNameToAlt(s),
    }))
  );
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
    // Fetch runtime list (Cloudinary-backed) for hero images. If the API fails,
    // the component will continue to use the local `FALLBACK_IMAGES`.
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/hero-images");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted || !Array.isArray(data)) return;
        // API may return an array of strings or objects; normalize to objects {id, src, alt}
        const normalized = data
          .map((it, idx) => {
            if (typeof it === "string")
              return { id: idx + 1, src: it, alt: parseNameToAlt(it) };
            if (it && (it.src || it.public_id || it.url)) {
              return {
                id: it.id || idx + 1,
                src: it.src || it.url || it.public_id,
                alt: it.alt || parseNameToAlt(it.src || it.public_id || it.url),
              };
            }
            return null;
          })
          .filter(Boolean);
        if (normalized.length > 0) setImages(normalized);
      } catch (err) {
        // keep fallback
      }
    })();
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
      className="relative w-full md:h-[720px] h-[209px] overflow-hidden"
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
    >
      {/* All Slides - rendered absolutely */}
      <div className="relative w-full h-full pb-auto">
        {images.map((photo, index) => (
          <Image
            key={photo.id || index}
            src={photo.src}
            alt={photo.alt || `Slide ${index + 1}`}
            fill
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
        <Image src={arrowLeft} alt="arrow left" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 md:right-[42px] right-2 transform -translate-y-1/2 bg-white/40 text-white p-2 rounded-full hover:bg-white/60 z-20 cursor-pointer md:w-[60px] md:h-[60px] h-6 w-6 flex items-center justify-center"
        aria-label="Next Slide"
      >
        <Image src={arrowRight} alt="arrow right" />
      </button>

      {/* Dots */}
      <div className="absolute md:bottom-[86px] bottom-[7px] left-1/2 transform -translate-x-1/2 flex md:gap-2 gap-[6px] z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`md:w-[17px] md:h-[17px] w-[10px] h-[10px] rounded-full transition-colors ${
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

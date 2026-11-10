"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { taprom } from "@/lib/fonts";
import cameraline from "@/public/cameraline-colored.svg";
import ThumbnailCarousel from "./ThumbnailCarousel";

const initialFashionImages = [
  { id: 1, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 2, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 3, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 4, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 5, image: "/fashionPortrait.jpg", orientation: "portrait" },
];

export default function FashionPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [fashionImages, setFashionImages] = useState(initialFashionImages);

  // Keep original mobile behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev + 1 >= fashionImages.length ? 0 : prev + 1
    );

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? fashionImages.length - 1 : prev - 1
    );

  // SAME mobile / desktop sizes as your original design
  const getMainImageSize = (orientation, isMobile) => {
    if (isMobile) {
      return orientation === "portrait"
        ? { width: 200, height: 400 }
        : { width: 400, height: 200 };
    }
    return orientation === "portrait"
      ? { width: 488, height: 610 }
      : { width: 610, height: 488 };
  };

  const currentImage = fashionImages[currentIndex] || initialFashionImages[0];
  const { width, height } = getMainImageSize(
    currentImage.orientation,
    isMobile
  );

  // Fetch images for this genre from the runtime API so dashboard uploads appear automatically
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/genre-images?genre=fashion");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted || !Array.isArray(data) || data.length === 0) return;
        // Normalize to {id, image, orientation}
        const normalized = data.map((it, i) => {
          return {
            id: it.id || i + 1,
            image: it.image || it.src || it.url || it.image,
            orientation:
              it.orientation ||
              (it.height && it.width
                ? it.height >= it.width
                  ? "portrait"
                  : "landscape"
                : "portrait"),
          };
        });
        setFashionImages(normalized);
      } catch (err) {
        // keep fallback
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen bg-[#F5F1EAE0] text-black md:px-10 md:py-8 px-2">
      {/* LEFT SIDE */}
      <div className="md:flex-1 flex flex-col items-center justify-center">
        {/* Title – SAME MOBILE DESIGN */}
        <div className="md:mb-8 mt-10 md:-mt-[60px] flex flex-col justify-center md:items-start items-center w-full">
          <p
            className={`${taprom.className} md:ml-8 ml-0 text-center md:text-left lg:text-[38px] md:text-[40px] text-[20px] text-[#d94a27] lg:leading-[70px] md:leading-[50px] leading-[25px] tracking-[6.08px]`}
          >
            Fashion
          </p>

          <div className="relative flex -mt-[30px] md:justify-start justify-center w-full">
            <Image
              src={cameraline}
              alt="decor"
              width={260}
              height={40}
              unoptimized
              loading="lazy"
              className="md:ml-8 mt-4 md:mt-0 w-[200px] md:w-[260px] object-contain"
            />
          </div>
        </div>

        {/* MAIN IMAGE — SAME MOBILE SIZES */}
        <div className="relative flex md:justify-start justify-center items-center w-full md:h-[720px] md:mt-[200px] md:mr-[60px] md:pt-0 pt-6">
          {/* Previous button */}
          <button
            onClick={prevImage}
            className="z-10 md:mr-4 bg-[#F5F1EAE0] p-2 md:mb-[302px]
             hover:opacity-80 transition active:scale-90 active:opacity-70 
             rounded-full duration-150"
          >
            <Image
              src="/petarrow1.png"
              alt="Previous"
              width={isMobile ? 40 : 60}
              height={isMobile ? 40 : 60}
              loading="lazy"
              className="object-contain"
            />
          </button>

          {/* Main image */}
          <div
            className={`relative flex justify-center items-center md:py-0 py-10 ${
              isMobile ? "w-full h-full" : "md:w-full md:h-full md:mb-[369px]"
            }`}
          >
            <Image
              src={currentImage.image}
              alt={`Fashion ${currentIndex + 1}`}
              width={width}
              height={height}
              loading="lazy"
              className="object-contain"
            />
          </div>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="z-10 md:ml-4 bg-[#F5F1EAE0] p-2 md:mb-[302px]
             hover:opacity-80 transition active:scale-90 active:opacity-70
             rounded-full duration-150"
          >
            <Image
              src="/petarrow2.png"
              alt="Next"
              width={isMobile ? 40 : 60}
              height={isMobile ? 40 : 60}
              loading="lazy"
              className="object-contain"
            />
          </button>
        </div>
      </div>

      {/* THUMBNAILS — SAME MOBILE DESIGN */}
      <ThumbnailCarousel
        images={fashionImages}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
        isMobile={isMobile}
        loop={true}
      />
    </div>
  );
}

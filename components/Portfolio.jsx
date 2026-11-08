"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { taprom } from "@/lib/fonts";
import cameraline from "@/public/cameraline-colored.svg";
import ThumbnailCarousel from "./ThumbnailCarousel";

const initialPortfolioImages = [
  { id: 1, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 2, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 3, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 4, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState([]);

  // Keep your original mobile detection + sizing behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev + 1 >= portfolioImages.length ? 0 : prev + 1
    );

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? portfolioImages.length - 1 : prev - 1
    );

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

  const currentImage =
    portfolioImages[currentIndex] || initialPortfolioImages[0];

  const { width, height } = getMainImageSize(
    currentImage.orientation,
    isMobile
  );

  // Fetch images for this genre from the runtime API so dashboard uploads appear automatically

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/genre-images?genre=portfolio");
        if (!res.ok) throw new Error("Cloudinary request failed");
        const data = await res.json();
        if (mounted && Array.isArray(data) && data.length > 0) {
          const normalized = data.map((it, i) => ({
            id: it.id || i + 1,
            image: it.image,
            orientation:
              it.orientation ||
              (it.height >= it.width ? "portrait" : "landscape"),
          }));
          setPortfolioImages(normalized);
          return; // USE CLOUDINARY + STOP
        }
        // If Cloudinary is empty → fallback
        if (mounted) setPortfolioImages(initialPortfolioImages);
      } catch (err) {
        // Cloudinary failed → fallback
        if (mounted) setPortfolioImages(initialPortfolioImages);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen bg-[#F5F1EAE0] text-black md:px-10 md:py-8 px-2">
      {/* LEFT SIDE */}
      <div className="md:flex-1 flex flex-col items-center justify-center">
        {/* Title — EXACT mobile spacing preserved */}
        <div className="md:mb-8 mt-10 md:-mt-[60px] flex flex-col justify-center md:items-start items-center w-full">
          <p
            className={`${taprom.className} md:ml-8 -ml-12 lg:text-[38px] md:text-[40px] text-[20px] text-[#d94a27] lg:leading-[70px] md:leading-[50px] leading-[25px] text-center tracking-[6.08px]`}
          >
            Portfolio
          </p>

          <div className="relative flex md:justify-start justify-center w-full -mt-[30px]">
            <Image
              src={cameraline}
              alt="decor"
              width={260}
              height={40}
              loading="lazy"
              className="md:ml-8 mt-4 md:mt-0 w-[200px] md:w-[260px] object-contain"
            />
          </div>
        </div>

        {/* Main Image Section — MOBILE VERSION UNCHANGED */}
        <div className="relative flex md:justify-start justify-center items-center w-full md:h-[720px] md:mt-[200px] md:mr-[60px] md:pt-0 pt-6">
          {/* Previous Button (Mobile SAME position & size) */}
          <button
            onClick={prevImage}
            className="z-10 md:mr-4 bg-[#F5F1EAE0] p-2 md:mb-[302px]
             hover:opacity-80 transition active:scale-90 active:opacity-70 
             rounded-full duration-150 hover:cursor-pointer"
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

          {/* Main Image (MOBILE EXACT SIZING) */}
          <div
            className={`relative flex justify-center items-center md:py-0 py-10 ${
              isMobile ? "w-full h-full" : "md:w-full md:h-full md:mb-[369px]"
            }`}
          >
            <Image
              src={currentImage.image}
              alt="Portfolio image"
              width={width}
              height={height}
              loading="lazy"
              className="object-contain"
            />
          </div>

          {/* Next Button (Mobile SAME) */}
          <button
            onClick={nextImage}
            className="z-10 md:mr-4 bg-[#F5F1EAE0] p-2 md:mb-[302px]
             hover:opacity-80 transition active:scale-90 active:opacity-70 
             rounded-full duration-150 hover:cursor-pointer"
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

      {/* Thumbnails — same layout for mobile */}
      <ThumbnailCarousel
        images={portfolioImages}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
        isMobile={isMobile}
        loop={true}
      />
    </div>
  );
}

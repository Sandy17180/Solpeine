"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { taprom } from "@/lib/fonts";
import cameraline from "@/public/cameraline-colored.svg";
import ThumbnailCarousel from "./ThumbnailCarousel";
import { getMainImageDimensions } from "@/utils/aspect";

export default function PreandPostWeddingClient({ initialImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const preAndPostImages = initialImages;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % preAndPostImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? preAndPostImages.length - 1 : prev - 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

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
    preAndPostImages && preAndPostImages.length > 0
      ? preAndPostImages[currentIndex] || preAndPostImages[0]
      : null;
  const dynamicSize = getMainImageDimensions(currentImage, isMobile);

  if (!currentImage) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500">
        No images available.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen bg-[#F5F1EAE0] text-black md:px-10 md:py-8">
      <div className="md:flex-1 flex flex-col items-center justify-center">
        {/* Title image */}
        <div className="md:mb-8 md:-mt-[60px] mt-10 md:-ml-[60px] flex flex-col justify-center md:items-start items-center w-full">
          <p
            className={`${taprom.className} md:ml-8 -ml-12 lg:text-[38px] md:text-[40px] text-[20px] text-[#d94a27] lg:leading-[70px] md:leading-[50px] leading-[25px] text-center max-w-full tracking-[6.08px]`}
          >
            Pre and Post Wedding
          </p>
          <div className="relative flex md:-mt-[50px] -mt-[30px] ml-[30px] md:ml-[0px] md:justify-start justify-center w-full">
            <Image
              src={cameraline}
              alt="decor"
              width={260}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="md:ml-8 mt-4 md:mt-0 w-[200px] md:w-[260px] object-contain"
            />
          </div>
        </div>

        {/* Main image carousel */}
        <div className="relative flex md:justify-start justify-center items-center w-full md:h-[720px] md:mt-[200px] md:mr-[60px] md:pt-0 pt-6">
          {/* Previous button */}
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="z-10 md:mr-4 bg-[#F5F1EAE0] p-2 md:mb-[302px]
             hover:opacity-80 transition active:scale-90 active:opacity-70 
             rounded-full duration-150 hover:cursor-pointer"
          >
            <Image
              src="/petarrow1.png"
              alt="Previous"
              width={isMobile ? 40 : 60}
              height={isMobile ? 40 : 60}
              className="object-contain"
            />
          </button>

          {/* Main image */}
          <div
            className={`relative flex justify-center items-center md:py-0 py-10 ${isMobile ? "w-full h-full" : "md:w-full md:h-full md:mb-[369px]"
              }`}
          >
            <div
              className="relative flex items-center justify-center max-w-full max-h-full transition-all duration-300"
              style={{
                aspectRatio: dynamicSize.aspectRatio,
                maxWidth: `${dynamicSize.width}px`,
                maxHeight: `${dynamicSize.height}px`,
                width: "100%",
              }}
            >
              <Image
                src={currentImage.image}
                alt={currentImage.alt || `Wedding ${currentIndex + 1}`}
                width={dynamicSize.width}
                height={dynamicSize.height}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  aspectRatio: dynamicSize.aspectRatio,
                }}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="z-10 md:ml-4 bg-[#F5F1EAE0] p-2 md:mb-[302px]
             hover:opacity-80 transition active:scale-90 active:opacity-70
             rounded-full duration-150 hover:cursor-pointer"
          >
            <Image
              src="/petarrow2.png"
              alt="Next"
              width={isMobile ? 40 : 60}
              height={isMobile ? 40 : 60}
              className="object-contain"
            />
          </button>
        </div>
      </div>

      {/* Thumbnail list */}
      <ThumbnailCarousel
        images={preAndPostImages}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
        isMobile={isMobile}
        loop={true} // enable looping
      />
    </div>
  );
}

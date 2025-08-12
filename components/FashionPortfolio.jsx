"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Taprom } from "next/font/google";
import cameraline from "@/public/cameraline-colored.svg";

const fashionImages = [
  {
    id: 1,
    image: "/fashionPortrait.jpg",
    orientation: "portrait",
  },
  {
    id: 2,
    image: "/fashionPortrait.jpg",
    orientation: "portrait",
  },
  {
    id: 3,
    image: "/fashionPortrait.jpg",
    orientation: "portrait",
  },
  {
    id: 4,
    image: "/fashionPortrait.jpg",
    orientation: "portrait",
  },
  {
    id: 5,
    image: "/fashionPortrait.jpg",
    orientation: "portrait",
  },
];

const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });

export default function FashionPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % fashionImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? fashionImages.length - 1 : prev - 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  const getThumbNailImageSize = (orientation, isMobile) => {
    if (isMobile) {
      return orientation === "portrait"
        ? { width: 100, height: 146 }
        : { width: 130, height: 100 };
    }
    return orientation === "portrait"
      ? { width: 280, height: 350 }
      : { width: 350, height: 280 };
  };

  const getMainImageSize = (orientation, isMobile) => {
    if (isMobile) {
      return orientation === "portrait"
        ? { width: 200, height: 307 }
        : { width: 307, height: 200 };
    }

    return orientation === "portrait"
      ? { width: 488, height: 610 }
      : { width: 610, height: 488 };
  };
  const currentImage = fashionImages[currentIndex];
  const { width, height } = getMainImageSize(
    currentImage.orientation,
    isMobile
  );

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen bg-#F5F1EAE0 text-black md:px-10 md:py-8">
      <div className="md:flex-1 flex flex-col items-center">
        {/* Title image */}
        <div className="md:mb-8 md:-mt-[65px] mt-10 md:-ml-[60px] flex flex-col justify-center md:items-start items-center w-full">
          <p
            className={`${taprom.className} md:ml-8 -ml-12 lg:text-[38px] md:text-[40px] text-[20px] text-[#d94a27] lg:leading-[70px] md:leading-[50px] leading-[25px] text-center max-w-full tracking-[6.08px]`}
          >
            Fashion
          </p>
          <div className="relative flex -mt-[30px] md:justify-start justify-center w-full">
            <Image
              src={cameraline}
              alt="decor"
              width={260}
              height={40}
              className="md:ml-8 mt-4 md:mt-0 text-[#d94a27] md:w-[260px] w-[200px] object-contain"
            />
          </div>
        </div>

        {/* Main image carousel */}
        <div className="relative flex md:justify-start justify-center items-center w-full md:h-[720px] md:mt-[117px] md:mr-[60px] md:pt-0 pt-6">
          {/* Previous button */}
          <button
            onClick={prevImage}
            className="z-10 md:mr-4 bg-#F5F1EAE0 p-2 md:mb-[302px]"
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
            className={`relative flex justify-center items-center ${
              isMobile
                ? "w-[210px] h-[307px]"
                : "md:w-[610px] md:h-[488px] md:mb-[369px]"
            }`}
          >
            <Image
              src={currentImage.image}
              alt={`Pet ${currentIndex + 1}`}
              width={width}
              height={height}
              className="object-contain "
            />
          </div>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="z-10 md:ml-4 bg-#F5F1EAE0 p-2 md:mb-[302px]"
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
      <div
        className="
          md:w-[398px] w-auto
          md:h-[1022px] h-full
          md:bg-[#F1D5CAA8]
          flex flex-row md:flex-col
          gap-4
          md:pl-10 md:pt-4
          md:overflow-y-auto md:overflow-x-hidden
          overflow-x-auto overflow-y-hidden
          scrollbar-hide
          relative z-20
          md:-mt-20
          items-center
          justify-center
          md:py-0
          py-10
          "
      >
        {fashionImages.map((img, idx) => {
          const { width, height } = getThumbNailImageSize(
            img.orientation,
            isMobile
          );
          return (
            <div
              key={img.id}
              onClick={() => selectImage(idx)}
              className="cursor-pointer border-2 border-transparent transition flex-shrink-0"
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              <Image
                src={img.image}
                alt={`Thumbnail ${idx + 1}`}
                width={width}
                height={height}
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

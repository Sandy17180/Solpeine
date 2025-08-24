"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Taprom } from "next/font/google";
import cameraline from "@/public/cameraline-colored.svg";
import ThumbnailCarousel from "./ThumbnailCarousel";

const preandpostImages = [
  {
    id: 1,
    image: "/LifestyleGenre.jpg",
    orientation: "landscape",
  },
  {
    id: 2,
    image: "/pre_and_post_weddingGenre.jpg",
    orientation: "portrait",
  },
  {
    id: 3,
    image: "/LifestyleGenre.jpg",
    orientation: "landscape",
  },
  {
    id: 4,
    image: "/pre_and_post_weddingGenre.jpg",
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
    setCurrentIndex((prev) => (prev + 1) % preandpostImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? preandpostImages.length - 1 : prev - 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };


  const getThumbNailImageSize = (orientation, isMobile) => {
    if (isMobile) {
      return orientation === "portrait"
        ? { width: 100, height: 150 }
        : { width: 150, height: 100 };
    }
    return orientation === "portrait"
      ? { width: 280, height: 350 }
      : { width: 350, height: 280 };
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
  const currentImage = preandpostImages[currentIndex];
  const { width, height } = getMainImageSize(
    currentImage.orientation,
    isMobile
  );

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen bg-#F5F1EAE0 text-black md:px-10 md:py-8">
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
              width={550}
              height={40}
              className="md:ml-8 mt-2 md:mt-0 text-[#d94a27] md:w-[550px] w-[370px] object-contain"
            />
          </div>
        </div>

        {/* Main image carousel */}
        <div className="relative flex md:justify-start justify-center items-center w-full md:h-[720px] md:mt-[200px] md:mr-[60px] md:pt-0 pt-6">
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
            className={`relative flex justify-center items-center py-10 ${
              isMobile ? "w-full h-full" : "md:w-full md:h-full md:mb-[369px]"
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
      <ThumbnailCarousel
        images={preandpostImages}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
        isMobile={isMobile}
        loop={true} // enable looping
      />
    </div>
  );
}

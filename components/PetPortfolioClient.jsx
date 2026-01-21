"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { taprom } from "@/lib/fonts";
import cameraline from "@/public/cameraline-colored.svg";
import ThumbnailCarousel from "./ThumbnailCarousel";

export default function PetPortfolioClient({ initialImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const petImages = initialImages;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1 >= petImages.length ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? petImages.length - 1 : prev - 1));
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  const getThumbNailImageSize = (orientation, isMobile) => {
    if (isMobile) {
      return orientation === "portrait"
        ? { width: 100, height: 130 }
        : { width: 130, height: 100 };
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

  const currentImage = petImages[currentIndex];
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
            className={`${taprom.className} md:ml-10 -ml-12 lg:text-[38px] md:text-[40px] text-[20px] text-[#d94a27] lg:leading-[70px] md:leading-[50px] leading-[25px] text-center max-w-full tracking-[6.08px]`}
          >
            Pet
          </p>
          <div className="relative flex -mt-[30px] md:justify-start justify-center w-full">
            <Image
              src={cameraline}
              alt="decor"
              width={260}
              height={50}
              className="md:ml-8 mt-4 md:mt-0 text-[#d94a27] md:w-[160px] w-[160px] object-contain"
            />
          </div>
        </div>
        {/* Main image carousel */}
        <div className="relative flex md:justify-start justify-center items-center w-full md:h-[720px] md:mt-[200px] md:mr-[60px] md:pt-0 pt-6">
          {/* Previous button */}
          <button
            onClick={prevImage}
            className="z-10 md:mr-4 bg-[#F5F1EAE0] p-2 md:mb-[302px] hover:opacity-80 transition active:scale-90 active:opacity-70 rounded-full duration-150"
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
            className={`relative flex justify-center items-center md:py-0 py-10 ${
              isMobile ? "w-full h-full" : "md:w-full md:h-full md:mb-[369px]"
            }`}
          >
            <Image
              src={currentImage.image}
              alt={`Pet ${currentIndex + 1}`}
              width={width}
              height={height}
              className="object-contain"
            />
          </div>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="z-10 md:ml-4 bg-[#F5F1EAE0] p-2 md:mb-[302px] hover:opacity-80 transition active:scale-90 active:opacity-70 rounded-full duration-150"
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

      {/* RIGHT SIDE – THUMBNAIL CAROUSEL */}
      <div className="md:flex-1 flex flex-col items-center justify-center md:mt-0 mt-8">
        <ThumbnailCarousel
          images={petImages}
          currentIndex={currentIndex}
          onSelectImage={selectImage}
          getSize={(orientation) =>
            getThumbNailImageSize(orientation, isMobile)
          }
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

const petImages = [
  { id: 1, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 2, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 3, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 4, image: "/PortraitureImage.jpg", orientation: "portrait" },
];

export default function PortraiturePortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % petImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? petImages.length - 1 : prev - 1));
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  const currentImage = petImages[currentIndex];

  const getThumbNailImageSize = (orientation) => {
    return orientation === "portrait"
      ? { width: 280, height: 350 }
      : { width: 350, height: 280 };
  };

  const getMainImageSize = () => {
    return { width: 488, height: 563 };
  };

  const { width, height } = getMainImageSize();

  return (
    <div className="flex min-h-screen bg-[#F5F1EAE0] text-black px-10 py-8">
      {/* Left/Center Section */}
      <div className="flex flex-col w-[calc(100%-398px)]">
        {/* Title at Top-Left */}
        <div className="mb-8">
          <Image
            src="/PortraitureGenre.png"
            alt="Portraiture Title"
            width={415}
            height={80}
            className="object-contain -mt-[72px] -ml-[38px]"
          />
        </div>

        {/* Centered Image and Arrows */}
        <div className="flex justify-center items-center flex-1">
          {/* Left Arrow */}
          <button onClick={prevImage} className="p-2 mr-4">
            <Image
              src="/petarrow1.png"
              alt="Previous"
              width={60}
              height={60}
              className="object-contain"
            />
          </button>

          {/* Main Image */}
          <div
            style={{ width: 488, height: 563 ,marginBottom :197}}
            className="relative flex justify-center items-center"
          >
            <Image
              src={currentImage.image}
              alt={`Pet ${currentIndex + 1}`}
              width={width}
              height={height}
              className="object-contain"
            />
          </div>

          {/* Right Arrow */}
          <button onClick={nextImage} className="p-2 ml-4">
            <Image
              src="/petarrow2.png"
              alt="Next"
              width={60}
              height={60}
              className="object-contain"
            />
          </button>
        </div>
      </div>

      {/* Right Thumbnail Section */}
      <div className="w-[398px] h-[1022px] bg-[#F1D5CAA8] flex flex-col gap-20 px-6 pt-4 overflow-y-auto scrollbar-hide -mt-20 items-center">
        {petImages.map((img, idx) => {
          const { width, height } = getThumbNailImageSize(img.orientation);
          return (
            <div
              key={img.id}
              onClick={() => selectImage(idx)}
              className="cursor-pointer border-2 border-transparent transition"
              style={{ width, height }}
            >
              <Image
                src={img.image}
                alt={`Thumbnail ${idx + 1}`}
                width={width}
                height={height}
                className="shadow object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
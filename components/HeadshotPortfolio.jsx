"use client";

import { useState } from "react";
import Image from "next/image";

const petImages = [
  {
    id: 1,
    image: "/HeadshotImage.jpg",
    orientation: "landscape",
  },
  {
    id: 2,
    image: "/HeadshotImage.jpg",
    orientation: "landscape",
  },
  {
    id: 3,
    image: "/HeadshotImage.jpg",
    orientation: "landscape",
  },
  {
    id: 4,
    image: "/HeadshotImage.jpg",
    orientation: "landscape",
  },
];

export default function FashionPortfolio() {
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

  const getMainImageSize=()=>{
    return { width: 488, height: 563 }

  };
  const {width,height} = getMainImageSize(currentImage.orientation);

  return (
    <div className="flex min-h-screen bg-#F5F1EAE0 text-black px-10 py-8">
      <div className="flex-1 flex flex-col items-start">
        {/* Title image */}
        <div className="mb-6">
          <Image
            style={{ marginTop: -72, marginLeft: -38 }}
            src="/HeadshotGenre.png"
            alt="Headshot Title"
            width={415}
            height={80}
            className="object-contain shadow-none"
          />
        </div>

        {/* Main image carousel */}
        <div
          className="relative flex justify-start items-center  w-full w-[1200px] h-[720px]"
          style={{ marginLeft: 48, marginTop: 44 }}
        >
          {/* Previous button */}
          <button onClick={prevImage} className="z-10 mr-4 bg-#F5F1EAE0  p-2"style={{marginBottom: 302}}>
            <Image
              src="/petarrow1.png"
              alt="Previous"
              width={60}
              height={60}
              className="object-contain"
            />
          </button>

          {/* Main image */}
          <div
            style={{ width: 610, height: 488, marginBottom: 369 }}
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

          {/* Next button */}
          <button
            onClick={nextImage}
            className="z-10 ml-4 bg-#F5F1EAE0 rounded-full p-2"style={{marginBottom:302}}>
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

      {/* Thumbnail list */}
      <div className="w-[398px] h-[1022px] bg-[#F1D5CAA8] flex flex-col gap-5 px-6 pt-4 overflow-y-auto scrollbar-hide relative z-20 -mt-20 items-center">
        {petImages.map((img, idx) => {
          const { width, height } = getThumbNailImageSize(img.orientation);
          return (
            <div
              key={img.id}
              onClick={() => selectImage(idx)}
              className="cursor-pointer border-2 border-transparent  transition "
              style={{ width, height }}
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

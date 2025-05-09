"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";



const HeroCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full h-[608px] top-[266px] overflow-hidden relative">
      <Slider {...settings} className="h-full">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[608px]">
            <Image
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              layout="fill"
              objectFit="none"
              priority={index === 0}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;

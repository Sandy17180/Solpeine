import Image from "next/image";
import React from "react";
import HeroCarousel from "@/components/GenrePageHero";

const images = [
  {src: "/fashion.jpg", alt: "Image 1" },
  {src: "/girl.jpg", alt: "Image 2" },
  {src: "/door1.jpeg", alt: "Image 3" },
]

const page = () => {
  return (
    <main>
      <div className="w-[554px] h-[115px] my-2 ml-6">
        <Image src="/fashion1.svg" width={416} height={82} />
      </div>
      <HeroCarousel images={images} />
    </main>
  );
};

export default page;

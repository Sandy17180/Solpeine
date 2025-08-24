"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function ThumbnailCarousel({
  images,
  currentIndex,
  onSelect,
  isMobile = false,
  loop = false,
  horizontal = false, // new prop for horizontal looping
  thumbnailSize = {
    portrait: { width: 280, height: 350 },
    landscape: { width: 350, height: 280 },
  },
}) {
  const containerRef = useRef(null);

  // Optional loop effect
  useEffect(() => {
    if (!loop) return;
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (horizontal) {
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0; // loop back to start
        }
      } else {
        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight
        ) {
          container.scrollTop = 0; // loop back to top
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loop, horizontal]);

  const getThumbnailSize = (orientation) => {
    const size =
      orientation === "portrait"
        ? thumbnailSize.portrait
        : thumbnailSize.landscape;
    if (isMobile) {
      return { width: size.width / 2, height: size.height / 2 };
    }
    return size;
  };

  const displayImages = loop ? [...images, ...images] : images;

  return (
    <div
      ref={containerRef}
      className={`
    md:w-[398px] w-auto
    md:h-[1022px] h-full
    md:bg-[#F1D5CAA8]
    flex
    flex-row md:flex-col
    md:gap-6 gap-2
    md:pl-10 md:pt-6
    md:overflow-y-auto md:overflow-x-hidden
    overflow-x-auto overflow-y-hidden
    scrollbar-hide
    relative z-20
    md:-mt-20
    items-center justify-start
    md:py-0 py-10 md:px-6
  `}
    >
      {displayImages.map((img, idx) => {
        const { width, height } = getThumbnailSize(img.orientation);
        return (
          <div
            key={idx}
            onClick={() => onSelect(idx % images.length)}
            className="cursor-pointer border-2 border-transparent transition flex-shrink-0 flex"
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
  );
}

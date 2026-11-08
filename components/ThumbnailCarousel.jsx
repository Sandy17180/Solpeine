"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ThumbnailCarousel({
  images = [],
  currentIndex = 0,
  onSelect = () => {},
  isMobile = false,
  thumbnailSize = {
    portrait: { width: 280, height: 350 },
    landscape: { width: 350, height: 280 },
  },
}) {
  const containerRef = useRef(null);
  const safeImages = Array.isArray(images) ? images : [];

  // Triple dataset to enable seamless infinite scrolling
  const infiniteImages =
    safeImages.length > 0 ? [...safeImages, ...safeImages, ...safeImages] : [];

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

  // Detect scroll direction from rendered layout
  const detectScrollDirection = (container) => {
    const direction =
      window.getComputedStyle(container).flexDirection === "row"
        ? "horizontal"
        : "vertical";
    return direction;
  };

  // Scroll to the middle section (smooth infinite loop)
  const scrollToMiddle = () => {
    const container = containerRef.current;
    if (!container) return;

    const direction = detectScrollDirection(container);

    if (direction === "horizontal") {
      const third = container.scrollWidth / 3;
      container.scrollLeft = third;
    } else {
      const third = container.scrollHeight / 3;
      container.scrollTop = third;
    }
  };

  // Infinite Loop Logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start at middle of 3× dataset
    requestAnimationFrame(scrollToMiddle);

    const direction = detectScrollDirection(container);

    const handleScroll = () => {
      const third =
        direction === "horizontal"
          ? container.scrollWidth / 3
          : container.scrollHeight / 3;

      const pos =
        direction === "horizontal" ? container.scrollLeft : container.scrollTop;

      // Only teleport after leaving 20% - 180% range of the middle block
      if (pos < third * 0.2 || pos > third * 1.8) {
        const offset = pos % third; // preserve exact position inside block
        const newPos = third + offset; // teleport to middle block

        if (direction === "horizontal") {
          container.scrollLeft = newPos;
        } else {
          container.scrollTop = newPos;
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div
      ref={containerRef}
      className={`
        md:w-[398px] w-auto
        md:h-[1022px] h-full
        bg-[#F1D5CAA8]
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
      {infiniteImages.map((img, idx) => {
        const size = getThumbnailSize(img.orientation);

        return (
          <div
            key={idx}
            onClick={() =>
              safeImages.length > 0 && onSelect(idx % safeImages.length)
            }
            className={`cursor-pointer border-4 transition-all duration-300 flex-shrink-0 flex ${
              safeImages.length > 0 && currentIndex === idx % safeImages.length
                ? "border-[#d94a27] scale-105 z-10 shadow-lg"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
            style={{
              width: `${size.width}px`,
              height: `${size.height}px`,
            }}
          >
            <Image
              src={img.image}
              alt={`Thumbnail ${idx}`}
              width={size.width}
              height={size.height}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}

//! constant auto scrolling

// "use client";

// import { useRef, useEffect } from "react";
// import Image from "next/image";

// export default function ThumbnailCarousel({
//   images,
//   currentIndex,
//   onSelect,
//   isMobile = false,
//   loop = false,
//   horizontal = false,
//   thumbnailSize = {
//     portrait: { width: 280, height: 350 },
//     landscape: { width: 350, height: 280 },
//   },
// }) {
//   const containerRef = useRef(null);
//   const itemRefs = useRef([]);

//   // Auto-scroll active thumbnail into center (Netflix style)
//   useEffect(() => {
//     const activeRef = itemRefs.current[currentIndex];
//     const container = containerRef.current;

//     if (activeRef && container) {
//       if (horizontal) {
//         container.scrollTo({
//           left:
//             activeRef.offsetLeft -
//             container.clientWidth / 2 +
//             activeRef.clientWidth / 2,
//           behavior: "smooth",
//         });
//       } else {
//         container.scrollTo({
//           top:
//             activeRef.offsetTop -
//             container.clientHeight / 2 +
//             activeRef.clientHeight / 2,
//           behavior: "smooth",
//         });
//       }
//     }
//   }, [currentIndex, horizontal]);

//   // Continuous auto-scroll when loop is enabled
//   useEffect(() => {
//     if (!loop) return;
//     const container = containerRef.current;
//     if (!container) return;

//     let scrollAmount = 1; // px per frame
//     let animationFrame;

//     const autoScroll = () => {
//       if (horizontal) {
//         container.scrollLeft += scrollAmount;
//         if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
//           container.scrollLeft = 0; // reset to start
//         }
//       } else {
//         container.scrollTop += scrollAmount;
//         if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
//           container.scrollTop = 0; // reset to start
//         }
//       }
//       animationFrame = requestAnimationFrame(autoScroll);
//     };

//     animationFrame = requestAnimationFrame(autoScroll);

//     return () => cancelAnimationFrame(animationFrame);
//   }, [loop, horizontal]);

//   const getThumbnailSize = (orientation) => {
//     const size =
//       orientation === "portrait"
//         ? thumbnailSize.portrait
//         : thumbnailSize.landscape;
//     if (isMobile) {
//       return { width: size.width / 2, height: size.height / 2 };
//     }
//     return size;
//   };

//   const displayImages = loop ? [...images, ...images] : images;

//   return (
//     <div
//       ref={containerRef}
//       className={`
//         md:w-[398px] w-auto
//         md:h-[1022px] h-full
//         md:bg-[#F1D5CAA8]
//         flex
//         ${horizontal ? "flex-row overflow-x-auto" : "flex-col overflow-y-auto"}
//         md:gap-6 gap-2
//         md:pl-10 md:pt-6
//         scrollbar-hide
//         relative z-20
//         md:-mt-20
//         items-center justify-start
//         md:py-0 py-10 md:px-6
//       `}
//     >
//       {displayImages.map((img, idx) => {
//         const { width, height } = getThumbnailSize(img.orientation);
//         return (
//           <div
//             key={idx}
//             ref={(el) => (itemRefs.current[idx % images.length] = el)}
//             onClick={() => onSelect(idx % images.length)}
//             className={`cursor-pointer border-2 flex-shrink-0 flex transition-all duration-300 ease-in-out ${
//               currentIndex === idx % images.length
//                 ? "border-red-500 scale-105"
//                 : "border-transparent scale-100"
//             }`}
//             style={{ width: `${width}px`, height: `${height}px` }}
//           >
//             <Image
//               src={img.image}
//               alt={`Thumbnail ${idx + 1}`}
//               width={width}
//               height={height}
//               className="object-contain"
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

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





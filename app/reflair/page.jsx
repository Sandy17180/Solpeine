"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// Images now come from the `public/reflair/` folder via the runtime API
// `GET /api/reflair/list` which returns an array of {id, src, alt, caption}.
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PhotoGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch the list of images from the server-side API that reads `public/reflair/`
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/reflair/list");
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setImages(shuffleArray(data));
      } catch (err) {
        console.error("Failed to load reflair images", err);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4 space-y-4">
      {images.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="w-full break-inside-avoid overflow-hidden"
        >
          <div className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={500}
              height={500}
              layout="responsive"
              className="w-full h-auto object-cover"
            />
            {/*<div className="p-3 w-full text-center tracking-wider">
               Caption intentionally hidden — keeping code for future use
              <p className={`text-xl text-gray-800 ${lato.className}`}>
                {photo.caption}
              </p>
              
            </div>*/}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PhotoGallery;

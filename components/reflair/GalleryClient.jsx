"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

const GalleryClient = ({ initialImages }) => {
  const [images, setImages] = useState(initialImages || []);

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setImages(shuffleArray(initialImages));
    }
  }, [initialImages]);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4 space-y-4">
      {images.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.1 }}
          transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
          className="w-full break-inside-avoid overflow-hidden rounded-lg"
        >
          <div className="relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={600}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 6}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryClient;

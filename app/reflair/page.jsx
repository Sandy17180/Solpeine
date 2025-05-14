"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import photos from "@/data/reflair.json";
import {Lato} from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const PhotoGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(photos);
  }, []);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4 space-y-4">
      {images.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <div className="p-3 w-full text-center tracking-wider">
              <p className={`text-xl text-gray-800 ${lato.className}`}>{photo.caption}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PhotoGallery;

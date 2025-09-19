"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";
import { Camera, Home, Search, Film, Aperture, Focus } from 'lucide-react';

export default function Photography404() {
  const [isHovered, setIsHovered] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  // Simulate camera shutter effect
  const triggerFlash = () => {
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 200);
  };

  // Auto-change "photos" in the viewfinder
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cameraVariants = {
    initial: { rotateY: 0, scale: 1 },
    hover: { rotateY: 5, scale: 1.05 },
    click: { rotateY: -5, scale: 0.95 }
  };

  const shutterVariants = {
    closed: { 
      clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      transition: { duration: 0.1 }
    },
    open: { 
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0% 0%)',
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const floatingElements = [
    { icon: Film, delay: 0, x: -50, y: -30 },
    { icon: Aperture, delay: 0.2, x: 50, y: -50 },
    { icon: Focus, delay: 0.4, x: -30, y: 40 }
  ];

  const mockPhotos = [
    {
      title: "Portraiture",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
    {
      title: "Fashion",
      color: "bg-gradient-to-br from-indigo-400 to-indigo-600",
    },
    {
      title: "Product",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    },
    {
      title: "Lifestyle",
      color: "bg-gradient-to-br from-teal-400 to-teal-600",
    },
    {
      title: "Portfolio",
      color: "bg-gradient-to-br from-gray-400 to-gray-600",
    },
    { title: "Wedding", color: "bg-gradient-to-br from-red-400 to-red-600" },
    { title: "Events", color: "bg-gradient-to-br from-cyan-400 to-cyan-600" },
    {
      title: "Headshots",
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    },
    { title: "Pets", color: "bg-gradient-to-br from-rose-400 to-rose-600" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden cursor-default"
      style={{ backgroundColor: "#F5F1EA" }}
    >
      {/* Flash Effect Overlay */}
      <AnimatePresence>
        {flashEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Floating Photography Elements */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <motion.div
            z-index={index}
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 0.1,
              y: element.y,
              x: element.x,
            }}
            transition={{
              delay: element.delay,
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute text-gray-400"
          >
            <IconComponent size={48} />
          </motion.div>
        );
      })}

      {/* Viewfinder Frame Corners */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="fixed inset-0 pointer-events-none z-5"
      >
        {/* Top Left Corner */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gray-400"
          whileInView={{
            borderColor: isHovered ? "#374151" : "#1f2937",
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Top Right Corner */}
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gray-400"
          whileInView={{
            borderColor: isHovered ? "#374151" : "#1f2937",
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom Left Corner */}
        <motion.div
          className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gray-400"
          whileInView={{
            borderColor: isHovered ? "#374151" : "#1f2937",
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom Right Corner */}
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gray-400"
          whileInView={{
            borderColor: isHovered ? "#374151" : "#1f2937",
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Center Focus Indicator */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="w-full h-full border-2 border-gray-600 rounded-full relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-gray-600 rounded-full" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-gray-600" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0.5 h-4 bg-gray-600" />
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-gray-600" />
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-gray-600" />
          </div>
        </motion.div>

        {/* Viewfinder Info Display */}
        <motion.div
          className="absolute bottom-12 left-12 text-gray-700 font-mono text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <div>404 ERROR</div>
          <div>ISO 400 • F/2.8 • 1/60</div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 right-12 text-gray-700 font-mono text-sm text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <div>PAGE NOT FOUND</div>
          <div>{new Date().toLocaleDateString("en-GB")}</div>
        </motion.div>
      </motion.div>

      {/* Main Content Container */}
      <div className="text-center z-10 max-w-2xl mx-auto px-6">
        {/* 404 Text with Camera Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            className="text-8xl font-bold text-gray-800 mb-4"
            animate={{
              textShadow: isHovered ? "0 0 20px rgba(0,0,0,0.3)" : "none",
            }}
          >
            4
            <motion.span
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mx-2"
            >
              📸
            </motion.span>
            4
          </motion.h1>
        </motion.div>

        {/* Camera Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="mb-8 flex justify-center"
        >
          <motion.div
            variants={cameraVariants}
            initial="initial"
            whileHover="hover"
            whileTap="click"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={triggerFlash}
            className="relative cursor-pointer"
          >
            {/* Camera Body */}
            <div className="w-64 h-48 bg-gray-800 rounded-lg relative shadow-2xl">
              {/* Lens */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gray-900 rounded-full border-8 border-gray-700 shadow-inner"
                animate={{
                  boxShadow: isHovered
                    ? "inset 0 0 30px rgba(255,255,255,0.1)"
                    : "inset 0 0 20px rgba(0,0,0,0.5)",
                }}
              >
                {/* Lens Glass with Viewfinder */}
                <motion.div
                  className="w-full h-full rounded-full bg-gradient-to-br from-blue-900 via-purple-900 to-black relative overflow-hidden"
                  variants={shutterVariants}
                  animate={flashEffect ? "closed" : "open"}
                >
                  {/* Mock Photo in Viewfinder */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.7, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-2 rounded-full ${mockPhotos[currentImage].color} flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-medium">
                        {mockPhotos[currentImage].title}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  {/* Lens Reflection */}
                  <motion.div
                    className="absolute top-2 left-2 w-8 h-8 bg-white opacity-30 rounded-full"
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      opacity: isHovered ? 0.5 : 0.3,
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Camera Details */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-red-500 rounded-full animate-pulse" />
              <div className="absolute top-4 right-4 w-8 h-4 bg-gray-600 rounded" />
              <div className="absolute bottom-4 left-4 right-4 h-2 bg-gray-700 rounded" />
            </div>

            {/* Flash */}
            <motion.div
              className="absolute -top-2 left-8 w-8 h-6 bg-gray-300 rounded"
              animate={{
                backgroundColor: flashEffect ? "#ffffff" : "#d1d5db",
                boxShadow: flashEffect
                  ? "0 0 20px rgba(255,255,255,0.8)"
                  : "none",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Picture Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
            Looks like this page got lost in the darkroom. The shot you're
            looking for seems to have been overexposed!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Home size={20} />
            Back to Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-800 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-800 flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => router.push("/workfolio")}
          >
            <Search size={20} />
            Search Portfolio
          </motion.button>
        </motion.div>

        {/* Subtle Animation Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-sm text-gray-500 mt-8"
        >
          Click the camera to take a "shot" at finding your way back!
        </motion.p>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: i * 0.1, duration: 2 }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <Camera size={24} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
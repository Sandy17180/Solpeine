"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCards";
import { testimonials } from "@/data/testimonials";
import { lato, taprom } from "@/lib/fonts";
import AdvancedCameraReel from "@/components/Client";

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isPaused, setIsPaused] = useState(false);
  const [logos, setLogos] = useState([]);
  const spotlightRef = useRef(null);

  // Extract unique genre categories for filter pills
  const genres = useMemo(() => {
    const list = Array.from(new Set(testimonials.map((t) => t.genre || t.profile)));
    return ["All", ...list];
  }, []);

  // Filtered testimonials for grid
  const filteredTestimonials = useMemo(() => {
    if (selectedGenre === "All") return testimonials;
    return testimonials.filter(
      (t) => (t.genre || t.profile) === selectedGenre
    );
  }, [selectedGenre]);

  // Active spotlight item
  const activeSpotlight = testimonials[activeIndex] || testimonials[0];

  // Auto-advance spotlight every 6 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Fetch client logos
  useEffect(() => {
    fetch("/api/logo")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          const logoUrls = data.map((logo) => logo.image);
          setLogos(logoUrls);
        }
      })
      .catch((err) => console.error("Failed to fetch logos:", err));
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSelectSpotlight = (index) => {
    setActiveIndex(index);
    if (spotlightRef.current) {
      spotlightRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    // If current spotlight is not in selected genre, switch spotlight to the first matching
    if (genre !== "All") {
      const matchIdx = testimonials.findIndex(
        (t) => (t.genre || t.profile) === genre
      );
      if (matchIdx !== -1) {
        setActiveIndex(matchIdx);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#2d2d2d] py-10 px-4 sm:px-6 lg:px-12">
      {/* 1. Header Heading */}
      <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 text-center">
        <Image
          src="/testimonials.svg"
          alt="Testimonials"
          width={480}
          height={115}
          className="md:w-[480px] w-[240px] h-auto"
          priority
          unoptimized
        />
        <p
          className={`${lato.className} text-[#555] text-sm sm:text-base md:text-lg max-w-2xl mt-4 px-2 tracking-wide font-normal`}
        >
          Real stories, authentic experiences, and cinematic memories captured with care and collaboration.
        </p>

        {/* 2. Interactive Genre Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 max-w-4xl">
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => handleGenreClick(genre)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#d94a27] text-white shadow-md scale-105"
                    : "bg-[#f3e6e3] text-[#555] hover:bg-[#ebd3cd] hover:text-[#222]"
                }`}
              >
                {genre} {genre === "All" && `(${testimonials.length})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Featured Spotlight Card */}
      <div
        ref={spotlightRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="max-w-5xl mx-auto mb-16 relative"
      >
        <div className="relative bg-[#f8f4ef] border border-[#d94a27]/25 rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl overflow-hidden">
          {/* Top Row: Apostrophe Icon + Genre Badge + Counter */}
          <div className="flex items-center justify-between mb-6">
            <Image
              src="/apostrophe.svg"
              alt="Quote"
              width={42}
              height={42}
              className="text-[#d94a27] w-8 h-8 sm:w-10 sm:h-10"
            />
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-full bg-[#d94a27]/10 text-[#d94a27]">
                {activeSpotlight.genre || activeSpotlight.profile}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#888] font-mono">
                0{activeIndex + 1} / 0{testimonials.length}
              </span>
            </div>
          </div>

          {/* Animated Quote Content */}
          <div className="min-h-[160px] sm:min-h-[140px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpotlight.id || activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                <p
                  className={`${lato.className} text-[#2d2d2d] text-base sm:text-xl md:text-2xl leading-relaxed sm:leading-loose tracking-wide font-medium`}
                >
                  "{activeSpotlight.quote}"
                </p>

                <div className="mt-6 pt-4 border-t border-[#d94a27]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3
                      className={`${lato.className} text-xl sm:text-2xl font-bold text-[#d94a27] tracking-wide`}
                    >
                      {activeSpotlight.name}
                    </h3>
                    <p
                      className={`${lato.className} text-sm sm:text-base text-[#666] italic font-medium`}
                    >
                      {activeSpotlight.profile}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Controls: Navigation Arrows & Indicator Dots */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#d94a27]/15">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSpotlight(i)}
                  aria-label={`Jump to review ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? "w-8 bg-[#d94a27]"
                      : "w-2.5 bg-[#d94a27]/25 hover:bg-[#d94a27]/50"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#d94a27]/30 bg-white/80 hover:bg-[#d94a27] hover:text-white text-[#d94a27] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
              >
                <svg
                  className="w-5 h-5 fill-none stroke-current"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#d94a27]/30 bg-white/80 hover:bg-[#d94a27] hover:text-white text-[#d94a27] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
              >
                <svg
                  className="w-5 h-5 fill-none stroke-current"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Autoplay progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#d94a27]/10">
            {!isPaused && (
              <motion.div
                key={activeIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-[#d94a27]"
              />
            )}
          </div>
        </div>
      </div>

      {/* 4. Non-Repeating All Client Stories Grid */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#d94a27]/20">
          <div>
            <h2 className={`${lato.className} text-xl sm:text-2xl font-bold text-[#2d2d2d] tracking-wide`}>
              Client Stories
            </h2>
            <p className="text-xs sm:text-sm text-[#777] mt-0.5">
              Click any card to highlight and spotlight their story above.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#d94a27] bg-[#f3e6e3] px-3.5 py-1.5 rounded-full">
            {filteredTestimonials.length} {filteredTestimonials.length === 1 ? "Story" : "Stories"}
          </span>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTestimonials.map((testimonial) => {
            const originalIndex = testimonials.findIndex((t) => t.id === testimonial.id);
            const isSpotlightActive = activeIndex === originalIndex;

            return (
              <motion.div
                key={testimonial.id || testimonial.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex"
              >
                <TestimonialCard
                  name={testimonial.name}
                  quote={testimonial.quote}
                  profile={testimonial.profile}
                  genre={testimonial.genre}
                  isActive={isSpotlightActive}
                  onClick={() => handleSelectSpotlight(originalIndex)}
                  fontClass={lato.className}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 5. Client Logos Reel */}
      <div className="flex items-center justify-center mt-12 mb-8">
        <Image
          src="/clients.svg"
          alt="Clients"
          width={480}
          height={115}
          className="md:w-[480px] w-[240px] h-auto"
          unoptimized
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <AdvancedCameraReel images={logos} speed={50} pauseOnHover={false} />
      </div>
    </div>
  );
}

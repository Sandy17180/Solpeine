"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCards";
import { testimonials } from "@/data/testimonials";
import { lato } from "@/lib/fonts";
import AdvancedCameraReel from "@/components/Client";

export default function TestimonialsPage() {
  const [logos, setLogos] = useState([]);

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

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#2d2d2d] py-10 px-4 sm:px-6 lg:px-12">
      {/* 1. Header Heading */}
      <div className="flex flex-col items-center justify-center mb-10 sm:mb-14 text-center">
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
      </div>

      {/* 2. Client Stories Grid (All 5 Unique Testimonials, Zero Repetition) */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id || testimonial.name}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] flex"
            >
              <TestimonialCard
                name={testimonial.name}
                quote={testimonial.quote}
                profile={testimonial.profile}
                genre={testimonial.genre}
                fontClass={lato.className}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Client Logos Reel */}
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

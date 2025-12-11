"use client";

import TestimonialCard from "@/components/TestimonialCards";
import { testimonials } from "@/data/testimonials";
import { Lato } from "next/font/google";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import Image from "next/image";
import AdvancedCameraReel from "@/components/Client";
import { useState, useEffect } from "react";

const lato = Lato({ subsets: ["latin"], weight: ["400"] });

const Column = ({ items, reverse = false, duration = 120 }) => {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = React.useState(false);

  const startAnimation = () => {
    controls.start({
      y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration,
        ease: "linear",
      },
    });
  };

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    startAnimation(); // always start animation

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-6"
      animate={controls}
      // only attach hover handlers if not mobile
      onMouseEnter={!isMobile ? () => controls.stop() : undefined}
      onMouseLeave={!isMobile ? startAnimation : undefined}
    >
      {[...items, ...items].map((testimonial, i) => (
        <div key={`${testimonial.name}-${i}`} className="flex-shrink-0">
          <TestimonialCard
            name={testimonial.name}
            quote={testimonial.quote}
            profile={testimonial.profile}
            fontClass={lato.className}
          />
        </div>
      ))}
    </motion.div>
  );
};

// utility function: chunk array into n groups
const chunkArray = (arr, n) => {
  return Array.from({ length: n }, (_, i) =>
    arr.filter((_, idx) => idx % n === i)
  );
};

const Page = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    fetch("/api/logo")
      .then((res) => res.json())
      .then((data) => {
        const logoUrls = data.map((logo) => logo.image);
        setLogos(logoUrls);
      })
      .catch((err) => console.error("Failed to fetch logos:", err));
  }, []);

  // dynamically decide number of columns based on screen size
  const [columns, setColumns] = React.useState(3);

  React.useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 768) setColumns(1); // mobile
      else if (window.innerWidth < 1280) setColumns(2); // tablet
      else setColumns(3); // desktop
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const columnData = chunkArray(testimonials, columns);

  return (
    <>
      {/* logo */}
      <div className="flex items-center justify-center mb-12">
        <Image
          src="/testimonials.svg"
          alt="contact"
          width={480}
          height={115}
          className="md:w-[480px] w-[240px]"
        />
      </div>

      <div className="relative h-[1280px] overflow-hidden cursor-default">
        {/* Gradient Top */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F5F1EA] to-transparent z-10" />

        {/* Scrolling Testimonials */}
        <div
          className={`grid gap-6 px-4 md:px-6 xl:px-12 
          grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-full`}
        >
          {columnData.map((col, i) => (
            <div className="overflow-hidden" key={i}>
              <Column items={col} reverse={i % 2 === 1} />
            </div>
          ))}
        </div>

        {/* Gradient Bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F1EA] to-transparent z-10" />
      </div>

      {/* client logos */}
      <div className="flex items-center justify-center mt-16">
        <Image
          src="/clients.svg"
          alt="clients"
          width={480}
          height={115}
          className="md:w-[480px] w-[240px]"
        />
      </div>
      <div>
        <AdvancedCameraReel images={logos} speed={50} pauseOnHover={false} />
      </div>
    </>
  );
};

export default Page;

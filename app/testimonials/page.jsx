"use client";

import TestimonialCard from "@/components/TestimonialCards";
import { testimonials } from "@/data/testimonials";
import { Lato } from "next/font/google";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import Image from "next/image";
import AdvancedCameraReel from "@/components/Client";

const lato = Lato({ subsets: ["latin"], weight: ["400"] });

const Column = ({ items, reverse = false, duration = 80 }) => {
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.stop(); // pause animation
  };

  const handleMouseLeave = () => {
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
    // start animation on mount
    handleMouseLeave();
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-6"
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

const Page = () => {
  // Split testimonials into 3 columns
  const column1 = testimonials.filter((_, i) => i % 3 === 0);
  const column2 = testimonials.filter((_, i) => i % 3 === 1);
  const column3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <>
      {/* logo */}
      <div className="flex items-center justify-center mb-12">
        <Image
          src="/testimonials.svg"
          alt="contact"
          width={480}
          height={115}
          className="md:w-[480px] w-[115px]"
        />
      </div>

      <div className="relative h-[1280px] overflow-hidden cursor-default">
        {/* Gradient Top */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F5F1EA] to-transparent z-10" />

        {/* Scrolling Testimonials */}
        <div className="flex grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 xl:px-12 md:px-6 h-full px-4">
          {/* Column 1 - Down */}
          <div className="overflow-hidden">
            <Column items={column1} />
          </div>

          {/* Column 2 - Up */}
          <div className="overflow-hidden">
            <Column items={column2} reverse />
          </div>

          {/* Column 3 - Down */}
          <div className="overflow-hidden">
            <Column items={column3} />
          </div>
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
          className="md:w-[480px] w-[115px]"
        />
      </div>
      <div className="">
        {/* Enhanced version */}
        <AdvancedCameraReel
          speed={25}
          pauseOnHover={false}
        />
      </div>
    </>
  );
};

export default Page;

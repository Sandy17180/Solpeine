"use client";

import Link from "next/link";
import Image from "next/image";
import { Sawarabi_Mincho,Taprom,Lato } from "next/font/google";
import TestimonialCard from "./TestimonialCard";
import { useState } from "react";

const sawarabi = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});
const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });
const lato = Lato({ subsets: ["latin"], weight: ["400"] });

const testimonials = [
  {
    name: "Kate Bonham",
    quote:
      "I have never felt so comfortable in front of a camera until I worked with Solpeine. They have an amazing way of making you feel at ease, bringing out natural expressions and emotions. The final photos truly reflect my personality and confidence, and I can't wait to share them with the world! From the moment we began the shoot, their energy was calming and uplifting. They gave clear direction while still allowing me to be myself, which made the entire experience feel effortless and fun. I never once felt awkward or overly posed—just seen, understood, and beautifully captured. Each photo tells a story and feels like a true representation of who I am.",
    profile: "Graduate Student"
  },
  {
    name: "Jane Doe",
    quote:
    "I have never felt so comfortable in front of a camera until I worked with Solpeine. They have an amazing way of making you feel at ease, bringing out natural expressions and emotions. The final photos truly reflect my personality and confidence, and i can’t wait to share them with the world!",
    profile: "Software Engineer",
  },
  {
    name: "Sarah Lee",
    quote:
    "I have never felt so comfortable in front of a camera until I worked with Solpeine. They have an amazing way of making you feel at ease, bringing out natural expressions and emotions. The final photos truly reflect my personality and confidence, and i can’t wait to share them with the world!",
    profile: "Marketing Manager",
  },
  {
    name: "Kate Bonham",
    quote:
      "I have never felt so comfortable in front of a camera until I worked with Solpeine. They have an amazing way of making you feel at ease, bringing out natural expressions and emotions. The final photos truly reflect my personality and confidence, and I can't wait to share them with the world! From the moment we began the shoot, their energy was calming and uplifting. They gave clear direction while still allowing me to be myself, which made the entire experience feel effortless and fun. I never once felt awkward or overly posed—just seen, understood, and beautifully captured. Each photo tells a story and feels like a true representation of who I am.",
    profile: "Graduate Student"
  },
  {
    name: "Jane Doe",
    quote:
    "I have never felt so comfortable in front of a camera until I worked with Solpeine. They have an amazing way of making you feel at ease, bringing out natural expressions and emotions. The final photos truly reflect my personality and confidence, and i can’t wait to share them with the world!",
    profile: "Software Engineer",
  },
  {
    name: "Sarah Lee",
    quote:
    "I have never felt so comfortable in front of a camera until I worked with Solpeine. They have an amazing way of making you feel at ease, bringing out natural expressions and emotions. The final photos truly reflect my personality and confidence, and i can’t wait to share them with the world!",
    profile: "Marketing Manager",
  },
  {
    name: "Sarah Lee",
    quote:
    "I have never felt so comfortable in front of a camera until I worked with Solpeine. They have an amazing way of making you feel at ease, bringing out natural expressions and emotions. The final photos truly reflect my personality and confidence, and i can’t wait to share them with the world!",
    profile: "Marketing Manager",
  },
];

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  }

  const isMoreToShow = visibleCount < testimonials.length;

  return (
    <div className="py-16 bg-[#FAF4EF]">
      <div className="text-center mb-12">
        <h2
          className={`text-[58px] leading-[70px] tracking-[0.16em] font-normal text-[#DA3E3E] ${taprom.className}`}
        ></h2>
        <div className="flex justify-center mt-4">
          <Image
            src="/testimonial.png"
            alt="ECG line under heading"
            width={480}
            height={115}
            className="h-[115px] w-auto"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
        {testimonials.slice(0, visibleCount).map((t, index) => (
          <TestimonialCard
            key={index}
            name={t.name}
            quote={t.quote}
            fontClass={sawarabi.className}
            fontClass1={lato.className}
            profile={t.profile}
          />
        ))}
      </div>

      {isMoreToShow && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-[#D94A27] text-white px-6 py-2 rounded-full text-sm shadow-[0_6px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] duration-300 cursor-pointer"
          >
            View more testimonials
          </button>
        </div>
      )}
    </div>
  );
}



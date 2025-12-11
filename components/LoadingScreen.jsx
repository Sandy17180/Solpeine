"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Lobster_Two } from "next/font/google";

const lobster = Lobster_Two({ subsets: ["latin"], weight: ["400"] });

// Warm + friendly gradient presets
const GRADIENTS = [
  "from-rose-400 via-red-400 to-orange-300",
  "from-orange-300 via-amber-400 to-yellow-300",
  "from-amber-300 via-orange-400 to-pink-300",
  "from-pink-300 via-rose-400 to-red-300",
  "from-yellow-300 via-orange-400 to-red-300",
  "from-purple-300 via-pink-300 to-orange-300",
];

const PHRASES = [
  "Adjusting focus…",
  "Capturing light…",
  "Setting aperture…",
  "Balancing shadows…",
  "Framing the shot…",
  "Metering exposure…",
  "Securing composition…",
  "Calibrating color…",
  "Warming highlights…",
  "Cooling tones…",
];

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function LoadingScreen() {
  const pathname = usePathname();

  const [phrase, setPhrase] = useState(
    PHRASES[Math.floor(Math.random() * PHRASES.length)]
  );
  const [gradient, setGradient] = useState(
    GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
  );
  const [key, setKey] = useState(0);

  // Dynamic header
  let header = "Loading";
  if (pathname === "/workfolio") {
    header = "Loading Workfolio";
  } else if (pathname?.startsWith("/workfolio/")) {
    const genre = pathname.split("/").filter(Boolean)[1] || "";
    // replace underscores with spaces and title-case, but keep short words lowercase (e.g., 'and')
    const smallWords = new Set([
      "and",
      "or",
      "the",
      "of",
      "in",
      "on",
      "by",
      "for",
      "to",
      "a",
    ]);
    const formatted = genre
      .replace(/_/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((w, i) =>
        smallWords.has(w.toLowerCase()) && i !== 0
          ? w.toLowerCase()
          : capitalize(w)
      )
      .join(" ");
    header = `Loading ${formatted}`;
  } else if (pathname) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length) {
      const last = parts.at(-1) || "";
      const formatted = last
        .replace(/_/g, " ")
        .split(" ")
        .filter(Boolean)
        .map((w, i) =>
          w.toLowerCase() === "and" && i !== 0 ? w.toLowerCase() : capitalize(w)
        )
        .join(" ");
      header = `Loading ${formatted}`;
    }
  }

  // Choosing the next phrase
  const pickNextPhrase = () => {
    let next = phrase;
    while (next === phrase) {
      next = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    }
    return next;
  };

  // Picking next gradient
  const pickNextGradient = () => {
    let next = gradient;
    while (next === gradient) {
      next = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
    }
    return next;
  };

  // Animation complete → update phrase and gradient
  const handleComplete = () => {
    setPhrase(pickNextPhrase());
    setGradient(pickNextGradient());
    setKey((k) => k + 1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none">
      {/* Header */}
      <div className="mb-6 text-3xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        {header}
      </div>
      {/* Phrase animation container */}
      <div className="relative overflow-hidden w-screen h-16 flex items-center">
        <motion.div
          key={key}
          initial={{ x: "-130%", opacity: 0, filter: "blur(18px)" }}
          animate={{
            x: ["-130%", "0%", "0%", "130%"],
            opacity: [0, 1, 1, 0],
            filter: ["blur(18px)", "blur(0px)", "blur(0px)", "blur(18px)"],
          }}
          transition={{
            duration: 4.5,
            times: [0, 0.18, 0.82, 1],
            ease: ["easeOut", "linear", "easeIn"],
          }}
          onAnimationComplete={handleComplete}
          className="absolute inset-0 flex items-center justify-center w-full"
        >
          <span
            className={
              `text-3xl sm:text-4xl font-semibold whitespace-nowrap bg-gradient-to-r ${gradient} bg-clip-text text-transparent drop-shadow-lg ` +
              lobster.className
            }
          >
            {phrase}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

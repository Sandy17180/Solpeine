"use client";

import React from "react";
import { taprom, lato } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import instagramLogo from "@/social/instagramLogo.svg";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PROFILE_IMAGE = "https://res.cloudinary.com/dbgmbutwa/image/upload/f_auto,q_auto/solpiene/about/profile-image";

const Page = () => {
  const [profileSrc, setProfileSrc] = React.useState(PROFILE_IMAGE);
  return (
    <div className="relative w-full flex flex-col">
      {/* Top Half: Background split + Profile Image (Mobile) */}
      <div className="relative min-h-[420px] w-full overflow-hidden md:hidden py-6">
        <div className="absolute inset-0 flex w-full h-full">
          <div className="w-1/2 bg-[#F5F1EA]" />
          <div className="w-1/2 bg-[#D94A27]" />
        </div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-10 w-[210px] aspect-[9/16] mx-auto shadow-[5px_5px_0px_rgba(255,255,255)] bg-[#F5F1EA] overflow-hidden"
        >
          <Image
            src={profileSrc}
            alt="Profile"
            width={210}
            height={373}
            className="w-full h-full object-contain"
            onError={() => setProfileSrc("/sandeep_profile.jpg")}
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Bottom Half: Text and Details (Mobile) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative w-full flex items-start justify-center px-4 pt-6 pb-9 md:hidden"
      >
        <div className="max-w-3xl text-center">
          <motion.div variants={fadeInUp}>
            <Image
              src="/name.svg"
              alt="name"
              width={350}
              height={100}
              className="mx-auto mb-4 max-w-full"
              priority
            />
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className={`${taprom.className} lg:text-lg text-base text-[#D94A27] tracking-[0.15em] mb-4`}
          >
            Your friendly neighborhood photographer
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className={`${lato.className} text-sm leading-relaxed text-gray-700 space-y-2 px-8 text-justify`}
          >
            <motion.p variants={fadeInUp}>
              What began as a simple summer pastime at the age of eight - a gift
              from my grandfather in the form of a film camera - quickly
              revealed my innate love for capturing landscapes.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Years later, with a basic DSLR, I rekindled that spark, falling
              deeply in love with candid moments and portraiture.
            </motion.p>
            <motion.p variants={fadeInUp}>
              I am drawn to clients who are equally passionate about the craft
              and who appreciate the beauty of capturing the essence of the
              moment.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-6 flex flex-col items-end mr-8"
          >
            <Image
              src="/signature.png"
              width={86}
              height={53}
              alt="signature"
            />
            <Link
              href="https://www.instagram.com/sandeepsai_fotofusion/"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Image
                src={instagramLogo}
                width={20}
                height={20}
                alt="instagram"
                loading="lazy"
              />
              <p className="lg:text-sm text-xs text-gray-800">
                @sandeepsai_fotofusion
              </p>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Content (Desktop & Tablet) */}
      <div className="relative z-10 md:flex items-center justify-center h-full hidden">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="md:grid md:grid-cols-2 grid-cols-1 lg:max-w-[1440px] w-full px-6 lg:px-12 gap-10 lg:gap-20 py-10 lg:py-20"
        >
          {/* Text Section */}
          <div className="flex flex-col justify-between max-w-xl">
            <motion.div variants={fadeInUp}>
              <Image
                src="/name.svg"
                width={800}
                height={110}
                alt="name"
                priority
              />
              <p
                className={`${taprom.className} lg:text-2xl text-base text-[#D94A27] my-6 lg:mt-4 lg:mb-6 tracking-[0.15em]`}
              >
                Your friendly neighborhood photographer
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className={`${lato.className} mt-1 space-y-4 lg:text-lg text-[11px] leading-relaxed tracking-wider`}
            >
              <motion.p variants={fadeInUp}>
                What began as a simple summer pastime at the age of eight - a
                gift from my grandfather in the form of a film camera - quickly
                revealed my innate love for capturing landscapes. Life
                eventually led me down the familiar paths of education and
                responsibilities, placing my passion on hold but never
                extinguishing it.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Years later, with a basic DSLR, I rekindled that spark, falling
                deeply in love with candid moments and portraiture.
              </motion.p>
              <motion.p variants={fadeInUp}>
                I am drawn to clients who are equally passionate about the craft
                and who appreciate the beauty of capturing the essence of the
                moment.
              </motion.p>
            </motion.div>

            <motion.div variants={fadeIn} className="flex justify-end mt-10">
              <div className="flex flex-col items-center">
                <Image
                  src="/signature.png"
                  width={216}
                  height={53}
                  alt="signature"
                />
                <Link
                  href="https://www.instagram.com/sandeepsai_fotofusion/"
                  target="_blank"
                  className="flex items-center gap-2 mt-6"
                >
                  <Image
                    src={instagramLogo}
                    width={32}
                    height={32}
                    alt="instagram"
                    loading="lazy"
                    className="lg:w-8 lg:h-8 w-5 h-5"
                  />
                  <p className="lg:text-base text-xs">@sandeepsai_fotofusion</p>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Image Section */}
          <div className="md:absolute inset-0 md:flex -z-20 hidden">
            <div className="w-3/4 bg-[#F5F1EA]" />
            <div className="w-1/3 h-full bg-[#D94A27]" />
          </div>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-full max-w-[420px] aspect-[9/16] overflow-hidden md:flex hidden justify-center items-center shadow-[25px_25px_0px_rgba(255,255,255)] bg-[#F5F1EA]">
              <Image
                src={profileSrc}
                width={420}
                height={747}
                alt="Profile"
                className="w-full h-full object-contain"
                onError={() => setProfileSrc("/sandeep_profile.jpg")}
                priority
              />
            </div>
            <div className="w-full max-w-[466px] -translate-y-2 translate-x-4">
              <Image
                src="/cameraLine.svg"
                width={466}
                height={60}
                alt="camera-line"
                unoptimized
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;

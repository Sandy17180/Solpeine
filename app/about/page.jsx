import React from "react";
import { Taprom, Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import instagramLogo from "@/social/instagramLogo.svg";

const taprom = Taprom({ subsets: ["latin"], weight: "400" });
const lato = Lato({ subsets: ["latin"], weight: "400" });

const Page = () => {
  return (
    <div className="relative w-full min-h-[608px] overflow-hidden">
      {/* Background split */}
      <div className="absolute inset-0 flex z-0">
        <div className="w-2/3 bg-[#F5F1EA]"></div>
        <div className="w-1/3 bg-[#D94A27]"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="relative z-10 grid grid-cols-2 max-w-7xl px-8 gap-20 my-20 items-center justify-between">
          {/* Text Section */}
          <div className="flex flex-col justify-content max-w-xl">
            <div>
              <Image src="/name.svg" width={800} height={110} alt="name" />
              <p
                className={`${taprom.className} text-2xl text-[#D94A27] mt-4 mb-6 tracking-[0.15em]`}
              >
                Your friendly neighborhood photographer
              </p>
            </div>

            <div
              className={`${lato.className} mt-1 space-y-4 text-lg leading-relaxed`}
            >
              <p>
                What began as a simple summer pastime at the age of eight - a
                gift from my grandfather in the form of a film camera - quickly
                revealed my innate love for capturing landscapes. Life
                eventually led me down the familiar paths of education and
                responsibilities, placing my passion on hold but never
                extinguishing it.
              </p>
              <p>
                Years later, with a basic DSLR, I rekindled that spark, falling
                deeply in love with candid moments and portraiture.
              </p>
              <p>
                I am drawn to clients who are equally passionate about the craft
                and who appreciate the beauty of capturing the essence of the
                moment.
              </p>
            </div>
            <div className="flex justify-end">
              <div className="flex justify-center items-center flex-col mt-10">
                <Image
                  src="/signature.svg"
                  width={195}
                  height={100}
                  alt="signature"
                />
                <Link
                  href={"https://www.instagram.com/sandeepsai_fotofusion/"}
                  target="_blank"
                  className="flex items-center gap-2 mt-6"
                >
                  <Image
                    src={instagramLogo}
                    height={32}
                    width={32}
                    className="shadow-2xl"
                    alt="instagram logo"
                  />
                  <p>@sandeepsai_fotofusion</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="translate-x-20">
            <div className="h-auto w-auto max-w-[437px] max-h-[635px] overflow-hidden flex justify-center items-center shadow-[25px_25px_0px_rgba(255,255,255)]">
              <Image
                src="/sandeep_profile.jpg"
                width={437}
                height={635}
                alt="Profile"
                className="object-cover translate-x-20 translate-y-32 scale-200"
              />
            </div>
            <div className="h-[60px] w-[600px] -translate-y-2 translate-x-28">
              <Image
                src="/cameraLine.svg"
                height={60}
                width={466}
                alt="camera-line"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

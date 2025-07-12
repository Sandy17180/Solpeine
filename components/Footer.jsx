import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Lato } from "next/font/google";
import location from "@/public/pin-48.svg";
import VisitorCounter from "@/components/VisitorCounter";

import instagramLogo from "@/social/instagramLogo.svg";
import threadLogo from "@/social/threadLogo.svg";
import facebookLogo from "@/social/facebookLogo.svg";
import youtubeLogo from "@/social/youtubeLogo.svg";
import pinterestLogo from "@/social/pinterestLogo.svg";
import linkedinLogo from "@/social/linkedinLogo.svg";
import twitterLogo from "@/social/twitterLogo.svg";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const socials = [
  {
    href: "https://www.instagram.com/sandeepsai_fotography/",
    src: instagramLogo,
    alt: "instagram",
  },
  {
    href: "https://www.threads.net/@sandeepsai_fotography",
    src: threadLogo,
    alt: "thread",
  },
  {
    href: "https://www.facebook.com/sandeepsaik18",
    src: facebookLogo,
    alt: "Facebook",
  },
  {
    href: "https://www.youtube.com/@SandeepSaiFotography",
    src: youtubeLogo,
    alt: "youtube",
  },
  { href: "https://pin.it/Mtz9RIVOB", src: pinterestLogo, alt: "pinterest" },
  {
    href: "https://www.linkedin.com/in/sandeep-sai-k-2155861b1/",
    src: linkedinLogo,
    alt: "LinkedIn",
  },
  { href: "https://x.com/SandeepSai198", src: twitterLogo, alt: "Twitter" },
];

const Footer = () => {
  return (
    <footer
      className={` text-[#3a3a3a] md:pb-6 md:pt-8 ${lato.className} md:px-0 px-[15px] pb-2`}
    >
      <div
        className={`max-w-7xl lg:mx-auto mx-0 flex items-center justify-center gap-18 lg:gap-16 `}
      >
        {/* Brand */}
        <div>
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Logo"
              width={193}
              height={98}
              className="w-[103px] sm:w-[120px] md:w-[193px] h-auto"
            />
          </Link>
          <p className="md:text-xs text-[10px] text-[#3a3a3a] font-normal">
            Sculpted in light, frame by frame
          </p>
        </div>
        {/* Social Links */}
        <div className="flex items-center justify-center gap-1.5">
          {socials.map((social) => (
            <Link
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="shadow-2xl hover:shadow-none hover:scale-110 transition hover:brightness-130">
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={32}
                  height={32}
                  className="w-[20px] md:w-[32px] h-auto"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* location and view count */}
      <div className="text-center md:text-sm text-[10px] flex items-center md:justify-around justify-between mt-3.5">
        <div className="flex items-center gap-1.5">
          <Image
            src={location}
            alt="location"
            width={28}
            height={28}
            className="w-[16px] md:w-[28px] h-auto"
          />
          <p className="text-[#3a3a3a]">Based in Bengaluru</p>
        </div>
        <div className="flex items-center gap-1 justify-center ext-[#3a3a3a]">
          {<VisitorCounter />} views
        </div>
      </div>
      {/* Copyright section*/}
      <div className="text-center text-[#3a3a3a] text-xs space-x-9 md:flex justify-center items-center mt-3.5 hidden">
        <p>&copy; {new Date().getFullYear()} Solpeine</p>

        {/* <Link href="/terms" className="hover:text-gray-800">
          Terms of Service
        </Link>
        <Link href="/policy" className="hover:text-gray-800">
          Privacy Policy
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;

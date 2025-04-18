"use client";

import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Lobster_Two } from "next/font/google";
import { Sawarabi_Mincho } from "next/font/google";

const lobster = Lobster_Two({ subsets: ["latin"], weight: ["400"] });
const sawarabi = Sawarabi_Mincho({ subsets: ["latin"], weight: ["400"] });

const navLinks = [
  {
    label: "Workfolio",
    href: "#Workfolio",
    dropdown: [
      { label: "Projects", href: "#projects" },
      { label: "Case Studies", href: "#case-studies" },
    ],
  },
  {
    label: "Reflair",
    href: "#Reflair",
    dropdown: [
      { label: "Inspiration", href: "#inspiration" },
      { label: "Moodboards", href: "#moodboards" },
    ],
  },
  { label: "Contact", href: "#Contact" },
  { label: "About", href: "#About" },
];

const Header = () => {
  return (
    <section className="backdrop-blur w-full sticky top-0 left-0 z-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)] px-11 bg-[#f5f1ea]/70">
      <div className="grid grid-cols-2 lg:grid-cols-3 items-center relative h-[94px]">
        {/* logo */}
        <div className="">
          <Link href={"/"}>
            <Image src={logo} alt="Logo"width={193} height={78} />
          </Link>
          <p className={`text-[#3a3a3a] text-xs ${sawarabi.className}`}>
            Sculpted in light, frame by frame
          </p>
        </div>
        <div></div>
        {/* links */}
        <div className="justify-end items-center hidden lg:flex">
          <nav className="flex gap-8 font-[400] relative">
            {navLinks.map((link, index) => {
              return (
                <div key={link.label} className="relative">
                  <button>
                    <Link
                      href={link.href}
                      className={`text-[#d94a27] font-medium hover:text-[#3a3a3a] ${lobster.className} text-[22px]`}
                    >
                      {link.label}
                    </Link>
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Header;

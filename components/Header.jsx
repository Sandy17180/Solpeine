"use client";

import logo from "@/public/logo.svg";
import arrowDown from "@/public/arrowDown.svg";
import Image from "next/image";
import Link from "next/link";
import { Lobster_Two } from "next/font/google";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import instagramLogo from "@/public/instagramLogo.svg";
import linkedinLogo from "@/public/linkedinLogo.svg";
import pinterestLogo from "@/public/pinterestLogo.svg";

const lobster = Lobster_Two({ subsets: ["latin"], weight: ["400"] });

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
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <section className="flex justify-center w-full sticky top-0 left-0 z-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]">
      <div className="w-full h-[135px]">
        <div className=" bg-neutral-50/60 backdrop-blur h-full">
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center pl-[42px] relative">
            {/* logo */}
            <div>
              <Link href={"/"}>
                <Image src={logo} alt="Logo" width={209} height={129.5} />
              </Link>
            </div>

            {/* links */}
            <div className="justify-end items-center hidden lg:flex">
              <nav className="flex gap-8 font-[400] relative translate-x-40">
                {navLinks.map((link, index) => {
                  const isOpen = openDropdown === index;
                  return (
                    <div key={link.label} className="relative">
                      {link.dropdown ? (
                        <button
                          onClick={() => setOpenDropdown(isOpen ? null : index)}
                          className={`flex items-center gap-2 text-black hover:text-primary/90 ${lobster.className} text-xl`}
                        >
                          {link.label}
                          <Image
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-180" : "rotate-0"
                            }`}
                            src={arrowDown}
                            size={12}
                            alt="Arrow Down"
                          />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className={`text-black font-medium hover:text-primary/90 ${lobster.className} text-xl`}
                        >
                          {link.label}
                        </Link>
                      )}

                      {/* Dropdown content */}
                      {link.dropdown && isOpen && (
                        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-50">
                          <ul className="py-2 px-4 space-y-2 min-w-[150px]">
                            {link.dropdown.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="block text-black hover:text-primary/90"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* social-media buttons */}
            <div className="hidden lg:flex justify-end items-center gap-4 pr-[42px]">
              <Link
                href={"#instagram"}
                className="text-black font-medium hover:text-primary/90 text-3xl"
              >
                <Image
                  src={instagramLogo}
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href={"#pinterest"}
                className="text-black font-medium hover:text-primary/90 text-3xl"
              >
                <Image
                  src={pinterestLogo}
                  alt="Pinterest"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href={"#linkedin"}
                className="text-black font-medium hover:text-primary/90 text-3xl"
              >
                <Image
                  src={linkedinLogo}
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
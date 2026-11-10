"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { lobster, sawarabi } from "@/lib/fonts";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Workfolio", href: "/workfolio" },
  { label: "Reflair", href: "/reflair" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="backdrop-blur w-full sticky top-0 left-0 z-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)] bg-[#f5f1ea]/70">
      <div className="flex items-center md:justify-between gap-4 md:gap-0 px-[10px] lg:px-11 md:h-[94px] h-[70px]">
        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden focus:outline-none z-50 cursor-pointer"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={193}
              height={78}
              className="w-[120px] sm:w-[150px] md:w-[193px] h-auto"
              priority
              unoptimized
            />
          </Link>
          <p
            className={`text-[#3a3a3a] md:text-xs text-[10px] ${sawarabi.className}`}
          >
            Sculpted in light, frame by frame
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[#d94a27] hover:text-[#3a3a3a] ${lobster.className} text-[22px] font-medium`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden fixed top-[70px] left-0 w-52 bg-[#f5f1ea]/95 backdrop-blur-md shadow-xl border-r border-b border-[#e0d8cc] rounded-br-2xl transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start px-5 py-6 gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-[#d94a27] hover:text-[#3a3a3a] ${lobster.className} text-xl tracking-wide transition-colors duration-150`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

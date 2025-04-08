import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Sawarabi_Mincho } from "next/font/google";

const sawarabi = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"]
})
const Footer = () => {
  return (
    <footer className={` text-black py-10 px-6 mt-16 ${sawarabi.className}`}>
      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ${sawarabi.className}`}>
        {/* Brand */}
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="Logo" width={190} height={100} />
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            Bringing ideas to life, one pixel at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={`text-2xl font-bold mb-4 ${sawarabi.className}`}>
            Company
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/terms" className="hover:text-gray-800">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/policy" className="hover:text-gray-800">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className={`text-2xl font-bold mb-4 ${sawarabi.className}`}>
            Visit us at
          </h3>
          <div className="flex space-x-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum.
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

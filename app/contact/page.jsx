"use client";
import Image from "next/image";
import { Lato } from "next/font/google";
import Link from "next/link";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function ContactPage() {
  return (
    <div className={`w-full flex relative left-10 top-0 ${lato.className}`}>
      {/* Left: Form (40% width) */}
      <div className="w-2/5 px-8 pt-4 pb-[75px] relative z-10">
        <Image src="/connect.svg" height={32} width={554} alt="contact" />
        <p className="mb-6 mt-12 text-[#3a3a3ae6] font-semibold text-lg leading-7 tracking-wide">
          For general questions and inquiries please fill out the contact form.
        </p>

        <form className="grid gap-4">
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              placeholder="First name *"
              className="input-style flex-1"
              required
            />
            <input
              type="text"
              placeholder="Last name *"
              className="input-style flex-1"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="email"
              placeholder="Email address *"
              className="input-style flex-1"
              required
            />
            <input
              type="tel"
              placeholder="Phone number *"
              className="input-style flex-1"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              placeholder="City *"
              className="input-style flex-1"
              required
            />
            <input
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
              placeholder="Tentative shooting dates *"
              className="input-style flex-1"
              required
            />
          </div>

          <textarea
            placeholder="Please enter details of your requirements (500 words) *"
            className="input-style h-56"
            required
          />

          <button
            type="submit"
            className="bg-[#d94a27] hover:bg-[#d93327] mt-14 text-white py-3 rounded-md cursor-pointer transition duration-300 ease-in-out"
          >
            Submit Inquiry
          </button>

          <div className="flex items-center justify-center text-sm text-[#957e7e]">
            <p>Typically responds within 24 hrs</p>
          </div>
        </form>

        {/* WhatsApp Link */}
        <Link
          className="mt-6 flex items-center space-x-2"
          href={"https://wa.me/919036021726"}
          target="_blank"
        >
          <Image
            src="/whatsapp.svg"
            height={32}
            width={32}
            alt="whatsapp logo"
          />
          <span className="text-lg">Reach us on WhatsApp!</span>
        </Link>
      </div>

      {/* Right: Image with gradient overlay (60% width) */}
      <div className="w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f1ea] via-[#f5f1ea]/10 to-transparent z-10" />
        <div
          className="w-full h-full bg-cover bg-left bg-no-repeat scale-180 z-0"
          style={{ backgroundImage: "url('/image7.jpg')" }}
        />
      </div>
    </div>
  );
}

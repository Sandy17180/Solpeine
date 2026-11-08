"use client";
import Image from "next/image";
import { lato } from "@/lib/fonts";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion"; // ✅ animation library
import SuccessModal from "@/components/SuccessModal";

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    date: "",
    message: "",
  });

  const [wordCount, setWordCount] = useState(0);
  const [invalidFields, setInvalidFields] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "message") {
      newValue = value.slice(0, 500);
      setWordCount(newValue.length);
    }

    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (isValidField(name, newValue)) {
      setInvalidFields((prev) => ({ ...prev, [name]: false }));
    }
  };

  const isValidField = (name, value) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim().length >= 2 && nameRegex.test(value.trim());
      case "email":
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          value.trim()
        );
      case "phone":
        return /^\d{10}$/.test(value);
      case "city":
        return value.trim().length >= 2 && nameRegex.test(value.trim());
      case "date":
        return value.trim() !== "" && !isNaN(new Date(value).getTime());
      case "message":
        return value.trim() !== "" && value.length <= 500;
      default:
        return true;
    }
  };

  const validateAllFields = () => {
    const newInvalids = {};
    Object.entries(formData).forEach(([field, value]) => {
      newInvalids[field] = !isValidField(field, value);
    });
    setInvalidFields(newInvalids);
    return Object.values(newInvalids).some((isInvalid) => isInvalid);
  };

  const getLocalDate = () => {
    const local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = validateAllFields();
    if (hasErrors) return;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          date: "",
          message: "",
        });
        setWordCount(0);
        setInvalidFields({});
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setErrorMessages({
          general: "Error submitting form. Please try again later.",
        });
        console.error("Error:", res.statusText);
      }
    } catch (error) {
      setErrorMessages({
        general: "Error submitting form. Please try again later.",
      });
      console.error("Error submitting form:", error);
      setShowSuccess(false);
    }
  };

  const inputBase =
    "md:p-[10px] px-[4px] py-[2px] border rounded-[4px] leading-7 tracking-wider transition duration-200 ease-in-out bg-white md:text-base text-[11px] md:w-auto w-1/2 placeholder:text-[#433a3a] focus:outline-none focus:ring-2";
  const normalBorder = "border-[#C2B6B6] focus:ring-[#d94a27] focus:ring-1";
  const errorBorder =
    "border-red-500 border-2 focus:ring-red-500 focus:border-red-500";

  return (
    <motion.div
      className={`w-full flex md:flex-row flex-col relative top-0 ${lato.className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* left side (form) */}
      <motion.div
        className="md:w-3/7 w-full md:px-0 px-8 md:pl-8 md:pr-4 pt-4 md:pb-[75px] pb-0 relative z-10 bg-gradient-to-r from-[#f5f1ea] to-transparent overflow-hidden"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center">
          <Image
            src="/connect.svg"
            alt="contact"
            width={554}
            height={32}
            className="md:w-[554px] w-[200px]"
          />
        </div>

        <p className="md:mb-6 my-3 md:mt-12 text-[#3a3a3ae6] font-semibold md:text-lg text-[11px] leading-7 tracking-wide text-center">
          For general questions and inquiries please fill out the contact form.
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          {/* First & Last Name */}
          <div className="flex flex-row md:gap-5 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First name *"
              value={formData.firstName}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.firstName ? errorBorder : normalBorder
              } flex-1`}
              required
              title="Please enter your first name (at least 2 characters, letters only)"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name *"
              value={formData.lastName}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.lastName ? errorBorder : normalBorder
              } flex-1`}
              required
              title="Please enter your last name (at least 2 characters, letters only)"
            />
          </div>

          {/* Email & Phone */}
          <div className="flex flex-row md:gap-5 gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email address *"
              value={formData.email}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.email ? errorBorder : normalBorder
              } flex-1`}
              required
              title="Please enter a valid email in the format: username@example.com"
            />
            <input
              name="phone"
              type="text"
              inputMode="numeric"
              placeholder="Phone number *"
              value={formData.phone}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData((prev) => ({ ...prev, phone: cleaned }));
                if (/^\d{10}$/.test(cleaned)) {
                  setInvalidFields((prev) => ({ ...prev, phone: false }));
                }
              }}
              className={`${inputBase} ${
                invalidFields.phone ? errorBorder : normalBorder
              } flex-1`}
              required
              title="Please enter a valid 10 digit phone number"
            />
          </div>

          {/* City & Date */}
          <div className="flex flex-row md:gap-5 gap-4">
            <input
              name="city"
              type="text"
              placeholder="City *"
              value={formData.city}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.city ? errorBorder : normalBorder
              } flex-1`}
              required
              title="Please enter your city (at least 2 characters, letters only)"
            />
            <input
              name="date"
              type={formData.date ? "date" : "text"}
              placeholder="Tentative shooting dates *"
              onFocus={(e) => (e.target.type = "date")}
              onKeyDown={(e) => e.preventDefault()}
              min={getLocalDate()}
              value={formData.date}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.date ? errorBorder : normalBorder
              } flex-1`}
              required
              title="Please select a valid date"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col relative">
            <textarea
              name="message"
              placeholder="Please enter details of your requirements in 500 characters *"
              value={formData.message}
              onChange={handleChange}
              className={`p-[10px] border rounded-[4px] bg-white text-base w-auto placeholder:text-[#433a3a] focus:outline-none focus:ring-2 ${
                invalidFields.message ? errorBorder : normalBorder
              } md:h-56 h-36 pb-4 resize-none z-10 text-sm font-sans`}
              required
              title="Please enter your message (max 500 characters)"
            />
            <div className="absolute bottom-0 right-4 md:text-sm text-[11px] z-20">
              <span
                className={wordCount > 500 ? "text-red-500" : "text-gray-500"}
              >
                {wordCount}/500 characters
              </span>
            </div>
          </div>

          <motion.button
            type="submit"
            className="bg-[#d94a27] hover:bg-[#d93327] md:mt-14 text-white md:py-3 px-[18px] py-[9px] md:rounded-md cursor-pointer transition duration-300 ease-in-out mx-26 md:mx-0 rounded-4xl text-xs md:text-base flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Inquiry
          </motion.button>

          <div className="flex items-center justify-center md:text-sm text-[9px] -mt-4 text-[#957e7e]">
            <p>Typically responds within 24 hrs</p>
          </div>
        </form>

        <Link
          className="md:mt-6 mt-4 flex items-center justify-center space-x-2 md:justify-start"
          href="https://wa.me/919036021726"
          target="_blank"
        >
          <Image src="/whatsapp.svg" height={32} width={32} alt="whatsapp" />
          <span className="text-lg">Reach us on WhatsApp!</span>
        </Link>
      </motion.div>

      {/* right side (image) */}
      <motion.div
        className="md:w-3/5 h-[300px] md:h-auto w-full relative md:overflow-hidden"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 md:bg-gradient-to-r bg-gradient-to-b from-[#f5f1ea] via-[#f5f1ea]/10 to-transparent z-10" />
        <div
          className="w-full h-full bg-cover bg-left bg-no-repeat md:scale-150 scale-100 z-0"
          style={{ backgroundImage: "url('/api/contact-image')" }}
        />
      </motion.div>

      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} />
    </motion.div>
  );
}

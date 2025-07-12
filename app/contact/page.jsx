"use client";
import Image from "next/image";
import { Lato } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import SuccessModal from "@/components/SuccessModal";

const lato = Lato({ subsets: ["latin"], weight: "400" });

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

    // Remove red border when valid again
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
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());

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
    const newErrors = {};
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
  const endpoint = "/api/submit";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
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
        general:
          "There was an error submitting your form. Please try again later.",
      });
      console.error("Error submitting form:", res.statusText);
    }
  } catch (error) {
    setErrorMessages({
      general:
        "There was an error submitting your form. Please try again later.",
    });
    console.error("Error submitting form:", error);
    setShowSuccess(false);
  }
};

  const inputBase =
    "p-[10px] border rounded-[4px] leading-7 tracking-wider transition duration-200 ease-in-out bg-white text-base w-auto placeholder:text-[#433a3a] focus:outline-none focus:ring-2";
  const normalBorder =
    "border-[#C2B6B6] focus:ring-[#d94a27] focus:border-[#d94a27] focus:border-1";
  const errorBorder =
    "border-red-500 border-2 focus:ring-red-500 focus:border-red-500";

  return (
    <div className={`w-full flex relative left-10 top-0 ${lato.className} `}>
      <div className="w-3/7 pl-8 pr-4 pt-4 pb-[75px] relative z-10 bg-gradient-to-r from-[#f5f1ea] to-transparent">
        <Image src="/connect.svg" height={32} width={554} alt="contact" />
        <p className="mb-6 mt-12 text-[#3a3a3ae6] font-semibold text-lg leading-7 tracking-wide">
          For general questions and inquiries please fill out the contact form.
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col md:flex-row gap-5">
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
              required
              value={formData.lastName}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.lastName ? errorBorder : normalBorder
              } flex-1`}
              title="Please enter your last name (at least 2 characters, letters only)"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <input
              name="email"
              type="email"
              placeholder="Email address *"
              required
              value={formData.email}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.email ? errorBorder : normalBorder
              } flex-1`}
              title="Please enter a valid email in the format: username@example.com"
            />
            <input
              name="phone"
              required
              type="number"
              placeholder="Phone number *"
              value={formData.phone}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.phone ? errorBorder : normalBorder
              } flex-1`}
              title="Please enter a valid 10 digit phone number"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <input
              name="city"
              type="text"
              placeholder="City *"
              required
              value={formData.city}
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.city ? errorBorder : normalBorder
              } flex-1`}
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
              required
              onChange={handleChange}
              className={`${inputBase} ${
                invalidFields.date ? errorBorder : normalBorder
              } flex-1`}
            />
          </div>

          <div className="flex flex-col relative h-56">
            <textarea
              name="message"
              placeholder="Please enter details of your requirements in 500 characters *"
              value={formData.message}
              onChange={handleChange}
              required
              className={`${inputBase} ${
                invalidFields.message ? errorBorder : normalBorder
              } pb-4 h-56 resize-none z-10 leading-6 text-sm font-sans`}
              title="Please enter your message (at least 1 character, max 500 characters)"
            />
            <div className="absolute bottom-0 right-4 text-sm z-20">
              <span
                className={wordCount > 500 ? "text-red-500" : "text-gray-500"}
              >
                {wordCount}/500 characters
              </span>
            </div>
          </div>

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

        <Link
          className="mt-6 flex items-center space-x-2"
          href="https://wa.me/919036021726"
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

      {/* right side */}
      <div className="w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f1ea] via-[#f5f1ea]/10 to-transparent z-10" />
        <div
          className="w-full h-full bg-cover bg-left bg-no-repeat scale-180 z-0"
          style={{ backgroundImage: "url('/image7.jpg')" }}
        />
      </div>
      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}

"use client";
import Image from "next/image";
import { Lato } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = "First name can only contain letters and spaces";
    }

    if (!formData.lastName || formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name can only contain letters and spaces";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const cleaned = formData.phone.replace(/[\s-]/g, "");
      if (!/^\+?\d{10,}$/.test(cleaned)) {
        newErrors.phone =
          "Phone number must have at least 10 digits; may start with '+' and allow spaces or hyphens";
      }
    }

    if (!formData.city || formData.city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters";
    } else if (!nameRegex.test(formData.city.trim())) {
      newErrors.city = "City can only contain letters and spaces";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (isNaN(new Date(formData.date).getTime())) {
      newErrors.date = "Invalid date";
    }

    if (!formData.message || formData.message.trim().length < 2) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((msg) => toast.error(msg));
      return;
    }

    toast.success("Your inquiry has been submitted successfully!");
    console.log("Form submitted:", formData);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      date: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div className={`w-full flex relative left-10 top-0 ${lato.className}`}>
      {/* Left: Form (40% width) */}
      <div className="w-2/5 px-8 pt-4 pb-[75px] relative z-10">
        <Image src="/connect.svg" height={32} width={554} alt="contact" />
        <p className="mb-6 mt-12 text-[#3a3a3ae6] font-semibold text-lg leading-7 tracking-wide">
          For general questions and inquiries please fill out the contact form.
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              name="firstName"
              placeholder="First name *"
              className="input-style flex-1"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name *"
              className="input-style flex-1"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <input
              name="email"
              type="email"
              placeholder="Email address *"
              className="input-style flex-1"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone number *"
              className="input-style flex-1"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <input
              name="city"
              type="text"
              placeholder="City *"
              className="input-style flex-1"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              name="date"
              type={formData.date ? "date" : "text"}
              placeholder="Tentative shooting dates *"
              className="input-style flex-1"
              onFocus={(e) => (e.target.type = "date")}
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="message"
            placeholder="Please enter details of your requirements (500 words) *"
            className="input-style h-56"
            value={formData.message}
            onChange={handleChange}
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

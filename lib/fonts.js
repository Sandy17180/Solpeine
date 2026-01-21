// Centralized font configuration to avoid duplicate imports
import {
  Geist,
  Geist_Mono,
  Lobster_Two,
  Lato,
  Taprom,
  Sawarabi_Mincho,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const lobster = Lobster_Two({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lato",
  display: "swap",
});

export const taprom = Taprom({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-taprom",
  display: "swap",
});

export const sawarabi = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sawarabi",
  display: "swap",
});

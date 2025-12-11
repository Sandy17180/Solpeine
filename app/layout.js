import { Geist, Geist_Mono } from "next/font/google";
import { Lobster_Two } from "next/font/google";
import SocialButtons from "@/components/SocialButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RotatePrompt from "@/components/RotatePrompt";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavigationLoader from "@/components/NavigationLoader";

const lobster = Lobster_Two({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Solpeine",
  description: "Photography portfolio and workfolio",
  // Set NEXT_PUBLIC_SITE_URL in your environment for correct canonical and OG URLs
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Solpeine",
    description: "Photography portfolio and workfolio",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Solpeine",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solpeine",
    description: "Photography portfolio and workfolio",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F1EA] overflow-x-hidden`}
      >
        {/* Accessible skip link */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:underline fixed top-2 left-2 z-50 bg-white px-3 py-2 rounded shadow"
        >
          Skip to content
        </a>

        <Header />
        <SocialButtons />
        {/* rotate prompt for mobile portrait users */}
        <RotatePrompt />
        <Toaster
          position="center-top"
          gutter={12}
          toastOptions={{
            duration: 5000,
            className: "",
            style: {
              background: "#453b29",
              color: "#fff",
            },
          }}
          // 👇 transition config
          transition={{
            enter: "transform translate-y-2 opacity-0",
            enterFrom: "transform translate-y-0 opacity-100",
            leave: "transform scale-95 opacity-0",
            duration: 300,
          }}
        />

        {/* Main landmark for accessibility and SEO */}
        <main id="content" role="main">
          <NavigationLoader>{children}</NavigationLoader>
        </main>

        <Footer />

        {/* Minimal JSON-LD structured data for the organization/site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Solpeine",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              description: "Photography portfolio and workfolio",
            }),
          }}
        />
      </body>
    </html>
  );
}

import { getReflairImages } from "@/lib/reflair";
import GalleryClient from "@/components/reflair/GalleryClient";
// 1. Import the lobster font exactly how your header does it
import { lobster } from "@/lib/fonts";

export const revalidate = 600;

export const metadata = {
  title: "Reflair Gallery | Solpeine",
  description: "A collection of beautiful moments captured and curated by Solpeine.",
};

export default async function ReflairPage() {
  const images = await getReflairImages();

  return (
    /* 2. Changed to match the exact header background color #f5f1ea */
    <main className="min-h-screen bg-[#f5f1ea]">
      <div className="max-w-7xl mx-auto py-8">

        {/* 3. Applied lobster font class and the exact reddish-orange color #d94a27 */}
        <h1 className={`${lobster.className} text-5xl text-center mb-8 text-[#d94a27] tracking-wide`}>
          Reflair
        </h1>

        <GalleryClient initialImages={images} />
      </div>
    </main>
  );
}
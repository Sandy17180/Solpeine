import { getReflairImages } from "@/lib/reflair";
import GalleryClient from "@/components/reflair/GalleryClient";

export const metadata = {
  title: "Reflair Gallery | Solpeine",
  description: "A collection of beautiful moments captured and curated by Solpeine.",
};

export default async function ReflairPage() {
  const images = await getReflairImages();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 tracking-tighter text-gray-900">
          REFLAIR
        </h1>
        <GalleryClient initialImages={images} />
      </div>
    </main>
  );
}

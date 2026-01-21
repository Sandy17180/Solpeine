import FashionPortfolioClient from "./FashionPortfolioClient";

const initialFashionImages = [
  { id: 1, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 2, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 3, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 4, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 5, image: "/fashionPortrait.jpg", orientation: "portrait" },
];

async function getFashionImages() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_DEPLOYED_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/genre-images?genre=fashion`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) return initialFashionImages;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return initialFashionImages;

    return data.map((it, i) => ({
      id: it.id || i + 1,
      image: it.image || it.src || it.url,
      orientation:
        it.orientation ||
        (it.height && it.width
          ? it.height >= it.width
            ? "portrait"
            : "landscape"
          : "portrait"),
    }));
  } catch (err) {
    return initialFashionImages;
  }
}

export default async function FashionPortfolio() {
  const images = await getFashionImages();
  return <FashionPortfolioClient initialImages={images} />;
}

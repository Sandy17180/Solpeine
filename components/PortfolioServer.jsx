import PortfolioClient from "./PortfolioClient";

const initialPortfolioImages = [
  { id: 1, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 2, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 3, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 4, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
];

async function getPortfolioImages() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_DEPLOYED_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/genre-images?genre=portfolio`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return initialPortfolioImages;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0)
      return initialPortfolioImages;

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
    return initialPortfolioImages;
  }
}

export default async function Portfolio() {
  const images = await getPortfolioImages();
  return <PortfolioClient initialImages={images} />;
}

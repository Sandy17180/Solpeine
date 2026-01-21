import PortraiturePortfolioClient from "./PortraiturePortfolioClient";

const initialPortraitImages = [
  { id: 1, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 2, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 3, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 4, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 5, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 6, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 7, image: "/PortraitureImage.jpg", orientation: "portrait" },
];

async function getPortraitureImages() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_DEPLOYED_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/genre-images?genre=portraiture`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return initialPortraitImages;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return initialPortraitImages;

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
    return initialPortraitImages;
  }
}

export default async function PortraiturePortfolio() {
  const images = await getPortraitureImages();
  return <PortraiturePortfolioClient initialImages={images} />;
}

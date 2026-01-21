import HeadshotPortfolioClient from "./HeadshotPortfolioClient";

const initialHeadshotImages = [
  { id: 1, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 2, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 3, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 4, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 5, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 6, image: "/HeadshotImage.jpg", orientation: "landscape" },
];

async function getHeadshotImages() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_DEPLOYED_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/genre-images?genre=headshots`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return initialHeadshotImages;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return initialHeadshotImages;

    return data.map((it, i) => ({
      id: it.id || i + 1,
      image: it.image || it.src || it.url,
      orientation:
        it.orientation ||
        (it.height && it.width
          ? it.height >= it.width
            ? "portrait"
            : "landscape"
          : "landscape"),
    }));
  } catch (err) {
    return initialHeadshotImages;
  }
}

export default async function HeadshotPortfolio() {
  const images = await getHeadshotImages();
  return <HeadshotPortfolioClient initialImages={images} />;
}

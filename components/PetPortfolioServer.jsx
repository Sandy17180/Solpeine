import PetPortfolioClient from "./PetPortfolioClient";

const initialPetImages = [
  { id: 1, image: "/lab.jpg", orientation: "landscape" },
  { id: 2, image: "/Pet.jpg", orientation: "portrait" },
  { id: 3, image: "/lab.jpg", orientation: "landscape" },
  { id: 4, image: "/Pet.jpg", orientation: "portrait" },
  { id: 5, image: "/lab.jpg", orientation: "landscape" },
  { id: 6, image: "/Pet.jpg", orientation: "portrait" },
];

async function getPetImages() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_DEPLOYED_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/genre-images?genre=pets`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) return initialPetImages;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return initialPetImages;

    return data.map((it, i) => ({
      id: it.id || i + 1,
      image: it.image,
      orientation:
        it.orientation || (it.height >= it.width ? "portrait" : "landscape"),
    }));
  } catch (err) {
    return initialPetImages;
  }
}

export default async function PetPortfolio() {
  const images = await getPetImages();
  return <PetPortfolioClient initialImages={images} />;
}

import PetPortfolioClient from "./PetPortfolioClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialPetImages = [
  { id: 1, image: "/lab.jpg", orientation: "landscape" },
  { id: 2, image: "/Pet.jpg", orientation: "portrait" },
  { id: 3, image: "/lab.jpg", orientation: "landscape" },
  { id: 4, image: "/Pet.jpg", orientation: "portrait" },
  { id: 5, image: "/lab.jpg", orientation: "landscape" },
  { id: 6, image: "/Pet.jpg", orientation: "portrait" },
];

export default async function PetPortfolio() {
  const images = await getGenreImages("pets");
  return (
    <PetPortfolioClient
      initialImages={images.length > 0 ? images : initialPetImages}
    />
  );
}

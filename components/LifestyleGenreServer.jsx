import LifestyleGenreClient from "./LifestyleGenreClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialLifestyleImages = [
  { id: 1, image: "/LifestyleGenre.jpg", orientation: "landscape" },
  { id: 2, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 3, image: "/LifestyleGenre.jpg", orientation: "landscape" },
  { id: 4, image: "/PortraitureImage.jpg", orientation: "portrait" },
];

export default async function LifestyleGenreServer() {
  const images = await getGenreImages("lifestyle");
  return (
    <LifestyleGenreClient
      initialImages={images.length > 0 ? images : initialLifestyleImages}
    />
  );
}

import PortfolioClient from "./PortfolioClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialPortfolioImages = [
  { id: 1, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 2, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 3, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
  { id: 4, image: "/Portfolio_Genre.jpg", orientation: "portrait" },
];

export default async function Portfolio() {
  const images = await getGenreImages("portfolio");
  return (
    <PortfolioClient
      initialImages={images.length > 0 ? images : initialPortfolioImages}
    />
  );
}

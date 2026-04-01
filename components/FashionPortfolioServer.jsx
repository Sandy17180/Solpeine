import FashionPortfolioClient from "./FashionPortfolioClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialFashionImages = [
  { id: 1, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 2, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 3, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 4, image: "/fashionPortrait.jpg", orientation: "portrait" },
  { id: 5, image: "/fashionPortrait.jpg", orientation: "portrait" },
];

export default async function FashionPortfolio() {
  const images = await getGenreImages("fashion");
  return (
    <FashionPortfolioClient
      initialImages={images.length > 0 ? images : initialFashionImages}
    />
  );
}

import HeadshotPortfolioClient from "./HeadshotPortfolioClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialHeadshotImages = [
  { id: 1, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 2, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 3, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 4, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 5, image: "/HeadshotImage.jpg", orientation: "landscape" },
  { id: 6, image: "/HeadshotImage.jpg", orientation: "landscape" },
];

export default async function HeadshotPortfolio() {
  const images = await getGenreImages("headshots");
  return (
    <HeadshotPortfolioClient
      initialImages={images.length > 0 ? images : initialHeadshotImages}
    />
  );
}

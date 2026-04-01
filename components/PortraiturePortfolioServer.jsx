import PortraiturePortfolioClient from "./PortraiturePortfolioClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialPortraitImages = [
  { id: 1, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 2, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 3, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 4, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 5, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 6, image: "/PortraitureImage.jpg", orientation: "portrait" },
  { id: 7, image: "/PortraitureImage.jpg", orientation: "portrait" },
];

export default async function PortraiturePortfolio() {
  const images = await getGenreImages("portraiture");
  return (
    <PortraiturePortfolioClient
      initialImages={images.length > 0 ? images : initialPortraitImages}
    />
  );
}

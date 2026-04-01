import PreandPostWeddingClient from "./PreandPostWeddingClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialPreAndPostImages = [
  { id: 1, image: "/LifestyleGenre.jpg", orientation: "landscape" },
  { id: 2, image: "/pre_and_post_weddingGenre.jpg", orientation: "portrait" },
  { id: 3, image: "/LifestyleGenre.jpg", orientation: "landscape" },
  { id: 4, image: "/pre_and_post_weddingGenre.jpg", orientation: "portrait" },
];

export default async function PreandPostWeddingServer() {
  const images = await getGenreImages("pre_and_post_wedding");
  return (
    <PreandPostWeddingClient
      initialImages={images.length > 0 ? images : initialPreAndPostImages}
    />
  );
}

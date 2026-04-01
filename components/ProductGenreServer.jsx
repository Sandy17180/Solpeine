import ProductGenreClient from "./ProductGenreClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialProductImages = [
  { id: 1, image: "/ProductGenre.jpeg", orientation: "portrait" },
  { id: 2, image: "/ProductGenre.jpeg", orientation: "landscape" },
  { id: 3, image: "/ProductGenre.jpeg", orientation: "portrait" },
  { id: 4, image: "/ProductGenre.jpeg", orientation: "landscape" },
];

export default async function ProductGenreServer() {
  const images = await getGenreImages("product");
  return (
    <ProductGenreClient
      initialImages={images.length > 0 ? images : initialProductImages}
    />
  );
}

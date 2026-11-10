import HeroImagesClient from "./HeroImagesClient";
import { getHeroImagesData } from "@/lib/heroImages";

export default async function HeroImages() {
  const images = await getHeroImagesData();
  return <HeroImagesClient initialImages={images} />;
}

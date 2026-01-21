import HeroImagesClient from "./HeroImagesClient";

// Fallback local image list (used if Cloudinary isn't configured or returns nothing)
const FALLBACK_IMAGES = [
  "/image6.jpg",
  "/image9.jpg",
  "/statue.jpg",
  "/image10.jpg",
  "/image12.jpg",
  "/image16.png",
  "/image18.png",
  "/image21.png",
  "/image45.png",
];

function parseNameToAlt(name) {
  const n = String(name || "");
  const base = n.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}

async function getHeroImages() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_DEPLOYED_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/hero-images`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      return FALLBACK_IMAGES.map((s, i) => ({
        id: i + 1,
        src: s,
        alt: parseNameToAlt(s),
      }));
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      return FALLBACK_IMAGES.map((s, i) => ({
        id: i + 1,
        src: s,
        alt: parseNameToAlt(s),
      }));
    }

    // Normalize to objects {id, src, alt}
    return data
      .map((it, idx) => {
        if (typeof it === "string") {
          return { id: idx + 1, src: it, alt: parseNameToAlt(it) };
        }
        if (it && (it.src || it.public_id || it.url)) {
          return {
            id: it.id || idx + 1,
            src: it.src || it.url || it.public_id,
            alt: it.alt || parseNameToAlt(it.src || it.public_id || it.url),
          };
        }
        return null;
      })
      .filter(Boolean);
  } catch (err) {
    // Return fallback on error
    return FALLBACK_IMAGES.map((s, i) => ({
      id: i + 1,
      src: s,
      alt: parseNameToAlt(s),
    }));
  }
}

export default async function HeroImages() {
  const images = await getHeroImages();
  return <HeroImagesClient initialImages={images} />;
}

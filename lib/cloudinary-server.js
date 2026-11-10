function buildCloudUrl(cloud, publicId) {
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${publicId}`;
}

function parseNameToAlt(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .trim();
}

const genreCache = {};
const GENRE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Fetches images for a specific genre from Cloudinary.
 * Used in Server Components for ISR/Static Rendering.
 */
export async function getGenreImages(genre) {
  const cached = genreCache[genre];
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }

  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud || !key || !secret) {
    console.warn("Cloudinary credentials missing, returning empty array");
    return [];
  }

  const folder = `solpiene/individualGenreImages/${genre}`;
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  try {
    // Attempt to use List API
    const listUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?prefix=${encodeURIComponent(
      folder
    )}&max_results=500`;

    const res = await fetch(listUrl, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      // Fallback to Search API if List fails
      const searchRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud}/resources/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expression: `folder="${folder}"`,
            max_results: 500,
          }),
          next: { revalidate: 3600 },
        }
      );

      const searchBody = await searchRes.json();
      const searchResources = searchBody?.resources || [];

      const result = searchResources.map((r, i) => ({
        id: i + 1,
        image: buildCloudUrl(cloud, r.public_id),
        alt: parseNameToAlt(r.public_id.split("/").pop()),
        orientation: r.height >= r.width ? "portrait" : "landscape",
        width: r.width,
        height: r.height,
      }));
      genreCache[genre] = { data: result, expiry: Date.now() + GENRE_TTL_MS };
      return result;
    }

    const body = await res.json();
    const resources = body?.resources || [];

    const result = resources.map((r, i) => ({
      id: i + 1,
      image: buildCloudUrl(cloud, r.public_id),
      alt: parseNameToAlt(r.public_id.split("/").pop()),
      orientation: r.height >= r.width ? "portrait" : "landscape",
      width: r.width,
      height: r.height,
    }));
    genreCache[genre] = { data: result, expiry: Date.now() + GENRE_TTL_MS };
    return result;
  } catch (error) {
    console.error("Error fetching genre images from Cloudinary:", error);
    return [];
  }
}

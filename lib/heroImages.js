// Helper for server-side direct access to Hero carousel images
// Avoids internal HTTP loopbacks (TTFB latency) and caches results in memory

const FALLBACK_IMAGES = [
  "/image6.jpg",
  "/image9.jpg",
  "/statue.jpg",
  "/image10.jpg",
  "/image12.jpg",
  "/image16.jpg",
  "/image18.jpg",
  "/image21.jpg",
  "/image45.jpg",
];

function parseNameToAlt(name) {
  const n = String(name || "");
  const base = n.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}

function buildCloudUrl(cloud, publicId) {
  const encoded = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${encoded}`;
}

let heroCache = null;
let heroExpiry = 0;
const HERO_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getHeroImagesData() {
  const now = Date.now();
  if (heroCache && heroExpiry > now) {
    return heroCache;
  }

  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloud && apiKey && apiSecret) {
    try {
      const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
      const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?type=upload&prefix=solpiene/landingpage/heroimages&max_results=500`;

      const res = await fetch(url, {
        headers: { Authorization: `Basic ${basic}` },
      });

      if (res.ok) {
        const body = await res.json();
        const resources = body.resources || [];
        if (resources.length > 0) {
          const result = resources.map((r, i) => {
            const publicId = r.public_id;
            const filename = publicId.split("/").pop();
            return {
              id: i + 1,
              src: buildCloudUrl(cloud, publicId),
              alt: parseNameToAlt(filename),
              width: r.width,
              height: r.height,
            };
          });
          heroCache = result;
          heroExpiry = now + HERO_TTL_MS;
          return result;
        }
      }
    } catch (err) {
      console.warn("Hero images Cloudinary list failed, using fallback:", err?.message || err);
    }
  }

  // Fallback to local public images
  const fallback = FALLBACK_IMAGES.map((s, i) => ({
    id: i + 1,
    src: s,
    alt: parseNameToAlt(s),
  }));
  heroCache = fallback;
  heroExpiry = now + HERO_TTL_MS;
  return fallback;
}


import { v2 as cloudinary } from "cloudinary";
import captions from "@/data/featuredPostCaptions.json";

const localMap = {
  portrait: "/Portrait.jpg",
  fashion: "/Fashion.jpg",
  product: "/Product.jpeg",
  lifestyle: "/Lifestyle.jpg",
  portfolio: "/Portfolio.jpg",
  prewedding: "/Pre-Wedding.jpg",
  event: "/Event.jpg",
  headshot: "/Headshot.jpg",
  pet: "/Pet.jpg",
};

const genres = [
  "portrait",
  "fashion",
  "product",
  "lifestyle",
  "portfolio",
  "prewedding",
  "event",
  "headshot",
  "pet",
];

function getFallbackPosts() {
  return genres.map((genre, index) => ({
    id: index + 1,
    image: localMap[genre] || "",
    caption: captions[genre] || "Featured post",
    publicId: `solpiene/landingpage/featuredPost/${genre}`,
    isFallback: true,
  }));
}

let featuredPostsCache = null;
let featuredPostsExpiry = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function getFeaturedPostsData() {
  const now = Date.now();
  if (featuredPostsCache && featuredPostsExpiry > now) {
    return featuredPostsCache;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloudKey = process.env.CLOUDINARY_API_KEY;
  const cloudSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !cloudKey || !cloudSecret) {
    const fallback = getFallbackPosts();
    featuredPostsCache = fallback;
    featuredPostsExpiry = now + CACHE_TTL_MS;
    return fallback;
  }

  try {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: cloudKey,
      api_secret: cloudSecret,
    });

    // Single Cloudinary request fetching all featured posts in one roundtrip
    const list = await cloudinary.api.resources({
      type: "upload",
      prefix: "solpiene/landingpage/featuredPost",
      max_results: 100,
    });

    const resources = list.resources || [];
    const resourceMap = {};

    for (const r of resources) {
      const pid = (r.public_id || "").toLowerCase();
      for (const g of genres) {
        if (pid.includes(`/featuredpost/${g}`) || pid.includes(`/${g}/`)) {
          if (!resourceMap[g]) {
            resourceMap[g] = r.secure_url;
          }
        }
      }
    }

    const posts = genres.map((genre, index) => {
      const cloudImage = resourceMap[genre];
      const image = cloudImage || localMap[genre] || "";
      const caption = captions[genre] || "Featured post";

      return {
        id: index + 1,
        image,
        caption,
        publicId: `solpiene/landingpage/featuredPost/${genre}`,
        isFallback: !cloudImage,
      };
    });

    featuredPostsCache = posts;
    featuredPostsExpiry = now + CACHE_TTL_MS;
    return posts;
  } catch (error) {
    console.warn("Cloudinary FeaturedPosts batch fetch error, falling back to local images:", error?.message || error);
    const fallback = getFallbackPosts();
    featuredPostsCache = fallback;
    featuredPostsExpiry = now + 5 * 60 * 1000; // 5 min retry
    return fallback;
  }
}


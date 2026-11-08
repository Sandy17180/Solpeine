import captions from "@/data/featuredPostCaptions.json";

const fallbackPosts = [
  { id: 1, image: "/Portrait.jpg", caption: captions.portrait || "Featured post" },
  { id: 2, image: "/Fashion.jpg", caption: captions.fashion || "Featured post" },
  { id: 3, image: "/Product.jpeg", caption: captions.product || "Featured post" },
  { id: 4, image: "/Lifestyle.jpg", caption: captions.lifestyle || "Featured post" },
  { id: 5, image: "/Portfolio.jpg", caption: captions.portfolio || "Featured post" },
  { id: 6, image: "/Pre-Wedding.jpg", caption: captions.prewedding || "Featured post" },
  { id: 7, image: "/Event.jpg", caption: captions.event || "Featured post" },
  { id: 8, image: "/Headshot.jpg", caption: captions.headshot || "Featured post" },
  { id: 9, image: "/Pet.jpg", caption: captions.pet || "Featured post" },
];

// Fetch featured posts from the API with ISR (Incremental Static Revalidation)
export async function getFeaturedPosts() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_DEPLOYED_URL ||
      "https://www.solpeine.com";

    const res = await fetch(`${baseUrl}/api/featured-posts`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch featured posts: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : fallbackPosts;
  } catch (error) {
    console.warn("Using fallback featured posts:", error.message);
    return fallbackPosts;
  }
}

// KEEP BUT UNUSED (backward compatibility)
export const featuredPosts = [];
